<script lang="ts">
    import { onMount } from "svelte";
    import Grid from "./lib/components/Grid.svelte";
    import Toolbar from "./lib/components/Toolbar.svelte";
    import Toolbox from "./lib/components/Toolbox.svelte";
    import { store } from "./lib/store.svelte";

    let gridContainer: HTMLDivElement;
    let toolboxContainer: HTMLDivElement;
    let toolbarWrapper: HTMLDivElement;
    let isToolbarSticky = $state(false);

    function handleClickOutside(e: MouseEvent) {
        if (gridContainer && !gridContainer.contains(e.target as Node)) {
            // Si on clique dans la toolbox, on ne désélectionne pas
            if (
                toolboxContainer &&
                toolboxContainer.contains(e.target as Node)
            ) {
                return;
            }
            store.deselectCell();
        }
    }

    function handleScroll() {
        if (toolbarWrapper) {
            isToolbarSticky = window.scrollY > 0;
        }
    }

    function updateToolbarHeight() {
        if (toolbarWrapper) {
            const height = toolbarWrapper.offsetHeight;
            toolbarWrapper.style.setProperty('--toolbar-height', `${height}px`);
        }
    }

    onMount(() => {
        window.addEventListener("scroll", handleScroll);
        updateToolbarHeight();
        window.addEventListener("resize", updateToolbarHeight);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateToolbarHeight);
        };
    });
</script>

<main class="app-container" onclick={handleClickOutside}>
    <div class="content-wrapper">
        <div class="toolbar-wrapper" bind:this={toolbarWrapper} class:sticky={isToolbarSticky}>
            <Toolbar {isToolbarSticky} />
        </div>

        <div class="main-layout">
            <div class="grid-container" bind:this={gridContainer}>
                <Grid />
            </div>

            {#if store.mode === "edit"}
                <div class="toolbox-wrapper" bind:this={toolboxContainer}>
                    <Toolbox />
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    @reference "tailwindcss";

    .app-container {
        @apply min-h-screen flex flex-col items-center py-10 bg-amber-50 transition-colors duration-300;
        background-image: repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(180, 83, 9, 0.03) 2px,
                rgba(180, 83, 9, 0.03) 4px
            ),
            repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(180, 83, 9, 0.03) 2px,
                rgba(180, 83, 9, 0.03) 4px
            );
    }

    .content-wrapper {
        @apply w-full max-w-6xl px-4;
    }

    .main-layout {
        @apply flex gap-8 justify-center;
        align-items: flex-start;
    }

    .grid-container {
        @apply shrink-0;
    }

    .toolbox-container {
        @apply shrink-0;
    }

    .toolbar-wrapper {
        @apply sticky top-0 z-50 w-full mb-8;
        background: inherit;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        --toolbar-height: 100%;
    }

    .toolbox-wrapper {
        @apply sticky h-fit shrink-0 self-start;
        top: calc(var(--toolbar-height) + 2rem);
        z-index: 40;
    }
</style>

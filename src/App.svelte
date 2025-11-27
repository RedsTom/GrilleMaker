<script lang="ts">
    import Grid from "./lib/components/Grid.svelte";
    import Toolbar from "./lib/components/Toolbar.svelte";
    import Toolbox from "./lib/components/Toolbox.svelte";
    import PreviewControls from "./lib/components/PreviewControls.svelte";
    import { store } from "./lib/store.svelte";

    let gridContainer: HTMLDivElement;
    let toolboxContainer: HTMLDivElement;

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
</script>

<main class="app-container" onclick={handleClickOutside}>
    <div class="content-wrapper">
        <div class="toolbar-wrapper">
            <Toolbar />
        </div>

        <div class="main-layout">
            <div class="grid-section">
                <div
                    class="grid-container"
                    bind:this={gridContainer}
                    onclick={(e) => {
                        if (e.target === e.currentTarget) store.deselectCell();
                    }}
                    role="button"
                    tabindex="-1"
                    onkeydown={(e) =>
                        e.key === "Escape" && store.deselectCell()}
                >
                    <Grid />
                </div>
            </div>

            {#if store.mode === "edit"}
                <div class="toolbox-section" bind:this={toolboxContainer}>
                    <Toolbox />
                </div>
            {:else if store.mode === "preview"}
                <div class="toolbox-section" bind:this={toolboxContainer}>
                    <PreviewControls />
                </div>
            {/if}
        </div>
    </div>
    <div class="print-footer">
        Cette grille a été créée sur <a href="https://grillemaker.redstom.fr/"
            >https://grillemaker.redstom.fr/</a
        >
    </div>
</main>

<style>
    @reference "tailwindcss";

    .app-container {
        @apply h-screen w-screen flex flex-col bg-amber-50 overflow-hidden;
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
        @apply w-full h-full flex flex-col max-w-[1600px] mx-auto px-6 py-4 gap-4;
    }

    .toolbar-wrapper {
        @apply w-full shrink-0;
    }

    .main-layout {
        @apply flex gap-6 items-start flex-grow overflow-hidden min-h-0;
    }

    .grid-section {
        @apply flex-grow h-full overflow-auto rounded-lg border border-orange-200/30 bg-white/30 backdrop-blur-sm;
        flex-basis: 66.666%;
        max-width: 66.666%;
    }

    .grid-container {
        @apply p-8 min-h-full w-fit min-w-full flex justify-center items-start;
    }

    .toolbox-section {
        @apply shrink-0 h-full overflow-auto;
        flex-basis: 33.333%;
        max-width: 33.333%;
    }

    @media print {
        @page {
            margin: 0;
        }

        .app-container {
            height: auto;
            overflow: visible;
            background: white;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
        }

        .content-wrapper {
            padding: 20mm; /* Add padding to simulate margins */
            max-width: none;
            min-height: 100vh;
            position: relative;
        }

        .toolbar-wrapper,
        .toolbox-section {
            display: none;
        }

        .main-layout {
            display: block;
            overflow: visible;
        }

        .grid-section {
            flex-basis: 100%;
            max-width: 100%;
            border: none;
            background: transparent;
            overflow: visible;
            backdrop-filter: none !important;
        }

        .grid-container {
            padding: 0;
            min-height: auto;
            display: block;
        }

        .print-footer {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 10pt;
            color: #666;
            font-family: sans-serif;
            padding-bottom: 10mm;
        }
    }
</style>

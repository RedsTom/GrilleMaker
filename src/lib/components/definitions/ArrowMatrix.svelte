<script lang="ts">
    import type { ArrowDirection, Definition } from "../../store.svelte";
    import Arrow from "../Arrow.svelte";

    let { definition, onUpdate } = $props<{
        definition: Definition;
        onUpdate: (updates: Partial<Definition>) => void;
    }>();

    function getArrowMatrix(dir: "horizontal" | "vertical") {
        if (dir === "vertical") {
            return [
                ["left-up", "up", "right-up"] as ArrowDirection[],
                ["left-down", "down", "right-down"] as ArrowDirection[],
            ];
        } else {
            return [
                ["up-left", "left", "down-left"] as ArrowDirection[],
                ["up-right", "right", "down-right"] as ArrowDirection[],
            ];
        }
    }
</script>

<div class="grid grid-cols-3 gap-1.5">
    {#each getArrowMatrix(definition.direction) as row}
        {#each row as arrow}
            <button
                class="arrow-btn-preview"
                class:active={definition.arrow === arrow}
                onclick={() => onUpdate({ arrow })}
                title={arrow}
            >
                <div class="arrow-preview-container">
                    <Arrow direction={arrow} />
                </div>
            </button>
        {/each}
    {/each}
</div>

<style>
    @reference "tailwindcss";

    .arrow-btn-preview {
        @apply py-1 px-1 rounded border transition-all flex items-center justify-center relative h-8;
        @apply bg-white border-amber-100 text-amber-300;
        @apply hover:bg-amber-50 hover:border-amber-300 hover:text-amber-500;
    }

    .arrow-btn-preview.active {
        @apply bg-amber-100 border-amber-400 text-amber-900;
        box-shadow: inset 0 1px 2px rgba(180, 83, 9, 0.1);
    }

    .arrow-preview-container {
        @apply relative w-full h-full flex items-center justify-center;
    }

    /* Fix alignment by overriding Arrow component styles */
    .arrow-preview-container :global(.arrow-container) {
        position: relative !important;
        top: auto !important;
        left: auto !important;
        right: auto !important;
        bottom: auto !important;
        transform: none !important;
        width: 100% !important;
        height: 100% !important;
    }
</style>

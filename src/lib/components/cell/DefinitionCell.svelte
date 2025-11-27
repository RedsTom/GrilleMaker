<script lang="ts">
    import type { CellData } from "../../store.svelte";
    import Arrow from "../Arrow.svelte";

    let { data } = $props<{
        data: CellData;
    }>();

    // Calcul dynamique de la taille de police pour les définitions
    function calculateFontSize(text: string, numDefinitions: number): number {
        const baseSize = 12;
        const minSize = 8;
        const textLength = text.length;

        // Facteur basé sur la longueur du texte
        let size = Math.max(minSize, Math.min(baseSize, 90 / textLength));

        // Réduction supplémentaire si plusieurs définitions
        if (numDefinitions > 1) {
            size = size * (1 - (numDefinitions - 1) * 0.1);
        }

        return Math.max(minSize, Math.min(baseSize, size));
    }
</script>

<div class="w-full h-full flex flex-col rounded-[calc(0.25rem-2px)] relative">
    {#if data.definitions && data.definitions.length > 0}
        {#each data.definitions as def, i}
            {@const fontSize =
                def.fontSize ||
                calculateFontSize(def.text, data.definitions.length)}
            <div
                class="definition-section flex-1 w-full flex items-center justify-center min-h-0 px-1 py-0.5"
                class:bg-amber-800={i % 2 === 0}
                class:bg-amber-900={i % 2 !== 0}
            >
                <!-- Text with dynamic font size -->
                <span
                    class="definition-text font-bold wrap-break-words w-full text-center uppercase leading-tight text-yellow-50"
                    style="font-size: {fontSize}px; line-height: {fontSize +
                        2}px;"
                >
                    {def.text}
                </span>
            </div>
        {/each}
        <!-- Arrows positioned relative to the cell, not the sections -->
        {#each data.definitions as def, i}
            <Arrow
                direction={def.arrow}
                sectionIndex={i}
                totalSections={data.definitions.length}
            />
        {/each}
    {:else}
        <div
            class="w-full h-full flex items-center justify-center bg-amber-800"
        >
            <span class="opacity-50 text-xs font-bold text-yellow-50">DEF</span>
        </div>
    {/if}
</div>

<style>
    @reference "tailwindcss";

    .definition-section {
        @apply transition-all;
    }

    .definition-text {
        @apply wrap-break-word hyphens-auto;
        word-break: break-word;
        overflow-wrap: break-word;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    }
</style>

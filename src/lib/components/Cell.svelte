<script lang="ts">
    import type { CellData, ArrowDirection } from "../store.svelte";
    import { store } from "../store.svelte";
    import Arrow from "./Arrow.svelte";

    let { x, y, data, isSelected, onclick } = $props<{
        x: number;
        y: number;
        data: CellData;
        isSelected: boolean;
        onclick: (x: number, y: number) => void;
    }>();

    let cellElement: HTMLDivElement;

    let isInSelection = $derived(store.isRowOrColumnSelected(x, y));

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

    $effect(() => {
        if (isSelected && cellElement) {
            cellElement.focus();
        }
    });

    function handleKeyDown(e: KeyboardEvent) {
        if (data.type === "definition") return;

        // Accepter les caractères alphanumériques
        if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
            e.preventDefault();
            store.setCellValue(x, y, e.key.toUpperCase());
            // Naviguer automatiquement dans la direction de la sélection
            if (store.selectionDirection === "row") {
                const newY = y + 1;
                if (store.isValidCell(x, newY)) {
                    store.selectCell(x, newY, false);
                }
            } else if (store.selectionDirection === "column") {
                const newX = x + 1;
                if (store.isValidCell(newX, y)) {
                    store.selectCell(newX, y, false);
                }
            }
        }
        // Supprimer avec Backspace ou Delete
        else if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            store.setCellValue(x, y, "");
        }
        // Naviguer avec les flèches
        else if (e.key === "ArrowRight") {
            e.preventDefault();
            const newY = y + 1;
            if (store.isValidCell(x, newY)) {
                store.selectCell(x, newY, false);
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const newY = y - 1;
            if (store.isValidCell(x, newY)) {
                store.selectCell(x, newY, false);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const newX = x + 1;
            if (store.isValidCell(newX, y)) {
                store.selectCell(newX, y, false);
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const newX = x - 1;
            if (store.isValidCell(newX, y)) {
                store.selectCell(newX, y, false);
            }
        }
    }
</script>

<div
    bind:this={cellElement}
    class="cell"
    class:selected={isSelected}
    class:in-selection={isInSelection}
    class:standard={data.type === "standard"}
    class:definition={data.type === "definition"}
    class:border-top-dashed={x === 0 && data.borders?.top === "dashed"}
    class:border-right-dashed={data.borders?.right === "dashed"}
    class:border-bottom-dashed={data.borders?.bottom === "dashed"}
    class:border-left-dashed={y === 0 && data.borders?.left === "dashed"}
    class:no-top-border={x > 0}
    class:no-left-border={y > 0}
    onclick={() => store.mode !== "preview" && store.selectCell(x, y, true)}
    role="textbox"
    tabindex={store.mode === "preview" ? -1 : 0}
    onkeydown={(e) => store.mode !== "preview" && handleKeyDown(e)}
>
    {#if data.type === "definition"}
        <div class="w-full h-full flex flex-col">
            {#if data.definitions && data.definitions.length > 0}
                {#each data.definitions as def, i}
                    {@const fontSize = calculateFontSize(
                        def.text,
                        data.definitions.length,
                    )}
                    <div
                        class="definition-section flex-1 w-full flex items-center justify-center min-h-0 px-1 py-0.5"
                        class:has-border={i < data.definitions.length - 1}
                    >
                        <!-- Text with dynamic font size -->
                        <span
                            class="definition-text font-bold wrap-break-words w-full text-center uppercase leading-tight"
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
                <span class="opacity-50 text-xs font-bold">DEF</span>
            {/if}
        </div>
    {:else if store.mode !== "preview"}
        {data.value}
    {/if}
</div>

<style>
    @reference "tailwindcss";

    .cell {
        @apply w-16 h-16 border flex items-center justify-center text-lg font-semibold cursor-pointer select-none transition-all duration-200 outline-none rounded;
        border-color: rgba(180, 83, 9, 0.3);
        border-width: 2px;
    }

    .no-top-border {
        border-top-width: 0 !important;
    }

    .no-left-border {
        border-left-width: 0 !important;
    }

    .standard {
        @apply bg-yellow-50 hover:bg-yellow-100 text-amber-900;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
    }

    .definition {
        @apply bg-amber-800 text-yellow-50 border-amber-900 text-xs p-1 text-center leading-tight font-bold;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
        overflow: visible;
        position: relative;
    }

    .definition-section {
        @apply transition-all;
    }

    .definition-section.has-border {
        border-bottom: 2px solid rgba(180, 83, 9, 0.4);
    }

    .definition-text {
        @apply wrap-break-word hyphens-auto;
        word-break: break-word;
        overflow-wrap: break-word;
    }

    .selected {
        @apply bg-orange-200 rounded z-10;
        outline: 2px solid theme("colors.amber.700");
        outline-offset: -2px;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
    }

    .selected.definition {
        @apply bg-orange-100 text-amber-900;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
    }

    .in-selection {
        @apply bg-orange-100;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
    }

    .in-selection.definition {
        @apply bg-amber-700 text-yellow-50;
    }

    /* Bordures pointillées - remplacer complètement la bordure */
    .border-top-dashed {
        border-top-width: 2px !important;
        border-top-style: dashed !important;
        border-top-color: rgba(180, 83, 9, 0.5) !important;
    }

    .border-right-dashed {
        border-right-width: 2px !important;
        border-right-style: dashed !important;
        border-right-color: rgba(180, 83, 9, 0.5) !important;
    }

    .border-bottom-dashed {
        border-bottom-width: 2px !important;
        border-bottom-style: dashed !important;
        border-bottom-color: rgba(180, 83, 9, 0.5) !important;
    }

    .border-left-dashed {
        border-left-width: 2px !important;
        border-left-style: dashed !important;
        border-left-color: rgba(180, 83, 9, 0.5) !important;
    }
</style>

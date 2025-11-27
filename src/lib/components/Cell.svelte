<script lang="ts">
    import type { CellData } from "../store.svelte";
    import { store } from "../store.svelte";
    import StandardCell from "./cell/StandardCell.svelte";
    import DefinitionCell from "./cell/DefinitionCell.svelte";

    let { x, y, data, isSelected, onclick } = $props<{
        x: number;
        y: number;
        data: CellData;
        isSelected: boolean;
        onclick: (x: number, y: number) => void;
    }>();

    let cellElement: HTMLDivElement;

    let isInSelection = $derived(store.isRowOrColumnSelected(x, y));

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
    onclick={(e) => {
        e.stopPropagation();
        if (store.mode !== "preview") store.selectCell(x, y, true);
    }}
    role="textbox"
    tabindex={store.mode === "preview" ? -1 : 0}
    onkeydown={(e) => store.mode !== "preview" && handleKeyDown(e)}
>
    {#if data.type === "definition"}
        <DefinitionCell {data} />
    {:else if store.mode !== "preview"}
        <StandardCell {data} />
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
        @apply p-0 border-amber-900;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .selected {
        @apply bg-orange-200 rounded z-10;
        outline: 2px solid theme("colors.amber.700");
        outline-offset: -2px;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
    }

    .selected.definition {
        @apply bg-transparent;
        box-shadow: none;
    }

    /* Ensure selection outline is visible on top of definition backgrounds */
    .selected.definition::after {
        content: "";
        position: absolute;
        inset: 0;
        border: 2px solid theme("colors.amber.700");
        border-radius: 0.25rem;
        pointer-events: none;
    }

    .in-selection {
        @apply bg-orange-100;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
    }

    .in-selection.definition {
        /* Definition cells keep their background, maybe add an overlay? */
        position: relative;
    }

    .in-selection.definition::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(255, 165, 0, 0.2);
        pointer-events: none;
        z-index: 5;
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

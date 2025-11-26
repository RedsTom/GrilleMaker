<script lang="ts">
    import type { CellData } from "../store.svelte";
    import { store } from "../store.svelte";

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
    onclick={() => store.selectCell(x, y, true)}
    role="textbox"
    tabindex="0"
    onkeydown={handleKeyDown}
>
    {#if data.type === "definition"}
        <div class="w-full h-full flex flex-col relative">
            {#if data.definitions && data.definitions.length > 0}
                {#each data.definitions as def, i}
                    <div
                        class="flex-1 w-full flex flex-col items-center justify-center relative min-h-0 px-0.5 {i <
                        data.definitions.length - 1
                            ? 'border-b border-amber-900/30'
                            : ''}"
                    >
                        <!-- Text -->
                        <span
                            class="text-[0.6rem] leading-[0.7rem] font-bold break-words w-full text-center uppercase tracking-tight"
                        >
                            {def.text}
                        </span>

                        <!-- Arrow -->
                        <div
                            class="absolute flex items-center justify-center text-amber-900 pointer-events-none z-10"
                            class:right-0={def.arrow === "right"}
                            class:bottom-0={def.arrow === "down"}
                            class:left-0={def.arrow === "left"}
                            class:top-0={def.arrow === "up"}
                            class:w-full={def.arrow === "up" ||
                                def.arrow === "down"}
                            class:h-full={def.arrow === "left" ||
                                def.arrow === "right"}
                            style="
                                {def.arrow === 'right' ? 'right: -4px;' : ''}
                                {def.arrow === 'left' ? 'left: -4px;' : ''}
                                {def.arrow === 'up' ? 'top: -4px;' : ''}
                                {def.arrow === 'down' ? 'bottom: -4px;' : ''}
                            "
                        >
                            <div
                                class="absolute flex items-center justify-center bg-amber-800 rounded-full"
                                class:right-0={def.arrow === "right"}
                                class:bottom-0={def.arrow === "down"}
                                class:left-0={def.arrow === "left"}
                                class:top-0={def.arrow === "up"}
                            >
                                {#if def.arrow === "right"}
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="4"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="text-white drop-shadow-sm"
                                        ><path d="M5 12h14" /><path
                                            d="m12 5 7 7-7 7"
                                        /></svg
                                    >
                                {:else if def.arrow === "down"}
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="4"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="text-white drop-shadow-sm"
                                        ><path d="M12 5v14" /><path
                                            d="m19 12-7 7-7-7"
                                        /></svg
                                    >
                                {:else if def.arrow === "left"}
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="4"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="text-white drop-shadow-sm"
                                        ><path d="M19 12H5" /><path
                                            d="m12 19-7-7 7-7"
                                        /></svg
                                    >
                                {:else if def.arrow === "up"}
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="4"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="text-white drop-shadow-sm"
                                        ><path d="M12 19V5" /><path
                                            d="m5 12 7-7 7 7"
                                        /></svg
                                    >
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            {:else}
                <span class="opacity-50 text-xs font-bold">DEF</span>
            {/if}
        </div>
    {:else}
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

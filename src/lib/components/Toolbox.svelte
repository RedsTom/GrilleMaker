<script lang="ts">
    import { store } from "../store.svelte";
    import CellTypeControl from "./CellTypeControl.svelte";
    import BorderControl from "./BorderControl.svelte";
    import DefinitionControl from "./DefinitionControl.svelte";

    let selectedCellData = $derived(
        store.selectedCell
            ? store.grid[store.selectedCell.x][store.selectedCell.y]
            : null,
    );
</script>

<div class="toolbox-container">
    <!-- Cell Properties Section -->
    {#if store.selectedCell && selectedCellData}
        <div class="toolbox-card">
            <div
                class="flex justify-between items-center mb-4 border-b border-orange-200/50 pb-2"
            >
                <h2
                    class="text-sm font-bold text-amber-900 uppercase tracking-wide"
                >
                    Propriétés de la cellule
                </h2>
                <button
                    class="text-xs font-semibold text-amber-700 hover:text-amber-900 hover:bg-orange-200/50 px-2 py-1 rounded transition-colors"
                    onclick={() => store.deselectCell()}
                >
                    Désélectionner
                </button>
            </div>

            <div class="controls-wrapper">
                {#if selectedCellData.type === "standard"}
                    <CellTypeControl {selectedCellData} />
                    <BorderControl {selectedCellData} />
                {:else}
                    <CellTypeControl {selectedCellData} />
                    <DefinitionControl
                        x={store.selectedCell.x}
                        y={store.selectedCell.y}
                        data={selectedCellData}
                    />
                {/if}
            </div>
        </div>
    {/if}

    <!-- Grid Properties Section -->
    <div class="toolbox-card">
        <div
            class="flex justify-between items-center mb-4 border-b border-orange-200/50 pb-2"
        >
            <h2
                class="text-sm font-bold text-amber-900 uppercase tracking-wide"
            >
                Propriétés de la grille
            </h2>
        </div>

        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-4">
                <!-- Lignes -->
                <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold text-amber-800"
                        >Lignes</span
                    >
                    <div
                        class="flex items-center bg-white rounded border border-orange-200 overflow-hidden shadow-sm"
                    >
                        <button
                            class="resize-btn"
                            onclick={() => store.removeRow()}
                            disabled={store.rows <= 1}>-</button
                        >
                        <span
                            class="px-3 py-1 text-sm font-bold text-amber-900 min-w-[32px] text-center"
                        >
                            {store.rows}
                        </span>
                        <button
                            class="resize-btn"
                            onclick={() => store.addRow()}>+</button
                        >
                    </div>
                </div>

                <!-- Colonnes -->
                <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold text-amber-800"
                        >Colonnes</span
                    >
                    <div
                        class="flex items-center bg-white rounded border border-orange-200 overflow-hidden shadow-sm"
                    >
                        <button
                            class="resize-btn"
                            onclick={() => store.removeCol()}
                            disabled={store.cols <= 1}>-</button
                        >
                        <span
                            class="px-3 py-1 text-sm font-bold text-amber-900 min-w-[32px] text-center"
                        >
                            {store.cols}
                        </span>
                        <button
                            class="resize-btn"
                            onclick={() => store.addCol()}>+</button
                        >
                    </div>
                </div>
            </div>

            <div
                class="p-2 bg-orange-100/50 rounded border border-orange-200/50 flex gap-2 items-start"
            >
                <span class="text-amber-600 text-xs mt-0.5">⚠️</span>
                <p class="text-[10px] text-amber-800/80 italic leading-tight">
                    Attention : réduire la taille de la grille supprimera
                    définitivement les cases situées en dehors des nouvelles
                    limites.
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    @reference "tailwindcss";

    .toolbox-container {
        @apply flex flex-col gap-4 w-full p-4;
    }

    .toolbox-card {
        @apply bg-orange-100/80 backdrop-blur-md shadow-sm rounded-lg border border-orange-200 transition-all duration-300 p-4;
    }

    .controls-wrapper {
        @apply flex flex-col gap-4 w-full;
    }

    .resize-btn {
        @apply w-8 h-8 flex items-center justify-center text-amber-700 hover:bg-orange-50 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm;
    }
</style>

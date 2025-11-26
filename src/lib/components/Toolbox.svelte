<script lang="ts">
    import { store } from "../store.svelte";
    import CellTypeControl from "./CellTypeControl.svelte";
    import BorderControl from "./BorderControl.svelte";

    let selectedCellData = $derived(
        store.selectedCell
            ? store.grid[store.selectedCell.x][store.selectedCell.y]
            : null,
    );
</script>

<div
    class="w-80 bg-orange-100/80 backdrop-blur-md shadow p-6 rounded-lg border-2 border-orange-200 h-fit transition-all duration-300"
    style="box-shadow: 0 2px 4px rgba(124, 45, 18, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);"
>
    <h2 class="text-2xl font-bold mb-6 text-amber-900">Boîte à outils</h2>

    {#if store.selectedCell && selectedCellData}
        <div class="space-y-6">
            {#if selectedCellData.type === "standard"}
                <CellTypeControl {selectedCellData} />
                <BorderControl {selectedCellData} />
            {:else}
                <CellTypeControl {selectedCellData} />
            {/if}
        </div>
    {:else}
        <div class="text-amber-700 text-center py-8 italic font-medium">
            Sélectionnez une cellule pour modifier ses propriétés
        </div>
    {/if}
</div>

<style>
    @reference "tailwindcss";
</style>

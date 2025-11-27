<script lang="ts">
    import { store } from "../store.svelte";
    import CellProperties from "./toolbox/CellProperties.svelte";
    import GridProperties from "./toolbox/GridProperties.svelte";

    let selectedCellData = $derived(
        store.selectedCell
            ? store.grid[store.selectedCell.x][store.selectedCell.y]
            : null,
    );
</script>

<div class="toolbox-container">
    <!-- Cell Properties Section -->
    {#if store.selectedCell && selectedCellData}
        <CellProperties {selectedCellData} />
    {/if}

    <!-- Grid Properties Section -->
    <GridProperties />
</div>

<style>
    @reference "tailwindcss";

    .toolbox-container {
        @apply flex flex-col gap-4 w-full p-4;
    }
</style>

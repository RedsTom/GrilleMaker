<script lang="ts">
    import { store } from "../../store.svelte";
    import { X } from "lucide-svelte";
    import type { CellData } from "../../store.svelte";
    import CellTypeControl from "../CellTypeControl.svelte";
    import BorderControl from "../BorderControl.svelte";
    import DefinitionControl from "../DefinitionControl.svelte";

    let { selectedCellData } = $props<{
        selectedCellData: CellData;
    }>();
</script>

<div class="toolbox-card">
    <div
        class="flex justify-between items-center mb-4 border-b border-orange-200/50 pb-2"
    >
        <h2 class="text-sm font-bold text-amber-900 uppercase tracking-wide">
            Propriétés de la cellule
        </h2>
        <button
            class="text-xs font-semibold text-amber-700 hover:text-amber-900 hover:bg-orange-200/50 px-2 py-1 rounded transition-colors flex items-center gap-1"
            onclick={() => store.deselectCell()}
        >
            <X size={12} />
            Désélectionner
        </button>
    </div>

    <div class="controls-wrapper">
        {#if selectedCellData.type === "standard"}
            <CellTypeControl {selectedCellData} />
            <BorderControl {selectedCellData} />
        {:else}
            <CellTypeControl {selectedCellData} />
            {#if store.selectedCell}
                <DefinitionControl
                    x={store.selectedCell.x}
                    y={store.selectedCell.y}
                    data={selectedCellData}
                />
            {/if}
        {/if}
    </div>
</div>

<style>
    @reference "tailwindcss";

    .toolbox-card {
        @apply bg-orange-100/80 backdrop-blur-md shadow-sm rounded-lg border border-orange-200 transition-all duration-300 p-4;
    }

    .controls-wrapper {
        @apply flex flex-col gap-4 w-full;
    }
</style>

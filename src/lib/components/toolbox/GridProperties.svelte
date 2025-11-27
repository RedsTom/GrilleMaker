<script lang="ts">
    import { store } from "../../store.svelte";
    import GridResizer from "./GridResizer.svelte";
</script>

<div class="toolbox-card">
    <div
        class="flex justify-between items-center mb-4 border-b border-orange-200/50 pb-2"
    >
        <h2 class="text-sm font-bold text-amber-900 uppercase tracking-wide">
            Propriétés de la grille
        </h2>
    </div>

    <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
            <GridResizer
                label="Lignes"
                value={store.rows}
                onIncrement={() => store.addRow()}
                onDecrement={() => store.removeRow()}
            />

            <GridResizer
                label="Colonnes"
                value={store.cols}
                onIncrement={() => store.addCol()}
                onDecrement={() => store.removeCol()}
            />
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

<style>
    @reference "tailwindcss";

    .toolbox-card {
        @apply bg-orange-100/80 backdrop-blur-md shadow-sm rounded-lg border border-orange-200 transition-all duration-300 p-4;
    }
</style>

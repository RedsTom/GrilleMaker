<script lang="ts">
    import { store } from "../store.svelte";

    function handlePrint() {
        window.print();
    }
</script>

<div class="preview-controls">
    <div class="control-group">
        <h3 class="group-title">Options d'affichage</h3>

        <label class="toggle-control">
            <input
                type="checkbox"
                bind:checked={store.showSolution}
                class="sr-only peer"
            />
            <div class="toggle-track"></div>
            <span class="toggle-label">Grille de correction</span>
        </label>

        <label class="toggle-control">
            <input
                type="checkbox"
                checked={!store.isColor}
                onchange={(e) => (store.isColor = !e.currentTarget.checked)}
                class="sr-only peer"
            />
            <div class="toggle-track"></div>
            <span class="toggle-label">Mode Noir et Blanc</span>
        </label>
    </div>

    <div class="control-group">
        <h3 class="group-title">Impression</h3>

        <div class="flex flex-col gap-3">
            <button class="action-button primary" onclick={handlePrint}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><polyline points="6 9 6 2 18 2 18 9"></polyline><path
                        d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                    ></path><rect x="6" y="14" width="12" height="8"
                    ></rect></svg
                >
                Imprimer
            </button>

            <div
                class="p-3 bg-orange-100/50 rounded border border-orange-200/50 flex gap-2 items-start"
            >
                <span class="text-amber-600 text-xs mt-0.5">ℹ️</span>
                <p class="text-[11px] text-amber-800/80 leading-tight">
                    Pour exporter en PDF, cliquez sur <strong>Imprimer</strong> puis
                    sélectionnez "Enregistrer au format PDF" comme destination.
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    @reference "tailwindcss";

    .preview-controls {
        @apply flex flex-col gap-4 p-4;
    }

    .control-group {
        @apply flex flex-col gap-3 p-4 bg-orange-100/80 backdrop-blur-md shadow-sm rounded-lg border border-orange-200;
    }

    .group-title {
        @apply text-sm font-bold text-amber-900 uppercase tracking-wide mb-1;
    }

    .toggle-control {
        @apply relative flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-orange-200/50 transition-colors;
    }

    .toggle-track {
        @apply w-11 h-6 bg-orange-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:start-[10px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600;
    }

    .toggle-label {
        @apply text-sm font-medium text-amber-900;
    }

    .action-button {
        @apply flex items-center justify-center gap-2 px-4 py-2 rounded font-bold transition-all duration-200 shadow-sm active:scale-[0.98] text-xs uppercase tracking-wide;
    }

    .action-button.primary {
        @apply bg-amber-100 hover:bg-amber-200 text-amber-800 border border-transparent;
    }
</style>

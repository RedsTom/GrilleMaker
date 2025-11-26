<script lang="ts">
    import { store } from "../store.svelte";
    import { createSwitch } from "svelte-headlessui";

    let { selectedCellData } = $props<{ selectedCellData: any }>();

    const cellTypeSwitch = createSwitch({ checked: false });

    $effect(() => {
        if (selectedCellData) {
            $cellTypeSwitch.checked = selectedCellData.type === "definition";
        }
    });

    function handleSwitchChange(e: Event) {
        if (store.selectedCell) {
            store.toggleCellType(store.selectedCell.x, store.selectedCell.y);
        }
    }
</script>

<div>
    <h3 class="section-label">Type de cellule</h3>
    <div class="flex items-center justify-between">
        <span class="text-amber-900 font-medium">Cellule de définition</span>
        <button
            use:cellTypeSwitch.button
            onclick={handleSwitchChange}
            class="switch-button"
            class:checked={$cellTypeSwitch.checked}
        >
            <span class="sr-only">Activer la cellule de définition</span>
            <span class="switch-knob" class:checked={$cellTypeSwitch.checked} />
        </button>
    </div>
</div>

<style>
    @reference "tailwindcss";

    .section-label {
        @apply text-xs font-bold text-amber-800 uppercase tracking-widest mb-3;
    }

    .switch-button {
        @apply relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 bg-orange-200 cursor-pointer border border-orange-300;
    }

    .switch-button.checked {
        @apply bg-linear-to-r from-amber-600 to-orange-600 border-amber-700;
    }

    .switch-knob {
        @apply inline-block h-5 w-5 transform rounded-full bg-yellow-50 shadow transition-transform duration-300 translate-x-1;
    }

    .switch-knob.checked {
        @apply translate-x-6;
    }
</style>

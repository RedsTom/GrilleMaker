<script lang="ts">
    import { store } from "../store.svelte";
    import Switch from "./ui/Switch.svelte";
    import SectionHeader from "./ui/SectionHeader.svelte";

    let { selectedCellData } = $props<{ selectedCellData: any }>();

    let isDefinition = $state(false);

    $effect(() => {
        if (selectedCellData) {
            isDefinition = selectedCellData.type === "definition";
        }
    });

    function handleChange() {
        if (store.selectedCell) {
            store.toggleCellType(store.selectedCell.x, store.selectedCell.y);
        }
    }
</script>

<div>
    <SectionHeader title="Type de cellule" />
    <div class="flex items-center justify-between">
        <span class="text-amber-900 font-medium">Cellule de définition</span>
        <Switch bind:checked={isDefinition} onchange={handleChange} />
    </div>
</div>

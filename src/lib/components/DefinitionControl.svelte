<script lang="ts">
    import { store } from "../store.svelte";
    import type { CellData, Definition } from "../store.svelte";
    import DefinitionList from "./definitions/DefinitionList.svelte";

    let { x, y, data } = $props<{
        x: number;
        y: number;
        data: CellData;
    }>();

    function addDefinition() {
        store.addDefinition(x, y, {
            text: "",
            direction: "horizontal",
            arrow: "right",
        });
    }

    function removeDefinition(id: string) {
        store.removeDefinition(x, y, id);
    }

    function updateDefinition(id: string, updates: Partial<Definition>) {
        store.updateDefinition(x, y, id, updates);
    }

    function moveDefinition(index: number, direction: "up" | "down") {
        if (!data.definitions) return;

        const newDefs = [...data.definitions];
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex >= 0 && targetIndex < newDefs.length) {
            [newDefs[index], newDefs[targetIndex]] = [
                newDefs[targetIndex],
                newDefs[index],
            ];
            store.setDefinitions(x, y, newDefs);
        }
    }
</script>

<div class="flex flex-col gap-4">
    <h3
        class="font-bold text-amber-900 border-b border-amber-200 pb-2 flex justify-between items-center"
    >
        <span>Définitions</span>
        <span
            class="text-xs font-normal text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full"
        >
            {data.definitions?.length || 0}
        </span>
    </h3>

    <DefinitionList
        definitions={data.definitions || []}
        onUpdate={updateDefinition}
        onMove={moveDefinition}
        onDelete={removeDefinition}
    />

    <button
        onclick={addDefinition}
        class="w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-amber-300 border-dashed hover:border-solid"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M12 5v14" /><path d="M5 12h14" /></svg
        >
        Ajouter une définition
    </button>
</div>

<style>
    @reference "tailwindcss";
</style>

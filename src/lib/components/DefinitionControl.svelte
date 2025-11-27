<script lang="ts">
    import { store } from "../store.svelte";
    import type { CellData, Definition } from "../store.svelte";
    import DefinitionList from "./definitions/DefinitionList.svelte";
    import SectionHeader from "./ui/SectionHeader.svelte";
    import Button from "./ui/Button.svelte";

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
    <SectionHeader
        title="Définitions"
        badge={data.definitions?.length || 0}
        withBorder={true}
    />

    <DefinitionList
        definitions={data.definitions || []}
        onUpdate={updateDefinition}
        onMove={moveDefinition}
        onDelete={removeDefinition}
    />

    <Button
        onclick={addDefinition}
        variant="primary"
        fullWidth={true}
        class="border-dashed hover:border-solid"
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
    </Button>
</div>

<style>
    @reference "tailwindcss";
</style>

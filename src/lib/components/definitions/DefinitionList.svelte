<script lang="ts">
    import type { Definition } from "../../store.svelte";
    import DefinitionItem from "./DefinitionItem.svelte";

    let { definitions, onUpdate, onMove, onDelete } = $props<{
        definitions: Definition[];
        onUpdate: (id: string, updates: Partial<Definition>) => void;
        onMove: (index: number, direction: "up" | "down") => void;
        onDelete: (id: string) => void;
    }>();
</script>

<div class="space-y-4 pr-1">
    {#if definitions && definitions.length > 0}
        {#each definitions as def, index (def.id)}
            <DefinitionItem
                definition={def}
                {index}
                total={definitions.length}
                {onUpdate}
                {onMove}
                {onDelete}
            />
        {/each}
    {:else}
        <div
            class="text-sm text-amber-700/60 italic text-center py-8 border-2 border-dashed border-amber-100 rounded-lg"
        >
            Aucune définition pour cette case
        </div>
    {/if}
</div>

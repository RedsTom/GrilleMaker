<script lang="ts">
    import type { Definition } from "../../store.svelte";

    let { definition, onUpdate } = $props<{
        definition: Definition;
        onUpdate: (updates: Partial<Definition>) => void;
    }>();
</script>

<div class="flex bg-amber-50 p-1 rounded-lg border border-amber-100">
    <button
        class="flex-1 py-1 px-2 text-xs font-medium rounded transition-all flex items-center justify-center gap-2"
        class:bg-white={definition.direction === "horizontal"}
        class:text-amber-900={definition.direction === "horizontal"}
        class:shadow-sm={definition.direction === "horizontal"}
        class:text-amber-600={definition.direction !== "horizontal"}
        class:hover:bg-amber-100={definition.direction !== "horizontal"}
        onclick={() =>
            onUpdate({
                direction: "horizontal",
                arrow: "right",
            })}
    >
        <span>↔ Horizontal</span>
    </button>
    <button
        class="flex-1 py-1 px-2 text-xs font-medium rounded transition-all flex items-center justify-center gap-2"
        class:bg-white={definition.direction === "vertical"}
        class:text-amber-900={definition.direction === "vertical"}
        class:shadow-sm={definition.direction === "vertical"}
        class:text-amber-600={definition.direction !== "vertical"}
        class:hover:bg-amber-100={definition.direction !== "vertical"}
        onclick={() =>
            onUpdate({
                direction: "vertical",
                arrow: "down",
            })}
    >
        <span>↕ Vertical</span>
    </button>
</div>

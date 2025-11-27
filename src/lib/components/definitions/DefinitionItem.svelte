<script lang="ts">
    import type { Definition } from "../../store.svelte";
    import DefinitionTools from "./DefinitionTools.svelte";
    import DefinitionInput from "./DefinitionInput.svelte";
    import FontSizeControl from "./FontSizeControl.svelte";
    import DirectionControl from "./DirectionControl.svelte";
    import ArrowMatrix from "./ArrowMatrix.svelte";

    let { definition, index, total, onUpdate, onMove, onDelete } = $props<{
        definition: Definition;
        index: number;
        total: number;
        onUpdate: (id: string, updates: Partial<Definition>) => void;
        onMove: (index: number, direction: "up" | "down") => void;
        onDelete: (id: string) => void;
    }>();
</script>

<div
    class="p-3 rounded-lg border border-amber-200 bg-white/60 shadow-sm flex flex-col gap-3 transition-all hover:bg-white hover:shadow-md group relative"
>
    <!-- Tools (Move/Delete) -->
    <DefinitionTools
        {index}
        {total}
        onMove={(dir) => onMove(index, dir)}
        onDelete={() => onDelete(definition.id)}
    />

    <!-- 1. Input Text -->
    <DefinitionInput
        {definition}
        onUpdate={(updates) => onUpdate(definition.id, updates)}
    />

    <!-- 1.5 Font Size Slider -->
    <FontSizeControl
        {definition}
        onUpdate={(updates) => onUpdate(definition.id, updates)}
    />

    <!-- 2. Button Group (Horizontal/Vertical) -->
    <DirectionControl
        {definition}
        onUpdate={(updates) => onUpdate(definition.id, updates)}
    />

    <!-- 3. 3x2 Matrix of Buttons -->
    <ArrowMatrix
        {definition}
        onUpdate={(updates) => onUpdate(definition.id, updates)}
    />
</div>

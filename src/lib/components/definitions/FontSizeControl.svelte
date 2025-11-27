<script lang="ts">
    import type { Definition } from "../../store.svelte";

    let { definition, onUpdate } = $props<{
        definition: Definition;
        onUpdate: (updates: Partial<Definition>) => void;
    }>();
</script>

<div
    class="flex items-center gap-2 bg-amber-50 p-2 rounded-lg border border-amber-100"
>
    <span class="text-[10px] font-bold text-amber-700 uppercase w-12"
        >Taille</span
    >
    <input
        type="range"
        min="6"
        max="20"
        step="0.5"
        value={definition.fontSize || 10}
        oninput={(e) =>
            onUpdate({
                fontSize: parseFloat(e.currentTarget.value),
            })}
        class="flex-1 h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
    />
    <span class="text-xs font-mono text-amber-900 w-12 text-right">
        {definition.fontSize || 10}px
    </span>
</div>

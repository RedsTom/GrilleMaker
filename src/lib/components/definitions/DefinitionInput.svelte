<script lang="ts">
    import type { Definition } from "../../store.svelte";

    let { definition, onUpdate } = $props<{
        definition: Definition;
        onUpdate: (updates: Partial<Definition>) => void;
    }>();
</script>

<div>
    <input
        type="text"
        value={definition.text}
        oninput={(e) =>
            onUpdate({
                text: e.currentTarget.value,
            })}
        placeholder="DÉFINITION..."
        class="w-full px-3 py-2 text-xs font-bold text-amber-900 bg-white border-2 border-amber-200 rounded-md hover:border-amber-300 focus:border-amber-500 focus:outline-none transition-colors uppercase placeholder-amber-300/50 shadow-sm"
    />
</div>

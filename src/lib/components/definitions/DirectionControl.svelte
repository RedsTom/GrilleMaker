<script lang="ts">
    import type { Definition } from "../../store.svelte";
    import ToggleButton from "../ui/ToggleButton.svelte";

    let { definition, onUpdate } = $props<{
        definition: Definition;
        onUpdate: (updates: Partial<Definition>) => void;
    }>();
</script>

<div class="flex bg-amber-50 p-1 rounded-lg border border-amber-100">
    <ToggleButton
        checked={definition.direction === "horizontal"}
        onclick={() =>
            onUpdate({
                direction: "horizontal",
                arrow: "right",
            })}
    >
        <span>↔ Horizontal</span>
    </ToggleButton>
    <ToggleButton
        checked={definition.direction === "vertical"}
        onclick={() =>
            onUpdate({
                direction: "vertical",
                arrow: "down",
            })}
    >
        <span>↕ Vertical</span>
    </ToggleButton>
</div>

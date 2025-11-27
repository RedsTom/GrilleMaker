<script lang="ts">
    import type { Definition } from "../../store.svelte";
    import ToggleButton from "../ui/ToggleButton.svelte";
    import { MoveHorizontal, MoveVertical } from "lucide-svelte";

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
        <div class="flex items-center gap-2">
            <MoveHorizontal size={16} />
            <span>Horizontal</span>
        </div>
    </ToggleButton>
    <ToggleButton
        checked={definition.direction === "vertical"}
        onclick={() =>
            onUpdate({
                direction: "vertical",
                arrow: "down",
            })}
    >
        <div class="flex items-center gap-2">
            <MoveVertical size={16} />
            <span>Vertical</span>
        </div>
    </ToggleButton>
</div>

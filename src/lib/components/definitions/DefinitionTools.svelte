<script lang="ts">
    import IconButton from "../ui/IconButton.svelte";
    import { ChevronUp, ChevronDown, Trash2 } from "lucide-svelte";

    let { index, total, onMove, onDelete } = $props<{
        index: number;
        total: number;
        onMove: (direction: "up" | "down") => void;
        onDelete: () => void;
    }>();
</script>

<div class="flex justify-end gap-2 mb-1">
    <IconButton
        onclick={() => onMove("up")}
        disabled={index === 0}
        colorScheme="amber"
        title="Monter"
    >
        <ChevronUp size={14} strokeWidth={3} />
    </IconButton>
    <IconButton
        onclick={() => onMove("down")}
        disabled={index === total - 1}
        colorScheme="amber"
        title="Descendre"
    >
        <ChevronDown size={14} strokeWidth={3} />
    </IconButton>
    <div class="w-px h-5 bg-amber-200 mx-1 self-center"></div>
    <IconButton onclick={onDelete} colorScheme="red" title="Supprimer">
        <Trash2 size={14} />
    </IconButton>
</div>

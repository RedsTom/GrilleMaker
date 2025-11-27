<script lang="ts">
    import IconButton from "../ui/IconButton.svelte";

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
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg
        >
    </IconButton>
    <IconButton
        onclick={() => onMove("down")}
        disabled={index === total - 1}
        colorScheme="amber"
        title="Descendre"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
        >
    </IconButton>
    <div class="w-px h-5 bg-amber-200 mx-1 self-center"></div>
    <IconButton onclick={onDelete} colorScheme="red" title="Supprimer">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg
        >
    </IconButton>
</div>

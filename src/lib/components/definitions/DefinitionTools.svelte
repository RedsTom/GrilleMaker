<script lang="ts">
    let { index, total, onMove, onDelete } = $props<{
        index: number;
        total: number;
        onMove: (direction: "up" | "down") => void;
        onDelete: () => void;
    }>();
</script>

<div class="flex justify-end gap-2 mb-1">
    <button
        onclick={() => onMove("up")}
        disabled={index === 0}
        class="p-1.5 bg-amber-100 text-amber-600 hover:bg-amber-200 hover:text-amber-800 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
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
    </button>
    <button
        onclick={() => onMove("down")}
        disabled={index === total - 1}
        class="p-1.5 bg-amber-100 text-amber-600 hover:bg-amber-200 hover:text-amber-800 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
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
    </button>
    <div class="w-px h-5 bg-amber-200 mx-1 self-center"></div>
    <button
        onclick={onDelete}
        class="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 rounded transition-colors"
        title="Supprimer"
    >
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
    </button>
</div>

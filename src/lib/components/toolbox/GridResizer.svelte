<script lang="ts">
    let {
        label,
        value,
        onIncrement,
        onDecrement,
        min = 1,
    } = $props<{
        label: string;
        value: number;
        onIncrement: () => void;
        onDecrement: () => void;
        min?: number;
    }>();
</script>

<div class="flex items-center justify-between">
    <span class="text-xs font-semibold text-amber-800">{label}</span>
    <div
        class="flex items-center bg-white rounded border border-orange-200 overflow-hidden shadow-sm"
    >
        <button class="resize-btn" onclick={onDecrement} disabled={value <= min}
            >-</button
        >
        <span
            class="px-3 py-1 text-sm font-bold text-amber-900 min-w-[32px] text-center"
        >
            {value}
        </span>
        <button class="resize-btn" onclick={onIncrement}>+</button>
    </div>
</div>

<style>
    @reference "tailwindcss";

    .resize-btn {
        @apply w-8 h-8 flex items-center justify-center text-amber-700 hover:bg-orange-50 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm;
    }
</style>

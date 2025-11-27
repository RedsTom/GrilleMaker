<script lang="ts">
    let {
        label,
        value,
        onIncrement,
        onDecrement,
        min = 1,
        max,
        class: className = "",
    } = $props<{
        label: string;
        value: number;
        onIncrement: () => void;
        onDecrement: () => void;
        min?: number;
        max?: number;
        class?: string;
    }>();
</script>

<div class="number-stepper {className}">
    <span class="stepper-label">{label}</span>
    <div class="stepper-controls">
        <button
            class="stepper-btn"
            onclick={onDecrement}
            disabled={value <= min}
        >
            -
        </button>
        <span class="stepper-value">
            {value}
        </span>
        <button
            class="stepper-btn"
            onclick={onIncrement}
            disabled={max !== undefined && value >= max}
        >
            +
        </button>
    </div>
</div>

<style>
    @reference "tailwindcss";

    .number-stepper {
        @apply flex items-center justify-between;
    }

    .stepper-label {
        @apply text-xs font-semibold text-amber-800;
    }

    .stepper-controls {
        @apply flex items-center bg-white rounded border border-orange-200 overflow-hidden shadow-sm;
    }

    .stepper-btn {
        @apply w-8 h-8 flex items-center justify-center text-amber-700 hover:bg-orange-50 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm;
    }

    .stepper-value {
        @apply px-3 py-1 text-sm font-bold text-amber-900 min-w-[32px] text-center;
    }
</style>

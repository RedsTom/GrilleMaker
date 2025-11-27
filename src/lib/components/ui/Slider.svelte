<script lang="ts">
    let {
        value = $bindable(0),
        min = 0,
        max = 100,
        step = 1,
        label,
        unit = "",
        oninput,
        class: className = "",
    } = $props<{
        value?: number;
        min?: number;
        max?: number;
        step?: number;
        label?: string;
        unit?: string;
        oninput?: (e: Event) => void;
        class?: string;
    }>();

    function handleInput(e: Event) {
        value = parseFloat((e.currentTarget as HTMLInputElement).value);
        oninput?.(e);
    }
</script>

<div class="slider-container {className}">
    {#if label}
        <span class="slider-label">{label}</span>
    {/if}
    <input
        type="range"
        {min}
        {max}
        {step}
        {value}
        oninput={handleInput}
        class="slider-input"
    />
    <span class="slider-value">
        {value}{unit}
    </span>
</div>

<style>
    @reference "tailwindcss";

    .slider-container {
        @apply flex items-center gap-2 bg-amber-50 p-2 rounded-lg border border-amber-100;
    }

    .slider-label {
        @apply text-[10px] font-bold text-amber-700 uppercase w-12;
    }

    .slider-input {
        @apply flex-1 h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600;
    }

    .slider-value {
        @apply text-xs font-mono text-amber-900 w-12 text-right;
    }
</style>

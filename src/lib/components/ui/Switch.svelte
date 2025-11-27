<script lang="ts">
    let {
        checked = $bindable(false),
        label,
        onchange,
        disabled = false,
        class: className = "",
    } = $props<{
        checked?: boolean;
        label?: string;
        onchange?: (e: Event) => void;
        disabled?: boolean;
        class?: string;
    }>();

    function handleChange(e: Event) {
        if (!disabled) {
            checked = (e.target as HTMLInputElement).checked;
            onchange?.(e);
        }
    }
</script>

<label class="switch-container {className}" class:disabled>
    <input
        type="checkbox"
        bind:checked
        onchange={handleChange}
        {disabled}
        class="sr-only peer"
    />
    <div class="switch-track"></div>
    {#if label}
        <span class="switch-label">{label}</span>
    {/if}
</label>

<style>
    @reference "tailwindcss";

    .switch-container {
        @apply relative flex items-center gap-3 cursor-pointer;
    }

    .switch-container.disabled {
        @apply opacity-50 cursor-not-allowed;
    }

    .switch-track {
        @apply w-11 h-6 bg-orange-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600;
    }

    .switch-label {
        @apply text-sm font-medium text-amber-900;
    }
</style>

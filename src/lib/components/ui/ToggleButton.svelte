<script lang="ts">
    let {
        value,
        checked = false,
        onclick,
        children,
        class: className = "",
        ...restProps
    } = $props<{
        value?: string;
        checked?: boolean;
        onclick?: (e: MouseEvent) => void;
        children?: any;
        class?: string;
        [key: string]: any;
    }>();
</script>

<button
    {onclick}
    class="toggle-btn {className}"
    class:active={checked}
    {...restProps}
>
    {@render children?.()}
</button>

<style>
    @reference "tailwindcss";

    .toggle-btn {
        @apply flex-1 py-1 px-2 text-xs font-medium rounded transition-all flex items-center justify-center gap-2 text-amber-600 hover:bg-amber-100;
    }

    .toggle-btn.active {
        @apply bg-white text-amber-900 shadow-sm;
    }
</style>

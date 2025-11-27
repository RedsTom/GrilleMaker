<script lang="ts">
    type ColorScheme = "amber" | "red" | "orange";

    let {
        onclick,
        disabled = false,
        colorScheme = "amber",
        title,
        children,
        class: className = "",
        ...restProps
    } = $props<{
        onclick?: (e: MouseEvent) => void;
        disabled?: boolean;
        colorScheme?: ColorScheme;
        title?: string;
        children?: any;
        class?: string;
        [key: string]: any;
    }>();

    const colorClasses: Record<ColorScheme, string> = {
        amber: "bg-amber-100 text-amber-600 hover:bg-amber-200 hover:text-amber-800",
        red: "bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700",
        orange: "bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-800",
    };
</script>

<button
    {onclick}
    {disabled}
    {title}
    class="icon-btn {colorClasses[colorScheme]} {className}"
    {...restProps}
>
    {@render children?.()}
</button>

<style>
    @reference "tailwindcss";

    .icon-btn {
        @apply p-1.5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center;
    }
</style>

<script lang="ts">
    type Size = "sm" | "md" | "lg";
    type ColorScheme = "amber" | "orange" | "red" | "green";

    let {
        value,
        size = "md",
        colorScheme = "amber",
        children,
        class: className = "",
    } = $props<{
        value?: string | number;
        size?: Size;
        colorScheme?: ColorScheme;
        children?: any;
        class?: string;
    }>();

    const sizeClasses: Record<Size, string> = {
        sm: "text-[10px] px-1.5 py-0.5",
        md: "text-xs px-2 py-0.5",
        lg: "text-sm px-3 py-1",
    };

    const colorClasses: Record<ColorScheme, string> = {
        amber: "text-amber-700 bg-amber-100",
        orange: "text-orange-700 bg-orange-100",
        red: "text-red-700 bg-red-100",
        green: "text-green-700 bg-green-100",
    };
</script>

<span class="badge {sizeClasses[size]} {colorClasses[colorScheme]} {className}">
    {#if value !== undefined}
        {value}
    {:else}
        {@render children?.()}
    {/if}
</span>

<style>
    @reference "tailwindcss";

    .badge {
        @apply font-normal rounded-full inline-block;
    }
</style>

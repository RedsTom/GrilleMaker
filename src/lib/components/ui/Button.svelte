<script lang="ts">
    type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
    type Size = "sm" | "md" | "lg";

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        fullWidth = false,
        onclick,
        children,
        class: className = "",
        ...restProps
    } = $props<{
        variant?: Variant;
        size?: Size;
        disabled?: boolean;
        fullWidth?: boolean;
        onclick?: (e: MouseEvent) => void;
        children?: any;
        class?: string;
        [key: string]: any;
    }>();

    const variantClasses: Record<Variant, string> = {
        primary:
            "bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300",
        secondary:
            "bg-white border border-amber-200 hover:bg-amber-50 text-amber-800",
        outline:
            "bg-transparent border border-amber-300 hover:bg-amber-50 text-amber-700",
        ghost: "bg-transparent hover:bg-amber-100 text-amber-700",
        danger: "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200",
    };

    const sizeClasses: Record<Size, string> = {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-xs",
        lg: "px-6 py-3 text-sm",
    };
</script>

<button
    {onclick}
    {disabled}
    class="btn {variantClasses[variant]} {sizeClasses[size]} {className}"
    class:full-width={fullWidth}
    {...restProps}
>
    {@render children?.()}
</button>

<style>
    @reference "tailwindcss";

    .btn {
        @apply font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-[0.98] uppercase tracking-wide flex items-center justify-center gap-2;
    }

    .btn:disabled {
        @apply opacity-50 cursor-not-allowed;
    }

    .btn.full-width {
        @apply w-full;
    }
</style>

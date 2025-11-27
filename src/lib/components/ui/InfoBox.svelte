<script lang="ts">
    type InfoType = "info" | "warning" | "danger";

    let {
        type = "info",
        children,
        class: className = "",
    } = $props<{
        type?: InfoType;
        children?: any;
        class?: string;
    }>();

    const typeConfig: Record<
        InfoType,
        {
            bgClass: string;
            borderClass: string;
            textClass: string;
            icon: string;
        }
    > = {
        info: {
            bgClass: "bg-orange-100/50",
            borderClass: "border-orange-200/50",
            textClass: "text-amber-800/80",
            icon: "ℹ️",
        },
        warning: {
            bgClass: "bg-orange-100/50",
            borderClass: "border-orange-200/50",
            textClass: "text-amber-800/80",
            icon: "⚠️",
        },
        danger: {
            bgClass: "bg-red-100/50",
            borderClass: "border-red-200/50",
            textClass: "text-red-800/80",
            icon: "🚨",
        },
    };

    const config = typeConfig[type];
</script>

<div class="info-box {config.bgClass} {config.borderClass} {className}">
    <span class="info-icon text-amber-600">{config.icon}</span>
    <div class="info-content {config.textClass}">
        {@render children?.()}
    </div>
</div>

<style>
    @reference "tailwindcss";

    .info-box {
        @apply p-2 rounded border flex gap-2 items-start;
    }

    .info-icon {
        @apply text-xs mt-0.5;
    }

    .info-content {
        @apply text-[10px] leading-tight flex-1;
    }

    .info-content :global(p) {
        @apply text-[10px] leading-tight;
    }

    .info-content :global(strong) {
        @apply font-bold;
    }
</style>

<script lang="ts">
    let {
        title,
        badge,
        withBorder = false,
        children,
        class: className = "",
    } = $props<{
        title?: string;
        badge?: string | number;
        withBorder?: boolean;
        children?: any;
        class?: string;
    }>();
</script>

{#if title || children}
    <div class="section-header {className}" class:with-border={withBorder}>
        {#if title}
            <span class="header-title">{title}</span>
        {:else}
            {@render children?.()}
        {/if}
        {#if badge !== undefined}
            <span class="header-badge">
                {badge}
            </span>
        {/if}
    </div>
{/if}

<style>
    @reference "tailwindcss";

    .section-header {
        @apply text-xs font-bold text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-2;
    }

    .section-header.with-border {
        @apply border-b border-amber-200 pb-2;
    }

    .header-title {
        @apply flex-1;
    }

    .header-badge {
        @apply text-xs font-normal text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full;
    }
</style>

<script lang="ts">
    let {
        children,
        class: className = "",
        ...restProps
    } = $props<{
        children?: any;
        class?: string;
        [key: string]: any;
    }>();
</script>

<div class="card {className}" {...restProps}>
    {@render children?.()}
</div>

<style>
    @reference "tailwindcss";

    .card {
        @apply bg-orange-100/80 backdrop-blur-md shadow-sm rounded-lg border border-orange-200 transition-all duration-300 p-4;
    }
</style>

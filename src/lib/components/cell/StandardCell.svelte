<script lang="ts">
    import type { CellData } from "../../store.svelte";

    let { data } = $props<{
        data: CellData;
    }>();
</script>

<div class="w-full h-full flex items-center justify-center">
    {data.value}
</div>

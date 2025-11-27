<script lang="ts">
    import {store} from "../store.svelte";
    import Cell from "./Cell.svelte";
</script>

<div class="grid-wrapper">
    {#each store.grid as row, i}
        <div class="grid-row">
            {#each row as cellData, j}
                <Cell
                        x={i}
                        y={j}
                        data={cellData}
                        isSelected={store.selectedCell?.x === i &&
                        store.selectedCell?.y === j}
                        onclick={(x, y) => store.selectCell(x, y)}
                />
            {/each}
        </div>
    {/each}
</div>

<style>
  @reference "tailwindcss";

  .grid-wrapper {
    @apply flex flex-col gap-0 border-4 border-amber-800 bg-yellow-50 w-fit rounded-2xl overflow-visible transition-all duration-300;
    box-shadow: 0 12px 24px rgba(124, 45, 18, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(0, 0, 0, 0.05);
    transform: perspective(1000px) rotateX(0.5deg) rotateY(-0.5deg);
    position: relative;
    padding: 12px;
    margin: 20px;
  }

  .grid-row {
    @apply flex gap-0;
    position: relative;
  }
</style>

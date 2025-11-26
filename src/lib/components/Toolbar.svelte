<script lang="ts">
  import { createTabs } from "svelte-headlessui";
  import { store } from "../store.svelte";

  let { isToolbarSticky = false } = $props<{ isToolbarSticky?: boolean }>();

  const tabs = createTabs({ selected: "Édition" });

  $effect(() => {
    store.mode = $tabs.selected === "Édition" ? "edit" : "preview";
  });
</script>

<div class="toolbar-container" class:sticky={isToolbarSticky}>
  <div class="flex items-center gap-4">
    <h1 class="title">Grilleur</h1>
  </div>

  {#if store.mode === "edit"}
    <div
      class="flex items-center gap-6 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200"
    >
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-amber-800 uppercase tracking-widest"
          >Lignes</span
        >
        <div
          class="flex items-center bg-white rounded border border-orange-200 overflow-hidden"
        >
          <button
            class="resize-btn"
            onclick={() => store.removeRow()}
            disabled={store.rows <= 1}>-</button
          >
          <span
            class="px-3 py-1 text-sm font-bold text-amber-900 min-w-8 text-center"
            >{store.rows}</span
          >
          <button class="resize-btn" onclick={() => store.addRow()}>+</button>
        </div>
      </div>
      <div class="w-px h-8 bg-orange-200"></div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-amber-800 uppercase tracking-widest"
          >Colonnes</span
        >
        <div
          class="flex items-center bg-white rounded border border-orange-200 overflow-hidden"
        >
          <button
            class="resize-btn"
            onclick={() => store.removeCol()}
            disabled={store.cols <= 1}>-</button
          >
          <span
            class="px-3 py-1 text-sm font-bold text-amber-900 min-w-8 text-center"
            >{store.cols}</span
          >
          <button class="resize-btn" onclick={() => store.addCol()}>+</button>
        </div>
      </div>
    </div>
  {/if}

  <div use:tabs.list class="tabs-list">
    {#each ["Édition", "Aperçu"] as category}
      {@const selected = $tabs.selected === category}
      <button
        use:tabs.tab={{ value: category }}
        class="tab-button"
        class:active={selected}
      >
        {category}
      </button>
    {/each}
  </div>
</div>

<style>
  @reference "tailwindcss";

  .toolbar-container {
    @apply flex justify-between items-center p-6 bg-orange-100/80 backdrop-blur shadow rounded-lg mb-8 border-2 border-orange-200 transition-all duration-300;
    box-shadow:
      0 2px 4px rgba(124, 45, 18, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }

  .title {
    @apply text-3xl font-bold text-amber-900 tracking-tight;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
  }

  .tabs-list {
    @apply flex space-x-2 rounded-lg bg-orange-50 p-1.5 border border-orange-200;
  }

  .tab-button {
    @apply w-full rounded py-2.5 px-6 text-sm font-semibold leading-5 transition-all duration-200 outline-none text-amber-700 hover:text-amber-900 hover:bg-orange-100/50;
  }

  .tab-button.active {
    @apply bg-white text-amber-900 shadow border border-orange-100 font-bold;
  }

  .resize-btn {
    @apply w-8 h-8 flex items-center justify-center text-amber-700 hover:bg-orange-100 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .toolbar-container.sticky {
    @apply rounded-t-none;
  }
</style>

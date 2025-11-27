<script lang="ts">
  import { createTabs } from "svelte-headlessui";
  import { store } from "../store.svelte";

  const tabs = createTabs({ selected: "Édition" });

  $effect(() => {
    store.mode = $tabs.selected === "Édition" ? "edit" : "preview";
  });
</script>

<div class="toolbar-container">
  <div class="flex items-center gap-6">
    <h1 class="title">Grilleur</h1>

    {#if store.mode === "edit"}
      <!-- Controls moved to Toolbox -->
    {/if}
  </div>

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
    @apply flex justify-between items-center px-6 py-3 bg-orange-100/90 backdrop-blur shadow-sm rounded-lg border border-orange-200 transition-all duration-300;
  }

  .title {
    @apply text-xl font-bold text-amber-900 tracking-tight;
  }

  .tabs-list {
    @apply flex space-x-1 rounded-md bg-orange-50 p-1 border border-orange-200;
  }

  .tab-button {
    @apply rounded py-1.5 px-4 text-xs font-semibold leading-4 transition-all duration-200 outline-none text-amber-700 hover:text-amber-900 hover:bg-orange-100/50;
  }

  .tab-button.active {
    @apply bg-white text-amber-900 shadow-sm border border-orange-100 font-bold;
  }
</style>

<script lang="ts">
    import { store } from "../store.svelte";
    import type { CellData, Definition } from "../store.svelte";

    let { x, y, data } = $props<{
        x: number;
        y: number;
        data: CellData;
    }>();

    let editingId = $state<string | null>(null);
    let newDefText = $state("");
    let newDefDirection = $state<"horizontal" | "vertical">("horizontal");
    let newDefArrow = $state<"left" | "right" | "up" | "down">("right");

    function resetForm() {
        editingId = null;
        newDefText = "";
        newDefDirection = "horizontal";
        newDefArrow = "right";
    }

    function startEditing(def: Definition) {
        editingId = def.id;
        newDefText = def.text;
        newDefDirection = def.direction;
        newDefArrow = def.arrow;
    }

    function saveDefinition() {
        if (!newDefText.trim()) return;

        if (editingId) {
            store.updateDefinition(x, y, editingId, {
                text: newDefText,
                direction: newDefDirection,
                arrow: newDefArrow,
            });
        } else {
            store.addDefinition(x, y, {
                text: newDefText,
                direction: newDefDirection,
                arrow: newDefArrow,
            });
        }
        resetForm();
    }

    function removeDefinition(id: string) {
        store.removeDefinition(x, y, id);
        if (editingId === id) {
            resetForm();
        }
    }
</script>

<div class="flex flex-col gap-4">
    <h3 class="font-bold text-amber-900 border-b border-amber-200 pb-2">
        Définitions
    </h3>
    <!-- Liste des définitions existantes -->
    <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
        {#if data.definitions && data.definitions.length > 0}
            {#each data.definitions as def (def.id)}
                <div
                    class="p-3 rounded-lg border shadow-sm flex flex-col gap-2 group transition-all cursor-pointer relative {editingId ===
                    def.id
                        ? 'bg-amber-100 border-amber-400'
                        : 'bg-white/60 border-amber-200 hover:bg-white/80'}"
                    onclick={() => startEditing(def)}
                >
                    <div class="flex justify-between items-start gap-2">
                        <span
                            class="text-sm font-medium text-amber-900 break-words leading-tight uppercase"
                            >{def.text}</span
                        >
                        <button
                            onclick={(e) => {
                                e.stopPropagation();
                                removeDefinition(def.id);
                            }}
                            class="text-amber-400 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                            title="Supprimer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><path d="M18 6 6 18" /><path
                                    d="m6 6 18 18"
                                /></svg
                            >
                        </button>
                    </div>
                    <div
                        class="flex items-center gap-3 text-xs text-amber-700 bg-amber-50/50 p-1.5 rounded"
                    >
                        <div
                            class="flex items-center gap-1"
                            title="Direction du mot"
                        >
                            <span class="opacity-50">Mot:</span>
                            <span class="font-bold"
                                >{def.direction === "horizontal"
                                    ? "↔"
                                    : "↕"}</span
                            >
                        </div>
                        <div class="w-px h-3 bg-amber-200"></div>
                        <div
                            class="flex items-center gap-1"
                            title="Position de la flèche"
                        >
                            <span class="opacity-50">Flèche:</span>
                            <span class="font-bold">
                                {#if def.arrow === "left"}←{/if}
                                {#if def.arrow === "right"}→{/if}
                                {#if def.arrow === "up"}↑{/if}
                                {#if def.arrow === "down"}↓{/if}
                            </span>
                        </div>
                    </div>

                    {#if editingId === def.id}
                        <div
                            class="absolute -right-1 -top-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse"
                        ></div>
                    {/if}
                </div>
            {/each}
        {:else}
            <div class="text-sm text-amber-700/60 italic text-center py-2">
                Aucune définition
            </div>
        {/if}
    </div>

    <!-- Formulaire d'ajout/édition -->
    <div
        class="flex flex-col gap-3 p-3 bg-amber-50/50 rounded-lg border border-amber-200 shadow-inner"
    >
        <div class="flex justify-between items-center">
            <span
                class="text-xs font-bold text-amber-800 uppercase tracking-wider"
            >
                {editingId ? "Modifier la définition" : "Nouvelle définition"}
            </span>
            {#if editingId}
                <button
                    onclick={resetForm}
                    class="text-xs text-amber-600 hover:text-amber-800 underline"
                    >Annuler</button
                >
            {/if}
        </div>

        <div class="flex flex-col gap-1">
            <label
                class="text-[10px] font-bold text-amber-700/70 uppercase tracking-wider"
                >Texte</label
            >
            <input
                type="text"
                bind:value={newDefText}
                placeholder="Ex: CAPITALE..."
                class="w-full px-3 py-2 text-sm border border-amber-200 rounded bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all uppercase"
                onkeydown={(e) => e.key === "Enter" && saveDefinition()}
            />
        </div>

        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
                <label
                    class="text-[10px] font-bold text-amber-700/70 uppercase tracking-wider"
                    >Direction du mot</label
                >
                <div
                    class="flex bg-white rounded border border-amber-200 p-0.5"
                >
                    <button
                        class="flex-1 py-1 text-xs font-medium rounded transition-colors flex items-center justify-center gap-1"
                        class:bg-amber-100={newDefDirection === "horizontal"}
                        class:text-amber-900={newDefDirection === "horizontal"}
                        class:text-amber-500={newDefDirection !== "horizontal"}
                        onclick={() => (newDefDirection = "horizontal")}
                    >
                        <span>↔</span> Horizontal
                    </button>
                    <button
                        class="flex-1 py-1 text-xs font-medium rounded transition-colors flex items-center justify-center gap-1"
                        class:bg-amber-100={newDefDirection === "vertical"}
                        class:text-amber-900={newDefDirection === "vertical"}
                        class:text-amber-500={newDefDirection !== "vertical"}
                        onclick={() => (newDefDirection = "vertical")}
                    >
                        <span>↕</span> Vertical
                    </button>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <label
                    class="text-[10px] font-bold text-amber-700/70 uppercase tracking-wider"
                    >Position de la flèche</label
                >
                <div class="grid grid-cols-4 gap-1">
                    <button
                        class="py-1.5 rounded border transition-all flex items-center justify-center"
                        class:bg-amber-100={newDefArrow === "left"}
                        class:border-amber-400={newDefArrow === "left"}
                        class:text-amber-900={newDefArrow === "left"}
                        class:bg-white={newDefArrow !== "left"}
                        class:border-amber-200={newDefArrow !== "left"}
                        class:text-amber-500={newDefArrow !== "left"}
                        onclick={() => (newDefArrow = "left")}
                        title="Gauche">←</button
                    >
                    <button
                        class="py-1.5 rounded border transition-all flex items-center justify-center"
                        class:bg-amber-100={newDefArrow === "up"}
                        class:border-amber-400={newDefArrow === "up"}
                        class:text-amber-900={newDefArrow === "up"}
                        class:bg-white={newDefArrow !== "up"}
                        class:border-amber-200={newDefArrow !== "up"}
                        class:text-amber-500={newDefArrow !== "up"}
                        onclick={() => (newDefArrow = "up")}
                        title="Haut">↑</button
                    >
                    <button
                        class="py-1.5 rounded border transition-all flex items-center justify-center"
                        class:bg-amber-100={newDefArrow === "down"}
                        class:border-amber-400={newDefArrow === "down"}
                        class:text-amber-900={newDefArrow === "down"}
                        class:bg-white={newDefArrow !== "down"}
                        class:border-amber-200={newDefArrow !== "down"}
                        class:text-amber-500={newDefArrow !== "down"}
                        onclick={() => (newDefArrow = "down")}
                        title="Bas">↓</button
                    >
                    <button
                        class="py-1.5 rounded border transition-all flex items-center justify-center"
                        class:bg-amber-100={newDefArrow === "right"}
                        class:border-amber-400={newDefArrow === "right"}
                        class:text-amber-900={newDefArrow === "right"}
                        class:bg-white={newDefArrow !== "right"}
                        class:border-amber-200={newDefArrow !== "right"}
                        class:text-amber-500={newDefArrow !== "right"}
                        onclick={() => (newDefArrow = "right")}
                        title="Droite">→</button
                    >
                </div>
            </div>
        </div>

        <button
            onclick={saveDefinition}
            disabled={!newDefText.trim()}
            class="mt-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-2 px-4 rounded shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center gap-2"
        >
            {#if editingId}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="M12 20h9" /><path
                        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
                    /></svg
                >
                Modifier
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="M5 12h14" /><path d="M12 5v14" /></svg
                >
                Ajouter
            {/if}
        </button>
    </div>
</div>

<style>
    @reference "tailwindcss";
</style>

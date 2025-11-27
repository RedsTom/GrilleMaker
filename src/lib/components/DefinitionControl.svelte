<script lang="ts">
    import { store } from "../store.svelte";
    import type { CellData, Definition, ArrowDirection } from "../store.svelte";
    import Arrow from "./Arrow.svelte";

    let { x, y, data } = $props<{
        x: number;
        y: number;
        data: CellData;
    }>();

    function addDefinition() {
        store.addDefinition(x, y, {
            text: "",
            direction: "horizontal",
            arrow: "right",
        });
    }

    function removeDefinition(id: string) {
        store.removeDefinition(x, y, id);
    }

    function updateDefinition(id: string, updates: Partial<Definition>) {
        store.updateDefinition(x, y, id, updates);
    }

    function moveDefinition(index: number, direction: "up" | "down") {
        if (!data.definitions) return;

        const newDefs = [...data.definitions];
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex >= 0 && targetIndex < newDefs.length) {
            [newDefs[index], newDefs[targetIndex]] = [
                newDefs[targetIndex],
                newDefs[index],
            ];
            store.setDefinitions(x, y, newDefs);
        }
    }

    function getArrowMatrix(dir: "horizontal" | "vertical") {
        if (dir === "vertical") {
            return [
                ["left-up", "up", "right-up"] as ArrowDirection[],
                ["left-down", "down", "right-down"] as ArrowDirection[],
            ];
        } else {
            return [
                ["up-left", "left", "down-left"] as ArrowDirection[],
                ["up-right", "right", "down-right"] as ArrowDirection[],
            ];
        }
    }
</script>

<div class="flex flex-col gap-4">
    <h3
        class="font-bold text-amber-900 border-b border-amber-200 pb-2 flex justify-between items-center"
    >
        <span>Définitions</span>
        <span
            class="text-xs font-normal text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full"
        >
            {data.definitions?.length || 0}
        </span>
    </h3>

    <div class="space-y-4 max-h-[500px] overflow-y-auto pr-1">
        {#if data.definitions && data.definitions.length > 0}
            {#each data.definitions as def, index (def.id)}
                <div
                    class="p-3 rounded-lg border border-amber-200 bg-white/60 shadow-sm flex flex-col gap-3 transition-all hover:bg-white hover:shadow-md group relative"
                >
                    <!-- Tools (Move/Delete) -->
                    <div class="flex justify-end gap-2 mb-1">
                        <button
                            onclick={() => moveDefinition(index, "up")}
                            disabled={index === 0}
                            class="p-1.5 bg-amber-100 text-amber-600 hover:bg-amber-200 hover:text-amber-800 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                            title="Monter"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><path d="m18 15-6-6-6 6" /></svg
                            >
                        </button>
                        <button
                            onclick={() => moveDefinition(index, "down")}
                            disabled={index ===
                                (data.definitions?.length || 0) - 1}
                            class="p-1.5 bg-amber-100 text-amber-600 hover:bg-amber-200 hover:text-amber-800 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                            title="Descendre"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><path d="m6 9 6 6 6-6" /></svg
                            >
                        </button>
                        <div
                            class="w-px h-5 bg-amber-200 mx-1 self-center"
                        ></div>
                        <button
                            onclick={() => removeDefinition(def.id)}
                            class="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 rounded transition-colors"
                            title="Supprimer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
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

                    <!-- 1. Input Text -->
                    <div>
                        <input
                            type="text"
                            value={def.text}
                            oninput={(e) =>
                                updateDefinition(def.id, {
                                    text: e.currentTarget.value,
                                })}
                            placeholder="DÉFINITION..."
                            class="w-full px-3 py-2 text-xs font-bold text-amber-900 bg-white border-2 border-amber-200 rounded-md hover:border-amber-300 focus:border-amber-500 focus:outline-none transition-colors uppercase placeholder-amber-300/50 shadow-sm"
                        />
                    </div>

                    <!-- 2. Button Group (Horizontal/Vertical) -->
                    <div
                        class="flex bg-amber-50 p-1 rounded-lg border border-amber-100"
                    >
                        <button
                            class="flex-1 py-1 px-2 text-xs font-medium rounded transition-all flex items-center justify-center gap-2"
                            class:bg-white={def.direction === "horizontal"}
                            class:text-amber-900={def.direction ===
                                "horizontal"}
                            class:shadow-sm={def.direction === "horizontal"}
                            class:text-amber-600={def.direction !==
                                "horizontal"}
                            class:hover:bg-amber-100={def.direction !==
                                "horizontal"}
                            onclick={() =>
                                updateDefinition(def.id, {
                                    direction: "horizontal",
                                    arrow: "right",
                                })}
                        >
                            <span>↔ Horizontal</span>
                        </button>
                        <button
                            class="flex-1 py-1 px-2 text-xs font-medium rounded transition-all flex items-center justify-center gap-2"
                            class:bg-white={def.direction === "vertical"}
                            class:text-amber-900={def.direction === "vertical"}
                            class:shadow-sm={def.direction === "vertical"}
                            class:text-amber-600={def.direction !== "vertical"}
                            class:hover:bg-amber-100={def.direction !==
                                "vertical"}
                            onclick={() =>
                                updateDefinition(def.id, {
                                    direction: "vertical",
                                    arrow: "down",
                                })}
                        >
                            <span>↕ Vertical</span>
                        </button>
                    </div>

                    <!-- 3. 3x2 Matrix of Buttons -->
                    <div class="grid grid-cols-3 gap-1.5">
                        {#each getArrowMatrix(def.direction) as row}
                            {#each row as arrow}
                                <button
                                    class="arrow-btn-preview"
                                    class:active={def.arrow === arrow}
                                    onclick={() =>
                                        updateDefinition(def.id, { arrow })}
                                    title={arrow}
                                >
                                    <div class="arrow-preview-container">
                                        <Arrow direction={arrow} />
                                    </div>
                                </button>
                            {/each}
                        {/each}
                    </div>
                </div>
            {/each}
        {:else}
            <div
                class="text-sm text-amber-700/60 italic text-center py-8 border-2 border-dashed border-amber-100 rounded-lg"
            >
                Aucune définition pour cette case
            </div>
        {/if}
    </div>

    <button
        onclick={addDefinition}
        class="w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-amber-300 border-dashed hover:border-solid"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M12 5v14" /><path d="M5 12h14" /></svg
        >
        Ajouter une définition
    </button>
</div>

<style>
    @reference "tailwindcss";

    .arrow-btn-preview {
        @apply py-1 px-1 rounded border transition-all flex items-center justify-center relative h-8;
        @apply bg-white border-amber-100 text-amber-300;
        @apply hover:bg-amber-50 hover:border-amber-300 hover:text-amber-500;
    }

    .arrow-btn-preview.active {
        @apply bg-amber-100 border-amber-400 text-amber-900;
        box-shadow: inset 0 1px 2px rgba(180, 83, 9, 0.1);
    }

    .arrow-preview-container {
        @apply relative w-full h-full flex items-center justify-center;
    }

    /* Fix alignment by overriding Arrow component styles */
    .arrow-preview-container :global(.arrow-container) {
        position: relative !important;
        top: auto !important;
        left: auto !important;
        right: auto !important;
        bottom: auto !important;
        transform: none !important;
        width: 100% !important;
        height: 100% !important;
    }
</style>

<script lang="ts">
    import { store } from "../store.svelte";
    import SectionHeader from "./ui/SectionHeader.svelte";

    let { selectedCellData } = $props<{ selectedCellData: any }>();

    function toggleBorder(side: "top" | "right" | "bottom" | "left") {
        if (store.selectedCell && selectedCellData?.type === "standard") {
            const currentStyle = store.getBorderStyle(
                store.selectedCell.x,
                store.selectedCell.y,
                side,
            );
            const newStyle = currentStyle === "solid" ? "dashed" : "solid";
            store.setBorderStyle(
                store.selectedCell.x,
                store.selectedCell.y,
                side,
                newStyle,
            );
        }
    }

    function getButtonClass(side: "top" | "right" | "bottom" | "left") {
        if (!store.selectedCell || selectedCellData?.type === "definition")
            return "bg-gray-300 cursor-not-allowed";
        const style = store.getBorderStyle(
            store.selectedCell.x,
            store.selectedCell.y,
            side,
        );
        return style === "dashed" ? "bg-orange-500" : "bg-amber-500";
    }

    function getPreviewStyle(side: "top" | "right" | "bottom" | "left") {
        if (!store.selectedCell) return "solid";
        const style = store.getBorderStyle(
            store.selectedCell.x,
            store.selectedCell.y,
            side,
        );
        return style === "dashed" ? "dashed" : "solid";
    }
</script>

<div>
    <SectionHeader title="Bordures" />

    <div class="space-y-4">
        <div
            class="flex justify-center p-4 bg-yellow-50 rounded-lg border-2 border-orange-200"
        >
            <div
                class="grid gap-1"
                style="grid-template-columns: 1rem 3rem 1rem; grid-template-rows: 1rem 3rem 1rem;"
            >
                <!-- Row 1 -->
                <div></div>
                <button
                    class="w-full h-full rounded-sm transition-colors {getButtonClass(
                        'top',
                    )}"
                    onclick={() => toggleBorder("top")}
                    aria-label="Bordure haut"
                ></button>
                <div></div>

                <!-- Row 2 -->
                <button
                    class="w-full h-full rounded-sm transition-colors {getButtonClass(
                        'left',
                    )}"
                    onclick={() => toggleBorder("left")}
                    aria-label="Bordure gauche"
                ></button>

                <div
                    class="w-full h-full bg-white border-amber-900"
                    style="
                        border-top-width: 2px; border-top-style: {getPreviewStyle(
                        'top',
                    )};
                        border-right-width: 2px; border-right-style: {getPreviewStyle(
                        'right',
                    )};
                        border-bottom-width: 2px; border-bottom-style: {getPreviewStyle(
                        'bottom',
                    )};
                        border-left-width: 2px; border-left-style: {getPreviewStyle(
                        'left',
                    )};
                    "
                ></div>

                <button
                    class="w-full h-full rounded-sm transition-colors {getButtonClass(
                        'right',
                    )}"
                    onclick={() => toggleBorder("right")}
                    aria-label="Bordure droite"
                ></button>

                <!-- Row 3 -->
                <div></div>
                <button
                    class="w-full h-full rounded-sm transition-colors {getButtonClass(
                        'bottom',
                    )}"
                    onclick={() => toggleBorder("bottom")}
                    aria-label="Bordure bas"
                ></button>
                <div></div>
            </div>
        </div>

        <div class="flex justify-center gap-6 text-xs">
            <div class="flex items-center gap-2">
                <div
                    class="w-4 h-4 rounded border-2 bg-amber-500 border-amber-600"
                ></div>
                <span>Normal</span>
            </div>
            <div class="flex items-center gap-2">
                <div
                    class="w-4 h-4 rounded border-2 bg-orange-500 border-orange-600"
                ></div>
                <span>Pointillés</span>
            </div>
        </div>
    </div>
</div>

<style>
    @reference "tailwindcss";
</style>

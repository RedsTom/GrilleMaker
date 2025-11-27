<script lang="ts">
    import { store } from "../../store.svelte";
    import GridResizer from "./GridResizer.svelte";
    import Card from "../ui/Card.svelte";
    import SectionHeader from "../ui/SectionHeader.svelte";
    import Button from "../ui/Button.svelte";
    import InfoBox from "../ui/InfoBox.svelte";

    async function handleSave() {
        const json = store.exportState();
        try {
            // @ts-ignore - File System Access API
            if (window.showSaveFilePicker) {
                // @ts-ignore
                const handle = await window.showSaveFilePicker({
                    suggestedName: "grille.gm",
                    types: [
                        {
                            description: "Fichier GrilleMaker",
                            accept: { "application/json": [".gm"] },
                        },
                    ],
                });
                const writable = await handle.createWritable();
                await writable.write(json);
                await writable.close();
            } else {
                // Fallback
                const blob = new Blob([json], {
                    type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "grille.gm";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        } catch (err: any) {
            if (err.name !== "AbortError") {
                console.error("Failed to save file:", err);
            }
        }
    }

    function handleLoad() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".gm,.json";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target?.result as string;
                    store.importState(content);
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
</script>

<Card>
    <SectionHeader title="Propriétés de la grille" withBorder={true} />

    <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
            <GridResizer
                label="Lignes"
                value={store.rows}
                onIncrement={() => store.addRow()}
                onDecrement={() => store.removeRow()}
            />

            <GridResizer
                label="Colonnes"
                value={store.cols}
                onIncrement={() => store.addCol()}
                onDecrement={() => store.removeCol()}
            />
        </div>

        <InfoBox type="warning">
            <p class="italic">
                Attention : réduire la taille de la grille supprimera
                définitivement les cases situées en dehors des nouvelles
                limites.
            </p>
        </InfoBox>

        <div class="flex gap-2 pt-2 border-t border-orange-200/50">
            <Button
                variant="primary"
                size="sm"
                onclick={handleSave}
                class="flex-1"
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
                    ><path
                        d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                    /><polyline points="17 21 17 13 7 13 7 21" /><polyline
                        points="7 3 7 8 15 8"
                    /></svg
                >
                Sauvegarder
            </Button>
            <Button
                variant="secondary"
                size="sm"
                onclick={handleLoad}
                class="flex-1"
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
                    ><path
                        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    /><polyline points="7 10 12 15 17 10" /><line
                        x1="12"
                        x2="12"
                        y1="15"
                        y2="3"
                    /></svg
                >
                Importer
            </Button>
        </div>
    </div>
</Card>

<style>
    @reference "tailwindcss";
</style>

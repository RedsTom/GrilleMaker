<script lang="ts">
    import { store } from "../store.svelte";
    import { Printer, Eye, Moon } from "lucide-svelte";
    import Card from "./ui/Card.svelte";
    import Switch from "./ui/Switch.svelte";
    import Button from "./ui/Button.svelte";
    import InfoBox from "./ui/InfoBox.svelte";
    import SectionHeader from "./ui/SectionHeader.svelte";

    let blackAndWhite = $state(!store.isColor);

    $effect(() => {
        blackAndWhite = !store.isColor;
    });

    function handleBlackAndWhiteChange() {
        store.isColor = !blackAndWhite;
    }

    function handlePrint() {
        window.print();
    }
</script>

<div class="preview-controls">
    <Card>
        <SectionHeader title="Options d'affichage" />

        <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
                <span
                    class="text-amber-900 font-medium flex items-center gap-2"
                >
                    <Eye size={16} />
                    Grille de correction
                </span>
                <Switch bind:checked={store.showSolution} />
            </div>

            <div class="flex items-center justify-between">
                <span
                    class="text-amber-900 font-medium flex items-center gap-2"
                >
                    <Moon size={16} />
                    Mode Noir et Blanc
                </span>
                <Switch
                    bind:checked={blackAndWhite}
                    onchange={handleBlackAndWhiteChange}
                />
            </div>
        </div>
    </Card>

    <Card>
        <SectionHeader title="Impression" />

        <div class="flex flex-col gap-3">
            <Button onclick={handlePrint} variant="primary" fullWidth={true}>
                <Printer size={16} />
                Imprimer
            </Button>

            <InfoBox type="info">
                <p>
                    Pour exporter en PDF, cliquez sur <strong>Imprimer</strong> puis
                    sélectionnez "Enregistrer au format PDF" comme destination.
                </p>
            </InfoBox>
        </div>
    </Card>
</div>

<style>
    @reference "tailwindcss";

    .preview-controls {
        @apply flex flex-col gap-4 p-4;
    }
</style>

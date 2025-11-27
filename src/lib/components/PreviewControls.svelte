<script lang="ts">
    import { store } from "../store.svelte";
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
                <span class="text-amber-900 font-medium"
                    >Grille de correction</span
                >
                <Switch bind:checked={store.showSolution} />
            </div>

            <div class="flex items-center justify-between">
                <span class="text-amber-900 font-medium"
                    >Mode Noir et Blanc</span
                >
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
                    ><polyline points="6 9 6 2 18 2 18 9"></polyline><path
                        d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                    ></path><rect x="6" y="14" width="12" height="8"
                    ></rect></svg
                >
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

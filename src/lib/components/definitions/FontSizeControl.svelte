<script lang="ts">
    import type { Definition } from "../../store.svelte";
    import Slider from "../ui/Slider.svelte";

    let { definition, onUpdate } = $props<{
        definition: Definition;
        onUpdate: (updates: Partial<Definition>) => void;
    }>();

    let fontSize = $state(definition.fontSize || 10);

    $effect(() => {
        fontSize = definition.fontSize || 10;
    });

    function handleInput() {
        onUpdate({ fontSize });
    }
</script>

<Slider
    bind:value={fontSize}
    min={6}
    max={20}
    step={0.5}
    label="Taille"
    unit="px"
    oninput={handleInput}
/>

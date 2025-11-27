<script lang="ts">
    import type { ArrowDirection } from "../store.svelte";

    let {
        direction,
        sectionIndex = 0,
        totalSections = 1,
    } = $props<{
        direction: ArrowDirection;
        sectionIndex?: number;
        totalSections?: number;
    }>();

    // Calculer la position verticale en pourcentage pour cette section
    const sectionHeight = 100 / totalSections;
    const centerY = sectionHeight * (sectionIndex + 0.5);

    // Configurations pour chaque direction de flèche pliée
    const arrowConfigs: Record<
        ArrowDirection,
        { path: string; getPosition: () => string; viewBox: string }
    > = {
        // Flèches courbées
        "up-right": {
            path: "M 8 16 L 8 8 L 16 8 M 13 5 L 16 8 L 13 11",
            getPosition: () =>
                `top: -16px; left: 50%; transform: translateX(-50%);`,
            viewBox: "0 0 20 20",
        },
        "up-left": {
            path: "M 12 16 L 12 8 L 4 8 M 7 5 L 4 8 L 7 11",
            getPosition: () =>
                `top: -16px; left: 50%; transform: translateX(-50%);`,
            viewBox: "0 0 20 20",
        },
        "down-right": {
            path: "M 8 4 L 8 12 L 16 12 M 13 9 L 16 12 L 13 15",
            getPosition: () =>
                `bottom: -18px; left: 50%; transform: translateX(-50%);`,
            viewBox: "0 0 20 20",
        },
        "down-left": {
            path: "M 12 4 L 12 12 L 4 12 M 7 9 L 4 12 L 7 15",
            getPosition: () =>
                `bottom: -18px; left: 50%; transform: translateX(-50%);`,
            viewBox: "0 0 20 20",
        },
        "right-down": {
            path: "M 4 8 L 12 8 L 12 16 M 9 13 L 12 16 L 15 13",
            getPosition: () =>
                `right: -18px; top: ${centerY}%; transform: translateY(-50%);`,
            viewBox: "0 0 20 20",
        },
        "right-up": {
            path: "M 4 12 L 12 12 L 12 4 M 9 7 L 12 4 L 15 7",
            getPosition: () =>
                `right: -18px; top: ${centerY}%; transform: translateY(-50%);`,
            viewBox: "0 0 20 20",
        },
        "left-down": {
            path: "M 16 8 L 8 8 L 8 16 M 11 13 L 8 16 L 5 13",
            getPosition: () =>
                `left: -18px; top: ${centerY}%; transform: translateY(-50%);`,
            viewBox: "0 0 20 20",
        },
        "left-up": {
            path: "M 16 12 L 8 12 L 8 4 M 11 7 L 8 4 L 5 7",
            getPosition: () =>
                `left: -18px; top: ${centerY}%; transform: translateY(-50%);`,
            viewBox: "0 0 20 20",
        },
        // Flèches droites
        up: {
            path: "M 10 16 L 10 4 M 7 7 L 10 4 L 13 7",
            getPosition: () =>
                `top: -16px; left: 50%; transform: translateX(-50%);`,
            viewBox: "0 0 20 20",
        },
        down: {
            path: "M 10 4 L 10 16 M 7 13 L 10 16 L 13 13",
            getPosition: () =>
                `bottom: -18px; left: 50%; transform: translateX(-50%);`,
            viewBox: "0 0 20 20",
        },
        left: {
            path: "M 16 10 L 4 10 M 7 7 L 4 10 L 7 13",
            getPosition: () =>
                `left: -18px; top: ${centerY}%; transform: translateY(-50%);`,
            viewBox: "0 0 20 20",
        },
        right: {
            path: "M 4 10 L 16 10 M 13 7 L 16 10 L 13 13",
            getPosition: () =>
                `right: -18px; top: ${centerY}%; transform: translateY(-50%);`,
            viewBox: "0 0 20 20",
        },
    };

    const config = $derived(arrowConfigs[direction as ArrowDirection]);
    const position = $derived(config.getPosition());
</script>

<div class="arrow-container" style={position}>
    <svg
        width="20"
        height="20"
        viewBox={config.viewBox}
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-amber-900 drop-shadow-sm"
    >
        <path d={config.path} />
    </svg>
</div>

<style>
    @reference "tailwindcss";

    .arrow-container {
        @apply absolute pointer-events-none z-50;
    }
</style>

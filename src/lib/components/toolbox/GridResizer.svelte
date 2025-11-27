<script lang="ts">
    import NumberStepper from "../ui/NumberStepper.svelte";

    let {
        label,
        value,
        onIncrement,
        onDecrement,
        min = 1,
    } = $props<{
        label: string;
        value: number;
        onIncrement: () => void;
        onDecrement: () => void;
        min?: number;
    }>();
</script>

<NumberStepper {label} {value} {min} {onIncrement} {onDecrement} />

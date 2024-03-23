<script setup lang="ts">
const emit = defineEmits<{
    (event: "click"): void
}>()

enum ButtonSizes {
    Xs = 0.8,
    Small = 1,
    Medium = 1.2,
    Large = 1.4,
}

const props = defineProps({
    buttonSize: {
        type: Object as PropType<ButtonSizes>,
        default: ButtonSizes.Xs,
    }
})

const sizeCss = computed(() => `${props.buttonSize}em`)

</script>

<template>
    <button class="spirit-btn" v-on:click="() => emit(`click`)"><slot/></button>
</template>

<style>
.spirit-btn {
    background-color: var(--color-cta);
    cursor: pointer;
    border: none;
    padding: 0.45em 1em;
    color: inherit;
    border-radius: 3px;

    transition: 100ms;

    font-size: v-bind(sizeCss)
}

.spirit-btn:hover {
    background-color: var(--color-cta-alt);
}
</style>
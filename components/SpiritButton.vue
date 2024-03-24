<script setup lang="ts">
const emit = defineEmits<{
    (event: "click"): void
}>()

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

    font-size: inherit;
}

.spirit-btn:hover {
    background-color: var(--color-cta-alt);
}
</style>
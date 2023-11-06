<script setup lang="ts">
const props = defineProps({
    link: String
})
</script>

<template>
    <div class="spirit-cta">
        <NuxtLink :to="link">
            <slot></slot>
        </NuxtLink>
    </div>
</template>

<style>
.spirit-cta a {
    background-color: var(--color-cta);
    padding: 0.75em 1.25em;
    border-radius: 1px;
    color: inherit;
    text-decoration: none;
}
</style>
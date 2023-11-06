<script setup lang="ts">
const props = defineProps({
    tag: String,
    fullName: String,
    postCount: Number,
})

const categoryLink = computed(() => `/cat/${props.tag}/`)
const categoryColorVar = computed(() => `var(--palette-${props.tag?.toLowerCase()})`)
</script>

<template>
    <div class="spirit-category">
        <RouterLink class="left-col" :to="categoryLink">
            <span class="cat-tag">{{ tag }}</span>
        </RouterLink>
        <div class="right-col">
            <div class="text-col">
                <RouterLink :to="categoryLink">
                    <h3>{{ fullName }}</h3>
                </RouterLink>
                <div class="post-count">
                    <span class="title">POSTS&nbsp;</span>
                    <span class="count">#{{ postCount }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.spirit-category {
    display: flex;
    background-color: var(--bg-d);

    --lightened: color-mix(in srgb, v-bind(categoryColorVar) 95%, white)
}

.post-count,
.cat-tag {
    font-family: var(--font-mono);
}

.post-count .title {
    opacity: 0.4;
}

h3 {
    font-size: 1.8em;
    margin: 0;
    padding-bottom: 15px;
}

.left-col {
    padding: 0 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: v-bind(categoryColorVar);

    font-family: var(--font-mono);
    font-size: 1.2em;
    color: inherit;
    text-decoration: none;
}

.left-col:hover {
    background-color: var(--lightened);
}


.right-col {
    padding: 0.8em 1em 0.8em 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    gap: 1em;
}
</style>
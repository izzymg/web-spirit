<script setup lang="ts">
const { category } = defineProps({
    category: {
        type: Object as PropType<Category>,
        required: true,
    }
})

const categoryLink = computed(() => `/cat/${category.tag?.toLowerCase()}/`)
const categoryColorVar = computed(() => `var(--palette-${category.tag?.toLowerCase()})`)
</script>

<template>
    <div class="spirit-category">
        <RouterLink class="left-col" :to="categoryLink">
            <span class="cat-tag">{{ category.tag }}</span>
        </RouterLink>
        <div class="right-col">
            <div class="text-col">
                <RouterLink class="cat-link" :to="categoryLink">
                    <h3>{{ category.name }}</h3>
                </RouterLink>
                <div class="post-count">
                    <span class="title">posts ...&nbsp;</span>
                    <span class="count">#{{ category.postCount }}</span>
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
    font-size: .8em;
    font-family: var(--font-mono);
}

.post-count .title {
    opacity: 0.7;
}

h3 {
    font-weight: normal;
    font-size: 1.8em;
    margin: 0;
    padding-bottom: 15px;
}

.cat-link {
    color: inherit;
    text-decoration: none;
    font-size: 0.8em;
}

.left-col {
    padding: 0 1em;
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
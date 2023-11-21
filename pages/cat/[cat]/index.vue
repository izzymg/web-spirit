<script setup lang="ts">
const route = useRoute()
const messaging = useMessaging()

let categoryTag = route.params.cat.toString()

const { data, error, refresh, } = await useFetch<CategoryView>(`http://localhost:3000/v1/categories/${categoryTag.toUpperCase()}`)
if (error.value != null) {
    messaging.value = {
        message: "category fetch",
        isError: true,
        code: error.value?.statusCode || -1
    }
}
const categoryColorVar = computed(() => `var(--palette-${categoryTag.toLowerCase()})`)

const onPostSubmitted = (_: number) => {
    refresh()
}
</script>

<template>
    <div class="category-view" v-if="data">
        <SpiritPostCreator @submitted="onPostSubmitted" :category="data.category" :cssColorVar="categoryColorVar" />
        <div class="panel">
            <SpiritCategory v-bind:category="data.category" />
        </div>
        <ul class="thread-list panel">
            <li v-for="thread in data.threads">
                <SpiritPost :contentCap="300" showCta :categoryTag="data.category.tag" v-bind:post="thread" />
            </li>
        </ul>
    </div>
    <div v-else>
        <p>hey... what's this supposed to be?</p>
    </div>
</template>

<style scoped>
.thread-list {
    list-style: none;
    padding: 1em;
    box-sizing: border-box;
    margin: 0;

    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    justify-content: center;
    gap: 1.5em;
}

.thread-list li {
    max-width: 100%;
    margin: 0;
    padding: 0;
}
</style>
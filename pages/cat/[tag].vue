<script setup lang="ts">
const route = useRoute()
const messaging = useMessaging()

let tag: string
if (Array.isArray(route.params.tag)) {
    tag = route.params.tag[0]
} else {
    tag = route.params.tag
}

const { data, error } = await useFetch<CategoryView>(`/v1/${tag.toUpperCase()}/`)
if (error.value != null) {
    messaging.value = {
        message: "category fetch",
        isError: true,
        code: error.value?.statusCode || -1
    }
}
</script>

<template>
    <div class="category-view">
        <div class="panel">
            <SpiritCategory v-if="data" v-bind:category="data.category" />
        </div>
        <ul v-if="data" class="thread-list panel">
            <li v-for="thread in data.threads">
                <SpiritPost :contentCap="300" showCta :categoryTag="data.category.tag" v-bind:post="thread" />
            </li>
        </ul>
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
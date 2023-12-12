<script setup lang="ts">
const route = useRoute()
definePageMeta({
    validate: async route => {
        return /^\d+$/.test(route.params["number"].toString())
    }
})

const messaging = useMessaging()
let categoryTag = route.params.cat.toString()
let number = parseInt(route.params.number.toString())

const { data, error, refresh, } = await useFetch<ThreadView>(`http://localhost:3000/v1/categories/${categoryTag.toUpperCase()}/${number}`)
if (error.value != null) {
    messaging.value = {
        message: "thread fetch",
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
    <div class="split-layout">
        <div class="thread panel" v-if="data">
            <SpiritPostCreator @submitted="onPostSubmitted" :category="data.category" :cssColorVar="categoryColorVar"
                :thread="number" />
            <div :class="{ op: index == 0 }" class="reply" v-for="(post, index) in data.posts">
                <SpiritPost :categoryTag="data.category.tag" :post="post" />
            </div>
        </div>
        <div class="sticky-board">
            <div class="category panel" v-if="data">
                <SpiritCategory :category="data.category" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.thread {
    display: grid;
    grid-template-columns: 1fr [posts-start] minmax(400px, 850px) [posts-end] 1fr;
    gap: 1em;
}

.thread>.reply {
    grid-column: posts;
}

.thread .op {
    margin-left: -1em;
}

.sticky-board > * {
    position: sticky;
    top: 5px;
}
</style>
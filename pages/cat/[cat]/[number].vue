<script setup lang="ts">
const route = useRoute()
definePageMeta({
    validate: async route => {
        return /^\d+$/.test(route.params["number"].toString())
    }
})

const messaging = useMessaging()
let categoryTag = route.params.cat.toString()
let number = route.params.number.toString()

const { data, error } = await useFetch<ThreadView>(`/v1/${categoryTag.toUpperCase()}/${number}`)
if (error.value != null) {
    messaging.value = {
        message: "thread fetch",
        isError: true,
        code: error.value?.statusCode || -1
    }
}

</script>

<template>
    <div class="thread panel" v-if="data">
        <div :class="{ op: index == 0 }" class="reply" v-for="(post, index) in data.posts">
            <SpiritPost :post="post" />
        </div>
    </div>
</template>

<style scoped>
.thread {
    display: grid;
    grid-template-columns: 1fr [posts-start] minmax(400px, 850px) [posts-end] 1fr;
    gap: 1em;
}

.thread > .reply {
    grid-column: posts;
}

.thread .op {
    margin-left: -1em;
}
</style>
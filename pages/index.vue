
<script setup lang="ts">
const messaging = useMessaging()
const { public: cfg } = useRuntimeConfig()
const { data, error } = await useFetch(`/v1`, { server: false })
console.log(data.value)
if(error.value != null) {
    messaging.value = {
        message: "category fetch",
        isError: true,
        code: error.value?.statusCode || -1
    }
}

</script>


<template>
    <section class="categories panel">
        <ul class="category-list">
            <li v-for="cat in data">
                <SpiritCategory :full-name="cat['name']" :tag="cat['tag']" :post-count="cat['postCount']" />
            </li>
        </ul>
    </section>
</template>

<style scoped>
.category-list {
    list-style: none;
    margin: 0;
    padding: 0;

    display: flex;
    gap: 2em;
}

</style>
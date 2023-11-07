
<script setup lang="ts">
const messaging = useMessaging()
const { data, error } = await useFetch<Category[]>(`/v1`)
if(error.value != null) {
    messaging.value = {
        message: "category list fetch",
        isError: true,
        code: error.value?.statusCode || -1
    }
}

</script>


<template>
    <section class="categories panel">
        <ul class="category-list">
            <li v-for="cat in data">
                <SpiritCategory :category="cat" />
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
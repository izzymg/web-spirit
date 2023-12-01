
<script setup lang="ts">
const messaging = useMessaging()
const { data, error } = await useFetch<Category[]>(`http://localhost:3000/v1/categories`)
if(error.value != null) {
    console.error(error.value)
    messaging.value = {
        message: "category list fetch",
        isError: true,
        code: error.value?.statusCode || -1
    }
}

</script>


<template>
    <section class="categories panel">
        <ul v-if="data" class="category-list">
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
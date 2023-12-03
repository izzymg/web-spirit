
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
    <div class="split-layout">
        <section class="categories panel">
            <ul v-if="data" class="category-list">
                <li v-for="cat in data">
                    <SpiritCategory :category="cat" />
                </li>
            </ul>
        </section>
        <section class="intro panel">
            <h2>categories</h2>
            <p id="motd">if there was a message of the day, i'd put it here.</p>
            <div class="rules">
                <p>no illegalities</p>
                <p>behave</p>
            </div>
        </section>
    </div>
</template>

<style scoped>
.category-list {
    list-style: none;
    margin: 0;
    padding: 0;

    display: flex;
    flex-flow: row wrap;
    height: 100%;
    align-items: center;
    
    gap: 2em;
}

.intro h2 {
    font-family: var(--font-mono);
    font-weight: normal;
}

.rules {
    font-family: var(--font-mono);
    margin-left: 1em;
}

.rules > ::before {
    content: "' ";
}

</style>
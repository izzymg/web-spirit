
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
            <p id="motd">...</p>
            <div class="rules">
                <p>no illegalities</p>
                <p>behave yrself</p>
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
    flex-flow: column;
    height: 100%;
    align-items: stretch;
    
    gap: 2em;
}

.category-list > * {
    flex-grow: 1;
}

#motd {
    font-family: var(--font-mono);
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
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const messaging = useMessaging()
const { isAuthenticated, getAccessTokenSilently, } = useAuth0()
let loading = ref(true);

const token = await getAccessTokenSilently()
const { data: posts, error, refresh } = await useFetch<Post[]>(`http://localhost:3000/v1/yours`, {
    method: "GET",
    headers: {
        "Authorization": token
    },
})
if(error && error.value?.statusCode && error.value?.statusCode !== 404) {
    messaging.value = {
        isError: true,
        message: error.value?.data,
        code: error.value?.statusCode || -1
    }
}
loading.value = false

</script>
<template>
    <div class="split-layout">
        <section class="your-spirit-layout" v-if="isAuthenticated">
            <div class="panel">
                <h1>your spirit</h1>
            </div>
            <div class="panel">
                <span v-if="loading">...</span>
                <div class="user-posts-wrap" v-if="posts">
                    <div v-for="post in posts">
                        <SpiritPost v-on:change="refresh" show-moderation :post="post"/>
                    </div>
                </div>
                <div class="no-posts" v-else>
                    <p>your spirit is empty...</p>
                    <SpiritButton v-on:click="refresh">refresh</SpiritButton>
                </div>
            </div>
        </section>
        <section v-else>
            <h1>you need to log in~</h1>
        </section>
    </div>
</template>

<style scoped>
.your-spirit-layout {
    display: grid;
    align-items: center;
    gap: 1em;
}

.spirit-btn {
    font-size: 0.8em;
}
</style>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const messaging = useMessaging()
const { isAuthenticated, getAccessTokenSilently, } = useAuth0()
let posts = ref<Post[]>([]);
let postsLoaded = false;
let loading = ref(false);

const loadUserPosts = async () => {
    const token = await getAccessTokenSilently()
    posts.value = await $fetch<Post[]>(`http://localhost:3000/v1/yours`, {
        method: "GET",
        headers: {
            "Authorization": token
        },
        onResponseError: ({ response }) => {
            messaging.value = {
                isError: true,
                message: response._data,
                code: response.status
            }
        }
    })
    postsLoaded = true
}

</script>
<template>
    <div class="split-layout">
        <section class="your-spirit-layout" v-if="isAuthenticated">
            <div class="panel">
                <h1>your spirit</h1>
            </div>
            <div class="panel">
                <SpiritButton v-if="!postsLoaded" v-on:click="loadUserPosts">your posts...</SpiritButton>
                <span v-if="loading">...</span>
                <div class="user-posts-wrap">
                    <div v-for="post in posts">
                    <SpiritPost :post="post"/>
                    </div>
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
}

.spirit-btn {
    font-size: 0.8em;
}
</style>
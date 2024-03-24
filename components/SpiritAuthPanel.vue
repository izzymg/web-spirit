<template>
    <ClientOnly>
        <div class="auth-panel">
            <div class="not-logged-in" v-if="!isAuthenticated">
                <SpiritButton v-on:click="doLogin">Log In</SpiritButton>
            </div>
            <div class="logged-in" v-else>
                <SpiritProfileBadge :verified="user?.email_verified" :pfp-uri="user?.picture" :username="user?.preferred_username"></SpiritProfileBadge>
                <SpiritButton v-on:click="doLogout">Log Out</SpiritButton>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithPopup, isAuthenticated, logout, user, } = useAuth0();

const doLogin = () => loginWithPopup()
const doLogout = () => logout()

</script>

<style scoped>
.logged-in {
    display: flex;
    flex-flow: column;
    gap: 1em;
    justify-content: center;
}
</style>
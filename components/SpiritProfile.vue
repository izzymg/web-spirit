<template>
    <ClientOnly>
        <div class="auth-panel">
            <div class="not-logged-in" v-if="!isAuthenticated">
                <button v-on:click="doLogin">Log In</button>
            </div>
            <div class="logged-in" v-else>
                <button v-on:click="doLogout">Log Out</button>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithPopup, isAuthenticated, logout } = useAuth0();

const doLogin = () => loginWithPopup()
const doLogout = () => logout()



</script>
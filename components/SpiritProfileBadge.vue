<template>
    <ClientOnly>
        <div class="profile-badge">
            <img class="pfp" :src="props.pfpUri" width="50" />
            <div class="user-details">
                <span class="username">{{ props.username }}</span>
                <span class="unverified" v-if="!verified">UNVERIFIED</span>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
    const props = defineProps({
        username: {
            type: String,
            default: "Anonymous",
        },
        pfpUri: {
            type: String,
            default: "/angel.webp",
        },
        verified: {
            type: Boolean,
            default: true,
        }
    })
</script>

<style scoped>
.profile-badge {
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 1em;
    background-color: var(--color-identity);
    padding: 0.4em;
    border-radius: 2px;
}
.pfp {
    border-radius: 50%;
}

.user-details {
    display: flex;
    flex-flow: column;
}

.unverified {
    font-size: 0.9em;
    font-weight: bold;
    font-family: var(--font-mono);
    color: red;
}

.username {
    font-family: var(--font-mono);
}

</style>
<template>
    <ClientOnly>
        <div class="profile-badge">
            <img class="pfp" :src="props.pfpUri" width="50" />
            <span class="username">{{ props.username }}</span>
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

.username {
    font-family: var(--font-mono);
}
</style>
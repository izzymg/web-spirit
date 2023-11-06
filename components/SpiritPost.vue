<script setup lang="ts">
const props = defineProps({
    number: Number,
    parentNumber: Number,
    categoryTag: String,
    subject: String || null,
    userName: String || "Anonymous",
    replyNumber: Number,
    replyCount: Number,
})
</script>

<template>
    <div class="spirit-post">
        <div class="identity-section">
            <img alt="Anonymous" src="/manequin-render.png"/>
        </div>
    </div>
</template>
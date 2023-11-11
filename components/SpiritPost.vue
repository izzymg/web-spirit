<script setup lang="ts">
import { dateTimeFormatter } from "@/util/time"

const props = defineProps({
    post: {
        type: Object as PropType<Post>,
        required: true,
    },
    categoryTag: {
        type: String,
        required: false,
    },
    showTag: {
        type: Boolean,
        required: false,
    },
    showCta: {
        type: Boolean,
        required: false,
    },
    contentCap: {
        type: Number,
        default: 0,
    }
})

const postLink = computed(() => `/${props.categoryTag}/${props.post.num}`)
const postTimestamp = computed(() => dateTimeFormatter.format(new Date(props.post.createdAt)))
const categoryColorVar = computed(() => `var(--palette-${props.categoryTag?.toLowerCase()})`)
const cappedContent = computed(() => props.post.content.length > props.contentCap ? props.post.content.substring(0, props.contentCap-3) + "..." : props.post.content)

</script>

<template>
    <div class="spirit-post">
        <div class="identity-section">
            <img class="profile" width="85" alt="Anonymous" src="/manequin-render.png"/>
            <span class="name">Anonymous</span>
        </div>
        <div class="post-section">
            <div class="post-left-col">
                <p class="content">{{ cappedContent }}</p>
                <div class="cta-tag-wrap" v-if="showTag || showCta">
                    <p v-if="showTag" class="tag">{{ categoryTag }}</p>
                    <SpiritCTA v-if="showCta" :link="postLink">View</SpiritCTA>
                </div>
            </div>
            <div class="post-right-col">
                <span class="number">#{{ post.num }}</span>
                <span class="timestamp">{{ postTimestamp }}</span>
            </div>
        </div>
    </div>
</template>

<style>
.spirit-post  {
    display: flex;
    height: 100%;
    max-width: 100%;
}

@media (max-width: 390px) {
    .spirit-post {
        flex-flow: column;
    }
}

.spirit-post .identity-section {

    min-width: 100px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: var(--color-identity);
    padding: 0.45em 0;
}

.spirit-post img.profile {
    border-radius: 50%;
    height: auto;
}

.spirit-post .post-section {
    flex-grow: 1;
    background-color: var(--bg-d);
    padding: 1em;

    display: flex;
    flex-flow: row nowrap;
    gap: 1em;
}

.spirit-post .post-left-col {
    display: flex;
    flex-flow: column;
    height: 100%;
}

.spirit-post .post-right-col {
    flex-grow: 1;
    min-width: fit-content;
    opacity: 0.5;

    display: flex;
    flex-flow: column;
    text-align: right;
}

.spirit-post .content {
    word-wrap: break-word;
    word-break: break-all;
}

.spirit-post .cta-tag-wrap {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 0.65em;
}

.spirit-post .cta-tag-wrap .tag {
    padding: 1em 1.5em;
    font-size: 1.1em;
    font-family: var(--font-mono);
    border-radius: 15px;
    background-color: v-bind(categoryColorVar);
}

</style>
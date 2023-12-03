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
const categoryColorVar = `var(--palette-${props.categoryTag})`

const datetime = computed(() => dateTimeFormatter.format(new Date(props.post.createdAt)).toLowerCase())
const cappedContent = computed(() => props.contentCap > 1 && props.post.content.length > props.contentCap ? props.post.content.substring(0, props.contentCap-3) + "..." : props.post.content)

const category = props.categoryTag?.toLowerCase()
const postLink = `/cat/${props.categoryTag?.toLowerCase()}/${props.post.num}`

</script>

<template>
    <div class="spirit-post">
        <div class="identity-section">
            <img class="profile" width="55" alt="Anonymous" src="/angel.webp"/>
            <span class="name">Anonymous</span>
        </div>
        <div class="post-section">
            <div class="post-left-col">
                <p class="content">{{ cappedContent }}</p>
                <div class="cta-tag-wrap" v-if="showTag || showCta">
                    <p v-if="showTag" class="tag">{{ category }}</p>
                    <SpiritCTA v-if="showCta" :link="postLink">View</SpiritCTA>
                </div>
            </div>
            <div class="post-right-col">
                <span class="number">#{{ post.num }}</span>
                <span class="timestamp">{{ datetime }}</span>
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
    background-color: var(--color-identity);
    font-size: 0.75em;

    min-width: 75px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
    font-family: var(--font-mono);
    font-size: .8em;

    flex-grow: 1;
    min-width: fit-content;
    opacity: 0.5;

    display: flex;
    flex-flow: column;
    text-align: right;
}

.spirit-post .content {
    font-size: .9em;
    word-wrap: break-word;
    word-break: break-word;
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
<script setup lang="ts">
import { dateTimeFormatter } from "@/util/time"
import { useAuth0 } from "@auth0/auth0-vue";

const messaging = useMessaging()
const { getAccessTokenSilently, } = useAuth0()

const props = defineProps({
    post: {
        type: Object as PropType<Post>,
        required: true,
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
    },
    showModeration: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(["change"])

const categoryColorVar = `var(--palette-${props.post.cat})`

const datetime = computed(() => dateTimeFormatter.format(new Date(props.post.createdAt)).toLowerCase())
const cappedContent = computed(() => props.contentCap > 1 && props.post.content.length > props.contentCap ? props.post.content.substring(0, props.contentCap-3) + "..." : props.post.content)

const category = props.post.cat?.toLowerCase()
const postLink = `/cat/${props.post.cat?.toLowerCase()}/${props.post.num}`

const deletePost = async() => {
    const token = await getAccessTokenSilently()
    try {
        $fetch(`http://localhost:3000/v1/categories/${props.post.cat}/${props.post.num}`, {
            headers:  { "authorization": token },
            method: "DELETE",
            onResponseError: ({ response }) => {
                messaging.value = {
                    isError: true,
                    message: response._data,
                    code: response.status
                }
            },
            onResponse: ({ response }) => {
                console.log(response)
                messaging.value = {
                    isError: false,
                    message: response._data,
                    code: response.status
                }
            }
        })
        emit("change")
    } catch(err) {
        messaging.value = {
            isError: true,
            message: "unknown error, you might be offline",
            code: 500
        }
    }
}

const onDeleteClick = () => {
    messaging.value = {
        code: 0,
        isError: false,
        message: "delete this post..?",
        confirmation: {
            action: "delete it",
            onConfirm: deletePost
        }
    }
}

</script>

<template>
    <div class="spirit-post">
        <a class="anchor" :id="post.num.toString()"/>
        <div v-if="showModeration" class="mod-section">
            <a href="#" v-on:click="onDeleteClick">
                <icon color="red" name="pixelarticons-delete"></icon>
            </a>
        </div>
        <div class="identity-section">
            <img class="profile" width="55" alt="Anonymous" src="/angel.webp"/>
            <span class="name">{{ post.username }}</span>
        </div>
        <div class="post-section">
            <div class="post-left-col">
                <NuxtLink :to="`${postLink}/#0`" v-if="post.subject" class="subject" v-html="post.subject"></NuxtLink>
                <p class="content" v-html="cappedContent"></p>
                <div class="cta-tag-wrap" v-if="showTag || showCta">
                    <p v-if="showTag" class="tag">{{ category }}</p>
                    <SpiritCTA v-if="showCta" :link="postLink">View</SpiritCTA>
                </div>
            </div>
            <div class="post-right-col">
                <a :href="'#' + post.num" class="number">#{{ post.num }}</a>
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

.spirit-post .mod-section {
    padding: 1em;
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

.spirit-post .subject {
    font-weight: bold;
    color: var(--palette-prog);
}

</style>
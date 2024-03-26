<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
const { user, getAccessTokenSilently, isAuthenticated, } = useAuth0()

const emit = defineEmits<{
    (e: "submitted", postNumber: number): void
}>()


const props = defineProps({
    category: {
        type: Object as PropType<Category>,
        required: true
    },
    thread: {
        type: Number,
        required: false,
    },
    cssColorVar: {
        type: String,
        default: "red"
    }
})
let subject: string;
let content: string;
let dialog = ref<HTMLDialogElement>();
const messaging = useMessaging()

const submitValue = props.thread ? "Submit Reply" : "Create Thread";

const onSubmit = async() => {
    messaging.value = {
        isError: false,
        code: -1,
        message: "submitting..."
    }

    const token = await getAccessTokenSilently()

    await $fetch(`http://localhost:3000/v1/categories/${props.category.tag}/${props.thread ?? 0}`,
    {
        method: "POST",
        body: {
            subject,
            content,
        },
        headers: {
            "Authorization": token,
        },
        responseType: "json",
        onResponseError: ({ response }) => {
            messaging.value = {
                isError: true,
                message: response._data,
                code: response.status
            }
        },
        onResponse: ({ response }) => {
            messaging.value = {
                isError: false,
                message: response._data,
                code: response.status
            }
            emit("submitted", 0)
        }
    })
}

</script>

<template>
    <ClientOnly>
        <Teleport to="body">
            <div class="open-creator-btn-wrap">
                <button class="icon-btn" v-on:click="dialog?.showModal">
                    <Icon size="48" color="white" name="pixelarticons:edit-box" />
                </button>
            </div>
            <dialog ref="dialog" id="post-creator">
                <div v-if="isAuthenticated" class="post-creation-form">
                    <div class="post-details">
                        <SpiritProfileBadge :username="user?.preferred_username" :pfp-uri="user?.picture"></SpiritProfileBadge>
                        <span v-if="!props.thread">{{ category?.name }}: create a thread</span>
                        <span v-else>{{ category?.name }}: #{{ thread }} replying</span>
                    </div>
                    <form method="dialog" @submit="onSubmit">
                        <input v-if="!props.thread" type="text" placeholder="Subject" v-model="subject"/>
                        <textarea placeholder="..." v-model="content" id="creator-content"></textarea>
                        <input class="input-cta" type="submit" :value="submitValue">
                    </form>
                </div>
                <div v-else>
                    <h2>You need to log in.</h2>
                </div>
            </dialog>
        </Teleport>
    </ClientOnly>
</template>

<style>
.open-creator-btn-wrap {
    position: fixed;
    bottom: 15px;
    right: 15px;
    width: 100%;
    text-align: right;
}

.open-creator-btn-wrap .icon-btn {
    opacity: 0.4;
}

.open-creator-btn-wrap .icon-btn:hover {
    opacity: 1;
}

.open-creator-btn-wrap button {
    background-color: v-bind(cssColorVar);
    padding: 1em;
}

dialog::backdrop {
  background-image: linear-gradient(
    45deg,
    white,
    var(--color-cta)
  );
  opacity: 0.65;
}

#post-creator {
    width: min(650px, 90vw);
    border: 1px solid var(--color-identity);
    background-color: var(--bg-c);
    color: white;
    border-radius: 5px;
}

#post-creator h2 {
    text-align: center;
    font-weight: normal;
    font-family: var(--font-mono);
}

#post-creator textarea, #post-creator input[type="text"] {
    display: block;
    box-sizing: border-box;
    
    width: 100%;
    border: none;
    margin: 1em 0;

    padding: 0.75em;
    background-color: var(--bg-b);
    color: #fff;
    font-family: inherit;
}

#post-creator textarea {
    min-height: 90px;
}

#post-creator .input-cta {
    margin: 1em 0;
}

#post-creator .post-details {
    display: flex;   
    align-items: center;
    gap: 2em;
}

</style>
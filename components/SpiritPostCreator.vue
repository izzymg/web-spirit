<script setup lang="ts">
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
    try{
        messaging.value = {
            isError: false,
            code: -1,
            message: "submitting..."
        }
        await $fetch(`http://localhost:3000/v1/categories/${props.category.tag}/${props.thread ?? 0}`,
        {
            method: "POST",
            body: {
                subject,
                content,
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
                    message: response._data["message"],
                    code: response.status
                }
                emit("submitted", 0)
            }
        })
    } catch {
        // this library is not my favourite library
    }
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
                <h2 v-if="!props.thread">{{ category?.tag }}</h2>
                <h2 v-else>{{ category?.tag }}: #{{ thread }}</h2>
                <form method="dialog" @submit="onSubmit">
                    <input v-if="!props.thread" type="text" placeholder="Thread subject" v-model="subject"/>
                    <textarea placeholder="Your post..." v-model="content" id="creator-content"></textarea>
                    <input class="input-cta" type="submit" :value="submitValue">
                </form>
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
    border: none;
    background-color: var(--bg-c);
    color: white;
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
</style>
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
let content: string;
let dialog = ref<HTMLDialogElement>();
const messaging = useMessaging()

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
                    <Icon color="white" name="pixelarticons:edit-box" />
                </button>
            </div>
            <dialog ref="dialog" id="post-creator">
                <h2 v-if="!props.thread">Create thread on {{ category?.tag }}</h2>
                <h2 v-else>Reply to thread #{{ thread }}</h2>
                <form method="dialog" @submit="onSubmit">
                    <textarea placeholder="Your post..." v-model="content" id="creator-content"></textarea>
                    <input type="submit">
                </form>
            </dialog>
        </Teleport>
    </ClientOnly>
</template>

<style scoped>
.open-creator-btn-wrap {
    opacity: 0.4;
    position: fixed;
    bottom: 15px;
    right: 15px;
    width: 100%;
    text-align: right;
}

.open-creator-btn-wrap:hover {
    opacity: 1;
}

.open-creator-btn-wrap button {
    background-color: v-bind(cssColorVar);
    padding: 1em;
}
</style>
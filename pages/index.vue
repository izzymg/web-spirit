
<script setup lang="ts">
const messaging = useMessaging()
const { public: cfg } = useRuntimeConfig()
const { data, error } = await useFetch(`${cfg.apiBase}/`)
if(error.value != null) {
    messaging.value = {
        message: `failed to load categories`,
        isError: true,
        code: error.value?.statusCode || -1
    }
}

</script>


<template>
    <div>
        {{ data }}    
    </div>
</template>
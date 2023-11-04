<script setup lang="ts">
const { message, isError } = defineProps({
  "message": String,
  "isError": Boolean,
})
</script>

<template>
  <div :class="{error:isError}" class="spirit-message-wrap">
    <span>{{ message }}</span>
  </div>
</template>
  
<style scoped>
.spirit-message-wrap {
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  background: var(--bg-b);
  border-radius: 4px;
  padding: 0.8em 1em;
}

.spirit-message-wrap.error {
  color: red;
}
</style>
<script setup lang="ts">
const messaging = useMessaging()

const close = () => {
  messaging.value.message = ""
  messaging.value.isError = false
  messaging.value.code = -1
}
</script>

<template>
  <ClientOnly>
    <div :class="{visible: messaging.message.length > 0, error: messaging.isError}" class="spirit-message-wrap">
      <div class="message-content">
        <span class="msg-code" v-if="messaging.code != -1">{{ messaging.code }}</span>
        <span>{{ messaging.message }}</span>
      </div>
      <button class="icon-btn" v-on:click="close">
        <Icon color="white" name="pixelarticons:close" />
      </button>
    </div>
  </ClientOnly>
</template>
  
<style scoped>
.spirit-message-wrap {
  opacity: 0;
  visibility: hidden;

  position: absolute;
  bottom: 5%;
  left: 5%; right: 5%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: color-mix(in srgb, var(--bg-b) 60%, transparent);
  border-radius: 4px;
  padding: 0.8em 1em;
}

.spirit-message-wrap.visible {
  opacity: 1;
  visibility: visible;
}

.spirit-message-wrap.error {
  color: red;
}

.spirit-message-wrap span {
  display: inline-block;
  box-sizing: border-box;
}

.msg-code {
  font-family: var(--font-mono);
  font-weight: bolder;
  font-size: 1.3em;
  border-right: 2px dotted  rgba(255, 255, 255, 0.3);
  padding: 0 5px;
  margin-right: 5px;
}
</style>
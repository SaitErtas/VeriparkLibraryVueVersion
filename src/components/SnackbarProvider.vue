<script setup lang="ts">
import { provide, ref } from 'vue';

const show = ref(false)
const message = ref('')
const color = ref('')

provide('snackbar', {
  show(options: { message: string; color: string }) {
    message.value = options.message
    color.value = options.color
    show.value = true
  },
  hide() {
    show.value = false
  },
})
</script>

<template>
  <slot />
  <VSnackbar v-model="show" :color="color">
    {{ message }}
    <template #actions>
      <VBtn variant="text" @click="show = false">
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>

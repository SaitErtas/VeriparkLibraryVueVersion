<script setup lang="ts">
import { ref } from 'vue';
import CheckInBookWizardMain from './CheckInBookWizardMain.vue';


const isLoading = ref<boolean>(false)
const { show } = inject('snackbar') as any

interface Props {
  bookId: number
  bookName: string
  isVisibleCheckInBookDialog: boolean
}

const props = withDefaults(defineProps<Props>(), { isVisibleCheckInBookDialog: false, bookId: 0, bookName: "" })

interface Emit {
  (e: 'update:isVisibleCheckInBookDialog', val: boolean): void
}
const emit = defineEmits<Emit>()


const onFormReset = () => {
  emit('update:isVisibleCheckInBookDialog', false)
}

onMounted(() => {
  console.log(props.bookId)
})

//👉 Kapatma tuşuna basmadan geri plana kaldığı zaman otomaitk kapanma da bu event çalışıyor
const isVisibleCheckInBookDialog = (val: boolean) => {
  console.log("val", val)
  emit('update:isVisibleCheckInBookDialog', val)
}
</script>

<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 1200" :model-value="props.isVisibleCheckInBookDialog"
    @update:model-value="isVisibleCheckInBookDialog">
    <VCard class="pa-sm-9 pa-5">


      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-2">
          CheckIn Book
        </VCardTitle>
        <VCardSubtitle>
          {{ props.bookName }}
        </VCardSubtitle>
      </VCardItem>
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn variant="text" size="small" @click="onFormReset" title="sssssssss" />

      <VCardText>
        <!-- 👉 Form -->
        <VRow>
          <!-- 👉 Name -->
          <VCol cols="12" md="12">
            <CheckInBookWizardMain :bookId="bookId"
              @update:is-visible-check-in-book-dialog="isVisibleCheckInBookDialog" />
          </VCol>

        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

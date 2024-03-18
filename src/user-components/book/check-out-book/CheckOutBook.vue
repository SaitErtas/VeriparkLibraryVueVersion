<script setup lang="ts">
import type { CheckOutType } from '@/types/check-in-out/checkInOutTypes';
import userAxios from '@/user-functions/userAxios';

interface Props {
  checkOutBookTypeItem?: CheckOutType
  isDialogVisible: boolean
}

interface Emit {
  (e: 'submit', value: CheckOutType): void
  (e: 'update:isDialogVisible', val: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  isDialogVisible: false,
  checkOutBookTypeItem: () => ({
    bookId: 0,
    bookName: '',
    phoneNumber: '',
    tckn: 0,
    userName: '',
  }),
})

const emit = defineEmits<Emit>()

const bookData = ref<CheckOutType>(props.checkOutBookTypeItem)
const isLoading = ref<boolean>(false)


const { show } = inject('snackbar') as any
const onFormSubmit = async () => {
  isLoading.value = true
  const resultAxios = await userAxios.post({
    method: 'Books/book-check-out/',

    data: props.checkOutBookTypeItem,

  })


  const responseData = await resultAxios;
  if (responseData.isSuccess) {
    emit('update:isDialogVisible', false)
    emit('submit', bookData.value)
    show({ message: "Başarılı", color: 'success' })
  }
  else {
    show({ message: responseData.message, color: 'error' })
  }
  isLoading.value = false

}

const onFormReset = () => {
  bookData.value = structuredClone(toRaw(props.checkOutBookTypeItem))
  emit('update:isDialogVisible', false)
}

const dialogVisibleUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 800" :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate">
    <VCard class="pa-sm-9 pa-5">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn variant="text" size="small" @click="onFormReset" />

      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-2">
          CheckOut Book
        </VCardTitle>
        <VCardSubtitle>
          {{ bookData.bookName }}
        </VCardSubtitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm class="mt-6" @submit.prevent="onFormSubmit">
          <VRow>
            <!-- 👉 Full Name -->
            <VCol cols="12" md="6">
              <VTextField v-model="bookData.bookId" label="bookId" placeholder="bookId" readonly />
            </VCol>

            <!-- 👉 userName -->
            <VCol cols="12" md="6">
              <VTextField v-model="bookData.bookName" label="bookName" placeholder="bookName" readonly />
            </VCol>

            <!-- 👉 userName -->
            <VCol cols="12" md="6">
              <VTextField v-model="bookData.userName" label="userName" placeholder="userName" />
            </VCol>

            <!-- 👉 Status -->
            <VCol cols="12" md="6">
              <VTextField v-model="bookData.tckn" label="TCKN" placeholder="0" />
            </VCol>

            <!-- 👉 Status -->
            <VCol cols="12" md="6">
              <VTextField v-model="bookData.phoneNumber" label="PhoneNumber" placeholder="0" />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol cols="12" class="d-flex flex-wrap justify-center gap-4">
              <div>
                <VProgressCircular indeterminate v-if="isLoading" color="primary" />
                <VBtn type="submit" v-else="!isLoading">
                  Submit
                </VBtn>
              </div>
              <VBtn color="secondary" variant="outlined" @click="onFormReset">
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

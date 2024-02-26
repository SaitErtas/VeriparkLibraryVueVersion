<script setup lang="ts">
import { BookCheckInOutType } from '@/types/check-in-out/checkInOutTypes';
import userAxios from '@/user-functions/userAxios';



interface Props {
  currentStep?: number
  checkedOutBookItem: BookCheckInOutType
}


const props = defineProps<{
  currentStep?: number
  checkedOutBookItem: BookCheckInOutType
}>()

const emit = defineEmits<{
  (e: 'update:currentStep', value: number): void
  (e: 'update:isVisibleCheckInBookDialog', value: boolean): void
}>()

const isLoading = ref<boolean>(false)
const { show } = inject('snackbar') as any

const onFormSubmit = async () => {
  isLoading.value = true
  const resultAxios = await userAxios.post({
    method: 'Books/create-book/',

    data: props.checkedOutBookItem,

  })
  const responseData = await resultAxios;
  if (responseData.isSuccess) {
    emit('update:isVisibleCheckInBookDialog', false)

  }
  else {
    show({ message: responseData.message, color: 'error' })
  }
  isLoading.value = false
}

const onFormReset = () => {
  emit('update:isVisibleCheckInBookDialog', false)
}


</script>

<template>
  <section class="text-base">
    <VCard class="pa-sm-9 pa-5">
      <!-- 👉 dialog close btn -->

      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-2">
          Confirmation CheckIn
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm class="mt-6" @submit.prevent="onFormSubmit">
          <VRow>
            <!-- 👉 Name -->
            <VCol cols="12" md="6">
              <VTextField v-model="props.checkedOutBookItem.userName" label="Name" placeholder="Name" />
            </VCol>

            <!-- 👉 TCKN -->
            <VCol cols="12" md="6">
              <VTextField v-model="props.checkedOutBookItem.tckn" label="ISBN" placeholder="ISBN" />
            </VCol>

            <!-- 👉 phoneNumber -->
            <VCol cols="12" md="6">
              <VTextField v-model="props.checkedOutBookItem.phoneNumber" label="Price" placeholder="Price" />
            </VCol>

            <!-- 👉 checkInDate -->
            <VCol cols="12" md="6">
              <VTextField v-model="props.checkedOutBookItem.checkInDate" label="StockAmount" placeholder="0" />
            </VCol>

            <!-- 👉 checkOutDate -->
            <VCol cols="12" md="6">
              <AppDateTimePicker v-model="props.checkedOutBookItem.checkOutDate" label="PublishDate"
                placeholder="PublishDate" />

            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol cols="12" class="d-flex flex-wrap justify-center gap-4">
              <template v-if="!isLoading">
                <VBtn type="submit">
                  Submit
                </VBtn>
              </template>
              <template v-if="isLoading">
                <VProgressCircular indeterminate v-if="isLoading" color="primary" />
              </template>
              <VBtn color="secondary" variant="outlined" @click="onFormReset">
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </section>
</template>

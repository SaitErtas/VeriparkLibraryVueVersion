<script setup lang="ts">
import type { CheckOutType } from '@/types/check-in-out/checkInOutTypes'

interface Props {
  addCheckOutTypeItem?: CheckOutType
  isDialogVisible: boolean
}

interface Emit {
  (e: 'submit', value: CheckOutType): void
  (e: 'update:isDialogVisible', val: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  addCheckOutTypeItem: () => ({
    bookId: 0,
    bookName: '',
    phoneNumber: '',
    tckn: 0,
    userName: '',
  }),
})

const emit = defineEmits<Emit>()

const bookData = ref<CheckOutType>(structuredClone(toRaw(props.addCheckOutTypeItem)))

watch(props, () => {
  bookData.value = structuredClone(toRaw(props.addCheckOutTypeItem))
})

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', bookData.value)
}

const onFormReset = () => {
  bookData.value = structuredClone(toRaw(props.addCheckOutTypeItem))
  emit('update:isDialogVisible', false)
}

const dialogVisibleUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 800"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate"
  >
    <VCard class="pa-sm-9 pa-5">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="onFormReset"
      />

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
        <VForm
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 👉 Full Name -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="bookData.bookId"
                label="bookId"
                placeholder="bookId"
                readonly
              />
            </VCol>

            <!-- 👉 userName -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="bookData.bookName"
                label="bookName"
                placeholder="bookName"
                readonly
              />
            </VCol>

            <!-- 👉 userName -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="bookData.userName"
                label="userName"
                placeholder="userName"
              />
            </VCol>

            <!-- 👉 Status -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="bookData.tckn"
                label="TCKN"
                placeholder="0"
              />
            </VCol>

            <!-- 👉 Status -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="bookData.phoneNumber"
                label="PhoneNumber"
                placeholder="0"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                Submit
              </VBtn>

              <VBtn
                color="secondary"
                variant="outlined"
                @click="onFormReset"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

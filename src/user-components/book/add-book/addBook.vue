<script setup lang="ts">
import type { AddBookType } from '@/types/book/bookTypes';

interface Props {
  isAddBookDialogVisible: boolean
}

interface Emit {
  (e: 'update:isAddBookDialogVisible', val: boolean): void
}

const addBookTypeItem = ref<AddBookType>({isbn:'',name:'',price:0,publishDate:new Date(),stockAmount:0})


const props = withDefaults(defineProps<Props>(), {isAddBookDialogVisible:false})

const emit = defineEmits<Emit>()

const onFormSubmit = () => {
  emit('update:isAddBookDialogVisible', false)
}

const onFormReset = () => {
  emit('update:isAddBookDialogVisible', false)
}

const dialogVisibleUpdate = (val: boolean) => {
  emit('update:isAddBookDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 800"
    :model-value="props.isAddBookDialogVisible"
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
          Add Book
        </VCardTitle>
        <VCardSubtitle>
          New Book
        </VCardSubtitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 👉 Name -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="addBookTypeItem.name"
                label="Name"
                placeholder="Name"
              />
            </VCol>

            <!-- 👉 ISBN -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="addBookTypeItem.isbn"
                label="ISBN"
                placeholder="ISBN"
              />
            </VCol>

            <!-- 👉 Price -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="addBookTypeItem.price"
                label="Price"
                placeholder="Price"
              />
            </VCol>

            <!-- 👉 StockAmount -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="addBookTypeItem.stockAmount"
                label="StockAmount"
                placeholder="0"
              />
            </VCol>

            <!-- 👉 Publish Date -->
            <VCol
              cols="12"
              md="6"
            >
              <VDateField
                v-model="addBookTypeItem.publishDate"
                label="StockAmount"
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

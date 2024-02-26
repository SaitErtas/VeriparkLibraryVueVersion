<script setup lang="ts">
import { BookCheckInOutType } from '@/types/check-in-out/checkInOutTypes';
import { VDataTableServer } from 'vuetify/labs/VDataTable';

interface Props {
  currentStep?: number,
  checkedOutBookList: BookCheckInOutType[]
}
const props = defineProps<{
  currentStep?: number
  checkedOutBookList?: BookCheckInOutType[]
}>()

interface Emit {
  (e: 'update:currentStep', value: number): void
  (e: 'update:setCheckedOutItemToCheckIn', value: BookCheckInOutType): void
}

const emit = defineEmits<Emit>()
// Headers
const headers = [
  { title: 'userName', key: 'userName' },
  { title: 'tckn', key: 'tckn' },
  { title: 'phoneNumber', key: 'phoneNumber' },
]

const selectCheckInItem = async (e: any, value: any) => {
  alert("test")
  const item = value.item.raw as BookCheckInOutType
  emit('update:setCheckedOutItemToCheckIn', item)
  nextStep()
}



const nextStep = () => {

  emit('update:currentStep', props.currentStep ? props.currentStep + 1 : 1)
}

</script>

<template>
  <VDataTableServer v-if="props.checkedOutBookList" :headers="headers" :items="props.checkedOutBookList"
    :items-length="props.checkedOutBookList.length" class="text-no-wrap rounded-0" @click:row="selectCheckInItem">

    <!-- userName -->
    <template #item.userName="{ item }">
      <span class="text-sm">{{ item.raw.userName }}</span>
    </template>

    <!-- tckn -->
    <template #item.tckn="{ item }">
      <span class="text-sm">{{ item.raw.tckn }}</span>
    </template>

    <!-- phoneNumber -->
    <template #item.phoneNumber="{ item }">
      <span class="text-sm">{{ item.raw.phoneNumber }}</span>
    </template>

  </VDataTableServer>
</template>



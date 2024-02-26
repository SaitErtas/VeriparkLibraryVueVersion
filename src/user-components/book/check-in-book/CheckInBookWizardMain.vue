<script setup lang="ts">
import { BookCheckInOutType } from '@/types/check-in-out/checkInOutTypes';
import userAxios from '@/user-functions/userAxios';
import CheckInBookConfirmation from './CheckInBookConfirmation.vue';
import CheckedOutBookList from './CheckedOutBookList.vue';


const checkoutSteps = [
  {
    title: 'CheckedOutBooks',
    icon: 'custom-cart',
  },
  {
    title: 'Confirmation',
    icon: 'custom-address',
  },
]

const emit = defineEmits<{
  (e: 'update:isVisibleCheckInBookDialog', value: boolean): void
}>()


const bookId = defineModel<number>("bookId", { default: 0 });
const checkedOutBookList = ref<BookCheckInOutType[]>()
const checkedOutBookItem = ref<BookCheckInOutType>()

const currentStep = ref(0)


const getCheckedOutList = async () => {

  const resultAxios = await userAxios.get({
    method: 'Books/get-checked-out-list/?id=' + bookId.value
  })
  const responseData = await resultAxios?.data.result

  checkedOutBookList.value = responseData.bookCheckInOuts;
}

const checkInItem = ref<BookCheckInOutType>()

onMounted(() => {
  getCheckedOutList()
})


const setCheckedOutItemToCheckIn = async (value: BookCheckInOutType) => {
  checkedOutBookItem.value = value
}


const isVisibleCheckInBookDialogMethod = (val: boolean) => {
  console.log("val", val)
  emit('update:isVisibleCheckInBookDialog', val)
}


</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <!-- 👉 stepper content -->
      <VWindow v-model="currentStep" class="disable-tab-transition" :touch="false">
        <VWindowItem>
          <CheckedOutBookList v-model:current-step="currentStep" v-if="checkedOutBookList"
            :checkedOutBookList="checkedOutBookList" @update:setCheckedOutItemToCheckIn="setCheckedOutItemToCheckIn" />
        </VWindowItem>
        <VWindowItem>
          <CheckInBookConfirmation v-if="checkedOutBookItem" v-model:current-step="currentStep"
            v-model:checkedOutBookItem="checkedOutBookItem"
            @update:isVisibleCheckInBookDialog="isVisibleCheckInBookDialogMethod" />


        </VWindowItem>
      </VWindow>
    </VCardText>
    <VDivider />
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper v-model:current-step="currentStep" class="checkout-stepper" :items="checkoutSteps" icon-size="60"
        :direction="$vuetify.display.smAndUp ? 'horizontal' : 'vertical'" />
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.checkout-stepper {
  .stepper-icon-step {
    .step-wrapper+svg {
      margin-inline: 3.5rem !important;
    }
  }
}
</style>

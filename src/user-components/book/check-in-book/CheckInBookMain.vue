<script setup lang="ts">
import { BookCheckInOutType } from '@/types/check-in-out/checkInOutTypes';
import userAxios from '@/user-functions/userAxios';
import AddressContent from '@/views/wizard-examples/checkout/Address.vue';
import CartContent from '@/views/wizard-examples/checkout/Cart.vue';
import ConfirmationContent from '@/views/wizard-examples/checkout/Confirmation.vue';
import PaymentContent from '@/views/wizard-examples/checkout/Payment.vue';

interface Props {
  bookId: number
}

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

const props = defineProps<Props>()


const checkedOutBookList = ref<BookCheckInOutType[]>()

const currentStep = ref(0)


const getCheckedOutList = async () => {

  const resultAxios = await userAxios.get({
    method: 'Books/get-checked-out-list/?id=' + props.bookId
  })
  const responseData = await resultAxios?.data.result

  checkedOutBookList.value = responseData.bookCheckInOuts;
}

</script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper v-model:current-step="currentStep" class="checkout-stepper" :items="checkoutSteps" icon-size="60"
        :direction="$vuetify.display.smAndUp ? 'horizontal' : 'vertical'" />
    </VCardText>

    <VDivider />

    <VCardText class="pa-6">
      <!-- 👉 stepper content -->
      <VWindow v-model="currentStep" class="disable-tab-transition" :touch="false">
        <VWindowItem>
          <CartContent v-model:current-step="currentStep" v-model:checkout-data="checkoutData" />
        </VWindowItem>

        <VWindowItem>
          <AddressContent v-model:current-step="currentStep" v-model:checkout-data="checkoutData" />
        </VWindowItem>

        <VWindowItem>
          <PaymentContent v-model:current-step="currentStep" v-model:checkout-data="checkoutData" />
        </VWindowItem>

        <VWindowItem>
          <ConfirmationContent v-model:checkout-data="checkoutData" />
        </VWindowItem>
      </VWindow>
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

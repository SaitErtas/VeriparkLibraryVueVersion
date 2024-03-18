<script setup lang="ts">
import type { BookListItemType } from '@/types/book/bookTypes'
import AddBook from '@/user-components/book/add-book/AddBook.vue'
import CheckInBookDialog from '@/user-components/book/check-in-book/CheckInBookDialog.vue'
import CheckOutBook from '@/user-components/book/check-out-book/CheckOutBook.vue'
import userAxios from '@/user-functions/userAxios'
import type { Options } from '@core/types'
import { ref } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@/user-functions/utils'
import { VDataTable } from 'vuetify/labs/VDataTable'


// 👉 Store
const openCheckOutBookDialog = ref(false)
const openCheckInBookDialog = ref(false)
const bookList = ref<BookListItemType[]>([])
const bookListItem = ref<BookListItemType>()
const searchQuery = ref('')


const options = ref<Options>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'ISBN', key: 'isbn' },
  { title: 'StockAmount', key: 'stockAmount' },
  { title: 'CheckOutAmount', key: 'checkOutAmount' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// 👉 Fetching users
const getBookList = async () => {
  const resultAxios = await userAxios.get({
    method: 'Books/list/',
  })

  const responseData = await resultAxios?.data.result

  bookList.value = responseData.books
}

onMounted(() => {
  getBookList()
})

//watchEffect(getBookList)

// 👉 Update Book
const updateBook = (id: number) => {
  // refetch User
  getBookList()
}

// 👉 checkOutBook
const openCheckOutBook = async (item: BookListItemType) => {
  console.log('item:', item)
  bookListItem.value = item
  console.log('bookListItem:', bookListItem.value)
  openCheckOutBookDialog.value = true

}

const closeCheckOutBookDialog = (val: boolean) => {
  console.log('test')
  openCheckOutBookDialog.value = val
  // refetch getBookList
  getBookList()
}

//Add Book Area
// 👉 AddBook
const openAddBookDialog = ref(false)
const openAddBook = async () => {
  openAddBookDialog.value = true

}

const closeAddBookDialog = (val: boolean) => {
  console.log('test')
  openAddBookDialog.value = val
  // refetch getBookList
  getBookList()
}


// 👉 checkInBook
const openCheckInBook = async (item: BookListItemType) => {
  bookListItem.value = item
  openCheckInBookDialog.value = true

}
// 👉 checkInBook
const isVisibleCheckInBookDialogMethod = async (val: boolean) => {
  openCheckInBookDialog.value = val
  getBookList()
}


// 👉 addBook
const addBook = (id: number) => {
  // refetch User
  getBookList()
}

function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

// 👉 watch for data table options like itemsPerPage,page,searchQuery,sortBy etc...
watchEffect(() => {

  const page = options.value.page
  const bookListCount = bookList.value.length

  console.log(page)
  console.log("watchEffect")
  console.log(bookListCount)


})

</script>

<template class="justify-center">
  <div>
    <VCard class="mb-6 text-center" title="VERİPARK LIBRARY PROJECT">



      <VCardText class="d-flex align-center flex-wrap gap-4">


        <VSpacer />

        <div class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Search  -->
          <div class="invoice-list-search">
            <VTextField v-model="searchQuery" placeholder="Search" density="compact" />
          </div>

          <!-- 👉 Create invoice -->
          <VBtn prepend-icon="mdi-plus" @click="openAddBook">
            Add Book
          </VBtn>
        </div>
      </VCardText>

      <!-- SECTION datatable. Bu kısım dinmaik olarak pagin yapmanı bekler. He event için backendde gidilmeli -->
      <!-- SMevcut verileri paging falan yapan kod vDataTable olarak checkInBook da -->

      <VDataTableServer v-model:items-per-page="options.itemsPerPage" v-model:page="options.page" :items="bookList"
        :items-length="bookList.length" :headers="headers" class="text-no-wrap rounded-0" :search="searchQuery"
        @update:options="options = $event">
        <!-- Name -->
        <template #item.name="{ item }">
          <div class="d-flex">
            <div class="d-flex flex-column">
              <span class="text-xs text-medium-emphasis">{{ item.raw.name }}</span>
            </div>
          </div>
        </template>

        <!-- ISBN -->
        <template #item.isbn="{ item }">
          <div class="d-flex">
            <div class="d-flex flex-column">
              <span class="text-xs text-medium-emphasis">{{ item.raw.isbn }}</span>
            </div>
          </div>
        </template>

        <!-- stockAmount -->
        <template #item.stockAmount="{ item }">
          <div class="d-flex">
            <div class="d-flex flex-column">
              <span class="text-xs text-medium-emphasis">{{ item.raw.stockAmount }}</span>
            </div>
          </div>
        </template>

        <!-- checkOutAmount -->
        <template #item.checkOutAmount="{ item }">
          <div class="d-flex">
            <div class="d-flex flex-column">
              <span class="text-xs text-medium-emphasis">{{ item.raw.checkOutAmount }}</span>
            </div>
          </div>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <div class="d-flex">
            <div class="d-flex flex-column">
              <VBtn icon variant="text" size="small" color="medium-emphasis">
                <VIcon size="24" icon="mdi-dots-vertical" />

                <VMenu activator="parent">
                  <VList>
                    <VListItem>
                      <VListItem @click="updateBook(item.raw.id)">
                        <template #prepend>
                          <VIcon icon="mdi-edit-outline" />
                        </template>
                        <VListItemTitle>Update Book</VListItemTitle>
                      </VListItem>
                      <VListItem @click="openCheckOutBook(item.raw)">
                        <template #prepend>
                          <VIcon icon="mdi-book-arrow-up-outline" />
                        </template>
                        <VListItemTitle>CheckOut Book</VListItemTitle>
                      </VListItem>
                      <VListItem @click="openCheckInBook(item.raw)">
                        <template #prepend>
                          <VIcon icon="mdi-book-arrow-down-outline" />
                        </template>
                        <VListItemTitle>CheckIn Book</VListItemTitle>
                      </VListItem>
                    </vlistitem>
                  </VList>
                </VMenu>
              </VBtn>
            </div>
          </div>
        </template>

        <!-- pagination  -->
        <template #bottom>
          <VDivider />
          <div class="d-flex gap-x-6 flex-wrap justify-end pa-2">
            <div class="d-flex align-center gap-x-2 text-sm">
              Rows Per Page:
              <VSelect v-model="options.itemsPerPage" variant="plain" class="per-page-select text-high-emphasis"
                density="compact" :items="[10, 20, 25, 50, 100]" />
            </div>
            <div class="d-flex text-sm align-center text-high-emphasis">
              {{ paginationMeta(options, bookList.length) }}
            </div>
            <div class="d-flex gap-x-2 align-center">
              <VBtn class="flip-in-rtl" icon="mdi-chevron-left" variant="text" density="comfortable" color="default"
                :disabled="options.page <= 1" @click="options.page <= 1 ? options.page = 1 : options.page--" />

              <VBtn class="flip-in-rtl" icon="mdi-chevron-right" density="comfortable" variant="text" color="default"
                :disabled="options.page >= Math.ceil(bookList.length / options.itemsPerPage)"
                @click="options.page >= Math.ceil(bookList.length / options.itemsPerPage) ? options.page = Math.ceil(bookList.length / options.itemsPerPage) : options.page++" />
            </div>
          </div>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
  </div>

  <CheckOutBook v-if="bookListItem" :is-dialog-visible="openCheckOutBookDialog"
    :check-out-book-type-item="{ bookId: bookListItem?.id, bookName: bookListItem.name, phoneNumber: '', tckn: 0, userName: '' }"
    @update:is-dialog-visible="closeCheckOutBookDialog" />

  <AddBook :is-add-book-dialog-visible="openAddBookDialog" @update:is-add-book-dialog-visible="closeAddBookDialog" />

  <CheckInBookDialog v-if="bookListItem" :bookId="bookListItem.id" :bookName="bookListItem.name"
    :isVisibleCheckInBookDialog="openCheckInBookDialog"
    @update:isVisibleCheckInBookDialog="isVisibleCheckInBookDialogMethod" />
</template>

<route lang="yaml">
meta:
  layout: blank
  </route>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>

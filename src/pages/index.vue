<script setup lang="ts">
import type { BookListItemType } from '@/types/book/bookTypes'
import AddBook from '@/user-components/book/add-book/AddBook.vue'
import CheckOutBook from '@/user-components/book/check-out-book/CheckOutBook.vue'
import userAxios from '@/user-functions/userAxios'
import type { Options } from '@core/types'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

// 👉 Store
const totalUsers = ref(0)
const openCheckOutBookDialog = ref(false)
const bookList = ref<BookListItemType[]>([])
const bookListItem = ref<BookListItemType>()

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
  totalUsers.value = bookList.value.length
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
const checkInBook = (id: number) => {
  // refetch User
  getBookList()
}

// 👉 addBook
const addBook = (id: number) => {
  // refetch User
  getBookList()
}
</script>

<template class="justify-center">
  <div>
    <VCard class="mb-6 text-center" title="VERİPARK LIBRARY PROJECT">

      <VCardText class="d-flex justify-space-between flex-wrap gap-4">
        <VBtn color="secondary" variant="outlined" @click="openAddBook">
          AddBook
        </VBtn>
      </VCardText>
      <!-- SECTION datatable -->
      <VDataTableServer v-model:items-per-page="options.itemsPerPage" v-model:page="options.page" :items="bookList"
        :items-length="bookList.length" :headers="headers" class="text-no-wrap rounded-0"
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
          <span class="text-sm">{{ item.raw.isbn }}</span>
        </template>

        <!-- stockAmount -->
        <template #item.stockAmount="{ item }">
          <span class="text-sm">{{ item.raw.stockAmount }}</span>
        </template>

        <!-- checkOutAmount -->
        <template #item.checkOutAmount="{ item }">
          <span class="text-sm">{{ item.raw.checkOutAmount }}</span>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
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
                  <VListItem @click="checkInBook(item.raw.id)">
                    <template #prepend>
                      <VIcon icon="mdi-book-arrow-down-outline" />
                    </template>
                    <VListItemTitle>CheckIn Book</VListItemTitle>
                  </VListItem>
                </vlistitem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />
          <div class="d-flex gap-x-6 flex-wrap justify-end pa-2">
            <div class="d-flex align-center gap-x-2 text-sm">
              Rows Per Page:
              <VSelect v-model="options.itemsPerPage" variant="plain" class="per-page-select text-high-emphasis"
                density="compact" :items="[10, 20, 25, 50, 100]" />
            </div>

            <div class="d-flex gap-x-2 align-center">
              <VBtn class="flip-in-rtl" icon="mdi-chevron-left" variant="text" density="comfortable" color="default"
                :disabled="options.page <= 1" @click="options.page <= 1 ? options.page = 1 : options.page--" />

              <VBtn class="flip-in-rtl" icon="mdi-chevron-right" density="comfortable" variant="text" color="default"
                :disabled="options.page >= Math.ceil(totalUsers / options.itemsPerPage)"
                @click="options.page >= Math.ceil(totalUsers / options.itemsPerPage) ? options.page = Math.ceil(totalUsers / options.itemsPerPage) : options.page++" />
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

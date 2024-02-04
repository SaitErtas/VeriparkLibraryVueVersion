<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import type { UserProperties } from '@/@fake-db/types'
import { paginationMeta } from '@/@fake-db/utils'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import type { Options } from '@core/types'
import { avatarText } from '@core/utils/formatters'

// 👉 Store
const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref<UserProperties[]>([])

const options = ref<Options>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  { title: 'User', key: 'user' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Plan', key: 'plan' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// 👉 Fetching users
const fetchUsers = () => {
  userListStore.fetchUsers({
    q: searchQuery.value,
    status: selectedStatus.value,
    plan: selectedPlan.value,
    role: selectedRole.value,
    options: options.value,
  }).then((response: { data: { users: any[]; totalPage: number; totalUsers: number; page: number } }) => {
    users.value = response.data.users
    totalPage.value = response.data.totalPage
    totalUsers.value = response.data.totalUsers
    options.value.page = response.data.page
  }).catch((error: any) => {
    console.error(error)
  })
}

watchEffect(fetchUsers)

// 👉 search filters
const _roles = [
  { title: 'Admin', value: 'admin' },
  { title: 'Author', value: 'author' },
  { title: 'Editor', value: 'editor' },
  { title: 'Maintainer', value: 'maintainer' },
  { title: 'Subscriber', value: 'subscriber' },
]

const _plans = [
  { title: 'Basic', value: 'basic' },
  { title: 'Company', value: 'company' },
  { title: 'Enterprise', value: 'enterprise' },
  { title: 'Team', value: 'team' },
]

const _status = [
  { title: 'Pending', value: 'pending' },
  { title: 'Active', value: 'active' },
  { title: 'Inactive', value: 'inactive' },
]

const resolveUserRoleVariant = (role: string) => {
  const roleLowerCase = role.toLowerCase()

  if (roleLowerCase === 'subscriber')
    return { color: 'primary', icon: 'mdi-account-outline' }
  if (roleLowerCase === 'author')
    return { color: 'warning', icon: 'mdi-cog-outline' }
  if (roleLowerCase === 'maintainer')
    return { color: 'success', icon: 'mdi-chart-donut' }
  if (roleLowerCase === 'editor')
    return { color: 'info', icon: 'mdi-pencil-outline' }
  if (roleLowerCase === 'admin')
    return { color: 'error', icon: 'mdi-laptop' }

  return { color: 'primary', icon: 'mdi-account-outline' }
}

const resolveUserStatusVariant = (stat: string) => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'

  return 'primary'
}

// eslint-disable-next-line unused-imports/no-unused-vars
const isAddNewUserDrawerVisible = ref(false)

// 👉 Add new user
const _addNewUser = (userData: UserProperties) => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}

// 👉 Delete user
const deleteUser = (id: number) => {
  userListStore.deleteUser(id)

  // refetch User
  fetchUsers()
}
</script>

<template class="justify-center">
  <div>
    <VCard
      class="mb-6 text-center"
      title="VERİPARK LIBRARY PROJECT"
    />
    <!-- SECTION datatable -->
    <VDataTableServer
      v-model:items-per-page="options.itemsPerPage"
      v-model:page="options.page"
      :items="users"
      :items-length="totalUsers"
      :headers="headers"
      show-select
      class="text-no-wrap rounded-0"
      @update:options="options = $event"
    >
      <!-- User -->
      <template #item.user="{ item }">
        <div class="d-flex">
          <VAvatar
            size="34"
            :variant="!item.raw.avatar ? 'tonal' : undefined"
            :color="!item.raw.avatar ? resolveUserRoleVariant(item.raw.role).color : undefined"
            class="me-3"
          >
            <VImg
              v-if="item.raw.avatar"
              :src="item.raw.avatar"
            />
            <span
              v-else
              class="text-sm"
            >{{ avatarText(item.raw.fullName) }}</span>
          </VAvatar>

          <div class="d-flex flex-column">
            <h6 class="text-sm">
              <RouterLink
                :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }"
                class="font-weight-medium user-list-name"
              >
                {{ item.raw.fullName }}
              </RouterLink>
            </h6>

            <span class="text-xs text-medium-emphasis">@{{ item.raw.username }}</span>
          </div>
        </div>
      </template>

      <!-- Email -->
      <template #item.email="{ item }">
        <span class="text-sm">{{ item.raw.email }}</span>
      </template>

      <!-- Role -->
      <template #item.role="{ item }">
        <div class="d-flex gap-x-2">
          <VIcon
            :icon="resolveUserRoleVariant(item.raw.role).icon"
            :color="resolveUserRoleVariant(item.raw.role).color"
          />
          <span class="text-capitalize">{{ item.raw.role }}</span>
        </div>
      </template>

      <!-- Plan -->
      <template #item.plan="{ item }">
        <span class="text-capitalize text-high-emphasis">{{ item.raw.currentPlan }}</span>
      </template>

      <!-- Status -->
      <template #item.status="{ item }">
        <VChip
          :color="resolveUserStatusVariant(item.raw.status)"
          size="small"
          class="text-capitalize"
        >
          {{ item.raw.status }}
        </VChip>
      </template>

      <!-- Actions -->
      <template #item.actions="{ item }">
        <VBtn
          icon
          variant="text"
          size="small"
          color="medium-emphasis"
        >
          <VIcon
            size="24"
            icon="mdi-dots-vertical"
          />

          <VMenu activator="parent">
            <VList>
              <VListItem :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }">
                <template #prepend>
                  <VIcon icon="mdi-eye-outline" />
                </template>
                <VListItemTitle>View</VListItemTitle>
              </VListItem>
              <VListItem link>
                <template #prepend>
                  <VIcon icon="mdi-pencil-outline" />
                </template>
                <VListItemTitle>Edit</VListItemTitle>
              </VListItem>
              <VListItem @click="deleteUser(item.raw.id)">
                <template #prepend>
                  <VIcon icon="mdi-delete-outline" />
                </template>
                <VListItemTitle>Delete</VListItemTitle>
              </VListItem>
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
            <VSelect
              v-model="options.itemsPerPage"
              variant="plain"
              class="per-page-select text-high-emphasis"
              density="compact"
              :items="[10, 20, 25, 50, 100]"
            />
          </div>
          <div class="d-flex text-sm align-center text-high-emphasis">
            {{ paginationMeta(options, totalUsers) }}
          </div>
          <div class="d-flex gap-x-2 align-center">
            <VBtn
              class="flip-in-rtl"
              icon="mdi-chevron-left"
              variant="text"
              density="comfortable"
              color="default"
              :disabled="options.page <= 1"
              @click="options.page <= 1 ? options.page = 1 : options.page--"
            />

            <VBtn
              class="flip-in-rtl"
              icon="mdi-chevron-right"
              density="comfortable"
              variant="text"
              color="default"
              :disabled="options.page >= Math.ceil(totalUsers / options.itemsPerPage)"
              @click="options.page >= Math.ceil(totalUsers / options.itemsPerPage) ? options.page = Math.ceil(totalUsers / options.itemsPerPage) : options.page++ "
            />
          </div>
        </div>
      </template>
    </VDataTableServer>
    <!-- SECTION -->
  </div>
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

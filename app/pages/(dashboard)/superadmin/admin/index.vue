<script lang="ts" setup>
const router = useRouter()

const { data: admins } = await useFetch('/api/admins')

definePageMeta({
  layout: 'superadmin',
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">
        Daftar Admin
      </h1>
      <div class="flex gap-5 items-center">
        <button
          class="bg-transparent text-xl"
          @click="router.go(0)"
        >
          <Icon
            name="solar:refresh-bold-duotone"
            class="text-yellow-600"
          />
        </button>
        <NuxtLink
          :to="{ name: 'AddAdmin' }"
          class="bg-transparent text-xl"
        >
          <Icon
            name="solar:add-square-bold-duotone"
            class="text-sky-500"
          />
        </NuxtLink>
      </div>
    </div>
    <div class="w-full grid grid-cols-3 gap-x-8 gap-y-6">
      <template v-if="admins && admins?.length > 0">
        <SuperadminAdminCard
          v-for="admin in admins"
          :key="admin.id"
          :admin="admin"
        />
      </template>
      <template v-else>
        <div class="text-center text-lg text-gray-500 col-span-3">
          Admin Masih Kosong
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
</style>

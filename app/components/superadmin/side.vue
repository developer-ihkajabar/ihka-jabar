<script lang="ts" setup>
const { logout } = useAuthSuperadminStore()
</script>

<template>
  <div class="h-screen border px-8 py-4 flex flex-col justify-between">
    <div class="flex flex-col gap-4">
      <div class="text-lg font-semibold flex items-center gap-2">
        <Icon
          name="solar:people-nearby-bold-duotone"
          class="text-blue-400 text-4xl"
        />
        Super Admin
      </div>
      <div class="w-full h-px bg-slate-200" />
      <div class="flex flex-col gap-2 text-lg">
        <NuxtLink
          :to="{ name: 'Admin' }"
          class="flex items-center gap-2 py-1 px-2 hover:bg-slate-100 hover:-translate-y-0.5 rounded-lg ease-in-out duration-300 group transition-all"
        >
          <Icon
            name="solar:book-2-line-duotone"
            class="group-hover:scale-110 transition-all duration-500"
          /> Admin
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <NuxtLink
        :to="{ name: 'SuperadminProfile' }"
        class="w-full justify-center flex items-center gap-2 py-1 px-2 text-sm rounded-lg ease-in-out duration-150 group transition-all bg-transparent hover:bg-slate-100 hover:-translate-y-0.5"
      >
        <Icon
          name="solar:user-circle-line-duotone"
          class="group-hover:scale-110 transition-all duration-300 text-sky-500"
        /> Akun
      </NuxtLink>
      <button
        class="w-full justify-center flex items-center gap-2 py-1 px-2 text-sm rounded-lg ease-in-out duration-150 group transition-all bg-transparent hover:bg-slate-100 hover:-translate-y-0.5"
        @click="logout"
      >
        <Icon
          name="solar:logout-2-line-duotone"
          class="group-hover:scale-110 transition-all duration-300 text-red-500"
        /> Logout
      </button>
    </div>
  </div>
</template>

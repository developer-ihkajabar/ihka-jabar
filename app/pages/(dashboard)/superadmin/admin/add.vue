<script lang="ts" setup>
// import { useCabangStore } from '@/stores/cabangStore'
// import type { FormDataAddAdmin } from '@/types/formdataAddAdmin'
// import { useAdminStore } from '@/stores/adminStore'
// import SolarArrowLeftLineDuotone from '~icons/solar/arrow-left-line-duotone'

// const { cabangList } = storeToRefs(useCabangStore())
const router = useRouter()

// Data ========================================================================
const formAddAdmin = reactive({
  email: '',
  password: '',
  name: '',
  cabangId: undefined,
  isModerator: false,
  isAdminDaerah: false,
})
const passwordConfirmation = ref('')

// // Methods =====================================================================
async function handleAddAdmin() {
  // await createAdmin(formAddAdmin)
  router.go(-1)
}

definePageMeta({
  name: 'AddAdmin',
  layout: 'superadmin',
})
</script>

<template>
  <div class="space-y-4 p-5">
    <button
      class="rounded-full p-2"
      @click="router.go(-1)"
    >
      <Icon
        name="solar:arrow-left-line-duotone"
        class="text-2xl text-slate-900"
      />
    </button>
    <h1 class="text-3xl font-bold">
      Add Admin
    </h1>
    <form
      class="flex flex-col gap-3 max-w-md"
      @submit.prevent="handleAddAdmin"
    >
      <label class="flex flex-col gap-1">
        <span class="font-semibold">Name</span>
        <input
          v-model="formAddAdmin.name"
          required
          type="text"
          placeholder="Masukkan nama admin"
          class="border px-2 py-1 rounded-sm"
        >
      </label>
      <label class="flex flex-col gap-1">
        <span class="font-semibold">Email</span>
        <input
          v-model="formAddAdmin.email"
          required
          placeholder="Masukkan email admin"
          type="email"
          class="border px-2 py-1 rounded-sm"
        >
      </label>
      <label class="flex flex-col gap-1">
        <span class="font-semibold">Password</span>
        <input
          v-model="formAddAdmin.password"
          required
          type="password"
          placeholder="Masukkan password"
          class="border px-2 py-1 rounded-sm"
        >
      </label>
      <label class="flex flex-col gap-1">
        <span class="font-semibold">Konfirmasi Password</span>
        <input
          v-model="passwordConfirmation"
          required
          type="password"
          placeholder="Ulangi password"
          class="border px-2 py-1 rounded-sm"
        >
      </label>
      <div class="flex flex-col gap-1">
        <span class="font-semibold">Jenis Admin</span>
        <div class="flex gap-3">
          <label class="flex items-center gap-1">
            <input
              v-model="formAddAdmin.isAdminDaerah"
              required
              type="radio"
              :value="false"
              placeholder=""
            >
            <span>BPC</span>
          </label>
          <label class="flex items-center gap-1">
            <input
              v-model="formAddAdmin.isAdminDaerah"
              required
              type="radio"
              :value="true"
              placeholder=""
              @select="formAddAdmin.cabangId = undefined"
            >
            <span>BPD</span>
          </label>
        </div>
      </div>
      <label
        v-if="!formAddAdmin.isAdminDaerah"
        class="flex flex-col gap-1"
      >
        <span class="font-semibold">Wilayah</span>
        <!-- <select
          v-model="formAddAdmin.cabangId"
          class="border px-3 py-1 rounded-md"
          required
        >
          <option
            v-for="cabang in cabangList"
            :key="cabang.name"
            :value="cabang.id"
          >{{ cabang.name }}</option>
        </select> -->
      </label>
      <div class="flex flex-col gap-1">
        <span class="font-semibold">Jenis Akun</span>
        <div class="flex items-center gap-3">
          <label class="flex gap-1 items-center">
            <input
              v-model="formAddAdmin.isModerator"
              type="radio"
              :value="false"
            >
            <span>Admin</span>
          </label>
          <label class="flex gap-1 items-center">
            <input
              v-model="formAddAdmin.isModerator"
              type="radio"
              :value="true"
            >
            <span>Admin + Moderator</span>
          </label>
        </div>
      </div>
      <button class="py-2 rounded-md bg-slate-400 text-white">
        Buat Admin
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>

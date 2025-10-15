<script lang="ts" setup>
import { useAuthAdminStore } from '@/stores/authAdmin'
import { useCabangStore } from '@/stores/cabang'
import isValidPhoneNumber from '@/utils/isValidPhoneNumber'

// Dependencies ================================================================
const { user } = storeToRefs(useAuthAdminStore())
const { editProfile } = useAuthAdminStore()
const { getCabangById } = useCabangStore()
const toast = useToast()
// Data ========================================================================
const inputEmail = ref(user.value?.email ?? '')
const inputName = ref(user.value?.name ?? '')
const inputNoTelp = ref(user.value?.no_telp ?? '')
const inputPassword = ref('')
const inputPasswordConfirm = ref('')

const isEditName = ref(false)
const isEditEmail = ref(false)
const isEditNoTelp = ref(false)
const isEditPassword = ref(false)

// Functions ===================================================================
async function saveName() {
  await editProfile({ name: inputName.value })
  isEditName.value = false
}
async function saveEmail() {
  await editProfile({ email: inputEmail.value })
  isEditEmail.value = false
}
async function saveNoTelp() {
  if (!inputNoTelp.value)
    return
  if (!isValidPhoneNumber(inputNoTelp.value)) {
    toast.add({
      title: 'No Telp/Whatsapp tidak valid',
      color: 'rose',
      description: 'Masukkan No Telp/Whatsapp yang valid',
    })
    return
  }
  await editProfile({ no_telp: inputNoTelp.value })
  isEditNoTelp.value = false
}

async function savePassword() {
  // if (!inputPassword.value) {
  //   $toast.warning('Masukkan password baru')
  //   return
  // }
  // if (inputPassword.value !== inputPasswordConfirm.value) {
  //   $toast.error('Password tidak sama')
  //   $toast.warning('Masukkan password yang sama')
  //   return
  // }
  // await editProfile({ password: inputPassword.value })
  // isEditPassword.value = false
}

// Other =====================================================================
definePageMeta({
  name: 'AdminProfile',
  layout: 'admin',
})
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-3xl font-bold">
      Profile
    </h1>
    <div class="w-1/2">
      <h3 class="text-xl">
        Nama Lengkap
      </h3>
      <div
        v-if="isEditName"
        class="w-full flex items-center gap-3"
      >
        <input
          v-model="inputName"
          type="text"
          class="border py-0.5 px-3 border-slate-400 rounded-sm w-full"
          placeholder="Masukkan nama lengkap"
        >
        <button
          class="bg-transparent"
          @click="isEditName = false"
        >
          <Icon
            name="solar:close-square-line-duotone"
            class="text-orange"
          />
        </button>
        <button
          class="bg-transparent"
          @click="saveName"
        >
          <Icon
            name="solar:check-square-bold-duotone"
            class="text-green-6"
          />
        </button>
      </div>
      <div
        v-else
        class=""
      >
        <p class="capitalize">
          {{ user?.name }} <button
            class="ml-2 bg-transparent"
            @click="isEditName = true"
          >
            <Icon
              name="solar:pen-2-line-duotone"
              class="inline text-xs"
            />
          </button>
        </p>
      </div>
    </div>
    <div class="w-1/2">
      <h3 class="text-xl">
        Email
      </h3>
      <div
        v-if="isEditEmail"
        class="w-full flex items-center gap-3"
      >
        <input
          v-model="inputEmail"
          type="text"
          class="border py-0.5 px-3 border-slate-400 rounded-sm w-full"
          placeholder="Masukkan nama lengkap"
        >
        <button
          class="bg-transparent"
          @click="isEditEmail = false"
        >
          <Icon
            name="solar:close-square-line-duotone"
            class="text-orange"
          />
        </button>
        <button
          class="bg-transparent"
          @click="saveEmail"
        >
          <Icon
            name="solar:check-square-bold-duotone"
            class="text-green-6"
          />
        </button>
      </div>
      <div
        v-else
        class=""
      >
        <p>
          {{ user?.email }} <button
            class="ml-2 bg-transparent"
            @click="isEditEmail = true"
          >
            <Icon
              name="solar:pen-2-line-duotone"
              class="inline text-xs"
            />
          </button>
        </p>
      </div>
    </div>
    <div class="w-1/2">
      <h3 class="text-xl">
        No Telp/Whatsapp
      </h3>
      <div
        v-if="isEditNoTelp"
        class="w-full flex items-center gap-3"
      >
        <input
          v-model="inputNoTelp"
          type="text"
          class="border py-0.5 px-3 border-slate-400 rounded-sm w-full"
          placeholder="Masukkan No Telp/Whatsapp"
        >
        <button
          class="bg-transparent"
          @click="isEditNoTelp = false"
        >
          <Icon
            name="solar:close-square-line-duotone"
            class="text-orange"
          />
        </button>
        <button
          class="bg-transparent"
          @click="saveNoTelp"
        >
          <Icon
            name="solar:check-square-bold-duotone"
            class="text-green-6"
          />
        </button>
      </div>
      <div
        v-else
        class=""
      >
        <p>
          {{ user?.no_telp ?? 'Belum diatur' }} <button
            class="ml-2 bg-transparent"
            @click="isEditNoTelp = true"
          >
            <Icon
              name="solar:pen-2-line-duotone"
              class="inline text-xs"
            />
          </button>
        </p>
      </div>
    </div>
    <div class="w-1/2">
      <h3 class="text-xl">
        Cabang
      </h3>
      <p>
        {{ getCabangById(user!.cabang_id!)?.name }}
      </p>
    </div>
    <div class="w-1/2">
      <h3 class="text-xl">
        Password
      </h3>
      <div
        v-if="isEditPassword"
        class="w-full flex items-center gap-3"
      >
        <input
          v-model="inputPassword"
          type="text"
          class="border py-0.5 px-3 border-slate-400 rounded-sm w-full"
          placeholder="Masukkan password baru"
        >
        <input
          v-model="inputPasswordConfirm"
          type="text"
          class="border py-0.5 px-3 border-slate-400 rounded-sm w-full"
          placeholder="Masukkan ulang password"
        >
        <button
          class="bg-transparent"
          @click="isEditPassword = false"
        >
          <Icon
            name="solar:close-square-line-duotone"
            class="text-orange"
          />
        </button>
        <button
          class="bg-transparent"
          @click="savePassword"
        >
          <Icon
            name="solar:check-square-bold-duotone"
            class="text-green-6"
          />
        </button>
      </div>
      <div
        v-else
        class=""
      >
        <p>
          ************** <button
            class="ml-2 bg-transparent"
            @click="isEditPassword = true"
          >
            <Icon
              name="solar:pen-2-line-duotone"
              class="inline text-xs"
            />
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

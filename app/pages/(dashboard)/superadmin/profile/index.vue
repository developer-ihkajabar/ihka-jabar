<script lang="ts" setup>
// Dependencies ================================================================
const toast = useToast()
// Data ========================================================================
// const inputUsername = ref(authSuperadmin.value?.username ?? '')
const inputPassword = ref('')
const inputPasswordConfirm = ref('')

const isEditUsername = ref(false)
const isEditPassword = ref(false)

// Functions ===================================================================
async function saveUsername() {
  // await editProfile({ username: inputUsername.value })
  isEditUsername.value = false
}

async function savePassword() {
  if (!inputPassword.value) {
    toast.add({
      title: 'Password baru kosong',
      description: 'Masukkan password baru',
      color: 'warning',
    })
    return
  }
  if (inputPassword.value !== inputPasswordConfirm.value) {
    toast.add({
      title: 'Password tidak sama',
      description: 'Masukkan password yang sama',
      color: 'warning',
    })
    return
  }
  // await editProfile({ password: inputPassword.value })
  isEditPassword.value = false
}

// Other =====================================================================
definePageMeta({
  name: 'SuperadminProfile',
  layout: 'superadmin',
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
        v-if="isEditUsername"
        class="w-full flex items-center gap-3"
      >
        <input
          type="text"
          class="border py-0.5 px-3 border-slate-400 rounded-sm w-full"
          placeholder="Masukkan nama lengkap"
        >
        <button
          class=""
          @click="isEditUsername = false"
        >
          <Icon
            name="solar:close-square-line-duotone"
            class="text-orange-600"
          />
        </button>
        <button
          class=""
          @click="saveUsername"
        >
          <Icon
            name="solar:check-square-bold-duotone"
            class="text-green-600"
          />
        </button>
      </div>
      <div
        v-else
        class=""
      >
        <!-- <ClientOnly>
          <p>
            {{ authSuperadmin?.username }} <button
              class="ml-2"
              @click="isEditUsername = true"
            >
              <Icon
                name="solar:pen-2-line-duotone"
                class="text-xs"
              />
            </button>
          </p>
        </ClientOnly> -->
      </div>
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
          class=""
          @click="isEditPassword = false"
        >
          <Icon
            name="solar:close-square-line-duotone"
            class="text-orange-600"
          />
        </button>
        <button
          class=""
          @click="savePassword"
        >
          <Icon
            name="solar:check-square-bold-duotone"
            class="text-green-600"
          />
        </button>
      </div>
      <div
        v-else
        class=""
      >
        <p>
          ************** <button
            class="ml-2 "
            @click="isEditPassword = true"
          >
            <Icon
              name="solar:pen-2-line-duotone"
              class="text-xs"
            />
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

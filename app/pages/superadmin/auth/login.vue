<script lang="ts" setup>
definePageMeta({
  name: 'SuperadminLogin',
  layout: false,
})

const { login } = useAuthSuperadminStore()

const loginForm = reactive({
  username: '',
  password: '',
})
const showPassword = ref(false)

async function handleLogin() {
  await login({ username: loginForm.username, password: loginForm.password })
}
</script>

<template>
  <div class="grid grid-cols-2 w-screen">
    <div class="h-screen bg-white p-2">
      <img
        src="/img/authPhoto2.png"
        alt=""
        class="h-full w-full rounded-lg object-cover"
      >
    </div>
    <div class="w-full h-screen flex flex-col justify-center gap-6 px-[22%]">
      <form
        class="w-full *:w-full space-y-6"
        @submit.prevent="handleLogin"
      >
        <div class="space-y-2">
          <h2 class="text-2xl ">
            Hi, Nice to see you
          </h2>
          <p>Masuk sebagai <strong>superadmin</strong></p>
        </div>
        <div class="space-y-2">
          <label class="flex flex-col">
            <span class="text-sm text-zinc-600">Username</span>
            <input
              v-model="loginForm.username"
              type="text"
              class="rounded-md border px-2 py-1 focus:outline-none"
            >
          </label>
          <label class="relative flex flex-col">
            <span class="text-sm text-zinc-600">Password</span>
            <div class="flex rounded-md items-center justify-between border py-1 px-2">
              <input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full focus:outline-none"
              >
              <button
                type="button"
                class="flex items-center justify-center"
                @click="showPassword = !showPassword"
              >
                <Icon
                  v-if="showPassword"
                  name="solar:eye-closed-broken"
                  class="text-xl"
                />
                <Icon
                  v-else
                  name="solar:eye-broken"
                  class="text-xl"
                />
              </button>
            </div>
          </label>
        </div>
        <button
          type="submit"
          class="rounded-md bg-sky-400 px-2 py-1 text-white"
        >
          Log in
        </button>
      </form>
    </div>
  </div>
</template>

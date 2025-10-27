<script lang="ts" setup>
const loginForm = reactive({
  email: '',
  password: '',
})
const showPassword = ref(true)

async function handleLogin() {
  // await login({ email: loginForm.email, password: loginForm.password })
}

definePageMeta({
  name: 'AdminLogin',
  layout: false,
})
</script>

<template>
  <div class="grid grid-cols-2">
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
          <p>Masuk sebagai <strong>admin</strong></p>
        </div>
        <div class="space-y-2">
          <label class="flex flex-col">
            <span class="text-sm text-zinc-600">Email</span>
            <input
              v-model="loginForm.email"
              type="email"
              class="rounded-md border px-2 py-1"
            >
          </label>
          <label class="relative flex flex-col">
            <span class="text-sm text-zinc-600">Password</span>
            <div class="rounded-md flex items-center border py-1 px-2">
              <input
                v-model="loginForm.password"
                class="focus:outline-none w-full"
                :type="showPassword ? 'password' : 'text'"
              >
              <button
                type="button"
                class="flex items-center"
                @click="showPassword = !showPassword"
              >
                <Icon
                  v-if="!showPassword"
                  name="solar:eye-closed-bold"
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

<script setup lang="ts">
</script>

<template>
  <footer class="text-primary">
    <div class="flex flex-col space-x-0 px-14 pb-16 pt-28 lg:flex-row lg:space-x-36 lg:px-20">
      <div class="flex flex-col text-dark-cobalt">
        <span class="font-times text-6xl font-bold">IHKA</span>
        <span class="font-times text-xl font-bold">BPD Jawa Barat</span>
      </div>
      <div class="grid w-full grid-cols-1 pr-0 gap-8 lg:gap-0 pt-10 lg:pt-0 lg:w-10/12 lg:grid-cols-3 lg:pr-36">
        <div class="space-y-3">
          <h3 class="text-2xl font-semibold text-dark-cobalt">
            Akses Cepat
          </h3>
          <div class="flex flex-col gap-2 text-lg text-dark-cobalt">
            <NuxtLink :to="{ name: 'Beranda' }">
              Beranda
            </NuxtLink>
            <NuxtLink :to="{ name: 'About' }">
              Tentang
            </NuxtLink>
            <NuxtLink :to="{ name: 'Program' }">
              Program
            </NuxtLink>
            <NuxtLink :to="{ name: 'BeritaDaerah' }">
              Berita
            </NuxtLink>
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="text-2xl font-semibold text-dark-cobalt">
            Kontak
          </h3>
          <div class="flex flex-col gap-2 text-lg text-dark-cobalt">
            <a href="#">Whatsapp</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Email</a>
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="text-2xl font-semibold text-dark-cobalt">
            Alamat
          </h3>
          <div class="flex flex-col gap-2 text-lg text-dark-cobalt">
            <p>Jl. Kliningan III No. 11</p>
          </div>
        </div>
      </div>
    </div>
    <p class="mx-auto w-fit py-12 text-dark-cobalt">
      Copyright © Fauzan & Fatur All Rights Reserved
    </p>
  </footer>
</template>

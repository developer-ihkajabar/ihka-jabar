<script lang="ts" setup>
import strukturAsosiasi from '~/assets/data/strukturAsosiasi'
</script>

<template>
  <main>
    <div
      class="flex h-[calc(100vh-6rem)] flex-col-reverse items-center justify-end gap-8 px-4 py-6 lg:flex-row lg:justify-normal lg:gap-4 lg:px-10 lg:py-0"
    >
      <div class="w-full pb-0 lg:w-8/12 lg:pb-[8%]">
        <h1 class="mx-auto w-fit text-5xl lg:mx-0 lg:w-full lg:text-7xl text-cobalt-900">
          IHKA BPD Jawa Barat
        </h1>
        <p class="mt-2 text-pretty text-justify text-xl font-normal lg:text-start lg:text-3xl lg:font-thin">
          Indonesian HouseKeepers Association merupakan sebuah asosiasi yang
          mewadahi para Hotelier yang bekerja di ranah Housekeeping Department
          di Indonesia.
        </p>
      </div>
      <div class="w-8/12 p-0 lg:w-4/12 lg:p-16">
        <div class="flex aspect-square w-full items-center justify-center rounded-full">
          <img
            src="/img/logo2.png"
            alt=""
            class="w-full"
          >
        </div>
      </div>
    </div>
    <div class="px-4 lg:px-10">
      <div class="">
        <div class="flex flex-col-reverse items-center gap-6 lg:gap-16 lg:flex-row">
          <h2 class="text-4xl lg:text-7xl text-cobalt-900">
            Keinginan IHKA
          </h2>
          <div class="w-full px-4 lg:px-16">
            <div class="relative aspect-5/1 w-full bg-orange-200 before:absolute before:-z-10 before:h-full before:w-full before:-translate-y-6 before:translate-x-6 before:bg-slate-200 before:content-[''] lg:aspect-9/1">
              <img
                class="object-cover w-full h-full"
                src="/img/keinginanIhka.png"
                alt=""
              >
            </div>
          </div>
        </div>
        <p class="mt-4 text-justify text-lg lg:mt-8 lg:text-start lg:text-xl">
          Keinginan IHKA yang selalu ingin meningkatkan standar dan kualitas
          pelayanan housekeeping di Indonesia pada akhirnya menciptakan Visi
          dan Misi dari Indonesian HouseKeepers Association.
        </p>
      </div>
      <div class="mt-12 grid grid-cols-1 gap-10 lg:gap-36 px-2 lg:mt-16 lg:grid-cols-2 lg:px-28">
        <div
          class="space-y-5"
          data-aos="fade-right"
        >
          <h3 class="text-3xl lg:text-5xl text-cobalt-900">
            Visi
          </h3>
          <p class="text-justify text-lg lg:text-start lg:text-xl">
            "Menjadi pusat keunggulan dalam industri housekeeping,
            memperjuangkan standar tertinggi dalam pelayanan dan praktik
            kebersihan, serta menjadi penggerak utama dalam meningkatkan
            profesionalisme dan kesejahteraan para praktisi housekeeping."
          </p>
        </div>
        <div
          class="space-y-5"
          data-aos="fade-left"
        >
          <h3 class="text-3xl lg:text-5xl text-cobalt-900">
            Misi
          </h3>
          <ol class="list-outside pl-4 lg:pl-0 list-decimal space-y-3 text-justify text-lg lg:text-start lg:text-xl">
            <li>
              Mempromosikan standar kebersihan dan sanitasi yang tinggi dalam
              industri housekeeping untuk menciptakan lingkungan yang sehat
              dan aman bagi semua.
            </li>
            <li>
              Memberikan pendidikan, pelatihan, dan pengembangan profesional
              kepada anggota kami guna meningkatkan keterampilan dan
              pengetahuan mereka dalam praktik housekeeping.
            </li>
            <li>
              Membangun jaringan kolaboratif antara anggota, industri, dan
              pemangku kepentingan lainnya untuk saling bertukar informasi dan
              berbagi praktik terbaik.
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="py-16 px-4 lg:px-10">
      <h2 class="text-4xl lg:text-5xl text-cobalt-900">
        Struktur Asosiasi
      </h2>
      <div class="mt-5">
        <h3 class="text-2xl font-semibold text-cobalt-900">
          BPD IHKA Jawa Barat
        </h3>
        <p class="text-xl">
          2024 - 2027
        </p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-20 py-16">
        <div
          class="col-span-1 lg:col-span-3 flex flex-col items-center gap-2"
          data-aos="fade-up"
        >
          <h4 class="text-3xl font-semibold text-cobalt-900">
            {{ strukturAsosiasi[0]?.nama }}
          </h4>
          <p class="text-2xl text-center">
            {{ strukturAsosiasi[0]?.jabatan }}
          </p>
        </div>
        <div
          v-for="item in strukturAsosiasi.slice(1)"
          :key="item.id"
          class="flex flex-col items-center gap-2 py-6"
          data-aos="fade-up"
        >
          <h4 class="text-2xl font-semibold text-cobalt-900">
            {{ item.nama }}
          </h4>
          <p class="text-xl text-center">
            {{ item.jabatan }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

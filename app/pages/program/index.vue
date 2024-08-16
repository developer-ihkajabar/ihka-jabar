<script lang="ts" setup>
import programs from '~/data/program'

definePageMeta({
  name: 'Program',
})
</script>

<template>
  <main>
    <div className="w-full space-y-6 px-4 py-10 lg:w-8/12 lg:px-10 lg:py-20">
      <h1 className="text-5xl lg:text-6xl text-cobalt-900">
        Program Unggulan
      </h1>
      <p className="text-justify text-2xl font-light lg:text-start lg:text-3xl lg:font-thin">
        Keinginan Indonesian HouseKeepers Association (IHKA) yang selalu ingin
        meningkatkan standar dan kualitas pelayanan Housekeeping yang akhirnya
        menciptakan program-program Housekeeping guna menciptakan HouseKeepers
        yang profesional dan bertalenta.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-32 lg:gap-64 px-10 py-24">
      <div className="space-y-32 lg:space-y-56">
        <template
          v-for="(programItem, i) of programs"
          :key="i"
        >
          <div
            v-if="i % 2 === 0"
            className="space-y-2"
            data-aos="fade-up"
          >
            <div className="relative aspect-[4/3] w-full bg-orange-500 before:absolute before:-z-10 before:h-full before:w-full before:-translate-x-10 before:-translate-y-9 before:bg-slate-400 before:content-['']">
              <img
                className="object-cover w-full h-full"
                :src="programItem.imgSrc"
                :alt="programItem.title"
              >
            </div>
            <h2 className="text-4xl text-cobalt-900">
              {{ programItem.title }}
            </h2>
            <p className="text-2xl font-thin">
              {{ programItem.shortDescription }}
            </p>
          </div>
        </template>
      </div>
      <div className="space-y-32 lg:space-y-56 mt-64">
        <template
          v-for="(programItem, i) of programs"
          :key="i"
        >
          <div
            v-if="i % 2 !== 0"
            className="space-y-2"
            data-aos="fade-up"
          >
            <div className="relative aspect-[4/3] w-full bg-orange-500 before:absolute before:-z-10 before:h-full before:w-full before:-translate-y-9 before:translate-x-10 before:bg-slate-400 before:content-['']">
              <img
                className="object-cover w-full h-full"
                :src="programItem.imgSrc"
                :alt="programItem.title"
              >
            </div>
            <h2 className="text-4xl text-cobalt-900">
              {{ programItem.title }}
            </h2>
            <p className="text-2xl font-thin">
              {{ programItem.shortDescription }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

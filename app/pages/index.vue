<script setup lang="ts">
import programs from '~/assets/data/program'

const { data: newss } = await useFetch('/api/news', {
  query: {
    limit: 3,
  },
})

const carouselRef = useTemplateRef('carouselRef')

function onClickPrev() {
  if (!carouselRef.value)
    return
  carouselRef.value.emblaApi?.scrollPrev()
}
function onClickNext() {
  if (!carouselRef.value)
    return
  carouselRef.value.emblaApi?.scrollNext()
}
</script>

<template>
  <main class="bg-white">
    <div class="relative">
      <div class="">
        <div class="h-[28dvh] bg-white lg:h-[50vh]" />
        <div class="h-[68dvh] bg-blue-800 lg:h-[70vh]" />
      </div>
      <div class="absolute top-0 z-10 h-full">
        <div class="h-[40dvh] px-4 py-4 lg:h-[75vh] lg:px-10 lg:py-12 ">
          <div class="flex h-full w-full items-center px-[7%] hero bg-cover">
            <h2 class="text-2xl text-white lg:text-5xl">
              Selamat datang di <br>
              <strong>
                Indonesian HouseKeepers Association (IHKA) Badan Pengurus
                Daerah Jawa Barat
              </strong>
            </h2>
          </div>
        </div>
        <div class="flex h-[50dvh] items-center pb-16 lg:h-[45vh] lg:pb-20">
          <p class="mx-auto w-11/12 text-center text-xl text-white lg:w-8/12 lg:text-5xl">
            "Profesionalisme dalam Setiap Langkah, Kebersihan dalam Setiap
            Sentuhan."
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col gap-10 px-4 py-20 lg:flex-row lg:px-16"
      data-aos="fade-left"
    >
      <div class="lg:w-[55%]">
        <div
          class="relative aspect-video w-full bg-orange-500 before:absolute before:-z-10 before:h-full before:w-full before:-translate-x-8 before:-translate-y-7 before:bg-slate-400 before:content-['']"
        >
          <img
            src="/img/fadsfadsfadfagagd.png"
            alt=""
            class="w-full object-cover h-full"
          >
        </div>
      </div>
      <div class="space-y-4 lg:w-[45%]">
        <h3 class="text-3xl text-cobalt-900 lg:text-5xl">
          Bersama <strong> Meningkatkan Kualitas Pelayanan</strong>
          HouseKeeping !
        </h3>
        <p class="text-justify text-lg font-thin lg:text-start lg:text-2xl">
          Kami berkomitmen untuk terus mengembangkan dan menjaga standar
          kualitas kebersihan, perawatan, dan keindahan tata ruang hotel.
        </p>
        <NuxtLink
          to="/about"
          class="flex items-center gap-2 text-base font-bold text-cobalt-900 lg:text-lg"
        >
          Selengkapnya
          <Icon name="solar:arrow-right-line-duotone" />
        </NuxtLink>
      </div>
    </div>
    <div class="space-y-5 lg:space-y-10 bg-cobalt-900 px-4 py-16 text-white lg:px-10">
      <div class="flex items-center gap-8 mb-2">
        <span class="text-nowrap text-2xl lg:text-3xl">Program Kami</span>
        <span class="h-0.5 w-full bg-white" />
      </div>
      <div class="flex items-center lg:hidden gap-2 justify-end">
        <button
          class="size-8 -translate-y-1/2 rounded-full bg-white"
          @click="onClickPrev"
        >
          <Icon
            name="solar:alt-arrow-left-bold"
            class="h-full w-full text-black"
          />
        </button>
        <button
          class="size-8 -translate-y-1/2 rounded-full bg-white"
          @click="onClickNext"
        >
          <Icon
            name="solar:alt-arrow-right-bold"
            class="h-full w-full text-black"
          />
        </button>
      </div>
      <div class="lg:px-10 relative">
        <UCarousel
          ref="carouselRef"
          v-slot="{ item }"
          :items="programs"
          :ui="{
            item: 'basis-full',
            container: 'rounded-lg',
          }"
          autoplay
          loop
          :prev="{ onClick: onClickPrev }"
          :next="{ onClick: onClickNext }"
          class="w-full mx-auto"
        >
          <div
            class="relative w-full bg-white lg:aspect-2/1"
            data-aos="fade-right"
          >
            <div class="grid h-full grid-cols-1 lg:grid-cols-2">
              <div class="aspect-video h-full bg-cobalt-800 lg:aspect-auto">
                <img
                  v-if="item.imgSrc"
                  class="w-full h-full object-cover"
                  :src="item.imgSrc"
                  alt=""
                >
              </div>
              <div class="flex flex-col justify-center gap-4 p-6 lg:p-12">
                <h3
                  class="w-fit rounded-xl border border-cobalt-900 px-4 py-1 text-lg text-cobalt-900 lg:rounded-2xl lg:px-4 lg:py-4 lg:text-4xl"
                >
                  {{ item.title }}
                </h3>
                <p class="text-lg text-black lg:text-3xl lg:font-thin">
                  {{ item.shortDescription }}
                </p>
              </div>
            </div>
          </div>
        </UCarousel>
        <div class="hidden lg:block">
          <button
            class="absolute left-4 top-1/2 size-12 -translate-y-1/2 p-2 rounded-full bg-cobalt-900"
            @click="onClickPrev"
          >
            <Icon
              name="solar:alt-arrow-left-bold"
              class="h-full w-full text-white"
            />
          </button>
          <button
            class="absolute right-4 top-1/2 size-12 -translate-y-1/2 p-2 rounded-full bg-cobalt-900"
            @click="onClickNext"
          >
            <Icon
              name="solar:alt-arrow-right-bold"
              class="h-full w-full text-white"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="space-y-10 px-4 lg:px-10 py-12">
      <div class="flex items-center gap-8">
        <span class="text-nowrap text-2xl lg:text-3xl text-cobalt-900">Berita Terkini</span>
        <span class="h-0.5 w-full bg-blue-800" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 px-4 lg:px-0 gap-14 lg:gap-4">
        <template v-if="newss && newss.length > 0">
          <UserBeritaCard
            v-for="berita in newss"
            :key="berita.id"
            :news="berita"
          />
        </template>
        <template v-else>
          <p class="text-lg font-semibold">
            Belum ada berita
          </p>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero {
  background-image: url('/img/img1.png');
}
</style>

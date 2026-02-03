<template>
  <div
    class="relative min-h-screen bg-[#fafafa] dark:bg-[#000000] selection:bg-sky-100 dark:selection:bg-sky-500/30 selection:text-sky-900 dark:selection:text-sky-200 overflow-hidden transition-colors duration-500"
  >
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div
        id="day-stars"
        class="absolute inset-0 opacity-50 dark:opacity-30"
      ></div>

      <div class="shooting-stars-wrapper">
        <div
          v-for="i in 12"
          :key="i"
          class="day-shooting-star"
          :class="'star-' + i"
        ></div>
      </div>

      <div
        class="absolute inset-0 bg-gradient-to-tr from-sky-50/40 via-transparent to-indigo-50/20 dark:from-sky-950/20 dark:to-indigo-950/10"
      ></div>
    </div>

    <section
      class="relative min-h-screen flex items-center justify-center px-6 z-10"
    >
      <div
        class="max-w-4xl w-full flex flex-col items-center text-center gap-12"
      >
        <div class="flex flex-col gap-8 opacity-0 animate-fade-up">
          <h1
            class="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.25] text-[#1d1d1f] dark:text-white"
          >
            不止于想象
          </h1>

          <p
            class="text-lg md:text-xl text-gray-400 dark:text-gray-500 font-medium max-w-2xl mx-auto leading-loose tracking-[0.2em]"
          >
            创造可见、可感、可共鸣的实在<br />
            是可能性的工匠，将脑海的星尘，锻造成璀璨现实
          </p>
        </div>

        <div
          class="flex flex-col md:flex-row justify-center items-center gap-10 opacity-0 animate-fade-up-delay-2"
        ></div>
      </div>
    </section>

    <hr class="border-gray-100 dark:border-white/5" />

    <section class="relative z-10 max-w-7xl mx-auto px-6 py-40">
      <div class="grid md:grid-cols-3 gap-12">
        <div
          v-for="(item, index) in featureData"
          :key="index"
          class="group bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl p-12 rounded-[32px] border border-white/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_40px_80px_rgba(14,165,233,0.08)] transition-all duration-700 flex flex-col gap-8 hover:-translate-y-2"
        >
          <div
            class="w-16 h-16 rounded-3xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-500 transition-all duration-500 group-hover:bg-sky-500 group-hover:text-white shadow-sm"
          >
            <Icon :name="item.icon" size="28" />
          </div>

          <div class="flex flex-col gap-4 text-left">
            <h3
              class="text-2xl font-bold text-[#1d1d1f] dark:text-gray-100 tracking-tight"
            >
              {{ item.title }}
            </h3>
            <p
              class="text-gray-500 dark:text-gray-400 leading-relaxed text-base tracking-widest font-medium"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref ,onMounted} from "vue";
import { PageintroduceApi } from '@/api/pageintroduce'

onMounted(() => {
  searchPageByType()
})

const featureData = ref([])
const searchPageByType = async () => {
  try {
    const data = await PageintroduceApi.searchByType({type: 'index'})
    featureData.value = data
  }catch (e) {
    console.log('报错信息：',e)
  }

}

</script>

<style scoped>
#day-stars {
  width: 2.5px;
  height: 2.5px;
  background: transparent;
  box-shadow: 10vw 10vh #99d6ff, 25vw 35vh #bae6fd, 45vw 15vh #99d6ff,
    65vw 50vh #bae6fd, 85vw 80vh #99d6ff, 15vw 70vh #bae6fd, 55vw 25vh #99d6ff,
    95vw 10vh #bae6fd, 30vw 90vh #99d6ff, 75vw 60vh #bae6fd, 5vw 40vh #99d6ff,
    50vw 5vh #bae6fd;
  animation: twinkle 4s infinite ease-in-out;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.4);
  }
}

.shooting-stars-wrapper {
  position: absolute;
  inset: -150px;
  transform: rotate(35deg);
}

.day-shooting-star {
  position: absolute;
  height: 2.5px;
  background: linear-gradient(
    90deg,
    #0284c7 0%,
    #38bdf8 20%,
    rgba(56, 189, 248, 0) 100%
  );
  border-radius: 999px;
  filter: drop-shadow(0 0 4px rgba(2, 132, 199, 0.3));
  opacity: 0;
  animation: day-shooting 10s infinite cubic-bezier(0.2, 0, 0.4, 1);
}

.day-shooting-star::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background: #0284c7;
  border-radius: 50%;
  box-shadow: 0 0 8px #38bdf8;
}

.star-1 {
  top: 5%;
  left: -5%;
  width: 140px;
  animation-delay: 0s;
}
.star-2 {
  top: 15%;
  left: 10%;
  width: 180px;
  animation-delay: 4.5s;
}
.star-3 {
  top: 25%;
  left: 55%;
  width: 120px;
  animation-delay: 2.1s;
}
.star-4 {
  top: 45%;
  left: 0%;
  width: 220px;
  animation-delay: 7.2s;
}
.star-5 {
  top: 55%;
  left: 35%;
  width: 150px;
  animation-delay: 1.4s;
}
.star-6 {
  top: 75%;
  left: 60%;
  width: 170px;
  animation-delay: 9.3s;
}
.star-7 {
  top: 12%;
  left: 45%;
  width: 130px;
  animation-delay: 3.2s;
}
.star-8 {
  top: 85%;
  left: 15%;
  width: 160px;
  animation-delay: 11.1s;
}
.star-9 {
  top: 38%;
  left: 75%;
  width: 190px;
  animation-delay: 5.7s;
}
.star-10 {
  top: 68%;
  left: -10%;
  width: 140px;
  animation-delay: 8.5s;
}
.star-11 {
  top: 52%;
  left: 20%;
  width: 200px;
  animation-delay: 6.4s;
}
.star-12 {
  top: 22%;
  left: 5%;
  width: 160px;
  animation-delay: 10.6s;
}

@keyframes day-shooting {
  0% {
    transform: translateX(-500px);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  60% {
    transform: translateX(1200px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-up-delay-2 {
  animation: fadeUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
  opacity: 0;
}
</style>

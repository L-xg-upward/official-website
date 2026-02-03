<template>
  <div class="relative overflow-hidden">
    <!-- 背景网格 -->
    <div class="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20 transition-opacity duration-500"></div>

    <!-- 渐变装饰 -->
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sky-200 to-pink-200 dark:from-sky-900/30 dark:to-pink-900/20 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200 to-purple-200 dark:from-blue-900/20 dark:to-purple-900/10 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>

    <!-- 内容容器 -->
    <div
        class="relative max-w-7xl mx-auto py-24 px-6 lg:px-12 min-h-screen selection:bg-sky-100 dark:selection:bg-sky-500/30 selection:text-sky-900 dark:selection:text-sky-200 transition-colors duration-500"
    >
      <div class="space-y-24">
        <header class="max-w-2xl">
          <div class="inline-block">
            <span
                class="text-xl text-sky-500 font-bold tracking-[0.2em] text-xs uppercase bg-sky-50 dark:bg-sky-500/10 px-3 py-1 rounded-full animate-fade-up"
            >
              我们的愿景
            </span>
          </div>
          <h1
              class="text-4xl md:text-6xl font-semibold mt-8 text-[#1d1d1f] dark:text-white leading-[1.15] tracking-tight animate-fade-up-delay-2"
          >
            让每一份努力<br />
            <span class="text-gray-400 dark:text-gray-500">都有清晰的路径</span>
          </h1>
        </header>

        <div class="grid md:grid-cols-5 gap-12 items-start">
          <div
              class="md:col-span-3 prose prose-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium backdrop-blur-sm bg-white/60 dark:bg-black/30 p-8 rounded-3xl border border-white/20 dark:border-white/5 shadow-lg"
          >
            <p class="mb-6">
              团队由探索者和构建者组成，我们敢于挑战技术未知，并将前沿研究转化为稳定、可落地的产品与服务
            </p>
            <p>
              简化流程、提升效率、抓住新机遇！
              <span class="text-sky-600 dark:text-sky-400"
              >让每一次投入都清晰可见回报</span
              >
            </p>
          </div>

          <div
              class="md:col-span-2 bg-white/80 dark:bg-white/[0.08] backdrop-blur-sm p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-lg"
          >
            <p
                class="text-sm text-gray-500 dark:text-gray-400 italic leading-loose"
            >
              "我们相信，每行代码都背负着对性能、安全与可维护性的承诺。"
            </p>
          </div>
        </div>

        <section class="relative z-10 w-full pt-12">
          <div class="grid md:grid-cols-3 gap-8">
            <div
                v-for="(item, index) in stats"
                :key="index"
                class="group bg-white/80 dark:bg-white/[0.05] backdrop-blur-sm p-12 rounded-[20px] border border-white/20 dark:border-white/5 shadow-xl hover:shadow-[0_30px_70px_rgba(14,165,233,0.3)] dark:hover:shadow-[0_30px_70px_rgba(14,165,233,0.15)] transition-all duration-500 flex flex-col gap-8"
            >
              <div
                  class="w-14 h-14 rounded-2xl bg-sky-50/80 dark:bg-sky-500/10 flex items-center justify-center text-sky-500 transition-all duration-500 group-hover:bg-sky-500 group-hover:text-white shadow-inner shadow-sky-100/50 dark:shadow-none"
              >
                <Icon :name="item.icon" size="24" />
              </div>

              <div class="flex flex-col gap-2">
                <div
                    class="text-4xl font-bold text-[#1d1d1f] dark:text-gray-100 tracking-tighter group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
                >
                  {{ item.title }}
                </div>
                <h3
                    class="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]"
                >
                  {{ item.subtitle }}
                </h3>
                <p
                    class="text-gray-500 dark:text-gray-400 leading-relaxed text-sm tracking-wide mt-2"
                >
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="pt-10">
          <div class="flex flex-col items-center justify-center text-center">
            <div
                class="w-16 h-16 rounded-full bg-gradient-to-br from-sky-50 to-pink-50 dark:from-sky-900/20 dark:to-pink-900/20 flex items-center justify-center mb-6 shadow-lg backdrop-blur-sm"
            >
              <Icon name="fa6-solid:heart" class="text-red-500 text-2xl" />
            </div>
            <p
                class="text-gray-400 dark:text-gray-500 text-sm mb-4 tracking-widest uppercase"
            >
              摘下最喜欢的麦穗，然后闭着眼睛穿过整个麦田......
            </p>
            <h2 class="text-3xl font-bold text-[#1d1d1f] dark:text-white mb-12">
              每一步，都值得铭记
            </h2>
            <div class="w-full max-w-4xl mx-auto">
              <div class="backdrop-blur-sm bg-white/60 dark:bg-black/30 rounded-3xl p-8 border border-white/20 dark:border-white/5 shadow-lg">
                <Timeline mode="alternate" class="w-full dark:text-gray-300">
                  <TimelineItem
                      v-for="(item, index) in timelineItems"
                      :key="index"
                      :color="item.color"
                      :label="item.label || undefined"
                  >
                    <div class="py-4 px-6 bg-transparent">
                      <div
                          class="text-lg font-semibold text-gray-800 dark:text-gray-200"
                      >
                        {{ item.title }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        {{ item.timeline }}
                      </div>
                      <div
                          v-if="item.description"
                          class="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed"
                      >
                        {{ item.description }}
                      </div>
                    </div>
                  </TimelineItem>
                </Timeline>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Timeline, TimelineItem } from "ant-design-vue";
import type { TimelineItemProps } from "ant-design-vue";
import { PageintroduceApi } from '@/api/pageintroduce'
import { TimeLineIntroductionApi } from '@/api/timelineintroduction'

const stats = ref([])
const timelineItems = ref([])

const searchPageByType = async () => {
  try {
    const data = await PageintroduceApi.searchByType({type: 'about'})
    stats.value = data
  }catch (e) {
    console.log('报错信息：',e)
  }

}

const searchTimeLines = async () => {
  try {
    const data = await TimeLineIntroductionApi.searchTimeLineData()
    timelineItems.value = data
  }catch (e) {
    console.log('报错信息：',e)
  }
}

onMounted(() => {
  searchPageByType()
  searchTimeLines()
})



</script>

<style scoped>
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
  animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-up-delay-2 {
  animation: fadeUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
  opacity: 0;
}

/* 网格背景样式 */
.bg-grid-pattern {
  background-image:
      linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

.dark .bg-grid-pattern {
  background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}

:deep(.ant-timeline-item-tail) {
  background-color: rgba(148, 163, 184, 0.3);
}

/* 添加毛玻璃效果支持 */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(8px);
  }
}

/* 对于不支持backdrop-filter的浏览器提供fallback */
@supports not (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .dark .backdrop-blur-sm {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
<template>
  <div
      class="max-w-7xl mx-auto py-24 px-6 lg:px-12 min-h-screen selection:bg-sky-100 dark:selection:bg-sky-500/30 selection:text-sky-900 dark:selection:text-sky-200 transition-colors duration-500 overflow-hidden relative"
  >
    <!-- 流星/星星坠落效果容器 -->
    <div class="falling-effects">
      <div
          v-for="(star, index) in fallingStars"
          :key="index"
          :ref="(el) => setStarRef(el, index)"
          class="falling-star"
          :class="star.type"
          :style="{
          left: `${star.position.x}%`,
          animationDelay: `${star.delay}s`,
          animationDuration: `${star.duration}s`,
        }"
      ></div>
    </div>

    <div class="space-y-24">
      <div class="grid md:grid-cols-5 gap-12 items-start">
        <div
            class="md:col-span-3 prose prose-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium"
        >
          <p class="mb-6">
            致力于通过技术解决复杂问题，为用户创造直观、高效的数字体验
          </p>
          <p>
            我们坚信，优秀的产品源于对细节的执着、对技术的敬畏以及对用户需求的深刻理解。
            <span class="text-sky-600 dark:text-sky-400"
            >让每一个项目都成为技术与人文的交汇点</span
            >
          </p>
        </div>

        <div
            class="md:col-span-2 bg-gray-50 dark:bg-white/[0.03] p-8 rounded-3xl border border-gray-100 dark:border-white/10"
        >
          <p
              class="text-sm text-gray-500 dark:text-gray-400 italic leading-loose"
          >
            "技术是桥梁，连接想象与现实；团队是引擎，驱动创新与成长。"
          </p>
        </div>
      </div>

      <div class="pt-20">
        <h2 class="text-3xl font-bold text-[#1d1d1f] dark:text-white mb-4">
          团队成员
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
          个人独特视角
        </p>

        <div class="space-y-8">
          <div
              v-for="member in teamMembers"
              :key="member.name"
              class="bg-white dark:bg-white/[0.02] p-8 rounded-3xl border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all hover:border-sky-200 dark:hover:border-sky-500/30"
          >
            <div class="flex flex-col lg:flex-row items-start gap-8">
              <div class="flex items-start gap-6 flex-shrink-0">
                <div
                    class="w-28 h-28 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-500/20 dark:to-blue-600/20 flex items-center justify-center"
                >
                  <Image
                      :width="200"
                      :src="member.imgUrl"
                      class="text-sky-500 dark:text-sky-400 text-3xl"
                  />
                </div>
                <div>
                  <h3
                      class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                  >
                    {{ member.name }}
                  </h3>
                </div>
              </div>

              <div
                  class="lg:pl-8 lg:border-l lg:border-gray-200 dark:lg:border-white/10 flex-1"
              >
                <p
                    class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-4"
                >
                  {{ member.description }}
                </p>

                <div v-if="member.skills" class="mb-4">
                  <h4 class="text-gray-800 dark:text-gray-200 font-bold mb-2">
                    技能特长
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                        v-for="skill in member.skills"
                        :key="skill"
                        class="px-3 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 rounded-lg text-sm"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>

                <div
                    v-if="member.philosophy"
                    class="pt-4 border-t border-gray-100 dark:border-white/5"
                >
                  <h4 class="text-gray-800 dark:text-gray-200 font-bold mb-2">
                    胡说八道、
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400 italic">
                    "{{ member.philosophy }}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 pt-12">
        <div class="space-y-8">
          <h2 class="text-2xl font-bold text-[#1d1d1f] dark:text-white">
            我们的文化
          </h2>
          <ul class="space-y-4 text-gray-600 dark:text-gray-400">
            <li class="flex items-start gap-3">
              <Icon
                  name="fa6-solid:check-circle"
                  class="text-green-500 mt-1 flex-shrink-0"
              />
              <span
              ><strong class="text-gray-800 dark:text-gray-200"
              >开放透明</strong
              >
                – 信息共享，决策透明，共同成长</span
              >
            </li>
            <li class="flex items-start gap-3">
              <Icon
                  name="fa6-solid:check-circle"
                  class="text-green-500 mt-1 flex-shrink-0"
              />
              <span
              ><strong class="text-gray-800 dark:text-gray-200"
              >持续学习</strong
              >
                – 鼓励探索新技术，定期组织内部分享</span
              >
            </li>
            <li class="flex items-start gap-3">
              <Icon
                  name="fa6-solid:check-circle"
                  class="text-green-500 mt-1 flex-shrink-0"
              />
              <span
              ><strong class="text-gray-800 dark:text-gray-200"
              >用户至上</strong
              >
                – 从用户场景出发，用数据驱动产品迭代</span
              >
            </li>
            <li class="flex items-start gap-3">
              <Icon
                  name="fa6-solid:check-circle"
                  class="text-green-500 mt-1 flex-shrink-0"
              />
              <span
              ><strong class="text-gray-800 dark:text-gray-200"
              >敏捷协作</strong
              >
                – 小步快跑，快速验证，灵活响应变化</span
              >
            </li>
          </ul>
        </div>

        <div class="space-y-8">
          <h2 class="text-2xl font-bold text-[#1d1d1f] dark:text-white">
            技术栈与工具
          </h2>
          <div class="flex flex-wrap gap-3">
            <span
                class="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >Vue.js / Nuxt</span
            >
            <span
                class="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >TypeScript</span
            >
            <span
                class="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >Tailwind CSS</span
            >
            <span
                class="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >Java</span
            >
            <span
                class="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >Docker</span
            >
            <span
                class="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >Spring AI</span
            >
            <span
                class="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300 rounded-full text-sm font-medium"
            >CI/CD</span
            >
            <span
                class="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300 rounded-full text-sm font-medium"
            >......</span
            >
          </div>
          <p class="text-gray-500 dark:text-gray-500 text-sm">
            我们持续关注并引入前沿技术，确保技术栈的先进性、稳定性与可扩展性。
          </p>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center pt-20 text-center">
        <div
            class="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6"
        >
          <Icon name="fa6-solid:handshake" class="text-blue-400" />
        </div>
        <p class="text-gray-400 dark:text-gray-500 text-sm mb-8">合作与期待</p>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          我们期待与志同道合的伙伴、有远见的客户一起，共同构建有意义的产品，用代码书写未来。
          <span class="text-sky-600 dark:text-sky-400 font-medium"
          >如果你也相信技术的力量，欢迎与我们联系。</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "#components";
import { Image } from 'ant-design-vue'
import { ref, onMounted, onUnmounted } from "vue";
import { TeamIntroductionApi } from '@/api/teamintroduction'

const teamMembers = ref([]);

const searchTeamMembers = async () => {
  try {
    const data = await TeamIntroductionApi.searchTeamPersons()
    teamMembers.value = data
  }catch (e) {
    console.log('报错信息：',e)
    teamMembers.value = []
  }
}

// 流星/星星数据
const fallingStars = ref<any[]>([]);
const starRefs = ref<(HTMLElement | null)[]>([]);

// 流星类型
const starTypes = ["fast", "medium", "slow", "small", "glow"];

// 初始化流星效果
const initFallingStars = () => {
  const stars = [];
  const numberOfStars = 15; // 同时出现的星星数量

  for (let i = 0; i < numberOfStars; i++) {
    const type = starTypes[Math.floor(Math.random() * starTypes.length)];
    const delay = Math.random() * 10; // 随机延迟开始
    let duration = 3 + Math.random() * 4; // 持续时间

    // 根据类型调整持续时间
    if (type === "fast") duration = 2 + Math.random() * 2;
    if (type === "slow") duration = 6 + Math.random() * 3;
    if (type === "small") duration = 4 + Math.random() * 2;

    stars.push({
      id: i,
      type: type,
      position: {
        x: Math.random() * 100, // 随机水平位置
      },
      delay: delay,
      duration: duration,
      active: true,
    });
  }

  fallingStars.value = stars;
};

// 设置星星引用
const setStarRef = (el: any, index: number) => {
  starRefs.value[index] = el;
};

// 重置单颗星星
const resetStar = (index: number) => {
  if (!fallingStars.value[index]) return;

  const star = fallingStars.value[index];

  // 随机选择新的类型
  star.type = starTypes[Math.floor(Math.random() * starTypes.length)];
  star.position.x = Math.random() * 100;
  star.delay = Math.random() * 2;

  // 根据类型调整持续时间
  let duration = 3 + Math.random() * 4;
  if (star.type === "fast") duration = 2 + Math.random() * 2;
  if (star.type === "slow") duration = 6 + Math.random() * 3;
  if (star.type === "small") duration = 4 + Math.random() * 2;

  star.duration = duration;

  // 强制重新渲染这个星星
  fallingStars.value[index] = { ...star };
};

// 监听动画结束事件
const setupAnimationListeners = () => {
  setTimeout(() => {
    starRefs.value.forEach((starEl, index) => {
      if (starEl) {
        starEl.addEventListener("animationend", () => resetStar(index));
      }
    });
  }, 100);
};

// 清理事件监听器
const cleanupAnimationListeners = () => {
  starRefs.value.forEach((starEl, index) => {
    if (starEl) {
      starEl.removeEventListener("animationend", () => resetStar(index));
    }
  });
};

onMounted(() => {
  initFallingStars();
  // 等待DOM渲染完成后设置监听器
  setTimeout(() => {
    setupAnimationListeners();
  }, 100);

  searchTeamMembers()
});

onUnmounted(() => {
  cleanupAnimationListeners();
});
</script>

<style scoped>
/* 流星/星星坠落效果 */
.falling-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.falling-star {
  position: absolute;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  animation-timing-function: linear;
}

/* 不同类型的流星/星星样式 */
.falling-star.fast {
  width: 2px;
  height: 2px;
  background: linear-gradient(to right, rgba(56, 189, 248, 0.8), rgba(59, 130, 246, 0.8));
  border-radius: 50%;
  box-shadow: 0 0 4px 1px rgba(56, 189, 248, 0.5);
  animation-name: fallFast;
}

.falling-star.medium {
  width: 3px;
  height: 3px;
  background: linear-gradient(to right, rgba(14, 165, 233, 0.9), rgba(37, 99, 235, 0.9));
  border-radius: 50%;
  box-shadow: 0 0 6px 2px rgba(14, 165, 233, 0.6);
  animation-name: fallMedium;
}

.falling-star.slow {
  width: 4px;
  height: 4px;
  background: linear-gradient(to right, rgba(2, 132, 199, 1), rgba(29, 78, 216, 1));
  border-radius: 50%;
  box-shadow: 0 0 8px 3px rgba(2, 132, 199, 0.7);
  animation-name: fallSlow;
}

.falling-star.small {
  width: 1px;
  height: 1px;
  background: rgba(125, 211, 252, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 3px 1px rgba(125, 211, 252, 0.5);
  animation-name: fallSmall;
}

.falling-star.glow {
  width: 2px;
  height: 2px;
  background: rgba(96, 165, 250, 0.9);
  border-radius: 50%;
  box-shadow: 0 0 8px 3px rgba(96, 165, 250, 0.8);
  animation-name: fallGlow;
}

/* 深色主题适配 */
:global(.dark) .falling-star.fast {
  background: linear-gradient(to right, rgba(56, 189, 248, 1), rgba(59, 130, 246, 1));
  box-shadow: 0 0 6px 2px rgba(56, 189, 248, 0.8);
}

:global(.dark) .falling-star.medium {
  background: linear-gradient(to right, rgba(14, 165, 233, 1), rgba(37, 99, 235, 1));
  box-shadow: 0 0 8px 3px rgba(14, 165, 233, 0.9);
}

:global(.dark) .falling-star.slow {
  background: linear-gradient(to right, rgba(2, 132, 199, 1), rgba(29, 78, 216, 1));
  box-shadow: 0 0 12px 4px rgba(2, 132, 199, 0.9);
}

:global(.dark) .falling-star.small {
  background: rgba(125, 211, 252, 1);
  box-shadow: 0 0 4px 2px rgba(125, 211, 252, 0.7);
}

:global(.dark) .falling-star.glow {
  background: rgba(96, 165, 250, 1);
  box-shadow: 0 0 12px 4px rgba(96, 165, 250, 1);
}

/* 坠落动画 */
@keyframes fallFast {
  0% {
    opacity: 0;
    transform: translateY(-100px) translateX(0) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(calc(100vh + 100px)) translateX(100px) rotate(360deg);
  }
}

@keyframes fallMedium {
  0% {
    opacity: 0;
    transform: translateY(-150px) translateX(-50px) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(calc(100vh + 150px)) translateX(50px) rotate(720deg);
  }
}

@keyframes fallSlow {
  0% {
    opacity: 0;
    transform: translateY(-200px) translateX(50px) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(calc(100vh + 200px)) translateX(-100px) rotate(1080deg);
  }
}

@keyframes fallSmall {
  0% {
    opacity: 0;
    transform: translateY(-80px) translateX(20px) rotate(0deg);
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateY(calc(100vh + 80px)) translateX(-40px) rotate(180deg);
  }
}

@keyframes fallGlow {
  0% {
    opacity: 0;
    transform: translateY(-120px) translateX(-30px) scale(0.5);
  }
  20% {
    opacity: 1;
    transform: translateY(calc(20vh)) translateX(15px) scale(1);
  }
  80% {
    opacity: 1;
    transform: translateY(calc(80vh)) translateX(-15px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(calc(100vh + 120px)) translateX(30px) scale(0.5);
  }
}

/* 内容层级高于效果 */
.space-y-24 {
  position: relative;
  z-index: 1;
}

/* 确保其他内容层级正确 */
.grid, .pt-20, .flex-col {
  position: relative;
  z-index: 1;
}
</style>
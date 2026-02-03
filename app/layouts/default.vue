<template>
  <div
    class="min-h-screen flex flex-col font-sans antialiased text-[#1d1d1f] dark:text-gray-200 bg-white dark:bg-[#000000] transition-colors duration-300"
  >
    <header
      class="fixed top-0 w-full z-[100] bg-white/80 dark:bg-[#1d1d1f]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10"
    >
      <nav
        class="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between"
      >
        <NuxtLink
          to="/"
          class="hover:text-sky-500 transition-colors flex items-center gap-2"
        >
          <div class="relative flex items-center justify-center">
            <img
              src="~/assets/icon.png"
              class="w-9 h-9 object-contain group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 ease-out"
              alt="logo"
            />
            <div
              class="absolute -inset-2 bg-sky-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            ></div>
          </div>
          <div
            class="font-bold text-sky-600 hover:opacity-70 transition-opacity cursor-pointer tracking-tighter text-lg shrink-0"
          >
            畅想
            <span
              class="font-light text-gray-300 dark:text-gray-600 ml-1 text-sm uppercase"
            >
              infinite
            </span>
          </div>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-10 text-[13px] font-medium">
          <NuxtLink
            v-for="link in headerData"
            :key="link.p"
            :to="link.p"
            class="hover:text-sky-500 dark:text-gray-300 dark:hover:text-sky-400 transition-colors flex items-center gap-2"
            active-class="text-sky-500 dark:text-sky-400 font-bold scale-105"
          >
            <Icon :name="link.i" size="14" class="text-sky-400" />
            {{ link.n }}
          </NuxtLink>

          <button
            @click="toggleLanguage"
            class="h-8 px-2.5 flex items-center gap-1.5 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-sky-50 dark:hover:bg-sky-500/10 text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 active:scale-95 group ml-2"
            aria-label="Toggle Language"
          >
            <ClientOnly>
              <Icon
                name="fa6-solid:language"
                size="13"
                class="opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all"
              />

              <div
                class="w-[1px] h-3 bg-gray-200 dark:bg-white/10 group-hover:bg-sky-200 dark:group-hover:bg-sky-500/20 transition-colors"
              ></div>

              <span
                class="text-[11px] font-bold tracking-wider leading-none uppercase"
              >
                {{ locale === "zh" ? "EN" : "中" }}
              </span>
            </ClientOnly>
          </button>
          <button
            @click="toggleDark"
            class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors ml-2"
            aria-label="Toggle Dark Mode"
          >
            <ClientOnly>
              <Icon
                :name="
                  colorMode.value === 'dark'
                    ? 'fa6-solid:moon'
                    : 'fa6-solid:sun'
                "
                size="16"
              />
              <template #fallback
                ><div class="w-[18px] h-[18px]"></div
              ></template>
            </ClientOnly>
          </button>
        </div>

        <div class="flex items-center gap-4 md:hidden">
          <button
            @click="toggleLanguage"
            class="h-10 px-2 flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-sky-500 transition-colors active:scale-90"
          >
            <Icon name="fa6-solid:language" size="14" class="opacity-80" />

            <span class="text-[11px] font-black uppercase tracking-wider">
              {{ locale === "zh" ? "EN" : "中文" }}
            </span>
          </button>
          <button
            @click="toggleDark"
            class="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400"
          >
            <ClientOnly>
              <Icon
                :name="
                  colorMode.value === 'dark'
                    ? 'fa6-solid:moon'
                    : 'fa6-solid:sun'
                "
                size="18"
              />
              <template #fallback
                ><div class="w-[18px] h-[18px]"></div
              ></template>
            </ClientOnly>
          </button>
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 z-[110] active:scale-75 transition-transform duration-500"
          >
            <Icon
              :name="isMenuOpen ? 'fa6-solid:xmark' : 'fa6-solid:bars'"
              size="22"
            />
          </button>
        </div>
      </nav>

      <transition name="slide">
        <div
          v-if="isMenuOpen"
          class="fixed left-0 top-16 w-full h-[calc(100vh-64px)] bg-white dark:bg-[#1d1d1f] z-[90] md:hidden flex flex-col p-6 gap-4 overflow-y-auto"
        >
          <div class="flex flex-col gap-3">
            <NuxtLink
              v-for="link in headerData"
              :key="link.p"
              :to="link.p"
              @click="isMenuOpen = false"
              class="bg-[#F2F2F7] dark:bg-white/5 p-5 rounded-2xl flex items-center justify-between text-gray-800 dark:text-gray-200 font-semibold active:scale-[0.98] transition-all group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-500/10 dark:to-blue-600/10 rounded-xl flex items-center justify-center group-hover:from-sky-200 group-hover:to-blue-200 transition-all"
                >
                  <Icon :name="link.i" class="text-sky-500" size="16" />
                </div>
                <span>{{ link.n }}</span>
              </div>
              <Icon
                name="fa6-solid:chevron-right"
                class="text-gray-300 dark:text-gray-600 group-hover:text-sky-500 transition-colors"
                size="14"
              />
            </NuxtLink>
          </div>

          <div
            class="mt-8 p-4 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-500/5 dark:to-blue-500/5 rounded-2xl border border-transparent dark:border-white/5"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-10 h-10 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center shadow-sm"
              >
                <Icon name="fa6-solid:headset" class="text-sky-500" size="16" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-gray-100">
                  客户支持
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  7×24小时服务
                </p>
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              有任何问题？我们的专业团队随时为您提供帮助和支持。
            </p>
          </div>
        </div>
      </transition>
    </header>

    <main class="flex-grow pt-16 w-full overflow-x-hidden">
      <slot />
    </main>

    <footer
      class="bg-[#f5f5f7] dark:bg-[#111112] border-t border-gray-200 dark:border-white/5"
      v-if="footerContents.length != 0"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12 justify-items-center"
        >
          <div
            v-for="section in footerContents"
            :key="section.id"
            class="w-full max-w-xs"
          >
            <h3
              class="font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center gap-2 text-lg"
            >
              <div
                class="w-8 h-8 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-500/10 dark:to-blue-600/10 rounded-lg flex items-center justify-center"
              >
                <Icon :name="section.icon" class="text-sky-500" size="16" />
              </div>
              {{ section.name }}
            </h3>
            <ul class="space-y-3">
              <li v-for="link in section.children" :key="link.name">
                <a
                  href="javascript:void(0);"
                  class="text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-200 flex items-center gap-3 text-sm group py-2"
                >
                  <div
                    class="w-6 h-6 bg-white dark:bg-white/5 rounded-md flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
                  >
                    <Icon
                      :name="link.icon"
                      size="12"
                      class="text-gray-500 group-hover:text-sky-500 transition-colors"
                    />
                  </div>
                  <span
                    class="flex-1 group-hover:translate-x-1 transition-transform duration-200"
                  >
                    {{ link.name }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-200 dark:border-white/5 pt-8 mb-8">
          <div class="flex items-start gap-4">
            <div>
              <p
                class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-3xl"
              >
                以一行行有温度的逻辑，将缥缈愿景凝为可靠现实
              </p>
            </div>
          </div>
        </div>

        <!--        <div class="border-t border-gray-200 dark:border-white/5 pt-8">
          <div
            class="flex flex-col lg:flex-row justify-between items-center gap-6"
          >
            <div
              class="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 dark:text-gray-500 text-xs order-1 lg:order-1"
            >
              <span class="flex items-center gap-1">
                <Icon
                  name="fa6-solid:certificate"
                  size="10"
                  class="text-sky-400"
                />
                京ICP备20240123456号-1
              </span>
              <span class="flex items-center gap-1">
                <Icon
                  name="fa6-solid:shield-halved"
                  size="10"
                  class="text-sky-400"
                />
                京公网安备 11010802034567号
              </span>
            </div>

            <div
              class="text-gray-500 dark:text-gray-500 text-xs order-2 lg:order-2"
            >
              <p class="flex items-center gap-1">
                <Icon name="fa6-solid:copyright" size="10" />
                Copyright © 2018-2026 畅想无限科技有限公司. 保留所有权利.
              </p>
            </div>

            <div
              class="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 dark:text-gray-500 text-xs order-3"
            >
              <a
                v-for="policy in policyLinks"
                :key="policy.text"
                :href="policy.href"
                class="hover:text-sky-500 dark:hover:text-sky-400 transition-colors flex items-center gap-1"
              >
                <Icon :name="policy.icon" size="10" />
                {{ policy.text }}
              </a>
            </div>
          </div>
        </div>-->
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { FooterContentApi } from "@/api/footercontent";
const isMenuOpen = ref(false);

const colorMode = useColorMode();
const localePath = useLocalePath();

const { t, locale, setLocale } = useI18n();
// 移动端导航链接数据
const headerData = computed(() => {
  return [
    { n: t("layouts.nav.home"), p: localePath("/"), i: "fa6-solid:house" },
    {
      n: t("layouts.nav.products"),
      p: localePath("/products"),
      i: "fa6-solid:cube",
    },
    {
      n: t("layouts.nav.team"),
      p: localePath("/team"),
      i: "fa6-solid:users",
    },
    {
      n: t("layouts.nav.about"),
      p: localePath("/about"),
      i: "fa6-solid:circle-info",
    },
  ];
});

const footerContents = ref([]);
const searchFooterContents = async () => {
  try {
    const data = await FooterContentApi.searchAllInfos();
    footerContents.value = data;
    console.log(footerContents.value);
  } catch (e) {
    console.log("报错信息：", e);
    footerContents.value = [];
  }
};

onMounted(() => {
  searchFooterContents();
});

// 页脚分区数据
const footerSections = reactive([
  {
    id: "products",
    title: "产品服务",
    icon: "fa6-solid:boxes-stacked",
    links: [
      {
        text: "企业软件定制",
        icon: "fa6-solid:laptop-code",
      },
      {
        text: "SaaS应用平台",
        icon: "fa6-solid:cloud",
      },
      {
        text: "移动端开发",
        icon: "fa6-solid:mobile-screen-button",
      },
      {
        text: "技术咨询",
        icon: "fa6-solid:comments",
      },
    ],
  },
  {
    id: "solutions",
    title: "解决方案",
    icon: "fa6-solid:puzzle-piece",
    links: [
      {
        text: "数字化转型",
        icon: "fa6-solid:arrow-trend-up",
      },
      {
        text: "业务流程优化",
        icon: "fa6-solid:gears",
      },
      {
        text: "数据中台建设",
        icon: "fa6-solid:database",
      },
      {
        text: "云原生架构",
        icon: "fa6-solid:cloud-arrow-up",
      },
    ],
  },
  {
    id: "contact",
    title: "联系我们",
    icon: "fa6-solid:address-book",
    links: [
      {
        text: "910757084@qq.com",
        icon: "fa6-solid:handshake",
      },
      {
        text: "xgbxg.top",
        icon: "fa6-solid:life-ring",
      },
      {
        text: "13590096251",
        icon: "fa6-solid:phone",
      },
      {
        text: "湛江市霞山区",
        icon: "fa6-solid:location-dot",
      },
    ],
  },
]);

// 政策链接数据
const policyLinks = [
  { text: "隐私政策", icon: "fa6-solid:lock", href: "/privacy" },
  { text: "服务条款", icon: "fa6-solid:file-contract", href: "/terms" },
  { text: "法律声明", icon: "fa6-solid:scale-balanced", href: "/legal" },
  { text: "网站地图", icon: "fa6-solid:sitemap", href: "/sitemap" },
];

const toggleDark = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
const toggleLanguage = async () => {
  const nextLocale = locale.value === "zh" ? "en" : "zh";
  await setLocale(nextLocale);
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 解决移动端点击蓝色高亮 */
* {
  -webkit-tap-highlight-color: transparent;
}

/* 页脚链接悬停效果增强 */
footer a {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 页脚分区卡片悬停效果 */
footer li a:hover {
  background: linear-gradient(to right, rgba(56, 189, 248, 0.05), transparent);
  padding-left: 8px;
  padding-right: 8px;
  margin-left: -8px;
  margin-right: -8px;
  border-radius: 6px;
}

/* 优化移动端导航链接点击效果 */
.bg-\[\#F2F2F7\]:active {
  background-color: #e8e8ed;
  transform: scale(0.98);
}
</style>

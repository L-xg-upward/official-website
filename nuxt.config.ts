import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode"
  ],
  // Nitro 配置 - 添加代理
  nitro: {
    devProxy: {
      '/website': {
        // target: 'https://xgbxg.top/website', // 你的后端地址
        target: 'http://localhost:3000/website', // 你的后端地址
        changeOrigin: true,
        prependPath: true,
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: '/website' // 客户端使用的 API 基础路径
    }
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  colorMode: {
    classSuffix: "", // 适配 Tailwind 的 .dark 类名
    preference: "system",
    fallback: "light",
  },
  devServer: {
    port: 3000,
  },
  i18n: {
    defaultLocale: "zh",
    locales: [
      { code: "en", name: "English", file: "en.ts" },
      { code: "zh", name: "zh-Hans", file: "zh.ts" },
    ],
  },
  app: {
    head: {
      title: "不止于想象 - 创造可见、可感、可共鸣的实在",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "探索创造的原点，将灵感催化为系统的创造。我们是可能性的工匠，为您提供从0到1的根本性解决方案。",
        },
        {
          name: "keywords",
          content: "思维框架, 创意设计, 灵感锻造, 解决方案, 可能性工匠",
        },
        { property: "og:title", content: "不止于想象" },
        {
          property: "og:description",
          content: "将脑海的星尘，锻造成璀璨现实。",
        },
        { property: "og:image", content: "/og-image.jpg" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
});

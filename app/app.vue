<template>
  <div
    class="min-h-screen flex flex-col font-sans antialiased text-[#1d1d1f] dark:text-gray-100"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* 页面过渡 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1),
    filter 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.page-enter-from {
  opacity: 0;
  filter: blur(10px);
}

.page-leave-to {
  opacity: 0;
  filter: blur(5px);
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #f1f5f9;
  border-radius: 20px;
  border: 2px solid white;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #e0f2fe;
}

* {
  -webkit-tap-highlight-color: transparent;
}
</style>

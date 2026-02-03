<template>
  <div
      class="relative max-w-7xl mx-auto py-24 px-6 lg:px-12 min-h-screen selection:bg-sky-100 dark:selection:bg-sky-500/30 selection:text-sky-900 dark:selection:text-sky-200 transition-colors duration-500 overflow-hidden"
      @mousemove="handleMouseMove"
  >
    <!-- 背景容器 -->
    <div ref="backgroundContainer" class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <!-- 网格背景 -->
      <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      ></div>

      <!-- 基金折线图背景 -->
      <div class="absolute inset-0">
        <!-- 主折线图 -->
        <svg
            ref="chartSvg"
            class="absolute inset-0 w-full h-full opacity-10 dark:opacity-5"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
        >
          <!-- 网格线 -->
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(100,116,139,0.1)" stroke-width="1" />
            </pattern>
            <!-- 渐变定义 -->
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" :stop-color="gradientColors.sky.start" />
              <stop offset="100%" :stop-color="gradientColors.sky.end" />
            </linearGradient>
            <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" :stop-color="gradientColors.emerald.start" />
              <stop offset="100%" :stop-color="gradientColors.emerald.end" />
            </linearGradient>
            <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" :stop-color="gradientColors.amber.start" />
              <stop offset="100%" :stop-color="gradientColors.amber.end" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" :stop-color="gradientColors.red.start" />
              <stop offset="100%" :stop-color="gradientColors.red.end" />
            </linearGradient>
            <linearGradient id="violetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" :stop-color="gradientColors.violet.start" />
              <stop offset="100%" :stop-color="gradientColors.violet.end" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          <!-- 多条基金折线 -->
          <g v-for="(line, index) in fundLines" :key="index">
            <!-- 折线路径 -->
            <path
                :d="line.path"
                fill="none"
                :stroke="`url(#${line.gradientId})`"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="fund-line"
                :style="{
                '--stroke-dasharray': line.totalLength,
                '--stroke-dashoffset': line.totalLength,
                'animation-delay': `${index * 0.3}s`,
                filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
              }"
            />

            <!-- 区域填充（渐变） -->
            <path
                :d="`${line.path} L ${line.points[line.points.length - 1].x} 800 L ${line.points[0].x} 800 Z`"
                :fill="`url(#${line.gradientId})`"
                opacity="0.05"
                class="area-fill transition-all duration-1000"
                :style="{
                'animation-delay': `${index * 0.5}s`
              }"
            />

            <!-- 数据点 -->
            <circle
                v-for="(point, pointIndex) in line.points"
                :key="pointIndex"
                :cx="point.x"
                :cy="point.y"
                r="3.5"
                :fill="line.color"
                class="data-point animate-fade-in"
                :style="{
                'animation-delay': `${0.8 + pointIndex * 0.2 + index * 0.3}s`,
                filter: 'drop-shadow(0 0 4px currentColor)'
              }"
            />

            <!-- 当前点（高亮） -->
            <circle
                v-if="line.currentPoint"
                :cx="line.currentPoint.x"
                :cy="line.currentPoint.y"
                r="6"
                :fill="line.color"
                opacity="1"
                class="current-point animate-ping-slow"
                :style="{
                'animation-delay': `${index * 0.2}s`
              }"
            >
              <animate
                  attributeName="r"
                  values="6;8;6"
                  dur="2s"
                  repeatCount="indefinite"
              />
            </circle>

            <!-- 趋势指示器 -->
            <g v-if="line.showTrend">
              <path
                  :d="line.trendIndicator"
                  stroke="#22c55e"
                  stroke-width="2"
                  stroke-dasharray="5,3"
                  fill="none"
                  opacity="0.6"
              />
              <circle
                  :cx="line.trendEnd.x"
                  :cy="line.trendEnd.y"
                  r="4"
                  fill="#22c55e"
                  opacity="0.8"
                  class="animate-pulse"
              />
            </g>
          </g>

          <!-- Y轴刻度 -->
          <g class="axis-labels">
            <text
                v-for="(tick, index) in yAxisTicks"
                :key="'y-' + index"
                :x="50"
                :y="tick.position"
                text-anchor="end"
                fill="rgba(100, 116, 139, 0.6)"
                font-size="12"
                font-family="monospace"
                class="axis-label"
            >
              {{ tick.value }}
            </text>
          </g>

          <!-- X轴时间标签 -->
          <g class="time-labels">
            <text
                v-for="(time, index) in timeLabels"
                :key="'time-' + index"
                :x="time.position"
                :y="780"
                text-anchor="middle"
                fill="rgba(100, 116, 139, 0.6)"
                font-size="12"
                font-family="monospace"
                class="time-label"
            >
              {{ time.label }}
            </text>
          </g>

          <!-- 实时波动点 -->
          <circle
              v-for="(dot, index) in animatedDots"
              :key="'dot-' + index"
              :cx="dot.x"
              :cy="dot.y"
              :r="dot.size"
              :fill="dot.color"
              opacity="0.4"
              class="animate-pulse"
              :style="{
              'animation-duration': dot.duration,
              'animation-delay': dot.delay
            }"
          />

          <!-- 实时价格指示器 -->
          <g v-if="showPriceIndicator">
            <line
                :x1="priceIndicator.x - 20"
                :y1="priceIndicator.y"
                :x2="priceIndicator.x + 20"
                :y2="priceIndicator.y"
                stroke="#ef4444"
                stroke-width="1"
                stroke-dasharray="3,3"
            />
            <text
                :x="priceIndicator.x + 25"
                :y="priceIndicator.y"
                text-anchor="start"
                fill="#ef4444"
                font-size="12"
                font-weight="bold"
                font-family="monospace"
                class="price-indicator"
            >
              {{ priceIndicator.price }}
            </text>
          </g>
        </svg>

        <!-- 实时数据标签 -->
        <div
            v-for="(label, index) in dataLabels"
            :key="'label-' + index"
            class="absolute text-xs font-mono pointer-events-auto transition-all duration-300 backdrop-blur-sm bg-white/10 dark:bg-black/10 px-3 py-2 rounded-lg border border-white/20 dark:border-white/10"
            :style="{
            left: `${label.x}%`,
            top: `${label.y}%`,
            color: label.color,
            opacity: label.opacity,
            transform: `translateY(${label.offset}px)`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }"
        >
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: label.color }"></div>
            <span class="font-semibold">{{ label.text }}</span>
          </div>
          <div class="text-xs opacity-80 mt-1 font-bold">{{ label.value }}</div>
          <div class="text-xs opacity-60 mt-1">{{ label.change }}</div>
        </div>


      </div>

      <!-- 动态漂浮的公式 -->
      <div
          v-for="(formula, index) in floatingFormulas"
          :key="index"
          :ref="el => formulaRefs[index] = el"
          class="absolute text-lg font-mono select-none pointer-events-auto hover:scale-110 hover:opacity-30 transition-all duration-300"
          :class="formula.animationClass"
          :style="{
          left: formula.x + '%',
          top: formula.y + '%',
          transform: `translate(${formula.dx}px, ${formula.dy}px) rotate(${formula.rotation}deg)`,
          opacity: formula.opacity,
          color: `rgba(var(--formula-color), ${formula.opacity})`,
          fontSize: formula.size + 'px',
          filter: formula.glow ? `drop-shadow(0 0 ${formula.glow}px currentColor)` : 'none',
          zIndex: formula.zIndex
        }"
          @mouseenter="onFormulaHover(index)"
          @mouseleave="onFormulaLeave(index)"
      >
        {{ formula.text }}
      </div>

      <!-- 装饰性圆圈 -->
      <div
          class="absolute top-1/2 left-[-100px] w-[300px] h-[300px] border border-sky-500/5 rounded-full animate-[spin_40s_linear_infinite]"
      ></div>
      <div
          class="absolute top-1/2 left-[-100px] w-[300px] h-[300px] border-t border-sky-500/10 rounded-full animate-[spin_25s_linear_infinite_reverse]"
      ></div>

      <!-- 动态粒子效果 -->
      <div class="absolute inset-0 overflow-hidden">
        <div
            v-for="n in 15"
            :key="'particle-' + n"
            class="absolute w-[1px] h-[1px] bg-sky-400/30 rounded-full animate-pulse"
            :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDuration: (Math.random() * 3 + 2) + 's',
            animationDelay: (Math.random() * 2) + 's',
            opacity: Math.random() * 0.5 + 0.1
          }"
        ></div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="relative z-10 space-y-24">
      <!-- 标题和描述部分 -->
      <div class="grid md:grid-cols-5 gap-12 items-start">
        <div
            class="md:col-span-3 prose prose-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium"
        >
          <h1 class="text-4xl font-bold text-[#1d1d1f] dark:text-white mb-6">
            我们的产品
          </h1>
          <p class="mb-6">
            我们构建智能、高效的数字解决方案，帮助企业实现数字化转型，提升运营效率与用户体验。
          </p>
          <p>
            每一款产品都经过精心设计和严谨开发，融合前沿技术与人性化设计，
            <span class="text-sky-600 dark:text-sky-400"
            >让技术真正服务于业务需求</span
            >
          </p>
        </div>

        <div
            class="md:col-span-2 bg-gray-50/50 dark:bg-white/[0.03] p-8 rounded-3xl border border-gray-100 dark:border-white/10 backdrop-blur-sm"
        >
          <p
              class="text-sm text-gray-500 dark:text-gray-400 italic leading-loose"
          >
            "优秀的产品不仅是功能的集合，更是对用户需求的深刻理解与技术实现的完美平衡。"
          </p>
        </div>
      </div>

      <!-- 核心产品部分 -->
      <div class="pt-20">
        <h2 class="text-3xl font-bold text-[#1d1d1f] dark:text-white mb-4">
          核心产品
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
          我们致力于提供全方位、一体化的数字解决方案
        </p>

        <div class="space-y-8">
          <div
              v-for="product in products"
              :key="product.title"
              class="bg-white/80 dark:bg-white/[0.02] backdrop-blur-md p-8 rounded-3xl border border-gray-100 dark:border-white/5 hover:shadow-xl transition-all hover:border-sky-200 dark:hover:border-sky-500/30 group"
          >
            <div class="flex flex-col lg:flex-row items-start gap-8">
              <div class="flex items-start gap-6 flex-shrink-0">
                <div
                    class="w-28 h-28 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-500/20 dark:to-blue-600/20 flex items-center justify-center group-hover:scale-105 transition-transform"
                >
                  <Image
                      :width="200"
                      :src="product.imgUrl"
                      class="text-sky-500 dark:text-sky-400 text-3xl"
                  />
                </div>
                <div>
                  <h3
                      class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                  >
                    {{ product.title }}
                  </h3>
                </div>
              </div>

              <div
                  class="lg:pl-8 lg:border-l lg:border-gray-200 dark:lg:border-white/10 flex-1"
              >
                <p v-html="product.description"
                    class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-4"
                >
                </p>

                <div class="mb-4">
                  <h4 class="text-gray-800 dark:text-gray-200 font-bold mb-2">
                    核心功能
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                        v-for="feature in product.features"
                        :key="feature"
                        class="px-3 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 rounded-lg text-sm"
                    >
                      {{ feature }}
                    </span>
                  </div>
                </div>

                <div class="mb-4">
                  <h4 class="text-gray-800 dark:text-gray-200 font-bold mb-2">
                    技术亮点
                  </h4>
                  <ul class="space-y-2">
                    <li
                        v-for="highlight in product.highLights"
                        :key="highlight.name"
                        class="text-gray-600 dark:text-gray-400 flex items-start gap-2"
                    >
                      <Icon
                          name="fa6-solid:star"
                          class="text-yellow-500 mt-1 flex-shrink-0"
                      />
                      <span
                      ><strong class="text-gray-800 dark:text-gray-200">{{ highlight.name }}</strong>
                        – {{ highlight.description }}</span
                      >
                    </li>
                  </ul>
                </div>


                <div class="pt-4 border-t border-gray-100 dark:border-white/5">
                  <h4 class="text-gray-800 dark:text-gray-200 font-bold mb-2">
                    网站地址
                  </h4>
                  <a :href="product.linkUrl"
                      class="text-sky-600 dark:text-sky-400 font-medium text-lg mb-3"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                  {{ product.linkUrl  }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 开发流程部分 -->
      <div class="pt-20">
        <h2 class="text-3xl font-bold text-[#1d1d1f] dark:text-white mb-4">
          开发流程
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
          严谨的开发流程确保产品质量与效率
        </p>

        <div class="grid md:grid-cols-4 gap-6">
          <div
              v-for="step in developmentSteps"
              :key="step.name"
              class="bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-white/5 text-center hover:translate-y-[-4px] transition-transform"
          >
            <div
                class="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center mx-auto mb-4"
            >
              <Icon :name="step.icon" class="text-sky-500 dark:text-sky-400" />
            </div>
            <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">
              {{ step.name }}
            </h4>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- 底部召唤行动 -->
      <div class="flex flex-col items-center justify-center pt-20 text-center">
        <div
            class="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6"
        >
          <Icon name="fa6-solid:rocket" class="text-blue-400" />
        </div>
        <p class="text-gray-400 dark:text-gray-500 text-sm mb-8">
          开启数字转型之旅
        </p>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          我们相信技术能够为企业创造真正的价值。无论您是初创公司还是大型企业，我们都愿意成为您数字化转型的可靠伙伴。
          <span class="text-sky-600 dark:text-sky-400 font-medium"
          >立即咨询，探索适合您的解决方案。</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "#components";
import { Image } from 'ant-design-vue'
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { PageintroduceApi } from '@/api/pageintroduce'
import { ProductIntroductionApi } from '@/api/productintroduction'

// 公式数据
const formulaLibrary = [
  // 物理公式
  "F = ma",
  "E = mc²",
  "∇·E = ρ/ε₀",
  "iℏ∂ψ/∂t = Ĥψ",
  "S = k ln Ω",
  "H = -∑ p log p",

  // 数学公式
  "e^{iπ} + 1 = 0",
  "∫ e^x dx = e^x + C",
  "∇×B = μ₀J + μ₀ε₀∂E/∂t",
  "x = [-b ± √(b²-4ac)]/2a",
  "f'(x) = lim(h→0) [f(x+h)-f(x)]/h",
  "∑_{n=1}^∞ 1/n² = π²/6",

  // 计算机科学
  "f(n) = O(g(n))",
  "P = NP ?",
  "A* = arg min f(n)",
  "L = -∑ y log ŷ",
  "σ(z) = 1/(1+e^{-z})",
  "∇J(θ) = ∂J/∂θ",

  // 量子计算
  "|ψ⟩ = α|0⟩ + β|1⟩",
  "H = |0⟩⟨1| + |1⟩⟨0|",
  "CNOT = |0⟩⟨0|⊗I + |1⟩⟨1|⊗X",
  "U|ψ⟩ = e^{-iHt}|ψ⟩",

  // 数据分析
  "ŷ = Xβ + ε",
  "R² = 1 - SSR/SST",
  "p(x|θ) = ∏ p(xᵢ|θ)",
  "KL(P||Q) = ∑ P log(P/Q)",

  // 网络理论
  "d = Σ 1/path",
  "C = B/log N",
  "R = V/I",
  "ω = 2πf",
];

// 基金折线图数据
const fundLines = ref<any[]>([]);
const animatedDots = ref<any[]>([]);
const dataLabels = ref<any[]>([]);
const chartSvg = ref<SVGSVGElement | null>(null);
const showPriceIndicator = ref(false);
const priceIndicator = ref({ x: 0, y: 0, price: '' });

// 渐变颜色定义（根据主题变化）
const gradientColors = computed(() => ({
  sky: {
    start: 'rgba(14, 165, 233, 0.8)',
    end: 'rgba(56, 189, 248, 0.2)'
  },
  emerald: {
    start: 'rgba(34, 197, 94, 0.8)',
    end: 'rgba(74, 222, 128, 0.2)'
  },
  amber: {
    start: 'rgba(245, 158, 11, 0.8)',
    end: 'rgba(251, 191, 36, 0.2)'
  },
  red: {
    start: 'rgba(239, 68, 68, 0.8)',
    end: 'rgba(248, 113, 113, 0.2)'
  },
  violet: {
    start: 'rgba(139, 92, 246, 0.8)',
    end: 'rgba(167, 139, 250, 0.2)'
  }
}));

// Y轴刻度
const yAxisTicks = ref([
  { position: 200, value: '1200' },
  { position: 350, value: '1000' },
  { position: 500, value: '800' },
  { position: 650, value: '600' }
]);

// 时间标签
const timeLabels = ref([
  { position: 150, label: '09:30' },
  { position: 350, label: '10:30' },
  { position: 550, label: '11:30' },
  { position: 750, label: '13:00' },
  { position: 950, label: '14:00' },
  { position: 1150, label: '15:00' }
]);

// 实时统计数据
const realTimeStats = ref([
  { name: '上证指数', value: '3,245.67', change: 0.45 },
  { name: '深证成指', value: '11,285.31', change: 0.82 },
  { name: '创业板指', value: '2,345.12', change: 1.23 },
  { name: '沪深300', value: '4,123.45', change: 0.67 },
  { name: '成交额', value: '8,234.5亿', change: 12.3 }
]);

// 生成随机波动数据点
const generateRandomPoints = (baseY: number, count: number, volatility: number) => {
  const points = [];
  let x = 100;
  let y = baseY;
  const segmentWidth = 1000 / count;

  for (let i = 0; i <= count; i++) {
    x = 100 + i * segmentWidth;
    if (i > 0) {
      // 增加随机波动，但保持趋势
      const trend = Math.sin(i * 0.3) * 20;
      const random = (Math.random() - 0.5) * volatility;
      y += trend + random;
      y = Math.max(150, Math.min(650, y)); // 限制在150-650之间
    }
    points.push({ x, y });
  }

  return points;
};

// 更新折线数据
const updateFundLines = () => {
  fundLines.value.forEach((line, index) => {
    const volatility = 50 + index * 10; // 不同线的波动幅度不同
    const newPoints = generateRandomPoints(400 + (index - 2) * 40, 10, volatility);

    // 生成新的路径
    let newPath = `M ${newPoints[0].x} ${newPoints[0].y}`;
    for (let j = 1; j < newPoints.length; j++) {
      const prev = newPoints[j - 1];
      const curr = newPoints[j];
      const cp1x = prev.x + (curr.x - prev.x) / 3;
      const cp2x = prev.x + (curr.x - prev.x) * 2 / 3;
      newPath += ` C ${cp1x} ${prev.y}, ${cp2x} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    // 计算路径总长度
    let totalLength = 0;
    for (let j = 1; j < newPoints.length; j++) {
      const prev = newPoints[j - 1];
      const curr = newPoints[j];
      totalLength += Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2));
    }

    // 更新当前点（最后一个点）
    const currentPoint = newPoints[newPoints.length - 1];

    // 计算趋势指示器（最后三个点的趋势）
    const lastThreePoints = newPoints.slice(-3);
    const trendIndicator = `M ${lastThreePoints[0].x} ${lastThreePoints[0].y}
                           L ${lastThreePoints[2].x} ${lastThreePoints[2].y}`;

    // 平滑过渡更新
    setTimeout(() => {
      line.points = newPoints;
      line.path = newPath;
      line.totalLength = Math.round(totalLength);
      line.currentPoint = currentPoint;
      line.showTrend = Math.random() > 0.7; // 随机显示趋势线
      line.trendIndicator = trendIndicator;
      line.trendEnd = lastThreePoints[2];
    }, index * 100); // 错开更新时间
  });

  // 更新实时价格指示器
  if (Math.random() > 0.7) {
    const randomLine = fundLines.value[Math.floor(Math.random() * fundLines.value.length)];
    const randomPoint = randomLine.points[Math.floor(Math.random() * randomLine.points.length)];

    showPriceIndicator.value = true;
    priceIndicator.value = {
      x: randomPoint.x,
      y: randomPoint.y,
      price: `$${(800 + Math.random() * 400).toFixed(2)}`
    };

    setTimeout(() => {
      showPriceIndicator.value = false;
    }, 3000);
  }

  // 更新统计数据
  updateRealTimeStats();
};

// 更新实时统计数据
const updateRealTimeStats = () => {
  realTimeStats.value.forEach(stat => {
    const change = (Math.random() - 0.5) * 2; // -1% 到 +1% 的变化
    stat.change += change;
    stat.change = Math.max(-5, Math.min(5, stat.change)); // 限制在±5%之间

    // 更新数值
    const baseValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
    const newValue = baseValue * (1 + change / 100);

    if (stat.name.includes('指数')) {
      stat.value = newValue.toFixed(2);
    } else if (stat.name.includes('成交额')) {
      stat.value = `${(newValue / 10000).toFixed(1)}万亿`;
    }
  });
};

// 生成基金折线图
const generateFundLines = () => {
  const lines = [];
  const colors = [
    'rgba(14, 165, 233, 0.8)',  // sky-500
    'rgba(34, 197, 94, 0.8)',   // emerald-500
    'rgba(245, 158, 11, 0.8)',  // amber-500
    'rgba(239, 68, 68, 0.8)',   // red-500
    'rgba(139, 92, 246, 0.8)',  // violet-500
  ];

  const gradientIds = ['skyGradient', 'emeraldGradient', 'amberGradient', 'redGradient', 'violetGradient'];

  for (let i = 0; i < 5; i++) {
    const points = generateRandomPoints(400 + (i - 2) * 40, 10, 60);

    // 生成路径
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let j = 1; j < points.length; j++) {
      const prev = points[j - 1];
      const curr = points[j];
      const cp1x = prev.x + (curr.x - prev.x) / 3;
      const cp2x = prev.x + (curr.x - prev.x) * 2 / 3;
      path += ` C ${cp1x} ${prev.y}, ${cp2x} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    // 计算路径总长度
    let totalLength = 0;
    for (let j = 1; j < points.length; j++) {
      const prev = points[j - 1];
      const curr = points[j];
      totalLength += Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2));
    }

    // 当前点（最后一个点）
    const currentPoint = points[points.length - 1];

    lines.push({
      path,
      points,
      color: colors[i],
      gradientId: gradientIds[i],
      totalLength: Math.round(totalLength),
      name: ['科技ETF', '医疗指数', '新能源', '消费基金', '全球配置'][i],
      currentPoint,
      showTrend: false,
      trendIndicator: '',
      trendEnd: { x: 0, y: 0 }
    });
  }

  fundLines.value = lines;

  // 生成动态点
  const dots = [];
  for (let i = 0; i < 8; i++) {
    dots.push({
      x: Math.random() * 1100 + 50,
      y: Math.random() * 600 + 100,
      size: Math.random() * 4 + 1,
      color: `rgba(14, 165, 233, ${Math.random() * 0.3 + 0.1})`,
      duration: `${Math.random() * 2 + 1}s`,
      delay: `${Math.random() * 2}s`
    });
  }
  animatedDots.value = dots;

  // 生成数据标签
  const labels = [];
  const labelColors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

  for (let i = 0; i < 5; i++) {
    const change = (Math.random() - 0.5) * 5;
    const isPositive = change >= 0;

    labels.push({
      x: Math.random() * 70 + 15,
      y: Math.random() * 70 + 15,
      text: ['科技ETF', '医疗指数', '新能源', '消费基金', '全球配置'][i],
      value: `$${(1000 + Math.random() * 500).toFixed(2)}`,
      change: `${isPositive ? '+' : ''}${change.toFixed(2)}%`,
      color: labelColors[i],
      opacity: Math.random() * 0.3 + 0.2,
      offset: Math.random() * 10 - 5
    });
  }
  dataLabels.value = labels;
};

// 漂浮公式数据
const floatingFormulas = ref<any[]>([]);
const formulaRefs = ref<(HTMLElement | null)[]>([]);
const backgroundContainer = ref<HTMLElement | null>(null);
const mousePosition = ref({ x: 0, y: 0 });

// 动画类
const animationClasses = [
  'animate-float',
  'animate-float-slow',
  'animate-float-reverse',
  'animate-pulse-slow'
];

// 初始化漂浮公式
const initializeFormulas = () => {
  const formulas = [];
  const usedPositions = new Set();

  for (let i = 0; i < 12; i++) {
    let x, y;
    let attempts = 0;

    // 确保公式不重叠
    do {
      x = Math.random() * 80 + 10; // 10-90%
      y = Math.random() * 80 + 10; // 10-90%
      attempts++;
    } while (
        Array.from(usedPositions).some(pos => {
          const [px, py] = pos.split(',').map(Number);
          return Math.abs(px - x) < 15 && Math.abs(py - y) < 15;
        }) && attempts < 100
        );

    usedPositions.add(`${Math.round(x/5)*5},${Math.round(y/5)*5}`);

    const formula = {
      text: formulaLibrary[Math.floor(Math.random() * formulaLibrary.length)],
      x,
      y,
      dx: (Math.random() - 0.5) * 20,
      dy: (Math.random() - 0.5) * 20,
      rotation: (Math.random() - 0.5) * 30,
      opacity: Math.random() * 0.2 + 0.05,
      size: Math.random() * 8 + 14,
      glow: Math.random() > 0.7 ? Math.random() * 2 + 1 : 0,
      zIndex: Math.floor(Math.random() * 10),
      animationClass: animationClasses[Math.floor(Math.random() * animationClasses.length)],
      hovered: false,
      originalOpacity: 0
    };

    formula.originalOpacity = formula.opacity;
    formulas.push(formula);
  }

  floatingFormulas.value = formulas;
};

// 鼠标移动效果
const handleMouseMove = (event: MouseEvent) => {
  mousePosition.value = {
    x: event.clientX,
    y: event.clientY
  };

  floatingFormulas.value.forEach((formula, index) => {
    if (formula.hovered) return;

    const el = formulaRefs.value[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(mousePosition.value.x - centerX, 2) +
        Math.pow(mousePosition.value.y - centerY, 2)
    );

    // 鼠标靠近时公式轻微移动
    if (distance < 200) {
      const force = (200 - distance) / 200;
      formula.dx = (centerX - mousePosition.value.x) * 0.002 * force;
      formula.dy = (centerY - mousePosition.value.y) * 0.002 * force;
    } else {
      // 缓慢恢复原位
      formula.dx *= 0.95;
      formula.dy *= 0.95;
    }
  });
};

// 公式悬停效果
const onFormulaHover = (index: number) => {
  floatingFormulas.value[index].hovered = true;
  floatingFormulas.value[index].opacity = floatingFormulas.value[index].originalOpacity * 3;
};

const onFormulaLeave = (index: number) => {
  floatingFormulas.value[index].hovered = false;
  floatingFormulas.value[index].opacity = floatingFormulas.value[index].originalOpacity;
};

// 产品数据
const products = ref([])

const developmentSteps = ref([])
const searchPageByType = async () => {
  try {
    const data = await PageintroduceApi.searchByType({type: 'products'})
    developmentSteps.value = data
  }catch (e) {
    console.log('报错信息：',e)
  }
}

const searchProducts = async () => {
  try {
    const data = await ProductIntroductionApi.searchProductData()
    products.value = data
  }catch (e) {
    console.log('报错信息：',e)
  }
}

// 生命周期
onMounted(() => {
  searchPageByType()
  searchProducts()
  initializeFormulas();
  generateFundLines();

  // 实时更新折线数据（每3秒更新一次）
  const fundUpdateInterval = setInterval(() => {
    updateFundLines();
  }, 3000);

  // 动态更新漂浮点
  const dotUpdateInterval = setInterval(() => {
    animatedDots.value = animatedDots.value.map(dot => ({
      ...dot,
      x: Math.random() * 1100 + 50,
      y: Math.random() * 600 + 100,
      opacity: Math.random() * 0.3 + 0.1
    }));
  }, 5000);

  // 更新数据标签
  const labelUpdateInterval = setInterval(() => {
    dataLabels.value = dataLabels.value.map(label => ({
      ...label,
      value: `$${(800 + Math.random() * 400).toFixed(2)}`,
      change: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 3).toFixed(2)}%`,
      offset: Math.random() * 10 - 5
    }));
  }, 4000);

  // 每30秒重新随机化公式位置
  const formulaInterval = setInterval(() => {
    floatingFormulas.value.forEach(formula => {
      if (!formula.hovered) {
        formula.dx += (Math.random() - 0.5) * 0.5;
        formula.dy += (Math.random() - 0.5) * 0.5;
        // 限制移动范围
        formula.dx = Math.max(-15, Math.min(15, formula.dx));
        formula.dy = Math.max(-15, Math.min(15, formula.dy));
      }
    });
  }, 30000);

  onUnmounted(() => {
    clearInterval(fundUpdateInterval);
    clearInterval(dotUpdateInterval);
    clearInterval(labelUpdateInterval);
    clearInterval(formulaInterval);
  });
});
</script>

<style scoped>
/* 定义CSS变量用于主题切换 */
:root {
  --formula-color-light: 14 165 233; /* sky-500 */
  --formula-color-dark: 56 189 248; /* sky-400 */
}

.dark {
  --formula-color: var(--formula-color-dark);
}

.light {
  --formula-color: var(--formula-color-light);
}

/* 基金折线动画 */
.fund-line {
  stroke-dasharray: var(--stroke-dasharray);
  stroke-dashoffset: var(--stroke-dashoffset);
  animation: drawFundLine 8s ease-in-out forwards;
  filter: drop-shadow(0 0 1px currentColor);
  transition: stroke-dashoffset 1.5s ease-in-out;
}

@keyframes drawFundLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* 数据点淡入动画 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

/* 区域填充动画 */
.area-fill {
  transition: opacity 1s ease-in-out;
}

/* 缓慢ping动画 */
@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

.animate-ping-slow {
  animation: ping-slow 2s ease-in-out infinite;
}

/* K线绘制动画 */
.k-line-path {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  animation: drawLine 10s linear infinite alternate;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* 漂浮动画 */
.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 12s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 10s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(10px, -15px) rotate(2deg);
  }
  66% {
    transform: translate(-5px, 10px) rotate(-1deg);
  }
}

@keyframes float-reverse {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(-12px, 8px) rotate(-2deg);
  }
  66% {
    transform: translate(8px, -5px) rotate(1deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.05);
  }
}

/* 公式样式增强 */
.floating-formula {
  text-shadow: 0 0 8px currentColor;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

/* 数据标签样式 */
.data-label {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 4px 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* 数据点样式 */
.data-point {
  transition: all 0.3s ease;
}

.data-point:hover {
  r: 5;
  opacity: 1;
  filter: drop-shadow(0 0 6px currentColor);
}

.current-point {
  filter: drop-shadow(0 0 8px currentColor);
}

/* 轴标签样式 */
.axis-label,
.time-label {
  transition: opacity 0.3s ease;
}

.axis-label:hover,
.time-label:hover {
  opacity: 1;
}

/* 价格指示器样式 */
.price-indicator {
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .floating-formula {
    font-size: 12px !important;
    opacity: 0.15 !important;
  }

  .fund-line {
    stroke-width: 1.5;
  }

  .current-point {
    r: 4;
  }
}

/* 打印时隐藏背景效果 */
@media print {
  .floating-formula,
  .fund-line,
  .k-line-path,
  .animate-float,
  .animate-float-slow,
  .animate-float-reverse,
  .data-label,
  .current-point,
  .price-indicator {
    display: none !important;
  }
}

/* 暗色主题适配 */
.dark .fund-line {
  filter: drop-shadow(0 0 2px rgba(255,255,255,0.1));
}

.dark .data-point {
  filter: drop-shadow(0 0 3px rgba(255,255,255,0.2));
}

.dark .axis-label,
.dark .time-label {
  fill: rgba(255, 255, 255, 0.4);
}

/* 实时统计面板动画 */
.real-time-stat {
  transition: all 0.3s ease;
}

.real-time-stat:hover {
  transform: translateX(4px);
}
</style>
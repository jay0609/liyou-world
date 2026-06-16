<template>
  <footer class="relative border-t border-liyou-light-purple/20 bg-liyou-moon-white-soft py-3xl px-lg overflow-hidden">
    <!-- 装饰星 -->
    <span class="absolute top-8 left-8 text-2xl opacity-15 text-liyou-light-purple select-none pointer-events-none">✦</span>
    <span class="absolute top-12 right-12 text-xl opacity-10 text-liyou-light-purple select-none pointer-events-none">✧</span>
    <span class="absolute bottom-10 left-1/4 text-lg opacity-12 text-liyou-pink select-none pointer-events-none">✧</span>
    <span class="absolute bottom-16 right-1/3 text-xl opacity-10 text-liyou-light-purple select-none pointer-events-none">✦</span>

    <div class="max-w-content mx-auto relative z-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2xl">
        <!-- 品牌 -->
        <div>
          <h4 class="text-heading-md text-liyou-pink font-display mb-md">璃幽宇宙</h4>
          <p class="text-body-sm text-liyou-text-muted mb-sm">万物有灵，为你解忧</p>
          <p class="text-caption text-liyou-text-muted/60">© 2026 Liyou World</p>
          <div class="flex gap-sm mt-md text-liyou-text-muted/30 text-sm">
            <span>🌸</span><span>📖</span><span>✨</span>
          </div>
        </div>

        <div>
          <h5 class="text-body-sm font-semibold text-liyou-text-primary mb-sm">探索</h5>
          <div class="flex flex-col gap-xs">
            <router-link to="/book-spirit" class="footer-link">书灵志</router-link>
            <router-link to="/oc-workshop" class="footer-link">灵境</router-link>
            <router-link to="/dimension-library" class="footer-link">次元书库</router-link>
            <router-link to="/fan-garden" class="footer-link">粉丝庭院</router-link>
          </div>
        </div>

        <div>
          <h5 class="text-body-sm font-semibold text-liyou-text-primary mb-sm">支持</h5>
          <div class="flex flex-col gap-xs">
            <router-link to="/about" class="footer-link">关于我们</router-link>
            <a href="#" class="footer-link">常见问题</a>
            <a href="#" class="footer-link">合作联系</a>
          </div>
        </div>

        <div>
          <h5 class="text-body-sm font-semibold text-liyou-text-primary mb-sm">社区</h5>
          <div class="flex flex-col gap-xs">
            <a href="#" class="footer-link">QQ群</a>
            <a href="#" class="footer-link">二创展示</a>
            <a href="#" class="footer-link">同人活动</a>
          </div>
        </div>
      </div>

      <div class="mt-2xl pt-lg border-t border-liyou-light-purple/15 text-center">
        <p class="text-caption text-liyou-text-muted/50 flex items-center justify-center gap-xs">
          <span>璃幽宇宙</span>
          <span class="text-liyou-light-purple/40">·</span>
          <span>次元解忧杂货店</span>
          <span class="text-liyou-light-purple/40">·</span>
          <span>Made with 💜</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  color: var(--liyou-text-muted);
  text-decoration: none;
  font-size: 0.8125rem;
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: var(--liyou-pink);
}
</style>

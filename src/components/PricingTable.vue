<template>
  <section class="pricing">
    <!-- 我的水平：历史最高 + 目前数据（背书放在价格前面） -->
    <div v-if="pricing.selfRank" class="self-rank">
      <div class="sr-block">
        <p class="self-rank-label">{{ pricing.selfRank.historyLabel || pricing.selfRank.label }}</p>
        <div class="self-rank-items">
          <div v-for="s in pricing.selfRank.history" :key="s.platform" class="self-rank-item">
            <span class="sr-platform">{{ s.platform }}</span>
            <span class="sr-rank">{{ s.rank }}</span>
            <span v-if="s.rating" class="sr-rating">rating {{ s.rating }}</span>
          </div>
        </div>
      </div>

      <div v-if="pricing.selfRank.current?.length" class="sr-block sr-block--current">
        <p class="self-rank-label">{{ pricing.selfRank.currentLabel || '目前数据' }}</p>
        <div class="sr-stats">
          <div v-for="c in pricing.selfRank.current" :key="c.label" class="sr-stat">
            <span class="sr-stat-value">{{ c.value }}</span>
            <span class="sr-stat-label">{{ c.label }}</span>
          </div>
        </div>
      </div>

      <p v-if="pricing.selfRank.note" class="self-rank-note">{{ pricing.selfRank.note }}</p>
    </div>

    <div class="pricing-grid">
      <div v-for="g in pricing.games" :key="g.name" class="price-card">
        <header class="price-head">
          <span class="price-icon">{{ g.icon }}</span>
          <h3 class="price-game">{{ g.name }}</h3>
          <span class="price-unit">/ {{ g.unit }}</span>
        </header>

        <p v-if="g.note" class="price-tag">🎁 {{ g.note }}</p>

        <ul class="price-tiers">
          <li v-for="t in g.tiers" :key="t.label" class="tier-row">
            <span class="tier-label">
              {{ t.label }}<span v-if="t.score" class="tier-score"> · {{ t.score }}</span>
            </span>
            <span class="tier-dots" aria-hidden="true"></span>
            <span class="tier-price"><span class="tier-unit">¥</span>{{ t.price }}</span>
          </li>
        </ul>

        <!-- 包天（与按局/按小时的档位分开，避免混淆） -->
        <div v-if="g.packageOffer" class="package-offer">
          <span class="pkg-label">{{ g.packageOffer.label }}</span>
          <span class="pkg-price"><span class="tier-unit">¥</span>{{ g.packageOffer.price }}</span>
        </div>

        <p v-if="g.scoreNote" class="price-score-note">{{ g.scoreNote }}</p>
      </div>
    </div>

    <!-- 预约入口：转化出口 -->
    <div class="price-contact">
      <img
        class="price-qr"
        :src="CONTACT.wechatQr"
        :alt="`微信二维码：${CONTACT.wechatId}`"
        loading="lazy"
      />
      <div class="price-contact-text">
        <p class="price-contact-title">扫码加微信 · {{ CONTACT.wechatId }}</p>
        <p class="price-contact-desc">告诉我段位和想打的时间，我直接报价。</p>
        <p class="price-contact-desc">
          抖音同号：<strong class="price-douyin">{{ CONTACT.wechatId }}</strong>
        </p>
        <p v-if="pricing.onlineHours" class="price-contact-desc">
          在线时间：<strong>{{ pricing.onlineHours }}</strong>
        </p>
        <p v-if="pricing.disclaimer" class="price-contact-desc">{{ pricing.disclaimer }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pricing } from '../data/pricing'
import { CONTACT } from '../constants'
</script>

<style scoped>
/* ── 我的水平（背书） ── */
.self-rank {
  margin-bottom: 20px;
  padding: 16px 22px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(0, 229, 192, 0.1), rgba(255, 180, 84, 0.1));
  border: 1px solid rgba(0, 229, 192, 0.3);
}
.self-rank-label {
  margin: 0 0 10px;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  color: #b8829a;
}
.self-rank-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.self-rank-item {
  display: flex;
  align-items: baseline;
  gap: 7px;
  padding: 7px 14px;
  border-radius: 10px;
  background: rgba(19, 25, 32, 0.75);
  border: 1px solid rgba(0, 229, 192, 0.22);
}
.sr-platform {
  font-size: 0.75rem;
  color: var(--liyou-text-muted, #9a93a8);
}
.sr-rank {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #00E5C0;
}
.sr-rating {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.75rem;
  color: #b08a4a;
}
.self-rank-note {
  margin: 10px 0 0;
  font-size: 0.75rem;
  color: var(--liyou-text-muted, #9a93a8);
}

/* 历史最高 / 目前数据 两块之间的分隔 */
.sr-block + .sr-block {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(139, 154, 171, 0.15);
}
.sr-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(94px, 1fr));
  gap: 8px;
}
.sr-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 9px 8px;
  border-radius: 8px;
  background: rgba(19, 25, 32, 0.7);
  border: 1px solid rgba(139, 154, 171, 0.16);
}
.sr-stat-value {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--liyou-pink);
}
.sr-stat-label {
  font-size: 0.6875rem;
  color: var(--liyou-text-muted);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.price-card {
  background: rgba(19, 25, 32, 0.72);
  border: 1px solid rgba(0, 229, 192, 0.22);
  border-radius: 16px;
  padding: 20px 22px 16px;
  backdrop-filter: blur(12px);
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.price-card:hover {
  border-color: rgba(0, 229, 192, 0.5);
  transform: translateY(-2px);
}

.price-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(200, 180, 220, 0.18);
}
.price-icon { font-size: 1.125rem; }
.price-game {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--liyou-text-primary);
}
/* 计价单位徽标，如 / 局 · / 小时 */
.price-unit {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 999px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.6875rem;
  color: var(--liyou-pink);
  background: rgba(0, 229, 192, 0.1);
  border: 1px solid rgba(0, 229, 192, 0.28);
  white-space: nowrap;
}

.price-tag {
  margin: 0 0 10px;
  font-size: 0.8125rem;
  color: #b8829a;
  background: rgba(255, 180, 84, 0.1);
  border-radius: 6px;
  padding: 5px 10px;
}

.price-tiers {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tier-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 5px 0;
  font-size: 0.875rem;
}
.tier-label {
  color: var(--liyou-text-secondary, #9BA9B8);
  white-space: nowrap;
}
.tier-score {
  font-size: 0.75rem;
  color: var(--liyou-text-muted, #9a93a8);
}
/* 中间虚线，让价格右对齐后仍然好读 */
.tier-dots {
  flex: 1;
  min-width: 12px;
  border-bottom: 1px dashed rgba(0, 229, 192, 0.32);
  transform: translateY(-3px);
}
.tier-price {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-weight: 600;
  color: #00E5C0;
  white-space: nowrap;
}
.tier-unit { font-size: 0.75em; margin-right: 1px; }

.price-score-note {
  margin: 10px 0 0;
  font-size: 0.75rem;
  color: var(--liyou-text-muted, #9a93a8);
}

/* 包天 */
.package-offer {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-top: 12px;
  padding: 9px 14px;
  border-radius: 8px;
  background: rgba(255, 180, 84, 0.09);
  border: 1px solid rgba(255, 180, 84, 0.3);
}
.pkg-label {
  font-size: 0.8125rem;
  color: var(--liyou-text-secondary);
}
.pkg-price {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--liyou-glow-gold);
}
.price-douyin {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  color: var(--liyou-text-primary);
}

/* ── 预约入口 ── */
.price-contact {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 22px;
  padding: 18px 22px;
  border-radius: 16px;
  background: rgba(19, 25, 32, 0.72);
  border: 1px solid rgba(255, 180, 84, 0.35);
  backdrop-filter: blur(12px);
}
.price-qr {
  width: 104px;
  height: 104px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  padding: 4px;
  object-fit: contain;
}
.price-contact-text { min-width: 0; }
.price-contact-title {
  margin: 0 0 6px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--liyou-text-primary, #3d3550);
}
.price-contact-desc {
  margin: 0 0 4px;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--liyou-text-secondary, #9BA9B8);
}

@media (max-width: 640px) {
  .price-card { padding: 16px 16px 12px; }
  .tier-row { font-size: 0.8125rem; }
  .price-contact { flex-direction: column; text-align: center; gap: 14px; padding: 18px 16px; }
  .self-rank { padding: 14px 16px; }
  .self-rank-item { padding: 6px 11px; }
}
</style>

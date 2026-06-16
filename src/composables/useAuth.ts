/**
 * 认证 composable — 薄封装，实际逻辑在 stores/auth.ts (Pinia)
 * 保留此文件以确保现有组件无需修改引用路径
 */
export { useAuthStore as useAuth } from '../stores/auth'

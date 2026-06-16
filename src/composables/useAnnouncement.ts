/**
 * 公告 composable — 薄封装，实际逻辑在 stores/announcement.ts (Pinia)
 * 保留此文件以确保现有组件无需修改引用路径
 */
export { useAnnouncementStore as useAnnouncement } from '../stores/announcement'

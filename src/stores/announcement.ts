import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { siteAnnouncement } from '../data/announcement'

export const useAnnouncementStore = defineStore('announcement', () => {
  const state = reactive<{
    current: { text: string; date: string; link: string }
    visible: boolean
  }>({
    current: {
      text: siteAnnouncement.text,
      date: siteAnnouncement.date,
      link: siteAnnouncement.link,
    },
    visible: siteAnnouncement.visible,
  })

  function update(text: string, date?: string, link?: string) {
    state.current.text = text
    if (date) state.current.date = date
    if (link) state.current.link = link
  }

  function close() { state.visible = false }
  function show() { state.visible = true }

  return { announcement: state, update, close, show }
})

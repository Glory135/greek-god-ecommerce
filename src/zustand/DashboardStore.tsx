import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useDashboardStore = create(
  combine(
    {
      searchOpen: false,
      loginModalOpen: false,
    },
    (set) => ({
      toggleSearchOpen: () => set((state) => (
        { searchOpen: !state.searchOpen }
      )),
      setSearchOpen: (open: boolean) => set({
        searchOpen: open
      }),
      setLoginModalOpen: (open: boolean) => set({
        loginModalOpen: open
      }),
      toggleLoginModal: () => set((state) => ({
        loginModalOpen: !state.loginModalOpen
      }))
    })
  )
)

export default useDashboardStore
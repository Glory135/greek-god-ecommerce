import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useDashboardStore = create(
  combine(
    {
      searchOpen: false,
    },
    (set) => ({
      toggleSearchOpen: () => set((state) => (
        { searchOpen: !state.searchOpen }
      )),
      setSearchOpen: (open: boolean) => set({
        searchOpen: open
      })
    })
  )
)


export default useDashboardStore
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { breakPointMd, breakPointLg } from '@/assets/css/variables.scss'

export const state = () => ({
  resolution: {
    x: 0,
    y: 0,
  },
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  breakpoint: (state): string => {
    const breakpoints = {
      md: parseInt(breakPointMd.replace('px', '')),
      lg: parseInt(breakPointLg.replace('px', '')),
    }
    if (state.resolution.x <= breakpoints.md) {
      return 'sm'
    } else if (state.resolution.x <= breakpoints.lg) {
      return 'md'
    } else {
      return 'lg'
    }
  },
}

export const mutations: MutationTree<RootState> = {
  resize: (state) => {
    state.resolution.x = document.body.clientWidth
    state.resolution.y = window.innerHeight
  },
}

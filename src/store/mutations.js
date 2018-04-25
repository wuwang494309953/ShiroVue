import * as types from './mutation-types'

const mutations = {
  [types.SET_SELECTROLE] (state, role) {
    state.selectRole = role
  }
}

export default mutations

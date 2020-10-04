import { createStore } from 'vuex'

const mutations = {
  login(state, payload) {
    console.log('login', payload)
    state.user = payload
  },
}

const store = createStore({
  state: {
    user: null,
  },
  mutations,
})

export default store

import { createStore } from 'vuex'
import router from './router.js'

const mutations = {
  login(state, payload) {
    console.log('login', payload)
    state.user = payload
  },
}

const actions = {
  doLogin: async ({ commit }, payload) => {
    console.log(payload)
    if (payload) {
      commit('login', payload)
      // await router.push('/dashboard')  // renu
      await router.push('/login') // renu
    } else {
      commit('login', null)
      await router.push('/signin')
    }
  },
}

const store = createStore({
  state: {
    user: null,
  },
  actions,
  mutations,
})

export default store

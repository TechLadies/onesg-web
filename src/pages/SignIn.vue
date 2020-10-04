<template>
  <div>
    <button class="button is-success" @click="login">Log In</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'SignIn',
  setup() {
    const store = useStore()
    const login = () => {
      // console.log(e)
      store.commit('login', 'zzzz')
    }
    return {
      login,
    }
  },
}
</script>

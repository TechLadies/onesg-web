<template>
  <div>
    <button class="button is-success" @click="login">Log In 1</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'SignIn',
  setup() {
    const store = useStore()
    const login = (e) => {
      console.log(e)
      store.dispatch('doLogin', 'zzzz')
    }
    return {
      login,
    }
  },
}
</script>

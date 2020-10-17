<template>
  <div>
    <button class="button is-success" @click="login">Log In 1</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  name: 'SignIn',
  setup() {
    const store = useStore()
    const login = (e) => {
      console.log(e)
      store.dispatch('doLogin', 'zzzz')
    }
    onMounted(() => {
      console.log('Signin is mounted!')
    })
    return {
      login,
    }
  },
}
</script>

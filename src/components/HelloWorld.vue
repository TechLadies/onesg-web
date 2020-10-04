<template>
  <section class="section">
    <div class="container">
      <h1 class="title">1Hello World</h1>
      <p class="subtitle">My first website with <strong>Bulma</strong>!</p>
      <p>
        <button class="button is-success" @click="changeVuex">Success</button>
      </p>
    </div>
  </section>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'HelloWorld',
  setup() {
    const store = useStore()
    const changeVuex = (e) => {
      console.log(e)
      store.commit('login', 'zzzz')
    }
    return {
      changeVuex,
    }
  },
}
</script>

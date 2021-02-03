<template>
  <div>
    <side-bar />

    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import SideBar from '../components/SideBar.vue'

export default {
  name: 'Secure',
  components: {
    SideBar,
  },
  setup() {
    const stage = ref(0)
    const store = useStore()
    const logout = (e) => {
      console.log(e)
      store.dispatch('doLogin', null)
    }
    onMounted(async () => {
      const res = await fetch('https://randomuser.me/api/')
      const data = await res.json()
      console.log(data)
      console.log('Secure is mounted!')
    })
    return {
      logout,
      stage,
    }
  },
}
</script>

<style scoped></style>

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
  methods: {
    log: function () {
      console.log('hello')
    },
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

<style scoped>
.main {
  margin-left: 10%;
  margin-right: 10%;
  text-align: left;
  padding: 0px 0px 0px 20px;
}

.title {
  padding-bottom: 20px;
  position: relative;
  font-size: 24px;
  font-weight: 600;
}

.arrow {
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 30px;
  padding-bottom: 50px;
}

.clear {
  visibility: hidden;
}
</style>

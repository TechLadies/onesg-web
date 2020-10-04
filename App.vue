<template>
  <div>
    <HelloWorld msg="onesg-web" />
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/signin">Sign In</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './src/components/HelloWorld.vue'
//import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    // const store = useStore()
    onMounted(() => {
      console.log('signIn mounted')
    })
  },
}
</script>

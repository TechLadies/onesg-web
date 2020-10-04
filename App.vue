<template>
  <component :is="$route.meta.layout || 'layout-public'"></component>
  <!-- 
  <div>
    <HelloWorld msg="onesg-web" />
    <router-link to="/dashboard">Dashboard {{ storeUser }} </router-link>
    <router-link to="/signin">Sign In</router-link>
    <router-view></router-view>
  </div>
  -->
</template>

<script>
import HelloWorld from './src/components/HelloWorld.vue'
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import layoutPublic from './src/layouts/Public.vue'
import layoutSecure from './src/layouts/Secure.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    layoutPublic,
    layoutSecure,
  },
  setup() {
    const store = useStore()
    const storeUser = computed(() => store.state.user)
    onMounted(() => {
      console.log('signIn mounted')
      store.commit('login', 'defg')
    })
    return {
      storeUser,
    }
  },
}
</script>

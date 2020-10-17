<template>
  <component :is="$route.meta.layout || 'layout-public'"></component>
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
      // store.commit('login', 'defg')
    })
    return {
      storeUser,
    }
  },
}
</script>

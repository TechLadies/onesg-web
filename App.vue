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

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
}
</script>

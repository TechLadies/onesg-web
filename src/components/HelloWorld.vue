<template>
  <div>
    <p>
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/signin">Sign In</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    }
  },
}
</script>

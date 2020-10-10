<template>  
  <div id="login" class="container"> 
    <h1>Email ID</h1>
    <p>
      <input
        type="text"
        name="emailId"
        v-model="input.emailId"
        placeholder="Email id"
      />
    </p>
    <h1>Password</h1>
    <p>
      <input
        type="password"
        name="password"
        v-model="input.password"
        placeholder="Password"
      />
    </p>    
    <button class="button is-link" v-on:click="login()">Login</button>
  </div>
</template>


<script>
export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {},
  },
}
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>

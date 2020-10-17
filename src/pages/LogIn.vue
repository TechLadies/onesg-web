<template>
  <div class="container">
    <!-- <div class="sidebar"></div> -->
    <div class="image">
      <img src="../images/Group_116.png" />
    </div>
    <div class="form">
      <div class="inputField">
        <div class="inputTitle">Email ID</div>
        <input class="input is-success" type="text" placeholder="Email ID" />
      </div>

      <div class="inputField">
        <div class="inputTitle">Password</div>
        <input class="input is-success" type="text" placeholder="Password" />
      </div>

      <div class="inputButton">
        <button
          @click="login"
          class="button is-block is-link is-focused is-fullwidth"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'login',
  setup() {
    const store = useStore()
    const login = (e) => {
      console.log(e)
      store.dispatch('doLogin', 'zzzz')
    }
    return {
      login,
    }
  },
}
</script>

<style scoped>
.form {
  text-align: left;
  font-size: 12;
  padding-top: 300px;
  padding-bottom: 150px;
}

.inputField {
  padding-top: 10px;
  padding-bottom: 10px;
}
.inputTitle {
  font-weight: 400;
  color: black;
}

.inputButton {
  padding-top: 10px;
  padding-bottom: 10px;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.image {
  padding-top: 50px;
  width: 240px;
  height: 180px;
  margin: right;
}

/* .sidebar {
  height: 100%;
  width: 100px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #08134b;
  padding-top: 16px;
} */
</style>

<template>
  <div>
    <Autocomplete />
    <div class="container">
      <div class="image">
        <img src="../images/Group_116.png" />
      </div>
      <div class="form">
        <div class="input-Field">
          <div class="input-title">Email ID</div>
          <input class="input is-success" type="text" placeholder="Email ID" />
        </div>

        <div class="input-field">
          <div class="input-title">Password</div>
          <input class="input is-success" type="text" placeholder="Password" />
        </div>

        <div class="input-button">
          <button
            @click="login"
            class="button is-block is-link is-focused is-fullwidth"
          >
            Log In
          </button>
        </div>
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
  padding-top: 270px;
  padding-bottom: 150px;
}

.input-field {
  padding-top: 10px;
  padding-bottom: 10px;
}
.input-title {
  font-weight: 400;
  color: black;
}

.input-button {
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
  padding-top: 20px;
  padding-right: 20px;
  width: 240px;
  height: 180px;
  margin: right;
}
</style>

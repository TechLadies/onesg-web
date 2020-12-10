<template>
  <div class="sidebar">
    <a @click="$router.push('/home')"
      ><i class="fa fa-fw fa-home"></i>
      <span><div class="heading">Home</div></span></a
    >
    <a @click="$router.push('/cases')"
      ><i class="fa fa-id-card-o"></i>
      <span><div class="heading">Cases</div></span></a
    >
    <a @click="$router.push('/requests')"
      ><i class="fa fa-check"></i>
      <span><div class="heading">Requests</div></span></a
    >
    <a @click="$router.push('/newcase')"
      ><i class="fa fa-plus-square"></i>
      <span><div class="heading">New Case</div></span></a
    >
    <a @click="$router.push('/account')"
      ><i class="fa fa-user-circle-o"></i>
      <span><div class="heading">Accounts</div></span></a
    >
    <a href="#" @click="logout"
      ><i class="fa fa-sign-out"></i>
      <span><div class="heading">Log Out</div></span></a
    >
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'SideBar',
  setup() {
    const store = useStore()
    const logout = (e) => {
      console.log(e)
      store.dispatch('doLogin', null)
    }

    return {
      logout,
    }
  },
}
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 7%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #08134b;
  overflow-x: scroll;
  padding-top: 16px;
}

.sidebar a {
  padding: 8px 8px 8px 8px;
  text-decoration: none;
  font-size: 14 px;
  color: white;
  display: block;
  text-align: center;
  transition: all 0.3s ease;
}

.sidebar a:hover {
  color: #f1f1f1;
}

.active {
  background-color: #4caf50; /* Add an active/current color */
}

@media (max-width: 1000px) {
  .heading {
    display: none;
  }
}

@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}

.main {
  margin-left: 10%;
  margin-right: 10%;
  text-align: left;
  padding: 0px 0px 0px 20px;
}

.title {
  padding-bottom: 20px;
  position: relative;
  font-size: 10;
  font-weight: 600;
}

p {
  text-align: center;
  font-weight: 400;
  color: black;
}

.center {
  width: 50%;
  text-align: center;
}

.form {
  text-align: left;
  font-size: 12;
  padding-top: 30px;
  padding-bottom: 30px;
}

.inputTitle {
  font-weight: 400;
  color: black;
}
</style>

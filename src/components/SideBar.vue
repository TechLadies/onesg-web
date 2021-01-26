<template>
  <div class="sidebar">
    <div class="one">ONE</div>
    <div class="singapore">SINGAPORE</div>
    <div class="menu-bar">
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
        <span><div class="heading">Account</div></span></a
      >
      <a href="#" @click="logout"
        ><i class="fa fa-sign-out"></i>
        <span><div class="heading">Log Out</div></span></a
      >
    </div>
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
@import url('https://fonts.googleapis.com/css2?family=Teko:wght@300;500&display=swap');

.menu-bar {
  padding-top: 60px;
}
.sidebar {
  height: 100%;
  width: 80px;
  position: fixed;
  border-radius: 0px 8px 8px 0px;
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
.one {
  position: absolute;
  left: 17.5%;
  right: 17.5%;
  top: 2.44%;
  bottom: 92.22%;
  font-family: Teko;
  font-style: normal;
  font-weight: 500;
  font-size: 44px;
  line-height: 48px; /* identical to box height, or 109% */
  display: flex;
  align-items: center;
  letter-spacing: -0.04em; /* White */
  color: #ffffff;
}
.singapore {
  position: absolute;
  left: 20%;
  right: 20%;
  top: 5.89%;
  bottom: 91.11%;
  font-family: Teko;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 27px; /* identical to box height, or 193% */
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;

  /* White */

  color: #ffffff;
}
</style>

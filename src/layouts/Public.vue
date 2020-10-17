<template>
  <div>
    <h1></h1>
    <div class="sidebar">
      <div class="one">ONE</div>
      <div class="singapore">SINGAPORE</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.one {
  position: absolute;
  left: 17.5%;
  right: 17.5%;
  top: 2.44%;
  bottom: 92.22%;

  font-family: Teko;
  font-style: normal;
  font-weight: 500;
  font-size: 33px;
  line-height: 48px;
  /* identical to box height, or 109% */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* White */
  color: #ffffff;
}
.singapore {
  position: absolute;
  left: 27%;
  right: 20%;
  top: 8.89%;
  bottom: 91.11%;

  font-family: Teko;
  font-style: normal;
  font-weight: 300;
  font-size: 7px;
  line-height: 27px;
  /* identical to box height, or 193% */

  display: flex;
  align-items: center;
  letter-spacing: 0.05em;

  /* White */

  color: #ffffff;
}
.sidebar {
  height: 100%;
  width: 100px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #08134b;
  padding-top: 16px;
}
</style>

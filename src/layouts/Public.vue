<template>
  <div>
    <h1></h1>
    <div class="sidebar"></div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
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

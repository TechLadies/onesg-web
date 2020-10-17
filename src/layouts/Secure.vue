<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="sidebar">
      <a href="#home"
        ><i class="fa fa-fw fa-home"></i>
        <div>Home</div></a
      >
      <a href="#cases"
        ><i class="fa fa-id-card-o"></i>
        <div>Cases</div></a
      >
      <a href="#requests"
        ><i class="fa fa-check"></i>
        <div>Requests</div></a
      >
      <a href="#new"
        ><i class="fa fa-plus-square"></i>
        <div>New Case</div></a
      >

      <a href="#accounts"
        ><i class="fa fa-user-circle-o"></i>
        <div>Accounts</div></a
      >
      <a href="#logOut"
        ><i class="fa fa-sign-out"></i>
        <div>Log Out</div></a
      >
    </div>

    <router-view></router-view>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  width: 10%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #08134b;
  overflow-x: scroll;
  padding-top: 16px;
}

.sidebar a {
  padding: 6px 8px 6px 16px;
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

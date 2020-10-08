<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <h1>Secure</h1>
    <div class="sidebar">
      <a href="#home"
        ><i class="fa fa-fw fa-home"></i><br />
        Home</a
      >
      <br />
      <a href="#cases"
        ><i class="fa fa-id-card-o"></i> <br />
        Cases</a
      >
      <a href="#requests"
        ><i class="fa fa-check"></i> <br />
        Requests</a
      >
      <a href="#new"><i class="fa fa-plus-square"></i> <br />New Case</a>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <a href="#accounts"
        ><i class="fa-user-circle-o"></i> <br />
        Accounts</a
      >
      <a href="#logOut"
        ><i class="fa fa-sign-out"></i> <br />
        Log Out</a
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
.sidebar {
  height: 100%;
  width: 95 px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #08134b;
  overflow-x: hidden;
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

.main {
  margin-left: 100px;
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}
</style>

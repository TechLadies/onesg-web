<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
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

    <div class="main">
      <div class="title">New Case</div>

      <!-- insert tracker -->
      <br />
      <br />
      <div class="instructions">
        <p>Select or create a new reference.</p>
        <p>Changes to an existing reference's details will be updated.</p>
      </div>
      <br />
      <div class="form">
        <div class="inputTitle">Reference Name</div>
        <input type="text" placeholder="Search or add a reference" />

        <br />
        <br />
        <div class="inputTitle">Reference Organisation</div>
        <input type="text" placeholder="Optional" />
        <br />
        <br />
        <div class="inputTitle">Reference Contact Number</div>
        <input type="text" placeholder="Optional" />
        <br />
        <br />
        <div class="inputTitle">Reference Email Address</div>
        <input type="text" placeholder="Optional" />
        <br />
        <br />
        <br />
        <br />
      </div>
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

@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}

.main {
  text-align: left;
  padding: 0px 150px 0px;
}

.title {
  font-size: 10;
  font-weight: 600;
}

p {
  text-align: center;
  font-weight: 400;
  color: black;
}

.form {
  margin-left: 300px;
  font-size: 12;
}

.inputTitle {
  text-align: left;
  font-weight: 400;
  color: black;
}
</style>

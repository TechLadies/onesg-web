<template>
  <div class="main">
    <div class="title">New Case</div>

    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2 block border">
        <div class="wrapper-progressBar">
          <ul class="progressBar">
            <li class="active">Beneficiary</li>
            <li class="active">Reference</li>
            <li>Case Details</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="instructions">
      <p>Select or create a new reference.</p>
      <p>Changes to an existing reference's details will be updated.</p>
    </div>

    <div class="center">
      <div class="form">
        <div class="inputField">
          <div class="inputTitle">Reference Name</div>
          <input
            class="input is-success"
            type="text"
            placeholder="Search or add a reference"
          />
        </div>

        <div class="inputField">
          <div class="inputTitle">Reference Organisation</div>
          <input class="input is-success" type="text" placeholder="Optional" />
        </div>

        <div class="inputField">
          <div class="inputTitle">Reference Contact Number</div>
          <input class="input is-success" type="text" placeholder="Optional" />
        </div>

        <div class="inputField">
          <div class="inputTitle">Reference Email Address</div>
          <input class="input is-success" type="text" placeholder="Optional" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'Case',
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

.wrapper-progressBar {
  width: 100%;
}

.progressBar {
  font-size: 16px;
  font-weight: 400px;
}

.progressBar li {
  list-style-type: none;
  float: left;
  width: 33%;
  position: relative;
  text-align: center;
}

.progressBar li:before {
  content: ' ';
  line-height: 30px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  display: block;
  text-align: center;
  margin: 0 auto 10px;
  background-color: white;
}

.progressBar li:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #ddd;
  top: 15px;
  left: -50%;
  z-index: -1;
}

.progressBar li:first-child:after {
  content: none;
}

.progressBar li.active {
  color: #08134b;
}

.progressBar li.active:before {
  border-color: #08134b;
  background-color: #08134b;
}

.progressBar .active:after {
  background-color: #08134b;
}

.instructions {
  padding-top: 100px;
}

p {
  text-align: center;
  font-weight: 400;
  color: black;
}

.center {
  width: 50%;
  margin: auto;
}

.form {
  text-align: left;
  font-size: 12;
  padding-top: 30px;
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
</style>

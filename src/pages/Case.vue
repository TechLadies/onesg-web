<template>
  <div>
    <div>
      <div>
        <span>{{ stage }} </span>
      </div>
      <button @click="stage++">Increment stage</button>
    </div>

    <div class="main">
      <div class="title">New Case</div>

      <div v-if="stage === 0">
        <div class="col-xs-12 col-md-8 offset-md-2 block border">
          <div class="wrapper-progressBar">
            <ul class="progressBar">
              <li class="active">Beneficiary</li>
              <li class="before">Reference</li>
              <li>Case Details</li>
            </ul>
          </div>
        </div>

        <div class="instructions">
          <p>Select or create a new beneficiary.</p>
          <p>Changes to an existing beneficiary's details will be updated.</p>
        </div>

        <div class="center">
          <div class="form">
            <div class="inputField">
              <div class="inputTitle">Name</div>
              <input
                class="input is-success"
                type="text"
                placeholder="Search or add a beneficiary"
              />
            </div>

            <div class="inputField">
              <div class="inputTitle">Contact Number</div>
              <input class="input is-success" type="text" />
            </div>

            <div class="inputField">
              <div class="inputTitle">Email Address</div>
              <input
                class="input is-success"
                type="text"
                placeholder="Optional"
              />
            </div>

            <div class="inputField">
              <div class="inputTitle">Occupation</div>
              <input
                class="input is-success"
                type="text"
                placeholder="Optional"
              />
            </div>

            <div class="inputField">
              <div class="field-body">
                <div class="field">Household income</div>
                <input class="input" type="text" placeholder="Optional" />
                <div class="field">Household size</div>
                <input
                  class="input is-success"
                  placeholder="Optional"
                  type="text"
                />
              </div>
            </div>

            <div class="inputField">
              <div class="inputTitle">Payment type</div>

              <label class="checkbox">
                <input type="checkbox" />
                Bank transfer
              </label>
              <div>
                <label class="checkbox">
                  <input type="checkbox" />
                  PayNow
                </label>
              </div>
              <div class="instructions"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="stage === 1">
        <div class="col-xs-12 col-md-8 offset-md-2 block border">
          <div class="wrapper-progressBar">
            <ul class="progressBar">
              <li class="active">Beneficiary</li>
              <li class="active">Reference</li>
              <li>Case Details</li>
            </ul>
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
              <input
                class="input is-success"
                type="text"
                placeholder="Optional"
              />
            </div>

            <div class="inputField">
              <div class="inputTitle">Reference Contact Number</div>
              <input
                class="input is-success"
                type="text"
                placeholder="Optional"
              />
            </div>

            <div class="inputField">
              <div class="inputTitle">Reference Email Address</div>
              <input
                class="input is-success"
                type="text"
                placeholder="Optional"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="stage === 2">
        <div class="col-xs-12 col-md-8 offset-md-2 block border">
          <div class="wrapper-progressBar">
            <ul class="progressBar">
              <li class="active">Beneficiary</li>
              <li class="active">Reference</li>
              <li class="active">Case Details</li>
            </ul>
          </div>
        </div>

        <div class="instructions">
          <p></p>
        </div>

        <div class="center-wide">
          <div class="form">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">CASE DETAILS</label>
              </div>

              <!-- child -->
              <div class="child-three">
                <div class="inputField">
                  <div class="field">Amount requested</div>

                  <input class="input" type="text" />
                </div>
              </div>

              <!-- child -->
              <div class="child-three">
                <div class="inputField">
                  <div class="field">ONE (Singapore) P.O.C.</div>

                  <input class="input" type="text" />
                </div>
              </div>
              <!-- child -->
              <div class="child-three">
                <div class="inputField">
                  <div class="field">Application date</div>

                  <input class="input" type="text" />
                </div>
              </div>
            </div>
            <hr />

            <div class="form">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">REQUEST 1</label>
                </div>

                <div class="child-three">
                  <div class="inputField">
                    <div class="field">Request Type</div>
                    <div class="select">
                      <select>
                        <option>Select one</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="child-three">
                  <div class="inputField">
                    <div class="field">Fulfilment</div>
                    <div class="select">
                      <select>
                        <option>Select one</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="child-three">
                  <div class="inputField">
                    <div class="field">Description</div>
                    <input class="input" type="text" placeholder="Optional" />
                  </div>
                </div>
              </div>

              <!-- #2 -->
              <div class="form">
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">REQUEST 2</label>
                  </div>

                  <div class="child-three">
                    <div class="inputField">
                      <div class="field">Request Type</div>
                      <div class="select">
                        <select>
                          <option>Select one</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="child-three">
                    <div class="inputField">
                      <div class="field">Fulfilment</div>
                      <div class="select">
                        <select>
                          <option>Select one</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="child-three">
                    <div class="inputField">
                      <div class="field">Description</div>

                      <input class="input" type="text" placeholder="Optional" />
                    </div>
                  </div>
                </div>

                <!-- #3 -->
                <div class="form">
                  <div class="field is-horizontal">
                    <div class="field-label is-normal">
                      <label class="label">REQUEST 3</label>
                    </div>

                    <div class="child-three">
                      <div class="inputField">
                        <div class="field">Request Type</div>
                        <div class="select">
                          <select>
                            <option>Select one</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                          </select>
                        </div>
                      </div>
                      <div class="add">
                        <a href=""
                          ><i class="fa fa-plus-square"></i> ADD REQUEST</a
                        >
                      </div>
                    </div>

                    <div class="child-three">
                      <div class="inputField">
                        <div class="field">Fulfilment</div>
                        <div class="select">
                          <select>
                            <option>Select one</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="child-three">
                      <div class="inputField">
                        <div class="field">Description</div>

                        <input
                          class="input"
                          type="text"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div class="form">
                    <div class="field is-horizontal">
                      <div class="field-label is-normal">
                        <label class="label">Document 1</label>
                      </div>

                      <!-- child -->
                      <div class="child-three">
                        <div class="inputField">
                          <div class="field">Title</div>

                          <input class="input" type="text" />
                        </div>
                        <div class="add">
                          <a href=""
                            ><i class="fa fa-plus-square"></i> ADD DOCUMENT</a
                          >
                        </div>
                      </div>

                      <!-- child -->
                      <div class="child-two">
                        <div class="inputField">
                          <div class="field">Dropbox Link</div>

                          <input class="input" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Case',
  setup() {
    const store = useStore()
    const login = (e) => {
      console.log(e)
      store.dispatch('doLogin', 'zzzz')
    }
    const stage = ref(0)
    return {
      login,
      stage,
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

.center-wide {
  margin: auto;
  width: 80%;
}

.form {
  text-align: left;
  font-size: 12;
  padding-top: 10px;
  padding-bottom: 30px;
}

.inputField {
  padding-top: 5px;
  padding-bottom: 5px;
}
.inputTitle {
  font-weight: 400;
  color: black;
}

.child-three {
  width: 33%;
  padding-left: 10px;
  padding-right: 10px;
}
.child-two {
  width: 66%;
  padding-left: 10px;
  padding-right: 10px;
}
.add {
  padding-top: 20px;
}
</style>

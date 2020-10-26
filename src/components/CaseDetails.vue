<template>
  <div>
    <div v-if="stage === 2">
      <div class="col-xs-12 col-md-8 offset-md-2 block border">
        <div class="wrapper-progress-bar">
          <ul class="progress-bar">
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
              <div class="input-field">
                <div class="field">Amount requested</div>

                <input class="input" type="text" />
              </div>
            </div>

            <!-- child -->
            <div class="child-three">
              <div class="input-field">
                <div class="field">ONE (Singapore) P.O.C.</div>

                <input class="input" type="text" />
              </div>
            </div>
            <!-- child -->
            <div class="child-three">
              <div class="input-field">
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
                <div class="input-field">
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
                <div class="input-field">
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
                <div class="input-field">
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
                  <div class="input-field">
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
                  <div class="input-field">
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
                  <div class="input-field">
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
                    <div class="input-field">
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
                    <div class="input-field">
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
                    <div class="input-field">
                      <div class="field">Description</div>

                      <input class="input" type="text" placeholder="Optional" />
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
                      <div class="input-field">
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
                      <div class="input-field">
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
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Case-details',
  setup() {
    const store = useStore()
    const login = (e) => {
      console.log(e)
      store.dispatch('doLogin', 'zzzz')
    }
    const stage = ref(2)
    return {
      login,
      stage,
    }
  },
}
</script>

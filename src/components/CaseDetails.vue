<template>
  <div>
    <div class="col-xs-12 col-md-8 offset-md-2 block border">
      <div class="wrapper-progress-bar">
        <ul class="progress-bar">
          <li class="active">Beneficiary</li>
          <li class="active">Referee</li>
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

              <input
                class="input"
                type="text"
                v-model="caseDetail.amountRequested"
              />
            </div>
          </div>

          <!-- child -->
          <div class="child-three">
            <div class="input-field">
              <div class="field">ONE (Singapore) P.O.C.</div>

              <input
                class="input"
                type="text"
                v-model="caseDetail.pointOfContact"
              />
            </div>
          </div>
          <!-- child -->
          <div class="child-three">
            <div class="input-field">
              <div class="field">Application date</div>

              <input class="input" type="text" v-model="caseDetail.appliedOn" />
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
                    <option>Baby Products</option>
                    <option>Cooked Food</option>
                    <option>Financial Assitance</option>
                    <option>Medical Bills</option>
                    <option>School Fees</option>
                    <option>Transportation Fees</option>
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
                    <option>In-Kind Donation</option>
                    <option>Cash Transfer</option>
                    <option>Third-Party Payment</option>
                    <option>Partner Referral</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="child-three">
              <div class="input-field">
                <div class="field">Description</div>
                <input
                  class="input"
                  type="text"
                  placeholder="Optional"
                  v-model="caseDetail.description1"
                />
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
                      <option>Baby Products</option>
                      <option>Cooked Food</option>
                      <option>Financial Assitance</option>
                      <option>Medical Bills</option>
                      <option>School Fees</option>
                      <option>Transportation Fees</option>
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
                      <option>In-Kind Donation</option>
                      <option>Cash Transfer</option>
                      <option>Third-Party Payment</option>
                      <option>Partner Referral</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="child-three">
                <div class="input-field">
                  <div class="field">Description</div>

                  <input
                    class="input"
                    type="text"
                    placeholder="Optional"
                    v-model="caseDetail.description2"
                  />
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
                        <option>Baby Products</option>
                        <option>Cooked Food</option>
                        <option>Financial Assitance</option>
                        <option>Medical Bills</option>
                        <option>School Fees</option>
                        <option>Transportation Fees</option>
                      </select>
                    </div>
                  </div>
                  <div class="add"></div>
                  <button @click="showModal = true" class="blueButton">
                    <i class="fa fa-plus-square"></i>
                    <div class="words">ADD REQUEST</div>
                  </button>
                  <div v-if="showModal" class="modal is-active">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                      <header class="modal-card-head">
                        <p class="modal-card-title">Add Request</p>
                        <button
                          @click="showModal = false"
                          class="delete"
                          aria-label="close"
                        ></button>
                      </header>
                      <section class="modal-card-body">
                        <!-- Content ... -->
                        <ul>
                          Request Type
                        </ul>
                        <div class="select selectModal">
                          <select>
                            <option>Add Request Type</option>
                            <option>Baby Products</option>
                            <option>Cooked Food</option>
                            <option>Financial Assitance</option>
                            <option>Medical Bills</option>
                            <option>School Fees</option>
                            <option>Transportation Fees</option>
                          </select>
                        </div>
                        <ul>
                          Fulfilment
                        </ul>
                        <div class="select selectModal">
                          <select>
                            <option>Select one</option>
                            <option>In-Kind Donation</option>
                            <option>Cash Transfer</option>
                            <option>Third-Party Payment</option>
                            <option>Partner Referral</option>
                          </select>
                        </div>
                        <ul>
                          Description
                        </ul>
                        <input
                          class="select selectModal"
                          type="text"
                          placeholder="Optional"
                          v-model="caseDetail.description2"
                        />
                      </section>
                      <footer class="modal-card-foot">
                        <button class="button is-success">Save changes</button>
                        <button class="button">Cancel</button>
                      </footer>
                    </div>
                  </div>
                </div>

                <div class="child-three">
                  <div class="input-field">
                    <div class="field">Fulfilment</div>
                    <div class="select">
                      <select>
                        <option>Select one</option>
                        <option>In-Kind Donation</option>
                        <option>Cash Transfer</option>
                        <option>Third-Party Payment</option>
                        <option>Partner Referral</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="child-three">
                  <div class="input-field">
                    <div class="field">Description</div>

                    <input
                      class="input"
                      type="text"
                      placeholder="Optional"
                      v-model="caseDetail.description3"
                    />
                  </div>
                </div>
              </div>

              <!-- 
              <div class="form">
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Document 1</label>
                  </div>

                 
                  <div class="child-three">
                    <div class="input-field">
                      <div class="field">Title</div>

                      
                      <input
                        class="input"
                        type="text"
                        v-model="caseDetail.title" 
                      />
                      
                <div class="add">
                  <a href=""><i class="fa fa-plus-square"></i> ADD DOCUMENT</a>
                </div>
              </div>

                  <div class="child-two">
                    <div class="input-field">
                      <div class="field">Dropbox Link</div>
                      
                      <input
                        class="input"
                        type="text"
                        v-model="caseDetail.dropbox"
                      />
                      -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'Case Details',
  setup(context, props) {
    const showModal = ref(false)

    console.log('props', props, props.attrs.caseDetail)

    const caseDetailSearch = ref()
    const caseDetail = reactive(props.attrs.caseDetail)
    const caseDetails = ref([])
    const debounce = (callback, delay) => {
      let timeout = null
      return (...args) => {
        const next = () => callback(...args)
        clearTimeout(timeout)
        timeout = setTimeout(next, delay)
      }
    }

    const autoComplete = debounce(async (e, col, _showForm) => {
      console.log('search', e.detail, col, _showForm)
      console.log(e.detail)
      const res = await fetch(
        'https://swapi.dev/api/people/?search=' + e.detail
      )
      const data = await res.json()
      caseDetails.value = data.results.map((item) => {
        return item.name
      })
      console.log(data)
    }, 500)

    return {
      autoComplete,
      caseDetailSearch,
      caseDetail,
      caseDetails,
      showModal,
    }
  },
}
</script>

<style scoped>
.selectModal {
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>

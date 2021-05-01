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
          <div class="child-three">
            <div class="input-field">
              <div class="field">Application date</div>

              <input class="input" type="text" v-model="caseDetail.appliedOn" />
            </div>
          </div>
        </div>
        <hr />

        <div
          class="form"
          v-for="(request, index) in caseDetail.requests"
          :key="index"
        >
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">REQUEST {{ index + 1 }}</label>
            </div>

            <div class="child-three">
              <div class="input-field">
                <div class="field">Request Type</div>
                <div class="select">
                  <select v-model="request.requestTypeId">
                    <option :value="0">Select one</option>
                    <option :value="-1">Add Request Type</option>
                    <option
                      v-for="result in requestTypesList"
                      :value="result.id"
                      :key="result.id"
                    >
                      {{ result.type }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div v-if="addRequestType" class="modal is-active">
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">Add Request Type</p>
                  <button
                    class="delete"
                    @click="addRequestType = false"
                    aria-label="close"
                  ></button>
                </header>
                <section class="modal-card-body">
                  <ul>
                    Add Request Type
                  </ul>
                  <input
                    v-model="newRequestType"
                    class="input select selectModal"
                    type="text"
                    placeholder="Enter Request Type"
                  />
                </section>
                <footer class="modal-card-foot">
                  <button @click="saveRequestType" class="button is-success">
                    Save changes
                  </button>
                  <button class="button" @click="addRequestType = false">
                    Cancel
                  </button>
                </footer>
              </div>
            </div>

            <div class="child-three">
              <div class="input-field">
                <div class="field">Fulfilment</div>
                <div class="select">
                  <select v-model="request.fulfilmentType">
                    <option value="">Select one</option>
                    <option value="IN_KIND_DONATION">In-Kind Donation</option>
                    <option value="CASH_TRANSFER">Cash Transfer</option>
                    <option value="THIRD_PARTY_PAYMENT">
                      Third-Party Payment
                    </option>
                    <option value="PARTNER_REFERRAL">Partner Referral</option>
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
                  v-model="request.description"
                />
              </div>
            </div>
            <button @click="(e) => deleteRequest(index)" class="blueButton">
              <i class="fa fa-plus-square"></i>
              <div class="words">Delete</div>
            </button>
          </div>
        </div>

        <div class="add"></div>
        <button @click="addRequest" class="blueButton">
          <i class="fa fa-plus-square"></i>
          <div class="words">ADD REQUEST</div>
        </button>
        <hr />
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label label-tags">CASE TAGS</label>
            <div class="  ">
              <Multiselect v-model="ac.value" v-bind="ac" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, watchEffect } from 'vue'
import { VITE_API_URL } from '/config.js'
import axios from 'axios'
import Multiselect from '@vueform/multiselect'

export default {
  name: 'Case Details',
  components: {
    Multiselect,
  },
  setup(context, props) {
    console.log('props', props)

    const addRequestType = ref(false)
    const newRequestType = ref()
    const loading = ref(false)

    // vue3, create array, ajax call/fetch, reactive
    const requestTypesList = ref([])
    const initialRequests = [
      {
        requestTypeId: 0,
        fulfilmentType: '',
        description: '',
      },
      {
        requestTypeId: 0,
        fulfilmentType: '',
        description: '',
      },
      {
        requestTypeId: 0,
        fulfilmentType: '',
        description: '',
      },
    ]
    const ac = reactive({
      mode: 'tags',
      value: null,
      options: [],
      searchable: true,
      createTag: true,
    })

    const fetchTags = async () => {
      const res = await axios.get(`${VITE_API_URL}/v1/tags`)
      const transformedTags = res.data.results.map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      })
      ac.options = transformedTags
    }

    async function fetchRequestTypes() {
      if (loading.value === true) return
      loading.value = true

      try {
        const res = await fetch(`${VITE_API_URL}/v1/request-types`, {
          method: 'get',
        })
        const json = await res.json()
        console.log('fetchRequestTypes - ok', json)
        requestTypesList.value = json.results
      } catch (err) {
        console.log('fetchRequestTypes', err)
      }
      loading.value = false
    }

    const caseDetailSearch = ref()

    const caseDetail = reactive(props.attrs.caseDetail)

    watchEffect(() => console.log('watch requests', caseDetail.requests))

    watch(
      () => caseDetail,
      (caseDetail, prevCaseDetail) => {
        console.log('test ', caseDetail.requests, prevCaseDetail.requests)

        for (let i = 0; i < caseDetail.requests.length; i++) {
          console.log(
            'Request Type Id',
            typeof caseDetail.requests[i].requestTypeId,
            caseDetail.requests[i].requestTypeId
          )

          if (caseDetail.requests[i].requestTypeId === -1) {
            addRequestType.value = true

            console.log('value', addRequestType)

            caseDetail.requests[i].requestTypeId = 0
          }
        }
      },
      { deep: true }
    )

    onMounted(() => {
      fetchTags()
      fetchRequestTypes()
      if (caseDetail.requests.length === 0) {
        caseDetail.requests = [...initialRequests]
      }
    })
    const addRequest = () =>
      caseDetail.requests.push({
        requestTypeId: 0,
        fulfilmentType: '',
        description: '',
      })

    const deleteRequest = (index) => {
      console.log(index)
      caseDetail.requests.splice(index, 1)
    }

    const saveRequestType = async () => {
      console.log('v-model request', newRequestType.value)

      if (loading.value === true) return
      loading.value = true

      try {
        const res = await fetch(`${VITE_API_URL}/v1/request-types`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: newRequestType.value,
          }),
        })
        const json = await res.json()
        console.log('fetchRequestTypes - ok', json.requestType)

        requestTypesList.value.push({
          type: json.requestType.type,
          id: +json.requestType.id,
        })
      } catch (err) {
        console.log('fetchRequestTypes', err)
      }
      loading.value = false
      addRequestType.value = false
    }

    return {
      caseDetailSearch,
      caseDetail,
      addRequestType,
      requestTypesList,
      addRequest,
      deleteRequest,
      saveRequestType,
      newRequestType,
      ac,
    }
  },
  async data() {
    const res = await axios.get(`${VITE_API_URL}/v1/tags`)
    const transformedTags = res.data.results.map((item) => {
      return {
        value: item.id,
        label: item.name,
      }
    })
    return {
      mode: 'tags',
      value: null,
      options: transformedTags,
      searchable: true,
      createTag: true,
    }
  },
}
</script>

<style scoped>
.selectModal {
  margin-top: 5px;
  margin-bottom: 10px;
}
.input {
  padding: 5px 8px;
}
.label-tags {
  float: left;
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>

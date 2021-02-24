<template>
  <div>
    <div v-if="showModal == true" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <span class="modal-card-title">Add Request</span>
          <button
            v-on:click="$emit('close-modal', false)"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <!---------- Form input  --------->
          <div id="v-model-select-dynamic">
            <p class="modal-requesttype">Request Types</p>
            <select v-model="requestTypeId" id="result" class="req-select">
              <option id="0">Select one</option>
              <option
                v-for="result in requestTypesList"
                :value="result.id"
                :key="result.id"
                :selected="selectedType"
              >
                {{ result.type }}
              </option>
              <option>Add Request Type</option>
            </select>
            <div v-if="requestTypeId == 'Add Request Type'">
              <input
                v-model="requestInput"
                placeholder="Type here"
                class="request-field"
              />
            </div>

            <p class="modal-fulfilment">Fulfilment</p>
            <select v-model="selected" class="fulfilment-select">
              <option id="0">Select one</option>
              <option v-for="option in options" :key="option.key">
                {{ option.text }}
              </option>
            </select>
          </div>
          <div>
            <p class="modal-description">Description</p>
            <input
              v-model="message"
              placeholder=" Optional"
              class="description-field"
            />
          </div>
          <!---------- Form input  --------->
        </section>
        <footer class="modal-card-foot">
          <button @click="saveRequest()" class="saveReqBtn">
            Add new request
          </button>
        </footer>
      </div>
    </div>
    <div v-else></div>
  </div>

  <!-----Pop UpModal --- -->
</template>

<script>
import { ref, onMounted, reactive, watch } from 'vue'
import { VITE_API_URL } from '/config.js'
import Swal from 'sweetalert2'

export default {
  name: '#add-requests',

  props: {
    item: { type: Object, required: true },
  },

  setup(props, { emit }) {
    const options = reactive([
      { key: 'IN_KIND_DONATION', text: 'In-Kind Donation' },
      { key: 'CASH_TRANSFER', text: 'Cash Transfer' },
      { key: 'THIRD_PARTY_PAYMENT', text: 'Third-Party Payment' },
      { key: 'PARTNER_REFERRAL', text: 'Partner Referral' },
    ])
    const message = ref('')
    const showModal = ref(true)
    const loading = ref(true)
    const requestTypesList = ref([])
    const requestTypeId = ref('')
    const requestField = reactive({
      type: '',
    })
    const requestInput = requestField.type
    const selected = ref('')
    const selectedType = ref('')
    const json = reactive({})

    watch(requestField, (requestField) => {
      console.log(`requestField`, requestField)
    })
    // Fetch Request type -- start //
    async function fetchRequestTypes() {
      loading.value = true
      try {
        const res = await fetch(`${VITE_API_URL}/v1/request-types`, {
          method: 'get',
        })
        const json = await res.json()
        requestTypesList.value = json.results
        return requestTypesList.value
      } catch (err) {
        console.log('fetchRequestTypes', err)
      }
      loading.value = false
    }
    // Fetch Request type -- end //

    // Save Request and Request type -- start //

    async function saveRequest() {
      loading.value = true

      //Fetch fulfilmentType --start//
      const fulfilmentKey = options.find(({ text }) => text === selected.value)
      //Fetch fulfilmentType --end//

      try {
        //for request type to be added
        // if custom request type
        if (requestTypeId.value === 'Add Request Type') {
          if (this.requestInput == '') {
            alert(`New request type field cannot be empty`)
          }
          const restype = await fetch(`${VITE_API_URL}/v1/request-types`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: this.requestInput }),
          })
          const jsonreq = await restype.json()
          this.jsonreq = jsonreq

          //save request and custom request type
          const res = await fetch(`${VITE_API_URL}/v1/requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              requestTypeId: this.jsonreq.requestType.id
                ? this.jsonreq.requestType.id
                : requestTypeId.value,
              caseId: props.item[0].caseId,
              fulfilmentType: fulfilmentKey ? fulfilmentKey.key : undefined,
              description: message.value,
            }),
          })
          const json = await res.json()
          this.json = json
          console.log(
            'addRequestype - jsonreq',
            jsonreq.requestType,
            'addRequest - json',
            json
          )
          if (res.status === 201) {
            emit('close-modal', false)
            emit('re-fresh', this.json)
            Swal.fire({
              title: 'Error!',
              text: 'New Request Added. ',
              icon: 'error',
              confirmButtonText: 'Cool',
            })
          }
          if (res.status === 422) {
            Swal.fire({
              title: 'Error!',
              text: 'Fulfilment type and/or Request type must be selected',
              icon: 'error',
              confirmButtonText: 'Cool',
            })
          }
        } else {
          // if request type comes from the array
          //save request and request type
          const res = await fetch(`${VITE_API_URL}/v1/requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              requestTypeId: requestTypeId.value,
              caseId: props.item[0].caseId,
              fulfilmentType: fulfilmentKey ? fulfilmentKey.key : undefined,
              description: message.value,
            }),
          })
          const json = await res.json()
          this.json = json
          if (res.status === 201) {
            emit('close-modal', false)
            emit('re-fresh', this.json)
            Swal.fire({
              title: 'Error!',
              text: 'New Request Added. ',
              icon: 'error',
              confirmButtonText: 'Cool',
            })
          }
          if (res.status === 422) {
            Swal.fire({
              title: 'Error!',
              text: 'Fulfilment type and/or Request type must be selected',
              icon: 'error',
              confirmButtonText: 'Cool',
            })
          }
        }
      } catch (err) {
        console.log('addRequestTypes - err.message', err)
      }
      loading.value = false
    }
    // Save Request and Request type -- end//

    onMounted(() => {
      fetchRequestTypes()
    })

    return {
      showModal,
      requestTypesList,
      fetchRequestTypes,
      saveRequest,
      requestInput,
      selected,
      options,
      message,
      selectedType,
      requestTypeId,
      json,
    }
  },
}
</script>

<style scoped>
.saveReqBtn {
  height: 40px;
  width: 435px;
  left: 40px;
  top: 348px;
  border-radius: 4px;
  background-color: #1e1ecc;
  color: white;
  border-radius: 4px;
}
.request-field {
  height: 40px;
  width: 200px;
  left: 53%;
  top: 25%;
  border-radius: 4px;
  position: absolute;
  bottom: 0%; /* White */
  background: #ffffff; /* Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(10, 10, 10, 0.05);
  border-radius: 4px;
}
.description-field {
  position: absolute;
  left: 6%;
  right: 0%;
  top: 65%;
  bottom: 0%; /* White */
  height: 40px;
  width: 416px;
  border-radius: 4px;
  background: #ffffff; /* Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(10, 10, 10, 0.05);
}

.fulfilment-select {
  height: 40px;
  width: 196px;
  left: 6%;
  top: 45%;
  border-radius: 4px;
  position: absolute;
  background: #ffffff; /* Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(10, 10, 10, 0.05);
  border-radius: 4px;
}

.req-select {
  height: 40px;
  width: 196px;
  left: 6%;
  top: 25%;
  border-radius: 4px;
  position: absolute;
  background: #ffffff; /* Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(10, 10, 10, 0.05);
  border-radius: 4px;
}

i {
  margin-right: 10px;
}

.modal-requesttype {
  position: absolute;
  width: 150px;
  height: 20px;
  left: 0px;
  top: 20%; /* Roboto
14px Regular */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px; /* identical to box height, or 143% */ /*
Black */
  color: #12121a;
}

.modal-description {
  position: absolute;
  width: 62px;
  height: 20px;
  left: 7%;
  top: 60%; /* Roboto 14px Regular */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px; /* identical to box
height, or 143% */
  color: #12121a;
}

.modal-fulfilment {
  position: absolute;
  width: 62px;
  height: 20px;
  left: 7%;
  top: 40%;
  /* Roboto 14px Regular */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px; /* identical to box height, or 143% */
  color: #12121a;
}

.modal-card {
  height: 420px;
  width: 480px;
  left: 480px;
  top: 25%;
  border-radius: 16px;
  position: absolute;
}
</style>

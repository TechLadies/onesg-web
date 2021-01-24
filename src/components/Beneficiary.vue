<template>
  <div>
    <div class="col-xs-12 col-md-8 offset-md-2 block border">
      <div class="wrapper-progress-bar">
        <ul class="progress-bar">
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
        <div class="input-field">
          <div class="input-title">Name</div>
          <bwc-autocomplete
            required
            :items="beneficiaries"
            v-model="beneficiarySearch"
            @search="(e) => autoComplete(e)"
            @selected="selected"
            placeholder="Search or add a beneficiary."
          >
          </bwc-autocomplete>
        </div>

        <div class="input-field">
          <div class="input-title">Contact Number</div>
          <input
            class="input is-success"
            type="text"
            v-model="beneficiary.contact"
          />
        </div>

        <div class="input-field">
          <div class="input-title">Email Address</div>
          <input
            class="input is-success"
            type="text"
            placeholder="Optional"
            v-model="beneficiary.email"
          />
        </div>

        <div class="input-field">
          <div class="input-title">Occupation</div>
          <input
            class="input is-success"
            type="text"
            placeholder="Optional"
            v-model="beneficiary.occupation"
          />
        </div>

        <div class="input-field">
          <div class="field-body">
            <div class="field">
              Household income
              <input
                class="input"
                type="text"
                placeholder="Optional"
                v-model="beneficiary.householdIncome"
              />
            </div>
            <div class="field">
              Household size
              <input
                class="input is-success"
                placeholder="Optional"
                type="text"
                v-model="beneficiary.householdSize"
              />
            </div>
          </div>
        </div>

        <div class="input-field">
          <div class="input-title">Payment type</div>

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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VITE_API_URL } from '/config.js'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Beneficary',
  setup(context, props) {
    console.log('props', props, props.attrs.beneficiary)
    const beneficiarySearch = ref()
    const beneficiary = reactive(props.attrs.beneficiary)
    const beneficiaries = ref([])
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
      console.log(`e,detail`, e.detail)
      const res = await fetch(
        `${VITE_API_URL}/v1/search?type=beneficiary&fields=name,phone,email,occupation,householdIncome,householdSize,beneficiaryNumber&q=` +
          e.detail
      )

      const data = await res.json()
      beneficiaries.value = data.results.map((item) => {
        return {
          text: item.name,
          key: item.beneficiaryNumber,
          ...item,
        }
      })
      console.log(`data`, data)
    }, 500)
    const selected = async (e) => {
      console.log('here', e.detail)
      beneficiary.contact = e.detail.phone
      beneficiary.email = e.detail.email
      beneficiary.occupation = e.detail.occupation
      beneficiary.householdSize = e.detail.householdSize
      beneficiary.householdIncome = e.detail.householdIncome
      // const found = data.results.find(item => item.beneficiaryName === e.detail.key)
    }

    const store = useStore()
    const login = (e) => {
      console.log(e)
      store.dispatch('doLogin', 'zzzz')
    }
    return {
      autoComplete,
      login,
      beneficiarySearch,
      beneficiary,
      beneficiaries,
      selected,
    }
  },
}
</script>

<style>
.wrapper-progress-bar {
  width: 100%;
}
.progress-bar {
  font-size: 16px;
  font-weight: 400px;
}
.progress-bar li {
  list-style-type: none;
  float: left;
  width: 33%;
  position: relative;
  text-align: center;
}
.progress-bar li:before {
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
.progress-bar li:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #ddd;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.progress-bar li:first-child:after {
  content: none;
}
.progress-bar li.active {
  color: #08134b;
}
.progress-bar li.active:before {
  border-color: #08134b;
  background-color: #08134b;
}
.progress-bar .active:after {
  background-color: #08134b;
}
.instructions {
  padding-top: 100px;
}
p {
  font-size: 14px;
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
.input-field {
  padding-top: 5px;
  padding-bottom: 5px;
}
.input-title {
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
.field {
  padding-right: 10px;
}
</style>

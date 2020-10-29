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
            v-model="beneficiary"
            @search="(e) => autoComplete(e)"
            placeholder="Search or add a beneficiary."
          >
          </bwc-autocomplete>
        </div>

        <div class="input-field">
          <div class="input-title">Contact Number</div>
          <input class="input is-success" type="text" />
        </div>

        <div class="input-field">
          <div class="input-title">Email Address</div>
          <input class="input is-success" type="text" placeholder="Optional" />
        </div>

        <div class="input-field">
          <div class="input-title">Occupation</div>
          <input class="input is-success" type="text" placeholder="Optional" />
        </div>

        <div class="input-field">
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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  name: 'Beneficiary',
  setup() {
    const beneficiary = ref()
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
      console.log(e.detail)
      const res = await fetch(
        'https://swapi.dev/api/people/?search=' + e.detail
      )
      const data = await res.json()
      beneficiaries.value = data.results.map((item) => {
        return item.name
      })
      console.log(data)
    }, 500)

    const store = useStore()
    const login = (e) => {
      console.log(e)
      store.dispatch('doLogin', 'zzzz')
    }
    const stage = ref(0)

    onMounted(async () => {
      //   const res = await fetch('https://randomuser.me/api/?results=100')
      //  const data = await res.json()
      //  console.log(data)
    })
    return {
      autoComplete,
      login,
      beneficiary,
      beneficiaries,
      stage,
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
</style>

<template>
  <div>
    <div class="col-xs-12 col-md-8 offset-md-2 block border">
      <div class="wrapper-progress-bar">
        <ul class="progress-bar">
          <li class="active">Beneficiary</li>
          <li class="active">Referee</li>
          <li>Case Details</li>
        </ul>
      </div>
    </div>

    <div class="instructions">
      <p>Select or create a new referee.</p>
      <p>Changes to an existing referee's details will be updated.</p>
    </div>

    <div class="center">
      <div class="form">
        <div class="input-field">
          <div class="input-title">Referee Name</div>
          <bwc-autocomplete
            required
            :items="referees"
            v-model="referee.name"
            @search="(e) => autoComplete(e)"
            @selected="selected"
            placeholder="Search or add a referee."
          >
          </bwc-autocomplete>
        </div>

        <div class="input-field">
          <div class="input-title">Referee Organisation</div>
          <input
            class="input is-success"
            type="text"
            placeholder="Optional"
            v-model="referee.organisation"
          />
        </div>

        <div class="input-field">
          <div class="input-title">Referee Contact Number</div>
          <input
            class="input is-success"
            type="text"
            placeholder="Optional"
            v-model="referee.phone"
          />
        </div>

        <div class="input-field">
          <div class="input-title">Referee Email Address</div>
          <input
            class="input is-success"
            type="text"
            placeholder="Optional"
            v-model="referee.email"
          />
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
  name: 'Referee',
  setup(context, props) {
    console.log('props', props, props.attrs.referee)
    const refereeSearch = ref()
    const referee = reactive(props.attrs.referee)
    const referees = ref([])
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
        `${VITE_API_URL}/v1/search?type=referee&fields=name,phone,email,organisation,refereeNumber,id&q=` +
          e.detail
      )
      const data = await res.json()
      referees.value = data.results.map((item) => {
        return {
          text: item.name,
          key: item.refereeNumber,
          ...item,
        }
      })
      console.log(`data`, data)
    }, 500)
    const selected = async (e) => {
      console.log('here', e.detail)
      referee.name = e.detail.name
      referee.phone = e.detail.phone
      referee.email = e.detail.email
      referee.organisation = e.detail.organisation
      referee.id = e.detail.id
      // const found = data.results.find(item => item.beneficiaryName === e.detail.key)
    }

    return {
      autoComplete,
      refereeSearch,
      referee,
      referees,
      selected,
    }
  },
}
</script>

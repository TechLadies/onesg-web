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
      <p>Select or create a new reference.</p>
      <p>Changes to an existing reference's details will be updated.</p>
    </div>

    <div class="center">
      <div class="form">
        <div class="input-field">
          <div class="input-title">Reference Name</div>
          <bwc-autocomplete
            required
            :items="references"
            v-model="referenceSearch"
            @search="(e) => autoComplete(e)"
            @selected="selected"
            placeholder="Search or add a reference."
          >
          </bwc-autocomplete>
        </div>

        <div class="input-field">
          <div class="input-title">Reference Organisation</div>
          <input
            class="input is-success"
            type="text"
            placeholder="Optional"
            v-model="reference.organisation"
          />
        </div>

        <div class="input-field">
          <div class="input-title">Reference Contact Number</div>
          <input
            class="input is-success"
            type="text"
            placeholder="Optional"
            v-model="reference.phone"
          />
        </div>

        <div class="input-field">
          <div class="input-title">Reference Email Address</div>
          <input
            class="input is-success"
            type="text"
            placeholder="Optional"
            v-model="reference.email"
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
  name: 'Reference',
  setup(context, props) {
    console.log('props', props, props.attrs.reference)
    const referenceSearch = ref()
    const reference = reactive(props.attrs.reference)
    const references = ref([])
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
        `${VITE_API_URL}/v1/search?type=referee&fields=name,phone,email,organisation,refereeNumber&q=` +
          e.detail
      )
      const data = await res.json()
      references.value = data.results.map((item) => {
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
      reference.phone = e.detail.phone
      reference.email = e.detail.email
      reference.organisation = e.detail.organisation
      // const found = data.results.find(item => item.beneficiaryName === e.detail.key)
    }

    return {
      autoComplete,
      referenceSearch,
      reference,
      references,
      selected,
    }
  },
}
</script>

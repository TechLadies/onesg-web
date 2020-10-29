<template>
  <div>
    <div class="col-xs-12 col-md-8 offset-md-2 block border">
      <div class="wrapper-progress-bar">
        <ul class="progress-bar">
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
        <div class="input-field">
          <div class="input-title">Reference Name</div>
          <bwc-autocomplete
            required
            :items="references"
            v-model="reference"
            @search="(e) => autoComplete(e)"
            placeholder="Search or add a reference."
          >
          </bwc-autocomplete>
        </div>

        <div class="input-field">
          <div class="input-title">Reference Organisation</div>
          <input class="input is-success" type="text" placeholder="Optional" />
        </div>

        <div class="input-field">
          <div class="input-title">Reference Contact Number</div>
          <input class="input is-success" type="text" placeholder="Optional" />
        </div>

        <div class="input-field">
          <div class="input-title">Reference Email Address</div>
          <input class="input is-success" type="text" placeholder="Optional" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Reference',
  setup() {
    const reference = ref()
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
        'https://swapi.dev/api/people/?search=' + e.detail
      )
      const data = await res.json()
      references.value = data.results.map((item) => {
        return item.name
      })
      console.log(data)
    }, 500)

    const store = useStore()
    const login = (e) => {
      console.log(e)
      store.dispatch('doLogin', 'zzzz')
    }
    return {
      autoComplete,
      login,
      reference,
      references,
    }
  },
}
</script>

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
    const reference = ref(0)
    const references = ref([])
    const autoComplete = (e) => {
      const result = []
      // async, await, link to random user API
      // read first name, and collect all the info and pass into beneficiaries
      // delete previous random user data?
      for (let i = 0; i < e.detail.length + 10; i++) result.push('aa' + i)
      references.value = result.join(',')
    }
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

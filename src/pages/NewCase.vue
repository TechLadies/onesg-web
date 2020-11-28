<template>
  <div>
    <div class="title">New Case</div>
    <div class="main">
      <div v-if="stage === 0">
        <Beneficiary :beneficiary="beneficiary" />
      </div>
      <div v-if="stage === 1">
        <Reference :reference="reference" />
      </div>
      <div v-if="stage === 2">
        <CaseDetails :caseDetail="caseDetail" />
      </div>

      <div class="arrow">
        <button v-if="stage === 0" class="button" disabled>
          <span class="icon is-small">
            <i class="fa fa-arrow-left"></i>
          </span>
        </button>
        <button v-else @click="stage--" class="button is-dark is-outlined">
          <span class="icon is-small">
            <i class="fa fa-arrow-left"></i>
          </span>
        </button>

        <button class="clear"></button>

        <button v-if="stage === 2" class="button" disabled>
          <span class="icon is-small">
            <i class="fa fa-arrow-right"></i>
          </span>
        </button>
        <button class="clear"></button>

        <button
          v-if="stage === 2"
          @click="createNew"
          class="button is-dark is-outlined"
        >
          Create New
        </button>

        <button v-else @click="stage++" class="button is-dark is-outlined">
          <span class="icon is-small">
            <i class="fa fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import Beneficiary from '../components/Beneficiary.vue'
import Reference from '../components/Reference.vue'
import CaseDetails from '../components/CaseDetails.vue'

export default {
  name: 'Secure',
  components: {
    Beneficiary,
    Reference,
    CaseDetails,
  },
  setup() {
    const stage = ref(0)
    const store = useStore()
    const beneficiary = reactive({
      // all these properties should match with DB, check with backend team
      id: '', // this is populated by aytocomplete, if null then it should be new reference
      name: '',
      phone: '',
      email: '',
      occupation: '',
      householdIncome: '',
      householeSize: '',
    })
    const reference = reactive({
      // all these properties should match with DB, check with backend team
      id: '', // this is populated by aytocomplete, if null then it should be new reference
      name: '',
      organisation: '', // autocomplete strict... must have a match
      phone: '',
      email: '',
    })
    const caseDetail = reactive({
      // all these properties should match with DB, check with backend team
      amountRequested: '',
      poc: '',
      applicationDate: '',
      description1: '',
      description2: '',
      description3: '',
      title: '',
      dropbox: '',
    })
    const logout = (e) => {
      console.log(e)
      store.dispatch('doLogin', null)
    }
    const createNew = async () => {
      alert(JSON.stringify(caseDetail))
      console.log('createNew')
    }
    onMounted(async () => {
      const res = await fetch('https://randomuser.me/api/')
      const data = await res.json()
      console.log(data)
      console.log('Secure is mounted!')
    })
    return {
      logout,
      stage,
      createNew,
      beneficiary,
      reference,
      caseDetail,
    }
  },
}
</script>

<style scoped>
.main {
  margin-left: 10%;
  margin-right: 20%;
  text-align: left;
  padding: 0px 0px 0px 20px;
}

.title {
  text-align: left;
  margin-left: 10%;
  margin-right: 10%;
  padding-bottom: 20px;
  position: relative;
  font-size: 24px;
  font-weight: 600;
}

.arrow {
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 30px;
  padding-bottom: 50px;
}

.clear {
  visibility: hidden;
}
</style>

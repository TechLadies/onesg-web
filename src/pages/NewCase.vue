<template>
  <div>
    <div class="title">New Case</div>
    <div class="main">
      <div v-if="stage === 0">
        <Beneficiary :beneficiary="beneficiary" />
      </div>
      <div v-if="stage === 1"><Referee :referee="referee" /></div>
      <div v-if="stage === 2">
        <CaseDetail :caseDetail="caseDetail" />
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
        <button
          v-else-if="stage === 1"
          @click="upsertReferee"
          class="button is-dark is-outlined"
        >
          <span class="icon is-small">
            <i class="fa fa-arrow-right"></i>
          </span>
        </button>
        <button
          v-else
          @click="upsertBeneficiary"
          class="button is-dark is-outlined"
        >
          <span class="icon is-small">
            <i class="fa fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { VITE_API_URL } from '/config.js'
import { ref, reactive } from 'vue'
import http from '../components/http.js'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import Beneficiary from '../components/Beneficiary.vue'
import Referee from '../components/Referee.vue'
import CaseDetail from '../components/CaseDetail.vue'

export default {
  name: 'Secure',
  components: {
    Beneficiary,
    Referee,
    CaseDetail,
  },
  setup() {
    const stage = ref(0)
    const store = useStore()
    let beneficiary = reactive({
      // all these properties should match with DB, check with backend team
      id: '', // this is populated by aytocomplete, if null then it should be new referee
      name: '',
      phone: '',
      email: '',
      occupation: '',
      householdIncome: '',
      householdSize: '',
    })
    const referee = reactive({
      // all these properties should match with DB, check with backend team
      id: '', // this is populated by aytocomplete, if null then it should be new referee
      name: '',
      organisation: '', // autocomplete strict... must have a match
      phone: '',
      email: '',
    })
    const caseDetail = reactive({
      // all these properties should match with DB, check with backend team
      amountRequested: '',
      pointOfContact: '',
      refereeId: '',
      beneficiaryId: '',
      createdBy: '1',
      updatedBy: '2',
      requests: [],
    })
    console.log(caseDetail)
    const logout = (e) => {
      console.log(e)
      store.dispatch('doLogin', null)
    }
    const details = (e) => {
      router.push('/details/' + e.detail.row.caseNumber)
    }
    const createNew = async () => {
      caseDetail.beneficiaryId = beneficiary.id
      caseDetail.refereeId = referee.id

      // alert(JSON.stringify(caseDetail))
      console.log('test', beneficiary)

      try {
        caseDetail.requests = caseDetail.requests.filter((request) => request.requestTypeId > 0) // -1 = add new type, 0 = not selected
        let body = { ...caseDetail }

        // API is now requests so this conversion can be removed
        // body = {
        //   request: [...body.requests],
        //   ...body,
        // }
        // delete body.requests

        console.log('case details', body)

        const abc = await http('POST', `${VITE_API_URL}/v1/cases`, body)

        console.log('posting case details', abc)

        beneficiary = {}

        caseDetail.requests = []
        // change to specific case detail page
        stage.value = 0
      } catch (e) {
        console.log('error', e)
        alert(
          e?.data?.error?.message || 'There is an error. Please contact admin.'
        )
      }
    }
    onMounted(async () => {
      // const res = await fetch('https://randomuser.me/api/')
      // const data = await res.json()
      // console.log(data)
      console.log('Secure is mounted!')
    })

    const upsertBeneficiary = async () => {
      console.log(`beneficiary in upsert`, beneficiary)
      if (beneficiary.id) {
        // update
        try {
          const body = beneficiary
          const abc = await http(
            'PATCH',
            `${VITE_API_URL}/v1/beneficiaries/${beneficiary.id}`,
            body
          )
          stage.value++
        } catch (e) {
          console.log(e)
          alert(
            e?.data?.error?.message ||
              'There is an error. Please contact admin.'
          )
        }
      } else {
        // create
        try {
          const edf = await http('GET', `${VITE_API_URL}/v1/beneficiaries`)
          console.log('edf', edf)
          stage.value++
        } catch (e) {
          alert(e.toString())
        }
      }
    }

    const upsertReferee = async () => {
      console.log(`referee in upsert`, referee)
      if (referee.id) {
        // update
        try {
          const body = referee
          const abc = await http(
            'PATCH',
            `${VITE_API_URL}/v1/referees/${referee.id}`,
            body
          )
          stage.value++
        } catch (e) {
          alert(
            e?.data?.error?.message ||
              'There is an error. Please contact admin.'
          )
        }
      } else {
        // create
        try {
          const edf = await http('GET', `${VITE_API_URL}/v1/referees`)
          console.log('edf', edf)
          stage.value++
        } catch (e) {
          alert(e.toString())
        }
      }
    }

    const insertDetails = async () => {}

    return {
      logout,
      stage,
      createNew,
      beneficiary,
      referee,
      caseDetail,
      details,
      upsertBeneficiary,
      upsertReferee,
      insertDetails,
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

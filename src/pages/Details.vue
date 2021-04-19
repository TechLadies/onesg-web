<template>
  <div class="parent">
    <div class="left">
      <div class="top">
        <div class="title">Case #{{ caseDetails.caseNumber }}</div>
        <div class="alignRight">
          <button @click="showModal = true" class="blueButton">
            {{ caseDetails.caseStatus }} <i class="fa fa-caret-down"></i>
          </button>
        </div>
      </div>

      <div class="body">
        <div class="details">
          <div class="border">
            <div class="sectionHeading">DETAILS</div>
            <div class="sectionBody">
              <!--- table is for the content --->
              <table id="sectionBodyTable">
                <tbody>
                  <tr>
                    <td class="columnLeft">P.O.C.</td>
                    <td class="columnRight">{{ caseDetails.poc }}</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Applied On</td>
                    <td class="columnRight">{{ caseDetails.appliedOn }}</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Amount Requested</td>
                    <td class="columnRight">
                      {{ caseDetails.amountRequested }}
                    </td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Approval</td>
                    <td class="columnRight">Yes</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Last updated</td>
                    <td class="columnRight">{{ caseDetails.lastUpdated }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="border">
            <div class="sectionHeading">REFERENCE</div>
            <div class="sectionBody">
              <table id="sectionBodyTable">
                <tbody>
                  <tr>
                    <td class="columnLeft">Name</td>
                    <td class="columnRight">{{ caseDetails.refereeName }}</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Organisation</td>
                    <td class="columnRight">
                      {{ caseDetails.refereeOccupation }}
                    </td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Phone</td>
                    <td class="columnRight">{{ caseDetails.refereePhone }}</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Email</td>
                    <td class="columnRight">{{ caseDetails.refereeEmail }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="referenceStatusBorder">
            <div class="sectionHeadingSub">Reference Status</div>
            <div id="sectionBodySub">
              <div class="select">
                <select>
                  <option value="{{caseDetails.refereeStatus}}">
                    {{ caseDetails.refereeStatus }}
                  </option>
                  <option v-if="caseDetails.refereeStatus !== 'Unverified'">
                    Unverified
                  </option>
                  <option v-if="caseDetails.refereeStatus !== 'Pending'">
                    Pending
                  </option>
                  <option v-if="caseDetails.refereeStatus !== 'Verified'">
                    Verified
                  </option>
                </select>
              </div>
            </div>

            <div class="sectionHeadingSub">Amount Granted</div>
            <div id="sectionBodySub">
              <div class="placeholder" data-placeholder="S$">
                <input
                  class="input"
                  type="text"
                  v-model="caseDetails.amountGranted"
                />
              </div>
            </div>

            <div class="sectionHeadingSub">Case Tags</div>
            <br />
            <br />
            <br />
          </div>
        </div>
        <div class="requests">
          <div class="sectionHeading">REQUEST(S)</div>
          <RequestList
            :parentData="request"
            v-if="loadData"
            @re-fresh="reFresh"
            :refreshData="refreshData"
          />
          <div class="commentsBorder">
            <div class="sectionHeading">COMMENTS & DOCUMENTS</div>
            <div class="sectionBodyText">
              <div v-for="items in caseDetails.comments" :key="items.id">
                <div class="commentsMessage">{{ items['message'] }}</div>
                <div class="commentsInfo">
                  {{ items.staffs.username }} •
                  {{ items.createdAt.replace('T', ' ').substring(0, 16) }}
                </div>
                <br />
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="sectionHeading">BENEFICIARY</div>
      <div id="beneficiaryName">{{ caseDetails.beneficiaryName }}</div>
      <div class="sectionBody">
        <table id="sectionBodyTable">
          <tbody>
            <tr>
              <td class="columnLeft">Phone</td>
              <td class="columnRight">{{ caseDetails.beneficiaryPhone }}</td>
            </tr>
            <tr>
              <td class="columnLeft">Email</td>
              <td class="columnRight">{{ caseDetails.beneficiaryEmail }}</td>
            </tr>
            <tr>
              <td class="columnLeft">Occupation</td>
              <td class="columnRight">
                {{ caseDetails.beneficiaryOccupation }}
              </td>
            </tr>
            <tr>
              <td class="columnLeft">Household Income</td>
              <td class="columnRight">
                {{ caseDetails.beneficiaryHouseholdIncome }}
              </td>
            </tr>
            <tr>
              <td class="columnLeft">Household Size</td>
              <td class="columnRight">
                {{ caseDetails.beneficiaryHouseholdSize }}
              </td>
            </tr>
            <tr>
              <td class="columnLeft">Payment Type</td>
              <td class="columnRight">
                {{ caseDetails.beneficiaryPaymentType }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="sectionHeadingWhite">NOTES</div>
      <div class="sectionBodyWhite">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
      <br />

      <div class="sectionHeadingWhite">
        RELATED CASES ({{
          caseDetails.relatedCases ? caseDetails.relatedCases.length : 0
        }})
      </div>
      <div
        class="sectionBodyWhite"
        v-for="relatedCase in caseDetails.relatedCases"
        :key="relatedCase.id"
      >
        <a v-on:click="goToCase(relatedCase)"># {{ relatedCase }}</a
        ><br />
      </div>
    </div>
  </div>
</template>

<script>
import { VITE_API_URL } from '/config.js'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import RequestList from '../components/RequestList.vue'

export default {
  name: 'Details',
  components: { RequestList },
  props: {
    caseId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter()
    let caseDetails = reactive({})
    console.log('props in Details.vue', props) // { user: '' }
    const items = ref([])
    const reqTypeItems = ref([])
    const request = ref([])
    const loadData = ref(false)
    const refreshData = ref({})
    // for requests
    //fetchData--start//
    async function fetchData() {
      try {
        const promises = await Promise.all([
          fetch(
            `${VITE_API_URL}/v1/cases?include_entities=beneficiary,request,referee&case_number=${props.caseId}`
          ),
          fetch(`${VITE_API_URL}/v1/request-types`),
        ]).then((responses) => Promise.all(responses.map((r) => r.json())))
        items.value = promises[0].results
        reqTypeItems.value = promises[1].results
        request.value = promises[0].results[0].requests
      } catch (err) {
        console.log('err', err)
      }
    }

    function reFresh(json) {
      refreshData.value = json.requests
      const newData = Object.keys(refreshData.value)
      const requestArray = request.value
      if (newData.length !== 0) {
        requestArray.unshift(refreshData.value)
      }
    }

    // Push request

    onMounted(async () => {
      console.log('Case details page mounted!')
      fetchData()
      loadData.value = true
      const res = await axios.get(
        `${VITE_API_URL}/v1/cases?case_number=${props.caseId}&include_entities=beneficiary,referee,request`
      )
      const data = res.data.results[0]
      // for case status on top
      caseDetails.caseStatus = data.caseStatus

      // for details
      caseDetails.caseNumber = data.caseNumber
      caseDetails.poc = data.pointOfContact || '-'
      caseDetails.appliedOn = data.appliedOn
      caseDetails.amountRequested = 'S$' + data.amountRequested
      caseDetails.lastUpdated = data.updatedAt.toString().slice(0, 10)

      // for referee
      caseDetails.refereeName = data.referee === null ? '-' : data.referee.name
      caseDetails.refereeOccupation = '-' // there is no referee occupation?
      caseDetails.refereePhone =
        data.referee === null ? '-' : data.referee.phone
      caseDetails.refereeEmail =
        data.referee === null ? '-' : data.referee.email

      // for referee status
      // const grantedAmount = (!data.amountGranted) ? 0 : data.amountGranted;
      caseDetails.amountGranted = !data.amountGranted ? 0 : data.amountGranted
      const refereeStatus = {
        VERIFIED: 'Verified',
        PENDING: 'Pending',
        UNVERIFIED: 'Unverified',
      }
      caseDetails.refereeStatus = refereeStatus[data.referenceStatus]

      // for beneficiary
      caseDetails.beneficiaryName = data.beneficiary.name
      caseDetails.beneficiaryPhone = data.beneficiary.phone
      caseDetails.beneficiaryEmail = data.beneficiary.email
      caseDetails.beneficiaryOccupation = data.beneficiary.occupation
      caseDetails.beneficiaryHouseholdIncome =
        'S$' + data.beneficiary.householdIncome
      caseDetails.beneficiaryHouseholdSize = data.beneficiary.householdSize
      caseDetails.beneficiaryPaymentType = ''
      for (let i = 0; i < data.beneficiary.paymentType.length; i++) {
        if (data.beneficiary.paymentType[i] === 'PAYNOW') {
          caseDetails.beneficiaryPaymentType += 'PayNow'
        }
        if (data.beneficiary.paymentType[i] === 'BANK_TRANSFER') {
          caseDetails.beneficiaryPaymentType += 'Bank Transfer'
        }
        // if there are both PayNow and Bank Transfer, add a comma after the first payment type
        if (i < data.beneficiary.paymentType.length - 1) {
          caseDetails.beneficiaryPaymentType += ', '
        }
      }

      // for comments
      // to retrieve comments
      const comments = await axios.get(
        `${VITE_API_URL}/v1/cases/${data.id}/comments`
      )
      caseDetails.comments = comments.data.comments

      // for related cases
      // to retrieve relatedCases
      const cases = await axios.get(
        `${VITE_API_URL}/v1/beneficiaries/${data.beneficiaryId}/cases`
      )

      // remove current caseNumber from list of relatedCases
      const relatedCases = cases.data.beneficiaryCases.caseNumbers
      const index = relatedCases.indexOf(props.caseId)
      relatedCases.splice(index, 1)
      caseDetails.relatedCases = relatedCases
    })

    const goToCase = (caseId) => {
      router.push('/details/' + caseId)
    }

    return {
      props,
      caseDetails,
      goToCase,
      fetchData,
      items,
      request,
      loadData,
      reqTypeItems,
      reFresh,
      refreshData,
    }
  },
}
</script>

<style scoped>
.parent {
  background: #fafafc;
  height: 100%;
  display: flex;
}
.border {
  border: 1px solid #e6e6f0;
  border-bottom: none;
  border-left: none;
  border-right: none;
}
/* for top part Case #EF and button */
.top {
  display: flex;
  height: 56px;
  margin: auto;
}
.title {
  font-family: Roboto;
  font-style: normal;
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  line-height: 40px;
  width: 100%;
  margin: auto;
}
.blueButton {
  background-color: #1e1ecc;
  color: white;
  padding: 8px 17px 8px 17px;
  width: 142px;
  height: 40px;
  font-size: 16px;
  border: 1px solid #1e1ecc;
  box-sizing: border-box;
  border-radius: 4px;
  float: right;
  margin-right: 10px;
}

/* left and body is for details, reference, reference status, requests and comments */
.left {
  width: 75%;
  margin-left: 100px;
}
.body {
  display: flex;
  margin-left: -20px;
}
/* details is for details, reference and reference status */
.details {
  width: 30%;
  height: 100%;
}

/* for request(s) */
.requests {
  position: relative;
  min-height: calc(100vh);
  width: 70%;
  border: 1px solid #e6e6f0;
  border-right: none;
  background-color: #fff;
}

/* placeholder is for "S$" in Amount Granted 
input is for the input field in Amount Granted */
.placeholder {
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
}
.placeholder::after {
  position: absolute;
  left: 15px;
  top: 9px;
  content: attr(data-placeholder);
  opacity: 0.6;
  font-size: 16px;
  line-height: 24px;
}
.input {
  padding-left: 30px;
  font-family: Roboto;
  font-size: 16px;
  line-height: 24px;
  color: #9292ad;
}
/* select is for drop down in Reference Status */
.select {
  position: relative;
  width: 95%;
  align-items: center;
}
.select select {
  width: 100%;
}

/* commentsMessage and commentsInfo in Comments & Documents */
.commentsMessage {
  font-family: Roboto;
  font-size: 14px;
  line-height: 20px;
  color: #12121a;
}
.commentsInfo {
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  color: #9292ad;
}

.referenceStatusBorder {
  position: relative;
  top: 21px;
  width: 100%;
  border: 1px solid #e6e6f0;
  border-bottom: none;
  border-left: none;
  border-right: none;
}
.commentsBorder {
  position: absolute;
  top: 442px;
  width: 100%;
  border: 1px solid #e6e6f0;
  border-bottom: none;
  border-left: none;
  border-right: none;
}

/* right is for beneficiary, notes and related cases */
.right {
  min-height: calc(100vh - 56px);
  width: 25%;
  background-color: #f2f2ff;
  border-left: 1px solid #e6e6f0;
}

/* beneficiaryName is for beneficiary */
#beneficiaryName {
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  font-family: Roboto;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #363636;
}

/* sectionHeading is headers that are capitalised, 
sectionHeadingSub is for Reference Status, Amount Granted and Case Tags 
sectionHeadingWhite is for Notes and Related Cases*/
.sectionHeading {
  font-size: 14px;
  text-align: left;
  font-weight: 500;
  color: #59596e;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-left: 10px;
  padding: 15px 10px 10px 10px;
}
.sectionHeadingSub {
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  color: #12121a;
  margin-left: 10px;
  padding: 15px 10px 10px 10px;
}
.sectionHeadingWhite {
  font-size: 14px;
  text-align: left;
  text-transform: uppercase;
  font-weight: 500;
  line-height: 36px;
  padding-left: 15px;
  width: 90%;
  margin: auto;
  vertical-align: middle;
  background-color: white;
  color: #59596e;
}
.sectionBodyWhite {
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  padding-top: 15px;
  width: 80%;
  margin: auto;
  color: #12121a;
}

/* sectionBody is to contain the tables in details, reference and beneficiary 
sectionBodyTable is the table in details, reference and beneficiary 
sectionBodySub is for drop down and inptu field in Reference Status and Amount Granted
sectionBodyText is for Comments & Documents */
.sectionBody {
  font-size: 12px;
  text-align: center;
  padding-left: 15px;
  padding-right: 10px;
  padding-bottom: 20px;
  display: flex;
  line-height: 25px;
}
#sectionBodyTable {
  font-size: 12px;
  padding-left: 15px;
  padding-right: 10px;
  line-height: 15px;
}
#sectionBodyTable td {
  height: 32px;
}
#sectionBodyTable .columnLeft {
  text-align: right;
  width: 50%;
  color: #59596e;
  padding-right: 5px;
  vertical-align: middle;
}
#sectionBodyTable .columnRight {
  text-align: left;
  width: 400px;
  color: #12121a;
  padding-left: 5px;
  vertical-align: middle;
}
#sectionBodySub {
  padding-left: 10px;
  padding-right: 10px;
}
.sectionBodyText {
  padding-left: 20px;
  padding-right: 10px;
  text-align: left;
}

a {
  font-size: 14px;
  line-height: 20px;
  color: #1e1ecc;
}
</style>

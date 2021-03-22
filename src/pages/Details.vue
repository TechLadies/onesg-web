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
              <div class="contentLeft">
                <ul>
                  P.O.C.
                </ul>

                <ul>
                  Applied on
                </ul>

                <ul>
                  Amount Requested
                </ul>

                <ul>
                  Approval
                </ul>
                <ul>
                  Last updated
                </ul>
              </div>
              <div class="contentRight" v-for="item in items" :key="item">
                <ul>
                  {{
                    caseDetails.poc
                  }}
                </ul>

                <ul>
                  {{
                    caseDetails.appliedOn
                  }}
                </ul>

                <ul>
                  {{
                    caseDetails.amountRequested
                  }}
                </ul>

                <ul>
                  Yes
                </ul>
                <ul>
                  {{
                    caseDetails.lastUpdated
                  }}
                </ul>
              </div>
            </div>
          </div>
          <div class="border">
            <div class="sectionHeading">REFERENCE</div>
            <div class="sectionBody">
              <div class="contentLeft">
                <ul>
                  Name
                </ul>
                <ul>
                  Organisation
                </ul>
                <ul>
                  Phone
                </ul>
                <ul>
                  Email
                </ul>
              </div>
              <div class="contentRight">
                <ul>
                  {{
                    caseDetails.refereeName
                  }}
                  <!--referee-->
                </ul>
                <ul>
                  {{
                    caseDetails.refereeOccupation
                  }}
                </ul>
                <ul>
                  {{
                    caseDetails.refereePhone
                  }}
                </ul>
                <ul>
                  {{
                    caseDetails.refereeEmail
                  }}
                </ul>
              </div>
            </div>
          </div>
          <div class="border">
            <div class="sectionHeading">Reference Status</div>
            <div class="sectionHeading">
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

            <div class="sectionBody">
              <div class="sectionHeading">Amount Granted</div>
              <br />
              <br />
              <div class="sectionHeading">
                <div class="placeholder" data-placeholder="S$">
                  <input
                    class="input"
                    type="text"
                    v-model="caseDetails.amountGranted"
                  />
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
        <div class="requests border">
          <div class="sectionHeading">REQUEST(S)</div>
          <RequestList
            :parentData="request"
            v-if="loadData"
            @re-fresh="reFresh"
            :refreshData="refreshData"
          />
          <div class="border">
            <br />
            <div class="sectionHeading">COMMENTS & DOCUMENTS</div>
            <br />
            <div class="sectionBodyLeft">
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
      <div class="sectionBody">
        <div class="contentLeft">
          <ul>
            Name
          </ul>
          <ul>
            Phone
          </ul>
          <ul>
            Email
          </ul>
          <ul>
            Occupation
          </ul>
          <ul>
            Household income
          </ul>
          <ul>
            Household size
          </ul>
          <ul>
            Payment type
          </ul>
        </div>
        <div class="contentRight">
          <ul>
            {{
              caseDetails.beneficiaryName
            }}
            <!--beneficiary-->
          </ul>
          <ul>
            {{
              caseDetails.beneficiaryPhone
            }}
          </ul>
          <ul>
            {{
              caseDetails.beneficiaryEmail
            }}
          </ul>
          <ul>
            {{
              caseDetails.beneficiaryPhone
            }}
          </ul>
          <ul>
            {{
              caseDetails.beneficiaryHouseholdIncome
            }}
          </ul>
          <ul>
            {{
              caseDetails.beneficiaryHouseholdSize
            }}
          </ul>
          <ul>
            {{
              caseDetails.beneficiaryPaymentType
            }}
          </ul>
        </div>
        <br />
      </div>
      <div class="sectionHeadingWhite">NOTES</div>

      <div class="sectionBodyLeft">
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
        class="sectionBodyLeft"
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
  display: flex;
}
.top {
  display: flex;
}

.left {
  width: 75%;
  margin-left: 10%;
  padding-right: 0%;
}

.right {
  width: 25%;
  background-color: #f2f2ff;
  align-items: stretch;
}
.title {
  font-family: Roboto;
  font-style: normal;
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  width: 90%;
}
.alignRight {
  float: right;
  margin-right: 7%;
  padding-bottom: 20px;
}

.blueButton {
  background-color: #0032c8;
  color: white;
  margin-left: 50%;
  padding: 15px 2px 15px 2px;
  width: 100px;
  font-size: 14px;
}

.body {
  display: flex;
}

a {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #1e1ecc;
}

.details {
  width: 30%;
}

.requests {
  width: 70%;
}

.border {
  border: 0.01px solid #dedede;
  box-shadow: 0.02 0.02 0.02 0.02;
  padding: 10px 10px 10px 10px;
}

.sectionHeading {
  font-size: 14px;
  text-align: left;
  font-weight: 500;
  padding-top: 1%;
  padding-bottom: 5%;
  padding-left: 0%;
  color: rgb(48, 46, 46);
}
.sectionHeadingWhite {
  font-size: 14px;
  text-align: left;
  font-weight: 500;
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 5%;
  background-color: white;
  color: rgb(48, 46, 46);
}

.sectionBody {
  font-size: 12px;
  text-align: center;
  padding-left: 15px;
  padding-right: 10px;
  display: flex;
}
.sectionBodyLeft {
  padding-right: 5px;
  font-size: 12px;
  text-align: left;
  padding-left: 15px;
  padding-right: 10px;
}
.contentLeft {
  text-align: right;
  width: 50%;
  padding-right: 10px;
}
.contentRight {
  text-align: left;
  width: 50%;
}

.placeholder {
  position: relative;
}

.placeholder::after {
  position: absolute;
  left: 5px;
  top: 9px;
  content: attr(data-placeholder);
  opacity: 0.6;
  font-size: 16px;
  line-height: 24px;
}

.input {
  padding-left: 25px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #9292ad;
}

.commentsMessage {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #12121a;
}

.commentsInfo {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #9292ad;
}
</style>

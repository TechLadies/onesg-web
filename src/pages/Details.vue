<template>
  <div class="parent">

    <!-- <script type="text/javascript">
    const CaseNumber = 
    </script> -->
    <div class="left">
      <div class="top">
        <div class="title">Case #{{caseDetails.caseNumber}}</div>
        <div v-bind="test" />
        <div class="alignRight">
          <button @click="showModal = true" class="blueButton">
            New <i class="fa fa-caret-down"></i>
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
                  Date of application
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
              <div class="contentRight">
                <ul>
                  {{caseDetails.poc}}
                </ul>

                <ul>
                  {{caseDetails.appliedOn}}
                </ul>

                <ul>
                  {{caseDetails.amountRequested}}
                </ul>

                <ul>
                  Yes
                </ul>
                <ul>
                  {{caseDetails.lastUpdated}}
                </ul>
              </div>
            </div>
          </div>
          <div class="border">
            <div class="sectionHeading">REFEREE</div>
            <div class="sectionBody">
              <div class="contentLeft">
                <ul>
                  Name
                </ul>
                <ul>
                  Occupation
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
                  {{caseDetails.refereeName}} <!--referee-->
                </ul>
                <ul>
                  {{caseDetails.refereeOccupation}}
                </ul>
                <ul>
                  {{caseDetails.refereePhone}}
                </ul>
                <ul>
                  {{caseDetails.refereeEmail}}
                </ul>
              </div>
            </div>
          </div>
          <div class="border">
            <div class="sectionHeading">Referee Status</div>
            <div class="sectionHeading">
              <div class="select">
                <select>
                  <option>Unverified</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>

            <div class="sectionBody">
              <div class="sectionHeading">Amount Granted</div>
              <br />
              <br />
              <div class="sectionHeading">
                <input class="input" type="text" placeholder="S$" />
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
          <div class="border">
            <div class="sectionBodyLeft">Request Type</div>
            <div class="sectionBodyLeft">Fulfillment</div>
            <div class="sectionBodyLeft">Description</div>
            <br />
          </div>
          <div class="border">
            <br />
            <div class="sectionHeadingf">COMMENTS & DOCUMENTS</div>
            <br />
            <div class="sectionBodyLeft">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s when an unknown printer took a galley of type
              and scrambled it to make a type specimen book it has?
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
            {{caseDetails.beneficiaryName}} <!--beneficiary-->
          </ul>
          <ul>
            {{caseDetails.beneficiaryPhone}}
          </ul>
          <ul>
            {{caseDetails.beneficiaryEmail}}
          </ul>
          <ul>
            {{caseDetails.beneficiaryPhone}}
          </ul>
          <ul>
            {{caseDetails.beneficiaryHouseholdIncome}}
          </ul>
          <ul>
            {{caseDetails.beneficiaryHouseholdSize}}
          </ul>
          <ul>
            {{caseDetails.beneficiaryPaymentType}}
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
    </div>
  </div>
</template>

<script>
import { VITE_API_URL } from '/config.js'
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'

console.log(dayjs('2019-01-25').format('DD/MM/YYYY'))


// TODO: Temporarily moved this function here because couldn't get js export import files working.
// Should figure out and move api services to separate folder/file

export default {
  name: 'Details',
  props: {
    caseId: {
      type: String,
      required: true,
    },
  },
  
      // // For each data, transform it to the desired shape
      // const transformedData = fetchedData.map((data) => {
      //   return {
      //     id: data.caseId,
      //     beneficiaryName: data.beneficiary.name ? data.beneficiaryName : '-',
      //     caseNumber: data.caseId ? data.caseId : '-',
      //     applicationDate: dayjs(data.appliedOn).format('DD/MM/YYYY'),
      //     pointOfContact: data.pointOfContact ? data.pointOfContact : '-',
      //     refereeName: data.referee.name ? data.referee.name : '-',
      //     organisation: data.referee.organisation
      //       ? data.referee.organisation
      //       : '-',
      //     lastUpdate: dayjs(data.updatedAt).format('DD/MM/YYYY'),
      //   }
      // })
      // // Assign it to Vue data
      // table.fetchedItems = transformedData

  
  setup(props) {
    // const xx = props
    console.log(props) // { user: '' }

    const refereeStatus = reactive([{//key: the array
    }])
    const amountGranted = reactive([{//key: the array
    }])
    
    let caseDetails = reactive({})
    onMounted(async () => {
      console.log('Dashboard mounted!');

      const res = await axios.get(
        `${VITE_API_URL}/v1/cases?case_number=${props.caseId}&include_entities=beneficiary,referee,request`
      );
      const data = res.data.results[0]
      console.log('data', data)
      // for details
      caseDetails.caseNumber = data.caseNumber;
      caseDetails.poc = data.pointOfContact || '-';
      caseDetails.appliedOn = data.appliedOn;
      caseDetails.amountRequested = 'S$' + data.amountRequested;
      caseDetails.lastUpdated = data.updatedAt.toString().slice(0,10);

      // for referee
      caseDetails.refereeName = (data.referee === null) ? '-' : data.referee.name;
      caseDetails.refereeOccupation = '-' // there is no referee occupation?
      caseDetails.refereePhone = (data.referee === null) ? '-' : data.referee.phone;
      caseDetails.refereeEmail = (data.referee === null) ? '-' : data.referee.email;

      // for beneficiary
      caseDetails.beneficiaryName = data.beneficiary.name;
      caseDetails.beneficiaryPhone = data.beneficiary.phone;
      caseDetails.beneficiaryEmail = data.beneficiary.email;
      caseDetails.beneficiaryOccupation = data.beneficiary.occupation;
      caseDetails.beneficiaryHouseholdIncome = 'S$' + data.beneficiary.householdIncome;
      caseDetails.beneficiaryHouseholdSize = data.beneficiary.householdSize;
      caseDetails.beneficiaryPaymentType = '';
      for(let i = 0; i < data.beneficiary.paymentType.length; i++) {
        if (data.beneficiary.paymentType[i] === 'PAYNOW') {
          const paymentType = 'PayNow'
          caseDetails.beneficiaryPaymentType += paymentType
        }
        if (data.beneficiary.paymentType[i] === 'BANK_TRANSFER') {
          const paymentType = 'Bank Transfer'
          caseDetails.beneficiaryPaymentType += paymentType
        }
        if (i < data.beneficiary.paymentType.length - 1) {
          caseDetails.beneficiaryPaymentType += ', '
        }
      }

      // for requests
      // to retrieve request types
      const reqType = await axios.get(
        `${VITE_API_URL}/v1/request-types`
      );
      // push request objects into requestArray
      const requestArray = []
      for(let i = 0; i < data.requests.length; i++) {
        const arr = {}
        const requestType = reqType.data.results[data.requests[i].requestTypeId-1].type
        arr.requestType = requestType
        arr.fulfilmentType = data.requests[i].fulfilmentType
        arr.description = data.requests[i].description
        requestArray.push(arr)
      }
      caseDetails.requests = requestArray
      
      // fetchData() for case, ben, ref and comments
    })
  return {props, caseDetails}
  }
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
  text-align: left;
  font-size: 24px;
  font-weight: 600;
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
  padding-top: 5%;
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
</style>

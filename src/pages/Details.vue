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
            {{caseDetails.caseStatus}} <i class="fa fa-caret-down"></i>
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
                  <option value={{caseDetails.refereeStatus}}>{{caseDetails.refereeStatus}}</option>
                  <option v-if="caseDetails.refereeStatus!=='Unverified'">Unverified</option>
                  <option v-if="caseDetails.refereeStatus!=='Pending'">Pending</option>
                  <option v-if="caseDetails.refereeStatus!=='Verified'">Verified</option>
                </select>
              </div>
            </div>

            <div class="sectionBody">
              <div class="sectionHeading">Amount Granted</div>
              <br />
              <br />
              <div class="sectionHeading">
                <div class="placeholder" data-placeholder="S$">
                  <input class="input" type="text" v-model="caseDetails.amountGranted"/>
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
            <div class="border" v-for='details in caseDetails.requests' :key='details.id'>
              <div class="sectionBodyLeft" >
                <b>Request Type</b> <br>
                {{details.requestType}}<br>
                <b>Fulfilment</b> <br>
                {{details.fulfilmentType}}<br>
                <b>Description</b> <br>
                {{details.description}}<br>
                <b>Checkbox</b> <br>
                
                <div v-for='(item,name) in details.shownFulfilment' :key='item.id'> 
                  <div v-if='details.completedFulfilmentItems.includes(name)'>
                      <input type='checkbox' checked=true> {{item}}<br>
                  </div>
                  <div v-else>
                    <input type='checkbox'> {{item}}<br>
                  </div>
                </div>
              </div>
            </div>
          
          <div class="border">
            <br />
            <div class="sectionHeadingf">COMMENTS & DOCUMENTS</div>
            <br />
            <div class="sectionBodyLeft">
              <div v-for='items in caseDetails.comments' :key='items.id'> 
                <div class="commentsMessage">{{items['message']}}</div>
                <div class="commentsInfo">{{items['author']}} • 29 Dec 2019, 14:24</div>
                <br>
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
  
  setup(props) {
    // const xx = props
    // console.log(props) // { user: '' }

    const refereeStatus = reactive([{//key: the array
    }])
    const amountGranted = reactive([{//key: the array
    }])
    
    let caseDetails = reactive({})
    let requestArray = reactive([])
    onMounted(async () => {
      console.log('Dashboard mounted!');

      const res = await axios.get(
        `${VITE_API_URL}/v1/cases?case_number=${props.caseId}&include_entities=beneficiary,referee,request`
      );
      const data = res.data.results[0]
      console.log('data', data)
      // for case status on top
      caseDetails.caseStatus = data.caseStatus;

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

      // for referee status
      // const grantedAmount = (!data.amountGranted) ? 0 : data.amountGranted;
      caseDetails.amountGranted = (!data.amountGranted) ? 0 : data.amountGranted;
      const refereeStatus = {
        'VERIFIED': 'Verified',
        'PENDING': 'Pending',
        'UNVERIFIED': 'Unverified'
      }
      caseDetails.refereeStatus = refereeStatus[data.referenceStatus]

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
      

      // checklist items associated with fulfilment type
      let fulfilmentChecklistEnum = [
        {
          IN_KIND_DONATION: [
            'ITEMS_PURCHASED',
            'PURCHASE_AND_REIMBURSEMENT',
            'REIMBURSEMENT_PAID',
            'DELIVERED_TO_BENEFICIARY',
          ],
        },
        {
          PARTNER_REFERRAL: [
            'REFERRED_TO_PARTNER',
            'REFERRAL_APPROVED',
            'DELIVERED_TO_BENEFICIARY',
          ],
        },
        { THIRD_PARTY_PAYMENT: ['PURCHASE_VOUCHER', 'PAYMENT_PROCESSED'] },
        { CASH_TRANSFER: ['PURCHASE_VOUCHER', 'PAYMENT_PROCESSED'] },
      ];
      
      let shownFulfilmentObj = 
      {
        'ITEMS_PURCHASED': 'Items procured',
        'PURCHASE_AND_REIMBURSEMENT': 'Purchase & reimbursement form sent to Treasurer',
        'REIMBURSEMENT_PAID': 'Reimbursement paid',
        'DELIVERED_TO_BENEFICIARY': 'Delivered to beneficiary',
        'REFERRED_TO_PARTNER': 'Referred to partner',
        'REFERRAL_APPROVED': 'Referral approved',
        'DELIVERED_TO_BENEFICIARY': 'Delivered to beneficiary',
        'PURCHASE_VOUCHER': 'Purchase voucher & supporting documents sent to Treasurer', 
        'PAYMENT_PROCESSED': 'Payment processed'
      }

      for(let i = 0; i < data.requests.length; i++) {
        const arr = {}
        const requestType = reqType.data.results[data.requests[i].requestTypeId-1].type
        arr.requestType = requestType
        arr.fulfilmentType = data.requests[i].fulfilmentType.replace(/_/g, ' ').toString()
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ')
        .trim();
        arr.description = (data.requests[i].description === null) ? '-' : data.requests[i].description;
        arr.shownFulfilment = {}
        for(let j = 0; j < fulfilmentChecklistEnum.length; j++) {
          if (Object.keys(fulfilmentChecklistEnum[j]).toString() === data.requests[i].fulfilmentType) {
            arr.fulfilmentChecklist = Object.values(fulfilmentChecklistEnum[j])[0]
             for(let k = 0; k < arr.fulfilmentChecklist.length; k++) {
              
              const key = arr.fulfilmentChecklist[k]
              const item = shownFulfilmentObj[key]
              
              arr.shownFulfilment[key] = item
             }
            break
          }
        }
        // completedFulfilmentItems are those that are ticked in the UI
        arr.completedFulfilmentItems = data.requests[i].completedFulfilmentItems
        // push request objects into requestArray
        requestArray.push(arr)
      }

      caseDetails.requests = requestArray

      // for comments
      // to retrieve comments
      const comments = await axios.get(
        `${VITE_API_URL}/v1/cases/${props.caseId}/comments`
      );
      caseDetails.comments = comments.data.comments
      console.log('caseDetails', caseDetails)
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
  color: #9292AD;
}

.commentsMessage{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #12121A;
}

.commentsInfo {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #9292AD;
}
</style>

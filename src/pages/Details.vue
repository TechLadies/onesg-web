<template>
  <div class="parent">
    <div class="left">
      <div class="top">
        <div class="title">Case #{{caseDetails.caseNumber}}
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
                <!--- table is for the content --->
                <table id="sectionBodyTable">
                  <tbody>
                    <tr>
                      <td class="columnLeft">P.O.C.</td>
                      <td class="columnRight">{{caseDetails.poc}}</td>
                    </tr>
                    <tr>
                      <td class="columnLeft">Applied On</td>
                      <td class="columnRight">{{caseDetails.appliedOn}}</td>
                    </tr>
                    <tr>
                      <td class="columnLeft">Amount Requested</td>
                      <td class="columnRight">{{caseDetails.amountRequested}}</td>
                    </tr>
                    <tr>
                      <td class="columnLeft">Approval</td>
                      <td class="columnRight">Yes</td>
                    </tr>
                    <tr>
                      <td class="columnLeft">Last updated</td>
                      <td class="columnRight">{{caseDetails.lastUpdated}}</td>
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
                      <td class="columnRight">{{caseDetails.refereeName}}</td>
                    </tr>
                    <tr>
                      <td class="columnLeft">Organisation</td>
                      <td class="columnRight">{{caseDetails.refereeOccupation}}</td>
                    </tr>
                    <tr>
                      <td class="columnLeft">Phone</td>
                      <td class="columnRight">{{caseDetails.refereePhone}}</td>
                    </tr>
                    <tr>
                      <td class="columnLeft">Email</td>
                      <td class="columnRight">{{caseDetails.refereeEmail}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
          <div class="border">
            <div class="sectionHeadingSub">Reference Status</div>
              <div id="sectionBodySub">
                <div class="select">
                  <select>
                    <option value={{caseDetails.refereeStatus}}>{{caseDetails.refereeStatus}}</option>
                    <option v-if="caseDetails.refereeStatus!=='Unverified'">Unverified</option>
                    <option v-if="caseDetails.refereeStatus!=='Pending'">Pending</option>
                    <option v-if="caseDetails.refereeStatus!=='Verified'">Verified</option>
                  </select>
                </div>
              </div>

              <div class="sectionHeadingSub">Amount Granted</div>
                <div id="sectionBodySub">
                  <div class="placeholder" data-placeholder="S$">
                    <input class="input" type="text" v-model="caseDetails.amountGranted"/>
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
            <div class="requestTypeContent" v-for='details in caseDetails.requests' :key='details.id'>
              <table class="requestTypeTable">
                <tr>
                  <td style="width:20%">
                    <header>Request Type&#10;</header>
                    {{details.requestType}}
                  </td>
                  <td style="width:25%">
                    <header>Fulfilment&#10;</header>
                    {{details.fulfilmentType}}
                  </td>
                  <td rowspan="2" style="width:45%">
                    <!-- to check with which checkbox to tick -->
                    <div v-for='(item,name) in details.shownFulfilment' :key='item.id'> 
                      <div v-if='details.completedFulfilmentItems.includes(name)'>
                          <input type='checkbox' checked=true> {{item}}<br>
                      </div>
                      <div v-else>
                        <input type='checkbox'> {{item}}<br>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <header>Description&#10;</header>
                    {{details.description}}
                  </td>
                </tr>
              </table>
              <br>
          </div>
        
          <div class="border">
            <div class="sectionHeading">COMMENTS & DOCUMENTS</div>
            <div class="sectionBodyText">
              <div v-for='items in caseDetails.comments' :key='items.id'> 
                
                <div class="commentsMessage">{{items['message']}}</div>
                <div class="commentsInfo">{{items.staffs.username}} • {{items.createdAt.replace('T', ' ').substring(0, 16)}}</div>
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
        <div id="beneficiaryName">{{caseDetails.beneficiaryName}}</div>
          <div class="sectionBody">
            
              <table id="sectionBodyTable">
                <tbody>
                  <tr>
                    <td class="columnLeft">Phone</td>
                    <td class="columnRight">{{caseDetails.beneficiaryPhone}}</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Email</td>
                    <td class="columnRight">{{caseDetails.beneficiaryEmail}}</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Occupation</td>
                    <td class="columnRight">{{caseDetails.beneficiaryOccupation}}</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Household Income</td>
                    <td class="columnRight">{{caseDetails.beneficiaryHouseholdIncome}}</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Household Size</td>
                    <td class="columnRight">{{caseDetails.beneficiaryHouseholdSize}}</td>
                  </tr>
                  <tr>
                    <td class="columnLeft">Payment Type</td>
                    <td class="columnRight">{{caseDetails.beneficiaryPaymentType}}</td>
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
      
      <div class="sectionHeadingWhite">RELATED CASES ({{(caseDetails.relatedCases) ? caseDetails.relatedCases.length : 0 }})</div>
        <div class="sectionBodyWhite" v-for='relatedCase in caseDetails.relatedCases' :key='relatedCase.id'>
          <a v-on:click='goToCase(relatedCase)' ># {{relatedCase}}</a><br>
        </div>
    </div>
  </div>
</template>

<script>
import { VITE_API_URL } from '/config.js'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'Details',
  props: {
    caseId: {
      type: String,
      required: true,
    },
  },
  
  setup(props) {
    const router = useRouter()
    let caseDetails = reactive({})
    let requestArray = reactive([])
    onMounted(async () => {
      console.log('Case details page mounted!');

      const res = await axios.get(
        `${VITE_API_URL}/v1/cases?case_number=${props.caseId}&include_entities=beneficiary,referee,request`
      );
      const data = res.data.results[0]
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
          caseDetails.beneficiaryPaymentType += 'PayNow'
        }
        if (data.beneficiary.paymentType[i] === 'BANK_TRANSFER') {
          caseDetails.beneficiaryPaymentType += 'Bank Transfer'
        }
        // if there are both PayNow and Bank Transfer, add a comma after the first payment type
        if (i < data.beneficiary.paymentType.length - 1) {
          caseDetails.beneficiaryPaymentType += ', '
        }
      };

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
      };

      for(let i = 0; i < data.requests.length; i++) {
        const request = {}
        const requestType = reqType.data.results[data.requests[i].requestTypeId-1].type
        request.requestType = requestType
        // replace _ in fulfilment type with space and capitalize the first letter of each word
        request.fulfilmentType = data.requests[i].fulfilmentType.replace(/_/g, ' ').toString()
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ')
        .trim();
        request.description = (data.requests[i].description === null) ? '-' : data.requests[i].description;

        // TODO: refactor. shownFulfillment object does not have to be part of requestArray since it is not part of the requests record. the full fulfillment checklist items could be created without it being part of the requestArray. 
        request.shownFulfilment = {}
        for(let j = 0; j < fulfilmentChecklistEnum.length; j++) {
          if (Object.keys(fulfilmentChecklistEnum[j]).toString() === data.requests[i].fulfilmentType) {
            request.fulfilmentChecklist = Object.values(fulfilmentChecklistEnum[j])[0]
             for(let k = 0; k < request.fulfilmentChecklist.length; k++) {
              
              const key = request.fulfilmentChecklist[k]
              const item = shownFulfilmentObj[key]
              
              request.shownFulfilment[key] = item
             }
            break
          }
        }
        // completedFulfilmentItems are those that are ticked in the UI
        request.completedFulfilmentItems = data.requests[i].completedFulfilmentItems;
        // push request objects into requestArray
        requestArray.push(request);
      }

      caseDetails.requests = requestArray;

      // for comments
      // to retrieve comments
      const comments = await axios.get(
        `${VITE_API_URL}/v1/cases/${data.id}/comments`
      );
      caseDetails.comments = comments.data.comments;

      // for related cases
      // to retrieve relatedCases
      const cases = await axios.get(
        `${VITE_API_URL}/v1/beneficiaries/${data.beneficiaryId}/cases`
      );

      // remove current caseNumber from list of relatedCases
      const relatedCases = cases.data.beneficiaryCases.caseNumbers;
      const index = relatedCases.indexOf(props.caseId)
      relatedCases.splice(index, 1)
      caseDetails.relatedCases = relatedCases
    })

    const goToCase = (caseId) => {
      router.push('/details/' + caseId)
    }

  return {props, caseDetails, goToCase}
  }
}
</script>

<style scoped>
.parent {
  background: #FAFAFC;
  display: flex;
}
.top {
  display: flex;
  height: 56px;
  margin: auto;
}

.left {
  width: 75%;
  height: 100vh;
  margin-left: 100px;
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
  line-height: 40px;
  width: 100%;
  margin: auto;
}

.blueButton {
  background-color: #1E1ECC;
  color: white;
  padding: 8px 17px 8px 17px;
  width: 142px;
  height: 40px;
  font-size: 16px;
  border: 1px solid #1E1ECC;
  box-sizing: border-box;
  border-radius: 4px;
  float: right;
  margin-right: 10px;
}

.body {
  display: flex;
  margin-left: -20px;
}

a {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #1E1ECC;
}

.details {
  width: 30%;
}

.requests {
  width: 70%;
  height: auto;
  border: 1px solid #E6E6F0;
  background-color: #fff;
  height: calc(100vh - 50px);

}
.requestTypeContent {
  padding-left: 15px;
  padding-right: 15px;
}
.requestTypeTable {
  width: 100%;
  border: 1px solid #E6E6F0;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 2px rgba(10, 10, 10, 0.05));
  border-radius: 4px;
  border-collapse: separate !important;
}
.requestTypeTable td {
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  margin: auto;
  padding: 12px;
}
.requestTypeTable td header {
  font-size: 14px;
  line-height: 20px;
  color: #59596E;
}

.border {
  border: 1px solid #E6E6F0;
  border-bottom: none;
  border-left: none;
  border-right: none;
}

.sectionHeading {
  font-size: 14px;
  text-align: left;
  font-weight: 500;
  color: #59596E;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-left: 10px;
  padding: 15px 10px 10px 10px;
}

.sectionHeadingSub {
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  color: #12121A;
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
  color: #59596E;
}
.sectionBodyWhite {
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  padding-top: 15px;
  width: 80%;
  margin: auto;
  color: #12121A;
}


/* for Details, Reference and Reference Status */
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
  color: #59596E;
  padding-right: 5px;
  vertical-align: middle;
}
#sectionBodyTable .columnRight {
  text-align: left;
  width: 400px;
  color: #12121A;
  padding-left: 5px;
  vertical-align: middle;
}
#sectionBodySub {
  padding-left: 10px;
  padding-right: 10px;
}
.sectionBodyText {
  padding-left: 20px;
  text-align: left;
}


.sectionBodyLeft {
  padding-right: 5px;
  font-size: 12px;
  text-align: left;
  padding-left: 15px;
  padding-right: 10px;
}

.select {
  position: relative;
  width: 95%;
  align-items: center;
}
.select select {
  width: 100%;
}

/* can remove .contentLeft */
.contentLeft {
  text-align: right;
  width: 50%;
  padding-right: 10px;
  border: 1px solid red;
}
/* can remove .contentRight */
.contentRight {
  text-align: left;
  width: 50%;
  border: 1px solid blue;
}

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
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #9292AD;
}

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

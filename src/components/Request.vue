<template>
  <div v-if="dataLoad">
    <div class="ReqRectPending" v-on:mouseenter="active = !active">
      <div class="requesttype-title">Request Type</div>
      <div class="requesttype-subtitle">
        {{ result }}
      </div>
      <div class="fulfilment-subtitle">
        {{
          item.fulfilmentType
            .replace(/_/g, ' ')
            .toString()
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
            .join(' ')
            .trim()
        }}
      </div>

      <div class="fulfilment-title">Fulfilment</div>

      <div class="desc-title">Description</div>
      <div class="desc-subtitle">{{ item.description }}</div>
      <div v-if="item.requestStatus == 'UNDER_REVIEW'">
        <button class="reject-btn">Reject</button>
        <button class="approve-btn">Approve</button>
      </div>
      <div class="reject-rect" v-if="item.requestStatus == 'REJECTED'">
        Rejected
      </div>
      <div v-if="item.requestStatus == 'ACCEPTED'">
        <!---Checkboxes --->
        <div class="form-box">
          <form v-if="item.fulfilmentType == 'PARTNER_REFERRAL'">
            <div
              v-for="partnerReferralCheck in partnerReferralChecks"
              :key="partnerReferralCheck.key"
            >
              <input
                type="checkbox"
                v-model="partnerReferralCheck.key"
                :checked="check(partnerReferralCheck.key)"
              />
              <label class="checkbox-label">{{
                partnerReferralCheck.text
              }}</label>
            </div>
          </form>
          <form v-if="item.fulfilmentType == 'IN_KIND_DONATION'">
            <div v-for="inKindCheck in inKindChecks" :key="inKindCheck.key">
              <input
                type="checkbox"
                v-model="inKindCheck.key"
                :checked="check(inKindCheck.key)"
              />
              <label class="checkbox-label">{{ inKindCheck.text }}</label>
            </div>
          </form>
          <form v-if="item.fulfilmentType == 'THIRD_PARTY_PAYMENT'">
            <div
              v-for="thirdPartyCheck in thirdPartyChecks"
              :key="thirdPartyCheck.key"
            >
              <input
                type="checkbox"
                v-model="thirdPartyCheck.key"
                :checked="check(thirdPartyCheck.key)"
              />
              <label class="checkbox-label">{{ thirdPartyCheck.text }}</label>
            </div>
          </form>
          <form v-if="item.fulfilmentType == 'CASH_TRANSFER'">
            <div
              v-for="cashTransferCheck in cashTransferChecks"
              :key="cashTransferCheck.key"
            >
              <input
                type="checkbox"
                v-model="cashTransferCheck.key"
                :checked="check(cashTransferCheck.key)"
              />
              <label class="checkbox-label">{{ cashTransferCheck.text }}</label>
            </div>
          </form>
        </div>
      </div>
      <!---Trash button --->
      <div v-if="active">
        <div class="dustbin">
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <span
            class="material-icons"
            v-on:mouseenter="isActive = true"
            v-on:mouseleave="isActive = false"
            :class="{ trashActive: isActive == true }"
          >
            delete_forever
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VITE_API_URL } from '/config.js'

import { onMounted, ref } from 'vue'

export default {
  name: '#request',
  data: function () {
    return {
      active: false,
      isActive: false,
      inKindChecks: [
        { key: 'ITEMS_PURCHASED', text: 'Items Purchased' },
        {
          key: 'PURCHASE_AND_REIMBURSEMENT',
          text: 'Purchase and Reimbursement',
        },
        { key: 'REIMBURSEMENT_PAID', text: 'Reimbursement Paid' },
        { key: 'DELIVERED_TO_BENEFICIARY', text: 'Delivered To Beneficiary' },
      ],
      partnerReferralChecks: [
        { key: 'REFERRED_TO_PARTNER', text: 'Referred To Partner' },
        { key: 'REFERRAL_APPROVED', text: 'Referral Approved' },
        { key: 'DELIVERED_TO_BENEFICIARY', text: 'Delivered To Beneficiary' },
      ],
      thirdPartyChecks: [
        { key: 'PURCHASE_VOUCHER', text: 'Purchase Voucher' },
        { key: 'PAYMENT_PROCESSED', text: 'Payment Processed' },
      ],
      cashTransferChecks: [
        { key: 'PURCHASE_VOUCHER', text: 'Purchase Voucher' },
        { key: 'PAYMENT_PROCESSED', text: 'Payment Processed' },
      ],
    }
  },
  props: {
    item: { type: Object, required: true },
    // reqTypeItem: { type: Object, required: true },
  },

  setup(props) {
    const dataLoad = ref(false)
    const requestTypesList = ref([])
    const result = ref('')
    console.log('prop in request.vue', props)

    // Fetch Request type -- start //
    async function fetchRequestTypes() {
      try {
        const res = await fetch(`${VITE_API_URL}/v1/request-types`, {
          method: 'get',
        })
        const json = await res.json()
        requestTypesList.value = json.results
      } catch (err) {
        console.log('fetchRequestTypes in request.vue', err)
      }
    }

    // Fetch Request type -- end //

    async function getRequestTypes() {
      const expireTime = 1000
      // TODO: set a cache expiry key also, maybe 1 hour.json() so that we dont serve stale  data
      const id = props.item.requestTypeId
      const requestTypesCache = JSON.parse(localStorage.getItem('requestTypes'))
      const res = await fetch(`${VITE_API_URL}/v1/request-types`, {
        method: 'get',
      })

      const json = await res.json()
      const arr = json.results
      let output = {}
      arr.forEach((obj) => {
        output[obj.id] = obj.type
      })
      console.log(`output`, output)
      // if  cache exists, return from cache
      if (requestTypesCache === output) {
        console.log(`requestTypesCache`, requestTypesCache)
        result.value = requestTypesCache[id]
      } else {
        // if no cache, save to cache
        localStorage.setItem('requestTypes', JSON.stringify(output))
        localStorage.setItem('storedData', JSON.stringify({ time: new Date() }))
        const test = JSON.parse(localStorage.getItem('requestTypes'))
        result.value = test[id]
        return result
      }
      setTimeout(function () {
        localStorage.clear()
      }, expireTime)
    }

    console.log(
      `completedFulfilmentItems`,
      Object.values(props.item.completedFulfilmentItems)
    )
    const doneFulfilmentItems = Object.values(
      props.item.completedFulfilmentItems
    )

    function check(val) {
      if (doneFulfilmentItems.includes(val)) return true
      return false
    }
    onMounted(() => {
      dataLoad.value = true
      fetchRequestTypes(), getRequestTypes()
    })

    return {
      dataLoad,
      fetchRequestTypes,
      getRequestTypes,
      result,
      check,
    }
  },
}
</script>

<style scoped>
.form-box {
  position: absolute;
  text-align: left;
  bottom: 20%;
  left: 60%;
  justify-items: right;
  float: left;
  top: 20%;
}
.checkbox-label {
  padding-left: 10px;
  justify-content: left;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}
.material-icons {
  color: #dadada;
}

.reject-rect {
  padding-top: 2px;
  position: absolute;
  left: 80.79%;
  right: 16.79%;
  top: 10.5%;
  bottom: 66.67%; /*White */
  background: #e6e6f0; /* Primary
*/
  border: 1px solid #dfdfe7;
  box-sizing: border-box;
  border-radius: 4px;
  height: 30px;
  width: 100px;
  color: #414149;
  text-align: center;
}

.trashActive {
  color: blue;
  background-color: white;
}
.ReqRectPending {
  position: relative;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%; /*
Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 2px rgba(10, 10, 10, 0.05));
  border-radius: 4px;
  height: auto;
  margin-bottom: 20px;
}

.requesttype-title {
  position: relative;
  padding-top: 25px;
  left: 3.57%;
  right: 83.93%;
  top: 20.1%;
  bottom: 60.08%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px; /* identical to box height, or 143% */
  display: flex;
  align-items: center; /* Dark Gray */
  color: #59596e;
}

.requesttype-subtitle {
  position: relative;
  left: 3.57%;
  right: 83.93%;
  top: 12.1%;
  bottom: 77.08%;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}

.fulfilment-title {
  position: absolute;
  padding-top: 35px;
  left: 25.68%;
  right: 83.1%;
  top: 0%;
  bottom: 85%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px; /* identical to box height, or 143% */
  display: flex;
  align-items: center; /* Dark Gray */
  color: #59596e;
}

.fulfilment-subtitle {
  position: absolute;
  padding-top: 27px;
  left: 25.68%;
  right: 23.1%;
  top: 10%;
  bottom: 65%;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}

.desc-title {
  padding-top: 50px;
  position: relative;
  left: 3.57%;
  right: 85.86%;
  top: 60%;
  bottom: 39.58%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px; /* identical to box height, or 143% */
  display: flex;
  align-items: center; /* Dark Gray */
  color: #59596e;
}

.desc-subtitle {
  position: relative;
  left: 3.57%;
  right: 85.86%;
  top: 70%;
  bottom: 39.58%;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 15px;
}

.reject-btn {
  position: absolute;
  left: 50.79%;
  right: 26.79%;
  top: 12.5%;
  bottom: 66.67%; /*White */
  background: #ffffff; /* Primary */
  border: 1px solid #1e1ecc;
  box-sizing: border-box;
  border-radius: 4px;
  height: 40px;
  width: 130px;
  color: #1e1ecc;
}
.approve-btn {
  position: absolute;
  left: 75%;
  right: 3.57%;
  top: 12.5%;
  bottom: 60.67%; /*Primary */
  background: #1e1ecc;
  border-radius: 4px;
  height: 40px;
  width: 130px;
  color: white;
}

.desc-subtitle {
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}

.dustbin {
  position: absolute;
  left: 93%;
  bottom: 5%;
  background: white;
  border: 0;
}

.material-icons {
  color: #dadada;
}

.material-icons:hover {
  color: #1e1ecc;
}
</style>

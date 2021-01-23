<template>
  <div class="parent">
    <div class="left">
      <div class="top">
        <div class="title">Case EF 2020-0104</div>
        <div class="alignRight">
          <button @click="showModal = true" class="blueButton">
            New <i class="fa fa-caret-down"></i>
          </button>
        </div>
      </div>

      <div class="body">
        <div class="details">
          <div class="sectionHeading">DETAILS</div>
          <div class="sectionBody">
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
          </div>
          <br />
          <div class="sectionHeading">REFERENCE</div>
          <div class="sectionBody">
            <ul>
              Name
            </ul>
          </div>
          <br />
        </div>
        <div class="requests">
          <div class="sectionHeading">REQUEST(S)</div>
          <div class="sectionBody">Body</div>
          <br />
        </div>
      </div>
    </div>

    <div class="right">
      <div class="sectionHeading">BENEFICIARY</div>
      <div class="sectionBody">
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
        <br />
      </div>
      <div class="sectionHeading">Notes</div>
      <div class="sectionBody"></div>
      <ul>
        Test
      </ul>
      <br />
    </div>
  </div>
</template>

<script>
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
    console.log(props) // { user: '' }

    // const fetchData = async () => {
    //   const res = await axios.get(
    //     'https://701425e7-05f7-4da8-9fb7-5a4bdc002cfc.mock.pstmn.io/v1/cases?with_paging=true&page=${page}&per_page=5&sort=caseId:desc&include_entities=beneficiary,referee,staff,request'
    //   )
    //   const fetchedData = res.data.results
    //   console.log('fetchedData', fetchedData)

    //   // For each data, transform it to the desired shape
    //   const transformedData = fetchedData.map((data) => {
    //     return {
    //       id: data.caseId,
    //       beneficiaryName: data.beneficiary.name ? data.beneficiaryName : '-',
    //       caseNumber: data.caseId ? data.caseId : '-',
    //       applicationDate: dayjs(data.appliedOn).format('DD/MM/YYYY'),
    //       poc: data.pointOfContact ? data.pointOfContact : '-',
    //       referenceName: data.referee.name ? data.referee.name : '-',
    //       organisation: data.referee.organisation
    //         ? data.referee.organisation
    //         : '-',
    //       lastUpdate: dayjs(data.updatedAt).format('DD/MM/YYYY'),
    //     }
    //   })
    //   // Assign it to Vue data
    //   table.fetchedItems = transformedData
    // }

    onMounted(async () => {
      console.log('Dashboard mounted!')
      //   fetchData()
    })

    return {}
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
  padding-right: 5%;
}

.right {
  width: 25%;
  background-color: lightblue;
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
  font-size: 16px;
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

.sectionHeading {
  font-size: 18px;
  text-align: left;
  font-weight: 400;
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 5%;
}

.sectionBody {
  font-size: 18px;
  text-align: center;
}
</style>

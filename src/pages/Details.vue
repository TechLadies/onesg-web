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
                  Rachel
                </ul>

                <ul>
                  21/08/2020
                </ul>

                <ul>
                  S$1
                </ul>

                <ul>
                  Yes
                </ul>
                <ul>
                  21/08/2021
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
              <div class="contentRight"></div>
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
            <div class="sectionBodyLeft">Fulfilment</div>
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
        <div class="contentRight"></div>
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
    //       pointOfContact: data.pointOfContact ? data.pointOfContact : '-',
    //       refereeName: data.referee.name ? data.referee.name : '-',
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

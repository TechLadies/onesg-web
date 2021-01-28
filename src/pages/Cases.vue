<template>
  <div>
    <div class="title">Cases</div>
    <div class="sub-title">Status</div>
    <StatusBar @clicked="selectActiveBtn" />
    <!--@clicked is not the same as @click, it is a custom callback function -->
    <div class="main">
      <!-- TODO: Temporarily replaced items prop to receive the data fetchedItems for example -->
      <bwc-table
        commands="reload,filter,del,export"
        :pagination="true"
        :sort="true"
        :page="page"
        :pageSize="pageSize"
        :pageSizeList="pageSizeList"
        :columns="columns"
        :items="table.fetchedItems"
        :total="total"
        @rowClick="rowClick"
        @checked="checked"
        @triggered="triggered"
        @cmd="cmd"
        @get-case.capture="caseDetails"
        style="--bwc-table-height: calc(100vh - 360px); --bwc-table-width: 100%"
        class="sticky-header sticky-column"
      >
      </bwc-table>
    </div>
  </div>
</template>

<script>
import { VITE_API_URL } from '/config.js'
// ref when we change value
import { onMounted, ref, reactive } from 'vue'
//axios vue
import axios from 'axios'
//formatting for date
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import StatusBar from '../components/StatusBar.vue'
const link = {
  ALL: `${VITE_API_URL}/v1/cases?with_paging=true&page=1&per_page=5&sort=caseNumber:desc&include_entities=beneficiary,referee,request`,
  PENDING: `${VITE_API_URL}/v1/cases?with_paging=true&page=1&per_page=5&sort=caseNumber:desc&include_entities=beneficiary,referee,request
&status=PENDING`,
  NEW: `${VITE_API_URL}/v1/cases?with_paging=true&page=1&per_page=5&sort=caseNumber:desc&include_entities=beneficiary,referee,request
&status=NEW`,
  REFERRED: `${VITE_API_URL}/v1/cases?with_paging=true&page=1&per_page=5&sort=caseNumber:desc&include_entities=beneficiary,referee,request
&status=REFFERED`,
  PROCESSING: `${VITE_API_URL}/v1/cases?with_paging=true&page=1&per_page=5&sort=caseNumber:desc&include_entities=beneficiary,referee,request
&status=PROCESSING`,
  CLOSED: `${VITE_API_URL}/v1/cases?with_paging=true&page=1&per_page=5&sort=caseNumber:desc&include_entities=beneficiary,referee,request
&status=CLOSED`,
}

// TODO: Temporarily moved this function here because couldn't get js export import files working.
// Should figure out and move api services to separate folder/file
export default {
  name: 'Cases',
  components: { StatusBar },
  // data: function () {
  //   const state = link.ALL
  //   return { state }
  // },

  setup(props, { emit }) {
    const router = useRouter()
    const page = ref(1)
    const pageSize = ref(10)
    const state = reactive({ url: link.ALL })
    const pageSizeList = [5, 10, 15]
    function selectActiveBtn(thisLink) {
      console.log(`thisLink`, thisLink)
      state.url = link[thisLink]
      // if use link.thisLink, it will look for the literal "this.thisLink" instead of this.ALL eg. 
      fetchData()
    }

    const columns = reactive([
      {
        label: 'Beneficiary Name',
        key: 'beneficiaryName',

        render: (val, key, row) =>
          `<a class='button' onclick='this.dispatchEvent(new CustomEvent("get-case",
{ detail: ${JSON.stringify({ val, key, row })} }))'>${val}</a>`,
      },
      {
        label: 'Case #',
        key: 'caseNumber',
        filter: true,
        sort: true,
      },
      {
        label: 'Applied on',
        key: 'applicationDate',
        filter: true,
      },
      {
        label: 'POC',
        key: 'poc',
        filter: true,
      },
      {
        label: 'Reference Name',
        key: 'referenceName',
        filter: true,
      },
      {
        label: 'Reference Organisation',
        key: 'organisation',
        filter: true,
      },
      {
        label: 'Last Updated by',
        key: 'lastUpdate',
        filter: true,
      },
    ])

    const table = reactive({
      fetchedItems: [],
    })
    const total = ref(30)
    const setItems = () => {
      const items = []
      const offset = (page.value - 1) * pageSize.value
      for (let i = 0; i < pageSize.value; i++) {
        if (!items[offset + i]) break
        items.push(items[offset + i])
      }
      // console.log(items)
      table.items = items
    }
    const rowClick = (e) => {
      console.log('rowClick', e.detail)
      // $router.push('/requests')
    }
    const checked = (e) => {
      console.log('checked', e.detail)
    }
    const triggered = (e) => {
      console.log('triggered', e.detail)
      page.value = e.detail.page
      pageSize.value = e.detail.pageSize
      console.log(page.value, pageSize.value)
      setItems()
    }
    const cmd = (e) => {
      console.log('cmd', e.detail)
    }

    const fetchData = async () => {
      console.log(`FetchingData`)
      const res = await axios.get(state.url, console.log(`url`, state.url))
      const fetchedData = res.data.results

      // For each data, transform it to the desired shape
      const transformedData = fetchedData.map((data) => {
        console.log(`typeof:referee`, typeof data.referee)
        console.log('is it null?', data.referee === null)
        if (data.referee === null) {
          return {
            id: data.caseId,
            beneficiaryName: data.beneficiary.name || '',
            caseNumber: data.caseNumber || '',
            applicationDate: dayjs(data.appliedOn).format('DD/MM/YYYY'),
            poc: data.pointOfContact || '',
            referenceName: '',
            organisation: '',
            lastUpdate: dayjs(data.updatedAt).format('DD/MM/YYYY'),
          }
        } else {
          return {
            id: data.caseId,
            beneficiaryName: data.beneficiary.name || '',
            caseNumber: data.caseNumber || '',
            applicationDate: dayjs(data.appliedOn).format('DD/MM/YYYY'),
            poc: data.pointOfContact || '',
            referenceName: data.referee.name || '',
            organisation: data.referee.organisation || '',
            lastUpdate: dayjs(data.updatedAt).format('DD/MM/YYYY'),
          }
        }
      })

      // Assign it to Vue data
      table.fetchedItems = transformedData
      total.value = res.data.total_records
      console.log('total records', total.value)
    }
    onMounted(async () => {
      console.log('Dashboard mounted!')
      fetchData()
    })
    const caseDetails = (e) => {
      router.push('/details/' + e.detail.row.caseNumber)
    }

    return {
      caseDetails,
      page,
      pageSize,
      pageSizeList,
      columns,
      table,
      total,
      rowClick,
      checked,
      triggered,
      cmd,
      selectActiveBtn,
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');

.main {
  margin-left: 6%;
  margin-right: 0;
  margin-top: 0;
  text-align: left;
  padding: 0px 0px 0px 20px;
}
.title {
  position: absolute;
  width: 67px;
  height: 27px;
  left: 112px;
  top: 32px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 27px; /* identical to box height, or 112% */
  display: flex;
  align-items: center; /* Black */
  color: #12121a;
}
.StatusBar {
  padding: 10px;
}
.sub-title {
  position: absolute;
  width: 41px;
  height: 20px;
  left: 112px;
  top: 89px; /* Roboto 14px Regular */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px; /* identical to box height, or 143% */
  color: #000000;
}
.all-btn {
  display: flex;
  left: 161px;
  position: absolute;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  width: 44px;
  height: 32px;
  top: 83px;
  z-index: 1;
  background: #ffffff;
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  border-radius: 290486px 0px 0px 290486px;
}
.new-btn {
  /* Auto
Layout */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  position: absolute;
  width: 56px;
  height: 32px;
  left: 204px;
  top: 83px;
  z-index: 1;
  background: #ffffff; /* Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  border-radius: 0px;
}
.pending-btn {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  position: absolute;
  width: 79px;
  height: 32px;
  left: 259px;
  top: 83px;
  z-index: 1;
  background: #ffffff; /* Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  border-radius: 0px;
}
.efc-btn {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  position: absolute;
  width: 128px;
  height: 32px;
  left: 337px;
  top: 83px;
  z-index: 1;
  background: #ffffff; /* Light
Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  border-radius: 0px;
}
.processing-btn {
  /* Auto Layout */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  position: absolute;
  width: 98px;
  height: 32px;
  left: 462px;
  top: 83px;
  z-index: 1;
  background: #ffffff; /* Light
Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  border-radius: 0px;
}
.closed-btn {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  position: absolute;
  width: 72px;
  height: 32px;
  top: 83px;
  z-index: 1;
  left: 559px;
  background: #ffffff; /* Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  border-radius: 0px 290486px 290486px 0px;
}
.active {
  background-color: #0e0e4d;
  color: #ffffff;
  top: 83px;
}
</style>

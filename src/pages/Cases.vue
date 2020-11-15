<template>
  <div class="main">
    <div class="title">Cases</div>
    <!-- TODO: Temporarily replaced items prop to receive the data fetchedItems for example -->
    <bwc-table
      :commands="(reload, filter)"
      :pagination="true"
      :sort="true"
      :page="page"
      :pageSize="pageSize"
      :pageSizeList="pageSizeList"
      :columns="columns"
      :items="fetchedItems"
      :total="total"
      @rowClick="rowClick"
      @triggered="triggered"
      @cmd="cmd"
      style="--bwc-table-height: calc(100vh - 360px); --bwc-table-width: 100%"
      class="sticky-header sticky-column"
    >
    </bwc-table>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import _ from 'lodash'
// TODO: Temporarily moved this function here because couldn't get js export import files working.
// Should figure out and move api services to separate folder/file
async function fetchRefereeData() {
  return axios
    .get(
      'https://701425e7-05f7-4da8-9fb7-5a4bdc002cfc.mock.pstmn.io/v1/referees'
    )
    .then((res) => res.data.results)
}
export default {
  setup() {
    const page = ref(1)
    const pageSize = ref(10)
    const pageSizeList = [5, 10, 15]
    const columns = reactive([
      {
        label: 'Beneficiary Name',
        key: 'beneficiaryName',
        filter: true,
      },
      {
        label: 'Case Number',
        key: 'caseNumber',
        filter: true,
      },
      {
        label: 'Application Date',
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
        label: 'Organisation',
        key: 'organisation',
        filter: true,
      },
      {
        label: 'Last Update',
        key: 'lastUpdate',
        filter: true,
      },
    ])
    const items = reactive([])
    for (let i = 1; i <= 100; i++) {
      const data = {
        id: i,
        beneficiaryName: 'name' + i,
        caseNumber: '1' + i,
        applicationDate: '21 Aug 2020',
        poc: 'Rachel',
        referenceName: 'Kristen',
        organisation: 'MCCY',
        lastUpdate: '25 Dec 2020',
      }
      for (let j = 1; j <= 8; j++) {
        data['key' + j] = 'val-' + i + '-' + j
      }
      items.push(data)
    }
    const total = ref(10)
    const rowClick = (e) => {
      console.log('rowClick', e.detail)
    }
    const triggered = (e) => {
      console.log('triggered', e.detail)
    }
    const cmd = (e) => {
      console.log('cmd', e.detail)
    }
    onMounted(async () => {
      console.log('Dashboard mounted!')
    })
    return {
      page,
      pageSize,
      pageSizeList,
      columns,
      items,
      total,
      rowClick,
      triggered,
      cmd,
    }
  },
  // fetch async data
  // data transformation using lodash map.
  // VueJs reference https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
  // Lodash _.map reference https://lodash.com/docs/4.17.15#map
  data() {
    return {
      fetchedItems: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const fetchedData = await fetchRefereeData()
      console.log('fetchedData', fetchedData)
      // For each data, transform it to the desired shape
      const transformedData = _.map(fetchedData, (data, key) => {
        return {
          id: data.refereeId,
          beneficiaryName: 'Rachel',
          caseNumber: key,
          applicationDate: _.get(data, 'applicationDate', '-'),
          poc: 'Kristen',
          referenceName: data.name,
          organisation: data.organisation,
          lastUpdate: data.refereeId,
        }
      })
      // Assign it to Vue data
      this.fetchedItems = transformedData
    },
  },
}
</script>

<style scoped>
.main {
  margin-left: 10%;
  margin-right: 10%;
  text-align: left;
  padding: 0px 0px 0px 20px;
}
.title {
  padding-bottom: 20px;
  position: relative;
  font-size: 24px;
  font-weight: 600;
}
</style>

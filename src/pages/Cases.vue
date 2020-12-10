<template>
  <div>
    <div class="title">Cases</div>
    <div class="main">
      <!-- TODO: Temporarily replaced items prop to receive the data fetchedItems for example -->
      <bwc-table
        commands="reload,filter,add,del"
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
        style="--bwc-table-height: calc(100vh - 360px); --bwc-table-width: 100%"
        class="sticky-header sticky-column"
      >
      </bwc-table>
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
  setup() {
    const page = ref(1)
    const pageSize = ref(10)
    const pageSizeList = [5, 10, 15]
    const columns = reactive([
      {
        label: 'Beneficiary Name',
        key: 'beneficiaryName',
        render: (val) =>
          `<a class="button" onclick="alert('${val}')">` + val + '</a>',
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
      const res = await axios.get(
        'https://701425e7-05f7-4da8-9fb7-5a4bdc002cfc.mock.pstmn.io/v1/cases?with_paging=true&page=${page}&per_page=5&sort=caseId:desc&include_entities=beneficiary,referee,staff,request'
      )
      const fetchedData = res.data.results
      console.log('fetchedData', fetchedData)

      // For each data, transform it to the desired shape
      const transformedData = fetchedData.map((data) => {
        return {
          id: data.caseId,
          beneficiaryName: data.beneficiary.name ? data.beneficiaryName : '-',
          caseNumber: data.caseId ? data.caseId : '-',
          applicationDate: dayjs(data.appliedOn).format('DD/MM/YYYY'),
          poc: data.pointOfContact ? data.pointOfContact : '-',
          referenceName: data.referee.name ? data.referee.name : '-',
          organisation: data.referee.organisation
            ? data.referee.organisation
            : '-',
          lastUpdate: dayjs(data.updatedAt).format('DD/MM/YYYY'),
        }
      })
      // Assign it to Vue data
      table.fetchedItems = transformedData
    }

    onMounted(async () => {
      console.log('Dashboard mounted!')
      fetchData()
    })

    return {
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
    }
  },
}
</script>

<style scoped>
.main {
  margin-left: 10%;
  margin-right: 20%;
  text-align: left;
  padding: 0px 0px 0px 20px;
}

.title {
  text-align: left;
  margin-left: 10%;
  margin-right: 10%;
  padding-bottom: 20px;
  position: relative;
  font-size: 24px;
  font-weight: 600;
}
</style>

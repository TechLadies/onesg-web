<template>
  <div class="main">
    <div class="title">Cases</div>
    <div class="navigation_buttons">
      Status
      <button @click="all" class="button is-dark is-outlined">All</button>
      <button @click="new_cases" class="button is-dark is-outlined">New</button>
      <button @click="pending" class="button is-dark is-outlined">
        Pending
      </button>
      <button @click="referred" class="button is-dark is-outlined">
        Referred to EFC
      </button>
      <button @click="processing" class="button is-dark is-outlined">
        Processing
      </button>
      <button @click="closed" class="button is-dark is-outlined">Closed</button>
    </div>
    <br />
    <o-table
      :mobileCards="false"
      :data="datax"
      backend-sorting
      :default-sort-direction="'asc'"
      :default-sort="[sortField, sortOrder]"
      @sort="onSort"
      paginated
      backend-pagination
      :perPage="10"
      :total="total"
      v-model:selected="selected"
      v-model:currentPage="currentPage"
      :paginationSimple="false"
      :paginationPosition="'bottom'"
      scrollable
      stickyHeader
      @select="selectRow"
      @page-change="pageChange"
    >
      <o-table-column label="#" width="40" sortable numeric v-slot="props">
        {{ props.row.id }}
      </o-table-column>
      <o-table-column
        field="beneficiary_name"
        label="Beneficiary Name"
        v-slot="props"
        sortable
      >
        {{ props.row.beneficiary_name }}
      </o-table-column>
      <o-table-column field="case_number" label="Case Number" v-slot="props">
        {{ props.row.case_number }}
      </o-table-column>
      <o-table-column
        field="date"
        label="Application Date"
        centered
        v-slot="props"
      >
        {{ new Date(props.row.date).toLocaleDateString() }}
      </o-table-column>
      <o-table-column label="P.O.C" v-slot="props">
        <span>
          {{ props.row.poc }}
        </span>
      </o-table-column>
      <o-table-column
        field="reference_name"
        label="Reference Name"
        v-slot="props"
        sortable
      >
        {{ props.row.reference_name }}
      </o-table-column>
      <o-table-column
        field="reference_org"
        label="Reference Organisation"
        v-slot="props"
        sortable
      >
        {{ props.row.reference_org }}
      </o-table-column>
      <o-table-column field="date" label="Last Update" centered v-slot="props">
        {{ new Date(props.row.last_update).toLocaleDateString() }}
      </o-table-column>
    </o-table>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'Case',
  data() {
    return {
      activeTab: undefined,
      showBooks: false,
      multiline: false,
      checkboxPosition: 'left',
      name: '',
      // dataTable: data,
      // isEmpty: false,
      // isBordered: false,
      // isStriped: false,
      // isNarrowed: false,
      // isHoverable: false,
      // isFocusable: false,
      // isLoading: false,
      // hasMobileCards: true,
    }
  },

  setup(props, context) {
    const selected = ref(null)
    const currentPage = ref(1)
    const total = ref(50)

    const sortField = ref('beneficiary_name')
    const sortOrder = ref('asc')

    const datax = [
      {
        id: 1,
        beneficiary_name: 'Jesse',
        case_number: '123456',
        date: '2016/10/15 13:43:27',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
      {
        id: 2,
        beneficiary_name: 'John',
        case_number: '123457',
        date: '2016/12/15 06:00:53',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
      {
        id: 3,
        beneficiary_name: 'Tina',
        case_number: '123458',
        date: '2016/04/26 06:26:28',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
      {
        id: 4,
        beneficiary_name: 'Clarence',
        case_number: '123459',
        date: '2016/04/10 10:28:46',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
      {
        id: 5,
        beneficiary_name: 'Anne',
        case_number: '123450',
        date: '2016/12/06 14:38:38',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
      {
        id: 6,
        beneficiary_name: 'Anne6',
        case_number: '111111',
        date: '2016/12/06 14:38:38',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
      {
        id: 7,
        beneficiary_name: 'Anne7',
        case_number: '111112',
        date: '2016/12/06 14:38:38',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
      {
        id: 8,
        beneficiary_name: 'Anne8',
        case_number: '111113',
        date: '2016/12/06 14:38:38',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
      {
        id: 9,
        beneficiary_name: 'Anne9',
        case_number: '111114',
        date: '2016/12/06 14:38:38',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
      {
        id: 10,
        beneficiary_name: 'Anne10',
        case_number: '111115',
        date: '2016/12/06 14:38:38',
        poc: 'Bryan',
        reference_name: 'Rachel',
        reference_org: 'abc',
        last_update: '2016/10/15 13:43:27',
      },
    ]

    const selectRow = (e) => {
      console.log('selected', e)
    }
    const pageChange = (e) => {
      console.log('page change', e)
      // call backend

      // update
      // total = total records (from backend) e.g. 100 rows total
      // datax = records from backend only 10 rows returned for the page
    }
    const onSort = () => {
      console.log('sort change')
    }

    return {
      datax,
      currentPage,
      total,
      selectRow,
      pageChange,
      onSort,
      selected,
      sortField,
      sortOrder,
    }
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

.page-flex h1,
.page-flex p {
  text-align: center;
}

.page-flex {
  display: flex;
  flex-direction: row;
  height: calc(100vh);
  justify-content: center;
  align-items: center;
}

.navigation_buttons {
  justify-content: center;
  top: 50%;
}
</style>

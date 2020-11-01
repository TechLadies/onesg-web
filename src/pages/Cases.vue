<template>
  <div class="page-flex">
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
      <o-table-column
        field="id"
        label="ID"
        width="40"
        sortable
        numeric
        v-slot="props"
      >
        {{ props.row.id }}
      </o-table-column>
      <o-table-column
        field="first_name"
        label="First Name"
        v-slot="props"
        sortable
      >
        {{ props.row.first_name }}
      </o-table-column>
      <o-table-column field="last_name" label="Last Name" v-slot="props">
        {{ props.row.last_name }}
      </o-table-column>
      <o-table-column field="date" label="Date" centered v-slot="props">
        {{ new Date(props.row.date).toLocaleDateString() }}
      </o-table-column>
      <o-table-column label="Gender" v-slot="props">
        <span>
          <o-icon
            pack="fas"
            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"
          >
          </o-icon>
          {{ props.row.gender }}
        </span>
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

    const sortField = ref('first_name')
    const sortOrder = ref('asc')

    const datax = [
      {
        id: 1,
        first_name: 'Jesse1',
        last_name: 'Simmons',
        date: '2016/10/15 13:43:27',
        gender: 'Male',
      },
      {
        id: 2,
        first_name: 'John',
        last_name: 'Jacobs',
        date: '2016/12/15 06:00:53',
        gender: 'Male',
      },
      {
        id: 3,
        first_name: 'Tina',
        last_name: 'Gilbert',
        date: '2016/04/26 06:26:28',
        gender: 'Female',
      },
      {
        id: 4,
        first_name: 'Clarence',
        last_name: 'Flores',
        date: '2016/04/10 10:28:46',
        gender: 'Male',
      },
      {
        id: 5,
        first_name: 'Anne',
        last_name: 'Lee',
        date: '2016/12/06 14:38:38',
        gender: 'Female',
      },
      {
        id: 6,
        first_name: 'Anne6',
        last_name: 'Lee',
        date: '2016/12/06 14:38:38',
        gender: 'Female',
      },
      {
        id: 7,
        first_name: 'Anne7',
        last_name: 'Lee',
        date: '2016/12/06 14:38:38',
        gender: 'Female',
      },
      {
        id: 8,
        first_name: 'Anne8',
        last_name: 'Lee',
        date: '2016/12/06 14:38:38',
        gender: 'Female',
      },
      {
        id: 9,
        first_name: 'Anne9',
        last_name: 'Lee',
        date: '2016/12/06 14:38:38',
        gender: 'Female',
      },
      {
        id: 10,
        first_name: 'Anne10',
        last_name: 'Lee',
        date: '2016/12/06 14:38:38',
        gender: 'Female',
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
</style>

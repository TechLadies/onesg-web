<template>
  <!--Pop UpModal -->
  <div>
    <div class="words" @click="trigger = true">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <span class="material-icons">add_box</span> Add
    </div>
    <div v-if="trigger == true">
      <AddRequests
        v-on:close-modal="trigger = $event"
        :item="parentData"
        :key="parentData"
        @re-fresh="reFresh"
      />
    </div>
    <div class="big-box" v-if="dataLoad">
      <div
        class="boxy"
        v-for="parentData in parentData"
        v-bind:key="parentData"
      >
        <Request :item="parentData" :key="refreshData" />
      </div>
    </div>
  </div>
</template>

<script>
import Request from './Request.vue'
import AddRequests from './addRequests.vue'
import { onMounted, ref } from 'vue'

export default {
  name: '#request-list',
  components: { AddRequests, Request },
  data: function () {
    return {
      trigger: false,
    }
  },
  props: {
    parentData: { type: Array, required: true },
    refreshData: { type: Object, required: true },
  },

  setup(props, { emit }) {
    console.log('props in requestlist', props)
    const dataLoad = ref(false)

    function reFresh(json) {
      console.log(`json in refresh`, json)
      emit('re-fresh', json)
    }

    onMounted(() => {
      dataLoad.value = true
    })
    console.log('props in requestlist after data load', props)

    return {
      dataLoad,
      reFresh,
    }
  },
}
</script>

<style scoped>
.words {
  position: absolute;
  width: 29px;
  height: 20px;
  left: 80%;
  bottom: 95%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px; /* identical to box
height, or 143% */
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.05em;
  text-transform: uppercase; /* Primary */
  color: #1e1ecc;
}

.add-btn {
  position: absolute;
  width: 29px;
  height: 20px;
  left: 1059px;
  top: 160px;

  /*Roboto 14px Regular CAPS */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  /* Primary */
  color: #1e1ecc;
  background: white;
}

.big-box {
  width: 100%;
  max-height: 400px;
  overflow-y: scroll;
  border: white;
  overflow-x: hidden;
}
</style>

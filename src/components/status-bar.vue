<template>
  <div>
    <div class="filter-bar">
      <div class="sub-title">Status</div>
      <button @click="allBtn" class="all-btn">All</button>
      <button @click="newBtn" class="new-btn">New</button>
      <button @click="pendingBtn" class="pending-btn">Pending</button>
      <button @click="efcBtn" class="efc-btn">Referred to EFC</button>
      <button @click="processingBtn" class="processing-btn">
        Referred to EFC
      </button>
      <button @click="closedBtn" class="closed-button">Closed</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'filter-bar',
  setup() {
    const store = useStore()
    const logout = (e) => {
      console.log(e)
      store.dispatch('doLogin', null)
    }

    return {
      logout,
    }
  },
}
</script>

<style scoped>
.filter-bar {
  display: flex;
}
.sub-title {
  text-align: left;
  margin-left: 10%;
  margin-right: 10%;
  padding-bottom: 20px;
  font-size: 14px;
}
.all-btn {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  position: absolute;
  width: 44px;
  height: 32px;
  left: 161px;
  top: 108px; /*Primary Dark */
  border: 1px solid#0E0E4D;
  color: #ffffff;
  box-sizing: border-box;
  border-radius: 290486px 0px 0px 290486px;
}
.new-btn {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  position: absolute;
  width: 56px;
  height: 32px;
  left: 204px;
  top: 108px; /* White */
  background: #ffffff; /* Light
Gray */
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
  top: 108px; /* White */
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
  width: 126px;
  height: 32px;
  left: 337px;
  top: 108px; /* White */
  background: #ffffff; /* Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  border-radius: 0px;
}
</style>

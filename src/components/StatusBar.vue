<template>
  <div>
    <div class="status-bar">
      <div class="sub-title">Status</div>
      <button
        class="all-btn"
        @click="activeBtn = 'all-btn-clicked'"
        :class="{ active: activeBtn === 'all-btn-clicked' }"
      >
        All
      </button>
      <button
        class="new-btn"
        @click="activeBtn = 'new-btn-clicked'"
        :class="{ active: activeBtn === 'new-btn-clicked' }"
      >
        New
      </button>
      <button
        class="pending-btn"
        @click="activeBtn = 'pending-btn-clicked'"
        :class="{ active: activeBtn === 'pending-btn-clicked' }"
      >
        Pending
      </button>
      <button
        class="efc-btn"
        @click="activeBtn = 'efc-btn-clicked'"
        :class="{ active: activeBtn === 'efc-btn-clicked' }"
      >
        Referred to EFC
      </button>
      <button
        class="processing-btn"
        @click="activeBtn = 'processing-btn-clicked'"
        :class="{ active: activeBtn === 'processing-btn-clicked' }"
      >
        Processing
      </button>
      <button
        class="closed-btn"
        @click="activeBtn = 'closed-btn-clicked'"
        :class="{ active: activeBtn === 'closed-btn-clicked' }"
      >
        Closed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusBar',
  data() {
    return {
      activeBtn: '',
    }
  },
}
</script>

<style>
.status-bar {
  padding: 10px;
}
.sub-title {
  position: absolute;
  width: 41px;
  height: 20px;
  left: 112px;
  top: 89px; /* Roboto
14px Regular */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px; /* identical to box height, or 143% */
  color: #000000;
}

.all-btn {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  position: absolute;
  width: 44px;
  height: 32px;
  left: 200px;
  top: 83px;
  /* Primary Dark */
  background: #ffffff;
  /* Primary Dark */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  border-radius: 290486px 0px 0px 290486px;
}
.new-btn {
  /* Auto Layout */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 6px 14px;
  position: absolute;
  width: 56px;
  height: 32px;
  left: 244px;
  top: 83px;
  /* White */
  background: #ffffff;
  /* Light Gray */
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
  left: 300px;
  top: 83px;
  /* White */
  background: #ffffff;
  /* Light Gray */
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
  width: 130px;
  height: 32px;
  left: 379px;
  top: 83px;
  /* White*/
  background: #ffffff;
  /* Light Gray */
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
  left: 509px;
  top: 83px; /* White */
  background: #ffffff; /* Light Gray */
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
  left: 607px;
  top: 83px;
  /* White*/
  background: #ffffff;
  /* Light Gray */
  border: 1px solid #e6e6f0;
  box-sizing: border-box;
  border-radius: 0px 290486px 290486px 0px;
}
.active {
  background-color: #0e0e4d;
  color: #ffffff;
}
</style>

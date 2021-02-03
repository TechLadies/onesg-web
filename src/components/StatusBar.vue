<template>
  <div>
    <div class="sub-title">Status</div>
    <div class="StatusBar">
      <button
        class="all-btn"
        id="all-btn-clicked"
        type="button"
        @click="toggleView('ALL')"
        v-on:click="clicked = 'ALL'"
        :class="{ active: clicked === 'ALL' }"
      >
        All
      </button>
      <button
        class="new-btn"
        id="new-btn-clicked"
        type="button"
        @click="toggleView('NEW')"
        v-on:click="clicked = 'NEW'"
        :class="{ active: clicked === 'NEW' }"
      >
        New
      </button>
      <button
        class="pending-btn"
        id="pending-btn-clicked"
        type="button"
        @click="toggleView('PENDING')"
        v-on:click="clicked = 'PENDING'"
        :class="{ active: clicked === 'PENDING' }"
      >
        Pending
      </button>
      <button
        class="efc-btn"
        id="referred-btn-clicked"
        type="button"
        @click="toggleView('REFERRED')"
        v-on:click="clicked = 'REFERRED'"
        :class="{ active: clicked === 'REFERRED' }"
      >
        Referred to EFC
      </button>
      <button
        class="processing-btn"
        id="processing-btn-clicked"
        type="button"
        @click="toggleView('PROCESSING')"
        v-on:click="clicked = 'PROCESSING'"
        :class="{ active: clicked === 'PROCESSING' }"
      >
        Processing
      </button>
      <button
        class="closed-btn"
        id="closed-btn-clicked"
        type="button"
        @click="toggleView('CLOSED')"
        v-on:click="clicked = 'CLOSED'"
        :class="{ active: clicked === 'CLOSED' }"
      >
        Closed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: '#status-bar',
  data: function () {
    return {
      clicked: '',
    }
  },

  setup(props, { emit }) {
    function toggleView(activeBtn) {
      console.log(`activeBtn`, activeBtn)
      emit('clicked', activeBtn)
    }
    return { toggleView }
    // what i am returning the the key which is the object that return the function const returnObject = { toggleView: function () { //. somefunction } }
  },
}
</script>

<style>
.StatusBar {
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
  /* Auto Layout */
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
  background: #ffffff; /* Light Gray */
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

<template>
  <div>
    <div class="main">
      <div class="title">New Case</div>
      <div v-if="stage === 0">
        <Beneficiary />
      </div>
      <div v-if="stage === 1">
        <Reference />
      </div>
      <div v-if="stage === 2">
        <CaseDetails />
      </div>

      <div class="arrow">
        <button v-if="stage === 0" class="button" disabled>
          <span class="icon is-small">
            <i class="fa fa-arrow-left"></i>
          </span>
        </button>
        <button v-else @click="stage--" class="button is-dark is-outlined">
          <span class="icon is-small">
            <i class="fa fa-arrow-left"></i>
          </span>
        </button>

        <button class="clear"></button>

        <button v-if="stage === 2" class="button" disabled>
          <span class="icon is-small">
            <i class="fa fa-arrow-right"></i>
          </span>
        </button>
        <button class="clear"></button>

        <button
          v-if="stage === 2"
          @click="log"
          class="button is-dark is-outlined"
        >
          Create New
        </button>

        <button v-else @click="stage++" class="button is-dark is-outlined">
          <span class="icon is-small">
            <i class="fa fa-arrow-right"></i>
          </span>
        </button>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import Beneficiary from '../components/Beneficiary.vue'
import Reference from '../components/Reference.vue'
import CaseDetails from '../components/CaseDetails.vue'

export default {
  name: 'Secure',
  components: {
    Beneficiary,
    Reference,
    CaseDetails,
  },
  methods: {
    log: function () {
      console.log('hello')
    },
  },
  setup() {
    const stage = ref(0)
    const store = useStore()
    const logout = (e) => {
      console.log(e)
      store.dispatch('doLogin', null)
    }
    onMounted(async () => {
      const res = await fetch('https://randomuser.me/api/')
      const data = await res.json()
      console.log(data)
      console.log('Secure is mounted!')
    })
    return {
      logout,
      stage,
    }
  },
}
</script>

<style>
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

.arrow {
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 30px;
  padding-bottom: 50px;
}

.clear {
  visibility: hidden;
}
</style>

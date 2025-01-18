<template>
  <div class="cs-index-container">
    <cancelSubHomeComponent :currentBilling='currentBilling' v-if="$route.query.type === 'cs-home'"/>
    <cancelSubPauseComponent :currentBilling='currentBilling' v-if="$route.query.type === 'cs-pause'"/>
    <cancelSubCancelStepOneComponent :currentBilling='currentBilling' v-if="$route.query.type === 'cs-cancel' && $route.query.page == 1"/>
    <cancelSubCancelStepTwoComponent :currentBilling='currentBilling' v-if="$route.query.type === 'cs-cancel' && $route.query.page == 2"/>
    <cancelSubOfferStepOneComponent :currentBilling='currentBilling' v-if="$route.query.type === 'cs-offer' && $route.query.page == 1"/>
    <!-- <cancelSubPopupsComponent v-if="$route.query.type === 'cs-popup'"/> -->
  </div>
</template>
<script>
import cancelSubHomeComponent from './cancelSubHome'
import cancelSubPauseComponent from './cancelSubPause'
import cancelSubCancelStepOneComponent from './cancelSubCancelStepOne'
import cancelSubCancelStepTwoComponent from './cancelSubCancelStepTwo'
import cancelSubOfferStepOneComponent from './cancelSubOfferStepOne'
import cancelSubPopupsComponent from './cancelSubPopups'
import {mapActions,mapState} from 'vuex';
export default {
  components: {
    cancelSubHomeComponent,
    cancelSubPauseComponent,
    cancelSubCancelStepOneComponent,
    cancelSubCancelStepTwoComponent,
    cancelSubOfferStepOneComponent,
    cancelSubPopupsComponent,
  },
  computed: {
    ...mapState({
      currentBilling: state => state.Billing.currentSubscription,
    })
  },
  mounted(){
  },
}
</script>
<style lang="scss">
  .cs-index-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #FBF3F1;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    a {
      display: contents;
      text-decoration: none;
    }
  }
</style>

<template>
  <div class="cs-cancel-step-one-container">
    <svg class="text-bg" width="515" height="182" viewBox="0 0 515 182" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M167.5 -1.23978e-05V182H132.92L42.18 71.5V182H0.580001V-1.23978e-05H35.42L125.9 110.5V-1.23978e-05H167.5ZM344.72 112.58C344.72 113.1 344.46 116.74 343.94 123.5H238.12C240.027 132.167 244.534 139.013 251.64 144.04C258.747 149.067 267.587 151.58 278.16 151.58C285.44 151.58 291.854 150.54 297.4 148.46C303.12 146.207 308.407 142.74 313.26 138.06L334.84 161.46C321.667 176.54 302.427 184.08 277.12 184.08C261.347 184.08 247.394 181.047 235.26 174.98C223.127 168.74 213.767 160.16 207.18 149.24C200.594 138.32 197.3 125.927 197.3 112.06C197.3 98.3667 200.507 86.06 206.92 75.14C213.507 64.0467 222.434 55.4667 233.7 49.4C245.14 43.16 257.88 40.04 271.92 40.04C285.614 40.04 298.007 42.9867 309.1 48.88C320.194 54.7733 328.86 63.2667 335.1 74.36C341.514 85.28 344.72 98.02 344.72 112.58ZM272.18 70.72C262.994 70.72 255.28 73.32 249.04 78.52C242.8 83.72 238.987 90.8267 237.6 99.84H306.5C305.114 91 301.3 83.98 295.06 78.78C288.82 73.4067 281.194 70.72 272.18 70.72ZM438.284 184.08C423.551 184.08 410.291 181.047 398.504 174.98C386.891 168.74 377.791 160.16 371.204 149.24C364.617 138.32 361.324 125.927 361.324 112.06C361.324 98.1933 364.617 85.8 371.204 74.88C377.791 63.96 386.891 55.4667 398.504 49.4C410.291 43.16 423.551 40.04 438.284 40.04C453.017 40.04 466.191 43.16 477.804 49.4C489.417 55.4667 498.517 63.96 505.104 74.88C511.691 85.8 514.984 98.1933 514.984 112.06C514.984 125.927 511.691 138.32 505.104 149.24C498.517 160.16 489.417 168.74 477.804 174.98C466.191 181.047 453.017 184.08 438.284 184.08ZM438.284 150.8C448.684 150.8 457.177 147.333 463.764 140.4C470.524 133.293 473.904 123.847 473.904 112.06C473.904 100.273 470.524 90.9133 463.764 83.98C457.177 76.8733 448.684 73.32 438.284 73.32C427.884 73.32 419.304 76.8733 412.544 83.98C405.784 90.9133 402.404 100.273 402.404 112.06C402.404 123.847 405.784 133.293 412.544 140.4C419.304 147.333 427.884 150.8 438.284 150.8Z" fill="#3F3F3F" fill-opacity="0.1"/>
    </svg>
    <div class="left-container">
      <p>
        <span>Please tell us</span>
        <span>why you want</span>
        <span>to leave?</span>
      </p>
    </div>
    <div class="right-container">
      <div class="options">
        <!-- <nuxt-link :to="{query: {flow:'cancel-sub',type:'cs-offer', page: 1, option: index}}" v-for="(item,index) in optionsData" :key="index"> -->
          <span class="options-item" @click="onSelectOption(index)" v-for="(item,index) in (currentBilling && currentBilling.status && currentBilling.status === 'in_trial') ? optionsDataForPaywall: optionsData" :key="index">
            <p>{{item}}</p>
          </span>
        <!-- </nuxt-link> -->
      </div>
    </div>
    <ToBackComponent/>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import ToBackComponent from './toBack';
export default {
  components: {
    ToBackComponent
  },
  props : {
    currentBilling : Object
  },
  data() {
    return {
      optionsData: [
        "01. It’s too expensive",
        "02. I don’t use it enough",
        "03. Business is affected",
        "04. Product related issue"
      ],
      optionsDataForPaywall: [
        "01. Feature limitation",
        "02. I’m using some other product",
        "03. I don’t have the need",
        "04. Product related issue"
      ]
    }
  },
  computed:{
    ...mapState({
      cancelSubState: state => state.Subscriptions.cancelSubState,
      neoLitePlanDetails: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return (item.activeStatus == "future" || item.activeStatus == "active") && item.type == "package" && (item.package.id === 'neo-light-yearly' || item.package.id === 'neo-light-monthly');
      }),
      fetchAccountInfo: state => state.Subscriptions.fetchAccountInfo,
      user: state => state.User.user,
      isLPUPlan: state => state.Billing.isLPUPlan
    })
  },
  mounted(){
    if(this.currentBilling && this.currentBilling.subscription){
      this.cancelSubPlanOffersAPI({subId: this.currentBilling.subscription})
    }
  },
  methods: {
     ...mapActions({
      cancelSubPlanOffersAPI: 'Subscriptions/cancelSubPlanOffersAPI',
      cancelSubOptionSelected: 'Subscriptions/cancelSubOptionSelected'
    }),
    onSelectOption(_index){
      let options =[];
      if(this.cancelSubState && this.cancelSubState.discountOfferApi && this.cancelSubState.discountOfferApi.isPaywallFreeTrialPlanApplied){
        options = [
        'Reason_feature limitation',
        "Reason_I’m using some other product",
        "Reason_I don’t have the need",
        "Reason_product related issue"
        ]
      }else{
        options = [
          'Reason_too expensive',
          "Reason_Don't use it enough",
          "Reason_business is affected",
          "Reason_product related issue"
        ]
      }

      // this.$store.commit('setCancellationState', {cancelSubOption: _index});
      if (window.analytics) {
        window.analytics.track(options[_index], {
          name: options[_index],
          flow: "Cancellation"
        },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
      }
      this.cancelSubOptionSelected({cancelSubOption: _index})

      if((this.isLPUPlan) || (this.neoLitePlanDetails && this.neoLitePlanDetails.length > 0)||
        (this.cancelSubState && this.cancelSubState.discountOfferApi && this.cancelSubState.discountOfferApi.isNeoLiteApplied) ||
        (this.currentBilling && this.currentBilling.analyticsData && this.currentBilling.analyticsData.analyticsStatus && this.currentBilling.analyticsData.analyticsStatus === 'paywall_intrial') ||
        (this.fetchAccountInfo && this.fetchAccountInfo.hasOwnProperty('disableCancellationFlow') && this.fetchAccountInfo.disableCancellationFlow) ||
        (this.fetchAccountInfo && this.fetchAccountInfo.typeform && this.fetchAccountInfo.typeform.cancelPage && this.fetchAccountInfo.typeform.cancelPage.typeformShown)
        ){
        this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-cancel', page: 2,option:_index}})
      }else {
        this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-offer', page: 1,option:_index}})
      }
      return
      // if(this.currentBilling && this.currentBilling.subscription){
      //   this.cancelSubPlanOffersAPI({subId: this.currentBilling.subscription}).then((apiResponse)=> {
      //     if(apiResponse && apiResponse.resume_date){}
      //     // this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-pause', page: 1,option:_index}})
      //   }).catch((apiError)=> {
      //     if(apiError && apiError.statusCode && apiError.statusCode == 500)
      //     {
      //       this.message.value = apiError.error;
      //       this.message.global = true;
      //       this.message.error = true;
      //       setTimeout(() => {
      //         this.message.value = '';
      //         this.message.global = false;
      //         this.message.error = false;
      //       }, 5000);
      //     }
      //     console.log('Api Failed', apiError)
      //   })
      // }
    }
  },
}
</script>

<style lang="scss">
  .cs-cancel-step-one-container {
    width: 100%;
    height: 100%;
    // padding: 15rem;
    padding-right: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    p {
      font-family: Montserrat;
      color: #3A393A;
      margin: 0;
    }
    .text-bg {
      width: 35rem;
      position: absolute;
      bottom: -2rem;
      left: 0;
    }
    .left-container{
      display: grid;
      place-content: center;
      p {
        span {
          font-weight: 900;
          font-size: 4rem;
          line-height: 4.75rem;
          &::after{
            content: '\A';
            white-space: pre;
          }
        }
      }
    }
    .right-container {
      display: grid;
      .options {
        place-self: center;
        display: grid;
        row-gap: 1rem;
        width: 100%;
        margin-left: 10rem;
        .options-item {
          background: #787878 !important;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
          padding-left: 1rem;
          p {
            &:hover {
              text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            }
            position: relative;
            background: #F8E8E5;
            padding: 1.4rem 1.2rem;
            font-weight: 600;
            font-size: 2.15rem;
            line-height: 2.4rem;
            color: #787878;
            cursor: pointer;
            z-index: 1;
            // padding: 0.4375rem 1.25rem;
            @include background-animate(#787878, #FBF3F1);
          }
        }
      }
    }
  }
</style>

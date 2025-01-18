<template>
  <div class="cs-home-container">
    <div class="left-container">
      <img src="~assets/images/cancelsub/cshome.png" alt="">
      <div class="left-text" v-if="cancelSubState && cancelSubState.analytics">
        <p class="lt-col-1">
          <!-- <span>You still</span> -->
          <span>{{ $t("cancelSubIndex.unusedCredits") }}</span>
          <!-- <span>credits</span> -->
        </p>
        <div class="credits-models">
          <p class="lt-col-2"><span>{{cancelSubState.analytics.rendersCredit}}</span><span>{{ $t("cancelSubIndex.renderCredits[0]") }}</span><span>{{ $t("cancelSubIndex.renderCredits[1]") }}</span></p>
          <p class="lt-col-3"><span>{{cancelSubState.analytics.modelsCredit ?  cancelSubState.analytics.modelsCredit : 0}}</span><span>{{ $t("cancelSubIndex.modelCredits[0]") }}</span><span>{{ $t("cancelSubIndex.modelCredits[1]") }}</span></p>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div class="heading">
        <p><span>{{ $t("cancelSubIndex.whyCancelPauseText[0]") }}</span><span>{{ $t("cancelSubIndex.whyCancelPauseText[1]") }}</span></p>
        <p>{{ $t("cancelSubIndex.noChargeOnPause") }}</p>
      </div>
      <p class="sub-heading" v-if="cancelSubState && cancelSubState.analytics && cancelSubState.analytics.rendersCredit > 0">
        <span>{{ $t("cancelSubIndex.whyCancelPauseSubText[0]") }}</span>
        <span>{{ $t("cancelSubIndex.whyCancelPauseSubText[1]") }}</span>
        <span>{{ $t("cancelSubIndex.whyCancelPauseSubText[2]") }} <span>60 {{ $t("cancelSubIndex.whyCancelPauseSubText[3]") }}</span></span>
      </p>
      <p class="sub-heading" v-else>
        <span>20 {{ $t("cancelSubIndex.whyCancelPauseSubText2[0]") }}</span>
        <span>{{ $t("cancelSubIndex.whyCancelPauseSubText2[1]") }}</span>
        <span>{{ $t("cancelSubIndex.whyCancelPauseSubText2[2]") }}  <span>60 {{ $t("cancelSubIndex.whyCancelPauseSubText2[3]") }}</span></span>
      </p>
      <div class="btn-container">
        <span>
          <!-- <nuxt-link :to="{query: {flow:'cancel-sub',type:'cs-pause', page: 1}}"> -->
            <button @click="futureCheck()">{{ $t("buttonText.pauseMembership") }}</button>
          <!-- </nuxt-link> -->
          <p>{{ $t("cancelSubIndex.getFreeAccess2") }}</p>
        </span>
        <!-- <nuxt-link :to="{query: {flow:'cancel-sub',type:'cs-cancel', page: 1}}"> -->
          <p class="underline-text cursor-pointer" @click="handleCancelMySubscriptionClick">{{ $t("cancelSubIndex.istillWantToCancelText") }}</p>
          <!-- </nuxt-link> -->
      </div>
      <p class="cancel-disclaimer-for-credits">{{ $t("cancelSubIndex.cancelDisclaimerForCreditsText") }}</p>
    </div>
     <!-- DIACTIVATE ALERT -->
    <div class="upgrade-success-container deactivate-alert-container popup-div" :class="isDeactivateAlert ? 'showPopUp': ''">
      <div class="popup-container">
        <div class="close-x" @click="isNeoLitePopup = false; isDeactivateAlert = false">
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7002 0.674072L1.2002 12.0741" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M12.8004 12.2742L1.40039 0.77417" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="top-container" v-if="currentBilling && currentBilling.displayContext">
          <div class="content">
            <p class="heading">{{ $t("cancelSubIndex.doYouWishToContinue") }}</p>
            <div class="sub-heading" v-if="isPauseConfirm">
              <p>
                <span>{{ $t("cancelSubIndex.pauseCurrentBillingText[0]") }} <b>{{currentBilling.displayContext.packageName}} - {{currentBilling.billing === 1? $t("cancelSubIndex.pauseCurrentBillingText[1]") : currentBilling.billing === 3 ?  $t("cancelSubIndex.pauseCurrentBillingText[2]"):  $t("cancelSubIndex.pauseCurrentBillingText[3]") }}</b> {{ $t("cancelSubIndex.pauseCurrentBillingText[4]") }}</span>
                <span>{{ $t("cancelSubIndex.pauseCurrentBillingText[5]") }} 60 {{ $t("cancelSubIndex.pauseCurrentBillingText[6]") }}</span>
              </p>
            </div>
            <div class="sub-heading" v-else>
              <p>
                <span>{{ $t("cancelSubIndex.ifNoteOnPause") }}</span>
                <span>{{ $t("cancelSubIndex.pauseCurrentBillingText[0]") }} <b>{{currentBilling.displayContext.packageName}} - {{currentBilling.billing === 1?  $t("cancelSubIndex.pauseCurrentBillingText[1]") : currentBilling.billing === 3 ?  $t("cancelSubIndex.pauseCurrentBillingText[2]") :  $t("cancelSubIndex.pauseCurrentBillingText[3]") }}</b> {{ $t("cancelSubIndex.pauseCurrentBillingText[4]") }} {{ $t("cancelSubIndex.pauseCurrentBillingText[5]") }} 60 {{ $t("cancelSubIndex.pauseCurrentBillingText[6]") }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bottom-container cs-cancel-bottom">
          <img class="bg-pattern" src="~assets/images/mobile/bg.png">
          <svg width="350" height="250" viewBox="0 0 358 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M116.5 -8.58307e-06V126H92.56L29.74 49.5V126H0.940001V-8.58307e-06H25.06L87.7 76.5V-8.58307e-06H116.5ZM239.191 77.94C239.191 78.3 239.011 80.82 238.651 85.5H165.391C166.711 91.5 169.831 96.24 174.751 99.72C179.671 103.2 185.791 104.94 193.111 104.94C198.151 104.94 202.591 104.22 206.431 102.78C210.391 101.22 214.051 98.82 217.411 95.58L232.351 111.78C223.231 122.22 209.911 127.44 192.391 127.44C181.471 127.44 171.811 125.34 163.411 121.14C155.011 116.82 148.531 110.88 143.971 103.32C139.411 95.76 137.131 87.18 137.131 77.58C137.131 68.1 139.351 59.58 143.791 52.02C148.351 44.34 154.531 38.4 162.331 34.2C170.251 29.88 179.071 27.72 188.791 27.72C198.271 27.72 206.851 29.76 214.531 33.84C222.211 37.92 228.211 43.8 232.531 51.48C236.971 59.04 239.191 67.86 239.191 77.94ZM188.971 48.96C182.611 48.96 177.271 50.76 172.951 54.36C168.631 57.96 165.991 62.88 165.031 69.12H212.731C211.771 63 209.131 58.14 204.811 54.54C200.491 50.82 195.211 48.96 188.971 48.96ZM303.966 127.44C293.766 127.44 284.586 125.34 276.426 121.14C268.386 116.82 262.086 110.88 257.526 103.32C252.966 95.76 250.686 87.18 250.686 77.58C250.686 67.98 252.966 59.4 257.526 51.84C262.086 44.28 268.386 38.4 276.426 34.2C284.586 29.88 293.766 27.72 303.966 27.72C314.166 27.72 323.286 29.88 331.326 34.2C339.366 38.4 345.666 44.28 350.226 51.84C354.786 59.4 357.066 67.98 357.066 77.58C357.066 87.18 354.786 95.76 350.226 103.32C345.666 110.88 339.366 116.82 331.326 121.14C323.286 125.34 314.166 127.44 303.966 127.44ZM303.966 104.4C311.166 104.4 317.046 102 321.606 97.2C326.286 92.28 328.626 85.74 328.626 77.58C328.626 69.42 326.286 62.94 321.606 58.14C317.046 53.22 311.166 50.76 303.966 50.76C296.766 50.76 290.826 53.22 286.146 58.14C281.466 62.94 279.126 69.42 279.126 77.58C279.126 85.74 281.466 92.28 286.146 97.2C290.826 102 296.766 104.4 303.966 104.4Z" fill="#3F3F3F" fill-opacity="0.1"/>
          </svg>
          <div class="btn">
            <!-- <p>We will keep you updated with all the cool stuff!</p> -->
            <button @click="onClickPause()">Continue</button>
          </div>
        </div>
      </div>
    </div>
    <BlockingLoadingComponent/>
    <ToBackComponent/>
    <MessageComponent :changeRight="message" />
    <DunningBlockingComponent/>
    <cancelPageTypeForm v-if="showcancelPageTypeForm"
    :typeformConfiguration="cancelPageTypeFormData"
    :fetchAccountInfo="fetchAccountInfo"
    :currentSubscription="currentBilling" />
  </div>
</template>
<script>
import ToBackComponent from './toBack';
import BlockingLoadingComponent from '../blockingLoading';
import DunningBlockingComponent from '../popups/dunningBlockingPaywall';
import cancelPageTypeForm from "./cancelPageTypeForm.vue";
import {mapState, mapActions} from 'vuex';

export default {
  components: {
    ToBackComponent,
    BlockingLoadingComponent,
    DunningBlockingComponent,
    cancelPageTypeForm
  },
  props : {
    currentBilling : Object
  },
  data() {
    return {
        message: {
        value: "",
        error: false,
        global: false
      },
      isDeactivateAlert:false,
      isPauseConfirm: false,
      showcancelPageTypeForm: false,
      cancelPageTypeFormData: {
        showTypeform : true,
        appearAfterMillSec : 1,
        formId : ''
      }
    }
  },
  mounted(){
  },
  computed: {
    ...mapState({
      pausedStatusObj: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "current" && item.chargebee && item.chargebee.status && item.chargebee.status === 'paused';
      }),
      future: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "future" && item.type == "package";
      }),
      user: state => state.User.user,
      cancelSubState: state => state.Subscriptions.cancelSubState,
      fetchAccountInfo: state => state.Subscriptions.fetchAccountInfo,
      publicConfiguration: state => state.Subscriptions.publicConfiguration,
    })
  },
  methods: {
    ...mapActions({
      cancelSubPauseAPI: 'Subscriptions/cancelSubPauseAPI',
      addTwentyRendersAPI: 'Subscriptions/addTwentyRendersAPI',
    }),
    futureCheck(){
      if(this.fetchAccountInfo && this.fetchAccountInfo.invoice && this.fetchAccountInfo.invoice.billing_status){
        if(this.fetchAccountInfo.invoice.billing_status === 'in_progress'){
          this.$root.$emit('open-dunning-paywall', true)
          return;
        }
      }
      // this.isOfferClicked = true;
      this.isDeactivateAlert = true;
      if(this.future && this.future.length > 0){
        this.isPauseConfirm = false;
      }else this.isPauseConfirm = true;
    },
    onClickPause(){
      this.eventSend('Pause_sub_confirmed','Pause subscription')
      if(this.currentBilling && this.currentBilling.subscription){
        this.$root.$emit('show-blocking-loading', true)
        this.cancelSubPauseAPI({subId: this.currentBilling.subscription, accountId: this.user.accountId}).then((apiResponse)=> {
          if(apiResponse && apiResponse.resume_date){
            if(this.cancelSubState && this.cancelSubState.analytics && this.cancelSubState.analytics.rendersCredit <= 0){
              this.addTwentyRendersAPI();
            }
            this.isDeactivateAlert = false;
            this.$root.$emit('show-blocking-loading', false)
            this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-pause', page: 1}})
          }
        }).catch((apiError)=> {
          this.$root.$emit('show-blocking-loading', false)
          if(apiError && apiError.statusCode && apiError.statusCode == 500)
          {
            this.message.value = apiError.error;
            this.message.global = true;
            this.message.error = true;
            setTimeout(() => {
              this.message.value = '';
              this.message.global = false;
              this.message.error = false;
            }, 5000);
          }
          console.log('Api Failed', apiError)
        })
      }
    },
    eventSend(label,name){
      if (window.analytics) {
        window.analytics.track(label, {
          name: name,
          flow: "Cancellation"
        },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
      }
    },
    handleCancelMySubscriptionClick(){
      console.log("handleCancelMySubscriptionClick")
      this.eventSend('Cance_my_sub','Cancel subscription')

      let P1PlanList = ['neo-basic-quarterly-inr','neo-standard-monthly-inr','neo-basic-monthly-inr','neo-pro-quarterly','neo-premium-quarterly','neo-premium-quarterly-cad','neo-pro-monthly','foyr-premium-quarterly-stg','neo-standard-quarterly','neo-standard-quarterly-cad','neo-premium-monthly','neo-premium-monthly-cad','neo-basic-quarterly','neo-basic-quarterly-cad','foyr-premium-monthly-stg','neo-standard-monthly','neo-standard-monthly-cad','foyr-basic-quarterly-stg','neo-basic-monthly','foyr-standard-monthly','neo-basic-monthly-cad','foyr-basic-monthly-stg', 'neo-premium-monthly-inr',  'neo-basic-monthly-inr-low', 'neo-standard-monthly-inr-low', 'neo-premium-monthly-inr-low' ]
      let P2PlanList = ['neo-premium-yearly-inr','neo-standard-yearly-inr','neo-basic-yearly-inr','neo-pro-yearly','neo-pro-half-yearly','neo-premium-yearly-cad---1','neo-premium-yearly','neo-premium-half-yearly','foyr-premium-yearly-stg','neo-standard-half-yearly','neo-standard-yearly','neo-standard-yearly-cad','neo-basic-yearly','neo-basic-yearly-cad','foyr-standard-yearly-stg','foyr-basic-yearly-stg','neo-basic-half-yearly', 'neo-basic-yearly-inr-low', 'neo-standard-yearly-inr-low', 'neo-premium-yearly-inr-low']
      let P3PlanList = ['neo-light-yearly-inr','neo-standard-lite-monthly-inr','neo-light-monthly-inr','foyr-neo-lite-monthly-INR','neo-standard-lite-yearly-stg','neo-standard-lite-yearly-cad','neo-light-yearly','neo-light-yearly-cad','neo-lite-yearly','neo-premium-basic-plan-staging','neo-retention-monthly-cad','neo-retention-monthly-stg','neo-standard-lite-monthly-cad','neo-standard-annual-plan','neo-light-monthly','neo-light-monthly-cad','neo-lite-monthly','neo-lite-monthly-cad','foyr-neo-lite-monthly','foyr-neo-lite-monthly-CAD','neo-ultra-lite-monthly']

        // console.log("this.currentBilling.name", this.currentBilling.name)
         if(
         this.currentBilling &&
         this.currentBilling.chargebeeSubscriptionData &&
         this.currentBilling.chargebeeSubscriptionData.plan_id &&
         P1PlanList.includes(this.currentBilling.chargebeeSubscriptionData.plan_id)
        ){

            this.showcancelPageTypeForm = true;
            // this.cancelPageTypeFormData.formId = "DJ6huWCi"
            this.cancelPageTypeFormData.formId = "DwA8YLbU"
            setTimeout(()=>{this.showcancelPageTypeForm = false}, 2000)
            return;

        }
         if(
         this.currentBilling &&
         this.currentBilling.chargebeeSubscriptionData &&
         this.currentBilling.chargebeeSubscriptionData.plan_id &&
         P2PlanList.includes(this.currentBilling.chargebeeSubscriptionData.plan_id)
        ){

            this.showcancelPageTypeForm = true;
            // this.cancelPageTypeFormData.formId = "DJ6huWCi"
            this.cancelPageTypeFormData.formId = "DJ6huWCi"
            setTimeout(()=>{this.showcancelPageTypeForm = false}, 2000)
            return;

        }

        this.showcancelPageTypeForm = true;
        this.cancelPageTypeFormData.formId = "xPwBybxL"
        setTimeout(()=>{this.showcancelPageTypeForm = false}, 2000)
        return;




      if(this.publicConfiguration.typeform.cancelPage){
        if(
         this.currentBilling &&
         this.currentBilling.invoice.period == 1 &&
         this.currentBilling.status != "in_trial" &&
         this.user.accountExtraInfo &&
         this.user.accountExtraInfo.userCategory == "Interior Designer" &&
         this.user.ipInfo.country == "US" &&
         this.publicConfiguration.typeform.cancelPage
        ){

          let isCancelTypeformShown = this.fetchAccountInfo &&
                                      this.fetchAccountInfo.typeform &&
                                      this.fetchAccountInfo.typeform.cancelPage &&
                                      this.fetchAccountInfo.typeform.cancelPage.typeformShown
                                     ? true : false
          // if cancellation typeform is already shown - don't show it again
          if(!isCancelTypeformShown){
            this.showcancelPageTypeForm = true;
            setTimeout(()=>{this.showcancelPageTypeForm = false}, 2000)
            return;

          }

        }else{
           this.$router.push({query: {flow:'cancel-sub',type:'cs-cancel', page: 1}});
        }

      }else{
        this.$router.push({query: {flow:'cancel-sub',type:'cs-cancel', page: 1}});
      }


    }

  },
}
</script>

<style lang="scss">
  .cs-home-container {
    width: 100%;
    height: 100%;
    display: grid;
    // padding: 10rem 0 10rem 20rem;
    // padding-right: 0;
    grid-template-columns: max-content max-content;
    align-content: center;
    justify-content: space-evenly;
    // column-gap: 12rem;
    p{
      font-family: Maven Pro;
      color: #3A393A;
      margin: 0;
    }
    .left-container {
      display: grid;
      grid-template-rows: max-content 1fr;
      row-gap: 3rem;
      img{
        width: 24rem;
      }
      .left-text {
        display: grid;
        grid-template-rows: repeat(2, max-content);
        .lt-col-1,.lt-col-2,.lt-col-3 {
          span {
            &::after{
              content: '\A';
              white-space: pre;
            }
          }
        }
        .lt-col-1 {
          align-self: baseline;
          justify-self: start;
          // position: relative;
          // right: -1.3rem;
          span{
            font-weight: 700;
            font-size: 1.3rem;
            line-height: 1rem;
            padding-left: 0.4rem;
          }
        }
        .credits-models {
          display: grid;
          grid-auto-flow: column;
          justify-content: space-evenly;
          column-gap: 2rem;
          .lt-col-2,.lt-col-3 {
            align-self: center;
            padding-top: 1rem;
            display: grid;
            span{
              font-size: 1.2rem;
              line-height: 1.5rem;
              font-weight: 700;
              padding-left: 0.5rem;
              // padding-top: 0.5rem;
              &:nth-child(1){
                font-size: 5rem;
                line-height: 3.6875rem;
                padding-left: 0;
                font-weight: 900;
              }
              &:nth-child(2){
                padding-top: 1rem;
              }
            }
          }
        }
      }
    }
    .right-container {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      row-gap: 2rem;
      padding-top: 2.5rem;
      margin-right: 10rem;
      align-items: center;
      p {
        span {
          &::after{
            content: '\A';
            white-space: pre;
          }
        }
      }
      .heading {
        align-self: flex-start;
        p {
          span {
            font-weight: 900;
            font-size: 3.2rem;
            line-height: 4.4rem;
            // &::after{
            //   content: '\A';
            //   white-space: pre;
            // }
          }
          &:nth-child(2) {
            font-weight: 500;
            font-size: 1.35rem;
            line-height: 2.2rem;
            color: #BF781D;
          }
        }
      }
      .sub-heading {
        span {
          font-weight: 500;
          font-size: 1.6rem;
          line-height: 2.2rem;
          color: #292929;
          span{
            font-size: 1.5rem;
            font-weight: bold;
            color: #f0c9c0;
            background: #3A393A;
          }
        }
      }
      .btn-container {
        display: grid;
        row-gap: 2rem;
        grid-template-rows: max-content max-content;
        button {
          font-size: 2rem;
          line-height: 3rem;
          padding: 1.2rem 3rem;
          font-family: Maven Pro;
          font-weight: 700;
          background: #FFAB40;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          height: 100%;
          color: #3A393A;
          &:hover {
            background: #F7900C;
          }
        }
        .underline-text {
          font-weight: 500;
          font-size: 1.5rem;
          line-height: 2rem;
          text-decoration-line: underline;
          color: #292929;
          &:hover {
            color: #0E0E0E;
          }
        }
        .cursor-pointer{
          cursor: pointer;
        }
        span{
          display: flex;
          p {
            background: #3A393A;
            font-size: 2rem;
            line-height: 3rem;
            padding: 1.2rem 3rem;
            color: #FFFFFF;
            flex: 1;
            margin-right: -40vw;
            // padding: 1.7rem;
            // align-self: center;
          }
        }
      }
      .cancel-disclaimer-for-credits {
        font-weight: 600;
        font-style: italic;
      }
    }
    .upgrade-success-container {
      p {
        color: #292929;
        font-family: Montserrat;
      }
      .popup-container {
        width: 70vw;
        height: 80vh;
        padding: 0;
        display: grid;
        grid-template-rows: 1fr max-content;
        background: #FFAB40;
        .top-container {
          background: #FBF3F1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          row-gap: 1rem;
          place-items: center;
          align-content: center;
          margin-top: 0.5rem;
          img{
            width: 25rem;
          }
          // background-image: url('~assets/images/mobile/bg.png');
          // background-repeat: no-repeat;
          // // background-size: contain;
          // background-size: 13rem;
          // background-position: right;
          .content-container {
            align-self: start;
            display: grid;
            grid-template-rows: max-content max-content 1fr;
            row-gap: 2rem;
            .heading-1 {
              font-weight: bold;
              font-size: 1.5rem;
              line-height: 2rem;
              // padding-top: 3rem;
            }
            .heading-2 {
              span {
                font-weight: 500;
                font-size: 1.4rem;
                line-height: 1.5rem;
                &::after{
                  content: '\A';
                  white-space: pre;
                }
              }
            }
            .list {
              display: grid;
              grid-auto-flow: row;
              row-gap: 1rem;
              p {
                font-weight: 500;
                font-size: 1.3rem;
                line-height: 1.125rem;
              }
            }
          }
        }
        .bottom-container {
          background: #222021;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
          padding: 5rem;
          position: relative;
          .bg-pattern {
            position: absolute;
            top: -5rem;
            right: 0;
            width: 10rem;
          }
          .btn {
            display: grid;
            justify-content: center;
            button {
              font-family: Montserrat;
              background: #FBF3F1;
              padding: 0.8rem 11rem;
              font-weight: bold;
              font-size: 1rem;
              line-height: 1.175rem;
              color: #222021;
              cursor: pointer;
              &:hover{
                background: #F7E3DF;
              }
            }
          }
        }
      }
    }
    .deactivate-alert-container {
      z-index: 1000;
      .top-container {
        grid-template-columns: unset !important;
        p {
          color: #292929;
        }
        .content {
          display: grid;
          row-gap: 4rem;
          justify-items: center;
          .heading {
            font-weight: bold;
            font-size: 2.5rem;
            line-height: 2.5rem;
          }
          .sub-heading {
            p {
              text-align: center;
              span{
                // font-family: Montserrat;
                // font-style: normal;
                font-weight: 500;
                font-size: 1.45rem;
                line-height: 2.5rem;
                text-align: center;
                color: #222021;
                &::after{
                  content: '\A';
                  white-space: pre;
                }
              }
            }
          }
        }
      }
      .cs-cancel-bottom {
        padding: 2rem !important;
        z-index: 1;
        .bg-pattern {
          z-index: -1;
        }
        svg {
          position: absolute;
          top: -14rem;
          left: 0rem;
          z-index: 0;
        }
        .btn {
          justify-content: center !important;
          row-gap: 1rem;
          p {
            font-weight: 500;
            font-size: 1.1rem;
            line-height: 1.75rem;
            color: #FBF3F1;

          }
          button {
            justify-self: flex-end !important;
            padding: 1rem 6rem !important;
            cursor: pointer;
          }
        }
      }
    }
    .close-x {
        position: absolute;
        right: -4rem;
        top: 0rem;
        background: #000000;
        opacity: 0.4;
        padding: 1rem;
        display: grid;
        place-content: center;
        border-radius: 50%;
        cursor: pointer;
    }
  }
</style>

<template>
    <section v-if="mySubscription && mySubscription.length>0">
      <section v-if="checkOffer">
        <div class="neolite-popup-container popup-div" :class="isNeoLitePopup ? 'showPopUp': ''">
        <div class="popup-container">
        <div class="close-x" @click="isNeoLitePopup = false;">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.7002 0.674072L1.2002 12.0741" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M12.8004 12.2742L1.40039 0.77417" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="main-container">
          <div class="popup-left-container">
            <img src="~assets/images/cancelsub/1.png" alt="" srcset="">
            <!-- <div class="top">
            </div> -->
            <!-- <div class="thumb-list">
              <img src="~assets/images/cancelsub/2.png" alt="" srcset="">
              <img src="~assets/images/cancelsub/3.png" alt="" srcset="">
              <img src="~assets/images/cancelsub/4.png" alt="" srcset="">
            </div> -->
          </div>
          <div class="popup-right-container">
            <div class="top-right">
                <div class="heading-container">
                    <p>Try Neo Light</p>
                    <p>Don’t miss this limited time offer exclusively for you</p>
                </div>
            <div class="plan-cards" v-if="cancelSubState && cancelSubState.neoliteApi">
              <div v-for="(plan,index) in  cancelSubState.neoliteApi.slice().reverse()" :key='index'>
                <div class="card" :class="isMonthly == index ?'card-selected':'' " >
                  <div v-if="plan && plan.displayContext && plan.invoice" @click="planChanged(index,plan)">
                    <div class="banner" v-if="plan.invoice.period == 12">
                      <div class='shaped'></div>
                      <p>Best Value</p>
                    </div>
                    <div class="content">
                      <span class="duration">
                        <p>{{plan.invoice.period == 12 ?'Yearly': 'Monthly'}}</p>
                        <p v-if="plan.invoice.period == 12">/</p>
                        <p v-if="plan.invoice.period == 12">SAVE {{plan.displayContext.discount}}%</p>
                      </span>
                      <span class="duration price">
                        <p>${{plan.displayContext.originalPrice}}</p>
                        <p>/</p>
                        <p>month</p>
                      </span>
                    </div>
                  </div>
                </div>
                <p class="billed-text" :class="isMonthly == index ?'selected-text':''">Billed {{plan.invoice.period == 12 ?'Yearly': 'Monthly'}}</p>
              </div>
            </div>
            <div class="features-list" v-if="cancelSubState && cancelSubState.neoliteApi && cancelSubState.neoliteApi.length > 0">
                <span v-for="(feature, index) in cancelSubState.neoliteApi[0].displayContext.features" :key="index">
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0371 8C16.0371 12.4183 12.4554 16 8.03711 16C3.61883 16 0.0371094 12.4183 0.0371094 8C0.0371094 3.58172 3.61883 0 8.03711 0C12.4554 0 16.0371 3.58172 16.0371 8Z" fill="white"/>
                    <path d="M6.5381 10.9995C6.4723 10.9999 6.40707 10.9873 6.34615 10.9624C6.28523 10.9375 6.22983 10.9009 6.1831 10.8545L3.68311 8.35453L4.38811 7.64953L6.5381 9.79453L11.6831 4.64453L12.3881 5.34953L6.8881 10.8495C6.79579 10.9437 6.66999 10.9976 6.5381 10.9995Z" fill="#FBB051"/>
                  </svg>
                  <p>{{(feature && feature.value)? feature.value: ''}}</p>
                </span>
              </div>
            </div>
            <div class="get-now-btn" @click="isAlreadyClaimOfferCheck('neolite')">
              <p>%</p>
              <p>Get it Now</p>
            </div>
          </div>
        </div>
      </div>
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
        <div class="top-container" v-if="currentBilling">
          <div class="content">
            <p class="heading">Do you wish to continue?</p>
            <div class="sub-heading"
            v-if="cancelSubState.discountOfferApi && ((cancelSubState.discountOfferApi.isDiscountApplied && cancelSubState.discountOfferApi.isNoCostUpgradeApplied) || (cancelSubState.discountOfferApi.isDiscountApplied && cancelSubState.discountOfferApi.isPauseApplied) || (cancelSubState.discountOfferApi.isNoCostUpgradeApplied && cancelSubState.discountOfferApi.isPauseApplied))">
              <p>
                <span>All previous offers will get deactivated if you continue</span>
              </p>
            </div>
            <div class="sub-heading" v-else-if="cancelSubState.discountOfferApi && cancelSubState.discountOfferApi.isDiscountApplied">
              <p>
                <span>Your current plan <b>{{currentPackage.packageName}} - {{currentBilling.billing === 1? 'Monthly': currentBilling.billing === 3 ? 'Quarterly': 'Year'}}</b></span>
                <span>with <b>50% OFF </b>will be deactivated!</span>
              </p>
            </div>
            <div class="sub-heading" v-else-if="future && future.length > 0 && future[0].package && future[0].package.displayContext && plan_type !== 'neolite'">
              <p>
                <span>Your future plan <b>{{future[0].package.displayContext.packageName}} - {{future[0].invoice.period === 1? 'Monthly': future[0].invoice.period === 3 ? 'Quarterly': 'Year'}}</b></span>
                <span>will get deactivated if you choose this option</span>
              </p>
            </div>
            <div class="sub-heading" v-else-if="future && future.length > 0 && plan_type === 'neolite'">
              <p>
                <span>Future and current plan will be deactivated and neo light</span>
                <span>will be active at the end of the current plan cycle</span>
              </p>
            </div>
            <div class="sub-heading" v-else-if="(cancelSubState && cancelSubState.discountOfferApi && cancelSubState.discountOfferApi.isPauseApplied) || (pausedStatusObj && pausedStatusObj.length > 0)">
              <p>
                <span> Your current pause will get deactivated if you continue with this offer</span>
                <!-- <span>will be active at the end of the current plan cycle</span> -->
              </p>
            </div>
            <div class="sub-heading" v-else>
              <p>
                <span>Your current plan <b>{{currentPackage.packageName}} - {{currentBilling.billing === 1? 'Monthly': currentBilling.billing === 3 ? 'Quarterly': 'Year'}}</b></span>
                <span>with<b> no additional cost</b> will be deactivated!</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bottom-container cs-cancel-bottom">
          <img class="bg-pattern" src="~assets/images/mobile/bg.png">
          <svg width="350" height="128" viewBox="0 0 358 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M116.5 -8.58307e-06V126H92.56L29.74 49.5V126H0.940001V-8.58307e-06H25.06L87.7 76.5V-8.58307e-06H116.5ZM239.191 77.94C239.191 78.3 239.011 80.82 238.651 85.5H165.391C166.711 91.5 169.831 96.24 174.751 99.72C179.671 103.2 185.791 104.94 193.111 104.94C198.151 104.94 202.591 104.22 206.431 102.78C210.391 101.22 214.051 98.82 217.411 95.58L232.351 111.78C223.231 122.22 209.911 127.44 192.391 127.44C181.471 127.44 171.811 125.34 163.411 121.14C155.011 116.82 148.531 110.88 143.971 103.32C139.411 95.76 137.131 87.18 137.131 77.58C137.131 68.1 139.351 59.58 143.791 52.02C148.351 44.34 154.531 38.4 162.331 34.2C170.251 29.88 179.071 27.72 188.791 27.72C198.271 27.72 206.851 29.76 214.531 33.84C222.211 37.92 228.211 43.8 232.531 51.48C236.971 59.04 239.191 67.86 239.191 77.94ZM188.971 48.96C182.611 48.96 177.271 50.76 172.951 54.36C168.631 57.96 165.991 62.88 165.031 69.12H212.731C211.771 63 209.131 58.14 204.811 54.54C200.491 50.82 195.211 48.96 188.971 48.96ZM303.966 127.44C293.766 127.44 284.586 125.34 276.426 121.14C268.386 116.82 262.086 110.88 257.526 103.32C252.966 95.76 250.686 87.18 250.686 77.58C250.686 67.98 252.966 59.4 257.526 51.84C262.086 44.28 268.386 38.4 276.426 34.2C284.586 29.88 293.766 27.72 303.966 27.72C314.166 27.72 323.286 29.88 331.326 34.2C339.366 38.4 345.666 44.28 350.226 51.84C354.786 59.4 357.066 67.98 357.066 77.58C357.066 87.18 354.786 95.76 350.226 103.32C345.666 110.88 339.366 116.82 331.326 121.14C323.286 125.34 314.166 127.44 303.966 127.44ZM303.966 104.4C311.166 104.4 317.046 102 321.606 97.2C326.286 92.28 328.626 85.74 328.626 77.58C328.626 69.42 326.286 62.94 321.606 58.14C317.046 53.22 311.166 50.76 303.966 50.76C296.766 50.76 290.826 53.22 286.146 58.14C281.466 62.94 279.126 69.42 279.126 77.58C279.126 85.74 281.466 92.28 286.146 97.2C290.826 102 296.766 104.4 303.966 104.4Z" fill="#3F3F3F" fill-opacity="0.1"/>
          </svg>
          <div class="btn">
            <!-- <p>We will keep you updated with all the cool stuff!</p> -->
            <button @click="plan_type === 'neolite'?buyNeoLite():plan_type === 'upgrade'?upgradePlan():applyDiscount()">Continue</button>
          </div>
        </div>
      </div>
    </div>
      </section>
      <section v-else class="not-offer">
        <p>Offer is not vaild in your plan</p>
        <a href="/dashboard">Home</a>
      </section>
    </section>
    <section v-else-if="mySubscription && mySubscription.length == 0" class="not-offer">
      <p>Offer is not vaild in your plan</p>
      <a href="/dashboard">Home</a>
    </section>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
middleware: ["iframeDash"],
  components: {

  },
//   props:{
//     currentBilling: Object
//   },
  data() {
    return {
      offerPopup: false,
      queryParams: {},
      isUpgrade: false,
      isNeoLitePopup: true,
      isMonthly : 0,
      selectedPlan: {},
      isNeoLite: false,
      isDeactivateAlert: false,
      plan_type : '',
      checkOffer:true
    }
  },
  computed: {
    ...mapState({
      cancelSubState: state => state.Subscriptions.cancelSubState,
      currentBilling: state => state.Billing.currentSubscription,
      user: state => state.User.user,
      mySubscription: state => state.Subscriptions.mySubscription,
      future: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "future" && item.type == "package";
      }),
      futurePlanNeolite: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "future" && item.type == "package" && (item.package.id === 'neo-light-monthly' || item.package.id === 'neo-light-yearly');
      }),
      pausedStatusObj: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "current" && item.chargebee && item.chargebee.status && item.chargebee.status === 'paused';
      }),
    }),
    currentPackage (){
      if(this.currentBilling && this.currentBilling.displayContext && this.currentBilling.displayContext.packageName)
        return {
            packageName:this.currentBilling.displayContext.packageName,
            packageCost:this.currentBilling.displayContext.packageCost
          }
      else
        return {}
    },
    // reverseData(){
    //   if(this.cancelSubState && this.cancelSubState.neoliteApi && this.cancelSubState.neoliteApi.length > 0){
    //     let reversedData = this.cancelSubState.neoliteApi.slice().reverse();
    //     this.selectedPlan = reversedData[0]
    //     return reversedData;
    //   }
    //   else {
    //      return {};
    //   }
    // }
  },
  mounted() {
    // debugger;
    // this.$root.$emit('refresh-billing-page')
    // this.queryParams = this.$route.query;
    window.sessionStorage.removeItem('plansRedirect')
    this.cancelSubNeoLiteOfferAPI().then((apiResponse)=>{
      // this.isUpgrade = true;
      console.log('apiResponse---', apiResponse[1]);
      this.selectedPlan = apiResponse[1];
    })
    if(this.currentBilling && this.currentBilling.subscription){
      this.cancelSubPlanOffersAPI({subId: this.currentBilling.subscription}).then((apiResponse)=>{
        console.log('apiResponse---', apiResponse)
        // this.isUpgrade = true;
      })
    }
    // if((this.neoLitePlanDetails && this.neoLitePlanDetails.length > 0)|| (this.cancelSubState && this.cancelSubState.discountOfferApi && this.cancelSubState.discountOfferApi.isNeoLiteApplied) || (this.currentBilling && this.currentBilling.analyticsData && this.currentBilling.analyticsData.analyticsStatus && this.currentBilling.analyticsData.analyticsStatus === 'paywall_intrial')){
    //   this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-cancel', page: 2,option:_index}})
    // }

  },
  watch: {
    currentBilling(){
      if(this.currentBilling && this.cancelSubState){
        this.cancelSubPlanOffersAPI({subId: this.currentBilling.subscription}).then((apiResponse)=>{
          // console.log('apiResponse---', apiResponse)
          // this.isUpgrade = true;
        // this.reverseData();
      })
      }
    },
    mySubscription:{
      immediate: true,
      handler(newVal, oldVal) {
        if(newVal && newVal.length>0){
          const found =  newVal.find(elem => (elem.package.id.includes('neo-light') && (elem.activeStatus == "future" || elem.activeStatus == "active" || elem.activeStatus == "current")));
          console.log(found);
          if(found){
            // this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-cancel', page: 2,option:1}});
            this.checkOffer = false
          }
        }
        // (item.activeStatus == "future" || item.activeStatus == "active") && item.type == "package" && (item.package.id === 'neo-light-yearly' || item.package.id === 'neo-light-monthly')
      },
    }
  },
  methods: {
    ...mapActions({
      upgradeWithNoCost: 'Subscriptions/cancelSubNoCostUpgradeAPI',
      cancelSubPlanOffersAPI: 'Subscriptions/cancelSubPlanOffersAPI',
      cancelSubDiscountApplyAPI: 'Subscriptions/cancelSubDiscountApplyAPI',
      cancelSubNeoLiteOfferAPI: 'Subscriptions/cancelSubNeoLiteOfferAPI',
      buy: "Subscriptions/buy",
      fetchCurrentSubscription:'Billing/fetchCurrentSub',
    }),
    upgradePlan(){
      if(this.currentBilling && this.currentBilling.subscription){
        this.$root.$emit('show-blocking-loading', true)
        this.upgradeWithNoCost({subId: this.currentBilling.subscription, accountId: this.user.accountId}).then((apiResponse)=>{
          if(apiResponse){
            this.sendEvent('offer_upgrade to NS_taken','Offer screens_upgrade to neo standard')
            this.fetchCurrentSubscription({accountId: this.user.accountId})
            this.$root.$emit('show-blocking-loading', false)
            this.isDeactivateAlert = false;
            this.isUpgrade = true;
          }
        }).catch((err)=> {
          this.$root.$emit('show-blocking-loading', false)
        })
      }
    },
    applyDiscount(){
      this.sendEvent('offer_50%off_taken','Offer screens_50% off')
      if(this.currentBilling && this.currentBilling.subscription){
        this.$root.$emit('show-blocking-loading', true)
        this.cancelSubDiscountApplyAPI({subId: this.currentBilling.subscription}).then((apiResponse)=>{
         if(apiResponse){
            this.fetchCurrentSubscription({accountId: this.user.accountId})
            this.$root.$emit('show-blocking-loading', false)
            this.isDeactivateAlert = false;
            this.isUpgrade = true;
          }
        }).catch((err)=> {
          this.$root.$emit('show-blocking-loading', false)
        })
      }
    },
    onClickNeoLite(){
      this.sendEvent('offer_NLP_clicked','Offer screens_neo light')
      this.isNeoLitePopup = true;
    },
    checkDuration(_plan){
      return (_plan && _plan.invoice) ? _plan.invoice : 0;
    },
    isAlreadyClaimOfferCheck(_type){
      this.plan_type = _type;
      if(_type === 'discount'){
        this.sendEvent('offer_50%off card_clicked','offer_50%off card_clicked')
        if(this.cancelSubState && this.cancelSubState.discountOfferApi.isDiscountApplied)
        return;
      }else if(_type === 'upgrade'){
        this.sendEvent('offer_UNS_clicked','Offer screens_upgrade to neo standard')
        if(this.cancelSubState && this.cancelSubState.discountOfferApi.isNoCostUpgradeApplied)
        return;
      }else {

      }
      if(this.future && this.future.length > 0){
        return this.isDeactivateAlert = true;
      }
      if(this.pausedStatusObj && this.pausedStatusObj.length > 0){
        return this.isDeactivateAlert = true;
      }
      if(this.cancelSubState && this.cancelSubState.discountOfferApi && this.cancelSubState.discountOfferApi.isNoCostUpgradeApplied){
        return this.isDeactivateAlert = true;
      }
      if(this.cancelSubState && this.cancelSubState.discountOfferApi && !this.cancelSubState.discountOfferApi.isDiscountApplied){
        if(_type === 'discount'){
          this.applyDiscount()
        }else if(_type === 'neolite'){
          this.buyNeoLite();
        }else if(_type === 'upgrade'){
          this.upgradePlan()
        }
      }else {
        this.isDeactivateAlert = true;
      }
    },
    buyNeoLite(){
      this.$root.$emit('show-blocking-loading', true)
      this.buy({
        accountId: this.user.accountInfo.accountId,
        package: this.selectedPlan._id
      }).then((apiResponse)=> {
        // alert('Buy Success')
        this.sendEvent('offer_neo light_taken','Offer screens_neo light')
        this.$root.$emit('show-blocking-loading', false)
        this.isDeactivateAlert = false;
        this.isNeoLite = true;
        this.$router.push('/dashboard')
      }).catch((error)=> {
        this.$root.$emit('show-blocking-loading', false)
      })
    },
    onCloseSuccess(){
      this.cancelSubPlanOffersAPI({subId: this.currentBilling.subscription}).then((apiResponse)=>{
        if(apiResponse){
          this.$root.$emit('refresh-billing-page')
          this.$router.push('/settings/plans')
        }
        // this.isUpgrade = true;
      })
    },
    getTextDate (date) {
      let newDate = new Date(date);
      let mlist = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      newDate = mlist[newDate.getMonth()] +' '+ newDate.getDate()+", "+ newDate.getFullYear();
      return newDate;
    },
    sendEvent(label,name){
      if (window.analytics) {
        window.analytics.track(label, {
          name: name,
          flow: "Cancellation"
        },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
      }
    },
    planChanged(index, plan){
      this.isMonthly = index;
      this.selectedPlan = plan;
      if(plan && plan.invoice && plan.invoice.period){
        if(plan.invoice.period === 12)
        this.sendEvent('nlp_yearly_plan_clicked','nlp_yearly_plan_clicked')
        else
        this.sendEvent('nlp_monthly_plan_clicked','nlp_monthly_plan_clicked')
      }

    }
  }
}
</script>
<style lang="scss" scoped>
.neolite-popup-container {
      p {
        margin: 0;
        color: #FFFFFF;
        font-family: Montserrat;
      }
      .popup-container {
        width: 70vw;
        // height: 80vh;
        padding: 0;
        .main-container {
          display: grid;
          grid-template-columns: 57% 1fr;
          // grid-template-columns: 1fr max-content;
          // height: 100%;
          // column-gap: 1rem;
          background: #222021;
          .popup-left-container {
            // display: grid;
            // grid-template-rows: 75% 1fr;
            height: 100%;
            // .top {
            // }
            // width: 100%;
            img {
              width: 100%;
              height: 100%;
              // object-fit: contain;
            }
            .thumb-list {
              display: grid;
              grid-auto-flow: column;
              img {
                border: 4px solid white;
                border-bottom: 0;
                border-left: 0;
              }
            }
          }
          .popup-right-container {
            display: grid;
            padding: 2rem;
            .top-right {
              display: grid;
              grid-template-rows: repeat(3,max-content);
              row-gap: 1.5rem;
              .heading-container {
                display: grid;
                grid-template-rows: repeat(2,max-content);
                row-gap: 1rem;
                p {
                  font-weight: 500;
                  font-size: 1rem;
                  line-height: 1.5rem;
                  &:nth-child(1) {
                    font-weight: bold;
                    font-size: 1.5rem;
                    line-height: 2rem;
                  }
                }
              }
              .plan-cards {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 1rem;
                margin: 1rem 0rem;
                .selected-text {
                  color: white !important;
                  font-weight: 700 !important;
                }
                .billed-text {
                  color: #A6A5A6;
                  text-align: center;
                  padding-top: 0.5rem;
                  font-weight: 500;
                  font-size: 0.95rem !important;
                  line-height: 2rem;
                }
                .card {
                  position: relative;
                  // background: #FBF3F1;
                  background: #A6A5A6;
                  border: 1px solid #888888;
                  // border: 2px solid white;
                  box-sizing: border-box;
                  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.35);
                  display: grid;
                  grid-template-rows: max-content 1fr;
                  align-items: center;
                  cursor: pointer;
                  &:hover{
                    background: #F1F1F1;
                  }
                  &:nth-child(2) {
                    grid-template-rows: 1fr;
                  }
                  p {
                    color: #292929;
                  }
                  .banner {
                    position: relative;
                    .shaped {
                      background: #F1951F;
                      -webkit-clip-path: polygon(40% 0, 68% 0, 100% 41%, 100% 76%);
                      clip-path: polygon(40% 0, 68% 0, 100% 41%, 100% 76%);
                      width: 8rem;
                      height: 7rem;
                      position: absolute;
                      right: 0;
                    }
                    p {
                      position: absolute;
                      right: -7px;
                      transform: rotate(48deg);
                      top: 1.34rem;
                      color: white;
                      letter-spacing: 1px;
                      font-weight: bold;
                      font-size: 9px;
                      line-height: 16px;
                    }
                  }
                  .content {
                    // padding: 0 2rem;
                    padding: 2rem 2.5rem;
                    .duration {
                      display: grid;
                      grid-template-columns: repeat(3,max-content);
                      column-gap: 0.35rem;
                      align-items: center;
                      justify-content: center;
                      p {
                        font-weight: 500;
                        font-size: 0.75rem;
                        line-height: 0.9375rem;
                        font-weight: bold;
                        align-self: flex-end;
                        &:nth-child(1) {
                          font-size: 1.44rem;
                          line-height: 1.5rem;
                        }
                      }
                    }
                    .price{
                      align-content: baseline;
                      padding-top: 1.5rem;
                      p {
                        font-size: 1rem;
                        font-weight: normal;
                        &:nth-child(1) {
                          font-size: 2.5rem;
                          line-height: 2.125rem;
                          font-weight: bold;
                        }
                        &:nth-child(3) {
                          font-weight: 500;
                        }
                      }
                    }
                  }
                }
              }
              .card-selected{
                border-color:#F1951F !important;
                background: white !important;
              }
              .features-list {
                display: grid;
                // padding-top: 4rem;
                row-gap: 1rem;
                span {
                  display: flex;
                  align-items: center;
                  column-gap: 1rem;
                  p {
                    font-weight: 500;
                    font-size: 1rem;
                    line-height: 0.9375rem;
                  }
                }
              }
            }
            .get-now-btn {
              // background: #FBF3F1;
              display: grid;
              grid-template-columns: max-content max-content;
              // place-items: center;
              column-gap: 0.5rem;
              align-self: flex-end;
              padding: 0.55rem 2rem;
              justify-content: center;
              cursor: pointer;
              background: #FBF3F1;
              &:hover {
                background: #F7E3DF;
              }
              p{
                color: #3A393A;
                &:nth-child(1){
                  background: #FBB051;
                  font-size: 1rem;
                  padding: 0.4rem;
                  line-height: 1rem;
                  border-radius: 50%;
                }
                font-style: normal;
                font-weight: bold;
                font-size: 1.2rem;
                line-height: 1.75rem;
                justify-self: flex-start;
              }
            }
          }
        }
      }
    }
    .deactivate-alert-container {
      z-index: 1000;
      .popup-container {
        width: 70vw;
        height: 80vh;
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
              font-size: 2.3rem;
              line-height: 1.5rem;
            }
            .sub-heading {
              p {
                text-align: center;
                span{
                  // font-family: Montserrat;
                  // font-style: normal;
                  font-weight: 500;
                  font-size: 1.4rem;
                  line-height: 2.25rem;
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
            top: -9.1rem;
            left: 0;
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
               &:hover{
                background: #F7E3DF;
              }
            }
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
    .highlight {
      color: #E4AFA1 !important;
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
      background: #ffab40;
      .top-container {
        background: #fbf3f1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 1rem;
        place-items: center;
        align-content: center;
        margin-top: 0.5rem;
        img {
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
              &::after {
                content: "\A";
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
            background: #fbf3f1;
            padding: 0.8rem 11rem;
            font-weight: bold;
            font-size: 1rem;
            line-height: 1.175rem;
            color: #222021;
            cursor: pointer;
            &:hover {
              background: #f7e3df;
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
            span {
              // font-family: Montserrat;
              // font-style: normal;
              font-weight: 500;
              font-size: 1.45rem;
              line-height: 2.5rem;
              text-align: center;
              color: #222021;
              &::after {
                content: "\A";
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
          color: #fbf3f1;
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
  .not-offer{
    text-align: center;
    p{
      color: red;
    }
  }
</style>
import Vue from "vue";
import moment from "moment-timezone"
const getFTPlanID = () => {
    return window.location.host === 'neopreprod.foyr.com' || window.location.host === 'neo.foyr.com'
        ? {
            // 'freeTrial': 'moodboard-free-trial',
            'freeTrial': 'moodboard-free-trial-7-days',
            'basicPaid': 'foyr-moodboard-'
        }
        : {
            'freeTrial': 'moodboard-free-trial-30-days',
            'basicPaid': 'foyr-moodboard-early-bird'
        }
}
const payAsYouGoLowCreditsPlansList = [
    "pas-you-go-low",
    "pay-as-you-go-50",
    "pay-as-you-go-50-cad",
    "pay-as-you-go-50-gbp",
    "pay-as-you-go-50-aud",
    "pay-as-you-go-50-euro",
]
const payAsYouGoHighCreditsPlansList = [
    "pay-you-go-high",
    "pay-as-you-go-100",
    "pay-as-you-go-100-cad",
    "pay-as-you-go-100-gbp",
    "pay-as-you-go-100-aud",
    "pay-as-you-go-100-euro",
]
const payAsYouGoAddonPlansList = [
    "pay-as-you-go-100-topup",
    "pay-as-you-go-50-topup",
]
const state = {
    currentSubscription: null,
    currentMoodboardSubscription: null,
    subscriptionUsage: null,
    allInvoice: null,
    addonSub: null,
    currentSub: null,
    isChargebee: false,
    isTrial: true, // true => NeoFT, false => Neo Paid User
    isLPUPlan: undefined,
    isPlanSticky: false,
    mbPlanIds: getFTPlanID(),
    activeMoodboardRewardPlan: null,
    moodboardReferralPlans: [
        "foyr-moodboard-1-month-access",
        "foyr-moodboard-3-month-access",
        "foyr-moodboard-1-year-access"
    ],
    isFTUpgradeCouponChmlnTourShown: false,
    payAsYouGoPlansList: [
        "pay-as-you-go-gbp",
        "pay-as-you-go-euro",
        "pay-as-you-go-aud",
        "pay-as-you-go",
        ...payAsYouGoLowCreditsPlansList,
        ...payAsYouGoHighCreditsPlansList
    ],
    plansToHideReferralFor: [
      'neo-basic-monthly-inr-low',
      'neo-standard-monthly-inr-low',
      'neo-premium-monthly-inr-low',
      'neo-basic-yearly-inr-low',
      'neo-standard-yearly-inr-low',
      'neo-premium-yearly-inr-low'
    ],
    payWallTrailPlansList: [
        "neo-standard-lite-monthly-gbp",
        "neo-standard-lite-yearly-gbp",
        "neo-standard-lite-monthly-aud",
        "neo-standard-lite-yearly-aud",
        "neo-standard-lite-monthly-euro",
        "neo-standard-lite-yearly-euro",
        "neo-premium-basic-plan-staging",
        "neo-standard-lite-yearly-stg",
    ]
}

const getters = {
    showCommunityBanner: (state, getters, rootState) => {
        const user = rootState.User.user;
        if ( user ) {

            if ( !state.isTrial ) {
                return true;
            }

            const createdOnDate = moment(user.createdAt);
            const today = moment();
            const diffInDays = today.diff(createdOnDate, "day")
            if ( diffInDays >= 3 ) {
                return true
            }

            return false;
        }

        return false;
    },
    isUserOnMoodBoardPaidPlan(state) {
        if (
            (state.currentMoodboardSubscription &&
            state.currentMoodboardSubscription.chargebeeSubscriptionData &&
            state.currentMoodboardSubscription.chargebeeSubscriptionData.plan_id === state.mbPlanIds.basicPaid) || state.activeMoodboardRewardPlan
        ) return true;
        return false
    },
    isMoodBoardPlanCancelled(state) {
        if (
            state.currentMoodboardSubscription &&
            state.currentMoodboardSubscription.isCancled
        ) return true;
        return false
    },
    hasMoodBoardPlanExpired(state) {
        if (
            state.currentMoodboardSubscription &&
            state.currentMoodboardSubscription.subscriptionExpiryDate
        ) {
            const planExpiryDate = new Date(state.currentMoodboardSubscription.subscriptionExpiryDate)
            return new Date() > planExpiryDate;
        }
        return false
    },
    isUserOnMoodBoardFreeTrial(state) {
        if (
            state.currentMoodboardSubscription &&
            state.currentMoodboardSubscription.chargebeeSubscriptionData &&
            state.currentMoodboardSubscription.chargebeeSubscriptionData.plan_id === state.mbPlanIds.freeTrial
        ) return true;
        return false
    },
    doesUserHaveActiveMoodboardSubscription(state, getters) {
        if (getters.isUserOnMoodBoardFreeTrial || getters.isUserOnMoodBoardPaidPlan) {
            return !(getters.hasMoodBoardPlanExpired);
        }

        return false;
    },
    hasNeoFreeTrialExpired(state) {
        let today = new Date().getTime();
        let hasFreeTrialExpired = false;

        if (state.currentSubscription && state.currentSubscription.isPublic) {
        if (
            state.currentSubscription.subscriptionExpiryDate &&
            new Date(state.currentSubscription.subscriptionExpiryDate).getTime() -
            today >
            0
        ) {
            hasFreeTrialExpired = false;
        } else {
            hasFreeTrialExpired = true;
        }
        }

        return hasFreeTrialExpired;
    },
    hasNeoPaidPlanExpired(state) {
        let today = new Date().getTime();
        let hasFreeTrialExpired = false;

        if (
            state.currentSubscription.subscriptionExpiryDate &&
            new Date(state.currentSubscription.subscriptionExpiryDate).getTime() -
            today >
            0
        ) {
            hasFreeTrialExpired = false;
        } else {
            hasFreeTrialExpired = true;
        }

        return hasFreeTrialExpired;
    },
    isNeoPaidPlanCancelled(state) {
        if (
            state.currentSubscription &&
            state.currentSubscription.isCancled
        ) return true;
        return false
    },
    isUserAMoodboardUser(state, getters) {
        if (state.currentMoodboardSubscription || state.activeMoodboardRewardPlan
            // &&
            // (
            //     getters.isUserOnMoodBoardFreeTrial ||
            //     getters.isUserOnMoodBoardPaidPlan ||
            //     getters.isMoodBoardPlanCancelled ||
            //     getters.hasMoodBoardPlanExpired
            // )
        ) {
            // return !(getters.hasMoodBoardPlanExpired);
            return true
        }
        return false;
    },
    currentSubscription: state => state.currentSubscription,
    isUserOnUnlimitedRendersPlan: state => {

        let availablePlansForUnlimitedRenders = [ "neo-premium-yearly",
            "neo-premium-yearly-gbp",
            "neo-premium-yearly-aud",
            "neo-premium-yearly-euro",
            "neo-premium-yearly-jpy",
            "neo-premium-yearly-cad" ];

        if (
            state.currentSubscription &&
            state.currentSubscription &&
            state.currentSubscription.chargebeeSubscriptionData &&
            availablePlansForUnlimitedRenders.includes( state.currentSubscription.chargebeeSubscriptionData.plan_id )
        ) {

            return true;

        }

        return false;

    },
    isReferralNavigationAllowedForSelectedPlan: state => {
      if (
          state.currentSubscription &&
          state.currentSubscription.chargebeeSubscriptionData &&
          state.plansToHideReferralFor.includes( state.currentSubscription.chargebeeSubscriptionData.plan_id )
      ) {
          return false;
      }
      return true;
    },
    isUserOnPayAsYouGoPlan: state => {
        if (
            state.currentSubscription &&
            state.currentSubscription.chargebeeSubscriptionData &&
            state.payAsYouGoPlansList.includes( state.currentSubscription.chargebeeSubscriptionData.plan_id )
        ) {
            return true;
        }
        return false;
    },
    isUserOnPaywallTrialPlan: state => {
        if (
            state.currentSubscription &&
            state.currentSubscription.chargebeeSubscriptionData &&
            state.payWallTrailPlansList.includes( state.currentSubscription.chargebeeSubscriptionData.plan_id )
        ) {
            return true;
        }
        return false;
    },
    isUserATargetForPayAsYouGoPlan: (state, getters, rootState, rootGetters) => {
        // US, Canada, Japan, Argentina, Colombia, Spain and India
        // const countryList = ["US", "CA", "IN"]
        const countryList = ["IN"]
        let notTargetedCountryList = countryList.map(e => rootState.User.countryCodeMapping[e])
        const isUserJapanese = rootGetters['User/isUserJapanese']
        const isUserSpanish = rootGetters['User/isUserSpanish']
        const getUserCountry = rootGetters['User/getUserCountry']
        if(
            (state.isTrial ||
            getters.isUserOnPaywallTrialPlan) &&
            !isUserJapanese &&
            !isUserSpanish &&
            !notTargetedCountryList.includes(getUserCountry)
        ) {
            return true
        }
        return false
    },
    payAsYouGoLowCreditsPlansList: () => payAsYouGoLowCreditsPlansList,
    payAsYouGoHighCreditsPlansList: () => payAsYouGoHighCreditsPlansList,
    payAsYouGoAddonPlansList: () => payAsYouGoAddonPlansList,
    totalCreditsAvailable: (state, getters) => {
        let usedCredits = getters['totalPayAsYouGoCreditsUsed'] || 0;
        if (
            state.currentSub &&
            state.currentSub.total
        ) return state.currentSub.total - usedCredits;

        return 0
    },
    totalPayAsYouGoCreditsUsed: state => {
        if (
            state.currentSub &&
            state.currentSub.totalCreditsUsed
        ) return state.currentSub.totalCreditsUsed

        return 0
    }
}

const actions = {
    // Update Credit card details Update
    updateCreditCard({}, { accountId }) {
        // console.log('billingStore', accountId)
        let url = '/sb/package/updatecardhostpage';
        return this.$axios
            .$get(url)
            .then(res => res)
            .catch(err => {
                throw err.response;
            });
    },
    fetchCurrentSub({ commit, dispatch, rootState, getters }, { accountId }) {
        const url = `/sb/subscription/current`;
        return this.$axios
            .$get(url, { params: { accountId } })
            .then(res => {
              let groupData = {}
                commit("setChargebeeStatus", res.isNewIntegration ? res.isNewIntegration : false)
                if (res && res.data.length > 0) {
                    commit("setIsLPUPlanValue", res.isLPUPlan)
                    commit("currentSubscription", res.data);
                    let trial = false;
                    res.data.forEach(function(item){
                      if(item.subscriptionType && item.subscriptionType === "package"){
                        trial = item.hasOwnProperty('isPublic') ? item.isPublic : false;
                      }
                    })
                    commit('trialPackage',trial)
                    if (window.analytics) {
                      if (rootState.User.user.accountType == 'root') {
                        groupData['status'] = res.data[0].analyticsData.analyticsStatus
                        groupData['plan'] = (window.$nuxt.$store.state.User.isLPU) ? `Foyr ${res.data[0].displayContext.packageName}`: res.data[0].displayContext.packageName
                        groupData['userAgent'] =window.$nuxt.$ua._ua
                        groupData['device'] = window.$nuxt.$ua.deviceType()
                        groupData['browser'] =  window.$nuxt.$ua.browser()
                        groupData['lpu'] =  (window.$nuxt.$store.state.User.isLPU) ? true : false
                        window.analytics.group(rootState.User.user.accountId, groupData)
                        window.analytics.identify(rootState.User.user._id, groupData);
                      }
                    }
                    if (window.fcWidget && window.fcWidget.user) {
                        window.fcWidget.user.setProperties({
                            freeTrail: res.data[0].isPublic,
                            plan: res.data[0].displayContext.packageName,
                            expired: res.data[0].isCancled
                        });
                    }
                    if ( getters["isUserOnPayAsYouGoPlan"] ) {
                        dispatch('PayAsYouGo/fetchPayAsYouGoUseageLimits', null, { root: true })
                        dispatch('PayAsYouGo/fetchCreditTransactions', {}, { root: true })
                    }
                    dispatch("subscriptionUsage", { accountId, subscription: res.data[0].subscription });
                } else {
                  if (window.fcWidget && window.fcWidget.user) {
                      window.fcWidget.user.setProperties({
                          freeTrail: false,
                          plan: "NO PLAN",
                          expired: "N/A"
                      });
                  }
                  commit("currentSubscription", undefined);
                }
            })
            .catch(err => {
                throw err.response;
            });
    },
    fetchCurrentMoodboardSub({ commit, dispatch, state, rootState }, { accountId }) {
        const url = `/sb/subscription/current/moodboard`;
        return this.$axios
            .$get(url, { params: { accountId } })
            .then(res => {
              let groupData = {}
                // commit("setChargebeeStatus", res.isNewIntegration ? res.isNewIntegration : false)
                if (res && res.data.length > 0) {
                    // commit("setIsLPUPlanValue", res.isLPUPlan)
                    if(res.data[0] && res.data[0].chargebeeSubscriptionData && res.data[0].chargebeeSubscriptionData.plan_id && state.moodboardReferralPlans.includes(res.data[0].chargebeeSubscriptionData.plan_id) ) {
                        commit("setActiveMoodboardRewardPlan", res.data[0]);
                        // console.log("setCurrentMoodboardSubscription", res.data)
                    } else {
                        commit("setCurrentMoodboardSubscription", res.data);
                    }
                    // let trial = false;
                    // res.data.forEach(function(item){
                    //   if(item.subscriptionType && item.subscriptionType === "package"){
                    //     trial = item.hasOwnProperty('isPublic') ? item.isPublic : false;
                    //   }
                    // })
                    // commit('trialPackage',trial)
                    // if (window.analytics) {
                    //   if (rootState.User.user.accountType == 'root') {
                    //     groupData['status'] = res.data[0].analyticsData.analyticsStatus
                    //     groupData['plan'] = (window.$nuxt.$store.state.User.isLPU) ? `Foyr ${res.data[0].displayContext.packageName}`: res.data[0].displayContext.packageName
                    //     groupData['userAgent'] =window.$nuxt.$ua._ua
                    //     groupData['device'] = window.$nuxt.$ua.deviceType()
                    //     groupData['browser'] =  window.$nuxt.$ua.browser()
                    //     groupData['lpu'] =  (window.$nuxt.$store.state.User.isLPU) ? true : false
                    //     window.analytics.group(rootState.User.user.accountId, groupData)
                    //     window.analytics.identify(rootState.User.user._id, groupData);
                    //   }
                    // }
                    // if (window.fcWidget && window.fcWidget.user) {
                    //     window.fcWidget.user.setProperties({
                    //         freeTrail: res.data[0].isPublic,
                    //         plan: res.data[0].displayContext.packageName,
                    //         expired: res.data[0].isCancled
                    //     });
                    // }
                    dispatch("subscriptionUsage", { accountId, subscription: res.data[0].subscription });
                } else {
                //   if (window.fcWidget && window.fcWidget.user) {
                //       window.fcWidget.user.setProperties({
                //           freeTrail: false,
                //           plan: "NO PLAN",
                //           expired: "N/A"
                //       });
                //   }
                  commit("setCurrentMoodboardSubscription", undefined);
                }
            })
            .catch(err => {
                throw err.response;
            });
    },
    subscriptionUsage({ commit, dispatch }, { accountId, subscription }) {
        const url = `/sb/subscription/usage`;
        return this.$axios
            .$get(url, { params: { accountId, subscription } })
            .then(data => {
                var addonId = [];
                for (var key in data.data.addon) {
                    addonId.push(data.data.addon[key][0]._id)
                }
                commit("subUsage", data.data);
                // dispatch("allInvoices", { accountId });
            })
            .catch(err => {
                throw err.response;
            });
    },
    allInvoices({ commit }, { accountId, subscription }) {
        const url = `/sb/subscription/invoice`;
        return this.$axios
            .$get(url, { params: { accountId } })
            .then(res => res)
            .catch(err => {
                throw err.response;
            });
    },
    downloadInvoice({ commit }, payload) {

      if(state && state.isChargebee){
        const cbURL = `/sb/subscription/download?accountId=${payload.accountId}&invoice=${payload.invoiceId}`;
          return this.$axios
          .$get(cbURL)
          .then(res => {
            if(res && res.data && res.data.download_url)
              window.open(res.data.download_url)
                  // return res;
          })
        }else {
          const zohoUrl = `${window.location.origin == "https://neo.foyr.com" ? 'https://neo.foyr.com' :(window.location.origin =="http://neopreprod.foyr.com")? 'http://neopreprod.foyr.com' :'http://neostaging.foyr.com'}/api/sb/subscription/download?accountId=${payload.accountId}&invoice=${payload.invoiceId}`;
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = () => {
              if (xhr.readyState == 4) {
                  if (xhr.status == 200)
                      console.log(xhr)
                  var blob = new Blob([xhr.response], { type: "application/pdf" });
                  var objectUrl = URL.createObjectURL(blob);
                  window.open(objectUrl);
              }
          }
          xhr.upload.onprogress = (event) => {
              //this.progressNotifier.next({ progress: progress, file: file });
          }
          xhr.open("GET", zohoUrl, true);
          xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('Authorization')}`)
          xhr.setRequestHeader("Content-Type", "application/pdf")
          xhr.responseType = 'blob'
          xhr.send();
        }
    },
    buyNowEmailSend({ commit }, payload) {
        if (payload) {
          const url = '/notify/buyNow'
          return this.$axios
            .$post(url, payload)
            .then(res => {
                console.log(res)
                    // return res;
            })
        }
    },
    getRepDetails() {
      const url = `/sb/representative`;
      return this.$axios
          .$get(url)
          .then(res => res.data)
          .catch(err => {
              throw err.response;
          });
    },
    updateIsFTUpgradeCouponChmlnTourShown({ commit }, data) {
        commit("setIsFTUpgradeCouponChmlnTourShown", data)
    },
}
// mAtJ9U7VgyIWN1S~~Myg7CqgVicNO_sZxh6zBYeggT3 - paid
// Eufo41dmDliAlAHDZoMsvTt5_k0A3rxJaq8qfxQON~e - ft
const mutations = {
    setIsLPUPlanValue:(state, value) => {
        state.isLPUPlan = value;
    },
    currentSubscription: (state, currentSubscription) => {
        if (currentSubscription && currentSubscription.length > 0) {
            // var recurring = false;
            // currentSubscription.forEach(item => {
            //     if (item.subscriptionType == "package" && item.type == "recurring") {
            //         state.currentSubscription = item;
            //     }
            //     if (state.currentSubscription == null)
            //         state.currentSubscription = item;

            // })
            state.currentSubscription = currentSubscription[0];
        } else
            state.currentSubscription = currentSubscription;

        console.log("SUBSCIPTION",state.currentSubscription)

    },
    setCurrentMoodboardSubscription: (state, currentSubscription) => {
        if (currentSubscription && currentSubscription.length > 0) {
            state.currentMoodboardSubscription = currentSubscription[0];
        } else
            state.currentMoodboardSubscription = currentSubscription;

        console.log("MB SUBSCIPTION", state.currentMoodboardSubscription)

    },
    subUsage: (state, subscriptionUsage) => {
        state.currentSub = subscriptionUsage;

        // state.subscriptionUsage = JSON.parse(JSON.stringify(subscriptionUsage));
        // state.currentSub = subscriptionUsage;
        // if(state.subscriptionUsage.package.serviceList.length>0){
        //     let output = []
        // state.subscriptionUsage.package.serviceList.forEach(element =>{
        //     if(output.length>0){
        //        var found= output.find(function(item){
        //             return item.code === element.code
        //         })
        //         if(found){
        //             for(var key in found) {
        //                 if (element.hasOwnProperty(key)) {
        //                     if(key === "serviceOverAllExceptOverUsage" || key === "serviceOverAllExceptOverUsageByMetric"
        //                     || key === "serviceOverAllUsage" || key === "serviceOverUsage" || key === "serviceOverUsageByMetric" || key === "totalCreditsPerCycle")
        //                     {
        //                         found[key] +=element[key]
        //                     }
        //                     else if(key == "type")
        //                         found[key] = found[key]
        //                     else
        //                         found[key] = element[key];
        //                 }
        //             }
        //         }else{
        //             output.push(element)
        //         }
        //     }else{
        //         output.push(element)
        //     }
        // })
        // state.subscriptionUsage.package.serviceList = output;
        // }

        // let addon = {
        //     custom:[],
        //     customOne:[],
        //     render:[],
        //     // download:[]
        //   };
        //   state.subscriptionUsage.addons.forEach(element => {
        //     element.serviceList.forEach(item =>{
        //         if(item.code == "foyr_service_29" || item.code == "foyr_service_4")
        //         {
        //             if(item.rules.mode == "recurring")
        //                 addon.custom.push(element)
        //             else
        //                 addon.customOne.push(element)
        //         }
        //         if(item.code == "foyr_service_2" || item.code == "foyr_service_3" || item.code == "foyr_service_32" || item.code == "foyr_service_30"){
        //             item.totalCreditsPerCycle = element.totalCreditsPerCycle;
        //             item.totalCreditsConsumedPerCycle =  element.totalCreditsConsumedPerCycle;
        //             state.subscriptionUsage.package.serviceList.push(item)
        //         }
        //     })
        //     // if(element.code == "foyr_pacakge_49" ||  element.code=="foyr_pacakge_50" || element.code=="foyr_pacakge_51")
        //     //     addon.custom.push(element)
        //     // if(element.code == "foyr_pacakge_52" ||  element.code=="foyr_pacakge_53" || element.code=="foyr_pacakge_54")
        //     //     addon.render.push(element)
        //     // if(element.code == "foyr_pacakge_36" ||  element.code=="foyr_pacakge_37" || element.code=="foyr_pacakge_38")
        //     //   addon.download.push(element)
        //   });
        //   state.addonSub = addon;
        // subscriptionUsage.plan.forEach(function(plan){
        //     console.log(plan)
        // })
    },
    allInvoice: (state, invoice) => {
        state.allInvoice = invoice;
    },
    setChargebeeStatus: (state, status)=> {
      state.isChargebee = status;
    },
    setActiveMoodboardRewardPlan:(state,data) => state.activeMoodboardRewardPlan = data,
    trialPackage:(state,data) => state.isTrial = data,
    setPlanSticky: (state, data) => state.isPlanSticky = data,
    setIsFTUpgradeCouponChmlnTourShown:(state, value) => {
        state.isFTUpgradeCouponChmlnTourShown = value;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

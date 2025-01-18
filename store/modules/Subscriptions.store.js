const state = {
  packages: null,
  mbPackages: null,
  services: null,
  serviceResponse: null,
  mySubscription: [],
  addon: undefined,
  isTrail: false,
  packageDetails: {},
  cancelSubState: {},
  showDemoTourPaywall: false,
  fetchAccountInfo: {
    foyr_coin: {}
  },
  foyrCoins: {
    totalEarnedCoins: 0,
    coinValue: 1,
    availableCoin: 0
  },
  publicConfiguration: {
    foyr_coins: {
      amount: {}
    }
  },
  isTypeformLoaded: false,
  userActivePlans: [],
  neoReferralPlans: [
    "referral-export-fp-and-elevation",
    "referral-export-fp-and-elevation-3",
    "referral-export-fp-and-elevation-12",
    "referral-export-elevation",
    "referral-export-elevation-3",
    "referral-export-elevation-12"
  ]
};
const getters = {
  doesUserHaveAnActiveFloorplanAndElevationReward: state => {
		if (state.userActivePlans.length) {
			return state.userActivePlans.some(e =>
				state.neoReferralPlans.includes(e)
			);
		}
	},
  getUserEligiblePayAsYouGoPlans: (state,  getters,  rootState) => {
    if(state.packages && state.packages.data && state.packages.data.length > 0) {
      const plan = state.packages.data.filter(e => rootState.Billing.payAsYouGoPlansList.includes(e.id))
      return plan
    }
    return []
  },
  payAsYouGoLowCreditsPlan: (state,  getters,  rootState, rootGetters) => {
    if(state.packages && state.packages.data && state.packages.data.length > 0) {
      const plan = state.packages.data.find(e => rootGetters['Billing/payAsYouGoLowCreditsPlansList'].includes(e.id))
      return plan
    }
    return []
  },
  payAsYouGoHighCreditsPlan: (state,  getters,  rootState, rootGetters) => {
    if(state.packages && state.packages.data && state.packages.data.length > 0) {
      const plan = state.packages.data.find(e => rootGetters['Billing/payAsYouGoHighCreditsPlansList'].includes(e.id))
      return plan
    }
    return []
  },
  payAsYouGoAddonPlan: (state,  getters,  rootState, rootGetters) => {
    let addonPlanIds = rootGetters['Billing/payAsYouGoAddonPlansList'];
    if(state.packages && state.packages.addon && state.packages.addon.length > 0) {
      const plans = state.packages.addon.filter(e => addonPlanIds.includes(e.id))
      return { custom: plans }
    }
    return { custom: [] }
  },
  services: (state) => state.services || {},
  isTrail: (state) => state.isTrail
}

const actions = {
  fetchAll({
    commit
  }, {
    accountId, mobilePlans
  }) {
    const url = `/sb/package/getbyapplication/v2`;
    return this.$axios
      .$get(url, {
        params: {
          accountId,
          mobilePlans
        }
      })
      .then(res => {
        commit("setPackages", res);
      })
      .catch(err => {
        throw err.response;
      });
  },
  fetchMySubscriptions({
    commit
  }, {
    accountId
  }) {
    const url = `/sb/subscription/customer`;
    return this.$axios
      .$get(url, {
        params: {
          accountId
        }
      })
      .then(res => {
        if (res && res.data && res.data.length > 0) {
          commit("mySubscription", res.data);
          let activePlans = res.data.map(e => {
              if(e.subscriptionDaysLeft && e.subscriptionDaysLeft == "never expire") {
                  return e.chargebee.plan_id
              } else if (e.subscriptionExpiryDate && e.chargebee && e.chargebee.plan_id ) {
                  if(new Date() < new Date(e.subscriptionExpiryDate)) {
                      return e.chargebee.plan_id
                  }
              }
              return ""
          })
          commit("setUserActivePlans", activePlans);
          // let trail = false;
          res.data.forEach(function (item) {
            // if(item.activeStatus != "future" && item.type == "package"){
            //   if(item.activeStatus == "current" && !item.isPublic)
            //     trail = false;
            //   else
            //     trail = true;
            // }
            if (item.activeStatus == "future" && item.type == 'package') {
              window.fcWidget.user.setProperties({
                futurePlan: item.name
              });
            }
          })
          // else
          //   trail = true;
          // commit('trailPackage',trail)
        }
        // else{
        //   commit('trailPackage',true)
        // }
      })
      .catch(err => {
        throw err.response;
      });
  },
  cancel({
    dispatch
  }, {
    id,
    accountId
  }) {
    const url = `/sb/subscription/cancel/` + id;
    return this.$axios
      .$delete(url, {
        params: {
          accountId
        }
      })
      .then((res) => {
        dispatch('fetchMySubscriptions', {
          accountId
        })
        return res
      })
      .catch(err => {
        throw err.response;
      });
  },
  services({
    commit
  }, {
    accountId
  }) {
    const url = `/sb/application/test/`;
    return this.$axios
      .$get(url, {
        params: {
          accountId
        }
      })
      .then((res) => {
        commit("myServices", res.data);
      })
      .catch(err => {
        throw err.response;
      });
  },
  requestService({
    commit
  }, {
    quantity,
    service,
    accountId
  }) {
    const url = `/sb/subscription/user?accountId=` + accountId;
    return this.$axios
      .$post(url, {
        quantity,
        service
      })
      .then((res) => {
        commit("sendserviceResponse", res);
      })
      .catch(err => {
        throw err.response;
      });
  },
  buy({
    commit,
    dispatch
  }, payload) {
    const url = `/sb/package/hostpage`
    return this.$axios
      .$get(url, {
        params: payload
      })
      .then(res => {
        if (res) {
          dispatch('fetchMySubscriptions', {
            accountId: payload.accountId
          })
          if (res.data && res.data.length > 0)
            return res.data[0];
          else
            return res;
        }
      })
  },
  buyMoodboardPlan({
    commit,
    dispatch
  }, payload) {
    const url = `/sb/moodboard/hostpage`
    return this.$axios
      .$get(url, {
        params: payload
      })
      .then(res => {
        if (res) {
          dispatch('fetchMySubscriptions', {
            accountId: payload.accountId
          })
          if (res.data && res.data.length > 0)
            return res.data[0];
          else
            return res;
        }
      })
  },
  assignMoodboardFT({
    dispatch
  }, payload = {}) {
    const url = `/sb/subscription/moodboard/ft`
    return this.$axios
      .$get(url, {
        params: payload
      })
      .then(res => {
        if (res) {
          console.log(res);
        }
      })
  },
  cancelFeedBack({
    dispatch
  }, {
    subId,
    accountId,
    data
  }) {
    const url = `/sb/subscription/cancel/feedback/${subId}?accountId=${accountId}`
    return this.$axios
      .$post(url, {
        data
      })
      .then(res => {
        dispatch("Billing/fetchCurrentSub", {
          accountId
        }, {
          root: true
        });
        return res;
      })
  },
  checkServiceCredits({}, {
    accountId,
    service
  }) {
    const url = `sb/subscription/credits/available?accountId=${accountId}&service=${service}`
    return this.$axios
      .$get(url)
      .then(res => {
        return res;
      })
  },
  packageDetailsSeperation({
    commit
  }, data) {
    commit('setNewPackageDetails', data);
  },
  getPlanSwitchStatus({
    commit
  }, payload) {
    const url = `/sb/subscription/upgrade/${payload.currentPackageId}/${payload.futurePackageId}?accountId=${payload.accountId}`
    return this.$axios
      .$get(url)
      .then(res => {
        return res.data;
      })
  },
  //----------------------Cancellation Flow Related Apis -----------------------//
  cancelSubPauseAPI({
    commit,
    dispatch
  }, payload) {
    const url = `/sb/subscription/pause/${payload.subId}`
    return this.$axios
      .$post(url, payload)
      .then(res => {
        dispatch('fetchMySubscriptions', {
          accountId: payload.accountId
        })
        commit('setCancellationState', {
          type: 'pause',
          data: res.data
        })
        return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  cancelSubPlanOffersAPI({
    commit
  }, payload) {
    const url = `/sb/subscription/getyearlydiscountedprice/${payload.subId}`
    return this.$axios
      .$get(url)
      .then(res => {
        commit('setCancellationState', {
          type: 'getDiscount',
          data: res.data
        })
        return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  cancelSubNoCostUpgradeAPI({
    commit,
    dispatch
  }, payload) {
    const url = `/sb/subscription/upgradeplanatnocost/${payload.subId}`
    return this.$axios
      .$post(url)
      .then(res => {
        dispatch('fetchMySubscriptions', {
          accountId: payload.accountId
        })
        commit('setCancellationState', {
          type: 'upgrade',
          data: res.data
        })
        return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  cancelSubDiscountApplyAPI({
    commit,
    dispatch
  }, payload) {
    const url = `/sb/subscription/discount/${payload.subId}`
    return this.$axios
      .$post(url)
      .then(res => {
        dispatch('fetchMySubscriptions', {
          accountId: payload.accountId
        })
        commit('setCancellationState', {
          type: 'applyDiscount',
          data: res.data
        })
        return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  cancelSubNeoLiteOfferAPI({
    commit
  }, payload) {
    const url = `/sb/package/view/neoliteplans`
    return this.$axios
      .$get(url)
      .then(res => {
        commit('setCancellationState', {
          type: 'neolite',
          data: res.data
        })
        return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  getCreditsInfoAPI({
    commit
  }, payload) {
    const url = `/sb/subscription/cancel/analytics`
    return this.$axios
      .$get(url)
      .then(res => {
        commit('setCancellationState', {
          type: 'analytics',
          data: res.data
        })
        return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  addTwentyRendersAPI({
    commit,
    dispatch
  }, payload) {
    const url = `/sb/subscription/addtwentyrenders`
    return this.$axios
      .$post(url)
      .then(res => {
        dispatch('getCreditsInfoAPI')
        // commit('setCancellationState', {type:'analytics',data: res.data})
        return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  // api/neo/subscription/discount/:subscriptionId
  cancelSubOptionSelected({
    commit
  }, data) {
    commit('setCancellationState', {
      type: 'optionSelected',
      data: data.cancelSubOption
    })
  },
  analyticsDataToBackend({
    commit
  }, data) {
    const url = `/sb/analytics/track`
    return this.$axios
      .$post(url, data)
      .then(res => {
        // commit('setCancellationState', {type:'analytics',data: res.data})
        // return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  meetingSetupKeyUpdate({
    commit,
    dispatch
  }, payload) {
    const url = `/sb/subscription/setmeetinginviteenabled/${payload.subId}`
    return this.$axios
      .$post(url)
      .then(res => {
        dispatch('cancelSubPlanOffersAPI', payload)
        // commit('setCancellationState', {type:'analytics',data: res.data})
        // return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  getTheTourStatus({
    commit,
    dispatch,
    rootState
  }, payload) {
    const url = '/sb/accountinfo/fetchaccountinfo'
    return this.$axios
      .$get(url)
      .then(res => {
        if (res.data && res.data['subscription_bought_successful'] && res.data['demo_booked_event_timestamp'] == undefined && res.data['demopopup_dont_show_again'] == undefined && rootState['Subscriptions']['mySubscription'][0]['name'] != 'free trial' && rootState && rootState['User'] && rootState['User']['user'] && rootState['User']['user']['accountExtraInfo'] && rootState['User']['user']['accountExtraInfo']['userCategory'] == 'Interior Designer') {
          commit('changeShowDemoTourPaywall', true);
        }

        if (!res.data.foyr_coin) {
          res.data.foyr_coin = {}
        }

        commit('setFetchAccountInfo', res.data)
        return res.data;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  updateTourStatus({
    commit,
    dispatch
  }, payload) {
    const url = '/sb/accountinfo/updateaccountinfo'
    return this.$axios
      .$post(url, payload)
      .then(res => {
        // return res.data;
        // console.log(res.data)
        // commit('setTourStatus',)
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  premiumPaymentLink({
    commit
  }, payload) {
    const url = `/sb/subscription/buynow`
    return this.$axios
      .$get(url, {
        params: payload
      })
      .then(res => {
        return res.data;
        // console.log(res.data)
        // commit('setTourStatus',)
      })
      .catch(err => {
        throw (err.response && err.response.data && err.response.data.error) ? err.response.data.error : err;
      });
  },
  buyNowFromDunning({}, payload) {
    let url = `/sb/subscription/customer/collectpendingbillingamount`
    return this.$axios
      .$get(url, {
        params: payload
      })
      .then(res => {
        if (res && res.data && res.data.hosted_page) {
          return res.data.hosted_page;
        } else
          return null;
      })
      .catch(err => {
        throw err.response.data.error;
      });
  },
  async getCoinInfoAPI({
    commit
  }) {
    let url = 'sb/subscription/fetchfoyrcoindetails'
    try {
      const {
        data
      } = await this.$axios.$get(url)
      commit('updateFoyrCoins', data);
      return data
    } catch (err) {
      console.error('error fetching coin info ->', err)
      throw err
    }
  },
  async getPublicConfiguration({
    commit
  }) {
    let url = 'sb/configuration/public'
    try {
      const {
        data
      } = await this.$axios.$get(url)
      commit('setPublicConfiguration', data);
      return data
    } catch (err) {
      console.error('error get public configuration ->', err)
      throw err
    }
  },
  setTypeformLoadedState({
    commit
  }, data) {
    commit('setTypeformLoadedState', data);
  },
  async cancelsubscriptionbytypeform({}, payload) {
    let url = 'sb/subscription/cancelsubscriptionbytypeform'
    try {
      await this.$axios.$post(url, payload)
    } catch (err) {
      console.error('error  cancelsubscriptionbytypeform ->', err)
      throw err
    }
  },
  async fetchAllRecommendedAddons({}, payload) {
    let url = '/sb/subscription/listactiveaddons'
    try {
      const data = await this.$axios.$post(url, payload)
      if ( data.statusCode == 200 && data.data ) {
        return data.data.list;
      }

      return [];
    } catch (err) {
      console.error('error  cancelsubscriptionbytypeform ->', err)
      throw err
    }
  },
  async fetchPlanDetailsWithAddons({}, payload) {
    let url = '/sb/subscription/plandetail'
    try {
      const data = await this.$axios.$post(url, payload)
      if ( data.statusCode == 200 && data.data ) {
        return data.data;
      }

      return null;
    } catch (err) {
      console.error('error  cancelsubscriptionbytypeform ->', err)
      throw err
    }
  },
  async insertAddonInPlan({}, payload) {
    let url = '/sb/subscription/insertaddon'
    try {
      const res = await this.$axios.$post(url, payload)
      if (res.data && res.data.length > 0)
            return res.data[0];
          else
            return res;
    } catch (err) {
      console.error('error ->', err)
      throw err
    }
  },
  async removeAddonFromPlan({}, payload) {
    let url = '/sb/subscription/removeaddon'
    try {
      const res = await this.$axios.$post(url, payload)
      console.log(res)
      if (res.data && res.data.length > 0)
            return res.data[0];
          else
            return res;
    } catch (err) {
      console.error('error ->', err)
      throw err
    }
  },
  async fetchMoodboardPackages({commit}) {
    let url = '/sb/packages/moodboard'
    try {
      const res = await this.$axios.$get(url)
      if ( res.statusCode == 200 && res.data ) {
        commit("setMBPackages", res.data);
      }
    } catch (err) {
      console.error('error  cancelsubscriptionbytypeform ->', err)
      throw err
    }
  },
};

const mutations = {
  updateFoyrCoins: (state, payload) => {
    if (Object.prototype.hasOwnProperty.call(payload, 'total_earned_coin')) {
      state.foyrCoins.totalEarnedCoins = payload.total_earned_coin
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'coin_value')) {
      state.foyrCoins.coinValue = payload.coin_value
    }

    if (Object.prototype.hasOwnProperty.call(payload, 'available_coin')) {
      state.foyrCoins.availableCoin = payload.available_coin
    }
  },
  changeShowDemoTourPaywall: (state, data) => {
    state.showDemoTourPaywall = data;
  },
  trailPackage: (state, data) => state.isTrail = data,
  setPackages: (state, packages) => {
    if (packages.addon.length > 0) {

      let addon = {
        custom: [],
        render: [],
        // download:[]
      };
      packages.addon.forEach(element => {
        if (packages.extraInfo.addonInfo.modelCredits.codes.includes(element.code)) //production code
          addon.custom.push(element)
        if (packages.extraInfo.addonInfo.renderCredits.codes.includes(element.code)) //production code
          addon.render.push(element)
        // if(element.code == "foyr_pacakge_36" ||  element.code=="foyr_pacakge_37" || element.code=="foyr_pacakge_38")
        //   addon.download.push(element)
      });
      addon.custom.sort(function (a, b) {
        return a.totalCredits - b.totalCredits;
      })
      addon.render.sort(function (a, b) {
        return a.totalCredits - b.totalCredits;
      })
      state.addon = addon;
    } else {

      state.addon = undefined;
    }

    if (packages.data.length > 0) {
      packages.data.sort(function (a, b) {
        return a.totalCost - b.totalCost;
      })
      state.packages = packages;
    } else {
      state.packages = undefined;

    }
  },
  mySubscription: (state, mySubscription) => {
    state.mySubscription = mySubscription || [];
  },
  myServices: (state, services) => {
    state.services = services[0].application[0].serviceList;
  },
  sendserviceResponse: (state, serviceResponse) => {
    state.serviceResponse = serviceResponse;
  },
  setNewPackageDetails: (state, data) => {
    state.packageDetails = data;
  },
  setCancellationState(state, data) {

    if (data && data.type) {
      if (data.type === 'neolite') {
        this._vm.$set(state.cancelSubState, 'neoliteApi', data.data)
      } else if (data.type === 'applyDiscount') {
        this._vm.$set(state.cancelSubState, 'applyDiscountApi', data.data)

      } else if (data.type === 'upgrade') {
        this._vm.$set(state.cancelSubState, 'upgradeApi', data.data)

      } else if (data.type === 'getDiscount') {
        this._vm.$set(state.cancelSubState, 'discountOfferApi', data.data)

      } else if (data.type === 'pause') {
        this._vm.$set(state.cancelSubState, 'pauseApi', data.data)

      } else if (data.type === 'optionSelected') {
        this._vm.$set(state.cancelSubState, 'cancelSubOption', data.data)

      } else if (data.type === 'analytics') {
        this._vm.$set(state.cancelSubState, 'analytics', data.data)

      }

    }
    // if(data.resume_date && data.pause_until_date){
    //   state.cancelSubState['resumeDate'] = data.resume_date;
    //   state.cancelSubState['pauseUntil'] = data.pause_until_date;
    // }else if(data.hasOwnProperty('cancelSubOption')){
    //   state.cancelSubState['cancelSubOption'] = data.cancelSubOption;
    // }else if(data.hasOwnProperty('isDiscountApplied')){
    //   state.cancelSubState['discountAPI'] = data;
    // }

  },
  setFetchAccountInfo: (state, data) => {
    state.fetchAccountInfo = data;
  },
  setPublicConfiguration: (state, data)=>{
    state.publicConfiguration = data;
  },
  setTypeformLoadedState: (state, data) => {
    state.isTypeformLoaded = data;
  },
  setMBPackages: (state, data) => {
    state.mbPackages = data;
  },
  setUserActivePlans: (state, data) => {
    state.userActivePlans = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

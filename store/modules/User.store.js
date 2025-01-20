import Vue from "vue";
import States from "static/json/states.json";
const state = {
    user: null,
    address: null,
    Users: null,
    adminUser: null,
    states: States,
    campaign: null,
    onBoarding: undefined,
    upgradeClicked: false,
    dashboardPermissionsList: {},
    countryCode:undefined,
    isLPU : false,
    isBetaClicked: false,
    isTryBetaCode: false,
    isMatterportUser: false,
    isMoodboardUser: false, // this is going to be used for when we start selling Moodboard
    userAccountInfo: null,
    isMoodboardBetaUser: false, // this is just for Beta access
    switchToMoodboard: false,
    isUserAPDesigner: false,
    assignedServices: [],
    availableLocales: [
        {
            text: "En",
            value: "en"
        },
        {
            text: "Ja",
            value: "ja"
        },
        {
            text: "Es",
            value: "es"
        },
    ],
    selectedLocale: "en",
    countryCodeMapping: {
        US: "US",
        CA: "CA",
        AU: "AU",
        GB: "GB",
        JP: "JP",
        IN: "IN",
        MX: "MX",
        ES: "ES",
        AR: "AR",
        CO: "CO",
        EU: ["DE", "AT", "FR", "NL", "LT", "IT", "SK", "BE", "PT", "CY", "EE", "LU", "GR", "LV", "MT", "FI", "SI", "ES", "IE", "CZ", "HR", "PL", "SE", "BG"]
    },
    productMasterAccountInfo: null,
    isFoyrAIUser: false,
};
const getters = {
    remainingRenderCredit: state => state.priceLimit - state.usedRenderCredit,
    remainingRenderPower: state => state.limit - state.usedRenderPower,
    filterByText: state => text => {
        var finduser = state.adminUser.filter(todo => {
            return todo.fullName
                .trim()
                .toLowerCase()
                .includes(text.trim().toLowerCase());
        });
        return finduser;
    },
    getState: state => country => {
        return state.states.find(
            item => item.country.toLowerCase() == country.toLowerCase()
        );
    },
    userAccountInfo: state => state.userAccountInfo,
    getUserCategory: state => {
        if ( !state.user ) {
            return null
        } else if ( !state.user.accountExtraInfo ) {
            return null;
        } else if ( !state.user.accountExtraInfo.userCategory ) {
            return null;
        }

        return state.user.accountExtraInfo.userCategory;
    },
    isMoodboardBetaUser: state => state.isMoodboardBetaUser,
    switchToMoodboard: state => state.switchToMoodboard,
    assignedServices: state => state.assignedServices,
    selectedLocale: state => state.selectedLocale,
    isUserIndian: state => {
        return state.user &&
        state.user.ipInfo &&
        state.user.ipInfo.country &&
        state.user.ipInfo.country === "IN"
    },
    isUserJapanese: state => {
        return state.user &&
        state.user.ipInfo &&
        state.user.ipInfo.country &&
        state.user.ipInfo.country === "JP"
    },
    isUserSpanish: state => {
        return state.user &&
        state.user.ipInfo &&
        state.user.ipInfo.country &&
        ( state.user.ipInfo.country === "ES" ||
        state.user.ipInfo.country === "AR" ||
        state.user.ipInfo.country === "CO" ||
        state.user.ipInfo.country === "MX" )
    },
    isUserUS: state => {
        return state.user &&
            state.user.ipInfo &&
            state.user.ipInfo.country &&
            state.user.ipInfo.country === "US";
    },
    isUserCategoryHomeOwner: state => {

        const data = state.user;
        if (
            data &&
            data[ "accountExtraInfo" ] &&
            data[ "accountExtraInfo" ][ "userCategory" ] &&
            data[ "accountExtraInfo" ][ "userCategory" ] === "Home Owner"
        ) {

            return true;

        }

        return false;

    },
    isAPCatalogServiceAssigned: state => {
        return state.assignedServices.includes('foyr_service_23')
    },
    getUserCountry: state => {
        // US
        // CA
        // AU
        // GB
        // JP
        // IN
        // MX
        // DE, AT, FR, NL, LT, IT, SK, BE, PT, CY, EE, LU, GR, LV, MT, FI, SI, ES, IE, CZ, HR, PL, SE, BG = "eu"
        if(state.user && state.user.ipInfo && state.user.ipInfo.country) {
            const country = state.user.ipInfo.country
            const countryOfEU = state.countryCodeMapping.EU.find(e => e === country);
            if (countryOfEU) {
                return countryOfEU;
            }
            return state.countryCodeMapping[country] || ""
        }
    },
    isRootAccountUser: state => {
        if(
            state.user &&
            state.user.accountType &&
            state.user.accountType === "root"
        ) {
            return true
        }
        return false
    },
    isUserCurrencyUSD: state => {
        if(
            state.user &&
            state.user.currencyInfo &&
            state.user.currencyInfo.currency === "USD"
        ) {
            return true
        }
        return false
    },
    isUserCurrencyCAD: state => {
        if(
            state.user &&
            state.user.currencyInfo &&
            state.user.currencyInfo.currency === "CAD"
        ) {
            return true
        }
        return false
    },
    isUserCurrencyGBP: state => {
        if(
            state.user &&
            state.user.currencyInfo &&
            state.user.currencyInfo.currency === "GBP"
        ) {
            return true
        }
        return false
    },
    isUserCurrencyEURO: state => {
        if(
            state.user &&
            state.user.currencyInfo &&
            state.user.currencyInfo.currency === "EUR"
        ) {
            return true
        }
        return false
    },
    isUserCurrencyAUD: state => {
        if(
            state.user &&
            state.user.currencyInfo &&
            state.user.currencyInfo.currency === "AUD"
        ) {
            return true
        }
        return false
    },
    userCurrency: state => {
        // return "EUR"
        if(
            state.user &&
            state.user.currencyInfo &&
            state.user.currencyInfo.currency
        ) {
            return state.user.currencyInfo.currency
        }
        return ""
    },
    user: state => state.user,
    productMasterAccountInfo: state => state.productMasterAccountInfo,
    isFoyrAIUser: state => state.isFoyrAIUser,
    
    isUserCategoryPicked: state => {
        const data = state.user;
    
        // if (
        //     !data || 
        //     (data.accountExtraInfo && Object.keys(data.accountExtraInfo).length === 0)
        // ) {
        //     return true;
        // }
    
        // Check if userCategory exists in accountExtraInfo
        if (
            data &&
            data["accountExtraInfo"] &&
            data["accountExtraInfo"]["userCategory"]
        ) {
            return true;
        }

        return false;
    }
    
};

const actions = {
    // user data
    async fetch({ commit, dispatch, state, rootState }, { skipOnboardingCheck = false } = {}) {
        const url = `/users/me`;
        try{
            var res = await this.$axios.$get(url)
            dispatch("getProductMasterAccountInfo");
            if ( res.hasOwnProperty('isBetaUser') ) {
                // if true all new projects on 2.0
                // if false leave as it is make v1 projects

                commit('setIsBetaClicked', res.isBetaUser );
            }

            if ( res.hasOwnProperty('isMatterportUser') ) {
                // if this flag is set then we show the matterport project button
                commit('setIsMatterportUser', res.isMatterportUser );
            }

            if (res.hasOwnProperty('isMBUser')) {
                commit("setIsMoodboardUser", res.isMBUser);
                if(!state.switchToMoodboard) {
                    commit("setSwitchToMoodboard", res.isMBUser);
                }
            }

            // if ( res.hasOwnProperty('isAPDesigner') || true ) {
            //     // if this flag is set then the user is an AP user and will see AP related Inspiration flow and other things
            //     commit('setIsUserAPDesigner', true );
            // }
            if (res && res.hasOwnProperty('lpu') && res.lpu)
            commit('setLPUFlag', res.lpu)
        }catch(err){
            console.log(err)

        }

        let chatDisable = true;
        setTimeout(() => {
          if(res && res.whitelabel){
            if(res.whitelabelData && res.whitelabelData.enableChat){
              chatDisable = false;
            }
            if(chatDisable){
              if(document.getElementById('fc_frame')){
                document.getElementById('fc_frame').style.display="none";
              }else {
                setTimeout(() => {
                  if(document.getElementById('fc_frame'))
                  document.getElementById('fc_frame').style.display="none";
                }, 4000);
              }
            }
          }
        }, 4000);
        const { accountId } = res;
        dispatch('getServiceList', accountId )
        commit('Auth/setonboardingFormFilled', res.onboardingFormFilled, { root: true })
            //when user loggin or sign up msg, should invoke one time only//
        if (window.location.pathname !== "/user") {
            let logged = localStorage.getItem("loggedIn");
            let message = [
                "Hey there, you are looking fab today! Let’s get you started!",
                `Hi ${res.fullName}, such a lovely day! Let’s get rolling!`
            ];
            if (!JSON.parse(logged)) {

                // setTimeout(() => {
                //   amplitude.getInstance().logEvent("loggedIn");
                // }, 1000);
                setTimeout(function() {
                    var x = document.getElementById("snackbar");
                    x.innerHTML = message[Math.floor(Math.random() * message.length)];
                    x.className = "show";
                    x.className = x.className.replace("show", "");
                }, 4000);
                localStorage.setItem("loggedIn", true);
            } else {
                // setTimeout(() => {
                //   amplitude.getInstance().logEvent("dashboard");
                // }, 1000);
            }
        }
        //////////////////////////////////////////////////////////////////
        dispatch('Sockets/open', {}, {
            root: true
          })
        //Get active campaign data//
        dispatch("campaigns", res.accountId);
        ///////////////////////////

        //users default settings//
        dispatch("setting");
        /////////////////////////

        //User Subscription data, all packages and plans associated with this user, Customer api call //
        dispatch(
            "Subscriptions/fetchMySubscriptions", { accountId }, { root: true }
        );
        /////////////////////////////////////////////////////////////////////////////////////
        dispatch("Billing/fetchCurrentSub", { accountId }, { root: true });
        dispatch("Billing/fetchCurrentMoodboardSub", { accountId }, { root: true });
        //Get Dashboard Permissions //
        dispatch('getPermissionsList');

        /////Renders by page limit //////
        rootState.Render.renderPaged = null
        // await dispatch("Render/fetchRenderPage",{accountId:res.accountId,"page": 1,
        // "limit": 20,
        // "sortBy": { updatedAt : -1 }},{root:true})

        /////Renders by project  //////////////////
        dispatch("Render/fetchRenderListByProject",{accountId:res.accountId},{root:true})

        ////////Setting Auth amr /////
        try {

            if (
                rootState.Auth.amr &&
                rootState.Auth.amr.indexOf("signup") !== -1
            ) {
                // chmln.track("signUp");
            }
        } catch (err) {
            throw `Chmln call error - ${err}`;
        }

        ////////analytics segement //////////
        let identifyObj = {
            name: res.fullName,
            email: res.email,
            createdAt: res.createdAt,
            userAgent: window.$nuxt.$ua._ua,
            device: window.$nuxt.$ua.getActualDeviceType(),
            browser: window.$nuxt.$ua.browser(),
            accountType:res.accountType
        }
        if (
            rootState.Auth.amr &&
            rootState.Auth.amr.indexOf("signup") !== -1
        ) {
            identifyObj['signUpDevice'] = window.$nuxt.$ua.getActualDeviceType()
            if (window.analytics) {
                if (window.$nuxt.$ua.getActualDeviceType() === "pc") {
                    window.analytics.track("SignUp_Desktop", {
                        title: "SignUp_Desktop",
                    }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                } else if (window.$nuxt.$ua.getActualDeviceType() === "tablet") {
                    window.analytics.track("SignUp_Tablet", {
                        title: "SignUp_Tablet",
                    }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                } else {
                    window.analytics.track("SignUp_Mobile", {
                        title: "SignUp_Mobile",
                    }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                }
            }
        } else if(rootState.Auth.amr &&
            rootState.Auth.amr.indexOf("login") !== -1){
                if (window.analytics) {
                    if (window.$nuxt.$ua.getActualDeviceType() === "pc") {
                        window.analytics.track("login_Desktop", {
                            title: "login_Desktop",
                        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                    } else if (window.$nuxt.$ua.getActualDeviceType() === "tablet") {
                        window.analytics.track("login_Tablet", {
                            title: "login_Tablet",
                        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                    } else {
                        window.analytics.track("login_Mobile", {
                            title: "login_Mobile",
                        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                    }
                }
            }
        if (window.analytics) {
            window.analytics.identify(res._id, identifyObj);

                let groupData = {
                    name: res.fullName,
                    createdAt: res.createdAt,
                    userAgent: window.$nuxt.$ua._ua,
                    device: window.$nuxt.$ua.getActualDeviceType(),
                    browser: window.$nuxt.$ua.browser()
                }
                if (res.accountType == 'root')
                groupData.email = res.email;
                window.analytics.group(res.accountId, groupData)

        }
        //////// chat code ///////////
        setTimeout(() => {
            if (window.fcWidget) {
                // fresh chat code //
                // To set unique user id in your system when it is available
                window.fcWidget.setExternalId(res._id);

                // To set user name
                window.fcWidget.user.setFirstName(res.fullName);

                // To set user email
                window.fcWidget.user.setEmail(res.email);
            }
        }, 2000);

        //adding user to User state
        commit("setUser", res);
        dispatch("checkUserDetailsAndSetLocale")
        // if ( !skipOnboardingCheck ) {
        //     dispatch("checkOnboardingStatusAndTriggerNewProject");
        // }
        ////////////////////////
        return res;

    },
    checkOnboardingStatusAndTriggerNewProject( { state, dispatch } ) {

        if (window.$nuxt.$store.$ua.deviceType() !== 'pc') {
            return;
        }
        // if the user comes here post login then in that case user object should always be available
        if ( state.user.onboardingFormFilled && !state.user.onboardingGoalFilled ) {
            let projectName = (state.user && state.user.fullName) ? `My first project_${state.user.fullName}` : 'My first project'
            // this.creatNewV2Project({ type: ['project'], name: projectName + 1, folder: null }).then( async (projRes) => {})
            dispatch("Projects/creatNewV2Project", { type: ['project'], name: projectName, folder: null }, { root: true }).then( async projRes => {
                // await this.updateGoalStatus({ onboardingGoalFilled: "true" }).catch(e => { console.log(e); });
                await dispatch("updateGoalForm", { onboardingGoalFilled: "true" }).catch(e => { console.log(e); });
                window.open(window.location.origin + "/toolv2?project=" + projRes.id + "&isonboarding=true", "_self");
            } )
        }
    },
    campaigns({ commit }, account) {
        const url = `/sb/subscription/customer/me?accountId=${account}`;
        return this.$axios
            .$get(url)
            .then(res => {
                if (res && res.data.isActive) commit("setCompaign", res);
            })
            .catch(err => {
                throw err.response;
            });
    },
    // account settings, active service for this user
    setting({ commit }) {
        const url = `/users/account/settings`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setSetting", res.data);
            })
            .catch(err => {
                throw err.response;
            });
    },
    // send invite via email
    registerUser(ctx, payload) {
        const url = `/users/invite`;
        return this.$axios
            .$post(url, payload)
            .then(res => res)
            .catch(err => {
                throw err.response;
            });
    },
    deleteTeamInvite(ctx, payload) {
        const url = `/auth/delete-invite`;
        return this.$axios
            .$post(url, {
                id: payload
            })
            .then(res => res)
            .catch(err => {
                throw err.response;
            });
    },
    deleteTeamMember(ctx, payload) {
        const url = `/auth/delete-user`;
        return this.$axios
            .$post(url, {
                id: payload
            })
            .then(res => res)
            .catch(err => {
                throw err.response;
            });
    },
    // account users
    requestUsers({ commit, dispatch }, { accountId }) {
        const url = `/users/team`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setUsers", res.data);
                //dispatch('requestTeamUsage',{accountId});
            })
            .catch(err => {
                throw err;
            });
    },

    adminUsers({ commit }, { accountId }) {
        const url = `/users`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setAdminUsers", res);
            })
            .catch(err => {
                throw err;
            });
    },
    //subsciption used by users
    requestTeamUsage({ commit }, { accountId }) {
        const url = `/sb/subscription/teamusage/`;
        return this.$axios.$get(url, { params: { accountId } }).then(res => {
            if (res.error != "danger" && res.data.length > 0)
                commit("addUsageToUsers", res.data[0].usage);
            else commit("addUsageToUsers", []);
        });
    },
    // user address
    fetchAddress({ commit }) {
        const url = `/users/me/address`;
        return this.$axios
            .$get(url)
            .then(res => {
                if (res[0]) commit("setAddress", res[0]);
                else commit("setAddress", res);
            })
            .catch(err => {
                throw err;
            });
    },
    changeRole(ctx, payload) {
        const url = "/auth/blockUser";
        return this.$axios
            .$post(url, payload)
            .then(res => res)
            .catch(err => {
                throw err;
            });
    },
    getPermissionsList({commit,dispatch},payload){
        const url = "/auth/modules";
        return this.$axios
            .$get(url)
            .then(res => {
                commit('setDashboardPermissionsList',res.data)
            })
            .catch(err => {
                throw err.response;
        });
    },
    getAccount({ commit,dispatch }) {
        const url = "/users/accounts/me";
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setAccount", res.account);
                return res;
            })
            .catch(err => {
                throw err;
            });
    },
    // update user data
    update({ dispatch }, { fullName, dpUrl }) {
        const url = `/users`;
        return this.$axios
            .$put(url, { fullName, dpUrl })
            .then(res => {
                dispatch("fetch");
                return res;
            })
            .catch(err => err);
    },
    //update account data
    updateAccount({ commit }, { companyName, billingAddress, language }) {
        const url = `/users/accounts/root`;
        let prepareObj = {}
        if(billingAddress && billingAddress.country){
            prepareObj['country'] = billingAddress.country;
        }
        if(companyName) {
            prepareObj['companyName'] = companyName;
        }
        if(language) {
            prepareObj['language'] = language;
        }
        return this.$axios
            .$put(url, prepareObj)
            .then(res => res)
            .catch(err => err);
    },
    //update address
    updateAddress({ commit }, {
        billingAddress: { street, pincode, country, city, state },
        contactNumber,
        firstName,
        lastName,
        companyName
    }) {
        const url = `/users/accounts/root`;
        return this.$axios
            .$put(url, {
                billingAddress: { street, pincode, country, city, state },
                contactNumber,
                firstName,
                lastName,
                companyName
            })
            .then(res => res)
            .catch(err => err);
    },
    saveOnboarding({ commit }, payload) {
        const url = `/users/accounts/root`;
        return this.$axios
            .$put(url, payload)
            .then(res => {
              const urlUsers = `/users/me`;
              this.$axios.$get(urlUsers).then(usersData => {
                  commit("setUser", usersData);
                })
                return res
            })
            .catch(err => {
                throw err
            });
    },
    // fetch user details
    fetchUserDetails({ commit }) {
        const urlUsers = `/users/me`;
        return this.$axios.$get(urlUsers).then(usersData => {
            console.log({usersData})
            commit("setUser", usersData);
            return usersData
        }).catch(err => err);
    },
    //change password
    resetPassword({ dispatch }, payload) {
        const url = `/users/changepassword`;
        return this.$axios
            .$put(url, payload)
            .then(res => res)
            .catch(err => err);
    },
    //get s3 url for image upload
    getUploadUrl({ dispatch }, payload) {
        const url = `/users/signedUrl`;
        return this.$axios
            .$post(url, { fileName: payload.name })
            .then(res => {
                console.log(res.data);
                dispatch("uploadFile", { payload: payload, url: res.data.url });
                // res.data.url.substring(0,res.data.url.indexOf("?"))
            })
            .catch(err => err);
    },
    //upload file to s3 url
    uploadFile({ dispatch }, payload) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200)
                    dispatch("update", {
                        dpUrl: payload.url.substring(0, payload.url.indexOf("?"))
                    });
            }
        };
        xhr.upload.onprogress = event => {
            var progress = Math.round((event.loaded / event.total) * 100);
            //this.progressNotifier.next({ progress: progress, file: file });
        };
        xhr.open("PUT", payload.url, true);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(payload.payload);
    },
    //onboarding user category and fields
    fetchOnboarding({ commit }) {
        const url = `/usercategory/getAll`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit('setOnBoarding', res)
                return res;
                // res.data.url.substring(0,res.data.url.indexOf("?"))
            })
            .catch(err => err);
    },
    updateGoalForm({ commit }, payload) {
        const url = '/users/accounts/updateFormStatus'
        return this.$axios
            .$put(url, {
                onboardingGoalFilled: "true"
            })
            .then(res => {
                // console.log(res)
                if (res) {
                    const urlUsers = `/users/me`;
                    this.$axios.$get(urlUsers).then(usersData => {
                        commit("setUser", usersData);
                    })
                }
                return res;
            })
            // if (payload && payload.onboardingGoalFilled) {}
    },
    inviteLink({ commit }, payload) {
        if (payload && payload.accountId && payload.childEmail) {
            const url = `/sb/customer/invite`;
            return this.$axios
                .$get(url, { params: payload })
                .then(res => {
                    return res;
                    // res.data.url.substring(0,res.data.url.indexOf("?"))
                })
                .catch(err => err);
        }
    },
    changeBtnClicked({commit,dispatch},payload){
        commit('upgradeClickedForCoupon',payload);
    },
    async getCountryCode({commit}){
        const url = '/users/country/code/dial';
        let response = await this.$axios.$get(url);
        console.log(response);
        commit('setCountryCode',response.data)
    },
    getServiceList({
      commit
    }, account) {
      const url = `/sb/subscription/servicelist?accountId=${account}`;
      return this.$axios
        .$get(url)
        .then(res => {
          if (res && res.data) {
            if (res.data.indexOf('foyr_service_11') >= 0)
              commit('setTryBetaFlag', true);
            else
              commit('setTryBetaFlag', false);

            if (res.data.indexOf('foyr_service_22') >= 0)
              commit('setIsMoodboardBetaUser', true);
            else
              commit('setIsMoodboardBetaUser', false);

            if ( res.data.indexOf('foyr_service_33') >= 0 ) {
                commit('setIsUserAPDesigner', true );
            }
            if ( res.data.includes('foyr_service_53')) {
                commit('setIsFoyrAIUser', true );
            }

            commit("setAssignedServices", res.data || []);
          }
        })
        .catch(err => {
          throw err.response;
        });
    },
    fetchAccountInfo({ commit, dispatch, rootState }, payload) {
        const url = '/sb/accountinfo/fetchaccountinfo'
        return this.$axios
            .$get(url)
            .then(res => {
                if (res.data) {
                    commit("setUserAccountInfo", res.data);
                }
                return res.data;
            }).catch(err => {
                throw err.response.data.error;
            });
    },
    updateAccountInfo({ commit, dispatch }, payload) {
        const url = '/sb/accountinfo/updateaccountinfo'
        return this.$axios
            .$post(url, payload)
            .then(res => {
                // return res.data;
                // console.log(res.data)
                // commit('setTourStatus',)
                if (res.data) {
                    return res.data
                } else {
                    return null
                }
            })
            .catch(err => {
                throw err.response.data.error;
            });
    },
    checkUserDetailsAndSetLocale({ getters, commit }) {
        if (getters.isUserJapanese) {
            commit("setSelectedLocale", "ja")
        } else if (getters.isUserSpanish) {
            commit("setSelectedLocale", "es")
        }
    },
    sendOTP({}, payload) {
        const url = '/auth/otp'
        return this.$axios
            .$post(url, payload)
            .then(res => {
            }).catch(err => {
                throw err.response.data.error;
            });
    },
    resendOTP({}, payload) {
        const url = '/auth/otp/retry'
        return this.$axios
            .$post(url, payload)
            .then(res => {
            }).catch(err => {
                throw err.response.data.error;
            });
    },
    verifyOTP({}, payload) {
        const url = '/auth/otp/verify'
        return this.$axios
            .$post(url, payload)
            .then(res => {
            }).catch(err => {
                throw err.response.data.error;
            });
    },
    async getProductMasterAccountInfo( { commit } ) {
        const url = '/pmaccountinfo'
        return this.$axios
            .$get(url)
            .then(res => {
                if ( res && res.data ) {
                    commit( "setProductMasterAccountInfo", res.data );
                    return { ok: true };
                } else {
                    return { ok: false };
                }
            }).catch(err => {
                return { ok: false, e: err.response.data.error };
            });
    },

    async updateProjectDetail( { commit }, { keyToUpdate, data } ) {

        let tempObj = {
            [ keyToUpdate ]: data,
        };

        const url = '/pmaccountinfo'
        return this.$axios
            .$post(url, tempObj)
            .then(res => {
                if ( res && res.data ) {
                    commit( "setProductMasterAccountInfo", res.data );
                    return { ok: true, data: res.data };
                }

                return { ok: true, data: res.data || {} };
            }).catch(err => {
                return { ok: false, data: {} };
            });
    },
};

const mutations = {
    setUser: (state, user) => {
        state.user = user;
    },
    setCompaign: (state, data) => {
        state.campaign = data.data;
        state.campaign.campaignPackages = data.campaignPackages;
    },
    setSetting: (state, setting) => {
        state.user.setting = setting;
    },
    setAccount: (state, account) => {
        Vue.set(state, "account", account);
    },
    setAddress: (state, address) => {
        Vue.set(state, "address", address);
    },
    setUsers: (state, users) => {
        Vue.set(state, "Users", users.users);
        Vue.set(state, "invited", users.invites);
    },
    setAdminUsers: (state, users) => {
        Vue.set(state, "adminUser", users);
    },
    addUsageToUsers: (state, usage) => {
        if (usage.length > 0) {
            state.Users.forEach(item => {
                const selectedUser = usage.find(user => {
                    return user.customerID == item._id;
                });
                if (selectedUser) item.usage = selectedUser.usedMetricQuantity;
                else item.usage = 0;
            });
        } else {
            state.Users.forEach(item => {
                item.usage = 0;
            });
        }
    },
    setOnBoarding: (state, data) => {
        state.onBoarding = data;
    },
    upgradeClickedForCoupon:(state, data)=> {
        state.upgradeClicked = data;
    },
    setDashboardPermissionsList: (state,data)=> {
        state.dashboardPermissionsList = data;
    },
    setCountryCode:(state,data) =>{
        state.countryCode = data
    },
    setLPUFlag : (state, data) => {
      state.isLPU = data;
    },
    setBetaFlag: (state, flag) => {
      state.isBetaClicked = flag;
    },
    setTryBetaFlag: (state, flag) => {
      console.log('FLAG RECIEVED BETA', flag)
      state.isTryBetaCode = flag;
    },
    setIsBetaClicked(state, flag) {
        state.isBetaClicked = flag;
    },
    setUserAccountInfo(state, data) {
        state.userAccountInfo = data;
    },
    setIsMatterportUser(state, data) {
        state.isMatterportUser = data;
    },
    setIsMoodboardUser(state, data) {
        state.isMoodboardUser = data;
    },
    setIsMoodboardBetaUser(state, data) {
        state.isMoodboardBetaUser = data;
    },
    setIsUserAPDesigner(state, data) {
        state.isUserAPDesigner = data;
    },
    setSwitchToMoodboard(state, data) {
        state.switchToMoodboard = data;
        console.log(
            "%c switchToMoodboard",
            "color: coral; font-family:monospace; font-size: 20px",
            state.switchToMoodboard
        );
    },
    setSwitchToMoodboardAndRedirectToDashboard(state, data) {
        state.switchToMoodboard = data;
        if(
            this.$router &&
            this.$router.currentRoute &&
            this.$router.currentRoute.name !==  'moodboard-dashboard'
        ) {
            this.$router.push(this.localePath("/moodboard/dashboard"));
        }
    },
    setAssignedServices(state, data) {
        state.assignedServices = data;
    },
    setSelectedLocale(state, data) {
        if (this.$i18n.getLocaleCookie() !== data) {
            this.$i18n.setLocale(data)
            state.selectedLocale = data;
        }
    },
    setProductMasterAccountInfo( state, data ) {
        state.productMasterAccountInfo = data;
    },
    setIsFoyrAIUser( state, data ) {
        state.isFoyrAIUser = data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

<template>
    <section v-if="!loadingPaymentPage" class="moodboard-settings-wrapper" style="background:white">
        <demoTourTypeForm />
        <div 
            v-if="showPlanDetailsBanner && activeMoodboardRewardPlan && isUserOnMoodBoardPaidPlan" 
            class="moodboard-plan-details-wrapper"
        >
            <div class="plan-details-wrapper">
                <div class="plan-header">
                    {{activeMoodboardRewardPlan.displayContext.packageName}}
                </div>
                <div class="plan-description">
                    <div class="plan-renewal-details">
                        your reward will end on <span> {{ getFormattedDate(activeMoodboardRewardPlan.subscriptionExpiryDate) }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div 
            v-else-if="showPlanDetailsBanner && currentSubscription && isUserOnMoodBoardPaidPlan" 
            class="moodboard-plan-details-wrapper"
        >
            <div class="plan-details-wrapper">
                <div class="plan-header">
                    {{currentSubscription.displayContext.packageName}}
                </div>
                <div class="plan-description">
                    <div class="plan-sub-header">
                        <!-- For beiginners and personal use -->
                    </div>
                    <div v-if="isUserOnMoodBoardFreeTrial" class="plan-renewal-details">
                        your free trial expires on <span> {{ getFormattedDate(currentSubscription.subscriptionExpiryDate) }}</span>
                    </div>
                    <div v-else-if="isUserOnMoodBoardPaidPlan" class="plan-renewal-details">
                      <template v-if="isMoodBoardPlanCancelled">
                        your plan will end on <span> {{ getFormattedDate(currentSubscription.subscriptionExpiryDate) }}</span>
                      </template>
                      <template v-else>
                        your plan will renew on <span> {{ getFormattedDate(currentSubscription.nextBilling) }}</span>
                      </template>
                    </div>
                </div>
            </div>
            <div v-if="!isMoodBoardPlanCancelled" class="cancel-subscription-button" @click="handleCancelSubscriptionClick">
                Cancel subscription
            </div>
        </div>
        <div v-else-if="foyrMoodboardPackageDetails && currentSubscription" class="try-moodboard-banner">
            <div class="cta-wrapper">
                <div class="cta-text">
                    {{ foyrMoodboardPackageDetails.displayContext.packageName }}
                </div>
                <div class="cta-action">
                    <div class="buy-mmodboard-button" @click="handleBuyMoodboardButtonClick">
                        Buy now for {{foyrMoodboardPackageDetails.displayContext.currency_symbol}} {{ foyrMoodboardPackageDetails.displayContext.originalPrice }} per month
                    </div>
                </div>
                <div v-if="isUserOnMoodBoardFreeTrial" class="ft-expiry-date">
                      <template v-if="new Date(currentSubscription.subscriptionExpiryDate).getTime() - new Date().getTime() > 0">
                        *your free trial expires on <span> {{ getFormattedDate(currentSubscription.subscriptionExpiryDate) }}</span>
                      </template>
                      <template v-else>
                        *your free trial expired on <span> {{ getFormattedDate(currentSubscription.subscriptionExpiryDate) }}</span>
                      </template>
                </div>
            </div>
            <div class="cta-graphic-wrapper">
                <img src="../../../assets/images/settings/try-moodboard-cta-graphic.png" alt="">
            </div>
        </div>
        <!-- Processing your payment  ************************ receivingPaymentLoading-->
        <div class="popup-div payment-updating-popup" :class="receivingPaymentLoading? 'showPopUp' : ''">
            <div class="popup-container" @click.stop>
                <div class="payment-wait-container">
                    <img src="~assets/images/loader.gif" alt="" srcset="" />
                    <p>Your subscription details are being updated, please do not refresh</p>
                </div>
            </div>
        </div>
        <MessageComponent :changeRight="message"/>
        <thankyouComponent/>
        <nuxt-child :packages="packages" :services="services" :user="user" :mySubscription="mySubscription"  :users="users" :invited="invited" :addon="addon" />
    </section>
    <div v-else>
		<div class="main-loading" v-if="loadingPaymentPage">
			<div class="loading-container">
				<p>You will soon be redirected to payment page..Please wait.</p>
				<div class="loader"></div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
// import DemoTourPaywall from "../../components/shared/demoTourPaywall/demoTourIndex.vue";
import demoTourTypeForm from "@/components/shared/demoTourPaywall/demoTourTypeForm.vue";
import thankyouComponent from "@/components/shared/popups/thankyou";
import MessageComponent from "@/components/shared/globalMessage";
import banner from "@/components/shared/dashboard/banner.vue";
export default {
  components: {
    MessageComponent,
    demoTourTypeForm,
    thankyouComponent,
    banner
  },
  layout: "moodboard-dashboard",
  middleware: ["initAuth", "authReq"],
  head() {
    return {
      title: "Neo - Dashboard"
    };
  },
  data() {
    return {
      message: {
        value: "",
        error: false,
        global: false
      },
      paymentStatus: false,
      parentRoute: "/moodboard/settings",
      loadingPaymentPage: false,
      receivingPaymentLoading: false
    };
  },
  watch: {
    user: function(data) {
      if (data) {
        const { accountId } = data;
        if (data.accountInfo.accountCategory == "REGULAR") {
          this.fetchSubscriptions({ accountId });
          this.getServices({ accountId });
        }

        this.fetchMySubscriptions({ accountId });
        if (!this.currentSubscription)
          this.fetchCurrentSubscription({ accountId });
        this.requestUsers({ accountId });
        if (!this.user.billingAddress)
          this.user.billingAddress = {
            street: "",
            country: "",
            city: "",
            pincode: ""
          };
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.User.user,
      packages: state => state.Subscriptions.packages,
      mbPackages: state => state.Subscriptions.mbPackages,
      addon: state => state.Subscriptions.addon,
      mySubscription: state => state.Subscriptions.mySubscription,
      services: state => state.Subscriptions.services,
      users: state => state.User.Users,
      currentSubscription: state => state.Billing.currentMoodboardSubscription,
      activeMoodboardRewardPlan: state => state.Billing.activeMoodboardRewardPlan,
      invited: state => state.User.invited,
      isChargebee: state => state.Billing.isChargebee,
      mbPlanIds: state => state.Billing.mbPlanIds
    }),
    ...mapGetters({
      isUserOnMoodBoardPaidPlan: "Billing/isUserOnMoodBoardPaidPlan",
      isUserOnMoodBoardFreeTrial: "Billing/isUserOnMoodBoardFreeTrial",
      isMoodBoardPlanCancelled: "Billing/isMoodBoardPlanCancelled",
      hasMoodBoardPlanExpired: "Billing/hasMoodBoardPlanExpired"
    }),
    foyrMoodboardPackageDetails() {
      if (!this.mbPackages) return null;

      return this.mbPackages.find(e => e.id == this.mbPlanIds.basicPaid);
    },
    showBuyMoodboardBanner() {
      if (this.foyrMoodboardPackageDetails) {
        if (this.isUserOnMoodBoardPaidPlan && !this.hasMoodBoardPlanExpired) {
          return false;
        } else return true;
      }
      return false;
    },
    showPlanDetailsBanner() {
      if (this.hasMoodBoardPlanExpired) return false;
      return true;
    }
  },
  mounted() {
    setTimeout(() => {
      this.getPublicConfiguration();
      this.getTheTourStatus().then(response => {});
    }, 5000);
    this.$root.$on("save-profile-changes", this.update);
    this.$root.$on("bill-update-request", _status => {
      // console.log('Event Reached Bill Update Request')
      this.paymentStatus = _status.payment ? _status.payment : false;
    });
    this.$root.$on("payment-popup-close", _data => {
      if (this.paymentStatus) {
        if (_data.type && _data.type === "addon")
          this.$root.$emit("addon-payment-update", true);
        else this.$root.$emit("waiting-for-payment-update", true);
        setTimeout(async () => {
          this.paymentStatus = false;
          await this.fetchCurrentSubscription({
            accountId: this.user.accountId
          });
          this.fetchMySubscriptions({
            accountId: this.user.accountId
          });
          this.fetchSubscriptions({
            accountId: this.user.accountId
          });
          this.$root.$emit("waiting-for-payment-update", false);
          this.$root.$emit("addon-payment-update", false);
          // this.$root.$emit('fetchlatestplandetails')
        }, _data && _data.waitingTime ? _data.waitingTime : 12000);
        // this.fetchInitialData();
      }
    });
    this.$root.$on("waiting-for-payment-update", _loading => {
      this.receivingPaymentLoading = _loading;
      //   if (!_loading) this.$router.push("/settings/plans");
    });
    this.fetchInitialData();
    if (window.analytics) {
      window.analytics.track(
        "Setting",
        {
          title: "Moodboard Setting Page",
          subtitle: "open"
        },
        {
          integrations: {
            Amplitude: { session_id: new Date().getTime() }
          }
        },
        { timestamp: new Date().getTime() }
      );
    }
    this.setSwitchToMoodboard(true);
  },
  methods: {
    ...mapMutations("User", ["setSwitchToMoodboard"]),
    ...mapActions({
      // getUser: 'User/fetch',
      fetchSubscriptions: "Subscriptions/fetchAll",
      fetchMySubscriptions: "Subscriptions/fetchMySubscriptions",
      fetchMoodboardPackages: "Subscriptions/fetchMoodboardPackages",
      getServices: "Subscriptions/services",
      updateUser: "User/update",
      updateAccount: "User/updateAccount",
      fetchCurrentSubscription: "Billing/fetchCurrentMoodboardSub",
      requestUsers: "User/requestUsers",
      requestTeamUsage: "User/requestTeamUsage",
      getTheTourStatus: "Subscriptions/getTheTourStatus",
      getPublicConfiguration: "Subscriptions/getPublicConfiguration",
      buy: "Subscriptions/buyMoodboardPlan",
      cancel: "Subscriptions/cancel",
      openCancelSubscriptionPopup: "Dash/openCancelSubscriptionPopup"
    }),
    getDays: function(date) {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(date);
      const secondDate = new Date();
      return Math.round(
        Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
      );
    },
    update: function() {
      const { fullName, companyName, billingAddress, language } = this.user;
      this.updateUser({ fullName }).then(res => {
        if (res.error) {
          this.message.error = true;
        } else {
          this.message.error = false;
          this.message.value = res.message;
          if (res.message == "")
            this.message.value = "Accounts details updated";
          this.message.global = true;
          setTimeout(() => {
            this.message.global = false;
          }, 4000);
        }
      });
      if (this.user && this.user.accountType == "root")
        this.updateAccount({
          companyName,
          billingAddress,
          language
        }).then(res => {
          if (res && res.error) {
            this.message.error = true;
          } else {
            // this.message.error = false;
            // this.message.value=res.message;
            // if(res.message == "")
            //     this.message.value = "Account details updated"
            // this.message.global = true;
            // setTimeout(() => {
            //     this.message.global = false;
            // }, 4000);
          }
        });
    },
    fetchInitialData() {
      this.fetchMoodboardPackages();
      if (this.user) {
        if (this.user) {
          const { accountId } = this.user;
          if (this.user.accountInfo.accountCategory == "REGULAR") {
            this.fetchSubscriptions({ accountId });
            this.getServices({ accountId });
          }
          this.fetchMySubscriptions({ accountId });
          if (!this.currentSubscription)
            this.fetchCurrentSubscription({ accountId });
          this.requestUsers({ accountId });
          if (!this.user.billingAddress)
            this.user.billingAddress = {
              street: "",
              country: "",
              city: "",
              pincode: ""
            };
        }
      }
    },
    handleBuyMoodboardButtonClick() {
      this.buyPlan(this.foyrMoodboardPackageDetails);
    },
    buyPlan(_packageDetails, _duration) {
      this.selectedPlanDetails = _packageDetails;
      this.selectedPlanDetails["duration"] = _duration;
      // if (window.analytics) {
      //     analytics.track(
      //     "Buy Now",
      //     {
      //         author: this.user.email,
      //         frequency: `${_duration}`,
      //         plan: this.isLPU
      //         ? `Foyr ${_packageDetails.package}`
      //         : _packageDetails.package,
      //         lpu: this.isLPU
      //     },
      //     { integrations: { Amplitude: { session_id: new Date().getTime() } } },
      //     { timestamp: new Date().getTime() }
      //     );
      // }
      // this.analyticsDataToBackend({ buy_now_click: true });
      if (_packageDetails && _packageDetails._id) {
        if (this.isChargebee) {
          this.openPaymentPopup(true);
        }
      }
    },
    openPaymentPopup(_isUpgrade) {
      let oldPlan =
        this.currentMoodboardSubscription &&
        this.currentMoodboardSubscription.displayContext &&
        this.currentMoodboardSubscription.displayContext.packageName
          ? this.currentMoodboardSubscription.displayContext.packageName
          : null;
      let chargebeeInstance = Chargebee.getInstance();
      if (_isUpgrade) {
        this.loadingPaymentPage = true;
        this.$parent.isRedirecting = true;
      }
      // Requesting for host page url
      this.buy({
        accountId: this.user.accountInfo.accountId,
        package: this.selectedPlanDetails._id
      }).then(res => {
        this.loadingPaymentPage = false;
        this.$parent.isRedirecting = false;
        this.$parent.show = false;
        // sending email on plan buy
        // this.prepareEmailTemplate(
        //   this.isLPU
        //     ? `Foyr ${this.selectedPlanDetails.package}`
        //     : this.selectedPlanDetails.package,
        //   this.selectedPlanDetails.duration
        // );
        if (window.analytics) {
          window.analytics.track(
            "subscriptionBuy",
            {
              title: "buy",
              subtitle: this.selectedPlanDetails._id,
              author: this.user.email,
              lpu: this.isLPU
            },
            {
              integrations: { Amplitude: { session_id: new Date().getTime() } }
            },
            { timestamp: new Date().getTime() }
          );
        }
        if (this.isChargebee) {
          // it is for chargebee
          if (_isUpgrade) {
            chargebeeInstance.openCheckout({
              hostedPage: function() {
                return new Promise(function(resolve, reject) {
                  resolve(res.hostedPage);
                });
              },
              success: hostedPageId => {
                console.log("SUCCESS");
                window.$nuxt.$emit("bill-update-request", {
                  payment: true,
                  plan: oldPlan
                });
                window.$nuxt.$emit("buy_success_tour_launch", {
                  plan: oldPlan
                });
              },
              close: () => {
                console.log("close");
                window.$nuxt.$emit("payment-popup-close", {
                  type: "main",
                  waitingTime: 11000
                });
              }
            });
          } else {
            // // this.$root.$emit("bill-update-request",);
            // this.fetchMySubscriptions({ accountId: this.user.accountId });
            // this.message.value =
            //   "Your new plan has updated successfully. Please check more details in billing.";
            // this.message.global = true;
            // this.message.error = false;
            // setTimeout(() => {
            //   this.message.value = "";
            //   this.message.global = false;
            // }, 3500);
          }
        }
      });
    },
    handleCancelSubscriptionClick() {
      this.cancelSub = false;
      this.openCancelSubscriptionPopup({
        postConfirmationCallback: () => {
          this.$root.$emit("waiting-for-payment-update", true);
          this.cancel({
            id: this.currentSubscription.subscription,
            accountId: this.user.accountId
          }).then(res => {
            setTimeout(async () => {
              await this.fetchCurrentSubscription({
                accountId: this.user.accountId
              });

              this.$root.$emit("waiting-for-payment-update", false);

              this.message.value =
                "We have recieved your subscription cancellation request. It will be cancelled at the end of your term";
              this.message.global = true;
              setTimeout(() => {
                this.message.global = false;
                this.message.value = "";
              }, 4000);
            }, 11000);
          });
        }
      });
    },
    getFormattedDate(dateToFormat) {
      if (dateToFormat) {
        let newDate = new Date(dateToFormat);
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
        newDate =
          mlist[newDate.getMonth()] +
          " " +
          newDate.getDate() +
          ", " +
          newDate.getFullYear();
        return newDate;
      } else {
        return "N/A";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.setting-head {
  // background: #E9E9E9;
  background: #faf0ec;
  padding: 1.5625rem 3.125rem 0.4375rem 3.125rem;
  position: relative;
  // z-index: 1;
  .setting-right {
    position: absolute;
    right: 7%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    .plans-text {
      font-weight: 500;
      font-size: 1.3rem;
      width: 17rem;
      line-height: 2.0625rem;
      color: #505050;
      text-align: right;
    }
    button {
      @include button-head(#222021);
      color: #222021;
      margin: 0rem;
      cursor: pointer;
      @include background-animate(#e9beb3, black);
    }
  }
  .setting-left {
    h2 {
      margin-bottom: 2.8125rem;
    }
  }
  .nav-tabs {
    display: flex;
    .active-link {
      border-bottom: 0.0625rem solid $color-head;
      color: black;
    }
    a {
      text-decoration: none;
      color: #868686;
      margin: 0rem;
      margin-right: 2.8125rem;
      padding-bottom: 0.4375rem;
      position: relative;
      span {
        position: absolute;
        left: 105%;
        color: $color-head;
        top: 0.25rem;
        width: max-content;
      }
    }
  }
}
.setting-details-container {
  padding: 1.5625rem 3.125rem;
  background: #fbf3f1;
  .profile-image {
    height: 8.25rem;
    width: 8.25rem;
    background: white;
    border-radius: 50%;
    position: relative;
    margin-bottom: 3.125rem;
    img {
      position: absolute;
      right: -0.625rem;
      bottom: 0rem;
    }
  }
  .profile-form {
    padding: 0.9375rem 1.5625rem;
    border: 0.0625rem solid #fff;
    width: max-content;
    margin-bottom: 0.9375rem;
    p {
      margin-bottom: 0.3125rem;
    }
    input {
      background: white;
      margin-bottom: 1.5625rem;
      width: 21.875rem;
    }
    select {
      background: white;
      width: 100%;
    }
  }
}

.try-moodboard-banner {
  width: calc(100% - 1.25rem * 1.22 * 2);
  min-height: 8.125rem * 1.22;
  background: linear-gradient(268.52deg, #fff5f1 -19.97%, #f8f0ed 112.56%);
  margin: 0 auto;
  margin-top: calc(1.25rem * 1.22);
  // padding-right: calc(2.875rem * 1.22);

  display: flex;
  justify-content: space-between;

  .cta-wrapper {
    margin-left: calc(2rem * 1.22);
    margin-right: 10rem;
    margin-top: calc(1.5rem * 1.22);

    .cta-text {
      font-style: normal;
      font-weight: 700;
      font-size: 2rem * 1.22;
      line-height: 2.25rem * 1.22;
      color: $plan-title;
    }

    .cta-action {
      margin-top: calc(1.5rem * 1.22);
      margin-bottom: calc(1 * 1.22);
      display: flex;
      .buy-mmodboard-button {
        cursor: pointer;
        background: $plan-title;
        padding: calc(0.6875rem * 1.22);

        font-weight: 500;
        font-size: 0.875rem * 1.22;
        line-height: 1.375rem * 1.22;

        text-transform: uppercase;
        color: #e2c0b6;
      }
    }

    .ft-expiry-date {
      margin-top: calc(1rem * 1.22);
      font-weight: 400;
      font-size: 0.875rem * 1.22;
      line-height: 1.75rem * 1.22;

      span {
        font-style: normal;
        font-size: 0.875rem * 1.22;
        line-height: 1.75rem * 1.22;
        font-weight: 700;
        color: $plan-title;
      }
    }
  }

  .cta-graphic-wrapper {
    margin-right: calc(1.4375rem * 1.22);
    width: calc(41.8125rem * 1.22);
    display: flex;
    align-items: center;
    // max-height: 8.125rem * 1.22;

    img {
      // max-height: 100%;
      // max-width: 100%;
      // width: auto;
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.moodboard-plan-details-wrapper {
  width: calc(100% - 1.25rem * 1.22 * 2);
  margin: 0 auto;
  margin-top: calc(1.25rem * 1.22);

  .plan-details-wrapper {
    display: flex;
    justify-content: space-between;
    background: linear-gradient(268.52deg, #fff5f1 -19.97%, #f8f0ed 112.56%);
    width: 100%;
    padding: calc(3.25rem * 1.22) calc(1.625rem * 1.22) calc(3.25rem * 1.22)
      calc(3rem * 1.22);
    margin-bottom: calc(1rem * 1.22);

    .plan-header {
      font-style: normal;
      font-weight: 700;
      font-size: calc(2.5rem * 1.22);
      line-height: calc(2.75rem * 1.22);
      color: $plan-title;
      margin-bottom: 0.625rem;
      color: $plan-title;
    }

    .plan-description {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .plan-sub-header {
        font-style: normal;
        font-weight: 400;
        font-size: calc(1.125rem * 1.22);
        line-height: calc(1.75rem * 1.22);
        color: $plan-title;
      }

      .plan-renewal-details {
        font-style: normal;
        font-weight: 400;
        font-size: calc(1.125rem * 1.22);
        line-height: calc(1.75rem * 1.22);
        color: $plan-title;

        span {
          font-style: normal;
          font-weight: 700;
          font-size: calc(1.125rem * 1.22);
          line-height: calc(1.75rem * 1.22);
          color: $plan-title;
        }
      }
    }
  }

  .cancel-subscription-button {
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    text-align: right;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.moodboard-settings-wrapper {
  .profile-page-wrapper {
    width: calc(100% - 1.25rem * 1.22 * 2) !important;

    .setting-details-container.profile-account {
      width: 90%;
    }
  }
}
</style>

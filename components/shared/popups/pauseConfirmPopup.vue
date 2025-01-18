<template>
  <div class="pause-confirm-alert">
    <!-- Popup-1 -->
    <div
      class="upgrade-success-container deactivate-alert-container popup-div"
      :class="openNewCancelFlow ? 'showPopUp' : ''"
    >
      <div class="popup-container">
        <div
          class="close-x"
          @click="closePopup()"
        >
          <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7002 0.674072L1.2002 12.0741"
              stroke="white"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M12.8004 12.2742L1.40039 0.77417"
              stroke="white"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div
          class="top-container"
          v-if="(currentBilling && currentBilling.displayContext)"
        >
          <div class="content">
            <p class="heading">{{ $t("plansNew.wantToCancelSubscription") }}</p>
            <div class="sub-heading">
              <p>
                <!-- <span>Your current plan <b>{{(currentBilling && currentBilling.displayContext && currentBilling.displayContext.packageName) ? currentBilling.displayContext.packageName: ''}} - {{currentBilling && currentBilling.billing === 1? 'Monthly': currentBilling.billing === 3 ? 'Quarterly': 'Yearly'}}</b> will be cancelled.</span> -->
                <span>{{ $t("plansNew.reminderOnCancelSubscriptionText") }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bottom-container cs-cancel-bottom">
          <img class="bg-pattern" src="~assets/images/mobile/bg.png" />
          <svg
            width="350"
            height="250"
            viewBox="0 0 358 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M116.5 -8.58307e-06V126H92.56L29.74 49.5V126H0.940001V-8.58307e-06H25.06L87.7 76.5V-8.58307e-06H116.5ZM239.191 77.94C239.191 78.3 239.011 80.82 238.651 85.5H165.391C166.711 91.5 169.831 96.24 174.751 99.72C179.671 103.2 185.791 104.94 193.111 104.94C198.151 104.94 202.591 104.22 206.431 102.78C210.391 101.22 214.051 98.82 217.411 95.58L232.351 111.78C223.231 122.22 209.911 127.44 192.391 127.44C181.471 127.44 171.811 125.34 163.411 121.14C155.011 116.82 148.531 110.88 143.971 103.32C139.411 95.76 137.131 87.18 137.131 77.58C137.131 68.1 139.351 59.58 143.791 52.02C148.351 44.34 154.531 38.4 162.331 34.2C170.251 29.88 179.071 27.72 188.791 27.72C198.271 27.72 206.851 29.76 214.531 33.84C222.211 37.92 228.211 43.8 232.531 51.48C236.971 59.04 239.191 67.86 239.191 77.94ZM188.971 48.96C182.611 48.96 177.271 50.76 172.951 54.36C168.631 57.96 165.991 62.88 165.031 69.12H212.731C211.771 63 209.131 58.14 204.811 54.54C200.491 50.82 195.211 48.96 188.971 48.96ZM303.966 127.44C293.766 127.44 284.586 125.34 276.426 121.14C268.386 116.82 262.086 110.88 257.526 103.32C252.966 95.76 250.686 87.18 250.686 77.58C250.686 67.98 252.966 59.4 257.526 51.84C262.086 44.28 268.386 38.4 276.426 34.2C284.586 29.88 293.766 27.72 303.966 27.72C314.166 27.72 323.286 29.88 331.326 34.2C339.366 38.4 345.666 44.28 350.226 51.84C354.786 59.4 357.066 67.98 357.066 77.58C357.066 87.18 354.786 95.76 350.226 103.32C345.666 110.88 339.366 116.82 331.326 121.14C323.286 125.34 314.166 127.44 303.966 127.44ZM303.966 104.4C311.166 104.4 317.046 102 321.606 97.2C326.286 92.28 328.626 85.74 328.626 77.58C328.626 69.42 326.286 62.94 321.606 58.14C317.046 53.22 311.166 50.76 303.966 50.76C296.766 50.76 290.826 53.22 286.146 58.14C281.466 62.94 279.126 69.42 279.126 77.58C279.126 85.74 281.466 92.28 286.146 97.2C290.826 102 296.766 104.4 303.966 104.4Z"
              fill="#3F3F3F"
              fill-opacity="0.1"
            />
          </svg>
          <div class="btn">
            <!-- <p>We will keep you updated with all the cool stuff!</p> -->
            <button @click="onClickPause()">{{ $t("buttonText.continue") }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Popup-2 -->
    <div
      class="popup-div upgrade-success-container second-step"
      :class="((user && user.subInfo && user.subInfo.cancel_popup) && (isPauseConfirm ||
      (this.cancelSubState && this.cancelSubState.discountOfferApi
      && this.cancelSubState.discountOfferApi.hasOwnProperty('isMeetingInviteClicked')
      && !this.cancelSubState.discountOfferApi.isMeetingInviteClicked
      && this.cancelSubState.discountOfferApi.isPauseApplied)))  ? 'showPopUp' : ''"
    >
      <div class="popup-container">
        <div class="top-container">
          <img src="~assets/images/cancelsub/cancelup.svg" />
          <div class="content-container">
            <p class="heading-1">{{ $t("plansNew.cancellationRequestUnderReviewText") }}</p>
            <p class="heading-2">
              <span>
                {{ $t("plansNew.cancellationRequestUnderReviewSubText") }}
              </span>
            </p>
          </div>
        </div>
        <div class="bottom-container">
          <!-- <img class="bg-pattern" src="~assets/images/mobile/bg.png"> -->
          <div class="btn">
            <button @click="bookAMeet()">{{ $t("buttonText.scheduleCallNow") }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Popup-3 -->
    <div
      class="upgrade-success-container deactivate-alert-container popup-div third-step"
      :class="isContactPause ? 'showPopUp' : ''"
    >
      <div class="popup-container">
        <!-- <div class="close-x" @click="isNeoLitePopup = false; isDeactivateAlert = false">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7002 0.674072L1.2002 12.0741" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
                    <path d="M12.8004 12.2742L1.40039 0.77417" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
                </svg>
                </div> -->
        <div class="top-container">
          <div class="content">
            <p class="heading">{{ $t("plansNew.requestReceivedText") }}</p>
            <div class="sub-heading">
              <p>
                <span>
                 {{ $t("plansNew.requestReceivedSubText[0]") }}<br/>
                 {{ $t("plansNew.requestReceivedSubText[1]") }} <b>connect@foyr.com</b>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="bottom-container cs-cancel-bottom">
          <img class="bg-pattern" src="~assets/images/mobile/bg.png" />
          <svg
            width="350"
            height="250"
            viewBox="0 0 358 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M116.5 -8.58307e-06V126H92.56L29.74 49.5V126H0.940001V-8.58307e-06H25.06L87.7 76.5V-8.58307e-06H116.5ZM239.191 77.94C239.191 78.3 239.011 80.82 238.651 85.5H165.391C166.711 91.5 169.831 96.24 174.751 99.72C179.671 103.2 185.791 104.94 193.111 104.94C198.151 104.94 202.591 104.22 206.431 102.78C210.391 101.22 214.051 98.82 217.411 95.58L232.351 111.78C223.231 122.22 209.911 127.44 192.391 127.44C181.471 127.44 171.811 125.34 163.411 121.14C155.011 116.82 148.531 110.88 143.971 103.32C139.411 95.76 137.131 87.18 137.131 77.58C137.131 68.1 139.351 59.58 143.791 52.02C148.351 44.34 154.531 38.4 162.331 34.2C170.251 29.88 179.071 27.72 188.791 27.72C198.271 27.72 206.851 29.76 214.531 33.84C222.211 37.92 228.211 43.8 232.531 51.48C236.971 59.04 239.191 67.86 239.191 77.94ZM188.971 48.96C182.611 48.96 177.271 50.76 172.951 54.36C168.631 57.96 165.991 62.88 165.031 69.12H212.731C211.771 63 209.131 58.14 204.811 54.54C200.491 50.82 195.211 48.96 188.971 48.96ZM303.966 127.44C293.766 127.44 284.586 125.34 276.426 121.14C268.386 116.82 262.086 110.88 257.526 103.32C252.966 95.76 250.686 87.18 250.686 77.58C250.686 67.98 252.966 59.4 257.526 51.84C262.086 44.28 268.386 38.4 276.426 34.2C284.586 29.88 293.766 27.72 303.966 27.72C314.166 27.72 323.286 29.88 331.326 34.2C339.366 38.4 345.666 44.28 350.226 51.84C354.786 59.4 357.066 67.98 357.066 77.58C357.066 87.18 354.786 95.76 350.226 103.32C345.666 110.88 339.366 116.82 331.326 121.14C323.286 125.34 314.166 127.44 303.966 127.44ZM303.966 104.4C311.166 104.4 317.046 102 321.606 97.2C326.286 92.28 328.626 85.74 328.626 77.58C328.626 69.42 326.286 62.94 321.606 58.14C317.046 53.22 311.166 50.76 303.966 50.76C296.766 50.76 290.826 53.22 286.146 58.14C281.466 62.94 279.126 69.42 279.126 77.58C279.126 85.74 281.466 92.28 286.146 97.2C290.826 102 296.766 104.4 303.966 104.4Z"
              fill="#3F3F3F"
              fill-opacity="0.1"
            />
          </svg>
          <div class="btn">
            <!-- <p>We will keep you updated with all the cool stuff!</p> -->
            <button @click="$parent.isContactPause = false">Got it</button>
          </div>
        </div>
      </div>
    </div>
    <calendlyIframeComponent :isIframeComponent="isIframeComponent" :url='calendlyURL'/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import calendlyIframeComponent from '@/components/shared/popups/calendlyIframe';

export default {
  components: {
    calendlyIframeComponent,
  },
  data() {
    return {
      message: {
        value: "",
        error: false,
        global: false,
      },
      isPauseConfirm: false,
      isIframeComponent: false,
      calendlyURL: 'https://calendly.com/mary_foyr/15min'
    };
  },
  props: {
    openNewCancelFlow: Boolean,
    isContactPause: Boolean
  },
  mounted() {
  },
  watch: {
    openNewCancelFlow(data){
      if(data){
        this.eventSend("1stpopup_seen", "1st pop up seen");
      }
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.User.user,
      cancelSubState: (state) => state.Subscriptions.cancelSubState,
      currentBilling: (state) => state.Billing.currentSubscription,
    }),
  },
  methods: {
    ...mapActions({
      cancelSubPauseAPI: "Subscriptions/cancelSubPauseAPI",
      meetingSetupKeyUpdate: "Subscriptions/meetingSetupKeyUpdate",
      cancelSubPlanOffersAPI: "Subscriptions/cancelSubPlanOffersAPI",
      fetchCurrentSubscription:'Billing/fetchCurrentSub',
    }),
    onClickPause() {
      if (this.currentBilling && this.currentBilling.subscription) {
        this.$parent.openNewCancelFlow = false;
        this.$root.$emit("show-blocking-loading", true);
        this.cancelSubPauseAPI({
          subId: this.currentBilling.subscription,
          accountId: this.user.accountId,
          CANCELLATION_FLOW: "V2"
        })
          .then((apiResponse) => {
            if (apiResponse && apiResponse.resume_date) {
              this.eventSend("pause_taken_newcancellationflow", "pause taken by clicking on the CTA ");
              this.fetchCurrentSubscription({accountId : this.user.accountId})
              this.$root.$emit("show-blocking-loading", false);
              this.isPauseConfirm = true;
              this.cancelSubPlanOffersAPI({subId: this.currentBilling.subscription})
            }
          })
          .catch((apiError) => {
            this.$root.$emit("show-blocking-loading", false);
            if (apiError && apiError.statusCode && apiError.statusCode == 500) {
              this.message.value = apiError.error;
              this.message.global = true;
              this.message.error = true;
              setTimeout(() => {
                this.message.value = "";
                this.message.global = false;
                this.message.error = false;
              }, 5000);
            }
            console.log("Api Failed", apiError);
          });
      }
    },
    eventSend(label, name) {
      if (window.analytics) {
        window.analytics.track(
          label,
          {
            name: name,
            flow: "Cancellation 2.0",
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
    },
    closePopup(){
      this.eventSend("crossbutton_clicked_1stpopup", "cross button clicked on the 1st pop up");
      this.$parent.openNewCancelFlow = false;
    },
    bookAMeet(){
      this.eventSend("schedulecta_clicked_2ndpopup", "schedule a meeting cta clicked");
      this.meetingSetupKeyUpdate({subId: this.currentBilling.subscription});
      this.isPauseConfirm = false;
      this.isIframeComponent = true;
    },
  },
};
</script>

<style lang="scss">
.pause-confirm-alert {
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
          max-width: 70%;
          text-align: center;
        }
        .sub-heading {
          max-width: 80%;
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
  .second-step {
    .top-container {
      .content-container {
        padding-bottom: 2rem;
        padding-right: 3rem;
        align-self: flex-end !important;
        .heading-1 {
           font-size: 1.8rem !important;
        }
        .sub-heading {
          span {
            font-size: 1.5rem;
            line-height: 2rem;
          }
        }
      }
    }
  }
  .third-step {
    .top-container {
      .content-container {
        align-self: flex-end !important;
        .sub-heading {
          padding: 2rem 5rem;
          span {
            font-size: 1.2rem !important;
          }
        }
      }
    }
    button {
      font-size: 1.3rem !important;
    }
  }
}
</style>

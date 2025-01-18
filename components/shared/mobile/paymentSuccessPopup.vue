<template>
  <div class="popup-div payment-success-popup" :class="showPopup ? 'showPopUp': ''" @click.prevent="$parent.showPopup = false">
    <div class="popup-container" @click.stop>
      <div class="popup-details">
        <p class="main-heading">
          <span>{{ $t("plansNew.congratsOnPurchasingText[0]") }} </span>
          <span>{{ $t("plansNew.congratsOnPurchasingText[1]") }}</span>
        </p>
        <p class="sub-heading">
          {{ $t("plansNew.neoOnMobileLogText") }}
        </p>
        <p class="description">{{ $t("dashboard.sendLinkText") }}</p>
        <button class="mobile-basic-btn" @click="offerCode()">{{ $t("buttonText.sendMeTheLink") }}</button>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
export default {
  props: {
    showPopup: Boolean
  },
  data(){
    return{
      message: {
        value: "",
        error: false,
        global: false
      },
    }
  },
  methods: {
    ...mapActions({
      sendOffer: "Dash/sendOffer"
    }),
    offerCode() {
      this.$root.$emit("send-mobile-event",{name : 'mb_sendlink_clicked'});
      this.sendOffer()
        .then(res => {
          this.message.error = false;
          this.message.global = true;
          this.message.value = this.$t("buttonText.emailSentCheckInboxMessage");
          setTimeout(() => {
            this.message.global = false;
            this.message.value = "";
            this.message.error = false;
            this.$parent.showPopup = false
            this.$router.push({
                path: '/'
            })
          }, 1300);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
}
</script>
<style lang="scss">
  .payment-success-popup {
    .popup-container {
      background: #FBF3F1;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
      width: 90%;
      max-height: 80%;
      padding: 2rem 1rem;
      overflow: auto;
      .popup-details {
        max-height: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        justify-items: center;
        row-gap: 0.8rem;
        padding-right: 0px;
        height: 100%;
        overflow: auto;
        .sub-heading {
          font-weight: bold;
          font-size: 1.4rem;
          line-height: 1.75rem;
          text-transform: capitalize;
          color: #222122;
          // mix-blend-mode: normal;
          justify-self: center;
        }
        .description {
          font-size: 1.5rem;
          line-height: 1.5rem;
          color: #292929;
          padding: 1rem 0;
          width: 100%;
        }
        p {
          text-align: center;
          font-family: Maven Pro;
          font-style: normal;
        }
        .main-heading {
          span {
            // &::after{
            //   content: '\A';
            //   white-space: pre;
            // }
            font-weight: 900;
            font-size: 2.5rem;
            line-height: 3rem;
            color: #000000;
          }
        }
        button {
          // padding: 1.5rem 5rem;
          // margin: 0.5rem 0;
          width: 15rem;
          height: 4rem;
          padding: 0;
          margin: 0 !important;
          text-transform: capitalize;
          justify-self: center;
        }
      }
    }
  }
</style>
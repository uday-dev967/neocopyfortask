<template>
  <div>
  <div class="popup-div login-via-desktop" :class="desktopAlert  ? 'showPopUp': ''" @click.prevent="$parent.desktopAlert = false">
    <div class="popup-container" @click.stop>
      <div class="popup-details">
        <p class="sub-heading">
          {{ $t("dashboard.neoOnMobileIsViewOnly") }}
        </p>
        <p class="main-heading">
          <span>{{ $t("dashboard.loginViaDesktopForAllFeatures[0]") }}</span>
          <span>{{ $t("dashboard.loginViaDesktopForAllFeatures[1]") }}</span>
          <span>{{ $t("dashboard.loginViaDesktopForAllFeatures[2]") }}</span>
        </p>
        <p class="description">{{ $t("dashboard.sendLinkText") }}</p>
        <button class="mobile-basic-btn" @click="offerCode()">{{ $t("buttonText.sendMeTheLink") }}</button>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
  </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
export default {
  props: {
    desktopAlert: Boolean
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
          this.message.value = this.$t("messages.emailSentCheckInboxMessage");
          setTimeout(() => {
            this.message.global = false;
            this.message.value = "";
            this.message.error = false;
            this.$parent.desktopAlert = false
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
  .login-via-desktop {
    background: #FFFFFFBF;
    .popup-container {
     background: #FBF3F1;
     box-shadow: 0px 0px 12px 0px #0000004D;
      // box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
      width: 86vw;
       height: 60vh;
       display: flex;
       flex-direction: column;
       justify-content: space-evenly;
      .popup-details {
        max-height: unset;
        display: grid;
        justify-content: center;
        justify-items: center;
        row-gap: 0.8rem;
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
          padding: 2rem 0;
          width: 100%;
        }
        .description1 {
          font-size: 1.2rem;
          line-height: 1.5rem;
          color: #292929;
          padding: 2rem 0;
          width: 25rem;
        }
        p {
          text-align: center;
          font-family: Maven Pro;
          font-style: normal;
        }
        .main-heading {
          span {
            &::after{
              content: '\A';
              white-space: pre;
            }
            font-weight: 900;
            font-size: 3.5rem;
            line-height: 4rem;
            color: #000000;
          }
          
        }

        .main-heading1 {
          span {
            &::after{
              content: '\A';
              white-space: pre;
            }
            font-weight: 900;
            font-size: 3.2rem;
            line-height: 3.2rem;
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
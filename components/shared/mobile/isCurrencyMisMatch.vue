<template>
  <div>
  <div class="popup-div login-via-desktop" :class="isCurrencyMismatch ? 'showPopUp': ''" @click.prevent="$parent.isCurrencyMismatch = false">
    <div class="popup-container" @click.stop>
      <div class="popup-details">
        <p class="main-heading1">
          <span>{{ $t("plansNew.byUsingLocalCurrencyMobileText[0]") }}</span>
          <span>{{ $t("plansNew.byUsingLocalCurrencyMobileText[1]") }}</span>
          <span>{{ $t("plansNew.byUsingLocalCurrencyMobileText[2]") }}</span>
        </p>
        <p class="description1">{{ $t("plansNew.helpBillingCurrencyText") }} 
</p>
        <a class="mobile-basic-btn" href="mailto:connect@foyr.com" >{{ $t("buttonText.talkToUs") }}</a>
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
    isCurrencyMismatch: Boolean
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
            this.$parent.isCurrencyMismatch = false
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
      width: 90%;
      max-height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 2rem 1rem !important;
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
          padding: 1rem 0;
          width: 25rem;
        }
        .description1 {
          font-size: 1.2rem;
          line-height: 1.5rem;
          color: #292929;
          padding: 2rem 0;
          // width: 25rem;
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
            font-size: 2.5rem;
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
            font-size: 2.5rem;
            line-height: 3.2rem;
            color: #000000;
          }
          
        }
       .mobile-basic-btn {
          // padding: 1.5rem 5rem;
          // margin: 0.5rem 0;
          width: 15rem;
          height: 4rem;
          margin: 0 !important;
          text-transform: capitalize;
          justify-self: center;
          
         color : #FFFBFA;
         text-decoration: none;
         text-underline-offset: none;
         text-align: center;
          
        

        }
      }
    }
  }

</style>

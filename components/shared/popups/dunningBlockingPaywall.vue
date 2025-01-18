<template>
  <section>
    <div class="dunning-blocking-popup popup-div" :class="{'showPopUp': (isOfferClicked && fetchAccountInfo) }">
      <div class="popup-container">
        <!-- db :: Dunning Blocking  -->
        <div class="close-popup" @click="closeDunningBlocking()">
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7002 0.674072L1.2002 12.0741" stroke="white" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M12.8004 12.2742L1.40039 0.77417" stroke="white" stroke-miterlimit="10" stroke-linecap="round"></path>
          </svg>
        </div>
        <div class="db-left">
          <img src="~assets/images/db-image.png" alt="">
        </div>
        <div class="db-right">
          <p class="heading">You have an invoice pending.<br/>Please clear the invoice to avail<br/> any offer in Neo.</p>
          <div class="bullet-text">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6432 9.42858C16.6432 13.8874 13.0373 17.5 8.59163 17.5C4.14595 17.5 0.540039 13.8874 0.540039 9.42858C0.540039 4.96976 4.14595 1.35715 8.59163 1.35715C13.0373 1.35715 16.6432 4.96976 16.6432 9.42858Z" fill="#222021" stroke="#222021"/>
              <path d="M7.96781 11.5029H9.11981V5.14285H7.96781V11.5029ZM8.54381 12.7269C8.31981 12.7269 8.13181 12.7989 7.97981 12.9429C7.83581 13.0869 7.76381 13.2629 7.76381 13.4709C7.76381 13.6789 7.83581 13.8549 7.97981 13.9989C8.13181 14.1509 8.31981 14.2269 8.54381 14.2269C8.76781 14.2269 8.95181 14.1549 9.09581 14.0109C9.24781 13.8749 9.32381 13.7029 9.32381 13.4949C9.32381 13.2789 9.24781 13.0949 9.09581 12.9429C8.95181 12.7989 8.76781 12.7269 8.54381 12.7269Z" fill="white"/>
            </svg>
            <p>You have an invoice of {{(fetchAccountInfo.invoice && fetchAccountInfo.invoice.amount_due) ? ('$'+ fetchAccountInfo.invoice.amount_due) : 'N/A'}} pending<br/> payment since {{dateFormat()}}</p>
          </div>
          <div class="bullet-text">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6432 9.42858C16.6432 13.8874 13.0373 17.5 8.59163 17.5C4.14595 17.5 0.540039 13.8874 0.540039 9.42858C0.540039 4.96976 4.14595 1.35715 8.59163 1.35715C13.0373 1.35715 16.6432 4.96976 16.6432 9.42858Z" fill="#222021" stroke="#222021"/>
              <path d="M7.96781 11.5029H9.11981V5.14285H7.96781V11.5029ZM8.54381 12.7269C8.31981 12.7269 8.13181 12.7989 7.97981 12.9429C7.83581 13.0869 7.76381 13.2629 7.76381 13.4709C7.76381 13.6789 7.83581 13.8549 7.97981 13.9989C8.13181 14.1509 8.31981 14.2269 8.54381 14.2269C8.76781 14.2269 8.95181 14.1549 9.09581 14.0109C9.24781 13.8749 9.32381 13.7029 9.32381 13.4949C9.32381 13.2789 9.24781 13.0949 9.09581 12.9429C8.95181 12.7989 8.76781 12.7269 8.54381 12.7269Z" fill="white"/>
            </svg>
            <p>The credit card was declined due to the <br/>reason <b>‘’{{fetchAccountInfo.payment_failure_text ? fetchAccountInfo.payment_failure_text : 'your card has insufficient funds'}}’’</b></p>
          </div>
          <div class="db-button" @click="payNowClicked()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#0E0E0E"/>
              <path d="M5 16.1432C5 16.6144 5.3679 17 5.81757 17H19.1824C19.6321 17 20 16.6144 20 16.1432V10.8338H5V16.1432Z" fill="#FFAB40"/>
              <path d="M19.1824 7H5.81757C5.3679 7 5 7.38554 5 7.85675V9.07668H20V7.85675C20 7.38554 19.6321 7 19.1824 7Z" fill="#FFAB40"/>
            </svg>
            <p>Pay Now</p>
          </div>
        </div>
      </div>
    </div>
    <calendlyIframeComponent :isIframeComponent="isIframeComponent" :url='chargeBeeURL'/>
  </section>
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
      chargeBeeURL: '',
      isIframeComponent: false,
      pollingHolderDashboard: null,
      isOfferClicked: false,
    };
  },
  props: {
  },
  mounted() {
    this.$root.$on('open-dunning-paywall', (data)=> {
      this.isOfferClicked = data;
    })
  },
  watch: {
    // fetchAccountInfo: function(currentObj, previousObj) {
    //   if(this.pollingHolderDashboard){
    //     if(previousObj && previousObj.invoice && previousObj.invoice.billing_status && currentObj && ){
    //      this.clearDunningPaywall()
    //     }
    //   }
    // }
    isOfferClicked: function (data) {
      if(data)
      this.dunningPaywallEvent('blocking_dunning_shown', 'paywall shown')
    }
  },
  computed: {
    ...mapState({
      fetchAccountInfo: state => state.Subscriptions.fetchAccountInfo,
    }),
  },
  methods: {
    ...mapActions({
      buyNowFromDunning: 'Subscriptions/buyNowFromDunning',
      getTheTourStatus: 'Subscriptions/getTheTourStatus',
    }),
    dateFormat(){
      if(this.fetchAccountInfo.invoice && this.fetchAccountInfo.invoice.due_date){
        let newDate = new Date(this.fetchAccountInfo.invoice.due_date);
        let mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        newDate = newDate.getDate() + " " + mlist[newDate.getMonth()] + ', '+ newDate.getFullYear();
        return newDate;
      }else {
        return 'N/A'
      }
    },
    closeDunningBlocking(){
       this.$root.$emit('open-dunning-paywall', false)
      this.isOfferClicked = false;
    },
    payNowClicked(){
      if(this.pollingHolderDashboard)
      clearInterval(this.pollingHolderDashboard)
      this.dunningPaywallEvent('blocking_paynow_clicked', 'Pay Now Clicked')
      this.buyNowFromDunning({}).then((apiResponse)=> {
        // this.isOfferClicked = false;
        this.isIframeComponent = true;
        this.chargeBeeURL = apiResponse.url;
        let startTime = new Date().getTime();
        this.pollingHolderDashboard = setInterval(() => {
          // Auto stop after 15min.
          if(new Date().getTime() - startTime > (15 * 60000))
          clearInterval(this.pollingHolderDashboard)
          console.log('*********************Polling Startedddddddddddddddd**********************')
          this.getTheTourStatus().then((apiResponse)=> {
            if(apiResponse && apiResponse.invoice && apiResponse.invoice.billing_status == 'paid_successful'){
              this.clearDunningPaywall()
            }else {
              console.log('NO SUCCESS STATUS', apiResponse);
            }
          });
        }, 2000)
      })
    },
    clearDunningPaywall(){
        console.log('Payment Successfull')
        this.dunningPaywallEvent('blocking_paynow_successful', 'pay now  successful')
        this.isIframeComponent = false;
        clearInterval(this.pollingHolderDashboard)
        this.isOfferClicked = false;
        this.$root.$emit("open-thank-you-popup", true);
    },
    dunningPaywallEvent(label, name) {
      if (window.analytics) {
        window.analytics.track(
          label,
          {
            name: name,
            flow: "Cancellation Flow",
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
    },
  },
};
</script>

<style lang="scss">
.dunning-blocking-popup {
  // Blocking Dunning Paywall
  .popup-container {
    padding: 0 !important;
    height: 72vh;
    width: 72vw;
    max-height: 85vh !important;
    border-top: 0.2rem outset #ffab40 !important;
    display: grid;
    grid-template-columns: 58% 1fr;
    background: white !important;
    .close-popup {
      position: absolute;
      right: -4rem;
      top: 0;
      background: #000;
      opacity: 0.4;
      padding: 0.6rem;
      display: grid;
      place-content: center;
      border-radius: 50%;
      height: unset;
      cursor: pointer;
      svg {
          height: 1.5rem;
          width: 1.5rem;
          background: none;
      }
    }
    .db-left {
      display: grid;
      place-content: center;
      background-color: #FBF3F1;
      img {
        width: 28rem;
      }
    }
    .db-right {
      background: white;
      display: grid;
      padding: 2rem 3.5rem;
      padding-bottom: 3.5rem;
      align-items: center;
      align-content: center;
      grid-template-rows: 1fr max-content max-content 1fr;
      p {
        margin: 0;
        padding: 0;
        font-weight: 500;
        font-size: 1.01rem;
        line-height: 1.56rem;
        color: #0E0E0E;
        font-family: 'Montserrat';
      }
      .heading {
        font-weight: bold;
        font-size: 1.45rem;
        line-height: 2.2rem;
        color: #0E0E0E;
        padding-bottom: 1.5rem;
      }
      .bullet-text {
        display: grid;
        grid-template-columns: max-content 1fr;
        align-items: center;
        padding-bottom: 2rem;
        grid-gap: 1rem;
        svg {
          height: 2rem;
          width: 1.6rem;
          align-self: baseline;
          padding-top: 0.2rem;
        }
        p {
          color: #0E0E0E;
        }
      }
      .db-button {
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        cursor: pointer;
        align-self: center;
        display: flex;
        background: #0E0E0E;
        padding: 0.5rem 5rem;
        align-items: center;
        justify-content: center;
        grid-gap: 0.5rem;
        p {
          font-weight: bold;
          color: white;
        }
        &:hover {
          background: #E9BEB3;
          filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.4));
          p {
            color: #222222;
          }
          svg {
            circle {
              fill: #E2AD9F;
            }
            path {
              fill: #222222;
            }
          }
        }
      }
    }
  }
}

</style>

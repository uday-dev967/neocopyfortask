<template>
  <section style="background: white">
    <profileComponent class v-if="$route.params.type=='profile'" :user="user" :users="users" :invited="invited"/>
    <packageNewComponent class v-if="$route.params.type=='plans_new'" :addon="addon"/>
    <!-- <billingComponent class="billing-container" v-if="$route.params.type=='billing'" :user="user"/> -->
    <plansComponent v-if="$route.params.type == 'plans'" :user="user" :packages="packages" :addon="addon"/>
    <div class="popup-div" :class="show?'showPopUp':''">
        <div class="popup-container">
          <div class="close-popup" @click="closePopup">
            <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z" fill="white"/>
            </svg>
          </div>
          <div class="popup-head">
            <h2>Are you sure you want to Proceed?</h2>
            <!-- <p v-if="showBills">Get access to all your invoices anytime</p> -->
          </div>
          <div class="popup-details">
            <div class="cancel-sub-text">
              <p>Cancellation will be effective at the end of your current billing cycle</p>
            </div>
            <div class="invite-button-container">
              <button @click="cancelContainer('show')" class="cancel-button">Cancel</button>
              <button @click="cancelSubs()"  class="update-address">Confirm</button>
            </div>
          </div>

        </div>
      </div>
    <!-- <inviteComponent v-if="newMember"/> -->
    <MessageComponent :changeRight="message"/>
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
import progressComponent from "@/components/shared/progress";
import inviteComponent from "@/components/shared/invite";
import profileComponent from "@/components/profile_v2";
import billingComponent from "@/components/billing";
import plansComponent from "@/components/plans_v2";
import packageNewComponent from "@/components/packages_v2";

export default {
  layout: "dashboard",
  middleware: ["initAuth", "authReq"],
  components: {
    progressComponent,
    inviteComponent,
    profileComponent,
    billingComponent,
    plansComponent,
    packageNewComponent
  },
  props: {
    packages: Object,
    mySubscription: Array,
    services: Array,
    user: Object,
    users: Array,
    addon: Object,
    invited:Array
  },
  mounted() {
    // if (this.mySubscription) {
    //   this.mySubscription.forEach(element => {
    //     if (element.type == "package")
    //       {
    //         this.selectedDur = element.invoice.period ;
    //         this.currentPack = element.invoice.period;
    //         // console.log(this.currentPack)
    //       }
    //   });
    // }
  },
  data() {
    return {
      selected: null,
      quantity: 0,
      show: false,
      cancelSub:undefined,
      future: undefined,
      message: {
        value: "",
        error: false,
        global: false
      },
      selectedDur: 3,
      currentPack:undefined
    };
  },
  head() {
    return {
      title: "Neo - Settings"
    };
  },
  computed: {
    ...mapState({
      serviceResponse: state => state.Subscriptions.serviceResponse
    }),
    isDisabled() {
      return this.condition1 && this.condition2;
    }
  },
  watch: {
    serviceResponse: function(data) {
      const { error, message, statusCode } = data;
      if (statusCode === 200) {
        alert("Request Successful");
      } else {
        alert(message);
      }
    },
    // mySubscription: function(data) {
    //   // data.forEach(element => {
    //   //   if (element.type == "package")
    //   //     this.selectedDur = element.invoice.period;
    //   // });
    // }
  },
  methods: {
    ...mapActions({
      cancelSubscription: "Subscriptions/cancel",
      buy: "Subscriptions/buy",
      requestService: "Subscriptions/requestService",
      registerUser: "User/registerUser",
    }),
   cancelContainer(container) {
      if(container =="show"){
        this.show = false
      }
    },
    closePopup() {
      this.show = false;
    },

    getDays: function(date) {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(date);
      const secondDate = new Date();
      return Math.round(
        Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
      );
    },
    cancel: function(id) {
      // this.cancelSubscription({ id, accountId: this.user.accountId });
      this.show = true;
      this.cancelSub = id
    },
    cancelSubs:function(){
      this.cancelSubscription({ id: this.cancelSub, accountId: this.user.accountId }).then(res =>{
        // amplitude.getInstance().logEvent("subscriptionCancelled",{subscriptionId:this.cancelSub});

        this.show = false;
        this.message.error = false;
        this.message.value="Your subscription has been cancelled successfully.";
        this.message.global = true;
        this.cancelSub = undefined;
        setTimeout(() => {
          this.message.global = false;
          this.message.value = '';
        }, 4000);
        });
    },
    dateFormat:function(date){
      let newDate = new Date(date);
      let mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      newDate = newDate.getDate() + " " + mlist[newDate.getMonth()];
      return newDate;
    },
    // upgrade: function(id) {
    //   this.buy({
    //     accountId: this.user.accountInfo.accountId,
    //     package: id
    //   }).then(res => {
    //     // amplitude.getInstance().logEvent("subscriptionBuy",{subscriptionId:id});
    //     analytics.track('subscriptionBuy', {
    //       title: 'buy',
    //       subtitle: id,
    //       author:this.user._id
    //     });
    //     window.open(res.hostedPage.url);

    //   });
    // },
    test: function() {
      if (!this.selected) return;
      if (this.quantity === 0) return;
      const service = this.services.filter(e => e.name === this.selected)[0];
      this.requestService({
        service: service.code,
        quantity: this.quantity,
        accountId: this.user.accountId
      });
    },

    // invoiceDownload(accountId, invoiceId) {
    //   this.downloadInvoice({ accountId, invoiceId }).then(res => {
    //     const file = new Blob([res.data], { type: "application/pdf" });

    //     const fileURL = URL.createObjectURL(file);
    //     window.open(fileURL);
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
.packageDuration {
  display: flex;
  justify-content: center;
  div {
    p {
      margin: 0px;
      padding: 0 24px;
    }
    &:first-child {
      p {
        padding-left: 5px;
      }
      span {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
    }
    &:last-child {
      span {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
    text-align: center;
    span {
      margin: 0px;
      margin-bottom: 0.5rem;
      display: block;
      width: 100%;
      padding: 5px 0px;
      background: #faece8;
    }
  }
  span.selected {
    background: #d48e8e;
    color: #ffffff;
  }
  p.selected {
    color: #d48e8e;
  }
}
.setting-form-test div {
  padding: 0.625rem 0.625rem;
}
.setting-form-test select {
  text-transform: lowercase;
}
.setting-form-test div button {
  border: 0.0625rem solid;
  padding: 0.3125rem 1.875rem;
  cursor: pointer;
}

.subscriptions-container {
  .active.plan {
    background: #222021;
    border: 2px solid #d48e8e;
  }
  .active.plan {
    .cost {
      color: white;
    }
  }
}
.subscriptions-container {
  padding: 1.5625rem 3.125rem;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  div {
    width: 15.6rem;
    margin: 0 calc(3.75rem / 2);
  }
  .title {
    text-transform: capitalize;
  }
  .plan {
    border: 0.0625rem solid #edd1d1;
    background: white;
    // height: 15.625rem;
    padding: 1.25rem;
    margin-bottom: 0.9375rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 21.1875rem;
    justify-content: space-between;
    p{
      // word-break: break-all;
    }
    .period {
      font-size: 0.6875rem;
      color: #d48e8e;
    }
    .cost {
      margin-top: 0.3125rem;
      font-size: 1.3125rem;
      color: #389438;
      span{
        color:#d48e8e;
      }
    }
    .features {
      word-break: unset;
      font-size: 1rem;
      margin-bottom: 2.5rem;
    }
  }
  .days {
    font-size: 0.8125rem;
    text-align: center;
    color: #d48e8e;
  }
  .cancel-subsc {
    color: #4d4c4d;
    font-size: 0.9375rem;
    text-align: center;
    padding: 0.5rem 2rem;
    width: max-content;
    margin: 0px;
    cursor: pointer;
    color: #ffffff;
    border: 1px solid #ffffff;
  }
  .upgrade-button {
    padding: 0.5rem 2.5rem;
    border: 0.0625rem solid #222021;
    cursor: pointer;
    color: #222021;
  }
  .upgrade-button:hover {
    background: #222021;
    color: #e9beb3;
  }
}
.addons-container {
  margin: 2.1875rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1.375rem 0px;
  .addon-type {
    margin: auto;
    margin-bottom: 4.6875rem;
    width: max-content;
  }
  .title-addon {
    color: #292929;
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;
    margin-top: 1.3rem;
  }
  .addon-heads {
    display: flex;
    margin-left: 4.8125rem;
    align-items: center;
    margin-bottom: 1.125rem;
    justify-content: left;
    svg {
      margin-right: 1.125rem;
    }
    p {
      margin: 0px;
      font-size: 1.2rem;
    }
  }
  .list-of-addon {
    display: flex;
    justify-content: center;
    margin-left: 4.8125rem;
    flex-wrap: wrap;
    .addon-item {
      background: white;
      border: 1px solid #edd1d1;
      box-sizing: border-box;
      width: 12.5rem;
      text-align: center;
      margin-right: 2.5rem;
      .model-price {
        text-align: center;
        width: max-content;
        background: #201f20;
        border-radius: 0px 0px 20px 20px;
        color: white;
        font-size: 1rem;
        font-weight: 500;
        margin: auto;
        padding: 0.3125rem 2.125rem;
      }
      .per-addon {
        font-weight: 500;
        font-size: 36px;
        color: #000000;
        margin-top: 0.9375rem;
        margin-bottom: 0.375rem;
      }
      span {
        font-weight: 500;
        font-size: 12px;
        display: block;
        color: rgba(41, 41, 41, 0.54);
      }
      .price-per-model {
        font-size: 13px;
        color: rgba(41, 41, 41, 0.38);
        margin-top: 0.625rem;
        margin-bottom: 1.125rem;
      }
      .buy-addon {
        padding: 0.625rem 0;
        border-top: 1px solid #edd1d1;
        cursor: pointer;
        p {
          margin: 0px;
          font-weight: 600;
          font-size: 13px;
          color: #d48e8e;
        }
      }
    }
  }
}
.subscriptions-container .active.plan.future {
  background: linear-gradient(
    144.46deg,
    rgba(252, 239, 236, 0.5) 0%,
    #f7e3df 100%
  );
  border: 1px solid #edd1d1;
  position: relative;
  .title {
    color: #4d4c4d;
  }
  .cost {
    color: #d48e8e;
  }
  .features {
    color: #4d4c4d;
  }
  .days {
  }
  .cancel-subsc {
    margin: 0px;
    text-align: center;
  }
  .next {
    position: absolute;
    left: 50%;
    top: 0px;
    width: max-content;
    margin: 0px;
    background: #222021;
    color: #ffffff;
    padding: 5px 8px;
    font-size: 0.6875rem;
    transform: translate(-50%, -50%);
  }
  .Upgraded {
    width: max-content;
    margin: 0px;
    display: flex;
    align-items: center;
    padding: 0.5rem 1.375rem;
    background: #d48e8e;
    border: 1px solid #d48e8e;

    p {
      color: #222021;
      margin: 0px;
      margin-left: 0.625rem;
      font-size: 0.8125rem;
    }
  }
}
.no-data-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc( 50vh - 250px );
  p{
    margin-top: 2rem;
  }
}
.cancel-sub-text{
  padding: 2rem 0;
  p{
    font-size: 1rem;
    max-width: 70%;
    text-align: center;
    margin: auto;
  }
}
.text-period{
  cursor: pointer;
}
</style>

<style lang="scss">

.recommended-addons {
  .addon-item {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 1.25rem;
    margin-bottom: 2.25rem;
  
    svg {
      display: block;
      margin-right: 1.125rem;
      flex-shrink: 0;
    }
  
    .details-container {
      flex-grow: 1;
      font-family: $main-font;
      font-style: normal;
  
      .name-and-price-wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.75rem;
        align-items: center;
  
        .name {
          font-weight: 600;
          color: $plan-title;
          flex-grow: 1;
          font-size: 1rem;
          line-height: 1.25rem;
        }
  
        .price {
          font-weight: 600;
          color: $plan-title;
          margin-right: 1.5rem;
          font-size: .875rem;
          line-height: 1.0625rem;
        }
  
        .description {
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #808080;
        }
      }
    }
  
    .addon-action {
      justify-self: flex-end;
      color: #CC4040;
      font-size: .875rem;
      text-transform: uppercase;
      cursor: pointer;
  
      .add-btn {
        font-weight: 700;
        line-height: 1.125rem;
        background: #F8F0ED;
        padding: .3125rem 1rem;
  
        &:hover {
          color: $color-white;
          background: #CC4040;
        }
      }
  
      .remove-btn {
        font-weight: 500;
        line-height: 1.125rem;
      }
    }
  }
}
</style>

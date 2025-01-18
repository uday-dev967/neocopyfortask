<template>
  <div class="addon-main-container" v-if="addon && !loadingPaymentPage">
    <div class="addon-header">
      <h3>{{ $t("suggestionText.chooseAddOn") }}</h3>
    </div>
    <div v-if="!hideTabs" class="service-type-container">
      <p :class="{active: render}" @click="render=true">{{ $t("buttonText.renderCredits") }}</p>
      <p :class="{active: !render}" @click="render=false">{{ $t("buttonText.modelCredits") }}</p>
    </div>
    <div class="addons-container">
      <div class="addon" v-for="(render, index) in render?renderAddons:customModelAddons" :key="render.id+index">
        <p class="addon-cost">{{render.displayContext.currency_symbol}} {{render.displayContext.packageCost}}</p>
        <p
          class="addon-units"
        >{{render.displayContext.packageUnits}} {{render.displayContext.packageUnitName}}</p>
        <button @click="openAddress(render._id, render.displayContext.packageName)">{{ $t("buttonText.buyNowCapitalText") }}</button>
      </div>
    </div>
    <div class="popup-div" id="packages" :class="showAddress?'showPopUp':''">
      <div class="popup-container" style="padding-bottom:1.5625rem;">
        <div class="close-popup" @click="closePopup">
          <svg
            width="24"
            height="24"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="popup-head">
          <h2 v-if="showAddress">{{ $t("suggestionText.updateAddress") }}</h2>
        </div>
        <div class="popup-details" v-if="user && user.billingAddress" style="margin-top: 1.25rem;">
          <div class="address-input-container">
            <div class="address-left-container">
              <div>
                <span>
                  {{ $t("suggestionText.firstName") }}
                  <sup>*</sup>
                </span>
                <input autocomplete="off" type="text" v-model="user.firstName" />
              </div>
              <div>
                <span>
                 {{ $t("suggestionText.companyName") }}
                  <sup>*</sup>
                </span>
                <input autocomplete="off" type="text" min="0" v-model="user.companyName" />
              </div>
            </div>
            <div class="address-right-container">
              <div>
                <span>
                  {{ $t("suggestionText.lastName") }}
                  <sup>*</sup>
                </span>
                <input autocomplete="off" type="text" v-model="user.lastName" />
              </div>
              <div>
                <span>{{ $t("suggestionText.number") }}</span>
                <input autocomplete="off" type="text" v-model="user.contactNumber" required />
              </div>
              <!-- <div>
                <span>Landmark (Optional)</span>
                <input autocomplete="off" type="text">
              </div>-->
              <!-- <div>
                <span>State</span>
                <div class="select-box">
                  <select v-model="address.state">
                    <option value>Telangana</option>
                  </select>
                </div>
              </div>-->
            </div>
          </div>
          <div class="local-address">
            <span>
              {{ $t("suggestionText.address") }}
              <sup>*</sup>
            </span>
            <textarea name id cols="80" rows="5" v-model="user.billingAddress.street"></textarea>
          </div>
          <div class="address-input-container">
            <div class="address-left-container">
              <div>
                <span>
                  {{ $t("suggestionText.city") }}
                  <sup>*</sup>
                </span>
                <input
                  type="text"
                  v-model="user.billingAddress.city"
                  pattern="[A-Za-z]{3}"
                  name="city"
                />
              </div>
              <div>
                <span>{{ $t("suggestionText.state") }}</span>
                <div class="select-box">
                  <select v-model="user.billingAddress.state">
                    <option :value="con" v-for="con in selectedStates">{{con}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="address-right-container">
              <div>
                <span>
                  {{ $t("suggestionText.country") }}
                  <sup>*</sup>
                </span>
                <div class="select-box">
                  <select
                    v-model="user.billingAddress.country"
                    @change="updateCounty(user.billingAddress.country)"
                    @click="countryChange = true"
                  >
                    <option :value="con.name" v-for="con in country">{{con.name}}</option>
                  </select>
                </div>
              </div>
              <div>
                <span>
                  {{ $t("suggestionText.pincode") }}
                  <sup>*</sup>
                </span>
                <input
                  autocomplete="off"
                  type="text"
                  min="0"
                  v-model="user.billingAddress.pincode"
                />
              </div>
              <!-- <div>
                <span>Landmark (Optional)</span>
                <input autocomplete="off" type="text">
              </div>-->
              <!-- <div>
                <span>State</span>
                <div class="select-box">
                  <select v-model="address.state">
                    <option value>Telangana</option>
                  </select>
                </div>
              </div>-->
            </div>
          </div>
        </div>
        <div class="address-button-container" style="padding-top:1.25rem;">
          <button @click="cancelContainer('address')" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
          <button @click="addressUpdate()" class="update-address">{{ $t("buttonText.updateAddressAndProceed") }}</button>
        </div>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
  </div>
  <div v-else>
    <div class="main-loading" v-if="loadingPaymentPage">
      <div class="loading-container">
        <p>{{ $t("plansNew.redirectedToPaymentPageText") }}</p>
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Country from "static/json/country.json";
export default {
  name: "AddonComponent",
  props: {
    addon: Object,
    hideTabs: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {
    if (!this.user) {
      this.updateCounty("India");
    } else if (
      this.user &&
      this.user.billingAddress &&
      this.user.billingAddress.country
    ) {
      this.updateCounty(this.user.billingAddress.country);
    } else {
      this.updateCounty("India");
    }
    // let chargebeeInstance = Chargebee.init({
    //   site: (window.location.host == "neo.foyr.com" ||  window.location.host == "neopreprod.foyr.com")?"foyr":"foyr-test"
    // });
    //this.selectedStates = this.getState('India').states;
  },
  data() {
    return {
      render: false,
      showAddress: false,
      country: Country,
      packageId: "",
      message: {
        value: "",
        error: false,
        global: false
      },
      selectedStates: "",
      countryChange: false,
      loadingPaymentPage: false,
    };
  },
  computed: {
    ...mapGetters({
      getState: "User/getState",
      isUserOnPayAsYouGoPlan: "Billing/isUserOnPayAsYouGoPlan"
    }),
    ...mapState({
      user: state => state.User.user,
      currentBilling: state => state.Billing.currentSubscription,
      isChargebee: state => state.Billing.isChargebee,
    }),
    renderAddons() {
      if ( this.addon && this.addon.render && this.addon.render.length > 0 ) {
        return this.addon.render.sort(function(a, b) {
          if (a.price < b.price) return 1;
          if (a.price > b.price) return -1;
          return 0;
        });
      }

      return [];
    },
    customModelAddons() {
      if ( this.addon && this.addon.custom && this.addon.custom.length > 0 ) {
        return this.addon.custom.sort(function(a, b) {
          if (a.price < b.price) return 1;
          if (a.price > b.price) return -1;
          return 0;
        });
      }

      return [];
    }
  },
  watch: {
    user: function(data) {
      if (data && !data.billingAddress) {
        this.user.billingAddress = {
          street: "",
          country: "",
          city: "",
          pincode: "",
          state: ""
        };
      } else {
        this.updateCounty(this.user.billingAddress.country);
      }
    }
  },
  methods: {
    ...mapActions({
      buy: "Subscriptions/buy",
      updateAddress: "User/updateAddress",
      fetchUser: "User/fetch",
      sendMail: "Billing/buyNowEmailSend"
    }),
    upgrade: function() {
      this.loadingPaymentPage = true;
      this.$parent.isRedirecting = true;
      this.$parent.credits = false;
      this.buy({
        accountId: this.user.accountInfo.accountId,
        package: this.packageId
      }).then(res => {
        // amplitude
        //   .getInstance()
        //   .logEvent("subscriptionBuy", { subscriptionId: this.packageId });
        this.$parent.isRedirecting = false;
        this.packageId = "";
        let chargebeeInstance = Chargebee.getInstance();
        if(this.isChargebee) {
          chargebeeInstance.openCheckout({
            hostedPage: function() {
              return  new Promise(function(resolve, reject){
                resolve(res.hostedPage);
              });
            },
            success: function(hostedPageId) {
              window.$nuxt.$emit("bill-update-request",{payment:true});
            },
            close: function() {
              window.$nuxt.$emit("payment-popup-close", {type: "addon", waitingTime: 8000});
              // Optional
              // will be called when the user closes the checkout modal box
            }
          });
        }
        else
          window.open(res.hostedPage.url);
      });
    },
    closePopup() {
      this.showTeam = false;
      this.showAddress = false;
    },
    openAddress(id, packageName) {
      console.log(
        "USer Details",
        this.user,
        "Package Details",
        packageName,
        this.selectedDur,
        this.addon
      );
      this.packageId = id;
      analytics.track(
        "Buy Now",
        {
          plan: packageName,
          subtitle: "Clicked"
        },
        { integrations: { Amplitude: { session_id: new Date().getTime() } } },
        { timestamp: new Date().getTime() }
      );
      analytics.track(
        "Buy Now",
        {
          plan: packageName,
          subtitle: "Clicked"
        },
        { integrations: { Amplitude: { session_id: new Date().getTime() } } },
        { timestamp: new Date().getTime() }
      );
      if (this.isUserOnPayAsYouGoPlan) {
        analytics.track(
          "Buy now clicked on DB",
          {
            plan: packageName,
            subtitle: "Clicked"
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
      if (this.user && this.user.billingAddress) {
        if (
          this.user.fullName &&
          this.user.companyName &&
          this.user.contactNumber &&
          this.user.billingAddress &&
          this.user.billingAddress.country &&
          this.user.billingAddress.street &&
          this.user.billingAddress.city &&
          this.user.billingAddress.pincode
        ) {
          this.showAddress = false;
          // this.$parent.isRedirecting = true;
          // this.$parent.credits = false;
          // this.upgrade();
          } else {
          // this.showAddress = true;
        }
      } else {
        // this.showAddress = true;
      }
      this.upgrade();
      this.prepareEmailTemplate(packageName);
      // this.showAddress = true;
    },
    updateCounty(country) {
      if (country) {
        if (this.countryChange) {
          this.user.billingAddress.state = "";
        }
        var statesData = this.getState(country);
        if (
          statesData &&
          statesData["states"] &&
          statesData["states"].length > 0
        ) {
          this.selectedStates = statesData.states;
        } else {
          this.selectedStates = [];
        }
        //   if(this.user && this.user.billingAddress && this.user.billingAddress.country !== country)
        // if (this.user && this.user.billingAddress) {
        //   this.user.billingAddress.state = this.selectedStates[0];
        // }
      }
    },
    cancelContainer(container) {
      if ((container = "address")) {
        this.showAddress = false;
      }
    },
    addressUpdate: function() {
      const {
        billingAddress: { street, pincode, country, city, state }
      } = this.user;
       const companyName = this.user.companyName
        ? this.user.companyName.trim("")
        : "";
      const firstName = this.user.firstName ? this.user.firstName.trim() : "";
      const lastName = this.user.lastName ? this.user.lastName.trim() : "";
      const contactNumber = this.user.contactNumber ? this.user.contactNumber.trim() : "";
      if (
        !this.user.billingAddress.street ||
        !this.user.billingAddress.pincode ||
        !this.user.billingAddress.country ||
        !this.user.billingAddress.city ||
        !firstName ||
        !lastName ||
        !companyName ||
        !contactNumber
      ) {
        this.message.value = this.$t("messages.pleaseFillAllFields");
        this.message.global = true;
        this.message.error = true;
        setTimeout(() => {
          this.message.value = "";
          this.message.global = false;
        }, 4000);
      } else if (companyName.length <= 1) {
        this.message.value = this.$t("messages.minCompanyNameString");
        this.message.global = true;
        this.message.error = true;
        setTimeout(() => {
          this.message.value = "";
          this.message.global = false;
        }, 4000);
      } else
        this.updateAddress({
          billingAddress: { street, pincode, country, city, state },
          contactNumber,
          firstName,
          lastName,
          companyName
        })
          .then(res => {
            this.showAddress = false;
            this.message.value = res.message;
            this.message.global = true;
            this.message.error = !res.error ? false : true;
            // amplitude.getInstance().logEvent("addressUpdated");
            this.countryChange = false;
            this.fetchUser();
            setTimeout(() => {
              this.message.value = "";
              this.message.global = false;
            }, 4000);
            this.upgrade();
          })
          .catch(err => {
            this.message.value = err.message;
            this.message.error = true;
          });
    },
    prepareEmailTemplate: function(packageName) {
      let emailContent = {
        mailerType: "SUB_BUY_NOW_CLICKED",
        subject: this.user.fullName + " " + "just clicked on Buy Now",
        templatedata: {
          name: this.user.fullName ? this.user.fullName : "",
          email: this.user.email ? this.user.email : "",
          country: this.user.country ? this.user.country : "",
          package: packageName ? packageName + "-" + this.selectedDur : ""
        }
      };
      this.sendMail(emailContent);
    }
  }
};
</script>
<style lang="scss" scoped>
.addon-header {
  text-align: center;
  h3 {
    font-weight: normal;
    font-size: 1.5rem;
    line-height: 1.8125rem;
    color: #d48e8e;
    margin-bottom: 1rem;
  }
}
.service-type-container {
  display: flex;
  justify-content: center;
  p {
    font-size: 0.8125rem;
    color: #d48e8e;
    padding: 0px 1rem;
    cursor: pointer;
  }
  p:first-child {
    border-right: 1px solid #d48e8e;
  }
  .active {
    color: #ffffff;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background: #d48e8e;
      margin-top: 0.3125rem;
    }
  }
}
.addons-container {
  display: flex;
  .addon {
    border: 1px solid #e9beb3;
    margin: 0px 0.5rem;

    text-align: center;
    .addon-cost {
      font-size: 1.3125rem;
      line-height: 1.8125rem;
      text-align: center;
      color: #e9beb3;
      padding: 18px 0px;
      border-bottom: 1px solid rgba(233, 190, 179, 0.3);
    }
    .addon-units {
      font-size: 1.0625rem;
      line-height: 1.4375rem;
      text-align: center;
      margin-bottom: 0px;
      color: #ebbeb5;
    }
    button {
      padding: 0.3125rem 1rem;
      border: 1px solid #ffffff;
      font-size: 0.8125rem;
      color: #e9beb3;
      margin: 1.25rem;
      cursor: pointer;
    }
  }
}
</style>

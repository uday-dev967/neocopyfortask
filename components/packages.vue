<template>
  <div class="main-container" v-if="!loadingPaymentPage">
    <div class="package-head-container" :style="{'text-align':align}">
      <h3>Choose a Plan</h3>
      <p>Applicable from next Billing Cycle</p>
    </div>
    <div class="billing-cycle-container" :style="{'justify-content':align}">
      <p :class="{active : selectedDur == 1}" @click="selectedDur=1">Monthly</p>
      <p :class="{active : selectedDur == 3}" @click="selectedDur=3">
        Quarterly
        <span>5% OFF</span>
      </p>
      <p :class="{active : selectedDur == 12}" @click="selectedDur=12">
        Yearly
        <span>15% OFF</span>
      </p>
    </div>
    <div class="packages-container" v-if="packages">
      <div
        v-if="packageItem.invoice.period ==  selectedDur"
        v-for="packageItem in packages.data"
        class="packages"
      >
        <div class="package-image-container">
          <svg
            width="87"
            height="32"
            viewBox="0 0 87 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.3916 1.52869L43.2247 1.46957L43.0578 1.52869L2.83308 15.7749L1.50231 16.2462L2.83308 16.7176L43.0578 30.9638L43.2247 31.0229L43.3916 30.9638L83.6163 16.7176L84.9471 16.2462L83.6163 15.7749L43.3916 1.52869Z"
              stroke="#E9BEB3"
              stroke-miterlimit="10"
            />
            <path
              d="M43.6682 13.0291L43.5 12.9691L43.3318 13.0291L36.3318 15.5291L35.0134 16L36.3318 16.4709L43.3318 18.9709L43.5 19.0309L43.6682 18.9709L50.6682 16.4709L51.9866 16L50.6682 15.5291L43.6682 13.0291Z"
              stroke="#E9BEB3"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
        <div class="package-detail-container">
          <p class="package-name">{{packageItem.displayContext.packageName}}</p>
          <div v-html="packageItem.displayContext.packageCostPerUnit"></div>
          <div v-html="packageItem.displayContext.descriptionOne" class="display-description"></div>
        </div>
        <div class="package-button-container">
          <button
            v-bind:id="(packageItem.displayContext.packageName).replace(' ','') +'_'+selectedDur"
            :class="{'default-pkg-btn': (packageItem.displayContext.packageName == 'Neo Standard')}"
            v-on:click="openAddress(packageItem._id, packageItem.displayContext.packageName)"
          >BUY NOW</button>
        </div>
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
          <h2 v-if="showAddress">Billing Details</h2>
        </div>
        <div class="popup-details" v-if="user && user.billingAddress" style="margin-top: 1.25rem;">
          <!-- <div>
              <span>
                Full Name
                <sup>*</sup>
              </span>
              <input class="fullname" autocomplete="off" type="text" v-model="user.fullName" />
          </div>-->
          <div class="address-input-container">
            <div class="address-left-container">
              <div>
                <span>
                  First Name
                  <sup>*</sup>
                </span>
                <input autocomplete="off" type="text" v-model="user.firstName" />
              </div>
              <div>
                <span>
                  Company Name
                  <sup>*</sup>
                </span>
                <input autocomplete="off" type="text" min="0" v-model="user.companyName" />
              </div>
            </div>
            <div class="address-right-container">
              <div>
                <span>
                  Last Name
                  <sup>*</sup>
                </span>
                <input autocomplete="off" type="text" v-model="user.lastName" />
              </div>
              <div>
                <span>Number</span>
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
              Address
              <sup>*</sup>
            </span>
            <textarea name id cols="80" rows="5" v-model="user.billingAddress.street"></textarea>
          </div>
          <div class="address-input-container">
            <div class="address-left-container">
              <div>
                <span>
                  City
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
                <span>
                  State
                  <sup>*</sup>
                </span>
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
                  Country
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
                  Zip Code
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
          <button @click="cancelContainer('address')" class="cancel-button">Cancel</button>
          <button @click="addressUpdate()" class="update-address">Proceed & Buy</button>
        </div>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
  </div>
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
import { mapState, mapActions, mapGetters } from "vuex";
import Country from "static/json/country.json";
export default {
  props: {
    packages: Object,
    align: String
  },
  mounted() {
    console.log("Hello");
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

    // this.selectedStates = this.getState("India").states;
  },
  data() {
    return {
      selectedDur: 12,
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
      loadingPaymentPage: false
    };
  },
  computed: {
    ...mapGetters({
      getState: "User/getState"
    }),
    ...mapState({
      user: state => state.User.user
    })
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
      console.log("Laaaaaaaaaaa");
      this.loadingPaymentPage = true;
      this.$parent.isRedirecting = true;
      this.buy({
        accountId: this.user.accountInfo.accountId,
        package: this.packageId
      }).then(res => {
        // amplitude
        //   .getInstance()
        //   .logEvent("subscriptionBuy", { subscriptionId: this.packageId });
        this.loadingPaymentPage = false;
        this.$parent.isRedirecting = false;
        this.$parent.show = false;
        if (window.analytics) {
          window.analytics.track(
            "subscriptionBuy",
            {
              title: "buy",
              subtitle: this.packageId,
              author: this.user.email
            },
            {
              integrations: { Amplitude: { session_id: new Date().getTime() } }
            },
            { timestamp: new Date().getTime() }
          );
        }
        // window.open(res.hostedPage.url);
        // this.openPopUp(res.hostedPage.url)
        // this.openPopUp();
        this.detectPopupBlocker(res.hostedPage.url);
        this.showAddress = false;
        this.packageId = "";
      });
    },
    detectPopupBlocker(url) {
      var popup = window.open(url, "", "", true);
      setTimeout(function() {
        if (!popup || popup.outerHeight === 0) {
          //First Checking Condition Works For IE & Firefox
          //Second Checking Condition Works For Chrome
          alert(
            "Popup Blocker is enabled! Please add this site to your exception list."
          );
        } else {
          window.close();
        }
      }, 25);
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
        //    if(this.user && this.user.billingAddress && this.user.billingAddress.country !== country)
        //  if (this.user && this.user.billingAddress) {
        //    this.user.billingAddress.state = this.selectedStates[0];
        //  }
      }
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
        this.selectedDur
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
          this.upgrade();
        } else {
          this.showAddress = true;
        }
      } else {
        this.showAddress = true;
      }
      this.prepareEmailTemplate(packageName);
      // this.showAddress = true;
    },
    cancelContainer(container) {
      if ((container = "address")) {
        this.showAddress = false;
      }
    },
    addressUpdate: function() {
      // return;
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
        this.message.value = "Please fill all fields";
        this.message.global = true;
        this.message.error = true;
        setTimeout(() => {
          this.message.value = "";
          this.message.global = false;
        }, 4000);
      } else if (companyName.length <= 1) {
        this.message.value = "Company Name must be at least 2 chars";
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
          // fullName,
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
.package-head-container {
  h3 {
    color: #d48e8e;
    font-size: 1.5rem;
    font-weight: normal;
  }
  p {
    color: #8a8a8a;
    font-size: 0.9375rem;
  }
}
.billing-cycle-container {
  display: flex;
  p {
    font-size: 0.8125rem;
    color: #d48e8e;
    cursor: pointer;
    padding: 0px 1.125rem;
    border-right: 1px solid #e9beb3;
  }
  p:last-child {
    border: none;
  }
  p:first-child {
    padding-left: 0px;
  }
  .active {
    color: #ffffff;
    &::after {
      content: "";
      width: 100%;
      height: 0.125rem;
      background: #d48e8e;
      display: block;
      margin-top: 0.3125rem;
    }
  }
  span {
    // color: #faece8;
    color: black;
    font-size: 0.6875rem;
    padding: 0.125rem 0.75rem;
    background: #d48e8e;
    margin-left: 0.625rem;
    font-weight: 500;
  }
}
.packages-container {
  display: flex;
  @include respond(phone) {
    // width < 900px?
  }
  @include respond(s-phone) {
    // width < 480px?
    display: grid;
  }
  .packages {
    margin: 0.625rem;
    border: 1px solid #edd1d1;
    background: #222021;
    padding: 1.5625rem 1.25rem;
    display: flex;
    width: 15.1875rem;
    flex-direction: column;
    justify-content: space-between;
    height: 26rem;
    @include respond(phone) {
      // width < 900px?
    }
    @include respond(s-phone) {
      // width < 480px?
      height: auto;
      width: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .package-detail-container {
      .package-name {
        color: #e9e9e9;
        font-size: 1.3125rem;
        margin: 0.625rem 0px 0.9375rem 0px;
        text-align: center;
        @include respond(phone) {
          // width < 900px?
        }
        @include respond(s-phone) {
          // width < 480px?
          text-align: left;
        }
      }
      .display-description {
        @include respond(phone) {
          // width < 900px?
        }
        @include respond(s-phone) {
          // width < 480px?
          display: none;
        }
      }
    }
    .package-image-container {
      text-align: center;
      @include respond(phone) {
        // width < 900px?
      }
      @include respond(s-phone) {
        // width < 480px?
        display: none;
      }
    }
    .package-button-container {
      text-align: center;
      margin-top: auto;
      @include respond(s-phone) {
        // width < 480px?
        margin: 0px;
      }
      button {
        color: #e9beb3;
        padding: 0.625rem 1.5625rem;
        border: 1px solid #ffffff;
        cursor: pointer;
        @include respond(s-phone) {
          // width < 480px?
          font-size: 1rem;
        }
      }
    }
  }
}

.main-container {
  // width: max-content;

  background: #222021;
}
.fullname {
  width: 100%;
}
.default-pkg-btn {
  background: #d48e8e;
  color: black !important;
  border: none !important;
  box-shadow: 0px 10px 14px -4px black;
}
</style>

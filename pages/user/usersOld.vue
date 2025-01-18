<template>
  <section v-if="onboardingFormFilled == undefined || (user && user.isMBUser)" class="auth-loader">
    <h3>{{ $t("onboardingFlow.authenticating") }}</h3>
    <div class="loader"></div>
    <div class="loginMessage" v-if="message">
      <h2>{{ $t("onboardingFlow.loginSuccessful") }}</h2>
    </div>
  </section>
  <section v-else-if="onboardingFormFilled == false && user && !user.isMBUser">
    <!-- step -- 1 -->
    <div v-if="showContactNumberStep" class="contact-details-step fyr_cauth_pup_wrapper fyr_cauth_pup_sup_s4">
      <div class="fyr_cauth_pup1">
        <div class="fyr_cauth_pup11">
          <div class="fyr_cauth_pup11_t0">
            <img src="~assets/images/onboard/logo_p1.png" />
          </div>
          <div class="fyr_cauth_pup11_t1">{{ $t("onboardingFlow.shareNumberText") }}</div>
        </div>
        <div class="fyr_cauth_pup14">
          <div class="dflex fyr_cauth_pup_s4_14_1">
            <input
              type="tel"
              id="userNumber"
              maxlength="15"
              class="fyr_cauth_ipt_typ1 fyr_cauth_pup_s4_14_1_12"
              v-model="userData['contactNumber']"
              placeholder="Contact number"
              autofocus
              @keydown="checkNumber($event)"
            />
          </div>
          <div
            v-if="countryCode && countryCode.name !== 'united kingdom'"
            class="dflex fyr_cauth_pup_s4_14_2"
            :style="{
              visibility:
                countryCode && countryCode.name !== 'united kingdom' ? 'visible' : 'hidden',
            }"
          >
            <input
              type="checkbox"
              class="fyr_cauth_pup_s4_14_21"
              v-model="userData['non_UK_user_consent_checkbox']"
            />
            <div class="fyr_cauth_pup_s4_14_22">
              <i>{{ $t("onboardingFlow.generalCallConsentText[0]") }}
                <a 
                  href="https://foyr.com/terms-conditions/"
                  target="_blank"
                >{{ $t("onboardingFlow.generalCallConsentText[1]") }}</a> 
              {{ $t("onboardingFlow.generalCallConsentText[2]") }}
              </i>
            </div>
          </div>
          <div
            class="dflex fyr_cauth_pup_s4_14_2"
            :style="{
              visibility:
                countryCode && countryCode.name == 'united kingdom' ? 'visible' : 'hidden',
            }"
          >
            <input
              type="checkbox"
              class="fyr_cauth_pup_s4_14_21"
              v-model="userData['consent']"
            />
            <div class="fyr_cauth_pup_s4_14_22">
              Please tick this box if you are happy to be contacted by phone.
              Please note that we will only call on working days between 9 am
              and 6 pm. We might get in touch with you to offer assistance in
              learning Neo or schedule a personalized demo as you go through the
              14-day trial.
            </div>
          </div>
          <button
            class="fyr_cauth_btn_typ1 fyr_cauth_pup14_2"
            :class="{ disable: userData['contactNumber'].length < 6 }"
            id="next-button"
            @click="handleLetsGoButtonClick"
          >
            {{ $t("buttonText.letsGo") }}
          </button>
          <div
            class="fyr_cauth_btn_err1 fyr_cauth_pup14_3"
            v-if="message.value"
          >
            {{ message.value }}
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="dflex mt_auto fyr_cauth_pup17">
          <div class="fyr_cauth_pup17_n">
            <div class="onboarding-progress-bar">
              <div class="progress fifty-percent-done"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- step -- 1.1 OTP Verification for indian users -->
    <div v-if="!showContactNumberStep && isUserIndian && !isUserMobileVerified" class="contact-details-step otp-step-wrapper fyr_cauth_pup_wrapper fyr_cauth_pup_sup_s4">
      <div class="fyr_cauth_pup1">
        <div class="fyr_cauth_pup11">
          <div class="fyr_cauth_pup11_t0">
            <img src="~assets/images/onboard/logo_p1.png" />
          </div>
          <div class="fyr_cauth_pup11_t1">Please verify your phone number</div>
        </div>
        <div class="fyr_cauth_pup14">
          <div class="otp-input-wrapper">
              <input id="otp_1" type="number" name="otp-one" placeholder="_" class="strip-input-default-styles" @input="handleOTPInputEvent" @keyup="handleOTPKeyupEvent">
              <input id="otp_2" type="number" name="otp-two" placeholder="_" class="strip-input-default-styles" @input="handleOTPInputEvent" @keyup="handleOTPKeyupEvent">
              <input id="otp_3" type="number" name="otp-three" placeholder="_" class="strip-input-default-styles" @input="handleOTPInputEvent" @keyup="handleOTPKeyupEvent">
              <input id="otp_4" type="number" name="otp-four" placeholder="_" class="strip-input-default-styles" @input="handleOTPInputEvent" @keyup="handleOTPKeyupEvent">
          </div>
          <button
            class="fyr_cauth_btn_typ1 fyr_cauth_pup14_2"
            :class="{ disable: enteredOTP.length < 4 }"
            id="next-button"
            @click="handleVerifiOTPClick"
          >
            Next
          </button>
          <div
            class="fyr_cauth_btn_err1 fyr_cauth_pup14_3"
            v-if="message.value"
          >
            {{ message.value }}
          </div>
        </div>

        <div class="resend-otp-and-change-number">
          <div class="resend-otp" :class="{ 'enabled': isResentOTPEnabled }" @click="handleResendOTPClick">Resend One-Time Password</div>
          <div class="change-number" @click="forceShowContactScreen = true">
            Entered a wrong number?
          </div>
        </div>
        <!-- Bottom bar -->
        <div class="dflex mt_auto fyr_cauth_pup17">
          <div class="fyr_cauth_pup17_n">
            <div class="onboarding-progress-bar">
              <div class="progress fifty-percent-done"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- step -- 2 -->
    <div
      class="category-details-step fyr_cauth_pup_wrapper fyr_cauth_pup_sup_s3"
      v-if="showCategorySelectionStep"
    >
      <div class="fyr_cauth_pup1">
        <div class="fyr_cauth_pup11">
          <div class="fyr_cauth_pup11_t0">
            <img src="~assets/images/onboard/logo_p1.png" />
          </div>
          <div class="fyr_cauth_pup11_t1">{{ $t("onboardingFlow.whatYouDoText") }}</div>
        </div>
        <div
          class="fyr_cauth_pup1_sup_s3_catgs user_catgories"
          v-if="onBoardingData && category"
        >
          <div
            class="fyr_cauth_pup1_sup_s3_catgs1 category_card"
            v-for="(item, index) in onBoardingData.categories"
            :key="index"
            @click="selectedCat(item)"
            :class="{ selected: item == selectedCategory }"
          >
            <img :src="userCategoryToIconMapping[item.keyName].icon" />
            {{ item.displayName }}
          </div>
        </div>
        <div class="dflex mt_auto fyr_cauth_pup17">
          <div class="fyr_cauth_pup17_n">
            <div class="onboarding-progress-bar">
              <div class="progress sity-six-percent-done"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- step -- 3 -->
    <div
      class="ft-reasons-selection-step fyr_cauth_pup_wrapper fyr_cauth_pup_sup_s3"
      v-if="!showContactNumberStep && showFTReasonStepToSelectedCategory && ( user && !user.FTReason )"
    >
      <div class="fyr_cauth_pup1">
        <div class="fyr_cauth_pup11">
          <div class="fyr_cauth_pup11_t0">
            <img src="~assets/images/onboard/logo_p1.png" />
          </div>
          <div class="fyr_cauth_pup11_t1">What are you looking to get out of this Free Trial?</div>
        </div>
        <div class="reasons-wrapper">
          <div
            class="reason"
            v-for="(reason, index) in userCategoryToIconMapping[selectedCategory.keyName].reasons"
            :key="index"
            @click="handleFTReasonClick(reason)"
          >
            {{ reason }}
          </div>
          <div
            class="reason"
            :class="{ 'is-selected': isOtherAnswerSelected }"
            @click="handleOtherClick"
          >
            Other
            <div v-if="isOtherAnswerSelected" class="custom-reason-input">
              <textarea v-model="userData.FTReason" placeholder="Please Specify *"></textarea>
            </div>
          </div>
        </div>
        <div v-if="isOtherAnswerSelected" class="next-button" :class="{ 'disabled': !userData.FTReason || userData.FTReason.length === 0 }" @click="handleFTReasonClick(userData.FTReason)">
          Next 
          <svg
            class="fyr_cauth_pup17_b1"
            width="6"
            height="9"
            viewBox="0 0 6 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.172928 3.98388L4.13115 0.165524C4.2227 0.0771384 4.34443 0.0289358 4.47387 0.0298249C4.60331 0.030714 4.72436 0.0805844 4.81469 0.170219L5.1023 0.455327C5.28944 0.641105 5.28738 0.940945 5.0977 1.12385L1.77389 4.33028L5.05698 7.58566C5.14731 7.6753 5.1967 7.7943 5.19583 7.92083C5.19496 8.04749 5.14394 8.1658 5.05239 8.25426L4.76089 8.53532C4.66927 8.62371 4.54761 8.67191 4.41817 8.67102C4.28873 8.67013 4.16768 8.62026 4.07735 8.53063L0.16832 4.65472C0.0777796 4.5648 0.0285323 4.44524 0.0296904 4.31851C0.0302768 4.19128 0.0811615 4.07247 0.172928 3.98388Z"
              fill="#232121"
            />
          </svg>
        </div>
        <div class="dflex mt_auto fyr_cauth_pup17">
          <div class="fyr_cauth_pup17_n">
            <div class="onboarding-progress-bar">
              <div class="progress seventy-five-percent-done"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- step 4 for Indian Home Owners -->
    <div
      class="ft-reasons-selection-step home-owner-signup-reasons fyr_cauth_pup_wrapper fyr_cauth_pup_sup_s3"
      v-if="!showContactNumberStep && isUserMobileVerified && isUserIndian && isSelectedCategoryHomeOwner && isHomeOwnerAdditionalInfoNotEntered"
    >
      <div class="fyr_cauth_pup1">
        <div class="fyr_cauth_pup11">
          <div class="fyr_cauth_pup11_t0">
            <img src="~assets/images/onboard/logo_p1.png" />
          </div>
          <div class="fyr_cauth_pup11_t1">Are you searching for interior design for your new home or renovation?</div>
        </div>
        <div class="reasons-wrapper">
          <div
            class="reason"
            :class="{ 'is-selected': userData.ho_reason === reason }"
            v-for="(reason, index) in userCategoryToIconMapping[selectedCategory.keyName].lookingForDesigner"
            :key="index"
            @click="userData.ho_reason = reason"
          >
            {{ reason }}
          </div>
        </div>
        <div class="fyr_cauth_pup11">
          <div class="fyr_cauth_pup11_t1">Do you need help with any of the following services?</div>
        </div>
        <div class="reasons-wrapper">
          <div
            class="reason"
            :class="{ 'is-selected': userData.ho_help === reason }"
            v-for="(reason, index) in userCategoryToIconMapping[selectedCategory.keyName].needHelp"
            :key="index"
            @click="userData.ho_help = reason"
          >
            {{ reason }}
          </div>
        </div>
        <div class="fyr_cauth_pup11">
          <div class="fyr_cauth_pup11_t1">Please enter your Pin code so we can serve you better</div>
        </div>
        <div class="dflex fyr_cauth_pup_s4_14_1">
          <input
            type="number"
            id="userNumber"
            maxlength="15"
            class="fyr_cauth_ipt_typ1 fyr_cauth_pup_s4_14_1_12"
            v-model="userData['ho_pincode']"
            placeholder="Pincode"
            @keydown="checkNumber($event)"
          />
        </div>
        <button
          class="fyr_cauth_btn_typ1 fyr_cauth_pup14_2"
          :class="{ disable: isHomeOwnerAdditionalInfoStepFinishButtonDisabled }"
          id="next-button"
          @click="handleHomeOwnderStepFinishButtonClick"
        >
          Finish
        </button>
        <div class="dflex mt_auto fyr_cauth_pup17">
          <div class="fyr_cauth_pup17_n">
            <div class="onboarding-progress-bar">
              <div class="progress seventy-five-percent-done"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- step - 4 -->
    <!-- <div v-if="user && user.FTReason" class="schedule-meeting-step fyr_cauth_pup_wrapper fyr_cauth_pup_sup_s4">
      <div class="fyr_cauth_pup1">
        <div class="fyr_cauth_pup11">
          <div class="fyr_cauth_pup11_t0">
            <img src="~assets/images/onboard/logo_p1.png" />
          </div>
          <div class="fyr_cauth_pup11_t1">Let us help you reach your design goals faster by talking to us!</div>
        </div>
        <div class="fyr_cauth_pup14">
          <div class="schedule-meeting-or-skip-demo">
            <div @click="handleScheduleAMeetingClick" class="schedule-meeting-button">
              Schedule a Meeting
            </div>
            <div @click="handleTryOnMyOwnClick" class="try-on-my-own-button">
              Try on my Own
            </div>
          </div>
        </div>

        <div class="dflex mt_auto fyr_cauth_pup17">
          <div class="fyr_cauth_pup17_n">
            <div class="onboarding-progress-bar">
              <div class="progress ninty-percent-done"></div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  middleware: ["initAuth", "authReq"],
  head() {
    return {
      title: "Neo - User",
    };
  },

  data() {
    return {
      category: true,
      isLoading: false,
      selectedCategory: undefined,
      userData: {
        contactNumber: "",
        consent: false,
        FTReason: "",
        ho_help: "",
        ho_pincode: "",
        ho_reason: "",
        non_UK_user_consent_checkbox: true,
      },
      message: {
        value: "",
        error: false,
        global: false,
      },
      step: 1,
      isAllowToCall: false,
      userCategoryToIconMapping: {
        "Interior Designer": {
          icon: require("~/assets/images/userCategories/interiorDesigner.svg"),
          reasons: [
            "An easy-to-use tool to offer 3D designs to my customers",
            "A tool to scale up my existing 3D design capacity ",
            "Evaluate Neo as an alternative to my existing tool(s)",
            "Evaluate Neo for its render speed and quality",
          ]
        },
        "Kitchen & Bath Designer": {
          icon: require("~/assets/images/userCategories/kitchenAndBathDesigner.svg"),
          reasons: [
            "An easy-to-use modular design tool",
            "Evaluate Neo as an alternative to my existing software",
            "Evaluate Neo’s ability to handle customizations",
            "Evaluate Neo for its extensive product catalog",
            "Evaluate Neo for its render speed and quality",
          ]
        },
        "Home Stager": {
          icon: require("~/assets/images/userCategories/homeStager.svg"),
          reasons: [
            "An easy-to-use tool to offer 3D designs to my customers",
            "A tool to scale up my existing staging business",
            "Evaluate Neo to create floor plans quickly",
            "Evaluate Neo for its extensive product catalog",
            "Evaluate Neo for its render speed and quality",
          ]
        },
        "Architect": {
          icon: require("~/assets/images/userCategories/architect.svg"),
          reasons: [
            "An easy-to-use tool to offer 3D designs to my customers",
            "Evaluate Neo’s capability in creating production drawings ",
            "Looking to scale up my business by offering 3D designs to clients",
            "Evaluate Neo for its speed & quality of rendering",
            "Looking for premade designs to add to my architectural drawing",
          ]
        },
        "Contractor": {
          icon: require("~/assets/images/userCategories/contractor.svg"),
          reasons: [
            "An easy-to-use tool to offer 3D designs to my customers",
            "Evaluate Neo’s capability in creating production drawings ",
            "Looking to scale up my business by offering 3D designs to clients",
            "Evaluate Neo for its speed & quality of rendering",
            "Looking for premade designs to add to my architectural drawing",
          ]
        },
        "Student": {
          icon: require("~/assets/images/userCategories/student.svg")
        },
        "Home Owner": {
          icon: require("~/assets/images/userCategories/homeOwner.svg"),
          lookingForDesigner: [
            "New Home Interiors",
            "Renovation of existing house",
            "Currently not searching",
          ],
          needHelp: [
            "Need help with design",
            "End to end execution",
            "Connect with contractors",
            "Currently not in the need",
          ]
        },
        "Other": {
          icon: require("~/assets/images/userCategories/others.svg")
        },
      },
      isOtherAnswerSelected: false,
      enteredOTP: "",
      forceShowContactScreen: false,
      isResentOTPEnabled: false
    };
  },
  mounted() {
    setTimeout(() => {
      let chat = document.getElementById("fc_frame");
      if (chat) {
        chat.style.display = "none";
      }
    }, 2000);
    this.getCountryCode().then((data) => {
      this.userData["contactNumber"] = this.countryCode.dial_code;
    });
    this.isLoading = false;
    this.fetchOnboarding()
      .then((res) => {
        // res.fields.forEach((element) => {
        //   this.userData[element.keyName] = "";
        // });
        this.fetchUserDetails().then( data => {
          if ( data ) {
            if ( data.contactNumber ) {
              this.userData["contactNumber"] = data.contactNumber
            }
            
            if (data.accountExtraInfo && data.accountExtraInfo.hasOwnProperty("ho_pincode")) {
              this.userData["ho_pincode"] = data.accountExtraInfo.ho_pincode || ""
            }
            if (data.accountExtraInfo && data.accountExtraInfo.hasOwnProperty("ho_help")) {
              this.userData["ho_help"] = data.accountExtraInfo.ho_help || ""
            }
            if (data.accountExtraInfo && data.accountExtraInfo.hasOwnProperty("ho_reason")) {
              this.userData["ho_reason"] = data.accountExtraInfo.ho_reason || ""
            }

            if ( data.accountExtraInfo && data.accountExtraInfo.userCategory && this.onBoardingData && this.onBoardingData.categories ) {
              const category = this.onBoardingData.categories.find( e => e.displayName == data.accountExtraInfo.userCategory );
              if ( category ) {
                this.selectedCategory = category
              }
            }
            if (!this.isUserMobileVerified && this.isUserIndian) {
              this.sendOTPandResetOTPStepVariables()
            }
          }
        });
      })
      .catch((err) => {console.log(err)});

    
    if (window.analytics) {
      window.analytics.track(
        "onboarding",
        {
          title: "Onboarding",
          subtitle: "Onboarding page",
        },
        { integrations: { Amplitude: { session_id: new Date().getTime() } } },
        { timestamp: new Date().getTime() }
      );
    }

    this.handleOnboardingForMBUsers(this.user)

    if (this.onboardingFormFilled) {
      if (this.$ua.deviceType() == "pc") this.$router.push(this.localePath("/dashboard"));
      else this.$router.push(this.localePath("/dashboard_mobile/home"));
    }
  },
  watch: {
    onboardingFormFilled: function (data) {
      // debugger;
      // if(data)
      // {
      //   if(this.$ua.deviceType() == 'pc')
      //     if(this.$ua.browser() == 'Chrome')
      //       this.$router.push('/dashboard')
      //     else
      //       this.$router.push('/blocked')
      //   else
      //     this.$router.push('/dashboard_mobile/home')
      // }
    },
    user(nv) {
      this.handleOnboardingForMBUsers(nv);
    }
  },
  computed: {
    ...mapGetters("User", ["isUserSpanish", "isUserJapanese"]),
    // a computed getter
    ...mapState({
      onBoardingData: (state) => state.User.onBoarding,
      onboardingFormFilled: (state) => state.Auth.onboardingFormFilled,
      user: (state) => state.User.user,
      countryCode: (state) => state.User.countryCode,
    }),
    showContactNumberStep() {
      return !this.user || ( this.user && !this.user['contactNumber'] ) || this.forceShowContactScreen;
    },
    showFTReasonStepToSelectedCategory() {
      return !this.isUserJapanese &&
      !this.isUserSpanish &&
      this.selectedCategory &&
      this.selectedCategory.keyName &&
      ( this.selectedCategory.keyName === "Interior Designer" ||
        this.selectedCategory.keyName === "Kitchen & Bath Designer" ||
        this.selectedCategory.keyName === "Home Stager" ||
        this.selectedCategory.keyName === "Architect" ||
        this.selectedCategory.keyName === "Contractor" );
    },
    isUserIndian() {
      return this.user &&
      this.user.ipInfo &&
      this.user.ipInfo.country &&
      this.user.ipInfo.country === "IN"
    },
    isUserMobileVerified() {
      return this.user &&
      this.user.isMobileVerified
    },
    isSelectedCategoryHomeOwner() {
      return this.selectedCategory &&
      this.selectedCategory.keyName &&
      this.selectedCategory.keyName === "Home Owner";
    },
    isHomeOwnerAdditionalInfoNotEntered() {
      return this.user && 
      (
        !this.user.ho_pincode ||
        !this.user.ho_help ||
        !this.user.ho_reason ||
        (this.user.ho_pincode && this.user.ho_pincode.length < 6)
      )
    },
    isHomeOwnerAdditionalInfoStepFinishButtonDisabled() {
      return !this.userData.ho_pincode ||
        !this.userData.ho_help ||
        !this.userData.ho_reason ||
        (this.userData.ho_pincode && this.userData.ho_pincode.length < 6)
    },
    showCategorySelectionStep() {
      if ( this.isUserIndian ) {
        return !this.showContactNumberStep && !this.selectedCategory && this.isUserMobileVerified;
      }

      return !this.showContactNumberStep && !this.selectedCategory;
    }
  },
  methods: {
    ...mapMutations({
          setGetFreeDemoShow_Desk: "Dash/setGetFreeDemoShow_Desk",
      }),
    ...mapActions({
      fetchOnboarding: "User/fetchOnboarding",
      fetchUserDetails: "User/fetchUserDetails",
      saveOnboarding: "User/saveOnboarding",
      fetchUser: "User/fetch",
      getCountryCode: "User/getCountryCode",
      creatNewV2Project: "Projects/creatNewV2Project",
      updateGoalStatus: "User/updateGoalForm",
      sendOTP: "User/sendOTP",
      resendOTP: "User/resendOTP",
      verifyOTP: "User/verifyOTP"
    }),
    selectedCat(cat) {
      this.category = false;
      this.selectedCategory = cat;
      if (window.analytics) {
        window.analytics.track(
          "signupstep4_clicked",
          {
            title: "user selects the persona",
            subtitle: "select persona screen",
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }

      if ( this.isUserJapanese || this.isUserSpanish ) {
        this.submit({ onboardingFormFilled:"true", cb: this.onboardingComplete })
        if (window.analytics) {
          window.analytics.track(
            "started_ft_dashboard",
            {},
            { integrations: { Amplitude: { session_id: new Date().getTime() } } },
            { timestamp: new Date().getTime() }
          );
        }
      } else if (
        this.showFTReasonStepToSelectedCategory
      ) {
        this.submit()
      } else if (this.isUserIndian && this.isSelectedCategoryHomeOwner) {
        this.submit()
      } else {
        this.submit({ onboardingFormFilled:"true", cb: this.onboardingComplete })
        if (window.analytics) {
          window.analytics.track(
            "started_ft_dashboard",
            {},
            { integrations: { Amplitude: { session_id: new Date().getTime() } } },
            { timestamp: new Date().getTime() }
          );
        }
      }
    },
    back() {
      if (this.step == 1) this.category = true;
      else this.step = 1;
    },
    saveCountry(key, value) {
      this.step = 2;
      this.userData[key] = value;
      if (value == "United States") this.userData["contactNumber"] = "+1";
      else if (value == "India") this.userData["contactNumber"] = "+91";
      else if (value == "Singapore") this.userData["contactNumber"] = "+65";
      else if (value == "UK") this.userData["contactNumber"] = "+44";
      else if (value == "Australia") this.userData["contactNumber"] = "+61";
      else if (value == "Canada") this.userData["contactNumber"] = "+1";
      else this.userData["contactNumber"] = "";
      setTimeout(() => {
        document.getElementsByClassName("contact-number")[0].focus();
      }, 100);
    },
    closeSelect() {
      for (let key in this.onBoardingData.fields) {
        if (this.onBoardingData.fields[key].type === "select") {
          this.onBoardingData.fields[key].show = false;
        }
      }
    },
    changeValue(value, item) {
      item.show = false;
      this.userData[item.keyName] = value;
    },
    search: function (value, item) {
      // `this` points to the vm instance
      if (item.values && value && value !== "" && item.search)
        return item.values.filter((element) => {
          return element.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
      else {
        return item.values;
      }
    },
    handleVerifiOTPClick() {
      const mobile = this.getMobileNumber(this.userData.contactNumber)
      this.verifyOTP({mobile, otp: this.enteredOTP})
      .then(() => {
        this.setGlobalMessages("SUCCESS", false, false)
        this.submit()
      }).catch(err => {
        this.setGlobalMessages(this.$t("messages.invalidOtp"), true, false)
      })
    },
    handleResendOTPClick() {
      if(this.isResentOTPEnabled) {
        this.sendOTPandResetOTPStepVariables(true);
      }
    },
    handleLetsGoButtonClick() {
      let validate = true;
      var regexPhone = /^[0-9\s)(+-]*$/;

      if(!this.userData["non_UK_user_consent_checkbox"]) {
        validate = false;
        this.message.value = this.$t("onboardingFlow.pleaseTickTheBoxToProceed");
      }

      if (window.analytics) {
        window.analytics.track(
          "signupstep3_clicked",
          {
            title: "user inputs the phone number",
            subtitle: "input phone number screen",
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
      if (this.userData["contactNumber"].length < 6) {
        validate = false;
        this.message.value = `Contact number should be minmum 6 digits`;
      }
      if (!this.countryCode.dial_code) {
        validate = false;
        this.message.value = `Please provide country code`;
      }
      if (
        !this.userData["consent"] &&
        this.countryCode.name == "united kingdom"
      ) {
        validate = false;
        this.message.value = `Please tick the box to proceed `;
      }
      if ( !validate ) {
        this.message.error = true;
        this.message.global = true;
        setTimeout(() => {
          this.message.global = false;
          this.message.value = "";
          this.message.error = false;
        }, 5000);
      } else {
        this.submit().then(res => {
          this.forceShowContactScreen = false;
          this.sendOTPandResetOTPStepVariables()
        }).catch(err => {
          if(err.status === 500) {
            this.setGlobalMessages(this.$t("messages.contactNumberExists"), true, false)
          }
        })
      }
    },
    sendOTPandResetOTPStepVariables(resentOTP = false) {
      this.isResentOTPEnabled = false;
      
      if(this.userData.hasOwnProperty("contactNumber") && this.userData.contactNumber.length >= 10) {
        const mobile = this.getMobileNumber(this.userData.contactNumber)
        if (resentOTP) {
          // resent otp
          this.resendOTP({mobile})
          .then(() => {
            this.setGlobalMessages(this.$t("messages.otpSent"), false, false)
            
          }).catch(err => {
            this.setGlobalMessages(err.message, true, false)
          })
        } else {
          // send otp
          this.sendOTP({mobile})
          .then(() => {
            this.setGlobalMessages(this.$t("messages.otpSent"), false, false)
            
          }).catch(err => {
            this.setGlobalMessages(err.message, true, false)
          })
        }
      }
      setTimeout(() => {
        this.isResentOTPEnabled = true;
      }, 1000 * 15)
    },
    submit( { onboardingFormFilled = false, cb = null, openDemoBookingModal = false } = {} ) {
      
      if ( onboardingFormFilled ) {
        this.userData.onboardingFormFilled = onboardingFormFilled;
      }
      if ( this.selectedCategory && this.selectedCategory.displayName ) {
        this.userData.userCategory = this.selectedCategory.displayName;
      }

      this.userData.device = this.$ua.deviceType();
      this.userData.browser = this.$ua.browser();
      this.userData.consent = this.isAllowToCall;
      this.userData.location = this.countryCode.name;
      this.isLoading = true;
      if (
        this.$store.state.User &&
        this.$store.state.User.user &&
        this.$store.state.User.user.ipInfo &&
        this.$store.state.User.user.ipInfo.country
      ) {
        this.userData["country"] = this.$store.state.User.user.ipInfo.country;
      }

      if (
        this.$store.state.User &&
        this.$store.state.User.user &&
        this.$store.state.User.user.currencyInfo &&
        this.$store.state.User.user.currencyInfo.currency
      ) {
        this.userData["currency"] =
          this.$store.state.User.user.currencyInfo.currency;
      }

      this.userData["contactNumber"] = this.userData["contactNumber"];
      return this.saveOnboarding({ extraInfo: this.userData })
        .then((res) => {
          this.fetchUser({ skipOnboardingCheck: true }).then((res) => {
            this.isLoading = false;
            if (cb) {
              cb(openDemoBookingModal);
            }
          });
        })
        .catch((err) => {
          throw err.response
        });
    },
    onboardingComplete( openDemoBookingModal ) {
      if (window.analytics) {
        window.analytics.group(this.user.accountId, this.userData);
        //this.userData['UK_consent_checkbox'] = (this.userData && this.userData['location'] === 'UK') ? true : false;
        // this.userData['rep_name'] = (this.user && this.user.name) ? this.user.name : 'N/A'
        // this.userData['rep_email'] = (this.user && this.user.email) ? this.user.email : 'N/A'
        window.analytics.identify(
          this.$store.state.User.user._id,
          this.userData
        );
      }
      setTimeout(() => {
        let chat = document.getElementById("fc_frame");
        chat.style.display = "block";
      }, 2000);
      window.parent.postMessage("login-success", '*');
      if (window.$nuxt.$store.$ua.deviceType() == "pc") {
        this.$router.push(this.localePath("/dashboard"));
        this.setGetFreeDemoShow_Desk(openDemoBookingModal)
      } else {
        this.$router.push(this.localePath("/dashboard_mobile/home"));
        this.setGetFreeDemoShow_Desk(openDemoBookingModal)
      }
    },
    checkNumber(e) {
      let key = Number(e.key);
      if (
        e.keyCode == 8 ||
        e.keyCode == 13 ||
        e.keyCode == 46 ||
        e.keyCode == 187 ||
        e.keyCode == 16
      ) {
        return;
      }
      if (isNaN(key) || e.key === null || e.key === " ") {
        e.preventDefault();
      } else {
      }
    },
    handleFTReasonClick(reason) {
      this.userData["FTReason"] = reason
      if (window.analytics) {
        window.analytics.track(
          "signupstep5_clicked",
          {
            title: "user selects ft reason",
            subtitle: "select persona screen",
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
        window.analytics.track(
          "started_ft_dashboard",
          {},
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
      this.submit({ onboardingFormFilled:"true", cb: this.onboardingComplete })
    },
    handleHomeOwnderStepFinishButtonClick() {
      if (window.analytics) {
        window.analytics.track(
          "started_ft_dashboard",
          {},
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
      this.submit({ onboardingFormFilled:"true", cb: this.onboardingComplete })
    },
    handleOtherClick() {
      this.isOtherAnswerSelected = true;
    },
    handleScheduleAMeetingClick() {
      if (window.analytics) {
        window.analytics.track(
          "signupstep6_clicked",
          {},
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
        window.analytics.track(
          "signupstep6_clicked_demo",
          {},
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
        window.analytics.track(
          "started_ft_dashboard",
          {},
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
      this.submit({ onboardingFormFilled:"true", cb: this.onboardingComplete, openDemoBookingModal: true })
    },
    handleTryOnMyOwnClick() {
      if (window.analytics) {
        window.analytics.track(
          "signupstep6_clicked",
          {},
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
        window.analytics.track(
          "signupstep6_clicked_own",
          {},
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
        window.analytics.track(
          "started_ft_dashboard",
          {},
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
      this.submit({ onboardingFormFilled:"true", cb: this.onboardingComplete })
    },
    handleOnboardingForMBUsers(user) {
      if (user && user.isMBUser && !this.onboardingFormFilled) {
        this.submit({ onboardingFormFilled:"true", cb: this.onboardingComplete })
        this.updateGoalStatus({ onboardingGoalFilled: "true" }).then((res) => { })
        if (window.analytics) {
          window.analytics.track(
            "started_ft_dashboard",
            {},
            { integrations: { Amplitude: { session_id: new Date().getTime() } } },
            { timestamp: new Date().getTime() }
          );
        }
      }
    },
    handleOTPInputEvent(e) {
      const target = e.target; 
      const val = target.value; 
    
      if (isNaN(val)) { 
        target.value = ""; 
        return; 
    } 
  
    if (val != "") {
        if (val > 9) {
          let newVal = (val + "").split("")[ 0 ]
          target.value = newVal
        }
        const next = target.nextElementSibling; 
        if (next) { 
            next.focus(); 
        } 
        this.computeOTPString()
      }
    },
    handleOTPKeyupEvent(e) {
      const target = e.target; 
      const key = e.key.toLowerCase(); 
      
      if (key == "backspace" || key == "delete") { 
        target.value = ""; 
        const prev = target.previousElementSibling; 
        if (prev) { 
          prev.focus(); 
        } 
        this.computeOTPString()
        return; 
      } 
    },
    computeOTPString() {
      this.enteredOTP = "";
      document.querySelector(".otp-input-wrapper").childNodes.forEach(e => {
          if (e.value) {
            this.enteredOTP += e.value;
          }
      })
    },
    getMobileNumber(input) {
      const number = input.replace(/\+91|\s/g, '');
      return number;
    },
    setGlobalMessages(message="", error=false, global=false) {
      this.message.error = error;
      this.message.global = global;
      this.message.value = message
      setTimeout(() => {
        this.message.global = false;
        this.message.value = "";
        this.message.error = false;
      }, 5000);
    }
  },
};
</script>

<style>
.auth-loader {
  width: 40%;
  margin: auto;
  text-align: center;
  margin-top: 40vh;
  color: black;
}
.loader {
  height: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ddd;
}
.loader:before {
  display: block;
  position: absolute;
  content: "";
  left: -200px;
  width: 200px;
  height: 4px;
  background-color: black;
  animation: loading 2s linear infinite;
}

@keyframes loading {
  from {
    left: -12.5rem;
    width: 30%;
  }
  50% {
    width: 30%;
  }
  70% {
    width: 30%;
  }
  80% {
    left: 80%;
  }
  95% {
    left: 100%;
  }
  to {
    left: 120%;
  }
}
</style>
<style>
:root {
  --neo_fpauth_black1: #232121;
  --neo_fpauth_black2: #3a393a;
  --neo_fpauth_black3: #0e0e0e;
  --neo_fpauth_white1: #ffffff;
  --neo_fpauth_white2: #fbf3f1;
  --neo_fpauth_white3: #f1f1f1;
  --neo_fpauth_white4: #fafafc;
  --neo_fpauth_grey1: #c4c4c4;
  --neo_fpauth_red1: #e8505b;
}
</style>
<style lang="scss" scoped>
/* Palette */

body {
  margin: 0;
}

/* Spacing */
.p_0 {
  padding: 0 !important;
}

.mt_2 {
  margin-top: 2px;
}

.mt_8 {
  margin-top: 8px;
}

.mt_12 {
  margin-top: 12px;
}

.mt_24 {
  margin-top: 24px;
}

.mt_32 {
  margin-top: 32px;
}

.mt_40 {
  margin-top: 40px;
}

.pos_relative {
  position: relative;
}

.ml_auto {
  margin-left: auto !important;
}

.mr_auto {
  margin-right: auto !important;
}

.my_auto {
  margin-top: auto;
  margin-bottom: auto;
}

.mx_auto {
  margin-left: auto;
  margin-right: auto;
}

.mgn_auto {
  margin: auto;
}

.mb_12 {
  margin-bottom: 12px;
}

.mb_24 {
  margin-bottom: 24px;
}

.mb_32 {
  margin-bottom: 32px;
}

.mb_40 {
  margin-bottom: 40px;
}

.mb_1em {
  margin-bottom: 1rem;
}

.pt_0 {
  padding-top: 0 !important;
}

.pt_12 {
  padding-top: 12px;
}

.pt_24 {
  padding-top: 24px;
}

.pt_32 {
  padding-top: 32px;
}

.pb_12 {
  padding-bottom: 12px;
}

.pb_24 {
  padding-bottom: 24px;
}

/* Display classes */
.fyr_cauth_hide {
  display: none !important;
}

.mt_auto {
  margin-top: auto;
}

.fyr_cauth_pup_wrapper {
  height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: auto;
}

/* Flexing styles */
.dflex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.flex_wrap {
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.flex_clmn {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.flex_shrink_0 {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.flex_jbtwn {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.flex_jsparound {
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.flex_jcenter {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.flex_jfend {
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

/* Flexing styles end */

/* Google buttons */
.fyr_cauth_gbtn_typ1 {
  background: var(--neo_fpauth_white1);
  border: 1px solid var(--neo_fpauth_black2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 14px;
  width: 100%;
  cursor: pointer;
  /* border-radius: 8px; */
}

.fyr_cauth_gbtn_typ1:hover {
  -webkit-box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.35);
}

.fyr_cauth_gbtn_typ11 {
  margin: auto 0;
}

.fyr_cauth_gbtn_typ12 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: var(--neo_fpauth_black1);
  margin: auto 0 auto 11px;
}

/* Google buttons end */

/* Form inputs */
.fyr_cauth_ipt_typ1 {
  background: var(--neo_fpauth_white1);
}

.fyr_cauth_ipt_typ1,
.fyr_cauth_ipt_typ1:focus {
  border: 1px solid var(--neo_fpauth_black2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: var(--neo_fpauth_black1);
  width: 100%;
  outline: none;
  /* border-radius: 8px; */
}

.fyr_cauth_ipt_typ1:focus {
  background: var(--neo_fpauth_white2);
}

/* Form inputs end */

/* Foyr Buttons */
.fyr_cauth_btn_typ1 {
  background: var(--neo_fpauth_black3);
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: var(--neo_fpauth_white1);
  height: 48px;
  padding: 8px;
  min-width: 160px;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  cursor: pointer;
  /* border-radius: 8px; */
}

.fyr_cauth_btn_typ1_disabled {
  background: var(--neo_fpauth_grey1);
  pointer-events: none;
}

.fyr_cauth_btn_err1 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: var(--neo_fpauth_red1);
}

/* Foyr Buttons end */

/* Step1 styles */
.fyr_cauth_pup1 {
  padding: 22px;
  background-color: var(--neo_fpauth_white1);
  background-image: url("~assets/images/onboard/auth_bg2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
}

.fyr_cauth_pup11_t0 {
  margin: 0 0 15px;
  text-align: center;
}

.fyr_cauth_pup11_t0 img {
  width: 120px;
  margin: 0 auto;
}

.fyr_cauth_pup11_t1 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 29px;
  text-align: center;
  color: var(--neo_fpauth_black1);
}

.fyr_cauth_pup_sin_s3 .fyr_cauth_pup11_t1 {
  text-align: left;
}

.fyr_cauth_pup11_t2 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: var(--neo_fpauth_black1);
  margin-top: 8px;
  margin-bottom: 0;
}

.fyr_cauth_pup11 {
  padding-bottom: 24px;
}

.fyr_cauth_pup_sin_s2 .fyr_cauth_pup11 {
  padding-bottom: 66px;
}

.fyr_cauth_pup12 .fyr_cauth_gbtn_typ1 {
  margin: 0 auto;
}

.fyr_cauth_pup13 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: var(--neo_fpauth_black1);
  padding: 24px 0;
}

.fyr_cauth_pup14 {
  text-align: center;
  position: relative;
}

.fyr_cauth_pup14 input {
  display: block;
  margin: auto auto 24px auto;
}

.fyr_cauth_pup14_1pwd_inr {
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.fyr_cauth_pup14_1pwd_inr .fyr_cauth_pup14_1 {
  width: 100%;
  max-width: none;
}

.fyr_cauth_pup14_1pwd_inr .fyr_cauth_pup14_1pwd {
  margin-bottom: 0;
}

.fyr_cauth_pup_sin_cpwd .fyr_cauth_pup14_1pwd_inr,
.fyr_cauth_pup_sin_pwdupd .fyr_cauth_pup14_1pwd_inr,
.fyr_cauth_pup_sup_s2 .fyr_cauth_pup14_1pwd_inr {
  margin-bottom: 24px;
}

.fyr_cauth_pup14_pwd_vicon,
.fyr_cauth_pup14_pwd_viconh {
  position: absolute;
  right: 16px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  cursor: pointer;
}

.fyr_cauth_pup14_pwd_viconh {
}

.fyr_cauth_pup14_1 {
  padding: 14px 16px;
  margin-bottom: 24px;
}

.fyr_cauth_pup14_2 {
}

.fyr_cauth_pup14_3 {
  padding-top: 12px;
}

.fyr_cauth_pup15,
.fyr_cauth_pup16 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: var(--neo_fpauth_black1);
}

.fyr_cauth_pup15 {
  padding-top: 48px;
  margin-left: auto;
  margin-right: auto;
}

.fyr_cauth_pup_sup_s2 .fyr_cauth_pup15 {
  padding-top: 16px;
}

.fyr_cauth_pup16 {
  padding-top: 12px;
}

.fyr_cauth_pup1_l {
  text-decoration: none;
  color: var(--neo_fpauth_black1);
  font-weight: 700;
  cursor: pointer;
}

// .fyr_cauth_pup1_sup_s3_catgs {
//   padding-bottom: 50px;
// }

.fyr_cauth_pup1_sup_s3_catgs1 {
  // border-left: 5px solid var(--neo_fpauth_black2);
  // background: var(--neo_fpauth_white3);
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 48px;
  color: var(--neo_fpauth_black1);
  padding: 0 16px;
  margin-bottom: 8px;
  cursor: pointer;
}

.fyr_cauth_pup1_sup_s3_catgs1:hover {
  // -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  // box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  background: #F8F0ED !important;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  box-sizing: border-box !important;
}

.fyr_cauth_pup1_sup_s3_catgs_active {
  background: var(--neo_fpauth_black2);
  color: var(--neo_fpauth_white1);
}

/* Bottom options */
.fyr_cauth_pup17 {
  padding-top: 20px;
}

.fyr_cauth_pup_sup_s4 .fyr_cauth_pup17 {
  padding-top: 142px;
}

.fyr_cauth_pup_sin_s2 .fyr_cauth_pup17 {
  padding-top: 294px;
}

.fyr_cauth_pup_sin_s3 .fyr_cauth_pup17 {
  padding-top: 316px;
}

.fyr_cauth_pup_sin_cpwd .fyr_cauth_pup17 {
  padding-top: 166px;
}

.fyr_cauth_pup_sin_pwdupd .fyr_cauth_pup17 {
  padding-top: 192px;
}

.fyr_cauth_pup17_b {
  margin: auto 0;
  cursor: pointer;
}

.fyr_cauth_pup17_b1 {
  margin: auto 0;
}

.fyr_cauth_pup17_b2 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: var(--neo_fpauth_black1);
  margin: auto 0 auto 4px;
}

.fyr_cauth_pup17_n {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  color: var(--neo_fpauth_black1);
  margin: auto 0 auto auto;
}

/* Step1 styles end */

/* Step 4 */
.fyr_cauth_pup_s4_14_1 {
  background: var(--neo_fpauth_white1);
  border: 1px solid var(--neo_fpauth_black2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 48px;
  margin-bottom: 10px;
  /* border-radius: 8px; */
}

.fyr_cauth_pup14_1 {
  background: var(--neo_fpauth_white1);
  border: 1px solid var(--neo_fpauth_black2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* border-radius: 8px; */
}

.fyr_cauth_pup_s4_14_1_11 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: var(--neo_fpauth_black1);
  padding-left: 16px;
  padding-right: 8px;
  margin: auto 0;
}

.fyr_cauth_pup_s4_14_1_12,
.fyr_cauth_pup_s4_14_1_12:focus {
  border: none;
  width: 100%;
  /* border-radius: 8px; */
}

.fyr_cauth_pup14 .fyr_cauth_pup_s4_14_1_12,
.fyr_cauth_pup14 .fyr_cauth_pup_s4_14_21 {
  margin: 0;
  cursor: pointer;
}

/* confirmation txt */
.fyr_cauth_pup_s4_14_2 {
  margin-bottom: 24px;
}

.fyr_cauth_pup_s4_14_21 {
  margin-bottom: auto;
}

.fyr_cauth_pup_s4_14_22 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: var(--neo_fpauth_black1);
  padding-left: 8px;
  text-align: left;
}

/* forgot password */
.fyr_cauth_pup14_ipt_txt1 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  color: var(--neo_fpauth_black1);
  width: max-content;
  margin: 12px 0 4px auto;
  cursor: pointer;
}

/* Password reset success */
.fyr_cauth_pup11_pwd_reset_htxt {
  padding-bottom: 0;
}

.fyr_cauth_pup1_pwd_reset_stxt1 {
  padding-left: 1rem;
  margin: 0;
}

.fyr_cauth_pup1_pwd_reset_stxt1 li {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: var(--neo_fpauth_black1);
  padding-top: 43px;
}

.fyr_cauth_pup1_pwd_txtbold {
  font-weight: 600;
}

@media only screen and (min-width: 900px) {
  .fyr_cauth_pup1 {
    width: 404px;
    min-height: 659px;
    max-height: 94vh;
    overflow-y: auto;
    box-sizing: border-box;
    margin: auto;
    box-shadow: 0px 8px 16px rgba(96, 97, 112, 0.16);
  }

  .fyr_cauth_pup_wrapper {
    background-color: var(--neo_fpauth_white4);
    background-image: url("~assets/images/onboard/auth_bg1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
  }
}

/* Scrollbar */

::-webkit-scrollbar-track {
  /* background-color: var(--neo_fpauth_white1) !important;
    border-radius: 2px; */
  // display: none;
}

::-webkit-scrollbar {
  /* width: 4px !important;
    background-color: var(--neo_fpauth_white1) !important; */
  // display: none;
}

::-webkit-scrollbar-thumb {
  /* background-color: var(--neo_fpauth_black2) !important;
    border-radius: 2px;
    border: none; */
  // display: none;
}

.hidden {
  display: none !important;
}

.disable {
  background: rgba(35, 33, 33, 0.4) !important;
  cursor: not-allowed !important;
}

.error-msg {
  font-weight: 500;
  font-size: 12px;
  color: #e8505b;
  text-align: center;
  margin-top: 10px;
}

.user_catgories {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5rem;

    .category_card {
      background: $color-white;
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-sizing: border-box;
      padding: .75rem .5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      font-weight: 600;
      font-size: .875rem;
      line-height: 1.125rem;
      text-align: center;
      color: #232121;

      margin-bottom: .75rem;

      img {
        display: block;
        height: 63px;
        width: auto;
        margin-bottom: .875rem;
      }
    }
}

.schedule-meeting-step,
.contact-details-step {
  .fyr_cauth_pup11_t1 {
    margin-top: 5rem;
  }
}

.otp-step-wrapper {

  .fyr_cauth_pup14 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .otp-input-wrapper {
    align-items: center;
    width: 100%;
    max-width: 19.75rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0 0.6875rem;
    
    input {
      padding: 1.0625rem 0.6875rem;
      border: 1px solid rgba(70, 70, 70, 0.5);
      width: 100%;
      text-align: center;
      font-size: 1rem;
      font-weight: 600;
      background-color: transparent;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    input[type=number] {
      -moz-appearance: textfield;
    }
  }

  @media (min-width: 1024px) {
    .otp-input-wrapper {
      max-width: 22.25rem;
    }
  }

  .resend-otp-and-change-number {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .resend-otp {
      font-weight: 600;
      color: $color-dark-gray;
      cursor: not-allowed;
      font-size: 1rem;
      opacity: 0.5;
      &.enabled {
        cursor: pointer;
        opacity: 1;
      }
    }
    .change-number {
      margin-top: .625rem;
      font-size: .875rem;
      cursor: pointer;
    }
  }

}

.ft-reasons-selection-step, .category-details-step {
  .fyr_cauth_pup11_t1 {
    margin-top: 2rem;
  }
}

.ft-reasons-selection-step {
  .next-button {
    cursor: pointer;
    margin-top: 1.375rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #232121;
    line-height: 1rem;

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    svg {
      margin-left: 6px;
      height: 12px;
      transform: rotate(180deg);
    }
  }
}

.home-owner-signup-reasons {
  .fyr_cauth_pup1 {
    overflow: auto;
  }
}

.onboarding-progress-bar {
  position: relative;
  background-color: #e6e6e6;
  height: 4px;
  border-radius: 4px;
  width: 11rem;

  .progress {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background-color: #C1806E;

    &.fifty-percent-done {
      width: 50%;
    }

    &.sity-six-percent-done {
      width: 66%;
    }

    &.seventy-five-percent-done {
      width: 75%;
    }

    &.eighty-percent-done {
      width: 80%;
    }

    &.ninty-percent-done {
      width: 90%;
    }
  }
}

.card-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.reasons-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 12px;

  .reason {
    cursor: pointer;
    padding: 1.375rem 1.25rem;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: .75rem;
    line-height: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    color: #232121;

    &.is-selected, &:hover {
      color: #C1806E;
      background: #F8F0ED;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }

    &:not(:last-child) {
      margin-bottom: .75rem;
    }

    .custom-reason-input {
      margin-top: 6px;

      textarea {
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: white;
        height: 100%;
        width: 100%;
        padding: .875rem;
        // padding-bottom: 0;
        line-height: 1rem;
      }
    }
  }
}

.schedule-meeting-or-skip-demo {
  margin-top: 2.375rem;
  text-align: center;
  font-family: 'Montserrat';
  font-style: normal;
  line-height: 14px;
  cursor: pointer;

  .schedule-meeting-button {
    background: #232121;
    padding: 1.0625rem;
    width: 100%;
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
    margin-bottom: 1.25rem;
  }

  .try-on-my-own-button {
    font-weight: 600;
    font-size: 12px;
    color: #757373;
  }
}
</style>

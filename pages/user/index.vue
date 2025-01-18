<template>
	<section
		v-if="onboardingFormFilled == undefined || (user && user.isMBUser)"
		class="auth-loader"
	>
		<h3>{{ $t("onboardingFlow.authenticating") }}</h3>
		<div class="loader"></div>
		<div class="loginMessage" v-if="message">
			<h2>{{ $t("onboardingFlow.loginSuccessful") }}</h2>
		</div>
	</section>
	<section
		v-else-if="(onboardingFormFilled == false && user && !user.isMBUser) || !isUserCategoryPicked"
		class="sign-up-section"
	>
		<!-- step -- 1 -->
		<div v-if="showContactNumberStep" class="sign-up-page-wrapper">
			<div class="page-content-wrapper">
				<div class="header">
					<div class="image-wrapper iwfp">
						<img
							src="~assets/images/sign-up-flow/foyr-app-logo-v2.png"
							alt="app-logo"
						/>
					</div>
					<div class="text-content">
						<div class="heading">
							{{ $t("onboardingFlow.enterYourPhoneNumber") }}
						</div>
						<!-- <div class="sub-heading">
							{{ $t("onboardingFlow.freeTrailText") }}
						</div> -->
					</div>
				</div>
				<div class="main">
					<div class="form-wrapper">
						<div class="detail-input-wrapper">
							<div class="contact-input-wrapper" :class="{'error-state': message.error}">
								<BasicDropDown
									:dropDownList="countryList"
									:selected="selectedCountryDetails._id"
									:placeholderText="''"
									:valueKey="'_id'"
									:textKey="'phone'"
									:clickable="true"
									:close-drop-down-on-item-selection="true"
									:inverted="false"
									class="contact-code-dropdown-wrapper"
									@listElementClick="onSelectCountryPhoneCode"
								>
									<template v-slot:prepend>
										<div class="image-wrapper iwfp">
											<img
												:src="
													selectedCountryDetails.flag
												"
												:alt="
													selectedCountryDetails.code
												"
											/>
										</div>
									</template>
									<template v-slot:option="item">
										<div class="dropdown-option-wrapper" :class="{selected: selectedCountryDetails._id == item._id}">
											<div class="image-wrapper iwfp">
												<img
													:src="item.flag"
													:alt="item.code"
												/>
											</div>
											<div class="dropdown-option">
												{{item.phone}}
											</div>
										</div>
									</template>
								</BasicDropDown>
								<!-- id="userNumber" -->
								<input
									type="tel"
									maxlength="15"
									class="phone-number-input"
									v-model="userPhoneNumber"
									placeholder="Phone number"
									autofocus
									@keydown="checkNumber($event)"
								/>
							</div>
							<div
								class="error-message"
								v-if="message.value"
							>
								<div class="error-icon">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M10.0013 5.83366C10.4596 5.83366 10.8346 6.20866 10.8346 6.66699V10.0003C10.8346 10.4587 10.4596 10.8337 10.0013 10.8337C9.54297 10.8337 9.16797 10.4587 9.16797 10.0003V6.66699C9.16797 6.20866 9.54297 5.83366 10.0013 5.83366ZM9.99297 1.66699C5.39297 1.66699 1.66797 5.40033 1.66797 10.0003C1.66797 14.6003 5.39297 18.3337 9.99297 18.3337C14.6013 18.3337 18.3346 14.6003 18.3346 10.0003C18.3346 5.40033 14.6013 1.66699 9.99297 1.66699ZM10.0013 16.667C6.31797 16.667 3.33464 13.6837 3.33464 10.0003C3.33464 6.31699 6.31797 3.33366 10.0013 3.33366C13.6846 3.33366 16.668 6.31699 16.668 10.0003C16.668 13.6837 13.6846 16.667 10.0013 16.667ZM10.8346 13.3337C10.8346 13.7939 10.4615 14.167 10.0013 14.167C9.54106 14.167 9.16797 13.7939 9.16797 13.3337C9.16797 12.8734 9.54106 12.5003 10.0013 12.5003C10.4615 12.5003 10.8346 12.8734 10.8346 13.3337Z" fill="#EF5D68"/>
									</svg>

								</div>
								<div class="error-text">
									{{ message.value }}
								</div>
							</div>
						</div>
						<div
							class="sing-up-flow-primary-button"
							:class="{ disable: userPhoneNumber.length < 6 }"
							@click="handleLetsGoButtonClick"
						>
							{{ isUserIndian ? $t("buttonText.sendOTP"): $t("buttonText.continue") }}
						</div>
						<!-- <div
							class="error-message"
							v-if="message.value"
						>
							<div class="error-text">
								{{ message.value }}
							</div>
						</div> -->
					</div>
					<div class="terms-wrapper" :class="{'terms-error': consentError}">

						
						<div v-if="countryCode && countryCode.name !== 'united kingdom'" class="icon-wrapper check-box-wrapper" @click="onClickConsent('non_UK_user_consent_checkbox')">
							<div class="consent-check-error" v-if="consentError" ></div>
							<svg
								v-else-if="!userData['non_UK_user_consent_checkbox']"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="0.5"
									y="0.5"
									width="23"
									height="23"
									rx="3.5"
									stroke="#DCDCDC"
								/>
							</svg>
							<svg
								v-else
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="0.5"
									y="0.5"
									width="19"
									height="19"
									rx="3.5"
									stroke="#131313"
								/>
								<path
									d="M8.13057 12.7602L6.10641 10.736C5.87891 10.5085 5.51141 10.5085 5.28391 10.736C5.05641 10.9635 5.05641 11.331 5.28391 11.5585L7.72224 13.9968C7.94974 14.2243 8.31724 14.2243 8.54474 13.9968L14.7164 7.82516C14.9439 7.59766 14.9439 7.23016 14.7164 7.00266C14.4889 6.77516 14.1214 6.77516 13.8939 7.00266L8.13057 12.7602Z"
									fill="black"
								/>
							</svg>
						</div>
						<div v-else class="icon-wrapper check-box-wrapper" @click="onClickConsent('consent')">
							<div class="consent-check-error" v-if="consentError" ></div>
							<svg
								v-else-if="!userData['consent']"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="0.5"
									y="0.5"
									width="23"
									height="23"
									rx="3.5"
									stroke="#DCDCDC"
								/>
							</svg>
							<svg
								v-else
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="0.5"
									y="0.5"
									width="19"
									height="19"
									rx="3.5"
									stroke="#131313"
								/>
								<path
									d="M8.13057 12.7602L6.10641 10.736C5.87891 10.5085 5.51141 10.5085 5.28391 10.736C5.05641 10.9635 5.05641 11.331 5.28391 11.5585L7.72224 13.9968C7.94974 14.2243 8.31724 14.2243 8.54474 13.9968L14.7164 7.82516C14.9439 7.59766 14.9439 7.23016 14.7164 7.00266C14.4889 6.77516 14.1214 6.77516 13.8939 7.00266L8.13057 12.7602Z"
									fill="black"
								/>
							</svg>
						</div>
						<div class="terms-text">
							{{ $t("onboardingFlow.textMessagesConsentText") }}
						</div>
					</div>
				</div>
				<div class="sign-up-flow-page-footer">
					<div class="progress-block active"></div>
					<div class="progress-block active"></div>
					<div class="progress-block"></div>
				</div>
			</div>
		</div>
		<!-- step -- 1.1 OTP Verification for indian users -->

		<div
			v-if="
				!showContactNumberStep && isUserIndian && !isUserMobileVerified
			"
			class="sign-up-page-wrapper"
		>
			<div class="page-content-wrapper">
				<div class="header">
					<div class="image-wrapper iwfp">
						<img
							src="~assets/images/sign-up-flow/foyr-app-logo-v2.png"
							alt="app-logo"
						/>
					</div>
					<div class="text-content">
						<div class="heading">
							{{ $t("onboardingFlow.verifyOTP") }}
						</div>
						<!-- <div class="sub-heading">
							{{ $t("onboardingFlow.freeTrailText") }}
						</div> -->
					</div>
				</div>
				<div class="main">
					<div class="form-wrapper">
						<div class="form-header">
							{{ $t("onboardingFlow.pleaseEnterOTPText") }}
							{{ userData["contactNumber"] }}
						</div>
						<div
							class="otp-detail-wrapper"
							:class="{ 'error-state': message.error }"
						>
							<div class="otp-input-wrapper">
								<input
									id="otp_1_v2"
									type="number"
									name="otp-one"
									placeholder="_"
									class="strip-input-default-styles otp-input"
									@input="handleOTPInputEvent"
									@keyup="handleOTPKeyupEvent"
								/>
								<input
									id="otp_2_v2"
									type="number"
									name="otp-two"
									placeholder="_"
									class="strip-input-default-styles otp-input"
									@input="handleOTPInputEvent"
									@keyup="handleOTPKeyupEvent"
								/>
								<input
									id="otp_3_v2"
									type="number"
									name="otp-three"
									placeholder="_"
									class="strip-input-default-styles otp-input"
									@input="handleOTPInputEvent"
									@keyup="handleOTPKeyupEvent"
								/>
								<input
									id="otp_4_v2"
									type="number"
									name="otp-four"
									placeholder="_"
									class="strip-input-default-styles otp-input"
									@input="handleOTPInputEvent"
									@keyup="handleOTPKeyupEvent"
								/>
							</div>
							<div v-if="message.value" class="error-message">
								<div class="icon-wrapper error-icon">
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M10.0013 5.83366C10.4596 5.83366 10.8346 6.20866 10.8346 6.66699V10.0003C10.8346 10.4587 10.4596 10.8337 10.0013 10.8337C9.54297 10.8337 9.16797 10.4587 9.16797 10.0003V6.66699C9.16797 6.20866 9.54297 5.83366 10.0013 5.83366ZM9.99297 1.66699C5.39297 1.66699 1.66797 5.40033 1.66797 10.0003C1.66797 14.6003 5.39297 18.3337 9.99297 18.3337C14.6013 18.3337 18.3346 14.6003 18.3346 10.0003C18.3346 5.40033 14.6013 1.66699 9.99297 1.66699ZM10.0013 16.667C6.31797 16.667 3.33464 13.6837 3.33464 10.0003C3.33464 6.31699 6.31797 3.33366 10.0013 3.33366C13.6846 3.33366 16.668 6.31699 16.668 10.0003C16.668 13.6837 13.6846 16.667 10.0013 16.667ZM10.8346 13.3337C10.8346 13.7939 10.4615 14.167 10.0013 14.167C9.54106 14.167 9.16797 13.7939 9.16797 13.3337C9.16797 12.8734 9.54106 12.5003 10.0013 12.5003C10.4615 12.5003 10.8346 12.8734 10.8346 13.3337Z"
											fill="#EF5D68"
										/>
									</svg>
								</div>
								<div class="error-text">
									{{ message.value }}
								</div>
							</div>
						</div>

						<div
							class="sing-up-flow-primary-button"
							@click="handleVerifiOTPClick"
						>
							{{ $t("buttonText.verify") }}
						</div>
					</div>
					<div class="resend-otp-wrapper">
						<div
							class="resend-otp-button"
							@click="handleResendOTPClick"
						>
							{{ $t(resendOTPText) }}
						</div>
						<div
							class="resend-otp-button-tag"
							@click="onClickEditRegisteredPhoneNumber"
						>
							{{ $t("buttonText.EditRegisteredPhoneNumber") }}
						</div>
					</div>
				</div>
				<div class="sign-up-flow-page-footer">
					<div class="progress-block active"></div>
					<div class="progress-block active"></div>
					<div class="progress-block"></div>
				</div>
			</div>
		</div>

		<!-- step -- 2 -->
		<div v-if="!showContactNumberStep && false" class="sign-up-page-wrapper how-do-you-know-about-us-wrapper">
			<div class="page-content-wrapper">
				<div class="header">
					<div class="image-wrapper iwfp">
						<img
							src="~assets/images/sign-up-flow/foyr-app-logo-v2.png"
							alt="app-logo"
						/>
					</div>
					<div class="text-content">
						<div class="heading">
							{{ $t("onboardingFlow.howDidYouHearAboutUs") }}
						</div>
					</div>
				</div>
				<div class="main">
					<div class="form-wrapper">
						<div class="options-list-wrapper">
							<div v-for="option in howDidYouHearAboutUsOptions" class="option-wrapper" :class="{'active-option': selectedHowDidYouHearAboutUs._id === option._id}" @click="onSelectHowDidYouHearAboutUsOption(option)">
								<div class="option-detail-wrapper">
									<div class="icon-wrapper radio-icon-wrapper">
										<svg v-if="selectedHowDidYouHearAboutUs._id === option._id" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
											<circle cx="11" cy="11" r="7" fill="white" stroke="#000000"/>
											<g filter="url(#filter0_dddddd_997_13554)">
												<circle cx="11" cy="11" r="3.25" fill="#000000"/>
											</g>
										</svg>
										<svg v-else class="unselect-radio-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
											<circle cx="11" cy="11" r="7" fill="white" stroke="#bebebe"/>
										</svg>
										
									</div>
									<div class="option-name">{{ $t(option.name) }}</div>
								</div>
								<div v-if="option.subOptions && selectedHowDidYouHearAboutUs._id === option._id" class="option-content-wrapper">
									<div class="sub-options-wrapper" :class="{'option-error-state option-error-state-border-6': selectedHowDidYouHearAboutUsSocialMedia.error}">
										<div v-for="subOption in option.subOptions" class="sub-option" :class="{'active-sub-option': selectedHowDidYouHearAboutUsSocialMedia._id === subOption._id }" @click="onSelectHowDidYouHearAboutUsSocialMedia(subOption)">
											<div v-if="subOption.icon" class="image-wrapper iwfp">
												<img :src="subOption.icon" :class="{'big-image': subOption.bigImage}" alt="" />
											</div>
											<div class="sub-option-name">
	
												{{ subOption.name }}
											</div>
										</div>
									</div>
									<div v-if="selectedHowDidYouHearAboutUsSocialMedia.error" class="error-message error-message-sm ">
									<div class="icon-wrapper">
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8.00065 4.66732C8.36732 4.66732 8.66732 4.96732 8.66732 5.33398V8.00065C8.66732 8.36732 8.36732 8.66732 8.00065 8.66732C7.63398 8.66732 7.33398 8.36732 7.33398 8.00065V5.33398C7.33398 4.96732 7.63398 4.66732 8.00065 4.66732ZM7.99398 1.33398C4.31398 1.33398 1.33398 4.32065 1.33398 8.00065C1.33398 11.6807 4.31398 14.6673 7.99398 14.6673C11.6807 14.6673 14.6673 11.6807 14.6673 8.00065C14.6673 4.32065 11.6807 1.33398 7.99398 1.33398ZM8.00065 13.334C5.05398 13.334 2.66732 10.9473 2.66732 8.00065C2.66732 5.05398 5.05398 2.66732 8.00065 2.66732C10.9473 2.66732 13.334 5.05398 13.334 8.00065C13.334 10.9473 10.9473 13.334 8.00065 13.334ZM8.66732 10.6673C8.66732 11.0355 8.36884 11.334 8.00065 11.334C7.63246 11.334 7.33398 11.0355 7.33398 10.6673C7.33398 10.2991 7.63246 10.0007 8.00065 10.0007C8.36884 10.0007 8.66732 10.2991 8.66732 10.6673Z" fill="#EF5D68"/>
										</svg>
									</div>
									<div class="error-text">

										{{ selectedHowDidYouHearAboutUsSocialMedia.error }}
									</div>
									</div>
								</div>
								<div v-if="option.type && option.type === 'input' && selectedHowDidYouHearAboutUs._id === option._id" class="text-input-wrapper">
									<textarea v-model="option.inputValue" placeholder="Please specify where*" class="text-input" :class="{'option-error-state option-error-state-border-6': howDidYouHearAboutUsOtherUserInput}"></textarea>
									<div v-show="howDidYouHearAboutUsOtherUserInput" class="error-message error-message-sm ">
									<div class="icon-wrapper">
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8.00065 4.66732C8.36732 4.66732 8.66732 4.96732 8.66732 5.33398V8.00065C8.66732 8.36732 8.36732 8.66732 8.00065 8.66732C7.63398 8.66732 7.33398 8.36732 7.33398 8.00065V5.33398C7.33398 4.96732 7.63398 4.66732 8.00065 4.66732ZM7.99398 1.33398C4.31398 1.33398 1.33398 4.32065 1.33398 8.00065C1.33398 11.6807 4.31398 14.6673 7.99398 14.6673C11.6807 14.6673 14.6673 11.6807 14.6673 8.00065C14.6673 4.32065 11.6807 1.33398 7.99398 1.33398ZM8.00065 13.334C5.05398 13.334 2.66732 10.9473 2.66732 8.00065C2.66732 5.05398 5.05398 2.66732 8.00065 2.66732C10.9473 2.66732 13.334 5.05398 13.334 8.00065C13.334 10.9473 10.9473 13.334 8.00065 13.334ZM8.66732 10.6673C8.66732 11.0355 8.36884 11.334 8.00065 11.334C7.63246 11.334 7.33398 11.0355 7.33398 10.6673C7.33398 10.2991 7.63246 10.0007 8.00065 10.0007C8.36884 10.0007 8.66732 10.2991 8.66732 10.6673Z" fill="#EF5D68"/>
										</svg>
									</div>
									<div class="error-text">
										{{howDidYouHearAboutUsOtherUserInput}}
									</div>
									</div>
								</div>
								
							</div>
							<div v-if="howDidYouHearAboutUsError" class="error-message error-message-centered">
									<div class="icon-wrapper">
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8.00065 4.66732C8.36732 4.66732 8.66732 4.96732 8.66732 5.33398V8.00065C8.66732 8.36732 8.36732 8.66732 8.00065 8.66732C7.63398 8.66732 7.33398 8.36732 7.33398 8.00065V5.33398C7.33398 4.96732 7.63398 4.66732 8.00065 4.66732ZM7.99398 1.33398C4.31398 1.33398 1.33398 4.32065 1.33398 8.00065C1.33398 11.6807 4.31398 14.6673 7.99398 14.6673C11.6807 14.6673 14.6673 11.6807 14.6673 8.00065C14.6673 4.32065 11.6807 1.33398 7.99398 1.33398ZM8.00065 13.334C5.05398 13.334 2.66732 10.9473 2.66732 8.00065C2.66732 5.05398 5.05398 2.66732 8.00065 2.66732C10.9473 2.66732 13.334 5.05398 13.334 8.00065C13.334 10.9473 10.9473 13.334 8.00065 13.334ZM8.66732 10.6673C8.66732 11.0355 8.36884 11.334 8.00065 11.334C7.63246 11.334 7.33398 11.0355 7.33398 10.6673C7.33398 10.2991 7.63246 10.0007 8.00065 10.0007C8.36884 10.0007 8.66732 10.2991 8.66732 10.6673Z" fill="#EF5D68"/>
										</svg>
									</div>
									<div class="error-text">
										{{ howDidYouHearAboutUsError }}
									</div>
								</div>
						</div>
						<div
							class="sing-up-flow-primary-button"
							@click="handleNextButtonClick"
						>
							{{ $t("buttonText.next") }}
						</div>
					</div>
					
				</div>
				<div class="sign-up-flow-page-footer">
					<div class="progress-block active"></div>
					<div class="progress-block active"></div>
					<div class="progress-block active"></div>
				</div>
			</div>
		</div>

		<!-- step -- 3 -->
		 <SelectCategoryPopup v-if="!showContactNumberStep && ( !isUserIndian || isUserMobileVerified)" :isMobile="$ua.deviceType() !== 'pc'" />

		<!-- step 4 for Indian Home Owners -->
		<div id="remIndicator"></div>
	</section>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import BasicDropDown from "../../components/shared/basicDropDownV2.vue";
import countryDetails from "../../static/json/countryDetails.json";
import CommonUtilities from "../../mixins/commonUtilitiesMixin";
import {setClassToHtml} from "../../helpers/utilFunctions"
import SelectCategoryPopup from '../../components/selectCategoryPopup.vue';
export default {
	middleware: ["initAuth", "authReq"],
	mixins: [
    CommonUtilities
  ],
	components: {
		BasicDropDown,
		SelectCategoryPopup
	},
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
				consent: true,
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
					],
				},
				"Kitchen & Bath Designer": {
					icon: require("~/assets/images/userCategories/kitchenAndBathDesigner.svg"),
					reasons: [
						"An easy-to-use modular design tool",
						"Evaluate Neo as an alternative to my existing software",
						"Evaluate Neo’s ability to handle customizations",
						"Evaluate Neo for its extensive product catalog",
						"Evaluate Neo for its render speed and quality",
					],
				},
				"Home Stager": {
					icon: require("~/assets/images/userCategories/homeStager.svg"),
					reasons: [
						"An easy-to-use tool to offer 3D designs to my customers",
						"A tool to scale up my existing staging business",
						"Evaluate Neo to create floor plans quickly",
						"Evaluate Neo for its extensive product catalog",
						"Evaluate Neo for its render speed and quality",
					],
				},
				Architect: {
					icon: require("~/assets/images/userCategories/architect.svg"),
					reasons: [
						"An easy-to-use tool to offer 3D designs to my customers",
						"Evaluate Neo’s capability in creating production drawings ",
						"Looking to scale up my business by offering 3D designs to clients",
						"Evaluate Neo for its speed & quality of rendering",
						"Looking for premade designs to add to my architectural drawing",
					],
				},
				Contractor: {
					icon: require("~/assets/images/userCategories/contractor.svg"),
					reasons: [
						"An easy-to-use tool to offer 3D designs to my customers",
						"Evaluate Neo’s capability in creating production drawings ",
						"Looking to scale up my business by offering 3D designs to clients",
						"Evaluate Neo for its speed & quality of rendering",
						"Looking for premade designs to add to my architectural drawing",
					],
				},
				Student: {
					icon: require("~/assets/images/userCategories/student.svg"),
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
					],
				},
				Other: {
					icon: require("~/assets/images/userCategories/others.svg"),
				},
			},
			isOtherAnswerSelected: false,
			enteredOTP: "",
			forceShowContactScreen: false,
			isResentOTPEnabled: false,
			countryList: countryDetails,
			selectedCountryDetails: {},
			userPhoneNumber: "",
			howDidYouHearAboutUsOptions: [
				{_id: "google_Search", name: "onboardingFlow.googleSearch"},
				{
					_id: "social_media", 
					name:  "onboardingFlow.socialMedia", 
					subOptions: [
						{
							_id: "Youtube",
							icon: require("assets/images/sign-up-flow/youtube.png"),
							name: "Youtube"
						},
						{
							_id: "Instagram",
							icon: require("assets/images/sign-up-flow/instagram.png"),
							name: "Instagram"
						},
						{
							_id: "Pinterest",
							icon: require("assets/images/sign-up-flow/pinterest.png"),
							name: "Pinterest"
						},
						{
							_id: "Reddit",
							icon: require("assets/images/sign-up-flow/reddit.png"),
							name: "Reddit",
							bigImage: true
						}
					]
				},
				{_id: "blog_posts", name: "onboardingFlow.blogPosts"},
				{_id: "family_friends", name:  "onboardingFlow.familyAndFriends"},
				{_id: "others", name: "onboardingFlow.others", type: 'input', inputValue: '' },
			],
			selectedHowDidYouHearAboutUs : {error: ""},
			selectedHowDidYouHearAboutUsSocialMedia: {error: ""},
			howDidYouHearAboutUsOtherUserInput: "",
			showSubOptionError: true,
			howDidYouHearAboutUsError: "",
			errorMessages: {
				error: false,
				message: ""
			},
			resendOTPText: "messages.otpSent",
			consentError: false
		};
	},
	mounted() {
		setClassToHtml(true, "temporary-fix-for-mobile-response")
		setTimeout(() => {
			let chat = document.getElementById("fc_frame");
			if (chat) {
				chat.style.display = "none";
			}
		}, 2000);
		this.getCountryCode().then((data) => {
			// console.log("dail code is here", this.countryCode);
			const countryDetail = this.countryList.find(
				(e) =>
					e._id.toLowerCase() ===
					`${
						this.countryCode.code + this.countryCode.dial_code
					}`.toLowerCase()
			);
			this.selectedCountryDetails = countryDetail;
			this.userData["contactNumber"] = this.countryCode.dial_code;
		});
		this.isLoading = false;
		this.fetchOnboarding()
			.then((res) => {
				// res.fields.forEach((element) => {
				//   this.userData[element.keyName] = "";
				// });
				this.fetchUserDetails().then((data) => {
					if (data) {
						if (data.contactNumber) {
							this.userData["contactNumber"] = data.contactNumber;
							if (
								data.contactNumber.startsWith(
									this.selectedCountryDetails.phone
								)
							) {
								this.userPhoneNumber = data.contactNumber.slice(
									this.selectedCountryDetails.phone.length
								);
							}
						}

						if (
							data.accountExtraInfo &&
							data.accountExtraInfo.hasOwnProperty("ho_pincode")
						) {
							this.userData["ho_pincode"] =
								data.accountExtraInfo.ho_pincode || "";
						}
						if (
							data.accountExtraInfo &&
							data.accountExtraInfo.hasOwnProperty("ho_help")
						) {
							this.userData["ho_help"] =
								data.accountExtraInfo.ho_help || "";
						}
						if (
							data.accountExtraInfo &&
							data.accountExtraInfo.hasOwnProperty("ho_reason")
						) {
							this.userData["ho_reason"] =
								data.accountExtraInfo.ho_reason || "";
						}

						if (
							data.accountExtraInfo &&
							data.accountExtraInfo.userCategory &&
							this.onBoardingData &&
							this.onBoardingData.categories
						) {
							const category =
								this.onBoardingData.categories.find(
									(e) =>
										e.displayName ==
										data.accountExtraInfo.userCategory
								);
							if (category) {
								this.selectedCategory = category;
							}
						}
						if (!this.isUserMobileVerified && this.isUserIndian) {
							this.sendOTPandResetOTPStepVariables();
						}
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});

		if (window.analytics) {
			window.analytics.track(
				"onboarding",
				{
					title: "Onboarding",
					subtitle: "Onboarding page",
				},
				{
					integrations: {
						Amplitude: { session_id: new Date().getTime() },
					},
				},
				{ timestamp: new Date().getTime() }
			);
		}

		this.handleOnboardingForMBUsers(this.user);

		if (this.onboardingFormFilled && this.isUserCategoryPicked) {
			if (this.$ua.deviceType() == "pc")
				this.$router.push(this.localePath("/dashboard"));
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
		},
	},
	computed: {
		...mapGetters("User", ["isUserSpanish", "isUserJapanese", "isUserCategoryPicked"]),
		// a computed getter
		...mapState({
			onBoardingData: (state) => state.User.onBoarding,
			onboardingFormFilled: (state) => state.Auth.onboardingFormFilled,
			user: (state) => state.User.user,
			countryCode: (state) => state.User.countryCode,
		}),
		showContactNumberStep() {
			return (
				!this.user ||
				(this.user && !this.user["contactNumber"]) ||
				this.forceShowContactScreen
			);
		},
		showFTReasonStepToSelectedCategory() {
			return (
				!this.isUserJapanese &&
				!this.isUserSpanish &&
				this.selectedCategory &&
				this.selectedCategory.keyName &&
				(this.selectedCategory.keyName === "Interior Designer" ||
					this.selectedCategory.keyName ===
						"Kitchen & Bath Designer" ||
					this.selectedCategory.keyName === "Home Stager" ||
					this.selectedCategory.keyName === "Architect" ||
					this.selectedCategory.keyName === "Contractor")
			);
		},
		isUserIndian() {
			return (
				this.user &&
				this.user.ipInfo &&
				this.user.ipInfo.country &&
				this.user.ipInfo.country === "IN"
			);
		},
		isUserMobileVerified() {
			return this.user && this.user.isMobileVerified;
		},
		isSelectedCategoryHomeOwner() {
			return (
				this.selectedCategory &&
				this.selectedCategory.keyName &&
				this.selectedCategory.keyName === "Home Owner"
			);
		},
		isHomeOwnerAdditionalInfoNotEntered() {
			return (
				this.user &&
				(!this.user.ho_pincode ||
					!this.user.ho_help ||
					!this.user.ho_reason ||
					(this.user.ho_pincode && this.user.ho_pincode.length < 6))
			);
		},
		isHomeOwnerAdditionalInfoStepFinishButtonDisabled() {
			return (
				!this.userData.ho_pincode ||
				!this.userData.ho_help ||
				!this.userData.ho_reason ||
				(this.userData.ho_pincode &&
					this.userData.ho_pincode.length < 6)
			);
		},
		showCategorySelectionStep() {
			if (this.isUserIndian) {
				return (
					!this.showContactNumberStep &&
					!this.selectedCategory &&
					this.isUserMobileVerified
				);
			}

			return !this.showContactNumberStep && !this.selectedCategory;
		},
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
			verifyOTP: "User/verifyOTP",
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
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}

			if (this.isUserJapanese || this.isUserSpanish) {
				this.submit({
					// onboardingFormFilled: "true",
					// cb: this.onboardingComplete,
				});
				if (window.analytics) {
					window.analytics.track(
						"started_ft_dashboard",
						{},
						{
							integrations: {
								Amplitude: { session_id: new Date().getTime() },
							},
						},
						{ timestamp: new Date().getTime() }
					);
				}
			} else if (this.showFTReasonStepToSelectedCategory) {
				this.submit();
			} else if (this.isUserIndian && this.isSelectedCategoryHomeOwner) {
				this.submit();
			} else {
				this.submit({
					onboardingFormFilled: "true",
					cb: this.onboardingComplete,
				});
				if (window.analytics) {
					window.analytics.track(
						"started_ft_dashboard",
						{},
						{
							integrations: {
								Amplitude: { session_id: new Date().getTime() },
							},
						},
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
			else if (value == "Singapore")
				this.userData["contactNumber"] = "+65";
			else if (value == "UK") this.userData["contactNumber"] = "+44";
			else if (value == "Australia")
				this.userData["contactNumber"] = "+61";
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
					return (
						element.label
							.toLowerCase()
							.indexOf(value.toLowerCase()) > -1
					);
				});
			else {
				return item.values;
			}
		},
		handleVerifiOTPClick() {
			const mobile = this.getMobileNumber(this.userData.contactNumber);
			this.sendEventToTrack("Signup 2.0 - phone number otp")
			this.verifyOTP({ mobile, otp: this.enteredOTP })
				.then(() => {
					// this.setGlobalMessages("SUCCESS", false, false);
					// this.submit({ onboardingFormFilled:"true", cb: this.onboardingComplete})
					this.submit()
				})
				.catch((err) => {
					this.setGlobalMessages(
						this.$t("messages.invalidOtp"),
						true,
						false
					);
				});
		},
		handleResendOTPClick() {
			this.resetMessage()
			// console.log("resending otp")
			if (this.isResentOTPEnabled) {
				this.sendOTPandResetOTPStepVariables(true);
			}
		},
		resetMessage() {
			this.message.value ="";
			this.message.error = false;
			this.message.global = false; 
		},
		handleLetsGoButtonClick() {
			this.resetMessage();
			this.userData.contactNumber =
				this.selectedCountryDetails.phone + this.userPhoneNumber;
			let validate = true;
			let consentValidate = true;
			var regexPhone = /^[0-9\s)(+-]*$/;

			if (!this.userData["non_UK_user_consent_checkbox"]) {
				consentValidate = false;
				// this.message.value = this.$t(
				// 	"onboardingFlow.pleaseTickTheBoxToProceed"
				// );
			}

			if (window.analytics) {
				window.analytics.track(
					"signupstep3_clicked",
					{
						title: "user inputs the phone number",
						subtitle: "input phone number screen",
					},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
			if (this.userData["contactNumber"].length < 6 || this.userPhoneNumber.length < 3) {
					validate = false;
					this.message.error = true;
					this.message.value = this.userPhoneNumber.length === 0 
							? `Please enter your phone number` 
							: `Invalid phone number`;
			}

			if (!this.countryCode.dial_code) {
				validate = false;
				this.message.value = `Please provide country code`;
			}
			if (
				!this.userData["consent"] &&
				this.countryCode.name == "united kingdom"
			) {
				// validate = false;
				consentValidate = false;
				// this.message.error = false
				// this.message.value = `Please tick the box to proceed `;
			}
			if (!validate) {
				this.message.error = true;
				this.message.global = true;
				// setTimeout(() => {
				// 	this.message.global = false;
				// 	this.message.value = "";
				// 	this.message.error = false;
				// }, 5000);
			} else if(!consentValidate) {
				this.consentError = true
			}
			else {
				const payload = {}
				// if(!this.isUserIndian) {
				//  	payload.onboardingFormFilled = "true"
				//  	payload.cb = this.onboardingComplete
				// }
				this.sendEventToTrack("Sign up 2.0 - phone number")
				this.submit(payload)
					.then((res) => {
						this.forceShowContactScreen = false;
						if(this.isUserIndian) {
							this.sendOTPandResetOTPStepVariables();
						}
					})
					.catch((err) => {
						if (err.status === 500) {
							this.setGlobalMessages(
								this.$t("messages.contactNumberExists"),
								true,
								false
							);
						}
					});
			}
		},
		sendOTPandResetOTPStepVariables(resentOTP = false) {
			this.isResentOTPEnabled = false;

			if (
				this.userData.hasOwnProperty("contactNumber") &&
				this.userData.contactNumber.length >= 10
			) {
				const mobile = this.getMobileNumber(
					this.userData.contactNumber
				);
				if (resentOTP) {
					// resent otp
					this.resendOTP({ mobile })
						.then(() => {
							// this.setGlobalMessages(
							// 	this.$t("messages.otpSent"),
							// 	false,
							// 	false
							// );
							const element = document.getElementById("otp_1_v2");
							if(element) {
								element.focus();
							}
							this.resendOTPText = "messages.otpSent"
						})
						.catch((err) => {
							this.setGlobalMessages(err.message, true, false);
						});
				} else {
					// send otp
					this.sendOTP({ mobile })
						.then(() => {
							this.resendOTPText = "messages.otpSent"
							const element = document.getElementById("otp_1_v2");
							if(element) {
								element.focus();
							}
							// this.setGlobalMessages(
							// 	this.$t("messages.otpSent"),
							// 	false,
							// 	false
							// );
						})
						.catch((err) => {
							this.setGlobalMessages(err.message, true, false);
						});
				}
			}
			// this.isResentOTPEnabled = true;
			setTimeout(() => {
				this.resendOTPText = "buttonText.resendOTP"
				this.isResentOTPEnabled = true;
			}, 1000 * 5);
		},
		submit({
			onboardingFormFilled = false,
			cb = null,
			openDemoBookingModal = false,
		} = {}) {

			// console.log("this guy is called", this.userData);
			// return
			if (onboardingFormFilled) {
				this.userData.onboardingFormFilled = onboardingFormFilled;
			}
			if (this.selectedCategory && this.selectedCategory.displayName) {
				this.userData.userCategory = this.selectedCategory.displayName;
			}

			this.userData.device = this.$ua.deviceType();
			this.userData.browser = this.$ua.browser();
			// this.userData.consent = this.isAllowToCall;
			this.userData.location = this.countryCode.name;
			this.isLoading = true;
			if (
				this.$store.state.User &&
				this.$store.state.User.user &&
				this.$store.state.User.user.ipInfo &&
				this.$store.state.User.user.ipInfo.country
			) {
				this.userData["country"] =
					this.$store.state.User.user.ipInfo.country;
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
					this.fetchUser({ skipOnboardingCheck: true }).then(
						(res) => {
							this.isLoading = false;
							if (cb) {
								cb(openDemoBookingModal);
							}
						}
					);
				})
				.catch((err) => {
					throw err.response;
				});
		},
		onboardingComplete(openDemoBookingModal) {
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
			window.parent.postMessage("login-success", "*");
			if (window.$nuxt.$store.$ua.deviceType() == "pc") {
				this.$router.push(this.localePath("/dashboard"));
				this.setGetFreeDemoShow_Desk(openDemoBookingModal);
			} else {
				this.$router.push(this.localePath("/dashboard_mobile/home"));
				this.setGetFreeDemoShow_Desk(openDemoBookingModal);
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
			this.userData["FTReason"] = reason;
			if (window.analytics) {
				window.analytics.track(
					"signupstep5_clicked",
					{
						title: "user selects ft reason",
						subtitle: "select persona screen",
					},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
				window.analytics.track(
					"started_ft_dashboard",
					{},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
			this.submit({
				onboardingFormFilled: "true",
				cb: this.onboardingComplete,
			});
		},
		handleHomeOwnderStepFinishButtonClick() {
			if (window.analytics) {
				window.analytics.track(
					"started_ft_dashboard",
					{},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
			this.submit({
				onboardingFormFilled: "true",
				cb: this.onboardingComplete,
			});
		},
		handleOtherClick() {
			this.isOtherAnswerSelected = true;
		},
		handleScheduleAMeetingClick() {
			if (window.analytics) {
				window.analytics.track(
					"signupstep6_clicked",
					{},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
				window.analytics.track(
					"signupstep6_clicked_demo",
					{},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
				window.analytics.track(
					"started_ft_dashboard",
					{},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
			this.submit({
				onboardingFormFilled: "true",
				cb: this.onboardingComplete,
				openDemoBookingModal: true,
			});
		},
		handleTryOnMyOwnClick() {
			if (window.analytics) {
				window.analytics.track(
					"signupstep6_clicked",
					{},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
				window.analytics.track(
					"signupstep6_clicked_own",
					{},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
				window.analytics.track(
					"started_ft_dashboard",
					{},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
			this.submit({
				onboardingFormFilled: "true",
				cb: this.onboardingComplete,
			});
		},
		handleOnboardingForMBUsers(user) {
			if (user && user.isMBUser && !this.onboardingFormFilled) {
				this.submit({
					onboardingFormFilled: "true",
					cb: this.onboardingComplete,
				});
				this.updateGoalStatus({ onboardingGoalFilled: "true" }).then(
					(res) => {}
				);
				if (window.analytics) {
					window.analytics.track(
						"started_ft_dashboard",
						{},
						{
							integrations: {
								Amplitude: { session_id: new Date().getTime() },
							},
						},
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
					let newVal = (val + "").split("")[0];
					target.value = newVal;
				}
				const next = target.nextElementSibling;
				if (next) {
					next.focus();
				}
				this.computeOTPString();
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
				this.computeOTPString();
				return;
			}
		},
		computeOTPString() {
			this.enteredOTP = "";
			document
				.querySelector(".otp-input-wrapper")
				.childNodes.forEach((e) => {
					if (e.value) {
						this.enteredOTP += e.value;
					}
				});
		},
		getMobileNumber(input) {
			const number = input.replace(/\+91|\s/g, "");
			return number;
		},
		setGlobalMessages(message = "", error = false, global = false) {
			this.message.error = error;
			this.message.global = global;
			this.message.value = message;
			// setTimeout(() => {
			// 	this.message.global = false;
			// 	this.message.value = "";
			// 	this.message.error = false;
			// }, 5000);
		},
		onSelectCountryPhoneCode(val) {
			// console.log("onSelectCountryPhoneCode", val);
			this.selectedCountryDetails = val;
		},
		onClickConsent(consent) {
			this.consentError = false;
			this.userData[consent] = !this.userData[consent];
			// this.userData= !this.userData.non_UK_user_consent_checkbox
		},
		clearHowDidYouHearAboutUsErrors() {
			if(this.selectedHowDidYouHearAboutUsSocialMedia && this.selectedHowDidYouHearAboutUsSocialMedia.error) {
				this.selectedHowDidYouHearAboutUsSocialMedia.error = ""
			} 
			if (this.selectedHowDidYouHearAboutUs && this.howDidYouHearAboutUsOtherUserInput) {
				this.howDidYouHearAboutUsOtherUserInput = ""
			}

			this.howDidYouHearAboutUsError = ""
		},
		handleNextButtonClick() {

			this.clearHowDidYouHearAboutUsErrors()

			switch ( this.selectedHowDidYouHearAboutUs._id ) {

				case "google_Search":
					this.userData.howDidYouHearAboutUs = this.selectedHowDidYouHearAboutUs._id 

					break;
				case "social_media":
					if(this.selectedHowDidYouHearAboutUsSocialMedia._id) {
						this.userData.howDidYouHearAboutUs = this.selectedHowDidYouHearAboutUs._id + "/" + this.selectedHowDidYouHearAboutUsSocialMedia._id
						this.selectedHowDidYouHearAboutUsSocialMedia.error = ""
					} else {
						this.selectedHowDidYouHearAboutUsSocialMedia.error = this.$t("onboardingFlow.pleaseSelectOnPlatform")
						return;
					}

					break;
				case "blog_posts":
					this.userData.howDidYouHearAboutUs = this.selectedHowDidYouHearAboutUs._id 

					break;
				case "family_friends":
					this.userData.howDidYouHearAboutUs = this.selectedHowDidYouHearAboutUs._id 

					break;
				case "others":
				if(this.selectedHowDidYouHearAboutUs.inputValue) {
						this.userData.howDidYouHearAboutUs = this.selectedHowDidYouHearAboutUs.inputValue
						this.howDidYouHearAboutUsOtherUserInput = ""
					} else {
						this.howDidYouHearAboutUsOtherUserInput = this.$t("onboardingFlow.pleaseEnterYourLocation")
						return;
					}

					break;
				default :
					this.howDidYouHearAboutUsError = this.$t("onboardingFlow.pleaseSelectOneOptions")
					return
				}

				this.sendEventToTrack("Signup 2.0 - Social")
				// this.submit({ onboardingFormFilled:"true", cb: this.onboardingComplete });
				this.submit({});
							
			
		},
		onSelectHowDidYouHearAboutUsOption(option) {
			this.selectedHowDidYouHearAboutUs = option
			this.clearHowDidYouHearAboutUsErrors()
		},
		onSelectHowDidYouHearAboutUsSocialMedia(option) {
			this.selectedHowDidYouHearAboutUsSocialMedia = option;
			
		},
		onClickEditRegisteredPhoneNumber() {
			this.resetMessage()
			this.forceShowContactScreen = true
		},
	},
	beforeDestroy() {
		setClassToHtml(false, "temporary-fix-for-mobile-response")
	}
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
.sign-up-section {
	display: flex;
	width: 100%;
	height: 100vh;
	.sign-up-page-wrapper {
		display: flex;
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		background: url('../../assets/images/newsignup/sign-up-flow-main-bg.png');
		background-size: cover;
		.page-content-wrapper {
			display: inline-flex;
			padding: 2rem * 1.22;
			flex-direction: column;
			align-items: center;
			gap: 2rem * 1.22;
			border-radius: 8px;
			background: $background-white;
			box-shadow: 0px 0px 48px 0px rgba(0, 0, 0, 0.08);
			width: 27.75rem * 1.22;
			.header {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1.5rem * 1.22;
				align-self: stretch;
				.image-wrapper {
					width: 7.5625rem * 1.22;
					height: 2.5rem * 1.22;
				}
				.text-content {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: .5rem * 1.22;
					.heading {
						color: $color-dark-gray-7;
						text-align: center;
						font-family: $secondary-font;
						font-size: 1.5rem * 1.22;
						font-style: normal;
						font-weight: 700;
						line-height: 2.25rem * 1.22; /* 120% */
					}
					.sub-heading {
						color: $color-dark-gray-7;
						font-family: $secondary-font;
						text-align: center;
						font-size: .875rem * 1.22;
						font-style: normal;
						font-weight: 500;
						line-height: 1.25rem * 1.22; /* 142.857% */
					}
				}
			}
			.main {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				width: 100%;
				height: 100%;
				gap: 1.5rem * 1.22;
				.form-wrapper {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					gap: 1rem * 1.22;
					width: 100%;
					height: 100%;
					.form-header {
						display: flex;
						width: 100%;
						text-align: center;
						justify-content: center;
						color: $color-dark-gray-7;
						font-family: $secondary-font;
						font-size: 1rem * 1.22;
						font-style: normal;
						font-weight: 500;
						line-height: 1.375rem * 1.22; /* 137.5% */
					}
					.detail-input-wrapper {
						display: flex;
						width: 100%;
						flex-direction: column;
						align-items: flex-start;
						gap: 0.625rem * 1.22;
						// .error-message {
						// 	display: none;
						// }
						.contact-input-wrapper {
							display: grid;
							// flex-direction: column;
							width: 100%;
							height: 100%;
							grid-template-columns: max-content 1fr;
							border-radius: 6px;
							border: 1px solid $border-5;
							padding: .625rem * 1.22 1rem * 1.22;
							gap: 0.625rem * 1.22;
							.contact-code-dropdown-wrapper {
								.image-wrapper {
									display: flex;
									justify-content: center;
									align-items: center;
									width: 1rem * 1.22;
									height: 0.625rem * 1.22;
									flex-shrink: 0;
									img {
										border-radius: 0.125rem * 1.22;
									}
								}
							}
							&.error-state {
								border-radius: 6px;
								border: 1px solid $border-26;
								box-shadow: 0px 0px 4px 0px $border-26;
							}

							.phone-number-input {
								background: transparent;
								border: none;
								outline: none;
								padding: 0px;
								margin: 0px;

								color: $color-dark-gray-7;
								font-family: $secondary-font !important;
								font-size: 1rem * 1.22;
								font-style: normal;
								font-weight: 500;
								line-height: 1.25rem * 1.22; /* 125% */
							}
							&:hover {
								border-radius: 6px;
								border: 1px solid $border-27;
							}
							&:focus-within {
								border: 1px solid $border-27;
							}
						}
					}
					.otp-detail-wrapper {
						display: flex;
						width: 100%;
						flex-direction: column;
						align-items: center;
						gap: .625rem * 1.22;
						.otp-input-wrapper {
							align-items: center;
							width: 100%;
							display: grid;
							grid-template-columns: repeat(4, max-content);
							gap: 0.75rem * 1.22;
							justify-content: center;
							justify-items: center;
							input {
								padding: 1.0625rem * 1.22 0.6875rem * 1.22;
								width: 100%;
								text-align: center;
								font-size: 1rem * 1.22;
								font-weight: 600;
								background-color: transparent;
							}

							input::-webkit-outer-spin-button,
							input::-webkit-inner-spin-button {
								-webkit-appearance: none;
							}

							input[type="number"] {
								-moz-appearance: textfield;
							}
							.otp-input {
								border-radius: 6px;
								border: 1px solid $border-5;
								background: transparent;
								padding: .625rem * 1.22 1rem * 1.22;
								margin: 0px;
								height: 3rem * 1.22;
								width: 3rem * 1.22;
								color: $color-dark-gray-7;
								&:focus-within {
									border: 1px solid $border-27;
								}
								&:hover {
									border: 1px solid $border-27;
								}
							}
						}
						.error-message {
							display: flex;
							align-items: center;
							justify-content: center;
							gap: .5rem * 1.22;
							text-align: center;
							.error-icon {
								width: 1.25rem * 1.22;
								height: 1.25rem * 1.22;
								svg {
									width: 1.25rem * 1.22 !important;
									height: 1.25rem * 1.22 !important;
								}
							}
							.error-text {
								color: $color-second-2;
								font-family: $secondary-font;
								font-size: .875rem * 1.22;
								font-style: normal;
								font-weight: 500;
								line-height: 1.25rem * 1.22; /* 142.857% */
							}
						}
						&.error-state {
							.otp-input {
								border-radius: 6px;
								border: 1px solid $border-26;
								box-shadow: 0px 0px 4px 0px $border-26;
							}
						}
					}

					.options-list-wrapper {
						display: flex;
						width: 100%;
						flex-direction: column;
						align-items: flex-start;
						gap: 1rem * 1.22;
						.option-wrapper {
							display: flex;
							width: 100%;
							// height: 48px;
							padding: .625rem * 1.22 1rem * 1.22;
							align-items: center;
							flex-direction: column;
							border-radius: 6px;
							border: 1px solid $border-5;
							cursor: pointer;
							.option-detail-wrapper {
								display: flex;
								width: 100%;
								align-items: center;
								gap: .625rem * 1.22;
								.option-name {
									color: $color-dark-gray-8;
									font-family: $secondary-font;
									font-size: 1rem * 1.22;
									font-style: normal;
									font-weight: 500;
									line-height: 1.25rem * 1.22; /* 125% */
								}
							}
							.option-content-wrapper {
								display: flex;
								width: 100%;
								flex-direction: column;
								gap: 0.625rem * 1.22;
							}
							.sub-options-wrapper {
								margin-top: .625rem * 1.22;
								display: grid;
								width: 100%;
								grid-template-columns: 1fr 1fr;
								gap: 0.625rem * 1.22 0.25rem * 1.22;
								padding: .75rem * 1.22 1rem * 1.22;
								align-items: center;
								border-radius: 8px;
								background: $background-white-12;
								.sub-option {
									display: flex;
									padding: .625rem * 1.22 .625rem * 1.22;
									justify-content: center;
									align-items: center;
									gap: .625rem * 1.22;
									border-radius: 8px;
									background: $background-white;
									.image-wrapper {
										display: flex;
										justify-content: center;
										align-items: center;
										width: 1rem * 1.22;
										height: 1rem * 1.22;
									}
									.sub-option-name {
										color: $color-dark-gray-8;
										font-family: $secondary-font;
										font-size: .75rem * 1.22;
										font-style: normal;
										font-weight: 500;
										line-height: 1.25rem * 1.22; /* 166.667% */
									}
									&.active-sub-option, &:hover {
										outline: 1px solid $border-27;
										.sub-option-name {
											color: $color-dark-gray-7;
											font-family: $secondary-font;
											font-size: .75rem * 1.22;
											font-style: normal;
											font-weight: 500;
											line-height: 1.25rem * 1.22; /* 166.667% */
										}
									}
								}
								
							}
							.text-input-wrapper {
									display: flex;
									flex-direction: column;
									gap: 0.625rem * 1.22;
									width: 100%;
									margin-top: .625rem * 1.22;
									.text-input {
										display: flex;
										width: 100%;
										height: 3.25rem * 1.22;
										padding: .5rem * 1.22;
										align-items: flex-start;
										gap: .625rem * 1.22;
										align-self: stretch;
										border-radius: 4px;
										border: 1px solid $border-5;
										background: $background-white-12;
										color: $color-dark-gray-7;
										font-family: $secondary-font;
										font-size: .75rem * 1.22;
										font-style: normal;
										font-weight: 400;
										line-height: .875rem * 1.22; /* 116.667% */
										&::placeholder {
											color: $color-dark-gray-8;
											font-family: $secondary-font;
											font-size: .75rem * 1.22;
											font-style: italic;
											font-weight: 400;
											line-height: .875rem * 1.22; /* 116.667% */
										}
										&.option-error-state {
											border-radius: 8px;
											border: 1px solid $border-26;
											background: $background-white-12;
										}
									}
							}
							.option-error-state {
								border-radius: 8px;
								border: 1px solid $border-26;
								background: $background-white-12;
								&.option-error-state-border-4 {
									border-radius: 4px !important;
								}
								&.option-error-state-border-6 {
									border-radius: 6px !important;
								}
							}
							.option-error {
								display: flex;
								gap: .25rem * 1.22;
								.option-error-text {
									color: $color-second-2;
									font-family: $secondary-font;
									font-size: .75rem * 1.22;
									font-weight: 500;
									line-height: 1.25rem * 1.22; /* 166.667% */
								}
							}
							&:hover {
								border-radius: 6px;
								border: 1px solid $border-27;
								.radio-icon-wrapper {
									
									.unselect-radio-icon {
										circle {
											stroke: $border-14;
										}
									}
								}
								
							}
							&.active-option {
								border: 1px solid $border-27;
								.option-detail-wrapper {
								
									.option-name {
										color: $color-dark-gray-7;
									}
								}
							}
							&:focus-within {
								border-radius: 6px;
								border: 1px solid $border-27;
							}
						}
					}
				}
				.terms-wrapper {
					display: flex;
					width: 100%;
					justify-content: center;
					align-items: center;
					gap: .75rem * 1.22;
					
					.check-box-wrapper {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 2rem * 1.22;
						height: 2rem * 1.22;
						cursor: pointer;
						svg {
							width: 1.5rem * 1.22 !important;
							height: 1.5rem * 1.22 !important;
						}
						&:hover {
							svg {
								rect {
									stroke: $border-27;
								}
							}
						}
						
					}
					.terms-text {
						color: $color-dark-gray-8;
						font-family: $secondary-font;
						font-size: .75rem * 1.22;
						font-style: normal;
						font-weight: 400;
						line-height: 1rem * 1.22; /* 133.333% */
					}
					&.terms-error {
						.terms-text {
							color: $color-second-2;
						}
					}
				}
				.resend-otp-wrapper {
					display: flex;
					width: 100%;
					flex-direction: column;
					align-items: center;
					gap: .25rem * 1.22;
					.resend-otp-button {
						color: $color-dark-gray-7;
						text-align: center;
						font-family: $secondary-font;
						font-size: 1rem * 1.22;
						font-style: normal;
						font-weight: 500;
						line-height: 1.375rem * 1.22; /* 137.5% */
						cursor: pointer;
					}
					.resend-otp-button-tag {
						color: $color-dark-gray-7;
						text-align: center;
						font-family: $secondary-font;
						font-size: .875rem * 1.22;
						font-style: normal;
						font-weight: 400;
						line-height: 1.25rem * 1.22; /* 142.857% */
						cursor: pointer;
					}
				}
			}
			.sign-up-flow-page-footer {
				display: flex;
				height: 0.3125rem * 1.22;
				align-items: center;
				justify-content: center;
				gap: 0.375rem * 1.22;
				width: 100%;
				.progress-block {
					width: 2.625rem * 1.22;
					align-self: stretch;
					border-radius: 21px;
					background: $background-41;
					height: 0.3125rem * 1.22;
					&.active {
						border-radius: 25px;
						background: linear-gradient(
							163deg,
							$background-16 9.24%,
							$background-17 93.23%
						);
					}
				}
			}
		}
	}
}

.sign-up-section {
	.sign-up-page-wrapper {

		&.how-do-you-know-about-us-wrapper {
			.page-content-wrapper {
				
				.header {
					
					.text-content {
						gap: 0;
						.heading {
							font-size: 1.5rem * 1.22;
							font-weight: 700;
							line-height: 1.5rem * 1.22; /* 120% */
						}
					}
				}
			}
		}
	}
}
.error-message {
	display: flex;
	align-items: center;
	gap: .5rem * 1.22;
	width: 100%;
	&.error-message-centered {
		justify-content: center;
	}
	.error-icon {
		width: 1.25rem * 1.22;
		height: 1.25rem * 1.22;
		svg {
			width: 1.25rem * 1.22 !important;
			height: 1.25rem * 1.22 !important;
		}
	}
	.error-text {
		color: $color-second-2;
		font-family: $secondary-font;
		font-size: .875rem * 1.22;
		font-style: normal;
		font-weight: 500;
		line-height: 1.25rem * 1.22; /* 142.857% */
		&.error-text-sm {
			font-size: .75rem * 1.22;
		}
	}
	&.error-message-sm {
		gap: 0.25rem * 1.22;
		.error-text {
				font-size: .75rem * 1.22;
		}
	}
}

.icon-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
}
.sing-up-flow-primary-button {
	display: flex;
	width: 100%;
	height: 3rem * 1.22;
	padding: .625rem * 1.22;
	justify-content: center;
	align-items: center;
	gap: .625rem * 1.22;
	color: $color-white;
	font-family: $secondary-font;
	font-size: 1rem * 1.22;
	font-style: normal;
	font-weight: 500;
	line-height: 1.25rem * 1.22; /* 125% */
	border-radius: .375rem * 1.22;
	background: $background-42;
	cursor: pointer;
	text-transform: capitalize;

	&:hover {
		background: $background-black;
	}
}

.select-category-popup-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: hsla(300, 1%, 23%, 0.707);
	position: fixed;
	top: 0;
	left: 0;
	.popup-content-wrapper {
		// width: 47.3125rem * 1.22;
		display: flex;
		padding: 2rem * 1.22 1.5rem * 1.22;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem * 1.22;
		border-radius: 8px;
		background: $background-white;
		position: relative;
		.close-popup {
			cursor: pointer;
			position: absolute;
			right: 1rem * 1.22;
			top: 1rem * 1.22;
		}
		.header {
			color: $color-black;
			text-align: center;
			font-family: $secondary-font;
			font-size: 2rem * 1.22;
			font-style: normal;
			font-weight: 700;
			line-height: 2.375rem * 1.22; /* 118.75% */
		}
		.select-category-popup-content {
			display: flex;
			width: 100%;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			align-content: flex-start;
			gap: 1.5rem * 1.22;
			align-self: stretch;
			flex-wrap: wrap;
			.text-content {
				display: flex;
				width: 100%;
				flex-direction: column;
				align-items: center;
				gap: .75rem * 1.22;
	
				color: $color-black;
				text-align: center;
				// font-family: Inter;
				font-family: $secondary-font;
				font-size: 1.125rem * 1.22;
				font-style: normal;
				font-weight: 700;
				line-height: 1.625rem * 1.22; /* 144.444% */
				letter-spacing: -0.18px;
	
				.tag {
					color: rgba(19, 19, 19, 0.75);
					text-align: center;
					// font-family: Inter;
					font-family: $secondary-font;
					font-size: .875rem * 1.22;
					font-style: normal;
					font-weight: 400;
					line-height: 1rem * 1.22; /* 114.286% */
				}
			}
	
			.reasons-wrapper {
				display: flex;
				width: 44.3125rem * 1.22;
				justify-content: center;
				align-items: flex-start;
				align-content: flex-start;
				gap: 1rem * 1.22;
				flex-wrap: wrap;
				.reason {
					display: flex;
					padding: .5625rem * 1.22 1.5rem * 1.22;
					justify-content: center;
					align-items: center;
					color: $color-dark-gray-7;
					font-family: $secondary-font;
					font-size: 1rem * 1.22;
					font-style: normal;
					font-weight: 400;
					line-height: 1.375rem * 1.22; /* 137.5% */
					border-radius: .5rem * 1.22;
					background: $background-white-11;
	
					/* shadow/sm */
					box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
					cursor: pointer;
					&:hover {
						border-radius: 8px;
						background: $background-43;
	
						/* shadow/sm */
						box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
					}
				}
				.is-selected {
					border-radius: 8px;
					background: $background-43;
	
					/* shadow/sm */
					box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
				}
			}
		}
	}

}
.consent-check-error {
	display: flex;
	width: 1.5rem * 1.22;
	height: 1.5rem * 1.22;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 1px solid $border-26;
	box-shadow: 0px 0px 4px 0px $border-26;
	
}
.big-image {
	width: 1.5rem !important;
	height: 1.5rem !important;
}
</style>

<style lang="scss" scoped>
/* Palette */

body {
	margin: 0;
}
</style>

<style lang="scss">
.contact-code-dropdown-wrapper {
	

	::-webkit-scrollbar-thumb {
		background-color: $background-21 !important;
		border: 0px;
		
	}
	&.select-drop-down-container {
		.drop-down-normal-box {
			display: gird;
			grid-template-columns: max-content 1fr max-content;
			background-color: transparent;
			gap: 0.25rem * 1.22;
			p {
				margin: 0px;
				color: $color-dark-gray-7;
				font-family: $secondary-font;
				font-size: 1rem * 1.22 !important;
				font-style: normal;
				font-weight: 500;
				line-height: 1.25rem * 1.22; /* 125% */
			}
			svg {
				path {
					stroke: $border-28;
				}
			}
			&:hover {
				p {
					color: $color-dark-gray-7;
				}
				svg {
					path {
						stroke: $border-24;
					}
			}
			}
		}
		.drop-down-container {
			min-width: 8rem * 1.22;
			border-radius: 6px;
			background: $background-white;
			padding: 0 1rem * 1.22;
			.drop-down-list-section {
				display: grid;
				grid-template-columns: 1fr max-content;
				align-items: center;
				cursor: pointer;
				padding: 0.25rem * 1.22 0rem * 1.22;

				p {
					margin: 0px;

					color: $color-dark-gray-8;
					font-family: $secondary-font;
					font-size: 1rem * 1.22;
					font-style: normal;
					font-weight: 500;
					line-height: 1.25rem * 1.22; /* 125% */

				}
				&:hover {
					background-color: $background-white;
					p {
						color: $color-dark-gray-7 !important;
					}
				}
				svg {
					&:hover {
						outline: 1px solid $border-29;
					}
				}
			}
			.selected {
				background-color: $background-white;
				p {
					color: $color-dark-gray-7;
					font-weight: bold;
				}
			}
		}
		&.on-active {
			.drop-down-container {
				max-height: 8.25rem * 1.22;
				top: calc(100% + 1rem * 1.22) !important;
				left: -1rem * 1.22;
				padding-bottom: 0.75rem * 1.22;
				overflow-y: auto;
				border: 1px solid $border-5 !important;
			}
		}
	}
	.dropdown-option-wrapper {
		width: 20rem * 1.22;
		display: flex;
		align-items: center;
		gap: 0.75rem * 1.22;
		.image-wrapper {
			width: 1rem * 1.22;
			height: 0.625rem * 1.22;
			flex-shrink: 0;
			img {
				border-radius: 0.125rem * 1.22;
			}
		}
		.dropdown-option {
			color: $color-dark-gray-8;
			font-family: $secondary-font;
			font-size: 1rem * 1.22;
			font-style: normal;
			font-weight: 500;
			line-height: 1.25rem * 1.22; /* 125% */
		}
		&:hover {
			.dropdown-option{
				color: $color-dark-gray-7 !important;
			}
		}
		&.selected {
			background-color: $background-white;
			.dropdown-option {
				color: $color-dark-gray-7;
			}
		}
	}
}
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {

/* 480 ss-phone */
.temporary-fix-for-mobile-response {
		font-size: 60%;
}
}

@media only screen and (min-width: 480px) and (max-width: 640px) {

/* 640 s-phone */
.temporary-fix-for-mobile-response {
		font-size: 60%;
}
}

@media only screen and (min-width: 480px) and (max-width: 640px) and (max-height: 768px) {

/* 640 s-phone */
.temporary-fix-for-mobile-response {
		font-size: 85%;
}
}

@media only screen and (min-width: 640px) and (max-width: 768px) {

/* 760 s-phone */
.temporary-fix-for-mobile-response {
		font-size: 60%;
}
}

@media only screen and (min-width: 768px) and (max-width: 800px) {

/* 800 phone */
.temporary-fix-for-mobile-response {
		font-size: 75%;
}
}

@media only screen and (min-width: 800px) and (max-width: 900px) {

/* 900 b-phone */
.temporary-fix-for-mobile-response {
		font-size: 75%;
}
}

@media only screen and (min-width: 900px) and (max-width: 1000px) {

/* 1000 b-phone */
.temporary-fix-for-mobile-response {
		font-size: 75%;
}
}

@media only screen and (min-width: 1000px) and (max-width: 1200px) {

/* 1200 tab-land */
.temporary-fix-for-mobile-response {
		font-size: 83%;
}
}
.sign-up-flow-page-footer {
	display: flex;
	height: 0.3125rem * 1.22;
	align-items: center;
	justify-content: center;
	gap: 0.375rem * 1.22;
	width: 100%;
	.progress-block {
		width: 2.625rem * 1.22;
		align-self: stretch;
		border-radius: 21px;
		background: $background-41;
		height: 0.3125rem * 1.22;
		&.active {
			border-radius: 25px;
			background: linear-gradient(
				163deg,
				$background-16 9.24%,
				$background-17 93.23%
			);
		}
	}
}
</style>

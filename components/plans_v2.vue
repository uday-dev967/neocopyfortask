<template>
	<section
		:class="{
			'no-packages': currentBilling === undefined,
			'loading-main': currentBilling === null,
		}"
		v-if="!isRedirecting"
	>
		<svg
			class="plans-bg-pattern"
			width="500"
			height="500"
			viewBox="0 0 1106 646"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				opacity="0.3"
				d="M707.028 366.976L4.9209 620.361L707.028 873.746L1409.14 620.361L707.028 366.976Z"
				stroke="black"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				opacity="0.3"
				d="M707.028 245.351L4.9209 498.736L707.028 752.121L1409.14 498.736L707.028 245.351Z"
				stroke="black"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				opacity="0.3"
				d="M707.028 123.726L4.9209 377.111L707.028 630.496L1409.14 377.111L707.028 123.726Z"
				stroke="black"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				opacity="0.3"
				d="M707.028 2.10098L4.9209 255.486L707.028 508.871L1409.14 255.486L707.028 2.10098Z"
				stroke="black"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
		</svg>
		<div
			style="position: relative"
			v-if="
				currentBilling &&
				currentBilling.displayContext &&
				currentBilling.displayContext.packageName &&
				!isCancelSubUpdating
			"
		>
			<div
				v-if="isUserOnPayAsYouGoPlan"
				class="plan-head-container pay-as-you-go-wrapper"
			>
				<div class="pay-as-you-go-title">
					<div class="label">{{ $t("payAsYouGo.currentPlan") }}</div>
					<div class="plan-name">{{ $t("plansNew.payAsYouGo") }}</div>
				</div>
				<div class="plan-and-billing-details-wrapper">
					<button
						class="change-plan-button"
						@click="handlePayAsYouGoChangePlans"
					>
						{{ $t("buttonText.changePlan") }}
					</button>
					<div
						v-if="currentBilling.isCancled"
						class="plan-expiry-details"
					>
						{{ $t("plansNew.yourPlanHasCancelled") }}
					</div>
				</div>
			</div>

			<div v-if="!isUserOnPayAsYouGoPlan" class="plan-head-container">
				<div>
					<h2 class="plan-name">
						{{ currentBilling.displayContext.groupingName }}
					</h2>
					<div
						v-if="
							currentBilling.type == 'recurring' ||
							currentBilling.type == 'onetime'
						"
					>
						<p class="future-plan" v-if="future.length > 0">
							{{ $t("plansNew.planChangeStartText[0]") }}
							<span style="font-weight: 600">{{ $t("plansNew.planChangeStartText[1]") }}</span> {{ $t("plansNew.planChangeStartText[2]") }}
							<span>{{
								future[0].package.displayContext.groupingName
							}}</span>
							{{ $t("plansNew.planChangeStartText[3]") }}
							<span style="font-weight: 600">{{
								dateFormat(future[0].subscriptionActivateDate)
							}}</span>
						</p>
						<p
							class="future-plan"
							v-else-if="
								!currentBilling.subscriptionStatus &&
								currentBilling.curretCycle <
									currentBilling.usageCycle &&
								currentBilling.nextBilling &&
								currentBilling.nextBilling != ''
							"
						>
							{{ $t("plansNew.planRenewText[0]") }}
							<span style="font-weight: 600">{{ $t("plansNew.planRenewText[1]") }}</span> {{ $t("plansNew.planRenewText[2]") }}
							<span class="next-cbiling" style="font-weight: 600">{{
								dateFormat(currentBilling.nextBilling)
							}}</span>
						</p>
						<p class="future-plan" v-else>
							{{ $t("plansNew.planExpireText[0]") }}
							{{
								new Date().getTime() -
									new Date(
										currentBilling.subscriptionExpiryDate
									).getTime() >
								0
									? $t('plansNew.planExpireText[1]')
									: $t('plansNew.planExpireText[2]')
							}}
							{{ $t("plansNew.planExpireText[3]") }}
							<span style="font-weight: 600">{{
								dateFormat(
									currentBilling.subscriptionExpiryDate
								)
							}}</span>
						</p>
					</div>
				</div>
				<div class="section-cta-and-plan-expiry-info">
					<div
						class="change-plan"
						v-if="
							user &&
							user.accountType == 'root' &&
							user.accountInfo.accountCategory == 'REGULAR'
						"
					>
						<span
							v-if="future && future.length > 0 && !isChargebee"
						>
							<button v-if="!isTrial" @click="isCantBuy = true">
								{{ $t("buttonText.changePlan") }}
							</button>
							<button v-else @click="isCantBuy = true">
								{{ $t("buttonText.upgradePlan") }}
							</button>
						</span>
						<span v-else>
							<nuxt-link v-if="!isUserUS || isTrial" :to="localePath('/settings/plans_new')">
								<button v-if="!isTrial">
									{{ $t("buttonText.changePlan") }}
								</button>
								<button v-else>
									{{ $t("buttonText.upgradePlan") }}
								</button>
							</nuxt-link>
							<button v-else @click="openManageSubscriptionPopup">
			                    {{ $t("buttonText.manageSubscription") }}
		                    </button>
						</span>
					</div>
				</div>
			</div>

			<div
				v-if="
					user &&
					user.accountType == 'root' &&
					user.accountInfo.accountCategory == 'REGULAR' &&
					isCancelFlowShow &&
					!isNeoPaidPlanCancelled &&
					!isUserUS
				"
				class="cancel-sub-container"
				:class="{
					'disbale-pointer-events': this.disablePointerEvents,
				}"
			>
				<p @click="onClickCancel()">
					{{ $t("buttonText.cancelSubscription") }}
				</p>
			</div>

			<div
				v-if="isUserOnPayAsYouGoPlan"
				class="pay-as-you-go-used-credits-wrapper"
			>
				<div class="credits-details-and-buy-more">
					<div class="credit-details-wrapper">
						<div class="header">
							{{ $t("payAsYouGo.availableCredits") }}
						</div>
						<div class="available-credits">
							{{ totalCreditsAvailable }}
						</div>
						<div
							class="used-credits"
							v-html="
								$t('payAsYouGo.numberOfCreditsUsed', {
									number: totalPayAsYouGoCreditsUsed,
								})
							"
						></div>
					</div>
					<div
						class="buy-more-button"
						@click="handlePayAsYouGoAddonBuy"
					>
						{{ $t("buttonText.buyCredits") }}
					</div>
				</div>
				<div
					class="popup-div"
					@click="closePayAsYouGoAddonBuyPopup"
					:class="payAsYouGoAddons ? 'showPopUp' : ''"
				>
					<div class="popup-container" @click.stop>
						<div
							class="close-popup"
							@click="closePayAsYouGoAddonBuyPopup"
						>
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
						<addonComponent
							:addon="payAsYouGoAddonPlan"
							:user="user"
							:hide-tabs="true"
						/>
					</div>
				</div>
			</div>

			<div
				v-if="isUserOnPayAsYouGoPlan"
				class="plan-details-link"
				@click="handleSeePlanDetails"
			>
				{{ $t("payAsYouGo.seeHowCreditsAreUsed") }}
			</div>

			<div
				v-if="
					isUserOnPayAsYouGoPlan && payAsYouGoTransactions.length > 0
				"
				class="pay-as-you-go-credit-transactions-wrapper"
			>
				<div class="section-header">
					<div class="text">
						{{ $t("payAsYouGo.creditTransactionHistory") }}
					</div>
					<div class="billing-history-button" @click="getAllInvoice">
						{{ $t("buttonText.billingHistory") }}
					</div>
				</div>
				<div class="transactions-wrapper">
					<template
						v-for="(transaction, index) of payAsYouGoTransactions"
					>
						<div
							v-if="transaction.type === 'debit'"
							:key="transaction._id + index"
							class="transaction"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M13.2001 20.4002C18.502 20.4002 22.8001 16.1021 22.8001 10.8002C22.8001 5.49826 18.502 1.2002 13.2001 1.2002C7.89817 1.2002 3.6001 5.49826 3.6001 10.8002C3.6001 16.1021 7.89817 20.4002 13.2001 20.4002Z"
									stroke="#08090B"
									stroke-miterlimit="10"
								/>
								<path
									d="M12.732 16.2919V5.38281H13.4309V16.2919H12.732ZM14.9181 8.76634C14.8726 8.36293 14.6851 8.05043 14.3556 7.82884C14.0261 7.6044 13.6113 7.49219 13.1113 7.49219C12.7533 7.49219 12.4437 7.54901 12.1823 7.66264C11.9209 7.77344 11.7178 7.92685 11.5729 8.12287C11.4309 8.31605 11.3599 8.53622 11.3599 8.78338C11.3599 8.99077 11.4082 9.16974 11.5047 9.32031C11.6042 9.47088 11.7334 9.5973 11.8925 9.69957C12.0545 9.79901 12.2278 9.88281 12.4124 9.95099C12.5971 10.0163 12.7746 10.0703 12.9451 10.1129L13.7974 10.3345C14.0758 10.4027 14.3613 10.495 14.6539 10.6115C14.9465 10.728 15.2178 10.8814 15.4678 11.0717C15.7178 11.2621 15.9195 11.4979 16.0729 11.7791C16.2292 12.0604 16.3073 12.397 16.3073 12.7891C16.3073 13.2834 16.1795 13.7223 15.9238 14.1058C15.6709 14.4893 15.303 14.7919 14.8201 15.0135C14.34 15.2351 13.759 15.3459 13.0772 15.3459C12.4238 15.3459 11.8584 15.2422 11.3812 15.0348C10.9039 14.8274 10.5303 14.5334 10.2604 14.1527C9.99055 13.7692 9.8414 13.3146 9.81299 12.7891H11.134C11.1596 13.1044 11.2619 13.3672 11.4408 13.5774C11.6226 13.7848 11.8542 13.9396 12.1354 14.0419C12.4195 14.1413 12.7306 14.1911 13.0687 14.1911C13.4408 14.1911 13.7718 14.1328 14.0616 14.0163C14.3542 13.897 14.5843 13.7322 14.7519 13.522C14.9195 13.3089 15.0033 13.0604 15.0033 12.7763C15.0033 12.5178 14.9295 12.3061 14.7817 12.1413C14.6369 11.9766 14.4394 11.8402 14.1894 11.7322C13.9422 11.6243 13.6624 11.5291 13.3499 11.4467L12.3187 11.1655C11.6198 10.9751 11.0658 10.6953 10.6567 10.326C10.2505 9.95668 10.0474 9.46804 10.0474 8.86009C10.0474 8.35724 10.1837 7.91832 10.4565 7.54332C10.7292 7.16832 11.0985 6.87713 11.5644 6.66974C12.0303 6.45952 12.5559 6.3544 13.1411 6.3544C13.732 6.3544 14.2533 6.4581 14.705 6.66548C15.1596 6.87287 15.5175 7.15838 15.7789 7.52202C16.0403 7.88281 16.1766 8.29759 16.188 8.76634H14.9181Z"
									fill="#232121"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M3.85199 5.3877C1.56339 7.2393 0.100098 10.0707 0.100098 13.2438C0.100098 18.8219 4.62202 23.3438 10.2001 23.3438C12.6327 23.3438 14.8645 22.4838 16.608 21.0512C15.7343 21.3415 14.8111 21.5232 13.8543 21.5804C12.7359 22.0713 11.4998 22.3438 10.2001 22.3438C5.17431 22.3438 1.1001 18.2696 1.1001 13.2438C1.1001 11.2866 1.718 9.47364 2.76938 7.98947C3.01714 7.06767 3.38383 6.19459 3.85199 5.3877Z"
									fill="#08090B"
								/>
							</svg>
							<div
								v-if="transaction.messageData"
								class="narration"
							>
								{{
									transaction.messageData.creditsDeducted || 0
								}}
								credits used for
								{{ transaction.messageData.service }}
							</div>
							<div v-if="transaction.createdAt" class="a-go-info">
								{{
									getAgoInfoFromISODate(transaction.createdAt)
								}}
							</div>
						</div>
						<div
							v-else
							:key="transaction._id + index"
							class="transaction"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M13.2001 20.4002C18.502 20.4002 22.8001 16.1021 22.8001 10.8002C22.8001 5.49826 18.502 1.2002 13.2001 1.2002C7.89817 1.2002 3.6001 5.49826 3.6001 10.8002C3.6001 16.1021 7.89817 20.4002 13.2001 20.4002Z"
									stroke="#08090B"
									stroke-miterlimit="10"
								/>
								<path
									d="M12.732 16.2919V5.38281H13.4309V16.2919H12.732ZM14.9181 8.76634C14.8726 8.36293 14.6851 8.05043 14.3556 7.82884C14.0261 7.6044 13.6113 7.49219 13.1113 7.49219C12.7533 7.49219 12.4437 7.54901 12.1823 7.66264C11.9209 7.77344 11.7178 7.92685 11.5729 8.12287C11.4309 8.31605 11.3599 8.53622 11.3599 8.78338C11.3599 8.99077 11.4082 9.16974 11.5047 9.32031C11.6042 9.47088 11.7334 9.5973 11.8925 9.69957C12.0545 9.79901 12.2278 9.88281 12.4124 9.95099C12.5971 10.0163 12.7746 10.0703 12.9451 10.1129L13.7974 10.3345C14.0758 10.4027 14.3613 10.495 14.6539 10.6115C14.9465 10.728 15.2178 10.8814 15.4678 11.0717C15.7178 11.2621 15.9195 11.4979 16.0729 11.7791C16.2292 12.0604 16.3073 12.397 16.3073 12.7891C16.3073 13.2834 16.1795 13.7223 15.9238 14.1058C15.6709 14.4893 15.303 14.7919 14.8201 15.0135C14.34 15.2351 13.759 15.3459 13.0772 15.3459C12.4238 15.3459 11.8584 15.2422 11.3812 15.0348C10.9039 14.8274 10.5303 14.5334 10.2604 14.1527C9.99055 13.7692 9.8414 13.3146 9.81299 12.7891H11.134C11.1596 13.1044 11.2619 13.3672 11.4408 13.5774C11.6226 13.7848 11.8542 13.9396 12.1354 14.0419C12.4195 14.1413 12.7306 14.1911 13.0687 14.1911C13.4408 14.1911 13.7718 14.1328 14.0616 14.0163C14.3542 13.897 14.5843 13.7322 14.7519 13.522C14.9195 13.3089 15.0033 13.0604 15.0033 12.7763C15.0033 12.5178 14.9295 12.3061 14.7817 12.1413C14.6369 11.9766 14.4394 11.8402 14.1894 11.7322C13.9422 11.6243 13.6624 11.5291 13.3499 11.4467L12.3187 11.1655C11.6198 10.9751 11.0658 10.6953 10.6567 10.326C10.2505 9.95668 10.0474 9.46804 10.0474 8.86009C10.0474 8.35724 10.1837 7.91832 10.4565 7.54332C10.7292 7.16832 11.0985 6.87713 11.5644 6.66974C12.0303 6.45952 12.5559 6.3544 13.1411 6.3544C13.732 6.3544 14.2533 6.4581 14.705 6.66548C15.1596 6.87287 15.5175 7.15838 15.7789 7.52202C16.0403 7.88281 16.1766 8.29759 16.188 8.76634H14.9181Z"
									fill="#232121"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M3.85199 5.3877C1.56339 7.2393 0.100098 10.0707 0.100098 13.2438C0.100098 18.8219 4.62202 23.3438 10.2001 23.3438C12.6327 23.3438 14.8645 22.4838 16.608 21.0512C15.7343 21.3415 14.8111 21.5232 13.8543 21.5804C12.7359 22.0713 11.4998 22.3438 10.2001 22.3438C5.17431 22.3438 1.1001 18.2696 1.1001 13.2438C1.1001 11.2866 1.718 9.47364 2.76938 7.98947C3.01714 7.06767 3.38383 6.19459 3.85199 5.3877Z"
									fill="#08090B"
								/>
								<circle cx="20" cy="5" r="4" fill="#26B679" />
								<path
									d="M22 3.66699L19.3333 6.33366L18 5.00033"
									stroke="white"
									stroke-width="0.8"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<div
								v-if="transaction.messageData"
								class="narration"
							>
								{{ transaction.messageData.creditsAdded || 0 }}
								credits added to your account
							</div>
							<div v-if="transaction.createdAt" class="a-go-info">
								{{
									getAgoInfoFromISODate(transaction.createdAt)
								}}
							</div>
						</div>
					</template>
					<ScrollObserver
						v-if="
							payAsYouGoTransactions &&
							payAsYouGoTransactions.length >= 10
						"
						v-on:scrolledToEnd="loadMoreTransactions"
					/>
				</div>
			</div>

			<div v-if="!isUserOnPayAsYouGoPlan" class="billing-info-container">
				<div class="billing-info-head">
					<p class="main-heading">{{ $t("plansNew.billingInfo") }}</p>
					<p
						v-if="
							user &&
							user.accountType == 'root' &&
							user.accountInfo.accountCategory == 'REGULAR'
						"
						class="billing-history-button"
						@click="getAllInvoice"
					>
						{{ $t("buttonText.viewBillingHistory") }}
					</p>
				</div>
				<div class="billing-details">
					<div
						v-if="
							!isTrial &&
							currentBilling.nextBilling &&
							currentBilling.nextBilling != ''
						"
					>
						<span>{{ $t("plansNew.nextBillingDate") }}</span>
						<p>{{ dateFormat(currentBilling.nextBilling) }}</p>
					</div>
					<div>
						<span>{{ $t("plansNew.billingCycle") }}</span>
						<p>
							{{
								currentBilling.billing == 1
									? $t("plansNew.monthly")
									: currentBilling.billing == 2
									? $t("plansNew.xmonths", {
											num: currentBilling.billing,
									  })
									: currentBilling.billing == 3
									? $t("plansNew.quarterly")
									: currentBilling.billing == 4
									? $t("plansNew.xmonths", {
											num: currentBilling.billing,
									  })
									: currentBilling.billing == 5
									? $t("plansNew.xmonths", {
											num: currentBilling.billing,
									  })
									: currentBilling.billing == 6
									? $t("plansNew.halfYearly")
									: currentBilling.billing == 7
									? $t("plansNew.xmonths", {
											num: currentBilling.billing,
									  })
									: currentBilling.billing == 8
									? $t("plansNew.xmonths", {
											num: currentBilling.billing,
									  })
									: currentBilling.billing == 9
									? $t("plansNew.xmonths", {
											num: currentBilling.billing,
									  })
									: currentBilling.billing == 10
									? $t("plansNew.xmonths", {
											num: currentBilling.billing,
									  })
									: currentBilling.billing == 11
									? $t("plansNew.xmonths", {
											num: currentBilling.billing,
									  })
									: currentBilling.billing == 12
									? $t("plansNew.yearly")
									: currentBilling.billing
							}}
						</p>
					</div>
					<div>
						<span>{{ $t("plansNew.nextBillingAmount") }}</span>
						<p>
							{{
								currentBilling.subscriptionNextBillingAmount &&
								currentBilling.subscriptionNextBillingAmount
									.amount_due &&
								currentBilling.displayContext
									? currentBilling.displayContext
											.currency_symbol +
									  " " +
									  currentBilling
											.subscriptionNextBillingAmount
											.amount_due /
											100
									: "NA"
							}}
						</p>
					</div>
					<div>
						<span>{{ $t("plansNew.outstandingAmount") }}</span>
						<p>
							{{
								currentBilling.outstandingAmount == 0
									? 0
									: currentBilling.outstandingAmount
							}}
						</p>
					</div>
				</div>
			</div>

			<div
				v-if="
					!isUserOnPayAsYouGoPlan &&
					filteredRecommendedAddonsDetails &&
					filteredRecommendedAddonsDetails.length > 0
				"
				class="billing-info-container"
			>
				<div class="billing-info-head">
					<p class="main-heading">
						{{ $t("plansNew.optionalAddOnsSubheading") }}
					</p>
				</div>
				<div class="billing-details recommended-addons">
					<div
						v-for="item of filteredRecommendedAddonsDetails"
						class="addon-item"
						:key="item.addon.id"
					>
						<svg
							v-if="
								item.addon.name
									.toLowerCase()
									.indexOf('elevations') >= 0
							"
							width="56"
							height="56"
							viewBox="0 0 56 56"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width="56" height="56" fill="#F8F0ED" />
							<path
								d="M43.606 12.1061C43.6646 12.0475 43.6646 11.9525 43.606 11.8939L42.6514 10.9393C42.5929 10.8808 42.4979 10.8808 42.4393 10.9393C42.3807 10.9979 42.3807 11.0929 42.4393 11.1515L43.2878 12L42.4393 12.8485C42.3807 12.9071 42.3807 13.0021 42.4393 13.0607C42.4979 13.1192 42.5929 13.1192 42.6514 13.0607L43.606 12.1061ZM17.9434 12.15H19.0082V11.85H17.9434V12.15ZM21.1379 12.15H23.2677V11.85H21.1379V12.15ZM25.3974 12.15H27.5271V11.85H25.3974V12.15ZM29.6568 12.15H31.7865V11.85H29.6568V12.15ZM33.9162 12.15H36.046V11.85H33.9162V12.15ZM38.1757 12.15H40.3054V11.85H38.1757V12.15ZM42.4351 12.15H43.5V11.85H42.4351V12.15ZM43.7121 12.2121C43.8293 12.095 43.8293 11.905 43.7121 11.7879L41.8029 9.87868C41.6857 9.76152 41.4958 9.76152 41.3786 9.87868C41.2615 9.99584 41.2615 10.1858 41.3786 10.3029L43.0757 12L41.3786 13.6971C41.2615 13.8142 41.2615 14.0042 41.3786 14.1213C41.4958 14.2385 41.6857 14.2385 41.8029 14.1213L43.7121 12.2121ZM17.9434 12.3H19.0082V11.7H17.9434V12.3ZM21.1379 12.3H23.2677V11.7H21.1379V12.3ZM25.3974 12.3H27.5271V11.7H25.3974V12.3ZM29.6568 12.3H31.7865V11.7H29.6568V12.3ZM33.9162 12.3H36.046V11.7H33.9162V12.3ZM38.1757 12.3H40.3054V11.7H38.1757V12.3ZM42.4351 12.3H43.5V11.7H42.4351V12.3Z"
								fill="#2D2D2D"
							/>
							<path
								d="M12.1061 15.7511C12.0475 15.6925 11.9525 15.6925 11.8939 15.7511L10.9393 16.7057C10.8808 16.7642 10.8808 16.8592 10.9393 16.9178C10.9979 16.9764 11.0929 16.9764 11.1515 16.9178L12 16.0693L12.8485 16.9178C12.9071 16.9764 13.0021 16.9764 13.0607 16.9178C13.1192 16.8592 13.1192 16.7642 13.0607 16.7057L12.1061 15.7511ZM12.15 43.5L12.15 42.5128L11.85 42.5128L11.85 43.5L12.15 43.5ZM12.15 40.5383L12.15 38.5638L11.85 38.5638L11.85 40.5383L12.15 40.5383ZM12.15 36.5893L12.15 34.6148L11.85 34.6148L11.85 36.5893L12.15 36.5893ZM12.15 32.6403L12.15 30.6658L11.85 30.6658L11.85 32.6403L12.15 32.6403ZM12.15 28.6913L12.15 26.7168L11.85 26.7168L11.85 28.6913L12.15 28.6913ZM12.15 24.7423L12.15 22.7679L11.85 22.7679L11.85 24.7423L12.15 24.7423ZM12.15 20.7934L12.15 18.8189L11.85 18.8189L11.85 20.7934L12.15 20.7934ZM12.15 16.8444L12.15 15.8571L11.85 15.8571L11.85 16.8444L12.15 16.8444ZM12.2121 15.645C12.095 15.5279 11.905 15.5279 11.7879 15.645L9.87868 17.5542C9.76152 17.6714 9.76152 17.8613 9.87868 17.9785C9.99584 18.0956 10.1858 18.0956 10.3029 17.9785L12 16.2814L13.6971 17.9785C13.8142 18.0956 14.0042 18.0956 14.1213 17.9785C14.2385 17.8613 14.2385 17.6714 14.1213 17.5542L12.2121 15.645ZM12.3 43.5L12.3 42.5128L11.7 42.5128L11.7 43.5L12.3 43.5ZM12.3 40.5383L12.3 38.5638L11.7 38.5638L11.7 40.5383L12.3 40.5383ZM12.3 36.5893L12.3 34.6148L11.7 34.6148L11.7 36.5893L12.3 36.5893ZM12.3 32.6403L12.3 30.6658L11.7 30.6658L11.7 32.6403L12.3 32.6403ZM12.3 28.6913L12.3 26.7168L11.7 26.7168L11.7 28.6913L12.3 28.6913ZM12.3 24.7423L12.3 22.7679L11.7 22.7679L11.7 24.7423L12.3 24.7423ZM12.3 20.7934L12.3 18.8189L11.7 18.8189L11.7 20.7934L12.3 20.7934ZM12.3 16.8444L12.3 15.8571L11.7 15.8571L11.7 16.8444L12.3 16.8444Z"
								fill="#2D2D2D"
							/>
							<path
								d="M20.42 34.9102H30.5H40.58C40.7279 34.9102 40.8593 34.8619 40.9542 34.7695C41.0494 34.677 41.1 34.5478 41.1 34.4017V27.0497V19.6977V14.7963C41.1 14.6502 41.0494 14.5211 40.9542 14.4285C40.8593 14.3362 40.7279 14.2879 40.58 14.2879H32.6H27.98H20.42C20.2721 14.2879 20.1407 14.3362 20.0458 14.4285C19.9506 14.5211 19.9 14.6502 19.9 14.7963V24.599V27.8666V32.7679V34.4017C19.9 34.5478 19.9506 34.6769 20.0458 34.7695C20.1407 34.8618 20.2721 34.9102 20.42 34.9102ZM20.94 28.375H24.9284C24.6796 30.4031 23.0308 32.0078 20.94 32.2486V28.375ZM20.94 15.3048H27.46V17.5555H27.14C26.9921 17.5555 26.8607 17.6038 26.7658 17.6961C26.6706 17.7886 26.62 17.9178 26.62 18.0639C26.62 18.21 26.6706 18.3391 26.7658 18.4317C26.8607 18.524 26.9921 18.5723 27.14 18.5723H28.82C28.9679 18.5723 29.0993 18.524 29.1942 18.4317C29.2894 18.3391 29.34 18.21 29.34 18.0639C29.34 17.9178 29.2894 17.7886 29.1942 17.6961C29.0993 17.6038 28.9679 17.5555 28.82 17.5555H28.5V15.3048H32.08V19.6977C32.08 19.8438 32.1306 19.9729 32.2258 20.0655C32.3207 20.1578 32.4521 20.2061 32.6 20.2061H34.18V20.5146C34.18 20.6607 34.2306 20.7898 34.3257 20.8824C34.4207 20.9747 34.5521 21.023 34.7 21.023C34.8479 21.023 34.9792 20.9747 35.0742 20.8824C35.1693 20.7898 35.2199 20.6607 35.2199 20.5146V18.8808C35.2199 18.7347 35.1693 18.6056 35.0742 18.513C34.9792 18.4207 34.8479 18.3724 34.7 18.3724C34.5521 18.3724 34.4207 18.4207 34.3257 18.513C34.2306 18.6056 34.18 18.7347 34.18 18.8808V19.1892H33.12V15.3048H40.06V19.1892H38.58V18.8808C38.58 18.7347 38.5294 18.6056 38.4342 18.513C38.3393 18.4207 38.2079 18.3724 38.06 18.3724C37.9121 18.3724 37.7807 18.4207 37.6858 18.513C37.5906 18.6056 37.54 18.7347 37.54 18.8808V20.5146C37.54 20.6607 37.5906 20.7898 37.6858 20.8824C37.7807 20.9747 37.9121 21.023 38.06 21.023C38.2079 21.023 38.3393 20.9747 38.4342 20.8824C38.5294 20.7898 38.58 20.6607 38.58 20.5146V20.2061H40.06V26.5412H37.74V26.2328C37.74 26.0867 37.6894 25.9576 37.5942 25.865C37.4993 25.7727 37.3679 25.7244 37.22 25.7244C37.0721 25.7244 36.9407 25.7727 36.8458 25.865C36.7506 25.9576 36.7 26.0867 36.7 26.2328V27.8666C36.7 28.0127 36.7506 28.1418 36.8458 28.2344C36.9407 28.3267 37.0721 28.375 37.22 28.375C37.3679 28.375 37.4993 28.3267 37.5942 28.2344C37.6894 28.1418 37.74 28.0127 37.74 27.8666V27.5581H40.06V33.8933H31.02V27.5581H33.34V27.8666C33.34 28.0127 33.3906 28.1418 33.4858 28.2344C33.5807 28.3267 33.7121 28.375 33.86 28.375C34.0079 28.375 34.1393 28.3267 34.2342 28.2344C34.3294 28.1418 34.38 28.0127 34.38 27.8666V26.2328C34.38 26.0867 34.3294 25.9576 34.2342 25.865C34.1393 25.7727 34.0079 25.7244 33.86 25.7244C33.7121 25.7244 33.5807 25.7727 33.4858 25.865C33.3906 25.9576 33.34 26.0867 33.34 26.2328V26.5412H30.5C30.3521 26.5412 30.2207 26.5895 30.1258 26.6819C30.0306 26.7744 29.98 26.9036 29.98 27.0497V33.8933H20.94V33.2532C23.7716 32.9996 25.98 30.6942 25.98 27.8666C25.98 27.7205 25.9294 27.5913 25.8342 27.4988C25.7393 27.4064 25.6079 27.3581 25.46 27.3581H20.94V25.1075H27.98C28.1279 25.1075 28.2593 25.0592 28.3542 24.9669C28.4494 24.8743 28.5 24.7452 28.5 24.599V21.8399H28.82C28.9679 21.8399 29.0993 21.7916 29.1942 21.6993C29.2894 21.6067 29.34 21.4776 29.34 21.3315C29.34 21.1854 29.2894 21.0562 29.1942 20.9637C29.0993 20.8713 28.9679 20.823 28.82 20.823H27.14C26.9921 20.823 26.8607 20.8713 26.7658 20.9637C26.6706 21.0562 26.62 21.1854 26.62 21.3315C26.62 21.4776 26.6706 21.6067 26.7658 21.6993C26.8607 21.7916 26.9921 21.8399 27.14 21.8399H27.46V24.0906H20.94V15.3048Z"
								fill="#63605F"
								stroke="#F8F0ED"
								stroke-width="0.2"
							/>
						</svg>
						<svg
							v-else-if="
								item.addon.name
									.toLowerCase()
									.indexOf('floor') >= 0
							"
							width="56"
							height="56"
							viewBox="0 0 56 56"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width="56" height="56" fill="#F8F0ED" />
							<path
								d="M19.8604 32.1907C19.8604 32.3966 19.6888 32.5635 19.4771 32.5635H15.8833C15.6716 32.5635 15.5 32.3966 15.5 32.1907C15.5 31.9848 15.6716 31.8179 15.8833 31.8179H19.4771C19.6888 31.8179 19.8604 31.9848 19.8604 32.1907ZM24.4125 15.7415C25.8921 15.7415 27.0958 16.9121 27.0958 18.351V19.0034C27.0958 19.2092 26.9242 19.3762 26.7125 19.3762H22.1125C21.9008 19.3762 21.7292 19.2092 21.7292 19.0034V18.351C21.7292 16.9121 22.9329 15.7415 24.4125 15.7415ZM22.4958 18.351V18.6306H26.3292V18.351C26.3292 17.3232 25.4693 16.4871 24.4125 16.4871C23.3556 16.4871 22.4958 17.3232 22.4958 18.351ZM18.6865 31.0723C18.8982 31.0723 19.0701 30.9054 19.0698 30.699L19.0497 16.1289C19.0479 14.8336 20.1253 13.7843 21.4573 13.7843H21.6215C22.3901 13.7843 23.0946 14.1287 23.5542 14.7291C23.6806 14.8942 23.9207 14.9285 24.0905 14.8055C24.2604 14.6826 24.2955 14.4491 24.1691 14.2839C23.5723 13.5043 22.6199 13.0388 21.6215 13.0388H21.4573C19.7012 13.0388 18.2807 14.422 18.283 16.1299L18.3031 30.7001C18.3034 30.9058 18.475 31.0723 18.6865 31.0723ZM36.775 25.9931V23.5624C36.775 22.4618 35.8542 21.5663 34.7224 21.5663H24.2609C23.1291 21.5663 22.2083 22.4618 22.2083 23.5624V24.4554C22.2083 24.6612 22.38 24.8282 22.5917 24.8282C22.8034 24.8282 22.975 24.6612 22.975 24.4554V23.5624C22.975 22.8728 23.5519 22.3118 24.2609 22.3118H29.1562V26.5057C29.1562 26.7116 29.3279 26.8785 29.5396 26.8785C29.7513 26.8785 29.9229 26.7116 29.9229 26.5057V22.3118H34.7224C35.4315 22.3118 36.0083 22.8728 36.0083 23.5624V26.003C35.1475 26.0932 34.475 26.8038 34.475 27.6646V27.9968C34.475 28.2027 34.6466 28.3696 34.8583 28.3696C35.07 28.3696 35.2417 28.2027 35.2417 27.9968V27.6646C35.2417 27.1541 35.6687 26.7387 36.1937 26.7387H36.7813C37.3062 26.7387 37.7333 27.1541 37.7333 27.6646V30.8921C37.7333 31.4026 37.3062 31.818 36.7813 31.818H35.2417C35.2417 29.3781 35.2435 29.5282 35.2384 29.488C35.2676 29.2604 35.0845 29.0687 34.8583 29.0687H26.2812C26.0696 29.0687 25.8979 29.2356 25.8979 29.4414C25.8979 29.6473 26.0696 29.8142 26.2812 29.8142H34.475V32.1908C34.475 32.3966 34.6466 32.5635 34.8583 32.5635H36.7813C37.729 32.5635 38.5 31.8137 38.5 30.8921V27.6646C38.5 26.755 37.7439 25.9931 36.775 25.9931ZM32.8937 31.8179C32.5471 31.8179 22.8424 31.8179 22.2979 31.8179C21.773 31.8179 21.3458 31.4025 21.3458 30.892V27.6646C21.3458 27.1541 21.773 26.7387 22.2979 26.7387H22.8854C23.4104 26.7387 23.8375 27.1541 23.8375 27.6646V29.7676C23.8375 29.9735 24.0092 30.1404 24.2209 30.1404C24.4326 30.1404 24.6042 29.9735 24.6042 29.7676V27.6646C24.6042 26.7429 23.8332 25.9931 22.8854 25.9931H22.2979C21.3502 25.9931 20.5792 26.7429 20.5792 27.6646V30.8921C20.5792 31.8137 21.3502 32.5635 22.2979 32.5635H32.8937C33.1054 32.5635 33.2771 32.3966 33.2771 32.1908C33.2771 31.9849 33.1054 31.8179 32.8937 31.8179Z"
								fill="black"
								fill-opacity="0.6"
							/>
							<path
								d="M11.6061 13.8956C11.5475 13.837 11.4525 13.837 11.3939 13.8956L10.4393 14.8502C10.3808 14.9088 10.3808 15.0038 10.4393 15.0623C10.4979 15.1209 10.5929 15.1209 10.6515 15.0623L11.5 14.2138L12.3485 15.0623C12.4071 15.1209 12.5021 15.1209 12.5607 15.0623C12.6192 15.0038 12.6192 14.9088 12.5607 14.8502L11.6061 13.8956ZM11.65 41.6445L11.65 40.6573L11.35 40.6573L11.35 41.6445L11.65 41.6445ZM11.65 38.6828L11.65 36.7083L11.35 36.7083L11.35 38.6828L11.65 38.6828ZM11.65 34.7338L11.65 32.7593L11.35 32.7593L11.35 34.7338L11.65 34.7338ZM11.65 30.7848L11.65 28.8103L11.35 28.8103L11.35 30.7848L11.65 30.7848ZM11.65 26.8359L11.65 24.8614L11.35 24.8614L11.35 26.8359L11.65 26.8359ZM11.65 22.8869L11.65 20.9124L11.35 20.9124L11.35 22.8869L11.65 22.8869ZM11.65 18.9379L11.65 16.9634L11.35 16.9634L11.35 18.9379L11.65 18.9379ZM11.65 14.9889L11.65 14.0017L11.35 14.0017L11.35 14.9889L11.65 14.9889ZM11.7121 13.7895C11.595 13.6724 11.405 13.6724 11.2879 13.7895L9.37868 15.6987C9.26152 15.8159 9.26152 16.0058 9.37868 16.123C9.49584 16.2402 9.68579 16.2402 9.80294 16.123L11.5 14.4259L13.1971 16.123C13.3142 16.2402 13.5042 16.2402 13.6213 16.123C13.7385 16.0058 13.7385 15.8159 13.6213 15.6987L11.7121 13.7895ZM11.8 41.6445L11.8 40.6573L11.2 40.6573L11.2 41.6445L11.8 41.6445ZM11.8 38.6828L11.8 36.7083L11.2 36.7083L11.2 38.6828L11.8 38.6828ZM11.8 34.7338L11.8 32.7593L11.2 32.7593L11.2 34.7338L11.8 34.7338ZM11.8 30.7848L11.8 28.8103L11.2 28.8103L11.2 30.7848L11.8 30.7848ZM11.8 26.8359L11.8 24.8614L11.2 24.8614L11.2 26.8359L11.8 26.8359ZM11.8 22.8869L11.8 20.9124L11.2 20.9124L11.2 22.8869L11.8 22.8869ZM11.8 18.9379L11.8 16.9634L11.2 16.9634L11.2 18.9379L11.8 18.9379ZM11.8 14.9889L11.8 14.0017L11.2 14.0017L11.2 14.9889L11.8 14.9889Z"
								fill="#2D2D2D"
							/>
							<path
								d="M44.6061 13.8956C44.5475 13.837 44.4525 13.837 44.3939 13.8956L43.4393 14.8502C43.3808 14.9088 43.3808 15.0038 43.4393 15.0623C43.4979 15.1209 43.5929 15.1209 43.6515 15.0623L44.5 14.2138L45.3485 15.0623C45.4071 15.1209 45.5021 15.1209 45.5607 15.0623C45.6192 15.0038 45.6192 14.9088 45.5607 14.8502L44.6061 13.8956ZM44.65 41.6445L44.65 40.6573L44.35 40.6573L44.35 41.6445L44.65 41.6445ZM44.65 38.6828L44.65 36.7083L44.35 36.7083L44.35 38.6828L44.65 38.6828ZM44.65 34.7338L44.65 32.7593L44.35 32.7593L44.35 34.7338L44.65 34.7338ZM44.65 30.7848L44.65 28.8103L44.35 28.8103L44.35 30.7848L44.65 30.7848ZM44.65 26.8359L44.65 24.8614L44.35 24.8614L44.35 26.8359L44.65 26.8359ZM44.65 22.8869L44.65 20.9124L44.35 20.9124L44.35 22.8869L44.65 22.8869ZM44.65 18.9379L44.65 16.9634L44.35 16.9634L44.35 18.9379L44.65 18.9379ZM44.65 14.9889L44.65 14.0017L44.35 14.0017L44.35 14.9889L44.65 14.9889ZM44.7121 13.7895C44.595 13.6724 44.405 13.6724 44.2879 13.7895L42.3787 15.6987C42.2615 15.8159 42.2615 16.0058 42.3787 16.123C42.4958 16.2402 42.6858 16.2402 42.8029 16.123L44.5 14.4259L46.1971 16.123C46.3142 16.2402 46.5042 16.2402 46.6213 16.123C46.7385 16.0058 46.7385 15.8159 46.6213 15.6987L44.7121 13.7895ZM44.8 41.6445L44.8 40.6573L44.2 40.6573L44.2 41.6445L44.8 41.6445ZM44.8 38.6828L44.8 36.7083L44.2 36.7083L44.2 38.6828L44.8 38.6828ZM44.8 34.7338L44.8 32.7593L44.2 32.7593L44.2 34.7338L44.8 34.7338ZM44.8 30.7848L44.8 28.8103L44.2 28.8103L44.2 30.7848L44.8 30.7848ZM44.8 26.8359L44.8 24.8614L44.2 24.8614L44.2 26.8359L44.8 26.8359ZM44.8 22.8869L44.8 20.9124L44.2 20.9124L44.2 22.8869L44.8 22.8869ZM44.8 18.9379L44.8 16.9634L44.2 16.9634L44.2 18.9379L44.8 18.9379ZM44.8 14.9889L44.8 14.0017L44.2 14.0017L44.2 14.9889L44.8 14.9889Z"
								fill="#2D2D2D"
							/>
							<rect
								x="31.5"
								y="20"
								width="8"
								height="4"
								stroke="#63605F"
								stroke-width="0.8"
								stroke-linejoin="round"
							/>
						</svg>
						<div class="details-container">
							<div class="name-and-price-wrapper">
								<div class="name">{{ item.addon.name }}</div>
								<div class="price">
									{{
										currentBilling.displayContext
											? currentBilling.displayContext
													.currency_symbol
											: ""
									}}
									{{ item.addon.price / 100 }}
									{{
										item.addon.period_unit == "year"
											? "/yr"
											: item.addon.period_unit == "month"
											? "/mo"
											: ""
									}}
								</div>
								<div class="addon-action">
									<div
										v-if="isAddonPartOfPlan(item.addon)"
										class="remove-btn"
										@click="
											handleRemoveAddonButtonClick(
												item.addon
											)
										"
									>
										<div
											v-if="
												!removeButtonLoaderMap[
													item.addon.id
												]
											"
										>
											{{ $t("buttonText.remove") }}
										</div>
										<div v-else class="dot-flashing"></div>
									</div>
									<div
										v-else
										class="add-btn"
										@click="
											handleAddAddonButtonClick(
												item.addon
											)
										"
									>
										{{ $t("buttonText.add") }}
									</div>
								</div>
							</div>
							<div class="description">
								{{ item.addon.description }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="usages-main-container"
				v-if="mainSub && !isUserOnPayAsYouGoPlan"
			>
				<div class="usage-head">
					<h2>{{ $t("plansNew.renderCreditsUsageHeading") }}</h2>
					<div class="addon-buy">
						<button
							v-if="
								user &&
								user.accountType == 'root' &&
								user.accountInfo.accountCategory == 'REGULAR' &&
								!isTrial
							"
							@click="credits = true"
						>
							{{ $t("buttonText.buyNow") }}
						</button>
					</div>
				</div>
				<div class="service-usage-container">
					<div class="service-usage">
						<p class="sub-head">
							{{ $t("plansNew.renderCredits") }}
						</p>
						<div class="credit-summary">
							<p class="available">
								{{ $t("plansNew.available") }}
							</p>
							<p class="unit">
								{{ getAvailableRendersText }}
							</p>
						</div>
						<div v-if="false" class="plans-addons">
							<p>{{ $t("plansNew.includedInPlan") }}</p>
							<p>
								{{
									mainSub &&
									mainSub.overall &&
									mainSub.overall.renderCredits &&
									mainSub.overall.renderCredits.includedInPlan
										? mainSub.overall.renderCredits
												.includedInPlan
										: 0
								}}
							</p>
							<p>{{ $t("plansNew.addOnSubheadingText") }}</p>
							<p>
								{{
									mainSub &&
									mainSub.overall &&
									mainSub.overall.renderCredits &&
									mainSub.overall.renderCredits
										.includedInAddon
										? mainSub.overall.renderCredits
												.includedInAddon
										: 0
								}}
							</p>
						</div>
						<div class="credit-summary">
							<div class="used">
								{{ $t("plansNew.used") }}
								<div class="useage-split">
									<div class="sub-2-head-color three-colum">
										<p>{{ $t("plansNew.renderType") }}</p>
										<p>{{ $t("plansNew.noOfRenders") }}</p>
										<p>{{ $t("plansNew.creditsUsed") }}</p>
									</div>
									<div class="per-service-data three-colum">
										<p
											class="titleCase"
											v-if="
												mainSub.plan[hqRender] ||
												mainSub.addon[hqRender]
											"
										>
											{{
												mainSub.plan[hqRender]
													? mainSub.plan[hqRender][0]
															.service.name
													: mainSub.addon[hqRender][0]
															.service.name
											}}
										</p>
										<p>
											{{
												total(
													hqRender,
													"plan",
													"serviceOverAllUsageByMetric"
												) +
												total(
													hqRender,
													"addon",
													"serviceOverAllExceptOverUsageByMetric"
												)
											}}
										</p>
										<p class="highlight-red">
											{{
												total(
													hqRender,
													"plan",
													"serviceOverAllUsage"
												) +
												total(
													hqRender,
													"addon",
													"serviceOverAllUsage"
												)
											}}
										</p>
									</div>
									<div
										class="per-service-data three-colum"
										v-if="
											mainSub.plan[testRender] ||
											mainSub.addon[testRender]
										"
									>
										<p class="titleCase">
											{{
												mainSub.plan[testRender]
													? mainSub.plan[
															testRender
													  ][0].service.name
													: mainSub.addon[
															testRender
													  ][0].service.name
											}}
										</p>
										<p>
											{{
												total(
													testRender,
													"plan",
													"serviceOverAllUsageByMetric"
												) +
												total(
													testRender,
													"addon",
													"serviceOverAllExceptOverUsageByMetric"
												)
											}}
										</p>
										<p class="highlight-red">
											{{
												total(
													testRender,
													"plan",
													"serviceOverAllUsage"
												) +
												total(
													testRender,
													"addon",
													"serviceOverAllUsage"
												)
											}}
										</p>
									</div>
								</div>
							</div>
							<p class="unit">
								{{
									mainSub &&
									mainSub.overall &&
									mainSub.overall.usedCredits &&
									mainSub.overall.usedCredits.renderCredits &&
									mainSub.overall.usedCredits.renderCredits
										.total
										? mainSub.overall.usedCredits
												.renderCredits.total
										: 0
								}}
							</p>
						</div>
					</div>
					<div class="service-usage">
						<p class="sub-head">
							{{ $t("plansNew.customModelsSubheading") }}
						</p>
						<div class="credit-summary">
							<p class="available">
								{{ $t("plansNew.available") }}
							</p>
							<p class="unit">
								{{
									mainSub &&
									mainSub.overall &&
									mainSub.overall.modelsCredits &&
									mainSub.overall.modelsCredits.total
										? mainSub.overall.modelsCredits.total
										: 0
								}}
							</p>
						</div>
						<div v-if="false" class="plans-addons">
							<p>{{ $t("plansNew.includedInPlan") }}</p>
							<p>
								{{
									mainSub &&
									mainSub.overall &&
									mainSub.overall.modelsCredits &&
									mainSub.overall.modelsCredits.includedInPlan
										? mainSub.overall.modelsCredits
												.includedInPlan
										: 0
								}}
							</p>
							<p>{{ $t("plansNew.addOnSubheadingText") }}</p>
							<p>
								{{
									mainSub &&
									mainSub.overall &&
									mainSub.overall.modelsCredits &&
									mainSub.overall.modelsCredits
										.includedInAddon
										? mainSub.overall.modelsCredits
												.includedInAddon
										: 0
								}}
							</p>
						</div>
						<div class="credit-summary">
							<p class="used muted">{{ $t("plansNew.used") }}</p>
							<p class="unit">
								{{
									mainSub &&
									mainSub.overall &&
									mainSub.overall.usedCredits.modelsCredits &&
									mainSub.overall.usedCredits.modelsCredits &&
									mainSub.overall.usedCredits.modelsCredits
										.total
										? mainSub.overall.usedCredits
												.modelsCredits.total
										: 0
								}}
							</p>
						</div>
						<!-- <div class="sub-2-head-color three-colum">
							<p>Request` Type</p>
							<p>No. of Requests</p>
							<p>Credits Used</p>
						</div>
						<div
							class="per-service-data three-colum"
							v-if="
								mainSub.plan[customDownload] ||
								mainSub.addon[customDownload]
							"
						>
							<p>
								{{
									mainSub.plan[customDownload]
										? mainSub.plan[customDownload][0]
												.service.name
										: mainSub.addon[customDownload][0]
												.service.name
								}}
							</p>
							<p>
								{{
									total(
										customDownload,
										"plan",
										"serviceOverAllUsageByMetric"
									) +
									total(
										customDownload,
										"addon",
										"serviceOverAllExceptOverUsageByMetric"
									)
								}}
							</p>
							<p>
								{{
									total(
										customDownload,
										"plan",
										"serviceOverAllUsage"
									) +
									total(
										customDownload,
										"addon",
										"serviceOverAllUsage"
									)
								}}
							</p>
						</div> -->
					</div>
				</div>
			</div>
			<div
				class="usages-main-container"
				v-if="
					false &&
					mainSub &&
					!(
						user &&
						user.ipInfo &&
						(user.ipInfo.country == 'IN' ||
							user.ipInfo.country == 'CA')
					) &&
					user &&
					user.accountExtraInfo &&
					user.accountExtraInfo.userCategory == 'Interior Designer'
				"
			>
				<div class="usage-head">
					<h2>{{ $t("plansNew.coins") }}</h2>
					<div
						class="addon-buy"
						v-if="currentBilling.name === 'free trial'"
					>
						<button @click="openFoyrCoinBadges">Earn More</button>
					</div>
				</div>
				<div class="service-usage-container">
					<div class="service-usage">
						<div class="plans-addons">
							<p>{{ $t("plansNew.totalCoinsEarned") }}</p>
							<p>
								{{
									foyrCoins.totalEarnedCoins *
									foyrCoins.coinValue
								}}
							</p>
						</div>
						<div
							class="sub-head-color coins"
							style="margin-bottom: 0.3rem"
						>
							<p>{{ $t("plansNew.coinsRemaining") }}</p>
							<p>
								{{ foyrCoins.availableCoin || "0" }}
							</p>
						</div>
						<div class="sub-head-color coins">
							<p>{{ $t("plansNew.coinsRedeemed") }}</p>
							<p>
								{{
									(foyrCoins.totalEarnedCoins || 0) -
									(foyrCoins.availableCoin || 0)
								}}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			v-if="currentBilling === null || isCancelSubUpdating"
			class="main-loading"
		>
			<div class="loading-container">
				<p>{{ $t("infoText.loading") }}</p>
				<div class="loader"></div>
			</div>
		</div>
		<div
			class="no-package"
			v-if="
				currentBilling === undefined &&
				user &&
				user.accountType == 'root' &&
				user.accountInfo.accountCategory == 'REGULAR'
			"
		>
			<svg
				width="69"
				height="72"
				viewBox="0 0 69 72"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0)">
					<path
						d="M51.0445 5.10352C52.6921 5.10352 53.9634 6.54358 53.7446 8.16532L52.0737 20.5864C51.9129 21.7795 50.175 21.7795 50.0143 20.5864L48.3444 8.16532C48.1267 6.54469 49.397 5.10352 51.0445 5.10352Z"
						fill="#E9BEB3"
					/>
					<path
						d="M51.8967 29.0028C53.0307 28.5366 53.5692 27.2464 53.0995 26.1211C52.6297 24.9957 51.3297 24.4613 50.1957 24.9274C49.0617 25.3936 48.5232 26.6838 48.993 27.8092C49.4627 28.9345 50.7627 29.4689 51.8967 29.0028Z"
						fill="#E9BEB3"
					/>
					<path
						d="M51.0445 5.10352C49.397 5.10352 48.1256 6.54358 48.3444 8.16532L48.4013 8.58958C48.7529 8.78787 49.1581 8.90197 49.5912 8.90197C50.9262 8.90197 52.0078 7.82856 52.0078 6.5037C52.0078 6.00633 51.8549 5.5444 51.5937 5.16112C51.4173 5.12456 51.2343 5.10352 51.0445 5.10352Z"
						fill="#F7E3DF"
					/>
					<path
						d="M19.4679 48.9409V42.3477H15.6046H14.9405H11.7414V48.9409C11.7414 50.1694 11.0873 51.306 10.0225 51.9307C4.35989 55.2484 0.88623 61.289 0.88623 67.8147V71.1224H4.53291V67.0304C4.53291 64.3818 5.18031 61.7664 6.46173 59.4423C7.46409 57.6245 8.3459 56.6375 10.8864 55.0513L12.7896 53.7807C14.0888 52.9133 14.8836 51.481 14.9372 49.9346C15.1582 49.9512 15.3803 49.9634 15.6058 49.9634C16.9955 49.9634 18.3081 49.6377 19.4723 49.0617C19.4701 49.0218 19.4679 48.9819 19.4679 48.9409Z"
						fill="#F7E3DF"
					/>
					<path
						d="M15.6046 45.7044C16.1683 45.7044 16.7197 45.649 17.2533 45.5471C14.5521 45.0807 13.0128 43.7703 12.1377 42.4798C11.3664 41.341 10.9936 39.9818 10.9936 38.6104V29.1713C10.9936 24.8312 15.1012 23.1762 18.1887 22.5459C17.3727 22.2933 16.5043 22.1582 15.6046 22.1582C10.8105 22.1582 6.92383 26.0154 6.92383 30.7731V37.0906C6.92383 41.8472 10.8105 45.7044 15.6046 45.7044Z"
						fill="#F7E3DF"
					/>
					<path
						d="M68.0757 27.6186C66.2139 31.4946 60.2968 31.1711 60.2968 31.1711H39.7149C38.5116 31.1711 37.9692 29.6768 38.8967 28.9147C39.1914 28.6721 39.3622 28.3132 39.3622 27.9332V7.00349C39.3622 4.10231 41.3189 2.11169 43.1596 0.879883H41.8547C38.4279 0.879883 35.6497 3.63706 35.6497 7.03783V26.5984L28.5271 33.0986H35.6497H36.9344H61.9098C65.1044 33.0986 67.7353 30.7003 68.0757 27.6186Z"
						fill="#F7E3DF"
					/>
					<path
						d="M0.886275 71.9999H30.3231C30.812 71.9999 31.2094 71.6067 31.2094 71.1204V67.8127C31.2094 61.0078 27.5415 54.6316 21.6378 51.171C20.8465 50.7069 20.3542 49.8517 20.3542 48.9389C20.3542 48.4537 19.9579 48.0594 19.4679 48.0594C18.979 48.0594 18.5816 48.4526 18.5816 48.9389C18.5816 50.4709 19.4076 51.9066 20.7371 52.6853C26.1038 55.8302 29.438 61.627 29.438 67.8116V70.2397H1.77255V67.8116C1.77255 61.6259 5.10669 55.8302 10.4735 52.6853C11.8029 51.9066 12.6289 50.4709 12.6289 48.9389V46.1098C13.5665 46.4155 14.5666 46.5828 15.6058 46.5828C20.8811 46.5828 25.1729 42.3235 25.1729 37.0883V30.7708C25.1729 25.5356 20.8811 21.2764 15.6058 21.2764C10.3306 21.2764 6.03873 25.5356 6.03873 30.7708V37.0883C6.03873 40.6087 7.98094 43.686 10.8574 45.3255V48.94C10.8574 49.8528 10.3652 50.708 9.57378 51.1721C3.66789 54.6327 0 61.0089 0 67.8138V71.1215C0 71.6067 0.396257 71.9999 0.886275 71.9999ZM7.81016 37.0894V30.7719C7.81016 26.5071 11.3073 23.0366 15.6047 23.0366C19.9021 23.0366 23.3992 26.5071 23.3992 30.7719V37.0894C23.3992 41.3542 19.9021 44.8248 15.6047 44.8248C11.3062 44.8248 7.81016 41.3542 7.81016 37.0894Z"
						fill="#333333"
					/>
					<path
						d="M28.526 33.9778H61.9087C65.8188 33.9778 69 30.8207 69 26.9403V7.03749C69 3.15707 65.8188 0 61.9087 0H41.8548C37.9447 0 34.7635 3.15707 34.7635 7.03749V20.7691C34.7635 21.2543 35.1597 21.6486 35.6497 21.6486C36.1386 21.6486 36.536 21.2554 36.536 20.7691V7.03749C36.536 4.12634 38.9225 1.75799 41.8559 1.75799H61.9098C64.8432 1.75799 67.2297 4.12634 67.2297 7.03749V26.9403C67.2297 29.8515 64.8432 32.2198 61.9098 32.2198H30.7987L36.248 27.2472C36.6086 26.9182 36.632 26.3621 36.3005 26.0043C35.969 25.6465 35.4086 25.6232 35.0481 25.9522L27.9255 32.4525C27.6565 32.6973 27.5672 33.0817 27.7 33.4195C27.8329 33.7552 28.161 33.9778 28.526 33.9778Z"
						fill="#333333"
					/>
					<path
						d="M53.7614 5.44756C53.0761 4.66992 52.086 4.22461 51.0446 4.22461C50.0031 4.22461 49.013 4.66992 48.3277 5.44756C47.6423 6.22519 47.3276 7.25761 47.466 8.28227L49.1369 20.7034C49.2687 21.6793 50.0534 22.3606 51.0446 22.3606C52.0369 22.3606 52.8216 21.6793 52.9522 20.7034L54.6231 8.28227C54.7616 7.25761 54.4479 6.22409 53.7614 5.44756ZM52.8673 8.04854L51.1964 20.4697C51.1885 20.5251 51.1785 20.6015 51.0446 20.6015C50.9106 20.6015 50.9006 20.5251 50.8939 20.4697L49.2229 8.04854C49.1526 7.52679 49.3122 7.00172 49.6616 6.60515C50.0109 6.20969 50.5144 5.9826 51.0446 5.9826C51.5748 5.9826 52.0782 6.20969 52.4275 6.60515C52.7769 7.00172 52.9377 7.52679 52.8673 8.04854Z"
						fill="#333333"
					/>
					<path
						d="M47.9359 26.964C47.9359 28.6655 49.3312 30.049 51.0446 30.049C52.7591 30.049 54.1532 28.6644 54.1532 26.964C54.1532 25.2636 52.758 23.8789 51.0446 23.8789C49.3312 23.8778 47.9359 25.2625 47.9359 26.964ZM52.3818 26.964C52.3818 27.6951 51.7824 28.291 51.0446 28.291C50.3068 28.291 49.7073 27.6962 49.7073 26.964C49.7073 26.2318 50.3068 25.6369 51.0446 25.6369C51.7824 25.6369 52.3818 26.2318 52.3818 26.964Z"
						fill="#333333"
					/>
				</g>
				<defs>
					<clipPath id="clip0">
						<rect width="69" height="72" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<div>
				<p></p>
				<p>
					{{ $t("plansNew.notSubscribedForFreeTrail") }}
					<a
						style="color: #d48e8e; text-decoration: none"
						href="mailto:connect@foyr.com"
						>connect@foyr.com</a
					>
				</p>
			</div>
		</div>
		<div
			v-if="
				currentBilling === undefined &&
				user &&
				user.accountType != 'root' &&
				user.accountInfo.accountCategory == 'REGULAR'
			"
		>
			<h1>{{ $t("plansNew.contactYourAdmin") }}</h1>
		</div>
		<div
			class="popup-div package-popup"
			:class="show ? 'showPopUp' : ''"
			v-if="
				currentBilling &&
				user &&
				user.accountInfo.accountCategory == 'REGULAR'
			"
			@click="closePopup"
		>
			<div
				class="popup-container"
				:class="
					currentBilling && future.length == 0
						? ''
						: 'future-plan-container'
				"
				@click.stop
			>
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
				<div v-if="currentBilling && future.length == 0">
					<packageComponent
						:packages="packages"
						:align="'center'"
						:user="user"
						:ppOrigin="'changeplan'"
					/>
				</div>
				<div v-else class="future-plan-taken">
					<p>
						{{ $t("plansNew.planAlreadyChangedText") }}
						<a href="mailto:connect@foyr.com">connect@foyr.com</a>
					</p>
				</div>
			</div>
		</div>
		<div
			class="popup-div"
			@click="closePopup"
			:class="credits ? 'showPopUp' : ''"
			v-if="
				!isUserOnPayAsYouGoPlan &&
				currentBilling &&
				user &&
				user.accountInfo.accountCategory == 'REGULAR'
			"
		>
			<div class="popup-container" @click.stop>
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
				<addonComponent :addon="addon" :user="user" />
			</div>
		</div>
		<div
			class="popup-div"
			:class="cancelSub ? 'showPopUp' : ''"
			v-if="currentBilling"
			@click="closePopup"
		>
			<div
				class="popup-container"
				@click.stop
				:class="
					future.length == 0 && !currentBilling.subscriptionStatus
						? ''
						: 'future-plan-container'
				"
				style="background: white; padding: 3.75rem"
			>
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
				<div
					class="popup-head"
					v-if="
						future.length == 0 && !currentBilling.subscriptionStatus
					"
				>
					<h2>{{ $t("plansNew.reasonForCancellationText") }}</h2>
				</div>
				<div class="popup-details">
					<div
						class="cancel-sub-text"
						v-if="
							(future.length == 0 &&
								!currentBilling.subscriptionStatus) ||
							isChargebee
						"
					>
						<div class="cancel-option-container">
							<p></p>
							<div class="cancel-option-icons-container">
								<div
									class="cancel-optin-icons"
									@click="
										selectedCancelCategory = 'covid19';
										cancelfeedBack = '';
									"
									:class="{
										activeCat:
											selectedCancelCategory == 'covid19',
									}"
								>
									<p>{{ $t("plansNew.covid19") }}</p>
								</div>
								<div
									class="cancel-optin-icons"
									@click="
										selectedCancelCategory = 'cost';
										cancelfeedBack = '';
									"
									:class="{
										activeCat:
											selectedCancelCategory == 'cost',
									}"
								>
									<p>{{ $t("plansNew.tooExpensive") }}</p>
								</div>
								<div
									class="cancel-optin-icons"
									@click="
										selectedCancelCategory = 'dontUse';
										cancelfeedBack = '';
									"
									:class="{
										activeCat:
											selectedCancelCategory == 'dontUse',
									}"
								>
									<p>{{ $t("plansNew.iDontUseItEnough") }}</p>
								</div>
								<div
									class="cancel-optin-icons"
									@click="
										selectedCancelCategory =
											'somethingElse';
										cancelfeedBack = '';
									"
									:class="{
										activeCat:
											selectedCancelCategory ==
											'somethingElse',
									}"
								>
									<p>{{ $t("plansNew.somethingElse") }}</p>
								</div>
							</div>
							<div
								class="cancel-option-text-container"
								v-if="selectedCancelCategory"
							>
								<p
									class="cancel-option-head-tag"
									v-html="
										cancelOptionText[selectedCancelCategory]
											.head
									"
								></p>
								<p
									class="cancel-option-sub-text"
									v-html="
										cancelOptionText[selectedCancelCategory]
											.subText
									"
								></p>
								<input
									type="text"
									name=""
									v-model="cancelfeedBack"
									id=""
									v-if="
										cancelOptionText[selectedCancelCategory]
											.input
									"
									:placeholder="
										cancelOptionText[selectedCancelCategory]
											.input
									"
								/>
								<button
									v-if="
										cancelOptionText[selectedCancelCategory]
											.cta
									"
									@click.stop="
										cancelCta(
											cancelOptionText[
												selectedCancelCategory
											].name,
											true
										)
									"
									class="cancel-option-cta"
								>
									{{
										cancelOptionText[selectedCancelCategory]
											.cta
									}}
								</button>
							</div>
						</div>
					</div>
					<div v-else class="future-plan-taken">
						<p>
							{{ $t("plansNew.planAlreadyChangedText") }}
							<a href="mailto:connect@foyr.com"
								>connect@foyr.com</a
							>
						</p>
					</div>
					<div
						class="invite-button-container"
						v-if="
							(future.length == 0 &&
								!currentBilling.subscriptionStatus) ||
							isChargebee
						"
					>
						<button
							@click="cancelContainer('show')"
							class="cancel-button"
						></button>
						<button
							style="
								color: rgb(128, 127, 127);
								text-transform: none;
								font-size: 1rem;
							"
							:disabled="!selectedCancelCategory"
							:style="{
								cursor: !selectedCancelCategory
									? 'not-allowed'
									: 'pointer',
							}"
							@click.stop="cancelSubs()"
							class="update-address"
						>
							{{ $t("buttonText.iWantToCancelAnyway") }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<div
			class="popup-div"
			:class="showBills ? 'showPopUp' : ''"
			@click="closePopup"
		>
			<div class="popup-container" @click.stop>
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
					<h2 v-if="showBills">
						{{ $t("suggestionText.billingHistory") }}
					</h2>
					<p v-if="showBills">
						{{ $t("suggestionText.billingHistorySubhead") }}
					</p>
				</div>
				<div class="popup-details">
					<div v-if="showBills"></div>
					<table cellspacing="0">
						<tr class="table-heads">
							<th>{{ $t("plansNew.invoiceNo") }}</th>
							<th>{{ $t("plansNew.date") }}</th>
							<th>{{ $t("plansNew.amount") }}</th>
							<th>{{ $t("plansNew.status") }}</th>
							<th>{{ $t("plansNew.download") }}</th>
						</tr>
						<tr
							v-if="showBills && allInvoice && !invoiceLoading"
							class="table-child"
							v-for="invoice in allInvoice"
							:key="invoice.invoice_id"
						>
							<td>{{ invoice.invoice_id }}</td>
							<td>{{ invoice.invoice_date }}</td>
							<td>{{ invoice.total }}</td>
							<td>{{ invoice.status }}</td>
							<td class="download-icon">
								<a
									@click="
										invoiceDownload(
											user.accountId,
											invoice.invoice_id
										)
									"
								>
									<svg
										width="21"
										height="17"
										viewBox="0 0 21 17"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M16.8 7.3L11.9 11.9C11.7 12.1 11.3 12.1 11.1 11.9L6.20001 7.3"
											stroke="#E9BEB3"
											stroke-miterlimit="10"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M11.5 11.9V0.800003"
											stroke="#E9BEB3"
											stroke-miterlimit="10"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M1.40002 10.6V15.9H20.4V10.6"
											stroke="#E9BEB3"
											stroke-miterlimit="10"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</a>
							</td>
						</tr>
						<tr v-if="invoiceLoading">
							<br />
							<span
								style="
									position: relative;
									text-align: center;
									left: 10rem;
								"
								>{{ $t("infoText.loading") }}</span
							>
						</tr>
						<!-- <tr v-if="!allInvoice">{{ $t("infoText.loading") }}</tr> -->
						<tr v-if="!invoiceLoading && allInvoice.length === 0">
							{{
								$t("plansNew.noBillingData")
							}}
						</tr>
					</table>
				</div>
			</div>
		</div>
		<!-- ALREADY HAVE PLANS -->
		<div
			class="popup-div"
			:class="isCantBuy ? 'showPopUp' : ''"
			@click="closePopup"
		>
			<div class="popup-container cant-buy" @click.stop>
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
					<!-- <h2 v-if="showBills">Billing History</h2> -->
				</div>
				<div class="popup-details">
					<div class="cant-buy-alert">
						<p>
							{{ $t("plansNew.planAlreadyChangedText") }}

							<a href="mailto:connect@foyr.com"
								>connect@foyr.com</a
							>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div
			class="popup-div"
			:class="getFreeDemoShow_Desk ? 'showPopUp' : ''"
			@click="outsideClick()"
		>
			<div class="popup-container getDemoContainer" @click.stop>
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
				<!-- Modal content ================> -->
				<iframe
					class="free-demo-iframe"
					width="560"
					height="315"
					:src="freeDemoUrl_Desk"
					frameborder="0"
					allowfullscreen
				></iframe>
			</div>
		</div>
		<cancelSubIndexComponent
			v-if="
				$route &&
				$route.query &&
				$route.query.flow &&
				$route.query.flow === 'cancel-sub'
			"
		/>
		<fullScreenSubScriptionUpdateLoader
			v-show="receivingAddonPaymentLoading"
		/>
		<MessageComponent :changeRight="message" />
		<pauseConfirmPopupComponent
			:openNewCancelFlow="openNewCancelFlow"
			:isContactPause="isContactPause"
		/>
		<blockingLoadingComponent />
		<foyr-coin-badges
			v-if="!!publicConfiguration"
			:show="showFoyrCoinBadges"
			:total-earned="foyrCoins.totalEarnedCoins"
			@close="closeFoyrCoinBadges"
		/>
		<billingPageTypeForm
			:publicConfiguration="publicConfiguration"
			:fetchAccountInfo="fetchAccountInfo"
			:currentSubscription="currentBilling"
		/>
		<cancelPageTypeForm
			v-if="showcancelPageTypeForm"
			:typeformConfiguration="cancelPageTypeFormData"
			:fetchAccountInfo="fetchAccountInfo"
			:currentSubscription="currentBilling"
		/>
		<nonEnCancleConfrimationPopup
			v-if="showNonEnCancelConfrimationPopup"
			:expiryDate="
				currentBilling && dateFormat(currentBilling.nextBilling)
			"
			@on-confrim="handleCancelSubscriptionClick"
			@close-popup="showNonEnCancelConfrimationPopup = false"
			class="popup-div"
		/>
		<buyYearPayMonExp
			v-if="showbuyYearPayMonExp"
			:typeformConfiguration="
				publicConfiguration.typeform.buyYearPayMonExp
			"
			:fetchAccountInfo="fetchAccountInfo"
			:currentSubscription="currentBilling"
			:userName="user.fullName"
		/>

		<payAsYouGoCancelSubscriptionPopup
			v-if="showPayAsYouGoCancelSubscriptionPopup"
			@on-ok="showPayAsYouGoCancelSubscriptionPopup = false"
			@on-cancel="handleCancelSubscriptionClick"
			@close-popup="showPayAsYouGoCancelSubscriptionPopup = false"
			class="popup-div"
		/>

		<div v-if="manageSubscriptionPopup" class="popup-div showPopUp">
			<div
				class="popup-container"
				style="background-color: white"
				@click.stop
			>
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
				<manageSubscription></manageSubscription>
			</div>
		</div>

		<!-- **********************Remove Addon confirmation popup****************** -->
		<div
			class="popup-div change-plan-alert-popup"
			:class="isRemoveAddonConfirmationPopupVisible ? 'showPopUp' : ''"
		>
			<div class="popup-container" @click.stop>
				<div
					class="close-popup"
					@click="isRemoveAddonConfirmationPopupVisible = false"
				>
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
				<div class="cpa-container">
					<div class="content">
						<p class="heading-1">
							{{ $t("plansNew.pleaseReviewChangesConfirmText") }}
						</p>
						<div class="list">
							<span>
								<svg
									width="15"
									height="15"
									viewBox="0 0 18 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z"
										fill="#3A303A"
									/>
									<path
										d="M7.31344 12.3745C7.23941 12.3749 7.16602 12.3607 7.09749 12.3327C7.02896 12.3047 6.96662 12.2635 6.91406 12.2113L4.10156 9.39885L4.89469 8.60572L7.31344 11.0188L13.1016 5.2251L13.8947 6.01822L7.70719 12.2057C7.60333 12.3117 7.46181 12.3724 7.31344 12.3745Z"
										fill="white"
									/>
								</svg>
								<p>
									{{
										$t(
											"plansNew.onSubscriptionaddOnSuspendedText[0]"
										)
									}}
									<b>{{
										selectedAddonToRemove &&
										selectedAddonToRemove.name
											? selectedAddonToRemove.name
											: ""
									}}</b>
									{{
										$t(
											"plansNew.onSubscriptionaddOnSuspendedText[1]"
										)
									}}
								</p>
							</span>
							<span>
								<svg
									width="15"
									height="15"
									viewBox="0 0 18 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z"
										fill="#3A303A"
									/>
									<path
										d="M7.31344 12.3745C7.23941 12.3749 7.16602 12.3607 7.09749 12.3327C7.02896 12.3047 6.96662 12.2635 6.91406 12.2113L4.10156 9.39885L4.89469 8.60572L7.31344 11.0188L13.1016 5.2251L13.8947 6.01822L7.70719 12.2057C7.60333 12.3117 7.46181 12.3724 7.31344 12.3745Z"
										fill="white"
									/>
								</svg>
								<p>
									{{
										$t(
											"plansNew.cancellingMidwayBillingCycleText[0]"
										)
									}}
									<b>{{
										$t(
											"plansNew.cancellingMidwayBillingCycleText[0]"
										)
									}}</b>
									{{
										$t(
											"plansNew.cancellingMidwayBillingCycleText[0]"
										)
									}}
								</p>
							</span>
						</div>
						<svg
							class="text-bg"
							width="330"
							height="119"
							viewBox="0 0 330 119"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M107.35 0.799992V117H85.272L27.338 46.45V117H0.778001V0.799992H23.022L80.79 71.35V0.799992H107.35ZM220.498 72.678C220.498 73.01 220.332 75.334 220 79.65H152.438C153.656 85.1833 156.533 89.5547 161.07 92.764C165.608 95.9733 171.252 97.578 178.002 97.578C182.65 97.578 186.745 96.914 190.286 95.586C193.938 94.1473 197.314 91.934 200.412 88.946L214.19 103.886C205.78 113.514 193.496 118.328 177.338 118.328C167.268 118.328 158.359 116.391 150.612 112.518C142.866 108.534 136.89 103.056 132.684 96.084C128.479 89.112 126.376 81.1993 126.376 72.346C126.376 63.6033 128.424 55.746 132.518 48.774C136.724 41.6913 142.423 36.2133 149.616 32.34C156.92 28.356 165.054 26.364 174.018 26.364C182.761 26.364 190.674 28.2453 197.756 32.008C204.839 35.7707 210.372 41.1933 214.356 48.276C218.451 55.248 220.498 63.382 220.498 72.678ZM174.184 45.952C168.319 45.952 163.394 47.612 159.41 50.932C155.426 54.252 152.992 58.7893 152.106 64.544H196.096C195.211 58.9 192.776 54.418 188.792 51.098C184.808 47.6673 179.939 45.952 174.184 45.952ZM280.235 118.328C270.828 118.328 262.362 116.391 254.837 112.518C247.422 108.534 241.612 103.056 237.407 96.084C233.202 89.112 231.099 81.1993 231.099 72.346C231.099 63.4927 233.202 55.58 237.407 48.608C241.612 41.636 247.422 36.2133 254.837 32.34C262.362 28.356 270.828 26.364 280.235 26.364C289.642 26.364 298.052 28.356 305.467 32.34C312.882 36.2133 318.692 41.636 322.897 48.608C327.102 55.58 329.205 63.4927 329.205 72.346C329.205 81.1993 327.102 89.112 322.897 96.084C318.692 103.056 312.882 108.534 305.467 112.518C298.052 116.391 289.642 118.328 280.235 118.328ZM280.235 97.08C286.875 97.08 292.298 94.8667 296.503 90.44C300.819 85.9027 302.977 79.8713 302.977 72.346C302.977 64.8207 300.819 58.8447 296.503 54.418C292.298 49.8807 286.875 47.612 280.235 47.612C273.595 47.612 268.117 49.8807 263.801 54.418C259.485 58.8447 257.327 64.8207 257.327 72.346C257.327 79.8713 259.485 85.9027 263.801 90.44C268.117 94.8667 273.595 97.08 280.235 97.08Z"
								fill="#3F3F3F"
								fill-opacity="0.1"
							/>
						</svg>
						<svg
							class="bg-pattern"
							width="150"
							height="186"
							viewBox="0 0 189 186"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g opacity="0.1">
								<path
									opacity="0.3"
									d="M149.086 78.084L0.00012207 131.888L149.086 185.692L298.173 131.888L149.086 78.084Z"
									stroke="black"
									stroke-width="2"
									stroke-miterlimit="10"
								/>
								<path
									opacity="0.3"
									d="M149.086 52.2578L0.00012207 106.062L149.086 159.866L298.173 106.062L149.086 52.2578Z"
									stroke="black"
									stroke-width="2"
									stroke-miterlimit="10"
								/>
								<path
									opacity="0.3"
									d="M149.086 26.4321L0.00012207 80.2362L149.086 134.04L298.173 80.2362L149.086 26.4321Z"
									stroke="black"
									stroke-width="2"
									stroke-miterlimit="10"
								/>
								<path
									opacity="0.3"
									d="M149.087 0.605957L0.000366211 54.41L149.087 108.214L298.173 54.41L149.087 0.605957Z"
									stroke="black"
									stroke-width="2"
									stroke-miterlimit="10"
								/>
							</g>
						</svg>
					</div>
					<div class="proceed-btn">
						<button @click="removeAddon(selectedAddonToRemove)">
							{{ $t("buttonText.confirm") }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
	<div v-else>
		<div class="main-loading" v-if="isRedirecting">
			<div class="loading-container">
				<p>{{ $t("plansNew.redirectedToPaymentPageText") }}</p>
				<div class="loader"></div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import packageComponent from "@/components/packages";
import plansNewComponent from "@/components/shared/plans_new";
import addonComponent from "@/components/addon";
import cancelSubIndexComponent from "@/components/shared/cancellation/cancelSubIndex";
import pauseConfirmPopupComponent from "@/components/shared/popups/pauseConfirmPopup";
import blockingLoadingComponent from "@/components/shared/blockingLoading";
import billingPageTypeForm from "@/components/billingPageTypeForm";
import cancelPageTypeForm from "@/components/shared/cancellation/cancelPageTypeForm.vue";
import buyYearPayMonExp from "@/components/shared/cancellation/buyYearPayMonExp.vue";
import nonEnCancleConfrimationPopup from "@/components/shared/popups/nonEnCancelConfirmationPopup.vue";
import payAsYouGoCancelSubscriptionPopup from "@/components/shared/popups/payAsYouGoCancelSubscriptionPopup.vue";
import fullScreenSubScriptionUpdateLoader from "@/components/shared/popups/fullScreenSubScriptionUpdateLoader.vue";
import ScrollObserver from "@/components/shared/scrollObserver.vue";
import CommonUtilities from "../mixins/commonUtilitiesMixin";
import manageSubscription from "@/components/shared/popups/manage-subscriptions/manageSubscription.vue";

export default {
	name: "PlansV2",
	props: {
		packages: Object,
		addon: Object,
		// user:Object
	},
	mixins: [CommonUtilities],
	data() {
		return {
			disablePointerEvents: false,
			showFoyrCoinBadges: false,
			showcancelPageTypeForm: false,
			showbuyYearPayMonExp: false,
			show: undefined,
			credits: false,
			cancelSub: false,
			showBills: false,
			hqRender: "foyr_service_2",
			testRender: "foyr_service_3",
			customDownload: "foyr_service_4",
			manageSubscriptionPopup:false,
			message: {
				value: "",
				error: false,
				global: false,
			},
			invoiceLoading: true,
			allInvoice: {},
			isRedirecting: false,
			selectedCancelCategory: "covid19",
			cancelOptionText: {
				cost: this.$t("plansNew.cancelOptionText.cost"),
				// {
				// 	head: "Wait, we can help you with this one!",
				// 	subText:
				// 		"We understand managing costs can be a challenge. Our Chief Happiness Officer can  brew an exclusive offer to make this easier for you. They say he has a knack of making people happy :)",
				// 	cta: "Yes, send me Happy offers",
				// 	name: "TOO EXPENSIVE",
				// },
				difficulty: this.$t("plansNew.cancelOptionText.difficulty"),
				// {
				// 	head: "Oh Really? We can fix this together",
				// 	subText:
				// 		"Let our product experts help you understand Neo better! Post we speak, it will be easy breezy for you to use Neo - our promise! Schedule a time now using the link below!",
				// 	cta: "Get a personalized session",
				// 	name: "DIFFICULT TO USE",
				// },
				feature: this.$t("plansNew.cancelOptionText.feature"),
				// {
				// 	head: "Wait! There is a high chance we have that feature or its workaround.",
				// 	subText:
				// 		"Give us your feedback below and we will double check to see if we have the functionality you need.",
				// 	input: " ",
				// 	name: "MISSING FEATURE",
				// },
				other: this.$t("plansNew.cancelOptionText.other"),
				// {
				// 	head: `Ouch!`,
				// 	subText:
				// 		"Tell us which product won your heart over Neo, and we will drink to our loss tonight! :(",
				// 	cta: "",
				// 	input: "Enter your feedback here",
				// 	name: "USING OTHER PRODUCT",
				// },
				dontUse: this.$t("plansNew.cancelOptionText.dontUse"),
				// {
				// 	head: `Would you like to consider a 2-month billing pause instead?`,
				// 	subText:
				// 		"If you pause your subscription, your current subscription period will get extended by two months for FREE. You will not be charged anything for this period but you can continue using Neo uninterruptedly. After the 2 month period, your regular billing will resume.",
				// 	cta: "Pause Billing for 2 months",
				// 	input: "",
				// 	name: "I DONT' USE IT ENOUGH",
				// },
				covid19: this.$t("plansNew.cancelOptionText.covid19"),
				// {
				// 	head: `Your next 2 months are on us, Let’s brave this storm together`,
				// 	subText:
				// 		"If your business has been impacted by Covid-19, you can request a FREE 2 month billing pause. You will not be charged anything for this period but you can continue using Neo uninterruptedly. After the 2 month period, your regular billing will resume.",
				// 	cta: "Pause Billing for 2 months",
				// 	input: "",
				// 	name: "COVID19",
				// },
				somethingElse: this.$t(
					"plansNew.cancelOptionText.somethingElse"
				),
				// {
				// 	head: "Tell us more, please?",
				// 	subText:
				// 		"We are all ears and very eager to know what's your reason, do share it below!",
				// 	cta: "",
				// 	input: "Enter your feedback here",
				// 	name: "SOMETHING ELSE",
				// },
			},
			cancelfeedBack: "",
			getFreeDemoShow_Desk: false,
			freeDemoUrl_Desk: "https://calendly.com/foyr-neo-product-demo",
			isCantBuy: false,
			receivingAddonPaymentLoading: false,
			isCancelSubUpdating: false,
			openNewCancelFlow: false,
			isContactPause: false,
			recommendedAddonsDetails: [],
			removeButtonLoaderMap: {},
			isRemoveAddonConfirmationPopupVisible: false,
			selectedAddonToRemove: {},
			cancelPageTypeFormData: {
				showTypeform: true,
				appearAfterMillSec: 1,
				formId: "",
			},
			showNonEnCancelConfrimationPopup: false,
			showPayAsYouGoCancelSubscriptionPopup: false,
			payAsYouGoAddons: false,
		};
	},
	mounted() {
		this.getCoinInfoAPI();
		this.getCreditsInfoAPI();
		this.getTheTourStatus();
		this.getPublicConfiguration();
		if (this.user && this.user.accountId) {
			this.fetchMySubscriptions({ accountId: this.user.accountId });
			this.fetchCurrentSubscription({ accountId: this.user.accountId });
		}
		this.$root.$on("refresh-billing-page", () => {
			this.isCancelSubUpdating = true;
			setTimeout(() => {
				this.fetchPackages({ accountId: this.user.accountId });
				this.fetchMySubscriptions({ accountId: this.user.accountId });
				this.fetchCurrentSubscription({
					accountId: this.user.accountId,
				});
				setTimeout(() => {
					this.isCancelSubUpdating = false;
				}, 1500);
			}, 2000);
		});
		this.$root.$on("addon-payment-update", (_data) => {
			// console.log('Event Called @Addon')
			this.receivingAddonPaymentLoading = _data;
		});
		console.log("addons", this.addon);
		// console.log("Current Billing at plans component", this.currentBilling);
		if (this.$route.query && this.$route.query.hostedpage_id) {
			chmln.show("5d5fcefad388c80ca1b75245");
		}
		this.hqRender =
			window.location.host == "neo.foyr.com" ||
			window.location.host == "neopreprod.foyr.com"
				? "foyr_service_2"
				: "foyr_service_30";
		this.testRender =
			window.location.host == "neo.foyr.com" ||
			window.location.host == "neopreprod.foyr.com"
				? "foyr_service_3"
				: "foyr_service_32";
		this.customDownload =
			window.location.host == "neo.foyr.com" ||
			window.location.host == "neopreprod.foyr.com"
				? "foyr_service_4"
				: "foyr_service_29";
		if (this.$route.query.package && this.$route.query.package == "true")
			this.show = true;
		this.$nextTick(function () {
			console.log("&&&&&&&&API is calling for tour status&&&&");
			setTimeout(() => {
				this.getTheTourStatus().then((response) => {
					if (response && response.subscription_bought_successful) {
						console.log("&&&&&&&&Chmln is calling&&&&");
						//  window.chmln.show('602e790bd3df450013e0e13b')
						//  this.updateTheTourStatus({subscription_bought_successful: false});
					} else {
						console.log("Flag is false");
					}
				});
			}, 2500);
		});
	},
	components: {
		packageComponent,
		addonComponent,
		plansNewComponent,
		cancelSubIndexComponent,
		pauseConfirmPopupComponent,
		blockingLoadingComponent,
		billingPageTypeForm,
		cancelPageTypeForm,
		buyYearPayMonExp,
		nonEnCancleConfrimationPopup,
		payAsYouGoCancelSubscriptionPopup,
		fullScreenSubScriptionUpdateLoader,
		ScrollObserver,
		manageSubscription,
		foyrCoinBadges: () =>
			import(
				/* webpackChunkName: "foyr-coin-badges" */ "@/components/foyrCoinBadges.vue"
			),
	},
	computed: {
		...mapGetters("Billing", [
			"isNeoPaidPlanCancelled",
			"isUserOnUnlimitedRendersPlan",
			"isUserOnPayAsYouGoPlan",
			"totalCreditsAvailable",
			"totalPayAsYouGoCreditsUsed",
		]),
		...mapGetters("Subscriptions", [
			"doesUserHaveAnActiveFloorplanAndElevationReward",
			"payAsYouGoAddonPlan",
		]),
		...mapGetters("User", ["isUserJapanese", "isUserSpanish","isUserUS"]),
		...mapGetters("PayAsYouGo", [
			"payAsYouGoTransactions",
			"payAsYouGoTransactionsPageTracker",
		]),

		...mapState({
			foyrCoins: (state) =>
				state.Subscriptions.foyrCoins || {
					totalEarnedCoins: 0,
					availableCoin: 0,
					coinValue: 1,
				},
			mySubscription: (state) => state.Subscriptions.mySubscription,
			currentBilling: (state) => state.Billing.currentSubscription,
			// allInvoice: state => state.Billing.allInvoice,
			mainSub: (state) => state.Billing.currentSub,
			isTrial: (state) => state.Billing.isTrial,
			isChargebee: (state) => state.Billing.isChargebee,
			future: (state) =>
				state.Subscriptions.mySubscription.filter((item) => {
					return (
						item.activeStatus == "future" && item.type == "package"
					);
				}),
			pausedStatusObj: (state) =>
				state.Subscriptions.mySubscription.filter((item) => {
					return (
						item.activeStatus == "current" &&
						item.chargebee &&
						item.chargebee.status &&
						item.chargebee.status === "paused"
					);
				}),
			neoLitePlanDetails: (state) =>
				state.Subscriptions.mySubscription.filter((item) => {
					return (
						(item.activeStatus == "future" ||
							item.activeStatus == "active") &&
						item.type == "package" &&
						(item.package.id === "neo-light-yearly" ||
							item.package.id === "neo-light-monthly")
					);
				}),
			user: (state) => state.User.user,
			cancelSubState: (state) => state.Subscriptions.cancelSubState,
			fetchAccountInfo: (state) => state.Subscriptions.fetchAccountInfo,
			publicConfiguration: (state) =>
				state.Subscriptions.publicConfiguration,
			isLPU: (state) => state.User.isLPU,
			isLPUPlan: (state) => state.Billing.isLPUPlan,
		}),
		isCancelFlowShow() {
			if (
				this.currentBilling &&
				this.currentBilling.analyticsData &&
				this.currentBilling.analyticsData.analyticsStatus
			) {
				if (
					this.currentBilling.analyticsData.analyticsStatus ===
						"free trial" ||
					this.currentBilling.analyticsData.analyticsStatus ===
						"Trial expired"
				)
					return false;
				else if (
					this.currentBilling.analyticsData.analyticsStatus ===
						"Paid expired" ||
					this.currentBilling.analyticsData.analyticsStatus ===
						"Cancelled"
				) {
					if (
						this.currentBilling.name &&
						(this.currentBilling.name ===
							"premium-feature-free-trial-1" ||
							this.currentBilling.name ===
								"premium feature free trial")
					)
						return false;
					else return true;
				} else return true;
			} else return false;
		},
		filteredRecommendedAddonsDetails() {
			if (
				this.recommendedAddonsDetails &&
				this.recommendedAddonsDetails.length > 0
			) {
				return this.recommendedAddonsDetails.filter(
					(e) =>
						!(
							this
								.doesUserHaveAnActiveFloorplanAndElevationReward &&
							!this.isAddonPartOfPlan(e.addon)
						)
				);
			}
			return [];
		},
		getAvailableRendersText() {
			if (this.isUserOnUnlimitedRendersPlan) {
				return this.$t("plansNew.unlimited");
			}

			return this.mainSub &&
				this.mainSub.overall &&
				this.mainSub.overall.renderCredits &&
				this.mainSub.overall.renderCredits.total
				? this.mainSub.overall.renderCredits.total
				: 0;
		},
	},
	watch: {
		async currentBilling(data) {
			if (this.currentBilling && this.currentBilling.subscription) {
				this.cancelSubPlanOffersAPI({
					subId: this.currentBilling.subscription,
				});
			}

			if (
				this.currentBilling &&
				this.currentBilling.chargebeeSubscriptionData &&
				this.currentBilling.chargebeeSubscriptionData.plan_id
			) {
				const data = await this.fetchPlanDetailsWithAddons({
					id: this.currentBilling.chargebeeSubscriptionData.plan_id,
				});
				if (
					data &&
					data.planDetail &&
					data.planDetail.attached_addons &&
					data.planDetail.attached_addons.length > 0
				) {
					const tempRecommendedAddons =
						data.planDetail.attached_addons
							.filter((e) => e.type == "recommended")
							.map((e) => e.id);
					this.recommendedAddonsDetails = data.addonDetails.filter(
						(e) => tempRecommendedAddons.includes(e.addon.id)
					);
					//   this.removeButtonLoaderMap = this.recommendedAddonsDetails.reduce((acc, cv) => { acc[cv.addon.id] = false; return acc }, {})
					for (const item of this.recommendedAddonsDetails) {
						this.$set(
							this.removeButtonLoaderMap,
							item.addon.id,
							false
						);
					}
				}
			}
		},
	},
	methods: {
		...mapActions({
			cancelSubscription: "Subscriptions/cancel",
			buy: "Subscriptions/buy",
			registerUser: "User/registerUser",
			downloadInvoice: "Billing/downloadInvoice",
			totalInvoiceDetails: "Billing/allInvoices",
			cancelFeedBackApi: "Subscriptions/cancelFeedBack",
			changeBtnClicked: "User/changeBtnClicked",
			fetchMySubscriptions: "Subscriptions/fetchMySubscriptions",
			getCreditsInfoAPI: "Subscriptions/getCreditsInfoAPI",
			cancelSubPlanOffersAPI: "Subscriptions/cancelSubPlanOffersAPI",
			fetchCurrentSubscription: "Billing/fetchCurrentSub",
			fetchPackages: "Subscriptions/fetchAll",
			getTheTourStatus: "Subscriptions/getTheTourStatus",
			updateTheTourStatus: "Subscriptions/updateTourStatus",
			getCoinInfoAPI: "Subscriptions/getCoinInfoAPI",
			getPublicConfiguration: "Subscriptions/getPublicConfiguration",
			fetchAllRecommendedAddons:
				"Subscriptions/fetchAllRecommendedAddons",
			fetchPlanDetailsWithAddons:
				"Subscriptions/fetchPlanDetailsWithAddons",
			insertAddonInPlan: "Subscriptions/insertAddonInPlan",
			removeAddonFromPlan: "Subscriptions/removeAddonFromPlan",
			fetchCreditTransactions: "PayAsYouGo/fetchCreditTransactions",
		}),
		...mapMutations({
			setPayAsYouGoTransactionsPageTracker:
				"PayAsYouGo/setPayAsYouGoTransactionsPageTracker",
		}),
		openFoyrCoinBadges() {
			const vm = this;

			vm.getTheTourStatus().then(() => {
				this.showFoyrCoinBadges = true;
			});

			vm.getCoinInfoAPI();
		},
		closeFoyrCoinBadges() {
			this.showFoyrCoinBadges = false;
		},
		total(service, type, field, field2) {
			if (this.mainSub[type][service])
				return this.mainSub[type][service].reduce((a, b) => {
					if (field2) {
						return a + b[field][field2];
					} else {
						return a + b[field];
					}
				}, 0);
			else return 0;
		},
		outsideClick() {
			if (this.getFreeDemoShow_Desk) this.getFreeDemoShow_Desk = false;
		},
		openManageSubscriptionPopup(){
             this.manageSubscriptionPopup=true
		},
		closePopup() {
			this.show = false;
			this.credits = false;
			this.cancelSub = false;
			this.showBills = false;
			this.selectedCancelCategory = "";
			this.getFreeDemoShow_Desk = false;
			this.cancelfeedBack = "";
			this.isCantBuy = false;
			this.changeBtnClicked(false);
			this.manageSubscriptionPopup=false
		},
		cancelContainer(container) {
			if (container == "show") {
				this.cancelSub = false;
			}
		},
		cancelSubs: function () {
			this.cancelSubscription({
				id: this.currentBilling.subscription,
				accountId: this.user.accountId,
			}).then((res) => {
				this.cancelCta(
					this.cancelOptionText[this.selectedCancelCategory].name,
					false
				);
				this.show = false;
				this.message.error = false;
				this.selectedCancelCategory = "";
				this.message.value = this.$t(
					"plansNew.subscriptionCancelledMessage"
				);
				this.message.global = true;
				this.cancelSub = false;
				setTimeout(() => {
					this.message.global = false;
					this.message.value = "";
				}, 4000);
			});
		},
		handleCancelSubscriptionClick() {
			this.$root.$emit("show-blocking-loading", true);

			this.cancelSubscription({
				id: this.currentBilling.subscription,
				accountId: this.user.accountId,
			}).then((res) => {
				setTimeout(async () => {
					await this.fetchCurrentSubscription({
						accountId: this.user.accountId,
					});
					this.showNonEnCancelConfrimationPopup = false;
					this.$root.$emit("show-blocking-loading", false);
					this.message.value = this.$t(
						"messages.cancelSubscriptionConfrimText"
					);
					this.message.global = true;
					setTimeout(() => {
						this.message.global = false;
						this.message.value = "";
					}, 4000);
				}, 11000);
			});
		},
		invoiceDownload(accountId, invoiceId) {
			this.downloadInvoice({ accountId, invoiceId });
		},
		dateFormat: function (date) {
			let newDate = new Date(date);
			let mlist = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			newDate =
				mlist[newDate.getMonth()] +
				" " +
				newDate.getDate() +
				", " +
				newDate.getFullYear();
			return newDate;
		},
		getAllInvoice: function () {
			this.invoiceLoading = true;
			this.showBills = true;
			this.totalInvoiceDetails({ accountId: this.user.accountId })
				.then((res) => {
					if (res) {
						this.allInvoice = res.data;
						this.invoiceLoading = false;
					}
				})
				.catch((err) => {
					console.log("ERROR WHILE GETTING INVOICE DETAILS", err);
				});
		},
		cancelCta(head, button) {
			let eventTitle = "";
			if (head == "DIFFICULT TO USE" && button) {
				this.getFreeDemoShow_Desk = true;
				// this.eventTitle = 'Notusingenough_pause_clicked'
				this.message.value = this.$t(
					"plansNew.personalizedSessionScheduledMessage"
				);
			}
			if (
				(head == "I DONT' USE IT ENOUGH" || head == "COVID19") &&
				button
			) {
				if (head === "I DONT' USE IT ENOUGH")
					eventTitle = "Notusingenough_pause_clicked";
				else if (head == "COVID19") eventTitle = "Covid_pause_clicked";
				else {
				}
				this.message.value = this.$t(
					"plansNew.yourSubscriptionPausedshortlyMessage"
				);
			} else {
				if (head === "TOO EXPENSIVE") {
					eventTitle = "Expensive_offer_clicked";
				} else {
					eventTitle = "subscriptionCancelled";
				}
				this.message.value = this.$t("plansNew.teamGetInTouchMessage");
			}
			let payload = {
				data: {
					category: head,
					feedback: this.cancelfeedBack,
					button: button,
				},
				accountId: this.user.accountId,
				subId: this.currentBilling.subscription,
			};
			if (window.analytics) {
				analytics.track(
					eventTitle,
					{
						author: this.user.email,
						action: "clicked",
						reason:
							eventTitle === "subscriptionCancelled"
								? this.cancelfeedBack
								: head,
					},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
			this.cancelFeedBackApi(payload).then((res) => {
				if (button && head != "DIFFICULT TO USE") {
					this.message.error = false;
					this.message.global = true;
				}
				this.cancelSub = false;
				this.selectedCancelCategory = "";
				setTimeout(() => {
					this.message.global = false;
					this.message.value = "";
				}, 4000);
			});
		},
		upgradeClicked() {
			this.show = true;
			this.changeBtnClicked(true);
		},
		cancelSubClicked() {
			if (
				this.currentBilling &&
				this.currentBilling.subscriptionStatus &&
				this.currentBilling.subscriptionStatus === "cancled"
			) {
				this.isCantBuy = true;
				return;
			}
			this.cancelSub = true;
			this.selectedCancelCategory = "covid19";
			if (window.analytics) {
				analytics.track(
					"Cancel_flow_opened",
					{
						author: this.user.email,
						action: "open",
					},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
		},
		onClickCancel() {
			//  disable cancel button for 1second
			this.disablePointerEvents = true;

			setTimeout(() => {
				this.disablePointerEvents = false;
			}, 1000);

			if (this.isUserJapanese || this.isUserSpanish) {
				this.showNonEnCancelConfrimationPopup = true;
				return;
			}
			if (this.isUserOnPayAsYouGoPlan) {
				this.showPayAsYouGoCancelSubscriptionPopup = true;
				return;
			}

			// if (
			// 	this.currentBilling &&
			// 	this.currentBilling.subscriptionStatus &&
			// 	this.currentBilling.subscriptionStatus === "cancled"
			// ) {
			// 	this.isCantBuy = true;
			// 	return;
			// }

			// if (
			// 	this.fetchAccountInfo &&
			// 	this.fetchAccountInfo.typeform &&
			// 	(
			// 		( this.fetchAccountInfo.typeform.isExtendSubscription && this.fetchAccountInfo.typeform.isExtendSubscription.typeformShown)  ||
			// 		( this.fetchAccountInfo.typeform.isCancelSubscription && this.fetchAccountInfo.typeform.isCancelSubscription.typeformShown)
			// 	)
			// ) {
			// 	// console.log("asdasdasdasd2")
			// 	this.isContactPause = true
			// 	return;
			// }

			let P1PlanList = [
				"neo-basic-quarterly-inr",
				"neo-standard-monthly-inr",
				"neo-basic-monthly-inr",
				"neo-pro-quarterly",
				"neo-premium-quarterly",
				"neo-premium-quarterly-cad",
				"neo-pro-monthly",
				"foyr-premium-quarterly-stg",
				"neo-standard-quarterly",
				"neo-standard-quarterly-cad",
				"neo-premium-monthly",
				"neo-premium-monthly-cad",
				"neo-basic-quarterly",
				"neo-basic-quarterly-cad",
				"foyr-premium-monthly-stg",
				"neo-standard-monthly",
				"neo-standard-monthly-cad",
				"foyr-basic-quarterly-stg",
				"neo-basic-monthly",
				"foyr-standard-monthly",
				"neo-basic-monthly-cad",
				"foyr-basic-monthly-stg",
				"neo-premium-monthly-inr",
				"neo-basic-monthly-inr-low",
				"neo-standard-monthly-inr-low",
				"neo-premium-monthly-inr-low",
			];
			let P2PlanList = [
				"neo-premium-yearly-inr",
				"neo-standard-yearly-inr",
				"neo-basic-yearly-inr",
				"neo-pro-yearly",
				"neo-pro-half-yearly",
				"neo-premium-yearly-cad---1",
				"neo-premium-yearly",
				"neo-premium-half-yearly",
				"foyr-premium-yearly-stg",
				"neo-standard-half-yearly",
				"neo-standard-yearly",
				"neo-standard-yearly-cad",
				"neo-basic-yearly",
				"neo-basic-yearly-cad",
				"foyr-standard-yearly-stg",
				"foyr-basic-yearly-stg",
				"neo-basic-half-yearly",
				"neo-basic-yearly-inr-low",
				"neo-standard-yearly-inr-low",
				"neo-premium-yearly-inr-low",
			];
			let P3PlanList = [
				"neo-light-yearly-inr",
				"neo-standard-lite-monthly-inr",
				"neo-light-monthly-inr",
				"foyr-neo-lite-monthly-INR",
				"neo-standard-lite-yearly-stg",
				"neo-standard-lite-yearly-cad",
				"neo-light-yearly",
				"neo-light-yearly-cad",
				"neo-lite-yearly",
				"neo-premium-basic-plan-staging",
				"neo-retention-monthly-cad",
				"neo-retention-monthly-stg",
				"neo-standard-lite-monthly-cad",
				"neo-standard-annual-plan",
				"neo-light-monthly",
				"neo-light-monthly-cad",
				"neo-lite-monthly",
				"neo-lite-monthly-cad",
				"foyr-neo-lite-monthly",
				"foyr-neo-lite-monthly-CAD",
				"neo-ultra-lite-monthly",
			];

			if (
				this.cancelSubState.discountOfferApi &&
				this.cancelSubState.discountOfferApi.isPauseApplied
			) {
				if (
					this.currentBilling &&
					this.currentBilling.chargebeeSubscriptionData &&
					this.currentBilling.chargebeeSubscriptionData.plan_id &&
					P1PlanList.includes(
						this.currentBilling.chargebeeSubscriptionData.plan_id
					)
				) {
					this.showcancelPageTypeForm = true;
					this.cancelPageTypeFormData.formId = "DwA8YLbU";
					setTimeout(() => {
						this.showcancelPageTypeForm = false;
					}, 2000);
					return;
				}
				if (
					this.currentBilling &&
					this.currentBilling.chargebeeSubscriptionData &&
					this.currentBilling.chargebeeSubscriptionData.plan_id &&
					P2PlanList.includes(
						this.currentBilling.chargebeeSubscriptionData.plan_id
					)
				) {
					this.showcancelPageTypeForm = true;
					this.cancelPageTypeFormData.formId = "DJ6huWCi";
					setTimeout(() => {
						this.showcancelPageTypeForm = false;
					}, 2000);
					return;
				}

				this.showcancelPageTypeForm = true;
				this.cancelPageTypeFormData.formId = "xPwBybxL";
				setTimeout(() => {
					this.showcancelPageTypeForm = false;
				}, 2000);
				return;
			} else {
				this.$router.push({
					path: "/settings/plans",
					query: { flow: "cancel-sub", type: "cs-home", page: 1 },
				});
			}

			if (
				this.publicConfiguration &&
				this.publicConfiguration.typeform &&
				this.publicConfiguration.typeform.buyYearPayMonExp &&
				this.publicConfiguration.typeform.buyYearPayMonExp
					.showTypeform &&
				this.currentBilling &&
				this.currentBilling.name === "neo standard annual plan"
			) {
				let isBuyYearPayMonExpTypeFormShown =
					this.fetchAccountInfo &&
					this.fetchAccountInfo.typeform &&
					this.fetchAccountInfo.typeform.buyYearPayMonExp &&
					this.fetchAccountInfo.typeform.buyYearPayMonExp
						.typeformShown
						? true
						: false;

				if (!isBuyYearPayMonExpTypeFormShown) {
					this.showbuyYearPayMonExp = true;
					setTimeout(() => {
						this.showbuyYearPayMonExp = false;
					}, 2000);
					return;
				}
			}

			if (
				this.currentBilling &&
				this.currentBilling.invoice.period == 1 &&
				this.currentBilling.status != "in_trial" &&
				this.user.accountExtraInfo &&
				this.user.accountExtraInfo.userCategory ==
					"Interior Designer" &&
				this.user.ipInfo.country == "US" &&
				this.cancelSubState.discountOfferApi &&
				this.cancelSubState.discountOfferApi.isPauseApplied &&
				this.publicConfiguration.typeform.cancelPage
			) {
				console.log("typeform");
				let isCancelTypeformShown =
					this.fetchAccountInfo &&
					this.fetchAccountInfo.typeform &&
					this.fetchAccountInfo.typeform.cancelPage &&
					this.fetchAccountInfo.typeform.cancelPage.typeformShown
						? true
						: false;
				// if cancellation typeform is already shown - don't show it again
				if (!isCancelTypeformShown) {
					this.showcancelPageTypeForm = true;
					setTimeout(() => {
						this.showcancelPageTypeForm = false;
					}, 2000);
					return;
				}
			}
			// show pause subscription screen for lower plan users
			// if (this.isLPUPlan) {
			//   this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-cancel', page: 1}})
			//   return;
			// }
			if (
				this.currentBilling &&
				this.currentBilling.analyticsData &&
				this.currentBilling.analyticsData.analyticsStatus
			) {
				if (
					this.user &&
					this.user.subInfo &&
					this.user.subInfo.cancel_popup
				) {
					if (
						this.cancelSubState.discountOfferApi &&
						this.cancelSubState.discountOfferApi.isPauseApplied
					) {
						if (
							this.currentBilling.analyticsData
								.analyticsStatus === "paid"
						)
							this.$router.push({
								path: "/settings/plans",
								query: {
									flow: "cancel-sub",
									type: "cs-cancel",
									page: 1,
								},
							});
						else this.isContactPause = true;
					} else this.openNewCancelFlow = true;
				} else {
					if (window.analytics) {
						window.analytics.track(
							"Cancel_button",
							{
								name: "Cancel subscription",
								flow: "Cancellation",
							},
							{
								integrations: {
									Amplitude: {
										session_id: new Date().getTime(),
									},
								},
							},
							{ timestamp: new Date().getTime() }
						);
					}
					if (
						(this.cancelSubState.discountOfferApi &&
							this.cancelSubState.discountOfferApi
								.isPauseApplied) ||
						(this.currentBilling &&
							this.currentBilling.status &&
							this.currentBilling.status === "in_trial") ||
						this.currentBilling.analyticsData.analyticsStatus ===
							"paywall_intrial" ||
						(this.fetchAccountInfo &&
							this.fetchAccountInfo.hasOwnProperty(
								"disableCancellationFlow"
							) &&
							this.fetchAccountInfo.disableCancellationFlow)
					) {
						this.$router.push({
							path: "/settings/plans",
							query: {
								flow: "cancel-sub",
								type: "cs-cancel",
								page: 1,
							},
						});
					} else
						this.$router.push({
							path: "/settings/plans",
							query: {
								flow: "cancel-sub",
								type: "cs-home",
								page: 1,
							},
						});
				}
			} else {
			}
		},
		handleAddAddonButtonClick(addon) {
			this.isRedirecting = true;
			this.credits = false;
			this.insertAddonInPlan({
				id: this.currentBilling.chargebeeSubscriptionData.id,
				plan_id: this.currentBilling.chargebeeSubscriptionData.plan_id,
				addons: [{ id: addon.id }],
			}).then((res) => {
				this.isRedirecting = false;
				this.packageId = "";
				let chargebeeInstance = Chargebee.getInstance();
				if (this.isChargebee) {
					chargebeeInstance.openCheckout({
						hostedPage: function () {
							return new Promise(function (resolve, reject) {
								resolve(res.data.hosted_page);
							});
						},
						success: function (hostedPageId) {
							window.$nuxt.$emit("bill-update-request", {
								payment: true,
							});
						},
						error: function (err) {
							console.log(err);
						},
						close: function () {
							window.$nuxt.$emit("payment-popup-close", {
								type: "addon",
								waitingTime: 8000,
							});
							// Optional
							// will be called when the user closes the checkout modal box
						},
					});
				} else window.open(res.hostedPage.url);

				if (window.analytics) {
					window.analytics.track(
						"Buy_export_FP",
						{
							action: "click",
							event_category: "Add On",
							author: this.user.email,
						},
						{
							integrations: {
								Amplitude: { session_id: new Date().getTime() },
							},
						},
						{ timestamp: new Date().getTime() }
					);
				}
			});
		},
		handleRemoveAddonButtonClick(addon) {
			this.isRemoveAddonConfirmationPopupVisible = true;
			this.selectedAddonToRemove = addon;
		},
		removeAddon(addon) {
			this.isRemoveAddonConfirmationPopupVisible = false;
			this.removeButtonLoaderMap[addon.id] = true;
			this.removeAddonFromPlan({
				id: this.currentBilling.chargebeeSubscriptionData.id,
				plan_id: this.currentBilling.chargebeeSubscriptionData.plan_id,
				addons: [addon.id],
			}).then((res) => {
				this.fetchCurrentSubscription({
					accountId: this.user.accountId,
				}).finally(() => {
					this.removeButtonLoaderMap[addon.id] = false;
				});
			});
		},
		isPackageNeoStandard(_packageName) {
			if (_packageName === "Neo Standard") return true;
			return false;
		},
		isPackageNeoBasic(_packageName) {
			if (_packageName === "Neo Basic") return true;
			return false;
		},
		isPackageNeoPremium(_packageName) {
			if (_packageName === "Neo Premium") return true;
			return false;
		},
		isAddonPartOfPlan(addon) {
			if (
				this.currentBilling &&
				this.currentBilling.chargebeeSubscriptionData &&
				this.currentBilling.chargebeeSubscriptionData.addons
			) {
				// write logic to check if any of the recommended addons are a part of the charebee data addon
				return this.currentBilling.chargebeeSubscriptionData.addons.find(
					(e) => e.id == addon.id
				);
			}

			return false;
		},
		loadMoreTransactions() {
			this.setPayAsYouGoTransactionsPageTracker(
				this.payAsYouGoTransactionsPageTracker + 1
			);
			this.fetchCreditTransactions({
				page: this.payAsYouGoTransactionsPageTracker,
			});
		},
		handlePayAsYouGoAddonBuy() {
			this.payAsYouGoAddons = true;
			this.sendEventToSegment("Buy more credits clicked");
		},
		closePayAsYouGoAddonBuyPopup() {
			this.payAsYouGoAddons = false;
		},
		sendEventToSegment(_eventName) {
			if (window.analytics) {
				window.analytics.track(
					_eventName,
					{
						title: _eventName,
					},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
		},
		handlePayAsYouGoChangePlans() {
			this.$router.push({ path: this.localePath("/settings/plans_new") });
		},
		handleSeePlanDetails() {
			window.open(
				window.location.origin + this.localePath("/pay-as-you-go"),
				"_blank"
			);
		},
	},
};
</script>
<style lang="scss" scoped>
@mixin button-black {
	color: #e9beb3;
	padding: 0.5rem 1rem;
	cursor: pointer;
	background: #222021;
}
@mixin head-main {
	font-size: 1.5rem;
	color: #000000;
	font-weight: 400;
}
.cancel-sub-text {
	padding: 2rem 0;
	p {
		font-size: 1rem;
		// max-width: 70%;
		text-align: center;
		margin: auto;
		color: white;
	}
}
section {
	padding: 0;
	width: calc(100% - 7.5rem);
	margin: 0 auto;
	margin-top: 4rem;
	@include respond(phone) {
		// width < 900px?
		width: 100%;
	}
	.plans-bg-pattern {
		position: absolute;
		opacity: 0.08;
		right: 0;
		top: 1rem;
		z-index: 0;
		// height: 25rem;
		// padding-left: 46rem;
	}
	.download-icon {
		a {
			cursor: pointer;
		}
	}
	p {
		color: #222021;
		font-size: 1rem;
		line-height: 1.125rem;
		margin-bottom: 0.5rem;
	}
	span {
		font-size: 0.8125rem;
		line-height: 1rem;
		color: #868686;
	}
	.plan-head-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: $background-7;
		padding: 2.125rem 2.5rem;
		border: 1px solid $border-1;
		border-radius: 2px;

		h2 {
			// @include head-main;
			font-family: $main-font;
			font-style: normal;
			font-weight: 700;
			font-size: 2.5rem;
			line-height: 2.75rem;
			color: $plan-title;
		}

		.plan-sub-title {
			font-family: $main-font;
			font-style: normal;
			font-weight: 500;
			font-size: 0.875rem;
			line-height: 1.125rem;
			color: $plan-title;
			margin-top: 0.5rem;
		}

		div:last-child {
			align-self: flex-end;
		}

		.pay-as-you-go-title {
			color: $plan-title;

			.label {
				font-size: 0.75rem * 1.22;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				margin-bottom: 0.4375rem * 1.22;

				@include custom-min(120em) {
					font-size: 0.75rem;
					margin-bottom: 0.4375rem;
				}
			}

			.plan-name {
				font-size: 1.625rem * 1.22;
				font-weight: 600;
				line-height: 146.338%;

				@include custom-min(120em) {
					font-size: 1.625rem;
				}
			}
		}
		.billing-history-button {
			color: $color-dark-gray-3;
			text-align: right;
			font-size: 1rem;
			font-weight: 600;
			line-height: normal;
			text-decoration-line: underline;
			cursor: pointer;
		}
	}
	.pay-as-you-go-wrapper {
		margin-bottom: 0.5rem * 1.22;
		padding: 1.25rem * 1.22;

		@include custom-min(120em) {
			margin-bottom: 0.5rem;
			padding: 1.25rem;
		}

		.plan-and-billing-details-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 0.25rem;
			align-self: center !important;

			.change-plan-button {
				background: $background-10;
				display: flex;
				padding: 0.75rem * 1.22 1.25rem * 1.22;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				min-width: 9.375rem * 1.22;

				color: $color-black-2;
				font-size: 0.875rem * 1.22;
				font-style: normal;
				font-weight: 700;
				line-height: 128.023%;
				align-self: center;

				@include custom-min(120em) {
					padding: 0.75rem 1.25rem;
					min-width: 9.375rem;
				}
			}

			.plan-expiry-details {
				font-family: "Montserrat";
				font-style: normal;
				font-weight: 600;
				font-size: 0.75rem;
				line-height: 0.9375rem;
				color: rgba(98, 75, 75, 0.7);
			}
		}
	}

	.pay-as-you-go-used-credits-wrapper {
		border-radius: 2px;
		border: 1px solid rgba(0, 0, 0, 0.15);
		background: rgba(232, 232, 232, 0.2);
		margin-top: 1.25rem * 1.22;
		padding: 1.25rem * 1.22 1.5rem * 1.22;

		@include custom-min(120em) {
			margin-top: 1.25rem;
			padding: 1.25rem 1.5rem;
		}

		.credits-details-and-buy-more {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.header {
				color: $color-dark-gray-2;
				font-size: 1rem * 1.22;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				margin-bottom: 0.4375rem * 1.22;

				@include custom-min(120em) {
					font-size: 1rem;
					margin-bottom: 0.4375rem;
				}
			}

			.available-credits {
				color: $color-dark-gray;
				font-size: 1.25rem * 1.22;
				font-style: normal;
				font-weight: 700;
				line-height: 128%;
				margin-bottom: 0.4375rem * 1.22;
				border-bottom: 1px solid $background-21;

				@include custom-min(120em) {
					font-size: 1.25rem;
					margin-bottom: 0.4375rem;
				}
			}
			.used-credits {
				color: $color-light-gray-9;
				font-style: normal;
				font-weight: 600;
				font-size: 0.875rem * 1.22;
				line-height: normal;

				@include custom-min(120em) {
					font-size: 0.875rem;
				}

				b {
					color: $color-dark-gray;
				}
			}

			.buy-more-button {
				color: $color-second;
				font-size: 0.875rem * 1.22;
				font-style: normal;
				font-weight: 700;
				line-height: 128.023%;
				text-transform: uppercase;
				padding: 0.75rem * 1.22 1.25rem * 1.22;
				background: $background-black-1;
				cursor: pointer;
				min-width: 8.6563rem * 1.22;

				@include custom-min(120em) {
					font-size: 0.875rem;
					padding: 0.75rem 1.25rem;
					min-width: 8.6563rem;
				}
			}
		}
	}

	.plan-details-link {
		cursor: pointer;
		color: $color-light-gray-2;
		font-size: 0.875rem * 1.22;
		font-style: italic;
		font-weight: 500;
		line-height: 142.857%;
		text-decoration-line: underline;
		margin-top: 0.5rem * 1.22;
		width: 100%;
		text-align: right;

		@include custom-min(120em) {
			font-size: 0.875rem;
			margin-top: 0.5rem;
		}
	}

	.pay-as-you-go-credit-transactions-wrapper {
		border-radius: 2px;
		margin-top: 1.5rem * 1.22;
		margin-bottom: 1.25rem * 1.22;
		border-radius: 2px;
		border: 1px solid rgba(0, 0, 0, 0.15);
		overflow: hidden;

		@include custom-min(120em) {
			margin-top: 1.5rem;
		}

		.section-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 1.25rem * 1.22 2rem * 1.22;
			border-bottom: 1px solid rgba(0, 0, 0, 0.15);
			background: $background-22;

			@include custom-min(120em) {
				padding: 1.25rem 2rem;
			}

			.text {
				color: $color-light-gray-2;
				font-size: 1rem * 1.22;
				font-style: normal;
				font-weight: 600;
				line-height: 150%;

				@include custom-min(120em) {
					font-size: 1rem;
				}
			}

			.billing-history-button {
				color: $color-dark-gray-3;
				text-align: right;
				font-size: 0.875rem * 1.22;
				font-weight: 600;
				line-height: normal;
				text-decoration-line: underline;
				cursor: pointer;

				@include custom-min(120em) {
					font-size: 0.875rem;
				}
			}
		}

		.transactions-wrapper {
			padding: 0 2rem * 1.22 1rem * 1.22;
			max-height: 19.125rem * 1.22;
			overflow: auto;
			display: flex;
			flex-direction: column;

			@include custom-min(120em) {
				padding: 0 2rem 1rem;
			}

			.transaction {
				display: grid;
				grid-template-columns: max-content 1fr max-content;
				gap: 0 1.3125rem * 1.22;
				padding: 1.4375rem * 1.22 0;

				@include custom-min(120em) {
					gap: 0 1.3125rem;
					padding: 1.4375rem 0;
				}

				&:not(:last-child) {
					border-bottom: 1px solid $border-19;
				}

				svg {
					width: 1.5rem * 1.22;
					height: 1.5rem * 1.22;

					@include custom-min(120em) {
						width: 1.5rem;
						height: 1.5rem;
					}
				}

				.narration {
					color: $color-dark-gray-2;
					font-size: 1rem * 1.22;
					font-style: normal;
					font-weight: 500;
					line-height: normal;

					@include custom-min(120em) {
						font-size: 1rem;
					}
				}

				.a-go-info {
					color: $color-light-gray-9;
					font-size: 0.75rem * 1.22;
					font-style: normal;
					font-weight: 700;
					line-height: 166.667%;

					@include custom-min(120em) {
						font-size: 0.75rem;
					}
				}
			}
		}
	}

	.section-cta-and-plan-expiry-info {
		text-align: right;
		.change-plan {
			position: relative;
		}

		button {
			@include button-black;
			padding: 0.875rem 2.5rem;
			font-weight: 700;
			font-size: 1rem;
			line-height: 1.25rem;
			text-transform: uppercase;
		}

		.button:disabled {
			cursor: no-drop;
		}

		.future-plan {
			margin-top: 1rem;
			font-family: "Montserrat";
			font-style: normal;
			font-weight: 600;
			font-size: 0.75rem;
			line-height: 0.9375rem;
			color: rgba(98, 75, 75, 0.7);
			span {
				color: #222021;
			}
		}
	}

	.cancel-sub-container {
		margin-top: 1rem;
		text-align: right;
		position: relative;
		margin-left: auto;
		cursor: pointer;

		font-family: $main-font;
		font-style: normal;
		font-weight: 500;
		font-size: 0.9375rem;
		line-height: 1.125rem;
		color: $plan-subtitle;

		a {
			text-decoration: none;
		}
	}

	.billing-info-container {
		margin-top: 2.125rem;
		padding-bottom: 1.125rem;
		margin-bottom: 2.1875rem;
		padding: 2.125rem 2.5rem;
		background: $color-white;
		border: 1px solid rgba(0, 0, 0, 0.15);
		box-sizing: border-box;
		border-radius: 2px;

		.billing-info-head {
			display: flex;
			justify-content: space-between;
			margin-bottom: 0.375rem;
			padding-bottom: 1.5rem;
			border-bottom: 1px dashed rgba(41, 41, 41, 0.5);

			p {
				margin: 0;
				padding: 0;
				font-family: $main-font;
				font-style: normal;
				&:last-child {
					cursor: pointer;
				}
			}

			.main-heading {
				font-weight: 600;
				font-size: 1.5rem;
				line-height: 2rem;
				color: $plan-title;
			}

			.billing-history-button {
				font-weight: 500;
				font-size: 0.875rem;
				line-height: 1.125rem;
				color: #d19b8c;
			}
		}

		.billing-details {
			display: flex;
			margin-top: 1.5rem;
			justify-content: space-between;
			div {
				flex-direction: column;
				align-items: flex-start;
				// flex-basis: 25%;
				flex-shrink: 0;

				span {
					font-family: "Montserrat";
					font-style: normal;
					font-weight: 400;
					font-size: 0.875rem;
					line-height: 1.5rem;
					color: $plan-subtitle;
				}
				p {
					margin-top: 0.25rem;
					font-family: "Montserrat";
					font-style: normal;
					font-weight: 600;
					font-size: 1rem;
					line-height: 1.5rem;
					letter-spacing: -0.02em;
					color: $plan-title;
				}
			}
		}
	}

	.recommended-addons {
		flex-direction: column;
		// this is to manage the billing-details style that is messing with all the divs in this section
		div {
			flex-direction: row !important;
		}
	}

	.usages-main-container {
		margin-bottom: 2.1875rem;
		padding: 2.75rem 2.5rem;
		border: 1px solid rgba(0, 0, 0, 0.15);
		box-sizing: border-box;
		border-radius: 2px;

		.usage-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 1.5rem;
			border-bottom: 1px dashed rgba(41, 41, 41, 0.5);
			margin-bottom: 1.5rem;

			h2 {
				@include head-main;
				font-family: $main-font;
				font-style: normal;
				font-weight: 600;
				font-size: 1.25rem;
				line-height: 2rem;
				color: $plan-title;
			}
			button {
				@include button-black;
				padding: 0.875rem 2.5rem;
				font-weight: 700;
				font-size: 1rem;
				line-height: 1.25rem;
				text-transform: uppercase;
			}

			.addon-buy {
				position: relative;
				// &:hover{
				//   .hover-disable-text{
				//     display: block;
				//   }
				// }
			}
		}

		.service-usage-container {
			display: flex;
			flex-direction: column;

			.service-usage {
				// div {
				//   display: grid;
				//   grid-template-columns: 50% 50%;
				// }
				.sub-head {
					font-family: "Montserrat";
					font-style: normal;
					font-weight: 600;
					font-size: 1rem;
					line-height: 1.25rem;
					color: #2d2d2d;
				}
				.sub-head-color {
					p {
						color: #d48e8e;
						margin-bottom: 0.25rem;
					}
					border-bottom: 1px solid #e8e8e8;
					margin-bottom: 0.75rem;

					&.coins {
						border: none;
					}
				}
				.sub-2-head-color {
					background: rgba(244, 242, 241, 0.6);
					padding: 0.5rem 0.875rem 0 0.875rem;
					flex-basis: 33%;
					p {
						font-family: $main-font;
						font-style: normal;
						font-weight: 700;
						font-size: 0.6875rem;
						line-height: 1rem;
						text-transform: uppercase;
						color: $plan-subtitle;
					}
					p:not(:first-child) {
						text-align: center;
					}
				}

				.credit-summary {
					font-family: $main-font;
					font-style: normal;
					font-size: 0.875rem;
					line-height: 1.0625rem;
					display: flex;
					justify-content: space-between;

					.available {
						font-weight: 600;
						color: $plan-subtitle;
					}

					.used {
						position: relative;
						font-weight: 600;
						color: #d46161;
						cursor: pointer;

						&.muted {
							cursor: default;
							color: #d19b8c;
						}

						&:hover {
							.useage-split {
								display: block;
							}
						}
					}

					.unit {
						font-weight: 600;
						font-size: 1rem;
						line-height: 1.25rem;
						color: $plan-subtitle;
					}

					.useage-split {
						display: none;
						position: absolute;
						left: 75%;
						top: 0;
						min-width: 300px;
						background: #ffffff;
						box-shadow: 0px 1px 2px rgba(20, 24, 47, 0.12),
							0px 2px 4px rgba(20, 24, 47, 0.1),
							0px 4px 8px rgba(20, 24, 47, 0.1),
							0px 12px 16px rgba(20, 24, 47, 0.12),
							0px 16px 32px rgba(20, 24, 47, 0.24);
						border-radius: 4px;
						z-index: 1;
					}
				}
				.three-colum {
					display: flex;
					justify-content: space-between;
				}
				.per-service-data {
					text-align: center;
					flex-basis: 33%;
					flex-shrink: 0;
					padding: 0 0.875rem 0.5rem 0.875rem;

					p {
						width: 100%;
					}
				}
			}
		}
	}

	.change-plan-alert-popup {
		// background: red;
		.popup-container {
			// height: 60vh;
			max-width: 60vw;
			padding: 0 !important;
			background: #ffab40 !important;
			.close-popup {
				right: -2.5rem;
				svg {
					border-radius: 50%;
					path {
						fill: white;
					}
				}
			}
			.cpa-container {
				color: #807f7f;
				display: grid;
				grid-template-rows: 1fr max-content;
				background: #fbf3f1;
				margin-top: 0.3rem;
				.content {
					width: 100%;
					position: relative;
					padding: 3rem 7rem 10rem 7rem;
					.text-bg,
					.bg-pattern {
						position: absolute;
					}
					.text-bg {
						margin-top: 3rem;
						bottom: -1rem;
						left: 0;
						width: 19rem;
					}
					.bg-pattern {
						right: 0;
						bottom: -8rem;
					}
					.heading-1 {
						font-family: Montserrat;
						font-weight: bold;
						font-size: 1.68rem;
						line-height: 1.82rem;
						color: #292929;
						text-align: center;
					}
					.list {
						display: grid;
						row-gap: 1.5rem;
						padding: 2rem;
						background: #fbf3f1;
						box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
						span {
							display: grid;
							grid-template-columns: max-content 1fr;
							column-gap: 1rem;
							align-items: center;
							p {
								margin: 0;
								font-family: Montserrat;
								font-weight: 500;
								font-size: 1rem;
								line-height: 1.5rem;
								color: #222021;
								b {
									text-transform: capitalize;
									b {
										text-transform: lowercase;
									}
									// &:nth-child(2) {
									//   font-weight: normal;
									// }
								}
							}
						}
					}
				}
				.proceed-btn {
					padding: 4rem;
					background: #ffffff;
					// box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
					display: grid;
					justify-content: center;
					button {
						background: #292929;
						padding: 0.8rem 6rem;
						font-family: Montserrat;
						font-weight: bold;
						font-size: 1.1rem;
						line-height: 1.3rem;
						color: #fbf3f1;
						cursor: pointer;
						position: relative;
						z-index: 0;
						@include background-animate(#faf0ec, black);
					}
				}
			}
		}
	}
}
.hover-disable-text {
	position: absolute;
	display: none;
	text-align: center;
	padding: 0.3125rem;
	margin-top: 0.625rem;
	background: black;
	width: 100%;
	&::before {
		content: "";
		width: 0;
		position: absolute;
		top: -5px;
		left: 50%;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 5px solid black;
	}
	p {
		color: white;
		margin: 0rem;
	}
}
.no-packages {
	width: 100%;
	// background: #222021;
	padding: 1rem 6rem;
	.no-package {
		background: white;
		div:last-child {
			padding: 1rem 3.5rem;
			display: flex;
			svg {
				margin-right: 2rem;
			}
			div {
				display: block;
				p:first-child {
					font-size: 1.5rem;
					color: #d48e8e;
					margin-bottom: 1rem;
				}
				p:last-child {
					font-size: 1rem;
					color: #8a8a8a;
				}
			}
		}
	}
}
.loading-main {
	width: 100%;
}
.package-popup,
.showPopUp {
	.popup-container {
		padding: 3.75rem 9.0625rem;
		background: #222021;
		@include respond(phone) {
			// width < 900px?
			padding: 2rem 2rem;
		}
		@include respond(s-phone) {
			// width < 900px?
			padding: 2rem;
		}
	}
	.getDemoContainer {
		padding: 0px;
		background: #fbfcfd;
		.free-demo-iframe {
			height: 75vh;
			width: 70vw;
		}
		.close-popup {
			position: static;
			text-align: right;
			svg {
				background: none;
				path {
					fill: black;
				}
			}
		}
	}
	.future-plan-container {
		padding: 3.125rem 3.125rem;
		.future-plan-taken {
			p {
				width: 30vw;
				color: #222021;
				text-align: justify;
				font-size: 1rem;
				font-weight: 300;
				line-height: 1.375rem;
			}
			a {
				color: #d48e8e;
				text-decoration: none;
			}
		}
	}
}
.titleCase {
	text-transform: capitalize;
}
.cancel-option-container {
	max-width: calc(54rem + 50px);
	.cancel-option-icons-container {
		display: grid;
		// grid-template-columns: repeat(6 , 9rem);
		grid-template-columns: repeat(4, 13.2rem);
		align-items: center;
		justify-items: center;
		// justify-content: center;
		text-align: center;
		grid-gap: 10px;
		.cancel-optin-icons {
			height: 100%;
			width: 100%;
			display: grid;
			align-items: center;
			justify-items: center;
			padding: 12px 0px;
			grid-row-gap: 10px;
			cursor: pointer;
			background: #fbf3f1;
			p {
				color: #000000;
				width: 100%;
			}
			svg {
				path {
					stroke: #d48e8e;
				}
			}
			&:hover {
				background: #d48e8e;
				p {
					color: #e8e8e8;
				}
				svg {
					path {
						stroke: #e8e8e8;
					}
				}
			}
			&.activeCat {
				background: #d48e8e;
				p {
					color: #e8e8e8;
				}
				svg {
					path {
						stroke: #e8e8e8;
					}
				}
			}
		}
	}
	.cancel-option-text-container {
		background: #fbf3f1;
		padding: 1.5rem;
		margin: 1rem 0px;
		// max-width: fit-content;
		display: grid;
		grid-row-gap: 1rem;
		width: 55rem;
		height: 12rem;
		p {
			text-align: left;
			margin: 0px;
			width: auto;
			max-width: fit-content;
			color: #292929;
			line-height: 1.4;
		}
		.cancel-option-head-tag {
			font-weight: 600;
			font-size: 1.1rem;
			// margin-bottom: 1rem;
		}
		.cancel-option-sub-text {
		}
		.cancel-option-cta {
			height: max-content;
			width: max-content;
			padding: 0.5rem 1rem;
			color: white;
			background: #d48e8e;
			cursor: pointer;
		}
		input {
			border: 1px solid #e9beb3;
			background: #ffffff;
		}
	}
}
.cant-buy {
	padding: 3.125rem 3.125rem !important;
	.cant-buy-alert {
		p {
			width: 36vw;
			color: white;
			text-align: justify;
			font-size: 1rem;
			font-weight: 300;
			line-height: 1.375rem;
		}
		a {
			color: #d48e8e;
			text-decoration: none;
		}
	}
}
.no-package {
	display: grid;
	grid-template-columns: max-content 1fr;
	align-items: center;
	column-gap: 6rem;
	svg {
		width: 3rem;
	}
}
.payment-updating-popup {
	opacity: 1;
	.popup-container {
		background: transparent;
		.payment-wait-container {
			display: grid;
			place-items: center;
			row-gap: 1rem;
			img {
				width: 5rem;
			}
			p {
				color: white;
			}
		}
	}
}

.disbale-pointer-events {
	pointer-events: none;
}

.highlight-red {
	color: #cc4040 !important;
}

/**
			 * ==============================================
			 * Dot Flashing
			 * ==============================================
			 */
.dot-flashing {
	position: relative;
	width: 7px;
	height: 7px;
	border-radius: 5px;
	background-color: #c4c4c4;
	color: #c4c4c4;
	animation: dotFlashing 1s infinite linear alternate;
	animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
	content: "";
	display: inline-block;
	position: absolute;
	top: 0;
}

.dot-flashing::before {
	left: -10px;
	width: 7px;
	height: 7px;
	border-radius: 5px;
	background-color: #c4c4c4;
	color: #c4c4c4;
	animation: dotFlashing 1s infinite alternate;
	animation-delay: 0s;
}

.dot-flashing::after {
	left: 10px;
	width: 7px;
	height: 7px;
	border-radius: 5px;
	background-color: #c4c4c4;
	color: #c4c4c4;
	animation: dotFlashing 1s infinite alternate;
	animation-delay: 1s;
}

@keyframes dotFlashing {
	0% {
		background-color: #c4c4c4;
	}
	50%,
	100% {
		background-color: #ebe6ff;
	}
}
</style>

<style lang="scss">
.pay-as-you-go-used-credits-wrapper {
	.credits-details-and-buy-more {
		.used-credits {
			b {
				color: $color-light-gray-2;
			}
		}
	}
}
</style>

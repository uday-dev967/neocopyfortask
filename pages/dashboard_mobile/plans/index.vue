<template>
	<section v-if="!loadingPaymentPage">
		<div
			class="mobile-plans-main"
			v-if="
				user &&
				packageDetails &&
				packageDetails.monthly &&
				packageDetails.monthly.length > 0
			"
			@click.prevent="isFilterDropdown = false"
		>
			<!-- MAIN HEADING============================> -->
			<p class="main-heading">
				<span>{{ $t("myAccounts.titlePlansMobileHeading[0]") }}</span>
				<span>{{ $t("myAccounts.titlePlansMobileHeading[1]") }}</span>
			</p>
			<div class="main-sub-heading">
				{{$t("plansNew.plansNewSubtitle[0]")}} <span>{{$t("plansNew.plansNewSubtitle[1]")}}</span> {{$t("plansNew.plansNewSubtitle[2]")}} <span>{{$t("plansNew.plansNewSubtitle[3]")}}</span>
			</div>
			<!--ALL PLAN CARD OLD============================> -->
			<div v-if="false" v-for="(item, key) in displayPlan" :key="key">
				<div
					class="plan-cards"
					:class="{ standard: key === 'Neo Standard' }"
					v-for="pItem in packageDetails[displayPlan[key]]"
					v-if="pItem.package === key"
					:key="pItem.package"
				>
					<!-- <p class="standard-main-text" v-if="key === 'Neo Standard'">
            <b v-if="isLPU">Most popular pricing</b>
            <template v-else>
              <b>Same price</b> as Basic when you pay<b> yearly</b>
            </template>
          </p> -->
					<div class="card">
						<div class="card-header">
							<div class="plan-title-wrapper">
								<p class="plan-title">
									{{ key.split("Neo ")[1] }}
								</p>
								<!-- --Strike off grid-- -->
								<div class="plan-strike-off-container">
									<p
										class="plan-sub-title"
										v-if="key === 'Neo Standard'"
									>
										For professional designers
									</p>
									<p
										class="plan-sub-title"
										v-if="key === 'Neo Basic'"
									>
										For beginners and personal use
									</p>
									<p
										class="plan-sub-title"
										v-if="key === 'Neo Premium'"
									>
										For design teams & studios
									</p>
									<!-- Strike Off --- EX: 49/mo and duration: Billed Monthly------ -->
									<!-- <span class="strike-price" v-if="displayPlan[key] === 'yearly' || displayPlan[key] === 'quarterly'">
                    <h1 class='bolder' v-bind:style="{fontSize: 64/(pItem.originalPrice.toString().length>3?  pItem.originalPrice.toString().length:3)+'px'}"><span  v-bind:style="{fontSize: (getCurrencySymbol.toString().length==1? 64/(pItem.originalPrice.toString().length>3?  pItem.originalPrice.toString().length:3):15) +'px'}" >{{getCurrencySymbol}}</span>{{pItem.originalPrice}}</h1>
                    <p>/</p>
                    <p>mo</p>
                  </span> -->
									<!-- ----Dropdown---- -->
								</div>
							</div>
							<div v-if="false" class="dropdown-main" @click.stop>
								<div class="dropdown">
									<span
										@click="
											isFilterDropdown =
												!isFilterDropdown;
											selectedPackage = key;
										"
									>
										<p>
											{{ "Billed " + displayPlan[key] }}
										</p>
										<svg
											v-if="
												!isFilterDropdown ||
												(isFilterDropdown &&
													selectedPackage != key)
											"
											width="10"
											height="6"
											viewBox="0 0 10 6"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1 1L5 5L9 1"
												stroke="black"
												stroke-linejoin="round"
											/>
										</svg>
										<svg
											v-if="
												isFilterDropdown &&
												selectedPackage === key
											"
											width="10"
											height="6"
											viewBox="0 0 10 6"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1 5L5 1L9 5"
												stroke="black"
												stroke-linejoin="round"
											/>
										</svg>
									</span>
									<ul
										v-if="
											isFilterDropdown &&
											selectedPackage === key
										"
									>
										<li
											v-if="
												displayPlan[key] !== 'monthly'
											"
											@click="
												changeDisplayPlan(
													pItem.package,
													'monthly',
													false
												)
											"
											value="monthly"
										>
											{{ $t("plansNew.billedMonthly") }}
										</li>
										<!-- <li v-if="displayPlan[key] !== 'quarterly'" @click="changeDisplayPlan(pItem.package,'quarterly', false)" value="quarterly">Billed Quarterly <p>(<b>{{key === 'Neo Basic' ? `${getPercentages.basic.quarterly}%`: key === 'Neo Standard' ? `${getPercentages.standard.quarterly}%` : `${getPercentages.premium.quarterly}%`}}</b>off)</p></li> -->
										<li
											v-if="displayPlan[key] !== 'yearly'"
											@click="
												changeDisplayPlan(
													pItem.package,
													'yearly',
													false
												)
											"
											value="yearly"
										>
											{{ $t("plansNew.billedYearly") }}
											<p>
												(<b>{{
													key === "Neo Basic"
														? `${getPercentages.basic.yearly}%`
														: key === "Neo Standard"
														? `${getPercentages.standard.yearly}%`
														: `${getPercentages.premium.yearly}%`
												}}</b
												>{{ $t("plansNew.off") }})
											</p>
										</li>
									</ul>
								</div>
								<!-- <p class="discount-text"><b>SAVE {{pItem.discount}}% off</b> on yearly</p> -->
							</div>
							<div class="duration-switcher">
								<div
									class="period monthly"
									:class="{
										selected: displayPlan[key] == 'monthly',
									}"
									@click="
										changeDisplayPlan(
											pItem.package,
											'monthly',
											false
										)
									"
								>
									{{ $t("plansNew.monthly") }}
								</div>
								<div
									class="period yearly"
									:class="{
										selected: displayPlan[key] == 'yearly',
									}"
									@click="
										changeDisplayPlan(
											pItem.package,
											'yearly',
											false
										)
									"
								>
									{{ $t("plansNew.yearly") }}
								</div>
							</div>
						</div>
						<!-- ----Pricing---- -->
						<div class="pricing-container">
							<!-- pricing --- EX: 49/mo and duration: Billed Monthly------ -->
							<div class="price-details">
								<span class="price">
									<div
										class="bolder"
										v-bind:style="{
											fontSize:
												144 /
													(parseInt(
														pItem.finalPrice.toString()
															.length
													) +
														parseInt(
															getCurrencySymbol.toString()
																.length - 1
														)) >
												40
													? 40
													: 144 /
															(parseInt(
																pItem.finalPrice.toString()
																	.length
															) +
																parseInt(
																	getCurrencySymbol.toString()
																		.length -
																		1
																)) +
													  'px',
										}"
									>
										<span
											v-bind:style="{
												fontSize:
													(getCurrencySymbol.toString()
														.length == 1
														? 144 /
																parseInt(
																	pItem.finalPrice.toString()
																		.length
																) >
														  26
															? 26
															: 144 /
															  parseInt(
																	pItem.finalPrice.toString()
																		.length
															  )
														: 24) + 'px',
											}"
											>{{ getCurrencySymbol }}</span
										>{{ pItem.finalPrice }}
									</div>
									<p>/</p>
									<p>mo</p>
								</span>
								<div class="discount-on-yearly">
									<template v-if="key === 'Neo Basic'">
										<span class="highlight-red"
											>{{$t("plansNew.saveOnYearlyMobile[0]")}} 25% </span
										>{{$t("plansNew.saveOnYearlyMobile[1]")}} <span>{{$t("plansNew.saveOnYearlyMobile[2]")}} </span> {{$t("plansNew.saveOnYearlyMobile[3]")}} 
									</template>
									<template v-else>
										<span class="highlight-red"
											>{{$t("plansNew.saveOnYearlyMobile[0]")}}  38% </span
										>{{$t("plansNew.saveOnYearlyMobile[1]")}}  <span>{{$t("plansNew.saveOnYearlyMobile[2]")}} </span> {{$t("plansNew.saveOnYearlyMobile[3]")}} 
									</template>
								</div>
							</div>
						</div>
						<!-- -------BUY NOW-----buyPlan(pItem._id,pItem.package,displayPlan[key]) -->
						<button
							class="buy-now"
							@click="handleBuyNowClick(pItem, displayPlan[key])"
							v-bind:class="{
								disabledBtn:
									(user.subInfo && user.subInfo.inherit) ||
									pItem.currentActive ||
									(future &&
										future.length > 0 &&
										future[0].package.displayContext
											.packageName === key &&
										future[0].package.invoice.period ===
											(displayPlan[key] === 'monthly'
												? 1
												: displayPlan[key] ===
												  'quarterly'
												? 3
												: 12)),
							}"
						>
							{{
								pItem.currentActive
									? $t("buttonText.currentPlan")
									: future &&
									  future.length > 0 &&
									  future[0].package.invoice.period ===
											(displayPlan[key] === "monthly"
												? 1
												: displayPlan[key] ===
												  "quarterly"
												? 3
												: 12) &&
									  future[0].package.displayContext
											.packageName === key
									? $t("buttonText.futurePlan") 
									: currentBilling &&
									  currentBilling.displayContext &&
									  !isFreeTrail &&
									  currentBilling.analyticsData &&
									  currentBilling.analyticsData
											.analyticsStatus &&
									  currentBilling.analyticsData
											.analyticsStatus === "paid"
									? $t('buttonText.changePlan') 
									: $t('buttonText.buyNow')
							}}
						</button>
						<!-- ----Expandable section----- -->
						<div class="expand-section">
							<div
								class="list-of-features"
								v-if="showMore && selectedPackage === key"
							>
								<span
									class="feature-item"
									v-if="pItem.features"
									v-for="(feature, index) in pItem.features"
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 18 18"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="9"
											cy="9"
											r="9"
											fill="#FAF0EC"
										/>
										<path
											d="M5.5 9.66667L7.83333 12L12.5 7"
											stroke="#CC4040"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
									<p v-html="feature.value"></p>
									<!-- <p class="bonus" v-if="key === 'Neo Standard' && index === 0">{{getXtimes.std}}</p>
                  <p class="bonus" v-if="key === 'Neo Premium' && index === 0"> {{getXtimes.pre}}</p> -->
								</span>
								<template
									v-if="
										getAdditionalItems(pItem.addFeatures)
											.length > 0
									"
								>
									<div class="optional-add-ons">
										{{ $t("plansNew.optionalAddOnsSubheading") }}
									</div>
									<span
										class="feature-item"
										v-for="(
											extra, index
										) in getAdditionalItems(
											pItem.addFeatures
										)"
										:key="extra.value + index"
									>
										<svg
											width="18"
											height="18"
											viewBox="0 0 18 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle
												cx="9"
												cy="9"
												r="9"
												fill="#FAF0EC"
											/>
											<path
												d="M9 6V12"
												stroke="#CC4040"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
											<path
												d="M12 9L6 9"
												stroke="#CC4040"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
										<p v-html="extra.value"></p>
									</span>
								</template>
								<template v-if="key === 'Neo Premium'">
									<div class="premium-plan-terms">{{ $t("plansNew.premiumPlanTermsText") }}</div>
								</template>
							</div>
							<div
								class="expand"
								@click="
									showMore = !showMore;
									selectedPackage = key;
								"
							>
								<p class="show">
									{{
										showMore && selectedPackage === key
											? $t("buttonText.hide") 
											: $t("buttonText.show") 
									}}
									{{ $t("plansNew.benefits") }}
								</p>
								<svg
									v-if="
										!showMore ||
										(showMore && selectedPackage != key)
									"
									width="10"
									height="6"
									viewBox="0 0 10 6"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 1L5 5L9 1"
										stroke="#8B8484"
										stroke-linejoin="round"
									/>
								</svg>
								<svg
									v-if="showMore && selectedPackage === key"
									width="10"
									height="6"
									viewBox="0 0 10 6"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 5L5 1L9 5"
										stroke="#8B8484"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--ALL PLAN CARD NEW============================> -->
			<div v-for="(item, key) in displayPlan" v-if="key.includes('Mobile')" :key="key">
				<div
					class="plan-cards"
					v-for="pItem in packageDetails[displayPlan[key]]"
					v-if="pItem.package === key"
					:key="pItem.package"
				>
					
					<div class="card mobile-only-plan-card">
						<div class="card-header">
							<div class="plan-title-wrapper">
								<p class="plan-title">
									{{ key }}
								</p>
							</div>
						</div>
						<!-- ----Pricing---- -->
						<div class="pricing-container">
							<!-- pricing --- EX: 49/mo and duration: Billed Monthly------ -->
							<div class="price-details">
								<span class="price">
									<div
										class="bolder"
										v-bind:style="{
											fontSize:
												144 /
													(parseInt(
														pItem.finalPrice.toString()
															.length
													) +
														parseInt(
															getCurrencySymbol.toString()
																.length - 1
														)) >
												40
													? 40
													: 144 /
															(parseInt(
																pItem.finalPrice.toString()
																	.length
															) +
																parseInt(
																	getCurrencySymbol.toString()
																		.length -
																		1
																)) +
													  'px',
										}"
									>
										<span
											v-bind:style="{
												fontSize:
													(getCurrencySymbol.toString()
														.length == 1
														? 144 /
																parseInt(
																	pItem.finalPrice.toString()
																		.length
																) >
														  26
															? 26
															: 144 /
															  parseInt(
																	pItem.finalPrice.toString()
																		.length
															  )
														: 24) + 'px',
											}"
											>{{ getCurrencySymbol }}</span
										>{{ pItem.finalPrice }}
									</div>
									<p>/</p>
									<p>mo</p>
								</span>
							</div>
						</div>
						<!-- -------BUY NOW-----buyPlan(pItem._id,pItem.package,displayPlan[key]) -->
						<button
							class="buy-now"
							@click="handleBuyNowClick(pItem, displayPlan[key])"
							v-bind:class="{
								disabledBtn:
									(user.subInfo && user.subInfo.inherit) ||
									pItem.currentActive ||
									(future &&
										future.length > 0 &&
										future[0].package.displayContext
											.packageName === key &&
										future[0].package.invoice.period ===
											(displayPlan[key] === 'monthly'
												? 1
												: displayPlan[key] ===
												  'quarterly'
												? 3
												: 12)),
							}"
						>
							{{
								pItem.currentActive
									? $t("buttonText.currentPlan")
									: future &&
									  future.length > 0 &&
									  future[0].package.invoice.period ===
											(displayPlan[key] === "monthly"
												? 1
												: displayPlan[key] ===
												  "quarterly"
												? 3
												: 12) &&
									  future[0].package.displayContext
											.packageName === key
									? $t("buttonText.futurePlan") 
									: currentBilling &&
									  currentBilling.displayContext &&
									  !isFreeTrail &&
									  currentBilling.analyticsData &&
									  currentBilling.analyticsData
											.analyticsStatus &&
									  currentBilling.analyticsData
											.analyticsStatus === "paid"
									? $t('buttonText.changePlan') 
									: $t('buttonText.buyNow')
							}}
						</button>
						<!-- CARD FOOTER -->
						 <div class="card-footer">
							<div class="info-icon-wrapper">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_1600_6075)">
									<path d="M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8C14.6673 4.3181 11.6825 1.33334 8.00065 1.33334C4.31875 1.33334 1.33398 4.3181 1.33398 8C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M8 10.6667V8" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M8 5.33334H8.00667" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round"/>
									</g>
									<defs>
									<clipPath id="clip0_1600_6075">
									<rect width="16" height="16" fill="white"/>
									</clipPath>
									</defs>
								</svg>

							</div>
							<div class="footer-text">
								{{ $t("mobilePlan.planCardFooterText[0]") }}<span> '{{ $t("mobilePlan.planCardFooterText[1]") }}' </span> {{ $t("mobilePlan.planCardFooterText[2]") }}
							</div>
						 </div>
					</div>
				</div>
			</div>
			<div class="mobile-plans-page-logout-btn" @click="signOut">
				{{$t("buttonText.logOut")}}
				<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18.666 19.8334L24.4993 14L18.666 8.16669" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M24.5 14H10.5" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M10.5 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H10.5" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>

			<div class="extra-space"></div>
		</div>
		<div class="main-loading" v-else>
			<div class="loading-container">
				<p>{{ $t("infoText.loading") }}</p>
				<div class="loader"></div>
			</div>
		</div>
		<div
			class="popup-div mobile-cant-buy-container"
			id="no-allow-for-buy"
			:class="showPopup ? 'showPopUp' : ''"
		>
			<div class="popup-container">
				<div class="close-popup" @click="closePopup">
					<svg
						style="background: white"
						width="24"
						height="24"
						viewBox="0 0 14 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
							fill="black"
						/>
					</svg>
				</div>
				<div class="popup-details">
					<p v-if="user && user.accountType == 'root'">
						{{ $t("plansNew.futurePlanTaken") }}
						<a href="mailto:connect@foyr.com"
							>connect@foyr.com</a
						>
					</p>
					<p v-else>
						{{ $t("plansNew.loginForBillingText") }}
					</p>
				</div>
			</div>
		</div>
		<!-- **********************UPGRADE/DOWNGRADE ALERT****************** -->
		<div
			class="popup-div mobile-downgrade"
			:class="changePlanAlert  ? 'showPopUp' : ''"
		>
			<div class="popup-container" @click.stop>
				<div class="close-popup" @click="changePlanAlert = false">
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
				<!-- <div v-if="currentBilling && future.length==0">
          <packageComponent :packages="packages" :align="'center'" :user="user" :ppOrigin="'changeplan'"/>
        </div> -->
				<div class="cpa-container">
					<div class="content">
						<p class="heading-1">
							{{ $t("plansNew.reviewTextOnPurchase") }}
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
									{{ $t("plansNew.reviewPointsOnPurchase[0]") }}
									<b>{{
										selectedPlanDetails
											? `${selectedPlanDetails.package} - ${selectedPlanDetails.duration}`
											: "N/A"
									}}</b>
									{{ $t("plansNew.reviewPointsOnPurchase[1]") }} <b>{{ formattedDate }}</b>
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
									{{ $t("plansNew.reviewPointsOnPurchase[2]") }}
									<b
										>{{ getCurrencySymbol
										}}{{
											selectedPlanDetails.finalPrice *
											(selectedPlanDetails.duration ==
											"monthly"
												? 1
												: selectedPlanDetails.duration ==
												  "quarterly"
												? 3
												: 12)
										}}
										<b style="font-weight: normal">{{ $t("plansNew.reviewPointsOnPurchase[3]") }}</b>
										<b>{{
											selectedPlanDetails.duration ===
											"monthly"
												? "month"
												: selectedPlanDetails.duration ===
												  "quarterly"
												? "quarter"
												: "year"
										}}</b></b
									>
									{{ $t("plansNew.reviewPointsOnPurchase[4]") }} <b>{{ formattedDate }}</b>
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
									{{ $t("plansNew.reviewPointsOnPurchase[5]") }}
									<b> {{ formattedDate }}</b>
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
						<button @click="openPaymentPopup(false)">
							{{ $t("buttonText.confirm") }}
						</button>
					</div>
					<!-- <p>Your new plan will be effective from {{selectedPlanDetails.nextBillingDate}}. Are you sure you want to change your plan?</p> -->
				</div>
				<!-- <div class="address-button-container" style="padding-top:1.25rem;">
          <button @click="closePopup" class="cancel-button">Cancel</button>
          <button @click="openPaymentPopup(false)" class="update-address">Proceed & Buy</button>
        </div> -->
			</div>
		</div>
		<loginViaDesktopComponent :desktopAlert="desktopAlert" />
		<isCurrencyMisMatch :isCurrencyMismatch="isCurrencyMismatch" />
		<PaymentSuccessPopup :showPopup="showPaymentSuccessPopup" />
		<AddOnsPopup
			:showAddOnsPopup="showAddOnsPopup"
			:planDetails="planDetails"
			:duration="duration"
			:showRecommendedAddonsSection="showRecommendedAddonsSection"
			:customModeAddonsReversed="customModeAddonsReversed"
			:recommendedAddonsDetails="recommendedAddonsDetails"
			:currencySymbol="getCurrencySymbol"
			@closeAddonPopup="closeAddonPopup"
			@continueButtonClick="handleContinueButtonClick"
		></AddOnsPopup>
	</section>
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
	import { mapActions, mapState, mapGetters } from "vuex";
	import loginViaDesktopComponent from "@/components/shared/mobile/loginViaDesktop";
	import isCurrencyMisMatch from "../../../components/shared/mobile/isCurrencyMisMatch.vue";
	import AddOnsPopup from "../../../components/shared/popups/addOnsPopup";
	import PaymentSuccessPopup from "../../../components/shared/mobile/paymentSuccessPopup.vue";
	// import CouponCodeComponent from '@components/shared/couponPopup';
	export default {
		layout: "mobile",
		middleware: ["initAuth", "authReq"],
		components: {
			loginViaDesktopComponent,
			isCurrencyMisMatch,
			AddOnsPopup,
			PaymentSuccessPopup,
			// CouponCodeComponent
		},
		head() {
			return {
				title: "Neo - Settings",
			};
		},
		props: {
			// users: Object,
		},
		data() {
			return {
				message: {
					value: "",
					error: false,
					global: false,
				},
				planSeperation: {
					monthly: [],
					quarterly: [],
					yearly: [],
				},
				displayPlan: {
					"Neo Basic": "monthly",
					"Neo Standard": "yearly",
					"Neo Premium": "monthly",
					"Mobile Only Plan": "monthly",
					"Mobile Exclusive Plan": "monthly"
				},
				loadingPaymentPage: false,
				showCoupon: false,
				showPopup: false,
				extraFeatures: {
					std: [
						"<b>2</b> 3D model requests / mo",
						"1-click <b>3D Walkthrough</b>",
						"Create <b>your own</b> products",
					],
					pre: ["Dedicated Support"],
				},
				isFilterDropdown: false,
				selectedPackage: "",
				showMore: false,
				desktopAlert: false,
				changePlanAlert: false,
				isCurrencyMismatch: false,
				selectedPlanDetails: {},
				launchPaymentIframe: false,
				paymentUrl: "",
				receivingPaymentLoading: false,
				planDetails: null,
				duration: null,
				showAddOnsPopup: false,
				recommendedAddonsDetails: [],
				selectedRecommendedAddonsForCheckout: [],
				showPaymentSuccessPopup: false
			};
		},
		computed: {
			...mapState({
				user: (state) => state.User.user,
				currentBilling: (state) => state.Billing.currentSubscription,
				packages: (state) => state.Subscriptions.packages,
				packageDetails: (state) => state.Subscriptions.packageDetails,
				future: (state) =>
					state.Subscriptions.mySubscription.filter((item) => {
						return (
							item.activeStatus == "future" && item.type == "package"
						);
					}),
				isFreeTrail: (state) => state.Billing.isTrial,
				isFTUpgradeCouponChmlnTourShown: state => state.Billing.isFTUpgradeCouponChmlnTourShown,
				isLPU: (state) => state.User.isLPU,
				isChargebee: (state) => state.Billing.isChargebee,
				addon: (state) => state.Subscriptions.addon,
			}),
			...mapGetters({
				isUserJapanese: "User/isUserJapanese",
      			isUserSpanish: "User/isUserSpanish",
				userCategory: "User/getUserCategory",
			}),
			getXtimes() {
				let xTimes = {
					std: "",
					pre: "",
				};
				if (this.packages.extraInfo && this.packages.extraInfo.xtimes) {
					xTimes.std = this.packages.extraInfo.xtimes.standard;
					xTimes.pre = this.packages.extraInfo.xtimes.premium;
				}
				return xTimes;
			},
			getPercentages() {
				if (
					this.packages &&
					this.packages.extraInfo &&
					this.packages.extraInfo.spercentage
				) {
					return this.packages.extraInfo.spercentage;
				}
			},
			getCurrencySymbol() {
				if (
					this.packages &&
					this.packages.data &&
					this.packages.data.length > 0 &&
					this.packages.data[0] &&
					this.packages.data[0].displayContext &&
					this.packages.data[0].displayContext.currency_symbol
				) {
					return this.packages.data[0].displayContext.currency_symbol;
				}

				return "";
			},
			formattedDate: function () {
				if (this.currentBilling && this.currentBilling.nextBilling) {
					let newDate = new Date(this.currentBilling.nextBilling);
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
				} else {
					return "N/A";
				}
			},
			customModeAddonsReversed() {
				if (this.addon && this.addon.custom) {
					return this.addon.custom.reverse();
				}

				return [];
			},
			showRecommendedAddonsSection() {
				return (
					this.recommendedAddonsDetails &&
					this.recommendedAddonsDetails.length
				);
			},
		},
		mounted() {
			this.$root.$emit("send-mobile-event", { name: "mb_plans_page_opened" });
			if (this.user && this.user.accountId) {
				if (!this.packages)
					this.fetchSubscriptions({ accountId: this.user.accountId, mobilePlans: true }).then(res => {
						this.preparePlansDetails();
					});
				if (!this.currentBilling)
					this.fetchCurrentSubscription({
						accountId: this.user.accountId,
					});
			}
			// this.preparePlansDetails();
			if(this.currentBilling) {
				this.showFTUpgradeCouponChmlnTour()
			}
		},
		watch: {
			user: function (data) {
				if (data) {
					const { accountId } = data;
					this.fetchSubscriptions({ accountId, mobilePlans: true });
					this.fetchMySubscriptions({ accountId });
					if (!this.currentSubscription)
						this.fetchCurrentSubscription({ accountId });
					this.preparePlansDetails();
				}
			},
			currentBilling: function () {
				if (
					this.packageDetails &&
					this.packageDetails.monthly &&
					this.packageDetails.yearly &&
					this.packageDetails.quarterly &&
					(this.packageDetails.monthly.length < 3 ||
						this.packageDetails.yearly.length < 3 ||
						this.packageDetails.quarterly.length < 3)
				) {
					this.preparePlansDetails();
				}
				this.showFTUpgradeCouponChmlnTour();
			},
			packages: function () {
				if (
					this.packages &&
					this.packages.data &&
					this.packages.data.length >= 9
				) {
					this.preparePlansDetails();
				}
			},
		},
		methods: {
			...mapActions({
				packageDetailsSeperation: "Subscriptions/packageDetailsSeperation",
				fetchCurrentSubscription: "Billing/fetchCurrentSub",
				buy: "Subscriptions/buy",
				sendMail: "Billing/buyNowEmailSend",
				logout: "Auth/logout",
				fetchUser: "User/fetch",
				fetchSubscriptions: "Subscriptions/fetchAll",
				fetchMySubscriptions: "Subscriptions/fetchMySubscriptions",
				getPlanSwitchStatus: "Subscriptions/getPlanSwitchStatus",
				fetchAllRecommendedAddons:
					"Subscriptions/fetchAllRecommendedAddons",
				analyticsDataToBackend: "Subscriptions/analyticsDataToBackend",
				updateIsFTUpgradeCouponChmlnTourShown: "Billing/updateIsFTUpgradeCouponChmlnTourShown",
			}),
			

			signOut() {
				this.logout().then(res => {
					window.location.href = res.url;
					this.$root.$emit("send-mobile-event",{name : 'mb_user_logout_clicked'});
				});
			},
			preparePlansDetails() {
				this.planSeperation = {
					monthly: [],
					quarterly: [],
					yearly: [],
				};
				this.packageDetailsSeperation(this.planSeperation);
				if (
					this.packages &&
					this.packages.data &&
					this.packages.data.length > 0
				) {
					this.packages.data.forEach((packageItem) => {
						if (
							packageItem &&
							packageItem.invoice &&
							["Neo Basic", "Neo Standard", "Neo Premium", "Mobile Exclusive Plan","Mobile Only Plan"].includes(
								packageItem.displayContext.packageName
							)
						) {
							if (
								packageItem.invoice.period &&
								(packageItem.invoice.period === 1 ||
									packageItem.invoice.period === 3 ||
									packageItem.invoice.period === 12)
							) {
								let dur =
									packageItem.invoice.period === 1
										? "monthly"
										: packageItem.invoice.period === 3
										? "quarterly"
										: "yearly";
								this.planSeperation[dur].push({
									package: packageItem.displayContext.packageName,
									finalPrice:
										packageItem.displayContext.packageCost,
									originalPrice:
										packageItem.displayContext.originalPrice,
									features: packageItem.displayContext.features,
									discount: packageItem.displayContext.discount,
									currentActive: false,
									_id: packageItem._id,
                  chargeBeePlanPrice: packageItem.price,
									addFeatures:
										packageItem.displayContext.addFeatures.filter(
											(e) =>
												e.value &&
												e.value != "na" &&
												e.value != "n/a"
										),
									recommendedAddons: packageItem.attached_addons
										? packageItem.attached_addons.filter(
												(e) => e.type == "recommended"
										  )
										: [],
									standardTitle:
										packageItem.meta_data &&
										packageItem.meta_data.standardPricingTittle
											? packageItem.meta_data
													.standardPricingTittle
											: 'Get upto <b style="color: #ffab40;">4.5 months</b> free when you buy yearly',
								});
							}
						}
					});
					if (
						this.planSeperation &&
						((this.planSeperation.monthly &&
							this.planSeperation.monthly.length < 3) ||
							(this.planSeperation.quarterly &&
								this.planSeperation.quarterly.length < 3) ||
							(this.planSeperation.yearly &&
								this.planSeperation.yearly.length < 3))
					) {
						if (
							this.currentBilling &&
							this.currentBilling.displayContext &&
							this.currentBilling.billing &&
							(this.currentBilling.billing === 3 ||
								this.currentBilling.billing === 1 ||
								this.currentBilling.billing === 12)
						) {
							if (
								this.currentBilling.displayContext.packageName &&
								[
									"Neo Basic",
									"Neo Standard",
									"Neo Premium",
								].includes(
									this.currentBilling.displayContext.packageName
								)
							) {
								let expiryDate = new Date(
									this.currentBilling.subscriptionExpiryDate
								).getTime();
								if (new Date().getTime() < expiryDate) {
									let dur =
										this.currentBilling.billing === 1
											? "monthly"
											: this.currentBilling.billing === 3
											? "quarterly"
											: "yearly";
									this.planSeperation[dur].push({
										package:
											this.currentBilling.displayContext
												.packageName,
										finalPrice:
											this.currentBilling.displayContext
												.packageCost,
										originalPrice:
											this.currentBilling.displayContext
												.originalPrice,
										features:
											this.currentBilling.displayContext
												.features,
										addFeatures:
											this.currentBilling.displayContext
												.addFeatures,
										discount:
											this.currentBilling.displayContext
												.discount,
										currentActive: true,
										standardTitle:
											this.currentBilling.meta_data &&
											this.currentBilling.meta_data
												.standardPricingTittle
												? this.currentBilling.meta_data
														.standardPricingTittle
												: 'Get upto <b style="color: #ffab40;">4.5 months</b> free when you buy yearly',
									});
									this.changeDisplayPlan(
										this.currentBilling.displayContext
											.packageName,
										dur,
										true
									);
								}
							}
						}
					}
					this.packageDetailsSeperation(this.planSeperation);
				}
				console.log("packages packageDetails",this.packages, this.packageDetails)
			},
			changeDisplayPlan(_packageName, _value, _defaultLoad) {
				if (window && window.analytics && !_defaultLoad) {
					analytics.track(
						"mb_frequency_clicked",
						{
							author: this.user.email,
							frequency: `${_value}`,
							plan: this.isLPU
								? `Foyr ${_packageName}`
								: _packageName,
							lpu: this.isLPU,
						},
						{
							integrations: {
								Amplitude: { session_id: new Date().getTime() },
							},
						},
						{ timestamp: new Date().getTime() }
					);
				}
				this.isFilterDropdown = false;
				this.displayPlan[_packageName] = _value;
			},
			async handleBuyNowClick(_packageDetails, _duration) {
				this.planDetails = _packageDetails;
				this.duration = _duration;

				if (this.user.subInfo && this.user.subInfo.inherit) {
					return;
				}
				if (
					this.user &&
					this.user.accountType &&
					this.user.accountType !== "root"
				) {
					this.showPopup = true;
					return;
				}
				let period =
					_duration === "monthly" ? 1 : _duration == "quarterly" ? 3 : 12;
				if (
					this.currentBilling &&
					this.currentBilling.displayContext &&
					this.currentBilling.displayContext.packageName
				) {
					let packageName =
						this.currentBilling.displayContext.packageName;
					if (
						_packageDetails.package === packageName &&
						period === this.currentBilling.billing &&
						this.currentBilling.analyticsData &&
						this.currentBilling.analyticsData.analyticsStatus &&
						this.currentBilling.analyticsData.analyticsStatus === "paid"
					)
						return;
				}
				if (
					this.future &&
					this.future.length > 0 &&
					this.future[0].invoice
				) {
					if (
						_packageDetails.package ===
							this.future[0].package.displayContext.packageName &&
						period === this.future[0].invoice.period
					)
						return;
				}

				if (
					_packageDetails.recommendedAddons &&
					_packageDetails.recommendedAddons.length
				) {
					this.recommendedAddonsDetails =
						await this.fetchAllRecommendedAddons({
							ids: _packageDetails.recommendedAddons.map((e) => e.id),
						});
					this.selectedRecommendedAddonsForCheckout = [];
					this.showAddOnsPopup = true;
				} else {
					this.selectedRecommendedAddonsForCheckout = [];
					this.recommendedAddonsDetails = [];
					this.buyPlan(_packageDetails, _duration);
				}
			},
			buyPlan(_packageDetails, _duration) {
				this.selectedPlanDetails = _packageDetails;
				this.selectedPlanDetails["duration"] = _duration;
				if (window.analytics) {
					analytics.track(
						"mb_buy_now_clicked",
						{
							author: this.user.email,
							frequency: `${_duration}`,
							plan: this.isLPU
								? `Foyr ${_packageDetails.package}`
								: _packageDetails.package,
							lpu: this.isLPU,
						},
						{
							integrations: {
								Amplitude: { session_id: new Date().getTime() },
							},
						},
						{ timestamp: new Date().getTime() }
					);
				}
				this.analyticsDataToBackend({ buy_now_click: true });
				if (_packageDetails && _packageDetails._id) {
					if (this.isChargebee) {
						// CHARGEBEE USERS
						if (
							this.currentBilling &&
							this.currentBilling.subscription &&
							this.currentBilling.analyticsData &&
							this.currentBilling.analyticsData.analyticsStatus &&
							(this.currentBilling.analyticsData.analyticsStatus ===
								"paid" ||
								this.currentBilling.analyticsData
									.analyticsStatus === "free trial")
						) {
							this.getPlanSwitchStatus({
								currentPackageId: this.currentBilling.subscription,
								futurePackageId: _packageDetails._id,
								accountId: this.user.accountId,
							}).then((Response) => {
								if (Response) {
									if (Response.isCurrencyMismatch) {
										this.isCurrencyMismatch = true;
									} else if (!Response.upgrade) {
										// Downgrade alert showing
										this.changePlanAlert = true;
										this.selectedPlanDetails[
											"nextBillingDate"
										] = Response.nextBillingDate
											? Response.nextBillingDate
											: "";
										// return;
									} else this.openPaymentPopup(true);
								}
							});
						} else this.openPaymentPopup(true);
					} else {
						// ZOHO USERS
						if (
							(this.future && this.future.length > 0) ||
							(this.user && this.user.accountType !== "root")
						) {
							this.showPopup = true;
							return;
						}
						this.openPaymentPopup(true);
					}
					this.showAddOnsPopup = false;
				}
			},
			prepareEmailTemplate: function (packageName, _duration) {
				let emailContent = {
					mailerType: "SUB_BUY_NOW_CLICKED",
					subject: this.user.fullName + " " + "just clicked on Buy Now",
					templatedata: {
						name: this.user.fullName ? this.user.fullName : "",
						email: this.user.email ? this.user.email : "",
						country: this.user.country ? this.user.country : "",
						package: packageName ? packageName + "-" + _duration : "",
					},
				};
				this.sendMail(emailContent);
			},
			detectPopupBlocker(url) {
				var popup = window.open(url, "", "", true);
				setTimeout(function () {
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
			closePopup() {
				if (this.isFreeTrail && this.showCoupon) {
					if (window.analytics) {
						analytics.track(
							"Coupon_popup-closed",
							{
								author:
									this.user && this.user.email
										? this.user.email
										: "",
								action: "popup-closed",
							},
							{
								integrations: {
									Amplitude: { session_id: new Date().getTime() },
								},
							},
							{ timestamp: new Date().getTime() }
						);
					}
					//  this.showCoupon = true;
				}
				this.showPopup = false;
				this.showCoupon = false;
			},
			copyToClipboard: function () {
				var text = document.getElementById("coupon-code").innerText;
				var elem = document.createElement("textarea");
				document.body.appendChild(elem);
				elem.value = text;
				elem.select();
				document.execCommand("copy");
				document.body.removeChild(elem);
				this.message.global = true;
				this.message.error = false;
				this.message.value = "Coupon Copied!";
				if (this.isFreeTrail && this.showCoupon) {
					if (window.analytics) {
						analytics.track(
							"Coupon_code_copied",
							{
								author:
									this.user && this.user.email
										? this.user.email
										: "",
								action: "Click on Copy",
							},
							{
								integrations: {
									Amplitude: { session_id: new Date().getTime() },
								},
							},
							{ timestamp: new Date().getTime() }
						);
					}
					//  this.showCoupon = true;
				}
				this.showCoupon = false;
				setTimeout(() => {
					this.message.value = "";
					this.message.global = false;
				}, 2000);
			},
			openPaymentPopup(_isUpgrade) {
				let oldPlan =
					this.currentBilling &&
					this.currentBilling.displayContext &&
					this.currentBilling.displayContext.packageName
						? this.currentBilling.displayContext.packageName
						: null;
				let chargebeeInstance = Chargebee.getInstance();
				if (_isUpgrade) {
					this.loadingPaymentPage = true;
					this.$parent.isRedirecting = true;
				}
				// Requesting for host page url
				this.buy({
					accountId: this.user.accountInfo.accountId,
					package: this.selectedPlanDetails._id,
          ...(this.selectedRecommendedAddonsForCheckout.length && {
            addons: JSON.stringify(
              this.selectedRecommendedAddonsForCheckout.map(e => ({ id: e.id }))
            )
          })
				}).then((res) => {
					this.changePlanAlert = false;
					this.isCurrencyMismatch = false;
					this.loadingPaymentPage = false;
					this.$parent.isRedirecting = false;
					this.$parent.show = false;
					// sending email on plan buy
					this.prepareEmailTemplate(
						this.isLPU
							? `Foyr ${this.selectedPlanDetails.package}`
							: this.selectedPlanDetails.package,
						this.selectedPlanDetails.duration
					);
					if (window.analytics) {
						window.analytics.track(
							"subscriptionBuy",
							{
								title: "buy",
								subtitle: this.selectedPlanDetails._id,
								author: this.user.email,
								lpu: this.isLPU,
							},
							{
								integrations: {
									Amplitude: { session_id: new Date().getTime() },
								},
							},
							{ timestamp: new Date().getTime() }
						);
					}
					if (this.isChargebee) {
						// it is for chargebee
						if (_isUpgrade) {
							chargebeeInstance.openCheckout({
								hostedPage: function () {
									return new Promise(function (resolve, reject) {
										resolve(res.hostedPage);
									});
								},
								success: (hostedPageId) => {
									window.$nuxt.$emit("bill-update-request", {
										payment: true,
										plan: oldPlan,
									});
									window.$nuxt.$emit("buy_success_tour_launch", {
										plan: oldPlan,
									});
									this.showPaymentSuccessPopup = true;
								},
								close: function () {
									window.$nuxt.$emit("payment-popup-close", {
										type: "main",
										waitingTime: 11000,
									});
									// Optional
									// will be called when the user closes the checkout modal box
								},
							});
						} else {
							// this.$root.$emit("bill-update-request",);
							this.fetchMySubscriptions({
								accountId: this.user.accountId,
							});
							this.message.value =
								"Your new plan has updated successfully. Please check more details in billing.";
							this.message.global = true;
							this.message.error = false;
							setTimeout(() => {
								this.message.value = "";
								this.message.global = false;
							}, 3500);
						}
					} else {
						// ZOHO users payment new tab
						this.detectPopupBlocker(res.hostedPage.url);
					}
				});
			},
			getAdditionalItems(items) {
				if (!items) {
					return [];
				} else if (items.length > 0) {
					return items.filter((e) => e.value && e.value != "");
				}

				return [];
			},
			closeAddonPopup() {
				this.showAddOnsPopup = false;
				this.selectedRecommendedAddonsForCheckout = [];
			},
			handleContinueButtonClick(
				planDetails,
				duration,
				selectedRecommendedAddonsForCheckout
			) {
				this.selectedRecommendedAddonsForCheckout =
					selectedRecommendedAddonsForCheckout;
				this.buyPlan(planDetails, duration);
				if (window.analytics) {
					analytics.track(
						"continue_buying_addon",
						{
							author: this.user.email,
							action: "click",
							event_category: "Add On",
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
			showFTUpgradeCouponChmlnTour() {
				if(this.isFreeTrail && !this.isFTUpgradeCouponChmlnTourShown) {
					if(this.userCategory === "Student" && !this.isUserJapanese && !this.isUserSpanish) {
						chmln.show('65dd9aa0e45f02001b60e535')
					}
					this.updateIsFTUpgradeCouponChmlnTourShown(true)
				}
			},
		},
	};
</script>
<style lang="scss">
	.mobile-plans-main {
		display: grid;
		background: white;
		p,
		h1 {
			// font-family: "Ubuntu";
			font-style: normal;
			margin: 0;
		}
		.main-heading {
			// padding: 1rem 2rem;
			text-align: center;
			padding: 1.5rem;
			padding-top: 3rem;
			// margin-top: 2rem;

			span {
				&::after {
					content: "\A";
					white-space: pre;
				}
				font-weight: 700;
				font-size: 20px;
				line-height: 27px;
				color: $background-4;
			}
		}

		.main-sub-heading {
			margin-top: 16px;
			margin-bottom: 32px;
			padding: 0 30px 0 30px;
			font-style: normal;
			font-weight: 500;
			font-size: 12px;
			line-height: 20px;
			text-align: center;
			color: rgba(0, 0, 0, 0.6);

			span {
				font-size: 12px;
				font-weight: 600;
				color: $background-4;
			}
		}

		.plan-cards {
			display: grid;
			grid-auto-flow: row;
			row-gap: 3rem;
			padding: 0 20px 32px 20px;
			.card {
				display: grid;
				grid-template-rows: repeat(6, max-content);
				border: 1px solid #e6dfdf;
				box-sizing: border-box;
				padding: 25px 14px;
				background: white;

				.card-header {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;

					.dropdown-main {
						align-self: end;
					}
				}

				.plan-title {
					font-style: normal;
					font-weight: 700;
					font-size: 24px;
					line-height: 24px;
					color: #232121;
				}
				.plan-strike-off-container {
					// display: grid;
					// grid-template-columns: max-content 1fr;
					// justify-items: end;
					// align-items: center;
					margin-top: 6px;
					.plan-sub-title {
						font-family: $main-font;
						font-weight: 600;
						font-size: 12px;
						line-height: 15px;
						color: #8b8484;
            			letter-spacing: -0.015em;
					}
					.strike-price {
						display: grid;
						grid-template-columns: repeat(3, max-content);

						.bolder {
							font-weight: 500;
							font-size: 2.8rem;
							line-height: 2.125rem;
							color: #585858;
							text-decoration: line-through;
							text-decoration-color: #e9beb3;
							display: relative;
						}

						p {
							align-self: flex-end;
							font-weight: 500;
							font-size: 1rem;
							line-height: 1.1875rem;
							color: #585858;
							padding-bottom: 5px;
							text-decoration: none !important;
						}
					}
				}

				.dropdown-main {
					display: grid;
					grid-template-rows: max-content max-content;
					justify-self: end;
					// row-gap: 1.5rem;
					.dropdown {
						background: #ffffff;
						border: 1px solid #e9beb3;
						justify-self: end;
						position: relative;
						width: 100%;
						// margin-bottom: 1rem;
						span {
							cursor: pointer;
							display: grid;
							grid-template-columns: 1fr max-content;
							align-items: center;
							column-gap: 0.5rem;
							// width: 13.5rem;
							padding: 0.6rem 1rem;
							width: 13rem;
							p {
								margin: 0;
								font-size: 1rem;
								letter-spacing: 0.05rem;
								font-weight: 600;
								color: #0e0e0e;
								text-transform: capitalize;
							}
						}
						ul {
							cursor: pointer;
							width: 100%;
							position: absolute;
							list-style-type: none;
							border: 1px solid #e9beb3;
							z-index: 2;
							background: white;
							// padding: 0.5rem;
							li {
								padding: 1rem;
								padding-right: 0.3rem;
								font-weight: 500;
								font-size: 0.84rem;
								line-height: 1rem;
								color: #222021;
								display: flex;
								justify-content: space-between;
								p {
									font-weight: normal;
									b {
										font-size: 0.9rem;
									}
									// span {
									//   font-weight: normal;
									// }
									// color: #E9BEB3;
								}
								&:hover {
									background: #f7e3df;
								}
							}
						}
					}
					.discount-text {
						// font-weight: bold;
						font-size: 1rem;
						line-height: 1rem;
						color: #0e0e0e;
					}
				}

				.duration-switcher {
					display: flex;

					.period {
						border: 0.793651px solid #dcdcdc;
						border-radius: 2px;
						font-family: $main-font;
						font-style: normal;
						font-weight: 600;
						font-size: 12px;
						line-height: 15px;
						color: $plan-subtitle;
						padding: 12px;

						&.monthly {
							border-right: none;
							border-top-right-radius: 0;
							border-bottom-right-radius: 0;
						}

						&.yearly {
							border-left: none;
							border-top-left-radius: 0;
							border-bottom-left-radius: 0;
						}

						&.selected {
							border: 1.5873px solid #3a393a;
							border-radius: 2px;
							color: $background-4;
						}
					}
				}

				.pricing-container {
					// display: grid;
					// grid-template-columns: repeat(2, 1fr);
					// place-items: center;
					padding: 20px 0 1rem 0;
					box-sizing: border-box;
					margin-bottom: 1.375rem;
					.price-details {
						display: flex;
						flex-direction: column;
						align-items: center;
						.price {
							margin-bottom: 12px;
							display: flex;
							// grid-template-columns: repeat(3,max-content);
							.bolder {
								position: relative;
								line-height: 1;
								font-family: $main-font;
								font-style: normal;
								font-weight: 700;
								font-size: 56px;
								color: #292929;

								span {
									position: absolute;
									top: 0;
									left: 0;
									transform: translate(-100%, 10%);
								}
							}
							p {
								align-self: flex-end;
								font-family: $main-font;
								font-style: normal;
								font-weight: 600;
								font-size: 20px;
								line-height: 24px;
								color: #808080;
							}
						}
						.discount-on-yearly {
							font-family: $main-font;
							font-style: normal;
							font-weight: 700;
							font-size: 12px;
							line-height: 16px;
							color: #808080;

							span {
								color: black;
								font-size: 12px;
							}
						}
					}
				}
				.buy-now {
					cursor: pointer;
					justify-self: center;
					padding: 12px 1rem;
					font-family: $main-font;
					width: 100%;
					background: #f8f0ed;
					border-radius: 2px;
					font-style: normal;
					font-weight: 700;
					font-size: 14px;
					line-height: 24px;
					text-transform: uppercase;
					color: $background-4;
					border: 1px solid #f3e9e5;
				}
				.disabledBtn {
					background: grey !important;
					color: white !important;
				}
				.expand-section {
					display: grid;
					justify-items: center;
					padding: 1.5rem 1rem 0 1rem;
					.expand {
						display: grid;
						grid-template-columns: repeat(2, max-content);
						align-items: center;
						.show {
							margin-right: 1rem;
							font-family: $main-font;
							font-style: normal;
							font-weight: 600;
							font-size: 13px;
							line-height: 16px;
							color: $plan-subtitle;
						}
					}
					.list-of-features {
						margin-top: 1.625rem;
						margin-bottom: 2rem;
						// padding-left: 2rem;
						height: auto;
						overflow: scroll;
						width: 100%;
						.feature-item {
							&:not(:last-child) {
								margin-bottom: 20px;
							}
							p {
								margin: 0;
								font-size: 14px;
								line-height: 17px;
								font-weight: 600;
								color: #3a393a;
								font-family: $main-font;
							}
							display: grid;
							grid-template-columns: max-content max-content 1fr;
							// grid-auto-flow: column;
							justify-content: left;
							align-items: center;
							column-gap: 1rem;
							padding-bottom: 0.5rem;
						}
						.bonus {
							font-family: "Nunito Sans", "Montserrat";
							font-weight: 900 !important;
							font-size: 1rem;
							line-height: 0px;
							color: #e9beb3 !important;
							// padding-left: 2rem;
							justify-self: end;
						}

						.optional-add-ons {
							border-top: 1px dashed rgba(0, 0, 0, 0.12);
							padding-top: 1rem;
							// margin-top: 30px;
							margin-bottom: 16px;
							font-family: $main-font;
							font-style: normal;
							font-weight: 600;
							font-size: 14px;
							line-height: 17px;
							color: $plan-subtitle;
						}
					}

					.premium-plan-terms {
						margin-top: 38px;
						font-family: $main-font;
						font-style: normal;
						font-weight: 500;
						font-size: 14px;
						line-height: 22px;
						letter-spacing: -0.02em;
						color: $border-6;
					}
				}
			}
			.mobile-only-plan-card{
				.card-header {
					.plan-title-wrapper {
						width: 100%;
						.plan-title {
							width: 100%;
							text-align: center;
							font-family: $main-font;
						}
					}
				}
				.card-footer {
					margin-top: 1rem;
					display: flex;
					align-items: center;
					gap: 0.5rem;
					.info-icon-wrapper {

					}
					.footer-text {
						color: $color-light-gray-2;
						font-size: .625rem;
						span {
							font-weight: 600;
						}
					}
				}
			}
		}
		.standard {
			// background: #FBF3F1;
			// padding: 2rem 1.5rem;
			.standard-main-text {
				font-size: 1.5rem;
				line-height: 1.5rem;
				color: #292929;
				// padding: 4rem 0;
				text-align: center;
			}
			.card {
				.plan-title {
					color: #292929;
				}
				.plan-strike-off-container {
					.plan-sub-title {
						// padding-bottom: 2.8rem;
						span {
							background: #faf0ec;
							// font-size: 0.9rem;
							font-size: 1.45rem;
							line-height: 1rem;
							letter-spacing: 0.05em;
							.bold {
								font-weight: 800;
							}
						}
					}
				}
			}
		}
	}
	.highlight-red {
		color: #cc4040 !important;
	}
	.mobile-cant-buy-container {
		background: rgba(255, 255, 255, 0.75);
		.popup-container {
			background: #fbf3f1;
			box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
			max-width: 90%;
			padding: 1rem 0rem;
			.close-popup {
				right: 0rem;
    		top: -2rem;
			}
			.popup-details {
				padding: 1rem;
			}
			p {
				font-size: 2rem;
				font-family: maven pro;
				color: black;
			}
		}
	}
	.mobile-downgrade {
		// background: red;
		display: flex;
    width: 100%;
    height: 100%;
		.popup-container {
			// height: 60vh;
			// width: 50vw;
			display: flex;
			max-width: 90%;
			padding: 0;
			background: #ffab40;
			.close-popup {
				right: 0rem;
    		top: -2rem;
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
				display: flex;
				flex-direction: column;
				width: 100%;
				.content {
					padding: 2rem 0.5rem;
    			position: relative;
    			width: 100%;
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
						row-gap: 1rem;
						padding: 1rem;
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
					padding: 2rem 4rem;
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
	.recommended-addons {
		.addon-item {
			display: flex;
			width: 100%;
			align-items: center;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			padding-bottom: 1.25rem;
			margin-bottom: 2.25rem;

      @media only screen and (max-width: 1024px) {
        padding-bottom: 25px;
        margin-bottom: 24px;
			}

			svg {
        display: block;
				margin-right: 1.125rem;
				flex-shrink: 0;
        
        @media only screen and (max-width: 1024px) {
          margin-right: 12px;
          align-self: flex-start;
        }
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

            @media only screen and (max-width: 1024px) {
              font-size: 14px;
              line-height: 1.4;
            }
					}

					.description {
						font-weight: 500;
						font-size: 12px;
						line-height: 20px;
						color: #808080;
					}
				}

        .price-and-action-wrapper {
          display: none;
          @media only screen and (max-width: 1024px) {
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
          }
        }
			}

      .price {
        font-weight: 600;
        color: $plan-title;
        margin-right: 1.5rem;
        font-size: 0.875rem;
        line-height: 1.0625rem;

        @media only screen and (max-width: 1024px) {
          font-size: 14px;
        }
      }

			.addon-action {
        justify-self: flex-end;
				color: #cc4040;
				font-size: 0.875rem;
				text-transform: uppercase;
				cursor: pointer;
        
        @media only screen and (max-width: 1024px) {
          font-size: 14px;
        }

				.add-btn {
					font-weight: 700;
					line-height: 1.125rem;
					background: #f8f0ed;
					padding: 0.3125rem 1rem;

          @media only screen and (max-width: 1024px) {
            padding: 5px 16px;
          }

					&:hover {
						color: $color-white;
						background: #cc4040;
					}
				}

				.remove-btn {
					font-weight: 500;
					line-height: 1.125rem;
				}
			}
		}
	}
	// PIXEL 2 && Iphone 6/7/8 plus
	@media only screen and (min-device-width: 320px) and (min-device-height: 640px) and (max-device-height: 750px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
	}
	// PIXEL 2XL && Iphone X
	@media only screen and (min-device-width: 320px) and (min-device-height: 750px) and (max-device-height: 850px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
	}
	// IPHONE 6/7/8
	@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2) {
	}
	@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3) {
		//  p {
		//     color: yellow !important;
		//   }
	}
	// Iphone XR & Max
	@media only screen and (min-device-width: 400px) and (min-device-height: 850px) and (max-device-height: 900px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1) {
		/* Styles - SE*/
	}
	//iphone 5
	@media only screen and (min-device-width: 320px) and (max-device-height: 600px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2) {
		/* Styles -SE Basic Mobile Responsive*/
		.mobile-plans-main {
			.plan-cards {
				.card {
					.plan-strike-off-container {
						.plan-sub-title {
							font-size: 1.25rem !important;
						}
					}
				}
			}
			.standard {
				.card {
					.plan-strike-off-container {
						.plan-sub-title {
							span {
								font-size: 1.25rem !important;
							}
						}
					}
				}
			}
		}
	}
	//MOTOG4
	@media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3) {
	}
	//iphone 4
	@media only screen and (min-device-width: 320px) and (max-device-height: 500px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2) {
		.mobile-plans-main {
			.plan-cards {
				.card {
					.plan-strike-off-container {
						.plan-sub-title {
							font-size: 1.25rem !important;
						}
					}
				}
			}
			.standard {
				.card {
					.plan-strike-off-container {
						.plan-sub-title {
							span {
								font-size: 1.25rem !important;
							}
						}
					}
				}
			}
		}
	}
	//SamSung and Edge
	@media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1) {
	}
	.main-loading {
		.loading-container {
			width: 50vw !important;
		}
	}
	.mobile-plans-page-logout-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: flex-end;
		gap: 0.25rem;
		background: #000;
		color: #fff;
		border-radius: 6px;
		padding: 0.5rem;
		margin: 0 1rem;
		svg {
			width: 1.25rem;
			height: 1.25rem;
		}
	}
	.extra-space {
		height: 15vh;
	}
</style>

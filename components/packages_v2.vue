<template>
	<div v-if="!loadingPaymentPage">
		<div id="first"></div>
		<div id="navbar-top"></div>
		<div id="parent-container"></div>
    <div v-show ="isUserATargetForPayAsYouGoPlan && isDataAvailable" class="pay-as-you-go-wrapper">
      <div class="text-wrapper">
        <div class="pay-as-you-go-heading">
          {{$t("plansNew.payAsYouGoBannerLine1[0]")}} <span>{{$t("plansNew.payAsYouGoBannerLine1[1]")}}</span>
        </div>
        <div class="pay-as-you-go-sub-title">
          {{$t("plansNew.payAsYouGoSubtitle")}}
        </div>
      </div>
      <div 
        class="know-more-button" 
        @click="onKnowMoreButtonClick"
      >
        {{$t("buttonText.learnMore")}}
      </div>
    </div>
    <div v-if="isDataAvailable" class="plan-period-toggle">
      <div class="toggle-item" :class="{'is-active': currentlyActivePeriod === 'monthly'}" @click="togglePlanPeriod('monthly')">{{$t("buttonText.monthly")}}</div>
      <div class="toggle-item" :class="{'is-active': currentlyActivePeriod === 'yearly'}" @click="togglePlanPeriod('yearly')">
        {{ $t("buttonText.yearly") }}
        <div class="save-percent-prompt">
          <svg width="29" height="15" viewBox="0 0 29 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.5 1.49991C22.2218 2.02455 8.5 0.499909 4.45664 9.24109C3.6499 10.4734 3.13458 12.1255 2.60654 13.4822M0.814511 10.485C0.652067 10.7433 1.65117 12.7986 1.87739 13.0948C2.61456 14.0599 2.29299 14.3125 3.6605 13.393C4.57838 12.7758 5.38984 12.4462 6.39151 11.9843" stroke="#CC4040" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          {{ $t("plansNew.saveUpto") }}
        </div>
      </div>
    </div>
    <div v-if="isDataAvailable" class="period-toggle-subtitle">
       {{$t("plansNew.plansNewSubtitle[0]")}} <span>{{$t("plansNew.plansNewSubtitle[1]")}}</span> {{$t("plansNew.plansNewSubtitle[2]")}} <span>{{$t("plansNew.plansNewSubtitle[3]")}}</span>
    </div>
		<div
			class="plansnew-main-container"
			v-if="isDataAvailable"
			@click.prevent="isFilterDropdown = false"
		>
			<div v-for="(item, key) in displayPlan" :key="key">
				<div
					v-bind:class="{
						'basic-main': isPackageNeoBasic(key),
						'standard-main': isPackageNeoStandard(key),
						'pre-main': isPackageNeoPremium(key),
					}"
					v-for="( pItem, index ) in packageDetails[displayPlan[key]]"
					v-if="pItem.package === key"
					:key="pItem.package + index"
				>
					<div class="plan-card">
						<div class="card-header">
							<p class="plan-title">{{ key.split("Neo ")[1] }}</p>
							<p class="plan-sub-title" v-if="isPackageNeoStandard(key)">{{ $t("plansNew.standardPlanSubtitle") }}</p>
							<p class="plan-sub-title" v-if="isPackageNeoBasic(key)">{{ $t("plansNew.basicPlanSubtitle") }}</p>
							<p class="plan-sub-title" v-if="isPackageNeoPremium(key)">{{ $t("plansNew.premiumPlanSubTitle") }}</p>
						</div>
						<p class="plan-bill-title"></p>
						<span class="standard-price-details">
							<span class="price-details">
								<h1
									v-if="getCurrencySymbol.toString().length == 1"
									class="bolder"
									v-bind:style="{
										fontSize:
											144 /
												(parseInt(pItem.finalPrice.toString().length) +
													parseInt(getCurrencySymbol.toString().length - 1)) >
											40
												? 40
												: 144 /
														(parseInt(
															pItem.finalPrice.toString().length == 3
																? 2
																: pItem.finalPrice.toString().length
														) +
															parseInt(getCurrencySymbol.toString().length - 1)) +
												  'px',
									}"
								>
									<span
										v-bind:style="{
											fontSize:
												(getCurrencySymbol.toString().length == 1
													? 144 / parseInt(pItem.finalPrice.toString().length) > 40
														? 40
														: 144 / parseInt(pItem.finalPrice.toString().length)
													: 24) + 'px',
											marginRight: '2px',
											fontWeight: 500,
										}"
										>{{ getCurrencySymbol }}</span
									>{{ pItem.finalPrice }}
								</h1>
								<h1 v-else class="bolder" v-bind:style="{ fontSize: '41px' }">
									<span v-bind:style="{ fontSize: '21px', marginRight: '2px', fontWeight: 600 }">{{
										getCurrencySymbol
									}}</span
									>{{ pItem.finalPrice }}
								</h1>

								<p>/</p>
								<p>{{ $t("plansNew.perMonth") }}</p>
							</span>
							<span
								class="old-price-details price-details"
								v-if="displayPlan[key] === 'yearly' || displayPlan[key] === 'quarterly'"
							>
								<h1
									v-bind:style="{
										fontSize:
											64 /
												(pItem.originalPrice.toString().length > 3
													? pItem.originalPrice.toString().length
													: 3) +
											'px',
									}"
								>
									<span
										v-bind:style="{
											fontSize:
												(getCurrencySymbol.toString().length == 1
													? 64 /
													  (pItem.originalPrice.toString().length > 3
															? pItem.originalPrice.toString().length
															: 3)
													: 15) + 'px',
										}"
										>{{ getCurrencySymbol }}</span
									>{{ pItem.originalPrice }}
								</h1>
								<p>/</p>
								<p>{{ $t("plansNew.perMonth") }}</p>
							</span>
						</span>
            <div class="percent-saved-on-yearly-text">
              <span v-if="isPackageNeoBasic(key)">
                <span class="highlight-red">{{$t("plansNew.saveOnYearlySubText[0]")}} 25%</span> {{$t("plansNew.saveOnYearlySubText[1]")}}
              </span>
              <span v-if="isPackageNeoStandard(key) || isPackageNeoPremium(key)">
                <span class="highlight-red">{{$t("plansNew.saveOnYearlySubText[0]")}} 38%</span> {{$t("plansNew.saveOnYearlySubText[1]")}}
              </span>
            </div>
						<button
							class="buy-now"
							@click="handleBuyNowClick(pItem, displayPlan[key])"
							v-bind:class="{
								disabledBtn:
									(user.subInfo && user.subInfo.inherit) ||
									pItem.currentActive ||
									(future &&
										future.length > 0 &&
										future[0].package.displayContext.packageName === key &&
										future[0].package.invoice.period ===
											(displayPlan[key] === 'monthly'
												? 1
												: displayPlan[key] === 'quarterly'
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
												: displayPlan[key] === "quarterly"
												? 3
												: 12) &&
									  future[0].package.displayContext.packageName === key
									? $t("buttonText.futurePlan")
									: currentBilling &&
									  currentBilling.displayContext &&
									  !isFreeTrail &&
									  currentBilling.analyticsData &&
									  currentBilling.analyticsData.analyticsStatus &&
									  currentBilling.analyticsData.analyticsStatus === "paid"
									? $t("buttonText.changePlan")
									: $t("buttonText.buyNow")
							}}
						</button>
						<span class="list-of-features">
							<span
								class="feature-item"
								v-if="pItem.features"
								v-for="(feature, index) in pItem.features"
								:key="feature.value + index"
							>
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="9" fill="#FAF0EC"/>
                  <path d="M5.5 9.66667L7.83333 12L12.5 7" stroke="#CC4040" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
								<p v-html="feature.value"></p>
								<!-- <p
									class="bonus"
									v-if="isPackageNeoStandard(key) && displayPlan[key] === 'monthly' && index === 0"
								>
									{{ getXtimes.std }}
								</p>
								<p
									class="bonus"
									v-if="isPackageNeoPremium(key) && displayPlan[key] === 'monthly' && index === 0"
								>
									{{ getXtimes.pre }}
								</p> -->
							</span>
						</span>
            <div v-if="pItem.addFeatures.length" class="optional-add-ons">
              <span v-if="isPackageNeoStandard(key)">
                {{ $t("plansNew.optionalAddOnsSubheadingStandard") }}
              </span>
              <span v-if="isPackageNeoBasic(key)">
                {{ $t("plansNew.optionalAddOnsSubheadingBasic") }}
              </span>
              <span v-if="isPackageNeoPremium(key)">
                {{ $t("plansNew.optionalAddOnsSubheadingPremium") }}
              </span>
            </div>
						<span v-if="pItem.addFeatures" class="list-of-features plan-add-ons">
							<span
								class="feature-item"
								v-for="extra in pItem.addFeatures"
								:key="extra.value + key"
							>
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="9" fill="#FAF0EC"/>
                  <path d="M9 6V12" stroke="#CC4040" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 9L6 9" stroke="#CC4040" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
								<p v-html="extra.value"></p>
							</span>
						</span>
						<!-- <p class="free-credits" v-if="key !== 'Neo Basic'">++ Everything in Neo {{key === 'Neo Standard' ? 'Basic': 'Standard'}}</p> -->
            <!-- <div v-if="isPackageNeoPremium(key)" class="premium-plan-addon-text">
              Other than that, all the features and updates will be included in this plan.
            </div> -->
          </div>
				</div>
			</div>
			<div class="popup-div package-popup" :class="showPopup ? 'showPopUp' : ''">
				<div
					class="popup-container"
					:class="currentBilling && future && future.length == 0 ? '' : 'future-plan-container'"
					@click.stop
				>
					<div class="close-popup" @click="closePopup">
						<svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
								fill="white"
							/>
						</svg>
					</div>
					<!-- <div v-if="currentBilling && future.length==0">
          <packageComponent :packages="packages" :align="'center'" :user="user" :ppOrigin="'changeplan'"/>
        </div> -->
					<div class="future-plan-taken">
						<p v-if="user && user.accountType == 'root'">
							{{$t("plansNew.futurePlanTaken")}}
							<a href="mailto:connect@foyr.com">connect@foyr.com</a>
						</p>
						<p v-else>
							{{$t("plansNew.loginForBillingText")}}
						</p>
					</div>
				</div>
			</div>
			<!-- **********************UPGRADE/DOWNGRADE ALERT****************** -->
			<div class="popup-div change-plan-alert-popup" :class="changePlanAlert ? 'showPopUp' : ''">
				<div class="popup-container" @click.stop>
					<div class="close-popup" @click="changePlanAlert = false">
						<svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
								fill="white"
							/>
						</svg>
					</div>
					<div class="cpa-container">
						<div class="content">
							<p class="heading-1">{{$t("plansNew.reviewTextOnPurchase")}}</p>
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
										{{$t("plansNew.reviewPointsOnPurchase[0]")}}
										<b>{{
											selectedPlanDetails
												? `${selectedPlanDetails.package} - ${selectedPlanDetails.duration}`
												: "N/A"
										}}</b>
										{{$t("plansNew.reviewPointsOnPurchase[1]")}} <b>{{ formattedDate }}</b>
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
										{{$t("plansNew.reviewPointsOnPurchase[2]")}}
										<b
											>
                      <!-- {{ getCurrencySymbol
											}}{{
												selectedPlanDetails.finalPrice *
												(selectedPlanDetails.duration == "monthly"
													? 1
													: selectedPlanDetails.duration == "quarterly"
													? 3
													: 12)
											}} -->
                      {{ getFinalPlanPriceWithAdons }}
											<b style="font-weight: normal">{{$t("plansNew.reviewPointsOnPurchase[3]")}}</b>
											<b>{{
												selectedPlanDetails.duration === "monthly"
													? "month"
													: selectedPlanDetails.duration === "quarterly"
													? "quarter"
													: "year"
											}}</b></b
										>
										{{$t("plansNew.reviewPointsOnPurchase[4]")}} <b>{{ formattedDate }}</b>
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
										{{$t("plansNew.reviewPointsOnPurchase[5]")}}
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
							<button @click="openPaymentPopup(false)">{{$t("buttonText.confirm")}}</button>
						</div>
						<!-- <p>Your new plan will be effective from {{selectedPlanDetails.nextBillingDate}}. Are you sure you want to change your plan?</p> -->
					</div>
					</div>
			</div>
			<!-- *********************END********************** -->
      <!-- **********************ADDONs POPUP****************** -->
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
			<!-- <div class="popup-div add-ons-popup" :class=" showAddOnsPopup ? 'showPopUp' : ''">
				  <div class="popup-container" @click.stop>
            <div class="popup-header">
              <div v-if="planDetails" class="plan-details">
                <span class="selected-plan-text">Plan Selected</span>
                <span class="package-name"> {{ planDetails.package.split("Neo")[1] }} <span class="duration">({{duration}})</span></span>
              </div>
              <div class="close-popup" @click="closeAddonPopup">
                <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div class="popup-content">
              <div v-if="showRecommendedAddonsSection" class="optional-add-ons-text">
                Optional add-ons with your plan
              </div>
              <div v-if="showRecommendedAddonsSection" class="recommended-addons">
                <div v-for="item of recommendedAddonsDetails" class="addon-item" :key="item.addon.id">
                  <svg v-if="item.addon.name.toLowerCase().indexOf('elevations') >= 0" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="56" height="56" fill="#F8F0ED"/>
                    <path d="M43.606 12.1061C43.6646 12.0475 43.6646 11.9525 43.606 11.8939L42.6514 10.9393C42.5929 10.8808 42.4979 10.8808 42.4393 10.9393C42.3807 10.9979 42.3807 11.0929 42.4393 11.1515L43.2878 12L42.4393 12.8485C42.3807 12.9071 42.3807 13.0021 42.4393 13.0607C42.4979 13.1192 42.5929 13.1192 42.6514 13.0607L43.606 12.1061ZM17.9434 12.15H19.0082V11.85H17.9434V12.15ZM21.1379 12.15H23.2677V11.85H21.1379V12.15ZM25.3974 12.15H27.5271V11.85H25.3974V12.15ZM29.6568 12.15H31.7865V11.85H29.6568V12.15ZM33.9162 12.15H36.046V11.85H33.9162V12.15ZM38.1757 12.15H40.3054V11.85H38.1757V12.15ZM42.4351 12.15H43.5V11.85H42.4351V12.15ZM43.7121 12.2121C43.8293 12.095 43.8293 11.905 43.7121 11.7879L41.8029 9.87868C41.6857 9.76152 41.4958 9.76152 41.3786 9.87868C41.2615 9.99584 41.2615 10.1858 41.3786 10.3029L43.0757 12L41.3786 13.6971C41.2615 13.8142 41.2615 14.0042 41.3786 14.1213C41.4958 14.2385 41.6857 14.2385 41.8029 14.1213L43.7121 12.2121ZM17.9434 12.3H19.0082V11.7H17.9434V12.3ZM21.1379 12.3H23.2677V11.7H21.1379V12.3ZM25.3974 12.3H27.5271V11.7H25.3974V12.3ZM29.6568 12.3H31.7865V11.7H29.6568V12.3ZM33.9162 12.3H36.046V11.7H33.9162V12.3ZM38.1757 12.3H40.3054V11.7H38.1757V12.3ZM42.4351 12.3H43.5V11.7H42.4351V12.3Z" fill="#2D2D2D"/>
                    <path d="M12.1061 15.7511C12.0475 15.6925 11.9525 15.6925 11.8939 15.7511L10.9393 16.7057C10.8808 16.7642 10.8808 16.8592 10.9393 16.9178C10.9979 16.9764 11.0929 16.9764 11.1515 16.9178L12 16.0693L12.8485 16.9178C12.9071 16.9764 13.0021 16.9764 13.0607 16.9178C13.1192 16.8592 13.1192 16.7642 13.0607 16.7057L12.1061 15.7511ZM12.15 43.5L12.15 42.5128L11.85 42.5128L11.85 43.5L12.15 43.5ZM12.15 40.5383L12.15 38.5638L11.85 38.5638L11.85 40.5383L12.15 40.5383ZM12.15 36.5893L12.15 34.6148L11.85 34.6148L11.85 36.5893L12.15 36.5893ZM12.15 32.6403L12.15 30.6658L11.85 30.6658L11.85 32.6403L12.15 32.6403ZM12.15 28.6913L12.15 26.7168L11.85 26.7168L11.85 28.6913L12.15 28.6913ZM12.15 24.7423L12.15 22.7679L11.85 22.7679L11.85 24.7423L12.15 24.7423ZM12.15 20.7934L12.15 18.8189L11.85 18.8189L11.85 20.7934L12.15 20.7934ZM12.15 16.8444L12.15 15.8571L11.85 15.8571L11.85 16.8444L12.15 16.8444ZM12.2121 15.645C12.095 15.5279 11.905 15.5279 11.7879 15.645L9.87868 17.5542C9.76152 17.6714 9.76152 17.8613 9.87868 17.9785C9.99584 18.0956 10.1858 18.0956 10.3029 17.9785L12 16.2814L13.6971 17.9785C13.8142 18.0956 14.0042 18.0956 14.1213 17.9785C14.2385 17.8613 14.2385 17.6714 14.1213 17.5542L12.2121 15.645ZM12.3 43.5L12.3 42.5128L11.7 42.5128L11.7 43.5L12.3 43.5ZM12.3 40.5383L12.3 38.5638L11.7 38.5638L11.7 40.5383L12.3 40.5383ZM12.3 36.5893L12.3 34.6148L11.7 34.6148L11.7 36.5893L12.3 36.5893ZM12.3 32.6403L12.3 30.6658L11.7 30.6658L11.7 32.6403L12.3 32.6403ZM12.3 28.6913L12.3 26.7168L11.7 26.7168L11.7 28.6913L12.3 28.6913ZM12.3 24.7423L12.3 22.7679L11.7 22.7679L11.7 24.7423L12.3 24.7423ZM12.3 20.7934L12.3 18.8189L11.7 18.8189L11.7 20.7934L12.3 20.7934ZM12.3 16.8444L12.3 15.8571L11.7 15.8571L11.7 16.8444L12.3 16.8444Z" fill="#2D2D2D"/>
                    <path d="M20.42 34.9102H30.5H40.58C40.7279 34.9102 40.8593 34.8619 40.9542 34.7695C41.0494 34.677 41.1 34.5478 41.1 34.4017V27.0497V19.6977V14.7963C41.1 14.6502 41.0494 14.5211 40.9542 14.4285C40.8593 14.3362 40.7279 14.2879 40.58 14.2879H32.6H27.98H20.42C20.2721 14.2879 20.1407 14.3362 20.0458 14.4285C19.9506 14.5211 19.9 14.6502 19.9 14.7963V24.599V27.8666V32.7679V34.4017C19.9 34.5478 19.9506 34.6769 20.0458 34.7695C20.1407 34.8618 20.2721 34.9102 20.42 34.9102ZM20.94 28.375H24.9284C24.6796 30.4031 23.0308 32.0078 20.94 32.2486V28.375ZM20.94 15.3048H27.46V17.5555H27.14C26.9921 17.5555 26.8607 17.6038 26.7658 17.6961C26.6706 17.7886 26.62 17.9178 26.62 18.0639C26.62 18.21 26.6706 18.3391 26.7658 18.4317C26.8607 18.524 26.9921 18.5723 27.14 18.5723H28.82C28.9679 18.5723 29.0993 18.524 29.1942 18.4317C29.2894 18.3391 29.34 18.21 29.34 18.0639C29.34 17.9178 29.2894 17.7886 29.1942 17.6961C29.0993 17.6038 28.9679 17.5555 28.82 17.5555H28.5V15.3048H32.08V19.6977C32.08 19.8438 32.1306 19.9729 32.2258 20.0655C32.3207 20.1578 32.4521 20.2061 32.6 20.2061H34.18V20.5146C34.18 20.6607 34.2306 20.7898 34.3257 20.8824C34.4207 20.9747 34.5521 21.023 34.7 21.023C34.8479 21.023 34.9792 20.9747 35.0742 20.8824C35.1693 20.7898 35.2199 20.6607 35.2199 20.5146V18.8808C35.2199 18.7347 35.1693 18.6056 35.0742 18.513C34.9792 18.4207 34.8479 18.3724 34.7 18.3724C34.5521 18.3724 34.4207 18.4207 34.3257 18.513C34.2306 18.6056 34.18 18.7347 34.18 18.8808V19.1892H33.12V15.3048H40.06V19.1892H38.58V18.8808C38.58 18.7347 38.5294 18.6056 38.4342 18.513C38.3393 18.4207 38.2079 18.3724 38.06 18.3724C37.9121 18.3724 37.7807 18.4207 37.6858 18.513C37.5906 18.6056 37.54 18.7347 37.54 18.8808V20.5146C37.54 20.6607 37.5906 20.7898 37.6858 20.8824C37.7807 20.9747 37.9121 21.023 38.06 21.023C38.2079 21.023 38.3393 20.9747 38.4342 20.8824C38.5294 20.7898 38.58 20.6607 38.58 20.5146V20.2061H40.06V26.5412H37.74V26.2328C37.74 26.0867 37.6894 25.9576 37.5942 25.865C37.4993 25.7727 37.3679 25.7244 37.22 25.7244C37.0721 25.7244 36.9407 25.7727 36.8458 25.865C36.7506 25.9576 36.7 26.0867 36.7 26.2328V27.8666C36.7 28.0127 36.7506 28.1418 36.8458 28.2344C36.9407 28.3267 37.0721 28.375 37.22 28.375C37.3679 28.375 37.4993 28.3267 37.5942 28.2344C37.6894 28.1418 37.74 28.0127 37.74 27.8666V27.5581H40.06V33.8933H31.02V27.5581H33.34V27.8666C33.34 28.0127 33.3906 28.1418 33.4858 28.2344C33.5807 28.3267 33.7121 28.375 33.86 28.375C34.0079 28.375 34.1393 28.3267 34.2342 28.2344C34.3294 28.1418 34.38 28.0127 34.38 27.8666V26.2328C34.38 26.0867 34.3294 25.9576 34.2342 25.865C34.1393 25.7727 34.0079 25.7244 33.86 25.7244C33.7121 25.7244 33.5807 25.7727 33.4858 25.865C33.3906 25.9576 33.34 26.0867 33.34 26.2328V26.5412H30.5C30.3521 26.5412 30.2207 26.5895 30.1258 26.6819C30.0306 26.7744 29.98 26.9036 29.98 27.0497V33.8933H20.94V33.2532C23.7716 32.9996 25.98 30.6942 25.98 27.8666C25.98 27.7205 25.9294 27.5913 25.8342 27.4988C25.7393 27.4064 25.6079 27.3581 25.46 27.3581H20.94V25.1075H27.98C28.1279 25.1075 28.2593 25.0592 28.3542 24.9669C28.4494 24.8743 28.5 24.7452 28.5 24.599V21.8399H28.82C28.9679 21.8399 29.0993 21.7916 29.1942 21.6993C29.2894 21.6067 29.34 21.4776 29.34 21.3315C29.34 21.1854 29.2894 21.0562 29.1942 20.9637C29.0993 20.8713 28.9679 20.823 28.82 20.823H27.14C26.9921 20.823 26.8607 20.8713 26.7658 20.9637C26.6706 21.0562 26.62 21.1854 26.62 21.3315C26.62 21.4776 26.6706 21.6067 26.7658 21.6993C26.8607 21.7916 26.9921 21.8399 27.14 21.8399H27.46V24.0906H20.94V15.3048Z" fill="#63605F" stroke="#F8F0ED" stroke-width="0.2"/>
                  </svg>
                  <svg v-if="item.addon.name.toLowerCase().indexOf('floor') >= 0" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="56" height="56" fill="#F8F0ED"/>
                    <path d="M19.8604 32.1907C19.8604 32.3966 19.6888 32.5635 19.4771 32.5635H15.8833C15.6716 32.5635 15.5 32.3966 15.5 32.1907C15.5 31.9848 15.6716 31.8179 15.8833 31.8179H19.4771C19.6888 31.8179 19.8604 31.9848 19.8604 32.1907ZM24.4125 15.7415C25.8921 15.7415 27.0958 16.9121 27.0958 18.351V19.0034C27.0958 19.2092 26.9242 19.3762 26.7125 19.3762H22.1125C21.9008 19.3762 21.7292 19.2092 21.7292 19.0034V18.351C21.7292 16.9121 22.9329 15.7415 24.4125 15.7415ZM22.4958 18.351V18.6306H26.3292V18.351C26.3292 17.3232 25.4693 16.4871 24.4125 16.4871C23.3556 16.4871 22.4958 17.3232 22.4958 18.351ZM18.6865 31.0723C18.8982 31.0723 19.0701 30.9054 19.0698 30.699L19.0497 16.1289C19.0479 14.8336 20.1253 13.7843 21.4573 13.7843H21.6215C22.3901 13.7843 23.0946 14.1287 23.5542 14.7291C23.6806 14.8942 23.9207 14.9285 24.0905 14.8055C24.2604 14.6826 24.2955 14.4491 24.1691 14.2839C23.5723 13.5043 22.6199 13.0388 21.6215 13.0388H21.4573C19.7012 13.0388 18.2807 14.422 18.283 16.1299L18.3031 30.7001C18.3034 30.9058 18.475 31.0723 18.6865 31.0723ZM36.775 25.9931V23.5624C36.775 22.4618 35.8542 21.5663 34.7224 21.5663H24.2609C23.1291 21.5663 22.2083 22.4618 22.2083 23.5624V24.4554C22.2083 24.6612 22.38 24.8282 22.5917 24.8282C22.8034 24.8282 22.975 24.6612 22.975 24.4554V23.5624C22.975 22.8728 23.5519 22.3118 24.2609 22.3118H29.1562V26.5057C29.1562 26.7116 29.3279 26.8785 29.5396 26.8785C29.7513 26.8785 29.9229 26.7116 29.9229 26.5057V22.3118H34.7224C35.4315 22.3118 36.0083 22.8728 36.0083 23.5624V26.003C35.1475 26.0932 34.475 26.8038 34.475 27.6646V27.9968C34.475 28.2027 34.6466 28.3696 34.8583 28.3696C35.07 28.3696 35.2417 28.2027 35.2417 27.9968V27.6646C35.2417 27.1541 35.6687 26.7387 36.1937 26.7387H36.7813C37.3062 26.7387 37.7333 27.1541 37.7333 27.6646V30.8921C37.7333 31.4026 37.3062 31.818 36.7813 31.818H35.2417C35.2417 29.3781 35.2435 29.5282 35.2384 29.488C35.2676 29.2604 35.0845 29.0687 34.8583 29.0687H26.2812C26.0696 29.0687 25.8979 29.2356 25.8979 29.4414C25.8979 29.6473 26.0696 29.8142 26.2812 29.8142H34.475V32.1908C34.475 32.3966 34.6466 32.5635 34.8583 32.5635H36.7813C37.729 32.5635 38.5 31.8137 38.5 30.8921V27.6646C38.5 26.755 37.7439 25.9931 36.775 25.9931ZM32.8937 31.8179C32.5471 31.8179 22.8424 31.8179 22.2979 31.8179C21.773 31.8179 21.3458 31.4025 21.3458 30.892V27.6646C21.3458 27.1541 21.773 26.7387 22.2979 26.7387H22.8854C23.4104 26.7387 23.8375 27.1541 23.8375 27.6646V29.7676C23.8375 29.9735 24.0092 30.1404 24.2209 30.1404C24.4326 30.1404 24.6042 29.9735 24.6042 29.7676V27.6646C24.6042 26.7429 23.8332 25.9931 22.8854 25.9931H22.2979C21.3502 25.9931 20.5792 26.7429 20.5792 27.6646V30.8921C20.5792 31.8137 21.3502 32.5635 22.2979 32.5635H32.8937C33.1054 32.5635 33.2771 32.3966 33.2771 32.1908C33.2771 31.9849 33.1054 31.8179 32.8937 31.8179Z" fill="black" fill-opacity="0.6"/>
                    <path d="M11.6061 13.8956C11.5475 13.837 11.4525 13.837 11.3939 13.8956L10.4393 14.8502C10.3808 14.9088 10.3808 15.0038 10.4393 15.0623C10.4979 15.1209 10.5929 15.1209 10.6515 15.0623L11.5 14.2138L12.3485 15.0623C12.4071 15.1209 12.5021 15.1209 12.5607 15.0623C12.6192 15.0038 12.6192 14.9088 12.5607 14.8502L11.6061 13.8956ZM11.65 41.6445L11.65 40.6573L11.35 40.6573L11.35 41.6445L11.65 41.6445ZM11.65 38.6828L11.65 36.7083L11.35 36.7083L11.35 38.6828L11.65 38.6828ZM11.65 34.7338L11.65 32.7593L11.35 32.7593L11.35 34.7338L11.65 34.7338ZM11.65 30.7848L11.65 28.8103L11.35 28.8103L11.35 30.7848L11.65 30.7848ZM11.65 26.8359L11.65 24.8614L11.35 24.8614L11.35 26.8359L11.65 26.8359ZM11.65 22.8869L11.65 20.9124L11.35 20.9124L11.35 22.8869L11.65 22.8869ZM11.65 18.9379L11.65 16.9634L11.35 16.9634L11.35 18.9379L11.65 18.9379ZM11.65 14.9889L11.65 14.0017L11.35 14.0017L11.35 14.9889L11.65 14.9889ZM11.7121 13.7895C11.595 13.6724 11.405 13.6724 11.2879 13.7895L9.37868 15.6987C9.26152 15.8159 9.26152 16.0058 9.37868 16.123C9.49584 16.2402 9.68579 16.2402 9.80294 16.123L11.5 14.4259L13.1971 16.123C13.3142 16.2402 13.5042 16.2402 13.6213 16.123C13.7385 16.0058 13.7385 15.8159 13.6213 15.6987L11.7121 13.7895ZM11.8 41.6445L11.8 40.6573L11.2 40.6573L11.2 41.6445L11.8 41.6445ZM11.8 38.6828L11.8 36.7083L11.2 36.7083L11.2 38.6828L11.8 38.6828ZM11.8 34.7338L11.8 32.7593L11.2 32.7593L11.2 34.7338L11.8 34.7338ZM11.8 30.7848L11.8 28.8103L11.2 28.8103L11.2 30.7848L11.8 30.7848ZM11.8 26.8359L11.8 24.8614L11.2 24.8614L11.2 26.8359L11.8 26.8359ZM11.8 22.8869L11.8 20.9124L11.2 20.9124L11.2 22.8869L11.8 22.8869ZM11.8 18.9379L11.8 16.9634L11.2 16.9634L11.2 18.9379L11.8 18.9379ZM11.8 14.9889L11.8 14.0017L11.2 14.0017L11.2 14.9889L11.8 14.9889Z" fill="#2D2D2D"/>
                    <path d="M44.6061 13.8956C44.5475 13.837 44.4525 13.837 44.3939 13.8956L43.4393 14.8502C43.3808 14.9088 43.3808 15.0038 43.4393 15.0623C43.4979 15.1209 43.5929 15.1209 43.6515 15.0623L44.5 14.2138L45.3485 15.0623C45.4071 15.1209 45.5021 15.1209 45.5607 15.0623C45.6192 15.0038 45.6192 14.9088 45.5607 14.8502L44.6061 13.8956ZM44.65 41.6445L44.65 40.6573L44.35 40.6573L44.35 41.6445L44.65 41.6445ZM44.65 38.6828L44.65 36.7083L44.35 36.7083L44.35 38.6828L44.65 38.6828ZM44.65 34.7338L44.65 32.7593L44.35 32.7593L44.35 34.7338L44.65 34.7338ZM44.65 30.7848L44.65 28.8103L44.35 28.8103L44.35 30.7848L44.65 30.7848ZM44.65 26.8359L44.65 24.8614L44.35 24.8614L44.35 26.8359L44.65 26.8359ZM44.65 22.8869L44.65 20.9124L44.35 20.9124L44.35 22.8869L44.65 22.8869ZM44.65 18.9379L44.65 16.9634L44.35 16.9634L44.35 18.9379L44.65 18.9379ZM44.65 14.9889L44.65 14.0017L44.35 14.0017L44.35 14.9889L44.65 14.9889ZM44.7121 13.7895C44.595 13.6724 44.405 13.6724 44.2879 13.7895L42.3787 15.6987C42.2615 15.8159 42.2615 16.0058 42.3787 16.123C42.4958 16.2402 42.6858 16.2402 42.8029 16.123L44.5 14.4259L46.1971 16.123C46.3142 16.2402 46.5042 16.2402 46.6213 16.123C46.7385 16.0058 46.7385 15.8159 46.6213 15.6987L44.7121 13.7895ZM44.8 41.6445L44.8 40.6573L44.2 40.6573L44.2 41.6445L44.8 41.6445ZM44.8 38.6828L44.8 36.7083L44.2 36.7083L44.2 38.6828L44.8 38.6828ZM44.8 34.7338L44.8 32.7593L44.2 32.7593L44.2 34.7338L44.8 34.7338ZM44.8 30.7848L44.8 28.8103L44.2 28.8103L44.2 30.7848L44.8 30.7848ZM44.8 26.8359L44.8 24.8614L44.2 24.8614L44.2 26.8359L44.8 26.8359ZM44.8 22.8869L44.8 20.9124L44.2 20.9124L44.2 22.8869L44.8 22.8869ZM44.8 18.9379L44.8 16.9634L44.2 16.9634L44.2 18.9379L44.8 18.9379ZM44.8 14.9889L44.8 14.0017L44.2 14.0017L44.2 14.9889L44.8 14.9889Z" fill="#2D2D2D"/>
                    <rect x="31.5" y="20" width="8" height="4" stroke="#63605F" stroke-width="0.8" stroke-linejoin="round"/>
                  </svg>
                  <div class="details-container">
                    <div class="name-and-price-wrapper">
                      <div class="name">{{ item.addon.name }}</div>
                      <div class="price">{{ getCurrencySymbol }} {{ item.addon.price / 100 }}</div>
                      <div class="addon-action">
                        <div
                          v-if="!selectedRecommendedAddonsForCheckout.find(e => e.id === item.addon.id)"
                          class="add-btn"
                          @click="selectRecommendedAddon(item.addon)"
                        >
                          ADD
                        </div>
                        <div v-else class="remove-btn" @click="removeRecommendedAddon(item.addon)">Remove</div>
                      </div>
                    </div>
                    <div class="description">
                      {{ item.addon.description }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="total-price-and-action-section">
                <div v-if="isFreeTrail" class="total-price">
                  <span>Total Price</span>
                  {{ getFinalPlanPriceWithAdons }}
                </div>
                <div v-else></div>
                <div class="continue-btn" @click="handleContinueButtonClick(planDetails, duration)">
                  continue
                </div>
              </div>
            </div>
            <div class="popup-footer">
              <div class="optional-add-ons-text">
                CUSTOM MODELS
              </div>
              <div class="sub-text">
                You can purchase custom models as per your project need. There are 3 available custom model packs.   
              </div>
              <div class="addons-container">
                <div class="addon" v-for="addonItem in customModeAddonsReversed" :key="addonItem._id">
                  <p
                    class="addon-units"
                  >{{addonItem.displayContext.packageUnits}} Custom {{addonItem.displayContext.packageUnitName}}</p>
                  <p class="addon-cost">({{addonItem.displayContext.currency_symbol}}{{addonItem.displayContext.packageCost}})</p>
                </div>
              </div>
            </div>
					</div>
			</div> -->
			<!-- *********************END********************** -->
			<!-- **********************PAYMENT UPGRADATION ALERT****************** -->
			<div class="popup-div change-plan-alert-popup" :class="isCurrencyMismatch ? 'showPopUp' : ''">
				<div class="popup-container" @click.stop>
					<div class="close-popup" @click="isCurrencyMismatch = false">
						<svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
								fill="white"
							/>
						</svg>
					</div>
					<!-- <div v-if="currentBilling && future.length==0">
          <packageComponent :packages="packages" :align="'center'" :user="user" :ppOrigin="'changeplan'"/>
        </div> -->
					<div class="isCurrencyMismatch-container">
						<div class="content">
							<img src="../assets/images/backgrounds/isCurrencyMismatch.png" />
							<p class="heading-1">{{ $t("plansNew.byUsingLocalCurrency") }}</p>
							<div>
								<p>
									{{ $t("plansNew.helpBillingCurrencyText") }}
								</p>
							</div>
						</div>
						<div class="proceed-btn-container">
							<a class="proceed-btn" @click="openPaymentPopup(false)" href="mailto:connect@foyr.com"
								>{{ $t("buttonText.talkToUs") }}</a
							>
						</div>
					</div>
				</div>
			</div>
			<!-- *********************END********************** -->
			<!-- Processing your payment  ************************ receivingPaymentLoading-->
			<div class="popup-div payment-updating-popup" :class="receivingPaymentLoading ? 'showPopUp' : ''">
				<div class="popup-container" @click.stop>
					<div class="payment-wait-container">
						<img src="~assets/images/loader.gif" alt="" srcset="" />
						<p>{{ $t("plansNew.updateSubscriptionText") }}</p>
					</div>
				</div>
			</div>
			<!-- Processing your payment  ************************ -->

      <!-- special upgrade popup -->
      <!-- <SpecialUpgradePopup 
        :planDetails="planDetails"
        :duration="duration"
        :showSpecialUpgradePopup="showSpecialUpgradePopup"
        @close-popup="closeSpecialUpgradePopup"
        @continue-with-basic="continueWithBasicPlan"
        @go-premium="goPremium"
      /> -->
      <SpecialUpgradePopup 
        :planDetails="planDetails"
        :duration="duration"
        :showSpecialUpgradePopup="showSpecialUpgradePopup"
        :stringReference="'standardUpsellPopup'"
        :bubbleImage="'bubbleUSDCADMonthly.png'"
        :upsellPopupConfig="upsellPopupConfig"
        @close-popup="closeSpecialUpgradePopup"
        @continue-with-basic="continueWithBasicPlan"
        @go-button-click="goStandard"
        class=""
      >
      </SpecialUpgradePopup>

			<MessageComponent :changeRight="message" />
		</div>
    <div v-if="isDataAvailable" class="testimonials-section-wrapper">
      <div class="header">
        Thousands of customers love Neo
      </div>
      <div class="average-ratings-section">
        <div class="customers-image-wrapper">
            <img
              src="~/assets/images/pay-as-you-go/user-images.png"
              alt=""
            />
          </div>
          <div class="rating">
            <div class="image-wrapper">
              <img
                src="~/assets/images/pay-as-you-go/customer-stars.png"
                alt=""
              />
          </div>
          <div class="text">Trusted by 150,000+ </div>
        </div>
      </div>
      <div class="testimonials-wrapper">
        <div class="testimonial">
          <div class="content">
            "I can create stunning 4K renderings within a day and provide walk-through videos to my clients."
          </div>
          <div class="profile-and-reviewer-details">
            <div class="image-wrapper">
              <img src="~/assets/images/pay-as-you-go/reviewer-one.png" alt="">
            </div>
            <div class="reviewer-details">
              <div class="name">Lauren S.</div>
              <div class="profession">Interior Designer</div>
              <div class="review-website">
                <svg width="49" height="14" viewBox="0 0 49 14" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="49" height="14" fill="url(#pattern0_2012_1260)"/>
                  <defs>
                  <pattern id="pattern0_2012_1260" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_2012_1260" transform="matrix(0.00313563 0 0 0.0109747 0 -0.22433)"/>
                  </pattern>
                  <image id="image0_2012_1260" width="320" height="132" xlink:href="data:image/png;base64,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"/>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonial">
          <div class="content">
            "Neo’s extensive online catalog and rendering services helps me save on outsourcing costs and gives me better control over my projects!"
          </div>
          <div class="profile-and-reviewer-details">
            <div class="image-wrapper">
              <img src="~/assets/images/pay-as-you-go/reviewer-two.png" alt="">
            </div>
            <div class="reviewer-details">
              <div class="name">Ashima</div>
              <div class="profession">Interior Designer</div>
              <div class="review-website">
                <svg width="49" height="14" viewBox="0 0 49 14" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="49" height="14" fill="url(#pattern0_2012_1260)"/>
                  <defs>
                  <pattern id="pattern0_2012_1260" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_2012_1260" transform="matrix(0.00313563 0 0 0.0109747 0 -0.22433)"/>
                  </pattern>
                  <image id="image0_2012_1260" width="320" height="132" xlink:href="data:image/png;base64,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"/>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonial">
          <div class="content">
            "The super realistic rendering sells my work and clients love it and it gives me the advantage of selling my ideas."
          </div>
          <div class="profile-and-reviewer-details">
            <div class="image-wrapper">
              <img src="~/assets/images/pay-as-you-go/reviewer-three.png" alt="">
            </div>
            <div class="reviewer-details">
              <div class="name">Jon Juan Martinez</div>
              <div class="profession">Interior Designer</div>
              <div class="review-website">
                <svg width="49" height="14" viewBox="0 0 49 14" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="49" height="14" fill="url(#pattern0_2012_1260)"/>
                  <defs>
                  <pattern id="pattern0_2012_1260" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_2012_1260" transform="matrix(0.00313563 0 0 0.0109747 0 -0.22433)"/>
                  </pattern>
                  <image id="image0_2012_1260" width="320" height="132" xlink:href="data:image/png;base64,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"/>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isDataAvailable && !isFreeTrail"
      class="post-pricing-content"
    >
      <template v-if="false">
        <div class="moodboard-cta">{{ $t("plansNew.moodboardCtaText[0]") }} {{getCurrencySymbol}}{{getMoodboardCTAPricing}}  {{ $t("plansNew.moodboardCtaText[1]") }}</div>
        <div class="cta-action"><a href="https://google.com" target="blank">{{ $t("plansNew.startFreeTrailText") }}</a></div>
      </template>
    </div>
    <div class="main-loading" v-else>
      <div class="loading-container">
        <p>{{ $t("infoText.loading") }}</p>
        <div class="loader"></div>
      </div>
    </div>
		<!-- COUPON CODE --------------------------------- -->
		<CouponCodeComponent />
		<div class="payment-iframe-popup popup-div" :class="launchPaymentIframe ? 'showPopUp' : ''">
			<div class="popup-container">
				<div class="close-popup" @click="closePopup">
					<svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
							fill="white"
						/>
					</svg>
				</div>
				<div class="popup-details">
					<iframe class="free-demo-iframe" width="600" height="668" :src="paymentUrl"></iframe>
				</div>
			</div>
		</div>
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
import { mapActions, mapState, mapGetters } from "vuex";
import CouponCodeComponent from "./shared/couponPopup";
import AddOnsPopup from "./shared/popups/addOnsPopup.vue";
// import SpecialUpgradePopup from "./shared/popups/specialUpgradePopup.vue";
import SpecialUpgradePopup from "./shared/popups/specialUpgradePopupV2.vue";

export default {
  components: {
    CouponCodeComponent,
    AddOnsPopup,
    SpecialUpgradePopup
  },
  head() {
    return {
      title: "Neo - Settings"
    };
  },
  props: {
    addon: Object
  },
  data() {
    return {
      message: {
        value: "",
        error: false,
        global: false
      },
      planSeperation: {
        monthly: [],
        quarterly: [],
        yearly: []
      },
      displayPlan: {
        "Neo Basic": "yearly",
        "Neo Standard": "yearly",
        "Neo Premium": "yearly"
      },
      loadingPaymentPage: false,
      showCoupon: false,
      showPopup: false,
      extraFeatures: {
        std: [
          "<b>2</b> 3D model requests / mo",
          "1-click <b>3D Walkthrough</b>",
          "Create <b>your own</b> products"
        ],
        pre: ["Dedicated Support"]
      },
      isFilterDropdown: false,
      selectedPackage: "",
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
      isHostedAPIForNewFlowTriggered: false,
      wasPageLoadEvent: false,
      showSpecialUpgradePopup: false,
      specialOfferOnGoPremium: false,
      specialOfferOnGoStandard: false,
      upsellPopupConfig: {
        headerText: ["standardUpsellPopup.title[0]", "standardUpsellPopup.title[1]"],
        subText: ["standardUpsellPopup.subText[0]","$30", "standardUpsellPopup.subText[1]","standardUpsellPopup.subText[2]", "$100!" ],
        goButton: "standardUpsellPopup.goButton",
        imageSrc: "",
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.User.user,
      currentBilling: state => state.Billing.currentSubscription,
      packages: state => state.Subscriptions.packages,
      packageDetails: state => state.Subscriptions.packageDetails,
      isChargebee: state => state.Billing.isChargebee,
      future: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "future" && item.type == "package";
        }),
      isFreeTrail: state => state.Billing.isTrial,
      isLPU: state => state.User.isLPU,
      isPlanSticky: state => state.Billing.isPlanSticky,
      isFTUpgradeCouponChmlnTourShown: state => state.Billing.isFTUpgradeCouponChmlnTourShown,
      countryCodeMapping: state => state.User.countryCodeMapping
    }),
    ...mapGetters({
      // getState: "User/getState"
      userCategory: "User/getUserCategory",
      isUserJapanese: "User/isUserJapanese",
      isUserIndian: "User/isUserIndian",
      isUserSpanish: "User/isUserSpanish",
      getUserCountry: "User/getUserCountry",
      isUserOnPaywallTrialPlan: "Billing/isUserOnPaywallTrialPlan",
      isUserATargetForPayAsYouGoPlan: "Billing/isUserATargetForPayAsYouGoPlan"
    }),
    ...mapGetters("User", [
      "isUserCurrencyUSD",
      "isUserCurrencyCAD",
      "isUserCurrencyGBP",
      "isUserCurrencyEURO",
      "isUserCurrencyAUD",
      "userCurrency"
    ]),
    formattedDate: function() {
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
          "December"
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
    getXtimes() {
      let xTimes = {
        std: "",
        pre: ""
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
    getExtraInfoCredits() {
      if (this.packages && this.packages.extraInfo)
        return this.packages.extraInfo.addonInfo;
    },
    isCurrentPlanIsAccourdingToCountry() {
      if (
        this.user &&
        this.user.ipInfo &&
        (this.user.ipInfo.country == "IN" || this.user.ipInfo.country == "CA")
      ) {
        //user belongs to India or Canada

        if (
          this.currentBilling.name
            .toString()
            .toUpperCase()
            .includes("CA") ||
          this.currentBilling.name
            .toString()
            .toUpperCase()
            .includes("IN")
        ) {
          return true;
        }

        return true;
      }

      return false;
    },
    currentlyActivePeriod() {
      let acc = { monthly: null, yearly: null };
      for (const period in this.displayPlan) {
        if (!acc[this.displayPlan[period]]) {
          acc[this.displayPlan[period]] = 1;
        } else {
          acc[this.displayPlan[period]] += 1;
        }
      }

      if (acc.yearly < acc.monthly) return "monthly";
      else return "yearly";
    },
    isDataAvailable() {
      return (
        this.user &&
        this.packageDetails &&
        this.packageDetails.monthly &&
        this.packageDetails.monthly.length > 0
      );
    },
    customModeAddonsReversed() {
      if (this.addon && this.addon.custom) {
        return this.addon.custom.reverse();
      }

      return [];
    },
    getFinalPlanPriceWithAdons() {
      if (!this.planDetails) {
        return;
      }

      let addonPrice = 0;

      for (const addon of this.selectedRecommendedAddonsForCheckout) {
        addonPrice += addon.price;
      }

      return (
        this.getCurrencySymbol +
        "" +
        (this.planDetails.chargeBeePlanPrice + addonPrice) / 100
      );
    },
    showRecommendedAddonsSection() {
      return (
        this.recommendedAddonsDetails && this.recommendedAddonsDetails.length
      );
    },
    getMoodboardCTAPricing() {
      if ( this.user && this.user.ipInfo ) {
        switch(this.user.ipInfo.country) {
          case "IN": {
            return "599";
          }
          case "CA":
          default: {
            return "9.9";
          }
        }
      }

      return "9.9"
    }
  },
  mounted() {
    this.$root.$on("waiting-for-payment-update", this.handleWaitingForPaymentUpdate);
    let chargebeeInstance = Chargebee.init({
      site:
        window.location.host == "neo.foyr.com" ||
        window.location.host == "neopreprod.foyr.com"
          ? "foyr"
          : "foyr-test"
    });
    if (window.analytics) {
      analytics.track(
        "Plans_opened",
        {
          author: this.user && this.user.email ? this.user.email : "",
          action: "opened"
        },
        { integrations: { Amplitude: { session_id: new Date().getTime() } } },
        { timestamp: new Date().getTime() }
      );
    }
    this.$root.$on("coupon_copied", () => {
      this.message.global = true;
      this.message.error = false;
      this.message.value = "Coupon Copied!";
      setTimeout(() => {
        this.message.value = "";
        this.message.global = false;
      }, 2000);
    });
    this.preparePlansDetails();
    window.$nuxt.$store.state.Billing.isPlanSticky = false;
    let newObserver = new IntersectionObserver(
      function(entries) {
        if (entries[0].intersectionRatio === 0)
          window.$nuxt.$store.state.Billing.isPlanSticky = true;
        else if (entries[0].intersectionRatio === 1)
          window.$nuxt.$store.state.Billing.isPlanSticky = false;
      },
      { threshold: [0, 1] }
    );
    newObserver.observe(document.querySelector("#navbar-top"));

    this.triggerHosterPageAPIForNewFlow()
    if(this.currentBilling) {
      this.showFTUpgradeCouponChmlnTour()
      this.registerEventForLandingOnPlansPage();
    }
    console.log("user details", this.user);
  },
  watch: {
    user: function() {
      this.triggerHosterPageAPIForNewFlow()
    },
    currentBilling: function() {
      this.registerEventForLandingOnPlansPage();
      this.preparePlansDetails();
      // if(this.packageDetails && this.packageDetails.monthly && this.packageDetails.yearly && this.packageDetails.quarterly && (this.packageDetails.monthly.length < 3 || this.packageDetails.yearly.length < 3 || this.packageDetails.quarterly.length < 3)){
      // }
    
      this.showFTUpgradeCouponChmlnTour()
    },
    packages: function() {
      if (
        this.packages &&
        this.packages.data &&
        this.packages.data.length >= 9
      ) {
        this.preparePlansDetails();
      }
    }
  },
  methods: {
    ...mapActions({
      packageDetailsSeperation: "Subscriptions/packageDetailsSeperation",
      fetchCurrentSubscription: "Billing/fetchCurrentSub",
      buy: "Subscriptions/buy",
      sendMail: "Billing/buyNowEmailSend",
      getPlanSwitchStatus: "Subscriptions/getPlanSwitchStatus",
      fetchMySubscriptions: "Subscriptions/fetchMySubscriptions",
      fetchAllRecommendedAddons: "Subscriptions/fetchAllRecommendedAddons",
      analyticsDataToBackend: "Subscriptions/analyticsDataToBackend",
      fetchUser: "User/fetch",
      updateIsFTUpgradeCouponChmlnTourShown: "Billing/updateIsFTUpgradeCouponChmlnTourShown",
      registerDashboardAnalyticsEvent: "Projects/registerDashboardAnalyticsEvent"
    }),
    preparePlansDetails() {
      this.planSeperation = {
        monthly: [],
        quarterly: [],
        yearly: []
      };
      this.packageDetailsSeperation(this.planSeperation);
      if (
        this.packages &&
        this.packages.data &&
        this.packages.data.length > 0
      ) {
        this.packages.data.forEach(packageItem => {
          if (
            packageItem &&
            packageItem.invoice &&
            packageItem.displayContext &&
            ["Neo Basic", "Neo Standard", "Neo Premium"].includes(
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
                finalPrice: packageItem.displayContext.packageCost,
                originalPrice: packageItem.displayContext.originalPrice,
                features: packageItem.displayContext.features,
                discount: packageItem.displayContext.discount,
                currentActive: false,
                planId: packageItem.id,
                _id: packageItem._id,
                chargeBeePlanPrice: packageItem.price,
                addFeatures: packageItem.displayContext.addFeatures.filter(
                  e => e.value && e.value != "na" && e.value != "n/a"
                ),
                recommendedAddons: packageItem.attached_addons
                  ? packageItem.attached_addons.filter(
                      e => e.type == "recommended"
                    )
                  : [],
                standardTitle:
                  packageItem.meta_data &&
                  packageItem.meta_data.standardPricingTittle
                    ? packageItem.meta_data.standardPricingTittle
                    : 'Get upto <b style="color: #ffab40;">4.5 months</b> free when you buy yearly'
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
              ["Neo Basic", "Neo Standard", "Neo Premium"].includes(
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
                  package: this.currentBilling.displayContext.packageName,
                  finalPrice: this.currentBilling.displayContext.packageCost,
                  originalPrice: this.currentBilling.displayContext
                    .originalPrice,
                  features: this.currentBilling.displayContext.features,
                  addFeatures: this.currentBilling.displayContext.addFeatures,
                  discount: this.currentBilling.displayContext.discount,
                  currentActive: true,
                  standardTitle:
                    this.currentBilling.meta_data &&
                    this.currentBilling.meta_data.standardPricingTittle
                      ? this.currentBilling.meta_data.standardPricingTittle
                      : 'Get upto <b style="color: #ffab40;">4.5 months</b> free when you buy yearly'
                });
                // this.changeDisplayPlan(
                //   this.currentBilling.displayContext.packageName,
                //   dur,
                //   true
                // );
              }
            }
          }
        }
        this.packageDetailsSeperation(this.planSeperation);
      }
    },
    changeDisplayPlan(_packageName, _value, _defaultLoad) {
      if (window && window.analytics && !_defaultLoad) {
        analytics.track(
          "Plan filter clicked",
          {
            author: this.user.email,
            frequency: `${_value}`,
            plan: `${_packageName}`,
            lpu: this.isLPU
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
      this.isFilterDropdown = false;
      this.displayPlan[_packageName] = _value;
    },
    togglePlanPeriod(period) {
      for (const packageName in this.displayPlan) {
        this.displayPlan[packageName] = period;
      }
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
        let packageName = this.currentBilling.displayContext.packageName;
        if (
          _packageDetails.package === packageName &&
          period === this.currentBilling.billing &&
          this.currentBilling.analyticsData &&
          this.currentBilling.analyticsData.analyticsStatus &&
          this.currentBilling.analyticsData.analyticsStatus === "paid"
        )
          return;
      }
      if (this.future && this.future.length > 0 && this.future[0].invoice) {
        if (
          _packageDetails.package ===
            this.future[0].package.displayContext.packageName &&
          period === this.future[0].invoice.period
        )
          return;
      }

      ///////// upgrade ft popup logic start /////////

      // if(
      //     _packageDetails.package === "Neo Basic" &&
      //     this.isFreeTrail && 
      //     !(this.isUserSpanish || this.isUserJapanese || this.isUserIndian)
      //   ) {
      //     let popupValues = {
      //       US: { offer: {1: "$30", 12: "$79"}, worth: {1: "$100!", 12: "$500!" } , image: {1: "upsellUSDCADMonthly", 12: "upsellUSDCADYearly"}},
      //       GB: { offer: {1: "£20", 12: "£45"}, worth: {1: "£100!", 12: "£500!" } , image: {1: "upsellGBPMonthly", 12: "upsellGBPYearly"}},
      //       AU: { offer: {1: "$30", 12: "$65"}, worth: {1: "$100!", 12: "$500!" } , image: {1: "upsellAUDMonthly", 12: "upsellAUDYearly"}},
      //       EU: { offer: {1: "€30", 12: "€85"}, worth: {1: "€100!", 12: "€500!" }, image: {1: "upsellEURMonthly", 12: "upsellEURYearly"} }
      //     };
      //     let countryPopupToShow;
      //     if(this.getUserCountry === this.countryCodeMapping.GB) {
      //       countryPopupToShow = this.countryCodeMapping.GB
      //     }
      //     else if(this.getUserCountry === this.countryCodeMapping.AU) {
      //       countryPopupToShow = this.countryCodeMapping.AU
      //     }
      //     else if(this.countryCodeMapping.EU.includes(this.getUserCountry)) {
      //       countryPopupToShow = "EU"
      //     }
      //     else {
      //       countryPopupToShow = this.countryCodeMapping.US
      //     }
            
      //     if (period === 1 || period === 12) {
      //       this.showSpecialUpgradePopup = true;
      //       this.upsellPopupConfig.subText[1] = popupValues[countryPopupToShow].offer[period];
      //       this.upsellPopupConfig.subText[4] = popupValues[countryPopupToShow].worth[period];
      //       require("assets/images/upsellUSDCADMonthly.png")
      //       this.upsellPopupConfig.imageSrc = require(`assets/images/${popupValues[countryPopupToShow].image[period]}.png`)
      //     }
      //     const eventLabelToBeTriggered = period === 1 ? "upgrade to standard monthly seen" : "upgrade to standard yearly seen";
      //     this.triggerEvent(eventLabelToBeTriggered,{
      //       title: eventLabelToBeTriggered
      //     })
          

      //     return;
      //   }

      ///////// upgrade ft popup logic end /////////


      // if(
      //     _packageDetails.package === "Neo Basic" &&
      //     (this.isUserCurrencyCAD || this.isUserCurrencyUSD) &&
      //     this.isFreeTrail
      //   ) {
      //     if(period===1) {
      //       this.showSpecialUpgradePopup = true
      //       this.upsellPopupConfig.subText[1] = "$30"
      //       this.upsellPopupConfig.subText[4] = "$100!"
      //     }
      //     if(period===12) {
      //       this.showSpecialUpgradePopup = true
      //       this.upsellPopupConfig.subText[1] = "$79"
      //       this.upsellPopupConfig.subText[4] = "$500!"
      //     }
          
      //     // this.triggerEvent("upgrade to premium seen",{
      //     //   title: "upgrade to premium seen"
      //     // })
      //     // this.triggerEvent("upgrade to standard seen",{
      //     //   title: "upgrade to standard seen"
      //     // })
      //     return
      // }

      // this.fetchAvailableRecommededAddonsOrBuyPlan(_packageDetails, _duration)

      if (
        _packageDetails.recommendedAddons &&
        _packageDetails.recommendedAddons.length
      ) {
        this.recommendedAddonsDetails = await this.fetchAllRecommendedAddons({
          ids: _packageDetails.recommendedAddons.map(e => e.id)
        });
        this.selectedRecommendedAddonsForCheckout = [];
        this.showAddOnsPopup = true;
      } else {
        this.recommendedAddonsDetails = [];
        this.buyPlan(_packageDetails, _duration);
      }
      
    },

    // async fetchAvailableRecommededAddonsOrBuyPlan(_packageDetails, _duration) {
    //   if (
    //     _packageDetails.recommendedAddons &&
    //     _packageDetails.recommendedAddons.length
    //   ) {
    //     this.recommendedAddonsDetails = await this.fetchAllRecommendedAddons({
    //       ids: _packageDetails.recommendedAddons.map(e => e.id)
    //     });
    //     this.selectedRecommendedAddonsForCheckout = [];
    //     this.showAddOnsPopup = true;
    //   } else {
    //     this.recommendedAddonsDetails = [];
    //     this.buyPlan(_packageDetails, _duration);
    //   }
    // },

    triggerEvent(eventName, event) {
      if (window.analytics) {
        window.analytics.track(
          eventName, 
          event,
          { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() }
        );
      }
    },

    continueWithBasicPlan() {
      const eventLabelToBeTriggered = this.duration === "monthly" ? "continue with basic monthly clicked" : "continue with basic yearly clicked";
      this.triggerEvent(eventLabelToBeTriggered,{
        title: eventLabelToBeTriggered
      })
      this.buyPlan(this.planDetails, this.duration)
    },
    goPremium() {
      
      this.specialOfferOnGoPremium = true
      const premiumPackage = this.packageDetails['yearly'].find(pItem => {
        return pItem.package === "Neo Premium"
      })
      
      this.triggerEvent("go premium clicked",{
        title: "go premium clicked"
      })
      
      // this.fetchAvailableRecommededAddonsOrBuyPlan(premiumPackage, 'yearly')
      this.buyPlan(premiumPackage, 'yearly')
    },

    goStandard() {
      
      this.specialOfferOnGoStandard = true
      const standardPackage = this.packageDetails[this.duration].find(pItem => {
        return pItem.package === "Neo Standard"
      })
      const eventLabelToBeTriggered = this.duration === "monthly" ? "go standard monthly clicked" : "go standard yearly clicked";
      this.triggerEvent(eventLabelToBeTriggered,{
        title: eventLabelToBeTriggered
      })
      
      // this.fetchAvailableRecommededAddonsOrBuyPlan(premiumPackage, 'yearly')
      this.buyPlan(standardPackage, this.duration)
    },

    buyPlan(_packageDetails, _duration) {
      console.log("standardPackage",_packageDetails)
      this.selectedPlanDetails = _packageDetails;
      this.selectedPlanDetails["duration"] = _duration;
      if (window.analytics) {
        analytics.track(
          "Buy Now",
          {
            author: this.user.email,
            frequency: `${_duration}`,
            plan: this.isLPU
              ? `Foyr ${_packageDetails.package}`
              : _packageDetails.package,
            lpu: this.isLPU
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
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
            (this.currentBilling.analyticsData.analyticsStatus === "paid" ||
              this.currentBilling.analyticsData.analyticsStatus ===
                "free trial")
          ) {
            this.getPlanSwitchStatus({
              currentPackageId: this.currentBilling.subscription,
              futurePackageId: _packageDetails._id,
              accountId: this.user.accountId
            }).then(Response => {
              if (Response) {
                if (Response.isCurrencyMismatch) {
                  this.isCurrencyMismatch = true;
                } else if (!Response.upgrade) {
                  // Downgrade alert showing
                  this.changePlanAlert = true;
                  this.selectedPlanDetails[
                    "nextBillingDate"
                  ] = Response.nextBillingDate ? Response.nextBillingDate : "";
                  // return;
                } else this.openPaymentPopup(true);
              }
            });
          } else {
            this.openPaymentPopup(true);
          }
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
    prepareEmailTemplate: function(packageName, _duration) {
      let emailContent = {
        mailerType: "SUB_BUY_NOW_CLICKED",
        subject: this.user.fullName + " " + "just clicked on Buy Now",
        templatedata: {
          name: this.user.fullName ? this.user.fullName : "",
          email: this.user.email ? this.user.email : "",
          country: this.user.country ? this.user.country : "",
          package: packageName ? packageName + "-" + _duration : ""
        }
      };
      this.sendMail(emailContent);
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
    closePopup() {
      if (this.isFreeTrail && this.showCoupon) {
        if (window.analytics) {
          analytics.track(
            "Coupon_popup-closed",
            {
              author: this.user && this.user.email ? this.user.email : "",
              action: "popup-closed"
            },
            {
              integrations: { Amplitude: { session_id: new Date().getTime() } }
            },
            { timestamp: new Date().getTime() }
          );
        }
        //  this.showCoupon = true;
      }
      this.showPopup = false;
      this.showCoupon = false;
      this.launchPaymentIframe = false;
      // this.changePlanAlert = false;
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
      }).then(res => {
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
              lpu: this.isLPU
            },
            {
              integrations: { Amplitude: { session_id: new Date().getTime() } }
            },
            { timestamp: new Date().getTime() }
          );
        }
        if(this.specialOfferOnGoStandard && this.duration === 'yearly') {

          // "/payment_link/?package=neo-standard-yearly&curr=own&coupon=PRODUCT40"
          window.location.href = `${window.location.origin}/payment_link/?package=neo-standard-yearly&curr=own&coupon=PRODUCT40`
          this.specialOfferOnGoStandard = false
          return
        }

        if (this.isChargebee) {
          // it is for chargebee
          if (_isUpgrade) {
            chargebeeInstance.openCheckout({
              hostedPage: function() {
                return new Promise(function(resolve, reject) {
                  resolve(res.hostedPage);
                });
              },
              success: hostedPageId => {
                window.$nuxt.$emit("bill-update-request", {
                  payment: true,
                  plan: oldPlan
                });
                window.$nuxt.$emit("buy_success_tour_launch", {
                  plan: oldPlan
                });
              },
              close: () => {
                window.$nuxt.$emit("payment-popup-close", {
                  type: "main",
                  waitingTime: 11000
                });
                // Optional
                // will be called when the user closes the checkout modal box
                this.selectedRecommendedAddonsForCheckout = [];
              }
            });
          } else {
            // this.$root.$emit("bill-update-request",);
            this.fetchMySubscriptions({ accountId: this.user.accountId });
            this.message.value =
              this.$t("plansNew.newPlanUpdateMessage");
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
    triggerHosterPageAPIForNewFlow(_isUpgrade = true) {
      if( 
          this.isHostedAPIForNewFlowTriggered ||
          !this.user ||
          ( this.user && !this.user.redirectToPlansPage )
        ) return;
      // console.log("triggerHosterPageAPIForNewFlow")
      this.isHostedAPIForNewFlowTriggered = true;
      
      let chargebeeInstance = Chargebee.getInstance();
      if (_isUpgrade) {
        this.loadingPaymentPage = true;
        this.$parent.isRedirecting = true;
      }
      setTimeout(() => {
        this.buy({
          accountId: this.user.accountInfo.accountId,
          package: this.user.buy_plan,
          coupon: this.user.buy_plan_coupon,
          curr: this.user.buy_plan_curr
        }).then(res => {
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
                lpu: this.isLPU
              },
              {
                integrations: { Amplitude: { session_id: new Date().getTime() } }
              },
              { timestamp: new Date().getTime() }
            );
          }
          if (this.isChargebee) {
            // it is for chargebee
            if (_isUpgrade) {
              chargebeeInstance.openCheckout({
                hostedPage: function() {
                  return new Promise(function(resolve, reject) {
                    resolve(res.hostedPage);
                  });
                },
                success: hostedPageId => {
                  this.fetchUser();
                  window.$nuxt.$emit("bill-update-request", {
                    payment: true,
                    plan: oldPlan
                  });
                  window.$nuxt.$emit("buy_success_tour_launch", {
                    plan: oldPlan
                  });
                },
                close: () => {
                  this.fetchUser();
                  window.$nuxt.$emit("payment-popup-close", {
                    type: "main",
                    waitingTime: 11000
                  });
                  // Optional
                  // will be called when the user closes the checkout modal box
                  this.selectedRecommendedAddonsForCheckout = [];
                }
              });
            } else {
              // this.$root.$emit("bill-update-request",);
              this.fetchMySubscriptions({ accountId: this.user.accountId });
              this.message.value = this.$t("plansNew.newPlanUpdateMessage");
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
      }, 4000)
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
    selectRecommendedAddon(addon) {
      this.selectedRecommendedAddonsForCheckout.push(addon);
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
    },
    removeRecommendedAddon(addon) {
      this.selectedRecommendedAddonsForCheckout = this.selectedRecommendedAddonsForCheckout.filter(
        e => e.id != addon.id
      );
    },
    closeAddonPopup() {
      this.showAddOnsPopup = false;
      this.selectedRecommendedAddonsForCheckout = [];
    },
    handleContinueButtonClick(planDetails, duration, selectedRecommendedAddonsForCheckout) {
      this.selectedRecommendedAddonsForCheckout = selectedRecommendedAddonsForCheckout;
      this.buyPlan(planDetails, duration)
      if (window.analytics) {
        analytics.track(
          "continue_buying_addon",
          {
            author: this.user.email,
            action: "click",
            event_category: "Add On" 
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
    },
    handleWaitingForPaymentUpdate(_loading) {
      this.receivingPaymentLoading = _loading;
      if (!_loading) this.$router.push(this.localePath("/settings/plans"));
    },
    showFTUpgradeCouponChmlnTour() {
      if(this.isFreeTrail && !this.isFTUpgradeCouponChmlnTourShown) {
        if(this.userCategory && this.userCategory !== "Student") {
            if(this.getUserCountry === this.countryCodeMapping.IN) {
              window.chmln.show('65b5d81478af5f0019ee16eb')
            }
            // else if(this.getUserCountry === this.countryCodeMapping.US) {
            //   window.chmln.show('65b5ddf778af5f001d8427c8')
            // }
            else if(!(this.isUserSpanish || this.isUserJapanese || this.isUserIndian)) {
              window.chmln.show('65b5ddf778af5f001d8427c8')
            }
            // else if(this.getUserCountry === this.countryCodeMapping.CA) {
            //   window.chmln.show('65b5d6b078af5f0015137963')
            // }
            // else if(this.getUserCountry === this.countryCodeMapping.AU) {
            //   window.chmln.show('65b5d74d78af5f001d842778')
            // }
            // else if(this.getUserCountry === this.countryCodeMapping.GB) {
            //   window.chmln.show('65b5d94778af5f0019ee1712')
            // }
            else if(this.getUserCountry === this.countryCodeMapping.JP) {
              window.chmln.show('65b5d8bd78af5f001ae93dff')
            }
            else if(this.getUserCountry === this.countryCodeMapping.MX) {
              window.chmln.show('65b5d7a678af5f0011c583ae')
            }
            else if(this.getUserCountry === this.countryCodeMapping.ES) {
              window.chmln.show('65b8dae1101014001e16a601')
            }
            else if(this.getUserCountry === this.countryCodeMapping.AR || this.getUserCountry === this.countryCodeMapping.CO) {
              window.chmln.show('65b8e70a1010140018cb243d')
            }
            else if(this.countryCodeMapping.EU.includes(this.getUserCountry)) {
              window.chmln.show('65b5d86b78af5f001378081f')
            }
            
        }else if(this.userCategory === "Student" && !this.isUserJapanese && !this.isUserSpanish) {
          chmln.show('65b5d58a78af5f001513793d')
        }
        this.updateIsFTUpgradeCouponChmlnTourShown(true)
      }
    },
    onKnowMoreButtonClick() {
      this.sendEventToSegment('PAUG Learn more')
      window.open(window.location.origin + this.localePath('/pay-as-you-go'), "_blank")
    },
    registerEventForLandingOnPlansPage() {
      if (!this.wasPageLoadEvent) {
        this.wasPageLoadEvent = true;
        this.registerDashboardAnalyticsEvent({
          event_id: "user_landed_on_plans_page",
          additional_data: {
            plan: this.currentBilling &&
            this.currentBilling.chargebeeSubscriptionData &&
            this.currentBilling.chargebeeSubscriptionData.plan_id ? this.currentBilling.chargebeeSubscriptionData.plan_id : ""
          }
        })
      }
    },
    closeSpecialUpgradePopup() {
      this.showSpecialUpgradePopup = false;
    },
    sendEventToSegment(_eventName) {
        if (window.analytics) {
            window.analytics.track(_eventName, {
                title: _eventName,
            }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
        }
    },
  },
  destroyed() {
    this.$root.$off("waiting-for-payment-update", this.handleWaitingForPaymentUpdate);
  }
};
</script>
<style lang="scss" scoped>
.plansnew-main-container {
  background: white;
  display: grid;
  padding: 4rem 0;
  // grid-template-columns: repeat(3,max-content);
  grid-auto-flow: column;
  justify-content: center;
  .plan-card {
    box-sizing: border-box;
    background: white;
    padding: 0 0 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 23rem;
    height: 100%;
    border: 1px solid $border-5;
    // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // .plan-title,.plan-sub-title,.plan-bill-title,.price-details,.plan-switch,.list-of-features {
    //   padding-left: 3rem;
    // }
    .card-header {
      padding-top: 1rem;
      // padding-bottom: 1.25rem;
      background-color: $background-6;
      width: 100%;
      text-align: center;
      margin-bottom: 2rem;
    }
    .plan-title {
      font-family: $main-font;
      font-weight: 700;
      font-size: 1.25rem;
      letter-spacing: 0.1rem;
      line-height: 2rem;
      color: $plan-title;
      margin: 0;
      padding-bottom: 0.2rem;
      text-transform: uppercase;
    }
    .plan-sub-title {
      font-family: $main-font;
      font-size: 0.8125rem;
      font-weight: 600;
      line-height: 1rem;
      color: $plan-subtitle;
    }
    .plan-bill-title {
      text-transform: capitalize;
      font-weight: 500;
      font-size: 0.85rem;
      line-height: 2.1875rem;
      letter-spacing: 0.5px;
      color: #505050;
      margin-bottom: 0.3125rem;
      color: #e9beb3;
    }
    .price-details {
      display: grid;
      grid-template-columns: repeat(3, max-content);
      column-gap: 0.1rem;
      align-items: flex-end;
      justify-content: center;
      // padding-bottom: 2rem;
      h1:nth-child(1) {
        font-weight: 500;
        font-size: 3.5rem;
        line-height: 2.125rem;
        color: #292929;
      }
      p {
        font-weight: 500;
        font-size: 14.33px;
        line-height: 1.1875rem;
        color: #505050;
        margin: 0;
      }

      &.old-price-details {
        margin-left: 2rem;
      }
    }
    .plan-switch {
      .filter-dropdown {
        span {
          cursor: pointer;
          display: grid;
          grid-template-columns: 1fr max-content;
          align-items: center;
          column-gap: 0.5rem;
          // width: 13.5rem;
          padding: 0.6rem 1rem;
          width: 12rem;
          p {
            margin: 0;
            font-size: 0.896rem;
            letter-spacing: 0.05rem;
            font-weight: 600;
            color: #0e0e0e;
            text-transform: capitalize;
          }
        }
        background: #ffffff;
        border: 1px solid #e9beb3;
        justify-self: end;
        position: relative;
        // margin-bottom: 1rem;
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
      display: grid;
      grid-template-columns: max-content 1fr;
      column-gap: 0.8rem;
      // align-items: center;
      padding-bottom: 2rem;

      // button {
      //   font-size: 0.9rem;
      //   font-family: "Montserrat", sans-serif;
      //   font-weight: 600;
      //   color: #505050 !important;
      //   outline: none;
      //   cursor: pointer;
      //   width: 8.5rem;
      //   padding: 0.6rem 0.5rem;
      //   // height: 2rem;
      //   // padding: 0.5rem;
      //   border: 1px solid #E9BEB3;
      //   box-sizing: border-box;
      //   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      //   position: relative;
      //   z-index: 0;
      //   @include background-animate(#FAF0EC, black);
      // }
      p {
        font-weight: 500;
        font-size: 0.8rem;
        justify-self: start;
        // line-height: 0.6875rem;
        color: #0e0e0e;
        margin: 0;
        text-align: center;
        // padding-right: 1rem;
        span {
          font-weight: bold;
          font-size: 1rem;
          &::after {
            content: "\A";
            white-space: pre;
          }
        }
      }
    }
    .buy-now {
      cursor: pointer;
      justify-self: center;
      font-family: "Montserrat", sans-serif;
      background: $background-7;
      font-weight: bold;
      font-size: 0.9375rem;
      line-height: 1.5rem;
      font-stretch: expanded;
      color: black;
      padding: 0.875rem 0;
      width: calc(100% - 2.875rem);
      position: relative;
      z-index: 0;
      @include background-animate(#e9beb3, black);
    }
    .list-of-features {
      padding-top: 2.5rem;
      padding-left: 1.375rem;
      padding-right: 1.375rem;
      height: auto;
      overflow: scroll;
      width: 100%;

      &.plan-add-ons {
        padding-top: 0;
      }

      .feature-item {
        p {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.2px;
          font-feature-settings: "case" on;
          color: #3a393a;
          font-family: "Montserrat", sans-serif;
        }

        svg {
          margin-right: 0.75rem;
        }

        p + p {
          margin-left: 0.5rem;
        }

        display: grid;
        grid-auto-flow: column;
        justify-content: left;
        align-items: center;
        padding-bottom: 1rem;
      }
    }
    .optional-add-ons {
      border-top: 1px dashed rgba(0, 0, 0, 0.12);
      padding-top: 1rem;
      margin-top: 0.875rem;
      margin-bottom: 1.25rem;
      font-family: $main-font;
      font-style: normal;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.0625rem;
      letter-spacing: -0.02em;
      color: $plan-subtitle;
      width: calc(100% - 2.75rem);
    }
    .premium-features {
      .feature-item {
        grid-template-columns: max-content max-content 1fr;
      }
    }
  }
  .standard-main {
    padding: 0;
    // background: #FAF0EC;
    outline: 2rem solid rgba(226, 192, 182, 0.32);
    position: relative;
    .standard-title {
      font-weight: 400;
      font-size: 11px;
      color: #292929;
      text-align: center;
      position: sticky;
      top: 0rem;
      span {
        font-size: 12px;
        font-weight: bold;
      }
    }
    .plan-card {
      // padding-top: 0;
      border: 1px solid white;
      .card-header {
        background-color: transparent;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.12);
        width: calc(100% - 3rem);
      }

      .plan-sub-title {
        color: $plan-title;
      }

      .plan-bill-title {
        color: #505050;
        margin-top: 1rem;
      }
      .plan-switch {
        padding-bottom: 1rem;
        button {
          background: #ffffff;
          // border: 1px solid #FAF0EC;
          border: none;
          box-sizing: border-box;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        }
        // p {
        //   // padding-right: 10px;
        // }
      }
      .plan-sub-title {
        // padding-bottom: 2.8rem;
        span {
          // font-size: 0.9rem;
          font-size: 1rem;
          line-height: 1.5rem;
          letter-spacing: 0.05em;
          .bold {
            font-weight: 800;
          }
        }
      }
      .list-of-features {
        // height: 20rem;
        // min-height: 22rem;
      }
    }
    .buy-now {
      background: #292929;
      color: #e9beb3;
      border: 1px solid #ebbeb5;
      margin-top: 1rem;
    }
  }
  .standard-price-details {
    display: flex;
    align-items: flex-end;
    width: 100%;
    justify-content: center;
    // height: 6rem;
    // grid-template-columns: 11rem 1fr;
    // padding-bottom: 1.5rem;
    // .price-details {
    //   // padding-bottom: 2.5rem;
    //   // padding-bottom: 1.4rem;
    // }
    .old-price-details {
      // padding-left: 57px !important;
      h1 {
        font-weight: 500 !important;
        // font-size: 2.2rem !important;
        line-height: 1 !important;
        // text-decoration: line-through;
        // text-decoration-color: black;
        color: #585858 !important;
        position: relative;
      }
      h1:before {
        position: absolute;
        content: "";
        left: 0;
        top: 50%;
        right: 0;
        border-top: 2px solid;
        border-color: inherit;

        // -webkit-transform:rotate(0deg);
        // -moz-transform:rotate(0deg);
        // -ms-transform:rotate(0deg);
        // -o-transform:rotate(-5deg);
        // transform:rotate(-5deg);
      }
      p {
        font-weight: 500;
        font-size: 8.06px;
        line-height: 1.4rem;
      }
    }
  }
  .basic-main,
  .pre-main {
    // padding: 5rem 0rem;
    height: calc(100% - 1.5rem);
    margin-top: 1.5rem;
  }
  .basic-main {
    margin-right: 2rem;
  }
  .pre-main {
    margin-left: 2rem;
    // .plan-card {
    //   .list-of-features {
    //     min-height: 24rem;
    //   }
    // }
  }
  .future-plan-container {
    padding: 3.125rem 3.125rem;
  }
  .future-plan-taken {
    p {
      width: 30vw;
      color: white;
      text-align: justify;
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.375rem;
      margin: 0;
    }
    a {
      color: #d48e8e;
      text-decoration: none;
    }
  }
  .free-credits {
    padding: 0.8rem;
    margin: 0;
    font-weight: 900;
    font-size: 1.1rem;
    line-height: 3px;
    color: #e8ac9c;
    text-align: center;
    font-family:"Montserrat";
    span {
      font-size: 1rem;
      font-weight: 900;
      color: black;
    }
  }
  .bonus {
    font-family:"Montserrat";
    font-weight: 900 !important;
    font-size: 0.875rem;
    line-height: 0px;
    color: #c1806e !important;
    // padding-left: 2rem;
  }
}
.disabledBtn {
  cursor: not-allowed !important;
  animation: none;
  &::before,
  &::after {
    animation: none;
  }
}
.addon-container {
  background: #faf0ec;
  display: grid;
  grid-template-columns: 55% 1fr 1fr;
  align-items: center;
  padding: 2rem 6rem;
  p {
    margin: 0;
  }
  .addon-title {
    .main {
      font-style: normal;
      font-weight: 900;
      font-size: 2.5rem;
      line-height: 55px;
      color: #292929;
    }
    .sub {
      font-style: normal;
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.375rem;
      color: #4d4c4d;
      padding-right: 20rem;
    }
  }
  .addon-price {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    align-items: center;
    .price {
      font-style: normal;
      font-weight: normal;
      font-size: 4rem;
      line-height: 4.125rem;
      color: #292929;
    }
    p {
      span {
        font-size: 21px;
        line-height: 34px;
        text-align: center;
        color: #c27272;
        vertical-align: top;
        padding-right: 0.4rem;
      }
    }
    .model {
      font-style: normal;
      font-weight: 500;
      font-size: 1.3125rem;
      line-height: 1.875rem;
      color: #292929;
    }
    .price-model {
      font-size: 1rem;
      line-height: 2.125rem;
      color: #000000;
    }
  }
}
.coupon-container {
  background: #ffffff;
  box-shadow: 0px 0px 4px #000000;
  text-align: center;
  .popup-details {
    margin-top: 1.25rem;
    max-height: 65vh;
  }
  .heart-symbol {
    position: absolute;
    margin: auto;
    left: 0;
    right: 5px;
    top: 16%;
    z-index: -1;
  }
  p {
    font-weight: 500;
    font-size: 1.3125rem;
    line-height: 1.3125rem;
    color: #0e0e0e;
  }
  .heading {
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 1.625rem;
    color: black;
    b {
      color: #c27272;
    }
  }
  .sub-heading {
    font-weight: normal;
    font-size: 1.5rem;
    line-height: 1.625rem;
    color: #0e0e0e;
    padding: 0;
  }
  .offer-heading {
    margin-bottom: 1.5rem;
    font-size: 4.5rem;
    line-height: 5.1875rem;
    color: #0e0e0e;
    padding-top: 4rem;
    // padding: 0.75rem;
  }
  .code-container {
    margin-top: 5rem;
    height: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    background: #f0f0f0;
    p:nth-child(1) {
      // padding-left: 1.625rem;
      justify-self: end;
      padding-right: 1rem;
    }
    p {
      margin: 0;
    }
    .coupon {
      // font-style: italic;
      font-weight: bold;
      font-size: 2rem;
      line-height: 1.3125rem;
      color: #000000;
      // padding-left: 0.25rem;
      letter-spacing: 0.2rem;
      justify-self: start;
      padding-left: 1rem;
    }
    // .copy-btn {
    //   position: relative;
    //   border: 1px solid;
    //   padding: 0.5rem;
    //   @include background-animate(#FAF0EC, black);

    // }
  }
  .copy-btn {
    margin-top: 2rem;
    background: #3a393a;
    // margin: 4rem 0;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.25rem;
    cursor: pointer;
    color: white;
    padding: 0.9rem 2.5rem;
    // border: 0.0625rem solid #4d4c4d;
    // margin-bottom: 0.9375rem;
    position: relative;
    z-index: 1;
    font-family: montserrat;
    @include background-animate(#c27272, white);
  }
  .offer-valid {
    font-weight: 500;
    font-size: 1.3125rem;
    line-height: 1.3125rem;
    color: #0e0e0e;
  }
  .offer-tc {
    ul {
      font-weight: 500;
      font-size: 0.92rem;
      line-height: 1.3rem;
      color: #0e0e0e;
      padding-top: 2.625rem;
      list-style: inside;
    }
  }
}
.change-plan-alert-popup {
  // background: red;
  .popup-container {
    // height: 60vh;
    // width: 50vw;
    padding: 0;
    background: #ffab40;
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
    .isCurrencyMismatch-container {
      color: #807f7f;
      display: grid;
      // grid-template-rows: 1fr max-content;
      grid-template-rows: 29rem 9rem;
      background: #fbf3f1;
      margin-top: 0.3rem;
      height: 38rem;
      width: 75rem;

      .content {
        width: 100%;
        position: relative;
        text-align: center;
        // padding: 5rem 5rem 5rem 5rem;
        justify-self: center;

        img {
          width: 22rem;
          height: 13rem;
          margin-top: 4rem;
        }

        .heading-1 {
          font-family: Montserrat;
          font-weight: bold;
          font-size: 1.83rem;
          line-height: 1.82rem;
          color: #292929;
          text-align: center;
          margin-top: 3rem;
        }
        div {
          margin-bottom: 3rem;
          p {
            margin: 0;
            font-family: Montserrat;
            font-weight: 500;
            font-size: 1.15rem;
            line-height: 1.5rem;
            color: #222021;
          }
        }
      }
      .proceed-btn-container {
        padding: 4rem;
        background: #222021;
        width: 100%;

        // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        display: grid;
        justify-content: center;
        align-content: center;

        .proceed-btn {
          background: #fbf3f1;
          padding: 0.8rem 6rem;
          font-family: Montserrat;
          font-weight: bold;
          font-size: 1.1rem;
          // line-height: 1.3rem;
          color: #222021;
          cursor: pointer;
          // position: relative;
          z-index: 0;
          //  @include background-animate(#FAF0EC, black);
          color: #222021;
          text-decoration: none;
          text-underline-offset: none;
        }
      }
    }
  }
}
.payment-updating-popup {
  opacity: 1;
  z-index: 1000;
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
.payment-iframe-popup {
  .popup-container {
    // height: 90vh;
    width: max-content;
    background: none;
    padding: 0;
    // background: transparent;
    .close-popup {
      svg {
        background: #f4f5f9;
        path {
          fill: black;
        }
      }
    }
    .popup-details {
      max-height: unset !important;
      iframe {
        // background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0NDBweCIgaGVpZ2h0PSIxMDI0cHgiIHZpZXdCb3g9IjAgMCAxNDQwIDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ2LjIgKDQ0NDk2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJjaGVja291dC1yZWZpbmUyIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjUiPgogICAgICAgIDxnIGlkPSJEZXNrdG9wLUhELUNvcHktMyI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5NS4wMDAwMDAsIC0zMDcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00IiBmaWxsPSIjRjVGNkY5IiBwb2ludHM9IjUxMy42MDkzMjUgOTgxLjkwMzYxNCA1NDYuMTUzNjk2IDEyODUuODc1NSA4NDYuODk3MTAyIDgxOC41NTcxNTUiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS01IiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjUxMy42MDkzMjUgOTgxLjkwMzYxNCA1NDYuMTUzNjk2IDEyODUuODc1NSA0Ni4zNTU4NzM5IDEwMTguMjY4NjIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yOCIgZmlsbD0iI0U3RTdFOSIgcG9pbnRzPSIxNjYuMzY4MTIxIDE2MzMuNTE4NzYgNTQ2LjE1MzY5NiAxMjg1Ljg3NTUgNDYuMzU1ODczOSAxMDE4LjI2ODYyIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMjkiIGZpbGw9IiNFREVERUYiIHBvaW50cz0iMTY2LjM2ODEyMSAxNjMzLjUxODc2IDU0Ni4xNTM2OTYgMTI4NS44NzU1IDkxNSAxNDU0Ljg5ODk4Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktNCIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSI1MTMuNjA5MzI1IDk4MS45MDM2MTQgNTEzLjYwOTMyNSA3NDYuMjQwODM3IDg0Ni44OTcxMDIgODE4LjU1NzE1NSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTgiIGZpbGw9IiNGMUYyRjUiIHBvaW50cz0iNjExLjk4ODcxOSA0NzIuOTcxOTUzIDUxMy42MDkzMjUgNzQ2LjI0MDgzNyA4NDYuODk3MTAyIDgxOC41NTcxNTUiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS02IiBmaWxsPSIjRjVGNkY5IiBwb2ludHM9IjUxMy42MDkzMjUgOTgxLjkwMzYxNCA1MTMuNjA5MzI1IDc0Ni4yNDA4MzcgOTAuOTEzNzU3NCAxMDMwLjMyMjY5Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktOSIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSIxMTIuMjU3Njg2IDY2MS41OTcxMDggNTEzLjYwOTMyNSA3NDYuMjQwODM3IDkwLjkxMzc1NzQgMTAzMC4zMjI2OSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTEwIiBmaWxsPSIjRjFGMkY1IiBwb2ludHM9IjExMi4yNTc2ODYgNjYxLjU5NzEwOCA1MTMuNjA5MzI1IDc0Ni4yNDA4MzcgMzMxLjIwNzIwOSAzNTEuMjg0OTcyIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMTMiIGZpbGw9IiNGNUY2RjkiIHBvaW50cz0iNjEyLjQ0NTU2MyA0NzMuNjkzMTE4IDUxMy42MDkzMjUgNzQ2LjI0MDgzNyAzMzEuMjA3MjA5IDM1MS4yODQ5NzIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0xNCIgZmlsbD0iI0YxRjJGNSIgcG9pbnRzPSI2MTIuNDQ1NTYzIDQ3My42OTMxMTggNDgzLjEzNTQ2OCAxMjguNTE0ODQ2IDMzMS4yMDcyMDkgMzUxLjI4NDk3MiI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTE1IiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjYxMi40NDU1NjMgNDczLjY5MzExOCA0ODMuMTM1NDY4IDEyOC41MTQ4NDYgODAwLjc3NTg0NyAxOTguODI0NjQyIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMTYiIGZpbGw9IiNGMUYyRjUiIHBvaW50cz0iNjEyLjQ0NTU2MyA0NzMuNjkzMTE4IDk5OS44NjMwMTYgNTA4LjI2NjA1NSA4MDAuNzc1ODQ3IDE5OC44MjQ2NDIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0xMSIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSIxMTIuMjU3Njg2IDY2MS41OTcxMDggMC41ODU5MzYwNiAzNTEuMjg0OTcyIDMzMS4yMDcyMDkgMzUxLjI4NDk3MiI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTEyIiBmaWxsPSIjRTdFN0U5IiBwb2ludHM9IjQ5Ni4xNDIwNTEgMTYxLjQ0MjMxNyAwLjU4NTkzNjA2IDM1MS4yODQ5NzIgMzMxLjIwNzIwOSAzNTEuMjg0OTcyIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHkiIGZpbGw9IiNFREVERUYiIHBvaW50cz0iMTA4MC4yMzE4IDk4Mi4zNzQwOTYgNTQ2LjE1MzY5NiAxMjg1Ljg3NTUgODQ2Ljg5NzEwMiA4MTguNTU3MTU1Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMTkiIGZpbGw9IiNGNUY2RjkiIHBvaW50cz0iMTA4MC4yMzE4IDk4Mi4zNzQwOTYgNTQ2LjE1MzY5NiAxMjg1Ljg3NTUgODYxLjI1OTUyMiAxNDM0LjgxMjIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yIiBmaWxsPSIjRTdFN0U5IiBwb2ludHM9IjEwODAuMjMxOCA5ODIuMzc0MDk2IDk5OS42NzM5NDIgNTA4LjE0NDUzMyA4NDYuODk3MTAyIDgxOC41NTcxNTUiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS03IiBmaWxsPSIjRjVGNkY5IiBwb2ludHM9IjYxMi4yOTI3MTEgNDczLjM2MDY2NCA5OTkuNjczOTQyIDUwOC4xNDQ1MzMgODQ2Ljg5NzEwMiA4MTguNTU3MTU1Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMyIgZmlsbD0iI0Y1RjZGOSIgcG9pbnRzPSIxMDgwLjIzMTggOTgyLjM3NDA5NiA5OTkuNjczOTQyIDUwOC4xNDQ1MzMgMTQxNC42NzE0NSA4MTkiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yMCIgZmlsbD0iI0YxRjJGNSIgcG9pbnRzPSIxMDgwLjIzMTggOTgyLjM3NDA5NiAxMzg5LjcxMTk3IDExOTEuNTY1MTkgMTQxNC42NzE0NSA4MTkiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yNiIgZmlsbD0iI0Y1RjZGOSIgcG9pbnRzPSIxODE4LjE1NTA1IDEyMzIuMDY0NzkgMTM4OS43MTE5NyAxMTkxLjU2NTE5IDE0MTQuNjcxNDUgODE5Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMzAiIGZpbGw9IiNFREVERUYiIHBvaW50cz0iMTgxOC4xNTUwNSAxMjMyLjA2NDc5IDEzODkuNzExOTcgMTE5MS41NjUxOSAxNTY3Ljc0Mzc1IDE0MTEuNDM3NDEiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0zMSIgZmlsbD0iI0Y1RjZGOSIgcG9pbnRzPSIxMjEyLjM4NzI4IDE0OTYuNzg2MTQgMTM4OS43MTE5NyAxMTkxLjU2NTE5IDE1NjcuNzQzNzUgMTQxMS40Mzc0MSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTI3IiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjE4MTguMTU1MDUgMTIzMi4wNjQ3OSAxNzgxLjM4MTkgNzgyLjg1ODcyNCAxNDE0LjY3MTQ1IDgxOSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTIxIiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjEwODAuMjMxOCA5ODIuMzc0MDk2IDEzODkuNzExOTcgMTE5MS41NjUxOSAxMjUyLjUwNjE3IDE0MjYuNzYyMTcgODMxLjIxMzYyOSAxNDkyLjQ4NTIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0xNyIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSIxMzE5LjQ5NDU1IDQyNi4wNDIwODkgOTk5LjY3Mzk0MiA1MDguMTQ0NTMzIDE0MTQuNjcxNDUgODE5Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMjIiIGZpbGw9IiNGMUYyRjUiIHBvaW50cz0iMTMxOS40OTQ1NSA0MjYuMDQyMDg5IDE4MzAuMDY3NTkgNzc4LjQyMDk0OCAxNDE0LjY3MTQ1IDgxOSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTIzIiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjEzMTkuNDk0NTUgNDI2LjA0MjA4OSAxODMwLjA2NzU5IDc3OC40MjA5NDggMTc2My4zMjQxMyAxNzkuNjU3MzM3Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMjQiIGZpbGw9IiNGMUYyRjUiIHBvaW50cz0iMTMxOS40OTQ1NSA0MjYuMDQyMDg5IDE1NDAuMDM5NjkgNjYuODY2MTkxNiAxNzYzLjMyNDEzIDE3OS42NTczMzciPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yNSIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSIxMzE5LjQ5NDU1IDQyNi4wNDIwODkgMTU0MC4wMzk2OSA2Ni44NjYxOTE2IDg2Ny4xOTM5MjMgMTMwLjEwMjQwMSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTE4IiBmaWxsPSIjRTdFN0U5IiBwb2ludHM9IjEzMTkuNDk0NTUgNDI2LjA0MjA4OSA5OTkuNjczOTQyIDUwOC4xNDQ1MzMgNjY4LjY2ODIwOSAwLjcwOTU4OTkzOCI+PC9wb2x5Z29uPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=) no-repeat 100% fixed;
        // background-size: cover;
        background: #f4f5f9;
        // width: 100%;

        // body {
        //   position: relative;
        //   top: 0;
        //   display: none;
        // }
        // .cb-hp__wrapper {
        //   display: block !important;
        // }
      }
    }
  }
}
#nav-container-top {
  height: 1px;
  background-color: blue;
}

#nav-container {
  background-color: blue;
  position: sticky;
  top: 0;
}

.nav-container-sticky {
  background-color: green !important;
}
#container {
  //   position: absolute;
  // top: -27px;
  // width: 100%;
  // left: 0;
  margin: 0 -2rem;
  margin-top: -5rem;
}
.standard-title-new {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: #292929;
  color: white;
  font-size: 0.96rem;
  padding: 0.45rem 0;
  margin: 0;
  font-weight: 600;
  text-align: center;
  // padding: 0.5rem;
  b {
    color: #ffab40;
  }
}

.pay-as-you-go-wrapper {
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 0 18.75rem;
  align-items: center;
  background: $background-15;
  padding: 1.4375rem * 1.22 9.625rem * 1.22;
  background: linear-gradient(90deg, #F08E58 -37.19%, #EF5D68 100%);
  
  @include custom-min(120em) {
    margin-bottom: 2rem;
    padding: 1.4375rem 9.625rem;
	}

  .text-wrapper {
    display: grid;
    .pay-as-you-go-heading {
      color: $color-white;
      font-size: 1.25rem * 1.22;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: .75rem * 1.22;
      
      @include custom-min(120em) {
        font-size: 1.25rem;
        margin-bottom: .75rem;
      }

      span {
        font-size: inherit;
        font-size: inherit;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
      }
    }
    .pay-as-you-go-sub-title {
      color: $color-white;
      font-size: .9375rem * 1.22;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
  .know-more-button {
    background-color: $background-white;
    color: #F06965;
    padding: .6875rem * 1.22 1.375rem * 1.22;
    text-align: center;
    font-size: .875rem * 1.22;
    font-style: normal;
    font-weight: 700;
    line-height: .9609rem * 1.22;
    text-transform: capitalize;
    cursor: pointer;
  }
}

.plan-period-toggle {
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .toggle-item {
    position: relative;
    cursor: pointer;
    border: 1px solid $border-5;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 0.75rem 1.5rem;
    font-family: $main-font;
    font-style: normal;
    font-weight: 600;
    font-size: 0.8125rem;
    line-height: 1rem;
    color: $plan-subtitle;

    &:first-child {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child {
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &.is-active {
      color: $plan-title;
      background: #f4f2f1;
      border: 2px solid #292929;
      border-radius: 2px;
    }
  }
}

.period-toggle-subtitle {
  margin-top: 2rem;
  font-family: $main-font;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.375rem;
  text-align: center;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.6);

  span {
    color: $plan-title;
    font-weight: 700;
  }
}

.percent-saved-on-yearly-text {
  margin-top: 0.875rem;
  margin-bottom: 2rem;
  font-family: $main-font;
  font-style: normal;
  font-weight: bold;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: center;
  color: $plan-subtitle;
}

.highlight-red {
  color: #cc4040 !important;
}

.testimonials-section-wrapper {
  padding: 2.5rem * 1.22 9.625rem * 1.22;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @include custom-min(120em) {
    padding: 2.5rem 9.625rem;
  }

  .header {
    color: $color-black-1;
    font-size: 1.5rem * 1.22;
    font-style: normal;
    font-weight: 700;
    line-height: 158%;
    margin-bottom: .8125rem * 1.22;
    
    @include custom-min(120em) {
      font-size: 1.5rem * 1.22;
      margin-bottom: .8125rem; 
    }
  }

  .average-ratings-section {
    display: flex;
    align-items: center;
    margin-bottom: 1.625rem * 1.22;

    @include custom-min(120em) {
      margin-bottom: 1.625rem;
    }

    .customers-image-wrapper {
      width: 8.5rem * 1.22;
      margin-right: .75rem * 1.22;
      display: block;
      
      @include custom-min(120em) {
        width: 8.5rem ;
        margin-right: .75rem;
      }

      img {
        height: auto;
        width: 100%;
      }
    }
    .rating {
      .image-wrapper {
        width: 6.875rem * 1.22;
        margin-bottom: .3125rem * 1.22;

        @include custom-min(120em) {
          width: 6.875rem;
          margin-bottom: .3125rem;
        }

        img {
          width: 100%;
          height: auto;
          display: block;
        }
      }
    }
  }

  .testimonials-wrapper {
    display: grid;
    grid-template-columns: 18.125rem * 1.22 18.125rem * 1.22 18.125rem * 1.22;
    gap: 0 1rem * 1.22;

    @include custom-min(120em) {
      grid-template-columns: 18.125rem 18.125rem 18.125rem;
      gap: 0 1rem;
    }

    .testimonial {
      padding: 1rem * 1.22;
      border-radius: 4px;
      border: 1px solid $background-10;
      background: rgba(233, 190, 179, 0.20);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      @include custom-min(120em) {
        padding: 1rem;
      }

      .content {
        margin-bottom: 1rem * 1.22;
        color: $color-dark-gray-2;
        font-size: .875rem * 1.22;
        font-style: normal;
        font-weight: 500;
        line-height: 171%;
        
        @include custom-min(120em) {
          font-size: .875rem;
          margin-bottom: 1rem;
        }
      }

      .profile-and-reviewer-details {
        display: flex;
        align-items: center;

        .image-wrapper {
          width: 3.5rem * 1.22;
          height: 3.5rem * 1.22;
          margin-right: .5rem * 1.22;

          @include custom-min(120em) {
            width: 3.5rem;
            height: 3.5rem;
            margin-right: .5rem;
          }

          img {
            height: 100%;
            width: 100%;
            display: block;
          }
        }

        .reviewer-details {
          .name {
            color: $color-dark-gray-2;
            font-size: .875rem * 1.22;
            font-style: normal;
            font-weight: 700;
            line-height: 157%;
            margin-bottom: .125rem * 1.22;
            
            @include custom-min(120em) {
              font-size: .875rem;
              margin-bottom: .125rem;
            }
          }
            
          .profession {
            color: $color-light-gray-9;
            font-size: .75rem * 1.22;
            font-style: normal;
            font-weight: 500;
            line-height: 133%; 
            margin-bottom: .125rem * 1.22;
            
            @include custom-min(120em) {
              font-size: .75rem;
              margin-bottom: .125rem;
            }
          }
          
          .review-website {
            width: 3.0625rem * 1.22;
            height: .875rem * 1.22;
            
            @include custom-min(120em) {
              width: 3.0625rem;
              height: .875rem;
            }

            svg {
              height: 100%;
              width: 100%;
            }
          }
        }
      }
    }
  }
}

.post-pricing-content {
  font-family: $main-font;
  font-style: normal;
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.375rem;
  text-align: center;
  color: $plan-title;
  width: 100%;
  margin-bottom: 6.25rem;

  .cta-action {
    a {
      color: $plan-title !important;
    }
    // text-decoration: underline;
  }
}

.save-percent-prompt {
  position: absolute;
  top: -100%;
  right: -100%;
  transform: translate(55%, 8%);
  display: flex;
  align-items: flex-start;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 1;
  color: #cc4040;
  width: 18rem;

  svg {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    display: block;
  }
}

.premium-plan-addon-text {
  font-family: $main-font;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: $border-6;
  padding-left: 1.375rem;
  padding-right: 1.375rem;
  margin-top: 1.875rem;
}

.add-ons-popup {
  .popup-container {
    padding: 0;
    width: 55rem;
    background-color: $background-8;

    .popup-header {
      padding: 1.5rem 2.5rem;
      background-color: $background-7;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .close-popup {
        position: relative;
        right: auto;

        svg {
          background-color: $color-white;
          path {
            fill: #9f9f9f;
          }
        }
      }

      .plan-details {
        font-family: $main-font;
        font-style: normal;
        display: flex;
        flex-direction: column;

        .selected-plan-text {
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.0625rem;
          color: #808080;
          margin-bottom: 0.25rem;
        }

        .package-name {
          font-weight: 700;
          font-size: 1.625rem;
          line-height: 2rem;
          color: $plan-title;

          display: flex;
          align-items: center;
        }

        .duration {
          margin-left: 0.5rem;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.0625rem;
          color: $plan-title;
          text-transform: capitalize;
        }
      }
    }

    .optional-add-ons-text {
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.5rem;
      color: #cc4040;
    }

    .sub-text {
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 1.25rem;
      color: #808080;
    }

    .popup-content {
      padding: 2.5rem 2.5rem;
      font-family: "Montserrat";
      font-style: normal;

      .optional-add-ons-text {
        margin-bottom: 1.75rem;
      }

      .total-price-and-action-section {
        font-family: $main-font;
        font-style: normal;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .total-price {
          display: flex;
          flex-direction: column;
          font-weight: 600;
          font-size: 1.625rem;
          line-height: 1.75rem;
          color: $plan-title;

          span {
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1.125rem;
            color: $border-6;
          }
        }

        .continue-btn {
          cursor: pointer;
          background: $plan-title;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
          border-radius: 2px;
          font-weight: 700;
          font-size: 0.9375rem;
          line-height: 1.5rem;
          text-transform: uppercase;
          color: #e2c0b6;
          padding: 0.875rem 4rem;
        }
      }
    }

    .popup-footer {
      padding: 2.5rem 2.5rem;
      font-family: "Montserrat";
      font-style: normal;

      .optional-add-ons-text {
        margin-bottom: 0.5rem;
      }

      .sub-text {
        margin-bottom: 1.875rem;
      }

      .addons-container {
        display: flex;
        // justify-content: space-between;

        .addon {
          padding-right: 1.875rem;
          margin-right: 1.875rem;

          &:not(:last-child) {
            border-right: 1px solid $border-6;
          }

          p {
            display: inline-block;
            align-self: flex-start;
            padding: 0;
            margin: 0;
            font-family: $main-font;
            font-style: normal;
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1.0625rem;
            color: #3a393a;
          }
        }
      }
    }
  }
}
</style>

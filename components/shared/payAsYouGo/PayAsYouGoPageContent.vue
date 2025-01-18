<template>
	<section class="neo-pay-as-you-go-home-page">
		<div class="hero-section-wrapper">
			<div class="cta-and-content-wrapper">
				<div class="pink-text">
					{{ $t("payAsYouGo.bannerHighlightText") }}
				</div>
				<div class="header-text">
					{{ $t("payAsYouGo.bannerHeaderText") }}
				</div>
				<div class="header-text pink">
					{{ $t("payAsYouGo.bannerHeaderTextPink") }}
				</div>
				<div class="subheader-text">
					{{ $t("payAsYouGo.bannerSubheaderText") }}
				</div>
				<div
					v-if="isRootAccountUser && isUserATargetForPayAsYouGoPlan"
					class="cta filled-button-with-icon"
					@click="scrollToSection('BUY_CREDITS')"
				>
					{{ $t("payAsYouGo.bannerCTAText") }}
				</div>
			</div>
			<div class="graphic-wrapper image-wrapper-preserve-aspect-ratio">
				<img
					src="~/assets/images/pay-as-you-go/pay-as-you-go-banner-v2.png"
					alt=""
				/>
			</div>
			<div class="background-element-one"></div>
			<div class="background-element-two"></div>
		</div>
		<div class="features-section-wrapper">
			<div class="section-header">
				{{ $t("payAsYouGo.featureWrapperHeaderText") }}
			</div>
			<div class="section-subheader">
				{{ $t("payAsYouGo.featureWrapperSubheaderText") }}
			</div>
			<div class="features-wrapper">
				<div class="feature">
					<svg
						width="50"
						height="50"
						viewBox="0 0 50 50"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<rect
							y="0.656372"
							width="50"
							height="48.9571"
							fill="url(#pattern0_8_134)"
						/>
						<defs>
							<pattern
								id="pattern0_8_134"
								patternContentUnits="objectBoundingBox"
								width="1"
								height="1"
							>
								<use
									xlink:href="#image0_8_134"
									transform="matrix(0.00979142 0 0 0.01 0.0104289 0)"
								/>
							</pattern>
							<image
								id="image0_8_134"
								width="100"
								height="100"
								xlink:href="data:image/png;base64,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"
							/>
						</defs>
					</svg>

					<div class="header">{{ $t("payAsYouGo.features[0]") }}</div>
					<div class="subheader">
						{{ $t("payAsYouGo.features[1]") }}
					</div>
				</div>
				<div class="feature">
					<svg
						width="50"
						height="50"
						viewBox="0 0 50 50"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<rect
							y="0.760742"
							width="50"
							height="48.9571"
							fill="url(#pattern0_8_135)"
						/>
						<defs>
							<pattern
								id="pattern0_8_135"
								patternContentUnits="objectBoundingBox"
								width="1"
								height="1"
							>
								<use
									xlink:href="#image0_8_135"
									transform="matrix(0.00979142 0 0 0.01 0.0104289 0)"
								/>
							</pattern>
							<image
								id="image0_8_135"
								width="100"
								height="100"
								xlink:href="data:image/png;base64,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"
							/>
						</defs>
					</svg>

					<div class="header">{{ $t("payAsYouGo.features[2]") }}</div>
					<div class="subheader">
						{{ $t("payAsYouGo.features[3]") }}
					</div>
				</div>
				<div class="feature">
					<svg
						width="50"
						height="50"
						viewBox="0 0 50 50"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<rect
							y="0.781586"
							width="50"
							height="48.9571"
							fill="url(#pattern0_8_136)"
						/>
						<defs>
							<pattern
								id="pattern0_8_136"
								patternContentUnits="objectBoundingBox"
								width="1"
								height="1"
							>
								<use
									xlink:href="#image0_8_136"
									transform="matrix(0.00979142 0 0 0.01 0.0104289 0)"
								/>
							</pattern>
							<image
								id="image0_8_136"
								width="100"
								height="100"
								xlink:href="data:image/png;base64,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"
							/>
						</defs>
					</svg>

					<div class="header">{{ $t("payAsYouGo.features[4]") }}</div>
					<div class="subheader">
						{{ $t("payAsYouGo.features[5]") }}
					</div>
				</div>
			</div>
			<div
				v-if="
					isRootAccountUser && isUserATargetForPayAsYouGoPlan && false
				"
				class="features-cta filled-button-with-icon"
				@click="scrollToSection('BUY_CREDITS')"
			>
				{{ $t("payAsYouGo.bannerCTAText") }}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="12"
					viewBox="0 0 20 12"
					fill="none"
				>
					<path
						d="M13.0763 12L12.0268 10.9821L16.3473 6.73661H0V5.26339H16.3473L12.0268 1.03125L13.0763 0L19.1822 6L13.0763 12Z"
						fill="white"
					/>
				</svg>
			</div>
		</div>
		<div class="credit-estimator-section-wrapper">
			<div class="background-element"></div>
			<div class="header">
				{{ $t("payAsYouGo.creditEstimatorHeader[0]") }}
				<span>{{ $t("payAsYouGo.creditEstimatorHeader[1]") }}</span>
				{{ $t("payAsYouGo.creditEstimatorHeader[2]") }}
			</div>
			<div class="calculator-wrapper">
				<div class="sliders">
					<div class="slider-content-wrapper">
						<div class="slider-label">
							{{ $t("payAsYouGo.ppm") }}
						</div>
						<PayAsYouGoRangeSlider
							class="default-slider-styles"
							:min="0"
							:max="25"
							:step="5"
							:value="numberOfProject"
							@sliderInput="handleSliderInput($event, 'projects')"
						></PayAsYouGoRangeSlider>
					</div>
					<div class="slider-content-wrapper">
						<div class="slider-label">
							{{ $t("payAsYouGo.cfpm") }}
						</div>
						<PayAsYouGoRangeSlider
							class="default-slider-styles"
							:min="0"
							:max="25"
							:step="5"
							:value="numberOfModels"
							@sliderInput="
								handleSliderInput($event, 'customModels')
							"
						></PayAsYouGoRangeSlider>
					</div>
					<div class="slider-content-wrapper last-child">
						<div class="slider-label">
							{{ $t("payAsYouGo.opp") }}
							<div class="slider-label-info">
								{{ $t("payAsYouGo.outputIncludesRenders") }}
							</div>
						</div>
						<PayAsYouGoRangeSlider
							class="default-slider-styles"
							:min="0"
							:max="25"
							:step="5"
							:value="numberOfRenders"
							@sliderInput="handleSliderInput($event, 'renders')"
						></PayAsYouGoRangeSlider>
					</div>
				</div>
				<div class="estimate">
					<div class="calculator-header">
						{{ $t("payAsYouGo.estimatedUsage") }}
					</div>
					<div class="total-credits-per-month">
						<div class="calculated-credits">
							{{ totalCreditsRequiredPerMonth }}
						</div>
						<div class="label">
							{{ $t("payAsYouGo.creditsPerMonth") }}
						</div>
					</div>
					<div
						class="buy-now-button"
						@click="scrollToSection('BUY_CREDITS')"
					>
						{{ $t("buttonText.buyNow") }}
					</div>
				</div>
			</div>
		</div>
		<div class="plan-details-section-wrapper-v2">
			<div class="header">{{ $t("payAsYouGo.plansSectionHeader") }}</div>
			<div class="sub-header">
				{{ $t("payAsYouGo.plansSectionSubheader") }}
			</div>

			<div class="plans-wrapper">
				<div class="plan plan-one">
					<div class="price">
						{{ getPayAsYouGoPlanPrice("LOW_CREDIT") }}
					</div>
					<div class="credits">50 {{ $t("payAsYouGo.credits") }}</div>
					<div class="divider"></div>
					<div
						v-if="payAsYouGoLowCreditsPlan"
						class="buy-now-button"
						@click="
							onBuyNowButtonClick(
								payAsYouGoLowCreditsPlan._id ||
									'LOW_CREDITS_PLAN'
							)
						"
					>
						{{ $t("buttonText.buyNow") }}
					</div>
					<div class="price-per-credit">$1.38 per credit</div>
				</div>
				<div class="plan plan-two">
					<div class="price">
						{{ getPayAsYouGoPlanPrice("HIGH_CREDIT") }}
					</div>
					<div class="credits">
						100 {{ $t("payAsYouGo.credits") }}
					</div>
					<div class="divider"></div>
					<div
						v-if="payAsYouGoHighCreditsPlan"
						class="buy-now-button"
						@click="
							onBuyNowButtonClick(
								payAsYouGoHighCreditsPlan._id ||
									'HIGH_CREDITS_PLAN'
							)
						"
					>
						{{ $t("buttonText.buyNow") }}
					</div>
					<div class="price-per-credit">$0.99 per credit</div>
				</div>
			</div>
		</div>
		<div class="section-divider">
			<div
				class="items-wrapper"
				@click="scrollToSection('CREDITS_USAGE')"
			>
				<div class="text">
					{{ $t("payAsYouGo.sectionDividerText[0]") }}
				</div>
				<svg
					width="50"
					height="48"
					viewBox="0 0 50 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
				>
					<rect
						width="50"
						height="46.6862"
						transform="matrix(-1 0 0 1 50 0.984375)"
						fill="url(#pattern0_14_234)"
					/>
					<defs>
						<pattern
							id="pattern0_14_234"
							patternContentUnits="objectBoundingBox"
							width="1"
							height="1"
						>
							<use
								xlink:href="#image0_14_234"
								transform="matrix(0.00933723 0 0 0.01 0.0331385 0)"
							/>
						</pattern>
						<image
							id="image0_14_234"
							width="100"
							height="100"
							xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADH0lEQVR4nO3cO2gUURQG4I0KIj4K0ULQSlR84QO0DQgxs/esRpBtFbQzOWfzQLTRgFaKhZWCdpaCQkSQEAvtRLQStBLURpKde3fzwPgiIxMDKlnNjY85653/g2mXnzm7c2bunLuFAgAAAAAAAAAAAAAAAAAAAAAAAAD8uaS/fwHOo7LYVDY7kruW5KMjmXRGBmumslM7Vy7VSt27reGaI0l+OAyPOeraoZ0vV0aKnRstyfCsYnw77mlnzI044rWW5NUvipEek0mh0KKdNXhjpd5Vjvj5HMVIHPGEdtbgVQ+eXO4MP567GJJYw7e18wYtiXixNXzfpxiOZLQe8XrtzMFKyuWFjvimZzEmXYlbtTMHK23MjuS632VKPsdFOaydOWiO5KJXMUimYuJj2nmD5oyc9rxMpQXp084bNEdyNP3We95RndPOG7RaqXLIEn/y+nUYuaKdN2i1Ytc+S/Le8zJ1K70D084crJi69joj4559Yyh9NtHOnOfFwu+XRR69betbqp05WLajd50z/NqvZ/Cz+v6eldqZgzUW8Wpn5IVfz+CXI+3da7QzByuOeIU1/NSzgQ+nlzXtzMF6U+5ZYokfejbwOl7L/kNJa/8ia+SO71M4DvndczCanmd7oHvrz4tRKLRYkhs4yZLdFy19lCh2bm9YEGv4Mooh2f/qjQzOKoYzfBbFEJVLcDomNWtVw5GcQUGkeQoy8yu5hKKIRlEaj0WhqYtG/xi3JNtw20vqR90aHogj3uL3YGjkge8H1yLeNeeHwl9YOiF54tmUsHSSBSwuNumsLpbf//MXVMPlE8u0MwevWpI9X/d2eDV6vMLNashhehzUr9FjyCELznCH/xgQX80kVN45qhzxHpQjOa+dNxcs8Snfp1KMkmbEGb7gWZCp2MjxrHLlezuC4WteRcF2hObbsGMNf4iL0pZRtPya75a2UZIN2pmDN89NnwPaeXPBf1s09qk33x8H4M9ommgxstHYC2Tw5zMkrsFq8ARGT5VU2yubpsdSDb+bWf8aQjGaAPoFAAAAAAAAAAAAAAAAAAAAAAAAABRSXwAplWflBQ2TngAAAABJRU5ErkJggg=="
						/>
					</defs>
				</svg>
			</div>
			<div
				class="items-wrapper"
				@click="scrollToSection('PRICING_CALCULATOR')"
			>
				<div class="text">
					{{ $t("payAsYouGo.sectionDividerText[1]") }}
				</div>
				<svg
					width="50"
					height="48"
					viewBox="0 0 50 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
				>
					<rect
						width="50"
						height="46.6862"
						transform="matrix(-1 0 0 1 50 0.984375)"
						fill="url(#pattern0_14_234)"
					/>
					<defs>
						<pattern
							id="pattern0_14_234"
							patternContentUnits="objectBoundingBox"
							width="1"
							height="1"
						>
							<use
								xlink:href="#image0_14_234"
								transform="matrix(0.00933723 0 0 0.01 0.0331385 0)"
							/>
						</pattern>
						<image
							id="image0_14_234"
							width="100"
							height="100"
							xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADH0lEQVR4nO3cO2gUURQG4I0KIj4K0ULQSlR84QO0DQgxs/esRpBtFbQzOWfzQLTRgFaKhZWCdpaCQkSQEAvtRLQStBLURpKde3fzwPgiIxMDKlnNjY85653/g2mXnzm7c2bunLuFAgAAAAAAAAAAAAAAAAAAAAAAAAD8uaS/fwHOo7LYVDY7kruW5KMjmXRGBmumslM7Vy7VSt27reGaI0l+OAyPOeraoZ0vV0aKnRstyfCsYnw77mlnzI044rWW5NUvipEek0mh0KKdNXhjpd5Vjvj5HMVIHPGEdtbgVQ+eXO4MP567GJJYw7e18wYtiXixNXzfpxiOZLQe8XrtzMFKyuWFjvimZzEmXYlbtTMHK23MjuS632VKPsdFOaydOWiO5KJXMUimYuJj2nmD5oyc9rxMpQXp084bNEdyNP3We95RndPOG7RaqXLIEn/y+nUYuaKdN2i1Ytc+S/Le8zJ1K70D084crJi69joj4559Yyh9NtHOnOfFwu+XRR69betbqp05WLajd50z/NqvZ/Cz+v6eldqZgzUW8Wpn5IVfz+CXI+3da7QzByuOeIU1/NSzgQ+nlzXtzMF6U+5ZYokfejbwOl7L/kNJa/8ia+SO71M4DvndczCanmd7oHvrz4tRKLRYkhs4yZLdFy19lCh2bm9YEGv4Mooh2f/qjQzOKoYzfBbFEJVLcDomNWtVw5GcQUGkeQoy8yu5hKKIRlEaj0WhqYtG/xi3JNtw20vqR90aHogj3uL3YGjkge8H1yLeNeeHwl9YOiF54tmUsHSSBSwuNumsLpbf//MXVMPlE8u0MwevWpI9X/d2eDV6vMLNashhehzUr9FjyCELznCH/xgQX80kVN45qhzxHpQjOa+dNxcs8Snfp1KMkmbEGb7gWZCp2MjxrHLlezuC4WteRcF2hObbsGMNf4iL0pZRtPya75a2UZIN2pmDN89NnwPaeXPBf1s09qk33x8H4M9ommgxstHYC2Tw5zMkrsFq8ARGT5VU2yubpsdSDb+bWf8aQjGaAPoFAAAAAAAAAAAAAAAAAAAAAAAAABRSXwAplWflBQ2TngAAAABJRU5ErkJggg=="
						/>
					</defs>
				</svg>
			</div>
		</div>
		<div class="how-credits-will-be-used-wrapper">
			<div class="header">
				{{ $t("payAsYouGo.creditsUseageSectionHeader") }}
			</div>
			<div class="credits-useage-table">
				<div class="table-headers">
					<div class="theader">
						{{ $t("payAsYouGo.featuresText") }}
					</div>
					<div class="theader">{{ $t("payAsYouGo.ratesText") }}</div>
				</div>
				<div class="table-body">
					<div
						v-for="(row, rowIndex) of 8"
						:key="row"
						class="table-row"
					>
						<div class="feature">
							<svg
								class="pointer-dot"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="15"
								viewBox="0 0 16 15"
								fill="none"
							>
								<ellipse
									cx="8.25739"
									cy="7.5"
									rx="7.30378"
									ry="7.5"
									fill="#EE4B6E"
								/>
							</svg>
							<div class="text">
								{{
									$t(
										`payAsYouGo.featuresAndRates[${rowIndex}][0]`
									)
								}}
								<svg
									v-if="
										rowIndex != 0 &&
										rowIndex != 1 &&
										rowIndex != 5
									"
									class="premium-feature-svg"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
								>
									<path
										d="M2 6.5099L3.51703 12.5H12.3796L14 6.5099L10.9425 7.93564L8.22779 3.5L5.27358 7.93564L2 6.5099Z"
										fill="#FEAE50"
									/>
								</svg>
							</div>
						</div>
						<div class="rate">
							{{
								$t(
									`payAsYouGo.featuresAndRates[${rowIndex}][1]`
								)
							}}
						</div>
					</div>
				</div>
			</div>
			<div class="premium-features-indicator">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="17"
					viewBox="0 0 16 17"
					fill="none"
				>
					<rect
						y="0.5"
						width="16"
						height="16"
						rx="8"
						fill="white"
						fill-opacity="0.6"
					/>
					<path
						d="M2 7.0099L3.51703 13H12.3796L14 7.0099L10.9425 8.43564L8.22779 4L5.27358 8.43564L2 7.0099Z"
						fill="#FEAE50"
					/>
				</svg>
				Premium Features
			</div>
			<svg
				class="floating-elements top"
				xmlns="http://www.w3.org/2000/svg"
				width="75"
				height="76"
				viewBox="0 0 75 76"
				fill="none"
			>
				<path
					d="M30.0309 15.0254L37.5037 35.2202C37.9088 36.3151 38.772 37.1784 39.8669 37.5835L60.0618 45.0563L39.8669 52.5291C38.772 52.9342 37.9088 53.7974 37.5037 54.8923L30.0309 75.0872L22.5581 54.8923C22.153 53.7974 21.2897 52.9342 20.1949 52.5291L0 45.0563L20.1949 37.5835C21.2897 37.1784 22.153 36.3151 22.5581 35.2202L30.0309 15.0254Z"
					fill="#EE4B6E"
				/>
				<path
					d="M61.4861 0.00927734L64.8169 9.01072C65.0195 9.55816 65.4511 9.98978 65.9985 10.1923L75 13.5232L65.9985 16.854C65.4511 17.0566 65.0195 17.4882 64.8169 18.0356L61.4861 27.0371L58.1552 18.0356C57.9527 17.4882 57.521 17.0566 56.9736 16.854L47.9722 13.5232L56.9736 10.1923C57.521 9.98978 57.9527 9.55816 58.1552 9.01072L61.4861 0.00927734Z"
					fill="#EE4B6E"
				/>
			</svg>
			<svg
				class="floating-elements bottom"
				xmlns="http://www.w3.org/2000/svg"
				width="75"
				height="76"
				viewBox="0 0 75 76"
				fill="none"
			>
				<path
					d="M30.0309 15.0254L37.5037 35.2202C37.9088 36.3151 38.772 37.1784 39.8669 37.5835L60.0618 45.0563L39.8669 52.5291C38.772 52.9342 37.9088 53.7974 37.5037 54.8923L30.0309 75.0872L22.5581 54.8923C22.153 53.7974 21.2897 52.9342 20.1949 52.5291L0 45.0563L20.1949 37.5835C21.2897 37.1784 22.153 36.3151 22.5581 35.2202L30.0309 15.0254Z"
					fill="#EE4B6E"
				/>
				<path
					d="M61.4861 0.00927734L64.8169 9.01072C65.0195 9.55816 65.4511 9.98978 65.9985 10.1923L75 13.5232L65.9985 16.854C65.4511 17.0566 65.0195 17.4882 64.8169 18.0356L61.4861 27.0371L58.1552 18.0356C57.9527 17.4882 57.521 17.0566 56.9736 16.854L47.9722 13.5232L56.9736 10.1923C57.521 9.98978 57.9527 9.55816 58.1552 9.01072L61.4861 0.00927734Z"
					fill="#EE4B6E"
				/>
			</svg>
		</div>
		<div class="testimonials-section-wrapper">
			<div class="header">{{ $t("payAsYouGo.testimonials") }}</div>
			<svg
				class="floating-bg-element top"
				width="362"
				height="482"
				viewBox="0 0 362 482"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M492 219.349C523.077 333.489 453.663 449.818 334.767 477.886C215.871 505.953 95.3192 434.468 64.2418 320.328C33.1644 206.189 102.579 89.8589 221.475 61.7915C340.371 33.724 460.922 105.209 492 219.349Z"
					stroke="url(#paint0_linear_17_30)"
					stroke-opacity="0.2"
					stroke-width="111"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_17_30"
						x1="-97.7385"
						y1="307.107"
						x2="999.165"
						y2="953.246"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EE4B6E" />
						<stop offset="0.265155" stop-color="white" />
					</linearGradient>
				</defs>
			</svg>
			<svg
				class="floating-bg-element bottom"
				width="362"
				height="482"
				viewBox="0 0 362 482"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M492 219.349C523.077 333.489 453.663 449.818 334.767 477.886C215.871 505.953 95.3192 434.468 64.2418 320.328C33.1644 206.189 102.579 89.8589 221.475 61.7915C340.371 33.724 460.922 105.209 492 219.349Z"
					stroke="url(#paint0_linear_17_30)"
					stroke-opacity="0.2"
					stroke-width="111"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_17_30"
						x1="-97.7385"
						y1="307.107"
						x2="999.165"
						y2="953.246"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EE4B6E" />
						<stop offset="0.265155" stop-color="white" />
					</linearGradient>
				</defs>
			</svg>
			<div class="testimonials-wrapper">
				<div class="testimonial">
					<div class="profile-and-image-wrapper">
						<div class="image-wrapper">
							<img
								src="~assets/images/pay-as-you-go/testimonial-image-one.png"
								alt=""
							/>
						</div>
						<div class="name-and-details-wrapper">
							<div class="name">Sarah B.</div>
							<div class="profession">Interior Designer</div>
						</div>
						<div class="rating">
							<img
								v-for="i of 5"
								:key="i + 'test-1'"
								src="~assets/images/pay-as-you-go/Star.png"
								alt=""
							/>
						</div>
					</div>
					<div class="testimonial-content">
						The Pay-as-you-go credits system fits perfectly into my
						workflow. I love that i can manage my spending and still
						Foyr whenever i need it.
					</div>
				</div>
				<div class="testimonial">
					<div class="profile-and-image-wrapper">
						<div class="image-wrapper">
							<img
								src="~assets/images/pay-as-you-go/testimonial-image-two.png"
								alt=""
							/>
						</div>
						<div class="name-and-details-wrapper">
							<div class="name">James Martin</div>
							<div class="profession">Interior Designer</div>
						</div>
						<div class="rating">
							<img
								v-for="i of 5"
								:key="i + 'test-2'"
								src="~assets/images/pay-as-you-go/Star.png"
								alt=""
							/>
						</div>
					</div>
					<div class="testimonial-content">
						I only pay for the features i need, which keeps my cost
						down without sacrificing quality. Great step by Foyr
						team!
					</div>
				</div>
			</div>
		</div>
		<div class="faq-section-wrapper">
			<div class="header">
				{{ $t("payAsYouGo.faqSectionHeader") }}
			</div>
			<div class="faq-wrapper">
				<div
					v-for="(faq, index) of faqQuestionList"
					:key="index"
					class="faq"
				>
					<div class="question-and-icon-wrapper">
						{{ $t(faq) }}
						<div
							class="icon-wrapper"
							@click="toggleFAQOpenState(index)"
						>
							<svg
								v-if="faqOpenState[index]"
								width="13"
								height="4"
								viewBox="0 0 13 4"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11.75 0.4375H1.25C0.757812 0.4375 0.375 0.847656 0.375 1.3125V2.1875C0.375 2.67969 0.757812 3.0625 1.25 3.0625H11.75C12.2148 3.0625 12.625 2.67969 12.625 2.1875V1.3125C12.625 0.847656 12.2148 0.4375 11.75 0.4375Z"
									fill="black"
								/>
							</svg>

							<svg
								v-else
								width="13"
								height="13"
								viewBox="0 0 13 13"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11.75 5.4375H7.8125V1.5C7.8125 1.03516 7.40234 0.625 6.9375 0.625H6.0625C5.57031 0.625 5.1875 1.03516 5.1875 1.5V5.4375H1.25C0.757812 5.4375 0.375 5.84766 0.375 6.3125V7.1875C0.375 7.67969 0.757812 8.0625 1.25 8.0625H5.1875V12C5.1875 12.4922 5.57031 12.875 6.0625 12.875H6.9375C7.40234 12.875 7.8125 12.4922 7.8125 12V8.0625H11.75C12.2148 8.0625 12.625 7.67969 12.625 7.1875V6.3125C12.625 5.84766 12.2148 5.4375 11.75 5.4375Z"
									fill="black"
								/>
							</svg>
						</div>
					</div>
					<div v-show="faqOpenState[index]" class="answer">
						{{ $t(faqAnswerList[index]) }}
					</div>
				</div>
			</div>
		</div>
		<fullScreenSubScriptionUpdateLoaderVue
			v-show="receivingPaymentLoading"
		/>
	</section>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import fullScreenSubScriptionUpdateLoaderVue from "@/components/shared/popups/fullScreenSubScriptionUpdateLoader.vue";
import PayAsYouGoRangeSlider from "@/components/shared/payAsYouGo/PayAsYouGoRangeSlider.vue";

export default {
	components: {
		fullScreenSubScriptionUpdateLoaderVue,
		PayAsYouGoRangeSlider,
	},
	watch: {},
	props: {
		noAuthMode: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	data: () => ({
		addonsList: [
			"payAsYouGo.addonsList[0]",
			"payAsYouGo.addonsList[1]",
			"payAsYouGo.addonsList[2]",
			"payAsYouGo.addonsList[3]",
		],
		planFeaturesList: [
			"payAsYouGo.planFeaturesList[0]",
			"payAsYouGo.planFeaturesList[1]",
			"payAsYouGo.planFeaturesList[2]",
			"payAsYouGo.planFeaturesList[3]",
			"payAsYouGo.planFeaturesList[4]",
		],
		faqQuestionList: [
			"payAsYouGo.faqQuestionList[0]",
			"payAsYouGo.faqQuestionList[1]",
			"payAsYouGo.faqQuestionList[2]",
			"payAsYouGo.faqQuestionList[3]",
			"payAsYouGo.faqQuestionList[4]",
			"payAsYouGo.faqQuestionList[5]",
			"payAsYouGo.faqQuestionList[6]",
		],
		faqAnswerList: [
			"payAsYouGo.faqAnswerList[0]",
			"payAsYouGo.faqAnswerList[1]",
			"payAsYouGo.faqAnswerList[2]",
			"payAsYouGo.faqAnswerList[3]",
			"payAsYouGo.faqAnswerList[4]",
			"payAsYouGo.faqAnswerList[5]",
			"payAsYouGo.faqAnswerList[6]",
		],
		faqOpenState: [],
		isPaymentSuccess: false,
		receivingPaymentLoading: false,
		wasPageLoadEvent: false,
		numberOfProject: 5,
		numberOfModels: 0,
		numberOfRenders: 5,
		userCountry: null,
		countryWisePriceList: {
			US: {
				LOW_CREDIT: "$69",
				HIGH_CREDIT: "$99",
			},
			GB: {
				LOW_CREDIT: "£59",
				HIGH_CREDIT: "£89",
			},
			CA: {
				LOW_CREDIT: "CAD 69",
				HIGH_CREDIT: "CAD 99",
			},
			AU: {
				LOW_CREDIT: "AUD 89",
				HIGH_CREDIT: "AUD 109",
			},
			EU: {
				LOW_CREDIT: "€65",
				HIGH_CREDIT: "€95",
			},
		},
	}),
	computed: {
		...mapState({
			user: (state) => state.User.user,
			packages: (state) => state.Subscriptions.packages,
			currentBilling: (state) => state.Billing.currentSubscription,
		}),
		...mapGetters({
			isUserATargetForPayAsYouGoPlan:
				"Billing/isUserATargetForPayAsYouGoPlan",
			isRootAccountUser: "User/isRootAccountUser",
			payAsYouGoLowCreditsPlan: "Subscriptions/payAsYouGoLowCreditsPlan",
			payAsYouGoHighCreditsPlan:
				"Subscriptions/payAsYouGoHighCreditsPlan",
		}),
		totalCreditsRequiredPerMonth() {
			return (
				this.numberOfProject +
				this.numberOfModels * 10 +
				this.numberOfRenders * 3
			);
		},
	},
	mounted() {
		if (this.$route.query && this.$route.query.country) {
			this.userCountry = this.$route.query.country;
		}
	},
	methods: {
		...mapActions({
			buy: "Subscriptions/buy",
			fetchSubscriptions: "Subscriptions/fetchAll",
			fetchMySubscriptions: "Subscriptions/fetchMySubscriptions",
			fetchCurrentSubscription: "Billing/fetchCurrentSub",
			registerDashboardAnalyticsEvent:
				"Projects/registerDashboardAnalyticsEvent",
		}),
		toggleFAQOpenState(index) {
			this.$set(this.faqOpenState, index, !this.faqOpenState[index]);
		},
		noAuthBuyNowClick(planId) {
			switch (planId) {
				case "HIGH_CREDITS_PLAN": {
					window.open(
						`${window.location.origin}/payment_link/?package=pay-as-you-go-100&curr=own`,
						"_self"
					);
					break;
				}
				case "LOW_CREDITS_PLAN": {
					window.open(
						`${window.location.origin}/payment_link/?package=pay-as-you-go-50&curr=own`,
						"_self"
					);
					break;
				}
			}
		},
		onBuyNowButtonClick(planId) {
			if (this.noAuthMode) {
				this.noAuthBuyNowClick(planId);
				return null;
			}
			this.sendEventToSegment("Buy now clicked on LP");
			if (this.isRootAccountUser && this.isUserATargetForPayAsYouGoPlan) {
				this.registerDashboardAnalyticsEvent({
					event_id: "clicked_on_pay_as_you_go_buy-now",
					additional_data: {
						plan:
							this.currentBilling &&
							this.currentBilling.chargebeeSubscriptionData &&
							this.currentBilling.chargebeeSubscriptionData
								.plan_id
								? this.currentBilling.chargebeeSubscriptionData
										.plan_id
								: "",
					},
				});

				let chargebeeInstance = Chargebee.getInstance();
				if (chargebeeInstance) {
					this.buy({
						accountId: this.user.accountInfo.accountId,
						package: planId,
					}).then((res) => {
						chargebeeInstance.openCheckout({
							hostedPage: function () {
								return new Promise(function (resolve, reject) {
									resolve(res.hostedPage);
								});
							},
							success: (hostedPageId) => {
								this.isPaymentSuccess = true;
							},
							close: () => {
								if (this.isPaymentSuccess) {
									this.receivingPaymentLoading = true;
									setTimeout(() => {
										this.paymentStatus = false;
										this.fetchCurrentSubscription({
											accountId: this.user.accountId,
										});
										this.fetchMySubscriptions({
											accountId: this.user.accountId,
										});
										this.fetchSubscriptions({
											accountId: this.user.accountId,
										});
										this.receivingPaymentLoading = false;
										this.$router.push(
											this.localePath("/settings/plans")
										);
										// this.$root.$emit('fetchlatestplandetails')
									}, 12000);
								}
							},
						});
					});
				}
			}
		},
		handleSliderInput(ev, sliderKey) {
			switch (sliderKey) {
				case "projects": {
					this.numberOfProject = Number(ev);
					break;
				}
				case "customModels": {
					this.numberOfModels = Number(ev);
					break;
				}
				case "renders": {
					this.numberOfRenders = Number(ev);
					break;
				}
			}
		},
		getPayAsYouGoPlanPrice(type) {
			if (
				this.noAuthMode
			) {
				if (this.countryWisePriceList[this.userCountry]) {
					return this.countryWisePriceList[this.userCountry][type] || 0;
				}

				return `NA`
			}

			switch (type) {
				case "LOW_CREDIT": {
					const plan = this.payAsYouGoLowCreditsPlan;
					if (
						plan &&
						plan.displayContext &&
						plan.displayContext.originalPrice
					) {
						return `${plan.displayContext.currency_symbol}${plan.displayContext.originalPrice}`;
					}
					break;
				}
				case "HIGH_CREDIT": {
					const plan = this.payAsYouGoHighCreditsPlan;
					if (
						plan &&
						plan.displayContext &&
						plan.displayContext.originalPrice
					) {
						return `${plan.displayContext.currency_symbol}${plan.displayContext.originalPrice}`;
					}
					break;
				}
			}
		},
		scrollToSection(sectionKey) {
			switch (sectionKey) {
				case "BUY_CREDITS": {
					let section = document.querySelector(
						".neo-pay-as-you-go-home-page .plan-details-section-wrapper-v2"
					);
					if (section) {
						section.scrollIntoView({ behavior: "smooth" });
					}
					break;
				}
				case "PRICING_CALCULATOR": {
					let section = document.querySelector(
						".neo-pay-as-you-go-home-page .credit-estimator-section-wrapper .header"
					);
					if (section) {
						section.scrollIntoView({ behavior: "smooth" });
					}
					break;
				}
				case "CREDITS_USAGE": {
					let section = document.querySelector(
						".neo-pay-as-you-go-home-page .how-credits-will-be-used-wrapper .header"
					);
					if (section) {
						section.scrollIntoView({ behavior: "smooth" });
					}
					break;
				}
			}
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
	},
};
</script>

<style lang="scss" scoped>
.neo-pay-as-you-go-home-page {
	height: 100%;
	width: 100%;

	.hero-section-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 4.8125rem * 1.22;
		padding-right: 5.0625rem;
		padding-bottom: 5.625rem * 1.22;
		padding-left: 6.25rem * 1.22;
		position: relative;
		max-width: 85.375rem * 1.22;
		margin: 0 auto;

		@include custom-min(120em) {
			max-width: 85.375rem;
			padding-top: 4.8125rem;
			padding-right: 5.0625rem;
			padding-bottom: 5.625rem;
			padding-left: 6.25rem;
		}

		.cta-and-content-wrapper {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			flex-grow: 1;
			margin-right: 9.8125rem * 1.22;

			@include custom-min(120em) {
				margin-right: 9.8125rem;
			}

			.pink-text {
				border-radius: 29px;
				border: 1px solid rgba(238, 75, 110, 0.5);
				background: rgba(238, 75, 110, 0.1);
				padding: 0.4375rem * 1.22 1rem * 1.22;
				color: $color-pink;
				font-size: 1rem * 1.22;
				font-style: normal;
				font-weight: 600;
				line-height: 150%;
				margin-bottom: 1.4375rem * 1.22;

				@include custom-min(120em) {
					font-size: 1rem;
					padding: 0.4375rem 1rem;
					margin-bottom: 1.4375rem;
				}
			}
			.header-text {
				max-width: 34.25rem * 1.22;
				color: $color-black;
				font-size: 2rem * 1.22;
				font-style: normal;
				font-weight: 700;
				line-height: 1;

				@include custom-min(120em) {
					max-width: 34.25rem;
					font-size: 2rem;
				}

				&.pink {
					color: $color-pink;
					margin-bottom: 1.25rem * 1.22;

					@include custom-min(120em) {
						margin-bottom: 1.25rem;
					}
				}
			}
			.subheader-text {
				max-width: 34rem * 1.22;
				color: $color-black;
				font-size: 1rem;
				font-style: normal;
				font-weight: 400;
				line-height: 150%;
				margin-bottom: 1rem * 1.22;

				@include custom-min(120em) {
					font-size: 1rem;
					margin-bottom: 1rem;
				}
			}
		}

		.graphic-wrapper {
			width: 28.2759rem * 1.22;
			height: 27.5053rem * 1.22;
			display: flex;
			justify-content: flex-end;

			@include custom-min(120em) {
				width: 28.2759rem;
				height: 27.5053rem;
			}
		}
	}
	.background-element-one {
		position: absolute;
		top: 0;
		left: 0;

		width: 24.9375rem * 1.22;
		height: 22.0625rem * 1.22;
		flex-shrink: 0;

		border-radius: 24.9375rem * 1.22;
		opacity: 0.1;
		background: $color-pink;
		filter: blur(68.51522064208984px);
	}
	.background-element-two {
		position: absolute;
		top: 14.75rem * 1.22;
		right: 0;

		width: 30.8125rem;
		height: 27.3125rem;
		flex-shrink: 0;

		border-radius: 30.8125rem;
		opacity: 0.15;
		background: $color-pink;
		filter: blur(68.51522064208984px);
	}
	.features-section-wrapper {
		position: relative;
		padding: 7.5rem * 1.22 0;
		background-image: url("~/assets/images/pay-as-you-go/fold-5-pattern.png");
		// background-image: url('~/assets/images/pay-as-you-go/plan-details-background-image.png');
		background-repeat: repeat;
		display: flex;
		flex-direction: column;
		align-items: center;

		@include custom-min(120em) {
			padding: 7.5rem 0;
		}

		.section-header {
			max-width: 52.375rem * 1.22;
			color: $color-black;
			text-align: center;
			font-size: 2rem * 1.22;
			font-style: normal;
			font-weight: 700;
			line-height: 152.941%;
			margin-bottom: 0.75rem * 1.22;

			@include custom-min(120em) {
				font-size: 2rem;
				margin-bottom: 0.75rem;
			}
		}

		.section-subheader {
			color: $color-black;
			text-align: center;
			font-size: 1rem * 1.22;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			margin-bottom: 2rem * 1.22;

			@include custom-min(120em) {
				font-size: 1rem;
				margin-bottom: 2rem;
			}
		}

		.features-wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 0 3rem * 1.22;
			max-width: 85.375rem * 1.22;
			margin: 0 auto;
			padding: 0 7.875rem * 1.22;

			@include custom-min(120em) {
				padding: 0 7.875rem;
				gap: 0 3rem;
			}

			.feature {
				padding: 2rem * 1.22 0.875rem * 1.22 2.5625rem * 1.22 1.5625rem *
					1.22;
				background-color: $background-13;
				border-radius: 8px;
				border: 1px solid $border-10;

				@include custom-min(120em) {
					padding: 2rem 0.875rem 2.5625rem 1.5625rem;
				}

				svg {
					width: 2.9375rem * 1.22;
					height: 2.875rem * 1.22;
					flex-shrink: 0;
					margin-bottom: 1.4375rem * 1.22;
				}

				.header {
					color: $color-black;
					font-size: 1.375rem * 1.22;
					font-style: normal;
					font-weight: 800;
					line-height: normal;
					margin-bottom: 1rem * 1.22;
				}

				.subheader {
					// max-width: 260px;
					color: $color-black;
					font-size: 1rem * 1.22;
					font-style: normal;
					font-weight: 400;
					line-height: 150%;
				}
			}
		}
		.features-cta {
			margin-top: 1.9375rem * 1.22;
		}
	}
	.credit-estimator-section-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 7.5rem * 1.22 9.375rem * 1.22 7.5rem * 1.22 9.375rem * 1.22;
		position: relative;

		@include custom-min(120em) {
			padding: 7.5rem 9.375rem 7.5rem 9.375rem;
		}

		.header {
			position: relative;
			color: $color-black;
			text-align: center;
			font-size: 2rem * 1.22;
			font-style: normal;
			font-weight: 600;
			line-height: 71.75%;
			letter-spacing: 1.7px;
			margin-bottom: 2.625rem * 1.22;

			@include custom-min(120em) {
				font-size: 2rem;
				margin-bottom: 2.625rem;
			}

			span {
				color: $color-pink;
				font-size: inherit;
			}
		}

		.calculator-wrapper {
			position: relative;
			border-radius: 15px;
			border: 2px solid $border-16;
			background: $background-white;
			box-shadow: 2px 6px 70px 0px rgba(0, 0, 0, 0.15);
			display: flex;
			justify-content: space-between;
			max-width: 60.3125rem * 1.22;

			.sliders {
				padding: 4rem * 1.22;
				padding-right: 2.1875rem * 1.22;

				@include custom-min(120em) {
					padding: 4rem;
					padding-right: 2.1875rem;
				}

				.slider-content-wrapper {
					margin-bottom: 6rem * 1.22;

					&.last-child {
						margin-bottom: 3rem;
						// .slider-label {
						// 	margin-bottom: 0.375rem * 1.22;
						// }
					}

					@include custom-min(120em) {
						margin-bottom: 6rem;
					}
				}

				.slider-label {
					color: $color-black;
					font-size: 1.125rem * 1.22;
					font-style: normal;
					font-weight: 400;
					line-height: 1.435rem * 1.22;
					margin-bottom: 1.5rem * 1.22;
					display: flex;
					align-items: center;
					justify-content: space-between;

					@include custom-min(120em) {
						margin-bottom: 1.5rem;
					}
				}

				.slider-label-info {
					color: $color-light-gray-7;
					font-size: 0.75rem * 1.22;
					font-style: normal;
					font-weight: 400;
					line-height: 114.8%;

					@include custom-min(120em) {
						font-size: 0.75rem;
					}
				}

				.default-slider-styles {
					width: 28.25rem * 1.22;
					height: 0.6875rem * 1.22;

					@include custom-min(120em) {
						width: 28.25rem;
						height: 0.6875rem;
					}
				}
			}

			.estimate {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background: rgba(238, 75, 110, 0.05);
				padding: 6.8125rem * 1.22 4.9375rem * 1.22;

				@include custom-min(120em) {
					padding: 8.8125rem 5.9375rem;
				}

				.calculator-header {
					color: $color-black;
					text-align: center;
					font-size: 1.5rem * 1.22;
					font-style: normal;
					font-weight: 500;
					line-height: normal;
					flex-shrink: 0;
					text-transform: uppercase;
					margin-bottom: 0.5rem * 1.22;

					@include custom-min(120em) {
						font-size: 1.5rem;
						margin-bottom: 0.5rem;
					}
				}

				.total-credits-per-month {
					flex-shrink: 0;
					.calculated-credits {
						color: $color-pink;
						text-align: center;
						font-size: 4.5rem * 1.22;
						font-style: normal;
						font-weight: 600;
						line-height: normal;

						@include custom-min(120em) {
							font-size: 4.5rem;
						}
					}

					.label {
						color: $color-black;
						text-align: center;
						font-size: 1rem * 1.22;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
						margin-bottom: 1.5rem * 1.22;

						@include custom-min(120em) {
							font-size: 1rem;
							margin-bottom: 1.5rem;
						}
					}
				}

				.buy-now-button {
					cursor: pointer;
					flex-shrink: 0;
					border-radius: 10px;
					background: $background-black;
					padding: 0.75rem * 1.22 5rem * 1.22;

					color: $color-white;
					font-size: 1rem * 1.22;
					font-style: normal;
					font-weight: 600;
					line-height: 150%;

					@include custom-min(120em) {
						font-size: 1rem;
						padding: 0.75rem 5rem;
					}
				}
			}
		}

		.background-element {
			width: 53.75rem * 1.22;
			height: 48rem * 1.22;
			border-radius: 860px;
			opacity: 0.1;
			background: rgba(238, 75, 110, 0.7);
			filter: blur(68.51522064208984px);
			position: absolute;
			left: -15%;
			bottom: 0;
		}
	}
	.plan-details-section-wrapper-v2 {
		padding: 7.5rem * 1.22 10.625rem * 1.22;
		background-image: url("~/assets/images/pay-as-you-go/plans-dot-pattern.png");
		background-color: $background-black;

		@include custom-min(120em) {
			padding: 7.5rem 10.625rem;
		}

		.header {
			color: $color-white;
			text-align: center;
			font-size: 2rem * 1.22;
			font-style: normal;
			font-weight: 600;
			line-height: 150%;
			margin-bottom: 1.0625rem * 1.22;

			@include custom-min(120em) {
				font-size: 2rem;
				margin-bottom: 1.0625rem;
			}
		}

		.sub-header {
			color: $color-white;
			text-align: center;
			font-size: 1rem * 1.22;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			margin-bottom: 2rem * 1.22;

			@include custom-min(120em) {
				font-size: 1rem;
				margin-bottom: 2rem;
			}
		}

		.plans-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;

			.plan {
				min-width: 20.875rem * 1.22;
				padding: 1.5rem * 1.22 0;
				background-color: $background-white-7;
				border-radius: 10px;
				box-shadow: 1px 3px 50.7px 0px rgba(0, 0, 0, 0.1);
				display: flex;
				flex-direction: column;
				align-items: center;

				@include custom-min(120em) {
					min-width: 20.875rem;
					padding: 1.5rem 0;
				}

				&.plan-two {
					background-color: $background-white-8;
				}

				&:not(:last-child) {
					margin-right: 3rem * 1.22;

					@include custom-min(120em) {
						margin-right: 3rem;
					}
				}

				.price {
					color: $color-pink;
					font-family: "Work Sans";
					font-size: 4.5rem * 1.22;
					font-style: normal;
					font-weight: 700;
					line-height: normal;

					@include custom-min(120em) {
						font-size: 4.5rem;
					}
				}

				.divider {
					background: $background-20;
					width: 100%;
					height: 2px;
					margin: 2rem * 1.22 0;
				}

				.credits {
					color: $color-black;
					text-align: center;
					font-size: 1.25rem * 1.22;
					font-style: normal;
					font-weight: 500;
					line-height: 135%;

					@include custom-min(120em) {
						font-size: 1.25rem;
					}
				}

				.buy-now-button {
					cursor: pointer;
					border-radius: 10px;
					background: $background-black;
					padding: 0.875rem * 1.22 3.0625rem * 1.22;
					min-width: 13.75rem * 1.22;
					color: $color-white;
					font-size: 1rem * 1.22;
					font-style: normal;
					font-weight: 600;
					line-height: 135%;
					margin-bottom: 1.25rem * 1.22;

					display: flex;
					justify-content: center;
					align-items: center;

					@include custom-min(120em) {
						min-width: 13.75rem;
						font-size: 1rem;
						padding: 0.875rem 3.0625rem;
						margin-bottom: 1.25rem;
					}
				}

				.price-per-credit {
					color: $color-black;
					font-size: 0.875rem * 1.22;
					font-style: normal;
					font-weight: 500;
					line-height: normal;

					@include custom-min(120em) {
						font-size: 0.875rem;
					}
				}
			}
		}
	}
	.section-divider {
		padding: 3rem * 1.22;
		background-color: $background-white;
		display: flex;
		align-items: center;
		justify-content: center;

		.items-wrapper {
			display: flex;
			align-items: center;
			cursor: pointer;
		}

		@include custom-min(120em) {
			padding: 3rem;
		}

		.text {
			color: $color-black;
			font-size: 1.25rem * 1.22;
			font-style: normal;
			font-weight: 500;
			line-height: 112.5%;
			margin-right: 0.625rem * 1.22;

			@include custom-min(120em) {
				font-size: 1.25rem;
			}
		}

		svg {
			flex-shrink: 0;
			width: 3.125rem * 1.22;
			height: 2.9179rem * 1.22;
			margin-right: 3.125rem * 1.22;

			@include custom-min(120em) {
				width: 3.125rem;
				height: 2.9179rem;
				margin-right: 3.125rem;
			}
		}
	}
	.how-credits-will-be-used-wrapper {
		background: linear-gradient(90deg, #fff -2.42%, #ffd328 254.88%);
		padding: 7.5rem * 1.22 5.75rem * 1.22;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		@include custom-min(120em) {
			padding: 7.5rem 5.75rem;
		}

		.header {
			text-align: center;
			color: $color-black;
			font-size: 2rem * 1.22;
			font-style: normal;
			font-weight: 600;
			line-height: 150%;
			letter-spacing: 2.04px;
			margin-bottom: 2.625rem * 1.22;

			@include custom-min(120em) {
				font-size: 2rem;
				margin-bottom: 2.625rem;
			}
		}

		.credits-useage-table {
			border-radius: 10px;
			border: 2px solid $border-14;
			overflow: hidden;
			box-sizing: border-box;
			max-width: 73.8125rem * 1.22;
			width: 100%;

			.table-headers {
				width: 100%;
				background-color: $background-black;
				display: grid;
				grid-template-columns: 60% 40%;
				gap: 0.625rem * 1.22;

				@include custom-min(120em) {
					gap: 0.625rem;
				}

				.theader {
					text-align: left;
					padding: 1.5625rem * 1.22 1.875rem * 1.22;
					color: $color-white;
					font-size: 1.5rem * 1.22;
					font-style: normal;
					font-weight: 600;
					line-height: 95.667%;

					@include custom-min(120em) {
						padding: 1.5625rem 1.875rem;
						font-size: 1.5rem;
					}
				}
			}

			.table-body {
				width: 100%;
				background-color: $background-white;

				.table-row {
					width: 100%;
					display: grid;
					grid-template-columns: 60% 40%;
					gap: 0.625rem * 1.22;
					border-bottom: 1px solid $border-17;
					padding: 1.25rem * 1.22 1.875rem * 1.22;

					@include custom-min(120em) {
						padding: 1.25rem 1.875rem;
					}

					.feature {
						display: flex;
						align-items: center;
						.pointer-dot {
							width: 0.913rem * 1.22;
							height: 0.9375rem * 1.22;
							margin-right: 1.375rem * 1.22;
						}

						.text {
							color: $color-black;
							font-size: 1rem * 1.22;
							font-style: normal;
							font-weight: 600;
							line-height: 143.5%;
							position: relative;
						}

						.premium-feature-svg {
							position: absolute;
							right: 0;
							top: 0;
							transform: translate(100%, -50%);
						}

						@include custom-min(120em) {
							font-size: 1rem;
						}
					}

					.rate {
						color: $color-dark-gray-5;
						font-size: 1rem * 1.22;
						font-style: normal;
						font-weight: 600;
						line-height: 143.5%;

						@include custom-min(120em) {
							font-size: 1rem;
						}
					}
				}
			}
		}

		.premium-features-indicator {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-top: 0.9375rem * 1.22;
			max-width: 73.8125rem * 1.22;
			width: 100%;

			svg {
				width: 1rem * 1.22;
				height: 1rem * 1.22;
				margin-right: 0.5rem;
			}

			color: $color-dark-gray-6;
			font-size: 1rem * 1.22;
			font-style: italic;
			font-weight: 400;
			line-height: 143.5%;

			@include custom-min(120em) {
				font-size: 1rem;
				margin-top: 0.9375rem;

				svg {
					width: 1rem;
					height: 1rem;
					margin-right: 0.5rem;
				}
			}
		}

		.floating-elements {
			width: 3.252rem * 1.22;
			height: 3.2554rem * 1.22;
			position: absolute;

			&.top {
				left: 2.1875rem * 1.22;
				top: 7.375rem * 1.22;
			}

			&.bottom {
				right: 2.0625rem * 1.22;
				bottom: 4.625rem * 1.22;
			}
		}
	}
	.testimonials-section-wrapper {
		position: relative;
		background-color: $background-white;
		padding: 7.5rem * 1.22 10.3125rem * 1.22;
		display: flex;
		align-items: center;
		flex-direction: column;
		overflow: hidden;

		@include custom-min(120em) {
			padding: 7.5rem 10.3125rem;
		}

		.header {
			color: $color-black;
			font-size: 2rem * 1.22;
			font-style: normal;
			font-weight: 600;
			line-height: 150%;
			letter-spacing: 1.7px;
			margin-bottom: 2.625rem * 1.22;

			@include custom-min(120em) {
				font-size: 2rem;
				margin-bottom: 2.625rem;
			}
		}

		.floating-bg-element {
			position: absolute;
			width: 34.4072rem * 1.22;
			height: 33.8901rem * 1.22;
			flex-shrink: 0;

			&.top {
				transform: rotate(-15.106deg);
				bottom: 9.625rem * 1.22;
				left: -30%;
			}

			&.bottom {
				top: 8.4375rem * 1.22;
				right: -30%;
				transform: rotate(-150.849deg);
			}
		}

		.testimonials-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: stretch;

			.testimonial {
				padding: 2rem * 1.22 1.5rem * 1.22 2rem * 1.22 2.4063rem * 1.22;
				border-radius: 10px;
				border: 1px solid $border-18;
				background: $background-white;
				box-shadow: 2px 7px 50px 0px rgba(0, 0, 0, 0.1);
				min-width: 25.3125rem * 1.22;

				@include custom-min(120em) {
					padding: 2rem 1.5rem 2rem 2.4063rem;
					min-width: 25.3125rem * 1.22;
				}

				&:not(:last-child) {
					margin-right: 2.25rem * 1.22;
					@include custom-min(120em) {
						margin-right: 2.25rem;
					}
				}

				.profile-and-image-wrapper {
					margin-bottom: 0.75rem * 1.22;
					display: grid;
					align-items: center;
					grid-template-columns: max-content 1fr max-content;
					gap: 0 0.7813rem * 1.22;

					@include custom-min(120em) {
						gap: 0 0.7813rem;
						margin-bottom: 0.75rem;
					}

					.image-wrapper {
						width: 3.25rem * 1.22;
						height: 3.25rem * 1.22;

						@include custom-min(120em) {
							width: 3.25rem;
							height: 3.25rem;
						}

						img {
							height: 100%;
							width: 100%;
							display: block;
						}
					}

					.name-and-details-wrapper {
						.name {
							color: $color-black;
							font-size: 1rem * 1.22;
							font-style: normal;
							font-weight: 600;
							line-height: normal;
							margin-bottom: 0.5rem * 1.22;

							@include custom-min(120em) {
								font-size: 1rem;
								margin-bottom: 0.5rem;
							}
						}

						.profession {
							color: $color-light-gray-8;
							font-size: 0.875rem * 1.22;
							font-style: normal;
							font-weight: 500;
							line-height: normal;

							@include custom-min(120em) {
								font-size: 0.875rem;
							}
						}
					}

					.rating {
						display: grid;
						align-items: center;
						grid-template-columns: repeat(5, 1fr);
						gap: 0 0.375rem * 1.22;

						@include custom-min(120em) {
							gap: 0 0.375rem;
						}

						img {
							width: 1.5rem * 1.22;
							height: 1.5rem * 1.22;

							@include custom-min(120em) {
								width: 1.5rem;
								height: 1.5rem;
							}
						}
					}
				}

				.testimonial-content {
					color: $color-black;
					font-size: 1rem * 1.22;
					font-style: normal;
					font-weight: 500;
					line-height: 175%;
					max-width: 27rem * 1.22;

					@include custom-min(120em) {
						font-size: 1rem;
						max-width: 27rem;
					}
				}
			}
		}
	}
	.faq-section-wrapper {
		position: relative;
		padding: 7.5rem * 1.22 11.25rem * 1.22;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 85.375rem * 1.22;
		margin: 0 auto;

		@include custom-min(120em) {
			padding: 7.5rem 11.25rem;
			max-width: 85.375rem;
		}

		.header {
			color: $color-black;
			text-align: center;
			font-size: 2rem * 1.22;
			font-style: normal;
			font-weight: 700;
			line-height: 150%;
			margin-bottom: 2.625rem * 1.22;
			text-align: center;

			@include custom-min(120em) {
				font-size: 2rem;
				margin-bottom: 2.625rem;
			}
		}

		.faq-wrapper {
			width: 100%;
			.faq {
				width: 100%;
				padding: 2rem * 1.22;
				padding-right: 1.5rem * 1.22;
				border-radius: 8px;
				background: $background-white;
				margin-bottom: 1.5rem * 1.22;
				border: 1px solid $border-11;

				@include custom-min(120em) {
					padding: 2rem * 1.22;
					padding-right: 1.5rem * 1.22;
					margin-bottom: 1.5rem;
				}

				.question-and-icon-wrapper {
					display: flex;
					justify-content: space-between;
					align-items: center;

					color: $color-black;
					font-size: 1.125rem * 1.22;
					font-style: normal;
					font-weight: 600;
					line-height: normal;

					@include custom-min(120em) {
						font-size: 1.125rem;
					}

					.icon-wrapper {
						cursor: pointer;
						display: flex;
						padding: 4px 6px 4px 5px;
						justify-content: center;
						align-items: center;
						width: 2.375rem * 1.22;
						height: 2.375rem * 1.22;

						@include custom-min(120em) {
							width: 2.375rem;
							height: 2.375rem;
						}

						border-radius: 100%;
						background: $background-white-3;
					}
				}

				.answer {
					margin-top: 1rem * 1.22;
					color: $color-black;
					font-size: 1.25rem * 1.22;
					font-style: normal;
					font-weight: 400;
					line-height: 150%;

					@include custom-min(120em) {
						margin-top: 1rem;
						font-size: 1.25rem;
					}

					.page-link {
						color: $color-black;
					}
				}
			}
		}
	}
	.filled-button-with-icon {
		cursor: pointer;
		display: inline-flex;
		padding: 0.75rem * 1.22 1.6875rem * 1.22;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		background: $background-14;

		color: $color-white;
		text-align: center;
		font-size: 1rem * 1.22;
		font-style: normal;
		font-weight: 500;
		line-height: normal;

		@include custom-min(120em) {
			font-size: 1rem;
			padding: 0.75rem 1.6875rem;
		}

		svg {
			margin-left: 0.625rem * 1.22;
		}
	}
}
</style>

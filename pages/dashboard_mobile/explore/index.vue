<template>
	<div class="explore-page-wrapper">
		<div class="top-section">
			<div class="header-wrapper">
				<div class="explore-nav-wrapper">
					<div class="title">{{$t("mobileSection.routeNames[3]")}}</div>
					<nuxt-link class="profile-icon" :to="localePath('/dashboard_mobile/plans')">
						<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="18" cy="18" r="18" fill="#0E0E0E"/>
							<mask id="mask0_2278_10469" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
							<circle cx="18" cy="18" r="18" fill="#0E0E0E"/>
							</mask>
							<g mask="url(#mask0_2278_10469)">
							<path d="M18 18C21.3137 18 24 15.3137 24 12C24 8.68629 21.3137 6 18 6C14.6863 6 12 8.68629 12 12C12 15.3137 14.6863 18 18 18Z" fill="#747474"/>
							<ellipse cx="18" cy="32" rx="13" ry="11" fill="#747474"/>
							</g>
						</svg>
					</nuxt-link>
				</div>
				<div class="title-cta-wrapper">
					<div class="header-title">
						{{ $t("mobileSection.unlockMore[0]") }} {{ $t("mobileSection.unlockMore[1]") }}
					</div>
					<nuxt-link class="connect-your-desktop-btn" :to="localePath('/dashboard_mobile/link-desktop')" >
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.3467 14C12.3467 14 11.92 16.5 14 18H6C8.13333 16.5 7.65333 14 7.65333 14" stroke="#E9BEB3" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M17 14H3C2.45 14 2 13.5519 2 13.0041V2.99585C2 2.44813 2.45 2 3 2H17C17.55 2 18 2.44813 18 2.99585V13.0041C18 13.5519 17.55 14 17 14Z" stroke="#E9BEB3" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M2 12H18" stroke="#E9BEB3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
	
						{{ $t("buttonText.connectYourDesktop") }}
					</nuxt-link>
				</div>
			</div>
			<div class="slider-section">
				<!-- <div class="background-overlay"></div> -->
				<MobileSlider
					:data="sliderData"
					:showArrows="true"
					:showDots="true"
				></MobileSlider>
			</div>
		</div>
		<div class="bottom-section">
			<div class="title">
				{{ $t("mobileSection.madeWithFoyr[0]") }} <span>{{ $t("mobileSection.madeWithFoyr[1]") }}</span>
			</div>
			<div class="list-wrapper">
				<div class="item item-1 iwfp">
					<img class="" src="~/assets/images/mobile/samplerenders/samplereder1.jpg" alt="" />
				</div>
				<div class="item item-2 iwfp">
					<img class="" src="~/assets/images/mobile/samplerenders/samplereder2.jpg" alt="" />
				</div>
				<div class="item item-3 iwfp">
					<img class="" src="~/assets/images/mobile/samplerenders/samplereder3.jpg" alt="" />
				</div>
				<div class="item item-4 iwfp">
					<img class="" src="~/assets/images/mobile/samplerenders/samplereder4.jpg" alt="" />
				</div>
				<div class="item item-5 iwfp">
					<img class="" src="~/assets/images/mobile/samplerenders/samplereder5.jpg" alt="" />
				</div>
				<div class="item item-6 iwfp">
					<img class="" src="~/assets/images/mobile/samplerenders/samplereder6.jpg" alt="" />
				</div>
				<div class="item item-7 iwfp">
					<img class="" src="~/assets/images/mobile/samplerenders/samplereder7.jpg" alt="" />
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import MobileSlider from '../../../components/shared/mobile/mobileSlider.vue';
import CommonUtilities from '../../../mixins/commonUtilitiesMixin';
export default {
	layout: "mobile",
	middleware: ["initAuth", "authReq"],
	mixins: [CommonUtilities],
	components: {
		MobileSlider
	},
	data: () => {
		return {
			sliderData: [
        {
          title: "mobileExplorePage.sliderText[0]",
          image: "https://foyrproductmaster.s3.ap-south-1.amazonaws.com/neovideos/1.+Draw+room.webm",
        },
        {
          title: "mobileExplorePage.sliderText[1]",
          image: "https://foyrproductmaster.s3.ap-south-1.amazonaws.com/neovideos/2.+Drag+and+drop+products.webm",
        },
        {
          title: "mobileExplorePage.sliderText[2]",
          image: "https://foyrproductmaster.s3.ap-south-1.amazonaws.com/neovideos/Mobile_Texture_Apply_New_3.webm",
        },
        {
          title: "mobileExplorePage.sliderText[3]",
          image: "https://foyrproductmaster.s3.ap-south-1.amazonaws.com/neovideos/Mobile_Render_New_4.webm",
        },
      ],
			
		}
	},
	mounted() {
		this.sendEventToTrack("Opened DB on mobile")
	}
};
</script>
<style lang="scss" scoped>

*::-webkit-scrollbar {
  width: 0;
  height: 0rem;
}


.explore-page-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	gap: 2rem;
	
	.top-section {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1.5rem;
		.header-wrapper {
			background-image: url('~assets/images/mobile/explore-top-section-bg.png');
			background-size: cover;
			.explore-nav-wrapper {
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				padding: 1rem;
				.title {
					color: #3A393A;
					font-size: 1.25rem;
					font-style: normal;
					font-weight: 700;
					line-height: normal;
				}
				.profile-icon {
					width: 2.25rem;
					height: 2.25rem;
					flex-shrink: 0;
				}
			}
		}
		.title-cta-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			gap: 1rem;
			// background: linear-gradient(332deg, $background-white-11 14.47%, $background-45 49.96%);
			padding: 0rem 0 3.25rem 0;
			.header-title {
				width: 100%;
				text-align: center;
				white-space: nowrap;
				font-size: 1.5rem;
				font-weight: 700;
				line-height: 2rem; /* 133.333% */
				letter-spacing: -2px;
				background: linear-gradient(94deg, #BF8576 -16.49%, #8E6358 72.34%);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			
		}
		
		.slider-section {
			position: relative;
			margin-top: -3.5rem;
			.background-overlay {
				position: absolute; /* Ensure it can be layered */
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(244deg, $background-10 -9.34%, $background-29 115.48%);
				opacity: 0.6;
				filter: blur(50px);
				pointer-events: none; /* Prevent interaction */
				z-index: 0; /* Place it behind other content */
			}

		}
	}
	.bottom-section {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 1.25rem;
		.title {
			color: $color-dark-gray-9;
			text-align: center;
			
			font-size: 1.25rem;
			
			font-weight: 700;
			line-height: 1.5rem; /* 120% */
			letter-spacing: -0.6px;
			span {
				text-align: center;
				font-size: 1.25rem;
				font-weight: 700;
				line-height: 1.5rem; /* 120% */
				background: linear-gradient(94deg, $background-48 -16.49%, $background-49 72.34%);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
		.list-wrapper  {
			padding: 1rem;
			display: grid;
			grid-template-columns: repeat(4, 1fr); /* Four equal columns */
			grid-auto-rows: minmax(5rem, auto); /* Rows adjust automatically */
			gap: 0.5rem; /* Space between items */
		}

		/* General Styling */
		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1rem;
			text-align: center;
			border-radius: 8px;
			img {
				border-radius: 8px;
				object-fit: cover;
			}
		}

		.item-1 {
			grid-column: 1 / span 2; /* Span 2 columns */
			grid-row: 1 / span 2; /* Span 2 rows */
		}
		.item-2 {
			grid-column: 3 / span 2; /* Span 2 columns */
			grid-row: 1 / span 3; /* Span 3 rows */
		}

		/* Second block: 3 3 */
		.item-3 {
			grid-column: 1 / span 2;
			grid-row: 3 / span 3; /* Span 3 rows */
		}

		/* Third block: 4 4 */
		.item-4 {
			grid-column: 3 / span 2;
			grid-row: 4 / span 2;
		}

		/* Fourth block: 5 5 */
		.item-5 {
			grid-column: 1 / span 2;
			grid-row: 6 / span 2;
		}

		/* Fifth block: 6 6 */
		.item-6 {
			grid-column: 3 / span 2;
			grid-row: 6 / span 4; /* Span across rows */
		}

		/* Sixth block: 7 7 */
		.item-7 {
			grid-column: 1 / span 2;
			grid-row: 8 / span 2;
		}

	}
}
</style>
<style lang="scss">
.connect-your-desktop-btn {
	display: inline-flex;
	padding: .625rem .75rem;
	justify-content: center;
	align-items: center;
	gap: .375rem;
	border-radius: 4px;
	background: $background-9;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.16);
	color: $color-white;
	font-size: .875rem;
	font-weight: 600;
	text-decoration: none;
}
</style>
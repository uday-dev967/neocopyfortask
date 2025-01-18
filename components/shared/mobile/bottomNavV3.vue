<template>
	<div class="bottom-nav-wrapper">
		<!-- <div
			class="bottom-nav-item"
		>
			<nuxt-link :to="localePath('/dashboard_mobile/projects')" class="">
				<svg class="not-active-icon" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M19.0834 15.8333C19.0834 16.2754 18.9078 16.6993 18.5953 17.0118C18.2827 17.3244 17.8588 17.5 17.4167 17.5H4.08341C3.64139 17.5 3.21746 17.3244 2.9049 17.0118C2.59234 16.6993 2.41675 16.2754 2.41675 15.8333V4.16667C2.41675 3.72464 2.59234 3.30072 2.9049 2.98816C3.21746 2.67559 3.64139 2.5 4.08341 2.5H8.25008L9.91675 5H17.4167C17.8588 5 18.2827 5.17559 18.5953 5.48816C18.9078 5.80072 19.0834 6.22464 19.0834 6.66667V15.8333Z" stroke="#3A393A" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>

				<svg class="active-icon" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M19.0833 15.8333C19.0833 16.2754 18.9077 16.6993 18.5951 17.0118C18.2826 17.3244 17.8587 17.5 17.4166 17.5H4.08329C3.64127 17.5 3.21734 17.3244 2.90478 17.0118C2.59222 16.6993 2.41663 16.2754 2.41663 15.8333V4.16667C2.41663 3.72464 2.59222 3.30072 2.90478 2.98816C3.21734 2.67559 3.64127 2.5 4.08329 2.5H8.24996L9.91663 5H17.4166C17.8587 5 18.2826 5.17559 18.5951 5.48816C18.9077 5.80072 19.0833 6.22464 19.0833 6.66667V15.8333Z" fill="#3A393A" stroke="#3A393A" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				
				<p>{{ $t("buttonText.projects") }}</p>
			</nuxt-link>
		</div> -->
		<div
			class="bottom-nav-item"
			@click="onClickBottomNavOption('explore')"
		>
			<nuxt-link :to="localePath('/dashboard_mobile/explore')" class="">
        <svg class="not-active-icon" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4.25529 2.96288L17.4296 7.0165C18.1481 7.23759 18.2298 8.22196 17.5574 8.55817L11.9737 11.3499C11.8125 11.4306 11.6816 11.5614 11.601 11.7226L8.80935 17.306C8.47313 17.9784 7.48894 17.8969 7.26784 17.1783L3.21384 4.00405C3.0171 3.36466 3.61589 2.76614 4.25529 2.96288Z" stroke="#3A393A" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>

				<svg class="active-icon" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4.25529 2.96288L17.4296 7.0165C18.1481 7.23759 18.2298 8.22196 17.5574 8.55817L11.9737 11.3499C11.8125 11.4306 11.6816 11.5614 11.601 11.7226L8.80935 17.306C8.47313 17.9784 7.48894 17.8969 7.26784 17.1783L3.21384 4.00405C3.0171 3.36466 3.61589 2.76614 4.25529 2.96288Z" fill="#3A393A" stroke="#3A393A" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>

				<p>{{ $t("buttonText.explore") }}</p>
			</nuxt-link>
		</div>
		<div 
			class="bottom-nav-item"
			@click="onClickBottomNavOption('gallery')"
		>
			<nuxt-link :to="localePath('/dashboard_mobile/gallery')" class="">

        <svg 
					class="not-active-icon"
          width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.25004 14.1664C3.25 14.1126 3.25 14.0571 3.25 13.9998V5.99984C3.25 5.06642 3.25 4.59936 3.43166 4.24284C3.59144 3.92924 3.84623 3.67445 4.15983 3.51466C4.51635 3.33301 4.98341 3.33301 5.91683 3.33301H15.5835C16.5169 3.33301 16.9834 3.33301 17.3399 3.51466C17.6535 3.67445 17.9087 3.92924 18.0685 4.24284C18.25 4.59901 18.25 5.0655 18.25 5.9971V14.0022C18.25 14.4064 18.25 14.7229 18.2352 14.9808M3.25004 14.1664C3.25068 14.99 3.26114 15.4212 3.43166 15.7558C3.59144 16.0694 3.84623 16.3251 4.15983 16.4849C4.516 16.6663 4.98249 16.6663 5.91409 16.6663H15.5863C16.5179 16.6663 16.9837 16.6663 17.3399 16.4849C17.6535 16.3251 17.9087 16.0694 18.0685 15.7558C18.1713 15.5542 18.2158 15.3174 18.2352 14.9808M3.25004 14.1664L7.22331 9.53092L7.22449 9.52964C7.57689 9.1185 7.75338 8.9126 7.96273 8.83838C8.14662 8.77318 8.34739 8.77471 8.53035 8.84245C8.73886 8.91965 8.91255 9.1279 9.25993 9.54476L11.4859 12.2159C11.8075 12.6018 11.9692 12.7959 12.1655 12.8737C12.3387 12.9424 12.5297 12.9502 12.7084 12.8974C12.9118 12.8374 13.0909 12.6584 13.449 12.3003L13.8632 11.8861C14.2278 11.5215 14.4101 11.3393 14.6164 11.2798C14.7976 11.2275 14.9914 11.2387 15.1657 11.3107C15.3642 11.3927 15.5252 11.5933 15.8472 11.9959L18.2352 14.9808M18.2352 14.9808L18.25 14.9993M13.25 8.33301C12.7898 8.33301 12.4167 7.95991 12.4167 7.49967C12.4167 7.03944 12.7898 6.66634 13.25 6.66634C13.7102 6.66634 14.0833 7.03944 14.0833 7.49967C14.0833 7.95991 13.7102 8.33301 13.25 8.33301Z" stroke="#3A393A" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

				<svg class="active-icon" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.25004 14.1664C3.25 14.1126 3.25 14.0571 3.25 13.9998V5.99984C3.25 5.06642 3.25 4.59936 3.43166 4.24284C3.59144 3.92924 3.84623 3.67445 4.15983 3.51466C4.51635 3.33301 4.98341 3.33301 5.91683 3.33301H15.5835C16.5169 3.33301 16.9834 3.33301 17.3399 3.51466C17.6535 3.67445 17.9087 3.92924 18.0685 4.24284C18.25 4.59901 18.25 5.0655 18.25 5.9971V14.0022C18.25 14.4064 18.25 14.7229 18.2352 14.9808M3.25004 14.1664C3.25068 14.99 3.26114 15.4212 3.43166 15.7558C3.59144 16.0694 3.84623 16.3251 4.15983 16.4849C4.516 16.6663 4.9825 16.6663 5.91409 16.6663H15.5863C16.5179 16.6663 16.9837 16.6663 17.3399 16.4849C17.6535 16.3251 17.9087 16.0694 18.0685 15.7558C18.1713 15.5542 18.2158 15.3174 18.2352 14.9808M3.25004 14.1664L7.22331 9.53092L7.22449 9.52964C7.57689 9.1185 7.75338 8.9126 7.96273 8.83838C8.14662 8.77318 8.34739 8.77471 8.53035 8.84245C8.73886 8.91965 8.91255 9.1279 9.25993 9.54476L11.4859 12.2159C11.8075 12.6018 11.9692 12.7959 12.1655 12.8737C12.3387 12.9424 12.5297 12.9502 12.7084 12.8974C12.9118 12.8374 13.0909 12.6584 13.449 12.3003L13.8632 11.8861C14.2278 11.5215 14.4101 11.3393 14.6164 11.2798C14.7976 11.2275 14.9914 11.2387 15.1657 11.3107C15.3642 11.3927 15.5252 11.5933 15.8472 11.9959L18.2352 14.9808M18.2352 14.9808L18.25 14.9993M13.25 8.33301C12.7898 8.33301 12.4167 7.95991 12.4167 7.49967C12.4167 7.03944 12.7898 6.66634 13.25 6.66634C13.7102 6.66634 14.0833 7.03944 14.0833 7.49967C14.0833 7.95991 13.7102 8.33301 13.25 8.33301Z" stroke="#3A393A" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M8.25 8.5L3.25 14.5V15L4.25 16.5H15.25L17.75 16V15V14.5L14.75 11L12.25 12.5L8.25 8.5Z" fill="#3A393A"/>
				</svg>


				<p>{{ $t("buttonText.gallery") }}</p>
			</nuxt-link>
		</div>
		<div 
			class="bottom-nav-item"
		>
			<nuxt-link :to="localePath('/dashboard_mobile/link-desktop')" class="">

        <svg 
          class="not-active-icon"
          width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.5967 14C12.5967 14 12.17 16.5 14.25 18H6.25C8.38333 16.5 7.90333 14 7.90333 14" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.25 14H3.25C2.7 14 2.25 13.5519 2.25 13.0041V2.99585C2.25 2.44813 2.7 2 3.25 2H17.25C17.8 2 18.25 2.44813 18.25 2.99585V13.0041C18.25 13.5519 17.8 14 17.25 14Z" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.25 12H18.25" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

				<svg class="active-icon" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.5967 14C12.5967 14 12.17 16.5 14.25 18H6.25C8.38333 16.5 7.90333 14 7.90333 14" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M17.25 14H3.25C2.7 14 2.25 13.5519 2.25 13.0041V2.99585C2.25 2.44813 2.7 2 3.25 2H17.25C17.8 2 18.25 2.44813 18.25 2.99585V13.0041C18.25 13.5519 17.8 14 17.25 14Z" fill="#3A393A" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M3.25 12L17.25 12" stroke="#E8E8E8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>

				<p>{{ $t("buttonText.linkDesktop") }}</p>
			</nuxt-link>
		</div>
	</div>
</template>
<script>
import CommonUtilities from '../../../mixins/commonUtilitiesMixin';
export default {
	mixins: [CommonUtilities],
	methods: {
		onClickBottomNavOption(item) {
			if(item === 'explore') {
				this.sendEventToTrack("Clicked explore on mobile")
			}
			if(item === 'gallery') {
				this.sendEventToTrack("Clicked gallery on Mobile")
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.bottom-nav-wrapper {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;

	.bottom-nav-item {
		a {
			text-decoration: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
      gap: 0.25rem;
			padding: .75rem 0px;
			border-top: 1px solid $border-7;
			.not-active-icon {
				display: flex;
			}
			.active-icon {
				display: none;
			}

			&.active-link {
				
				border-top: 1px solid $border-30;
				.not-active-icon {
					display: none;
				}
				.active-icon {
					display: flex;
				}
        p {
          font-weight: 700;
        }
			}

			svg {
				width: 1.25rem;
				height: 1.25rem;

				path {
					stroke: $background-9;
				}
			}

			p {
				margin: 0rem;
				font-size: 0.75rem;
				font-style: normal;
        color: $color-light-gray-2;
        text-align: center;
        font-weight: 500;
        line-height: 138%;
			}
		}
	}
}
</style>

<template>
	<div class="mobile-top-banner">
    <div class="discount-banner-content-wrapper">
      <div class="image-wrapper iwfp">
        <img src="~assets/images/mobile/discount50.png" alt=""/>
      </div>
      <div class="banner-message">{{ $t('mobileDiscountBanner.switchToDeskTopText') }} <span>50% off!</span></div>
    </div>
    <nuxt-link class="banner-cta" :to="localePath('/dashboard_mobile/link-desktop')" @click="onOpenInDesktopClick" >
      {{ $t('mobileDiscountBanner.openInDesktop') }}
    </nuxt-link>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import CommonUtilities from "../../../mixins/commonUtilitiesMixin";
export default {
	name: "TopNavV2",
  mixins: [CommonUtilities],
	components: {},
  data: () => {
    return {
      currentRoute: ""
    }
  },
	computed: {
		...mapState({
			user: (state) => state.User.user,
		}),
	},
	methods: {
		...mapActions({
      logout: "Auth/logout",
    }),
    onOpenInDesktopClick() {
      this.sendEventToTrack("Clicked open in desktop on mobile")
    }
	},

};
</script>
<style lang="scss" scoped>
.mobile-top-banner {
  width: 100%;
  display: flex;
  border-radius: 0px 0px 12px 12px;
  background: $background-white-13;
  box-shadow: 0px -3px 0px 0px $border-1 inset;
  align-items: center;
  justify-content: space-between;
  padding: .4375rem .75rem;
  gap: 10px;
  flex-shrink: 0;
  .discount-banner-content-wrapper {
    display: flex;
    align-items: center;
    gap: .4375rem;
    .image-wrapper {
      width: 3rem;
      height: 3rem;
      flex-shrink: 0;
    }
    .banner-message {
      color: $color-light-gray-2;
      font-size: .875rem;
      font-weight: 600;
      line-height: 138%; /* 19.32px */
      letter-spacing: -0.5px;
      span {
        font-weight: 800;
      }
    }
  }
  .banner-cta {
    display: inline-flex;
    padding: .75rem .5rem;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background: $background-9;
    color: $color-second;
    font-size: .75rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
  }
  
}
</style>

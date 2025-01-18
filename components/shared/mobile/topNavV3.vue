<template>
	<div v-if="!$route.path.includes('/dashboard_mobile/explore')" class="top-nav-v3-wrapper" :class="`${currentRoute}-nav`">
			<div class="route-name">{{ routeName }}</div>
			<div v-if="currentRoute !== 'link-desktop'" class="top-nav-action-buttons-wrapper">
				<div
					
					class="account-icon"
				>
					<nuxt-link :to="localePath('/dashboard_mobile/plans')">
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
				<div v-if="false" class="top-nav-logout-button" @click.stop="signOut()">
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M18.666 19.8334L24.4993 14L18.666 8.16669" stroke="#0E0E0E" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M24.5 14H10.5" stroke="#0E0E0E" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M10.5 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H10.5" stroke="#0E0E0E" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
	
					<!-- <p @click.stop="signOut()" class="logout-text">{{ $t("buttonText.logOut") }}</p> -->
				</div>
			</div>
	</div>
	<div v-else></div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import _template from '../../../pages/moodboard/templates/_template.vue';
export default {
	name: "TopNavV2",
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
		showHomeView() {
			if (this.$route.name.indexOf("mobile-home") > -1) {
				return true;
			}

			return false;
		},
		routeName() {
			let splittedRouteName = this.$route.fullPath.split("/");
			console.log(this.$route)
			switch (splittedRouteName[splittedRouteName.length - 1]) {
				case "home": {
          this.currentRoute = "home"
					return this.$t("mobileSection.routeNames[0]");
				}
        case "projects": {
          this.currentRoute = "projects"
          return this.$t("mobileSection.routeNames[1]");
        }
				case "gallery": {
          this.currentRoute = "gallery"
					return this.$t("mobileSection.routeNames[2]");
				}
				case "explore": {
          this.currentRoute = "explore"
					return this.$t("mobileSection.routeNames[3]");
				}
				case "link-desktop": {
          this.currentRoute = "link-desktop"
					return this.$t("mobileSection.routeNames[4]");
				}
				case "plans": {
          this.currentRoute = "plans"
					return "";
				}
				default: {
					return "";
				}
			}
		},
	},
	methods: {
		...mapActions({
      logout: "Auth/logout",
    }),

		signOut() {
			this.logout().then(res => {
				window.location.href = res.url;
				this.$root.$emit("send-mobile-event",{name : 'mb_user_logout_clicked'});
			});
		},
	},
	
};
</script>
<style lang="scss" scoped>
.top-nav-v3-wrapper {
	// height: 5rem;
	width: 100%;
	background: $background-white;

	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 1rem .8125rem 1rem;

	&.not-home-view {
		background: $background-white;
		height: 3.5rem;
		box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.04);
		padding: 0.5rem 1.25rem;
	}

  &.projects-nav {
    background: $background-46;
  }
  &.gray-nav, &.plans-nav {
		background: $background-46;
	}
  &.explore-nav {
    background: $background-45;
		padding: 0px;
  }
  &.link-desktop-nav {
    padding: 1.5rem 1rem .5625rem 1rem;
  }

	

	.route-name {
		flex-grow: 1;
    color: $color-dark-gray-9;
    font-size: 1.5rem;
    font-weight: 700;
	}

	.name {
		color: $color-light-gray-2;
		font-size: 1.25rem;
		font-style: normal;
		font-weight: 600;
		line-height: 138%;
	}
	.top-nav-action-buttons-wrapper{
		display: flex;
		align-items: center;
		gap: 1.25rem;
		.account-icon {
			a {
				display: flex;
				align-items: center;
				display: flex;
				width: 2.25rem;
				height: 2.25rem;
				justify-content: center;
				align-items: center;
				flex-shrink: 0;
	
				svg {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	
		.top-nav-logout-button {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>

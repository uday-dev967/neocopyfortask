<template>
    <div class="navbar-wrapper">
        <div class="nav-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="17" viewBox="0 0 52 17" fill="none">
                <path d="M15.675 0.599218V16.6992H12.616L4.589 6.92422V16.6992H0.909V0.599218H3.991L11.995 10.3742V0.599218H15.675ZM31.9502 13.7092V16.6992H19.4842V0.599218H31.6512V3.58922H23.1872V7.08522H30.6622V9.98322H23.1872V13.7092H31.9502ZM42.6669 16.9752C40.9956 16.9752 39.4853 16.6149 38.1359 15.8942C36.8019 15.1736 35.7516 14.1846 34.9849 12.9272C34.2336 11.6546 33.8579 10.2286 33.8579 8.64922C33.8579 7.06989 34.2336 5.65155 34.9849 4.39422C35.7516 3.12155 36.8019 2.12488 38.1359 1.40422C39.4853 0.683552 40.9956 0.323218 42.6669 0.323218C44.3383 0.323218 45.8409 0.683552 47.1749 1.40422C48.5089 2.12488 49.5593 3.12155 50.3259 4.39422C51.0926 5.65155 51.4759 7.06989 51.4759 8.64922C51.4759 10.2286 51.0926 11.6546 50.3259 12.9272C49.5593 14.1846 48.5089 15.1736 47.1749 15.8942C45.8409 16.6149 44.3383 16.9752 42.6669 16.9752ZM42.6669 13.8012C43.6176 13.8012 44.4763 13.5866 45.2429 13.1572C46.0096 12.7126 46.6076 12.0992 47.0369 11.3172C47.4816 10.5352 47.7039 9.64588 47.7039 8.64922C47.7039 7.65255 47.4816 6.76322 47.0369 5.98122C46.6076 5.19922 46.0096 4.59355 45.2429 4.16422C44.4763 3.71955 43.6176 3.49722 42.6669 3.49722C41.7163 3.49722 40.8576 3.71955 40.0909 4.16422C39.3243 4.59355 38.7186 5.19922 38.2739 5.98122C37.8446 6.76322 37.6299 7.65255 37.6299 8.64922C37.6299 9.64588 37.8446 10.5352 38.2739 11.3172C38.7186 12.0992 39.3243 12.7126 40.0909 13.1572C40.8576 13.5866 41.7163 13.8012 42.6669 13.8012Z" fill="#E9BEB3"/>
            </svg>
        </div>
        <div class="nav-actions">
            <div class="switch-to-neo" @click="onSwitchToNeoButtonClick()">
                Switch To Neo
            </div>
			<div v-if="isUserOnMoodBoardFreeTrial" class="switch-to-neo" @click="onUpgradeButtonClick()">
                Upgrade
            </div>
            <div class="user-profile" @click="eventTrigger('Profile')">
                <img v-if="user"
						:src="
							user.personalInfo.dpUrl ||
							require('../../assets/images/userProfileImagePlaceholder.svg')
						"
						class="user-profile--img">
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapState({
			user: state => state.User.user,
		}),
		...mapGetters({
			isUserOnMoodBoardFreeTrial: "Billing/isUserOnMoodBoardFreeTrial",
		}),
	},
	methods: {
		...mapMutations({
			setSwitchToMoodboardAndRedirectToDashboard:
				"User/setSwitchToMoodboardAndRedirectToDashboard",
		}),
		onSwitchToNeoButtonClick() {
			this.setSwitchToMoodboardAndRedirectToDashboard(false);
			this.$router.push( this.localePath("/dashboard") );
		},
		eventTrigger(_page) {
			this.$router.push(this.localePath("/moodboard/settings/profile"));
			analytics.track(
				_page,
				{
					title: `${_page} Clicked`,
					subtitle: "Click",
				},
				{
					integrations: {
						Amplitude: { session_id: new Date().getTime() },
					},
				},
				{ timestamp: new Date().getTime() }
			);
		},
		onUpgradeButtonClick() {
			this.$router.push(this.localePath("/moodboard/settings/profile"));
		},
	},
};
</script>
<style lang="scss" scoped>
.navbar-wrapper {
	display: flex;
	width: 100vw;
	height: 3.75rem * 1.22;
	align-items: center;
	padding: 0 3% 0 2%;
	justify-content: space-between;
	background: linear-gradient(90deg, #4d4c4d 0%, #201f20 100%);
	border-bottom: 0.0625rem solid $border-4;
}
.nav-actions {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	.switch-to-neo {
		background: $color-second;
		box-shadow: 0px 0.125rem 0.125rem rgba(0, 0, 0, 0.4);
		border-radius: 0.25rem * 1.22;
		display: flex;
		align-items: center;
		padding: 0.625rem 1rem;
		text-align: center;
		font-weight: 700;
		font-size: 1rem;
		color: $background-4;
		cursor: pointer;
		margin-right: 1.5rem;
	}
	.user-profile {
		cursor: pointer;
		height: 2.25rem * 1.22;
		display: flex;
		width: 2.25rem * 1.22;
		align-items: center;
		justify-content: center;
		&--img {
			height: 100%;
			width: 100%;
			border-radius: 100%;
		}
	}
}
</style>

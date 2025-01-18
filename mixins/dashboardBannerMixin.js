import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

const DashboardBannerMixin = {
	components: {},
	data: () => ( {
        communityURL: "https://community.foyr.com?utm_source=dashboard&utm_campaign=dashboard_CTA&utm_medium=neo&type=signup",
        designChallengeURL: "https://community.foyr.com/hashtag/foyrdesignchallenge",
        bannerConstants: {
            video: 'VIDEO_TUTORIALS',
            moodboardVideos: 'MOODBOARD_VIDEO_TUTORIALS',
            moodboard: 'MOODBOARD_BANNER',
            templates: 'MOODBOARD_TEMPLATES',
            designForYou: 'GET_DESIGN_DONE'
        }
    } ),
	computed: {
        ...mapState({
            user: state => state.User.user,
            isMoodboardUser: state => state.User.isMoodboardUser,
            isTrial: state => state.Billing.isTrial,
            switchToMoodboard: state => state.User.switchToMoodboard,
        }),
        ...mapGetters("Billing", [ "showCommunityBanner" ,"hasNeoFreeTrialExpired", "doesUserHaveActiveMoodboardSubscription", "isUserAMoodboardUser" ] ),
        ...mapGetters("User", [ "getUserCategory" ] ),
        showGetDesignDoneBanner() {
            return !this.isTrial;
        },
        // bannerToShow() {
        //     // Neo FT customers - Videos, no banner
        //     // Neo Only customers - Banner with Moodboard
        //     // Neo + Moodboard customers - templates on top (in the banner section)
        //     if (this.isTrial && !this.switchToMoodboard && !this.hasNeoFreeTrialExpired) return this.bannerConstants.video;
        //     // Need to commet templates condition as it might not get integrated as of now
        //     // else if ( !this.isTrial && this.isMoodboardUser ) return this.bannerConstants.templates;
        //     else if ( (!this.isTrial && this.switchToMoodboard) || this.isMoodboardUser || this.doesUserHaveActiveMoodboardSubscription ) return this.bannerConstants.moodboardVideos;
        //     else return this.bannerConstants.moodboard;
        // },
        bannerToShow() {
            // If the User is a Moodboard user ALWAYS show thw Moodboard Videos
            if (this.switchToMoodboard) {
                if (this.isMoodboardUser || this.isUserAMoodboardUser) return this.bannerConstants.moodboardVideos;
            } 
            
            // If the User is a paid Neo user ALWAYS show the Neo Banner
            // if (!this.isTrial) return this.bannerConstants.moodboard;
            // showing design for you banner again now
            if (!this.isTrial && this.$i18n.locale === 'en') return this.bannerConstants.designForYou;
            else if (!this.isTrial && this.$i18n.locale !== 'en') return this.bannerConstants.moodboard;
            
            return this.bannerConstants.video;
        },
    },
    mounted() {},
    watch: {},
	methods: {
        handleBannerCTAClick(url, analyticsTitle) {
            window.open(url, "_blank");

            window.analytics.track(
                analyticsTitle,
                {
                    title: analyticsTitle.toUpperCase().split("_").join(" "),
                },
                {
                    integrations: {
                    Amplitude: { session_id: new Date().getTime() }
                    }
                }
            );
        },
    },
};

export default DashboardBannerMixin;

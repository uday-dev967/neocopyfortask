<template>
    <section class="referral-section-wrapper">
        <div class="referral-container progress-section">
            <h1 class="progress-header">Referral Progress</h1>
            <div class="progress-wrapper">
                <template v-if="referralsProgressList.length">
                    <div v-for="user in referralsProgressList" class="track-progress" :key="user._id">
                        <div class="track-progress-header">
                            <div v-if="user.name" class="track-progress-header-name"><span>NAME </span>{{ user.name }}</div>
                            <div class="track-progress-header-email"><span>EMAIL </span> {{ user.email }}</div>
                        </div>
                        <div class="track-progress-bar-wrapper">
                            <div class="track-progress-steps" v-for="step in stepsList" :key="step.identifier">
                                <div class="progress-svg">
                                    <div class="rewards-available"
                                        v-if="user.userTrackProgress.rewardsAvailable && step.identifier == 'rewardsAvailable' && !user.rewardCollected">
                                        <img class="gift-box" src="~/assets/images/referral/gift-box.png" alt="gift">
                                        <p class="gift-text">Reward Available</p>
                                        <button class="gift-btn" @click="collectRewards(user.refereeId)">Claim Now</button>
                                    </div>
                                    <svg v-else class="progress-svg-circle" width="35" height="35" viewBox="0 0 35 35"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="17.5" cy="17.5" r="17.5"
                                            :fill="user.userTrackProgress[step.identifier] || user.rewardCollected ? '#06C270' : 'white'"
                                            :stroke="user.userTrackProgress[step.identifier] || user.rewardCollected ? 'white' : '#FFAB40'" />
                                        <path
                                            d="M27 12.9998L15 24.9998L9.5 19.4998L10.91 18.0898L15 22.1698L25.59 11.5898L27 12.9998Z"
                                            :fill="user.userTrackProgress[step.identifier] || user.rewardCollected ? 'white' : '#FFAB40'" />
                                    </svg>
                                    <svg width="100%" height="4" v-if="step.identifier != 'rewardsAvailable'">
                                        <line pathLength="100" stroke-dasharray="8,5" stroke-width="2" x1="4%"
                                            :stroke="user.userTrackProgress[step.identifier] ? '#06C270' : '#FFAB40'" x2="90%"
                                            y1="2" y2="2" />
                                    </svg>
                                </div>
                                <div
                                    v-if="step.identifier == 'rewardsAvailable' && user.userTrackProgress.rewardsAvailable && !user.rewardCollected">
                                </div>
                                <!-- v-if="!user.userTrackProgress.rewardsAvailable && !user.rewardCollected" -->
                                <div v-else class="progress-info">
                                    <div class="progress-info-step">
                                        {{ step.name }}
                                    </div>
                                    <div v-if="step.identifier == 'rewardsAvailable' && user.rewardCollected"
                                        class="progress-info-desc">Reward Claimed
                                    </div>
                                    <div v-else class="progress-info-desc">
                                        {{ step.text }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="progress-error-message">
                        Start referring your friends to track their progress
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
    components: {
    },
    layout: "referral",
    middleware: ["initAuth", "authReq"],
    head() {
        return {
            title: "Neo - Referral",
        };
    },
    async created() {
        await this.getReferralsProgressList();
    },
    data() {
        return {
            stepsList: [
                {
                    name: "STEP 1",
                    text: "Referral Email Sent",
                    identifier: "referralEmailSent",
                },
                {
                    name: "STEP 2",
                    text: "User signed up for Free Trial",
                    identifier: "userSignedUpForFT",
                },
                {
                    name: "STEP 3",
                    text: "User Signed up for Neo",
                    identifier: "userSignedUpForNeo",
                },
                {
                    name: "STEP 4",
                    text: "Reward Available",
                    identifier: "rewardsAvailable",
                }
            ],
            // usersTrackProgress: []
        };
    },
    watch: {},
    computed: {
        ...mapGetters('Referral', ['referralsProgressList']),
    },
    methods: {
        ...mapMutations('Referral', ['setRefereeId']),
        ...mapActions('Referral', ['getReferralsProgressList']),
        collectRewards(referrerId) {
            this.$router.push('/referral/rewards');
            this.setRefereeId(referrerId)
        }
    },
};
</script>
<style lang="scss" scoped>
.referral-container {
    &.progress-section {
        max-width: 70rem * 1.22
    }
}  
.progress-header {
    align-self: flex-start;
    font-weight: 700;
    font-size: 2.5rem * 1.22;
    line-height: 120%;
    margin-bottom: 4rem * 1.22;
}

.progress-wrapper {
    display: grid;
    height: 100%;
    width: 100%;
    gap: 2rem * 1.22;

    .progress-error-message {
        width: 100%;
        font-size: 1.5rem * 1.22;
    }
}

.track-progress {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.75rem*1.22 2.5rem*1.22;
    gap: 3rem*1.22;
    background: $color-white;
    border-radius: 1rem*1.22;
    font-weight: 500;
    font-size: 1rem * 1.22;
    line-height: 1.5rem*1.22;

    &-header {
        height: 100%;
        min-width: 50%;
        display: flex;
        align-items: center;

        &-name {
            margin-right: 64px;
        }

        & span {
            font-weight: inherit;
            font-size: inherit;
            line-height: inherit;
            color: #C4C4C4;
        }
    }
}

.track-progress-bar-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
}

.track-progress-steps {
    height: 100%;
    width: 100%;
    display: grid;
    gap: 1rem;
}

.progress-svg {
    height: 100%;
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
        overflow: visible;
    }
}

.progress-info {
    &-step {
        font-weight: 500;
        margin-bottom: 0.25rem*1.22;
        font-size: .75rem * 1.22;
        line-height: 1.125rem*1.22;
        color: #C4C4C4;
    }

}

.progress-line {
    display: flex;
    height: 100%;
    align-items: center;
}

.rewards-available {
    height: 100%;
    min-width: 8.8125rem * 1.22;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateY(-20px);
}

.gift {
    &-box {
        height: 6.25rem * 1.22;
        width: 6.25rem * 1.22;
    }

    &-text {
        font-weight: 500;
        font-size: 1rem * 1.22;
        line-height: 1.5rem * 1.22;
        text-align: center;
        color: #3A393A;
    }

    &-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .625rem * 1.22 1.25rem * 1.22;
        gap: .625rem * 1.22;
        width: 8.75rem * 1.22;
        height: 3rem * 1.22;
        border: .125rem * 1.22 solid #06C270;
        border-radius: 1.9375rem * 1.22;
        font-weight: 600;
        font-size: 1.125rem * 1.22;
        line-height: 1.75rem * 1.22;
        color: #06C270;
        cursor: pointer;
    }

}
</style>

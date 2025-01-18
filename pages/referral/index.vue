<template>
    <section class="referral-container neo-referral-home-page">
        <div class="referral-info">
            <div class="referral-info-header">NEO Referral Program</div>
            <div class="referral-info-description">
                Earn rewards worth upto <b>$100</b> every time a friend of yours subscribes to Foyr Neo
            </div>
            <div class="referral-info-btn-wrapper" @click="onReferNowButtonClick">
                <button class="referral-info-btn referral-btn">
                    Refer Now
                </button>
            </div>
        </div>
        <div class="referral-img">
            <img src="~/assets/images/referral/amico.png" alt="">
        </div>
    </section>
</template>
<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

// import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
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
    watch: {},
    methods: {
        ...mapMutations('Referral',['referralPopupToggle']),
        onReferNowButtonClick() {
            this.referralPopupToggle()
            if (window.analytics) {
                window.analytics.track(
                "click_refer_now",
                {
                    name: "Click Refer now",
                    event_category: "Refferal Strategy",
                },
                {
                    integrations: {
                    Amplitude: { session_id: new Date().getTime() },
                    },
                },
                { timestamp: new Date().getTime() }
                );
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.neo-referral-home-page {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    isolation: isolate;
    width: 100vw;
    height: calc(100vh - #{$referral-header-height});
    // background: $color-white;
    order: 1;
    align-self: stretch
}

.referral-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 6.25rem * 1.22;
    width: 47%;
    height: 100%;
    // padding-right: 6.25rem * 1.22;
    // padding-top: 5.625rem * 1.22 ;
    // padding-bottom: 22.875rem * 1.22 ;

    &-header {
        font-weight: 700;
        font-size: 2.5rem * 1.22;
        line-height: 120%;
        text-align:start;
        color: $color-black;
        margin-bottom: 1.5rem * 1.22;
    }

    &-description {
        font-weight: 400;
        font-size: 1.5rem * 1.22;
        line-height: 2rem * 1.22;
        color: $color-black;
        margin-bottom: 1.5rem * 1.22;
        max-width: 88%;
    }

    &-btn-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 3rem * 1.22;
        width: 8.25rem * 1.22;
    }
}

.referral-img {
    height: 100%;
    max-width: 43.5rem * 1.22;
    padding-right: 11.375rem * 1.22;
    padding-left: 3.5rem * 1.22;
    display: flex;
    align-items: center;
    // padding: 5.625rem 11.375rem 6.9375rem 3.5rem;
    // padding-top: 5.625rem * 1.22 ;
    // padding-bottom: 6.9375rem * 1.22 ;

    img {
        width: 30.6131rem * 1.22;
        height: 30.9375rem * 1.22;
    }
}
</style>

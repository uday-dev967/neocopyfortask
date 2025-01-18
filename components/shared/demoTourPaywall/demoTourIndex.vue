<template>
    <section :style="{'transform': showPopup ? 'scale(1)': 'scale(0)'}">
        <div class="main-container">
            <div class="close-popup" @click.stop="closePopup()" v-if="isFirstPopup">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.8964 6L6 17.792" stroke="#E8E8E8" stroke-miterlimit="10" stroke-linecap="round"/>
                    <path d="M18 18L6.20703 6.10449" stroke="#E8E8E8" stroke-miterlimit="10" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="neo-bg-logo">
              <svg width="252" height="90" viewBox="0 0 252 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.04">
                  <path d="M81.772 0V88.9831H64.8317L20.3793 34.9576V88.9831H0V0H17.0677L61.3927 54.0254V0H81.772Z" fill="#0E0E0E"/>
                  <path d="M168.59 55.0424C168.59 55.2966 168.463 57.0763 168.208 60.3814H116.368C117.302 64.6186 119.51 67.9661 122.991 70.4237C126.473 72.8814 130.803 74.1102 135.983 74.1102C139.55 74.1102 142.691 73.6017 145.409 72.5847C148.211 71.4831 150.801 69.7881 153.178 67.5L163.75 78.9407C157.297 86.3136 147.871 90 135.474 90C127.747 90 120.911 88.517 114.967 85.5508C109.023 82.5 104.438 78.3051 101.211 72.9661C97.9842 67.6271 96.3709 61.5678 96.3709 54.7881C96.3709 48.0932 97.9418 42.0763 101.084 36.7373C104.31 31.3136 108.683 27.1186 114.203 24.1525C119.807 21.1017 126.048 19.5763 132.926 19.5763C139.634 19.5763 145.706 21.017 151.14 23.8983C156.575 26.7797 160.82 30.9322 163.877 36.3559C167.019 41.6949 168.59 47.9237 168.59 55.0424ZM133.054 34.5763C128.553 34.5763 124.775 35.8475 121.718 38.3898C118.661 40.9322 116.793 44.4068 116.113 48.8136H149.867C149.187 44.4915 147.319 41.0593 144.262 38.517C141.205 35.8898 137.469 34.5763 133.054 34.5763Z" fill="#0E0E0E"/>
                  <path d="M214.426 90C207.208 90 200.712 88.517 194.938 85.5508C189.249 82.5 184.791 78.3051 181.564 72.9661C178.337 67.6271 176.724 61.5678 176.724 54.7881C176.724 48.0085 178.337 41.9492 181.564 36.6102C184.791 31.2712 189.249 27.1186 194.938 24.1525C200.712 21.1017 207.208 19.5763 214.426 19.5763C221.643 19.5763 228.097 21.1017 233.786 24.1525C239.475 27.1186 243.933 31.2712 247.16 36.6102C250.387 41.9492 252 48.0085 252 54.7881C252 61.5678 250.387 67.6271 247.16 72.9661C243.933 78.3051 239.475 82.5 233.786 85.5508C228.097 88.517 221.643 90 214.426 90ZM214.426 73.7288C219.52 73.7288 223.681 72.0339 226.908 68.6441C230.22 65.1695 231.875 60.5508 231.875 54.7881C231.875 49.0254 230.22 44.4492 226.908 41.0593C223.681 37.5848 219.52 35.8475 214.426 35.8475C209.331 35.8475 205.128 37.5848 201.816 41.0593C198.504 44.4492 196.848 49.0254 196.848 54.7881C196.848 60.5508 198.504 65.1695 201.816 68.6441C205.128 72.0339 209.331 73.7288 214.426 73.7288Z" fill="#0E0E0E"/>
                </g>
              </svg>
            </div>
            <div class="paywall-decoration">
                <img src="~assets/images/demotourpaywalldecoration.svg" alt />
            </div>
            <div class="body">
                <div class="image-container">
                  <img v-if="isFirstPopup" src="~assets/images/demotourpaywall1.svg" alt />
                  <img v-else class="no-text-image" src="~assets/images/demotourpaywall2.svg" alt />
                </div>
                <div class="info-container">
                  <div class="heading-container">
                    <p>Want to learn how to use Neo like a Pro? Take a 1:1 Neo Masterclass - Free!</p>
                  </div>
                  <div class="points-container">
                    <p class="pointer-sub-head">In this 45 min online Masterclass you'll learn:</p>
                    <ul>
                      <li>Top hacks to design 10x faster in Neo</li>
                      <li>How to master the art of photorealistic renders</li>
                      <li>How to customise and create your own products</li>
                      <li>How you can use Neo to uplift your business</li>
                      <li><span class="bold-text">Bonus -</span> Get all your Neo related questions answered </li>
                    </ul>
                  </div>
                  <div class="buy-now-cta">
                    <button @click.stop="onBookNowClick">Book Now</button>
                  </div>
                </div>
            </div>
            <div class="dont-show-cta" v-if="!isFirstPopup">
              <p @click.stop="onDontShowClick">Don’t show again</p>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data() {
        return {
            showPopup: false,
            isFirstPopup: true,
        };
    },
    mounted() {},
    computed: {
        ...mapState({
            currentBilling: (state) => state.Billing.currentSubscription,
            showDemoTourPaywall: (state) =>
                state.Subscriptions.showDemoTourPaywall,
            fetchAccountInfo: (state) => state.Subscriptions.fetchAccountInfo,
        }),
    },
    methods: {
        ...mapActions({
            getTheTourStatus: "Subscriptions/getTheTourStatus",
            updateTheTourStatus: "Subscriptions/updateTourStatus",
        }),
        ...mapMutations({
            changeShowDemoTourPaywall:
                "Subscriptions/changeShowDemoTourPaywall",
        }),
        closePopup() {
            this.showPopup = false;
            this.changeShowDemoTourPaywall(false);
            const eventTitle = this.isFirstPopup
                ? "Demo1st_popup_closed"
                : "Demo2nd_popup_closed";
            if (window.analytics) {
                window.analytics.track(
                    eventTitle,
                    { title: eventTitle },
                    {
                        integrations: {
                            Amplitude: { session_id: new Date().getTime() },
                        },
                    },
                    { timestamp: new Date().getTime() }
                );
            }
        },
        onBookNowClick() {
            const eventTitle = this.isFirstPopup
                ? "Demo1st_book_clicked"
                : "Demo2nd_book_clicked";
            if (window.analytics) {
                window.analytics.track(
                    eventTitle,
                    { title: eventTitle },
                    {
                        integrations: {
                            Amplitude: { session_id: new Date().getTime() },
                        },
                    },
                    { timestamp: new Date().getTime() }
                );
            }
            // window.open(
            //     `https://calendly.com/csm-team-5/neo-training?utm_source=popup&month=2021-${
            //         new Date().getMonth().toString().length < 2 ? "0" : ""
            //     }${new Date().getUTCMonth()}`,
            //     "_blank"
            // );
            window.open(
                "https://calendly.com/csm-team-5/neo-training?utm_source=popup&month=2021-04",
                "_blank"
            );
            this.showPopup = false;
            this.changeShowDemoTourPaywall(false);
        },
        onDontShowClick() {
            if (window.analytics) {
                window.analytics.track(
                    "Demo2nd_dontshowagain",
                    { title: "Demo2nd_dontshowagain" },
                    {
                        integrations: {
                            Amplitude: { session_id: new Date().getTime() },
                        },
                    },
                    { timestamp: new Date().getTime() }
                );
            }
            this.showPopup = false;
            this.changeShowDemoTourPaywall(false);
            this.updateTheTourStatus({ demopopup_dont_show_again: true });
        },
    },
    watch: {
        showDemoTourPaywall: function (val) {
            if (val) {
                if (this.fetchAccountInfo["demoTourPopupFirstTriggeredOn"]) {
                    var savedDate = new Date(
                        new Date(
                            this.fetchAccountInfo[
                                "demoTourPopupFirstTriggeredOn"
                            ]
                        ).getFullYear(),
                        new Date(
                            this.fetchAccountInfo[
                                "demoTourPopupFirstTriggeredOn"
                            ]
                        ).getMonth(),
                        new Date(
                            this.fetchAccountInfo[
                                "demoTourPopupFirstTriggeredOn"
                            ]
                        ).getDate() + 3
                    ).getDate();
                    var currentDate = new Date().getDate();
                    if (savedDate == currentDate) {
                        this.showPopup = true;
                        this.isFirstPopup = false;
                        this.updateTheTourStatus({
                            demoTourPopupFirstTriggeredOn: new Date(),
                        });
                    } else {
                        this.showPopup = false;
                    }
                } else {
                    this.showPopup = true;
                    this.updateTheTourStatus({
                        demoTourPopupFirstTriggeredOn: new Date(),
                    });
                }
            }
        },
    },
};
</script>
<style lang="scss" scoped>
section {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: #000000a3;
    display: grid;
    place-content: center;
    z-index: 1001;
    transform: scale(0);
    transition: all 0.5s ease-in-out;
    .main-container {
        // width: 64rem;
        // height: 37.25rem;
        height: 85vh;
        width: 72vw;
        background: linear-gradient(180deg, #ffffff 0%, #fbf3f1 100%);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        position: relative;
        box-sizing: border-box;
        background-repeat: no-repeat;
        border-top: 0.3125rem solid #ffab40;
        .close-popup {
            position: absolute;
            top: 0px;
            left: 106%;
            display: grid;
            width: 2rem;
            height: 2rem;
            background-color: #0e0e0e;
            place-content: center;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0.6;
            &:hover {
                opacity: 1;
            }
        }
        .neo-bg-logo {
            position: absolute;
            bottom: -0.375rem;
            svg {
                width: 15.75rem;
                height: 5.625rem;
            }
        }
        .paywall-decoration {
            position: absolute;
            right: -3.7rem;
            top: -3.4rem;
        }
    }
    .body {
        display: grid;
        grid-template-columns: 55% 45%;
        align-items: center;
        height: 100%;
        // padding: 0 4.25rem 0 3.5625rem;
        box-sizing: border-box;
        .image-container {
            // height: 20.25rem;
            // width: 24.5rem;
            display: flex;
            place-content: center;
            place-items: center;
            img {
                // width: 100%;
                height: 29rem;
            }
            .no-text-image {
                height: 24rem !important;
            }
        }
        .info-container {
            display: grid;
            padding-right: 4rem;
            // grid-row-gap: 36px;
            grid-template-rows: 1fr 2.5fr 0.2fr;
            .heading-container {
                display: flex;
                align-items: center;
                p {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #222021;
                }
            }
            .points-container {
                margin-top: 1.25rem;
                .pointer-sub-head {
                    margin: 0;
                    font-weight: 700;
                    font-size: 1.125rem;
                    line-height: 1.0625rem;
                    color: #222021;
                }
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    margin-top: 2rem;
                    li {
                        font-weight: 500;
                        font-size: 1.125rem;
                        color: #222021;
                        padding-left: 0.4375rem;
                        text-indent: -0.7em;
                        margin-bottom: 1.875rem;
                        &:before {
                            content: "• ";
                            font-size: 1rem;
                            color: #f6900c;
                            font-weight: 900;
                        }
                        &:nth-last-child(1) {
                            margin-bottom: 0;
                            &:before {
                                content: "";
                                padding-left: 0.625rem;
                            }
                        }
                    }
                    .bold-text {
                        font-weight: 800;
                        font-size: 1.125rem;
                    }
                }
            }
            .buy-now-cta {
                margin-top: 2.8125rem;
                button {
                    height: 2.6rem;
                    width: 26.5rem;
                    background: #222021;
                    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
                    font-weight: 800;
                    font-size: 1rem;
                    line-height: 1.1875rem;
                    text-align: center;
                    color: #fbf3f1;
                    cursor: pointer;
                }
            }
        }
    }
    .dont-show-cta {
        position: absolute;
        right: 13.5%;
        bottom: 10%;
        p {
            margin: 0;
            font-weight: 600;
            font-size: 0.7rem;
            color: #3a393a;
            border-bottom: 2px solid #3a393a;
            cursor: pointer;
        }
    }
}
</style>
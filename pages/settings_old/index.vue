<template>
    <section style="background:white">
        <demoTourTypeForm />
        <div class="setting-head">
            <div class="setting-left">
                <h2>My Account</h2>
                <div class="nav-tabs">
                    <nuxt-link to="/settings/plans_new">Plans</nuxt-link>
                    <nuxt-link  to="/settings/plans">Billing</nuxt-link>
                    <nuxt-link to="/settings/profile">Profile</nuxt-link>
                    <!-- <nuxt-link to="/settings/account">Account Settings</nuxt-link> -->
                    <!-- <nuxt-link v-if="user && user.accountType == 'root'" to="/settings/test">Service Test</nuxt-link> -->
                    <!-- <nuxt-link v-if="user && user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR'" to="/settings/subscriptions">Plans & Add-ons -->
                    <!-- <Span v-if="mySubscription && mySubscription[0]">( {{getDays(mySubscription[0].subscriptionExpiryDate) }} Days Left)</Span> -->
                    <!-- </nuxt-link> -->
                    <!-- <nuxt-link  to="/settings/billing">Usage & Payments</nuxt-link> -->
                </div>
            </div>
            <div class="setting-right">
                <p class="plans-text" v-if="$route.params.type=='plans_new'">Plans that are crafted to your design needs</p>
                <button v-if="$route.params.type=='profile'" v-on:click="update()">Save Changes</button>
            </div>
        </div>
        <MessageComponent :changeRight="message"/>
        <thankyouComponent/>
        <nuxt-child :packages="packages" :services="services" :user="user" :mySubscription="mySubscription"  :users="users" :invited="invited" :addon="addon" />
    </section>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
// import DemoTourPaywall from "../../components/shared/demoTourPaywall/demoTourIndex.vue";
import demoTourTypeForm from "../../components/shared/demoTourPaywall/demoTourTypeForm.vue";
import thankyouComponent from "@/components/shared/popups/thankyou";
import Vue from "vue";
import MessageComponent from "@/components/shared/globalMessage";
export default {
    components: {
        MessageComponent,
        demoTourTypeForm,
        thankyouComponent,
    },
    layout: "dashboard",
    middleware: ["initAuth", "authReq"],
    head() {
        return {
            title: "Neo - Dashboard",
        };
    },
    data() {
        return {
            message: {
                value: "",
                error: false,
                global: false,
            },
            paymentStatus: false,
        };
    },
    watch: {
        user: function (data) {
            if (data) {
                const { accountId } = data;
                if (data.accountInfo.accountCategory == "REGULAR") {
                    this.fetchSubscriptions({ accountId });
                    this.getServices({ accountId });
                }

                this.fetchMySubscriptions({ accountId });
                if (!this.currentSubscription)
                    this.fetchCurrentSubscription({ accountId });
                this.requestUsers({ accountId });
                if (!this.user.billingAddress)
                    this.user.billingAddress = {
                        street: "",
                        country: "",
                        city: "",
                        pincode: "",
                    };
            }
        },
    },
    computed: {
        ...mapState({
            user: (state) => state.User.user,
            packages: (state) => state.Subscriptions.packages,
            addon: (state) => state.Subscriptions.addon,
            mySubscription: (state) => state.Subscriptions.mySubscription,
            services: (state) => state.Subscriptions.services,
            users: (state) => state.User.Users,
            currentSubscription: (state) => state.Billing.currentSubscription,
            invited: (state) => state.User.invited,
        }),
    },
    mounted() {
        setTimeout(() => {
            this.getPublicConfiguration()
            this.getTheTourStatus().then((response) => {});
        }, 5000);
        this.$root.$on("bill-update-request", (_status) => {
            // console.log('Event Reached Bill Update Request')
            this.paymentStatus = _status.payment ? _status.payment : false;
        });
        this.$root.$on("payment-popup-close", (_data) => {
            if (this.paymentStatus) {
                if (_data.type && _data.type === "addon")
                    this.$root.$emit("addon-payment-update", true);
                else this.$root.$emit("waiting-for-payment-update", true);
                setTimeout(
                    () => {
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
                        this.$root.$emit("waiting-for-payment-update", false);
                        this.$root.$emit("addon-payment-update", false);
                        // this.$root.$emit('fetchlatestplandetails')
                    },
                    _data && _data.waitingTime ? _data.waitingTime : 12000
                );
                // this.fetchInitialData();
            }
        });
        this.fetchInitialData();
        if (window.analytics) {
            window.analytics.track(
                "Setting",
                {
                    title: "Setting Page",
                    subtitle: "open",
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
    methods: {
        ...mapActions({
            // getUser: 'User/fetch',
            fetchSubscriptions: "Subscriptions/fetchAll",
            fetchMySubscriptions: "Subscriptions/fetchMySubscriptions",
            getServices: "Subscriptions/services",
            updateUser: "User/update",
            updateAccount: "User/updateAccount",
            fetchCurrentSubscription: "Billing/fetchCurrentSub",
            requestUsers: "User/requestUsers",
            requestTeamUsage: "User/requestTeamUsage",
            getTheTourStatus: "Subscriptions/getTheTourStatus",
            getPublicConfiguration: 'Subscriptions/getPublicConfiguration'
        }),
        getDays: function (date) {
            const oneDay = 24 * 60 * 60 * 1000;
            const firstDate = new Date(date);
            const secondDate = new Date();
            return Math.round(
                Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
            );
        },
        update: function () {
            const {
                fullName,
                companyName,
                billingAddress,
                language,
            } = this.user;
            this.updateUser({ fullName }).then((res) => {
                if (res.error) {
                    this.message.error = true;
                } else {
                    this.message.error = false;
                    this.message.value = res.message;
                    if (res.message == "")
                        this.message.value = "Accounts details updated";
                    this.message.global = true;
                    setTimeout(() => {
                        this.message.global = false;
                    }, 4000);
                }
            });
            if (this.user && this.user.accountType == "root")
                this.updateAccount({
                    companyName,
                    billingAddress,
                    language,
                }).then((res) => {
                    if (res && res.error) {
                        this.message.error = true;
                    } else {
                        // this.message.error = false;
                        // this.message.value=res.message;
                        // if(res.message == "")
                        //     this.message.value = "Account details updated"
                        // this.message.global = true;
                        // setTimeout(() => {
                        //     this.message.global = false;
                        // }, 4000);
                    }
                });
        },
        fetchInitialData() {
            if (this.user) {
                if (this.user) {
                    const { accountId } = this.user;
                    if (this.user.accountInfo.accountCategory == "REGULAR") {
                        this.fetchSubscriptions({ accountId });
                        this.getServices({ accountId });
                    }
                    this.fetchMySubscriptions({ accountId });
                    if (!this.currentSubscription)
                        this.fetchCurrentSubscription({ accountId });
                    this.requestUsers({ accountId });
                    if (!this.user.billingAddress)
                        this.user.billingAddress = {
                            street: "",
                            country: "",
                            city: "",
                            pincode: "",
                        };
                }
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.setting-head {
    // background: #E9E9E9;
    background: #faf0ec;
    padding: 1.5625rem 3.125rem 0.4375rem 3.125rem;
    position: relative;
    // z-index: 1;
    .setting-right {
        position: absolute;
        right: 7%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        .plans-text {
            font-weight: 500;
            font-size: 1.3rem;
            width: 17rem;
            line-height: 2.0625rem;
            color: #505050;
            text-align: right;
        }
        button {
            @include button-head(#222021);
            color: #222021;
            margin: 0rem;
            cursor: pointer;
            @include background-animate(#e9beb3, black);
        }
    }
    .setting-left {
        h2 {
            margin-bottom: 2.8125rem;
        }
    }
    .nav-tabs {
        display: flex;
        .active-link {
            border-bottom: 0.0625rem solid $color-head;
            color: black;
        }
        a {
            text-decoration: none;
            color: #868686;
            margin: 0rem;
            margin-right: 2.8125rem;
            padding-bottom: 0.4375rem;
            position: relative;
            span {
                position: absolute;
                left: 105%;
                color: $color-head;
                top: 0.25rem;
                width: max-content;
            }
        }
    }
}
.setting-details-container {
    padding: 1.5625rem 3.125rem;
    background: #fbf3f1;
    .profile-image {
        height: 8.25rem;
        width: 8.25rem;
        background: white;
        border-radius: 50%;
        position: relative;
        margin-bottom: 3.125rem;
        img {
            position: absolute;
            right: -0.625rem;
            bottom: 0rem;
        }
    }
    .profile-form {
        padding: 0.9375rem 1.5625rem;
        border: 0.0625rem solid #fff;
        width: max-content;
        margin-bottom: 0.9375rem;
        p {
            margin-bottom: 0.3125rem;
        }
        input {
            background: white;
            margin-bottom: 1.5625rem;
            width: 21.875rem;
        }
        select {
            background: white;
            width: 100%;
        }
    }
}
</style>

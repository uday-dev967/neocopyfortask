<template>
    <!-- <section style="display:none" class="typeform-component" v-if="typeformConfiguration.showTypeform "> -->
    <section style="display:none" class="typeform-component">
        <span style="display:none"  v-html="rendertypeform"></span>
    </section>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'
export default {  
    name:"DemoTourTypeForm",
    props: {
        typeformcategory: {
            type: String,
            default: "demoTour"
        },
    },
    data() {
        return {
            typeformLoadedState: false
        }
    },
    computed: {
        ...mapGetters("User", ["isUserSpanish", "isUserJapanese"]),
       ...mapState({
            fetchAccountInfo: state => state.Subscriptions.fetchAccountInfo,
            publicConfiguration: state => state.Subscriptions.publicConfiguration,
            user: state => state.User.user,
            currentSubscription: state => state.Billing.currentSubscription,
        }),
    },
    watch: {    

        publicConfiguration: function(val){
            setTimeout(()=>{
                console.log("publicConfiguration-setTimeout") 
                this.rendertypeform()
            }, 5000)
        },
        fetchAccountInfo: function(val){
            setTimeout(()=>{
                console.log("fetchAccountInfoWatch-setTimeout") 
                this.rendertypeform()
            }, 5000)
        },
    },

    methods: {
        ...mapActions({
        updateTheTourStatus: 'Subscriptions/updateTourStatus',
        
        }),
        rendertypeform: function() {

                // check if typeform is already shown
                let isTypeformShown = false 
                if(this.fetchAccountInfo.typeform && 
                    this.fetchAccountInfo.typeform.demoTour && 
                    this.fetchAccountInfo.typeform.demoTour.typeformShown ){
                        isTypeformShown = true
                    }


                if(!this.typeformLoadedState &&
                    this.user && 
                    this.publicConfiguration &&
                    this.fetchAccountInfo && 
                    this.user.accountExtraInfo  &&
                    this.currentSubscription && 
                    ["Interior Designer","Kitchen & Bath Designer","Home Stager","Architect","Contractor"].includes(this.user.accountExtraInfo.userCategory) &&
                    this.user.ipInfo && 
                    ( this.user.ipInfo.country != "IN" && !this.isUserSpanish && !this.isUserJapanese ) &&
                    this.fetchAccountInfo.subscription_bought_successful && 
                    this.publicConfiguration.typeform && 
                    this.publicConfiguration.typeform.demoTour.showTypeform &&
                    this.currentSubscription.name &&
                    !this.currentSubscription.name.toLowerCase().includes("free trial") && 
                    !isTypeformShown){
                        console.log("currentSubscription", this.currentSubscription.name)
                        this.typeformLoadedState = true
                        // setTimeout(() => {this.typeformLoadedState = false}, 10000);
                        createPopup( 'zuZwomWI', //this.typeformConfiguration.formId, 
                                {
                                    open: 'time',
                                    openValue: '1', //this.typeformConfiguration.appearAfterMillSec,
                                    autoClose: true, 
                                    size: 100,
                                    hidden: {   email: this.fetchAccountInfo.email, 
                                                typeformcategory: this.typeformcategory,
                                                accountid:this.fetchAccountInfo.accountId,
                                                currentplan:this.currentSubscription.name,
                                                name:this.user.fullName },
                                    onReady: ()  => {
                                            // document.querySelector(".typeform-close").setAttribute("style", "display:none")
                                            var els = document.querySelectorAll('.typeform-close, .tf-v1-close');
                                            for (var i=0; i < els.length; i++) {
                                                els[i].setAttribute("style", "display:none");
                                            }
                                            window.analytics.track(
                                                "demoTour_Typeform_Open",
                                                { title: "demoTour_Typeform_Open" },
                                                {
                                                    integrations: {
                                                        Amplitude: { session_id: new Date().getTime() },
                                                    },
                                                },
                                                { timestamp: new Date().getTime() }
                                            );
                                            console.log("typeform is readed")
                                        },
                                    onSubmit: (data) => {
                                                            console.log("form is submitted", data.responseId)
                                                            this.updateTheTourStatus({ "typeform.demoTour.typeformShown": true, "typeform.demoTour.createdAt": new Date() });
                                                            // window.open(window.location.origin)
                                                            this.$router.push({path:'/dashboard'});
                                                        },
                                    onClose: () => {console.log("typeform is closed")}
                                })
                }
                    
        }
    }
};
</script>

<style lang="scss" scoped>
.typeform-component{
    z-index: 1342323;
}

</style>

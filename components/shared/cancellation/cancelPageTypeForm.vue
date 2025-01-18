<template>
    <section style="display:none" class="typeform-component" v-if="typeformConfiguration.showTypeform ">
        <span style="display:none"  v-html="typeformHTML"></span>
    </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'
export default {  
  name:"cancelPageTypeForm.vue",
  props: {
    typeformConfiguration: {
      type: Object
    },
    typeformcategory: {
        type: String,
        default: "cancelPage"
    },
     fetchAccountInfo: {
        type:Object
    },
    currentSubscription: {
        type:Object
    }
  },
  data() {
    return {
        typeformLoadedState: false
    }
  },
  computed: {
       
        typeformHTML: 
            function() {

                if(!this.typeformLoadedState){
                    this.typeformLoadedState = true
                    setTimeout(() => {this.typeformLoadedState = false}, 2000);
                    createPopup(this.typeformConfiguration.formId, 
                            {
                                open: 'time',
                                openValue: this.typeformConfiguration.appearAfterMillSec,
                                autoClose: true, 
                                size: 100,
                                hidden: { email: this.fetchAccountInfo.email, 
                                          typeformcategory: this.typeformcategory,
                                          accountid:this.fetchAccountInfo.accountId,
                                          currentplan:this.currentSubscription.name },
                                onReady: ()  => {
                                        window.analytics.track(
                                            "CancelPage_Typeform_Open",
                                            { title: "CancelPage_Typeform_Open" },
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
                                                        console.log("formId:",this.typeformConfiguration.formId, "form is submitted", data.responseId)
                                                        // console.log("this.currentSubscription", this.currentSubscription)
                                                        this.cancelsubscriptionbytypeform({
                                                            formId:this.typeformConfiguration.formId,
                                                            responseId: data.responseId,
                                                            subscriptionId: this.currentSubscription.subscription
                                                        })
                                                        window.location.href = window.location.origin + "/dashboard"
                                                        // window.open(window.location.origin)
                                                        // this.$router.push({path:'/dashboard'});
                                                      },
                                onClose: () => {console.log("typeform is closed")}
                            })
                }
            }
  },
  watch: {    
  },

methods: {
        ...mapActions({
        cancelsubscriptionbytypeform: 'Subscriptions/cancelsubscriptionbytypeform',
        }),
    }
};
</script>

<style lang="scss" scoped>
.typeform-component{
    z-index: 1342323;
}
// a.typeform-close {
//     display: none;
// }

</style>

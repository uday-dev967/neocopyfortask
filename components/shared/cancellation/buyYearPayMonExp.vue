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
    },
    userName :{
        type : String,
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
                       console.log("Username is ",this.userName);
                       console.log("email is  ",this.fetchAccountInfo.email)
                    createPopup(this.typeformConfiguration.formId, 
                            {
                                open: 'time',
                                openValue: this.typeformConfiguration.appearAfterMillSec,
                                autoClose: true, 
                                size: 100,
                                hidden: { email: this.fetchAccountInfo.email, 
                                          typeformcategory: this.typeformcategory,
                                          accountid:this.fetchAccountInfo.accountId,
                                          currentplan:this.currentSubscription.name ,
                                          name: this.userName },
                                onReady: ()  => {
                                   
                                        window.analytics.track(
                                            "CancelPage_Typeform_buyYearPayMonExp",
                                            { title: "CancelPage_Typeform_buyYearPayMonExp" },
                                            {
                                                integrations: {
                                                    Amplitude: { session_id: new Date().getTime() },
                                                },
                                            },
                                            { timestamp: new Date().getTime() }
                                        );
                                        console.log("typeform is readed")
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

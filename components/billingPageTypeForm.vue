<template>
    <section style="display:none" class="typeform-component" v-if="
                    publicConfiguration && 
                    publicConfiguration.typeform && 
                    publicConfiguration.typeform.bilingPage && 
                    publicConfiguration.typeform.bilingPage.showTypeform 
                    ">
        <span style="display:none"  v-html="bilingPageHTML"></span>
    </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { createPopup } from '@typeform/embed'
import '@typeform/embed/build/css/popup.css'
export default {  
  name:"billingPageTypeForm",
  props: {
    publicConfiguration: {
      type: Object
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
          popupLoaded:false
      }
  },
  computed: {
         ...mapState({
      isTypeformLoaded: state => state.Subscriptions.isTypeformLoaded,
      }),

        bilingPageHTML: function() {
        if(this.publicConfiguration && 
            this.publicConfiguration.typeform  && 
            this.fetchAccountInfo && 
            this.fetchAccountInfo.accountId &&
            this.currentSubscription && 
            this.currentSubscription.analyticsData && 
            !["free trial", "Trial expired"].includes(this.currentSubscription.analyticsData.analyticsStatus) && 
            !this.isTypeformLoaded
            ){
            console.log("isTypeformLoaded", this.isTypeformLoaded)
            let finalString = ""
            if (this.publicConfiguration.typeform.bilingPage.formId){
             
                let isTypeformShown = this.fetchAccountInfo && 
                                      this.fetchAccountInfo.typeform && 
                                      this.fetchAccountInfo.typeform.bilingPage && 
                                      this.fetchAccountInfo.typeform.bilingPage.typeformShown && 
                                      this.fetchAccountInfo.typeform.bilingPage.formId == this.publicConfiguration.typeform.bilingPage.formId
                                     ? true : false

                if(this.publicConfiguration.typeform.bilingPage.showTypeform && !isTypeformShown && !this.popupLoaded){
                    this.popupLoaded  = true
                    // launch typeform after defined time
                    this.setTypeformLoadedState(true)
                    console.log("setTypeformLoadedState")
                    createPopup(this.publicConfiguration.typeform.bilingPage.formId, 
                                {
                                    open: 'time',
                                    openValue: this.publicConfiguration.typeform.bilingPage.appearAfterMillSec,
                                    autoClose: true, 
                                    hidden: { email: this.fetchAccountInfo.email, typeformcategory: "bilingPage",accountid:this.fetchAccountInfo.accountId },
                                    onReady: ()  => {
                                        // document.querySelector(".typeform-close").setAttribute("style", "display:none")
                                        var els = document.querySelectorAll('.typeform-close, .tf-v1-close');
                                            for (var i=0; i < els.length; i++) {
                                                els[i].setAttribute("style", "display:none");
                                            }
                                        },
                                    onSubmit: (data) => {console.log('forms submitted with id:', data.responseId)}
                                })
                    
                    // return html of typeform
                    return finalString
                }
                
            }
            
        }
        return ""
    }
  },
  watch: {
      
  },
  methods: {
      ...mapActions({
        setTypeformLoadedState: 'Subscriptions/setTypeformLoadedState'     
      })

  },
};
</script>

<style lang="scss" scoped>
.typeform-component{
    z-index: 1342323;
}
a.typeform-close {
    display: none;
}

</style>

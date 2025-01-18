<template>
  <div class="main-loading">
    <div class="loading-container" v-if="!error">
      <p>You will soon be redirected to payment page..Please wait.</p>
      <div class="loader"></div>
    </div>
    <div class="loading-container" v-else>
      <p style="color: red">{{error}}</p>
      <a class="takemetohome" href="/dashboard">Home</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  middleware: ["initAuth", "authReq"],
  data() {
    return {
      error: ''
    }
  },
  mounted() {
    window.sessionStorage.setItem('urlQueryParams', JSON.stringify(window.$nuxt.$route.query))
    if(window && window.$nuxt.$route && window.$nuxt.$route.query)
    this.premiumPaymentLink(window.$nuxt.$route.query).then((apiResponse)=> {
      console.log('Response ', apiResponse);
      if(apiResponse && apiResponse.hostedPage && apiResponse.hostedPage.url){
        window.sessionStorage.removeItem('urlQueryParams')
        window.location.href = apiResponse.hostedPage.url;
      }
    }).catch((apiError)=> {
      console.log('errorrrrrrrrrrrr', apiError)
      this.error = apiError.error
    })
    // window.sessionStorage.setItem('urlQueryParams', window.$nuxt.$route.query)
  },
  methods: {
    ...mapActions({
      premiumPaymentLink: "Subscriptions/premiumPaymentLink",
    }),
  },
};
</script>

<style>
  .takemetohome {
    display: grid;
    place-items: center;
  }
</style>
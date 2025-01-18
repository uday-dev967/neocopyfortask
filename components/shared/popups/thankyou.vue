<template>
  <div class="thankyou-container popup-div" :class="{'showPopUp': isThankyou }">
    <div class="popup-container">
      <div class="top-container">
        <img src="~assets/images/cancelsub/thankyou.png" alt="" srcset="">
        <h1>{{ $t("suggestionText.thankYou") }}</h1>
        <p>{{ $t("suggestionText.thankYouMessage") }}</p>
      </div>
      <div class="bottom-container">
        <button @click="closeThankyou()">{{ $t("buttonText.gotIt") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
    },
    data() {
      return {
        isThankyou: false
      }
    },
    mounted() {
      this.$root.$on("open-thank-you-popup", (data)=> {
        this.isThankyou = data;
      });
    },
    methods: {
      closeThankyou(){
        this.$root.$emit('open-thank-you-popup', false)
      }
    },
  }
</script>

<style lang="scss" scoped>
.thankyou-container{
  .popup-container {
    padding: 0 !important;
    height: 80vh;
    width: 68vw;
    max-height: 85vh !important;
    border-top: 0.2rem outset #ffab40 !important;
    background: white !important;
    display: grid;
    grid-template-rows: 75% 1fr;
    .top-container {
      display: grid;
      place-content: center;
      place-items: center;
      background: #FBF3F1;
      h1, p {
        color: #292929;
        padding-bottom: 1rem;
        font-family: 'Montserrat';
      }
      h1 {
        font-size: 1.8rem;
      }
      p {
        font-size: 1.2rem;
        font-weight: 500;
      }
      img {
        width: 22rem;
        justify-self: center;
        align-self: center;
        padding-bottom: 1rem;
      }
    }
    .bottom-container {
      background: #222021;
      display: grid;
      place-content: center;
      button {
        cursor: pointer;
        padding: 1rem 12rem;
        background:white;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        font-weight: bold;
        font-family: 'Montserrat';
      }
    }
  }
}
</style>

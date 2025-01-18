<template>
  <section class="twoD-main-container">
    <p class="main-heading">
      <span>{{ $t("dashboard.twoDToThreeDMainHeading[0]") }}</span>
      <span>{{ $t("dashboard.twoDToThreeDMainHeading[1]") }}</span>
      <span>{{ $t("dashboard.twoDToThreeDMainHeading[0]") }}</span>
      <!-- <span> </span> -->
     </p>
    <img src="~assets/images/mobile/home/2dto3d.gif" alt="Neo Walkthrough">
    <!-- <p class="sub-heading">Lorem ipsum dolor, sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, voluptas?</p> -->
    <button class="mobile-basic-btn" @click="tryDesktopClicked()">{{ $t("buttonText.tryOnDesktop") }}</button>
    <loginViaDesktopComponent :desktopAlert="desktopAlert"/>
  </section>    
</template>
<script>
import iframeMTComponent from '@/components/shared/mobile/iframeMT';
import loginViaDesktopComponent from '@/components/shared/mobile/loginViaDesktop';
import {mapActions, mapState} from 'vuex';
export default {
  components: {
    iframeMTComponent,
    loginViaDesktopComponent
  },
  data() {
    return {
      openTour: false,
      desktopAlert: false,
    }
  },
  methods: {
    tryDesktopClicked(){
      this.desktopAlert = true
      this.$root.$emit("send-mobile-event",{name : 'mb_try_desktop_clicked'});
    }
  },
}
</script>
<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Maven+Pro:wght@900&display=swap');
  .twoD-main-container {
    background: #FDFBFD;
    padding: 1rem 2rem;
    display: grid;
    .sub-heading {
      font-family: 'Ubuntu';
      font-style: normal;
      font-weight: 500;
      font-size: 1.85rem;
      line-height: 3rem;
      text-align: center;
      color: #222122;
      margin: 1rem 0;
    }
    .main-heading {
      text-align: center;
      span {
        &::after {
          content:'\A' !important;
          white-space: pre !important; 
        }
        font-family: 'Maven Pro';
        font-style: normal;
        font-weight: 900;
        // padding: 2rem;
        font-size: 3.5rem;
        line-height: 4rem;
        text-align: center;
        color: #0E0E0E;
      }
    }
    img {
      width: 100%;
      border-radius: 0.5rem;
      border: 0.4rem solid black;
      margin-bottom: 2rem;
    }
  }

</style>
<template>
  <section class="walkthrough-section">
    <p class="sub-heading">360-{{ $t("dashboard.degreeWalkthrough") }}</p>
    <p class="main-heading">
      <!-- <span>Effectively</span>
      <span>present your </span>
      <span>vision with 3D</span>
      <span>walkthroughs</span> -->
      <span>{{ $t("dashboard.walkthroughMainHeading[0]") }}</span>
      <span>{{ $t("dashboard.walkthroughMainHeading[1]") }}</span>
      <span>{{ $t("dashboard.walkthroughMainHeading[2]") }}</span>
      <span>{{ $t("dashboard.walkthroughMainHeading[3]") }}</span>
     </p>
    <div class="image-section">
      <p class="tour-btn" @click="tourClicked()">{{ $t("buttonText.takeTheTour") }}</p>
      <img src="~assets/images/mobile/home/walkthrough.gif" alt="Neo Walkthrough">
      <!-- <img src="https://foyrocrqa.s3.ap-south-1.amazonaws.com/5f06eb550362d6223b154ec0/projects/5f3a46507454221a91fe44b2/testddd_view_0/q1KAyAR2UHMLU60CAWB87/testddd_view_0.effectsResult.jpg" alt="" srcset=""> -->
      <p class="image-text">{{ $t("dashboard.neoWalkthroughMode") }}</p>
    </div>
    <iframeMTComponent :openTour="openTour"/>
  </section>
</template>
<script>
import iframeMTComponent from '@/components/shared/mobile/iframeMT';
export default {
  components: {
    iframeMTComponent
  },
  data() {
    return {
      openTour: false,
    }
  },
  methods: {
    tourClicked(){
      this.openTour = true;
      this.$root.$emit("send-mobile-event",{name : 'mb_Tour_home_clicked'});
    }
  },
}
</script>
<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Maven+Pro:wght@900&display=swap');
  .walkthrough-section {
    background: #F5F5F7;
    padding: 1rem 2rem;
    display: grid;
    height: 85vh;
    position: relative;
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
     @include respond(phone){ // width < 900px?
      // .main-heading{
      //   width: 26rem;
      //   justify-self: center;
      // }
    }
    @include respond(s-phone){
    //   // width < 480px?
    //  .main-heading{
    //   .main-heading{
    //     width: 26rem;
    //     justify-self: center;
    //   }
    //  }
    }
    .image-section {
      position: relative;
      display: grid;
      .tour-btn {
        position: absolute;
        font-family: 'Ubuntu';
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        background: black;
        opacity: 0.7;
        font-size: 2rem;
        color: white;
        border: 1px solid white;
        border-radius: 1rem;
        padding: 1.3rem 2rem;
        top:37%;
        left:26.2%;
        align-self: center;
        justify-self: center;
      }
      img {
        width: 100%;
        align-self: center;
        padding: 0.6rem;
        background: black;
        border-radius: 0.9rem;
        // height: 22rem;
      }
      // div {
      //   position: absolute;
      //   p {
      //     text-align: center;
      //     top: 40%;
      //     left: 45%;
      //   }
      // }
    }
    .image-text {
      font-family: 'Ubuntu';
      font-style: normal;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 0.875rem;
      color: #222122;
      padding-right: 2rem;
      text-align: end;
      padding-top: 0.5rem;
      justify-self: end;
    }
  }

/* iPhone XS Max, XR , XR MAX, 11, 11 Pro Max----------- */
@media only screen and (min-device-width: 414px) and (max-device-height: 896px){
/* Styles */
 .walkthrough-section{
   height: 71vh;
   align-content: flex-start;
   .main-heading {
    //  background: green !important;
    padding: 2rem 0;
    font-size: 1.5rem;
   }
   .sub-heading{
     align-self: flex-end;
   }
   .image-section {
     row-gap: 1.5rem;
     .image-text {
       font-size: 1.5rem;
     }
   }
 }
}
/* iPhone X /Iphone XS/ Iphone 11 Pro----------- */
@media only screen and (min-device-width: 375px) and (max-device-height: 812px) {
/* Styles */
 .walkthrough-section{
   height: 71vh;
   align-content: flex-start;
  //  .main-heading {
  //   //  background: green !important;
  //  }
   .sub-heading{
     align-self: flex-end;
   }
   .image-section {
     row-gap: 1rem;
     .image-text {
       font-size: 1.5rem;
     }
   }
 }
}
//redmi note 7
@media only screen and (min-width: 393px) and (max-height: 767px) {
  /* Your Styles... */
  .walkthrough-section{
   height: 80vh !important;
   align-content: center;
   .main-heading {
    //  background: green !important;
    span {
      font-size: 4rem !important;
      line-height: 4.5rem !important;
    }
   }
   .sub-heading{
     align-self: center;
   }
   .image-section {
     row-gap: 2rem;
     img {
       height: 30rem;
     }
     .image-text {
       font-size: 1.8rem !important;
      //  padding-bottom: 2rem !important;
     }
   }
 }
}
/* iPhone 6+, 7+, 8+ ----------- */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px){
/* Styles */
 .walkthrough-section{
   height: 75vh !important;
   align-content: flex-start;
   .main-heading {
    //  background: green !important;
    span {
      font-size: 3rem !important;
      line-height: 3rem !important;
    }
   }
   .sub-heading{
     align-self: flex-end;
   }
   .image-section {
     row-gap: 1rem;
     img {
       height: 25rem;
     }
     .image-text {
       font-size: 1.8rem !important;
      //  padding-bottom: 2rem !important;
     }
   }
 }
}
//Gallaxy s20
@media only screen and (min-width: 360px) and (max-height: 736px) {
  /* Your Styles... */
  .walkthrough-section{
   height: 85vh;
   align-content: flex-start;
   .main-heading {
    //  background: green !important;
    span {
      font-size: 4rem;
      line-height: 4rem;
    }
   }
   .sub-heading{
     align-self: flex-end;
   }
   .image-section {
     row-gap: 2rem;
     img {
       height: 30rem;
     }
     .image-text {
       font-size: 1.8rem !important;
      //  padding-bottom: 2rem !important;
     }
   }
 }
}
/* iPhone 6, 7, 8 ----------- */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px){
/* Styles */
 .walkthrough-section{
   height: 75vh !important;
   align-content: flex-start;
   .main-heading {
    //  background: green !important;
    span {
      font-size: 3rem !important;
      line-height: 3rem !important;
    }
   }
   .sub-heading{
     align-self: flex-end;
   }
   .image-section {
     row-gap: 1rem;
     img {
       height: 25rem;
     }
     .image-text {
       font-size: 1.8rem !important;
      //  padding-bottom: 2rem !important;
     }
   }
 }
}
/* pixel 2 ----------- */
@media only screen and (min-device-width: 412px) and (max-height: 667px){
/* Styles */
 .walkthrough-section{
   height: 75vh !important;
   align-content: flex-start;
   .main-heading {
    //  background: green !important;
    span {
      font-size: 3rem !important;
      line-height: 3rem !important;
    }
   }
   .sub-heading{
     align-self: flex-end;
   }
   .image-section {
     row-gap: 1rem;
     img {
       height: 25rem;
     }
     .image-text {
       font-size: 1.8rem !important;
      //  padding-bottom: 2rem !important;
     }
   }
 }
}
  /* iPhone 4----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 500px){
/* Styles */
 .walkthrough-section{
   height: unset !important;
   align-content: flex-start;
   .main-heading {
    //  background: green !important;
    span {
      font-size: 2.5rem !important;
      line-height: 2.5rem !important;
    }
   }
   .sub-heading{
     align-self: flex-end;
     font-size: 1rem;
   }
   .image-section {
     row-gap: 1rem;
     img {
       height: 20rem;
     }
     .image-text {
       font-size: 1rem !important;
      //  padding-bottom: 2rem !important;
     }
   }
 }
}
</style>


<template>
  <section class="takerender-section">
    <p class="desc-one">{{ $t("dashboard.takeRenderMainHeading") }}</p>
    <p class="desc-two">
      <span>{{ $t("dashboard.takeRenderSubHeading[0]") }}</span>
      <span>{{ $t("dashboard.takeRenderSubHeading[1]") }}</span>
    </p>
    <img src="~assets/images/lighting/takerender.png" alt="Neo Render">
    <div class="lighting-menu">
        <span>
            <img src="~assets/images/lighting/warm.png" alt="" srcset="">
            <p>{{ $t("dashboard.warm") }}</p>
        </span>
         <span>
            <img src="~assets/images/lighting/cool.png" alt="" srcset="">
            <p>{{ $t("dashboard.cool") }}</p>
        </span>
         <span>
            <img src="~assets/images/lighting/white.png" alt="" srcset="">
            <p>{{ $t("dashboard.white") }}</p>
        </span>
    </div>
    <button class="mobile-basic-btn" @click="startRenderClicked()">{{ $t("buttonText.startRendering") }}</button>
    <div class="bottom-space"></div>
    <loginViaDesktopComponent :desktopAlert="desktopAlert"></loginViaDesktopComponent>
  </section>    
</template>
<script>
import loginViaDesktopComponent from '@/components/shared/mobile/loginViaDesktop';
export default {
  components: {
    loginViaDesktopComponent
  },  
  data() {
    return {
      desktopAlert: false,
    }
  },
  methods: {
    startRenderClicked(){
      this.desktopAlert = true
      this.$root.$emit("send-mobile-event",{name : 'mb_Start_rendering_bottom_clicked'});
    }
  },
}
</script>
<style lang="scss">
  .takerender-section {
    // height: 100%;
    background: #F5F5F7;
    display: grid;
    justify-content: center;
    .desc-two {
      span {
        &::after{
          content: '\A' !important;
          white-space: pre !important;
        }
        font-family: 'Ubuntu';
        font-style: normal;
        font-weight: 500;
        font-size: 2rem;
        line-height: 2rem;
        padding: 0rem 2rem 2rem 4rem;
        text-align: start;
        color: #222122;
        margin: 0;
      }
    }
    .desc-one {
      font-family: 'Maven Pro';
      font-style: normal;
      font-weight: 900;
      font-size: 3.5rem;
      line-height: 4rem;
      text-align: start;
      color: #0E0E0E;
      padding: 4rem 2rem 1rem 4rem;
      width: 35rem;
      // padding-top: 4rem;
    }
    img {
      width: 75%;
      height: 22rem;
      justify-self: start;
    }
    // button {
    //   background: #0E0E0E;
    //   padding: 1.4rem 2.4rem;
    //   color: white;
    //   border-radius: 0.5rem;
    //   font-family: 'Nunito Sans';
    //   font-style: normal;
    //   font-weight: 800;
    //   font-size: 1rem;
    //   letter-spacing: 0.1rem;
    //   line-height: 1rem;
    //   color: #FBF3F1;
    //   justify-self: center;
    // }
    .lighting-menu {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        padding:2rem 2rem 0 2rem;
        span {
            display: grid;
            grid-auto-flow: row;
            row-gap: 1rem;
            justify-items: center;
            justify-content: center;
            p{
                margin: 0;
                font-size: 1.3rem;
            }
            img {
                width: 100%;
                height: 10rem;
            }
        }
    }
    button {
     font-size: 1.2rem;
     padding: 1.5rem 3rem;
    }
    .bottom-space {
      height: 15vh !important
    }
  }
//    // PIXEL 2 && Iphone 6/7/8 plus
// @media only screen and (min-device-width : 320px) and (min-device-height: 640px) and (max-device-height : 750px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2) {
//  .takerender-section {
//      .lighting-menu {
//         display: grid;
//         grid-template-columns: repeat(3,1fr);
//         padding:2rem 2rem 0 2rem;
//         span {
//             display: grid;
//             grid-auto-flow: row;
//             row-gap: 1rem;
//             justify-items: center;
//             justify-content: center;
//             p{
//                 margin: 0;
//             }
//             img {
//                 width: 100%;
//                 height: 10rem;
//             }
//         }
//     }
//     button {
//       margin-bottom: 2rem;
//     }
//  }
// }
//  // PIXEL 2XL && Iphone X
// @media only screen and (min-device-width : 320px) and (min-device-height: 750px) and (max-device-height : 850px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2) {
//  .takerender-section {
//      .lighting-menu {
//         display: grid;
//         grid-template-columns: repeat(3,1fr);
//         padding:2rem 2rem 0 2rem;
//         span {
//             display: grid;
//             grid-auto-flow: row;
//             row-gap: 1rem;
//             justify-items: center;
//             justify-content: center;
//             p{
//                 margin: 0;
//             }
//             img {
//                 width: 100%;
//                 height: 10rem;
//             }
//         }
//     }
//     button {
//       margin-bottom: 2rem;
//     }
//  }
// }
// // IPHONE 6/7/8
// @media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2){
//   .takerender-section {
//      .lighting-menu {
//         display: grid;
//         grid-template-columns: repeat(3,1fr);
//         padding:2rem 2rem 0 2rem;
//         span {
//             display: grid;
//             grid-auto-flow: row;
//             row-gap: 1rem;
//             justify-items: center;
//             justify-content: center;
//             p{
//                 margin: 0;
//                 font-size: 1.35rem;
//             }
//             img {
//                 width: 100%;
//                 height: 10rem;
//             }
//         }
//     }
//     button {
//       margin-bottom: 2rem;
      
//     }
//     button {
//      font-size: 0.95rem;
//      padding: 1.5rem 1rem;
//     }
//  }
// }
// @media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 3){
// //  p {
// //     color: yellow !important;
// //   }
// }

// @media only screen and (min-device-width: 400px) and (max-device-height: 900px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2){
// /* Styles - SE*/
// }
// //iphone 5
// @media only screen and (min-device-width: 320px) and (max-device-height: 600px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2){
// /* Styles -SE Basic Mobile Responsive*/
// }
// //MOTOG4
// @media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 3){
//   .takerender-section {
//      .lighting-menu {
//         display: grid;
//         grid-template-columns: repeat(3,1fr);
//         padding:2rem 2rem 0 2rem;
//         span {
//             display: grid;
//             grid-auto-flow: row;
//             row-gap: 1rem;
//             justify-items: center;
//             justify-content: center;
//             p{
//                 margin: 0;
//                 font-size: 1.5rem;
//             }
//         }
//     }
//     button {
//       // margin-bottom: 2rem;
//       padding: 1.5rem 1rem;
//     }
//  }
// }
// //iphone 4
// @media only screen and (min-device-width: 320px) and (max-device-height: 500px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2){
//   .takerender-section {
//      .lighting-menu {
//         span {
//             p{
//                 margin: 0;
//                 font-size: 1.25rem;
//             }
//         }
//     }
//     button {
//      font-size: 0.95rem;
//      padding: 1.5rem 1rem;
//     }
//  }
// }
// // Iphone XR & Max
// @media only screen and (min-device-width: 400px) and (min-device-height: 850px) and (max-device-height: 900px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 1){
//  .takerender-section {
//      .lighting-menu {
//         display: grid;
//         grid-template-columns: repeat(3,1fr);
//         padding:2rem 2rem 0 2rem;
//         span {
//             display: grid;
//             grid-auto-flow: row;
//             row-gap: 1rem;
//             justify-items: center;
//             justify-content: center;
//             p{
//                 margin: 0;
//             }
//             img {
//                 width: 100%;
//                 height: 10rem;
//             }
//         }
//     }
//     button {
//       margin-bottom: 2rem;
//     }
//  }
// }
</style>
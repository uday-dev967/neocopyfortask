<template>
<section>
  <div class="welcome-screen">
    <p class="main-heading">
      <span>{{ $t("dashboard.lightning") }}</span>
      <span>{{ $t("dashboard.fast") }}</span>
      <span>{{ $t("dashboard.interior") }}</span>
      <span>{{ $t("dashboard.design") }}</span>
      <span>{{ $t("dashboard.software") }}</span>
    </p>
    <p class="sub-heading">
      <span>{{ $t("dashboard.mobileHomeSubHeading[3]") }}</span>
      <!-- <span>{{ $t("dashboard.mobileHomeSubHeading[0]") }}</span>
      <span>{{ $t("dashboard.mobileHomeSubHeading[1]") }}</span>
      <span>{{ $t("dashboard.mobileHomeSubHeading[2]") }}</span> -->
    </p>
    <button v-if="hasUserLoggedInFromPC || $ua.isFromTablet()" class="mobile-basic-btn" @click="renderClicked()">
      {{ $t("buttonText.seeRenders") }}
    </button>
    <button v-else class="mobile-basic-btn" @click="handleStartDesigningButtonClick">
      {{ $t("buttonText.startDesiginingNowCap") }}
    </button>
    <span class="video-link" @click="openVideoPopup()">
      <img src="~assets/images/play2.svg" alt="">
      <p>{{ $t("buttonText.seeHowItWorksCap") }}</p>
    </span>
    <div class="popup-div video-container" :class="videoShow ? 'showPopUp': ''">
      <div class="popup-container">
          <svg
          class="close-x"
          width="15"
          height="15"
          viewBox="0 0 27 27"
          fill="none"
          @click="closePopup"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25.7845 1.20001L1 25.769"
            stroke="white"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M26 26.2L1.43109 1.41553"
            stroke="white"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </svg>
        <div class="popup-details">
          <video
            width="300"
            v-if="videosData.length>0"
            :src="videosData.length>0 && $ua.os() == 'Mac OSX'?'https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/Neo%20Videos/Neo%20Onboarding%20Zoe.mp4':videosData[0].videoLink"
            controls
            playsinline
          ></video>
        </div>
      </div>
    </div>
    <GalleryCarouselComponent v-if="primaryProjectData && primaryProjectData.name && primaryProjectData.renders" :isImageView="isImageView" :currentIndex="currentIndex" :imageData="primaryProjectData.renders" :projectName="primaryProjectData.name"/>
    <loginViaDesktopComponent :desktopAlert="desktopAlert"/>
    <MessageComponent :changeRight="message" />

  </div>
</section>
</template>
<script>
import GalleryCarouselComponent from '@/components/shared/mobile/galleryCarousel';
import loginViaDesktopComponent from '@/components/shared/mobile/loginViaDesktop';
import CommonUtilities from "../../../mixins/commonUtilitiesMixin";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    loginViaDesktopComponent,
    GalleryCarouselComponent
  },
  mixins: [ CommonUtilities ],
  data() {
    return {
      desktopAlert: false,
      videoShow: false,
      isImageView: false,
      currentIndex: 0,
      message: {
        value: "",
        error: false,
        global: false
      },
    }
  },
  mounted() {
    this.fetchProjects().then(res => { });
    this.fetchMobileRenders()
    if (this.videosData.length == 0)
    this.fetchVideo().then(res => {
      const video = document.querySelector("video");
      video.addEventListener("play", event => {
      this.$root.$emit("send-mobile-event",{name : 'Neo Video played'});

        // if (window.analytics) {
        //   window.analytics.track("Neo Video Played", {
        //     title: "Neo Video played",
        //     subtitle: "mobile"
        //   },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
        // }
      });
      video.addEventListener("pause", event => {
        this.$root.$emit("send-mobile-event",{name : 'Neo Video Pause'});
        // if (window.analytics) {
        //   window.analytics.track("Neo Video Pause", {
        //     title: "Neo Video Pause",
        //     subtitle: "mobile"
        //   },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
        // }
      });
    });
  },
  computed: {
    ...mapState({
      videosData: state => state.Dash.video,
      mobileProjects: state => state.Projects.mobileSampleProjects,
      mobileRenders: state => state.Projects.mobileRenders,
      usersProjects: state => state.Projects.usersProjects,
      user: state => state.User.user,
      selectedLocale: state => state.User.selectedLocale
    }),
    primaryProjectData : function(){
      if(this.mobileProjects){
        for(let item in this.mobileRenders) {
          if(this.mobileRenders[item].isPrimary){
            return this.mobileRenders[item];
            // return;
          }else {
            return this.mobileRenders[item];
          }
        }
      }else {
        return {};
      }
    },
    hasUserLoggedInFromPC() {
      if ( this.user && this.user.onboardingGoalFilled ) return true;

      return false;
    }
  },
  methods: {
    ...mapActions({
      fetchVideo: "Dash/getVideos",
      fetchMobileRenders: "Projects/fetchMobileRenders",
      creatNewV2Project: "Projects/creatNewV2Project",
      fetchProjects: "Projects/fetchProjects"
    }),
    closePopup (){
      const video = document.querySelector("video");
      video.pause();
      video.currentTime = 0;
      this.videoShow = false;
    },
    openVideoPopup(){
      this.videoShow = true;
      const video = document.querySelector("video");
      video.play();
      video.addEventListener("play", event => {
        this.$root.$emit("send-mobile-event",{name : 'mb_Video_opened'});
      });
      video.addEventListener("pause", event => {
        this.$root.$emit("send-mobile-event",{name : 'Neo Video Pause'});
      });
    },
    renderClicked(){
      if(!this.primaryProjectData){
        this.message.error = true;
        this.message.global = true;
        this.message.value = this.$t("messages.notTakenAnyRendersMessage");
        setTimeout(() => {
          this.message.global = false;
          this.message.value = "";
          this.message.error = false;
        }, 2500);
      }
      this.isImageView = true;
      this.$root.$emit("send-mobile-event",{name : 'mb_RenderNow_top_clicked'});
    },
    handleStartDesigningButtonClick(){
      let existingMobileFirstProject = null;
      if ( this.usersProjects && this.usersProjects.length > 0 ) {
        existingMobileFirstProject = this.usersProjects.find(e => e.name === 'first_project_mobile');
      }
      if (existingMobileFirstProject) {
        this.redirectToProject(existingMobileFirstProject);
      } else {
        this.creatNewV2Project({ type: ['project'], name: "first_project_mobile", folder: null }).then( async (projRes) => {
          this.redirectToProject(projRes);
          this.fetchProjects();
        })
      }
    },
    redirectToProject(project) {
      if (this.isSafari()) window.location = window.location.origin + "/toolv2?project=" + (project.id || project._id) + this.checkLangAndReturnLangCode();
      else window.open(window.location.origin + "/toolv2?project=" + (project.id || project._id) + this.checkLangAndReturnLangCode(), "_blank");
    },
    checkLangAndReturnLangCode() {
      switch(this.$i18n.locale) {
          case "ja": {
            return "&lang=ja&isAtlasSearchEnabled=true"
          }
          case "es": {
            return "&lang=es&isAtlasSearchEnabled=true"
          }
      }

      return ""
    }
  },
}
</script>
<style lang="scss">
.welcome-screen {
  background: #FBF3F1;
  padding: 0rem 6rem;
  display: grid;
  grid-template-rows: repeat(4,max-content);
  justify-content: left;
  // align-content: end;
  height:85vh !important;
  align-content: center !important;
  // padding-top: 10rem !important;
  // padding-bottom: 15%;
  // padding-bottom: calc(80% + 3rem);
  // padding-bottom: 0;
  // @include respond(phone){ // width < 900px?
  //   .main-heading,.sub-heading{
  //     // width: 15rem;
  //     padding-right: 0 !important;
  //   }
  // }
  // @include respond(s-phone){
  //   // width < 480px?
  //   .main-heading,.sub-heading{
  //     // width: 15rem;
  //     padding-right: 0 !important;
  //   }
  // }
  .main-heading{
    span {
      font-weight: 900;
      font-family: 'Maven Pro' !important;
      font-size: 5rem;
      line-height: 6.5rem;
      color: #0E0E0E;
    }
  }
  .sub-heading {
    span{
      font-weight: normal;
      font-family: 'Ubuntu';
      font-size: 1.8rem;
      line-height: 2.7rem;
      color: #543E4D;
      // padding: 0.5rem 0;
      // padding-right: 4rem;
    }
  }
  .main-heading,.sub-heading {
    span {
      &::after{
        content: '\A';
        white-space: pre;
      }
    }
  }
  .video-link {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    padding-top: 0.5rem;
    column-gap: 0.5rem;
    img {
      width: 2rem;
    }
    p {
      margin: 0;
      font-family: 'Ubuntu';
      font-style: normal;
      font-weight: 500;
      font-size: 1.5rem;
      // line-height: 4rem;
      text-transform: uppercase;
      color: #222122;
    }
  }
  button {
    justify-self: flex-start;
    padding: 1.5rem 4rem;
  }
  .video-container {
    .popup-container {
      width: 100vw !important;
      .close-x {
        position: absolute;
        top: -2rem;
        right: 0;
      }
      .popup-details {
        padding: 0;
      }
    }
  }
}

/* iPhone X /Iphone XS/ Iphone 11 Pro----------- */
@media only screen and (min-device-width: 375px) and (min-device-height: 790px) and (max-device-height: 812px) {
/* Styles */
  .welcome-screen{
    height: 73vh;
    align-content: start;
    // padding-top: 6rem;
    .main-heading{
      span{
        font-size: 4.8rem;
        line-height: 5rem;
        // color:red;
      }
    }
    .sub-heading{
      span {
        font-size: 1.8rem;
      }
    }
    .video-link{
      p {
        font-size: 1.45rem;

      }
    }
    button {
      justify-self: start;
    }
  }
}
//redmi note 7
@media only screen and (min-width: 393px) and (min-height:750) and (max-height: 767px) {
  /* Your Styles... */
  .welcome-screen{
    height:80vh;
    align-content: center;
    padding-top: 3rem;
    .main-heading{
      span{
        font-size: 5rem;
        line-height: 6rem;
      }
    }
    .sub-heading{
      span {
        font-size: 1.8rem;
        line-height: 2.8rem;
      }
    }
    .video-link{
      p {
        font-size: 1.45rem;

      }
    }
    button {
      justify-self: start;
    }
  }
}
/* iPhone X /Iphone XS/ Iphone 11 Pro----------- */
@media only screen and (min-device-width: 375px) and (max-height: 749px) {
/* Styles */
  .welcome-screen{
    height: 75vh !important;
    align-content: start !important;
    // padding-top: 6rem;
    .main-heading{
      span{
        font-size: 4.8rem;
        line-height: 5rem;
        // color:red;
      }
    }
    .sub-heading{
      span {
        font-size: 1.8rem;
      }
    }
    .video-link{
      p {
        font-size: 1.45rem;

      }
    }
    button {
      justify-self: start;
    }
  }
}
/* iPhone X /Iphone XS/ Iphone 11 Pro----------- */
@media only screen and (min-device-width: 375px) and (max-height: 749px) {
/* Styles */
  .welcome-screen{
    height: 75vh !important;
    align-content: start !important;
    // padding-top: 6rem;
    .main-heading{
      span{
        font-size: 4.8rem;
        line-height: 5rem;
        // color:red;
      }
    }
    .sub-heading{
      span {
        font-size: 1.8rem;
      }
    }
    .video-link{
      p {
        font-size: 1.45rem;

      }
    }
    button {
      justify-self: start;
    }
  }
}
/* iPhone 6+, 7+, 8+ ----------- */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px){
/* Styles */
  .welcome-screen{
      height: 74vh !important;
      align-content: center;
      padding-top: 0rem !important;
      .main-heading{
        // background: chartreuse;
        span{
          font-size: 4.8rem;
          line-height: 5rem;
        }
      }
      .sub-heading{
        span {
          font-size: 1.8rem;
        }
      }
      .video-link{
        p {
          font-size: 1.45rem;

        }
      }
      button {
        justify-self: start;
      }
  }
}
/* Gallaxy s20----------- */
@media only screen and (min-device-width: 360px) and (max-height: 736px){
/* Styles */
  .welcome-screen{
    height:83vh;
    align-content: center;
    padding-top: 6rem;
    .main-heading{
      span{
        font-size: 5rem;
        line-height: 5.5rem;
      }
    }
    .sub-heading{
      span {
        font-size: 2rem;
      }
    }
    .video-link{
      p {
        font-size: 1.55rem;

      }
    }
    button {
      justify-self: start;
    }
  }
}

/* iPhone 6, 7, 8 ----------- */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px){
/* Styles */
  .welcome-screen{
      height: 74vh !important;
      align-content: center;
      padding-top: 0rem !important;
      .main-heading{
        // background: chartreuse;
        span{
          font-size: 4.8rem;
          line-height: 5rem;
        }
      }
      .sub-heading{
        span {
          font-size: 1.8rem;
        }
      }
      .video-link{
        p {
          font-size: 1.45rem;

        }
      }
      button {
        justify-self: start;
      }
  }
}
/* iPhone 6, 7, 8 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 640px){
/* Styles */
  .welcome-screen{
      height: 85vh !important;
      align-content: center;
      padding-top: 0rem !important;
      .main-heading{
        // background: chartreuse;
        span{
          font-size: 4.8rem;
          line-height: 5rem;
        }
      }
      .sub-heading{
        span {
          font-size: 1.8rem;
        }
      }
      .video-link{
        p {
          font-size: 1.45rem;

        }
      }
      button {
        justify-self: start;
      }
  }
}
// /* iPhone 5 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 568px){
// /* Styles */
 .welcome-screen{
      height: 85vh !important;
      align-content: center;
      padding-top: 0rem !important;
      .main-heading{
        // background: chartreuse;
        span{
          font-size: 3rem;
          line-height: 4rem;
        }
      }
      .sub-heading{
        span {
          font-size: 1.8rem;
        }
      }
      .video-link{
        p {
          font-size: 1.45rem;

        }
      }
      button {
        justify-self: start;
      }
  }
}
// /* iPhone 4 ----------- */
@media only screen and (min-device-width : 320px) and (max-device-height: 480px)  {
/* Styles */
  .welcome-screen{
      height: 85vh !important;
      align-content: center;
      padding-top: 0rem !important;
      .main-heading{
        // background: chartreuse;
        span{
          font-size: 4rem;
          line-height: 4rem;
        }
      }
      .sub-heading{
        span {
          font-size: 1.3rem;
          line-height: 1.5rem;
        }
      }
      .video-link{
        p {
          font-size: 1.15rem;

        }
      }
      button {
        justify-self: start;
        font-size: 0.8rem;
      }
  }
}
</style>

<template>
  <div class="popup-div" :class="userAccountInfo && isTryBetaCode && ! userAccountInfo.switchToV2TourDone ? 'showPopUp' : ''">
    <div class="popup-container move-to-v2-popup-container">
        <div class="video-container">
            <div class="video-iframe-wrapper">
                <iframe src="https://www.youtube.com/embed/FTYLfi-I9h8?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <span>
                Learn more about Neo 2.0
            </span>
        </div>
        <div class="content-container">
            <div class="popup-title">
                Your favourite design software got a major upgrade!
            </div>
            <div class="popup-body">
                <div class="list-with-icon">
                    <div v-for="i of popupBodyPoints" :key="i" class="list-item">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6.71436" cy="6.71436" r="6" fill="#26B679"/>
                            <path d="M5.53374 9.21435C5.48186 9.21465 5.43044 9.20473 5.38242 9.18515C5.3344 9.16557 5.29073 9.13673 5.2539 9.10027L3.2832 7.13331L3.83894 6.57863L5.53374 8.26628L9.58942 4.21436L10.1452 4.76904L5.80963 9.09633C5.73686 9.17045 5.6377 9.21287 5.53374 9.21435Z" fill="white"/>
                        </svg>
                        {{i}}
                    </div>
                    <div class="list-item">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6.71436" cy="6.71436" r="6" fill="#26B679"/>
                            <path d="M5.53374 9.21435C5.48186 9.21465 5.43044 9.20473 5.38242 9.18515C5.3344 9.16557 5.29073 9.13673 5.2539 9.10027L3.2832 7.13331L3.83894 6.57863L5.53374 8.26628L9.58942 4.21436L10.1452 4.76904L5.80963 9.09633C5.73686 9.17045 5.6377 9.21287 5.53374 9.21435Z" fill="white"/>
                        </svg>
                        <div>Many more features coming soon - <span>Elevations, Kitchen Creator, Collections, Product edit, Multi floor</span></div> 
                    </div>
                </div>

                <div class="switch-to-v2-button" @click="handleCTAClick(true)">
                    Switch me to Neo 2.0
                </div>
                <div class="v2-compatibility-notice">
                    Note: Since the changes are major, Neo 2.0 isn’t compatible with Neo 1.0 at this moment
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "neoV2Popup",
  data() {
    return {
      popupBodyPoints: [
        "Slick UI that elevates your mood while designing",
        "Export 2D floor plans in CAD & PDF",
        "mm & sub-inch support and accuracy for exact floor plans",
        "Make your designs with 10X more accuracy",
        "All major bugs and snags are fixed"
      ]
    };
  },
  created() {
    this.fetchAccountInfo();
  },
  mounted() {},
  computed: {
    ...mapState({
      user: state => state.User.user,
      isTryBetaCode: state => state.User.isTryBetaCode,
      isFreeTrail: state => state.Billing.isTrial,
      isLPU: state => state.User.isLPU,
      userAccountInfo: state => state.User.userAccountInfo
    })
  },
  methods: {
    ...mapActions({
      fetchAccountInfo: "User/fetchAccountInfo",
      updateAccountInfo: "User/updateAccountInfo"
    }),
    handleCTAClick(tourDone = true) {
      //  trigger chmln tour
      this.updateAccountInfo({
        switchToV2TourDone: tourDone
      }).then(async data => {
        if (data) {
          await this.fetchAccountInfo().catch(e => {console.log(e)});
          setTimeout(() => {
            const tourId = this.getTourId();
            if (tourId) {
                window.chmln.show(tourId)
            }
          }, 500)
        }
      });
    },
    getTourId() {
        let tourId = "";
        if ( window.location.host === "neo.foyr.com" ) {
            tourId = "6220a098cb1a7f0016aec735"
        } else if ( window.location.host === "neostaging.foyr.com" || window.location.host.indexOf( 'neopreprod.foyr.com' ) !== - 1) {
            tourId = "621f017d5df8fd001494b4cd"
        } else if ( window.location.host === "localhost:3000" ) {
            tourId = "621f123f5df8fd00135224b2"
        }

        return tourId;
    }
  }
};
</script>

<style lang="scss" scoped>
.move-to-v2-popup-container {
  background-color: $color-white;
  width: 62.5rem * 1.2;
  height: 31rem * 1.2;
  padding: 0;
  display: flex;

  .video-container {
    background: $border-2;
    flex: 0 0 45%;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 2.4rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-family: $main-font;
      font-style: normal;
      font-weight: 800;
      font-size: 1.125rem * 1.2;
      line-height: 1;
      color: $banner-heading-color;
      margin-top: 1.2rem;
    }

    .video-iframe-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;

      iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }
  .content-container {
    flex: 0 0 55%;
    padding: 3.125rem * 1.2 2.4rem 2.4rem 2.4rem;
    display: flex;
    flex-direction: column;

    .popup-title {
      font-family: $main-font;
      font-style: normal;
      font-weight: bold;
      font-size: 1.125rem * 1.1;
      color: $banner-heading-color;
      margin-bottom: 1.3rem;
      line-height: 1.25;
    }

    .list-with-icon {
      margin-bottom: 3.125rem * 1.2;

      .list-item {
        display: flex;
        align-items: center;
        color: $banner-heading-color;

        font-family: $main-font;
        font-style: normal;
        font-weight: 500;
        font-size: 0.9375rem * 1.2;
        line-height: 1.25;
        margin-bottom: 1.3rem;

        span {
          font-size: 0.9375rem * 1.2;
          font-weight: 800;
          color: $banner-heading-color;
        }

        svg {
          flex-shrink: 0;
          margin-right: 0.625rem * 1.2;
          display: block;
          height: 12px;
          width: 12px;
        }
      }
    }

    .switch-to-v2-button {
      cursor: pointer;
      background: #222021;
      width: 100%;
      font-family: $main-font;
      font-style: normal;
      font-weight: bold;
      font-size: 0.9375rem * 1.2;
      line-height: 1.5;
      color: $background-white;
      text-align: center;
      padding: 0.6rem;
      margin-bottom: 1.2rem;

      &:hover {
        background: $border-1;
        color: #222021;
      }
    }

    .v2-compatibility-notice {
      font-family: $main-font;
      font-style: normal;
      font-weight: 600;
      font-size: 0.75rem * 1.2;
      line-height: 1;
      color: $banner-sub-heading-color;
    }
  }
}
</style>

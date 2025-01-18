<template>
  <div class="dash-lay">
    <navbar id="nav"/>
    <a-side id="aside"/>
    <nuxt id="main"/>
    <div id="snackbar">Some text some message..</div>
    <!-- <MessageComponent :changeRight="message" /> -->
    <div class="free-demo-popup-container" v-if="getFreeDemoShow_Desk" @click="outsideClick()">
      <div class="free-demo-popup" @click.stop>
        <svg
          class="free-demo-popup-close"
          @click="setGetFreeDemoShow_Desk(false)"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.7845 1.20001L1 25.769"
            stroke="#D1D1D1"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M26 26.2L1.43109 1.41553"
            stroke="#D1D1D1"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </svg>
        <!-- Modal content ================> -->
        <iframe
          class="free-demo-iframe"
          width="560"
          height="315"
          :src="calendlyUrl"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <PayAsYouGoCreditsConfirmationPopup></PayAsYouGoCreditsConfirmationPopup>
    <NeoformPopup></NeoformPopup>
    <embededTypeformComponent v-show="showEmbededTypeform"></embededTypeformComponent>
    <NeoV2Popup></NeoV2Popup>
    <GetDesignDonePopup v-show="isDFUPopupVisible"></GetDesignDonePopup>
    <FoyrAIIdeatePopupVue />
    <FoyrServicesPopup v-show="showFoyrServicesPopup"></FoyrServicesPopup>
    <!-- <SelectCategoryPopup /> -->
    <div class="loading-animation" v-show="showMainLoader">
			<img src="~assets/images/StopWatch.gif" alt="" srcset="" />
		</div>
    <div id="remIndicator"></div>
  </div>
</template>

<script>
import navbar from '@/components/shared/mainNav'
import aSide from '@/components/shared/aside'
import NeoV2Popup from '@/components/shared/neoV2Popup.vue'
import CalendlyMixin from '@/mixins/calendlyMixin'
import GetDesignDonePopup from '@/components/shared/popups/GetDesignDonePopup.vue'
import PayAsYouGoCreditsConfirmationPopup from '@/components/shared/popups/payAsYouGoCreditsConfirmationPopup.vue'
import embededTypeformComponent from "@/components/shared/embededTypeformComponent"
import NeoformPopup from "@/components/shared/neoformPopup"
import FoyrAIIdeatePopupVue from '../components/foyrAIIdeatePopup.vue'
import FoyrServicesPopup from '../components/shared/popups/foyrServicesPopup.vue'
import SelectCategoryPopup from '../components/selectCategoryPopup.vue'
import { mapGetters, mapState, mapMutations, mapActions } from "vuex"

export default {
  middleware: ["blockIfNotChrome"],
  mixins: [ CalendlyMixin ],
  components: {
    navbar,
    aSide,
    NeoV2Popup,
    GetDesignDonePopup,
    PayAsYouGoCreditsConfirmationPopup,
    embededTypeformComponent,
    NeoformPopup,
    FoyrAIIdeatePopupVue,
    FoyrServicesPopup,
    SelectCategoryPopup
  },
  head: {
    noscript: [
      { innerHTML: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKH2GGQ" height="0" width="0" style="display:none;visibility:hidden"></iframe>', body: true }
    ],
  },
  computed: {
    ...mapGetters("Projects", [ "isDFUPopupVisible", "showFoyrServicesPopup", "showMainLoader" ]),
    ...mapGetters("typeformPopup", [
        "showEmbededTypeform",
    ]),
  },
  mounted() {
      if (!window.chmln) window.chmln = { show: () => { console.log("Chameleon not loaded") } };
      console.log("dashboard-layouts-DOMContentLoaded")
      window.parent.postMessage("login-success", '*');
      if(this.$ua.isFromIpad()) {
        this.registerDashboardAnalyticsEvent({
          event_id: "user_logged_in_from_ipad",
          additional_data: {}
        })
      }
  },
  methods: {
    ...mapActions({
      registerDashboardAnalyticsEvent: "Projects/registerDashboardAnalyticsEvent"
    })
  }
}
</script>

<style lang="scss" scoped>
.dash-lay {
  height: 100%;
  display: grid;
  grid-template-columns: 16% auto;
  grid-template-rows: minmax(3.75rem, max-content) auto;
  grid-template-areas:
    "nav nav"
    "aside main";
  overflow: hidden;
   @include respond(phone){ // width < 900px?
      grid-template-columns: max-content;
    }
  #nav {
    grid-area: nav;
  }

  #aside {
    grid-area: aside;
    height: 100%;
  }

  #main {
    grid-area: main;
    padding: 0rem;
    position: relative;
    overflow: auto;
    background: $color-white;
    height: 100%;
    overflow-y: auto;
  }

  .get-free-demo-desk-btn span {
    color: black;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  .freeDemoImg {
      border-radius: 100%;
      justify-self: center;
      margin-bottom: 1rem;
  }
  .free-demo-popup-container {
      position: fixed;
      top: 0px;
      bottom: 0px;
      right: 0px;
      left: 0px;
      background: rgba(86, 86, 86, 0.65);
      z-index: 1000;
  }
  .free-demo-popup {
      background: #fbfcfd;
      position: absolute;
      top: 50%;
      left: 50%;
      /* height: 97%; */
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 70vw;
      display: grid;
      grid-template-columns: 1fr;
      place-content: center;
      justify-items: center;
      text-align: center;
      padding: 32px 20px 32px 20px;
  }

  .free-demo-popup-close {
      position: absolute;
      right: 0.5rem;
      width: 15px;
      path {
          stroke: black;
      }
  }
  .free-demo-iframe {
      height: 75vh;
      width: 70vw;
  }
}
.loading-animation {
	z-index: 9999;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: $background-30;
	pointer-events: all;

	img {
		width: 8.125rem;
	}
}
#remIndicator {
	position: absolute;
	top: -10000;
	left: -10000;
	background: transparent;
	opacity: 0;
	width: 1rem;
	height: 1rem;
	z-index: 1;
	pointer-events: none;
	visibility: hidden;
}
</style>

<template>
  <div class="top-bar-container">
<!-- NAVIGATION BAR TOP======================= -->
    <nav>
        <!-- <div class="navbar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 18C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H4C3.44772 16 3 16.4477 3 17C3 17.5523 3.44772 18 4 18H20ZM20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H20ZM3 7C3 7.55228 3.44772 8 4 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H4C3.44772 6 3 6.44772 3 7Z" fill="#C2D1D9"/>
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="6" width="18" height="12">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 18C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H4C3.44772 16 3 16.4477 3 17C3 17.5523 3.44772 18 4 18H20ZM20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H20ZM3 7C3 7.55228 3.44772 8 4 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H4C3.44772 6 3 6.44772 3 7Z" fill="white"/>
            </mask>
            <g mask="url(#mask0)">
            <rect width="24" height="24" fill="#E9BEB3"/>
            </g>
            </svg>
        </div> -->
        <svg v-if="$route.path.indexOf('/dashboard_mobile/plans') != -1" @click.stop="goBack" class="back-btn" width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M8.5 1.00012L2 6.76636L8.5 13.0001" stroke="#4D4C4D" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
        <div class="title">
            <p class="plans-title">NEO</p>
            <p class="plans-title" v-if="$route.path.indexOf('/dashboard_mobile/plans') != -1">{{ $t("buttonText.plans") }}</p>
            <p class="plans-title" v-if="$route.path.indexOf('/dashboard_mobile/projects') != -1">{{ $t("buttonText.projects") }}</p>
            <p class="plans-title" v-if="$route.path.indexOf('/dashboard_mobile/gallery') != -1">{{ $t("buttonText.gallery") }}</p>
        </div>
        <div class="logout" v-if="$route.path.indexOf('/dashboard_mobile/plans') != -1">
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.93763 0.605713H1.11945C1.03506 0.605713 0.954134 0.639236 0.894463 0.698906C0.834792 0.758577 0.80127 0.839508 0.80127 0.923895V14.2875C0.80127 14.3719 0.834792 14.4528 0.894463 14.5125C0.954134 14.5722 1.03506 14.6057 1.11945 14.6057H4.95354C4.99533 14.6051 5.03658 14.5962 5.07494 14.5797C5.11331 14.5631 5.14803 14.5391 5.17713 14.5091C5.20624 14.4792 5.22915 14.4437 5.24456 14.4049C5.25997 14.366 5.26758 14.3245 5.26695 14.2828C5.26632 14.241 5.25747 14.1997 5.2409 14.1614C5.22434 14.123 5.20037 14.0883 5.17038 14.0592C5.14039 14.0301 5.10497 14.0072 5.06612 13.9917C5.02728 13.9763 4.98578 13.9687 4.944 13.9693H1.444V1.24208H4.944C5.02838 1.24608 5.11091 1.21641 5.17341 1.15957C5.23592 1.10273 5.27328 1.0234 5.27729 0.939008C5.2813 0.854621 5.25162 0.772098 5.19479 0.709593C5.13795 0.647088 5.05861 0.609721 4.97422 0.605713H4.93763Z" fill="black"/>
          <path d="M9.25582 3.24194C9.18308 3.24454 9.11279 3.26891 9.05405 3.31189C8.99532 3.35487 8.95083 3.41449 8.92635 3.48304C8.90187 3.55158 8.89852 3.6259 8.91674 3.69636C8.93496 3.76683 8.97391 3.83021 9.02854 3.8783L12.6995 7.24194H3.79036C3.69392 7.2458 3.60296 7.28781 3.53749 7.35873C3.47202 7.42965 3.43741 7.52368 3.44127 7.62012C3.44513 7.71656 3.48714 7.80752 3.55806 7.87299C3.62898 7.93846 3.72301 7.97307 3.81945 7.96921H12.6995L9.02854 11.3328C8.95621 11.3975 8.91251 11.4882 8.90705 11.585C8.9016 11.6818 8.93484 11.7769 8.99945 11.8492C9.06407 11.9215 9.15477 11.9652 9.25161 11.9707C9.34844 11.9762 9.44348 11.9429 9.51582 11.8783L13.8795 7.8783C13.915 7.84623 13.9438 7.80747 13.9644 7.76423C13.9849 7.72098 13.9966 7.67412 13.999 7.62631C14.0014 7.57851 13.9943 7.53071 13.9781 7.48565C13.962 7.4406 13.9371 7.39917 13.9049 7.36376L13.8795 7.3383L9.51582 3.3383C9.44528 3.2731 9.35181 3.23846 9.25582 3.24194Z" fill="black"/>
          </svg>
          <p @click.stop="signOut()">{{ $t("buttonText.logOut") }}</p>
        </div>
        <div class="logout" v-if="$route.path.indexOf('/dashboard_mobile/plans') == -1">
          <nuxt-link :to="localePath('/dashboard_mobile/plans')">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.99998 9.7805C10.9397 9.7805 12.5122 8.20803 12.5122 6.2683C12.5122 4.32857 10.9397 2.7561 8.99998 2.7561C7.06025 2.7561 5.48779 4.32857 5.48779 6.2683C5.48779 8.20803 7.06025 9.7805 8.99998 9.7805Z" stroke="#0E0E0E" stroke-miterlimit="10"/>
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#0E0E0E" stroke-miterlimit="10"/>
              <path d="M7.82925 9.58545C7.82925 9.58545 4.3821 9.58545 2.69104 13.5529" stroke="#0E0E0E" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M10.1057 9.58545C10.1057 9.58545 13.5529 9.58545 15.2439 13.5529" stroke="#0E0E0E" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
            <p>{{ $t("buttonText.plans") }}</p>
          </nuxt-link>
        </div>
        <!-- <div class="mobile-menu" v-if="showLogout">
            <div @click="signOut()">
            <img src="~assets/images/logout.svg" alt />
            <p>Log Out</p>
            </div>
        </div> -->
    </nav>
<!-- NAVIGATION BAR BOTTOM======================= -->
    <div class="bottom-nav">
        <div>
            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.61377 5.8894V17.2507H15.6054V8.71293H7.06755L4.9163 5.8894H1.35327H0.61377Z" stroke="#D1D1D1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.42871 5.4188V1.25073H14.5296V7.50283V8.71292" stroke="#D1D1D1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>{{ $t("buttonText.projects") }}</p>
        </div>
        <div>
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.13889 17.8947H1.03188C0.976656 17.8947 0.931885 17.8499 0.931885 17.7947V7.49212C0.931885 7.46131 0.946087 7.43222 0.970381 7.41327L8.99282 1.15572C9.02917 1.12737 9.08018 1.12754 9.11634 1.15612L17.0313 7.41327C17.0552 7.43223 17.0692 7.46113 17.0692 7.49172V17.7947C17.0692 17.8499 17.0245 17.8947 16.9692 17.8947H11.5916C11.5364 17.8947 11.4916 17.8499 11.4916 17.7947V12.3628C11.4916 12.3076 11.4468 12.2628 11.3916 12.2628H6.33889C6.28366 12.2628 6.23889 12.3076 6.23889 12.3628V17.7947C6.23889 17.8499 6.19412 17.8947 6.13889 17.8947Z" stroke="#E9BEB3" stroke-width="1.2"/>
            </svg>
            <p>{{ $t("buttonText.home") }}</p>
        </div>
        <div>
            <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.10449 3.13958H4.18855V1.11054H20.0282V12.7141H18.1151V13.7162H21.1144V0.112061H3.10449V3.13958Z" fill="#D1D1D1"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.31226 2.50146C1.03611 2.50146 0.812256 2.72532 0.812256 3.00146V15.612C0.812256 15.8882 1.03611 16.112 1.31226 16.112H18.3206C18.5968 16.112 18.8206 15.8882 18.8206 15.612V3.00146C18.8206 2.72532 18.5968 2.50146 18.3206 2.50146H1.31226ZM17.7377 3.50141H1.89489V15.1124H17.7377V3.50141Z" fill="#D1D1D1"/>
                <path d="M5.31831 8.14624L1.55908 11.8031V12.8669L5.31831 9.2509L10.3197 13.9449L13.251 12.1208L18.0701 15.3546V14.313L13.251 11.0385L10.3197 12.8669L5.31831 8.14624Z" fill="#D1D1D1"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8209 9.30687C14.0641 9.30687 15.0719 8.29126 15.0719 7.03845C15.0719 5.78563 14.0641 4.77002 12.8209 4.77002C11.5777 4.77002 10.5698 5.78563 10.5698 7.03845C10.5698 8.29126 11.5777 9.30687 12.8209 9.30687ZM12.821 8.55087C13.6498 8.55087 14.3217 7.8738 14.3217 7.03858C14.3217 6.20337 13.6498 5.5263 12.821 5.5263C11.9921 5.5263 11.3203 6.20337 11.3203 7.03858C11.3203 7.8738 11.9921 8.55087 12.821 8.55087Z" fill="#D1D1D1"/>
            </svg>
            <p>{{ $t("buttonText.gallery") }}</p>
        </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {mapActions, mapState} from 'vuex';
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({})
  },
  methods: {
    ...mapActions({
      logout: "Auth/logout",
    }),
    signOut() {
      this.logout().then(res => {
        // amplitude.getInstance().logEvent("logout");
        window.location.href = res.url;
        this.$root.$emit("send-mobile-event",{name : 'mb_user_logout_clicked'});

        // if (window.analytics) {
        //   window.analytics.track("Sign Out", {
        //     title: "Sign Out",
        //     subtitle: "mobile"
        //   },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
        // }
      });
    },
    goBack(){
      this.$root.$emit("send-mobile-event",{name : 'mb_plans_exited'});
      window.history.back();
    }
  },
}
</script>
<style lang="scss">
  .top-bar-container {
     nav {
      height: 7.5vh;
      background: white;
      display: grid;
      grid-auto-flow: column;
      place-items: center;
      padding: 0.8rem 0;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1;
      .back-btn {
        position: absolute;
        left: 2rem;
      }
      p {
        margin: 0;
      }
      .title {
        // position: absolute;
        // place-self: center;
        display: grid;
        grid-auto-flow: column;
        grid-gap: 1rem;
        p {
        font-weight: bold;
        font-size: 2.5rem;
        line-height: 2.3125rem;
        color: #0E0E0E;
        }
        .plans-title {
          font-size: 2rem;
        }
      }
      .logout {
        position: absolute;
        right: 1rem;
        display: grid;
        place-items: center;
        row-gap: 0.5rem;
        p {
          font-family: 'Ubuntu';
          font-weight: normal;
          font-size: 1rem;
          line-height: 1rem;
          color: #000000;
        }
        a {
          text-decoration: none;
          text-align: center;
        }
      }
      // .navbar {
      //   height: 2.25rem;
      //   display: flex;
      //   align-items: center;
      //   &:nth-child(1) {
      //     padding: 2rem;
      //   }
      // }
      // .mobile-menu {
      //   border-top: 0.1875rem solid #e9beb3;
      //   background: #292929;
      //   position: absolute;
      //   right: 0px;
      //   top: 100%;
      //   z-index: 100;
      //   padding: 10px 20px;
      //   div {
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //     p {
      //       margin-bottom: 0px;
      //       margin-left: 10px;
      //     }
      //   }
      // }
    }
    .bottom-nav {
      background: #201F20;
      display: grid;
      grid-auto-flow: column;
      place-items: center;
      padding: 0.8rem 0;
      position: fixed;
      width: 100%;
      bottom: 0;
      div {
        display: grid;
        justify-items: center;
        row-gap: 0.5rem;
      }
      p {
        margin: 0;
        font-style: normal;
        font-weight: 500;
        font-size: 0.9rem;
        line-height: 0.8125rem;
        color: #D1D1D1;
      }
    }
    .welcome-screen {
      // height: 100vh;
      background: #FBF3F1;
      padding: 4rem 6rem;
      .main-heading{
        font-weight: 900;
        font-family: 'Maven Pro';
        font-size: 4rem;
        line-height: 4.5rem;
        color: #0E0E0E;
      }
      .sub-heading {
        font-weight: normal;
        font-family: 'Ubuntu';
        font-size: 1.3rem;
        line-height: 1.8rem;
        color: #543E4D;
        padding-right: 10rem;
      }
      button {
        background: #0E0E0E;
        padding: 1.4rem 2.4rem;
        color: white;
        border-radius: 0.5rem;
        font-family: 'Nunito Sans';
        font-style: normal;
        font-weight: 800;
        font-size: 1rem;
        letter-spacing: 0.1rem;
        line-height: 1rem;
        color: #FBF3F1;
      }
      .video-link {
        display: grid;
        grid-template-columns: max-content 1fr;
        align-items: center;
        padding-top: 1rem;
        column-gap: 0.5rem;
        img {
          width: 2.2rem;
        }
        p {
          margin: 0;
          font-family: 'Ubuntu';
          font-style: normal;
          font-weight: 500;
          font-size: 1.15rem;
          line-height: 1rem;
          text-transform: uppercase;
          color: #222122;
        }
      }
    }
  }
</style>

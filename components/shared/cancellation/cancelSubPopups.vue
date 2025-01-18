<template>
  <section class="popups-section">
    <div class="cs-popup-container popup-div" :class="offerPopup ? 'showPopUp': ''">
      <div class="popup-container">
        <div class="close-x" @click="$parent.offerPopup = false;">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.7002 0.674072L1.2002 12.0741" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M12.8004 12.2742L1.40039 0.77417" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="main-container">
          <div class="popup-left-container">
            <div class="top">
              <img src="~assets/images/cancelsub/1.png" alt="" srcset="">
            </div>
            <div class="thumb-list">
              <img src="~assets/images/cancelsub/2.png" alt="" srcset="">
              <img src="~assets/images/cancelsub/3.png" alt="" srcset="">
              <img src="~assets/images/cancelsub/4.png" alt="" srcset="">
            </div>
          </div>
          <div class="popup-right-container">
            <div class="top-right">
              <div class="heading-container">
              <p>Neo Light Plan</p>
              <p>Plan that is crafted to your design needs</p>
            </div>
            <div class="plan-cards">
              <div class="card">
                <div class="banner">
                  <div class='shaped'></div>
                  <p>Best Value</p>
                </div>
                <div class="content">
                  <span class="duration">
                    <p>Yearly</p>
                    <p>/</p>
                    <p>SAVE 38%</p>
                  </span>
                  <span class="duration price">
                    <p>$19</p>
                    <p>/</p>
                    <p>month</p>
                  </span>
                </div>
              </div>
              <div class="card">
                <!-- <div class="banner">
                  <div class='shaped'></div>
                  <p>Best Value</p>
                </div> -->
                <div class="content">
                  <span class="duration">
                    <p>Monthly</p>
                    <!-- <p>/</p>
                    <p>SAVE 38%</p> -->
                  </span>
                  <span class="duration price">
                    <p>$19</p>
                    <p>/</p>
                    <p>month</p>
                  </span>
                </div>
              </div>
            </div>
            <div class="features-list">
              <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0371 8C16.0371 12.4183 12.4554 16 8.03711 16C3.61883 16 0.0371094 12.4183 0.0371094 8C0.0371094 3.58172 3.61883 0 8.03711 0C12.4554 0 16.0371 3.58172 16.0371 8Z" fill="white"/>
                  <path d="M6.5381 10.9995C6.4723 10.9999 6.40707 10.9873 6.34615 10.9624C6.28523 10.9375 6.22983 10.9009 6.1831 10.8545L3.68311 8.35453L4.38811 7.64953L6.5381 9.79453L11.6831 4.64453L12.3881 5.34953L6.8881 10.8495C6.79579 10.9437 6.66999 10.9976 6.5381 10.9995Z" fill="#FBB051"/>
                </svg>
                <p>Plan feature will come here</p>
              </span>
              <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0371 8C16.0371 12.4183 12.4554 16 8.03711 16C3.61883 16 0.0371094 12.4183 0.0371094 8C0.0371094 3.58172 3.61883 0 8.03711 0C12.4554 0 16.0371 3.58172 16.0371 8Z" fill="white"/>
                  <path d="M6.5381 10.9995C6.4723 10.9999 6.40707 10.9873 6.34615 10.9624C6.28523 10.9375 6.22983 10.9009 6.1831 10.8545L3.68311 8.35453L4.38811 7.64953L6.5381 9.79453L11.6831 4.64453L12.3881 5.34953L6.8881 10.8495C6.79579 10.9437 6.66999 10.9976 6.5381 10.9995Z" fill="#FBB051"/>
                </svg>
                <p>Plan feature will come here</p>
              </span>
              <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0371 8C16.0371 12.4183 12.4554 16 8.03711 16C3.61883 16 0.0371094 12.4183 0.0371094 8C0.0371094 3.58172 3.61883 0 8.03711 0C12.4554 0 16.0371 3.58172 16.0371 8Z" fill="white"/>
                  <path d="M6.5381 10.9995C6.4723 10.9999 6.40707 10.9873 6.34615 10.9624C6.28523 10.9375 6.22983 10.9009 6.1831 10.8545L3.68311 8.35453L4.38811 7.64953L6.5381 9.79453L11.6831 4.64453L12.3881 5.34953L6.8881 10.8495C6.79579 10.9437 6.66999 10.9976 6.5381 10.9995Z" fill="#FBB051"/>
                </svg>
                <p>Plan feature will come here</p>
              </span>
              <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0371 8C16.0371 12.4183 12.4554 16 8.03711 16C3.61883 16 0.0371094 12.4183 0.0371094 8C0.0371094 3.58172 3.61883 0 8.03711 0C12.4554 0 16.0371 3.58172 16.0371 8Z" fill="white"/>
                  <path d="M6.5381 10.9995C6.4723 10.9999 6.40707 10.9873 6.34615 10.9624C6.28523 10.9375 6.22983 10.9009 6.1831 10.8545L3.68311 8.35453L4.38811 7.64953L6.5381 9.79453L11.6831 4.64453L12.3881 5.34953L6.8881 10.8495C6.79579 10.9437 6.66999 10.9976 6.5381 10.9995Z" fill="#FBB051"/>
                </svg>
                <p>Plan feature will come here</p>
              </span>
              <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0371 8C16.0371 12.4183 12.4554 16 8.03711 16C3.61883 16 0.0371094 12.4183 0.0371094 8C0.0371094 3.58172 3.61883 0 8.03711 0C12.4554 0 16.0371 3.58172 16.0371 8Z" fill="white"/>
                  <path d="M6.5381 10.9995C6.4723 10.9999 6.40707 10.9873 6.34615 10.9624C6.28523 10.9375 6.22983 10.9009 6.1831 10.8545L3.68311 8.35453L4.38811 7.64953L6.5381 9.79453L11.6831 4.64453L12.3881 5.34953L6.8881 10.8495C6.79579 10.9437 6.66999 10.9976 6.5381 10.9995Z" fill="#FBB051"/>
                </svg>
                  <p>Plan feature will come here</p>
                </span>
              </div>
            </div>
            <div class="get-now-btn" @click="$parent.offerPopup=false;buySuccessPopup = true">
              <p>%</p>
              <p>Get it Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- neoliteBuy -->
    <div class="popup-div buy-success-container" :class="neoliteBuy ? 'showPopUp': ''">
      <div class="popup-container">
        <div class="top-container">
          <img src="~assets/images/cancelsub/thankyou.png">
          <p class="heading-1">Congratulations! You’ve unlocked the best deal with Neo Light</p>
          <p class="heading-2">The neo light plan will get activated automatically on <b v-if="neoLitePlanDetails[0] && neoLitePlanDetails[0].startDate">{{formattedDate(neoLitePlanDetails[0].startDate)}}</b>. Happy designing!</p>
        </div>
        <div class="bottom-container">
          <img class="bg-pattern" src="~assets/images/mobile/bg.png">
          <div class="btn">
            <button @click="onClickDone()">Done</button>
          </div>
        </div>
      </div>
    </div>
    <div class="buy-success-container cancel-success popup-div" :class="cancelSuccessPopup? 'showPopUp': ''">
      <div class="popup-container" style="width:70vw">
        <div class="top-container">
          <div class="content">
            <p class="heading">A heartfelt goodbye. We Thank you for trying out Neo!</p>
            <div class="list">
              <span class="item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#3A303A"/>
                  <path d="M7.31344 12.3745C7.23941 12.3749 7.16602 12.3607 7.09749 12.3327C7.02896 12.3047 6.96662 12.2635 6.91406 12.2113L4.10156 9.39885L4.89469 8.60572L7.31344 11.0188L13.1016 5.2251L13.8947 6.01822L7.70719 12.2057C7.60333 12.3117 7.46181 12.3724 7.31344 12.3745Z" fill="white"/>
                </svg>
                <p v-if="currentBilling && currentBilling.subscriptionExpiryDate">Your account will get cancelled on <b>{{formattedDate(currentBilling.subscriptionExpiryDate)}}</b></p>
              </span>
              <span class="item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#3A303A"/>
                  <path d="M7.31344 12.3745C7.23941 12.3749 7.16602 12.3607 7.09749 12.3327C7.02896 12.3047 6.96662 12.2635 6.91406 12.2113L4.10156 9.39885L4.89469 8.60572L7.31344 11.0188L13.1016 5.2251L13.8947 6.01822L7.70719 12.2057C7.60333 12.3117 7.46181 12.3724 7.31344 12.3745Z" fill="white"/>
                </svg>
                <p>Post cancellation date, your account will remain active for <b>30 days</b></p>
              </span>
              <span class="item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#3A303A"/>
                  <path d="M7.31344 12.3745C7.23941 12.3749 7.16602 12.3607 7.09749 12.3327C7.02896 12.3047 6.96662 12.2635 6.91406 12.2113L4.10156 9.39885L4.89469 8.60572L7.31344 11.0188L13.1016 5.2251L13.8947 6.01822L7.70719 12.2057C7.60333 12.3117 7.46181 12.3724 7.31344 12.3745Z" fill="white"/>
                </svg>
                <p>Post cancellation date, you can access your <b>projects and renders</b> for the next 30 days</p>
              </span>
            </div>
          </div>
        </div>
        <div class="bottom-container cs-cancel-bottom">
          <img class="bg-pattern" src="~assets/images/mobile/bg.png">
          <svg width="350" height="128" viewBox="0 0 358 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M116.5 -8.58307e-06V126H92.56L29.74 49.5V126H0.940001V-8.58307e-06H25.06L87.7 76.5V-8.58307e-06H116.5ZM239.191 77.94C239.191 78.3 239.011 80.82 238.651 85.5H165.391C166.711 91.5 169.831 96.24 174.751 99.72C179.671 103.2 185.791 104.94 193.111 104.94C198.151 104.94 202.591 104.22 206.431 102.78C210.391 101.22 214.051 98.82 217.411 95.58L232.351 111.78C223.231 122.22 209.911 127.44 192.391 127.44C181.471 127.44 171.811 125.34 163.411 121.14C155.011 116.82 148.531 110.88 143.971 103.32C139.411 95.76 137.131 87.18 137.131 77.58C137.131 68.1 139.351 59.58 143.791 52.02C148.351 44.34 154.531 38.4 162.331 34.2C170.251 29.88 179.071 27.72 188.791 27.72C198.271 27.72 206.851 29.76 214.531 33.84C222.211 37.92 228.211 43.8 232.531 51.48C236.971 59.04 239.191 67.86 239.191 77.94ZM188.971 48.96C182.611 48.96 177.271 50.76 172.951 54.36C168.631 57.96 165.991 62.88 165.031 69.12H212.731C211.771 63 209.131 58.14 204.811 54.54C200.491 50.82 195.211 48.96 188.971 48.96ZM303.966 127.44C293.766 127.44 284.586 125.34 276.426 121.14C268.386 116.82 262.086 110.88 257.526 103.32C252.966 95.76 250.686 87.18 250.686 77.58C250.686 67.98 252.966 59.4 257.526 51.84C262.086 44.28 268.386 38.4 276.426 34.2C284.586 29.88 293.766 27.72 303.966 27.72C314.166 27.72 323.286 29.88 331.326 34.2C339.366 38.4 345.666 44.28 350.226 51.84C354.786 59.4 357.066 67.98 357.066 77.58C357.066 87.18 354.786 95.76 350.226 103.32C345.666 110.88 339.366 116.82 331.326 121.14C323.286 125.34 314.166 127.44 303.966 127.44ZM303.966 104.4C311.166 104.4 317.046 102 321.606 97.2C326.286 92.28 328.626 85.74 328.626 77.58C328.626 69.42 326.286 62.94 321.606 58.14C317.046 53.22 311.166 50.76 303.966 50.76C296.766 50.76 290.826 53.22 286.146 58.14C281.466 62.94 279.126 69.42 279.126 77.58C279.126 85.74 281.466 92.28 286.146 97.2C290.826 102 296.766 104.4 303.966 104.4Z" fill="#3F3F3F" fill-opacity="0.1"/>
          </svg>
          <div class="btn">
            <p>You are still our valuable customer. Hope to see you again soon</p>
            <button @click="onClickDone()">Done</button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import ToBackComponent from './toBack';
import { mapState,mapActions } from "vuex";
export default {
  components: {
    ToBackComponent
  },
  props: {
    offerPopup: Boolean,
    cancelSuccessPopup: Boolean,
    neoliteBuy: Boolean
  },
  data() {
    return {
      buySuccessPopup: false,
    }
  },
  watch: {
  },
  computed: {
    ...mapState({
      neoLitePlanDetails: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "future" && item.type == "package" && (item.package.id === 'neo-light-monthly' || item.package.id === 'neo-light-yearly');
      }),
      currentBilling: state => state.Billing.currentSubscription,

    }),
    // neoLiteStartDate(){
    //   return future[0].
    // }
  },
  methods:{
    formattedDate: function(date){
      if(date){
        let newDate = new Date(date);
        let mlist = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        newDate = mlist[newDate.getMonth()]+' '+ newDate.getDate()+", "+ newDate.getFullYear();
        return newDate;
        }else {
        return 'N/A'
      }
    },
    onClickDone(){
      this.$root.$emit('refresh-billing-page')
      return this.$router.push({path:'/settings/plans'})
    }
  }
}
</script>

<style lang="scss">
.popups-section {
  p {
    font-family: Montserrat !important;
    margin: 0 !important;
  }
  .cs-popup-container {
    p {
      margin: 0;
      color: #FFFFFF;
      font-family: Montserrat;
    }
    .popup-container {
      width: 70vw;
      height: 80vh;
      padding: 0;
      .close-x {
          position: absolute;
          right: -4rem;
          top: 0rem;
          background: #000000;
          opacity: 0.4;
          padding: 1rem;
          display: grid;
          place-content: center;
          border-radius: 50%;
          cursor: pointer;
      }
      .main-container {
        display: grid;
        // grid-template-columns: 57% 1fr;
        grid-template-columns: 1fr max-content;
        height: 100%;
        column-gap: 1rem;
        background: #222021;
        .popup-left-container {
          display: grid;
          grid-template-rows: 75% 1fr;
          // width: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          .thumb-list {
            display: grid;
            grid-auto-flow: column;
            img {
              border: 4px solid white;
              border-bottom: 0;
              border-left: 0;
            }
          }
        }
        .popup-right-container {
          display: grid;
          padding: 2rem;
          .top-right {
            display: grid;
            grid-template-rows: repeat(3,max-content);
            row-gap: 1.5rem;
            .heading-container {
              display: grid;
              grid-template-rows: repeat(2,max-content);
              row-gap: 1rem;
              p {
                font-weight: 500;
                font-size: 1rem;
                line-height: 1.5rem;
                &:nth-child(1) {
                  font-weight: bold;
                  font-size: 1.35rem;
                  line-height: 1.5rem;
                }
              }
            }
            .plan-cards {
              display: grid;
              grid-template-columns: 1fr 1fr;
              column-gap: 1rem;
              margin: 1rem 0rem;
              .card {
                position: relative;
                background: #FBF3F1;
                border: 2px solid #292929;
                box-sizing: border-box;
                box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.35);
                display: grid;
                grid-template-rows: max-content 1fr;
                align-items: center;
                &:nth-child(2) {
                  background: #FFFFFF;
                  border: 1px solid #888888;
                  grid-template-rows: 1fr;
                }
                p {
                  color: #292929;
                }
                .banner {
                  position: relative;
                  .shaped {
                    background: #F1951F;
                    -webkit-clip-path: polygon(40% 0, 68% 0, 100% 41%, 100% 76%);
                    clip-path: polygon(40% 0, 68% 0, 100% 41%, 100% 76%);
                    width: 8rem;
                    height: 7rem;
                    position: absolute;
                    right: 0;
                  }
                  p {
                    position: absolute;
                    right: -7px;
                    transform: rotate(48deg);
                    top: 1.34rem;
                    color: white;
                    letter-spacing: 1px;
                    font-weight: bold;
                    font-size: 9px;
                    line-height: 16px;
                  }
                }
                .content {
                  // padding: 0 2rem;
                  padding: 2rem 2.5rem;
                  .duration {
                    display: grid;
                    grid-template-columns: repeat(3,max-content);
                    column-gap: 0.35rem;
                    align-items: center;
                    justify-content: center;
                    p {
                      font-weight: 500;
                      font-size: 0.75rem;
                      line-height: 0.9375rem;
                      font-weight: bold;
                      align-self: flex-end;
                      &:nth-child(1) {
                        font-size: 1.44rem;
                        line-height: 1.5rem;
                      }
                    }
                  }
                  .price{
                    align-content: baseline;
                    padding-top: 1.5rem;
                    p {
                      font-size: 1rem;
                      font-weight: normal;
                      &:nth-child(1) {
                        font-size: 2.5rem;
                        line-height: 2.125rem;
                        font-weight: bold;
                      }
                      &:nth-child(3) {
                        font-weight: 500;
                      }
                    }
                  }
                }
              }
            }
            .features-list {
              display: grid;
              // padding-top: 4rem;
              row-gap: 1rem;
              span {
                display: flex;
                align-items: center;
                column-gap: 1rem;
                p {
                  font-weight: 500;
                  font-size: 1rem;
                  line-height: 0.9375rem;
                }
              }
            }
          }
          .get-now-btn {
            background: #FBF3F1;
            display: grid;
            grid-template-columns: max-content max-content;
            // place-items: center;
            column-gap: 0.5rem;
            align-self: flex-end;
            padding: 0.55rem 2rem;
            justify-content: center;
            cursor: pointer;
            p{
              color: #3A393A;
              &:nth-child(1){
                background: #FBB051;
                font-size: 1rem;
                padding: 0.4rem;
                line-height: 0.75rem;
                border-radius: 50%;
              }
              font-style: normal;
              font-weight: bold;
              font-size: 1rem;
              line-height: 1.375rem;
              justify-self: flex-start;
            }
          }
        }
      }
    }
  }
  .buy-success-container {
    p {
      color: #292929;
    }
    .popup-container {
      width: 70vw;
      height: 80vh;
      padding: 0;
      display: grid;
      grid-template-rows: 1fr max-content;
      background: #FFAB40;
      .top-container {
        background: #FBF3F1;
        display: grid;
        grid-template-rows: repeat(3,max-content);
        row-gap: 1rem;
        place-items: center;
        align-content: center;
        margin-top: 0.5rem;
        img{
          width: 20rem;
        }
        // background-image: url('~assets/images/mobile/bg.png');
        // background-repeat: no-repeat;
        // // background-size: contain;
        // background-size: 13rem;
        // background-position: right;
        .heading-1 {
          font-weight: bold;
          font-size: 1.5rem;
          line-height: 2rem;
          padding-top: 3rem;
        }
        .heading-2 {
          font-weight: 500;
          font-size: 1.3rem;
          line-height: 1.5rem;
        }
      }
      .bottom-container {
        background: #222021;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        padding: 5rem;
        position: relative;
        .bg-pattern {
          position: absolute;
          top: -5rem;
          right: 0;
          width: 11rem;
        }
        .btn {
          display: grid;
          justify-content: center !important;
          button {
            font-family: Montserrat;
            background: #FBF3F1;
            padding: 0.8rem 11rem;
            font-weight: bold;
            font-size: 1rem;
            line-height: 1.175rem;
            color: #222021;
            cursor: pointer;
            &:hover {
              background: #F7E3DF;
            }
          }
        }
      }
    }
  }
  .cancel-success {
    z-index: 100000;
    .top-container {
      p {
        color: #292929;
      }
      .content {
        display: grid;
        row-gap: 4rem;
        .heading {
          font-weight: bold;
          font-size: 1.5rem;
          line-height: 1.5rem;
        }
        .list {
          display: grid;
          row-gap: 1rem;
          .item {
            display: grid;
            grid-template-columns: max-content 1fr;
            column-gap: 1rem;
            align-items: center;
            row-gap: 1rem;
            p {
              padding-top: 0 !important;
              font-style: normal !important;
              font-weight: 500;
              font-size: 1.1rem;
              line-height: 1.625rem;
            }
          }
        }
      }
    }
    .cs-cancel-bottom {
      padding: 2rem !important;
      z-index: 1;
      .bg-pattern {
        z-index: -1;
      }
      svg {
        position: absolute;
        top: -9rem;
        left: 0;
        z-index: 0;
      }
      .btn {
        justify-content: center !important;
        row-gap: 1rem;
        p {
          font-weight: 500;
          font-size: 1.1rem;
          line-height: 1.75rem;
          color: #FBF3F1;

        }
        button {
          justify-self: center !important;
          padding: 0.7rem 9rem !important;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

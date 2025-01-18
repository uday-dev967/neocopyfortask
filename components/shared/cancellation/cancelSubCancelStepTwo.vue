<template>
  <div class="cs-cancel-step-two-container">
    <div class="popup-div showPopUp">
     <div class="popup-container">
       <div class="main-container" v-if="cancelSubState && cancelSubState.analytics">
        <div class="left-container">
          <div class="renders-container">
            <carousel
              :speed = "1000"
              :per-page="1"
              :autoplay = "true"
              :autoplayTimeout = "4000"
              :navigationEnabled = "false"
              :loop = "true"
              :autoplayHoverPause = "false"
              :paginationEnabled="false">
              <slide v-for="(item,index) in totalRenders" :key="index" :index="index">
                <img
                  class="image-item"
                  :src="item"
                />
              </slide>
            </carousel>
            <!-- <img src="~assets/images/cancelsub/cancelliving.jpg" alt=""> -->
          </div>
          <p v-if="cancelSubState.analytics.rendersTaken > 0">You will lose this & {{cancelSubState.analytics.rendersTaken}} more amazing render!</p>
          <p v-else>Impress your clients with photorealistic renders</p>
        </div>
        <div class="right-container">
          <div class="right-container">
            <p class="heading-1" :class="{'heading-1-main':cancelSubState.analytics.rendersTaken > 0}" v-if="cancelSubState.analytics.rendersTaken > 0"><span>Are you sure you want to lose</span>
              <span>all your design files & renders?</span>
              <!-- {{cancelSubState.analytics}} -->
            </p>
            <p class="heading-1" v-else><span>You still have unused credits in your account.</span>
              <span>If you cancel you will lose access to them.</span>
              <!-- {{cancelSubState.analytics}} -->
            </p>
            <div class="credits">
              <span>
                <p>{{cancelSubState.analytics.rendersCredit}}</p>
                <p><span>Render</span><span>Credits</span></p>
              </span>
              <span>
                <p>{{cancelSubState.analytics.projectsCreated}}</p>
                <p><span>Projects</span><span>Created</span></p>
              </span>
              <span>
                <p>{{cancelSubState.analytics.rendersTaken}}</p>
                <p><span>Render</span><span>Taken</span></p>
              </span>
            </div>
            <!-- <input type="text" rows='5' v-model="reasonForCancel" class="heading-2"> -->
            <textarea name="reason" id='reasonfeedback' cols="30" rows="1" class="heading-2" v-model="reasonForCancel" placeholder="Please tell us what we could have done better"></textarea>
            <!-- <p ></p> -->
            <div class="devider"></div>
            <div class="no-reason-alert" v-if="noReason">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="8.0186" cy="8" rx="7.98149" ry="8" fill="#C62E24"/>
              <path d="M7.39771 10.36H8.54971V4H7.39771V10.36ZM7.97371 11.584C7.74971 11.584 7.56171 11.656 7.40971 11.8C7.26571 11.944 7.19371 12.12 7.19371 12.328C7.19371 12.536 7.26571 12.712 7.40971 12.856C7.56171 13.008 7.74971 13.084 7.97371 13.084C8.19771 13.084 8.38171 13.012 8.52571 12.868C8.67771 12.732 8.75371 12.56 8.75371 12.352C8.75371 12.136 8.67771 11.952 8.52571 11.8C8.38171 11.656 8.19771 11.584 7.97371 11.584Z" fill="white"/>
              </svg>
              <p>What you say matter to us. Please leave a feedback before you cancel.</p>
            </div>
            <div class="btn-container">
              <button @click="onClickConfirm()">Confirm Cancellation!</button>
              <p @click="changedMind()">I changed my mind</p>
            </div>
          </div>
        </div>
       </div>
     </div>
    </div>
    <ToBackComponent/>
    <CancelSubPopupsComponent :cancelSuccessPopup="cancelSuccessPopup" :offerPopup="false"/>
    <!-- <BlockingLoadingComponent/> -->
  </div>
</template>

<script>
import ToBackComponent from './toBack';
import CancelSubPopupsComponent from './cancelSubPopups';
import {mapState, mapActions} from 'vuex'
import { Carousel, Slide } from "vue-carousel";
import BlockingLoadingComponent from '../blockingLoading';

export default {
  components: {
    ToBackComponent,
    CancelSubPopupsComponent,
    BlockingLoadingComponent,
    Carousel,
    Slide
  },
  props: {
    currentBilling: Object
  },
  data() {
    return {
      cancelSuccessPopup: false,
      reasonForCancel: '',
      totalRenders: [],
      noReason:false,
    }
  },
  mounted(){
    console.log('RENDERSSSS')
    this.getCreditsInfoAPI()
    this.getRenders()
  },
  computed: {
    ...mapState({
      cancelSubState: state => state.Subscriptions.cancelSubState,
      user: state => state.User.user,
    })
  },
  watch:{
    cancelSubState(){
      if(this.cancelSubState && this.cancelSubState.analytics && this.totalRenders.length <= 0){
        this.getRenders();
      }
    },
    reasonForCancel: function(data) {
      if(data && this.noReason){
        this.noReason = false
      }
    },
  },
  methods: {
    ...mapActions({
      getCreditsInfoAPI: 'Subscriptions/getCreditsInfoAPI',
      cancelFeedBackApi: "Subscriptions/cancelFeedBack",
      cancelSubscription: "Subscriptions/cancel",
      downloadRenderAPi: 'Render/downloadRender',
    }),
    onClickConfirm(){
      if(!this.reasonForCancel || this.reasonForCancel.length <=0){
        this.noReason = true;
        return;
      }
      this.$root.$emit('show-blocking-loading', true)
      let cancelCodes = ['TOO_EXPENSIVE',
      'I_DONT_USE_IT_ENOUGH',
      'BUSINESS_AFFECTED',
      'PRODUCT_RELATED'
      ]
      let payload = {
        "data":{
          "category":cancelCodes[this.cancelSubState['cancelSubOption']],
          "feedback":this.reasonForCancel,
          "button":false,
        },
        "accountId":this.user.accountId,
        "subId":this.currentBilling.subscription
      }
      this.cancelSubscription({
        id: this.currentBilling.subscription,
        accountId: this.user.accountId
      }).then(cancelResponse => {
        if(cancelResponse){
          this.cancelFeedBackApi(payload).then(feedbackResponse =>{
            this.$root.$emit('show-blocking-loading', false)
            this.cancelSuccessPopup =true;
            if (window.analytics) {
              window.analytics.track('confirm_cancellation_button', {
                name: 'Confirm cancellation clicked',
                flow: "Cancellation"
              },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
            }
          })
        }
      })
    },
    changedMind(){
      if (window.analytics) {
        window.analytics.track('ichangedmymind_clicked', {
          name: 'i changed my mind clicked',
          flow: "Cancellation"
        },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
      }
      this.$router.push({path:'/settings/plans'})
    },
    async getRenders(){
      this.totalRenders = [];
      if(this.cancelSubState && this.cancelSubState.analytics && this.cancelSubState.analytics.renderImages.data){
        if (this.cancelSubState.analytics.renderImages.defaultRenders){
          this.totalRenders = this.cancelSubState.analytics.renderImages.data;
        }else {
          for(let i = 0; i < this.cancelSubState.analytics.renderImages.data.length; i++){
            this.downloadRenderAPi({uri:this.cancelSubState.analytics.renderImages.data[i]}).then((apiResponse)=> {
              console.log('API RESPONSE FOR RENDERS SIGNED', apiResponse)
               if(apiResponse && apiResponse.url){
                this.totalRenders.push(apiResponse.url)
              }
              else
                this.totalRenders.push(this.cancelSubState.analytics.renderImages.data[i])
            })
            // const response = await this.downloadRenderAPi({uri:this.cancelSubState.analytics.renderImages.data[i]})
            //   if(response && response.url){
            //     this.totalRenders.push(response.url)
            //   }
            //   else
            //     this.totalRenders.push(this.cancelSubState.analytics.renderImages.data[i])
          }
        }
      }
      // return totalRenders;
    }
  }
}
</script>

<style lang="scss">
  .cs-cancel-step-two-container {
    width: 100%;
    height: 100%;
    background-image: url("~assets/images/cancelsub/cancelbg.jpg");
    background-size: contain;
    // background: rgba(0, 0, 0, 0.75);
    p {
      color: #FFFFFF;
      font-family: Maven Pro;
      margin: 0;
    }
    .popup-div {
      background: rgba(0, 0, 0, 0.75) !important;
      .popup-container {
        width: 80vw;
        height: 80vh;
        padding: 0;
        background: transparent;
        .main-container {
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 5rem;
          place-content: center;
          .left-container {
            display: grid;
            grid-template-rows: max-content max-content;
            row-gap: 2rem;
            .renders-container {
              img {
                width: 100%;
                height: 35rem;
                object-fit: cover;
              }
            }
            p {
              font-weight: 500;
              font-size: 1.5rem;
              line-height: 1.75rem;
            }
          }
          .right-container {
            display: grid;
            .heading-1 {
              padding-bottom: 3rem;
              span {
                font-weight: 900;
                font-size: 1.7rem;
                line-height: 2.5rem;
                &::after {
                  content: '\A';
                  white-space: pre;
                }
              }
            }
            .heading-1-main {
              span {
                font-size: 2.3rem;
                line-height: 3.2rem;
              }
            }
            .credits {
              display: grid;
              grid-template-columns: repeat(3,1fr);
              column-gap: 5rem;
              padding-bottom: 6rem;
              span {
                display: grid;
                grid-template-rows: max-content max-content;
                p {
                  &:nth-child(1) {
                    font-weight: 900;
                    font-size: 5.8rem;
                    // line-height: 7.3125rem;
                  }
                  span {
                  font-weight: 500;
                  font-size: 1.5rem;
                  line-height: 0.9rem;
                    &::after{
                      content: '\A';
                      white-space: pre;
                    }
                  }
                }
              }
            }
            .heading-2{
              font-family: Maven Pro;
              font-weight: 500;
              font-size: 1.125rem;
              // line-height: 3.125rem;
              align-self: self-end;
              background: none;
              color: white;
              border: none;
              padding: 1rem 0;
              scrollbar-color: white;
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
              background: white;
              // border-radius: 10px;
            }
            ::-webkit-scrollbar {
                width: 0.1rem;
              }
            ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
              color: white;
            }
            .devider {
              height: 0.12rem;
              background: white;
              margin-right: 2rem;
              width: 100%;
              margin-bottom: 1rem;
            }
            .no-reason-alert {
              display: flex;
              column-gap: 0.5rem;
              align-items: center;
              background: #FFFFFF;
              padding: 0.5rem 1rem;
              svg {
                height: 1.2rem;
                width: 1.2rem;
              }
              p {
                font-family: Montserrat;
                font-weight: 600;
                font-size: 1rem;
                line-height: 1rem;
                color: #292929;
              }
            }
            .btn-container {
              display: grid;
              grid-template-columns: 1fr max-content;
              align-content: center;
              column-gap: 5rem;
              padding-top: 1rem;
              cursor: pointer;
              button {
                background: #FFAB40;
                &:hover {
                  background: #F7900C;
                }
                font-family: Maven Pro;
                font-weight: bold;
                font-size: 1.25rem;
                line-height: 1.4375rem;
                padding: 1rem;
               cursor: pointer;
              }
              p {
                font-weight: bold;
                font-size: 1.25rem;
                line-height: 1.4375rem;
                text-decoration-line: underline;
                align-self: center;
                justify-self: end;
                &:hover {
                  color: #F7E3DF;
                }
              }
            }
          }
        }
      }
    }
    .to-back {
      svg {
        path{
          fill: white;
        }
      }
    }
  }
</style>

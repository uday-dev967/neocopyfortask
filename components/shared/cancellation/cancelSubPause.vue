<template>
  <div class="cs-pause-container">
    <div class="left-container">
      <img src="~assets/images/cancelsub/cspause.png" alt="">
      <div class="left-sub-heading">
        <span>Enjoy unlimited access</span>
        <span>to Neo at no extra cost</span>
        <span>for next <span>60 days</span></span>
      </div>
    </div>
    <div class="right-container">
      <p class="heading">Congratulations!</p>
      <div class="list">
        <p><span>01.</span>Continue to use your existing render credits</p>
        <p><span>02.</span>You will not be charged for the next two months</p>
        <p><span>03.</span>Billing will resume on {{getTextDate(cancelSubState.pauseApi.resume_date)}}</p>
        <p><span>04.</span>You can un-pause at any time</p>
      </div>
      <div class="btn-container">
        <span>
          <button @click="onClickDone()">Done</button>
          <p>Paused untill {{getTextDate(cancelSubState.pauseApi.pause_until_date)}}</p>
        </span>
        <!-- <p class="underline-text">Un-pause clicked in a hurry!</p> -->
      </div>
    </div>
    <BlockingLoadingComponent/>
    <!-- <ToBackComponent/> -->
  </div>
</template>

<script>
import ToBackComponent from './toBack';
import BlockingLoadingComponent from '../blockingLoading';
import {mapState, mapActions} from 'vuex';
export default {
  components: {
    ToBackComponent,
    BlockingLoadingComponent,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      cancelSubState: state => state.Subscriptions.cancelSubState,
      currentBilling: state => state.Billing.currentSubscription,
      user: state => state.User.user,
    }),
  },
  methods: {
    ...mapActions({
      cancelSubPlanOffersAPI: 'Subscriptions/cancelSubPlanOffersAPI',
      fetchCurrentSubscription:'Billing/fetchCurrentSub',
    }),
    getTextDate (date) {
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
      newDate = mlist[newDate.getMonth()] +' '+ newDate.getDate()+", "+ newDate.getFullYear();
      return newDate;
    },
    onClickDone(){
      this.cancelSubPlanOffersAPI({subId: this.currentBilling.subscription}).then((apiResponse)=>{
        if(apiResponse){
          this.fetchCurrentSubscription({accountId: this.user.accountId}).then((response)=> {
            this.$router.push({path:'/settings/plans'})
          })
        }
      })
    }
  },
}
</script>

<style lang="scss">
  .cs-pause-container {
    width: 100%;
    height: 100%;
    display: grid;
    // padding: 10rem 0 10rem 20rem;
    // padding-right: 0;
    grid-template-columns: max-content max-content;
    align-content: center;
    justify-content: space-evenly;
    p,span{
      font-family: Maven Pro;
      color: #3A393A;
      margin: 0;
    }
    .left-container {
      display: grid;
      grid-template-rows: max-content max-content;
      row-gap: 4rem;
      align-content: center;
      justify-items: center;
      padding-left: 3rem;
      img{
        width: 28rem;
      }
      .left-sub-heading {
        span {
          font-weight: 500;
          font-size: 1.8rem;
          line-height: 2.5rem;
          color: #292929;
          &::after{
            content: '\A';
            white-space: pre;
          }
          span{
            font-size: 1.4rem;
            font-weight: bold;
            color: #f0c9c0;
            background: #3A393A;
          }
        }
      }
    }
    .right-container {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      row-gap: 5rem;
      margin-right: 10rem;
      p {
        span {
          &::after{
            content: '\A';
            white-space: pre;
          }
        }
      }
      .heading {
        font-weight: 900;
        font-size: 3.5rem;
        line-height: 1.8rem;
        align-self: flex-end;
      }
      .list {
        display: grid;
        grid-auto-flow: row;
        row-gap: 1rem;
        p {
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 1rem;
          font-family: Montserrat;
          font-style: italic;
          font-weight: 600;
          font-size: 1.3rem;
          // line-height: 1.8125rem;
          span {
            font-weight: 600;
            font-size: 1.4rem;
            color: #787878;
          }
        }
      }
   .btn-container {
      display: grid;
      row-gap: 2rem;
      grid-template-rows: max-content max-content;
      margin-top: 1rem;
      button {
        font-size: 2rem;
        line-height: 3rem;
        padding: 1.2rem 8.6rem;
        font-family: Maven Pro;
        font-weight: bold;
        background: #FFAB40;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        height: 100%;
        &:hover {
          background: #F7900C;
        }
      }
      .underline-text {
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 2rem;
        text-decoration-line: underline;
        color: #292929;
      }
      span{
        display: flex;
        p {
          background: #3A393A;
          font-size: 2rem;
          line-height: 3rem;
          padding: 1.2rem 3rem;
          color: #FFFFFF;
          flex: 1;
          margin-right: -40vw;
          // padding: 1.7rem;
          // align-self: center;
        }
      }
    }
  }
}
</style>

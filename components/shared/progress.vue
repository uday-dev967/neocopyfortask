<template>
    <div class="statics-container">
          <div class="statics-graph" >
              <img src="~assets/images/cost.svg" alt="" class="cost-icon">
            <p class="head-container">Credits per cycle : {{subUsage?subUsage.totalCreditsPerCycle:''}}</p>
            <div class="progress-bar-container">
              <div>
                <svg class="progress-ring" viewBox="0 0 100 100">
                  <defs>
                    <clipPath id="cut-off-bottom">
                      <rect x="0" y="0" width="100%" height="50%"></rect>
                    </clipPath>
                  </defs>
                  <circle
                    clip-path="url(#cut-off-bottom)"
                    stroke="white"
                    stroke-width="10"
                    fill="transparent"
                    r="45%"
                    cx="50%"
                    cy="50%"
                  ></circle>
                  <circle
                    ref="progressBar"
                    class="progress-ring__circle"
                    stroke="#D48E8E"
                    stroke-width="10"
                    fill="transparent"
                    r="45%"
                    cx="50%"
                    cy="50%"
                  ></circle>
                </svg>
              </div>
              <div class="progress-details" :style="{'justify-content':subUsage && overUsage == 0?'space-between':'center'}">
                  <div v-if="subUsage && overUsage == 0" >
                      <p>{{totalUsage}}</p>
                      <p>used</p>
                  </div>
                  <div >
                      <p v-if="subUsage">{{overUsage == 0?subUsage.totalCreditsPerCycle - totalUsage:overUsage}}</p>
                      <p>{{subUsage && overUsage?'Over Use':'Available'}}</p>
                  </div>
              </div>
            </div>
          </div>
          <div v-if="subUsage" class="statics-details">
            <div class="head-container">
                <img src="~assets/images/pie.svg" alt="">
              <p>Credit Usage Breakdown</p>
            </div>
            <div  v-for="service in subUsage.serviceList">
              <p>{{service.service.name}}</p>
              <span>{{service.serviceOverAllUsage}}</span>
            </div>
            <div class="total-credits">
              <p>Total</p>
              <span>{{totalUsage}} Credits</span>
            </div>
          </div>
        </div>
</template>
<script>
import {mapState, mapActions} from "vuex";
export default {
  watch: {
        subUsage : function(data) {
            if(data) {
              let percentage = (this.totalUsage/data.totalCreditsPerCycle)*100
              if(percentage>100)
                percentage = 100;
              this.setProgress(percentage/2);
            }
        }
    },
  mounted(){
    // console.log('PROGRESS CALLED')
    if(this.subUsage){
      let percentage = (this.totalUsage/this.subUsage.totalCreditsPerCycle)*100
      if(percentage>100)
        percentage = 100;
      this.setProgress(percentage/2);
    }
  },
  computed:{
    ...mapState({
      subUsage: state => state.Billing.subscriptionUsage
    }),
    totalUsage: function(){
      return this.subUsage.serviceList.reduce((a,b)=>{
        return a+b.serviceOverAllUsage},0)
    },
    overUsage: function(){
      return this.subUsage.serviceList.reduce((a,b)=>{
        console.log(a,b.serviceOverUsage)
        return a + b.serviceOverUsage},0)
    }
  },
  methods :{
      setProgress: function(percent) {
      console.dir(this.$refs.progressBar.r.baseVal.value);
      const circle = this.$refs.progressBar;
      const radius = this.$refs.progressBar.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
    
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }
  }
}
</script>
<style lang="scss" scoped>
.statics-container {
    color: #fff;

    .statics-graph {
      background: #201f20;
      position: relative;
      padding: 2.1875rem 2.8125rem;
    height: 15.625rem;
    overflow: hidden;
        img{
            position: absolute;
            left: 0.9375rem;
        }
    }
    .statics-details {
      background: #292929;
      padding-top: 1rem;
      p {
        font-size: 0.875rem;
        font-weight: 500;
        margin: 1.25rem 0rem;
      }
      div {
        display: flex;
        padding-left: 2.8125rem;
        margin-right: 1rem;
        align-items: center;
        justify-content: space-between;
      }
      span {
        color: #e9beb3;
        font-weight: 500;
      }
      .total-credits {
        border-top: 0.0625rem solid #ffffff;
        padding-bottom: 0.3125rem;
        padding: 0rem;
        margin-left: 2.8125rem;
      }
      .head-container {
          position: relative;
          img{
              position: absolute;
              left: 1rem;
              top: 50%;
          }
        p {
          margin-bottom: 0rem;
        }
      }
    }
    
.progress-ring__circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-180deg);
  transform-origin: 50% 50%;
}
.progress-bar-container {
  position: relative;
}
.progress-details {
    position: absolute;
    top: 35%;
    left: 20%;
    right: 20%;
    display: flex;
    justify-content: space-between;
    p{
        margin: 0rem;
        font-size: 0.875rem;
        text-align: center;
    }
}
  }
</style>

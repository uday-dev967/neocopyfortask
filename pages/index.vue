<template>
  <section class="container">
    <div class="overlay-div">
      <div class="overlay-container">
        <div class="overlay-main" v-if="signIn || logIn">
          <h1 v-if="signIn">SignUp</h1>
          <h1 v-if="logIn">Log In</h1>
          <div class="input-fields-container">
            <input autocomplete="off" type="text" name="" placeholder="Email" id="email">
            <input autocomplete="off" type="password" name="" placeholder="Password" id="password">
            <p v-if="logIn" class="small-font is-justify-end"><span>Forget Password?</span></p>
          </div>
          <p class="">or</p>
          <div class="">
            <img src="~assets/images/google.svg" alt="">
          </div>
          <p class="small-font">Already a Member? <span v-if="signIn">Sign In</span><span v-if="logIn">Log In</span></p>
        </div>
        <div v-if="proceed" class="overlay-main tell-us-more-div">
          <h1>Tell Us More</h1>
          <div class="input-fields-container">
            <input autocomplete="off" type="text" name="" placeholder="Your Name" id="name">
            <select name="" id="">
              <option value="">What do you Do?</option>
              <option value="">Interior Design</option>
              <option value="">Space Planner</option>
              <option value="">Architect</option>
              <option value="">Real Estate Agent</option>
            </select>
            <select name="" id="">
              <option value="">Country</option>
              <option value="">India</option>
              <option value="">India</option>
              <option value="">India</option>
            </select>
          </div>
        </div>
        <div class="overlay-main plans-container" v-if="choosePlan">
          <h1>Choose your Plan</h1>
          <div class="plans-grid-container">
            <div class="grid-parts">
              <p class="plan-time">7 days</p>
              <h2 class="plan-costing">Free Trial</h2>
              <div class="plan-features">
                <p>Top 5 feature</p>
                <p>Quick Render</p>
                <p>No card details</p>
                <p>Unlimited Functionality</p>
              </div>
              <button class="plan-know-more">Know more
                <svg width="6" height="9" viewBox="0 0 6 9" style="margin-left:0.625rem;" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.85082 4.38555L1.37463 1.01865C1.24871 0.896737 1.07793 0.828246 0.899848 0.828246C0.721769 0.828246 0.550983 0.896737 0.425062 1.01865C0.299141 1.14056 0.2284 1.30591 0.2284 1.47833C0.2284 1.65074 0.299141 1.81609 0.425062 1.938L3.42855 4.84455L0.426457 7.75111C0.36353 7.81116 0.313561 7.88272 0.279454 7.96163C0.245347 8.04055 0.227783 8.12524 0.227783 8.21078C0.227783 8.29633 0.245347 8.38102 0.279454 8.45993C0.313561 8.53885 0.36353 8.61041 0.426457 8.67046C0.551892 8.79316 0.722245 8.86301 0.900545 8.86486C0.989152 8.86592 1.07702 8.84919 1.15862 8.81573C1.24022 8.78228 1.31377 8.73281 1.37463 8.67046L4.85082 5.3049C4.91374 5.24485 4.96371 5.17329 4.99782 5.09438C5.03193 5.01546 5.04949 4.93077 5.04949 4.84523C5.04949 4.75968 5.03193 4.67499 4.99782 4.59608C4.96371 4.51717 4.91374 4.4456 4.85082 4.38555Z" fill="#D48E8E"/>
                </svg>
              </button>
            </div>
            <div class="grid-parts">
              <p class="plan-time">7 days</p>
              <h2 class="plan-costing">Free Trial</h2>
              <div class="plan-features">
                <p>Top 5 feature</p>
                <p>Quick Render</p>
                <p>No card details</p>
                <p>Unlimited Functionality</p>
              </div>
              <button class="plan-know-more">Know more
                <svg width="6" height="9" viewBox="0 0 6 9" style="margin-left:0.625rem;" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.85082 4.38555L1.37463 1.01865C1.24871 0.896737 1.07793 0.828246 0.899848 0.828246C0.721769 0.828246 0.550983 0.896737 0.425062 1.01865C0.299141 1.14056 0.2284 1.30591 0.2284 1.47833C0.2284 1.65074 0.299141 1.81609 0.425062 1.938L3.42855 4.84455L0.426457 7.75111C0.36353 7.81116 0.313561 7.88272 0.279454 7.96163C0.245347 8.04055 0.227783 8.12524 0.227783 8.21078C0.227783 8.29633 0.245347 8.38102 0.279454 8.45993C0.313561 8.53885 0.36353 8.61041 0.426457 8.67046C0.551892 8.79316 0.722245 8.86301 0.900545 8.86486C0.989152 8.86592 1.07702 8.84919 1.15862 8.81573C1.24022 8.78228 1.31377 8.73281 1.37463 8.67046L4.85082 5.3049C4.91374 5.24485 4.96371 5.17329 4.99782 5.09438C5.03193 5.01546 5.04949 4.93077 5.04949 4.84523C5.04949 4.75968 5.03193 4.67499 4.99782 4.59608C4.96371 4.51717 4.91374 4.4456 4.85082 4.38555Z" fill="#D48E8E"/>
                </svg>
              </button>
            </div>
            <div class="grid-parts">
              <p class="plan-time">7 days</p>
              <h2 class="plan-costing">Free Trial</h2>
              <div class="plan-features">
                <p>Top 5 feature</p>
                <p>Quick Render</p>
                <p>No card details</p>
                <p>Unlimited Functionality</p>
              </div>
              <button class="plan-know-more">Know more
                <svg width="6" height="9" viewBox="0 0 6 9" style="margin-left:0.625rem;" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.85082 4.38555L1.37463 1.01865C1.24871 0.896737 1.07793 0.828246 0.899848 0.828246C0.721769 0.828246 0.550983 0.896737 0.425062 1.01865C0.299141 1.14056 0.2284 1.30591 0.2284 1.47833C0.2284 1.65074 0.299141 1.81609 0.425062 1.938L3.42855 4.84455L0.426457 7.75111C0.36353 7.81116 0.313561 7.88272 0.279454 7.96163C0.245347 8.04055 0.227783 8.12524 0.227783 8.21078C0.227783 8.29633 0.245347 8.38102 0.279454 8.45993C0.313561 8.53885 0.36353 8.61041 0.426457 8.67046C0.551892 8.79316 0.722245 8.86301 0.900545 8.86486C0.989152 8.86592 1.07702 8.84919 1.15862 8.81573C1.24022 8.78228 1.31377 8.73281 1.37463 8.67046L4.85082 5.3049C4.91374 5.24485 4.96371 5.17329 4.99782 5.09438C5.03193 5.01546 5.04949 4.93077 5.04949 4.84523C5.04949 4.75968 5.03193 4.67499 4.99782 4.59608C4.96371 4.51717 4.91374 4.4456 4.85082 4.38555Z" fill="#D48E8E"/>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <button class="neo-proceed" @click="proceed(logIn)">Proceed
              <svg width="7" height="12" viewBox="0 0 7 12" style="margin-left:0.9375rem;" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6.07814 5.23178C6.55789 5.63157 6.55789 6.36843 6.07813 6.76822L1 11" stroke="#E9BEB3"/>
              </svg>
            </button>
          </div>
        </div>
        <div v-if="signIn || logIn" class="overlay-footer">
          <button class="neo-cancel" >Cancel</button>
          <button class="neo-submit" @click="submit(logIn)">SUBMIT
            <svg width="7" height="12" viewBox="0 0 7 12" style="margin-left:0.9375rem;" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6.07814 5.23178C6.55789 5.63157 6.55789 6.36843 6.07813 6.76822L1 11" stroke="#E9BEB3"/>
            </svg>
          </button>
        </div>
        <div v-if="proceed" class="overlay-footer">
          <button class="neo-cancel" >Cancel</button>
          <button class="neo-submit" @click="proceed(logIn)">Proceed
            <svg width="7" height="12" viewBox="0 0 7 12" style="margin-left:0.9375rem;" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6.07814 5.23178C6.55789 5.63157 6.55789 6.36843 6.07813 6.76822L1 11" stroke="#E9BEB3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import Logo from '~/components/Logo.vue'

export default {
  middleware: ['iframeDash','toLogin'],
  layout:'main',
  data(){
    return{
      logIn: true,
      signIn:false,
      proceed:false,
      choosePlan:false
    }
  },
  mounted() {
    // var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    //   (function(){
    //   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    //   s1.async=true;
    //   s1.src='https://embed.tawk.to/5c61a7046cb1ff3c14cc0211/default';
    //   s1.charset='UTF-8';
    //   s1.setAttribute('crossorigin','*');
    //   s0.parentNode.insertBefore(s1,s0);
    //   })();
  },
  methods:{
    submit(logIn){
      if(logIn){
        this.logIn = false;
        this.signIn=true;
      }else{
        this.logIn = true;
        this.signIn = false;
      }
    }
  }
}
</script>



<style lang="scss" scoped>
.tell-us-more-div{
  margin-bottom: 4.375rem;
}
p{
  margin-bottom: 0rem;
}
.container{
  position: relative;
}
.overlay-div{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.is-justify-end{
  justify-self: end;
}
.overlay-container{
  background: $background-1 url('~assets/images/Group.png');
  background-position: -1.25rem 2rem;
  /* background-size: contain; */
  background-repeat: no-repeat;
  width: max-content;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .overlay-main{
    justify-items: center;
    display: grid;
    grid-row-gap: 0.875rem;
    padding: 2.5rem 1.25rem 1.875rem 1.25rem;
  }
  .small-font{
    font-size: 0.75rem;
    span{
      color: $color-second;
    }
  }
  h1{
    color: $color-head;
  }
  .input-fields-container{
    display: grid;
    display: -ms-grid;
    grid-gap: 0.9375rem;
    input{
      width:	18.75rem;
    }
  }
  .overlay-footer{
    display: grid;
    /* margin: 0rem 2.5rem; */
    grid-template-columns: auto auto;
    grid-gap: 11.25rem;
    /* justify-self: stretch; */
    padding: 0.625rem 3.125rem 2.5rem 3.125rem;
    button{
      @include button-head(false);
      margin-right: 0rem;
    }
    button:focus{
      outline: none;
    }
  }
}
.plans-grid-container{
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 1.375rem;
  .grid-parts{
    padding: 1.875rem 3.125rem;
    border: 0.05rem solid #F7E3DF;
    text-align: center;
  }
  .plan-time {
    color: #C4C4C4;
    font-size: 0.75rem;
    margin-bottom: 0.625rem;
    text-align: center;
  }
  .plan-costing {
    font-size: 1.3125rem;
    color: #A7DDE3;
    margin-bottom: 1.25rem;
    text-align: center;
  }
  .plan-features p{
    font-size: 0.8125rem;
    text-align: center;
    color: #ffffff;
    line-height: 1.5rem;
  }
  .plan-features{
    margin-bottom: 2.5rem;
  }
  button.plan-know-more {
    color: white;
    font-size: 0.625rem;
    text-transform: uppercase;
   }
}
.neo-proceed{
  color: #fff;
  font-size: 0.9375rem;
}
.overlay-container .plans-container{
  padding: 2.5rem 3.5rem 1.875rem 3.5rem;
}
</style>

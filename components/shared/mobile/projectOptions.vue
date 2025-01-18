<template>
  <div class="options-main-container" @click.prevent="$parent.isOptionsShow = false">
    <div class="safariAlignment" @click.stop>
      <!-- <img src="~assets/images/mobile/bg.png" alt="" srcset=""> -->
      <p @click="onClickAction('open', 'mb_project_open_clicked')">{{ $t("buttonText.open") }}</p>
      <!-- <p @click="onClickAction()">Clone</p> -->
      <!-- <p @click="onClickAction('share')">Share</p> -->
      <p @click="onClickAction('rename','mb_project_rename_clicked')" :class="($parent.currentProject && $parent.currentProject.isTemplate) ? 'disabledBtn': ''">{{ $t("buttonText.rename") }}</p>
      <!-- <p @click="onClickAction()">Delete</p> -->
    </div>
    <loginViaDesktopComponent :desktopAlert="desktopAlert"/>
  </div>
</template>
<script>
import loginViaDesktopComponent from '@/components/shared/mobile/loginViaDesktop';
export default {
  components: {
    loginViaDesktopComponent
  },
  props: {
    // isOptionsShow: Boolean,
    desktopAlert: Boolean
  },
  methods: {
    onClickAction: function(_type, _event){
      if(_type === 'open'){
        this.$parent.isOptionsShow = false;
        this.$parent.desktopAlert = true;
      }
      else if(_type === 'rename')
      {
        if(this.$parent.currentProject && this.$parent.currentProject.isTemplate) 
        return;
        else {
          this.$parent.isOptionsShow = false;
          this.$parent.isRename = true; 
        }
      }
      this.$root.$emit("send-mobile-event",{name : _event, projectName: this.$parent.currentProject});
    }
  },
}
</script>
<style lang="scss">
  .options-main-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.75);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    div {
      position: absolute;
      bottom: 13vh;
      width: 100vw;
      height: 20vh;
      background: #FBF3F1;
      display: grid;
      grid-template-rows: repeat(2,1fr);
      padding:2rem;
      animation: openOptions 0.2s ease-in;
      // row-gap: 1rem;
      align-content: space-around;
      background-image: url('~assets/images/mobile/bg.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: right;
      // img {
      //   position: absolute;
      //   width: 12rem !important;
      //   // height: 17rem !important;
      //   right: 0;
      //   bottom: 0;
      //   z-index: 0;
      // }
      p {
        z-index: 1;
        font-size: 1.5rem !important;
        color: #292929;
      }
    }
  }
  .closeAnimation {
    animation: closeOptions 0.5s ease-out;
  }
  @keyframes openOptions {
    from {bottom: -50rem;}
    to {bottom: 0rem;}
  }
  @keyframes closeOptions {
    from {bottom: 0rem;}
    to {bottom: -50rem;}
  }
.disabledBtn {
  // cursor: not-allowed !important;
  // animation: none;
  // &::before,&::after {
  //   animation: none;
  // }
  color: #808080b8 !important;
}
/* Safari 10.1+ */

@media not all and (min-resolution:.001dpcm) { 
  .safariAlignment { 
    bottom: 20vh !important;   
  }
}
</style>
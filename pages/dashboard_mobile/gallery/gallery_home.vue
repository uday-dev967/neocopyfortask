<template>
  <div class="gallery-home-container">
     <!-- v-if="primaryProjectData.renders && primaryProjectData.renders[0].extraInfo.thumbnail" -->
    <img :src="primaryHdImage" alt="">
    <!-- <p class="total-renders">{{(primaryProjectData && primaryProjectData.rendersData && primaryProjectData.count)? primaryProjectData.count: ''}} renders created</p> -->
    <p class="total-renders" v-if="primaryProjectData && primaryProjectData.renders">{{(primaryProjectData && primaryProjectData.name) ? primaryProjectData.name: 'Bohemian Living Room'}}</p>
      <div class="gallery-carousel" v-if="primaryProjectData.renders && primaryProjectData.renders.length > 0">
        <div class="card" v-for="(item,index) in primaryProjectData.renders" :key="index">
          <img @click="isImageView = true; currentIndex = index" :src="item.extraInfo.thumbnail" alt="">
        </div>
          <!-- <img src="~assets/images/mobile/gallery/1.png" alt="">
          <img src="~assets/images/mobile/gallery/home.png" alt=""> -->
      </div>
    <!-- <p class="sub-text-one">Click on the thumbnail for preview</p> -->
    <p class="no-renders-msg" v-if="Object.keys(mobileRenders).length <= 0">{{ $t("dashboard.youHaveNotTakeAnyRenders") }}</p>
    <p class="sub-text-two" v-if="primaryProjectData && primaryProjectData.renders">{{ $t("dashboard.takePhotorealisticText") }}</p>
    <p class="sub-text-two" v-if="primaryProjectData && primaryProjectData.renders">{{ $t("dashboard.wowYourClients") }}</p>
    <button class="mobile-basic-btn" v-if="primaryProjectData && primaryProjectData.renders" @click="galleryRenderClicked('mb_gallery_take_render_clicked')">{{ $t("buttonText.takeARenderCap") }}</button>
    <GalleryCarouselComponent v-if="primaryProjectData && primaryProjectData.name && primaryProjectData.renders" :isImageView="isImageView" :currentIndex="currentIndex" :imageData="primaryProjectData.renders" :projectName="primaryProjectData.name"/>
    <loginViaDesktopComponent :desktopAlert="desktopAlert"/>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
import ProjectOptionsComponent from '@/components/shared/mobile/projectOptions';
import GalleryCarouselComponent from '@/components/shared/mobile/galleryCarousel';
import loginViaDesktopComponent from '@/components/shared/mobile/loginViaDesktop';

export default {
  components: {
    ProjectOptionsComponent,
    GalleryCarouselComponent,
    loginViaDesktopComponent
  },
  data() {
    return {
      isImageView: false,
      isOptionsShow: false,
      currentIndex: 0,
      desktopAlert: false,
      hdImg: '',
      primaryProjectData: {},
    }
  },
  mounted() {
    if(Object.keys(this.mobileProjects).length <= 0) {
      this.fetchSampleProjects()};
  },
  computed: {
    ...mapState({
      mobileProjects: state => state.Projects.mobileSampleProjects,
      mobileRenders: state => state.Projects.mobileRenders,
    }),
    primaryHdImage(){
      for(let item in this.mobileRenders) {
        if(this.mobileRenders[item].isPrimary){
          this.primaryProjectData = this.mobileRenders[item];
          // return;
        }
      }
      if(this.primaryProjectData && this.primaryProjectData.renders && this.primaryProjectData.renders.length > 0){
        this.downloadRenderAPi({uri:this.primaryProjectData.renders[0].output["1"][0]}).then((response)=> {
          if(response)
            this.hdImg = response.url;
          else
            this.hdImg = this.primaryProjectData.renders[0].extraInfo.thumbnail;
        })
        return this.hdImg;
      }else
        return this.hdImg;
    }

  },
  methods: {
    ...mapActions({
      fetchSampleProjects: "Projects/fetchMobileSampleProjects",
      downloadRenderAPi: 'Render/downloadRender',
    }),
    galleryRenderClicked(_event){
      this.desktopAlert = true
      this.$root.$emit("send-mobile-event",{name : _event});
    }
  },
}
</script>
<style lang="scss">
.gallery-home-container {
  display:grid;
  p {
    margin: 0;
    font-family: 'Ubuntu';
  }
  background: #F5F5F7;
  img:nth-child(1){
    width: 100%;
    object-fit: fill;
  }
  .total-renders{
    font-family: Ubuntu;
    padding: 2rem 0;
    font-weight: normal;
    font-size: 2rem;
    line-height: 2.375rem;
    text-align: center;
    color: #000000;
  }
  .gallery-carousel {
    display: grid;
    grid-auto-flow: column;
    max-width: 100vw;
    overflow-x: scroll;
    padding-bottom: 2rem;
    img {
      width: 15rem;
      height:12rem;
      // padding: 0.3rem;
    }
    .card {
      display: grid;
      grid-template-rows: max-content 1fr;
      padding: 0.2rem;
      // width: 14.5rem;
      span {
        display: grid;
        grid-template-columns: 1fr max-content;
        justify-content: space-between;
        align-items: center;
        background: #FBF3F1;
        padding: 1rem 0.2rem;
        p {
          font-size: 1.25rem;
          margin: 0;
        }
        svg {
          margin: 0.5rem;
        }
      }
    }
  }
  .sub-text-one {
    font-size: 1.2rem;
    line-height: 4rem;
    text-align: right;
    color: #292929;
  }
  .sub-text-two {
    font-size: 1.6rem;
    line-height: 2rem;
    text-align: center;
    color: #292929;
  }
  button {
    font-family: 'Nunito Sans';
    text-align: center;
    margin: 2rem 0rem !important;
    width:unset;
    padding: 1.4rem 2.4rem;
  }
  .no-renders-msg {
    position: absolute;
    font-size: 2rem;
    color: black;
    top: 50%;
    left: 15%;
  }
}
</style>

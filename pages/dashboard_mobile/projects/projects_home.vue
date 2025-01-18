<template>
  <div class="project-home-container" v-if="primaryProjectData && primaryProjectData.name">
    <div class="image-section">
      <p class="tour-btn" @click="clickActions('tour', 'mb_tour_projects_clicked')">{{ $t("buttonText.takeTheTour") }}</p>
      <!-- <svg @click="openTour = true" width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle opacity="0.25" cx="18.0085" cy="18.0007" r="16.875" fill="#222021"/>
      <path d="M18.009 1.2C27.2726 1.2 34.809 8.7364 34.809 18C34.809 27.2636 27.2726 34.8 18.009 34.8C8.74543 34.8 1.20903 27.2636 1.20903 18C1.20903 8.7364 8.74543 1.2 18.009 1.2ZM18.009 0C8.06783 0 0.0090332 8.0588 0.0090332 18C0.0090332 27.9412 8.06783 36 18.009 36C27.9502 36 36.009 27.9412 36.009 18C36.009 8.0588 27.9502 0 18.009 0Z" fill="white"/>
      <path d="M24.1472 17.3398L14.9631 11.377C14.7192 11.2196 14.4203 11.2078 14.1686 11.3455C13.9168 11.4831 13.7634 11.7467 13.7634 12.0377V23.9634C13.7634 24.2505 13.9129 24.5179 14.1686 24.6556C14.2865 24.7185 14.4124 24.75 14.5383 24.75C14.6877 24.75 14.8333 24.7067 14.9631 24.6241L24.1472 18.6613C24.3714 18.5158 24.5051 18.268 24.5051 18.0005C24.5091 17.7331 24.3714 17.4853 24.1472 17.3398Z" fill="white"/>
      </svg> -->
      <img src="~assets/images/mobile/home/walkthrough.gif" alt="Neo Walkthrough">
      <!-- <img src="https://foyrocrqa.s3.ap-south-1.amazonaws.com/5f06eb550362d6223b154ec0/projects/5f3a46507454221a91fe44b2/testddd_view_0/q1KAyAR2UHMLU60CAWB87/testddd_view_0.effectsResult.jpg" alt="Neo Project Home"> -->
    </div>
    <p class="main-text">{{(primaryProjectData && primaryProjectData.name)? primaryProjectData.name: ''}}</p>
    <p class="sub-text-one">A project by BL Interiors, Washington</p>
    <div class="mainGrid">
      <div class="renders-grid subGrid">
        <img src="~assets/images/mobile/projects/3.png" alt="">
        <button class="mobile-basic-btn project-btn" @click="clickActions('render', 'mb_renders_projects_clicked')">{{ $t("buttonText.viewRenders") }}</button>
        <!-- <p>View 4k renders of the project</p> -->
      </div>
      <div class="view-grid subGrid">
        <img src="~assets/images/walkthrough.png" alt="Neo Project Home">
        <button class="mobile-basic-btn project-btn" @click="clickActions('viewIn', 'mb_viewin3d_projects_clicked')">{{ $t("buttonText.viewInThreeD") }}</button>
        <!-- <p>View 4k renders of the project</p> -->
      </div>
      <div class="products-grid subGrid">
        <img src="~assets/images/mobile/projects/2.png" alt="">
        <button class="mobile-basic-btn project-btn" @click="clickActions('neo-products', 'mb_neoproducts_projects_clicked')">{{ $t("buttonText.viewProducts") }}</button>
        <!-- <p>50 products used from the Neo</p> -->
      </div>
    </div>
    <GalleryCarouselComponent v-if="primaryProjectData && primaryProjectData.name && primaryProjectData.renders" :isImageView="isImageView" :currentIndex="currentIndex" :imageData="primaryProjectData.renders" :projectName="primaryProjectData.name"/>
    <loginViaDesktopComponent :desktopAlert="desktopAlert"/>
    <iframeMTComponent :openTour="openTour"/>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import loginViaDesktopComponent from '@/components/shared/mobile/loginViaDesktop';
import iframeMTComponent from '@/components/shared/mobile/iframeMT';
import GalleryCarouselComponent from '@/components/shared/mobile/galleryCarousel';
export default {
  middleware: ["initAuth", "authReq"],
  components: {
    loginViaDesktopComponent,
    iframeMTComponent,
    GalleryCarouselComponent
  },
  data() {
    return {
      desktopAlert : false,
      openTour: false,
      isImageView: false,
      currentIndex: 0,
      // primaryProjectData: {},
      // primaryProject: {}
    }
  },
  mounted() {
    this.fetchMobileRenders().then((response)=> {
      console.log('Renderssss--> ', response)
    }).catch((error)=> console.log('ERROR', error));
    // if(!this.sampleProjects)
  },
  watch: {
  },
  computed: {
    ...mapState({
      mobileProjects: state => state.Projects.mobileSampleProjects,
      mobileRenders: state => state.Projects.mobileRenders,
      userDetails: state => state.User.user,
    }),
    primaryProject(){
      if(this.mobileProjects.sampleProjects && this.mobileProjects.sampleProjects.length > 0)
      return this.mobileProjects.sampleProjects.filter((project)=>project.isPrimary)[0];
      return {};
    },
    primaryProjectData : function(){
      for(let item in this.mobileRenders) {
        if(this.mobileRenders[item].isPrimary){
          return this.mobileRenders[item];
          // return;
        }
      }
    }
  },
  methods: {
    ...mapActions({
      fetchMobileRenders: "Projects/fetchMobileRenders",
    }),
    takeTourClicked(){
      this.openTour = true;
      this.$root.$emit("send-mobile-event",{name : 'mb_tour_projects_clicked'});
    },
    clickActions(_type, _event){
      if(_type === 'tour')
      this.openTour = true;
      if(_type === 'render')
      this.isImageView = true;
      if(_type === 'viewIn' || _type === 'neo-products')
      this.desktopAlert = true;
      this.$root.$emit("send-mobile-event",{name : _event});
    }
  },
}
</script>
<style lang="scss">
.project-home-container {
  background: #F5F5F7;
  padding: 2rem 1rem 0rem 1rem;
  display: grid;
  justify-content: center;
  justify-items: center;
  p,h2{
      font-family: 'Ubuntu';
      margin: 0;
  }
  h2 {
    color: #292929;
  }
  img {
    width: 100%;
  }
  .image-section {
    position: relative;
    display: grid;
    padding-top: 2rem;
    .tour-btn {
      position: absolute;
      font-family: 'Ubuntu';
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      background: black;
      opacity: 0.7;
      font-size: 2rem;
      color: white;
      border: 1px solid white;
      border-radius: 1rem;
      padding: 1.3rem 2rem;
      top:38.5%;
      left:26%;
      align-self: center;
      justify-self: center;
    }
    img {
      width: 90vw;
      border-radius: 0.5rem;
      border: 0.4rem solid black;
      margin-bottom: 2rem;
      // height: 22rem;
    }
    svg {
      position: absolute;
      top: 40%;
      left: 45%;
    }
  }
  .main-text {
    padding-top:2rem;
    font-weight: bold;
    font-size: 2rem;
    line-height: 2.375rem;
    color: #292929;
    text-transform: capitalize;
  }
  .sub-text-one {
    font-weight: normal;
    font-size: 1.5rem;
    line-height: 1.375rem;
    color: #000000;
    padding: 0.5rem 0;
  }
  .mainGrid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    column-gap: 1rem;
    margin: 1rem 0;
    .subGrid {
      display: grid;
      grid-template-rows:1fr max-content max-content;
      justify-items: center;
      p {
        font-weight: normal;
        font-size: 1rem;
        line-height: 1.3rem;
        text-transform: uppercase;
        color: #222122;
        padding-top: 1rem;
        text-align: center;
      }
    }
    .view-grid {
      img {
        // width: 7rem;
      }
    }
    .products-grid {
      img {
        // height: 55%;
        width: 80%;
      }
    }
  }
}
.project-btn {
  font-family: 'Ubuntu';
  font-size: 0.8rem;
  line-height: 0;
  padding: 0;
  width: 90%;
  height: 3rem;
  margin: 0 !important;
}
</style> 
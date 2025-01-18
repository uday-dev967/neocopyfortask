<template>
  <div class="gallery-render-container">
    <div class="project-renders" v-for="(render,key,index) in preparedRenders" :key="index">
      <div class="project-info">
        <p class="project-name">{{render.name}} </p>
        <p class="project-count">{{render.count}}</p>
      </div>
      <div class="gallery-carousel" v-if="render && render.renders">
        <div class="card" v-for="(item,newIndex) in render.renders" :key="newIndex">
          <img @click="isImageView = true;galleryRenderProject=render.name;currentIndex = newIndex; imageData = render.renders;" :src="item.extraInfo.thumbnail" alt="">
        </div>
          <!-- <img src="~assets/images/mobile/gallery/1.png" alt="">
          <img src="~assets/images/mobile/gallery/home.png" alt=""> -->
      </div>
      <p class="sub-text-one" v-if="index === 0">{{ $t("inspiration.clickThumbnailPreviewText") }}</p>
    </div>
     <GalleryCarouselComponent :isImageView="isImageView" :currentIndex="currentIndex" :imageData="imageData" :projectName="galleryRenderProject"/>
     <!-- POPUP CONTAINER ========= -->
    <ProjectOptionsComponent v-if="isOptionsShow"/>
    <div class="extra-cover"></div>
  </div>
</template>
<script>
import ProjectOptionsComponent from '@/components/shared/mobile/projectOptions';
import GalleryCarouselComponent from '@/components/shared/mobile/galleryCarousel';
import {mapState,mapActions} from 'vuex';
export default {
  components: {
    ProjectOptionsComponent,
    GalleryCarouselComponent,
  },
  data() {
    return {
      isImageView : false,
      isOptionsShow: false,
      currentIndex: 0,
      screenMode: "potrait",
      imageData: [],
      galleryRenderProject: '',
    }
  },
  mounted() {
    if(Object.keys(this.mobileProjects).length <= 0)
      this.fetchSampleProjects();
    this.fetchMobileRenders().then((response)=> {
      console.log('Renderssss--> ', response)
    }).catch((error)=> console.log('ERROR', error));

  },
  computed: {
    ...mapState({
      mobileRenders: state => state.Projects.mobileRenders,
      mobileProjects: state => state.Projects.mobileSampleProjects,
    }),
    primaryProject(){
      if(this.mobileProjects.sampleProjects && this.mobileProjects.sampleProjects.length > 0)
      return this.mobileProjects.sampleProjects.filter((project)=>project.isPrimary)[0];
      return {};
    },
    preparedRenders(){
      let totalRenders =  {}
      if(this.mobileProjects && this.mobileProjects.sampleProjects && this.mobileProjects.sampleProjects.length > 0)
     {
      this.mobileProjects.sampleProjects.forEach((item)=> {
        totalRenders[item.id] = {...item.rendersData, name: item.projectName}
      })
      return {...totalRenders, ...this.mobileRenders };
      }else {
        return this.mobileRenders;
      }

      console.log(this.mobileRenders)
    }
  },
  methods: {
    ...mapActions({
      fetchMobileRenders: "Projects/fetchMobileRenders",
      fetchSampleProjects: "Projects/fetchMobileSampleProjects",
    }),

  },
}
</script>
<style lang="scss">
.gallery-render-container {
  display:grid;
  padding: 2rem 0 0 2rem;
  row-gap: 1rem;
  p {
    margin: 0;
    font-family: 'Ubuntu';
  }
  background: white;
  .project-renders{
    display: grid;
    grid-template-rows: repeat(3,max-content);
    .project-info {
      padding-right: 1rem;
      display: grid;
      grid-template-columns: max-content 1fr;
      .project-name {
        font-weight: bold;
        font-size: 1.8rem;
        line-height: 3.75rem;
        color: #000000;
        text-align: left;
        text-transform: capitalize;
      }
      .project-count {
        font-weight: normal;
        font-size: 1.8rem;
        line-height: 3.75rem;
        text-align: right;
        color: #000000;
      }
    }

        .sub-text-one {
          font-size: 1.2rem;
          margin-right: 0.5rem;
          text-align: right;
          color: #292929;
        }
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
    margin: 2rem 0rem;
  }
.gallery-popup-container {
  .close-x {
    position: absolute;
    right: 0;
    top: -3rem;
    width: 1.5rem;
    margin-right: 1rem;
  }
  .popup-container{
    max-width: 100vw !important;
    background: none;
    padding: 0 !important;
    // .popup-details {
    //   padding: 0;
    // }
    img {
      width: 100vw;
      height: 36vh;
    }
    .gallery-carousel{
      .card{
        display: grid;
      }
    }

  }
}
}
.gallery-carousel {
  display: grid;
  grid-auto-flow: column;
  max-width: 100vw;
  overflow-x: scroll;
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
    img {
      // width: 100%;
    }
    span {
      display: grid;
      grid-template-columns: 1fr max-content;
      justify-content: space-between;
      align-items: center;
      background: #FBF3F1;
      padding: 1rem 0.2rem;
      p {
        font-size: 1.25rem;
        margin: 0.25rem;
      }
      svg {
        margin: 0.5rem;
      }
    }
  }
}
.close-landscape {
  height: 1.8rem !important;
  width: 2.4rem !important;
  z-index: 1;
  top: 1rem !important;
  // background: black;
}
.image-landscape {
  max-width: 100vw !important;
  height: 88vh !important;
  width: 100vw !important;
  padding-top: 3rem !important;
}
.extra-cover{
  height: 15vh;
}
</style>

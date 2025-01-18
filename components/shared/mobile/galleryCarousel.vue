<template>
  <div class="popup-div gallery-carousel-container" :class="isImageView ? 'showPopUp' : ''">
    <div class="popup-container" v-bind:class="{ 'container-landscape': screenMode === 'landscape' }">
      <svg class="close-x" width="27" height="27" viewBox="0 0 27 27" fill="none"
        v-bind:class="{ 'close-landscape': screenMode === 'landscape' }" @click="$parent.isImageView = false;"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M25.7845 1.20001L1 25.769" stroke="white" stroke-miterlimit="10" stroke-linecap="round" />
        <path d="M26 26.2L1.43109 1.41553" stroke="white" stroke-miterlimit="10" stroke-linecap="round" />
      </svg>
      <carousel :per-page="1" :navigationEnabled="false" :paginationEnabled="false" @page-change="swipeEvents"
        :value="navigateTo" :navigate-to="navigateTo" :speed="slideTransitionSpeed">
        <slide v-for="(item, index) in hdImagesData" :key="index" :index="index">
          <img class="image-item" :src="item" v-bind:class="{ 'image-landscape': screenMode === 'landscape' }"
            style="max-width:100vw" />
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    imageData: Array,
    currentIndex: Number,
    isImageView: Boolean,
    projectName: String,
  },
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      screenMode: "potrait",
      hdImagesData: [],
      navigateTo: 0,
      slideTransitionSpeed: 10
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
      this.landScapeCheck();
      // console.log(this.landScapeCheck());
    });
    console.log('IMG PRO', this.imageData)
  },
  watch: {
    isImageView: async function (data) {
      if (data) {
        this.hdImagesData = [];
        this.$root.$emit("send-mobile-event", { name: 'mb_render_preview_opened', projectName: this.projectName });
        for (let i = 0; i < this.imageData.length; i++) {
          const response = await this.downloadRenderAPi({ uri: this.imageData[i].output["1"][0] })
          if (response)
            this.hdImagesData.push(response.url)
          else
            this.hdImagesData.push(item.extraInfo.thumbnail)
        }
        this.navigateTo = this.currentIndex
        setTimeout(() => {
          this.slideTransitionSpeed = 500;
        }, 250)
        // this.imageData.forEach((item)=> {
        //   if(item && item.output &&  item.output["1"] &&  item.output["1"].length > 0){
        //     this.downloadRenderAPi({uri:item.output["1"][0]}).then((response)=> {
        //       if(response)
        //        this.hdImagesData.push(response.url)
        //       else
        //        this.hdImagesData.push(item.extraInfo.thumbnail)
        //     })
        //   }else if(item && item.extraInfo && item.extraInfo.thumbnail)
        //     this.hdImagesData.push(item.extraInfo.thumbnail)
        // })
      } else {
        this.navigateTo = 0;
        this.slideTransitionSpeed = 10;
      }
    }
  },
  methods: {
    ...mapActions({
      downloadRenderAPi: 'Render/downloadRender',
    }),
    landScapeCheck: function () {
      if (window.innerHeight > window.innerWidth)
        this.screenMode = 'potrait'
      else if (window.innerHeight < window.innerWidth)
        this.screenMode = 'landscape'
      else if (window.orientation === 90 || window.orientation === -90) {
        // console.log("Landscape");
        this.screenMode = "landscape";
      } else {
        console.log('else case checking --->>', this.screenMode)
      }
    },
    swipeEvents(pageNumber) {
      this.$root.$emit("send-mobile-event", { name: 'mb_render_scroll_clicked' });
    },
  },
}
</script>
<style lang="scss">
.gallery-carousel-container {
  img {
    width: 100vw !important;
    height: 35vh !important;
    object-fit: fill;
    visibility: visible !important;
  }

  .close-landscape {
    height: 1.8rem !important;
    width: 2.4rem !important;
    z-index: 1;
    right: -3rem !important;
    top: 3rem !important;
    margin-right: 0 !important;
    object-fit: fill !important;
    // background: black;
  }

  .image-landscape {
    max-width: 60vw !important;
    height: 90vh !important;
    // width: 100vw !important;
    padding-top: 3rem !important;
  }

  .close-x {
    position: absolute;
    right: 0;
    top: -3rem;
    width: 1.5rem;
    margin-right: 1rem;
  }

  .popup-container {
    max-width: 100vw !important;
    background: none;
    padding: 0 !important;

    .popup-details {
      padding: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }

  }

  .container-landscape {
    max-width: 60vw !important;
  }
}
</style>

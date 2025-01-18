<template>
  <div class="slider-container">
    <!-- Slider Header -->
    <div class="slider-header" v-if="title">
      <h3>{{ $t(title) }}</h3>
    </div>

    <!-- Slides -->
    <div
      class="slides-wrapper"
      
      @touchstart="startSwipe"
      @touchmove="swipeMove"
      @touchend="endSwipe"
    >
      <div
        class="slides"
        ref="slider"
        :style="{
          transform: `translateX(${-(currentSlide * slideWidth )}px)`
        }"
      >
        <div
          class="slide"
          v-for="(item, index) in data"
          :key="index"
          :class="{ active: currentSlide === index }"
        >
          <div class="slide-content">
            <!-- <img v-if="item.image" :src="item.image" :alt="item.title" class="slide-image" /> -->
            <div class="video-container">
              <video v-if="item.image" :src="item.image" autoplay loop muted playsinline></video>
            </div>
            <div class="image-overlay">
              <div v-if="item.title" class="title">{{ $t(item.title) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="showDots">
      <span
        v-for="(item, index) in data"
        :key="'pagination-' + index"
        class="dot"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    showDots: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentSlide: 0,
      slideWidth: 0,
      startX: 0,
      endX: 0,
    };
  },
  mounted() {
    this.updateSlideWidth();
    window.addEventListener("resize", this.updateSlideWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateSlideWidth);
  },
  methods: {
    updateSlideWidth() {
      const slider = this.$refs.slider;
      if (slider) {
        const rect = slider.getBoundingClientRect()
        this.slideWidth = rect.width; // Each slide occupies 80% of the container
        // Center offset for active slide
      }
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    startSwipe(event) {
      this.startX = event.touches[0].clientX;
    },
    swipeMove(event) {
      this.endX = event.touches[0].clientX;
    },
    endSwipe() {
      const delta = this.startX - this.endX;
      if (delta > 50 && this.currentSlide < this.data.length - 1) {
        this.currentSlide++;
      } else if (delta < -50 && this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 50rem;
}

.slider-header {
  margin-bottom: 1rem;
  text-align: center;
}

.slides-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;

  display: flex;
  justify-content: center;
}

.slides {
  display: flex;
  transition: transform 0.5s ease;

  width: 17.5rem;
  height: 22.375rem;
}

.slide {
  display: flex;
  width: 100%;
  flex: 0 0 100%;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: scale(0.90); /* Shrink non-active slides */
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  .image-overlay {
    position: absolute;
    background: linear-gradient(184deg, rgba(0, 0, 0, 0.00) 43.18%, rgba(0, 0, 0, 0.90) 81.72%);
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: start;
    padding: 1.125rem;
    color: $color-white;
    font-size: .875rem;
    font-weight: 600;
    line-height: 1.125rem; /* 128.571% */

  }
}

.slide.active {
  transform: scale(1);
}

.slide-content {
  width: 100%;
  
  display: flex;
  .video-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 12px;
    video {
      display: flex;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }
}

.slide-image {
  // width: 100%;
  // height: 21.4375rem;
  display: flex;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1.75rem;
}

.dot {
  width: .625rem;
  height: .625rem;
  margin: 0 .25rem;
  background-color: $background-53;
  border-radius: 50%;
  cursor: pointer;
  transform: scale(0.8)
}

.dot.active {
  background-color: $background-54;
  transform: scale(1);
}
</style>

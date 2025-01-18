<template>
  <div class="free-demo-popup-container" v-if="isIframeComponent && url">
    <div class="free-demo-popup" @click.stop>
      <svg
        class="free-demo-popup-close"
        @click="closeIframe()"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.7845 1.20001L1 25.769"
          stroke="#D1D1D1"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <path
          d="M26 26.2L1.43109 1.41553"
          stroke="#D1D1D1"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
      </svg>
      <!-- Modal content ================> -->
      <iframe
        class="free-demo-iframe"
        width="560"
        height="315"
        :src="url"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        isIframeComponent: Boolean,
        url: String,
    },
    data() {
        return {
            // calendlyUrl: 'https://calendly.com/luisa-gonzales/15min'
            // https://foyr-test.chargebee.com/pages/v3/ybbQPcuA5NLTXOXcdrC9ydJFaTyeLxileL/collect_now
        }
    },
    methods: {
      closeIframe(){
        this.$parent.isIframeComponent = false;
        this.$root.$emit('open-dunning-paywall', false)
      }
    },
}
</script>

<style lang="scss">
.freeDemoImg {
  border-radius: 100%;
  justify-self: center;
  margin-bottom: 1rem;
}
.free-demo-popup-container {
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background: rgba(86, 86, 86, 0.65);
  z-index: 1000;
}
.free-demo-popup {
  background: #fbfcfd;
  position: absolute;
  top: 50%;
  left: 50%;
  /* height: 97%; */
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 70vw;
  display: grid;
  grid-template-columns: 1fr;
  place-content: center;
  justify-items: center;
  text-align: center;
  padding: 32px 20px 32px 20px;
}

.free-demo-popup-close {
  position: absolute;
  right: 0.5rem;
  width: 15px;
  path {
    stroke: black;
  }
}
.free-demo-iframe {
  height: 75vh;
  width: 70vw;
}
</style>


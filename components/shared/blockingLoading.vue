<template>
  <div class="popup-div payment-updating-popup" :class="isBlockingLoading?'showPopUp':''">
    <div class="popup-container" @click.stop>
      <div class="payment-wait-container">
        <img src="~assets/images/loader.gif" alt="" srcset="">
        <p>{{ $t("plansNew.updateSubscriptionText") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    },
  data(){
    return {
      isBlockingLoading: false,
    }
  },
  mounted() {
    this.$root.$on('show-blocking-loading', (key)=> {
      this.isBlockingLoading = key;
    })
  },
}
</script>

<style lang="scss">
.payment-updating-popup {
  opacity: 1;
  z-index: 1000;
  .popup-container {
    display: grid;
    background: transparent;
    .payment-wait-container {
      display: grid;
      place-items: center;
      place-content: center;
      row-gap: 1rem;
      img {
        width: 5rem;
      }
      p {
        color: white;
      }
    }
  }
}
</style>

<template>
	<div class="popup-div showPopUp">
		<div class="popup-container" @click.stop>
        <div class="popup-head">
          <div class="cancel-subscription-title">
            {{ $t("suggestionText.payAsYouGoCancelSubscriptionTitle") }}
          </div>
        </div>

        <div class="popup-details">
          <div class="body">
            {{ $t("suggestionText.payAsYouGoCancelSubscriptionText") }}
          </div>
          <div class="buttons-wrapper">
            <div  class="ok-button button" @click="onOkButtonClick">{{ $t("buttonText.okay") }}</div>
            <div class="cancel-button button" @click="onCancelButtonClick">
              {{ $t("buttonText.iStillWantToCancel") }}
            </div>
          </div>
        </div>
      </div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "nonEnCancelConfrimation",
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    closePopup() {
      console.log("colse")
      this.$emit("close-popup")
    },
    onOkButtonClick() {
      console.log("handleOkayButtonClick did ")
      this.$emit("on-ok")
    },
    onCancelButtonClick() {
      this.$emit("on-cancel")
      this.$emit("close-popup")
    }
    
  }
};
</script>

<style lang="scss" scoped>

.popup-div {
  
.popup-container {
    display: grid;
    grid-template-rows: max-content 1fr;
    align-items: center;
    width: 100%;
    max-width: 49.75rem * 1.22;
    min-height: 21rem * 1.22;
    padding: 3rem 4.5rem;
    
    .cancel-subscription-title {
      color:  $color-second;
      text-align: center;
      font-size: 1.75rem;
      font-size: 2rem;
      font-weight: 700;
      font-family: "Work Sans",sans-serif !important;
    }

    .popup-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .body {
        margin: 2.5rem * 1.22 4rem * 1.22;
        color:  $color-light-gray-5;
        text-align: center;
        font-size: .9375rem * 1.22;
        font-weight: 400;
        line-height: normal;
        font-family: "Work Sans",sans-serif !important;

      }
      .buttons-wrapper {
        display: grid;
        grid-template-columns: max-content max-content;
        justify-content: center;
        grid-column-gap: 0.75rem;

        .button {
          width: 14rem * 1.22;
          padding: 0.75rem 1rem;
          font-size: .75rem * 1.22;
          border: none;
          cursor: pointer;
          text-align: center;
          font-family: "Work Sans",sans-serif !important;

        }
        .ok-button {
          background: $background-9;
          color: $color-white;
          &:hover {
            color: $color-dark-gray-2;
            background: $color-white;

          }
        }
      .cancel-button {
        background-color: $background-10;
        box-shadow: 0px 2px 4px rgba(0,0,0,.4);
        color: $color-dark-gray-2;
        &:hover {
          color: $color-dark-gray;
          background: $background-12;
        }
        }
      }
    }
  }
}
</style>

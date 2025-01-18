<template>
    <div class="cta-banner-wrapper banner-wrapper">
        <slot name="header"></slot>
        <slot name="bannerBody">
            <div class="banner-content-wrapper">
                <div class="content-wrapper">
                    <slot name="bannerContent">
                        <slot name="heading">
                            <div class="heading">
                                {{ $t("dashboard.mainBannerHeading") }}
                            </div>
                        </slot>
                        <slot name="subheading">
                            <div class="subheading">
                                s{{ $t("dashboard.mainBannerSubheading") }}
                            </div>
                        </slot>
                        <slot name="bannerAction">
                            <div class="banner-action">
                                <button @click="handleDefaultCTAClick">{{ $t("buttonText.joinNowForFree") }}</button>
                            </div>
                        </slot>
                    </slot>
                </div>
                <div class="image-wrapper image-container">
                    <slot name="bannerImage">
                        <img :src="imageUrl">
                    </slot>
                </div>
            </div>
        </slot>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Banner",
  components: {},
  props: {
    imageUrl: {
      required: false,
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: state => state.User.user,
      isTrial: state => state.Billing.isTrial
    })
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({}),
    handleDefaultCTAClick() {
      this.$emit("defaultCTAClicked");
    }
  }
};
</script>
<style lang="scss" scoped>
.banner-wrapper {
  margin: 2rem 5.25rem 0 5.25rem;

  .banner-content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .image-wrapper {
    width: 24rem;
    margin: 1.8rem 1.8rem 1.8rem 0;
  }

  .content-wrapper {
    padding-left: 7.55rem;
  }

  .heading {
    margin-top: 3rem;
    font-family: $main-font;
    font-style: normal;
    font-weight: 600;
    font-size: 2rem;
    color: $banner-heading-color;
    width: 60%;

    &.font-weight-secondary {
        font-weight: 500;
    }
  }

  .subheading {
    margin-top: 1rem;
    font-family: $main-font;
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    color: $banner-sub-heading-color;
    width: 60%;

    &.default-list {
        padding-left: 2rem;

        a {
          font-weight: 600;
          text-decoration: underline;
          color: #000000;
          cursor: pointer;
        }
    }
  }

  .heading, .subheading {
      &.full-width {
          width: 100%;
      }
  }

  .banner-action {
    margin-top: 1.125rem;
    margin-bottom: 1.8rem;
    button {
      cursor: pointer;
      padding: 0.75rem 2rem;
      outline: none;
      border: none;
      background: #000000;
      border-radius: 4px;

      font-family: $main-font;
      font-style: normal;
      font-weight: 600;
      font-size: 1.125rem;

      display: flex;
      align-items: center;
      text-align: center;

      color: #ffffff;
    }
  }
}
</style>

<template>
  <div 
    class="mobile-system-notifications-wrapper"
  >
      <div v-for="(notification, index) of notifications" :key="index" class="notification"
      :class="notification.notificationClass"
      >
        <div class="notification-content">
          <div v-if="notification.iconRef || notification.icon" class="svg-wrapper">
              <div v-html="notification.iconRef"></div>
              <!-- <div v-if="notification.icon == 'success'"></div>
              <div v-if="notification.icon == 'error'"></div> -->
          </div>
          <div class="notification-text-content">
              <div v-if="notification.primaryMessage" class="message">{{ notification.primaryMessage }}</div>
              <div v-if="notification.secondaryMessage" class="sub-message" v-html="notification.secondaryMessage">
              </div>
              <div class="action-wrapper">
                  <div v-if="notification.buttonTextRef" class="primary-filled-button" @click="handlePrimaryButtonClick(notification)">
                      {{ $t('notEnoughtCreditsPopup.buyNowButton') }}
                  </div>
              </div>
          </div>
        </div>
          <div class="close-button" @click="handleCloseButtonClick(notification)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#3A393A" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="#3A393A" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          </div>
      </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  components: {},
  created() { },
  mounted() { },
  computed: {
      ...mapGetters("MobileSystemNotifications", ["notifications"]),
  },
  data() {
      return {};
  },
  methods: {
      ...mapActions("MobileSystemNotifications", ['removeNotification']),
      
      handleCloseButtonClick(notification) {
          this.removeNotification(notification);
      },
      handlePrimaryButtonClick(notification) {
          if (notification.buttonCallback && typeof notification.buttonCallback === 'function' ) {
              notification.buttonCallback();
          }
      }
  },
};
</script>
<style lang="scss" scoped>
.mobile-system-notifications-wrapper {

  position: fixed;
  left: 0;
  top: 0;
  height: calc(100%);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  display: flex;
  padding: 1.25rem 0px;
  align-items: center;
  gap: .5rem;
  z-index: 2147483601;
  box-sizing: border-box;
  pointer-events: none;

  .notification {
      pointer-events: all;
      display: grid;
      grid-template-columns: 1fr max-content;
      gap: 0.5rem;
      align-items: center;
      padding: 1rem;
      width: 90%;
      border-radius: 20px;
      border: 1px solid $border-1;
      background: $background-white;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
      .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        .svg-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            align-self: stretch;
            padding: 0.625rem;

            background: $background-10;

  
            svg {
                width: 1rem !important;
                height: 1rem !important;
                flex-shrink: 0;
            }
            img {
                width: 1rem !important;
                height: 1rem !important;
                flex-shrink: 0;
            }
        }
  
        .notification-text-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
            .message {
                color: $color-light-gray-11;
                color: var(--Text-Primary, #303030);
                font-size: .75rem;
                font-weight: 600;

            }
  
            .sub-message {
                color: $color-light-gray-11;
                font-size: .75rem;
                font-weight: 400;
  
                .highlight {
                    font-size: inherit;
                    color: $color-second;
                    font-weight: 700;
                }
            }
        }

      }

      .action-wrapper {
          display: flex;
          .primary-filled-button {
              cursor: pointer;
              border-radius: 1rem;
              background: $background-10;
              color: $color-black;
              text-align: center;
              font-size: .625rem;
              padding: .25rem .5rem;
          }
      }


      .close-button {
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
              cursor: pointer;
              width: 1.5rem !important;
              height: 1.5rem !important;
          }
      }
  }
}
</style>

<style lang="scss">
</style>
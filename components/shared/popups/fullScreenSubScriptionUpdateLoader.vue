<template>
  <div
			class="popup-div payment-updating-popup showPopUp"
	>
    <div class="popup-container" @click.stop>
      <div class="payment-wait-container">
        <img src="~assets/images/loader.gif" alt="" srcset="" />
        <p>
          {{ $t("plansNew.updateSubscriptionText") }}
        </p>
      </div>
    </div>
	</div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.payment-updating-popup {
		opacity: 1;
		.popup-container {
			background: transparent;
			.payment-wait-container {
				display: grid;
				place-items: center;
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
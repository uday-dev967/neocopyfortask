<template>
	<div id="neoformPopupWrapper" class="neoform-popup-wrapper">
		<DefaultPopup
			v-if="showNeoformPopupConfig"
			class="save-view-popup"
			:width="neoformPopupConfig.width"
			:height="neoformPopupConfig.height"
			:hide-close-button="false"
			:hide-header="true"
			:hide-footer="true"
			@closePopup="closeNeoformPopup"
		>
			<div
				class="neoform-popup-body"
				:class="neoformPopupConfig.additionalBodyClasses"
			>
				<iframe
					:style="{
						height: neoformPopupConfig.height,
						width: neoformPopupConfig.width,
					}"
					:src="neoformPopupConfig.neoFormUrl"
					frameborder="0"
				></iframe>
			</div>
		</DefaultPopup>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DefaultPopup from "./defaultPopup";
export default {
	name: "NeoformPopup",
	components: {
		DefaultPopup,
	},
	props: {},
	data() {
		return {};
	},
	computed: {
		...mapGetters("neoformPopup", [
			"showNeoformPopupConfig",
			"neoformPopupConfig",
		]),
	},
	created() {},
	destroyed() {},
	mounted() {
		window.onmessage = e => {
			if (e.data && typeof e.data === "string") {
				let iframeMessage = JSON.parse(e.data);
				if (iframeMessage.eventName) {
					switch (iframeMessage.eventName) {
						case "onSubmit":
							console.log("onSubmit", iframeMessage.data);
							this.closeNeoformPopup();
							break;
					}
				}
			}
		};
	},
	methods: {
		...mapActions("neoformPopup", [
			"closeNeoformPopup",
			"openNeoformPopup",
		]),
	},
};
</script>

<style lang="scss" scoped>
.neoform-popup-wrapper {
	pointer-events: all;
	.neoform-popup-body {
		height: 100%;
		width: 100%;

		iframe {
			display: block;
		}
	}
}
</style>

<style lang="scss">
.neoform-popup-wrapper {
	section .main-container {
		padding: 0;

		.pop-over-body {
			height: 100%;
		}

		.close-popup {
			opacity: 1;
		}
	}
}
</style>

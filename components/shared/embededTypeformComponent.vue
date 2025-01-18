<template>
	<div class="embeded-typeform-wrapper">
		<DefaultPopup
			class="save-view-popup"
			:width="embededTypeformConfig.width"
			:height="embededTypeformConfig.height"
			:hide-close-button="false"
			:hide-header="true"
			:hide-footer="true"
			@closePopup="handlePopupButtonCloseButtonClick"
		>
			<div
				class="typeform-popup-body"
				:class="embededTypeformConfig.additionalBodyClasses"
			>
				<div class="form" id="form"></div>
			</div>
		</DefaultPopup>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import DefaultPopup from "./defaultPopup";
import { createWidget } from "@typeform/embed";
import "@typeform/embed/build/css/widget.css";

export default {
	name: "EmbededTypeform",
	components: {
		DefaultPopup,
	},
	props: {},
	data() {
		return {
			typeformContext: null,
		};
	},
	computed: {
		...mapGetters("typeformPopup", [
			"showEmbededTypeform",
			"embededTypeformConfig",
		]),
	},
	watch: {
		showEmbededTypeform(nv) {
			if (nv) {
				this.initializeAndOpenTypeForm();
			}
		},
	},
	created() {
		// this.initializeAndOpenTypeForm();
	},
	destroyed() {},
	mounted() {},
	methods: {
		...mapActions("typeformPopup", [
			"closeEmbededTypeform",
			"openEmbededTypeform",
		]),
		...mapMutations("typeformPopup", []),
		initializeAndOpenTypeForm() {
			this.typeformContext = createWidget(
				this.embededTypeformConfig.formId,
				{
					container: document.querySelector("#form"),
					...this.embededTypeformConfig,
					onReady: () => {
						this.embededTypeformConfig.onReady();
						console.log("typeform is readed");
					},
					onSubmit: (data) => {
						console.log("form is submitted", data.responseId);
						this.embededTypeformConfig.onSubmit(data);
						this.closeTypeformPopup();
					},
					onClose: () => {
						this.embededTypeformConfig.onClose();
						console.log("typeform is closed");
					},
				}
			);
		},
		handlePopupButtonCloseButtonClick() {
			if (
				this.embededTypeformConfig.popupCloseCB &&
				typeof this.embededTypeformConfig.popupCloseCB === "function"
			) {
				this.embededTypeformConfig.popupCloseCB();
			}
			this.closeTypeformPopup();
		},
		closeTypeformPopup() {
			this.closeEmbededTypeform();
			if (this.typeformContext) {
				this.typeformContext.unmount();
				this.typeformContext = null;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.embeded-typeform-wrapper {
	height: 100%;
	width: 100%;
	pointer-events: all;

	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1001;

	.typeform-popup-body,
	.form {
		height: 100%;
		width: 100%;
	}
}
</style>

<style lang="scss">
.embeded-typeform-wrapper {
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

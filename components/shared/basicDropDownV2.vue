<template>
	<!-- @mouseover="hover = true"
		@mouseleave="hover = false" -->
	<section
		ref="dropDownMainWrapper"
		class="select-drop-down-container"
		:id="idTag"
		tabindex="-1"
		:class="{
			'on-active': (hover && !clickable) || (openDrop && clickable),
			'bordered-drop-down-style': borderedDropDownStyle,
			'dropdown-disabled': disabled,
			[dropdownID]: true,
			'invert-drop-down-list': isContainerInverted,
		}"
		@click.stop="openDropDown"
		@blur="openDrop = false"
	>
		<div class="drop-down-normal-box" :style="{ border: border }" :class="{ 'prepend-drop-down': prependDropDown }">
			<slot name="prepend"> </slot>
      <slot name="selected">
        <p class="noselect">{{ displayTextForSelectedValue ? displayTextForSelectedValue : placeholderText }}</p>
      </slot>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12 6L8.10811 10.1802L4 6"
					stroke="#E9BEB3"
					stroke-width="1.2"
					stroke-miterlimit="10"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<div ref="dropDownContainer" class="drop-down-container" :style="{ top: border ? '101%' : '100%' }">
			<div
				class="drop-down-list-section"
				v-for="(item, i) in dropDownList"
				:key="i"
				:class="{ selected: item[valueKey] ? selectedItem == item[valueKey] : selectedItem == item }"
				@click.stop="listElementClickHandler(item)"
			>
				<slot name="option" v-bind="item">
          <p class="noselect" v-html="item[textKey] ? item[textKey] : item"></p>
        </slot>
			</div>
			<button class="noselect" v-if="dropDownButton.show" v-html="dropDownButton.text"></button>
		</div>
	</section>
</template>

<script>
	import { mapState } from "vuex";
	import Checkbox from "./Checkbox.vue";
	import { v4 as uuidv4 } from "uuid";

	export default {
		created() {
			this.selectedItem = this.selected;
			this.dropdownID = "dd" + uuidv4();
		},
		mounted() {
			if (this.closeDropDownOnDOMClick) document.addEventListener("click", this.handleDOMClick);
		},
		destroyed() {
			if (this.closeDropDownOnDOMClick) document.removeEventListener("click", this.handleDOMClick);
		},
		components: {
			Checkbox,
		},
		data() {
			return {
				dropdownID: "",
				selectedItem: "",
				arrayElementType: "STRING_OR_NUMBER",
				hover: false,
				openDrop: false,
				isContainerInverted: false,
			};
		},
		props: {
			dropDownList: {
				type: Array,
				default: () => [
					{ text: "A", value: "A" },
					{ text: "B", value: "B" },
					{ text: "C", value: "C" },
					{ text: "D", value: "D" },
				],
			},
			prependDropDown: {
				type: Boolean,
				default: false,
				required: false,
			},
			selected: {
				type: [String, Number],
				default: "",
			},
			placeholderText: {
				type: String,
				default: "Select an option",
			},
			dropDownButton: {
				type: Object,
				default: function() {
					return { show: false, text: "button" };
				},
			},
			clickable: {
				type: Boolean,
				default: false,
			},
			border: {
				type: String,
				default: "none",
			},
			idTag: {
				type: String,
				default: "",
			},
			borderedDropDownStyle: {
				type: Boolean,
				default: false,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			closeDropDownOnItemSelection: {
				type: Boolean,
				required: false,
				default: false,
			},
			closeDropDownOnDOMClick: {
				type: Boolean,
				required: false,
				default: false,
			},
      textKey: {
        type: String,
				default: "text",
      },
      valueKey: {
        type: String,
				default: "value",
      },
      inverted: {
        type: Boolean,
				default: true,
      }
		},
		watch: {
			selected(newValue) {
				// console.log({ selectedItem: this.selectedItem, newValue });
				if (newValue || newValue === "") {
					if (this.selectedItem == newValue) {
						return;
					}
					this.selectedItem = this.returnSelectedItemBasedOnType(newValue);
				}
			},
		},
		computed: {
			displayTextForSelectedValue() {
				if (typeof this.dropDownList[0] == "object") {
					for (let option of this.dropDownList) {
						if (option[this.valueKey] === this.selectedItem) {
							return option[this.textKey];
						}
					}
				}
				return this.selectedItem;
			},
		},
		methods: {
			listElementClickHandler(item) {
				this.selectedItem = this.returnSelectedItemBasedOnType(item);
				this.$emit("listElementClick", item);
				if (this.closeDropDownOnItemSelection) {
					this.openDrop = false;
				}
			},
			openDropDown() {
				if (this.disabled) {
					return;
				}
				if (this.clickable) {
					this.openDrop = !this.openDrop;
					if (this.openDrop && this.selectedItem) {
						let selectedDropDownElement = document.querySelector(
							`.${this.dropdownID} .drop-down-container .drop-down-list-section.selected`
						);
						this.scrollToTargetAdjusted(selectedDropDownElement);
					}
					this.$emit("dropDownClicked", this.openDrop);
				}
				this.isheightToBottomLessThanMaxHeight();
			},
			getTextValueForSelectedItem(selected) {
				// console.log(selected, this.dropDownList);
				for (let option of this.dropDownList) {
					if (option[this.valueKey] === selected) {
						return option[this.textKey];
					}
				}
				return "";
			},
			returnSelectedItemBasedOnType(item) {
				if (this.dropDownList.length && typeof item == "object" && typeof this.dropDownList[0] == "object") {
					return item[this.valueKey];
				}
				return item;
			},
			scrollToTargetAdjusted(element, offset = 0) {
				if (!element) {
					return;
				}
				let elementPosition = element.offsetTop;
				let offsetPosition = elementPosition + window.pageYOffset - offset;
				this.$refs.dropDownContainer.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			},
			handleDOMClick() {
				this.openDrop = false;
				this.$emit("dropDownClicked", this.openDrop);
			},
			isheightToBottomLessThanMaxHeight() {
				let remIndicatorBoundingInfo = document.getElementById("remIndicator").getBoundingClientRect();
				let dropDownContainer = document.querySelector(`.${this.dropdownID} .drop-down-container`);
				if (remIndicatorBoundingInfo && dropDownContainer) {
					const containerClientRect = dropDownContainer.getBoundingClientRect();
					if (containerClientRect) {
						let containerTopPlusDropDownHeight =
							containerClientRect.top + remIndicatorBoundingInfo.height * 13;
						if (containerTopPlusDropDownHeight > window.innerHeight) {
							this.isContainerInverted = true && this.inverted;
							return;
						}
					}
				}
				this.isContainerInverted = false;
			},
		},
	};
</script>


<style lang="scss" scoped>
	.select-drop-down-container {
		position: relative;
		background-color: transparent;

		&.dropdown-disabled {
			// pointer-events: none;

			.drop-down-normal-box {
				pointer-events: none;
				background-color: #3a393abf;
				p {
					color: #A5A6A5;
				}
			}

			svg {
				path {
					stroke: #A5A6A5;
				}
			}
		}

		.drop-down-normal-box {
			display: grid;
			grid-template-columns: 1fr max-content;
			justify-content: space-between;
			align-content: center;
			background-color: #232121;
			// padding: 0.625rem 0.75rem;
			align-items: center;
			// margin-bottom: 1px;
			cursor: pointer;

			&.prepend-drop-down {
				grid-template-columns: 1fr max-content 1fr;
			}

			p {
				margin: 0px;
				font-size: 0.75rem;
				color: #ffffff;
			}
			svg {
				transition: all 200ms ease-in-out;
			}
		}
		.drop-down-container {
			background-color: #232121;
			height: 0px;
			max-height: 0px;
			overflow: hidden;
			display: grid;
			transition: max-height 300ms ease-in-out;
			left: 0px;
			position: absolute;
			right: 0px;
			top: 100%;
			z-index: 2;
			.drop-down-list-section {
				display: grid;
				grid-template-columns: 1fr max-content;
				align-items: center;
				cursor: pointer;
				padding: 0.75rem;
				p {
					margin: 0px;
					font-weight: 500;
					font-size: 0.75rem;

					color: #ffffff;
				}
				&:hover {
					background-color: #3a393a;
				}
				svg {
					&:hover {
						outline: 1px solid #232121;
					}
				}
			}
			.selected {
				background-color: #3a393a;
				p {
					color: #e9beb3;
					font-weight: bold;
				}
			}
			button {
				background: #e9beb3;
				border: 1px solid #e9beb3;
				box-sizing: border-box;
				box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);

				margin: 0.75rem;
				height: 2rem;
			}
		}
		&.bordered-drop-down-style {
			&.on-active {
				.drop-down-normal-box {
					border: 1px solid #e9beb3 !important;
					// box-sizing: border-box;
				}
				.drop-down-container {
					border: 1px solid #3a393a;
					box-shadow: 0px 2px 4px 0px #00000040;
					border-radius: 0.25rem;
					overflow: auto;
					box-sizing: border-box;
				}
			}

			&:hover {
				.drop-down-normal-box {
					border: 1px solid #e9beb3 !important;
					box-sizing: border-box;
				}
			}

			&.dropdown-disabled {
				.drop-down-normal-box {
					border: 1px solid #3a393a !important;
				}
			}

			.drop-down-normal-box {
				padding: 0.5rem 0.625rem;
				box-shadow: 0px 2px 4px 0px #00000040;
				border-radius: 0.25rem;
				border: 1px solid #3a393a !important;
				box-sizing: border-box;
			}
		}
	}

	.on-active {
		.drop-down-container {
			height: auto;
			max-height: 13rem;
			padding-bottom: 0.75rem;
			overflow-y: auto;
		}
		.drop-down-normal-box {
			svg {
				transform: rotate(180deg);
			}
		}
	}

	.invert-drop-down-list {
		.drop-down-container {
			transform: translateY(-100%);
			top: -100%;
		}
	}
</style>

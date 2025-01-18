<template>
	<div
		ref="multiselectDropdownMainWrapper"
		class="select-drop-down-container multi-select-drop-down-section-container"
		:id="dropdownComponentID"
		tabindex="-1"
		:class="{
			'on-active': (hover && !clickable) || (openDrop && clickable),
			'bordered-drop-down-style': dropdownStyle === 'BORDERED',
			'dropdown-disabled': disabled,
			[dropdownComponentID]: true,
			'selected-list-items': selected.length,
		}"
		@mousedown.stop
		@mouseup.stop
		@blur.stop="onMultiSelectDropdownBlur"
	>
		<div @click.stop="openDropDown" class="drop-down-normal-box" :style="{ border: borderStyle }">
			<slot name="mainContainer">
				<slot name="placeholder" v-bind="{ selectedItemList, placeholderText: placeholder }">
					<p class="noselect">
						{{ placeholder }}
					</p>
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
				<div class="selected-items-indicator"></div>
			</slot>
		</div>
		<div class="multi-select-drop-down-container" :style="{ top: borderStyle ? '101%' : '100%' }" @click.stop>
			<div class="items-container">
				<div
					v-if="list.length && !hideSelectAll"
					class="drop-down-list-section"
					:class="{
						selected: selectedItemValueList.length === list.length,
					}"
				>
					<div>
						<Checkbox
							size="medium"
							:id="dropdownID"
							label="Select All"
							labelColor="#000"
							:value="selectedItemValueList.length === list.length"
							:checkedValue="[true]"
							:isSelectAllChecked="selectedItemValueList.length === list.length"
							@onCheckboxChange="onCheckboxValueChange(SELECT_ALL)"
						/>
					</div>
				</div>
				<div
					v-for="(item, index) in list"
					:key="'multiselectoption' + item[valueKey] + index"
					class="drop-down-list-section"
					:class="{
						selected: selectedItemValueList.length && selectedItemValueList.includes(item[valueKey]),
					}"
				>
					<!-- @click.stop="onDropDownListElementClick(item[valueKey])" -->
          <slot name="listItem" v-bind="{ item: item }">
            <div>
              <Checkbox
                size="medium"
                :id="item[valueKey]"
                :label="item[displayKey]"
                labelColor="#000"
                :value="item[valueKey]"
                :model="selectedItemValueList"
                :checkedValue="selectedItemValueList"
                :ref="dropdownID + 'multiselectDropdownElement' + item[valueKey]"
                @onCheckboxChange="onCheckboxValueChange"
              />
            </div>
          </slot>
				</div>
			</div>
			<slot name="dropdownContainerEnd" v-bind="{ itemList: selectedItemList, closeDropdown }"></slot>
		</div>
	</div>
</template>

<script>
// import { mapState } from "vuex";
import Checkbox from "./Checkbox.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  created() {
    this.selectedItemList = this.selected;
    this.selectedItemValueList = this.selected.map(e => e[this.valueKey]);
    this.dropdownID = "dd" + uuidv4();
  },
  mounted() {
    if (this.closeDropDownOnDOMClick)
      document
        .querySelector("body")
        .addEventListener("click", this.handleDOMClick);
  },
  destroyed() {
    if (this.closeDropDownOnDOMClick)
      document
        .querySelector("body")
        .removeEventListener("click", this.handleDOMClick);
  },
  components: {
    Checkbox
  },
  data() {
    return {
      dropdownID: "",
      openDrop: false,
      selectedItemList: [],
      selectedItemValueList: [],
      SELECT_ALL: "SELECT_ALL"
    };
  },
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    placeholder: {
      type: String,
      required: false,
      default: "Placeholder"
    },
    displayKey: {
      type: String,
      required: false,
      default: "text"
    },
    valueKey: {
      type: String,
      required: false,
      default: "value"
    },
    hover: {
      type: Boolean,
      required: false,
      default: false
    },
    clickable: {
      type: Boolean,
      required: false,
      default: false
    },
    borderStyle: {
      type: String,
      required: false,
      default: "none"
    },
    dropdownComponentID: {
      type: String,
      required: false,
      default: ""
    },
    dropdownStyle: {
      type: String,
      required: false,
      default: ""
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    closeDropDownOnItemSelection: {
      type: Boolean,
      required: false,
      default: false
    },
    closeDropDownOnDOMClick: {
      type: Boolean,
      required: false,
      default: true
    },
    hideSelectAll: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  watch: {
			selected(newValue) {
				if (this.selectedItemList.length !== newValue.length) {
					this.selectedItemList = newValue;
					this.selectedItemValueList = newValue.map((e) => e[this.valueKey]);
				} else if ( this.selectedItemList.length === newValue.length ) {
					let newValues = newValue.map((e) => e[this.valueKey]);
					let currentValues = this.selectedItemList.map((e) => e[this.valueKey]);

					let count = 0
					for (const value of currentValues) {
						if (newValues.includes(value)) count += 1;
					}

					if (count !== currentValues.length) {
						this.selectedItemList = newValue;
						this.selectedItemValueList = newValue.map((e) => e[this.valueKey]);
					}
				}
			},
			openDrop(newValue) {
				if (!newValue) {
					this.$emit("close");
				}
			},
		},
  computed: {
	isSelectAllChecked() {
		return this.selectedItemValueList.length === this.list.length;
	}
  },
  methods: {
    openDropDown() {
      if (this.disabled) {
        return;
      }

      if (this.clickable) {
        this.openDrop = !this.openDrop;
        if (this.openDrop && this.selectedItemList.length) {
          let selectedDropDownElement = document.querySelector(
            `.${
              this.dropdownID
            } .multi-select-drop-down-container .drop-down-list-section.selected`
          );
          this.scrollToTargetAdjusted(selectedDropDownElement);
        }
        this.$emit("dropDownClicked", this.openDrop);
      }
      this.isheightToBottomLessThanMaxHeight();
    },
    scrollToTargetAdjusted(element, offset = 0) {
      if (!element) {
        return;
      }
      let elementPosition = element.offsetTop;
      let offsetPosition = elementPosition + window.pageYOffset - offset;
      this.$refs.dropDownContainer.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    },
    isheightToBottomLessThanMaxHeight() {
      let remIndicatorBoundingInfo = document
        .getElementById("remIndicator")
        .getBoundingClientRect();
      let dropDownContainer = document.querySelector(
        `.${this.dropdownID} .drop-down-container`
      );
      if (remIndicatorBoundingInfo && dropDownContainer) {
        const containerClientRect = dropDownContainer.getBoundingClientRect();
        if (containerClientRect) {
          let containerTopPlusDropDownHeight =
            containerClientRect.top + remIndicatorBoundingInfo.height * 13;
          if (containerTopPlusDropDownHeight > window.innerHeight) {
            return;
          }
        }
      }
    },
    closeDropdown() {
      this.openDrop = false;
    },
    handleDOMClick() {
      this.openDrop = false;
    },
    onDropDownListElementClick(uniqueIdentifier) {
      // This is because the actual click area is very less.
      this.$refs[
        `${this.dropdownID}multiselectDropdownElement${uniqueIdentifier}`
      ][0].$el.click();
    },
    onCheckboxValueChange(checkboxValue) {
      if (checkboxValue == this.SELECT_ALL) {
        if (this.selectedItemValueList.length !== this.list.length) {
          this.selectedItemList = [...this.list];
          this.selectedItemValueList = [
            ...this.list.map(item => item[this.valueKey])
          ];
        } else {
          this.selectedItemList = [];
          this.selectedItemValueList = [];
        }
      } else {
        if (this.selectedItemValueList.includes(checkboxValue)) {
          let indexPosition = this.selectedItemValueList.indexOf(checkboxValue);
          this.selectedItemList.splice(indexPosition, 1);
          this.selectedItemValueList.splice(indexPosition, 1);
        } else {
          let foundListItem = this.list.find(
            e => e[this.valueKey] === checkboxValue
          );
          if (foundListItem) {
            this.selectedItemValueList.push(checkboxValue);
            this.selectedItemList.push(foundListItem);
          }
        }
      }
      this.$emit("listElementClick", this.selectedItemList);
      if (this.closeDropDownOnItemSelection) {
        this.openDrop = false;
        // this.$emit("close", this.openDrop);
      }
    },
    onMultiSelectDropdownBlur(event) {
      if (!event.target.contains(event.relatedTarget)) {
        this.openDrop = false;
      } else {
        event.target.focus();
      }
    }
  }
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
        color: #a5a6a5;
      }
    }

    svg {
      path {
        stroke: #a5a6a5;
      }
    }
  }

  .drop-down-normal-box {
    display: grid;
    grid-template-columns: 1fr max-content;
    justify-content: space-between;
    align-content: center;
    background-color: $color-second;
    // padding: 0.625rem 0.75rem;
    align-items: center;
    // margin-bottom: 1px;
    cursor: pointer;

    height: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    box-sizing: border-box;

    p {
      position: relative;
      margin: 0px;
      font-size: 0.75rem * 1.22;
      line-height: 0.9375rem * 1.22;
      color: $color-black;
      margin-right: 2rem * 1.22;
    }
    svg {
      transition: all 200ms ease-in-out;
      path {
        stroke: $color-black;
      }
    }
  }
  .multi-select-drop-down-container {
    background-color: $color-white;
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
    .items-container {
      transition: max-height 300ms ease-in-out;
      .drop-down-list-section {
        display: grid;
        grid-template-columns: 1fr max-content;
        align-items: center;
        cursor: pointer;
        // padding: 0.75rem;
        p {
          margin: 0px;
          font-weight: 500;
          font-size: 0.75rem;

          color: $color-black;
        }
        &:hover {
          background-color: $background-7;
        }
        svg {
          &:hover {
            outline: 1px solid #232121;
          }
        }
      }
      .selected {
        background-color: $background-7;
        p {
          color: #e9beb3;
          font-weight: bold;
        }
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
  .multi-select-drop-down-container {
    height: auto;
    max-height: 13rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.125rem solid #3a393a;
    .items-container {
      height: auto;
      max-height: 12.5rem;
      overflow: auto;
    }
  }
  .drop-down-container {
    height: auto;
    max-height: 13rem;
    padding-bottom: 0.75rem;
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

.selected-list-items {
  .drop-down-normal-box {
    p {
      &::after {
        position: absolute;
        content: " ";
        top: -2px;
        left: -8px;
        height: 0.4rem;
        width: 0.4rem;
        background-color: green;
        border-radius: 50%;
      }
    }
  }
}
</style>

<style lang="scss">
.multi-select-drop-down-container {
  .drop-down-list-section {
    label {
      display: flex !important;
      text-transform: capitalize;
      padding: 0.75rem 0.75rem 0.75rem 2rem !important;

      .checkmark {
        top: 50%;
        transform: translateY(-50%) translateX(50%);
      }
    }
  }
}
</style>

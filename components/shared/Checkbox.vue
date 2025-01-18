<template>
        <label
            @click.stop=""
            :id="id"    
            class="container noselct"
            :class="{
                'disabled' : disabled,
                'no-label': label.length == 0,
                'large-font': size == 'large',
                'medium-font': size == 'medium',
                'small-font': size == 'small'
                }"
            :style="{color: labelColor}"
        >
                {{label}}
                <input type="checkbox"
                v-if="value == 'selectall'"
                :disabled="disabled"
                :value="value"
                :checked="isSelectAllChecked"
                @input="handleChange($event)"
                >
                <input type="checkbox"
                v-else
                :disabled="disabled"
                :value="value"
                :checked="isChecked"
                @input="handleChange($event)"
                >
                <span
                        v-if="disabled"
                        class='disabled-checkmark'
                        :class="size"
                ></span>
                <span
                        v-else
                        class='checkmark'
                        :class="size"
                ></span>
        </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "large"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Object, Boolean]
    },
    checkedValue: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    },
    labelColor: {
      type: String,
      default: "#ffffff"
    },
    isSelectAllChecked: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },
  computed: {
    selectedData() {
      return this.checkedValue;
    },
    isChecked() {
      if (this.checkedValue.includes(this.value)) {
        return true;
      }
      return false;
    }
  },
  methods: {
    handleChange(e) {
      this.$emit("onCheckboxChange", e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  // display: block;
  position: relative;
  padding-left: 1.5625rem * 1.22;
  // padding-top: 0.0625rem * 1.22;
  cursor: pointer;
  // @include body1(#{color(secondary-white)});
  // font-family: #{$default-font};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.disabled {
  opacity: 40%;
  cursor: default;
}
.no-label {
  width: 0rem;
}
.large-font {
  font-size: 0.9375rem * 1.22 !important;
}
.medium-font {
  font-size: 0.75rem * 1.22 !important;
}
.small-font {
  font-size: 0.6875rem * 1.22 !important;
}
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  background-color: $color-white;
  border: 0.0625rem solid #{$color-black};
  display: flex;
  justify-content: center;
  align-items: center;
}
.disabled-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #3a393a;
  border: 0.0625rem solid #{$color-black};
  display: flex;
  justify-content: center;
  align-items: center;
}
.large {
  height: 1.125rem * 1.22;
  width: 1.125rem * 1.22;
}
.medium {
  height: 1rem * 1.22;
  width: 1rem * 1.22;
}
.small {
  height: 0.875rem * 1.22;
  width: 0.875rem * 1.22;
}
.container:hover input ~ .checkmark {
  background-color: #{$color-black};
  border: 0.0625rem solid;
}

.container input:checked ~ .checkmark {
  background-color: $color-black;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  width: 0.1875rem * 1.22;
  height: 0.625rem * 1.22;
  border: solid $color-white;
  border-width: 0 0.125rem 0.125rem 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>

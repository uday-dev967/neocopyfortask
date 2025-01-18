<template>
	<div
		class="slidecontainer"
		:class="{ vertical: orientation === 'vertical' }"
	>
		<div class="slider-percentage-wrapper">
			<div class="slider-percentage" :style="getStyleObject"></div>
		</div>
		<input
			v-model="sliderValue"
			type="range"
			:min="min"
			:max="max"
			:step="step"
			class="slider"
			id="myRange"
			@input="handleSliderInput"
		/>
		<div
			class="steps-wrapper"
			:style="{
				'grid-template-columns': `repeat(${totalSteps + 1}, 1fr)`,
			}"
		>
			<div class="step">
				{{ min }}
			</div>
			<div v-for="sliderStep in totalSteps" class="step">
				{{ sliderStep * step }}
			</div>
		</div>
		<div class="slider-value" :style="getStyleObjectForValueObject">
			{{ sliderValue }}
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		this.sliderValue = this.value;
	},
	data() {
		return {
			sliderValue: 0,
		};
	},
	props: {
		value: {
			type: Number,
			default: 0,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		min: {
			type: Number,
			required: false,
			default: 0,
		},
		max: {
			type: Number,
			required: false,
			default: 100,
		},
		step: {
			type: Number,
			required: false,
			default: 1,
		},
		additionalClasses: {
			type: Array,
			required: false,
			default: () => [],
		},
		orientation: {
			type: String,
			required: false,
			default: () => "",
		},
	},
	computed: {
		dynamicParentComponentClasses() {
			let classesToBeReturned = this.additionalClasses;
			if (this.disabled) classesToBeReturned.push("disabled");
			return classesToBeReturned;
		},
		getStyleObject() {
			return { width: (this.sliderValue / this.max) * 100 + "%" };
		},
		getStyleObjectForValueObject() {
			return {
				left: (this.sliderValue / this.max) * 100 + "%",
				transform: `translateY(-30%) translateX(-${
					(this.sliderValue / this.max) * 100
				}%)`,
			};
		},
		totalSteps() {
			return this.max / this.step;
		},
	},
	watch: {
		value(nv) {
			if (nv != this.sliderValue) {
				this.sliderValue = nv;
			}
		},
	},
	methods: {
		handleSliderInput(ev) {
			this.$emit("sliderInput", this.sliderValue);
		},
	},
};
</script>

<style lang="scss" scoped>
.slidecontainer {
	width: 100%;
	position: relative;
	height: 1.125rem;
}

.slider-percentage-wrapper {
	background: rgba(219, 219, 219, 0.6);
	border-radius: 30px;
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
}

.vertical {
	& > * {
		transform: rotate(-90deg);
	}
}

.slider {
	-webkit-appearance: none;
	width: 100%;
	height: 100%;
	border-radius: 30px;
	background: transparent;
	outline: none;
	opacity: 1;
	position: relative;
	padding: 0;
	margin: 0;
}

.slider-percentage {
	border-radius: 30px;
	height: 100%;
	width: 0;
	background-color: $background-14;
}

.steps-wrapper {
	display: grid;
	justify-content: space-between;
	color: $color-light-gray-6;
	font-family: "Work Sans";
	font-size: 0.875rem * 1.22;
	font-style: normal;
	font-weight: 500;
	line-height: 150%;
	margin-top: 1rem * 1.22;
	
	@include custom-min(120em) {
		font-size: 0.875rem;
		margin-top: 1rem;
	}

	.step {
		text-align: center;
	}
}

.slider-value {
	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	top: 0;
	left: 0;
	// width: 5.625rem;
	// height: 2.8125rem;
	width: 4.7408rem * 1.22;
	height: 2.3704rem * 1.22;
	flex-shrink: 0;
	border-radius: 50px;
	background-color: transparent;
	border: 4px solid $border-15;
	transform: translateY(-30%);
	box-sizing: border-box;
	pointer-events: none;

	color: $color-black;
	text-align: center;
	font-size: 1.25rem;
	font-weight: 500;
	line-height: 22.96px;

	@include custom-min(120em) {
		width: 4.7408rem;
		height: 2.3704rem;
	}
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	border-radius: 50%;
	background: $background-white;
	border-radius: 50px;
	border: 4px solid $border-15;
	cursor: pointer;
	width: 4.7408rem * 1.22;
	height: 2.3704rem * 1.22;
	
	@include custom-min(120em) {
		width: 4.7408rem;
		height: 2.3704rem;
	}
}

.slider::-moz-range-thumb {
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	background: $background-white;
	border-radius: 50px;
	border: 4px solid $border-15;
	cursor: pointer;
}
</style>

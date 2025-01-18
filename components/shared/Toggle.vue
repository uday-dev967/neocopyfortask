<template>
        <label class="switch" :class="{'disabled' : disabled}">
                <span :class="{'slider-second-column' : labelFirst}">
                    <input
                        :disabled="disabled"
                        type="checkbox"
                        v-model="toggleValue"
                        @change="handleChange"
                >
                <span class="slider"></span>
                </span>
                <span :class="{'text-first-column' : labelFirst}" class="text">{{label}}</span>
        </label>
</template>

<script>
export default {
    name: "Toggle",
    mounted() {
        this.toggleValue = this.value;
    },
    data() {
        return {
            toggleValue: false,
        };
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: "Label",
        },
        labelFirst: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleChange() {
            this.$emit("onToggleChange", this.toggleValue);
        },
    },
};
</script>

<style lang="scss" scoped>
.switch {
    position: relative;
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    grid-column-gap: 0.75rem;
    cursor: pointer;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
}

.disabled {
    opacity: 40%;
}

.text {
    color: $default-toggle-label-color;
    font-size: 0.9375rem;
    font-weight: 500;
    grid-column: 2;
    line-height: 1;
}

.slider {
    position: relative;
    cursor: pointer;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    width: 24px;
    height: 16px;
    border-radius: 34px;
    grid-column: 1;
    display: grid;
    // align-items: center;
    // justify-content: center;
    background-color: transparent;
    border: 1px solid #C7C9D9;
    
    &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        content: "";
        height: 12px;
        width: 12px;
        background-color: $background-white;
        -webkit-transition: 0.2s;
        -ms-transition: 0.2s;
        transition: 0.2s;
        border-radius: 6.25rem;
        transform: translate(-81%, -50%);
        -webkit-transform: translate(-81%, -50%);
        -ms-transform: translate(-81%, -50%);

        // margin: auto 0;
    }
}

.slider-second-column {
    grid-column: 2 !important;
    grid-row: 1;
}
.text-first-column {
    grid-column: 1 !important;
    grid-row: 1;
}

input:checked + .slider {
    border: none;
}

input:focus + .slider {
    // box-shadow: 0 0 1px red;
}

input:checked + .slider:before {
    -webkit-transform: translate(-13%, -50%);
    -ms-transform: translate(-13%, -50%);
    transform: translate(-13%, -50%);
    background-color: $background-white;
}

input:checked + .slider {
    background-color: $toggle-green;
}
</style>
<template>
    <div class="aspect-ratio-selection-wrapper">
        <div class="selection-prompt-text">
            Choose canvas size
        </div>
        <div class="aspect-ratios-wrapper">
            <div 
                v-for="aspectRatio of availableAspectRatios"
                :key="aspectRatio.text"
                class="aspect-ratio-wrapper"
                :class="{ 'selected': selectedAspectRatio && aspectRatio.text == selectedAspectRatio.text }"
                @click="handleAspectRatioClick(aspectRatio)"
            >
                <div class="image-wrapper" v-html="aspectRatio.svg"></div>
                <div class="aspect-ratio">
                    {{ aspectRatio.text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AspectRatioSelection",
    mounted() {
        this.handleAspectRatioClick(this.availableAspectRatios[0]);
    },
    data() {
        return {
            availableAspectRatios: [
                {
                    text: "16:9",
                    svg: `<svg width="74" height="41" viewBox="0 0 74 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.41397" y="0.5" width="71.1685" height="39.5948" stroke="#757575"/>
                    </svg>`
                },
                {
                    text: "4:3",
                    svg: `<svg width="56" height="41" viewBox="0 0 56 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.43465" y="0.5" width="53.12" height="39.59" stroke="#757575"/>
                    </svg>`
                },
                {
                    text: "Square",
                    svg: `<svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.19608" y="0.5" width="39.59" height="39.59" stroke="#757575"/>
                    </svg>`
                },
                {
                    text: "Potrait",
                    svg: `<svg width="32" height="41" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.26625" y="40.0901" width="39.59" height="29.4425" transform="rotate(-90 1.26625 40.0901)" stroke="#757575"/>
                    </svg>`
                },
            ],
            selectedAspectRatio: null
        };
    },
    props: {},
    methods: {
        handleAspectRatioClick(aspectRatio) {
            this.selectedAspectRatio = aspectRatio;
            this.$emit('aspectRatioChange', aspectRatio);
        }
    },
};
</script>

<style lang="scss" scoped>
.aspect-ratio-selection-wrapper {
    .selection-prompt-text {
        text-align: center;
        margin-bottom: .75rem * 1.22;
        color: $color-second;
        font-weight: 500;
        font-size: .875rem * 1.22;
        line-height: .875rem * 1.22;
    }
    
    .aspect-ratios-wrapper {
        display: flex;
        margin-bottom: 2.625rem * 1.22;

        .aspect-ratio-wrapper {
            text-align: center;
            padding: 1rem * 1.22 1.4375rem * 1.22 .75rem * 1.22 1.4375rem * 1.22;
            background: #2C2929;
            border: 1px solid #757575;
    
            font-weight: 500;
            font-size: .75rem * 1.22;
            line-height: .9375rem * 1.22;
            color: #757575;

            cursor: pointer;
    
            &:not(:last-child) {
                margin-right: .5625rem * 1.22;
            }
    
            .image-wrapper {
                width: 100%;
                height: 2.5rem * 1.22;
                margin-bottom: .6875rem * 1.22;
    
                svg {
                    display: block;
                    height: auto;
                    width: auto;
                    max-height: 100%;
                    max-width: 100%;
                }
            }
    
            &.selected, &:hover {
                background: $background-2;
                border: 1px solid $color-second;
                box-shadow: 0px 11px 33px rgba(0, 0, 0, 0.5);
    
                svg {
                    rect {
                        stroke: $color-second;
                    }
                }
                color: $color-second;
            }
        }
    }

}
</style>

<style lang="scss">
.aspect-ratio-selection-wrapper {
    .aspect-ratio-wrapper {
        &.selected, &:hover {
            svg {
                rect {
                    stroke: $color-second;
                }
            }
        }
    }
}
</style>
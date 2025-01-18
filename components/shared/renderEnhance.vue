<template>
  <section class="render-enhance-component">
    <fullScreenLoader v-show="fullScreenShow" :message="'loading'" ></fullScreenLoader>
    <p class="render-enhance-title">
      {{render.name?render.name:render.extraInfo.thumbnail?getFileName(render.extraInfo.thumbnail,false):`${render.input.view}`}}
    </p>
    <div class="render-enhance-component-container">
      <div class="render-enhance-component-canvas">
        <!-- <img src="~assets/images/test.png" alt=""> -->
        <tui-image-editor ref="tuiImageEditor" :include-ui="useDefaultUI" :options="options"></tui-image-editor>
      </div>
      <div class="render-enhance-filters-container" @click.stop="showColorPicker = false">
        <div class="render-enhance-filters">
          <p
            :class="{ activeTab: activeTab == 'filter' }"
            @click.stop="changeActiveTab('filter')"
          >Filters</p>
          <p :class="{ activeTab: activeTab == 'edit' }" @click.stop="changeActiveTab('edit')">Edit</p>
          <p :class="{ activeTab: activeTab == 'brand' }" @click.stop="changeActiveTab('brand')">Brand</p>
        </div>
        <div class="render-enhance-filters-body">
          <div class="render-filter-container" v-if="activeTab == 'filter'">
            <div @click="imageFilter('original'); applyedFilterEvents('Filter_Original')" :class="{active:appliedFilter == ''}">
              <img src="~assets/images/enhance/original.png" alt />
              <p>Original</p>
            </div>
            <div @click="imageFilter('Sepia'); applyedFilterEvents('Filter_Sepia')" :class="{active:appliedFilter == 'Sepia'}">
              <img src="~assets/images/enhance/sepia.png" alt />
              <p>Sepia</p>
            </div>
            <div @click="imageFilter('Emboss'); applyedFilterEvents('Filter_Emboss')" :class="{active:appliedFilter == 'Emboss'}">
              <img src="~assets/images/enhance/lark.png" alt />
              <p>Emboss</p>
            </div>
            <div @click="imageFilter('Grayscale'); applyedFilterEvents('Filter_Greyscale')" :class="{active:appliedFilter == 'Grayscale'}">
              <img src="~assets/images/enhance/grayscale.png" alt />
              <p>Grey Scale</p>
            </div>
            <div @click="imageFilter('Sharpen'); applyedFilterEvents('Filter_sharpen')" :class="{active:appliedFilter == 'Sharpen'}">
              <img src="~assets/images/enhance/street.png" alt />
              <p>Sharpen</p>
            </div>
            <div @click="imageFilter('BlackWhite'); applyedFilterEvents('Filter_BlackWhite')" :class="{active:appliedFilter == 'BlackWhite'}">
              <img src="~assets/images/enhance/lofi.png" alt />
              <p>Black/White</p>
            </div>
            <!--div @click="imageFilter('Amro')">
              <img src="~assets/images/enhance/amro.png" alt />
              <p>Amro</p>
            </div>
            <div @click="imageFilter('Warm')">
              <img src="~assets/images/enhance/warm.png" alt />
              <p>Warm</p>
            </div>
            <div @click="imageFilter('Kool')">
              <img src="~assets/images/enhance/kool.png" alt />
              <p>Kool</p>
            </div> -->
            <!-- <button @click="applyFilter('Grayscale')">Grayscale</button>
                        <button @click="applyFilter('Sepia')">Sepia</button>
            <button @click="applyFilter('Sepia')">Sepia</button>-->
          </div>
          <!-- <div class="crop-image">
                        <button @click="cropImage">Crop </button>
          </div>-->
          <div class="render-filter-edit" v-if="activeTab == 'edit'">
            <div class="filter-sliders-container">
              <p>Brightness</p>
              <span>{{ brightness/1000 }}</span>
              <label for class="custom-slider-label">
                <div class="custom-slider-track" :style="{ width: percentage(brightness,-1000,1000) }"></div>
                <input type="range" id min="-1000" max="1000" step="/1000" v-model="brightness" @input="applyOtherFilter('Brightness',{'brightness':brightness/1000})" >
              </label>
            </div>
            <div class="filter-sliders-container">
              <p>Contrast</p>
              <span>{{ contrast/1000 }}</span>
              <label for class="custom-slider-label">
                <div class="custom-slider-track" :style="{ width: percentage(contrast,-1000,1000) }"></div>
                <input type="range" id min="-1000" max="1000" step="1" v-model="contrast" @input="applyOtherFilter('Contrast',{'contrast':contrast/1000})" >
              </label>
            </div>
            <div class="filter-sliders-container">
              <p>Saturation</p>
              <span>{{ saturation/1000 }}</span>
              <label for class="custom-slider-label">
                <div class="custom-slider-track" :style="{ width: percentage(saturation,-1000,1000) }"></div>
                <input type="range" id min="-1000" max="1000" step="1" v-model="saturation" @input="applyOtherFilter('Saturation',{'saturation':saturation/1000})" >
              </label>
            </div>
            <div class="filter-sliders-container">
              <p>Hue</p>
              <span>{{ hue/1000 }}</span>
              <label for class="custom-slider-label">
                <div class="custom-slider-track" :style="{ width: percentage(hue,-1000,1000) }"></div>
                <input type="range" id min="-1000" max="1000" step="1" v-model="hue" @input="applyOtherFilter('HueRotation',{'rotation':hue/1000})" >
              </label>
            </div>
            <div class="filter-sliders-container">
              <p>Noise</p>
              <span>{{ noise }}</span>
              <label for class="custom-slider-label">
                <div class="custom-slider-track" :style="{ width: percentage(noise,0,1000) }"></div>
                <input type="range" id min="0" max="1000" step="1" v-model="noise" @input="applyOtherFilter('Noise',{'noise':noise})" >
              </label>
            </div>
            <!-- <div class="filter-sliders-container">
              <p>Blur</p>
              <span>{{ blur }}</span>
              <label for class="custom-slider-label">
                <div class="custom-slider-track" :style="{ width: percentage(blur,0,1000) }"></div>
                <input type="range" id min="0" max="1000" step="1" v-model="blur" @input="applyOtherFilter('Blur',{'blur':blur/1000})" >
              </label>
            </div> -->
            <!-- <div class="filter-sliders-container">
              <p>Pixelate</p>
              <span>{{ pixelate }}</span>
              <label for class="custom-slider-label">
                <div class="custom-slider-track" :style="{ width: percentage(pixelate,2,20) }"></div>
                <input type="range" id min="2" max="20" v-model="pixelate" @input="applyOtherFilter('Pixelate',{'blocksize':pixelate})" >
              </label>
            </div> -->
            <!-- <p class="reset-edit-settings">Reset</p> -->
            <div class="crop-edit-container">
              <p>Crop</p>
              <div class="crop-options">
                <p :class="{'active':cropValue==1.7777777777777777}" @click="cropImage(1.7777777777777777)">16:9</p>
                <p :class="{'active':cropValue==1.3333333333333333}" @click="cropImage(1.3333333333333333)">4:3</p>
                <p :class="{'active':cropValue==1.5}" @click="cropImage(1.5)">3:2</p>
                <p :class="{'active':cropValue==1}" @click="cropImage(1)">1:1</p>
                <p :class="{'active':cropValue==null}" @click="cropImage(null)">Manual</p>
                
              </div>
              <div class="crop-complete-Conatiner" v-if="cropValue != 'na'">
                <p @click="cancelCrop()">Cancel</p>
                <p @click="cropDone()">Done</p>
              </div>
            </div>
            <!-- <div class="undo-container" @click.stop="undo">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="438.536px" height="438.536px" viewBox="0 0 438.536 438.536" style="enable-background:new 0 0 438.536 438.536;"
                xml:space="preserve">
                <g>
                <path d="M421.125,134.191c-11.608-27.03-27.217-50.347-46.819-69.949C354.7,44.639,331.384,29.033,304.353,17.42
                  C277.325,5.807,248.969,0.005,219.275,0.005c-27.978,0-55.052,5.277-81.227,15.843C111.879,26.412,88.61,41.305,68.243,60.531
                  l-37.12-36.835c-5.711-5.901-12.275-7.232-19.701-3.999C3.807,22.937,0,28.554,0,36.547v127.907c0,4.948,1.809,9.231,5.426,12.847
                  c3.619,3.617,7.902,5.426,12.85,5.426h127.907c7.996,0,13.61-3.807,16.846-11.421c3.234-7.423,1.903-13.988-3.999-19.701
                  l-39.115-39.398c13.328-12.563,28.553-22.222,45.683-28.98c17.131-6.757,35.021-10.138,53.675-10.138
                  c19.793,0,38.687,3.858,56.674,11.563c17.99,7.71,33.544,18.131,46.679,31.265c13.134,13.131,23.555,28.69,31.265,46.679
                  c7.703,17.987,11.56,36.875,11.56,56.674c0,19.798-3.856,38.686-11.56,56.672c-7.71,17.987-18.131,33.544-31.265,46.679
                  c-13.135,13.134-28.695,23.558-46.679,31.265c-17.987,7.707-36.881,11.561-56.674,11.561c-22.651,0-44.064-4.949-64.241-14.843
                  c-20.174-9.894-37.209-23.883-51.104-41.973c-1.331-1.902-3.521-3.046-6.567-3.429c-2.856,0-5.236,0.855-7.139,2.566
                  l-39.114,39.402c-1.521,1.53-2.33,3.478-2.426,5.853c-0.094,2.385,0.527,4.524,1.858,6.427
                  c20.749,25.125,45.871,44.587,75.373,58.382c29.502,13.798,60.625,20.701,93.362,20.701c29.694,0,58.05-5.808,85.078-17.416
                  c27.031-11.607,50.34-27.22,69.949-46.821c19.605-19.609,35.211-42.921,46.822-69.949s17.411-55.392,17.411-85.08
                  C438.536,189.569,432.732,161.22,421.125,134.191z"/>
                </g>
                <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
              </svg>
              <p > Undo</p>
            </div> -->
          </div>
          <div class="render-filter-brand" v-if="activeTab == 'brand'" >
            <div class="add-objects-container" >
              <div  class="add-text-container" @click="addBrandText(true); loadFromApi=false">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2012 1.63873V25.6387" stroke="#D48E8E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"/>
                <path d="M25.2012 13.6387H1.20117" stroke="#D48E8E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"/>
                </svg>
                <p>Add Text</p>
              </div>
              <div class="add-logo-container" @click.stop="addIconImage(); loadFromApi=false ">
                <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.14844 13.8837V25.6388H32.1222V13.8837" stroke="#D48E8E" stroke-width="1.2" stroke-miterlimit="10"/>
                <path d="M10.9697 5.88362L16.0691 1.63873L20.6018 5.88362" stroke="#D48E8E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"/>
                <path d="M16.0693 1.63873V19.5979" stroke="#D48E8E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"/>
                </svg>
                <p>Upload Logo</p>
                <img style="display:none;" src="" ref="UploadedImage" alt="">
              </div>
            </div>
            <input type="file"  ref="iconfile"  style="display:none;" @change="changeIconFile()">
            <div v-if="addTextActive && !addLogoActive" class="edit-Text-Container" @click.stop="showColorPicker = false">
              <p>Font-Family</p>
              <select class="font-family-drop" name="" id="" v-model="textObject.style.fontFamily" @change="setTextStyle({'fontFamily':textObject.style.fontFamily})">
                <option v-for="option in fontFamilyOptions" v-bind:value="option">
                  {{ option.slice(0,option.indexOf(',')) }}
                </option>
              </select>
              <div class="font-style-container">
                <p :class="{'active':textObject.style.fontWeight == 'bold'}" @click.stop="textObject.style.fontWeight=textObject.style.fontWeight == 'normal'?'bold':'normal'; setTextStyle({'fontWeight':textObject.style.fontWeight})">B</p>
                <p :class="{'active':textObject.style.fontStyle !== 'normal'}" @click.stop="textObject.style.fontStyle=textObject.style.fontStyle == 'normal'?'italic':'normal'; setTextStyle({'fontStyle':textObject.style.fontStyle})">I</p>
                <p :class="{'active':textObject.style.textDecoration !== 'none'}" @click.stop="textObject.style.textDecoration=textObject.style.textDecoration == 'none'?'underline':'none'; setTextStyle({'textDecoration':textObject.style.textDecoration})">U</p>
                <select name="" id="" v-model="textObject.style.fontSize" @change="setTextStyle({'fontSize':textObject.style.fontSize})">
                  <option v-for="option in 400" v-bind:value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="font-align-container">
                <div :class="{'active':textObject.style.textAlign == 'left'}" class="align-styles" @click.stop="textObject.style.textAlign='left'; setTextStyle({'textAlign':'left'})">
                  <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.29077 0.0976024C1.21623 0.101471 1.14319 0.119985 1.07581 0.152086C1.00843 0.184186 0.948037 0.229245 0.898073 0.28469C0.84811 0.340134 0.809558 0.404877 0.784618 0.475222C0.759679 0.545567 0.74884 0.620136 0.752722 0.69467C0.756604 0.769204 0.775131 0.842243 0.807243 0.909617C0.839355 0.976991 0.884425 1.03738 0.939878 1.08733C0.995331 1.13729 1.06008 1.17583 1.13043 1.20075C1.20078 1.22568 1.27535 1.23651 1.34988 1.23261H17.24C17.3152 1.23368 17.3899 1.21978 17.4597 1.19174C17.5295 1.1637 17.593 1.12206 17.6465 1.06926C17.7001 1.01646 17.7426 0.953538 17.7716 0.884156C17.8007 0.814775 17.8156 0.740316 17.8156 0.665107C17.8156 0.589899 17.8007 0.51544 17.7716 0.446058C17.7426 0.376677 17.7001 0.313756 17.6465 0.260953C17.593 0.20815 17.5295 0.166517 17.4597 0.138475C17.3899 0.110432 17.3152 0.0965389 17.24 0.0976024H1.34988C1.33019 0.0965756 1.31046 0.0965756 1.29077 0.0976024ZM1.29077 3.31346C1.21623 3.31733 1.14319 3.33585 1.07581 3.36795C1.00843 3.40005 0.948037 3.44511 0.898073 3.50055C0.84811 3.556 0.809558 3.62074 0.784618 3.69108C0.759679 3.76143 0.74884 3.836 0.752722 3.91053C0.756604 3.98507 0.775131 4.05811 0.807243 4.12548C0.839355 4.19285 0.884425 4.25324 0.939878 4.30319C0.995331 4.35315 1.06008 4.39169 1.13043 4.41662C1.20078 4.44154 1.27535 4.45237 1.34988 4.44847H12.7C12.7752 4.44954 12.8498 4.43564 12.9196 4.4076C12.9894 4.37956 13.0529 4.33793 13.1065 4.28512C13.16 4.23232 13.2026 4.1694 13.2316 4.10002C13.2606 4.03064 13.2756 3.95618 13.2756 3.88097C13.2756 3.80576 13.2606 3.7313 13.2316 3.66192C13.2026 3.59254 13.16 3.52962 13.1065 3.47681C13.0529 3.42401 12.9894 3.38238 12.9196 3.35434C12.8498 3.32629 12.7752 3.3124 12.7 3.31346H1.34988C1.33019 3.31244 1.31046 3.31244 1.29077 3.31346ZM1.29077 6.52933C1.21623 6.53319 1.14319 6.55171 1.07581 6.58381C1.00843 6.61591 0.948037 6.66097 0.898073 6.71641C0.84811 6.77186 0.809558 6.8366 0.784618 6.90694C0.759679 6.97729 0.74884 7.05186 0.752722 7.12639C0.756604 7.20093 0.775131 7.27397 0.807243 7.34134C0.839355 7.40871 0.884425 7.4691 0.939878 7.51905C0.995331 7.56901 1.06008 7.60755 1.13043 7.63248C1.20078 7.6574 1.27535 7.66823 1.34988 7.66433H17.24C17.3152 7.6654 17.3899 7.6515 17.4597 7.62346C17.5295 7.59542 17.593 7.55379 17.6465 7.50098C17.7001 7.44818 17.7426 7.38526 17.7716 7.31588C17.8007 7.2465 17.8156 7.17204 17.8156 7.09683C17.8156 7.02162 17.8007 6.94716 17.7716 6.87778C17.7426 6.8084 17.7001 6.74548 17.6465 6.69268C17.593 6.63987 17.5295 6.59824 17.4597 6.5702C17.3899 6.54216 17.3152 6.52826 17.24 6.52933H1.34988C1.33019 6.5283 1.31046 6.5283 1.29077 6.52933ZM1.29077 9.74519C1.21623 9.74906 1.14319 9.76757 1.07581 9.79967C1.00843 9.83177 0.948037 9.87683 0.898073 9.93227C0.84811 9.98772 0.809558 10.0525 0.784618 10.1228C0.759679 10.1932 0.74884 10.2677 0.752722 10.3423C0.756604 10.4168 0.775131 10.4898 0.807243 10.5572C0.839355 10.6246 0.884425 10.685 0.939878 10.7349C0.995331 10.7849 1.06008 10.8234 1.13043 10.8483C1.20078 10.8733 1.27535 10.8841 1.34988 10.8802H12.7C12.7752 10.8813 12.8498 10.8674 12.9196 10.8393C12.9894 10.8113 13.0529 10.7696 13.1065 10.7168C13.16 10.664 13.2026 10.6011 13.2316 10.5317C13.2606 10.4624 13.2756 10.3879 13.2756 10.3127C13.2756 10.2375 13.2606 10.163 13.2316 10.0936C13.2026 10.0243 13.16 9.96134 13.1065 9.90854C13.0529 9.85573 12.9894 9.8141 12.9196 9.78606C12.8498 9.75802 12.7752 9.74412 12.7 9.74519H1.34988C1.33019 9.74416 1.31046 9.74416 1.29077 9.74519ZM1.29077 12.961C1.21623 12.9649 1.14319 12.9834 1.07581 13.0155C1.00843 13.0476 0.948037 13.0927 0.898073 13.1481C0.84811 13.2036 0.809558 13.2683 0.784618 13.3387C0.759679 13.409 0.74884 13.4836 0.752722 13.5581C0.756604 13.6327 0.775131 13.7057 0.807243 13.7731C0.839355 13.8404 0.884425 13.9008 0.939878 13.9508C0.995331 14.0007 1.06008 14.0393 1.13043 14.0642C1.20078 14.0891 1.27535 14.1 1.34988 14.0961H17.24C17.3152 14.0971 17.3899 14.0832 17.4597 14.0552C17.5295 14.0271 17.593 13.9855 17.6465 13.9327C17.7001 13.8799 17.7426 13.817 17.7716 13.7476C17.8007 13.6782 17.8156 13.6038 17.8156 13.5286C17.8156 13.4533 17.8007 13.3789 17.7716 13.3095C17.7426 13.2401 17.7001 13.1772 17.6465 13.1244C17.593 13.0716 17.5295 13.03 17.4597 13.0019C17.3899 12.9739 17.3152 12.96 17.24 12.961H1.34988C1.33019 12.96 1.31046 12.96 1.29077 12.961Z" fill="#292929"/>
                  </svg>
                </div>
                <div :class="{'active':textObject.style.textAlign == 'center'}" class="align-styles" @click.stop="textObject.style.textAlign='center'; setTextStyle({'textAlign':'center'})">
                  <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.982333 0.0968323C0.907803 0.100683 0.834761 0.119176 0.767377 0.151255C0.699994 0.183334 0.639589 0.228371 0.58961 0.283795C0.539632 0.339219 0.50106 0.403944 0.476096 0.474274C0.451132 0.544605 0.440266 0.619164 0.444116 0.693695C0.447967 0.768225 0.46646 0.841267 0.498539 0.908651C0.530618 0.976034 0.575655 1.03644 0.631079 1.08642C0.686503 1.1364 0.751228 1.17497 0.821559 1.19993C0.891889 1.2249 0.966448 1.23576 1.04098 1.23191H16.9321C17.0066 1.2329 17.0806 1.21921 17.1498 1.19161C17.2191 1.164 17.2822 1.12303 17.3356 1.07103C17.389 1.01904 17.4317 0.957027 17.4611 0.888551C17.4905 0.820074 17.5062 0.746469 17.5072 0.671939C17.5082 0.597409 17.4945 0.523412 17.4669 0.454175C17.4393 0.384938 17.3983 0.321815 17.3463 0.268412C17.2943 0.215008 17.2323 0.172369 17.1638 0.142929C17.0954 0.11349 17.0217 0.097826 16.9472 0.0968323H0.982333Z" fill="#292929"/>
                    <path d="M3.18351 3.31285C3.03298 3.32062 2.89172 3.38788 2.79078 3.49981C2.68985 3.61174 2.63751 3.75919 2.64529 3.90971C2.65307 4.06023 2.72032 4.2015 2.83225 4.30243C2.94419 4.40337 3.09163 4.4557 3.24215 4.44793H14.5929C14.7435 4.45018 14.8887 4.39255 14.9967 4.28772C15.1048 4.18288 15.1667 4.03942 15.169 3.8889C15.1712 3.73838 15.1136 3.59313 15.0088 3.48509C14.9039 3.37706 14.7605 3.3151 14.61 3.31285H3.24215C3.22265 3.31096 3.20301 3.31096 3.18351 3.31285Z" fill="#292929"/>
                    <path d="M0.982334 6.52859C0.831813 6.53637 0.690546 6.60362 0.589611 6.71556C0.488676 6.82749 0.43634 6.97494 0.444117 7.12546C0.451894 7.27598 0.519147 7.41724 0.63108 7.51818C0.743013 7.61912 0.890459 7.67145 1.04098 7.66367H16.9321C17.0066 7.66467 17.0806 7.65097 17.1498 7.62337C17.2191 7.59576 17.2822 7.55479 17.3356 7.5028C17.389 7.4508 17.4317 7.38879 17.4611 7.32031C17.4905 7.25184 17.5062 7.17823 17.5072 7.1037C17.5082 7.02917 17.4945 6.95517 17.4669 6.88594C17.4393 6.8167 17.3983 6.75358 17.3463 6.70017C17.2943 6.64677 17.2323 6.60413 17.1638 6.57469C17.0954 6.54525 17.0217 6.52959 16.9472 6.52859H0.982334Z" fill="#292929"/>
                    <path d="M3.18351 9.7449C3.03298 9.75268 2.89172 9.81993 2.79078 9.93187C2.68985 10.0438 2.63751 10.1912 2.64529 10.3418C2.65307 10.4923 2.72032 10.6336 2.83225 10.7345C2.94419 10.8354 3.09163 10.8878 3.24215 10.88H14.5929C14.7435 10.8822 14.8887 10.8246 14.9967 10.7198C15.1048 10.6149 15.1667 10.4715 15.169 10.321C15.1712 10.1704 15.1136 10.0252 15.0088 9.91715C14.9039 9.80912 14.7605 9.74716 14.61 9.7449H3.18351Z" fill="#292929"/>
                    <path d="M0.982333 12.9609C0.907803 12.9648 0.834761 12.9833 0.767377 13.0153C0.699994 13.0474 0.639589 13.0925 0.58961 13.1479C0.539632 13.2033 0.50106 13.268 0.476096 13.3384C0.451132 13.4087 0.440266 13.4832 0.444116 13.5578C0.447967 13.6323 0.46646 13.7054 0.498539 13.7727C0.530618 13.8401 0.575655 13.9005 0.631079 13.9505C0.686503 14.0005 0.751228 14.0391 0.821559 14.064C0.891889 14.089 0.966448 14.0998 1.04098 14.096H16.9321C17.0826 14.098 17.2278 14.0401 17.3356 13.9351C17.4435 13.8301 17.5052 13.6865 17.5072 13.536C17.5092 13.3855 17.4513 13.2404 17.3463 13.1325C17.2413 13.0246 17.0977 12.9629 16.9472 12.9609H1.04098C1.02148 12.959 1.00184 12.959 0.982333 12.9609Z" fill="#292929"/>
                  </svg>
                </div>
                <div :class="{'active':textObject.style.textAlign == 'right'}" class="align-styles" @click.stop="textObject.style.textAlign='right'; setTextStyle({'textAlign':'right'})">
                  <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.1506 0.0976024C17.2252 0.101471 17.2982 0.119985 17.3656 0.152086C17.433 0.184186 17.4934 0.229245 17.5433 0.28469C17.5933 0.340134 17.6318 0.404877 17.6568 0.475222C17.6817 0.545567 17.6926 0.620136 17.6887 0.69467C17.6848 0.769204 17.6663 0.842243 17.6342 0.909617C17.6021 0.976991 17.557 1.03738 17.5015 1.08733C17.4461 1.13729 17.3813 1.17583 17.311 1.20075C17.2406 1.22568 17.1661 1.23651 17.0915 1.23261H1.20138C1.12618 1.23368 1.05152 1.21978 0.981735 1.19174C0.911949 1.1637 0.848434 1.12206 0.79488 1.06926C0.741325 1.01646 0.698797 0.953538 0.669771 0.884156C0.640745 0.814775 0.625797 0.740316 0.625797 0.665107C0.625797 0.589899 0.640745 0.51544 0.669771 0.446058C0.698797 0.376677 0.741325 0.313756 0.79488 0.260953C0.848434 0.20815 0.911949 0.166517 0.981735 0.138475C1.05152 0.110432 1.12618 0.0965389 1.20138 0.0976024H17.0915C17.1112 0.0965756 17.1309 0.0965756 17.1506 0.0976024ZM17.1506 3.31346C17.2252 3.31733 17.2982 3.33585 17.3656 3.36795C17.433 3.40005 17.4934 3.44511 17.5433 3.50055C17.5933 3.556 17.6318 3.62074 17.6568 3.69108C17.6817 3.76143 17.6926 3.836 17.6887 3.91053C17.6848 3.98507 17.6663 4.05811 17.6342 4.12548C17.6021 4.19285 17.557 4.25324 17.5015 4.30319C17.4461 4.35315 17.3813 4.39169 17.311 4.41662C17.2406 4.44154 17.1661 4.45237 17.0915 4.44847H5.74142C5.66622 4.44954 5.59156 4.43564 5.52177 4.4076C5.45199 4.37956 5.38848 4.33793 5.33492 4.28512C5.28136 4.23232 5.23884 4.1694 5.20981 4.10002C5.18078 4.03064 5.16584 3.95618 5.16584 3.88097C5.16584 3.80576 5.18078 3.7313 5.20981 3.66192C5.23884 3.59254 5.28136 3.52962 5.33492 3.47681C5.38848 3.42401 5.45199 3.38238 5.52177 3.35434C5.59156 3.32629 5.66622 3.3124 5.74142 3.31346H17.0915C17.1112 3.31244 17.1309 3.31244 17.1506 3.31346ZM17.1506 6.52933C17.2252 6.53319 17.2982 6.55171 17.3656 6.58381C17.433 6.61591 17.4934 6.66097 17.5433 6.71641C17.5933 6.77186 17.6318 6.8366 17.6568 6.90694C17.6817 6.97729 17.6926 7.05186 17.6887 7.12639C17.6848 7.20093 17.6663 7.27397 17.6342 7.34134C17.6021 7.40871 17.557 7.4691 17.5015 7.51905C17.4461 7.56901 17.3813 7.60755 17.311 7.63248C17.2406 7.6574 17.1661 7.66823 17.0915 7.66433H1.20138C1.12618 7.6654 1.05152 7.6515 0.981735 7.62346C0.911949 7.59542 0.848434 7.55379 0.79488 7.50098C0.741325 7.44818 0.698797 7.38526 0.669771 7.31588C0.640745 7.2465 0.625797 7.17204 0.625797 7.09683C0.625797 7.02162 0.640745 6.94716 0.669771 6.87778C0.698797 6.8084 0.741325 6.74548 0.79488 6.69268C0.848434 6.63987 0.911949 6.59824 0.981735 6.5702C1.05152 6.54216 1.12618 6.52826 1.20138 6.52933H17.0915C17.1112 6.5283 17.1309 6.5283 17.1506 6.52933ZM17.1506 9.74519C17.2252 9.74906 17.2982 9.76757 17.3656 9.79967C17.433 9.83177 17.4934 9.87683 17.5433 9.93227C17.5933 9.98772 17.6318 10.0525 17.6568 10.1228C17.6817 10.1932 17.6926 10.2677 17.6887 10.3423C17.6848 10.4168 17.6663 10.4898 17.6342 10.5572C17.6021 10.6246 17.557 10.685 17.5015 10.7349C17.4461 10.7849 17.3813 10.8234 17.311 10.8483C17.2406 10.8733 17.1661 10.8841 17.0915 10.8802H5.74142C5.66622 10.8813 5.59156 10.8674 5.52177 10.8393C5.45199 10.8113 5.38848 10.7696 5.33492 10.7168C5.28136 10.664 5.23884 10.6011 5.20981 10.5317C5.18078 10.4624 5.16584 10.3879 5.16584 10.3127C5.16584 10.2375 5.18078 10.163 5.20981 10.0936C5.23884 10.0243 5.28136 9.96134 5.33492 9.90854C5.38848 9.85573 5.45199 9.8141 5.52177 9.78606C5.59156 9.75802 5.66622 9.74412 5.74142 9.74519H17.0915C17.1112 9.74416 17.1309 9.74416 17.1506 9.74519ZM17.1506 12.961C17.2252 12.9649 17.2982 12.9834 17.3656 13.0155C17.433 13.0476 17.4934 13.0927 17.5433 13.1481C17.5933 13.2036 17.6318 13.2683 17.6568 13.3387C17.6817 13.409 17.6926 13.4836 17.6887 13.5581C17.6848 13.6327 17.6663 13.7057 17.6342 13.7731C17.6021 13.8404 17.557 13.9008 17.5015 13.9508C17.4461 14.0007 17.3813 14.0393 17.311 14.0642C17.2406 14.0891 17.1661 14.1 17.0915 14.0961H1.20138C1.12618 14.0971 1.05152 14.0832 0.981735 14.0552C0.911949 14.0271 0.848434 13.9855 0.79488 13.9327C0.741325 13.8799 0.698797 13.817 0.669771 13.7476C0.640745 13.6782 0.625797 13.6038 0.625797 13.5286C0.625797 13.4533 0.640745 13.3789 0.669771 13.3095C0.698797 13.2401 0.741325 13.1772 0.79488 13.1244C0.848434 13.0716 0.911949 13.03 0.981735 13.0019C1.05152 12.9739 1.12618 12.96 1.20138 12.961H17.0915C17.1112 12.96 17.1309 12.96 17.1506 12.961Z" fill="#292929"/>
                  </svg>
                </div>
                <div class="align-styles" :style="{'background':textObject.style.fill}" style="border: 1px solid;" @click.stop="showColorPicker = !showColorPicker">
                  <!-- <span></span> -->
                  <!-- <span ></span> -->
                  <div class="custom-color-picker" v-if="showColorPicker" @click.stop="">
                    <photoshop-picker :value="fill" @input="updateColorValue" @click.stop=""/>
                  </div>
                </div>
              </div>
              <div v-show="false">
                <p @click.stop="backFromTextEditor">Back</p>
              </div>
             
            </div>
            <div v-if="!addTextActive && addLogoActive" class="edit-logo-Container">
              <p>Logo</p>
              <div class="filter-sliders-container">
                <p>Transparency</p>
                <span>{{ transparency }}</span>
                <label for class="custom-slider-label">
                  <div class="custom-slider-track" :style="{ width: percentage(transparency,0,1000) }"></div>
                  <input type="range" id min="0" max="1000" step="1" v-model="transparency" @input="changeImageOpacity(transparency/1000)" >
                </label>
              </div>
              <div v-show="false">
                <p @click.stop="backFromTextEditor">Back</p>
              </div>
            </div>
            <div class="save-template-container" v-if="!addTextActive && !addLogoActive">
              <p>Saved Templates</p>
              <div v-if="brandData && brandData.length>0" class="save-templates">
                <div v-for="(item, index) in brandData" :key="index" @click.stop="applyBranding(item)">
                  <img v-if="item.imageUrl" :src="item.imageUrl" alt="">
                </div>
              </div>
              <div v-else class="no-template-container">
                <svg width="131" height="133" viewBox="0 0 131 133" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M117.072 128.908V131.206H114.774" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M3.71178 131.206H1.41406V128.908" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M1.41406 124.439V19.4215" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.12 7.12"/>
                  <path d="M114.774 14.8887H117.072V17.1865" stroke="white" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M98.3981 109.889H20.4219V87.7543C25.289 81.3035 29.3622 78.894 33.8823 78.5394C36.1822 78.3589 38.6332 78.7071 41.4146 79.3783C43.6472 79.917 46.0666 80.6568 48.7744 81.4849C49.4448 81.6899 50.1329 81.9003 50.8402 82.1143C54.4229 83.1988 57.1464 83.5512 59.3972 83.2373C61.6674 82.9207 63.4102 81.9329 65.0372 80.434C66.5731 79.019 68.0251 77.1286 69.7259 74.9141C69.8066 74.8092 69.8877 74.7035 69.9695 74.5971C71.7856 72.234 73.9204 69.4839 76.7927 66.4478C82.4675 60.4495 87.9304 59.4332 91.9461 59.8706C93.9666 60.0906 95.6386 60.6811 96.805 61.2166C97.3876 61.4841 97.8424 61.7371 98.1493 61.9217C98.2477 61.981 98.3309 62.0331 98.3981 62.0764V109.889Z" stroke="#888888"/>
                  <path d="M46.5179 56.0281C46.5179 60.0409 43.2649 63.2939 39.2521 63.2939C35.2393 63.2939 31.9863 60.0409 31.9863 56.0281C31.9863 52.0153 35.2393 48.7623 39.2521 48.7623C43.2649 48.7623 46.5179 52.0153 46.5179 56.0281Z" stroke="#888888"/>
                  <path d="M110.33 131.203H5.93457" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.08 7.08"/>
                  <path d="M1.41406 17.187V14.8893H3.71178" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M8.15625 14.8825H112.552" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.08 7.08"/>
                  <path d="M117.072 21.6531V126.67" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.12 7.12"/>
                  <path d="M123.673 21.0647C127.2 17.5379 127.2 11.8199 123.673 8.29319C120.146 4.76645 114.428 4.76645 110.901 8.29319C107.375 11.8199 107.375 17.5379 110.901 21.0647C114.428 24.5914 120.146 24.5914 123.673 21.0647Z" fill="#EBBEB5"/>
                  <path d="M117.213 9.07735V20.2805" stroke="#4D4C4D" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M122.963 14.6789H111.76" stroke="#4D4C4D" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                  <rect x="14.4004" y="1.90747" width="115.658" height="116.324" fill="#E8E8E8"/>
                  <path d="M130.058 115.933V118.231H127.761" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M16.6981 118.231H14.4004V115.933" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M14.4004 111.463V6.44638" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.12 7.12"/>
                  <path d="M127.761 1.9136H130.058V4.21133" stroke="white" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M111.384 96.9135H33.4082V74.7792C38.2754 68.3283 42.3485 65.9189 46.8686 65.5642C49.1685 65.3838 51.6196 65.732 54.4009 66.4031C56.6336 66.9419 59.0529 67.6817 61.7608 68.5097C62.4312 68.7147 63.1192 68.9251 63.8265 69.1392C67.4092 70.2237 70.1327 70.576 72.3835 70.2621C74.6537 69.9455 76.3965 68.9578 78.0235 67.4589C79.5595 66.0438 81.0114 64.1534 82.7123 61.939C82.7929 61.834 82.8741 61.7283 82.9559 61.6219C84.7719 59.2589 86.9067 56.5087 89.779 53.4727C95.4538 47.4744 100.917 46.458 104.932 46.8954C106.953 47.1155 108.625 47.7059 109.791 48.2414C110.374 48.5089 110.829 48.762 111.136 48.9466C111.234 49.0058 111.317 49.0579 111.384 49.1012V96.9135Z" stroke="#888888"/>
                  <path d="M59.5042 43.053C59.5042 47.0657 56.2512 50.3187 52.2384 50.3187C48.2257 50.3187 44.9727 47.0657 44.9727 43.053C44.9727 39.0402 48.2257 35.7872 52.2384 35.7872C56.2512 35.7872 59.5042 39.0402 59.5042 43.053Z" stroke="#888888"/>
                  <path d="M123.316 118.231H18.9209" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.08 7.08"/>
                  <path d="M14.4004 4.21194V1.91422H16.6981" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M21.1426 1.90741H125.538" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.08 7.08"/>
                  <path d="M130.059 8.68146V113.699" stroke="#888888" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.12 7.12"/>
                </svg>
                <p>No saved brand templates yet</p>
              </div>
            </div>
             <div v-if="addTextActive || addLogoActive" id="save-as-template-container" @click="saveAsTemplate = !saveAsTemplate; saveAsTemplateSelected(saveAsTemplate)">
                <svg v-if="saveAsTemplate"  width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.578125" y="0.956535" width="16" height="16" fill="#D48E8E"/>
                <path d="M13.4222 6.21357L12.6811 5.45654L6.79426 11.1581L4.52317 8.63289L3.73438 9.34227L6.38133 12.2804C6.44576 12.3518 6.52796 12.4047 6.61956 12.4339C6.71071 12.4622 6.80799 12.464 6.90014 12.4392C6.99179 12.4179 7.07596 12.3722 7.14366 12.3069L13.4222 6.21357Z" fill="white"/>
                </svg>
                <svg v-else width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.75" y="1.45654" width="15" height="15" stroke="white"/>
                </svg>
                <p>Save as a new template</p>
              </div>
          </div>
          <!-- <div class="undo-redo-container" v-if="false">
            <svg @click.stop="undo" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.95478 0.6521L0.942383 5.67431L5.95478 10.1718" stroke="#222021" stroke-miterlimit="10"/>
            <path d="M1.85352 5.67432H13.777C16.3591 5.74927 18.3337 8.07298 18.3337 10.9964C18.3337 13.9197 16.2832 16.3184 13.777 16.3184H9.29617H2.84081" stroke="#222021" stroke-miterlimit="10"/>
            </svg>
            <svg @click.stop="redo" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.6123 1.31836L18.6247 6.34057L13.6123 10.8381" stroke="#222021" stroke-miterlimit="10"/>
            <path d="M17.7136 6.34058H5.79013C3.20798 6.41553 1.2334 8.73924 1.2334 11.6626C1.2334 14.586 3.28392 16.9847 5.79013 16.9847H10.2709H16.7263" stroke="#222021" stroke-miterlimit="10"/>
            </svg>
          </div> -->
        </div>
        <div class="render-enhance-filters-button">
          <button @click.stop="cancelConfirmWindow=true">Cancel</button>
          <button @click.stop="saveEnhaceRender">Save</button>
        </div>
        <!-- <img :src="thumnailSrc" id="outputImage" alt=""> -->
      </div>
      <div class="popup-div" :class="cancelConfirmWindow?'showPopUp':''">
        <div class="popup-container">
          <div class="close-popup" @click="cancelConfirmWindow = false">
            <svg
                width="24"
                height="24"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
                fill="white"
                />
            </svg>
          </div>
          <div class="popup-head">
              <h2>Do you want to cancel?</h2>
              <p class="sub-text">Changes made will not be saved</p>
          </div>
          <div class="popup-details">

          </div>
          <div class="invite-button-container">
              <button class="cancel-button" @click.stop="cancelConfirmWindow = false">No</button>
              <button class="update-address" @click.stop="cancelRender">Yes</button>
          </div>
        </div>
    </div>
    </div>
    <MessageComponent :changeRight="message" />
  </section>
</template>
<script>
import ImageEditor from "../../static/js/toast-ui.vue-image-editor-master/src/ImageEditor.vue";
import { Chrome } from 'vue-color'
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import fullScreenLoader from "@/components/shared/fullScreenLoader.vue";
export default {
  components: {
    "tui-image-editor": ImageEditor,
    'photoshop-picker': Chrome,
    fullScreenLoader
  },
  head(){
    return{
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Allura&display=swap' }
      ]
    }
  },
  props:{
    render:Object
  },
  data() {
    return {
      useDefaultUI: false,
      options: {
        // for tui-image-editor component's "options" prop
        cssMaxWidth: window.innerWidth,
        cssMaxHeight: window.innerHeight
      },
      fontFamilyOptions:['Arial, Helvetica, sans-serif',
      '"Arial Black", Gadget, sans-serif',
      '"Comic Sans MS", cursive, sans-serif',
      'Impact, Charcoal, sans-serif',
      '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
      'Tahoma, Geneva, sans-serif',
      '"Trebuchet MS", Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif',
      "Comic Sans, Comic Sans MS, cursive",
      '"Lucida Console", Monaco, monospace',
      '"Courier New", Courier, monospace',
      "'Allura', cursive"
      ],
      textObject:{
        title:'Change Text',
        style:{
          fontSize:48,
          fontStyle:'normal',
          fontWeight:'normal',
          textAlign:'center',
          textDecoration:'none',
          fill:'#000',
          fontFamily:'Arial, Helvetica, sans-serif',
        },
        position:{
          x:100,
          y:100,
          translateX:0,
          translateY:0
        },
      },
      transparency:1000,
      fill:'#000',
      fontSizeOptions:[10,11,12,13,14,15,16,17,18,19,20,24,30,32,48],
      cropValue:'na',
      appliedFilter: "",
      // activeTab: "brand",
      showColorPicker:false,
      brightness: 0,
      contrast:0,
      saturation:0,
      blur:0,
      noise:0,
      hue:0,
      min: -1,
      max: 1,
      cropMode:undefined,
      debounce:null,
      mainImageUrl:undefined,
      link : document.createElement( 'a' ),
      thumnailSrc:'',
      cancelConfirmWindow:false,
      message: {
          value: "",
          error: false,
          global: false
      },
      templates:false,
      addTextActive:false,
      addLogoActive:false,
      textObjectId:undefined,
      textObjectArray:[],
      iconFile:undefined,
      imageObjectArray:[],
      imageActiveObjectId:undefined,
      undoFilter:false,
      saveAsTemplate:false,
      allowedExtensions:['jpg','jpeg','png','gif'],
      loadFromApi:false,
      editingText:false,
      mainImage:{
        height:0,
        width:0
      },
      fullScreenShow:false
    };
  },
  mounted() {
    // const drawingMode = this.$refs.tuiImageEditor.invoke('getDrawingMode');
    
    this.downloadRenderAPi({uri:this.render.output["1"][0]}).then(res => {
      this.mainImageUrl = res.url
      this.$refs.tuiImageEditor
      .invoke("loadImageFromURL", res.url, "render image")
      .then(res => {
        const imgRatio = res.newWidth/res.newHeight
        this.mainImage.width = res.newWidth;
        this.mainImage.height = res.newHeight
        const imageHeight = window.innerHeight * 0.8;
        const imageWidth = imageHeight * imgRatio
        this.$refs.tuiImageEditor.invoke("resizeCanvasDimension", {
          width: imageWidth,
          height: imageHeight
        }).then(res => {
          this.$refs.tuiImageEditor.invoke("clearUndoStack")
          if(this.render.info && this.render.info.enhanceOptions)
           this.loadingUserData();
        })
        document.addEventListener('keydown', (event) => {
            // if(lastDownTarget == canvas) {
              // console.log(event)
          if(!this.editingText)
            if(event.key == "Delete" || event.key =="Backspace"){
              // console.log(this.textObjectId)
              this.deleteHandler()
            }
            // }
        }, false);
      });
      
    })
    this.link.style.display = 'none';
    document.body.appendChild( this.link );
    this.getBrandTemplate().then(res => {
    })
    
   this.objectActiveHandler();
  },
  computed: {
    ...mapState({
      user:state => state.User.user,
      brandData:state => state.Render.brands,
      activeTab:state => state.Render.activeTab
    })
  },
  methods: {
    ...mapActions({
      downloadRenderAPi: 'Render/downloadRender',
      getUploadUrl: "Render/getUploadUrl",
      enhanceImageUrl:'Render/enhanceImageUrl',
      fetchRenderById:'Render/fetchRenderById',
      getBrandImageUrl:'Render/getBrandImageUrl',
      saveBrandTemplate:'Render/saveBrandTemplate',
      getBrandTemplate:'Render/getBrandTemplate'
    }),
    ...mapMutations({
        setSelectedRender: "Render/setSelectedRender",
        setActiveTab:"Render/setActiveTab"
    }),
    changeActiveTab(data){
      this.setActiveTab(data);
    },
    getFileName(file,index){
        if(index){
            return file.slice(file.lastIndexOf('/')+1,file.lastIndexOf('?'))
        }else
            return file.slice(file.lastIndexOf('/')+1,file.lastIndexOf('.')).replace(".effectsResult","")
    },
    async imageFilter(filter) {
      try {
        if(filter == 'original'){
          await this.removeFilter(this.appliedFilter)
          this.appliedFilter = ''
          return '';
        }
        if (this.appliedFilter) {
          await this.removeFilter(this.appliedFilter)
          this.appliedFilter = ''
        }
        await this.applyFilter(filter)
        this.appliedFilter = filter;
      } catch (err) {
        console.log(err);
      }
    },
    async removeFilter(filterName){
      try {
        var removeFilterResponse = await this.$refs.tuiImageEditor.invoke(
          "removeFilter",
          filterName
        );
        return removeFilterResponse;
      } catch (error) {
        console.log(error);
        
      }
    },
    async applyFilter(filter){
      try {
        var addedFilterresponse = this.$refs.tuiImageEditor.invoke(
            "applyFilter",
            filter
        );
        return addedFilterresponse;
      } catch (error) {
        console.log(error)
      }
    },
    async applyOtherFilterForPreData(filter,value){
      return await this.$refs.tuiImageEditor.invoke("applyFilter", filter, value);
    },
    applyOtherFilter(filter,value){
      if(window.analytics)
        window.analytics.track('gallery_'+filter+'_edited', {
            title: 'Edit the '+filter,
            subtitle: 'Edit the '+filter,
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      if(!this.undoFilter){
          clearTimeout(this.debounce)
          this.debounce = setTimeout(() => {
            this.$refs.tuiImageEditor.invoke("applyFilter", filter, value).then(obj =>{
              console.log(obj)
            }).catch(err => {
              console.error(err)
            })
          }, 500)
      }
      this.undoFilter = false
      
    },
    async cropImage(ratio) {
      this.cropValue = ratio;
      if(window.analytics && ratio)
        window.analytics.track('gallery_crop_preset_used', {
            title: 'Crop_any aspect ratio_selected',
            subtitle: 'Crop_any aspect ratio_selected',
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      if(window.analytics && !ratio)
        window.analytics.track('gallery_crop_manual', {
            title: 'Crop_manual',
            subtitle: 'Crop_manual',
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      var stopDrawing = await this.$refs.tuiImageEditor.invoke(
        "stopDrawingMode"
      );
      var cropper = await this.$refs.tuiImageEditor.invoke(
        "startDrawingMode",
        "CROPPER"
      );
      // setCropzoneRect(mode)
      
      if(ratio){
        var cropzone = await this.$refs.tuiImageEditor.invoke(
          "setCropzoneRect",
          ratio
        );
      }
    },
    async undo(){
      var undoStack = await this.$refs.tuiImageEditor.invoke(
        "isEmptyUndoStack"
      );
      
      if(!undoStack){
        var undoStack = await this.$refs.tuiImageEditor.invoke(
          "undo"
        );
      if(undoStack){
        // if(undoStack.type == 'appliedFilter')
        // this.applyFilter(this.render.info.enhanceOptions[key])
        this.undoFilter = true;
        if(undoStack.type == "Brightness" )
          this.brightness =  undoStack.options.brightness*1000
        if(undoStack.type == "Contrast")
          this.contrast =  undoStack.options.contrast*1000
        if(undoStack.type == 'Saturation')
          this.saturation =  undoStack.options.saturation*1000
        if(undoStack.type == "HueRotation")
          this.hue = undoStack.options.rotation*1000
        if(undoStack.type == 'Noise' )
          this.noise =  undoStack.options.noise
        
          // if(undoStack.type == 'blur' && this.render.info.enhanceOptions[key])
            
          // if(key == 'cropMode')
          //   setTimeout(() => {
          //     this.$refs.tuiImageEditor.invoke(
          //       "crop",
          //       this.render.info.enhanceOptions[key]
          //     );
          // }, 100); 
        }     
      }
    },
    async cropDone(){
      if(window.analytics)
        window.analytics.track('gallery_crop_done', {
            title: 'Crop_done',
            subtitle: 'Crop_done',
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      var drawingMode = await this.$refs.tuiImageEditor.invoke(
        "getDrawingMode",
      );
      if(drawingMode == "CROPPER"){
        var cropZone = await this.$refs.tuiImageEditor.invoke(
          "getCropzoneRect",
        );
        this.cropMode = cropZone;
        var crop= await this.$refs.tuiImageEditor.invoke(
          "crop",
          cropZone
        );
        this.cropValue = 'na'
      }
    },
    async cancelCrop(){
      this.cropValue = 'na'
      if(window.analytics)
        window.analytics.track('gallery_crop_cancel', {
            title: 'exited the crop mode',
            subtitle: 'exited the crop mode',
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      var drawingMode = await this.$refs.tuiImageEditor.invoke(
        "stopDrawingMode",
      );
    },
    percentage(input,min,max) {
      let range = max - min;
      let correctedStartValue = input - min;
      let percentage = (correctedStartValue * 100) / range;
      return percentage + "%";
    },
    async saveEnhaceRender(){
      try {
        if(window.analytics)
          window.analytics.track('gallery_enhance_save', {
              title: 'Saved enhance image',
              subtitle: 'Saved enhance image',
          }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
        var imageUri = await this.$refs.tuiImageEditor.invoke(
            "toDataURL",{'format':'jpeg'}
        );
        var error = false
        // console.log(this.$refs.tuiImageEditor.editorInstance._graphics._objects)
        this.textObjectArray.forEach(element => {
          // console.log(this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id])
          if(this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id]){
            let textObjectPostion = this.$refs.tuiImageEditor.invoke("getObjectPosition",element.id)
            let left = this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id].left
            let top = this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id].top
            element.position.x = (!isNaN(left) && left) ? left : undefined;
            element.position.y = (!isNaN(top) && top) ? top : undefined;
            element.dimesion={};
            element.dimesion.height = this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id].height;
            element.dimesion.width = this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id].width;
            element.style.fontSize = this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id].fontSize;
            if(this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id].text == 'Change Text')
              error = true
            else
              element.title = this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id].text
          }else{
            this.textObjectId = element.id;
            this.imageActiveObjectId = undefined;
            this.deleteHandler();
          }
         
        });
        this.imageObjectArray.forEach(element => {
          let imageObjectPostion = this.$refs.tuiImageEditor.invoke("getObjectPosition",element.id)
          element.left = imageObjectPostion.x;
          element.top = imageObjectPostion.y
          element.scaleX = this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id].scaleX;
          element.scaleY = this.$refs.tuiImageEditor.editorInstance._graphics._objects[element.id].scaleY
        });
        
        if(!error){
          this.fullScreenShow = true; 
          await this.saveBrandImages();
          if(this.saveAsTemplate)
            this.brandTemplate(imageUri)
          else
            this.save(imageUri)
          // console.log(this.textObjectArray)
        }  
        else
          alert('please change text ')
      } catch (error) {
        console.error(error);      
      }
    },
    async saveBrandImages(){
      try {
        for (const imageFile of this.imageObjectArray) {
          if(!imageFile.url.includes('foyrbrandtemplates')){
            const contents = await this.getBrandImageUrl(imageFile.url)
            imageFile.uploadedUrl = contents.split('?')[0]
            imageFile.url = ""
            
          }else{
            imageFile.uploadedUrl = imageFile.url
          }
        }
      } catch (error) {
        console.error(error);
        
      }
    },
    save( url ) {
      let enhanceOptions = {
        appliedFilter:this.appliedFilter,
        brightness: this.brightness,
        contrast:this.contrast,
        saturation:this.saturation,
        blur:this.blur,
        noise:this.noise,
        hue:this.hue,
        cropMode: this.cropMode,
        textObjects:this.textObjectArray,
        imageObjects:this.imageObjectArray
      }
      var img = new Image();
      var _self = this
      img.onload = function(){
          console.log( this.width+' '+ this.height );
        let mainCanvas = document.createElement("canvas");
        mainCanvas.width = 300;
        mainCanvas.height = mainCanvas.width * (this.height/this.width)
        var ctx = mainCanvas.getContext("2d");
        ctx.drawImage(img, 0, 0, mainCanvas.width, mainCanvas.height);
        _self.thumnailSrc = mainCanvas.toDataURL("image/jpeg")
        _self.enhanceImageUrl({renderId:_self.render._id,payload:url,thumnail:_self.thumnailSrc,'enhanceOptions':enhanceOptions}).then(res => {
          
          _self.message.error = false;
          _self.message.value = 'Your changes have been successfully saved';
          _self.message.global = true;
          setTimeout(() => {
              _self.message.global = false;
              _self.fullScreenShow = false
              _self.message.value = '';
            if( _self.user){
              _self.fetchRenderById({"renderIdList": [_self.$route.params.id],
              "accountId": _self.user.accountId}).then(res => {
                _self.setSelectedRender(res.data[0])
                _self.$parent.reRenderKey += 1;
              })
              
            }
          }, 4000);
        })
      };
      for (const imageFile of this.imageObjectArray) {
        imageFile.signedUrl = ""
      }
      img.src = url;
    },
    cancelRender(){
      if(window.analytics)
          window.analytics.track('gallery_enhance_cancel', {
              title: 'Cancel enhance image changes',
              subtitle: 'Cancel enhance image changes',
          }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      this.$parent.reRenderKey += 1;
    },
    async addBrandText(show,index){
      
      this.addTextActive = show;
      this.addLogoActive = false;
      if(show){
        this.textObject={
          title:'Change Text',
          style:{
            fontSize:48,
            fontStyle:'normal',
            fontWeight:'normal',
            textAlign:'center',
            textDecoration:'none',
            fill:'#000',
            fontFamily:'Arial, Helvetica, sans-serif',
          },
          position:{
            x:this.mainImage.width/2,
            y:this.mainImage.height/2,
            translateX:0,
            translateY:0
          },
        }
        if(window.analytics)
        window.analytics.track('gallery_add_text_clciked', {
            title: 'Add text',
            subtitle: 'Add text',
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      }      
       var addtext = await this.$refs.tuiImageEditor.invoke(
        "addText",this.textObject.title,{styles:this.textObject.style,position:this.textObject.position}
      );
      this.$refs.tuiImageEditor.invoke('on',"objectScaled",props => {
        if(props.type == "i-text"){
          this.textObjectId = props.id
          this.imageActiveObjectId = undefined;
          const found = this.textObjectArray.find(x => {
            if(x.id == props.id){

              return x;
            }
            return false;
          })
          if(found)
            this.textObject = found
          this.textObject.style.fontSize = parseInt(props.fontSize)
          this.addTextActive = true
        }   
      })
      var drawingMode = await this.$refs.tuiImageEditor.invoke('startDrawingMode',"TEXT")
      
      this.textObjectId = addtext.id;
      this.textObject.id = addtext.id;
      this.imageActiveObjectId = undefined
      const obj = Object.assign({id:addtext.id}, this.textObject);
      this.textObjectArray.push(obj)
      this.objectActiveHandler();
      this.$refs.tuiImageEditor.invoke('on','textEditing', ()=> {
          this.editingText = true
      });
      // await this.$refs.tuiImageEditor.invoke('removeActiveObject')
       await this.$refs.tuiImageEditor.invoke('stopDrawingMode')
    },
    async setTextStyle(object){
      var changeStyle = await this.$refs.tuiImageEditor.invoke('changeTextStyle',this.textObjectId, object);
      this.textObjectArray.find(x => {
        if(x.id == this.textObjectId)
          x.style[Object.keys(object)[0]] = object[Object.keys(object)[0]]
      })
     

    },
    updateColorValue(value){
      this.textObject.style.fill = value.hex8
      this.setTextStyle({'fill':this.textObject.style.fill})
    },
    backFromTextEditor(){
      this.addTextActive = false;
      this.addLogoActive = false;
      this.textObject.style={
          fontSize:16,
          fontStyle:'normal',
          fontWeight:'normal',
          textAlign:'center',
          textDecoration:'none',
          fill:'#000',
          fontFamily:'Arial, Helvetica, sans-serif',
        },

      this.$refs.tuiImageEditor.invoke('discardSelection')
    },
    addIconImage(){
      this.addLogoActive = true;
      this.addTextActive = false;
      if(window.analytics)
        window.analytics.track('gallery_add_logo_clicked', {
            title: 'Add logo',
            subtitle: 'Add logo',
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      this.$refs.iconfile.click();
    },
    changeIconFile(){
      if (this.$refs.iconfile && this.$refs.iconfile.files[0]) {
        let fileExtension = this.$refs.iconfile.value.slice(this.$refs.iconfile.value.lastIndexOf('.')+1,this.$refs.iconfile.value.length).toLowerCase()
        var reader = new FileReader();
        var refrence = this.$refs.UploadedImage;
          reader.onload = (e) => {
            refrence.src = e.target.result;
            refrence.width = 132;
            this.addIconObject(refrence.src)
            this.$refs.iconfile.value = ""
        };
        if(this.allowedExtensions.includes(fileExtension))
          reader.readAsDataURL(this.$refs.iconfile.files[0]);
        else
          alert('file not allowed ')
        
      }
    },
    async addIconObject(pathToFile, data){
      try {
        var imageObject = await this.$refs.tuiImageEditor.invoke('addImageObject',pathToFile)
        // await this.$refs.tuiImageEditor.invoke('stopDrawingMode')
        if(data){
          var imagePosition =  await this.$refs.tuiImageEditor.invoke('setObjectProperties',imageObject.id,{
            left:data.left,
            top:data.top,
            opacity:1
          })
        }
        this.imageActiveObjectId = imageObject.id
        this.changeImageOpacity(data && data.transparency?data.transparency:1)
        if(data && data.transparency)
          this.transparency = data.transparency *1000;
        this.imageObjectArray.push({
          id:imageObject.id,
          width:imageObject.width,
          height:imageObject.height,
          left:imageObject.left,
          top:imageObject.top,
          url:pathToFile,
          signedUrl:data &&  data.signedUrl?data.signedUrl:pathToFile,
          transparency:data && data.transparency?data.transparency:1
          })
        var drawingMode = await this.$refs.tuiImageEditor.invoke('startDrawingMode',"NORMAL")
        // var imagevalue = await this.$refs.tuiImageEditor.invoke('on',"objectScaled",props => {
        //   if(props.type == "image"){
        //     this.imageActiveObjectId = props.id
        //     const found = this.imageObjectArray.find(x => x.id == props.id)
        //     this.textObjectId = undefined
        //     if(found){
        //       found.height = props.height;
        //       found.width = props.width;
        //       found.scaleY = props.scaleY;
        //       found.translateX = props.translateX;
        //       found.translateY = props.translateY;
        //       found.scaleX = props.scaleX;
        //     }
        //   }      
        // })
        // var selectedValue = await this.$refs.tuiImageEditor.invoke('on',"objectActivated",props => {
        //   // console.dir(document.getElementsByClassName('tui-image-eidtor-textarea')[0].value)
        //   var drawingMode = this.$refs.tuiImageEditor.invoke('startDrawingMode',"NORMAL")
        //   if(props.type == "image"){
        //     this.imageActiveObjectId = props.id
        //     this.textObjectId = undefined;
        //     this.addTextActive = false;
        //     this.addLogoActive = true;
        //   }
        // })
        this.objectActiveHandler();
      } catch (error) {
        console.error (error)
      }
      
    },
    objectActiveHandler(){
      this.$refs.tuiImageEditor.invoke('on',"objectActivated",props => {
        // console.dir(document.getElementsByClassName('tui-image-eidtor-textarea')[0].value)
        console.log(props)
        this.editingText = false;
        if(props.type == "i-text"){
          this.$refs.tuiImageEditor.invoke('startDrawingMode',"TEXT")
          this.textObjectId = props.id
          if(!this.loadFromApi)
          this.addTextActive = true;
          this.addLogoActive = false;
          this.imageActiveObjectId = undefined
          const found = this.textObjectArray.find(x => x.id == props.id)
          if(found)
            this.textObject = found
          this.textObject.style.fontSize = parseInt(props.fontSize)
        }
        if(props.type == "image"){
            this.$refs.tuiImageEditor.invoke('startDrawingMode',"NORMAL")
            this.imageActiveObjectId = props.id
            this.textObjectId = undefined;
            this.addTextActive = false;
            if(!this.loadFromApi)
            this.addLogoActive = true;
            this.transparency = props.opacity*1000
        }
        if(this.loadFromApi){
          this.$refs.tuiImageEditor.invoke('discardSelection')
        }
        setTimeout(() => {
          this.loadFromApi = false
        }, 3000);
        // this.textObject.style.fontSize = props.fontSize
      })
    },
    deleteHandler(){
      if(this.textObjectId){
        let filterObject = this.textObjectArray.filter( item => item.id !== this.textObjectId)
        this.textObjectArray = filterObject
        this.addTextActive = false;
        this.addLogoActive = false;
      }else if(this.imageActiveObjectId){
        let filterObject = this.imageObjectArray.filter( item => item.id !== this.imageActiveObjectId)
        this.imageObjectArray = filterObject
        this.addTextActive = false;
        this.addLogoActive = false;
      }
    },
    async updateImageObjectOnMounted(imageObject){
      for (const imageFile of  imageObject) {
        const contents = await this.downloadRenderAPi({uri:imageFile.uploadedUrl});
        const fileExtension = contents.url.slice(contents.url.lastIndexOf('.')+1, contents.url.lastIndexOf('?'))
        new Promise ((resolve,reject)=>{
          var img = new Image();
          var imageUrl
          img.onload = ()=> {
            const elem = document.createElement('canvas');
            elem.width = imageFile.width*(imageFile.scaleX?imageFile.scaleX:1);
            elem.height = imageFile.height*(imageFile.scaleY?imageFile.scaleY:1);
            const ctx = elem.getContext('2d')
            ctx.drawImage(img, 0, 0, elem.width, elem.height);
            imageUrl=elem.toDataURL("image/"+fileExtension);
            imageFile.signedUrl = imageUrl;
            this.addIconObject(imageUrl,imageFile);
            elem.remove();
            resolve();
          };
          img.crossOrigin="anonymous";
          img.src = contents.url;
          })
      }
    },
    async brandTemplate(imageUri){
     try {
      var canvas = document.createElement("Canvas");
      // document.getElementsByClassName('render-enhance-page')[0].appendChild(canvas)
      var ctx = canvas.getContext("2d");
      const canvasDimension = this.$refs.tuiImageEditor.invoke('getCanvasSize')
      canvas.height = canvasDimension.height;
      canvas.width = canvasDimension.width; 
      ctx.fillStyle = "rgba(255, 255, 255)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.textObjectArray.forEach(element => {
        ctx.fillStyle = element.style.fill;
        ctx.font = `${element.style.fontSize}px ${element.style.fontFamily}`;
        ctx.fillText(element.title,element.position.x-(element.dimesion.width/2),element.position.y-(element.dimesion.height/2));
      })
      var promiseObject = [];
      // console.log('start image')
      for(var i=0; i<this.imageObjectArray.length ; i++){
        var imgObj = new Image();
        
        imgObj.src = this.imageObjectArray[i].signedUrl
        imgObj.customData={
          x: this.imageObjectArray[i].left, 
          y: this.imageObjectArray[i].top,
          scaleY: this.imageObjectArray[i].scaleY?this.imageObjectArray[i].scaleY:1,
          scaleX: this.imageObjectArray[i].scaleX?this.imageObjectArray[i].scaleX:1
          }
        console.log(imgObj )
        
        let imgPromiss = await this.loadImageTocanvas(imgObj,ctx)
        // console.log('image'+ i)
      }
      // console.log('end image')
      let brandImageUrl = canvas.toDataURL("image/jpeg");
      // console.log('done' + brandImageUrl);
      const contents = await this.getBrandImageUrl(brandImageUrl)
      let brandPayload = {
        "imageUrl": contents.split('?')[0],
        "extraInfo":{ 
          textObjects:this.textObjectArray,
          imageObjects:this.imageObjectArray,
          mainImage:this.mainImage
         },
        "isVisibleToUser": true
      }
      this.saveBrandData(brandPayload)
      this.save(imageUri)
     } catch (error) {
       console.error(error)
     }
    },
    async loadImageTocanvas(imgObj,ctx){
      return new Promise((resolve, reject) => { 
        imgObj.onload = ()=> {
          ctx.drawImage(imgObj, imgObj.customData.x - (imgObj.customData.scaleX * imgObj.width/2), imgObj.customData.y - (imgObj.customData.scaleY * imgObj.height/2),imgObj.customData.scaleX * imgObj.width,imgObj.customData.scaleY * imgObj.height);
          resolve(ctx)
        }
        imgObj.onerror = err =>{
          reject(err)
        }
      })
    },
    saveBrandData(brandPayload){
      this.saveBrandTemplate(brandPayload).then(res => {
        // console.log(res)
      })
      
    },
    async changeImageOpacity(transparency){
      try {
        let opacity = await this.$refs.tuiImageEditor.invoke('setObjectProperties',this.imageActiveObjectId,{opacity:transparency})
        this.imageObjectArray.find(x => {
          if(x.id == this.imageActiveObjectId)
            x.transparency = transparency
        })
        if(window.analytics)
        window.analytics.track('gallery_logo_transparency_changed', {
            title: 'Change transparency of logo',
            subtitle: 'Change transparency of logo',
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      } catch (error) {
        
      }
    },
    applyBranding(brand){
      
      if(JSON.stringify(brand.extraInfo.mainImage) === JSON.stringify(this.mainImage)){
        // console.log('same dimensio')
        if(brand.extraInfo.textObjects && brand.extraInfo.textObjects.length>0){      
          brand.extraInfo.textObjects.forEach(element => {
            setTimeout(() => {
              this.textObject = element
              this.addBrandText(false)
            }, 10);
          });
        }
        if(brand.extraInfo.imageObjects && brand.extraInfo.imageObjects.length>0){
          this.updateImageObjectOnMounted(brand.extraInfo.imageObjects)
        }
      }else{
        // console.log('diff dimension')
        let dimensionDiff = this.mainImage.width/brand.extraInfo.mainImage.width
        var  imageObjects = brand.extraInfo.imageObjects.map(image => {
          let copyImage = JSON.parse(JSON.stringify(image))
          let top = copyImage.top/brand.extraInfo.mainImage.height;
          let left = copyImage.left/brand.extraInfo.mainImage.width
          copyImage.height = dimensionDiff * copyImage.height;
          copyImage.width = dimensionDiff * copyImage.width;
          copyImage.left = this.mainImage.width * left;
          copyImage.top = this.mainImage.height * top;
          return copyImage
        })
        var  textObjects = brand.extraInfo.textObjects.map(text => {
          let copyText = undefined
          copyText = JSON.parse(JSON.stringify(text));
          let left = text.position.x/brand.extraInfo.mainImage.width;
          let top = text.position.y/brand.extraInfo.mainImage.height
          copyText.position.x =  this.mainImage.width * left ;
          copyText.position.y = this.mainImage.height * top;
          copyText.style.fontSize = dimensionDiff * text.style.fontSize;
          return copyText;
        })
        if(textObjects && textObjects.length>0){      
          textObjects.forEach(element => {
            setTimeout(() => {
              this.textObject = element
              this.addBrandText(false)
            }, 10);
          });
        }
        if(imageObjects && imageObjects.length>0){
          this.updateImageObjectOnMounted(imageObjects)
        }
      }
      
    },
    
    async onMountedTextSet(textObjectArray){
      for(let i=0; i<textObjectArray.length;i++)
      {
        this.textObject = textObjectArray[i]
        this.loadFromApi = true
        await this.addBrandText(false,i)
      }
    },
    saveAsTemplateSelected(value){
      if(window.analytics)
      window.analytics.track('gallery_save_template_selected', {
            title: 'Save as a template',
            subtitle: 'Save as a template',
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
    },
    applyedFilterEvents(value){
      if(window.analytics)
      window.analytics.track(value, {
            title: value,
            subtitle: value,
        }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
    },
    async loadingUserData(){
      for (const key in this.render.info.enhanceOptions) {
        this[key] = this.render.info.enhanceOptions[key]
        if(key == 'appliedFilter' && this.render.info.enhanceOptions[key])
          await this.applyFilter(this.render.info.enhanceOptions[key])
        if(key == 'brightness' && this.render.info.enhanceOptions[key])
          await this.applyOtherFilterForPreData('Brightness',{'brightness':this.render.info.enhanceOptions[key]/1000})
        if(key == 'contrast' && this.render.info.enhanceOptions[key])
          await this.applyOtherFilterForPreData('Contrast',{'contrast':this.render.info.enhanceOptions[key]/1000})
        if(key == 'saturation' && this.render.info.enhanceOptions[key])
          await this.applyOtherFilterForPreData('Saturation',{'saturation':this.render.info.enhanceOptions[key]/1000})
        if(key == 'hue' && this.render.info.enhanceOptions[key])
          await this.applyOtherFilterForPreData('HueRotation',{'rotation':this.render.info.enhanceOptions[key]/1000})
        if(key == 'noise' && this.render.info.enhanceOptions[key])
          await this.applyOtherFilterForPreData('Noise',{'noise':this.render.info.enhanceOptions[key]})
        if(key == 'blur' && this.render.info.enhanceOptions[key])
          await this.applyOtherFilterForPreData('Blur',{'blur':this.render.info.enhanceOptions[key]/1000})
        if(key == 'cropMode')
          await this.$refs.tuiImageEditor.invoke(
              "crop",
              this.render.info.enhanceOptions[key]
            );
        if(key == 'textObjects' && this.render.info.enhanceOptions[key].length>0){
          // const  {fill,fontSize,fontWeight,fontStyle,fontFamily,textAlign,textDecoration} = this.render.info.enhanceOptions[key].styles
          // this.fill = fill;
          // this.fontSize = fontSize;
          // this.fontWeight = fontWeight;
          // this.fontFamily = fontFamily;
          // this.textAlign = textAlign;
          // this.textDecoration = textDecoration;
          // this.title = this.render.info.enhanceOptions[key].title;
          // this.position = this.render.info.enhanceOptions[key].position;
          
          this.onMountedTextSet(this.render.info.enhanceOptions[key])
        }
        if(key == 'imageObjects' && this.render.info.enhanceOptions[key].length>0){
          this.loadFromApi = true
          this.updateImageObjectOnMounted(this.render.info.enhanceOptions[key])
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.render-enhance-component {
  // height: calc( 100vh - (50px + 0.75rem + 1.75rem + 1.75rem + 1.125rem + 0.625rem));
  .filter-sliders-container {
    display: grid;
    grid-template-columns: max-content max-content;
    justify-content: space-between;
    align-content: center;
    grid-row-gap: 8px;
    .custom-slider-label {
      display: grid;
      position: relative;
      grid-column: 1/3;
      input {
        height: 12px;
        -webkit-appearance: none;
        appearance: none;
        &::-webkit-slider-runnable-track {
          height: 2px;
          -webkit-appearance: none;
          appearance: none;
          background: #888888;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          border-radius: 50%;
          height: 12px;
          width: 12px;
          background: #ffffff;
          border: 1px solid #d48e8e;
          transform: translateY(-40%);
          cursor: pointer;
        }
        &:focus {
          outline: none;
        }
      }
      .custom-slider-track {
        position: absolute;
        height: 2px;
        left: 0px;
        background: #d48e8e;
        top: 50%;
        transform: translateY(-50%);
        // transition: all 300ms;
      }
    }
    p{
        font-weight: 500;
        font-size: 12px;
        color: #292929;
        margin: 0px;
    }
    span{
      font-weight: 500;
      font-size: 12px;
      color: #292929;
      justify-self: end;
    }
  }
  #save-as-template-container{
    display: grid;
    grid-template-columns: max-content max-content;
    background: #4D4C4D;
    align-items: center;
    padding: 4px;
    grid-column-gap: 10px;
    height: max-content;
    align-self: end;
    cursor: pointer;
    p{
      margin: 0px;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 500;
    }
  }
  .render-enhance-title {
    font-weight: 600;
    font-size: 1.125rem;
    margin-bottom: 0.625rem;
    color: #3a393a;
  }
  .render-enhance-component-container {
    display: grid;
    grid-template-columns: 1fr 20%;
    grid-column-gap: 20px;  
    .render-enhance-component-canvas {
      height: 80vh;
    }
    .render-enhance-filters-container {
      display: grid;
      grid-template-rows: max-content 1fr max-content;
      height: 80vh;
      // overflow: hidden;
      // grid-row-gap: 8px;
      
      .render-enhance-filters {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        height: 2.25rem;
        background: white;
        p {
          margin: 0px;
          background: #e8e8e8;
          color: #292929;
          font-size: 0.75rem;
          display: grid;
          font-weight: 500;
          text-align: center;
          align-content: center;
          cursor: pointer;
        }
        .activeTab {
          background: #3a393a;
          color: #e8e8e8;
        }
      }
      .render-enhance-filters-body {
        // display: grid;
        padding: 0.625rem 0.875rem;
        background: white;
        display: grid;
        grid-template-rows: 1fr max-content;
        grid-row-gap: 1rem;
        .render-filter-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 0.5rem;
          grid-row-gap: 0.875rem;
          height: max-content;
          .active{
            border: 1px solid #d48e8e;
          }
          div {
            cursor: pointer;
            img {
              width: 100%;
            }
            p {
              font-size: 0.625rem;
              font-weight: 500;
              color: #292929;
              text-align: center;
              margin: 0px;
            }
          }
        }
        .render-filter-edit {
          display: grid;
          
          .filter-sliders-container {
            display: grid;
            grid-template-columns: max-content max-content;
            justify-content: space-between;
            align-content: center;
            grid-row-gap: 8px;
            .custom-slider-label {
              display: grid;
              position: relative;
              grid-column: 1/3;
              input {
                height: 12px;
                -webkit-appearance: none;
                appearance: none;
                &::-webkit-slider-runnable-track {
                  height: 2px;
                  -webkit-appearance: none;
                  appearance: none;
                  background: #888888;
                }
                &::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  border-radius: 50%;
                  height: 12px;
                  width: 12px;
                  background: #ffffff;
                  border: 1px solid #d48e8e;
                  transform: translateY(-40%);
                  cursor: pointer;
                }
                &:focus {
                  outline: none;
                }
              }
              .custom-slider-track {
                position: absolute;
                height: 2px;
                left: 0px;
                background: #d48e8e;
                top: 50%;
                transform: translateY(-50%);
                // transition: all 300ms;
              }
            }
            p{
                font-weight: 500;
                font-size: 12px;
                color: #292929;
                margin: 0px;
            }
            span{
              font-weight: 500;
              font-size: 12px;
              color: #292929;
              justify-self: end;
            }
          }
          .reset-edit-settings{
            margin:0px;
            font-weight: 600;
            font-size: 0.6875rem;
            color: #292929;
            justify-self: end;
            margin-bottom: 0.875rem;
          }
          .crop-edit-container{
            p{
              font-weight: 500;
              font-size: 12px;
              color: #292929;
              margin: 0px;
              margin-bottom: 5px;
            }
            .crop-options{
              display: grid;
              grid-gap: 5px;
              grid-template-columns: repeat(4,1fr);
              background: #E8E8E8;
              padding: 4px;
              margin-bottom: 12px;
              p{
                text-align: center;
                background: white;
                margin: 0px;
                line-height: 2rem;  
                cursor: pointer;
              }
              .active{
                color: #F7E3DF;
                background: #3A393A;
              }
            }
            .crop-complete-Conatiner{
              display: grid;
              grid-template-columns: max-content max-content;
              justify-content: end;
              grid-column-gap: 10px;
              p{
                font-weight: 500;
                cursor: pointer;
                font-size: 12px;
                color: #4D4C4D;
                background: none;
                border: none;
                margin: 0px;
                padding: 4px 12px;
                &:last-child{
                  color: #3A393A;
                  border: 1px solid #3A393A;
                }
              }
            }
          }
          .undo-container{
            display: grid;
            grid-template-columns: max-content max-content;
            cursor: pointer;
            align-items: center;
            grid-column-gap: 8px;
            margin: 10px 0px;
            svg{
              height: 10px;
              width: 10px;
            }
            p{
              width: max-content;
              margin-bottom: 0px;
            }
          }
        }
        .render-filter-brand{
          display: grid;
          grid-template-rows: max-content 1fr;
          height: 100%;
          grid-row-gap: 1.25rem;
          .add-objects-container{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 1rem;
            div{
              display: grid;
              align-content: center;
              justify-items: center;
              grid-row-gap: 8px;
              border: 1px solid #D48E8E;
              height: 6.875rem;
              cursor: pointer;
            }
            p{
              margin-bottom: 0px;
              color: #3A393A;
              font-weight: 500;
              font-size: 0.875rem;
            }
            // .add-text-container{
            //   display: grid;
            // }
            // .add-logo-container{
            //   display: grid;
            // }
          }
          .save-template-container{
            display: grid;
            grid-template-rows: max-content 1fr;
            .save-templates{
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-column-gap: 10px;
              align-content: baseline;
              background: #E8E8E8;
              padding: 8px;
              overflow: auto;
              height: 49vh;
              div{
                height: max-content;
                cursor: pointer;
                img{
                  
                  width: 100%;
                }
              }
            }
            p{
              color: #292929;
              font-weight: 500;
              font-size: 0.875rem;
              margin-bottom: 0.625rem;
            }
            .no-template-container{
              background: #E8E8E8;
              display: grid;
              grid-template-rows: max-content max-content;
              align-content: center;
              justify-items: center;
              grid-row-gap: 1.875rem;
              p{
                color: #000000;
                margin-bottom: 0px;
              }
            } 
          }
          .edit-Text-Container{
            display: grid;
            grid-template-columns: 1fr;
            grid-row-gap: 0.875rem;
            align-content: baseline;
            p{
              font-weight: 600;
              font-size: 1rem;
              margin-bottom: -0.4375rem;
              color: #3A393A;
              height: max-content;
            }
            select{
              width: 100%;
              border: 1px solid #888888;
              background: #FFFFFF;
              color: #292929;
              font-size: 0.875rem;
              font-weight: 500;
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
              height: max-content;
              cursor: pointer;
              option{
                line-height: 1rem;
              }
            }
            .font-style-container{
              display: grid;
              grid-template-columns: max-content max-content max-content 1fr;
              align-items: center;
              border: 1px solid #888888;
              height: max-content;
              p{
                font-size: 12px;
                color: #292929;
                margin: 0px;
                padding: 0.5rem 1.25rem;
                cursor: pointer;
              }
              .active{
                background: #F7E3DF;
              }
              select{
                width: max-content;
                align-self: center;
                justify-self: end;
                border: none;
              }
            }
            .font-align-container{
              display: grid;
              grid-template-columns: max-content max-content max-content 1fr;
              align-items: center;
              border: 1px solid #888888;
              padding: 0.3125rem 0.625rem;
              height: max-content;
              svg{

              }
              .align-styles{
                height: 24px;
                display: grid;
                width: 24px;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                &:last-child{
                  justify-self: end;
                  position: relative;
                }
                .custom-color-picker{
                  position: absolute;
                  right: 0px;
                  top: 25px;
                }
              }
              .active{
                background: #F7E3DF;
              }
            }
          }
        }
        .undo-redo-container{
          text-align: right;
          svg{
            cursor: pointer;
          }
        }
      }
      .render-enhance-filters-button {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.75rem;
        margin-top: 0.625rem;
        margin-bottom: 0.875rem;
        button{
          line-height: 2rem;
          font-weight: 500;
          font-size: 12px;
          cursor: pointer;
          &:first-child{
            background: #E8E8E8;
            color: #3A393A;
          }
          &:last-child{
            background: #3A393A;
            color: #FFFFFF;
          }
          &:focus{
            outline: none;
          }
        }
      }
    }
  }
}
</style>

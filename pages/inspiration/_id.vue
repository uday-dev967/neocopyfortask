<template>
  <section class="main-container" v-if="currentInspiration && currentInspiration.widgetData">
    <div class="selected-inspiration">
      <div class="inspiration">
        
        <div class="title-container">
          <nuxt-link to="/inspiration"><img src="~assets/images/back.svg" alt></nuxt-link>
          <p>{{currentInspiration.widgetData.name}}</p>
        </div>
        <p v-if="!isInspirationAPInspiration" class="inspiration-info-details">{{currentInspiration.widgetData.category.name}} > {{currentInspiration.widgetData.type.name}}</p>
        <p  v-if="currentInspiration.widgetData" class="inspiration-description">{{currentInspiration.widgetData.description?currentInspiration.widgetData.description:'One line description about the Inspiration can be given here'}}
          
        </p>
        <div style="">
            <div class="pills-container" >
                <!-- <div v-if="color.key == 'color scheme' && color.value" class="pills" v-for="color in currentInspiration.widgetData.extraTags">
                    <p v-for="c in color.value">{{c.displayValue}}</p>
                </div> -->
                
                   <div class="pills" v-if="color" v-for="color in extraTags">
                    <p>{{color}}</p>
                  </div>
                <!-- <div class="pills">
                    <p>Modern</p>
                </div> -->
                <div class="pills" v-if="currentInspiration.widgetData.tags.length>0" v-for="tag in currentInspiration.widgetData.tags" >
                    <p>{{tag.displayValue}}</p>
                </div>
            </div>
        </div>
        <div class="image-container"> 
          <div class="display-image-container">
            <div class="display-image" v-if="currentInspiration.properties">
              <img :src="currentInspiration.widgetData?currentInspiration.widgetData.images[index]:currentInspiration.properties.thumbnail[index]" alt>
            </div>
            <div class="image-left" @click="changeMainImage('left')" v-if="currentInspiration.widgetData.images.length>1 && index>0">
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0664 9.61651e-07C4.99127 1.49276e-06 0.0664124 4.92487 0.0664129 11C0.0664134 17.0751 4.99127 22 11.0664 22C17.1415 22 22.0664 17.0751 22.0664 11C22.0664 4.92487 17.1415 4.30546e-07 11.0664 9.61651e-07Z"
                  fill="#4D4C4D"
                ></path>
                <path
                  d="M12.6665 5.69999L6.86651 11.1L12.6665 16.8"
                  stroke="#D1D1D1"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div class="image-right" @click="changeMainImage('right')"  v-if="currentInspiration.widgetData.images.length>1 && index<currentInspiration.widgetData.images.length-1">
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4785 22C17.5536 22 22.4785 17.0751 22.4785 11C22.4785 4.92487 17.5536 0 11.4785 0C5.40338 0 0.478516 4.92487 0.478516 11C0.478516 17.0751 5.40338 22 11.4785 22Z"
                  fill="#4D4C4D"
                ></path>
                <path
                  d="M9.87842 16.3L15.6784 10.9L9.87842 5.20001"
                  stroke="#D1D1D1"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <!-- <div class="thumnail-container">
            <div class="thumnails" v-if="currentInspiration.properties">
              <img :src="currentInspiration.properties.thumbnail" alt>
            </div>
            <div class="thumnail-left">
              <svg
                width="12"
                height="22"
                viewBox="0 0 12 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1L0.999999 10.7297L11 21"
                  stroke="#D48E8E"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div class="thumnail-right">
              <svg
                width="12"
                height="22"
                viewBox="0 0 12 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.933594 21L10.9336 11.2703L0.933594 1"
                  stroke="#D48E8E"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div> -->
        </div>
      </div>
      <div class="inspiration-options">
        <div class="info-inspiration">
          <svg  id="Capa_1" height="24" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	          viewBox="0 0 65 65" style="enable-background:new 0 0 65 65;" xml:space="preserve">
            <g>
              <g>
                <path d="M32.5,0C14.58,0,0,14.579,0,32.5S14.58,65,32.5,65S65,50.421,65,32.5S50.42,0,32.5,0z M32.5,61C16.785,61,4,48.215,4,32.5
                  S16.785,4,32.5,4S61,16.785,61,32.5S48.215,61,32.5,61z"/>
                <circle cx="33.018" cy="19.541" r="3.345"/>
                <path d="M32.137,28.342c-1.104,0-2,0.896-2,2v17c0,1.104,0.896,2,2,2s2-0.896,2-2v-17C34.137,29.237,33.241,28.342,32.137,28.342z
                  "/>
              </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
          </svg>
          <div class="info-window">
            <p>some text here</p>
          </div>
        </div>
        <div class="shortlist-button-and-filter-wrapper">
          <div class="new-project" @click="displayProjects" >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.50023 11C5.26657 11 5.07715 10.8106 5.07715 10.5769V0.423077C5.07715 0.189418 5.26657 0 5.50023 0C5.73388 0 5.9233 0.189418 5.9233 0.423077V10.5769C5.9233 10.8106 5.73388 11 5.50023 11Z" fill="#D48E8E"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.50002C11 5.73368 10.8106 5.9231 10.5769 5.9231L0.423077 5.9231C0.189418 5.9231 -8.27972e-09 5.73368 -1.84933e-08 5.50002C-2.87068e-08 5.26636 0.189418 5.07694 0.423077 5.07694L10.5769 5.07694C10.8106 5.07694 11 5.26636 11 5.50002Z" fill="#D48E8E"/>
              </svg>
            <p>{{ $t("buttonText.shortlistProducts") }}</p>
          </div>
          <MultiselectDropDown
            v-if="isUserAPDesigner"
            :placeholder="'Product Type'"
            :selected="selectedProductTypeFilter"
            :list="productTypeFilters"
            :clickable="true"
            :hideSelectAll="true"
            @listElementClick="handleListElementClick"
            @close="handledropDownClose"
          >
          </MultiselectDropDown>
        </div>
        <div class="flex all-assets">
          <input type="checkbox" name id>
          <p>{{ $t("checkBoxText.addAllAssetsToProject") }}</p>
        </div>
        <div class="option-main-container" v-if="textures">
          <div class="flex options-head-text">
            <div class="left-text">
              <input type="checkbox" name id>
              <p>{{ $t("checkBoxText.textures") }}</p>
            </div>
            <div>
              <p class="view-all">{{ $t("buttonText.viewAll") }}</p>
            </div>
          </div>
          <div class="texture-container" >
              <div><img src="~assets/images/texture.png" alt=""></div>
              <div><img src="~assets/images/texture.png" alt=""></div>
              <div><img src="~assets/images/texture.png" alt=""></div>
              <div><img src="~assets/images/texture.png" alt=""></div>
              <div><img src="~assets/images/texture.png" alt=""></div>
          </div>
        </div>
        <div class="option-main-container" v-if="productList.length>0">
          <div class="flex options-head-text">
            <div class="left-text">
              <label class="check-container">
                <input type="checkbox" v-model="checked" @change="addAllProducts">
                <span class="checkmark"></span>
              </label>
              <p>{{$t("inspiration.products")}}</p>
              <p class="view-all">({{filteredProducts.length}})</p>
            </div>
            <div>
              <p class="view-all" v-if="selectedProduct.length>0"  @click="viewAll = true">{{selectedProduct.length}} {{$t("inspiration.outOf")}} {{filteredProducts.length}} selected {{$t("inspiration.selected")}}</p>
            </div>
          </div>
          <div class="products-container">
              <div v-for="product in filteredProducts">
                <img :src="product.optimizedImages && product.optimizedImages.length>0?product.optimizedImages[0]:product.images[0]" alt="" @click="showProduct(product)">
                <div v-if="isUserAPDesigner && product.accessAccounts && product.accessAccounts.includes(user.accountId)" class="ap-logo-container image-wrapper">
                    <img src="../../assets/images/asian-paints-logo.png" alt="">
                </div>
                <label class="check-container-white">
                  <input type="checkbox" v-model="selectedProduct"  :value="product._id">
                  <span class="checkmark"></span>
                </label> 
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="viewProduct?'showPopUp':''" style="z-index:300;" @click="closePopup">
      <div class="popup-container selected-product" @click.stop>
        <div class="close-popup" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z" fill="white"/>
          </svg>
        </div>
        <div class="main-content" v-if="displayProduct">
          <div class="image-container" >
            <div class="image-list">
              <div v-for="(image,i) in displayProduct.images" @click="currentImage = image" :class="[i==0 && currentImage=='' ?'selected-image':'',currentImage==image?'selected-image':'']">
                <img :src="image" alt="">
              </div>
            </div>
            <img :src="currentImage?currentImage:displayProduct.images[0]" alt="">
            
          </div>
          <div class="details-container">
            <h2>{{displayProduct.name}}</h2>
            <p class="by">{{displayProduct.category.name}} <span>></span> {{displayProduct.type.name}}</p>
            <div class="extraTags">
              <p>{{$t("inspiration.style")}}</p><p><span>{{displayProduct.style}}</span></p>
            </div>
            <div v-if="extra.key == 'material' || extra.key == 'finish' || extra.key == 'spaces'" class="extraTags" v-for="extra in displayProduct.extraTags">
              <p>{{extra.key}}</p> 
              <p v-if="isTypeString(extra.value)"><span v-for="(item, index) in extra.value">{{index == extra.value.length-1?item.displayValue:item.displayValue+', '}}</span></p>
              <p v-else>{{extra.value }}</p>
            </div>
            <div class="extraTags">
              <p>{{$t("inspiration.dimensions")}}</p>
              <p v-if="displayProduct.dimension">{{displayProduct.dimension.width}} x {{displayProduct.dimension.height}}
              x {{displayProduct.dimension.depth}} {{displayProduct.dimension.units}}</p>
            </div>
            <div class="extraTags product-description">
              <p> {{$t("inspiration.description")}} </p>
              <p v-if="displayProduct.description" class="unset-transform"><span >{{displayProduct.description}}</span></p>
            </div>
            <!-- <span></span>
            <p v-if="displayProduct.description" class="description">{{displayProduct.description}}</p>       -->
            
            <div class="addToselected">
              <label class="custom">
                <input type="checkbox" v-model="selectedProduct" :value="displayProduct._id">
                <p>{{$t("inspiration.addToShortlist")}}</p>
                <svg id="unchecked" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6 3.20001C12.3 1.90001 13.4 1.00001 14.8 0.700008C17.9 -0.0999916 20.8 1.70001 21.5 4.90001C21.9 7.00001 21.4 8.90001 20.3 10.7C18.7 13.3 16.6 15.4 14.3 17.3C13.4 18 12.5 18.7 11.5 19.5C10.4 18.6 9.40002 17.8 8.40002 17C6.30002 15.2 4.30001 13.2 2.80001 10.8C1.60001 8.90001 1.00002 6.80001 1.70002 4.60001C2.30002 2.50001 3.60001 1.10001 5.80001 0.700008C8.30001 0.200008 10.2 1.00001 11.6 3.20001Z" stroke="#EBBEB5" stroke-miterlimit="10"/>
                </svg>
                <svg id="checkbox" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5543 0.000372341C17.4006 0.000372341 19.675 2.25703 19.9669 5.36742C19.9896 5.50481 20.0843 6.22786 19.7965 7.40664C19.3819 9.10779 18.4242 10.6544 17.0275 11.8797L9.94015 18L2.9724 11.8794C1.57578 10.6544 0.618025 9.10741 0.203383 7.40664C-0.0843272 6.22749 0.0102942 5.50444 0.0333726 5.36705C0.32493 2.25665 2.59969 0 5.44564 0C7.31153 0 8.97663 0.96767 9.94477 2.57127C10.9218 0.988148 12.658 0.000372341 14.5543 0.000372341Z" fill="#D48E8E"/>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div style="background: #C4C4C4;position: relative;">
          <div class="otherProductsContainer">
            <svg @click="scrollThumb('right')" class="left" width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L0.999999 10.7297L11 21" stroke="#D48E8E" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="otherProducts" ref="scrollDiv">
              <div v-for="product in filteredProducts" v-if="product.images[0] && displayProduct" :class="product._id == displayProduct._id?'selectedProduct':''" @click="showProduct(product)">
                <img :src="product.images[0]" alt="">
              </div>
            </div>
            <svg @click="scrollThumb('left')" class="right" width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.933594 21L10.9336 11.2703L0.933594 1" stroke="#D48E8E" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>  
          </div>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="viewAll?'showPopUp':''">
      <div class="popup-container" style="padding:2.8125rem 4.6875rem 1.5625rem; max-width:50vw">
        <div class="close-popup" @click="closePopup()">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z" fill="white"/>
          </svg>
        </div>
        <div class="popup-head">
          <h2>{{$t("inspiration.products")}}</h2>
        </div>
        <div class="popup-details" style="margin-top:2.5rem;">
           <div class="select-all-product">
              <label class="check-container">
                <input type="checkbox" v-model="checked" @change="addAllProducts">
                <span class="checkmark"></span>
              </label> 
              <span>{{$t("inspiration.selectAllProducts")}}</span>
           </div>
          <div class="products-container">
              <div v-for="product in filteredProducts">
                <img :src="product.images[0]" alt="" @click="showProduct(product)">
                <label class="check-container-white">
                  <input type="checkbox" v-model="selectedProduct"  :value="product._id">
                  <span class="checkmark"></span>
                </label> 
              </div>
          </div>
          
        </div>
        <div class="invite-button-container" style="padding-top:1.25rem;">
          <button @click="viewAll = false" class="cancel-button">Cancel</button>
          <button @click="viewAll = false; showProjects = true" :disabled="selectedProduct.length == 0" class="update-address">{{$t("inspiration.addToProject")}}</button>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="showProjects?'showPopUp':''">
      <div class="popup-container" style="padding:2.8125rem 4.6875rem;">
        <div class="close-popup" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z" fill="white"/>
          </svg>
        </div>
        <div class="popup-head">
          <h2>{{$t("suggestionText.selectProjects")}}</h2>
          <p>{{$t("suggestionText.chooseProjectsFromList")}}</p>
        </div>
        <div class="popup-details user-projects">
          <div v-if="usersProjects" >
              <div v-for="project in totalProjects">
                <div class="projects-check" v-if="project && project.name">
                  <p @click="projectsForSub.push(project._id)">{{project.name}}</p>
                  <label class="check-container-back">
                    <input type="checkbox" :value="project._id" v-model="projectsForSub">
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
          </div>
        </div>
        <div class="address-button-container" style="margin-top:2.5rem;">
          <button @click="cancelContainer('project')" class="cancel-button">{{$t("buttonText.cancel")}}</button>
          <button @click="addToSub()" :disabled="projectsForSub.length == 0" class="update-address">{{$t("buttonText.done")}}</button>
        </div>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
    <div class="popup-div" :class="toProjects?'showPopUp':''">
      <div class="popup-container" style="padding:2.8125rem 3.125rem;max-width: 30vw;">
        <div class="popup-head">
          <img src="~assets/images/redCheck.svg" alt="">
        </div>
        <div class="popup-details">
          <p style="margin:0rem;margin-top:2.5rem;color:#fff; text-align:center;">{{$t("inspiration.assetsAddedShortlist")}}</p>
        </div>
        <div class="address-button-container" style="margin-top:2.5rem;">
          <button @click="toProjects = false" class="cancel-button"> {{$t("buttonText.addMoreAssets")}}</button>
          <nuxt-link to="/dashboard"><button class="update-address">{{$t("buttonText.goToMyProjects")}}</button></nuxt-link>
        </div>
      </div>
    </div>
  </section>
  <div v-else class="main-loading">
    <div class="loading-container">
      <p>{{$t("infoText.loading")}}</p>
      <div class="loader"></div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapGetters } from "vuex";
import MultiselectDropDown from "@/components/shared/multiselectDropDown.vue"

export default {
  layout: "dashboard",
  middleware: ["initAuth", "authReq"],
  components: {
    MultiselectDropDown
  },
  head() {
    return {
      title: "Neo - Dashboard"
    };
  },
  data(){
    return{
      currentInspiration:{},
      productList:[],
      textures:false,
      selectedProduct:[],
      checked:false,
      index:0,
      toProjects:false,
      viewProduct:false,
      displayProduct:undefined,
      viewAll:false,
      message: {
        value: "",
        error: false,
        global:false
      },
      projectName:'',
      currentImage:'',
      newProject:false,
      showProjects:false,
      projectsForSub:[],
      showIcon:undefined,
      colors:[],
      selectedProductTypeFilter: [
        {
            text: "Foyr",
            value: "Foyr"
        }
      ],
      productTypeFilters: [
        {
            text: "AP",
            value: "asianPaints"
        },
        {
            text: "Foyr",
            value: "Foyr"
        },
      ],
      isInspirationAPInspiration: false
    }
  },
  mounted() {
    if (this.isUserAPDesigner) {
        this.selectedProductTypeFilter = [
            {
                text: "AP",
                value: "asianPaints"
            },
            {
                text: "Foyr",
                value: "Foyr"
            },
        ]
    }
    this.currentInspiration = {};
    // amplitude.getInstance().logEvent("selectedInspiration",{inspirationId:this.$route.params.id});
    // chmln.track("selectedInspiration"); 
    this.selectedInspiration(this.$route.params.id).then((res)=>{
      this.currentInspiration = res;
      if(this.currentInspiration && this.currentInspiration.widgetData && this.currentInspiration.widgetData.extraTags && this.currentInspiration.widgetData.extraTags.length > 0) {
        let colorWidgets = this.currentInspiration.widgetData.extraTags
        if(colorWidgets && colorWidgets.length > 0){
          colorWidgets.forEach((colorValue)=> {
            if (colorValue && colorValue.value && colorValue.value.length>0) {
              (colorValue.value).forEach((color) => {
                if (color) {
                  this.colors.push(color)
                }
              })
            }
          })
        }
      }
      let list=""
      let mapArray = this.currentInspiration.jsondata.uniqueElementMap ?this.currentInspiration.jsondata.uniqueElementMap:this.currentInspiration.jsondata.uniqueElementMapForReference
      for (var key in mapArray) {
        list+=mapArray[key].sourceProductID+',';
      }
      list = list.substring(0,list.length-1)
      // this.projectsProducts(list).then((res)=>{
      //  this.productList = res;
      // })
      
      this.fetchInspirationById(this.$route.params.id).then(nextedRes => {
        if (
          nextedRes.statusCode == 200 && 
          nextedRes.data
        ) {
          if (
            nextedRes.data.productData && 
            nextedRes.data.productData.length > 0 &&  
            nextedRes.data.productData[0].customerBrand === 'AP'
          ) {
            this.isInspirationAPInspiration = true;
          }

          if (
            nextedRes.data.productList &&
            nextedRes.data.productList.data
          ) {
            this.productList = nextedRes.data.productList.data;
          }
        }
      })
    });
    if(!this.usersProjects)
      this.fetchProjects(); 
  },
  computed: {
    ...mapState({
      usersProjects: state => state.Projects.usersProjects,
      user: state => state.User.user,
      sharedProjects: state => state.Projects.sharedProjects,
      isUserAPDesigner: state => state.User.isUserAPDesigner,
    }),
    extraTags(){
      return this.currentInspiration.widgetData.extraTags.map(item => {
        if(item.value.length && item.value.length>0)
        {
          var x= item.value.map(i =>{
          return i.displayValue
          })
          return x;
        }
      }).flat()
    },
    productLimit(){
      let limit = 6;
      if(window.innerWidth>1366)
        limit = 9
      if(window.innerWidth>1440)
        limit = 12
      return limit;
    },
    totalProjects(){
      return this.usersProjects.concat(this.sharedProjects) 
    },
    filteredProducts() {
        if (this.selectedProductTypeFilter.length == 1) {
            if (this.selectedProductTypeFilter[0].value === "asianPaints") {
                return this.onlyAPProducts;
            } else {
                return this.onlyFoyrProducts;
            }
        } else if (this.selectedProductTypeFilter.length == 0) {
            return [];
        }

        return [ ...this.onlyAPProducts, ...this.onlyFoyrProducts ];
    },
    onlyAPProducts() {
        return this.productList.filter(e => e.accessAccounts && e.accessAccounts.includes(this.user.accountId));
    },
    onlyFoyrProducts() {
        return this.productList.filter(e => !e.accessAccounts || (e.accessAccounts && !e.accessAccounts.includes(this.user.accountId)));
    }
  },
  watch: {
    isUserAPDesigner(nv) {
      if (nv) {
        this.selectedProductTypeFilter = [
            {
                text: "AP",
                value: "asianPaints"
            },
            {
                text: "Foyr",
                value: "Foyr"
            },
        ]
      }
    }
  },
  methods : {
    ...mapActions({
      selectedInspiration:'Projects/selectedInspiration',
      projectsProducts:'Projects/projectsProducts',
      uploadProjects:'Projects/newProject',
      fetchProjects:'Projects/fetchProjects',
      addToShortlist:'Projects/addToShortlist',
      fetchInspirationById:'Projects/fetchInspirationById',
    }),
    changeMainImage(side){
      if(side == 'left'){
        if(this.index !==0)
          --this.index;
      }else{
        if(this.index !== this.currentInspiration.widgetData.images.length-1)
          ++this.index;
      }
    },
    displayProjects(){
     if( this.selectedProduct.length>0){
      //  amplitude.getInstance().logEvent("inspirationProductSelector");
       this.showProjects = !this.showProjects
     }else{
          this.message.value = "Select at least 1 product to add to projects";
          this.message.global = true;
          setTimeout(() => {
            this.message.value = "";
            this.message.global = false;
          }, 4000);
     }
    },
    cancelContainer(container) {
        if(container == "project"){
          this.showProjects = false;
          // this.message = {};
        }
    },
    addAllProducts(){
      this.selectedProduct = [];
      if(this.checked){
        this.filteredProducts.forEach(element => {
          this.selectedProduct.push(element._id)
        });
      }
    },
    showProduct(product){
      this.viewProduct= true;
      // amplitude.getInstance().logEvent("inspirationProduct",{productId:product._id});
      this.displayProduct=product;
      this.currentImage = product.images[0]
    },
    closePopup(){
      this.viewProduct= false;
      this.newProject = false;
      this.showProjects = false;
      this.viewAll = false;
    },
    addProject(){
      if(this.projectName!==""){
        //  console.log('Project Name*********************_ID')
        let projectNameDup = this.projectName;
        var projectsDuplicate = [];
        projectsDuplicate = this.usersProjects.filter(function(project){
            return project.name === projectNameDup;
        })
        if (projectsDuplicate && projectsDuplicate.length > 0) {
          this.message.error = true;
          this.message.value = 'Project name already exists.';
          return;
        }
        this.uploadProjects({type:['project'],name:this.projectName}).then((res)=>{
        this.message.error = false;
        this.message.value=res.message;
        if(res.error){
          this.message.error = true;
        }
      })
      }else{
        this.message.error=true;
        this.message.value = "Please enter project name"
      }
    },
    addToSub(){
      if(this.projectsForSub.length>0 && this.selectedProduct.length>0){
        this.addToShortlist({"accountId":this.$store.state.User.user.accountId,"payload":{"project":this.projectsForSub,"product":this.selectedProduct}}).then((res)=>{
          this.message.value = res.message;
          this.message.global = true;
          this.showProjects = false;
          this.toProjects = true;
          this.projectsForSub = [];
          this.selectedProduct = [];
          this.checked = false;
          setTimeout(() => {
            this.message.value = "";
            this.message.global = false;
          }, 4000);
        })
      }else{
        alert("please select projects and products")
      }
      
    },
    scrollThumb(side){
      let maxLeft =this.$refs.scrollDiv.clientWidth - document.getElementsByClassName('otherProductsContainer')[0].clientWidth;
      if(side == 'left'){
        if(document.getElementsByClassName('otherProducts')[0].clientWidth>document.getElementsByClassName('otherProductsContainer')[0].clientWidth){
          let left = this.$refs.scrollDiv.style.left?parseFloat(this.$refs.scrollDiv.style.left):0;
          maxLeft += left;
          left = left- (maxLeft>92?92:maxLeft)
          this.$refs.scrollDiv.style.left = left + 'px';
        }
      }else{
        let left = parseFloat(this.$refs.scrollDiv.style.left);
        if(left || left<0)
        {
          left = left + (left<parseFloat(-92)?92:-left)
          this.$refs.scrollDiv.style.left = left + 'px';
        }
      }
    },
    handleListElementClick(data) {
        this.selectedProductTypeFilter = data;
    },
    handledropDownClose() {
        // console.log(this.selectedProductTypeFilter)
    },
    isTypeString(variable) {
      typeof variable !== 'string'
    }
  }
};
</script>

<style lang="scss" scoped>
.main-loading{
    height: calc( 100vh - 3.75rem )
}

.popup-container{
  padding: 0rem;
  max-width: 80vw;
  .main-content{
    display: flex;
    @include respond(s-phone) {
          display: grid;

        }
  }
  .image-container{
    position: relative;
    min-height: 25rem;
    width: 45vw;
    @include respond(phone) {
      // width < 900px?
      width: 55vw;
    }
     
    max-height: 75vh;
    @include respond(s-phone) {
      // width < 480px?
      width: 100%;
      height: 50vh;
    }
    .image-list{
      position: absolute;
      top: 0.625rem;
      right: 1.25rem;
      height: 2.5rem;
      width: max-content;
      
      display: flex;
      div{
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 0.625rem;
      }
      .selected-image{
        box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
        border: 0.0625rem solid #000000;
      }
    }
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
   
  }
  .details-container{
    padding: 1.75rem 1.125rem;
    padding-bottom: 50px;
    width: 25vw;
     @include respond(phone) {
      // width < 900px?
      width: 35vw;
    }
    @include respond(s-phone) {
      // width < 480px?
      width: 100%;
      display: grid;
       grid-template-columns: 1fr 1fr;

    }
    position: relative;
    h2{
      color: #D48E8E;
      font-size: 1.9375rem;
      font-weight: 300;
      word-wrap: break-word;
      text-transform: capitalize;
       @include respond(s-phone) {
      // width < 480px?
      grid-column: 1/3;

     }
    }
    span{
      font-size: 0.875rem;
      color: #868686;
      font-weight: 500;
      
    }
    .description{
      font-size: 0.875rem;
      text-align: justify;
      color: #C4C4C4;
      margin-top: 0.9375rem;
    }
    .by{
      margin-bottom: 1.5625rem;
      text-transform: capitalize;
      @include respond(s-phone) {
      // width < 480px?
      grid-column: 1/3;

     }
    }
    .extraTags{
      display: flex; 
      margin-bottom: 0.9375rem;
      p{
        margin-bottom: 0rem;
        text-transform: capitalize;
      }
      p:nth-child(2){
        font-size: 0.875rem;
        color: #FFFFFF;
        text-align: justify;
        color: #C4C4C4;
        text-transform: uppercase;
        span{
          font-size: 0.875rem;
          color: #FFFFFF;
          text-align: justify;
          color: #C4C4C4;
          
        }
        
      }
      .unset-transform{
          text-transform: unset !important;
      }
      p:nth-child(1){
        margin-right: 1.25rem;
        width: 6.25rem;
        color: #868686;
      }
     
    }
    
  }
  .product-description{
       @include respond(s-phone) {
          // width < 480px?
          grid-column: 1/3;

        }
    }
  .otherProductsContainer{
    background: #C4C4C4;
    
    margin: 0rem 3.75rem;
    overflow: hidden;
    .left,.right{
      position: absolute;
      top:50%;
      cursor: pointer;
      transform: translateY(-50%);
    }
    .left{
      left: 1.25rem;
    }
    .right{
      right: 1.25rem;
    }
    .selectedProduct{
      img{
        //border: 2px solid #000000;
        box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
        box-sizing: border-box;
      }
    }
  }
  .otherProducts{
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    transition: all 0.5s ease-in-out;
    position: relative;
    div{
      padding: 1rem;
    }
    img{
      height: 3.75rem;
      cursor: pointer;
      &:hover{
        box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
      }
    }
  }
  .user-projects{
    border: 0.0625rem solid #414141;
    width: 30vw;
    @include respond(phone) {
      // width < 900px?
      width: auto;
    }
    padding: 1.5rem 3rem;
    .projects-check{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      margin:1.5rem 0rem;
      p{
        margin-bottom: 0rem;
        color: #C4C4C4;
        cursor: pointer;
      }
     
    }
  }
}
.popup-div{
  .selected-product{
    width: 70vw;
     @include respond(phone) {
      // width < 900px?
      width: 90vw;
      min-width: 90vw;
    }
  }
}
.selected-inspiration {
  padding: 1.875rem 2.1875rem;
  display: -ms-grid;
  display: grid;
  grid-template-columns: 60% 40%;
  @include respond(s-phone){ // width < 480px?
   grid-template-columns: 1fr;
   grid-row-gap: 2rem;
   padding: 0px;
    
  }
  
  .inspiration{
    position: relative;
    & > p, & > div{
      @include respond(s-phone){ // width < 480px?
        padding:0.5rem 1rem;
        margin-bottom: 0px;
      }
      
    }
    
  }
  .title-container {
    p {
      display: inline-block;
      font-size: 1.125rem;
      color: #4D4C4D;
      margin-left: 0.9375rem;
      margin-bottom: 0rem;
    }
    img{
        cursor: pointer;
    }
  }
  .inspiration-info-details{
    font-size: 0.875rem;
    text-transform: capitalize;

  }
  .inspiration-description{
      font-size: 0.875rem;
      color: #000000;
  }
  .pills-container{
    display: flex;
    display: -webkit-flex;
    margin-bottom: 0.875rem;
    overflow: auto;
    .pills{
        border:0.0625rem solid #E9BEB3;
        border-radius: 2.5rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        p{
            margin-bottom: 0rem;
            font-size: 0.6875rem;
            width: max-content;
            padding: 0.25rem 0.75rem;
            color: #4D4C4D;
        }
    }
    }
    .image-container{
         @include respond(s-phone){ // width < 900px?
          padding:0 !important;
        }
        .display-image-container{
            position: relative;
            .display-image{
                img{
                    width: 100%;
                    height: fit-content;
                    object-fit: cover;
                    max-height: 60vh;
                }
            }
            .image-left,.image-right{
                position: absolute;
                top: 50%;
                cursor: pointer;
                transform: translateY(-50%);
            }
            .image-left{
                left: 2.5rem;
            }
            .image-right{
                
                right: 2.5rem;
            }
        }
    }
    .thumnail-container{
        position: relative;
        padding: 0rem 1.875rem;
        margin: 1.25rem 0rem;
        .thumnail-left,.thumnail-right{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        .thumnail-left{
            left: 0rem;
        }
        .thumnail-right{
            right: 0rem;
        }
    }
    .inspiration-options{
        padding: 3.125rem 1.5625rem;
        position: relative;
        @include respond(s-phone){ // width < 900px?
          padding:0rem;
          margin-bottom: 0px;
        }
        .all-assets{
            margin-bottom: 1.875rem;
            display: none;
        }

        .shortlist-button-and-filter-wrapper {
          margin-left: 2.187rem;
          margin-bottom: 1.375rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .new-project{
            display: grid;
            grid-template-columns: max-content max-content;
            align-items: center;
            width: max-content;
            border: 0.0625rem solid $border-1;
            padding: 0.75rem 0.9375rem;
            grid-gap: 1.25rem;
            p{
            margin: 0rem;
            cursor:pointer;
            }
            img{
                cursor:pointer;
            }
            &:hover{
              background: #F7E3DF;
            }
        }
        p{
            margin-bottom: 0rem;
            font-size: 0.875rem;
            color: #000;
            margin-left: 0.8125rem;
        }
        .view-all{
            font-size: 0.8125rem;
            color: #D48E8E;
        }
        .option-main-container{
             margin-bottom: 2.5rem;
             margin-left: 0.625rem;
            .options-head-text{
                justify-content: space-between;
                margin-bottom: 0.625rem;
                margin-left: 1.5625rem;
                .left-text{
                    display: flex;
                    align-items: center;
                }
            }
        }
        
        .texture-container{
            margin-left: 1.5625rem;
            display: grid;
            grid-template-columns: 20% 20% 20% 20% 20%;
            img{
                padding-right: 0.3125rem;
                width: 100%;
                height: 3.125rem;
                object-fit: cover;
                &:last-child{
                    padding-right: 0rem;
                }
            }
        }
        .products-container{
            margin-left: 1.5625rem;
            display: grid;
            grid-template-columns: 33% 33% 33%;
            grid-template-columns: 31% 31% 31%;
            grid-gap: 0.875rem;
            max-height: calc(100vh - 320px);
            overflow: auto;
            padding-right: 8px;
            div{
              position: relative;
            }
            // input{
            //   position: absolute;
            //   top: 0.625rem;
            //   left: 0.625rem;
            // }
            img{
                width: 100%;
                height: 6.25rem;
                object-fit: cover;
                cursor: pointer;
                &:hover{
                  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
                }
            }

            .ap-logo-container {
              position: absolute;
              top: .25rem;
              right: .25rem;
              height: 1.5rem;
              width: 1.5rem;
              background-color: $color-white;

              display: flex;
              align-items: center;
              justify-content: center;
              padding: .3594rem;

              border-radius: 50%;

              img {
                  height: auto;
                  width: 100%;
              }
            }
        }
        
    }    
}
 .addToselected{
      position: absolute;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background: white;
      padding: 1rem;
      border-left: 1px solid #292929;
      .custom{
        display: flex;
        cursor: pointer;
        justify-items: center;
        justify-content: center;
        p{
          margin: 0px;
          padding-right: 0.5rem;
        }
      }
      input {
        display:none;
        &[type=checkbox]:checked {
          ~ #checkbox {
            display: flex;
            // @include transition(opacity 0.1s ease-in);
          }
          ~ #unchecked{
            display: none;
          }
        }
      }
      #checkbox, #unchecked {
        display: none;
        cursor: pointer;
        align-items: center;
        // @include transition(opacity 0.25s ease-out);
      }
      #unchecked{
        opacity: 1;
        display: flex;
      }
    }
.check-container{
      @include check-container(#E9BEB3,#ffffff,#D48E8E,16,#ffffff);
    }
.check-container-white{
      @include check-container(#E9BEB3,#ffffff,#D48E8E,12,#ffffff);
      position: absolute;
      top: 0.3125rem;
      left: 0.3125rem;
    }
.popup-details{

  .products-container{
    // margin-top: 2.8125rem;
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    div{
      position: relative;
      margin-right: 0.625rem;
      margin-bottom: 0.625rem;
    }
    img{
      height: 3.75rem;
      width: 4.6875rem;
      object-fit: cover;
    }
  }
}
.inspiration-info-details{
  p{
    text-transform: capitalize;
  }
}
.check-container-back{
  @include check-container(#414141,#414141,#ffffff,16,#414141);
}
.select-all-product{
  display: flex;
  span{
    font-size: 0.9rem;
  }
}
.info-inspiration{
    position: absolute;
    right: 1.5625rem;
    top:0px;
    display: none;
    svg{
      height: 24px;
      width: 24px;
    }
    &:hover{
      .info-window{
        display: block;
      }
    }
  }
.info-window{
  display: none;
  position: absolute;
  top:26px;
  right: 0px;
  width: 12rem;
  background: white;
  padding: 1rem;
  box-shadow: 0px 0px 4px 0px rgba(41, 41, 41, 0.2);
  p{
    margin: 0px;
  }
}
</style>

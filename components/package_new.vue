<template>
<div v-if="!loadingPaymentPage">
<div id="first"></div>
<div id="navbar-top"></div>
<div id="parent-container"></div>
  <div class="plansnew-main-container" v-if="user && packageDetails && packageDetails.monthly && packageDetails.monthly.length > 0" @click.prevent="isFilterDropdown = false;">
    <div v-for="(item,key) in displayPlan">
      <div v-bind:class="{'basic-main': (key === 'Neo Basic'),'standard-main': (key === 'Neo Standard'),'pre-main': (key === 'Neo Premium')}" v-for="pItem in packageDetails[displayPlan[key]]" v-if="pItem.package === key" :key="pItem.package">
        <div class="plan-card">
          <div id="container" v-if="key === 'Neo Standard' && !isPlanSticky">
            <span v-if="isLPU">Most popular pricing</span>
            <template v-else>
             <p class="standard-title-new" v-html="pItem.standardTitle"></p>
            </template>
          </div>
          <p class="plan-title">{{key.split('Neo ')[1]}}</p>
          <!-- <p class="plan-title" v-if="key === 'Neo Standard'">Standard</p> -->
          <!-- <p class="plan-title" v-if="key === 'Neo Premium'">Premium</p> -->
          <p class="plan-sub-title" v-if="key === 'Neo Standard'"> <span>For <b>professional designers</b></span></p>
          <p class="plan-sub-title" v-if="key === 'Neo Basic'">For beginners and personal use</p>
          <p class="plan-sub-title" v-if="key === 'Neo Premium'">For design teams & studios</p>
          <!-- <p class="plan-bill-title">Billed {{displayPlan[key]}}</p> -->
          <p class="plan-bill-title"></p>
          <!-- <span class="price-details" v-if="key !== 'Neo Standard'">
            <h1>${{pItem.finalPrice}}</h1>
            <p>/</p>
            <p>{{displayPlan[key] === 'monthly'?displayPlan[key].slice(0,2): displayPlan[key].slice(0,1)}}</p>
          </span> -->
          <span class="standard-price-details">
          <span class="price-details">
          <h1 v-if='getCurrencySymbol.toString().length==1' class="bolder" v-bind:style="{fontSize: (144/(parseInt(pItem.finalPrice.toString().length) + parseInt(getCurrencySymbol.toString().length-1)))>40 ? 40:(144/(parseInt(pItem.finalPrice.toString().length==3? 2:pItem.finalPrice.toString().length ) + parseInt(getCurrencySymbol.toString().length-1))) +'px'}">
          <span  v-bind:style="{fontSize: (getCurrencySymbol.toString().length==1? (144/(parseInt(pItem.finalPrice.toString().length)) )>40 ? 40:(144/(parseInt(pItem.finalPrice.toString().length))):24) +'px' , marginRight:'2px',fontWeight:600}" >{{getCurrencySymbol}}</span>{{pItem.finalPrice}}</h1>
          <h1 v-else class="bolder" v-bind:style="{fontSize: '41px' }">
          <span  v-bind:style="{fontSize:'21px' , marginRight:'2px',fontWeight:600}" >{{getCurrencySymbol}}</span>{{pItem.finalPrice}}</h1>
          
            <p>/</p>
            <p>mo</p>
          </span>
           <span class="old-price-details price-details" v-if="displayPlan[key] === 'yearly' || displayPlan[key] === 'quarterly'">
               <h1  v-bind:style="{fontSize: 64/(pItem.originalPrice.toString().length>3?  pItem.originalPrice.toString().length:3)+'px'}"><span  v-bind:style="{fontSize: (getCurrencySymbol.toString().length==1? 64/(pItem.originalPrice.toString().length>3?  pItem.originalPrice.toString().length:3):15) +'px'}" >{{getCurrencySymbol}}</span>{{pItem.originalPrice}}</h1>
                <p>/</p>
                <p>mo</p>
            </span>
          </span>
           <!-- <span class="standard-price-details" v-if="key === 'Neo Standard'">
              <span class="old-price-details price-details">
                <h1>${{pItem.originalPrice}}</h1>
                <p>/</p>
                <p>{{displayPlan[key] === 'monthly'?displayPlan[key].slice(0,2): displayPlan[key].slice(0,1)}}</p>
              </span>
              <span class="price-details">
                <h1 class="bolder">${{pItem.finalPrice}}</h1>
                <p>/</p>
                <p>{{displayPlan[key] === 'monthly'?displayPlan[key].slice(0,2): displayPlan[key].slice(0,1)}}</p>
              </span>
          </span> -->
          <span class="plan-switch" @click.stop>
            <div class="filter-dropdown">
              <span @click="isFilterDropdown = !isFilterDropdown;selectedPackage=key;">
                <p>{{'Billed '+ displayPlan[key]}}</p>
                <svg v-if="!isFilterDropdown || (isFilterDropdown && selectedPackage != key)" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="black" stroke-linejoin="round"/>
                </svg>
                <svg v-if="isFilterDropdown && selectedPackage === key" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L5 1L9 5" stroke="black" stroke-linejoin="round"/>
                </svg>
              </span>
               <ul v-if="isFilterDropdown && selectedPackage === key">
                  <li v-if="displayPlan[key] !== 'monthly'" @click="changeDisplayPlan(pItem.package,'monthly', false)" value="monthly">Billed Monthly </li>
                  <!-- <li v-if="displayPlan[key] !== 'quarterly'" @click="changeDisplayPlan(pItem.package,'quarterly', false)" value="quarterly">Billed Quarterly <p>(<b>{{key === 'Neo Basic' ? `${getPercentages.basic.quarterly}%`: key === 'Neo Standard' ? `${getPercentages.standard.quarterly}%` : `${getPercentages.premium.quarterly}%`}}</b>off)</p></li> -->
                  <li v-if="displayPlan[key] !== 'yearly'" @click="changeDisplayPlan(pItem.package,'yearly', false)" value="yearly">Billed Yearly <p>(<b>{{key === 'Neo Basic' ? `${getPercentages.basic.yearly}%`: key === 'Neo Standard' ? `${getPercentages.standard.yearly}%` : `${getPercentages.premium.yearly}%`}}</b>off)</p></li>
              </ul>
            </div>
            <!-- <button v-if="displayPlan[key] === 'monthly'" @click="changeDisplayPlan(pItem.package,'yearly',false)">Show Yearly</button>
            <button v-if="displayPlan[key] === 'yearly'" @click="changeDisplayPlan(pItem.package,'monthly', false)">Show Monthly</button> -->
            <p><span>SAVE {{pItem.discount}}%</span>on Yearly</p>
            <!-- <p v-if="key !== 'Neo Standard'"><span>Get {{pItem.discount}}% off on </span> yearly supscription</p>
            <p v-if="key === 'Neo Standard'"><span>You are getting {{pItem.discount}}% off on</span> yearly supscription</p> -->
          </span>
          <button class="buy-now"
           @click="buyPlan(pItem,displayPlan[key])" v-bind:class="{'disabledBtn' : ( (user.subInfo && user.subInfo.inherit) || pItem.currentActive || (future && future.length > 0 && future[0].package.displayContext.packageName === key) && future[0].package.invoice.period === (displayPlan[key] === 'monthly'?1:(displayPlan[key] === 'quarterly'?3:12)))}">{{pItem.currentActive ? 'Current Plan': ((future && future.length > 0 && future[0].package.invoice.period === (displayPlan[key] === 'monthly'?1:(displayPlan[key] === 'quarterly'?3:12)) && future[0].package.displayContext.packageName === key) ? 'Future Plan': (currentBilling && currentBilling.displayContext && !isFreeTrail && currentBilling.analyticsData && currentBilling.analyticsData.analyticsStatus && currentBilling.analyticsData.analyticsStatus === 'paid') ? 'Change Plan':'Buy Now')}}</button>
          <span class="list-of-features">
            <span class="feature-item" v-if="pItem.features" v-for="(feature,index) in pItem.features">
              <svg stroke="#E9BEB3" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke-width="1" d="M10.7637 1.26367L4.5 7.5332L1.23633 4.26367L1.76367 3.73633L4.5 6.4668L10.2363 0.736328L10.7637 1.26367Z" fill="#E9BEB3"/>
              <path stroke-width="1" d="M10.7637 1.26367L10.9405 1.44037L11.1171 1.26359L10.9404 1.0869L10.7637 1.26367ZM4.5 7.5332L4.32306 7.70982L4.49992 7.887L4.67686 7.7099L4.5 7.5332ZM1.23633 4.26367L1.05955 4.08689L0.882933 4.26351L1.05939 4.44029L1.23633 4.26367ZM1.76367 3.73633L1.94026 3.55936L1.76348 3.38296L1.5869 3.55955L1.76367 3.73633ZM4.5 6.4668L4.32341 6.64376L4.5001 6.82007L4.67669 6.64366L4.5 6.4668ZM10.2363 0.736328L10.4131 0.559551L10.2364 0.382865L10.0596 0.559461L10.2363 0.736328ZM10.5868 1.08698L4.32314 7.35651L4.67686 7.7099L10.9405 1.44037L10.5868 1.08698ZM4.67694 7.35659L1.41326 4.08705L1.05939 4.44029L4.32306 7.70982L4.67694 7.35659ZM1.4131 4.44045L1.94045 3.91311L1.5869 3.55955L1.05955 4.08689L1.4131 4.44045ZM1.58708 3.91329L4.32341 6.64376L4.67659 6.28983L1.94026 3.55936L1.58708 3.91329ZM4.67669 6.64366L10.413 0.913195L10.0596 0.559461L4.32331 6.28993L4.67669 6.64366ZM10.0596 0.913105L10.5869 1.44045L10.9404 1.0869L10.4131 0.559551L10.0596 0.913105Z" fill="#E9BEB3"/>
              </svg>
              <p v-html="feature.value"></p>
              <p class="bonus" v-if="key === 'Neo Standard' && displayPlan[key] === 'monthly' && index === 0">{{getXtimes.std}}</p>
              <p class="bonus" v-if="key === 'Neo Premium' && displayPlan[key] === 'monthly' && index === 0"> {{getXtimes.pre}}</p>
            </span>
            <span  class="feature-item" v-if="key != 'Neo Basic'" v-for="extra in pItem.addFeatures">
             <svg stroke="#E9BEB3" width="11" height="14" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M7.29783 1.5616V14.3908" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"></path>
             <path d="M13.8828 7.97632H1.05357" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"></path>
             </svg>
              <p v-html="extra.value"></p>
            </span>
          </span>
          <!-- <p class="free-credits" v-if="key !== 'Neo Basic'">++ Everything in Neo {{key === 'Neo Standard' ? 'Basic': 'Standard'}}</p> -->
        </div>
      </div>
    </div>
    <div class="popup-div package-popup"
     :class="showPopup?'showPopUp':''"
     >
      <div
        class="popup-container"
        :class="currentBilling && future && future.length==0?'':'future-plan-container'"
        @click.stop
      >
        <div class="close-popup" @click="closePopup">
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
        <!-- <div v-if="currentBilling && future.length==0">
          <packageComponent :packages="packages" :align="'center'" :user="user" :ppOrigin="'changeplan'"/>
        </div> -->
        <div class="future-plan-taken">
          <p v-if="user && user.accountType == 'root'">
            You seem to have already changed or cancelled your current plan. For further assistance, please contact customer support team or write to us on
            <a
              href="mailto:connect@foyr.com"
            >connect@foyr.com</a>
          </p>
          <p v-else>
            To be able to take any action on billing, please login from your parent account on Neo
          </p>
        </div>
      </div>
    </div>
    <!-- **********************UPGRADE/DOWNGRADE ALERT****************** -->
    <div class="popup-div change-plan-alert-popup" :class="(changePlanAlert)?'showPopUp':''">
      <div class="popup-container" @click.stop>
        <div class="close-popup" @click="changePlanAlert = false;">
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
        <!-- <div v-if="currentBilling && future.length==0">
          <packageComponent :packages="packages" :align="'center'" :user="user" :ppOrigin="'changeplan'"/>
        </div> -->
        <div class="cpa-container">
          <div class="content">
            <p class="heading-1"> Please review the changes and confirm</p>
            <div class="list">
              <span>
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#3A303A"/>
                  <path d="M7.31344 12.3745C7.23941 12.3749 7.16602 12.3607 7.09749 12.3327C7.02896 12.3047 6.96662 12.2635 6.91406 12.2113L4.10156 9.39885L4.89469 8.60572L7.31344 11.0188L13.1016 5.2251L13.8947 6.01822L7.70719 12.2057C7.60333 12.3117 7.46181 12.3724 7.31344 12.3745Z" fill="white"/>
                </svg>
                <p>Your plan will change to <b>{{selectedPlanDetails ? `${selectedPlanDetails.package} - ${selectedPlanDetails.duration}` : 'N/A'}}</b> on <b>{{formattedDate}}</b></p>
              </span>
              <span>
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#3A303A"/>
                  <path d="M7.31344 12.3745C7.23941 12.3749 7.16602 12.3607 7.09749 12.3327C7.02896 12.3047 6.96662 12.2635 6.91406 12.2113L4.10156 9.39885L4.89469 8.60572L7.31344 11.0188L13.1016 5.2251L13.8947 6.01822L7.70719 12.2057C7.60333 12.3117 7.46181 12.3724 7.31344 12.3745Z" fill="white"/>
                </svg>
                <p>You will be charged <b>{{getCurrencySymbol}}{{selectedPlanDetails.finalPrice * (selectedPlanDetails.duration == 'monthly'?1: selectedPlanDetails.duration == 'quarterly'?3:12)}} <b style="font-weight:normal">every</b> <b>{{selectedPlanDetails.duration === 'monthly' ? 'month': selectedPlanDetails.duration === 'quarterly' ? 'quarter': 'year'}}</b></b> starting <b>{{formattedDate}}</b></p>
              </span>
              <span>
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#3A303A"/>
                  <path d="M7.31344 12.3745C7.23941 12.3749 7.16602 12.3607 7.09749 12.3327C7.02896 12.3047 6.96662 12.2635 6.91406 12.2113L4.10156 9.39885L4.89469 8.60572L7.31344 11.0188L13.1016 5.2251L13.8947 6.01822L7.70719 12.2057C7.60333 12.3117 7.46181 12.3724 7.31344 12.3745Z" fill="white"/>
                </svg>
                <p>Any benefits or features exclusive to your current plan will discontinue on <b> {{formattedDate}}</b></p>
              </span>
            </div>
            <svg class="text-bg" width="330" height="119" viewBox="0 0 330 119" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.35 0.799992V117H85.272L27.338 46.45V117H0.778001V0.799992H23.022L80.79 71.35V0.799992H107.35ZM220.498 72.678C220.498 73.01 220.332 75.334 220 79.65H152.438C153.656 85.1833 156.533 89.5547 161.07 92.764C165.608 95.9733 171.252 97.578 178.002 97.578C182.65 97.578 186.745 96.914 190.286 95.586C193.938 94.1473 197.314 91.934 200.412 88.946L214.19 103.886C205.78 113.514 193.496 118.328 177.338 118.328C167.268 118.328 158.359 116.391 150.612 112.518C142.866 108.534 136.89 103.056 132.684 96.084C128.479 89.112 126.376 81.1993 126.376 72.346C126.376 63.6033 128.424 55.746 132.518 48.774C136.724 41.6913 142.423 36.2133 149.616 32.34C156.92 28.356 165.054 26.364 174.018 26.364C182.761 26.364 190.674 28.2453 197.756 32.008C204.839 35.7707 210.372 41.1933 214.356 48.276C218.451 55.248 220.498 63.382 220.498 72.678ZM174.184 45.952C168.319 45.952 163.394 47.612 159.41 50.932C155.426 54.252 152.992 58.7893 152.106 64.544H196.096C195.211 58.9 192.776 54.418 188.792 51.098C184.808 47.6673 179.939 45.952 174.184 45.952ZM280.235 118.328C270.828 118.328 262.362 116.391 254.837 112.518C247.422 108.534 241.612 103.056 237.407 96.084C233.202 89.112 231.099 81.1993 231.099 72.346C231.099 63.4927 233.202 55.58 237.407 48.608C241.612 41.636 247.422 36.2133 254.837 32.34C262.362 28.356 270.828 26.364 280.235 26.364C289.642 26.364 298.052 28.356 305.467 32.34C312.882 36.2133 318.692 41.636 322.897 48.608C327.102 55.58 329.205 63.4927 329.205 72.346C329.205 81.1993 327.102 89.112 322.897 96.084C318.692 103.056 312.882 108.534 305.467 112.518C298.052 116.391 289.642 118.328 280.235 118.328ZM280.235 97.08C286.875 97.08 292.298 94.8667 296.503 90.44C300.819 85.9027 302.977 79.8713 302.977 72.346C302.977 64.8207 300.819 58.8447 296.503 54.418C292.298 49.8807 286.875 47.612 280.235 47.612C273.595 47.612 268.117 49.8807 263.801 54.418C259.485 58.8447 257.327 64.8207 257.327 72.346C257.327 79.8713 259.485 85.9027 263.801 90.44C268.117 94.8667 273.595 97.08 280.235 97.08Z" fill="#3F3F3F" fill-opacity="0.1"/>
            </svg>
            <svg class="bg-pattern" width="150" height="186" viewBox="0 0 189 186" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.1">
              <path opacity="0.3" d="M149.086 78.084L0.00012207 131.888L149.086 185.692L298.173 131.888L149.086 78.084Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
              <path opacity="0.3" d="M149.086 52.2578L0.00012207 106.062L149.086 159.866L298.173 106.062L149.086 52.2578Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
              <path opacity="0.3" d="M149.086 26.4321L0.00012207 80.2362L149.086 134.04L298.173 80.2362L149.086 26.4321Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
              <path opacity="0.3" d="M149.087 0.605957L0.000366211 54.41L149.087 108.214L298.173 54.41L149.087 0.605957Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
              </g>
            </svg>
          </div>
          <div class="proceed-btn">
            <button @click="openPaymentPopup(false)">Confirm</button>
          </div>
         <!-- <p>Your new plan will be effective from {{selectedPlanDetails.nextBillingDate}}. Are you sure you want to change your plan?</p> -->
        </div>
        <!-- <div class="address-button-container" style="padding-top:1.25rem;">
          <button @click="closePopup" class="cancel-button">Cancel</button>
          <button @click="openPaymentPopup(false)" class="update-address">Proceed & Buy</button>
        </div> -->
      </div>
    </div>
    <!-- *********************END********************** -->
    <!-- **********************PAYMENT UPGRADATION ALERT****************** -->
    <div class="popup-div change-plan-alert-popup" :class="(isCurrencyMismatch )?'showPopUp':''">
      <div class="popup-container" @click.stop>
        <div class="close-popup" @click="isCurrencyMismatch = false;">
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
        <!-- <div v-if="currentBilling && future.length==0">
          <packageComponent :packages="packages" :align="'center'" :user="user" :ppOrigin="'changeplan'"/>
        </div> -->
        <div class="isCurrencyMismatch-container" >
          <div class="content" >
               <img src="../assets/images/backgrounds/isCurrencyMismatch.png" >
                <p class="heading-1" >Buy plans in your native currency</p>
                 <div>
                <p>Looks like your billing currency is USD. If you want to buy the plan in your native currency you can write to us at connect@foyr.com or you can message us on our 24/7 live chat support.</p>
                </div>
          </div>
          <div class="proceed-btn-container">
            <a class="proceed-btn" @click="openPaymentPopup(false)" href="mailto:connect@foyr.com" >Talk to us</a>
          </div>
         <!-- <p>Your new plan will be effective from {{selectedPlanDetails.nextBillingDate}}. Are you sure you want to change your plan?</p> -->
        </div>
        <!-- <div class="address-button-container" style="padding-top:1.25rem;">
          <button @click="closePopup" class="cancel-button">Cancel</button>
          <button @click="openPaymentPopup(false)" class="update-address">Proceed & Buy</button>
        </div> -->
      </div>
    </div>
    <!-- *********************END********************** -->
    <!-- Processing your payment  ************************ receivingPaymentLoading-->
    <div class="popup-div payment-updating-popup" :class="receivingPaymentLoading?'showPopUp':''">
      <div class="popup-container" @click.stop>
        <div class="payment-wait-container">
          <img src="~assets/images/loader.gif" alt="" srcset="">
          <p>Your subscription details are being updated, please do not refresh</p>
        </div>
      </div>
    </div>
    <!-- Processing your payment  ************************ -->
    <MessageComponent :changeRight="message" />
  </div>
  <div class="main-loading" v-else>
    <div class="loading-container">
      <p>Loading...</p>
      <div class="loader"></div>
    </div>
  </div>
  <div class="addon-container" >
    <div class="addon-title">
      <p class="main">Get Add on credits</p>
      <p class="sub">You can buy them in case you run out of credits</p>
    </div>
    <div class="addon-price"  style="padding-right: 35px" v-if='getExtraInfoCredits'>
      <p><span>{{getExtraInfoCredits.renderCredits.currency}}</span><span class="price">{{getExtraInfoCredits.renderCredits.cost}}</span></p>
      <span>
      <p class="model">{{getExtraInfoCredits.renderCredits.credits}} Credits</p>
      <p class="price-model">{{getExtraInfoCredits.renderCredits.currency}} {{getExtraInfoCredits.renderCredits.costPerCredit}} / credit</p>
      </span>
    </div>
    <div class="addon-price" v-if='getExtraInfoCredits' >
      <p><span>{{getExtraInfoCredits.modelCredits.currency}}</span><span class="price">{{getExtraInfoCredits.modelCredits.cost}} </span></p>
      <span>
      <p class="model">{{getExtraInfoCredits.modelCredits.credits}} Models</p>
      <p class="price-model">{{getExtraInfoCredits.modelCredits.currency}} {{getExtraInfoCredits.modelCredits.costPerCredit}} / model</p>
      </span>
    </div>
  </div>
  <!-- COUPON CODE --------------------------------- -->
  <CouponCodeComponent/>
  <div class="payment-iframe-popup popup-div" :class="launchPaymentIframe ? 'showPopUp': ''">
    <div class="popup-container">
      <div class="close-popup" @click="closePopup">
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
      <div class="popup-details">
        <iframe
          class="free-demo-iframe"
          width="600"
          height="668"
          :src="paymentUrl"
        ></iframe>
      </div>
    </div>
  </div>
</div>
 <div v-else>
    <div class="main-loading" v-if="loadingPaymentPage">
      <div class="loading-container">
        <p>You will soon be redirected to payment page..Please wait.</p>
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import CouponCodeComponent from './shared/couponPopup';
export default {
  components: {
    CouponCodeComponent
  },
  head() {
    return {
      title: "Neo - Settings"
    };
  },
  props: {
    // users: Object,
  },
  data() {
    return {
      message: {
        value: "",
        error: false,
        global: false
      },
      planSeperation : {
        'monthly': [],
        'quarterly':[],
        'yearly': []
      },
      displayPlan : {
        'Neo Basic' : 'monthly',
        'Neo Standard': 'yearly',
        'Neo Premium': 'monthly',
      },
      loadingPaymentPage : false,
      showCoupon:false,
      showPopup: false,
      extraFeatures: {
        'std': [
          '<b>2</b> 3D model requests / mo',
          '1-click <b>3D Walkthrough</b>',
          'Create <b>your own</b> products',
        ],
        'pre': [
          'Dedicated Support'
        ]
      },
      isFilterDropdown: false,
      selectedPackage: '',
      changePlanAlert: false,
      isCurrencyMismatch : false,
      selectedPlanDetails: {},
      launchPaymentIframe: false,
      paymentUrl: '',
      receivingPaymentLoading: false,
    };
  },
  computed: {
    ...mapState({
      user: state => state.User.user,
      currentBilling: state => state.Billing.currentSubscription,
      packages: state => state.Subscriptions.packages,
      packageDetails: state => state.Subscriptions.packageDetails,
      isChargebee: state => state.Billing.isChargebee,
      future: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "future" && item.type == "package";
        }),
      isFreeTrail: state => state.Billing.isTrial,
      isLPU: state => state.User.isLPU,
      isPlanSticky: state => state.Billing.isPlanSticky,
    }),
    ...mapGetters({
      // getState: "User/getState"
    }),
    formattedDate: function(){
      if(this.currentBilling && this.currentBilling.nextBilling){
        let newDate = new Date(this.currentBilling.nextBilling);
        let mlist = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        newDate = mlist[newDate.getMonth()]+' '+ newDate.getDate()+", "+ newDate.getFullYear();
        return newDate;
       }else {
        return 'N/A'
      }
    },
    getXtimes () {
      let xTimes= {
        std: "",
        pre: "",
      }
      if (this.packages.extraInfo && this.packages.extraInfo.xtimes) {
        xTimes.std = this.packages.extraInfo.xtimes.standard
        xTimes.pre = this.packages.extraInfo.xtimes.premium
      }
      return xTimes;
    },
    getPercentages () {
      if(this.packages && this.packages.extraInfo && this.packages.extraInfo.spercentage)
      {
         return this.packages.extraInfo.spercentage
      }
     
    },
    getCurrencySymbol(){      
       if( this.packages &&  this.packages.data && this.packages.data.length>0 &&  this.packages.data[0] && this.packages.data[0].displayContext && this.packages.data[0].displayContext.currency_symbol)
        {  return this.packages.data[0].displayContext.currency_symbol;}  
        return "" 
  },
     getExtraInfoCredits(){
       if(this.packages && this.packages.extraInfo)
       return this.packages.extraInfo.addonInfo;
    },isCurrentPlanIsAccourdingToCountry(){

        if(this.user && this.user.ipInfo && (this.user.ipInfo.country=='IN' || this.user.ipInfo.country=='CA'))
          {//user belongs to India or Canada 
            
            if(this.currentBilling.name.toString().toUpperCase().includes("CA") || this.currentBilling.name.toString().toUpperCase().includes("IN"))
            {
              return true;
            }

           return true;
          }

         return false;
    }
  },
  mounted() {
    this.$root.$on('waiting-for-payment-update',(_loading)=> {
      this.receivingPaymentLoading = _loading;
      if(!_loading)
      this.$router.push('/settings/plans')
    })
    let chargebeeInstance = Chargebee.init({
      site: (window.location.host == "neo.foyr.com" ||  window.location.host == "neopreprod.foyr.com")?"foyr":"foyr-test"
    });
    if(window.analytics){
      analytics.track(
      'Plans_opened',
      {
        author: (this.user && this.user.email) ? this.user.email : '',
        action: 'opened',
      },
      { integrations: { Amplitude: { session_id: new Date().getTime() } } },
      { timestamp: new Date().getTime() }
      );
    }
    this.$root.$on('coupon_copied', ()=> {
      this.message.global = true;
      this.message.error = false;
      this.message.value = "Coupon Copied!";
      setTimeout(() => {
        this.message.value = "";
        this.message.global = false;
      }, 2000);
    })
    this.preparePlansDetails();
     window.$nuxt.$store.state.Billing.isPlanSticky = false;
    let newObserver = new IntersectionObserver(function(entries) {
   if(entries[0].intersectionRatio === 0)
     window.$nuxt.$store.state.Billing.isPlanSticky = true;
   else if(entries[0].intersectionRatio === 1)
     window.$nuxt.$store.state.Billing.isPlanSticky = false;
}, { threshold: [0,1] });
  newObserver.observe(document.querySelector("#navbar-top"));
  },
  watch: {
    currentBilling: function(){
      this.preparePlansDetails();
      // if(this.packageDetails && this.packageDetails.monthly && this.packageDetails.yearly && this.packageDetails.quarterly && (this.packageDetails.monthly.length < 3 || this.packageDetails.yearly.length < 3 || this.packageDetails.quarterly.length < 3)){
      // }
    },
    packages: function(){
      if(this.packages && this.packages.data && this.packages.data.length >= 9){
        this.preparePlansDetails();
      }
    }
  },
  methods: {
    ...mapActions({
      packageDetailsSeperation: "Subscriptions/packageDetailsSeperation",
      fetchCurrentSubscription:'Billing/fetchCurrentSub',
      buy: "Subscriptions/buy",
      sendMail: "Billing/buyNowEmailSend",
      getPlanSwitchStatus: "Subscriptions/getPlanSwitchStatus",
      fetchMySubscriptions: 'Subscriptions/fetchMySubscriptions',
      analyticsDataToBackend: 'Subscriptions/analyticsDataToBackend',
    }),
    preparePlansDetails() {
      this.planSeperation = {
        'monthly': [],
        'quarterly':[],
        'yearly': []
      };
      this.packageDetailsSeperation(this.planSeperation)
      if(this.packages && this.packages.data && this.packages.data.length > 0) {
        this.packages.data.forEach(packageItem => {
            if(packageItem && packageItem.invoice && ['Neo Basic','Neo Standard','Neo Premium'].includes(packageItem.displayContext.packageName)) {
              if(packageItem.invoice.period && (packageItem.invoice.period === 1 ||packageItem.invoice.period === 3 || packageItem.invoice.period === 12)){
                let dur = packageItem.invoice.period === 1 ? 'monthly' : (packageItem.invoice.period === 3 ?'quarterly': 'yearly');
                this.planSeperation[dur].push({
                  'package': packageItem.displayContext.packageName,
                  'finalPrice': packageItem.displayContext.packageCost,
                  'originalPrice': packageItem.displayContext.originalPrice,
                  'features': packageItem.displayContext.features,
                  'discount': packageItem.displayContext.discount,
                  'currentActive': false,
                  '_id': packageItem._id,
                  'addFeatures': packageItem.displayContext.addFeatures,
                  'standardTitle': (packageItem.meta_data && packageItem.meta_data.standardPricingTittle) ? packageItem.meta_data.standardPricingTittle: 'Get upto <b style="color: #ffab40;">4.5 months</b> free when you buy yearly',
               })
              }
            }
        });
        if(this.planSeperation && ((this.planSeperation.monthly && this.planSeperation.monthly.length < 3) ||(this.planSeperation.quarterly && this.planSeperation.quarterly.length < 3) || (this.planSeperation.yearly && this.planSeperation.yearly.length < 3))){
          if(this.currentBilling && this.currentBilling.displayContext && this.currentBilling.billing && (this.currentBilling.billing === 3 || this.currentBilling.billing === 1 || this.currentBilling.billing === 12)){
             if(this.currentBilling.displayContext.packageName && ['Neo Basic','Neo Standard','Neo Premium'].includes(this.currentBilling.displayContext.packageName)){
               let expiryDate = new Date(this.currentBilling.subscriptionExpiryDate).getTime();
               if(new Date().getTime() < expiryDate){
                 let dur = this.currentBilling.billing === 1 ? 'monthly' : (this.currentBilling.billing === 3 ?'quarterly': 'yearly');
                 this.planSeperation[dur].push({
                   'package': this.currentBilling.displayContext.packageName,
                   'finalPrice': this.currentBilling.displayContext.packageCost,
                   'originalPrice': this.currentBilling.displayContext.originalPrice,
                   'features': this.currentBilling.displayContext.features,
                   'addFeatures': this.currentBilling.displayContext.addFeatures,
                   'discount': this.currentBilling.displayContext.discount,
                   'currentActive': true,
                    'standardTitle': (this.currentBilling.meta_data && this.currentBilling.meta_data.standardPricingTittle) ? this.currentBilling.meta_data.standardPricingTittle: 'Get upto <b style="color: #ffab40;">4.5 months</b> free when you buy yearly',
                 })
                 this.changeDisplayPlan(this.currentBilling.displayContext.packageName,dur, true)
               }
             }
           }
        }
       this.packageDetailsSeperation(this.planSeperation)
      }
    },
    changeDisplayPlan(_packageName, _value, _defaultLoad){
      if(window && window.analytics && !_defaultLoad){
        analytics.track(
          "Plan filter clicked",
          {
            author: this.user.email,
            frequency: `${_value}`,
            plan: `${_packageName}`,
            lpu: this.isLPU
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
      this.isFilterDropdown = false;
      this.displayPlan[_packageName] = _value;
    },
    buyPlan(_packageDetails,_duration) {
      if(this.user.subInfo && this.user.subInfo.inherit){
        return;
      }
      if(this.user && this.user.accountType && this.user.accountType !== 'root'){
        this.showPopup = true;
        return;
      }
      let period = _duration === 'monthly'?1: _duration=='quarterly' ? 3: 12;
      if(this.currentBilling && this.currentBilling.displayContext && this.currentBilling.displayContext.packageName){
        let packageName = this.currentBilling.displayContext.packageName;
        if(_packageDetails.package === packageName && period === this.currentBilling.billing && this.currentBilling.analyticsData && this.currentBilling.analyticsData.analyticsStatus && this.currentBilling.analyticsData.analyticsStatus === 'paid')
          return;
      }
      if(this.future && this.future.length > 0 && this.future[0].invoice){
        if(_packageDetails.package === this.future[0].package.displayContext.packageName && period === this.future[0].invoice.period)
          return;
      }
      // console.log(_packageDetails,_duration,this.future)
      this.selectedPlanDetails = _packageDetails
      this.selectedPlanDetails['duration'] = _duration;
      // this.changePlanAlert = true;
      // return;
      if(window.analytics){
         analytics.track(
          "Buy Now",
          {
            author: this.user.email,
            frequency: `${_duration}`,
            plan: this.isLPU ? `Foyr ${_packageDetails.package}`: _packageDetails.package,
            lpu: this.isLPU
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
      this.analyticsDataToBackend({buy_now_click: true});
      if(_packageDetails && _packageDetails._id){
        if(this.isChargebee){
          // CHARGEBEE USERS
          if(this.currentBilling &&
           this.currentBilling.subscription &&
           this.currentBilling.analyticsData &&
           this.currentBilling.analyticsData.analyticsStatus &&
           (this.currentBilling.analyticsData.analyticsStatus ==='paid' ||  this.currentBilling.analyticsData.analyticsStatus==='free trial')
           ){
            this.getPlanSwitchStatus({currentPackageId: this.currentBilling.subscription, futurePackageId: _packageDetails._id, accountId: this.user.accountId}).then((Response)=> {
              if(Response){
                if(Response.isCurrencyMismatch)
                {
                  this.isCurrencyMismatch=true;
                }else if(!Response.upgrade){
                  // Downgrade alert showing
                  this.changePlanAlert = true;
                  this.selectedPlanDetails['nextBillingDate'] = Response.nextBillingDate ? Response.nextBillingDate : '';
                  // return;
                }else
                  this.openPaymentPopup(true)
                }
            })
          }else
            this.openPaymentPopup(true)
        }else {
          // ZOHO USERS
          if(this.future && this.future.length > 0 || this.user && this.user.accountType !== 'root'){
            this.showPopup = true;
            return;
          }
          this.openPaymentPopup(true)
        }
      }
    },
    prepareEmailTemplate: function(packageName,_duration) {
      let emailContent = {
        mailerType: "SUB_BUY_NOW_CLICKED",
        subject: this.user.fullName + " " + "just clicked on Buy Now",
        templatedata: {
          name: this.user.fullName ? this.user.fullName : "",
          email: this.user.email ? this.user.email : "",
          country: this.user.country ? this.user.country : "",
          package: packageName ? packageName + "-" + _duration : ""
        }
      };
      this.sendMail(emailContent);
    },
    detectPopupBlocker(url) {
      var popup = window.open(url, "", "", true);
      setTimeout(function() {
        if (!popup || popup.outerHeight === 0) {
          //First Checking Condition Works For IE & Firefox
          //Second Checking Condition Works For Chrome
          alert(
            "Popup Blocker is enabled! Please add this site to your exception list."
          );
        } else {
          window.close();
        }
      }, 25);
    },
    closePopup(){
      if(this.isFreeTrail && this.showCoupon){
          if(window.analytics){
          analytics.track(
          'Coupon_popup-closed',
          {
            author: (this.user && this.user.email) ? this.user.email : '',
            action: 'popup-closed',
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
          );
        }
        //  this.showCoupon = true;
       }
      this.showPopup = false;
      this.showCoupon = false;
      this.launchPaymentIframe= false;
      // this.changePlanAlert = false;
    },
    openPaymentPopup(_isUpgrade){
      let oldPlan = (this.currentBilling && this.currentBilling.displayContext && this.currentBilling.displayContext.packageName) ? this.currentBilling.displayContext.packageName : null
      let chargebeeInstance = Chargebee.getInstance();
      if(_isUpgrade){
        this.loadingPaymentPage = true;
        this.$parent.isRedirecting = true;
      }
      // Requesting for host page url
      this.buy({
        accountId: this.user.accountInfo.accountId,
        package: this.selectedPlanDetails._id
      }).then(res => {
          this.changePlanAlert = false;
          this.isCurrencyMismatch= false;
          this.loadingPaymentPage = false;
          this.$parent.isRedirecting = false;
          this.$parent.show = false;
          // sending email on plan buy
          this.prepareEmailTemplate(this.isLPU ? `Foyr ${this.selectedPlanDetails.package}`: this.selectedPlanDetails.package , this.selectedPlanDetails.duration);
          if (window.analytics) {
            window.analytics.track(
              "subscriptionBuy",
              {
                title: "buy",
                subtitle: this.selectedPlanDetails._id,
                author: this.user.email,
                lpu: this.isLPU
              },
              {
                integrations: { Amplitude: { session_id: new Date().getTime() } }
              },
              { timestamp: new Date().getTime() }
            );
          }
          if(this.isChargebee){
            // it is for chargebee
            if(_isUpgrade){
              chargebeeInstance.openCheckout({
                hostedPage: function() {
                  return  new Promise(function(resolve, reject){
                    resolve(res.hostedPage);
                  });
                },
                success: (hostedPageId) => {
                  window.$nuxt.$emit("bill-update-request",{payment:true, plan: oldPlan});
                  window.$nuxt.$emit("buy_success_tour_launch",{plan: oldPlan});
                },
                close: function() {
                  window.$nuxt.$emit("payment-popup-close", {type : 'main', waitingTime: 11000});
                  // Optional
                  // will be called when the user closes the checkout modal box
                }
              });
            }
            else {
              // this.$root.$emit("bill-update-request",);
              this.fetchMySubscriptions({accountId: this.user.accountId})
              this.message.value = "Your new plan has updated successfully. Please check more details in billing."
              this.message.global = true;
              this.message.error = false;
              setTimeout(() => {
                this.message.value = "";
                this.message.global = false;
              }, 3500);
            }
          }else {
            // ZOHO users payment new tab
            this.detectPopupBlocker(res.hostedPage.url)
          }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.plansnew-main-container {
  background: white;
  padding: 1rem 0;
  display: grid;
  padding-top: 5rem;
  // grid-template-columns: repeat(3,max-content);
  grid-auto-flow: column;
  justify-content: center;
  .plan-card {
    background: white;
    padding: 1rem 0;
    display: grid;
    grid-auto-flow: row;
    width: 23rem;
    height: auto;
    border: 1px solid #E9BEB3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    .plan-title,.plan-sub-title,.plan-bill-title,.price-details,.plan-switch,.list-of-features {
      padding-left: 3rem;
    }
    .plan-title {
      font-weight: bold;
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
      line-height: 1.875rem;
      // color: #505050;
      color: #E9BEB3;
      margin: 0;
      padding-bottom: 0.2rem;
    }
    .plan-sub-title {
      // font-family: 'Nunito Sans','Montserrat', sans-serif;
      font-size: 1.03rem;
      line-height: 1.5rem;
      // font-weight: normal;
      /* identical to box height */
      // letter-spacing: 0.05em;
      // text-transform:;
      color: #292929;
      margin-bottom: 3rem;
    }
    .plan-bill-title {
      text-transform: capitalize;
      font-weight: 500;
      font-size: 0.85rem;
      line-height: 2.1875rem;
      letter-spacing: 0.5px;
      color: #505050;
      margin-bottom: 0.3125rem;
      color: #E9BEB3;
    }
    .price-details {
      display: grid;
      grid-template-columns: repeat(3, max-content);
      column-gap: 0.1rem;
      align-items: end;
      // padding-bottom: 2rem;
      h1:nth-child(1) {
        font-weight: bold;
        font-size: 3.5rem;
        line-height: 2.125rem;
        color: #292929;
      }
      p {
        font-weight: 500;
        font-size: 14.33px;
        line-height: 1.1875rem;
        color: #505050;
        margin: 0;
      }
    }
    .plan-switch {
      .filter-dropdown {
        span {
          cursor: pointer;
          display: grid;
          grid-template-columns: 1fr max-content;
          align-items: center;
          column-gap: 0.5rem;
          // width: 13.5rem;
          padding: 0.6rem 1rem;
          width: 12rem;
          p {
            margin:0;
            font-size: 0.896rem;
            letter-spacing:0.05rem;
            font-weight: 600;
            color: #0E0E0E;
            text-transform: capitalize;
          }
        }
        background: #FFFFFF;
        border: 1px solid #E9BEB3;
        justify-self: end;
        position: relative;
        // margin-bottom: 1rem;
        ul {
          cursor: pointer;
          width: 100%;
          position: absolute;
          list-style-type: none;
          border: 1px solid #E9BEB3;
          z-index: 2;
          background: white;
          // padding: 0.5rem;
          li {
            padding: 1rem;
            padding-right: 0.3rem;
            font-weight: 500;
            font-size: 0.84rem;
            line-height: 1rem;
            color: #222021;
            display: flex;
            justify-content: space-between;
            p {
              font-weight: normal;
              b {
                font-size: 0.9rem;
              }
              // span {
              //   font-weight: normal;
              // }
              // color: #E9BEB3;
            }
            &:hover {
              background: #F7E3DF;
            }
          }
        }
     }
      display: grid;
      grid-template-columns: max-content 1fr;
      column-gap: 0.8rem;
      // align-items: center;
      padding-bottom: 2rem;

      // button {
      //   font-size: 0.9rem;
      //   font-family: "Montserrat", sans-serif;
      //   font-weight: 600;
      //   color: #505050 !important;
      //   outline: none;
      //   cursor: pointer;
      //   width: 8.5rem;
      //   padding: 0.6rem 0.5rem;
      //   // height: 2rem;
      //   // padding: 0.5rem;
      //   border: 1px solid #E9BEB3;
      //   box-sizing: border-box;
      //   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      //   position: relative;
      //   z-index: 0;
      //   @include background-animate(#FAF0EC, black);
      // }
      p {
        font-weight: 500;
        font-size: 0.8rem;
        justify-self: start;
        // line-height: 0.6875rem;
        color: #0E0E0E;
        margin: 0;
        text-align: center;
        // padding-right: 1rem;
        span {
          font-weight: bold;
          font-size: 1rem;
          &::after {
            content: '\A';
            white-space: pre;
          }
        }
      }

    }
    .buy-now {
      cursor: pointer;
      justify-self: center;
      font-family: 'Nunito Sans','Montserrat', sans-serif;
      // background: rgba(41, 41, 41, 0.74);
      background: #FAF0EC;
      font-weight: 900;
      font-size: 1.3rem;
      line-height: 19px;
      font-stretch: expanded;
      color: black;
      font-size-adjust: 0.58;
      width: 20rem;
      height: 2.75rem;
      position: relative;
      z-index: 0;
      @include background-animate(#e9beb3, black);
    }
    .list-of-features {
      padding-top: 2rem;
      height: auto;
      overflow: scroll;
      .feature-item {
        p {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: 0.2px;
          font-feature-settings: 'case' on;
          color: #3A393A;
          // font-feature-settings: 'case' on;
          // color: #3A393A;
          font-family: 'Nunito Sans','Montserrat', sans-serif;
        }
        display: grid;
        // grid-template-columns: max-content 1fr;
        grid-auto-flow: column;
        justify-content: left;
        align-items: center;
        column-gap: 1rem;
        padding-bottom: 0.5rem;
      }
    }
    .premium-features {
    .feature-item {
      grid-template-columns: max-content max-content 1fr;
    }
  }
  }
  .standard-main {
    padding:2rem;
    background: #FAF0EC;
    .standard-title {
      font-weight: 400;
      font-size: 11px;
      color: #292929;
      text-align: center;
      position: sticky;
      top: 0rem;
      span {
        font-size: 12px;
        font-weight: bold;
      }
    }
    .plan-card {
      // padding-top: 0;
      border: 1px solid white;
      .plan-title {
        // color: #E9BEB3;
        color: #292929;
      }
      .plan-bill-title {
        color: #505050;
        margin-top: 1rem;
      }
      .plan-switch {
        padding-bottom: 1rem;
        button {
          background: #FFFFFF;
          // border: 1px solid #FAF0EC;
          border: none;
          box-sizing: border-box;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        }
        // p {
        //   // padding-right: 10px;
        // }
      }
      // 'Nunito Sans','Montserrat', sans-serif;
      // .standard-price-details {
      //   // padding-bottom: 5.5rem !important;
      // }
      // .standard-price-details {
      //   display: grid;
      //   .price-details {
      //     // padding-bottom: 2.5rem;
      //     padding-bottom: 1.2rem;
      //     width: 11rem;
      //     .bolder {
      //       text-shadow:1px 1px 0px rgba(0,0,0,.56);
      //     }
      //   }
      //   .old-price-details {
      //     p {
      //       align-items: baseline;
      //     }
      //     h1 {
      //       text-decoration: line-through;
      //       color: #EBBEB5;
      //       font-size: 1.4rem;
      //       text-decoration-color: rgba(80, 80, 80, 0.85);
      //     }
      //   }
      // }
      .plan-sub-title {
        // padding-bottom: 2.8rem;
        span {
          background: #FAF0EC;
          // font-size: 0.9rem;
          font-size: 1rem;
          line-height: 1.5rem;
          letter-spacing: 0.05em;
          .bold {
            font-weight: 800;
          }
        }
      }
      .list-of-features {
        // height: 20rem;
        min-height: 22rem;
      }
    }
    .buy-now {
      background: #292929;
      color: #E9BEB3;
      border: 1px solid #EBBEB5;
      margin-top: 1rem;
    }
  }
  .standard-price-details {
      display: grid;
      grid-template-columns: 11rem 1fr;
      align-items: baseline;
      // padding-bottom: 1.5rem;
      height: 6rem;
      // .price-details {
      //   // padding-bottom: 2.5rem;
      //   // padding-bottom: 1.4rem;
      // }
      .old-price-details {
        padding-left: 57px !important;
        h1 {
          font-weight: 500 !important;
         // font-size: 2.2rem !important;
          line-height: 2.125rem !important;
          // text-decoration: line-through;
          // text-decoration-color: black;
          color: #585858 !important;
          position: relative;
        }
        h1:before {
              position: absolute;
              content: "";
              left: 0;
              top: 50%;
              right: 0;
              border-top: 2px solid;
              border-color: inherit;
              
              // -webkit-transform:rotate(0deg);
              // -moz-transform:rotate(0deg);
              // -ms-transform:rotate(0deg);
              // -o-transform:rotate(-5deg);
              // transform:rotate(-5deg);
            }
        p {
          font-weight: 500;
          font-size: 8.06px;
          line-height: 1.4rem;
        }
      }
    }
  .basic-main, .pre-main {
    padding: 5rem 0rem;
  }
  .pre-main {
    .plan-card {
      .list-of-features {
        min-height: 24rem;
      }
    }
  }
  .future-plan-container {
    padding: 3.125rem 3.125rem;
  }
  .future-plan-taken {
    p {
      width: 30vw;
      color: white;
      text-align: justify;
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.375rem;
      margin: 0;
    }
    a {
      color: #d48e8e;
      text-decoration: none;
    }
  }
  .free-credits {
    padding: 0.8rem;
    margin: 0;
    font-weight: 900;
    font-size: 1.1rem;
    line-height: 3px;
    color: #E8AC9C;
    text-align: center;
    font-family: 'Nunito Sans','Montserrat';
      span {
        font-size: 1rem;
        font-weight: 900;
        color: black;
      }
  }
   .bonus {
    font-family: 'Nunito Sans','Montserrat';
    font-weight: 900 !important;
    font-size: 1rem;
    line-height: 0px;
    color: #E9BEB3 !important;
    padding-left: 2rem;
    }
}
.disabledBtn {
  cursor: not-allowed !important;
  animation: none;
  &::before,&::after {
    animation: none;
  }
}
.addon-container{
   background: #FAF0EC;
   display: grid;
   grid-template-columns: 55% 1fr 1fr;
   align-items: center;
   padding: 2rem 6rem;
   p {
     margin: 0;
   }
   .addon-title {
     .main {
      font-style: normal;
      font-weight: 900;
      font-size: 2.5rem;
      line-height: 55px;
      color: #292929;
     }
     .sub {
      font-style: normal;
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.375rem;
      color: #4D4C4D;
      padding-right: 20rem;
     }
   }
   .addon-price {
    display: grid;
    grid-template-columns: repeat(2,max-content);
    align-items: center;
    .price {
      font-style: normal;
      font-weight: normal;
      font-size: 4rem;
      line-height: 4.125rem;
      color: #292929;
    }
    p {
      span{
        font-size: 21px;
        line-height: 34px;
        text-align: center;
        color: #C27272;
        vertical-align: top;
        padding-right: 0.4rem;
      }
    }
    .model {
      font-style: normal;
      font-weight: 500;
      font-size: 1.3125rem;
      line-height: 1.875rem;
      color: #292929;
    }
    .price-model {
      font-size: 1rem;
      line-height: 2.125rem;
      color: #000000;
    }
   }

}
.coupon-container {
  background: #FFFFFF;
  box-shadow: 0px 0px 4px #000000;
  text-align: center;
  .popup-details {
    margin-top: 1.25rem;
    max-height: 65vh;
  }
.heart-symbol {
  position: absolute;
  margin: auto;
  left: 0;
  right: 5px;
  top: 16%;
  z-index: -1;
}
p{
  font-weight: 500;
  font-size: 1.3125rem;
  line-height: 1.3125rem;
  color: #0E0E0E;
}
.heading {
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 1.625rem;
  color: black;
  b {
    color: #C27272;
  }
}
.sub-heading {
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.625rem;
  color: #0E0E0E;
  padding: 0;
}
.offer-heading {
  margin-bottom: 1.5rem;
  font-size: 4.5rem;
  line-height: 5.1875rem;
  color: #0E0E0E;
  padding-top: 4rem;
  // padding: 0.75rem;
}
.code-container {
  margin-top: 5rem;
  height: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background: #F0F0F0;
  p:nth-child(1){
    // padding-left: 1.625rem;
    justify-self: end;
    padding-right: 1rem;
  }
  p{
    margin: 0;
  }
  .coupon{
    // font-style: italic;
    font-weight: bold;
    font-size: 2rem;
    line-height: 1.3125rem;
    color: #000000;
    // padding-left: 0.25rem;
    letter-spacing: 0.2rem;
    justify-self: start;
    padding-left: 1rem;
  }
  // .copy-btn {
  //   position: relative;
  //   border: 1px solid;
  //   padding: 0.5rem;
  //   @include background-animate(#FAF0EC, black);

  // }
}
.copy-btn {
    margin-top: 2rem;
    background: #3A393A;
    // margin: 4rem 0;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.25rem;
    cursor: pointer;
    color: white;
    padding: 0.9rem 2.5rem;
    // border: 0.0625rem solid #4d4c4d;
    // margin-bottom: 0.9375rem;
    position: relative;
    z-index: 1;
    font-family: montserrat;
    @include background-animate(#C27272,white);
}
.offer-valid{
  font-weight: 500;
  font-size: 1.3125rem;
  line-height: 1.3125rem;
  color: #0E0E0E;
}
.offer-tc {
  ul{
   font-weight: 500;
    font-size: 0.92rem;
    line-height: 1.3rem;
    color: #0E0E0E;
    padding-top: 2.625rem;
    list-style: inside;
    }
  }
}
.change-plan-alert-popup{
  // background: red;
  .popup-container{
    // height: 60vh;
    // width: 50vw;
    padding: 0;
    background: #FFAB40;
    .close-popup {
      right: -2.5rem;
      svg{
        border-radius: 50%;
        path {
          fill: white;
        }
      }
    }
    .cpa-container {
      color: #807f7f;
      display: grid;
      grid-template-rows: 1fr max-content;
      background: #FBF3F1;
      margin-top: 0.3rem;
      .content {
        width: 100%;
        position: relative;
        padding: 3rem 7rem 10rem 7rem;
        .text-bg , .bg-pattern{
          position: absolute;
        }
        .text-bg {
          margin-top: 3rem;
          bottom: -1rem;
          left: 0;
          width: 19rem;
        }
        .bg-pattern {
          right: 0;
          bottom: -8rem;
        }
        .heading-1 {
          font-family: Montserrat;
          font-weight: bold;
          font-size: 1.68rem;
          line-height: 1.82rem;
          color: #292929;
          text-align: center;
        }
        .list {
          display: grid;
          row-gap: 1.5rem;
          padding: 2rem;
          background: #FBF3F1;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          span {
            display: grid;
            grid-template-columns: max-content 1fr;
            column-gap: 1rem;
            align-items: center;
            p {
              margin: 0;
              font-family: Montserrat;
              font-weight: 500;
              font-size: 1rem;
              line-height: 1.5rem;
              color: #222021;
              b {
                text-transform: capitalize;
                b {
                  text-transform: lowercase;
                }
                // &:nth-child(2) {
                //   font-weight: normal;
                // }
              }
            }
          }
        }
      }
      .proceed-btn {
        padding: 4rem;
        background: #FFFFFF;
        // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        display: grid;
        justify-content: center;
        button {
          background: #292929;
          padding: 0.8rem 6rem;
          font-family: Montserrat;
          font-weight: bold;
           font-size: 1.1rem;
          line-height: 1.3rem;
          color: #FBF3F1;
          cursor: pointer;
          position: relative;
          z-index: 0;
          @include background-animate(#FAF0EC, black);
        }
      }
    }
    .isCurrencyMismatch-container {
      color: #807f7f;
      display: grid;
      // grid-template-rows: 1fr max-content;
      grid-template-rows: 29rem 9rem;
      background: #FBF3F1;
      margin-top: 0.3rem;
      height: 38rem;
      width : 75rem;

   
      .content {
        width: 100%;
         position: relative;
         text-align: center;
        // padding: 5rem 5rem 5rem 5rem;
        justify-self : center;

          img{
            width:  22rem;
            height: 13rem;
            margin-top:4rem;
          }
    
        .heading-1 {
          font-family: Montserrat;
          font-weight: bold;
          font-size: 1.83rem;
          line-height: 1.82rem;
          color: #292929;
          text-align: center;
          margin-top: 3rem;
        }
        div{
             margin-bottom: 3rem;
            p {
                margin: 0;
                font-family: Montserrat;
                font-weight: 500;
                font-size: 1.15rem;
                line-height: 1.5rem;
                color: #222021;
              }
        }
      
      }
      .proceed-btn-container {
        padding: 4rem;
        background: #222021;
        width:100%;
      
        // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        display: grid;
        justify-content: center;
        align-content: center;
       
        .proceed-btn {
         background: #FBF3F1;
          padding: 0.8rem 6rem;
          font-family: Montserrat;
          font-weight: bold;
           font-size: 1.1rem;
          // line-height: 1.3rem;
          color: #222021;
          cursor: pointer;
          // position: relative;
          z-index: 0;
        //  @include background-animate(#FAF0EC, black);
         color: #222021;
         text-decoration: none;
         text-underline-offset: none;
        
        }
      }
    }
  }
}
.payment-updating-popup {
  opacity: 1;
  z-index: 1000;
  .popup-container {
    background: transparent;
    .payment-wait-container {
      display: grid;
      place-items: center;
      row-gap: 1rem;
      img {
        width: 5rem;
      }
      p {
        color: white;
      }
    }
  }
}
.payment-iframe-popup {
  .popup-container{
    // height: 90vh;
    width: max-content;
    background: none;
    padding: 0;
    // background: transparent;
    .close-popup {
      svg {
        background: #F4F5F9;
        path {
          fill: black;
        }
      }
    }
    .popup-details {
      max-height: unset !important;
      iframe{
        // background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0NDBweCIgaGVpZ2h0PSIxMDI0cHgiIHZpZXdCb3g9IjAgMCAxNDQwIDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ2LjIgKDQ0NDk2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJjaGVja291dC1yZWZpbmUyIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjUiPgogICAgICAgIDxnIGlkPSJEZXNrdG9wLUhELUNvcHktMyI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5NS4wMDAwMDAsIC0zMDcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00IiBmaWxsPSIjRjVGNkY5IiBwb2ludHM9IjUxMy42MDkzMjUgOTgxLjkwMzYxNCA1NDYuMTUzNjk2IDEyODUuODc1NSA4NDYuODk3MTAyIDgxOC41NTcxNTUiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS01IiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjUxMy42MDkzMjUgOTgxLjkwMzYxNCA1NDYuMTUzNjk2IDEyODUuODc1NSA0Ni4zNTU4NzM5IDEwMTguMjY4NjIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yOCIgZmlsbD0iI0U3RTdFOSIgcG9pbnRzPSIxNjYuMzY4MTIxIDE2MzMuNTE4NzYgNTQ2LjE1MzY5NiAxMjg1Ljg3NTUgNDYuMzU1ODczOSAxMDE4LjI2ODYyIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMjkiIGZpbGw9IiNFREVERUYiIHBvaW50cz0iMTY2LjM2ODEyMSAxNjMzLjUxODc2IDU0Ni4xNTM2OTYgMTI4NS44NzU1IDkxNSAxNDU0Ljg5ODk4Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktNCIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSI1MTMuNjA5MzI1IDk4MS45MDM2MTQgNTEzLjYwOTMyNSA3NDYuMjQwODM3IDg0Ni44OTcxMDIgODE4LjU1NzE1NSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTgiIGZpbGw9IiNGMUYyRjUiIHBvaW50cz0iNjExLjk4ODcxOSA0NzIuOTcxOTUzIDUxMy42MDkzMjUgNzQ2LjI0MDgzNyA4NDYuODk3MTAyIDgxOC41NTcxNTUiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS02IiBmaWxsPSIjRjVGNkY5IiBwb2ludHM9IjUxMy42MDkzMjUgOTgxLjkwMzYxNCA1MTMuNjA5MzI1IDc0Ni4yNDA4MzcgOTAuOTEzNzU3NCAxMDMwLjMyMjY5Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktOSIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSIxMTIuMjU3Njg2IDY2MS41OTcxMDggNTEzLjYwOTMyNSA3NDYuMjQwODM3IDkwLjkxMzc1NzQgMTAzMC4zMjI2OSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTEwIiBmaWxsPSIjRjFGMkY1IiBwb2ludHM9IjExMi4yNTc2ODYgNjYxLjU5NzEwOCA1MTMuNjA5MzI1IDc0Ni4yNDA4MzcgMzMxLjIwNzIwOSAzNTEuMjg0OTcyIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMTMiIGZpbGw9IiNGNUY2RjkiIHBvaW50cz0iNjEyLjQ0NTU2MyA0NzMuNjkzMTE4IDUxMy42MDkzMjUgNzQ2LjI0MDgzNyAzMzEuMjA3MjA5IDM1MS4yODQ5NzIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0xNCIgZmlsbD0iI0YxRjJGNSIgcG9pbnRzPSI2MTIuNDQ1NTYzIDQ3My42OTMxMTggNDgzLjEzNTQ2OCAxMjguNTE0ODQ2IDMzMS4yMDcyMDkgMzUxLjI4NDk3MiI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTE1IiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjYxMi40NDU1NjMgNDczLjY5MzExOCA0ODMuMTM1NDY4IDEyOC41MTQ4NDYgODAwLjc3NTg0NyAxOTguODI0NjQyIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMTYiIGZpbGw9IiNGMUYyRjUiIHBvaW50cz0iNjEyLjQ0NTU2MyA0NzMuNjkzMTE4IDk5OS44NjMwMTYgNTA4LjI2NjA1NSA4MDAuNzc1ODQ3IDE5OC44MjQ2NDIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0xMSIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSIxMTIuMjU3Njg2IDY2MS41OTcxMDggMC41ODU5MzYwNiAzNTEuMjg0OTcyIDMzMS4yMDcyMDkgMzUxLjI4NDk3MiI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTEyIiBmaWxsPSIjRTdFN0U5IiBwb2ludHM9IjQ5Ni4xNDIwNTEgMTYxLjQ0MjMxNyAwLjU4NTkzNjA2IDM1MS4yODQ5NzIgMzMxLjIwNzIwOSAzNTEuMjg0OTcyIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHkiIGZpbGw9IiNFREVERUYiIHBvaW50cz0iMTA4MC4yMzE4IDk4Mi4zNzQwOTYgNTQ2LjE1MzY5NiAxMjg1Ljg3NTUgODQ2Ljg5NzEwMiA4MTguNTU3MTU1Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMTkiIGZpbGw9IiNGNUY2RjkiIHBvaW50cz0iMTA4MC4yMzE4IDk4Mi4zNzQwOTYgNTQ2LjE1MzY5NiAxMjg1Ljg3NTUgODYxLjI1OTUyMiAxNDM0LjgxMjIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yIiBmaWxsPSIjRTdFN0U5IiBwb2ludHM9IjEwODAuMjMxOCA5ODIuMzc0MDk2IDk5OS42NzM5NDIgNTA4LjE0NDUzMyA4NDYuODk3MTAyIDgxOC41NTcxNTUiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS03IiBmaWxsPSIjRjVGNkY5IiBwb2ludHM9IjYxMi4yOTI3MTEgNDczLjM2MDY2NCA5OTkuNjczOTQyIDUwOC4xNDQ1MzMgODQ2Ljg5NzEwMiA4MTguNTU3MTU1Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMyIgZmlsbD0iI0Y1RjZGOSIgcG9pbnRzPSIxMDgwLjIzMTggOTgyLjM3NDA5NiA5OTkuNjczOTQyIDUwOC4xNDQ1MzMgMTQxNC42NzE0NSA4MTkiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yMCIgZmlsbD0iI0YxRjJGNSIgcG9pbnRzPSIxMDgwLjIzMTggOTgyLjM3NDA5NiAxMzg5LjcxMTk3IDExOTEuNTY1MTkgMTQxNC42NzE0NSA4MTkiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yNiIgZmlsbD0iI0Y1RjZGOSIgcG9pbnRzPSIxODE4LjE1NTA1IDEyMzIuMDY0NzkgMTM4OS43MTE5NyAxMTkxLjU2NTE5IDE0MTQuNjcxNDUgODE5Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMzAiIGZpbGw9IiNFREVERUYiIHBvaW50cz0iMTgxOC4xNTUwNSAxMjMyLjA2NDc5IDEzODkuNzExOTcgMTE5MS41NjUxOSAxNTY3Ljc0Mzc1IDE0MTEuNDM3NDEiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0zMSIgZmlsbD0iI0Y1RjZGOSIgcG9pbnRzPSIxMjEyLjM4NzI4IDE0OTYuNzg2MTQgMTM4OS43MTE5NyAxMTkxLjU2NTE5IDE1NjcuNzQzNzUgMTQxMS40Mzc0MSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTI3IiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjE4MTguMTU1MDUgMTIzMi4wNjQ3OSAxNzgxLjM4MTkgNzgyLjg1ODcyNCAxNDE0LjY3MTQ1IDgxOSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTIxIiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjEwODAuMjMxOCA5ODIuMzc0MDk2IDEzODkuNzExOTcgMTE5MS41NjUxOSAxMjUyLjUwNjE3IDE0MjYuNzYyMTcgODMxLjIxMzYyOSAxNDkyLjQ4NTIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0xNyIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSIxMzE5LjQ5NDU1IDQyNi4wNDIwODkgOTk5LjY3Mzk0MiA1MDguMTQ0NTMzIDE0MTQuNjcxNDUgODE5Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMjIiIGZpbGw9IiNGMUYyRjUiIHBvaW50cz0iMTMxOS40OTQ1NSA0MjYuMDQyMDg5IDE4MzAuMDY3NTkgNzc4LjQyMDk0OCAxNDE0LjY3MTQ1IDgxOSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTIzIiBmaWxsPSIjRURFREVGIiBwb2ludHM9IjEzMTkuNDk0NTUgNDI2LjA0MjA4OSAxODMwLjA2NzU5IDc3OC40MjA5NDggMTc2My4zMjQxMyAxNzkuNjU3MzM3Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC00LUNvcHktMjQiIGZpbGw9IiNGMUYyRjUiIHBvaW50cz0iMTMxOS40OTQ1NSA0MjYuMDQyMDg5IDE1NDAuMDM5NjkgNjYuODY2MTkxNiAxNzYzLjMyNDEzIDE3OS42NTczMzciPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQtQ29weS0yNSIgZmlsbD0iI0VERURFRiIgcG9pbnRzPSIxMzE5LjQ5NDU1IDQyNi4wNDIwODkgMTU0MC4wMzk2OSA2Ni44NjYxOTE2IDg2Ny4xOTM5MjMgMTMwLjEwMjQwMSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNC1Db3B5LTE4IiBmaWxsPSIjRTdFN0U5IiBwb2ludHM9IjEzMTkuNDk0NTUgNDI2LjA0MjA4OSA5OTkuNjczOTQyIDUwOC4xNDQ1MzMgNjY4LjY2ODIwOSAwLjcwOTU4OTkzOCI+PC9wb2x5Z29uPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=) no-repeat 100% fixed;
        // background-size: cover;
        background: #F4F5F9;
        // width: 100%;

        // body {
        //   position: relative;
        //   top: 0;
        //   display: none;
        // }
        // .cb-hp__wrapper {
        //   display: block !important;
        // }
      }
    }
  }
}
#nav-container-top {
	height: 1px;
	background-color: blue;
}

#nav-container {
	background-color: blue;
	position: sticky;
	top: 0;
}

.nav-container-sticky {
	background-color: green !important;
}
#container {
    //   position: absolute;
    // top: -27px;
    // width: 100%;
    // left: 0;
    margin: 0 -2rem;
    margin-top: -5rem;
}
.standard-title-new {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: #292929;
  color: white;
  font-size: 0.96rem;
  padding: 0.45rem 0;
  margin: 0;
  font-weight: 600;
  text-align: center;
  // padding: 0.5rem;
  b {
    color: #FFAB40;
  }
}
</style>



<template>
  <section class="dashboard" v-if="usersProjectsWithPagination" @scroll="onProductsScroll($event)">
    <demoTourTypeForm />
    <div v-if="bannerToShow === bannerConstants.video" class="video-tutorial"
      :class="{ 'hide-demo': $i18n.locale == 'en' && isUserIndian }">
      <div class="explore-container">
        <p class="explore-head-text">{{ $t("dashboard.videoTutorials") }}</p>
        <div class="arrow-left" @click="scroll('right')">
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L0.999999 10.7297L11 21" stroke="#D48E8E" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
        <div class="arrow-right" @click="scroll('left')">
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.933594 21L10.9336 11.2703L0.933594 1" stroke="#D48E8E" stroke-miterlimit="10"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="cards-container" id="cards-container">
          <div class="shadow-container" v-for="video in videosData">
            <div class="card" @click="handleVideoTutorialClick(video)">
              <img :src="video.videoImage" alt class="main-image" />
              <div class="card-text">
                <img src="~assets/images/play.svg" alt />
                <p>{{ shortenString(video.videoName) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$i18n.locale == 'en' && isUserIndian" class="free-demo-section">
        <img src="~assets/images/get-free-demo.png" alt />
        <p class="get-free-demo-desk-btn" @click="setGetFreeDemoShow_Desk(true)">
          {{ $t("buttonText.getA") }}
          <span>{{ $t("buttonText.freeDemo") }}</span> {{ $t("buttonText.now") }}
        </p>
      </div>
      <div v-else-if="!isUserIndian" class="upgrade-cta">
        <div class="offer-wrapper">
          <svg class="bg-element" xmlns="http://www.w3.org/2000/svg" width="160" height="117" viewBox="0 0 160 117" fill="none">
            <path d="M81.2983 55.3662L81.3078 55.3693L81.3046 55.3599L81.2983 55.363V55.3662Z" fill="#FBF2F0"/>
            <path d="M81.3394 55.4408L81.3425 55.4501V55.447L81.3394 55.4408Z" fill="#FBF2F0"/>
            <path d="M81.355 55.4004L81.3613 55.4097L81.3676 55.3972L81.355 55.4004Z" fill="#FBF2F0"/>
            <path d="M96.1136 25.2083L96.1796 25.2425L120.182 -14.2133L107.17 -14.1542C107.17 -14.1542 99.2558 -14.2133 96.9471 -14.1542L87.0044 22.335L87.1428 22.3567L81.437 55.0085L96.1136 25.2083Z" fill="#FBF2F0"/>
            <path d="M185.607 -15H159.374L104.109 30.5943L104.172 30.6472L81.4209 55.2884L186.333 -14.1542C186.133 -14.4691 185.889 -14.754 185.607 -15Z" fill="#FBF2F0"/>
            <path d="M193.269 28.9928L81.9212 56.1249L81.4274 55.531L81.7073 56.1778L81.5784 56.2089L81.4683 56.1716L81.5312 56.1342L81.4337 56.1622L81.4934 55.9943L81.3928 56.1032V56.1498L81.3362 55.6243L81.2795 56.1L81.2449 56.0596L81.2638 56.1063L81.16 56.0721L80.9681 55.8948L81.1632 55.5838L80.9147 55.8544L80.7542 55.7051L81.1537 55.4626L80.641 55.5994L7.19223 -12.8232H-23.6581L53.4048 37.417L80.4806 55.6367L79.4426 55.9103L-33 36.6582V54.3835L37.3411 56.7531L36.9165 57.686L77.7346 56.3706L48.6741 64.0795C48.6741 64.0422 48.6552 64.0018 48.6426 63.9645L-33 96.2089V117.482L57.9719 69.4095L79.7509 56.3053L80.5152 56.2804L11.7311 130.77H35.0638L80.7354 56.2649L81.2512 56.2462L72.1295 130.77H89.3035L81.3991 56.2866L81.4746 56.3519L81.3959 56.2555L81.8583 56.5665L94.5658 86.1583L94.4998 86.1863L123.167 130.764H146.091L102.741 81.2388L102.716 81.2606L82.7893 57.1947L109.268 75.0101C109.253 75.029 109.239 75.0488 109.227 75.0692L188.888 131.631H193.269V112.535L113.504 66.4211L113.486 66.474L82.2295 56.523L81.9527 56.1902L193.269 47.2561V28.9928ZM80.663 56.1187L80.1849 56.0378L80.6567 55.7549L80.8675 55.8979L80.663 56.1187ZM81.2638 56.2089H81.2292L80.814 56.1374L80.9367 55.9352L81.1128 56.0534L80.9933 56.0161L81.2607 56.1933L81.2638 56.2089ZM81.4022 56.2524V56.212H81.5595L81.4211 56.2493H81.7356L81.5972 56.2027H81.7168L81.7891 56.3737L81.4022 56.2524Z" fill="#FBF2F0"/>
            <path d="M68.1098 24.5522L81.2734 55.2262L77.4046 22.0986L72.7965 -14.2133C72.7965 -14.2133 48.3629 -14.1542 49.8035 -14.1542L68.1098 24.5522Z" fill="#FBF2F0"/>
            <path d="M81.2511 55.475L81.207 55.7238L81.314 55.5061L81.3045 55.4159L81.2511 55.475Z" fill="#FBF2F0"/>
            <path d="M81.3457 55.4035L81.352 55.4066V55.4004L81.3457 55.4035Z" fill="#FBF2F0"/>
            <path d="M144.223 29.055C145.056 28.2185 190.511 -0.0361633 190.511 -0.0361633L191.269 5.96244L144.223 29.055Z" fill="#EDCBC2"/>
            <path d="M53.518 12.6327L36.149 -12.2386H30.0972L53.518 12.6327Z" fill="#EDCBC2"/>
            <path d="M-29.103 4.0531V11.165L2.05239 24.9658L-29.103 4.0531Z" fill="#EDCBC2"/>
            <path d="M-22.0415 126.273C-21.0979 125.813 2.46764 112.613 2.46764 112.613L-14.3101 128.808L-22.0415 126.273Z" fill="#EDCBC2"/>
          </svg>
          <div class="offer-prompt">
            {{$t( 'dashboard.ftBannerOffer.prompt' )}}
          </div>
          <div class="offer">
            <svg xmlns="http://www.w3.org/2000/svg" width="85" height="83" viewBox="0 0 85 83" fill="none">
              <path d="M31.9141 0L43.5218 7.3165L55.8375 1.24916L61.5997 13.6035L75.2831 15.0791L73.367 28.5591L84.0722 37.111L75.0957 47.4268L79.4208 60.344L66.2233 64.2219L62.8007 77.3998L49.5825 73.6111L39.4952 82.87L30.4424 72.6159L16.8978 75.0113L14.8914 61.5451L2.17997 56.322L7.85882 43.9265L0.027832 32.7321L11.5799 25.3401L11.1079 11.7366L24.8746 11.6954L31.9141 0Z" fill="#E9BEB3"/>
            </svg>
            <div class="offer-text">
              {{$t( 'dashboard.ftBannerOffer.value' )}}
            </div>
          </div>
        </div>
        <div class="action" @click="handleFTOfferCTAClick">
          {{$t( 'dashboard.ftBannerOffer.cta' )}}
        </div>
      </div>
    </div>

    <div v-if="bannerToShow === bannerConstants.moodboardVideos" class="video-tutorial moodboard-video-tutorials">
      <div class="explore-container">
        <p class="explore-head-text">{{ $t("dashboard.videoTutorials") }}</p>
        <div v-show="showArrows" class="arrow-left" @click="scroll('right')">
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L0.999999 10.7297L11 21" stroke="#D48E8E" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
        <div v-show="showArrows" class="arrow-right" @click="scroll('left')">
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.933594 21L10.9336 11.2703L0.933594 1" stroke="#D48E8E" stroke-miterlimit="10"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="cards-container" id="cards-container">
          <div class="shadow-container" v-for="(video, index) in moodboardVideos" :key="'MB_VIDEO_TUTORIALS' + index">
            <div class="card" @click="handleVideoTutorialClick(video)">
              <img :src="video.videoImage" alt class="main-image" />
              <div class="card-text">
                <img src="~assets/images/play.svg" alt />
                <p>{{ video.videoName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="bannerToShow === bannerConstants.templates" class="moodboard-templates-wrapper">
      <div class="explore-container">
        <p class="explore-head-text">{{ $t("dashboard.templates") }}</p>
        <div v-if="hasContainerScrolled" class="arrow-left" @click="scroll('right')">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0.565986 16.3763C0.111067 15.9324 0.111067 15.2127 0.565986 14.7688L6.73164 8.75267L0.565986 2.73654C0.111067 2.29265 0.111067 1.57297 0.565986 1.12908C1.0209 0.685198 1.75848 0.685198 2.21339 1.12908L9.20276 7.94894C9.65768 8.39283 9.65768 9.11251 9.20276 9.5564L2.21339 16.3763C1.75848 16.8201 1.0209 16.8201 0.565986 16.3763Z"
              fill="black" />
          </svg>
        </div>
        <div class="arrow-right" @click="scroll('left')">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0.565986 16.3763C0.111067 15.9324 0.111067 15.2127 0.565986 14.7688L6.73164 8.75267L0.565986 2.73654C0.111067 2.29265 0.111067 1.57297 0.565986 1.12908C1.0209 0.685198 1.75848 0.685198 2.21339 1.12908L9.20276 7.94894C9.65768 8.39283 9.65768 9.11251 9.20276 9.5564L2.21339 16.3763C1.75848 16.8201 1.0209 16.8201 0.565986 16.3763Z"
              fill="black" />
          </svg>
        </div>
        <div class="cards-container" id="cards-container">
          <div class="shadow-container" v-for="(video, index) in videosData" :key="video.videoName + index">
            <div class="card">
              <div class="image-wrapper">
                <img :src="video.videoImage" alt class="main-image" />
                <div class="template-image-overlay">
                  <div class="use-template-button">
                    {{ $t("dashboard.useTemplate") }}
                  </div>
                </div>
              </div>
              <div class="card-text">
                <p>{{ video.videoName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- request floor plan banner -->
    <banner v-if="bannerToShow === bannerConstants.designForYou" class="request-floor-plan"
      :imageUrl="require('../../assets/images/dashboard/render-design-banner-v2.png')">
      <template slot='heading'>
        <div class="heading">
          <span>{{ $t("dashboard.getDesignDoneBannerText[0]") }}</span><span class='highlight'>
            {{$t("dashboard.getDesignDoneBannerText[1]") }}
            </span>
        </div>
      </template>
      <template slot='subheading'>
        <div class="subheading">
          {{ $t("dashboard.getDesignDoneBannerText[2]") }}
        </div>
      </template>
      <template slot='bannerAction'>
        <div class="banner-action banner-action-wrapper">
          <button @click="handleDFURequestNowButtonClick">{{ $t("dashboard.getDesignDoneBannerText[3]")
          }}</button>
        </div>
      </template>
    </banner>
    <!-- Foyr Moodboard -->
    <banner v-if="bannerToShow === bannerConstants.moodboard" class="moodboard-banner"
      :imageUrl="require('../../assets/images/dashboard/foyr-moodboard-banner.png')">
      <template slot='heading'>
        <div class="heading">
          {{ $t("dashboard.foyrMoodboard") }}
        </div>
      </template>
      <template slot='subheading'>
        <div class="subheading">
          {{ $t("dashboard.foyrMoodboardSubHeading") }}
        </div>
      </template>
      <template slot='bannerAction'>
        <div class="banner-action banner-action-wrapper">
          <button
            v-if="!(isUserOnMoodBoardFreeTrial || isUserOnMoodBoardPaidPlan) && !doesUserHaveActiveMoodboardSubscription"
            @click="handleTryMoodboardButtonClick">{{ $t("buttonText.tryMoodboardFree") }}</button>
          <button v-else @click="setSwitchToMoodboardAndRedirectToDashboard(true)">{{ $t("buttonText.switchToMoodboard")
          }}</button>
        </div>
      </template>
    </banner>

    <div class="assistance" :class="{ 'no-community-content': !showCommunityBanner }"
      v-if="user && user.accountInfo.accountCategory !== 'ADMIN' && users">
      <div class="flex" style="justify-content: space-between; position:relative">
        <div class v-if="user && user.accountInfo.accountCategory == 'ADMIN' && users">
          <input autocomplete="off" type="text" v-model="searchUser" @change="searchUser.length > 2 ? search() : ''" />
          <ul class="searchedUser" v-if="searchUser && !searched">
            <li @click="fetchProjects()">{{ $t("buttonText.all") }}</li>
            <li></li>
            <li v-for="(item, index) in filterByText(searchUser)" @click="userSelectedProjects(item)" :key="index">
              {{ item.fullName }} | {{ item.email }}</li>
          </ul>
        </div>
      </div>
      <div class="bc-grid" :class="{ 'search-grid': searchKey }">
        <div class="breadCrumbs">
          <h2 @click="handleMyFolderClick" v-if="selectedFolderId !== null">
            {{ $t("buttonText.myFolders") }}
          </h2>
          <p @click="prepareBreadCrumbs(bread, _index)" :key="_index + bread.name" v-for="(bread, _index) in breadcrumbs">
            <span>&nbsp;/</span>
            {{ bread.name }}
          </p>
        </div>
        <div class="dashboard-search">
          <input type="text" v-model="searchKey" name="search" id="searchName" autocomplete="off"
            :placeholder="$t('placeholders.search')" @input="handleSearchInput">
          <span class="search-icon">
            <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5.14286" cy="5.16629" r="4.64286" stroke="#292929" />
              <path d="M8.57153 8.59488L12.0001 12.0235" stroke="#292929" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        <div class="create-folder-btn"
          @click="showCreateFolder = true; newFolderName = ''; message.value = ''; message.global = false;">
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.29783 1.5616V14.3908" stroke="#D48E8E" stroke-width="1.2" stroke-miterlimit="10"
              stroke-linecap="round" />
            <path d="M13.8828 7.97632H1.05357" stroke="#D48E8E" stroke-width="1.2" stroke-miterlimit="10"
              stroke-linecap="round" />
          </svg>
          <p>{{ $t("buttonText.addFolder") }}</p>
        </div>
      </div>
      <div class="filter-tabs" v-if="searchKey">
        <p :class="{ 'active': filterTabSelected === 'project' }" @click="filterTabSelected = 'project'">{{
          $t("buttonText.projects") }} <span v-if="!filterLoading">{{ searchFilterResults.projectCount }}</span></p>
        <p :class="{ 'active': filterTabSelected === 'folder' }" @click="filterTabSelected = 'folder'">{{
          $t("buttonText.folders") }}<span v-if="!filterLoading">{{ searchFilterResults.folderCount }}</span></p>
      </div>
      <div v-if="!searchKey">
        <foldersView :folders-array="rootFolders" :move="false"></foldersView>
        <projects :folders-array="rootFolders" :breadcrumbs="breadcrumbs"></projects>
      </div>
      <div v-if="searchKey && !filterLoading">
        <foldersView v-if="filterTabSelected === 'folder'" :folders-array="searchResultsForFolders" :move="false"
          :searchKey="searchKey">
        </foldersView>
        <projects v-if="filterTabSelected === 'project'" :folders-array="searchResultsForFolders"
          :breadcrumbs="breadcrumbs" :searchKey="searchKey"></projects>
        <div class="no-data" v-if="!filterLoading">
          <p
            v-if="filterTabSelected === 'project' && searchResultsForProjects && searchResultsForProjects.length <= 0">
            {{ $t("dashboard.noProjectsData") }}</p>
          <p
            v-if="filterTabSelected === 'folder' && searchResultsForFolders && searchResultsForFolders.length <= 0">
            {{ $t("dashboard.noFoldersData") }}</p>
        </div>
      </div>
      <div v-if="filterLoading" class="search-loading">
        <img src="~assets/images/loader2.svg" alt="" srcset="">
      </div>
    </div>
    <!-- --------------------------OLD PROJECT VIEW FOR ADMIN----------------- -->
    <div class="assistance" v-if="user && user.accountInfo.accountCategory == 'ADMIN' && users">
      <div class="flex" style="justify-content: space-between; position:relative">
        <div>
          <input autocomplete="off" type="text" v-model="searchUser" @change="searchUser.length > 2 ? search() : ''" />
          <ul class="searchedUser" v-if="searchUser && !searched">
            <li @click="fetchProjects()">{{ $t("buttonText.all") }}</li>
            <li></li>
            <li v-for="item in filterByText(searchUser)" @click="userSelectedProjects(item)">{{ item.fullName }} |
              {{ item.email }}</li>
          </ul>
        </div>
      </div>
      <h2> {{ $t("dashboard.myProjects") }}</h2>
      <p class="sub-text">{{ $t("dashboard.myProjectsSubText") }}</p>
      <div class="cards">
        <div v-if="userSys.device.type == 'Desktop'" class="card add-card" @click="newProject = !newProject">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.3127 17.7706H17.7708V27.3125C17.7708 27.7472 17.1806 28.6897 16.0001 28.6897C14.8197 28.6897 14.2294 27.7471 14.2294 27.3125V17.7705H4.6875C4.25287 17.7706 3.3103 17.1803 3.3103 15.9999C3.3103 14.8195 4.25287 14.2292 4.6875 14.2292H14.2295V4.68725C14.2295 4.25268 14.8197 3.31006 16.0002 3.31006C17.1807 3.31006 17.7709 4.25268 17.7709 4.68725V14.2292H27.3129C27.7474 14.2292 28.6901 14.8194 28.6901 15.9999C28.6901 17.1804 27.7473 17.7706 27.3127 17.7706Z"
              fill="#D48E8E" />
            <circle cx="16" cy="16" r="15.5" stroke="#D48E8E" />
          </svg>
          <p>{{ $t("buttonText.createProject") }} </p>
        </div>
        <div class="card" v-for="beg in usersProjectsWithPagination" :key="beg._id"
          :class="{ 'sampleProject': beg.isSampleProject }">
          <img v-if="beg.properties" class="main-image" :src="beg.properties.thumbnail" alt
            v-on:click="openProject(beg._id)" />
          <div class="card-text">
            <div class="card-text-head">
              <p v-on:click="openProject(beg._id)">{{ beg.name }}</p>
              <div>
                <img src="~assets/images/clone.svg" alt @click="showProject = !showProject; copyProjectId = beg._id;" />
              </div>
            </div>
            <span>{{ beg.createdIn }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- design challenge banner -->
    <banner v-if="false" class="design-challenge-banner"
      :imageUrl="require('../../assets/images/dashboard/third-banner-image.png')">
      <template slot='heading'>
        <div class="heading full-width">
          {{ $t("dashboard.challengeBannerHeading") }}
        </div>
      </template>
      <template slot='subheading'>
        <div class="subheading full-width default-list">
          <ul>
            <li>{{ $t("dashboard.challengeBannerListPoints[0]") }}</li>
            <li>{{ $t("dashboard.challengeBannerListPoints[1]") }} <a
                @click="handleBannerCTAClick(designChallengeURL, 'design_challenge_link_cta')">{{
                  $t("dashboard.challengeBannerListPoints[2]") }}</a>
            </li>
            <li>{{ $t("dashboard.challengeBannerListPoints[3]") }}<b>$500!</b> </li>
          </ul>
        </div>
      </template>
      <template slot='bannerAction'>
        <div class="banner-action banner-action-wrapper"
          @click="handleBannerCTAClick(designChallengeURL, 'design_challenge_viewdesigns_cta')">
          <div class="text-wrapper">
            {{ $t("dashboard.challengeBannerCta") }}
          </div>
          <div class="image-container">
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9.30969" r="9" fill="#232121" />
              <path d="M9.16669 5.30969L9.16669 13.3097" stroke="#FBF3F1" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M12.6667 9.80969L9.16669 13.3097L5.66668 9.80969" stroke="#FBF3F1" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </template>
    </banner>

    <CommunityFeed v-if="false"></CommunityFeed>

    <!-- -------------------------Folder Structure--------------------------------- -->
    <div class="popup-div" :class="newProject ? 'showPopUp' : ''" @click="closePopup">
      <div class="popup-container" @click.stop>
        <div class="close-popup" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
              fill="white" />
          </svg>
        </div>
        <div class="popup-head">
          <h2 class="creat-project-title">{{ $t("suggestionText.nameTheProject") }}</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <div>
              <input class="creat-project-input" type="text" placeholder="Project Name" v-model="projectName"
                @keyup.enter="addProject()" />
              <span :class="message.error ? 'error-message' : 'success-message'" v-if="message.value">{{ message.value
              }}</span>
            </div>
          </div>
          <div class="invite-button-container">
            <button @click="cancelContainer('invite')" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button @click="addProject()" :disabled="!projectName" class="update-address">{{ $t("buttonText.startNow")
            }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="showProject ? 'showPopUp' : ''" @click="closePopup">
      <div class="popup-container" @click.stop>
        <div class="close-popup" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
              fill="white" />
          </svg>
        </div>
        <div class="popup-head">
          <h2>{{ $t("suggestionText.cloneProject") }}</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <input autocomplete="off" type="text" :placeholder="$t('placeholders.enterProjectName')"
              v-model="cloneProjectName" />
            <span :class="message.error ? 'error-message' : 'success-message'" v-if="message.value">{{ message.value
            }}</span>
          </div>
          <div class="invite-button-container">
            <button @click="cancelContainer('clone')" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button @click="copyProject()" :disabled="!cloneProjectName" class="update-address white">{{
              $t("buttonText.clone") }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="playVideo" :class="showVideo ? 'showPopUp' : ''" @click="closePopup">
      <div class="popOver" @click.stop>
        <div class="close-popup" @click="closePopup" style="right: -30px;">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
              fill="white" />
          </svg>
        </div>
        <video width="700" :src="videoUrl" controls class="video-player" ref="videoPlayer"></video>
      </div>
    </div>
    <!-- -----------------------Rename Popup------------------ -->
    <div class="popup-div" :class="showRename ? 'showPopUp' : ''" @click="closePopup">
      <div class="popup-container" @click.stop>
        <div class="close-popup" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
              fill="white" />
          </svg>
        </div>
        <div class="popup-head">
          <h2>{{ $t("suggestionText.renameProject") }}</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <input autocomplete="off" type="text" placeholder="Enter project name" v-model="newProjectName" />
            <span :class="message.error ? 'error-message' : 'success-message'" v-if="message.value">{{ message.value
            }}</span>
          </div>
          <div class="invite-button-container">
            <button @click="closePopup()" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button @click="onClickRename(newProjectName)" :disabled="!newProjectName" class="update-address white">{{
              $t("buttonText.save") }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- -----------------------------Delete Confirmation------------------ -->
    <div class="popup-div" :class="showDeleteConfirmation ? 'showPopUp' : ''" @click="closePopup">
      <div class="popup-container" @click.stop>
        <div class="close-popup" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
              fill="white" />
          </svg>
        </div>
        <div class="popup-head">
          <h2>{{ $t("suggestionText.wantToDelete") }}</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <h4 style="color: #807f7f;">{{ $t("suggestionText.deletWarning") }}</h4>
          </div>
          <div class="invite-button-container">
            <button @click="closePopup" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button @click="onClickDelete()" class="update-address white">{{ $t("buttonText.confirm") }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- -----------------------Create Folder Popup------------------ -->
    <div class="popup-div" :class="showCreateFolder ? 'showPopUp' : ''" @click="closePopup">
      <div class="popup-container" @click.stop>
        <div class="close-popup" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
              fill="white" />
          </svg>
        </div>
        <div class="popup-head">
          <h2>{{ $t("suggestionText.folderName") }}</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <input autocomplete="off" type="text" placeholder="Enter folder name" v-model="newFolderName"
              @keyup.enter="onClickCreateFolder(newProjectName)" />
            <span :class="message.error ? 'error-message' : 'success-message'" v-if="message.value">{{ message.value
            }}</span>
          </div>
          <div class="invite-button-container">
            <button @click="closePopup()" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button @click="onClickCreateFolder(newProjectName)" :disabled="!newFolderName"
              class="update-address white">{{ $t("buttonText.addFolder") }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ---------------------------------MOVE FOLDER VIEW -------------------- -->
    <div class="popup-div" :class="showMove ? 'showPopUp' : ''" @click="closePopup">
      <div class="popup-container" @click.stop>
        <div class="close-popup" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
              fill="white" />
          </svg>
        </div>
        <div class="popup-head">
          <h2>{{ $t("suggestionText.folders") }}</h2>
        </div>
        <div class="popup-details">
          <folders :root-tree="rootFolders" :move="true" v-if="showMove"></folders>
        </div>
        <div class="invite-button-container">
          <button @click="closePopup()" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
          <button @click="onClickMove(moveProjectId)" class="update-address white">{{ $t("buttonText.move") }}</button>
        </div>
      </div>
    </div>
    <!-- ---------------------------Welcome New User Popup--------------------------------- -->
    <!-- <SelectCategoryPopup v-show="user && user.onboardingGoalFilled === false" @onSelectOption="onClickWelcome"/> -->
    <WelcomePopup v-show="user && user.onboardingGoalFilled === false && isUserCategoryPicked" @onGetStarted="onClickWelcome"/>
    <div v-if="false" class="popup-div stop-scale" :class="(user && user.onboardingGoalFilled === false) && !isUserCategoryHomeOwner ? 'showPopUp' : ''"
      style="z-index:1" @click="closePopup">
      <div class="popup-container welcome-popup" @click.stop>
        <div class="close-popup" @click="onClickWelcome('cancel')">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
              fill="black" />
          </svg>
        </div>
        <div class="popup-head">
          <p class="wel-pop-title">{{ $t("welcomePopup.header") }}</p>
          <p class="wel-pop-sub-title">{{ $t("welcomePopup.subHeader") }}</p>
          <svg class="popup-background" width="1106" height="646" viewBox="0 0 1106 646" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M707.028 366.976L4.9209 620.361L707.028 873.746L1409.14 620.361L707.028 366.976Z"
              stroke="black" stroke-width="3" stroke-miterlimit="10" />
            <path opacity="0.3" d="M707.028 245.351L4.9209 498.736L707.028 752.121L1409.14 498.736L707.028 245.351Z"
              stroke="black" stroke-width="3" stroke-miterlimit="10" />
            <path opacity="0.3" d="M707.028 123.726L4.9209 377.111L707.028 630.496L1409.14 377.111L707.028 123.726Z"
              stroke="black" stroke-width="3" stroke-miterlimit="10" />
            <path opacity="0.3" d="M707.028 2.10098L4.9209 255.486L707.028 508.871L1409.14 255.486L707.028 2.10098Z"
              stroke="black" stroke-width="3" stroke-miterlimit="10" />
          </svg>
          <div class="wel-cards-container">
            <div class="wel-card-item">
              <svg width="221" height="137" viewBox="0 0 221 137" fill="none" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect x="3.96582" y="3.57077" width="214" height="129.892" stroke="#999999" stroke-width="6" />
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="7" y="4" width="208" height="127">
                  <rect x="7.3584" y="4.83276" width="207.269" height="125.558" fill="#C4C4C4" />
                </mask>
                <g mask="url(#mask0)">
                  <rect x="2.03174" y="6.96354" width="127.278" height="126.336" fill="url(#pattern0)" />
                  <rect x="128.686" y="6.96346" width="127.278" height="126.336" fill="url(#pattern1)" />
                </g>
                <path
                  d="M133.642 35.5568L143.917 45.8194C144.355 46.257 145.065 46.257 145.503 45.8194L150.172 41.1558C150.61 40.7183 150.61 40.009 150.172 39.5714L139.897 29.3088C139.459 28.8713 138.749 28.8712 138.311 29.3088L133.642 33.9724C133.204 34.4099 133.204 35.1193 133.642 35.5568Z"
                  fill="#4D4C4D" />
                <path
                  d="M116.98 62.457L137.423 42.0379L140.871 45.4875C137.886 48.4687 139.603 55.4249 139.603 55.4249L133.931 61.0898C124.755 62.3557 105.415 76.0718 105.415 76.0718L104.781 75.4388L116.929 63.3621C116.993 63.3066 117.045 63.2389 117.082 63.163C117.119 63.0871 117.141 63.0045 117.145 62.9202C117.15 62.8358 117.138 62.7514 117.11 62.6718C117.081 62.5923 117.037 62.5192 116.98 62.457Z"
                  fill="#EBBEB5" />
                <path
                  d="M118.355 45.5128L124.027 39.8162C124.027 39.8162 130.998 41.5505 133.976 38.5503L137.423 41.9936L116.98 62.4127C116.916 62.3567 116.842 62.314 116.762 62.2871C116.681 62.2602 116.597 62.2497 116.512 62.2562C116.428 62.2627 116.345 62.2861 116.27 62.3249C116.195 62.3637 116.128 62.4172 116.074 62.4823L103.957 74.5843L103.323 73.9514C103.323 73.9514 117.069 54.6716 118.355 45.5128Z"
                  fill="#EBBEB5" />
                <path opacity="0.3"
                  d="M118.355 45.5128L124.027 39.8162C124.027 39.8162 130.998 41.5505 133.976 38.5503L137.423 41.9936L116.98 62.4127C116.916 62.3567 116.842 62.314 116.762 62.2871C116.681 62.2602 116.597 62.2497 116.512 62.2562C116.428 62.2627 116.345 62.2861 116.27 62.3249C116.195 62.3637 116.128 62.4172 116.074 62.4823L103.957 74.5843L103.323 73.9514C103.323 73.9514 117.069 54.6716 118.355 45.5128Z"
                  fill="white" />
                <path
                  d="M101.087 33.683L101.454 34.0501C98.4961 36.9355 96.1408 40.3786 94.5248 44.1798C92.9087 47.981 92.064 52.0647 92.0395 56.1944C92.0151 60.324 92.8115 64.4174 94.3824 68.2375C95.9534 72.0575 98.2678 75.5281 101.191 78.4483C104.115 81.3684 107.59 83.68 111.414 85.2491C115.239 86.8182 119.337 87.6136 123.472 87.5892C127.606 87.5648 131.695 86.7211 135.501 85.1069C139.307 83.4928 142.754 81.1403 145.643 78.1859L146.01 78.553C143.073 81.5541 139.568 83.9432 135.7 85.5822C131.832 87.2211 127.676 88.0772 123.474 88.1009C119.272 88.1246 115.107 87.3155 111.22 85.7203C107.334 84.1251 103.803 81.7757 100.831 78.8079C97.86 75.8402 95.5077 72.3132 93.9107 68.4312C92.3136 64.5491 91.5035 60.3892 91.5272 56.1922C91.5509 51.9953 92.4081 47.8448 94.049 43.981C95.6898 40.1172 98.0819 36.617 101.087 33.683Z"
                  fill="#4D4C4D" />
                <path d="M129.295 106.754L129.662 106.387L73.197 49.9894L72.8295 50.3564L129.295 106.754Z"
                  fill="#4D4C4D" />
                <path d="M98.3387 78.3717L101.027 81.0571L103.716 78.3717L101.027 75.6863L98.3387 78.3717Z"
                  fill="#4D4C4D" />
                <path d="M143.474 78.372L145.804 80.6993L148.134 78.372L145.804 76.0447L143.474 78.372Z" fill="white" />
                <path
                  d="M145.8 75.6224L148.55 78.3694L145.8 81.1165L143.05 78.3694L145.8 75.6224ZM147.701 78.3694L145.8 76.4706L143.899 78.3694L145.8 80.2683L147.701 78.3694Z"
                  fill="#4D4C4D" />
                <path
                  d="M101.144 31.0242L103.895 33.7712L101.144 36.5182L98.3939 33.7712L101.144 31.0242ZM103.045 33.7712L101.144 31.8723L99.2431 33.7712L101.144 35.67L103.045 33.7712Z"
                  fill="#4D4C4D" />
                <path
                  d="M72.9114 48.1328C73.3615 48.1326 73.7978 48.2882 74.1459 48.5733C74.4939 48.8583 74.7323 49.255 74.8203 49.6959C74.9084 50.1368 74.8406 50.5946 74.6286 50.9912C74.4166 51.3877 74.0735 51.6986 73.6578 51.8709C73.242 52.0431 72.7793 52.066 72.3485 51.9357C71.9177 51.8054 71.5455 51.5299 71.2953 51.1562C71.045 50.7825 70.9323 50.3337 70.9762 49.8863C71.0202 49.4388 71.2181 49.0205 71.5362 48.7025C71.7164 48.5214 71.9307 48.3779 72.1667 48.2801C72.4027 48.1823 72.6559 48.1322 72.9114 48.1328ZM72.9114 51.4242C73.2236 51.423 73.5258 51.3138 73.7664 51.1151C74.0071 50.9165 74.1714 50.6406 74.2312 50.3345C74.2911 50.0285 74.2429 49.7112 74.0949 49.4366C73.9468 49.1621 73.708 48.9473 73.4192 48.8288C73.1304 48.7104 72.8094 48.6956 72.5109 48.787C72.2123 48.8784 71.9548 49.0704 71.7821 49.3301C71.6093 49.5899 71.5321 49.9015 71.5636 50.2117C71.595 50.522 71.7331 50.8118 71.9545 51.0317C72.2094 51.2831 72.5532 51.4241 72.9114 51.4242Z"
                  fill="#4D4C4D" />
                <path
                  d="M128.335 105.409C128.566 105.178 128.859 105.021 129.179 104.957C129.499 104.893 129.83 104.925 130.132 105.049C130.433 105.174 130.691 105.385 130.872 105.655C131.054 105.926 131.15 106.245 131.15 106.57C131.15 106.896 131.054 107.215 130.872 107.485C130.691 107.756 130.433 107.967 130.132 108.091C129.83 108.216 129.499 108.248 129.179 108.184C128.859 108.12 128.566 107.963 128.335 107.732C128.028 107.423 127.855 107.006 127.855 106.57C127.855 106.135 128.028 105.717 128.335 105.409Z"
                  fill="white" />
                <path
                  d="M129.476 104.631C129.861 104.631 130.237 104.745 130.557 104.958C130.877 105.172 131.126 105.475 131.273 105.83C131.421 106.185 131.459 106.576 131.384 106.953C131.309 107.33 131.124 107.676 130.852 107.948C130.579 108.219 130.233 108.405 129.855 108.48C129.478 108.555 129.087 108.516 128.731 108.369C128.376 108.222 128.072 107.973 127.858 107.653C127.645 107.334 127.53 106.958 127.53 106.574C127.528 106.318 127.577 106.065 127.675 105.829C127.773 105.593 127.918 105.379 128.101 105.2C128.28 105.018 128.494 104.873 128.73 104.775C128.966 104.677 129.22 104.628 129.476 104.631ZM129.476 107.922C129.653 107.922 129.828 107.887 129.991 107.818C130.155 107.75 130.303 107.649 130.426 107.523C130.642 107.265 130.753 106.935 130.738 106.599C130.723 106.263 130.583 105.944 130.344 105.706C130.106 105.468 129.787 105.328 129.451 105.313C129.114 105.298 128.784 105.409 128.525 105.624C128.399 105.749 128.299 105.898 128.23 106.062C128.162 106.226 128.126 106.402 128.126 106.58C128.129 106.938 128.274 107.28 128.527 107.532C128.781 107.784 129.124 107.927 129.482 107.928L129.476 107.922Z"
                  fill="#4D4C4D" />
                <defs>
                  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="translate(0 -0.00498546) scale(0.00124844)" />
                  </pattern>
                  <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="translate(0 -0.00498552) scale(0.00124844)" />
                  </pattern>
                  <image id="image0" width="801" height="803"
                    xlink:href="data:image/png;base64,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toADUlvcek0JOCBNlctmaws4ILXFrdeUgAPSVLlstraAA1Jb3HpNCTggTZXLZmsLdF/76uKX1n1a1lq47/u/1nXdP6i13ijr9P3f3/w9sj8zytq1Fu3TR1KXvlFtuT797a5Lv1hrve06/br/or+bdwBxfzfv9aP6u3mv39QTCZwsYAY5mdADIgs4IJGrK7eTBRyQkwk9ILKAAxK5unI7WcABOZnQAyILOCCRqyu3kwUckJMJPSCygAMSubpyO1nAATmZ0AMiCzggkasrt5MFHJCTCT0gsoADErm6cjtZwAE5mdADIgs4IJGrK7eTBRyQkwk9ILKAAxK5unI7WcABOZnQAyILOCCRqyu3kwUckJMJPSCygAMSubpyO1nAATmZ0AMiCzggkasrt5MFHJCTCT0gsoADErm6cjtZwAE5mdADIgs4IJGrK7eTBRyQkwk9ILKAAxK5unI7WcABOZnQAyILOCCRqyu3kwUckJMJPSCygAMSubpyO1nAATmZ0AMiCzggkasrt5MFHJCTCT0gsoADErm6cjtZwAE5mdADIgs4IJGrK7eTBRyQkwk9ILKAAxK5unI7WcABOZnQAyILOCCRqyu3kwUckJMJPSCygAMSubpyO1nAATmZ0AMiCzggkasrt5MFHJCTCT0gsoADErm6cjtZwAE5mdADIgs4IJGrK7eTBRyQkwk9ILKAAxK5unI7WcABOZnQAyILOCCRqyu3kwUckJMJPSCywO3Upz97eT7vayW57tNHN+t9ptZ6Y6zT92kWPcfn/Xpbxz+s5duvu++rbbpep9Stlosf37SRP526/nGtZGuvszmUf2fWpb9Ve92a622K+aXZLN2vuWbttTYfPP+s69Kfq71uzfU27+pPb97VX625Zs21+r7ffN50v913qdqHa838tmttPsz/YTfrf7L2urXX237mvPbGm126PF/c3/6pvYGa662W80c11xtjrdVZvZ+Ux8hvu+bFcv5srLVrrbv5oe5hrbXGWOfifPHg6dnjO2OsXWvNzVl8UmutMde5+szxu6wxq2BtAgQINC6giTReQNsnQIDAmAKayJj61iZAgEDjAppI4wW0fQIECIwpoImMqW9tAgQINC6giTReQNsnQIDAmAKayJj61iZAgEDjAppI4wW0fQIECIwpoImMqW9tAgQINC6giTReQNsnQIDAmAKayJj61iZA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39Z0eL1OX4r+ebN5V//O5l39W00Xat/m++7T65S+euvn/7v/9hupS1/f9/0tx7s0+xep6/9VyzmU9j67ld7qulv/b0r9t0rf13Ks62/935safrPlHPbufTb7nS71/8/e72v4G7rUPQ7/edN3l5scv9FwmfZufZ3W30y3Xvpyd7lcfG7d91/Ye4dvIECAAAECBAgQIECAwAkCs677uVdev/fLtzfT1u+kPqXZrPvRV+7e+9IJz3TriAKr5fzRpo53X3vjzU+NuA1LnyDw9OzxnbfS+ve7WfdTr96992snPMqtIwqslouHm99G/uyrr7/5vSNuw9InClws58/61P3Ka6/f+/yJj3L7SAIX54sH/br/4gfT7Ac/9san/2CkbVj2RIHNf67zZPOz6vlrr7/52RMf5faRBS7PF/fX6/433509NnvxH/OOXBDLEyBAgAABAgQIEJiagCFkahWXLwECBAgQIECAAIGRBQwhIxfA8gQIECBAgAABAgSmJmAImVrF5UuAAAECBAgQIEBgZAFDyMgFsDwBAgQIECBAgACBqQkYQqZWcfkSIECAAAECBAgQGFnAEDJyASxPgAABAgQIECBAYGoChpCpVVy+BAgQIECAAAECBEYWMISMXADLEyBAgAABAgQIEJiagCFkahWXLwECBAgQIECAAIGRBQwhIxfA8gQIECBAgAABAgSmJmAImVrF5UuAAAECBAgQIEBgZAFDyMgFsDwBAgQIECBAgACBqQkYQqZWcfkSIECAAAECBAgQGFnAEDJyASxPgAABAgQIECBAYGoChpCpVVy+BAgQIECAAAECBEYWMISMXADLEyBAgAABAgQIEJiagCFkahWXLwECBAgQIECAAIGRBQwhIxfA8gQIECBAgAABAgSmJmAImVrF5UuAAAECBAgQIEBgZAFDyMgFsDwBAgQIECBAgACBqQkYQqZWcfkSIECAAAECBAgQGFnAEDJyASxPgAABAgQIECBAYGoChpCpVVy+BAgQIECAAAECBEYWMISMXADLEyBAgAABAgQIEJiagCFkahWXLwECBAgQIECAAIGRBQwhIxfA8gQIECBAgAABAgSmJmAImVrF5UuAAAECBAgQIEBgZAFDyMgFsDwBAgQIECBAgACBqQkYQqZWcfkSIECAAAECBAgQGFnAEDJyASxPgAABAgQIECBAYGoChpCpVVy+BAgQIECAAAECBEYWMISMXADLEyBAgAABAgQIEJiagCFkahWXLwECBAgQIECAAIGRBQwhIxfA8gQIECBAgAABAgSmJmAImVrF5UuAAAECBAgQIEBgZAFDyMgFsDwBAgQIECBAgACBqQkYQqZWcfkSIECAAAECBAgQGFnAEDJyASxPgAABAgQIECBAYGoChpCpVVy+BAgQIECAAAECBEYWMISMXADLEyBAgAABAgQIEJiagCFkahWXLwECBAgQIECAAIGRBQwhIxfA8gQIECBAgAABAgSmJmAImVrF5UuAAAECBAgQIEBgZAFDyMgFsDwBAgQIECBAgACBqQkYQqZWcfkSIECAAAECBAgQGFnAEDJyASxPgAABAgQIECBAYGoChpCpVVy+BAgQIECAAAECBEYWMISMXADLEyBAgAABAgQIEJiagCFkahWXLwECBAgQIECAAIGRBQwhIxfA8gQIECBAgAABAgSmJmAImVrF5UuAAAECBAgQIEBgZAFDyMgFsDwBAgQIECBAgACBqQkYQqZWcfkSIECAAAECBAgQGFnAEDJyASxPgAABAgQIECBAYGoC3eX54v563f9mn7qLLvX/bmoAYfLt0sdTnz60yec8TE4TS6Tr0u2+T38mdd3vp77/NxNLP1K6L29q+Cc3NfxKpKQml0vX/fCmhv9qk/fXJ5d7lIS77gc2NfzBzWfr/7X5bH0nSloTzONu6tJ3Nj/j/N4Ecw+V8mbW+L7NrPHqdub4wK1bfzlth5DV2bzffg2V6cSSWS3njzZ1fDKxtEOl+/Ts8Z3tWbw4XzwIldjEklktFw8vlvNnE0s7XLrbGm5rGS6xCSW0/SzdfqZuP1snlHa4VLc/22x/xgmX2AQTeu/M4T/HmuBLIGUCBAgQIECAAAECYwoYQsbUtzYBAgQIECBAgACBCQoYQiZYdCkTIECAAAECBAgQGFPAEDKmvrUJECBAgAABAgQITFDAEDLBokuZAAECBAgQIECAwJgChpAx9a1NgAABAgQIECBAYIIChpAJFl3KBAgQIECAAAECBMYUMISMqW9tAgQIECBAgAABAhMUMIRMsOhSJkCAAAECBAgQIDCmgCFkTH1rEyBAgAABAgQIEJiggCFkgkWXMgECBAgQIECAAIExBQwhY+pbmwABAgQIECBAgMAEBQwhEyy6lAkQIECAAAECBAiMKWAIGVPf2gQIECBAgAABAgQmKGAImWDRpUyAAAECBAgQIEBgTAFDyJj61iZAgAABAgQIECAwQQFDyASLLmUCBAgQIECAAAECYwoYQsbUtzYBAgQIECBAgACBCQoYQiZYdCkTIECAAAECBAgQGFPAEDKmvrUJECBAgAABAgQITFDAEDLBokuZAAECBAgQIECAwJgChpAx9a1NgAABAgQIECBAYIIChpAJFl3KBAgQIECAAAECBMYUMISMqW9tAgQIECBAgAABAhMUMIRMsOhSJkCAAAECBAgQIDCmgCFkTH1rEyBAgAABAgQIEJiggCFkgkWXMgECBAgQIECAAIExBQwhY+pbmwABAgQIECBAgMAEBQwhEyy6lAkQIECAAAECBAiMKWAIGVPf2gQIECBAgAABAgQmKGAImWDRpUyAAAECBAgQIEBgTAFDyJj61iZAgAABAgQIECAwQQFDyASLLmUCBAgQIECAAAECYwoYQsbUtzYBAgQIECBAgACBCQoYQiZYdCkTIECAAAECBAgQGFPAEDKmvrUJECBAgAABAgQITFDAEDLBokuZAAECBAgQIECAwJgChpAx9a1NgAABAgQIECBAYIIChpAJFl3KBAgQIECAAAECBMYUMISMqW9tAgQIECBAgAABAhMUMIRMsOhSJkCAAAECBAgQIDCmgCFkTH1rEyBAgAABAgQIEJiggCFkgkWXMgECBAgQIECAAIExBQwhY+pbmwABAgQIECBAgMAEBQwhEyy6lAkQIECAAAECBAiMKWAIGVPf2gQIECBAgAABAgQmKGAImWDRpUyAAAECBAgQIEBgTAFDyJj61iZAgAABAgQIECAwQQFDyASLLmUCBAgQIECAAAECYwoYQsbUtzYBAgQIECBAgACBCQoYQiZYdCkTIECAAAECBAgQGFPAEDKmvrUJECBAgAABAgQITFDAEDLBokuZAAECBAgQIECAwJgChpAx9a1NgAABAgQIECBAYIICt2ez/vZ6ndIs9R99evb4zgQNQqT8Tupf6rt0Ww3bLed6/fzlNOtS6tNH1LHdOr7d9x/uNmVUw3ZruN35O2nTGPv0YXVst46bs/iR7e63n62bOrabyMR3/nbX3958pL7kLLb/IqzT+qObT9a0nT222dzu+w98f0pvp77r/uO3Z989sO2nOb0M+r5/OaXu+zc1/PPTyz5Ixt3sI6nvt78R+MSmeapjs2XtX92U8Zaz2GwBv7vxTQ3TrH/17ZScxVZL2aVPpOcpPb81+9HnXf+NVtOY+r43n6ff36f+5bdnzmLr78Ks617f/nbnu7PHJpvL88X91dm8335tPbkp73+1nD/a1PHJlA1az337W57tWbw4XzxoPZcp73+1XDy8WM6fTdkgQu7bGm5rGSGXqeaw/Szdfqb6DXrbb8D2Z5vtzzhtZ2H3W4H3zhz+f0K8FwQIECBAgAABAgQIVBUwhFTlthgBAgQIECBAgAABAoYQ7wABAgQIECBAgAABAlUFDCFVuS1GgAABAgQIECBAgIAhxDtAgAABAgQIECBAgEBVAUNIVW6LESBAgAABAgQIECBgCPEOECBAgAABAgQIECBQVcAQUpXbYgQIECBAgAABAgQIGEK8AwQIECBAgAABAgQIVBUwhFTlthgBAgQIECBAgAABAoYQ7wABAgQIECBAgAABAlUFDCFVuS1GgAABAgQIECBAgIAhxDtAgAABAgQIECBAgEBVAUNIVW6LESBAgAABAgQIECBgCPEOECBAgAABAgQIECBQVcAQUpXbYgQIECBAgAABAgQIGEK8AwQIECBAgAABAgQIVBUwhFTlthgBAgQIECBAgAABAoYQ7wABAgQIECBAgAABAlUFDCFVuS1GgAABAgQIECBAgIAhxDtAgAABAgQIECBAgEBVAUNIVW6LESBAgAABAgQIECBgCPEOECBAgAABAgQIECBQVcAQUpXbYgQIECBAgAABAgQIGEK8AwQIECBAgAABAgQIVBUwhFTlthgBAgQIECBAgAABAoYQ7wABAgQIECBAgAABAlUFDCFVuS1GgAABAgQIECBAgIAhxDtAgAABAgQIECBAgEBVAUNIVW6LESBAgAABAgQIECBgCPEOECBAgAABAgQIECBQVcAQUpXbYgQIECBAgAABAgQIGEK8AwQIECBAgAABAgQIVBUwhFTlthgBAgQIECBAgAABAoYQ7wABAgQIECBAgAABAlUFDCFVuS1GgAABAgQIECBAgIAhxDtAgAABAgQIECBAgEBVAUNIVW6LESBAgAABAgQIECBgCPEOECBAgAABAgQIECBQVcAQUpXbYgQIECBAgAABAgQIGEK8AwQIECBAgAABAgQIVBUwhFTlthgBAgQIECBAgAABAoYQ7wABAgQIECBAgAABAlUFDCFVuS1GgAABAgQIECBAgIAhxDtAgAABAgQIECBAgEBVAUNIVW6LESBAgAABAgQIECBgCPEOECBAgAABAgQIECBQVcAQUpXbYgQIECBAgAABAgQIGEK8AwQIECBAgAABAgQIVBUwhFTlthgBAgQIECBAgAABAoYQ7wABAgQIECBAgAABAlUFDCFVuS1GgAABAgQIECBAgIAhxDtAgAABAgQIECBAgEBVAUNIVW6LESBAgAABAgQIECBwO3Wzl1N6ntZ9+qur5eLPI2lUoO8/sdn5D2xq+LDRDCa/7bf7/sPvIqz7z27qeHfyII0CdNMC+YwAABNMSURBVCl9JqXutrPYaAH/w7Zvb2upjv8BpLn/te4/td3z26n/m5s6frO5/dvwdwX6/uXUpw85i+2/EJtZ42PvZvHu7LH5X5fni/urs3m//dp+etPNYLWcP9rU8cl0BdrP/OnZ4zvbs3hxvnjQfjbTzWDbKC+W82fTFYiR+baGfuhpu5bbz9LtZ+r2s7XtTKa9++3PNtufcaatECP7984c/nOsGHWVBQECBAgQIECAAIFmBAwhzZTKRgkQIECAAAECBAjEEDCExKijLAgQIECAAAECBAg0I2AIaaZUNkqAAAECBAgQIEAghoAhJEYdZUGAAAECBAgQIECgGQFDSDOlslECBAgQIECAAAECMQQMITHqKAsCBAgQIECAAAECzQgYQpoplY0SIECAAAECBAgQiCFgCIlRR1kQIECAAAECBAgQaEbAENJMqWyUAAECBAgQIECAQAwBQ0iMOsqCAAECBAgQIECAQDMChpBmSmWjBAgQIECAAAECBGIIGEJi1FEWBAgQIECAAAECBJoRMIQ0UyobJUCAAAECBAgQIBBDwBASo46yIECAAAECBAgQINCMgCGkmVLZKAECBAgQIECAAIEYAoaQGHWUBQECBAgQIECAAIFmBAwhzZTKRgkQIECAAAECBAjEEDCExKijLAgQIECAAAECBAg0I2AIaaZUNkqAAAECBAgQIEAghoAhJEYdZUGAAAECBAgQIECgGQFDSDOlslECBAgQIECAAAECMQQMITHqKAsCBAgQIECAAAECzQgYQpoplY0SIECAAAECBAgQiCFgCIlRR1kQIECAAAECBAgQaEbAENJMqWyUAAECBAgQIECAQAwBQ0iMOsqCAAECBAgQIECAQDMChpBmSmWjBAgQIECAAAECBGIIGEJi1FEWBAgQIECAAAECBJoRMIQ0UyobJUCAAAECBAgQIBBDwBASo46yIECAAAECBAgQINCMgCGkmVLZKAECBAgQIECAAIEYAoaQGHWUBQECBAgQIECAAIFmBAwhzZTKRgkQIECAAAECBAjEEDCExKijLAgQIECAAAECBAg0I2AIaaZUNkqAAAECBAgQIEAghoAhJEYdZUGAAAECBAgQIECgGQFDSDOlslECBAgQIECAAAECMQQMITHqKAsCBAgQIECAAAECzQgYQpoplY0SIECAAAECBAgQiCFgCIlRR1kQIECAAAECBAgQaEbAENJMqWyUAAECBAgQIECAQAwBQ0iMOsqCAAECBAgQIECAQDMChpBmSmWjBAgQIECAAAECBGIIGEJi1FEWBAgQIECAAAECBJoRMIQ0UyobJUCAAAECBAgQIBBDwBASo46yIECAAAECBAgQINCMgCGkmVLZKAECBAgQIECAAIEYAoaQGHWUBQECBAgQIECAAIFmBAwhzZTKRgkQIECAAAECBAjEEDCExKijLAgQIECAAAECBAg0I2AIaaZUNkqAAAECBAgQIEAghoAhJEYdZUGAAAECBAgQIECgGQFDSDOlslECBAgQIECAAAECMQQMITHqKAsCBAgQIECAAAECzQh0FxeP/3r/9vpXNjv+TteldTM7t9H3CPQfTGnWpdR/5z0B/9qQQN+n79mcw7c2W37e0LZt9Y8L3E6p2/zpv/3HL/u3tgS6lzY1fGez5+0f/7QpcGvzmfrBzWfqt9rcvl1/V6D7UErrfvO5uu2N/mlYYHMet//Hjw91H5j97Kuvfvp/uN097393U9k0m3X/+St3732p4dwmvfXVcv4o9f3d195481OThmg4+adnj++8lda/n7ruZ169e+/XGk5l0ltfLRcPu9T/7Kuvv/m9k4ZoPPmL5fxZn7pfee31e59vPJXJbv/ifPFg0xe/+IF+dvdjb3z6DyYL0Xjiq7P5k01fPH/t9Tc/23gqk9/+5fni/nrd/+Z29thi+M+xJv9KACBAgAABAgQIECBQV8AQUtfbagQIECBAgAABAgQmL2AImfwrAIAAAQIECBAgQIBAXQFDSF1vqxEgQIAAAQIECBCYvIAhZPKvAAACBAgQIECAAAECdQUMIXW9rUaAAAECBAgQIEBg8gKGkMm/AgAIECBAgAABAgQI1BUwhNT1thoBAgQIECBAgACByQsYQib/CgAgQIAAAQIECBAgUFfAEFLX22oECBAgQIAAAQIEJi9gCJn8KwCAAAECBAgQIECAQF0BQ0hdb6sRIECAAAECBAgQmLyAIWTyrwAAAgQIECBAgAABAnUFDCF1va1GgAABAgQIECBAYPIChpDJvwIACBAgQIAAAQIECNQVMITU9bYaAQIECBAgQIAAgckLGEIm/woAIECAAAECBAgQIFBXwBBS19tqBAgQIECAAAECBCYvYAiZ/CsAgAABAgQIECBAgEBdAUNIXW+rESBAgAABAgQIEJi8gCFk8q8AAAIECBAgQIAAAQJ1BQwhdb2tRoAAAQIECBAgQGDyAoaQyb8CAAgQIECAAAECBAjUFTCE1PW2GgECBAgQIECAAIHJCxhCJv8KACBAgAABAgQIECBQV8AQUtfbagQIECBAgAABAgQmL2AImfwrAIAAAQIECBAgQIBAXQFDSF1vqxEgQIAAAQIECBCYvIAhZPKvAAACBAgQIECAAAECdQUMIXW9rUaAAAECBAgQIEBg8gKGkMm/AgAIECBAgAABAgQI1BUwhNT1thoBAgQIECBAgACByQsYQib/CgAgQIAAAQIECBAgUFfAEFLX22oECBAgQIAAAQIEJi9gCJn8KwCAAAECBAgQIECAQF0BQ0hdb6sRIECAAAECBAgQmLyAIWTyrwAAAgQIECBAgAABAnUFDCF1va1GgAABAgQIECBAYPIChpDJvwIACBAgQIAAAQIECNQVMITU9bYaAQIECBAgQIAAgckLGEIm/woAIECAAAECBAgQIFBXwBBS19tqBAgQIECAAAECBCYvYAiZ/CsAgAABAgQIECBAgEBdAUNIXW+rESBAgAABAgQIEJi8gCFk8q8AAAIECBAgQIAAAQJ1BQwhdb2tRoAAAQIECBAgQGDyAoaQyb8CAAgQIECAAAECBAjUFTCE1PW2GgECBAgQIECAAIHJCxhCJv8KACBAgAABAgQIECBQV8AQUtfbagQIECBAgAABAgQmL2AImfwrAIAAAQIECBAgQIBAXQFDSF1vqxEgQIAAAQIECBCYvIAhZPKvAAACBAgQIECAAAECdQUMIXW9rUaAAAECBAgQIEBg8gKGkMm/AgAIECBAgAABAgQI1BXoLpeLz637/gt1l7UaAQIECBAgQIAAAQJTE5h13c+98vq9X76duvQ7qU9pNut+9JW79740NYgo+a6W80ebOt597Y03PxUlp6nl8fTs8Z230vr3u1n3U6/evfdrU8s/Sr6r5eJhl/qfffX1N783Sk5TzONiOX/Wp+5XXnv93uenmH+EnC/OFw/6df/FD6bZD37sjU//QYScppjD6mz+ZPOz6vlrr7/52SnmHynny/PF/fW6/813Z49NYv5zrEjVlQsBAgQIECBAgACBBgQMIQ0UyRYJECBAgAABAgQIRBIwhESqplwIECBAgAABAgQINCBgCGmgSLZIgAABAgQIECBAIJKAISRSNeVCgAABAgQIECBAoAEBQ0gDRbJFAgQIECBAgAABApEEDCGRqikXAgQIECBAgAABAg0IGEIaKJItEiBAgAABAgQIEIgkYAiJVE25ECBAgAABAgQIEGhAwBDSQJFskQABAgQIECBAgEAkAUNIpGrKhQABAgQIECBAgEADAoaQBopkiwQIECBAgAABAgQiCRhCIlVTLgQIECBAgAABAgQaEDCENFAkWyRAgAABAgQIECAQScAQEqmaciFAgAABAgQIECDQgIAhpIEi2SIBAgQIECBAgACBSAKGkEjVlAsBAgQIECBAgACBBgQMIQ0UyRYJECBAgAABAgQIRBIwhESqplwIECBAgAABAgQINCBgCGmgSLZIgAABAgQIECBAIJKAISRSNeVCgAABAgQIECBAoAEBQ0gDRbJFAgQIECBAgAABApEEDCGRqikXAgQIECBAgAABAg0IGEIaKJItEiBAgAABAgQIEIgkYAiJVE25ECBAgAABAgQIEGhAwBDSQJFskQABAgQIECBAgEAkAUNIpGrKhQABAgQIECBAgEADAoaQBopkiwQIECBAgAABAgQiCRhCIlVTLgQIECBAgAABAgQaEDCENFAkWyRAgAABAgQIECAQScAQEqmaciFAgAABAgQIECDQgIAhpIEi2SIBAgQIECBAgACBSAKGkEjVlAsBAgQIECBAgACBBgQMIQ0UyRYJECBAgAABAgQIRBIwhESqplwIECBAgAABAgQINCBgCGmgSLZIgAABAgQIECBAIJKAISRSNeVCgAABAgQIECBAoAEBQ0gDRbJFAgQIECBAgAABApEEDCGRqikXAgQIECBAgAABAg0IGEIaKJItEiBAgAABAgQIEIgkYAiJ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" />
                </defs>
              </svg>
              <p>{{ $t("welcomePopup.step1Text") }}</p>
              <p>{{ $t("welcomePopup.step1Label") }}</p>
            </div>
            <div class="wel-card-item">
              <svg width="208" height="153" viewBox="0 0 208 153" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M144.859 119.921L32.8077 152.499" stroke="#4D4C4D" stroke-width="0.7" />
                <path d="M144.932 120.087L207.49 152.316" stroke="#4D4C4D" stroke-width="0.7" />
                <path d="M144.904 119.966V0.0102539" stroke="#4D4C4D" stroke-width="0.7" />
                <path
                  d="M163.185 58.7969L163.18 58.8665C163.175 58.959 163.164 59.0508 163.154 59.1449C163.042 60.5322 162.813 61.7932 162.752 62.9167C162.724 63.4177 162.687 63.8982 162.64 64.3692C162.6 64.6993 162.556 65.0177 162.506 65.3306C162.466 65.5678 162.421 65.7994 162.37 66.0254C162.367 66.0321 162.365 66.0392 162.364 66.0466C161.675 69.0896 159.883 71.1032 155.071 70.4869C146.201 69.354 144.656 76.5196 144.437 80.1216C144.39 80.7826 144.389 81.4461 144.432 82.1074C144.432 82.1074 139.559 82.0372 133.571 82.2543C133.054 82.2749 132.53 82.295 131.995 82.315C125.247 82.6101 117.536 83.2826 113.811 84.8097C110.721 86.0723 108.801 88.106 107.62 90.0429C107.602 90.069 107.59 90.0902 107.577 90.1113C107.476 90.2745 107.385 90.4381 107.299 90.5968C105.922 93.0959 105.725 95.295 105.725 95.295C105.724 95.3975 105.707 95.4992 105.676 95.5967C105.637 95.7198 105.573 95.8336 105.488 95.9311C105.403 96.0286 105.299 96.1076 105.182 96.1634C104.965 96.2659 104.668 96.3199 104.246 96.2748C104.071 96.2508 103.899 96.2159 103.729 96.1701C103.718 96.1701 103.713 96.164 103.702 96.1634C103.452 96.092 103.206 96.0077 102.965 95.9107C102.818 95.8417 102.69 95.7398 102.589 95.6128C99.8291 92.4395 96.172 67.047 96.6919 53.9479C96.7114 53.4864 96.7253 53.0355 96.7476 52.5906C96.7738 51.9114 96.8094 51.2545 96.8556 50.6154C97.0649 47.078 97.4229 44.1151 98.1656 41.6795V41.6739C98.2391 41.4273 98.3226 41.1923 98.4005 40.9574V40.9518C98.4968 40.6852 98.5976 40.4291 98.7039 40.1791C99.2484 38.8758 99.9465 37.7546 100.853 36.8082C100.933 36.7197 101.017 36.6353 101.106 36.5554C103.204 34.5145 106.344 33.342 111.089 32.9479C111.309 32.9223 111.849 32.8922 111.882 32.8883C117.989 32.4763 124.162 32.6562 130.516 33.9121C130.569 33.9269 130.623 33.939 130.677 33.9483C133.133 34.4393 135.556 35.0824 137.932 35.874C137.96 35.8798 137.987 35.8886 138.012 35.9002C142.804 37.4885 147.706 39.771 152.769 42.9226C160.842 47.9548 162.886 52.5199 163.192 56.3752C163.196 56.3876 163.197 56.4007 163.195 56.4136C163.253 57.2072 163.249 58.0039 163.185 58.7969Z"
                  fill="#F7E3DF" />
                <path
                  d="M125.217 75.1545C121.605 75.9802 113.937 73.6603 108.421 78.7387C102.905 83.8171 105.707 95.7109 105.707 95.7109L105.163 96.5766C104.774 96.7664 104.106 96.7898 102.946 96.3277C100.153 95.2143 96.1327 68.0625 96.6722 54.3599C97.1983 40.8901 98.5389 34.4099 111.072 33.3644C107.804 33.7802 105.881 36.3239 104.214 38.2869C102.435 40.3718 102.38 43.1225 107.139 47.5513C111.898 51.98 124.759 56.4627 127.725 60.1209C131.777 65.1163 128.837 74.3211 125.217 75.1545Z"
                  fill="#F1CCC2" />
                <path
                  d="M163.169 59.2257C163.072 61.1798 162.835 63.0771 162.642 64.3675C162.601 64.6214 162.567 64.8536 162.531 65.0584C162.467 65.4481 162.42 65.7382 162.387 65.8996C162.431 65.5918 162.544 64.8085 162.645 63.7641C162.868 61.5283 163.035 58.0811 162.403 55.4611C162.204 54.6233 161.923 53.8734 161.537 53.2749C161.467 53.168 161.397 53.0606 161.321 52.9475C160.549 51.828 159.388 50.4746 158.117 49.2175C156.837 47.9371 155.454 46.7641 154.259 46.0236C150.353 43.6008 143.52 40.4564 139.873 39.0869C138.635 38.622 136.192 37.9117 133.367 37.2185C130.715 36.5616 127.718 35.9247 125.067 35.5239C122.652 35.1647 120.216 34.9661 117.774 34.9293C117.744 34.9222 117.713 34.9205 117.682 34.9243C116.838 34.9159 116.022 34.9204 115.232 34.9482C111.836 35.0562 109.025 35.5011 107.709 36.1802C104.859 37.6355 103.263 39.6492 103.224 41.7536C103.219 41.846 103.219 41.9328 103.22 42.0253C103.223 42.0284 103.224 42.0323 103.225 42.0364C103.259 42.8113 103.503 43.603 103.984 44.3802C104.164 44.6739 104.365 44.9541 104.585 45.2186C105.281 46.0459 106.148 46.8169 107.141 47.5518L107.157 47.5691C107.612 47.8987 108.089 48.2293 108.589 48.5456C108.71 48.6229 108.825 48.6998 108.947 48.7716C109.068 48.8434 109.194 48.9269 109.32 49.0043C112.092 50.685 115.389 52.1988 118.461 53.7492C120.293 54.6767 122.044 55.6109 123.557 56.608C124.723 57.367 125.813 58.2375 126.811 59.2073C127.362 59.7451 127.865 60.33 128.314 60.9554C128.612 61.3641 128.869 61.801 129.081 62.2598C129.781 63.7947 129.972 65.574 129.881 67.2347C129.879 67.2377 129.877 67.2415 129.877 67.2455C129.877 67.2495 129.879 67.2533 129.881 67.2564C129.789 68.9332 129.421 70.4915 129.026 71.5531C129 71.6222 128.97 71.6968 128.944 71.7663C128.659 72.4901 128.367 72.9427 128.176 72.965H128.17C128.089 72.9605 128.444 72.234 128.748 71.1567C128.754 71.1517 128.754 71.1517 128.754 71.1462C128.979 70.3863 129.115 69.603 129.16 68.8118V68.779C129.232 66.9541 128.723 65.1085 127.926 63.4701C127.527 62.6415 127.049 61.8536 126.498 61.1174C126.498 61.1063 126.488 61.1002 126.483 61.0946C126.339 60.9007 126.175 60.7221 125.995 60.5618C124.582 59.2257 121.592 57.8612 117.021 55.8531C116.926 55.8096 116.836 55.7668 116.74 55.7289C115.991 55.3886 115.242 55.0592 114.492 54.7407C114.436 54.7157 114.374 54.6906 114.316 54.6606C110.607 53.026 104.977 50.1767 102.931 48.2633C102.92 48.2553 102.909 48.2456 102.901 48.2344C102.223 47.593 101.613 46.9995 101.072 46.4417C101.067 46.4361 101.061 46.4306 101.056 46.4245C99.8712 45.2058 99.0361 44.1592 98.5779 43.1816C98.5673 43.1754 98.5673 43.1699 98.5679 43.1593C98.3807 42.7732 98.2562 42.3598 98.1994 41.9345C98.1843 41.8494 98.1745 41.7636 98.1698 41.6773V41.6717C98.1298 41.0109 98.2812 40.3495 98.6397 39.6453C98.6826 39.5551 98.7316 39.4599 98.7856 39.3703C99.2254 38.5908 99.9135 37.7558 100.858 36.806C100.938 36.7175 101.022 36.6331 101.111 36.5533C101.226 36.4341 101.353 36.3105 101.485 36.1869C103.609 34.1644 108.095 32.8527 113.025 32.5783C119.813 32.1997 127.757 33.2608 130.525 33.9127C130.578 33.9275 130.632 33.9396 130.686 33.9489C132.094 34.2829 134.744 34.8953 137.934 35.8746C137.961 35.8805 137.988 35.8892 138.014 35.9008C142.857 37.3844 148.925 39.7082 153.818 43.1816C158.629 46.5954 160.266 48.3034 162.371 52.2973C162.895 53.2838 163.13 54.7552 163.194 56.3753C163.197 56.3877 163.199 56.4008 163.197 56.4137C163.225 57.1881 163.219 57.9931 163.186 58.797L163.181 58.8666C163.181 58.9868 163.175 59.1065 163.169 59.2257Z"
                  fill="#F7E3DF" />
                <path
                  d="M110.015 94.859C108.85 98.9181 100.651 140.021 100.73 142.037C100.809 144.053 102.767 145.415 103.612 142.466C104.456 139.517 115.727 95.2832 116.126 92.2079C116.524 89.1326 111.55 89.5084 110.015 94.859Z"
                  fill="#4D4C4D" />
                <path
                  d="M131.555 108.217C131.035 112.074 129.709 148.875 130.172 150.712C130.635 152.549 133.041 153.563 133.417 150.762C133.794 147.96 137.908 107.925 137.771 105.06C137.635 102.195 132.242 103.132 131.555 108.217Z"
                  fill="#4D4C4D" />
                <path
                  d="M142.06 94.5997C142.02 98.4884 144.949 135.157 145.54 136.927C146.131 138.697 148.301 139.425 148.329 136.6C148.358 133.775 147.479 93.5731 147.06 90.7455C146.642 87.9179 142.114 89.4728 142.06 94.5997Z"
                  fill="#4D4C4D" />
                <path
                  d="M171.989 97.3821C171.812 98.2966 171.589 99.2017 171.321 100.094C171.049 100.994 170.713 101.862 170.338 102.244C170.2 102.384 169.447 102.626 168.249 102.93C161.394 104.662 140.048 108.553 137.611 108.619C134.755 108.697 107.318 104.133 107.318 104.133L106.187 100.436L105.092 96.8599L137.159 102.015L137.413 102.056L171.989 97.3821Z"
                  fill="#4D4C4D" />
                <path
                  d="M163.531 101.794C163.71 105.795 168.902 143.296 169.609 145.066C170.317 146.836 172.589 147.399 172.458 144.493C172.326 141.587 169.043 100.279 168.449 97.4071C167.856 94.535 163.296 96.5186 163.531 101.794Z"
                  fill="#4D4C4D" />
                <path
                  d="M173.308 98.8741C171.17 100.927 145.213 105.656 139.842 106.069C134.47 106.481 125.431 103.542 116.009 102.74C106.587 101.938 101.606 99.9641 102.658 92.6132C102.868 91.1657 103.614 89.9064 104.774 88.8164C110.675 83.2247 127.432 80.4361 137.787 79.9851C150.184 79.4479 172.808 84.3181 175.186 87.4641C175.714 88.1628 176.294 88.9411 176.45 90.1364C176.853 93.1048 174.825 97.4155 173.308 98.8741Z"
                  fill="#F1CCC2" />
                <path
                  d="M139.64 94.0679C135.543 94.1486 124.408 93.4477 114.139 91.6233C110.77 91.0204 107.985 90.0027 104.989 89.4471C103.602 89.4254 104.059 91.5242 103.85 92.9661C103.305 96.7518 104.047 99.0182 106.184 100.436C108.189 101.772 111.435 102.35 116.007 102.742C123.441 103.371 130.642 105.338 135.987 105.929L148.494 98.3936C145.199 97.3553 142.36 94.015 139.64 94.0679Z"
                  fill="#E4BAB2" />
                <path
                  d="M135.987 105.929L135.833 105.769L138.314 101.245L139.658 94.2701C139.658 94.2701 144.083 94.6548 155.519 93.3426C160.908 92.7224 166.035 92.463 176.503 90.6842C176.725 93.6131 175.667 97.5013 174.242 98.8769C173.887 99.2165 172.84 99.6385 171.318 100.094L158.671 102.927C157.052 103.289 140.782 105.902 139.135 106.1L135.987 105.929Z"
                  fill="#F7E3DF" />
                <path
                  d="M176.541 90.6147C176.073 90.6214 175.107 90.7644 174.509 90.8518C173.137 91.0595 171.766 91.2516 170.39 91.4431C167.62 91.8194 164.848 92.1648 162.071 92.4791C161.589 92.5348 161.107 92.5844 160.624 92.6345C159.545 92.7555 158.466 92.8707 157.388 92.9802C153.425 93.3894 149.45 93.7323 145.471 93.9233L145.308 93.9305C145.008 93.9472 144.713 93.9583 144.413 93.9634C143.044 94.019 141.685 94.019 140.313 93.9895C140.202 93.9895 140.091 93.9828 139.979 93.9823C139.862 93.9266 137.757 93.9043 136.835 93.8431C136.455 93.8142 136.075 93.7845 135.695 93.754C135.63 93.7619 135.565 93.7634 135.499 93.7585C134.079 93.6471 132.666 93.5185 131.243 93.4395C130.63 93.405 130.018 93.3281 129.405 93.2858C128.928 93.2603 128.455 93.1856 127.993 93.0631L127.831 93.0498C127.345 93.0069 126.872 92.8894 126.394 92.8098C126.074 92.7959 125.752 92.7864 125.43 92.7859C125.393 92.7859 125.357 92.7859 125.319 92.7803C124.874 92.7759 124.423 92.7631 123.976 92.7319C123.5 92.699 123.025 92.6428 122.553 92.5738C121.738 92.6161 120.924 92.4708 120.124 92.3299C119.879 92.2871 119.634 92.2503 119.39 92.2047C119.129 92.2006 118.87 92.1651 118.617 92.0989L118.6 92.0928C118.385 92.0772 118.17 92.0566 117.956 92.0243C117.856 92.0093 117.751 91.9992 117.641 91.9903C117.551 91.987 117.462 91.9792 117.374 91.9675C117.167 91.9526 116.962 91.917 116.762 91.8612L116.19 91.7938C114.913 91.6479 113.633 91.4748 112.36 91.2527C112.231 91.2349 112.107 91.2115 111.977 91.1881C111.681 91.1324 111.379 91.0795 111.083 91.0211C110.049 90.8179 109.023 90.5818 108.009 90.3035C107.886 90.2695 107.757 90.235 107.634 90.196C107.237 90.0847 106.842 89.9622 106.451 89.8319L106.093 89.7145C105.773 89.6031 105.393 89.4745 105.052 89.5324H105.042C105.042 89.2541 105.042 88.9718 105.05 88.6973C105.05 88.6316 105.05 88.5615 105.055 88.4964C105.055 88.2787 105.068 88.056 105.08 87.8339C105.219 85.5986 105.702 83.3339 106.624 81.2996C106.642 81.2623 106.661 81.22 106.68 81.1827C106.797 80.9283 106.925 80.6739 107.058 80.4256C107.718 79.2042 108.617 78.143 109.783 77.3792C110.841 76.6805 112.039 76.224 113.269 75.9373C114.296 75.7069 115.342 75.5708 116.393 75.5309C116.666 75.5187 116.938 75.5118 117.211 75.5103C118.528 75.5064 119.838 75.6378 121.153 75.6823C122.522 75.7247 123.973 75.6679 125.272 75.2436C125.285 75.239 125.298 75.236 125.311 75.2347C125.543 75.1585 125.77 75.0672 125.99 74.9614C126.762 74.621 127.438 74.0976 127.962 73.4365C128.057 73.3139 128.146 73.1862 128.227 73.0541C128.343 72.8778 128.448 72.6945 128.541 72.5051C128.583 72.5069 128.625 72.4959 128.661 72.4735C128.698 72.4512 128.726 72.4186 128.744 72.3799C128.835 72.2051 128.915 72.0303 129.001 71.8554C129.026 71.7859 129.056 71.7113 129.083 71.6422C129.65 70.2808 129.941 68.8203 129.938 67.3455C129.936 67.3425 129.934 67.3386 129.934 67.3346C129.934 67.3306 129.936 67.3267 129.938 67.3237C129.933 66.4616 129.832 65.6026 129.637 64.7628C129.64 64.7555 129.641 64.7474 129.64 64.7396C129.638 64.7318 129.634 64.7246 129.629 64.7189C129.488 64.0788 129.291 63.4525 129.04 62.8472C128.42 61.3384 127.473 59.9583 126.252 58.8794C126.056 58.7001 125.847 58.5359 125.64 58.3722C125.628 58.3616 125.616 58.3519 125.603 58.3433C124.987 57.8684 124.329 57.4525 123.677 57.035C122.725 56.4276 121.778 55.8264 120.826 55.2357C120.062 54.7636 119.293 54.2997 118.518 53.8439C117.336 53.1535 116.137 52.4944 114.914 51.8837C113.064 50.9662 111.154 50.1578 109.378 49.1001C109.336 49.0761 109.299 49.0522 109.257 49.0283C109.173 48.9726 109.09 48.9264 109.004 48.8674C108.883 48.7955 108.767 48.7187 108.647 48.6413C107.244 47.7099 105.956 46.5781 105.038 45.1513C104.03 43.583 103.242 41.2648 104.209 39.5C104.675 38.6488 105.476 38.0397 106.287 37.5515C107.128 37.04 108.017 36.6089 108.939 36.2638C110.773 35.5751 112.725 35.2138 114.674 35.0702C114.876 35.054 115.078 35.0429 115.286 35.0329C116.099 34.99 116.915 34.9855 117.736 35.0089C117.766 35.0052 117.798 35.0069 117.828 35.0139C120.991 35.0997 124.157 35.6213 127.24 36.2794C131.552 37.2105 135.783 38.4846 139.892 40.0896C143.929 41.6617 147.84 43.5386 151.592 45.7041C153.455 46.7797 155.298 47.9092 157.053 49.1557C158.72 50.3354 160.106 51.7501 161.051 53.5761C162.701 56.7494 162.944 60.3364 162.7 63.8498C162.67 64.2835 162.63 64.7166 162.585 65.1442C162.58 65.2366 162.569 65.3285 162.559 65.4148C162.609 65.1019 162.654 64.7834 162.693 64.4533C162.884 63.1628 163.124 61.2655 163.22 59.3114C163.221 59.2835 163.217 59.2555 163.208 59.229C163.111 58.18 162.918 57.142 162.632 56.1281C162.576 55.9349 162.517 55.7384 162.456 55.5469C162.176 54.6767 161.814 53.8351 161.375 53.0333C160.993 52.3339 160.542 51.6748 160.029 51.0658C159.477 50.4095 158.845 49.8361 158.172 49.3044C157.17 48.5094 156.07 47.8179 154.998 47.1387C148.299 42.8738 141.037 39.5634 133.423 37.3032C132.609 37.0571 131.794 36.8333 130.979 36.6145C126.708 35.4883 122.294 34.6153 117.876 34.4723C113.948 34.3442 109.891 34.8792 106.421 36.8283C105.596 37.2948 104.787 37.8387 104.176 38.5725C103.523 39.3641 103.23 40.344 103.25 41.3633C103.252 41.522 103.261 41.6805 103.279 41.8382C103.292 42.0276 103.317 42.2161 103.352 42.4027C103.481 43.1187 103.713 43.8124 104.039 44.4626C104.381 45.1595 104.803 45.8136 105.298 46.4111C107.494 49.0672 110.667 50.4546 113.728 51.9115C113.738 51.9176 113.749 51.9182 113.754 51.9238C114.455 52.2578 115.146 52.5879 115.814 52.9453C116.375 53.2432 116.935 53.551 117.489 53.87C118.94 54.6951 120.367 55.5786 121.782 56.4722C123.524 57.5689 125.416 58.5977 126.778 60.1738C128.908 62.6306 129.811 66.1145 129.217 69.3096C129.217 69.1737 129.217 69.0312 129.213 68.8959C129.169 67.9458 129.029 67.0025 128.795 66.0806C128.591 65.2183 128.319 64.3735 127.981 63.5542C127.762 63.0313 127.498 62.5284 127.192 62.051C126.998 61.7538 126.784 61.4695 126.553 61.1998C126.553 61.1887 126.543 61.1826 126.538 61.177C126.385 60.9903 126.222 60.8124 126.05 60.6442C125.541 60.1172 124.987 59.637 124.392 59.2095C123.267 58.3912 122.035 57.7359 120.795 57.1185C119.332 56.3948 117.851 55.7111 116.369 55.0425C113.5 53.7537 110.54 52.6447 107.709 51.2652C106.049 50.4618 104.414 49.5232 102.987 48.3457C102.975 48.3378 102.965 48.328 102.956 48.3168C102.292 47.7772 101.68 47.177 101.127 46.5241L101.111 46.5069C100.994 46.3699 100.882 46.2285 100.77 46.0804C99.4089 44.2989 98.7168 42.7189 98.7536 40.6524C98.7497 40.5271 98.7569 40.3969 98.7642 40.2627C98.7781 40.0133 98.8031 39.7533 98.8393 39.4889V39.456C98.8527 39.3152 98.7803 39.4365 98.6935 39.731C98.5726 40.1571 98.4941 40.594 98.4591 41.0354V41.041C98.4431 41.1779 98.4355 41.3157 98.4363 41.4535C98.4307 41.4585 98.4307 41.4585 98.4363 41.4641C98.4106 42.0638 98.4732 42.6641 98.6222 43.2456C98.6222 43.2562 98.6222 43.2617 98.6317 43.2679C98.7016 43.5626 98.8028 43.8491 98.9334 44.1224C100.144 46.6594 102.171 48.6207 104.511 50.12C107.016 51.7211 109.789 52.8201 112.513 53.9647C113.131 54.2219 113.753 54.4841 114.37 54.7469C114.426 54.7769 114.487 54.8026 114.546 54.827C115.295 55.1455 116.045 55.4749 116.794 55.8152C116.89 55.8531 116.98 55.8959 117.075 55.9394C118.584 56.6208 120.082 57.339 121.54 58.1106C124.036 59.4339 126.361 61.1119 127.483 63.7891C128.036 65.1098 128.407 66.4998 128.585 67.9205C128.743 69.201 128.713 70.5505 128.26 71.7725C128.038 72.3747 127.698 72.9267 127.26 73.3961C126.822 73.8655 126.295 74.243 125.71 74.5065C124.527 75.046 123.187 75.1523 121.898 75.1473C120.581 75.1406 119.266 75.0037 117.945 74.9692C116.655 74.934 115.365 75.0166 114.09 75.2158C111.601 75.6295 109.177 76.6672 107.56 78.6636C106.603 79.8466 105.992 81.2802 105.521 82.7098C105.013 84.2713 104.687 85.8863 104.551 87.5227C104.508 88.0916 104.488 88.6623 104.49 89.2285C104.49 89.3804 104.49 89.533 104.49 89.6805C104.487 89.7362 104.49 89.7919 104.49 89.8475C104.239 90.1654 104.203 90.6208 104.144 91.0044C104.06 91.5544 103.991 92.1061 103.934 92.6578L103.896 93.0475C103.805 94.0168 103.757 94.9961 103.753 95.962C103.753 96.06 103.753 96.1529 103.753 96.2453C103.753 96.3868 103.748 96.5237 103.753 96.6646C103.753 96.855 103.76 97.0403 103.766 97.2313C103.781 97.7379 103.808 98.2401 103.851 98.7434C103.859 98.9015 103.872 99.0601 103.885 99.2188C103.904 99.4754 104.209 99.476 104.348 99.3145C104.373 99.2853 104.392 99.2512 104.403 99.2145C104.415 99.1777 104.418 99.139 104.414 99.1008C104.399 98.882 104.378 98.6687 104.374 98.4505C104.328 97.8938 104.31 97.3315 104.302 96.7703C104.294 96.6339 104.295 96.4981 104.297 96.3567C104.284 94.5035 104.425 92.6525 104.72 90.8229C104.752 90.6286 104.776 90.3525 104.923 90.186C104.934 90.186 104.945 90.1927 104.955 90.1932C104.993 90.1975 105.032 90.1921 105.067 90.1777C105.097 90.1671 105.126 90.1502 105.149 90.1281C105.173 90.1059 105.192 90.079 105.204 90.0491C105.483 90.0318 105.817 90.1916 106.047 90.2717C106.48 90.4148 106.913 90.5529 107.352 90.6804C107.556 90.7405 107.76 90.8006 107.965 90.8552C109.236 91.197 110.516 91.4737 111.809 91.7075C111.82 91.7072 111.832 91.7097 111.842 91.7148C113.275 91.9731 114.723 92.1718 116.167 92.3433C116.589 92.3934 117.01 92.4435 117.432 92.4886C117.446 92.4914 117.461 92.4914 117.476 92.4886C117.579 92.4997 117.681 92.5164 117.79 92.5276C118.491 92.6389 119.272 92.6796 119.781 92.7347C122.547 93.0108 125.312 93.2892 128.076 93.5697C131.394 93.9038 138.994 94.4711 139.287 94.4817C139.238 94.7895 139.272 95.1558 139.254 95.378C139.219 95.8278 139.167 96.2765 139.105 96.7197C138.988 97.4892 138.826 98.2513 138.621 99.0022C138.323 100.079 137.934 101.128 137.459 102.139H137.453C137.222 102.652 136.962 103.153 136.674 103.637C136.667 103.658 136.654 103.677 136.638 103.693C136.27 104.335 135.864 104.954 135.421 105.547C135.279 105.746 135.453 105.952 135.649 105.962C135.693 105.964 135.737 105.955 135.777 105.936C135.817 105.916 135.852 105.887 135.878 105.851C136.348 105.218 136.78 104.559 137.172 103.875C137.512 103.284 137.822 102.676 138.099 102.054C138.341 101.517 138.556 100.968 138.749 100.413C139.077 99.4639 139.334 98.4918 139.518 97.5047C139.611 97.0036 139.685 96.5026 139.741 95.9932C139.767 95.7226 139.792 95.4515 139.808 95.1748C139.819 95.0634 139.826 94.9421 139.832 94.8224C139.832 94.7572 139.832 94.6921 139.837 94.627C139.837 94.627 139.886 94.4828 140.143 94.5184C140.188 94.5209 140.234 94.5209 140.279 94.5184C141.8 94.5579 143.319 94.5535 144.847 94.4906L145.491 94.4599C148.584 94.3135 151.67 94.0741 154.759 93.7802C154.769 93.7802 154.786 93.7763 154.797 93.7768C156.974 93.5692 159.153 93.3404 161.322 93.0993C164.103 92.7942 166.879 92.4563 169.65 92.0855C171.021 91.9 172.392 91.7064 173.763 91.5049C174.691 91.3702 175.718 91.2956 176.547 90.824C176.619 90.7896 176.689 90.7498 176.755 90.7049C176.891 90.628 176.778 90.5997 176.541 90.6147Z"
                  fill="white" />
                <rect x="0.792383" y="78.9799" width="85.9029" height="64.8424" fill="white" stroke="#292929"
                  stroke-width="0.7" />
                <rect x="5.44238" y="82.6299" width="36.4474" height="26.3929" fill="#D1D1D1" />
                <rect x="5.44238" y="113.023" width="36.4474" height="26.3929" fill="#E6D85A" />
                <rect x="45.8789" y="82.6299" width="36.4474" height="26.3929" fill="#E9BEB3" />
                <rect x="45.8789" y="113.023" width="36.4474" height="26.3929" fill="#6F6EAD" />
                <path
                  d="M62.6032 100.551L72.371 90.8314L75.5207 93.7775L65.1128 104.034L64.1294 103.818L63.2837 104.034L62.6032 103.68L62.3389 102.422V101.301L62.6032 100.551Z"
                  fill="white" />
                <path
                  d="M73.8138 92.3889C73.3369 91.9075 73.0693 91.2573 73.0693 90.5796C73.0693 89.902 73.3369 89.2518 73.8138 88.7703L75.4379 87.1462C75.919 86.667 76.5703 86.3979 77.2493 86.3979C77.9283 86.3979 78.5797 86.667 79.0607 87.1462C79.5397 87.6265 79.8086 88.2772 79.8086 88.9555C79.8086 89.6338 79.5397 90.2844 79.0607 90.7648L77.4366 92.3889C76.9555 92.8681 76.3042 93.1372 75.6252 93.1372C74.9462 93.1372 74.2948 92.8681 73.8138 92.3889Z"
                  fill="#292929" />
                <path
                  d="M63.449 104.398C63.1668 104.398 62.8894 104.325 62.644 104.186C62.3985 104.047 62.1933 103.846 62.0487 103.604C61.904 103.362 61.8248 103.086 61.8187 102.804C61.8127 102.522 61.88 102.243 62.0142 101.995C62.0378 101.95 62.0501 101.9 62.0501 101.85C62.0501 101.799 62.0378 101.749 62.0142 101.705C61.9014 101.476 61.863 101.217 61.9045 100.965C61.946 100.713 62.0653 100.48 62.2456 100.299L72.2093 90.3356C72.2487 90.2935 72.2962 90.26 72.3491 90.2371C72.4019 90.2142 72.4589 90.2024 72.5165 90.2024C72.5741 90.2024 72.631 90.2142 72.6839 90.2371C72.7367 90.26 72.7843 90.2935 72.8236 90.3356L75.8868 93.403C75.9288 93.4423 75.9623 93.4899 75.9853 93.5427C76.0082 93.5955 76.02 93.6525 76.02 93.7101C76.02 93.7677 76.0082 93.8247 75.9853 93.8775C75.9623 93.9303 75.9288 93.9779 75.8868 94.0173L65.9231 103.981C65.7432 104.162 65.5112 104.281 65.2598 104.322C65.0084 104.364 64.7503 104.325 64.5219 104.212C64.4769 104.19 64.4272 104.178 64.3768 104.178C64.3264 104.178 64.2767 104.19 64.2316 104.212C63.9908 104.34 63.7214 104.404 63.449 104.398ZM72.5081 91.2571L62.8515 100.914C62.7948 100.966 62.7573 101.036 62.7451 101.112C62.7329 101.189 62.7467 101.267 62.7842 101.334C62.8713 101.503 62.9167 101.69 62.9167 101.879C62.9167 102.069 62.8713 102.256 62.7842 102.424C62.707 102.568 62.6783 102.733 62.7022 102.895C62.7262 103.057 62.8015 103.207 62.9171 103.322C63.0327 103.438 63.1824 103.513 63.3441 103.537C63.5058 103.561 63.6709 103.532 63.8151 103.455C63.9835 103.368 64.1703 103.323 64.3599 103.323C64.5496 103.323 64.7364 103.368 64.9048 103.455C64.9727 103.491 65.0506 103.504 65.1265 103.492C65.2024 103.48 65.2723 103.443 65.3256 103.388L75.0032 93.7312L72.5081 91.2571Z"
                  fill="#4D4C4D" />
                <path
                  d="M71.6819 89.0018C71.9184 88.7667 72.2383 88.6347 72.5718 88.6347C72.9053 88.6347 73.2252 88.7667 73.4617 89.0018L77.2023 92.7424C77.4361 92.9787 77.5673 93.2977 77.5673 93.6302C77.5673 93.9626 77.4361 94.2817 77.2023 94.518C76.966 94.7518 76.6469 94.883 76.3145 94.883C75.982 94.883 75.663 94.7518 75.4267 94.518L71.6819 90.7774C71.4481 90.5411 71.3169 90.222 71.3169 89.8896C71.3169 89.5571 71.4481 89.2381 71.6819 89.0018Z"
                  fill="#292929" />
              </svg>
              <p>{{ $t("welcomePopup.step2Text") }}</p>
              <p>{{ $t("welcomePopup.step2Label") }}</p>
            </div>
            <div class="wel-card-item">
              <img src="~assets/images/wel-card-img.png" alt="" srcset="">
              <p>{{ $t("welcomePopup.step3Text") }}</p>
              <p>{{ $t("welcomePopup.step3Label") }}</p>
            </div>
          </div>
          <button @click="onClickWelcome('reduce_designtime')">{{ $t("buttonText.startDesiginingNow") }}</button>
        </div>
      </div>
    </div>
    <!-- ---------------------------Welcome New User Popup For Home Owners--------------------------------- -->
    <div v-if="false" class="popup-div stop-scale" :class="(user && user.onboardingGoalFilled === false) && isUserCategoryHomeOwner ? 'showPopUp' : ''"
      style="z-index:1">
      <div class="popup-container welcome-popup-home-owner" @click.stop>
        <img class="bg-element" src="~assets/images/dashboard/ho-welcom-popup-bg-element.png">
        <div class="close-popup" @click="onClickWelcome('cancel')">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#232121"/>
            <path d="M21.5 11L10 21.4645" stroke="#E8E8E8" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M21.5992 21.6478L10.1992 11.0916" stroke="#E8E8E8" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
        </div>
        <div class="header">
          {{ $t('dashboard.hoWelcomePopup.header') }}
        </div>
        <div class="subheader">
          {{ $t('dashboard.hoWelcomePopup.subheader') }}
        </div>
        <div class="startup-options-wrapper">
          <div
            class="option option-one"
            :class="{ 'selected': selectedOptionForHOWelcomePopup === hoPopupDesignOptions.self }"
            @click="selectedOptionForHOWelcomePopup = hoPopupDesignOptions.self"
          >
            <div class="radio-button-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12.0004" cy="12.0001" r="9.1" stroke="#E9BEB3"/>
                <circle cx="12" cy="12" r="6" fill="#E9BEB3"/>
              </svg>
            </div>
            <div class="option-details">
              <div class="name">{{ $t('dashboard.hoWelcomePopup.options[0]') }}</div>
              <div class="sub-text">{{ $t('dashboard.hoWelcomePopup.options[1]') }}</div>
            </div>
            <div class="image-wrapper">
              <img src="~assets/images/dashboard/ho-welcome-popup-option-one.png">
            </div>
          </div>
          <div
            class="option option-two"
            :class="{ 'selected': selectedOptionForHOWelcomePopup === hoPopupDesignOptions.foyr }"
            @click="selectedOptionForHOWelcomePopup = hoPopupDesignOptions.foyr"
          >
            <div class="radio-button-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12.0004" cy="12.0001" r="9.1" stroke="#E9BEB3"/>
                <circle cx="12" cy="12" r="6" fill="#E9BEB3"/>
              </svg>
            </div>
            <div class="option-details">
              <div class="name">{{ $t('dashboard.hoWelcomePopup.options[2]') }}</div>
              <div class="sub-text">{{ $t('dashboard.hoWelcomePopup.options[3]') }}</div>
            </div>
            <div class="image-wrapper">
              <img src="~assets/images/dashboard/ho-welcome-popup-option-two.png">
            </div>
          </div>
        </div>
        <div class="popup-actions">
          <button @click="handleHomeOwnerWelcomePopupButtonClick">{{ $t('dashboard.hoWelcomePopup.ctaText') }}</button>
        </div>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
    <div v-if="showRedirect || dashMsg" class="show-redirect">
      <div>
        <h2>{{ $t("dashboard.dashTitle") }}</h2>
        <p v-if="!dashMsg">
          {{ $t("dashboard.dashMessage") }}
          <span>{{ $t("dashboard.dashMessageHighlight") }}</span>
        </p>
        <p v-else>
          {{ $t("dashboard.dashMessageViewOnly") }}
          <span>{{ $t("dashboard.dashMessageHighlightViewOnly") }}</span>
        </p>
      </div>
      <div>
        <img src="~/assets/images/neo_main.png" alt />
      </div>
      <div>
        <p v-if="!dashMsg">{{ $t("dashboard.dashMessageDefaultTag") }}</p>
        <p v-else>{{ $t("dashboard.dashMessageExploreTag") }}</p>
        <button @click="showRedirect = false; dashMsg = false; changeLocalStore()">{{ $t("buttonText.ok") }}</button>
      </div>
    </div>
    <thankyouComponent />
  </section>
  <div v-else class="main-loading">
    <div class="loading-container">
      <p>{{ $t("infoText.loading") }}</p>
      <div class="loader"></div>
    </div>
  </div>
</template>

<script  src="./index.js" type="javascript">
</script>


<style lang="scss" scoped>
.dashboard {

  .banner-wrapper .content-wrapper {
    padding-left: 2.5rem;
  }

  .banner-action-wrapper {
    display: flex;
    align-items: center;
    margin-top: 4.125rem;

    svg {
      margin-left: 0.5rem;
      display: block;
    }

    .text-wrapper {
      color: $banner-sub-heading-color;
      font-family: $main-font;
      font-style: normal;
      font-weight: bold;
      font-size: .75rem;
      line-height: 1;
    }
  }
}

.main-loading {
  height: calc(100vh - 3.75rem);
}

.video-player {
  width: 60vw;
}

.invite-input {
  p {
    text-align: center;
    font-size: 0.9rem;
  }
}

.playVideo {
  position: fixed;
  top: 0rem;
  left: 0rem;
  right: 0rem;
  bottom: 0rem;
  background: rgba(0, 0, 0, 0.7);
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  transform: scale(0);
  transition: all 0.5s ease-in-out;

  .popOver {
    margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .close-popup {
    position: absolute;
    right: -25px;
  }
}

.showPopUp {
  transform: scale(1);
  visibility: visible;
  z-index: 200;
  opacity: 1;
}

.explore-container {
  background: #e9e9e9;
  padding: 1.5625rem 1.125rem 0;
  position: relative;

  .arrow-left {
    position: absolute;
    left: 1.5625rem;
    top: calc(50% + 1.5625rem);
    transform: translateY(-50%);
    cursor: pointer;
  }

  .arrow-right {
    position: absolute;
    right: 1.5625rem;
    top: calc(50% + 1.5625rem);
    transform: translateY(-50%);
    cursor: pointer;
  }

  .card {
    .main-image {
      height: 8.4375rem;
    }
  }

  .explore-head-text {
    padding-left: 3rem;
    margin-bottom: 0px;
  }
}

.newUser-container {
  padding: 1.5625rem 3.125rem;
  display: grid;
  grid-template-columns: max-content 1fr max-content;

  @include respond(phone) {
    // width < 600px?
    grid-template-columns: 70% 1fr;
    grid-row-gap: 2rem;
  }

  @include respond(s-phone) {
    // width < 480px?
    grid-template-columns: 50% 1fr;
    grid-row-gap: 0rem;
    padding: 0px;
  }

  background: #ffffff;
  padding-bottom: 3.125rem;

  p {
    margin: 0px;
  }

  div:first-child {
    @include respond(phone) {
      // width < 900px?
      grid-row: 2/3;
      grid-column: 1/3;
    }

    img {
      height: 10.2rem;

      @include respond(phone) {
        // width < 900px?
        width: 100%;
        height: auto;
      }
    }

    p {
      margin-bottom: 0.625rem;

      @include respond(phone) {
        // width < 900px?
        display: none;
      }
    }

    .img-container {
      position: relative;
      cursor: pointer;
      padding: 0px;

      svg {
        position: absolute;
        top: 50%;
        height: 75px;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.2s ease-in-out;
      }

      &:hover {
        svg {
          height: 100px;
        }
      }
    }
  }

  div:nth-child(2) {
    @include respond(s-phone) {
      // width < 900px?
      padding: 1rem;
    }

    p {
      padding: 0.1rem 3.1875rem 0rem 1.5rem;
      font-size: 1.1rem;

      @include respond(s-phone) {
        // width < 900px?
        padding: 0rem;
        font-size: 0.8rem;
      }
    }

    .mobile-text {
      display: none;

      @include respond(phone) {
        // width < 900px?
        display: block;
      }

      @include respond(s-phone) {
        // width < 900px?
        padding-bottom: 1rem;
      }
    }
  }

  div:last-child {
    text-align: center;

    @include respond(s-phone) {
      // width < 900px?
      padding: 1rem;
    }

    p {
      position: relative;
      cursor: pointer !important;
      background: #e9beb3;
      border: 1px solid #e9beb3;
      color: black;
      box-shadow: 0px 17px 10px -10px rgba(0, 0, 0, 0.4);
      padding: 0.625rem 1rem;

      @include respond(s-phone) {
        // width < 900px?
        padding: 0.625rem;
        font-size: 0.8rem;
      }

      svg {
        margin-bottom: -0.0625rem;
        width: 1rem;
        margin-left: 0.2rem;
        height: 1rem;
      }
    }
  }
}

.cards-container {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  position: relative;
  scroll-behavior: smooth;
  margin: 0px 40px 0px 40px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0px;
  }

  .shadow-container {
    padding: 1.5rem 1.5rem 2rem 0;

    &:first-child {
      padding-left: 2rem;
    }
  }

  .card {
    box-shadow: 0rem 0.625rem 1.5625rem rgba(34, 32, 33, 0.25);
    display: flex;
    max-width: 200px;
    flex-direction: column;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    padding: 5px;
    background: white;

    .card-text {
      display: flex;
      padding: 0.625rem;
      align-items: center;
      height: 3.5rem;
      max-height: 2.3rem;
      overflow: hidden;

      p {
        font-size: 0.8rem;
        margin: 0rem;
        margin-left: 1.25rem;
      }
    }

    &:hover {
      transform: scale(1.1);
    }
  }
}

.assistance {
  .main-loading {
    height: 7rem !important;
  }

  .search-loading {
    height: 7rem !important;
    display: grid;
    place-items: center;

    img {
      width: 2rem;
    }
  }

  padding: 1.5625rem 3.125rem 0 3.125rem;

  &.no-community-content {
    padding: 1.5625rem 3.125rem 1.5625rem 3.125rem;
  }

  background: $color-white;
  color: black;

  @include respond(s-phone) {
    // width < 480px?
    padding: 1.5rem;
  }

  .new-project {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    width: max-content;
    border: 0.0625rem solid $border-1;
    padding: 0.75rem 0.9375rem;
    grid-gap: 1.25rem;

    cursor: pointer;

    &:hover {
      background: #f7e3df;
    }

    margin-bottom: 2.1875rem;

    p {
      margin: 0rem;
    }
  }

  h2 {
    font-size: 1rem;
    margin-bottom: 0.625rem;
  }

  .sub-text {
    font-size: 0.75rem;
    color: #a6a5a6;
  }

  .cards {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap: 3.125rem 0.9375rem;
    grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr));

    @include respond(phone) {
      // width < 900px?
      grid-template-columns: 1fr 1fr;
    }

    @include respond(s-phone) {
      // width < 900px?
      grid-template-columns: 1fr;
      grid-gap: 1rem;
    }

    .card {
      background: #fbf3f1;
      display: -ms-grid;

      // display: grid;
      .main-image {
        width: 100%;
        height: 13.4375rem;
        object-fit: cover;
      }

      .card-text {
        padding: 0.5rem 1rem;

        .card-text-head {
          display: grid;
          grid-template-columns: 1fr max-content;
          justify-content: space-between;

          p {
            margin: 0rem;
            max-width: 220px;
            overflow-wrap: break-word;
          }

          div {
            img:first-child {
              margin-right: 0.9375rem;
              @include rotate;
            }
          }
        }

        span {
          font-size: 0.4375rem;
          color: #868686;
        }
      }

      &:hover {
        box-shadow: 0rem 0.625rem 1.5625rem rgba(34, 32, 33, 0.25);
      }

      cursor: pointer;
    }

    .add-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: none;
      border: 1px solid #d48e8e;
      border-style: dashed;
      min-height: 16rem;

      p {
        margin: 1rem 0;
        color: #d48e8e;
        font-size: 1.125rem;
      }
    }
  }
}

.searchedUser {
  position: absolute;
  list-style: none;
  background: #292929;
  height: 50vh;
  overflow-y: auto;

  li {
    padding: 0.5rem 1rem;

    &:hover {
      background: #212121;
    }
  }
}

.show-redirect {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 100;
  background: white;

  div:first-child {
    background-image: url("~assets/images/backgrounds/Shape.svg");
    background-repeat: no-repeat;
    height: 45vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include respond(phone) {
      // width < 900px?
      background-position: top 100% right;
      background-size: cover;
    }

    @include respond(s-phone) {
      // width < 480px?
      background-position: unset;

      background-size: contain;
    }

    h2 {
      font-size: 2.5rem;
      color: white;
      margin-bottom: 2.5rem;
      text-align: center;
    }

    p {
      color: #3a393a;
      font-size: 1.9rem;
      width: 80vw;
      text-align: center;

      span {
        font-size: 1.9rem;
        font-weight: 600;
      }
    }
  }

  div:nth-child(2) {
    img {
      width: 100%;
    }
  }

  div:last-child {
    position: absolute;
    text-align: center;
    bottom: 0px;
    left: 0px;
    right: 0px;

    p {
      font-size: 14px;
    }

    button {
      background: #3a393a;
      font-size: 14px;
      margin-bottom: 24px;
      padding: 6px 20px;
      color: #ffffff;
      font-family: "Montserrat", sans-serif;
    }
  }
}

.video-tutorial {
  display: grid;
  grid-template-columns: 80% 20%;
  background: #e9e9e9;

  &.hide-demo {
    grid-template-columns: 80% 20%;
  }
}

.moodboard-video-tutorials {
  display: block;
}

.moodboard-templates-wrapper {
  .explore-container {
    background-color: #F3F3F3;
    padding: 1.25rem 2.625rem 1.5rem 2.625rem;

    .arrow-left {
      left: 0;
      top: 0;
      transform: none;
      height: 100%;
      width: 75px;
      background: linear-gradient(-270deg, #D9D9D9 31.09%, rgba(217, 217, 217, 0) 100%);
      z-index: 1;

      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        transform: rotate(180deg);
      }
    }

    .arrow-right {
      right: 0;
      top: 0;
      transform: none;
      height: 100%;
      width: 75px;
      background: linear-gradient(270deg, #D9D9D9 31.09%, rgba(217, 217, 217, 0) 100%);
      z-index: 1;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      .image-wrapper {
        position: relative;
        border-radius: 0px 0px 5.06187px 5.06187px;
        height: 116px;

        &:hover {
          .template-image-overlay {
            display: flex;
          }
        }

        .template-image-overlay {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: rgba($color: #000000, $alpha: 0.75);

          display: none;
          justify-content: center;
          align-items: center;

          .use-template-button {
            display: flex;
            align-items: center;
            padding: .875rem 1.375rem;
            border: 1px solid #FFFFFF;

            font-family: $main-font;
            font-style: normal;
            font-weight: 500;
            font-size: .75rem;
            line-height: .9375rem;
            color: #FFFFFF;
          }

        }

        .main-image {
          display: block;
          border-radius: 0px 0px 5.06187px 5.06187px;
          width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: center;
        }
      }
    }

    .explore-head-text {
      font-family: $main-font;
      font-style: normal;
      font-weight: 700;
      font-size: 1rem;
      line-height: 1.2rem;
      color: #3A393A;
      margin-bottom: 1.25rem;
      padding-left: 1.5rem;
    }

    .cards-container {
      margin: 0;

      .shadow-container {
        padding: 0 15px 15px 0;

        &:first-child {
          padding-left: 0;
        }
      }

      .card {
        box-sizing: border-box;
        box-shadow: none;
        width: 202px;
        padding: 0;
        max-width: 202px;

        .card-text {
          padding: 0.75 .9375rem 0.75rem .9375rem;
          font-family: $main-font;
          font-style: normal;
          font-weight: 500;
          font-size: 0.75rem;
          line-height: 1rem;
          color: $plan-title;
          margin: 0;

          p {
            font-size: 0.75rem;
            margin: 0rem;
          }
        }

        &:hover {
          transform: scale(1);
        }
      }
    }
  }
}

.image-svg {
  padding-top: 1.25rem;
  margin-left: 6.5rem;
  margin-top: 1.1875rem;
  padding-bottom: 10px;
}

.get-free-demo-desk-btn {
  cursor: pointer !important;
  background: #e9beb3;
  color: black;

  box-shadow: 0 17px 10px -10px rgba(0, 0, 0, 0.4);
  padding: 0.625rem 1.5rem;
  font-size: 0.8rem;
  width: max-content;
  margin: 0px;
  max-width: 100%;
  overflow-wrap: break-word;
  transition: all 200ms ease-in-out;
  border-radius: 0.2rem;
  @include background-animate(#464444, false);
}

.get-free-demo-desk-btn:hover {
  transform: scale(1.05);
  border-radius: 0.2rem;

  p {
    color: #e9beb3;
  }

  span {
    color: #e9beb3;
  }
}

.get-free-demo-desk-btn::after {
  border-radius: 0.2rem;
}

.cal-svg {
  width: 1rem;
  margin-left: 0.2rem;
  height: 1rem;
  margin-bottom: -2px;
}

.left-side-image {
  background: white;
  display: grid;
  justify-content: center;
  align-content: center;
  padding: 0rem 2.5rem;
}

.get-free-demo-desk-btn span {
  color: black;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.freeDemoImg {
  border-radius: 100%;
  justify-self: center;
  margin-bottom: 1rem;
}

.free-demo-popup-container {
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background: rgba(86, 86, 86, 0.65);
  z-index: 1000;
}

.free-demo-popup {
  background: #fbfcfd;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 70vw;
  display: grid;
  grid-template-columns: 1fr;
  place-content: center;
  justify-items: center;
  text-align: center;
  padding: 32px 20px 32px 20px;
}

.free-demo-popup-close {
  position: absolute;
  right: 0.5rem;
  width: 15px;

  path {
    stroke: black;
  }
}

.free-demo-iframe {
  height: 75vh;
  width: 70vw;
}

.options-menu-popup {
  position: absolute;
  right: 0rem;
  bottom: 2.5rem;
  width: 100%;

  .user-menu {
    cursor: pointer;

    .gap {
      background: $background-1;
      display: flex;

      div,
      a {
        cursor: pointer;
        padding: 0.75rem 0.9375rem;
        align-items: center;
        position: relative;
        z-index: 4;
        text-decoration: none;
        @include background-animate(#020202, false);

        p {
          color: black;
          margin-bottom: 0rem;
          font-size: 0.9rem;
        }
      }

      div {
        padding: 0.5rem 1.4rem;
        flex: 1;
      }
    }
  }
}

.optionsMenuIcon {
  position: relative;
}

.addFolder {
  background: #e9beb3;
  display: flex;
  place-content: center;
  place-items: center;
  flex-direction: column;
  margin-bottom: 10px;
  width: 150px;
  height: 30px;
  float: right;
  box-shadow: 0 17px 10px -10px rgba(0, 0, 0, 0.4);
  margin-bottom: 22px;
}

.addFolder:hover {
  cursor: pointer;
}

.folderIcon {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.folderIcon img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.folderTitle {
  margin: 0px;
  padding: 0px;
  margin-left: 8px;
  font-size: 1rem;
  color: black;
  font-weight: 500;
}

.search-grid {
  grid-template-rows: none !important;
}

.bc-grid {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  padding: 1.5625rem 3.125rem;
  padding-bottom: 0;
  row-gap: 1rem;

  .create-folder-btn {
    grid-row: 1/2;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1.25rem max-content;
    grid-auto-columns: 10rem;
    width: max-content;
    border: 0.0625rem solid #e9beb3;
    padding: 0.5rem 2rem;
    grid-gap: 0.3rem;
    @include background-animate(#fbf3f1, false);

    &:hover {
      transform: scale(1.05);
    }

    p {
      margin: 0;
    }
  }

  .breadCrumbs {
    grid-row: 2/2;
    display: flex;
    align-items: center;

    span {
      margin-right: 0.1875rem;
    }

    h2 {
      margin: 0;

      &:hover {
        cursor: pointer;
      }
    }

    p {
      margin-right: 6px;
      margin: 0;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .dashboard-search {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr max-content;
    justify-self: end;
    border: 1px solid #e9beb3;
    padding: 0.2rem 0.5rem;

    input {
      width: 100%;
      border-collapse: collapse;
      background: white;
      width: 18rem;

      &:focus {
        border: none;
      }
    }

    svg {
      margin-right: 1rem;
    }
  }
}

.filter-tabs {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  column-gap: 2rem;
  padding: 1.5625rem 3.125rem;
  padding-bottom: 0;
  align-items: center;

  p {
    margin: 0;
    padding-bottom: 0.8rem;
    cursor: pointer;
    font-size: 1rem;
    line-height: 0.9375rem;
    color: #292929;

    span {
      background: #f7e3df;
      border-radius: 50%;
      margin-left: 1rem;
      padding: 0.25rem 0.5rem;
    }
  }

  .active {
    border-bottom: 1px solid #e9beb3;
    border-spacing: 1rem;
    font-weight: bold;
  }
}

.no-data {
  text-align: center;
}

.free-demo-section {
  box-shadow: 0rem 0.625rem 1.5625rem rgba(34, 32, 33, 0.25);
  display: flex;
  max-width: 15rem;
  max-height: 15rem;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  margin-top: 1.625rem;
  cursor: pointer;
  background: white;
  margin-left: 2.375rem;
  justify-content: center;

  .get-free-demo-desk-btn {
    cursor: pointer !important;
    color: black;
    box-shadow: 0 17px 10px -10px rgba(0, 0, 0, 0.4);
    padding: 0.625rem 1.5rem;
    font-size: 0.8rem;
    width: max-content;
    margin: 0px;
    word-wrap: break-word;
    transition: all 200ms ease-in-out;
    border-radius: 0.2rem;
    align-self: center;

    &:hover {
      color: #e9beb3;
    }
  }

  img {
    width: 9rem;
    border-radius: 100%;
    align-self: center;
    margin: 0.625rem 0;
  }

  p {
    background: #fbf3f1;
  }
}

.upgrade-cta {
  padding: .8125rem * 1.22;
  margin: 1.25rem * 1.22 1.5rem * 1.22;
  display: flex;
  flex-direction: column;
  border: 1px solid $color-dark-rose-gold-3;
  background:$color-white;
  box-shadow:0px 0px 2px 0px rgba(40,41,61,0.04),0px 4px 8px 0px rgba(96,97,112,0.16);
  max-width: 15rem;

  .offer-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;

    .bg-element {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    .offer-prompt {
      position: relative;
      width: 100%;
      background: $background-10;
      color: $color-dark-gray;
      text-align:center;
      font-size:10px;
      font-style:normal;
      font-weight:500;
      line-height:normal;
      padding: .1875rem * 1.22;
    }

    .offer {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;

      .offer-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        color: $color-dark-gray;
        text-align:center;
        font-size:1.375rem * 1.22;
        font-style:normal;
        font-weight:700;
        line-height:100%;
      }
    }
  }

  .action {
    width: 100%;
    margin-top: .625rem;
    display: flex;
    padding: .75rem * 1.22 1rem * 1.22;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    background: $background-4;

    color: $background-10;
    text-align:center;
    font-size:.75rem * 1.22;
    font-style:normal;
    font-weight:500;
    line-height:normal;
    cursor: pointer;
  }
}

.welcome-popup {
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  -webkit-animation-delay: 350ms;
  animation-fill-mode: forwards;
  padding: 2.8125rem 7.6875rem;

  .close-popup svg {
    background: white;
  }

  background: white;

  .popup-head {
    display: grid;
    justify-items: center;

    svg {
      height: 8rem;
      margin-bottom: 1.5rem;
      margin-top: 1.2rem;
    }
  }

  .wel-pop-title {
    font-weight: 500;
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
    padding-top: 3rem;
    color: #c27272;
    mix-blend-mode: normal;
  }

  .wel-pop-sub-title {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.375rem;
    padding-top: 1rem;
    color: #292929;
  }

  .popup-background {
    margin: 0;
    height: 31rem !important;
    position: absolute;
    bottom: 0;
    z-index: -1;
    opacity: 0.06;
    padding-right: 16rem;
  }

  .wel-cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 5rem;
    align-items: end;
    padding-top: 4rem;

    .wel-card {
      width: 27rem;
      padding-bottom: 4rem;

      .wel-card-img {
        background: #fbf3f1;
        display: grid;
        grid-template-rows: 13rem max-content;
        justify-items: center;

        img {
          width: 15rem;
        }

        p {
          font-weight: 600;
          font-size: 1.125rem;
          line-height: 1.625rem;
          margin: 0;
          padding-bottom: 1rem;
          color: black;
        }
      }

      .wel-card-desc {
        display: grid;
        justify-items: center;
        padding-top: 0.5rem;
        font-size: 0.8125rem;
        line-height: 2.25rem;
        border: 2px solid #ffece8;
        box-sizing: border-box;

        .bg-pattern,
        .bg-pattern-second {
          margin-top: -7.5rem;
          width: 12rem;
        }

        .bg-pattern {
          margin-left: 10.3rem;
        }

        .bg-pattern-second {
          margin-right: 10.3rem;
        }

        p {
          font-size: 1rem;
          line-height: 2.25rem;
          margin: 0;
          color: #3a393a;
        }

        button {
          width: 9.5rem;
          height: 2.25rem;
          background: #f7e3df;
          margin: 1rem 0;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 1.25rem;
          cursor: pointer;
          color: #4d4c4d;
          border: 0.0625rem solid #4d4c4d;
          margin-bottom: 0.9375rem;
          position: relative;
          z-index: 1;
          @include background-animate(#4d4c4d, #f7e3df);
        }
      }
    }

    .wel-card-item {
      display: grid;
      justify-items: center;

      p:nth-child(2) {
        font-weight: 300;
        font-size: 1.5rem;
        line-height: 2rem;
        width: 13rem;
        color: #000000;
      }

      p:nth-child(3) {
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 1.5rem;
        color: #000000;
      }

      img {
        height: 9.3rem;
        padding-bottom: 1.2rem;
      }
    }
  }

  button {
    width: 16rem;
    height: 3rem;
    background: #3a393a;
    margin: 4rem 0;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.25rem;
    cursor: pointer;
    color: white;
    // border: 0.0625rem solid #4d4c4d;
    margin-bottom: 0.9375rem;
    position: relative;
    z-index: 1;
    font-family: montserrat;
    @include background-animate(#c27272, white);
  }
}

.welcome-popup-home-owner {
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  -webkit-animation-delay: 350ms;
  animation-fill-mode: forwards;

  background: $background-white-9;
  display: flex;
  padding: 2rem * 1.22;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .bg-element {
    position: absolute;
    left: 0;
    bottom: 0;
    max-width: 100%;
  }

  .close-popup {
    right: 0;
    transform: translateX(calc(100% + 0.5rem * 1.22));
    width: 2rem * 1.22;
    height: 2rem * 1.22;

    svg {
      padding: 0;
      height: 100%;
      width: 100%;
      border-radius: 500px;
    }
  }

  .header {
    position: relative;
    color: $color-dark-gray-2;
    text-align:center;
    font-size:1.5rem * 1.22;
    font-style:normal;
    font-weight:600;
    line-height:2rem * 1.22;
    margin-bottom: .5rem * 1.22;
  }

  .subheader {
    position: relative;
    color: $color-light-gray-2;
    text-align:center;
    font-size:.875rem * 1.22;
    font-style:normal;
    font-weight:400;
    line-height:1.5rem * 1.22;
    margin-bottom: 1.5rem * 1.22;
    max-width: 22.5rem * 1.22;
  }

  .startup-options-wrapper {
    position: relative;
    width: 100%;
    max-width: 22.5rem * 1.22;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem * 1.22;
    margin-bottom: 1.5rem * 1.22;

    .option {
      cursor: pointer;
      width: 100%;
      padding: 1rem * 1.22;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid $border-21;
      background:$background-white-9;
      box-shadow:0px 4px 12px 0px rgba(0,0,0,0.06);

      &.selected {
        .radio-button-wrapper {
          svg {
            circle {
              stroke: $background-10;
            }

            circle:last-child {
              stroke: transparent;
              fill: $background-10;
            }
          }
        }
      }

      .radio-button-wrapper {
        margin-right: 0.5rem * 1.22;
        svg {
          display: block;
          height: 1.5rem * 1.22;
          width: 1.5rem * 1.22;

          circle {
            stroke: $background-33;
          }

          circle:last-child {
            stroke: transparent;
            fill: transparent;
          }
        }
      }

      .option-details {
        margin-right: 0.5rem * 1.22;
        .name {
          color: $color-dark-gray-2;
          font-size:1rem * 1.22;
          font-style:normal;
          font-weight:500;
          line-height:1.5rem * 1.22;
        }

        .sub-text {
          color: $color-light-gray-2;
          font-size:.75rem * 1.22;
          font-style:normal;
          font-weight:400;
          line-height:1.5rem * 1.22;
        }
      }

      .image-wrapper {
        width: 4.5rem * 1.22;
        height: 4.5rem * 1.22;
        flex-shrink: 0;

        img {
          display: block;
          height: 100%;
          width: 100%;
        }
      }
    }

  }

  .popup-actions {
    position: relative;
    button {
      cursor: pointer;
      display: flex;
      padding: .75rem * 1.22 1.25rem * 1.22;
      justify-content: center;
      align-items: center;
      gap: .625rem * 1.22;
      border: 1px solid #E9BEB3;
      background:var(--Primary-Rose-Gold-Rose-Gold-0,#E9BEB3);

      color: var(--Dark-Dark-0, #0E0E0E);
      text-align:center;
      font-size:.875rem * 1.22;
      font-style:normal;
      font-weight:500;
      line-height:1.5rem * 1.22;
    }
  }
}

/*=== FADE IN  ===*/
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;

  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.stop-scale {
  transition: none;
}

.creat-project-title {
  margin: 0 !important;
  font-size: 1.55rem !important;
  text-align: initial !important;
}

.creat-project-input {
  width: 17.75rem !important;
}
</style>

<style lang="scss">
.dashboard {
  .request-floor-plan {
    // background: $background-15;
    background: #FAF0EC;
    max-width: 65.4375rem * 1.22;
    margin: 0 auto;
    margin-top: 2rem * 1.22;

    .content-wrapper {
      padding-left: 1.8125rem * 1.22;
    }

    .banner-content-wrapper {
      background-image: url('~assets/images/dashboard/render-design-banner-bg.png');
      background-size: contain;
    }

    .heading {
      color: $color-dark-gray;
      font-size: 2.125rem * 1.22;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      position: relative;
      margin-top: 0;
      width: 75%;

      span {
        font-size: inherit;
        // background: linear-gradient(90deg, #F08E58 0.01%, #EF5D68 54.41%);
        // background-clip: text;
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
      }
      .highlight {
        font-size: inherit;
        background: linear-gradient(90deg, #F08E58 0.01%, #EF5D68 54.41%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .subheading {
      color: $color-second-1;
      font-size: .875rem * 1.22;
      font-style: normal;
      font-weight: 500;
      line-height: 165%;
      margin-bottom: 1.4375rem * 1.22;
      margin-top: .75rem * 1.22;
      width: 75%;
    }

    .image-wrapper {
      width: 13.875rem * 1.22;
      height: 14.6845rem * 1.22;
      margin-top: .9375rem * 1.22;
      margin-right: 7.3125rem * 1.22;
      margin-bottom: 0;
      flex-shrink: 0;
      display: flex;
    }

    .banner-action-wrapper {
      margin-top: 1.625rem;

      button {
        background: linear-gradient(92.01deg, #F08F58 0%, #EF5D68 94.43%);
        border-radius: 4px;
        padding: .4375rem * 1.22 2.625rem * 1.22;

        font-size: .875rem * 1.22;
        font-style: normal;
        font-weight: 500;
        line-height: 157.143%;
      }
    }

  }

  .moodboard-banner {
    background: $border-2;

    .content-wrapper {
      background: $border-2;
      padding-left: 3.5rem;
      ;
    }

    .heading {
      width: 100%;
      font-weight: 700;
      font-size: 2.8rem;
      display: flex;
      position: relative;
      margin-top: 0;
    }

    .subheading {
      margin-top: 0.75rem;
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.5rem;
      width: 90%;
    }

    .image-wrapper {
      width: 38.5rem;
      margin: 0 0 0 0;
      flex-shrink: 0;
    }

    .banner-action-wrapper {
      margin-top: 1.25rem * 1.22;
      margin-bottom: 1rem;

      button {
        background: linear-gradient(267.06deg, #854A35 -68.96%, #FF985B 182.53%);
        ;
        border-radius: 4px;
      }
    }

  }

  .design-challenge-banner {
    background: linear-gradient(90deg, $border-2 75%, $banner-secondary 25%);
    margin-bottom: 2rem;

    .content-wrapper {
      padding-left: 2.5rem;
    }
  }
}
</style>

<template>
    <div class="render-again-component">
        <fullScreenLoader v-show="fullScreenShow" :message="'loading'" ></fullScreenLoader>
        <h1 class="render-again-header">Render Again</h1>
        <p class="sub-head">Current Resolution is {{render.input.width > 3000?'4K':render.input.width > 1900?'2K':render.input.width > 900?'1K':'HD'}}</p>
        <div class="credits-container">
            <p>Credits Required Per Render: <span>{{resolution == 1?1:3}}</span></p>
            <p>Available Credits: <span>{{totalCredit}}</span></p>
        </div>
        <div class="render-again-setting-container">
            <div class="resolution">
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3502 13.1381C16.1738 13.1381 16.031 13.2816 16.031 13.4588V13.7796H15.7118C15.5354 13.7796 15.3926 13.9232 15.3926 14.1004C15.3926 14.2775 15.5354 14.4211 15.7118 14.4211H16.3502C16.5265 14.4211 16.6693 14.2775 16.6693 14.1004V13.4588C16.6693 13.2816 16.5265 13.1381 16.3502 13.1381Z" fill="white"/>
                    <path d="M13.0409 14.4213H14.3756C14.5519 14.4213 14.6948 14.2777 14.6948 14.1005C14.6948 13.9234 14.5519 13.7798 14.3756 13.7798H13.0409C12.8645 13.7798 12.7217 13.9234 12.7217 14.1005C12.7217 14.2777 12.8645 14.4213 13.0409 14.4213Z" fill="white"/>
                    <path d="M0.389504 1.70456C0.565828 1.70456 0.708695 1.56099 0.708695 1.3838V1.06304H1.02789C1.20421 1.06304 1.34708 0.919465 1.34708 0.742272C1.34708 0.56508 1.20421 0.421509 1.02789 0.421509H0.389504C0.21318 0.421509 0.0703125 0.56508 0.0703125 0.742272V1.3838C0.0703125 1.56099 0.21318 1.70456 0.389504 1.70456Z" fill="white"/>
                    <path d="M3.6969 1.06304C3.87323 1.06304 4.01609 0.919465 4.01609 0.742272C4.01609 0.56508 3.87323 0.421509 3.6969 0.421509H2.36216C2.18584 0.421509 2.04297 0.56508 2.04297 0.742272C2.04297 0.919465 2.18584 1.06304 2.36216 1.06304H3.6969Z" fill="white"/>
                    <path d="M9.03675 1.06304C9.21307 1.06304 9.35594 0.919465 9.35594 0.742272C9.35594 0.56508 9.21307 0.421509 9.03675 0.421509H7.702C7.52568 0.421509 7.38281 0.56508 7.38281 0.742272C7.38281 0.919465 7.52568 1.06304 7.702 1.06304H9.03675Z" fill="white"/>
                    <path d="M6.36682 1.06304C6.54315 1.06304 6.68602 0.919465 6.68602 0.742272C6.68602 0.56508 6.54315 0.421509 6.36682 0.421509H5.03208C4.85576 0.421509 4.71289 0.56508 4.71289 0.742272C4.71289 0.919465 4.85576 1.06304 5.03208 1.06304H6.36682Z" fill="white"/>
                    <path d="M11.7067 1.06304C11.883 1.06304 12.0259 0.919465 12.0259 0.742272C12.0259 0.56508 11.883 0.421509 11.7067 0.421509H10.3719C10.1956 0.421509 10.0527 0.56508 10.0527 0.742272C10.0527 0.919465 10.1956 1.06304 10.3719 1.06304H11.7067Z" fill="white"/>
                    <path d="M13.0409 1.06304H14.3756C14.5519 1.06304 14.6948 0.919465 14.6948 0.742272C14.6948 0.56508 14.5519 0.421509 14.3756 0.421509H13.0409C12.8645 0.421509 12.7217 0.56508 12.7217 0.742272C12.7217 0.919465 12.8645 1.06304 13.0409 1.06304Z" fill="white"/>
                    <path d="M16.3502 0.421509H15.7118C15.5354 0.421509 15.3926 0.56508 15.3926 0.742272C15.3926 0.919465 15.5354 1.06304 15.7118 1.06304H16.031V1.3838C16.031 1.56099 16.1738 1.70456 16.3502 1.70456C16.5265 1.70456 16.6693 1.56099 16.6693 1.3838V0.742272C16.6693 0.56508 16.5265 0.421509 16.3502 0.421509Z" fill="white"/>
                    <path d="M16.3485 7.77185C16.1722 7.77185 16.0293 7.91542 16.0293 8.09261V9.43425C16.0293 9.61144 16.1722 9.75501 16.3485 9.75501C16.5248 9.75501 16.6677 9.61144 16.6677 9.43425V8.09261C16.6677 7.91542 16.5248 7.77185 16.3485 7.77185Z" fill="white"/>
                    <path d="M16.3485 5.08789C16.1722 5.08789 16.0293 5.23146 16.0293 5.40865V6.75029C16.0293 6.92748 16.1722 7.07105 16.3485 7.07105C16.5248 7.07105 16.6677 6.92748 16.6677 6.75029V5.40865C16.6677 5.23146 16.5248 5.08789 16.3485 5.08789Z" fill="white"/>
                    <path d="M16.3485 10.455C16.1722 10.455 16.0293 10.5985 16.0293 10.7757V12.1174C16.0293 12.2945 16.1722 12.4381 16.3485 12.4381C16.5248 12.4381 16.6677 12.2945 16.6677 12.1174V10.7757C16.6677 10.5985 16.5248 10.455 16.3485 10.455Z" fill="white"/>
                    <path d="M16.3485 2.40479C16.1722 2.40479 16.0293 2.54836 16.0293 2.72555V4.06718C16.0293 4.24437 16.1722 4.38794 16.3485 4.38794C16.5248 4.38794 16.6677 4.24437 16.6677 4.06718V2.72555C16.6677 2.54836 16.5248 2.40479 16.3485 2.40479Z" fill="white"/>
                    <path d="M0.389504 14.4215H1.02789H2.36273H3.69748H5.03232H6.36706H7.70191H9.03665H10.3715H11.7062H11.8487C12.025 14.4215 12.1679 14.2779 12.1679 14.1007V4.50937C12.1679 4.33218 12.025 4.1886 11.8487 4.1886H0.684745C0.69998 4.15116 0.708695 4.11033 0.708695 4.06738V2.72575C0.708695 2.54855 0.565828 2.40498 0.389504 2.40498C0.21318 2.40498 0.0703125 2.54855 0.0703125 2.72575V4.06738C0.0703125 4.15325 0.104341 4.23081 0.158994 4.28837C0.104341 4.34593 0.0703125 4.4235 0.0703125 4.50937V5.40911V6.75075V8.09248V9.43411V10.7759V12.1175V13.4592V14.1007C0.0703125 14.2779 0.21318 14.4215 0.389504 14.4215ZM0.708695 4.83013H11.5295V13.78H10.3715H9.03665H7.70191H6.36706H5.03232H3.69748H2.36273H1.02789H0.708695V13.4592V12.1175V10.7759V9.43411V8.09248V6.75075V5.40911V4.83013Z" fill="white"/>
                    <path d="M1.34557 12.9748C1.34703 12.9845 1.34855 12.9941 1.35085 13.0035C1.35337 13.0139 1.35672 13.0239 1.36028 13.034C1.36381 13.0441 1.36746 13.0539 1.37191 13.0634C1.37603 13.0722 1.38084 13.0806 1.38582 13.0891C1.39173 13.0992 1.39789 13.109 1.40482 13.1183C1.4074 13.1218 1.40906 13.1256 1.41179 13.129C1.41468 13.1326 1.41838 13.1351 1.4214 13.1385C1.4312 13.1497 1.44171 13.16 1.45297 13.1697C1.45937 13.1752 1.46561 13.1808 1.47236 13.1858C1.48417 13.1944 1.49678 13.2017 1.50974 13.2088C1.51649 13.2124 1.5229 13.2166 1.52986 13.2197C1.54508 13.2266 1.56116 13.2316 1.57754 13.236C1.58273 13.2374 1.58766 13.2396 1.59292 13.2408C1.61458 13.2454 1.63696 13.2481 1.66001 13.2481H3.14801C3.32434 13.2481 3.4672 13.1046 3.4672 12.9274C3.4672 12.7502 3.32434 12.6066 3.14801 12.6066H2.56253L10.2581 6.3547V7.17828C10.2581 7.35547 10.401 7.49904 10.5773 7.49904C10.7536 7.49904 10.8965 7.35547 10.8965 7.17828V5.68295C10.8965 5.67853 10.8954 5.67444 10.8952 5.67006C10.8948 5.65847 10.8935 5.64705 10.8917 5.63553C10.8903 5.62581 10.8888 5.61621 10.8865 5.60679C10.884 5.59644 10.8806 5.58641 10.877 5.57629C10.8735 5.56628 10.8699 5.55646 10.8654 5.54695C10.8613 5.53815 10.8565 5.52969 10.8515 5.52118C10.8456 5.51109 10.8394 5.50134 10.8325 5.49201C10.8299 5.48855 10.8283 5.48471 10.8255 5.48132C10.8222 5.47717 10.8181 5.47414 10.8146 5.4702C10.807 5.46161 10.799 5.45348 10.7905 5.44577C10.7831 5.43899 10.7755 5.43269 10.7676 5.42674C10.7591 5.42038 10.7504 5.41457 10.7413 5.40908C10.7326 5.40379 10.7238 5.3989 10.7147 5.39453C10.7052 5.38998 10.6956 5.38605 10.6857 5.38244C10.6761 5.37895 10.6665 5.3759 10.6566 5.37336C10.6466 5.37077 10.6366 5.36875 10.6262 5.36713C10.6154 5.36543 10.6047 5.3644 10.5937 5.36384C10.5882 5.36355 10.5829 5.36218 10.5773 5.36218H9.08931C8.91299 5.36218 8.77012 5.50575 8.77012 5.68295C8.77012 5.86014 8.91299 6.00371 9.08931 6.00371H9.67479L1.9792 12.2556V11.4321C1.9792 11.2549 1.83634 11.1113 1.66001 11.1113C1.48369 11.1113 1.34082 11.2549 1.34082 11.4321V12.9274C1.34082 12.9318 1.34194 12.9359 1.34211 12.9403C1.34256 12.9519 1.34386 12.9633 1.34557 12.9748Z" fill="white"/>
                </svg>
                <p>Resolution</p>
            </div>
            <div class="resolution-options">
                <p :class="{'active': resolution === 1}" @click="resolution = 1">HD</p>
                <p :class="{'active': resolution === 2}" @click="resolution=2">2K</p>
                <p :class="{'active': resolution === 4}" @click="resolution=4">4K</p>

            </div>
           
            <div class="lighting">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.47005 8.57598C2.44645 8.38588 2.34956 8.21251 2.20004 8.09278C2.05051 7.97305 1.86014 7.91642 1.66949 7.93496H0.868922C0.678117 7.91567 0.487363 7.97202 0.337663 8.09189C0.187962 8.21176 0.0912664 8.38557 0.0683594 8.57598C0.0919503 8.76586 0.188938 8.93897 0.338562 9.05824C0.488185 9.17752 0.678555 9.23348 0.868922 9.21415H1.66949C1.85971 9.23274 2.04969 9.1765 2.19914 9.05736C2.3486 8.93822 2.44577 8.76556 2.47005 8.57598Z" fill="white"/>
                    <path d="M2.73698 13.0002L2.16719 13.57C2.01911 13.6911 1.92429 13.8653 1.90299 14.0553C1.8817 14.2454 1.93562 14.4363 2.05323 14.5871C2.20406 14.7047 2.39492 14.7586 2.58499 14.7373C2.77506 14.716 2.94925 14.6212 3.07031 14.4731L3.64011 13.9033C3.78837 13.7818 3.88327 13.6071 3.90456 13.4165C3.92585 13.226 3.87185 13.0347 3.75407 12.8834C3.60289 12.7661 3.41181 12.7127 3.22172 12.7345C3.03163 12.7563 2.85764 12.8517 2.73698 13.0002Z" fill="white"/>
                    <path d="M2.73528 4.14858C2.85634 4.29665 3.03053 4.39148 3.2206 4.41278C3.41068 4.43407 3.60154 4.38015 3.75236 4.26254C3.86927 4.11144 3.92275 3.92076 3.90148 3.73091C3.88021 3.54105 3.78585 3.36694 3.6384 3.24546L3.06861 2.67566C2.94713 2.52821 2.77301 2.43386 2.58316 2.41259C2.3933 2.39131 2.20262 2.4448 2.05152 2.5617C1.93375 2.71299 1.87974 2.90431 1.90103 3.09485C1.92232 3.28539 2.01722 3.46007 2.16548 3.58164L2.73528 4.14858Z" fill="white"/>
                    <path d="M13.3973 4.14857L13.9671 3.57878C14.1146 3.4573 14.2089 3.28318 14.2302 3.09333C14.2515 2.90347 14.198 2.71279 14.0811 2.56169C13.9303 2.44408 13.7394 2.39016 13.5493 2.41146C13.3593 2.43275 13.1851 2.52758 13.064 2.67565L12.4942 3.24545C12.3468 3.36693 12.2524 3.54104 12.2311 3.7309C12.2099 3.92075 12.2633 4.11143 12.3803 4.26253C12.5314 4.37944 12.722 4.43292 12.9119 4.41165C13.1017 4.39038 13.2759 4.29602 13.3973 4.14857Z" fill="white"/>
                    <path d="M8.06758 2.97762C8.25747 2.95403 8.43058 2.85704 8.54985 2.70741C8.66912 2.55779 8.72508 2.36742 8.70576 2.17705V1.37649C8.72508 1.18612 8.66912 0.995754 8.54985 0.84613C8.43058 0.696506 8.25747 0.599519 8.06758 0.575928C7.87718 0.598835 7.70336 0.695531 7.5835 0.845231C7.46363 0.994932 7.40728 1.18569 7.42656 1.37649V2.17705C7.40728 2.36786 7.46363 2.55861 7.5835 2.70831C7.70336 2.85801 7.87718 2.95471 8.06758 2.97762Z" fill="white"/>
                    <path d="M13.4002 13.0031C13.3476 12.9202 13.2771 12.8501 13.1939 12.7981C13.1107 12.7461 13.0168 12.7135 12.9193 12.7026C12.8218 12.6917 12.723 12.7029 12.6304 12.7353C12.5377 12.7677 12.4536 12.8205 12.3841 12.8898C12.3146 12.959 12.2615 13.0431 12.2288 13.1356C12.1961 13.2281 12.1846 13.3268 12.1952 13.4244C12.2058 13.522 12.2381 13.6159 12.2899 13.6993C12.3416 13.7827 12.4115 13.8534 12.4942 13.9062L13.064 14.476C13.1163 14.5595 13.1867 14.6301 13.2701 14.6827C13.3534 14.7352 13.4476 14.7682 13.5455 14.7793C13.6434 14.7904 13.7425 14.7793 13.8355 14.7468C13.9285 14.7143 14.013 14.6613 14.0827 14.5916C14.1524 14.5219 14.2054 14.4374 14.2379 14.3444C14.2704 14.2514 14.2816 14.1523 14.2704 14.0544C14.2593 13.9565 14.2263 13.8623 14.1738 13.779C14.1213 13.6956 14.0506 13.6252 13.9671 13.5729L13.4002 13.0031Z" fill="white"/>
                    <path d="M15.2676 7.93496H14.4842C14.2934 7.91567 14.1026 7.97202 13.9529 8.09189C13.8032 8.21176 13.7065 8.38557 13.6836 8.57598C13.7072 8.76586 13.8042 8.93897 13.9538 9.05824C14.1034 9.17752 14.2938 9.23348 14.4842 9.21415H15.2676C15.458 9.23348 15.6484 9.17752 15.798 9.05824C15.9476 8.93897 16.0446 8.76586 16.0682 8.57598C16.0446 8.38588 15.9477 8.21251 15.7982 8.09278C15.6486 7.97305 15.4583 7.91642 15.2676 7.93496Z" fill="white"/>
                    <path d="M8.06875 4.17696C7.19874 4.17696 6.34828 4.43495 5.62489 4.9183C4.90151 5.40165 4.3377 6.08865 4.00476 6.89243C3.67183 7.69621 3.58472 8.58067 3.75445 9.43396C3.92418 10.2872 4.34312 11.071 4.95831 11.6862C5.5735 12.3014 6.35729 12.7204 7.21058 12.8901C8.06387 13.0598 8.94832 12.9727 9.7521 12.6398C10.5559 12.3068 11.2429 11.743 11.7262 11.0196C12.2096 10.2963 12.4676 9.44579 12.4676 8.57579C12.4695 7.9976 12.357 7.42475 12.1366 6.89021C11.9162 6.35567 11.5922 5.87 11.1834 5.46115C10.7745 5.05231 10.2889 4.72837 9.75433 4.50797C9.21979 4.28758 8.64694 4.17508 8.06875 4.17696ZM8.06875 11.7752C7.22021 11.7752 6.40643 11.4381 5.80643 10.8381C5.20642 10.2381 4.86934 9.42432 4.86934 8.57579C4.86934 7.72725 5.20642 6.91347 5.80643 6.31347C6.40643 5.71346 7.22021 5.37638 8.06875 5.37638V11.7752Z" fill="white"/>
                    <path d="M8.06758 14.1742C7.87718 14.1971 7.70336 14.2938 7.5835 14.4435C7.46363 14.5932 7.40728 14.784 7.42656 14.9748V15.7754C7.40728 15.9662 7.46363 16.1569 7.5835 16.3066C7.70336 16.4563 7.87718 16.553 8.06758 16.5759C8.25747 16.5523 8.43058 16.4554 8.54985 16.3057C8.66912 16.1561 8.72508 15.9657 8.70576 15.7754V14.9748C8.72508 14.7844 8.66912 14.5941 8.54985 14.4444C8.43058 14.2948 8.25747 14.1978 8.06758 14.1742Z" fill="white"/>
                </svg>
                <p>Lighting</p>
            </div>
            <div class="env-light-main-container">

            
              <div class="lighting-options">
                <div class="options-timing day-eve-night-container">
                    <p :class="{'activeTime':lightSetting['time'] == 'day'}" @click="onTimeValueChange('day')">Day</p>
                    <p :class="{'activeTime':lightSetting['time'] == 'evening'}" @click="onTimeValueChange('evening')">Evening</p>
                    <p :class="{'activeTime':lightSetting['time'] == 'night'}" @click="onTimeValueChange('night')">Night</p>
                </div>
                <div class="presets-container">
                  <p>Presets</p>
                  <div class="presets-cards cards-container">
                    <div class="preset-card card-main" v-for="(item, index) in lightMenuData[lightSetting['time']].presets" :key="index" @click="onPresetValueChange(index)">
                      <img :src="item.image" :style="{'border':lightSetting['preset'] == index?'1px solid #E9BEB3':'none'}" alt="" >
                      <p v-html="item.name" ></p>
                    </div>
                  </div>
                </div>
                <div class="interior-light-container">
                  <div class="image-container">
                      <img :src="lightMenuData[lightSetting['time']].interior[lightSetting['interior']].image" alt="">
                  </div>
                  <div class="interior-slider-container">
                    <p>Interior Lighting</p>
                    <div>
                      <div class="slider-runner-interior">
                        <div class="slider-steps" :style="{'left':(index/(lightMenuData[lightSetting['time']].interior.length - 1))*100+'%'}" v-for="(item, index) in lightMenuData[lightSetting['time']].interior" @click.stop="onInteriorLightValueChange(index)" :key="index">
                          <span></span>
                          <p v-html="item.name"></p>
                        </div>
                        <div class="slider-active-runner" :style="{'width':(lightSetting['interior']/(lightMenuData[lightSetting['time']].interior.length - 1))*100+'%'}">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="environment-container">
                  <p>Environment</p>
                  <div class="evn-cards cards-container">
                    <div class="env-card card-main" :id="'env-card-' + index"  v-for="(item, index) in lightMenuData[lightSetting['time']].environment" @click.stop="onEnvironmentValueChange(index)" :key="index">
                      <img :style="{'border':lightSetting['environment'] == index?'1px solid #E9BEB3':'none'}" :src="item.image" alt="" >
                      <p v-html="item.name" ></p>
                    </div>
                    
                  </div>
                  
                </div>
              <!-- <div class="env-rotate-container" id="env-rotate-container" v-show="showRotate" >
                <span>Rotate</span>
                <input type="text" name="" v-model="envRotate" id="">
                <label for="env-rotate-slider">
                  <div class="custom-slider-track" :style="{ 'width':  calculateWidth('env-rotate-slider')}"></div>
                  <input type="range"     
                  v-model="envRotate" name="" 
                  id="env-rotate-slider" 
                  min="0" max="360" step="1">        
                </label>
                <span>0 <sup>&#176;</sup></span>
                <span>360 <sup>&#176;</sup></span>
              </div> -->
                  <!-- <div class="intensity-option">
                      <p>Interior Lighting</p>
                      <p @click.stop="intensity = 'Low'">  
                          <svg v-if="intensity =='Low'"  width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="5.43164" cy="5.58905" r="4.5" fill="#222021" stroke="#E9BEB3"/>
                              <circle cx="5.43164" cy="5.58905" r="3" fill="#E9BEB3"/>
                          </svg>
                          <svg v-else  width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="5.28516" cy="5.58905" r="4.5" fill="#222021" stroke="white"/>
                          </svg>
                          Low Intensity
                      </p>
                      <p @click.stop="intensity = 'High'">
                          <svg v-if="intensity =='High'" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="5.43164" cy="5.58905" r="4.5" fill="#222021" stroke="#E9BEB3"/>
                              <circle cx="5.43164" cy="5.58905" r="3" fill="#E9BEB3"/>
                          </svg>
                          <svg v-else width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="5.28516" cy="5.58905" r="4.5" fill="#222021" stroke="white"/>
                          </svg>
                          High Intensity
                      </p>
                  </div> -->
                  <!-- <div class="light-intensity-container">
                      <img :class="{'active': balance === 'White'}" @click.stop="balance = 'White'" src="~assets/images/renderSettings/white_high.jpg" alt="">
                      <p @click.stop="balance = 'White'">White</p>
                      <img :class="{'active': balance === 'Warm'}" @click.stop="balance = 'Warm'" src="~assets/images/renderSettings/warm_high.jpg" alt="">
                      <p @click.stop="balance = 'Warm'">Warm</p>
                      <img :class="{'active': balance === 'Cold'}" @click.stop="balance = 'Cold'" src="~assets/images/renderSettings/cold_high.jpg" alt="">
                      <p @click.stop="balance = 'Cold'">Cold</p>
                  </div> -->
                  <!-- <div class="exterior-on-off">
                      <p>External Enviornment</p>
                      <div class="on-off-switch">
                          <input type="checkbox" class="onoffswitch-checkbox" id="onoffswitch-checkbox" v-model="exterior" @change="changeExteriorValue()">
                          <label for="onoffswitch-checkbox">
                              <span :class="{'active':exterior}">
                              </span>
                          </label>
                      </div>
                  </div> -->
                  <!-- <div class="exterior-options-container">
                      <img :class="{'active': exteriorValue === 1}" @click="exteriorValue = 1" src="~assets/images/renderSettings/BgCityDayNeutral.jpg" alt="">
                      <p @click="exteriorValue = 1">City Day</p>
                      <img :class="{'active': exteriorValue === 4}" @click="exteriorValue = 4" src="~assets/images/renderSettings/BgNatureNeutral.jpg" alt="">
                      <p @click="exteriorValue = 4">Nature</p>
                      <img :class="{'active': exteriorValue === 7}" @click="exteriorValue = 7" src="~assets/images/renderSettings/BgNightNeutral.jpg" alt="">
                      <p @click="exteriorValue = 7">Night</p>
                  </div> -->
              </div>
              <div class="product-sun-light-container">
                <div>
                  <div>
                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5913 9.3909C14.5913 6.2659 11.9492 3.72424 8.76189 3.8909C5.91009 4.0159 3.56154 6.34924 3.43573 9.1409C3.39379 10.5576 3.85511 11.9326 4.77775 12.9742C5.65846 13.9742 6.11978 15.3492 6.11978 16.8076V17.0576C6.11978 17.3076 6.28753 17.4742 6.53916 17.4742H11.4459C11.6976 17.4742 11.8653 17.3076 11.8653 17.0576V16.7659C11.8653 15.3909 12.3686 14.0576 13.3332 12.8492C14.13 11.8909 14.5913 10.6826 14.5913 9.3909ZM11.0685 16.6409H7.00048C6.95854 15.0576 6.41335 13.5576 5.44877 12.4326C4.65194 11.5159 4.2745 10.3492 4.31643 9.18257C4.44225 6.7659 6.41335 4.80757 8.80383 4.68257C11.5298 4.55757 13.7525 6.72424 13.7525 9.3909C13.7525 10.4742 13.3751 11.4742 12.7041 12.3492C11.6556 13.6409 11.0685 15.1409 11.0685 16.6409Z" fill="white"/>
                  <path d="M11.4458 18.4326H6.70674C6.45511 18.4326 6.28735 18.5992 6.28735 18.8492C6.28735 19.0992 6.45511 19.2659 6.70674 19.2659H11.4458C11.6974 19.2659 11.8651 19.0992 11.8651 18.8492C11.8651 18.5992 11.6974 18.4326 11.4458 18.4326Z" fill="white"/>
                  <path d="M10.6071 19.9742H7.5456C7.29397 19.9742 7.12622 20.1409 7.12622 20.3909C7.12622 20.6409 7.29397 20.8076 7.5456 20.8076H10.6071C10.8587 20.8076 11.0265 20.6409 11.0265 20.3909C11.0265 20.1409 10.8587 19.9742 10.6071 19.9742Z" fill="white"/>
                  <path d="M9.01338 3.22425C9.26501 3.22425 9.43276 3.05759 9.43276 2.80759V1.22425C9.43276 0.974253 9.26501 0.807587 9.01338 0.807587C8.76175 0.807587 8.59399 0.974253 8.59399 1.22425V2.80759C8.59399 3.05759 8.76175 3.22425 9.01338 3.22425Z" fill="white"/>
                  <path d="M13.6267 5.18261C13.7525 5.18261 13.8364 5.14094 13.9202 5.05761L15.0106 3.93261C15.1784 3.76594 15.1784 3.51594 15.0106 3.34927C14.8429 3.18261 14.5912 3.18261 14.4235 3.34927L13.3331 4.47427C13.1653 4.64094 13.1653 4.89094 13.3331 5.05761C13.417 5.14094 13.5428 5.18261 13.6267 5.18261Z" fill="white"/>
                  <path d="M4.10659 13.9326L3.0162 15.0576C2.84844 15.2242 2.84844 15.4742 3.0162 15.6409C3.10007 15.7242 3.18395 15.7659 3.30976 15.7659C3.43558 15.7659 3.51946 15.7242 3.60333 15.6409L4.69373 14.5159C4.86148 14.3492 4.86148 14.0992 4.69373 13.9326C4.52597 13.7242 4.27434 13.7659 4.10659 13.9326Z" fill="white"/>
                  <path d="M17.1076 9.05756H15.5559C15.3042 9.05756 15.1365 9.22422 15.1365 9.47422C15.1365 9.72422 15.3042 9.89089 15.5559 9.89089H17.1076C17.3592 9.89089 17.527 9.72422 17.527 9.47422C17.527 9.22422 17.3173 9.05756 17.1076 9.05756Z" fill="white"/>
                  <path d="M2.4711 9.05756H0.919383C0.667753 9.05756 0.5 9.22422 0.5 9.47422C0.5 9.72422 0.667753 9.89089 0.919383 9.89089H2.4711C2.72273 9.89089 2.89048 9.72422 2.89048 9.47422C2.89048 9.22422 2.72273 9.05756 2.4711 9.05756Z" fill="white"/>
                  <path d="M13.9202 13.9326C13.7525 13.766 13.5008 13.766 13.3331 13.9326C13.1653 14.0993 13.1653 14.3493 13.3331 14.516L14.4235 15.6409C14.5074 15.7243 14.6332 15.766 14.7171 15.766C14.8429 15.766 14.9267 15.7243 15.0106 15.6409C15.1784 15.4743 15.1784 15.2243 15.0106 15.0576L13.9202 13.9326Z" fill="white"/>
                  <path d="M4.10659 5.05761C4.19047 5.14094 4.31628 5.18261 4.40016 5.18261C4.52597 5.18261 4.60985 5.14094 4.69373 5.05761C4.86148 4.89094 4.86148 4.64094 4.69373 4.47427L3.60333 3.34927C3.43558 3.18261 3.18395 3.18261 3.0162 3.34927C2.84844 3.51594 2.84844 3.76594 3.0162 3.93261L4.10659 5.05761Z" fill="white"/>
                  </svg>
                  <p>Product Lighting</p>
                  </div>
                  <div class="on-off-toggle-container">
                    <button class="active">On</button>
                    <button>Off</button>
                  </div>
                </div>
                <div>
                  <div>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.594 16.3851C7.57781 16.3851 5.12988 13.9343 5.12988 10.9146C5.12988 7.89492 7.57781 5.44415 10.594 5.44415C13.6102 5.44415 16.0581 7.89492 16.0581 10.9146C16.0581 13.9343 13.6102 16.3851 10.594 16.3851ZM10.594 6.31943C8.05865 6.31943 6.00414 8.37632 6.00414 10.9146C6.00414 13.4529 8.05865 15.5098 10.594 15.5098C13.1293 15.5098 15.1839 13.4529 15.1839 10.9146C15.1839 8.37632 13.1293 6.31943 10.594 6.31943Z" fill="white"/>
                    <path d="M10.5939 3.69358C10.3753 3.69358 10.1567 3.51852 10.1567 3.25594V1.24281C10.1567 1.02399 10.3316 0.805176 10.5939 0.805176C10.8561 0.805176 11.031 0.98023 11.031 1.24281V3.25594C11.031 3.51852 10.8124 3.69358 10.5939 3.69358Z" fill="white"/>
                    <path d="M10.5939 20.8052C10.3753 20.8052 10.1567 20.6301 10.1567 20.3675V18.3544C10.1567 18.1356 10.3316 17.9167 10.5939 17.9167C10.8561 17.9167 11.031 18.0918 11.031 18.3544V20.3675C11.031 20.5863 10.8124 20.8052 10.5939 20.8052Z" fill="white"/>
                    <path d="M20.1672 11.3522H18.1564C17.9378 11.3522 17.7192 11.1776 17.7192 10.9146C17.7192 10.6958 17.8941 10.477 18.1564 10.477H20.1672C20.3857 10.477 20.6043 10.652 20.6043 10.9146C20.6043 11.1334 20.3857 11.3522 20.1672 11.3522Z" fill="white"/>
                    <path d="M3.07537 11.3522H1.06457C0.846006 11.3522 0.627441 11.1776 0.627441 10.9146C0.627441 10.6958 0.802293 10.477 1.06457 10.477H3.07537C3.29393 10.477 3.51249 10.652 3.51249 10.9146C3.51249 11.1334 3.33764 11.3522 3.07537 11.3522Z" fill="white"/>
                    <path d="M17.3696 18.0919C17.2384 18.0919 17.151 18.0476 17.0636 17.9606L15.6647 16.5601C15.4903 16.3851 15.4903 16.1225 15.6647 15.9474C15.8396 15.7728 16.1019 15.7728 16.2767 15.9474L17.6755 17.3479C17.85 17.5229 17.85 17.7855 17.6755 17.9606C17.5881 18.0481 17.457 18.0919 17.3696 18.0919Z" fill="white"/>
                    <path d="M5.3047 6.01302C5.17357 6.01302 5.08614 5.96925 4.99871 5.88172L3.55619 4.48129C3.38134 4.30623 3.38134 4.04365 3.55619 3.8686C3.73104 3.69354 3.99332 3.69354 4.16817 3.8686L5.56698 5.26903C5.74183 5.44409 5.74183 5.70667 5.56698 5.88172C5.52327 5.96925 5.39213 6.01302 5.3047 6.01302Z" fill="white"/>
                    <path d="M15.9269 5.96931C15.7957 5.96931 15.7083 5.92555 15.6209 5.83802C15.446 5.66297 15.446 5.40039 15.6209 5.22533L17.0197 3.82489C17.1941 3.64984 17.4568 3.64984 17.6312 3.82489C17.8061 3.99995 17.8061 4.26253 17.6312 4.43759L16.2329 5.83802C16.1454 5.92555 16.0143 5.96931 15.9269 5.96931Z" fill="white"/>
                    <path d="M3.86218 18.0919C3.73104 18.0919 3.64361 18.0476 3.55619 17.9606C3.38134 17.7855 3.38134 17.5229 3.55619 17.3479L4.955 15.9474C5.12985 15.7728 5.39213 15.7728 5.56698 15.9474C5.74183 16.1225 5.74183 16.3851 5.56698 16.5601L4.16817 17.9606C4.08074 18.0481 3.9496 18.0919 3.86218 18.0919Z" fill="white"/>
                    <path d="M15.5773 10.9145C16.0144 15.6848 10.594 15.9036 10.594 15.9036V5.92548C10.594 5.92548 15.1839 6.45064 15.5773 10.9145Z" fill="white"/>
                  </svg>
                  <p>Product Lighting</p>
                  </div>
                  <div class="on-off-toggle-container">
                    <button class="active">On</button>
                    <button>Off</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="render-button-container">
            <button class="cancel-button" @click.stop="closeRenderAgain">Back</button>
            <button class="update-render" @click.stop="renderAgain">Render</button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import fullScreenLoader from "@/components/shared/fullScreenLoader.vue";
export default {
    props:{
        render:Object
    },
    components:{
        fullScreenLoader
    },
    data() {
        return {
            lighting:"Morning",
            intensity:"Low",
            balance:"White",
            intensityMode: 'Low',
            exterior:false,
            exteriorValue: 20,
            canvasWidth:960,
            canvasHeight:576,
            resolution:1,
            totalCredit:0,
            fullScreenShow:false,
            lightMenuData:{            
              day:{
                  presets:[
                  {
                      name:'None',
                      image:require('~/assets/images/light/none.png')
                  },{
                      name:'Sunrise',
                      image:require('~/assets/images/light/1.png')
                  },{
                      name:'Hot Daylight',
                      image:require('~/assets/images/light/2.png')              
                  },{
                      name:'Hot Daylight',
                      image:require('~/assets/images/light/2.png')              
                  }
                  ],
                  interior:[
                  {
                      name:'None',
                      image:require('~/assets/images/light/interior.png')
                  },{
                      name:'Low',
                      image:require('~/assets/images/light/interior.png')
                  },{
                      name:'Medium',
                      image:require('~/assets/images/light/interior.png')
                  },{
                      name:'High',
                      image:require('~/assets/images/light/interior.png')
                  }
                  ],
                  environment:[
                  {
                      name:'None',
                      image:require('~/assets/images/light/none.png')
                  },
                  {
                      name:'Snow',
                      image:require('~/assets/images/light/environment/day/1/day_1_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/day/1/day_1_2k.jpg')
                      }
                  },{
                      name:'Summi Pool',
                      image:require('~/assets/images/light/environment/day/2/day_2_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/day/2/day_2_2k.jpg')
                      }
                  },{
                      name:'Power Plant',
                      image:require('~/assets/images/light/environment/day/3/day_3_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/day/3/day_3_2k.jpg')
                      }            
                  },{
                      name:'Power Plant',
                      image:require('~/assets/images/light/environment/day/3/day_3_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/day/3/day_3_2k.jpg')
                      }            
                  },{
                      name:'Power Plant',
                      image:require('~/assets/images/light/environment/day/3/day_3_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/day/3/day_3_2k.jpg')
                      }            
                  },{
                      name:'Power Plant',
                      image:require('~/assets/images/light/environment/day/3/day_3_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/day/3/day_3_2k.jpg')
                      }            
                  },{
                      name:'Power Plant',
                      image:require('~/assets/images/light/environment/day/3/day_3_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/day/3/day_3_2k.jpg')
                      }            
                  },{
                      name:'Power Plant',
                      image:require('~/assets/images/light/environment/day/3/day_3_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/day/3/day_3_2k.jpg')
                      }            
                  },{
                      name:'Power Plant',
                      image:require('~/assets/images/light/environment/day/3/day_3_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/day/3/day_3_2k.jpg')
                      }            
                  }
                  ]
              },
              evening:{
                  presets:[
                  {
                      name:'None',
                      image:require('~/assets/images/light/none.png')
                  },{
                      name:'Sunrise',
                      image:require('~/assets/images/light/1.png')
                  },{
                      name:'Hot Daylight',
                      image:require('~/assets/images/light/2.png')              
                  }
                  ],
                  interior:[
                  {
                      name:'None',
                      image:require('~/assets/images/light/interior.png')
                  },{
                      name:'Low',
                      image:require('~/assets/images/light/interior.png')
                  },{
                      name:'Medium',
                      image:require('~/assets/images/light/interior.png')
                  },{
                      name:'High',
                      image:require('~/assets/images/light/interior.png')
                  }
                  ],
                  environment:[
                  {
                      name:'None',
                      image:require('~/assets/images/light/none.png')
                  },
                  {
                      name:'LA Downtown Afternoon Fishing',
                      image:require('~/assets/images/light/environment/evening/1/evening_1_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/evening/1/evening_1_2k.jpg')
                      }
                  },{
                      name:'LA Downtown Helipad GoldenHour',
                      image:require('~/assets/images/light/environment/evening/2/evening_2_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/evening/2/evening_2_2k.jpg')
                      }
                  }
                  ]
              },
              night:{
                  presets:[
                  {
                      name:'None',
                      image:require('~/assets/images/light/none.png')
                  },{
                      name:'Sunrise',
                      image:require('~/assets/images/light/1.png')
                  },{
                      name:'Hot Daylight',
                      image:require('~/assets/images/light/2.png')              
                  }
                  ],
                  interior:[
                  {
                      name:'None',
                      image:require('~/assets/images/light/interior.png')
                  },{
                      name:'Low',
                      image:require('~/assets/images/light/interior.png')
                  },{
                      name:'Medium',
                      image:require('~/assets/images/light/interior.png')
                  },{
                      name:'High',
                      image:require('~/assets/images/light/interior.png')
                  }
                  ],
                  environment:[
                  {
                      name:'None',
                      image:require('~/assets/images/light/none.png')
                  },
                  {
                      name:'Sierra Madre B',
                      image:require('~/assets/images/light/environment/night/1/night_1_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/night/1/night_1_2k.jpg')
                      }
                  },{
                      name:'GCanyon C YumaPoint',
                      image:require('~/assets/images/light/environment/night/2/night_2_thumb.jpg'),
                      map: {
                      "2k":require('~/assets/images/light/environment/night/2/night_2_2k.jpg')
                      }
                  }
                  ]
              }
            },
            lightSetting: {
              'time': 'day',
              'preset': 0,
              'interior': 0,
              'environment': 0,
              'envRotate':0
            },
        }
    },
    mounted() {
        this.fetchLightingJsonOptions().then(res=>{
           
        });
        if(this.user){
            let serviceCode  = window.location.host == "neo.foyr.com"?'foyr_service_2,foyr_service_3':'foyr_service_32,foyr_service_30'
            this.checkServiceCredits({accountId:this.user.accountId,service:serviceCode}).then(res => {
                this.totalCredit = res.totalCredits
            })
        }
    },
    computed: {
        ...mapState({
            lightingMenuOptions: state => state.Render.lightingMenuOptions,
            user:state => state.User.user,
        }),
    },
    watch: {
        user:function(userData){
            let serviceCode  = window.location.host == "neo.foyr.com"?'foyr_service_2,foyr_service_3':'foyr_service_32,foyr_service_30'
            this.checkServiceCredits({accountId:userData.accountId,service:serviceCode}).then(res => {
                this.totalCredit = res.totalCredits
            })
        }
    },
    methods: {
        ...mapActions({
            //updateRenderData: "Render/updateRenderData",
            fetchLightingJsonOptions:"Render/fetchLightingJsonOptions",
            takeRender:"Render/takeRender",
            checkServiceCredits:"Subscriptions/checkServiceCredits"
        }),
        changeExteriorValue(){
            if(!this.exterior)
                this.exteriorValue = 20
        },
        renderAgain(){
            this.fullScreenShow = true;
            let settings = this.formatRenderValues();
            let renderPayload =  {
                "id": this.render.project,
                "cameras": [
                    {
                        "view": this.render.input.view
                    }
                ],
                "height": this.canvasHeight * this.resolution,
                "width": this.canvasWidth * this.resolution,
                "renderType": "image",
                "imageType": "jpg",
                "testrender": this.resolution == 1,
                "os": "linux",
                "vraydr": true,
                "baseRender": this.render._id,
                "renderCategory": "image",
                "renderSettings": settings
            }
            // console.log(renderPayload)
            this.takeRender(renderPayload).then(res => {
                this.$parent.message.error = false;
                this.$parent.message.value = 'Your render has been sucessfully submitted';
                this.$parent.message.global = true;
                this.$parent.renderAgainWindow = false;
                this.$store.state.Render.viaProject = this.$route.query.project?this.$route.query.project:undefined;
                if(this.user){
                    let serviceCode  = window.location.host == "neo.foyr.com"?'foyr_service_2,foyr_service_3':'foyr_service_32,foyr_service_30'
                    this.checkServiceCredits({accountId:this.user.accountId,service:serviceCode}).then(res => {
                        this.totalCredit = res.totalCredits
                    })
                }
                if(window.analytics)
                window.analytics.track('gallery_Render_again_submitted', {
                    title: 'Clicked on Render on Render Again pop-up',
                    subtitle: 'Clicked on Render on Render Again pop-up',
                }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                
                setTimeout(() => {
                    this.$parent.message.global = false;
                    this.$parent.message.value = '';
                    this.fullScreenShow = false;
                }, 4000);
            })
        },
        formatRenderValues() {
            let selectedSettings;
            let {lighting, intensityMode, balance} = this;
            this.lightingMenuOptions.map((it) => {
                if(it.lighting === lighting && it.intensityMode === intensityMode && it.balance === balance ) {
                selectedSettings = Object.assign({}, it);
                }
            });
            let environment = this.exteriorValue;
            if(balance === 'Cool') {
                environment = environment - 1;
            } else if(balance === 'Warm') {
                environment = environment + 1;
            }
            selectedSettings.environment = environment;
            return selectedSettings;
        },
        closeRenderAgain(){
            this.$parent.renderAgainWindow = false;
        },
        onTimeValueChange(timeValue){
          this.lightSetting['time'] = timeValue;
          this.lightSetting['preset'] = 0;
          this.lightSetting['interior'] = 0;
          this.lightSetting['environment'] = 0;
        },
        onPresetValueChange(presetValue) {
        this.lightSetting['preset'] = presetValue;
      },
      onInteriorLightValueChange(interiorValue) {
        this.lightSetting['interior'] = interiorValue;
      },
      onEnvironmentValueChange(environmentValue) {
        
        this.lightSetting['environment'] = environmentValue;
        if(environmentValue != 0){
          this.showRotate = true;
          this.calculateRotatePosition(environmentValue);
        }else{
          this.showRotate = false;
        }
        var timeOfTheDay = this.lightSetting['time'];
        var environmentIndex = this.lightSetting['environment'];
        var environmentInfo = this.lightMenuData[timeOfTheDay]['environment'][environmentIndex];
  
        var panoImageURL = (environmentInfo.map && environmentInfo.map["2k"]) ? environmentInfo.map["2k"] : undefined;
        FoyrFP.utils.editor.signals.onSkyDomeUpdateBtnClick.dispatch(panoImageURL);
      },
    },
}
</script>
<style lang="scss" scoped>
    .render-again-component{
      // width: 70vw;
        .render-again-header{
            
            font-size: 2rem;
            color: #D48E8E;
            margin: 0 1rem;
            text-align: center;
            margin-left: 90px;
            margin-bottom: 0px;
        }
        .sub-head{
            font-size: 0.875rem;
            color: #D1D1D1;
            margin: 1rem;
            text-align: center;
            margin-left: 90px;
            margin-top: 0px;
        }
        .credits-container{
            display: grid;
            grid-template-columns: max-content max-content;
            grid-column-gap: 20px;
            margin-left: 90px;
            justify-content: center;
            p{
                font-size: 0.8rem;
                color: #A6A5A6;
                margin: 0px  0.76rem 2rem;
            }
            span{
                color: #D48E8E;
            }
        }
        .render-again-setting-container{
            display: grid;
            grid-template-columns: max-content 1fr;
            grid-column-gap: 10px;
            grid-row-gap: 1rem;
            margin-bottom: 20px;
            margin-right: 45px;
            .resolution{
                text-align: center;
                align-self: center;
                svg{

                }
                p{
                    margin: 0px;
                    font-weight: 500;
                    font-size: 15px;
                    color: #D1D1D1;
                }
            }
            .resolution-options{
                display: grid;
                grid-template-columns: max-content max-content max-content;
                grid-column-gap: 10px;
                background: #303030;
                place-content: center;
                padding: 25px 90px;
                p{
                    font-size: 14px;
                    color: #D1D1D1;
                    text-align: center;
                    width: 8.75rem;
                    background: #4D4C4D;
                    border: 1px solid #4D4C4D;
                    margin: 0px;
                    height: max-content;
                    cursor: pointer;
                }
                .active{
                    background: #222021;
                    border: 1px solid #E9BEB3;
                }
            }
            .lighting{
                text-align: center;
                align-self: center;
                svg{

                }
                p{
                    margin: 0px;
                    font-weight: 500;
                    font-size: 15px;
                    color: #D1D1D1;
                }
            }
            .lighting-options{
              background: #303030;
              padding: 1.38rem 2.5rem;
              max-height: 50vh;
              overflow: auto;
            }
            // .lighting-options{
            //     background: #303030;
            //     padding: 24px 50px;
            //     .options-timing{
            //         display: grid;
            //         grid-template-columns: max-content max-content max-content;
            //         justify-content: center;
            //         grid-column-gap: 10px;
            //         margin-bottom: 24px;
            //         p{
            //             background: #4D4C4D;
            //             font-weight: 500;
            //             font-size: 10px;
            //             color: #D1D1D1;
            //             padding: 5px 0px;
            //             width: 80px;
            //             text-align: center;
            //             margin: 0px;
            //             cursor: pointer;
            //         }
            //         .active{
            //             background: #222021;
            //             border: 1px solid #E9BEB3;
            //         }
            //     }
            //     .intensity-option{
            //         display: grid;
            //         grid-template-columns: max-content max-content max-content;
            //         justify-content: center;
            //         grid-column-gap: 10px;
            //         margin-bottom: 10px;
            //         p{
            //             color: #FFFFFF;
            //             font-size: 10px;
            //             margin:0px;
            //             display: grid;
            //             align-items: center;
            //             grid-column-gap: 5px;
            //             grid-template-columns: max-content max-content;
            //             cursor: pointer;
            //             &:first-child{
            //                 font-weight: 500;
            //                 font-size: 12px;
            //                 color: #E9BEB3;
            //                 cursor: default;
            //             }
            //         }
            //     }
            //     .light-intensity-container{
            //         display: grid;
            //         grid-template-columns: max-content max-content max-content;
            //         justify-content: center;
            //         grid-column-gap: 10px;
            //         grid-row-gap: 5px;
            //         margin-bottom: 20px;
            //         img{
            //             width: 80px;
            //             height: 56px;
            //             object-fit: cover;
            //             grid-row: 1/2;
            //             cursor: pointer;
            //         }
            //         p{
            //             margin: 0px;
            //             font-weight: 500;
            //             font-size: 10px;
            //             color: #D1D1D1;
            //             text-align: center;
            //             grid-row: 2/3;
            //         }
            //         .active{
            //             border:1px solid #E9BEB3;
            //         }
            //     }
            //     .exterior-on-off{
            //         display: grid;
            //         grid-template-columns: max-content max-content;
            //         justify-content: center;
            //         grid-column-gap: 10px;
            //         margin-bottom: 10px;
            //         p{
            //             color: #FFFFFF;
            //             font-size: 10px;
            //             margin:0px;
                        
            //             &:first-child{
            //                 font-weight: 500;
            //                 font-size: 12px;
            //                 color: #E9BEB3;
            //             }
            //         }
            //     }
            //     .exterior-options-container{
            //          display: grid;
            //         grid-template-columns: max-content max-content max-content;
            //         justify-content: center;
            //         grid-column-gap: 10px;
            //         grid-row-gap: 5px;
            //         img{
            //             width: 80px;
            //             height: 56px;
            //             object-fit: cover;
            //             grid-row: 1/2;
            //         }
            //         p{
            //             margin: 0px;
            //             font-weight: 500;
            //             font-size: 10px;
            //             color: #D1D1D1;
            //             text-align: center;
            //             grid-row: 2/3;
            //         }
            //         .active{
            //             border:1px solid #E9BEB3;
            //         }
            //     }
            // }
        }

        .render-button-container{
            display: grid;
            grid-template-columns: max-content max-content;
            justify-content: space-between;
            .cancel-button{
                font-size: 14px;
                color: #807F7F;
                cursor: pointer;
                margin-left: 30px;
            }
            .update-render{
                cursor: pointer;
                color: #FFFFFF;
                font-size: 14px;
            }
        }
    }
    .on-off-switch{
        align-self: center;
        input{
            display: none;
        }
        label{
            width: 24px;
            display: block;
            background: #222021;
            border-radius: 20px;
            border: 1px solid #E9BEB3;
            height: 12px;
            position: relative;
            cursor: pointer;
            margin: 0px 20px;
            span{
                width: 8px;
                height: 8px;
                background: #E9BEB3;
                display: block;
                border-radius: 50%;
                position: absolute;
                left: 0px;
                top: 50%;
                transform: translateY(-50%);
                transition: all .2s ease-in-out;
            }
            .active{
                left: calc( 100% - 10px);
            }
            &::before{
                    content: 'Off';
                    position: absolute;
                    right: 130%;
                    font-size: 10px;
                    color: #FFFFFF;
                    top: -2px;
            }
            &::after{
                    content: 'On';
                    position: absolute;
                    left: 130%;
                    font-size: 10px;
                    color: #FFFFFF;
                    top: -2px;
            }
        }
    }

p{
    margin: 0px;
}

    .day-eve-night-container{
        display: grid;
        grid-template-columns: max-content max-content max-content;
        grid-column-gap: 8px;
        padding: 0 1rem 0;
        justify-content: center;
        align-items: center;
        p{
            font-weight: 500;
            font-size: 0.8rem;
            color: #FFFFFF;
            background: #4D4C4D;
            text-align: center;
            margin: 0px;
            width: 8.75rem;
            line-height: 1.75rem;
            cursor: pointer;
        }
        .activeTime{
            background: #0E0E0E;
            border: 1px solid #EBBEB5;
        }
    }
    .presets-container{
        margin-top: 1rem;
        display: grid;
        grid-row-gap: 0.8rem;
        padding: 0 1rem;
        p{
            font-weight: 500;
            font-size: 0.9375rem;
            color: #E9BEB3;
            margin: 0px;
        }
        .presets-cards{
            .preset-card{

            }
        }
    }
    .interior-light-container{
        display: grid;
        grid-template-columns: 115px 1fr 1fr;
        grid-column-gap: 4px;
        grid-row-gap: 1rem;
        margin-top: 30px;
        padding: 0 1rem;
        .image-container{
            img{
                width: 100%;
            }
        }
        .interior-slider-container{
            // grid-column: 2/4;
            margin-left: 10px;
            p{
                font-weight: 500;
                font-size: 0.9375rem;
                color: #E9BEB3;
                margin: 0px;
                
            }
            .slider-runner-interior{
                width: 100%;
                height: 3px;
                background: #4D4C4D;
                position: relative;
                top: 20px;
                .slider-steps{
                    position: absolute;
                    top: -2px;
                    cursor: pointer;
                    span{
                        width: 2px;
                        height: 8px;
                        display: block;
                        background: white;
                    }
                    p{
                        font-size: 0.763rem;
                        transform: translate(-50%,4px);
                        
                    }
                    &:first-child{
                        p{  
                            transform: translate(0px,4px);
                        }
                        
                    }
                    &:nth-last-child(2){
                        p{
                            transform: translate(-100%,4px);
                        }
                    }
                }
                .slider-active-runner{
                    position: absolute;
                    left: 0px;
                    height: 3px;
                    background: white;
                    transition: width 500ms ease-in 0s;
                    &::after{
                        content: '';
                        display: block;
                        position: relative;
                        left: 100%;
                        height: 16px;
                        width: 16px;
                        background: #1E1E1E;
                        border: 1.6px solid #FFFFFF;
                        border-radius: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
        }
    }
    .environment-container{
        margin-top: 25px;
        display: grid;
        grid-row-gap: 0.8rem;
        p{
            font-weight: 500;
            font-size: 0.9375rem;
            color: #E9BEB3;
            margin: 0px;
            padding: 0 1rem;
        }
        .evn-cards{
            // height: 8rem;
            overflow: auto;
            padding: 0 1rem;
            
            p{
                padding: 0px;
            }
            .env-card{
                position: relative;
            }
        }
        
    }

.product-sun-container{
    .product-light-container{
        svg{

        }
        p{

        }
        .on-off-toggle-container{

        }
    }
}
.cards-container{
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(8.5rem, 1fr) );
    grid-column-gap: 8px;
    grid-row-gap: 1rem;
    grid-auto-rows: max-content;
    .card-main{
        display: grid;
        grid-template-rows: 1fr max-content;
        grid-row-gap: 0.375rem;
        p{
            font-weight: 500;
            font-size: 0.8rem;
            color: #FFFFFF;
            margin-bottom: 0px;
        }
        img{
            width: 100%;
            height: 5.717rem;
            object-fit: cover;
        }
    }
    .no-env-card{
        div{
            background: #4D4C4D;
        }
    }
}
.product-sun-light-container{
    display: grid;
    grid-row-gap: 10px;
    padding: 1rem;
    background: #3A393A;
    border-top: 1px solid #E9BEB3;
    grid-template-columns: max-content max-content;
    grid-column-gap: 5rem;
    .product-light-container{
        display: grid;
        grid-template-columns: max-content max-content;
        justify-content: space-between;
        align-items: center;
        
        
    }
    div{
        display: grid;
        grid-template-columns: max-content max-content;
        align-items: center;
        grid-column-gap: 8px;
        p{
            font-weight: 500;
            font-size: 0.8rem;
            color: #FFFFFF;
        }
    }
    .on-off-toggle-container{
            grid-column-gap: 0px;
            display: grid;
            grid-template-columns: max-content max-content;
            button{
                font-size: 0.8rem;
                font-weight: 500;
                padding: 3px 12px;
                border: 1px solid #E9BEB3;
                color: #E9BEB3;
                
                
            }
            .active{
                background: #E9BEB3;
                color: #3A393A;
                border: 1px solid #E9BEB3;
            }
        }
}
</style>
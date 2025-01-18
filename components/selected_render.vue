<template>
  <section class="select-render-section">
    <div>
      <p class="backToGallery" @click="backToGallery()">	&lt;  Back</p>
      <h2>{{render.name?render.name:render.extraInfo.thumbnail?getFileName(render.extraInfo.thumbnail,false):`${render.input.view}`}}</h2>
      <p>{{render.projectName?render.projectName:'Project Title'}}</p>
      <div class="all-render-container">
        <div class="individual-render-container">
          <div class="render-image-button-container">
            <svg width="41" @click.stop="renderFullView = true; fullImageUrl = mainImageUrl"  height="33" viewBox="0 0 41 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.00195312" y="0.973816" width="40" height="32" fill="white"/>
            <path d="M12.002 11.6815V8.97382H14.7096" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25.376 8.97382H28.0016V11.6815" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.0016 22.3482V24.9738H25.376" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.7096 24.9738H12.002V22.3482" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.002 8.97382L16.0225 12.9943" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.981 20.9533L28.0015 24.9738" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.0015 8.97382L23.981 12.9943" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.0225 20.9533L12.002 24.9738" stroke="#3A393A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <img class="main-img" :src="mainImageUrl" @click="renderFullView = true; fullImageUrl = mainImageUrl" alt />
            <div class="btn">
              <!-- <button @click="renderAgainWindow = true; renderAgainWindowOpen()">Render Again</button> -->
              <button @click="feedbackPopup = true; renderFeedBackWindow()">Render Feedback</button>
            </div>
          </div>
          <div class="render-thumbnails-container" @scroll="onRendersScroll($event)">
            <p class="show-more">{{$route.query.count?$route.query.count:renderCount}} more to show</p>
            <div class="render-thumbnails active-render"  @click.stop="addRender(render)">
              <div class="render-thumnail-img-container ">
                <div class="new-render-status" v-if="render.stateInfo.state != 'COMPLETED'">
                  <svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M57.8051 56.3318V57.4379H56.6926" stroke="#3A393A" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M2.9177 57.4379H1.80518V56.3318" stroke="#3A393A" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M1.80518 54.1799V3.62311" stroke="#3A393A" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.12 7.12"/>
                  <path d="M56.6926 1.4411H57.8051V2.54726" stroke="#3A393A" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M48.505 46.9161H11.2659V36.6074C13.5745 33.5864 15.4738 32.5034 17.5452 32.3418C18.6203 32.258 19.7772 32.419 21.1124 32.7394C22.1853 32.9968 23.3472 33.3501 24.6574 33.7484C24.9828 33.8473 25.3174 33.949 25.6621 34.0528C27.4126 34.5796 28.7722 34.7602 29.9144 34.6018C31.0761 34.4407 31.9663 33.9358 32.7837 33.1871C33.5444 32.4904 34.2601 31.5637 35.0771 30.5061C35.1184 30.4525 35.16 30.3987 35.2018 30.3445C36.0803 29.208 37.1072 27.8929 38.4882 26.4415C41.1803 23.6122 43.7462 23.1517 45.6113 23.3537C46.5563 23.456 47.339 23.7308 47.8849 23.98C48.1538 24.1027 48.3636 24.2185 48.505 24.3029V46.9161Z" stroke="#3A393A"/>
                  <path d="M23.3853 21.2461C23.3853 23.032 21.9284 24.4847 20.1252 24.4847C18.322 24.4847 16.8651 23.032 16.8651 21.2461C16.8651 19.4602 18.322 18.0075 20.1252 18.0075C21.9284 18.0075 23.3853 19.4602 23.3853 21.2461Z" stroke="#3A393A"/>
                  <path d="M54.5404 57.438H3.99365" stroke="#3A393A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.08 7.08"/>
                  <path d="M1.80518 2.54787V1.44171H2.9177" stroke="#3A393A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M5.06982 1.43802H55.6166" stroke="#3A393A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.08 7.08"/>
                  <path d="M57.8051 4.69913V55.2559" stroke="#3A393A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.12 7.12"/>
                  </svg>
                  <p>Just few seconds away</p>
                  <div v-if="progress && progress[render._id]" class="progress-indicator-container">
                      <div  class="progress-indicator" :style="{width:progress[render._id]+'%'}">
                      </div>
                  </div>
                </div>
                <img class="thumb-img" :src="render.extraInfo.eIThumbnail?timeStampUrl(render.extraInfo.eIThumbnail):render.extraInfo.thumbnail" alt />  
              </div>
              <p>{{render.name?render.name:render.extraInfo.thumbnail?getFileName(render.extraInfo.thumbnail,false):`${render.input.view}`}}</p>
              <p>{{getRenderResolution(render)}}</p>
            </div>
            <div class="render-thumbnails" v-for="i in otherRenders" v-if="i._id !== render._id" @click.stop="addRender(i)">
              <div class="render-thumnail-img-container">
                <div class="new-render-status" v-if="i.stateInfo.state != 'COMPLETED'">
                  <svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M57.8051 56.3318V57.4379H56.6926" stroke="#3A393A" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M2.9177 57.4379H1.80518V56.3318" stroke="#3A393A" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M1.80518 54.1799V3.62311" stroke="#3A393A" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.12 7.12"/>
                  <path d="M56.6926 1.4411H57.8051V2.54726" stroke="#3A393A" stroke-width="1.83" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M48.505 46.9161H11.2659V36.6074C13.5745 33.5864 15.4738 32.5034 17.5452 32.3418C18.6203 32.258 19.7772 32.419 21.1124 32.7394C22.1853 32.9968 23.3472 33.3501 24.6574 33.7484C24.9828 33.8473 25.3174 33.949 25.6621 34.0528C27.4126 34.5796 28.7722 34.7602 29.9144 34.6018C31.0761 34.4407 31.9663 33.9358 32.7837 33.1871C33.5444 32.4904 34.2601 31.5637 35.0771 30.5061C35.1184 30.4525 35.16 30.3987 35.2018 30.3445C36.0803 29.208 37.1072 27.8929 38.4882 26.4415C41.1803 23.6122 43.7462 23.1517 45.6113 23.3537C46.5563 23.456 47.339 23.7308 47.8849 23.98C48.1538 24.1027 48.3636 24.2185 48.505 24.3029V46.9161Z" stroke="#3A393A"/>
                  <path d="M23.3853 21.2461C23.3853 23.032 21.9284 24.4847 20.1252 24.4847C18.322 24.4847 16.8651 23.032 16.8651 21.2461C16.8651 19.4602 18.322 18.0075 20.1252 18.0075C21.9284 18.0075 23.3853 19.4602 23.3853 21.2461Z" stroke="#3A393A"/>
                  <path d="M54.5404 57.438H3.99365" stroke="#3A393A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.08 7.08"/>
                  <path d="M1.80518 2.54787V1.44171H2.9177" stroke="#3A393A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M5.06982 1.43802H55.6166" stroke="#3A393A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.08 7.08"/>
                  <path d="M57.8051 4.69913V55.2559" stroke="#3A393A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="7.12 7.12"/>
                  </svg>
                  <p>{{i.stateInfo.state == 'FAILED' || i.stateInfo.state =='TERMINATED'?'FAILED':'Just few seconds away'}}</p>
                  <div v-if="progress && progress[i._id]" class="progress-indicator-container">
                      <div  class="progress-indicator" :style="{width:progress[i._id]+'%'}">
                      </div>
                  </div>
                </div>
                <img class="thumb-img" :src="i.extraInfo.eIThumbnail?timeStampUrl(i.extraInfo.eIThumbnail):i.extraInfo.thumbnail" alt />  
              </div>
              <p>{{i.name?i.name:i.extraInfo.thumbnail?getFileName(i.extraInfo.thumbnail,false):`${i.input.view}`}}</p>
              <p>{{i.input.width > 3000?'4K':i.input.width > 1900?'2K':i.input.width > 900?'1K':'HD'}}</p>
            </div>
          </div>
        </div>
      </div> 
    </div>
    <!-- *******************************FULL VIEW OF RENDER*********************** -->
    <div class="popup-div full-view-render" :class="renderFullView?'showPopUp':''">
      <div class="popup-container">
        <div class="close-popup" @click="renderFullView = false; addRender(currentRender)">
          <!-- <svg
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
          </svg>-->
          <svg
            width="41"
            height="33"
            viewBox="0 0 41 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.288086" y="0.0944214" width="40" height="32" fill="white" />
            <path
              d="M16.3086 9.40724V12.1149H13.6009"
              stroke="#3A393A"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.3086 12.1149L12.2881 8.09442"
              stroke="#3A393A"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24.2679 22.6996V20.0739H26.8936"
              stroke="#3A393A"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M28.2881 24.0944L24.2676 20.0739"
              stroke="#3A393A"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M26.8936 12.1149H24.2679V9.40724"
              stroke="#3A393A"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M28.2881 8.09442L24.2676 12.1149"
              stroke="#3A393A"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.6009 20.0739H16.3086V22.6996"
              stroke="#3A393A"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.2881 24.0944L16.3086 20.0739"
              stroke="#3A393A"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="popup-details">
          <svg
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-show="left"
            @click.stop="mainImageChange('left')"
          >
            <path
              d="M11.0498 19L1.64441 10.2432L11.0498 1"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <img :src="fullImageUrl" alt />
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            v-show="right"
            xmlns="http://www.w3.org/2000/svg"
            @click.stop="mainImageChange('right')"
          >
            <path
              d="M1.22168 19L10.6271 10.2432L1.22168 1"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <!-- *******************************FEEDBACK*********************** -->
    <div class="popup-div" :class="feedbackPopup?'showPopUp':''">
      <div class="popup-container">
        <div class="close-popup" @click="feedbackPopup = false">
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
          <h2>Render Feedback</h2>
          <p class="sub-text">Tell us what you think about Neo’s rendering experience</p>
        </div>
        <div class="popup-details feedback-section">
          <p>How satisfied are you?</p>
          <div class="emoji-container">
            <!-- ******Sad************************************ -->
            <svg
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click.stop="selectedEmoji = 'Sad'"
              :class="selectedEmoji == 'Sad'?'selected-emoji':''"
            >
              <path
                d="M24.3359 48.2109C37.5908 48.2109 48.3359 37.4658 48.3359 24.2109C48.3359 10.9561 37.5908 0.210937 24.3359 0.210937C11.0811 0.210937 0.335938 10.9561 0.335938 24.2109C0.335938 37.4658 11.0811 48.2109 24.3359 48.2109Z"
                fill="#787878"
              />
              <path
                d="M15.2704 21.1616C15.2704 19.8415 14.3528 18.7715 13.2223 18.7715C12.0918 18.7715 11.1729 19.8415 11.1729 21.1616C11.1729 22.4817 12.0904 23.5517 13.2223 23.5517C14.3542 23.5517 15.2704 22.4817 15.2704 21.1616Z"
                fill="#292929"
              />
              <path
                d="M37.4969 21.1616C37.4969 19.8415 36.5807 18.7715 35.4489 18.7715C34.317 18.7715 33.3994 19.8415 33.3994 21.1616C33.3994 22.4817 34.3239 23.5531 35.4489 23.5531C36.5739 23.5531 37.4969 22.4817 37.4969 21.1616Z"
                fill="#292929"
              />
              <path
                d="M31.3512 34.6803C31.1995 34.6794 31.0519 34.6312 30.9289 34.5426C30.8058 34.454 30.7134 34.3293 30.6643 34.1858C30.5998 34.0018 29.0503 29.7051 23.674 29.7051C18.3608 29.7051 17.3306 33.929 17.2893 34.1089C17.2685 34.2026 17.2294 34.2913 17.1743 34.3699C17.1192 34.4485 17.0492 34.5155 16.9682 34.567C16.8872 34.6186 16.7968 34.6536 16.7023 34.6703C16.6077 34.6869 16.5108 34.6847 16.4171 34.6639C16.3234 34.643 16.2347 34.6039 16.1561 34.5488C16.0775 34.4937 16.0105 34.4237 15.959 34.3427C15.9074 34.2617 15.8724 34.1713 15.8558 34.0768C15.8391 33.9822 15.8413 33.8853 15.8621 33.7916C16.1354 32.7655 16.6296 31.8115 17.31 30.9963C18.3443 29.7394 20.2893 28.249 23.674 28.249C27.0338 28.249 29.13 29.727 30.2976 30.9661C31.0573 31.7601 31.6525 32.6966 32.049 33.7216C32.0853 33.8309 32.0954 33.9472 32.0782 34.0612C32.0611 34.1751 32.0172 34.2834 31.9502 34.3771C31.8833 34.4709 31.7951 34.5474 31.6929 34.6006C31.5907 34.6538 31.4773 34.6821 31.3621 34.6831L31.3512 34.6803Z"
                fill="#292929"
              />
            </svg>
            <!-- ******Average************************************ -->
            <svg
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click.stop="selectedEmoji = 'Average'"
              :class="selectedEmoji == 'Average'?'selected-emoji':''"
            >
              <path
                d="M24.4502 48.2119C37.705 48.2119 48.4502 37.4667 48.4502 24.2119C48.4502 10.9571 37.705 0.211914 24.4502 0.211914C11.1954 0.211914 0.450195 10.9571 0.450195 24.2119C0.450195 37.4667 11.1954 48.2119 24.4502 48.2119Z"
                fill="#787878"
              />
              <path
                d="M15.1473 21.1616C15.1473 19.8415 14.2298 18.7715 13.0993 18.7715C11.9688 18.7715 11.0498 19.8415 11.0498 21.1616C11.0498 22.4817 11.9674 23.5517 13.0993 23.5517C14.2311 23.5517 15.1473 22.4817 15.1473 21.1616Z"
                fill="#292929"
              />
              <path
                d="M37.3739 21.1616C37.3739 19.8415 36.4577 18.7715 35.3258 18.7715C34.1939 18.7715 33.2764 19.8415 33.2764 21.1616C33.2764 22.4817 34.1939 23.5517 35.3258 23.5517C36.4577 23.5517 37.3739 22.4817 37.3739 21.1616Z"
                fill="#292929"
              />
              <path
                d="M31.106 31.7659C31.0023 31.8083 30.8912 31.8302 30.7791 31.8304L18.1513 31.84C17.9269 31.8311 17.7146 31.7357 17.559 31.5737C17.4033 31.4118 17.3164 31.1958 17.3164 30.9712C17.3164 30.7466 17.4033 30.5307 17.559 30.3687C17.7146 30.2068 17.9269 30.1113 18.1513 30.1024L30.7791 30.0928C30.9809 30.092 31.1766 30.1616 31.3327 30.2895C31.4887 30.4175 31.5953 30.5957 31.6342 30.7937C31.673 30.9917 31.6417 31.1971 31.5455 31.3745C31.4494 31.5519 31.2945 31.6903 31.1074 31.7659H31.106Z"
                fill="#292929"
              />
            </svg>
            <!-- ******Ok Ok************************************ -->

            <svg
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click.stop="selectedEmoji = 'Ok'"
              :class="selectedEmoji == 'Ok'?'selected-emoji':''"
            >
              <path
                d="M24.7227 48.2119C37.9775 48.2119 48.7227 37.4667 48.7227 24.2119C48.7227 10.9571 37.9775 0.211914 24.7227 0.211914C11.4678 0.211914 0.722656 10.9571 0.722656 24.2119C0.722656 37.4667 11.4678 48.2119 24.7227 48.2119Z"
                fill="#787878"
              />
              <path
                d="M15.4052 21.1616C15.4052 19.8415 14.4889 18.7715 13.3571 18.7715C12.2252 18.7715 11.3076 19.8415 11.3076 21.1616C11.3076 22.4817 12.2252 23.5517 13.3571 23.5517C14.4889 23.5517 15.4052 22.4817 15.4052 21.1616Z"
                fill="#292929"
              />
              <path
                d="M37.6327 21.1616C37.6327 19.8415 36.7151 18.7715 35.5832 18.7715C34.4514 18.7715 33.5352 19.8415 33.5352 21.1616C33.5352 22.4817 34.4514 23.5531 35.5887 23.5531C36.7261 23.5531 37.6327 22.4817 37.6327 21.1616Z"
                fill="#292929"
              />
              <path
                d="M24.3886 34.6796C21.0287 34.6796 18.9312 33.2016 17.765 31.9612C17.0062 31.1695 16.4111 30.2359 16.0136 29.2139C15.9827 29.123 15.9699 29.0269 15.9761 28.9311C15.9823 28.8352 16.0074 28.7416 16.0498 28.6554C16.0922 28.5692 16.1512 28.4923 16.2233 28.4289C16.2955 28.3655 16.3794 28.317 16.4703 28.2861C16.5612 28.2551 16.6574 28.2424 16.7532 28.2486C16.849 28.2548 16.9427 28.2798 17.0289 28.3222C17.115 28.3647 17.192 28.4236 17.2554 28.4958C17.3187 28.5679 17.3673 28.6519 17.3982 28.7428C17.4655 28.9365 19.0191 33.2236 24.3886 33.2236C29.7018 33.2236 30.7306 28.9983 30.7718 28.8183C30.8186 28.6336 30.9356 28.4744 31.0979 28.3746C31.2602 28.2747 31.455 28.2421 31.641 28.2836C31.827 28.325 31.9894 28.4374 32.0939 28.5968C32.1983 28.7561 32.2366 28.9499 32.2004 29.137C31.9268 30.163 31.4328 31.1169 30.7526 31.9323C29.7169 33.1768 27.7732 34.6796 24.3886 34.6796Z"
                fill="#292929"
              />
            </svg>
            <!-- ******Extremly Happy************************************ -->
            <svg
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click.stop="selectedEmoji = 'Extremly Happy'"
              :class="selectedEmoji == 'Extremly Happy'?'selected-emoji':''"
            >
              <path
                d="M24.6651 48.1904C37.9199 48.1904 48.6651 37.4453 48.6651 24.1904C48.6651 10.9356 37.9199 0.19043 24.6651 0.19043C11.4102 0.19043 0.665039 10.9356 0.665039 24.1904C0.665039 37.4453 11.4102 48.1904 24.6651 48.1904Z"
                fill="#787878"
              />
              <path
                d="M15.3428 27.5479H33.9774C33.9774 27.5479 32.8071 34.9654 24.6601 34.9654C16.5131 34.9654 15.3428 27.5479 15.3428 27.5479Z"
                fill="#292929"
              />
              <path
                d="M15.3427 21.1577C15.3427 19.8376 14.4265 18.7676 13.2946 18.7676C12.1627 18.7676 11.2451 19.8376 11.2451 21.1577C11.2451 22.4777 12.1627 23.5478 13.2946 23.5478C14.4265 23.5478 15.3427 22.4777 15.3427 21.1577Z"
                fill="#292929"
              />
              <path
                d="M38.078 21.1577C38.078 19.8376 37.1604 18.7676 36.0286 18.7676C34.8967 18.7676 33.9805 19.8376 33.9805 21.1577C33.9805 22.4777 34.8981 23.5478 36.0286 23.5478C37.1591 23.5478 38.078 22.4777 38.078 21.1577Z"
                fill="#292929"
              />
            </svg>
          </div>
          <p>Feedback Tags</p>
          <div class="feedback-tags-container">
            <button v-for="tag in feedbackTags" :class="tag.status?'selected-feedBack':''" @click.stop="tag.status = !tag.status">{{tag.name}}</button>
          </div>
          <p>Description</p>
          <textarea v-model="feedbackDescription" cols="80" rows="5"></textarea>
        </div>
        <div class="invite-button-container">
          <!-- <button class="cancel-button">Cancel</button> -->
          <button class="update-address" @click.stop="submitRenderFeedBack">SUBMIT</button>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="renderAgainWindow?'showPopUp':''">
      <div class="popup-container" style="width:60vw; padding:2.6677rem 3.2rem;">
        <div class="close-popup" @click="renderAgainWindow = false">
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
        <renderAgain :render="render"></renderAgain>
      </div>
    </div>
    
    <MessageComponent :changeRight="message" />
  </section>
  <!-- <nuxt-link to="/selectr"> -->
  <!-- </nuxt-link> -->
</template>
<script>
import { mapState, mapActions, mapMutations  } from "vuex";
import renderAgain from "@/components/shared/renderAgain.vue";
import DashboardGalleryMixin from "../mixins/dashboardGalleryMixin";

export default {
  layout: "dashboard",
  mixins: [ DashboardGalleryMixin ],
  components: {
    renderAgain
  },
  props: {
    render:Object,
    otherRenders:Array,
    user:Object
  },
  data() {
    return {
      left:false,
      right:true,
      totalrounds: 10,
      feedbackPopup: false,
      renderFullView: false,
      mainImageUrl:undefined,
      feedbackTags: [{
          name:"High Speed",
          status:false
         },{
          name:"Color & Tones",
          status:false
         },{
          name:"Perfect Lighting",
          status:false
         },{
          name:"Clarity",
          status:false
         },{
          name:"Too much light",
          status:false
         },{
          name:"Too less light",
          status:false
         },{
          name:"Missing Product",
          status:false
         },{
          name:"Missing Material",
          status:false
         },{
          name:"Perfect Quality",
          status:false
         },{
          name:"Time-consuming",
          status:false
         },{
          name:"Camera angle",
          status:false
         },{
          name:"Noise",
          status:false
         },{
          name:"Environment",
          status:false
         },
      ],
      selectedFeedBackTag:undefined,
      selectedEmoji:undefined,
      renderAgainWindow:false,
      feedbackDescription:'',
      message: {
        value: "",
        error: false,
        global:false
      },
      currentRender:this.render,
      fullImageUrl:undefined,
      pageSize:20,
      pageNum:1
    };
  },
  computed: {
    ...mapState({
      progress:state=>state.Render.progress,
      renderCount:state => state.Render.renderCount,
    }),      
  },
  // created() {
  //   this.unsubscribe = this.$store.subscribe((mutation, state) => {
  //     console.log(mutation,state)
  //     if (mutation.type === 'Render/setProgress') {
  //       console.log(`Updating to ${state.Render.progress}`);
  //     }
  //   });
  // },
  // beforeDestroy() {
  //   this.unsubscribe();
  // },
  watch: {
    progress:function(data){
      console.log(data)
    }
  },
  mounted() {
    if(this.render && this.render.stateInfo.state == 'COMPLETED')
    {
      if(this.render.enhancedImage || this.render.output["1"][0])
      this.downloadRenderAPi({uri:this.render.enhancedImage?this.render.enhancedImage:this.render.output["1"][0]}).then(res => {
        this.mainImageUrl = res.url
        this.fullImageUrl = res.url
        this.$parent.mainImageUrl = res.url
      });
    }
    document.addEventListener("keydown", event => {
      if(this.renderFullView){
        if(event.keyCode == 39){
          this.mainImageChange('right')
        }
        if(event.keyCode == 37){
          this.mainImageChange('left')
        }
      }
    });
  },
  methods: {
    ...mapActions({
      downloadRenderAPi: 'Render/downloadRender',
      updateRenderData: "Render/updateRenderData",
      fetchRenderPage:'Render/fetchRenderPage',
    }),
    ...mapMutations({
      setSelectedRender: "Render/setSelectedRender"
    }),
    addRender(data){
      if(window.analytics)
      window.analytics.track('gallery_renderstrip_clicked', {
          title: 'Clicked on any render in right strip',
          subtitle: 'Clicked on any render in right strip',
      }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      if(data.stateInfo.state == 'COMPLETED'){
        this.setSelectedRender(data)
        if(this.$route.query.project){
          this.$router.push('/gallery/'+data._id+'?project='+this.$route.query.project+'&count='+this.$route.query.count)
        }else
          this.$router.push('/gallery/'+data._id)
      }
    },
    timeStampUrl(url){
      return url +'?'+ Date.now();
    },
    getFileName(file,index){
      if(index){
        return file.slice(file.lastIndexOf('/')+1,file.lastIndexOf('?'))
      }else
        return file.slice(file.lastIndexOf('/')+1,file.lastIndexOf('.')).replace(".effectsResult","")
    },
    submitRenderFeedBack(){
      let filterFeedback  = [];
      
      this.feedbackTags.forEach(feedback => {
        if(feedback.status == true)
          filterFeedback.push(feedback.name);
      });
      if(this.selectedEmoji && filterFeedback.length>0){
        this.updateRenderData({
          "renderId": this.render._id,
          "info": {
            "feedback": {
              description: this.feedbackDescription,
              feedbackTags:filterFeedback,
              emoji:this.selectedEmoji
            }
          }
        }).then(res => {
          this.feedbackPopup = false;
          this.message.value = "Your feedback really counts! Thank you for sharing.";
            this.message.global = true;
            setTimeout(() => {
              this.message.value = "";
              this.message.global = false;
            }, 3000);
        })
      }else{
        this.message.value = "Please select emoji and feedback tag";
            this.message.global = true;
            setTimeout(() => {
              this.message.value = "";
              this.message.global = false;
            }, 3000);
      }
    },
    renderAgainWindowOpen(){
      if(window.analytics)
      window.analytics.track('gallery_Render_again_Opened', {
          title: 'Clicked on Render again',
          subtitle: 'Clicked on Render again',
      }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
    },
    renderFeedBackWindow(){
    if(window.analytics)
    window.analytics.track('gallery_Renderfeedback_opened', {
          title: 'Clicked on Render feedback',
        subtitle: 'Clicked on Render feedback',
    }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
    },
    backToGallery(){
      if(this.$store.Routing.from.fullPath == '/gallery')
      {
        this.$store.state.Render.viaProject = undefined
        this.$store.state.Render.renderPaged = null
      }
      if(this.$store.Routing.from.params.id)
        {
          this.$store.state.Render.renderPaged = null
          this.$router.push('/gallery')
        }else
      this.$router.push(this.$store.Routing.from.fullPath)
    },
    mainImageChange(step){
      let selectedRenderIndex = this.otherRenders.findIndex(renderData => renderData._id === this.currentRender._id);
      if(window.analytics)
      window.analytics.track('gallery_fullscreen_mode_opened', {
          title: 'Full screen mode opened',
          subtitle: 'Full screen mode opened',
      }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      this.left = true;
      this.right = true;
      if(step== 'left' && selectedRenderIndex !== 0){
        selectedRenderIndex = selectedRenderIndex - 1;
      }
      if(step == 'right' && selectedRenderIndex !== this.otherRenders.length-1)
        selectedRenderIndex = selectedRenderIndex + 1;
      if(selectedRenderIndex == this.otherRenders.length-1){
        this.right = false
      }
      if(selectedRenderIndex == 0){
        this.left = false
      }
      this.currentRender = this.otherRenders[selectedRenderIndex]
      if(this.otherRenders[selectedRenderIndex].enhancedImage || this.otherRenders[selectedRenderIndex].output["1"][0])
        this.downloadRenderAPi({uri:this.otherRenders[selectedRenderIndex].enhancedImage?this.otherRenders[selectedRenderIndex].enhancedImage:this.otherRenders[selectedRenderIndex].output["1"][0]}).then(res => {
          this.fullImageUrl = res.url
          // this.$parent.mainImageUrl = res.url
        })
    },
    onRendersScroll(e) {
      let obj = e.target;
      
      if ((obj.scrollTop + 1 > (obj.scrollHeight - obj.offsetHeight)) ) {
          this.pageNum = this.pageNum + 1;
          let payload = {
            accountId:this.user.accountId,"page": this.pageNum,
            "limit": this.pageSize,
            "sortBy": { updatedAt : -1 }
          }
          if(this.$route.query.project)
            payload.project = this.$route.query.project

          this.fetchRenderPage(payload).then(res => {
              console.log(res)
          })
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.select-render-section {
  padding: 2.5rem !important;
  background: #E5E5E5;
  height: calc( 100vh - 7.3rem );
  // overflow: hidden;

  .backToGallery{
    text-decoration: none;
    color: #4D4C4D;
    cursor: pointer;
    width: max-content;
  }
  .all-render-container {
    display: grid;
    .individual-render-container {
      display: grid;
      grid-template-columns: 1fr 20%;
      grid-gap: 1rem;
      /* background: white; */
      height: 65vh;
      .render-image-button-container{
        display: grid;
        grid-template-rows: minmax(0, 1fr) max-content;
        height: 65vh;
        background: white;
        position: relative;
        svg{
          position: absolute;
          top: 0px;
          right: 0px;
          cursor: pointer;
        }
      }
      .main-img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        cursor: pointer;
      }
      .btn {
        display: grid;
        grid-template-columns: max-content max-content;
        grid-column-gap: 8px;
        justify-self: end;
        padding: 8px;        
        button {
          cursor: pointer;
          font-weight: 500;
          font-size: 12px;
          line-height: 15px;
          width: 131.92px;
          height: 32px;
          background: #f7e3df;
          color: #3a393a;
        }
      }
      .render-thumbnails-container {
        // grid-column: 2;
        // grid-row: 1/3;
        /* height: 660px; */
        background: white;
        overflow: auto;
        padding: 30px 8px 8px 8px;
        cursor: pointer;
        position: relative;
        p {
          font-style: italic;
          font-weight: 600;
          font-size: 11px;
          line-height: 13px;
          color: #d48e8e;
          padding: 0;
          margin: 12px 0px;
          
        }
        .show-more{
          position: absolute;
          top:10px;
          left: 8px;
          margin: 0px;
        }
        .render-thumbnails {
          display: grid;
          grid-template-columns: 85% 15%;
          
          .render-thumnail-img-container{
            grid-row: 1;
            grid-column: 1/3;
            position: relative;
            display: grid;
            background: #D1D1D1;
            img {
              height: 10rem;
              width: 100%;
              object-fit: contain;
              // border: 1px solid #e9beb3;
            }
            .new-render-status{
              position: absolute;
              left: 0px;
              right: 0px;
              bottom: 0px;
              text-align: center;
              p{
                  margin-bottom: 20px;
              }
              .progress-indicator-container{
                  width: 100%;
                  div{
                      height: 4px;
                      background: #D48E8E;
                      width: 0%;
                  }
              }
            }
          }
          
          p {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 15px;
            color: #3a393a;
            grid-row: 2;
            margin-top: 4px;
          }
          p:nth-child(2) {
            grid-column: 1/2;
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
          }
          p:nth-child(3) {
            grid-column: 2/3;
            justify-self: end;
          }
          
        }
        .active-render{
          img{
            border: 2px solid #e9beb3;
            box-shadow: 0px 0px 0px 1px;
          }
        }
      }
    }
  }
  .emoji-container {
    display: grid;
    grid-template-columns: repeat(4, max-content);
    grid-gap: 3rem;
    justify-content: center;
    cursor: pointer;
    svg {
      fill: #787878;
      &:hover {
        path:nth-child(1) {
          fill: #e9beb3;
        }
      }
    }
    .selected-emoji{
      path:nth-child(1){
        fill: #e9beb3;
      }
    }
  }
  .feedback-section {
    padding-right: 0;
    p {
      color: white;
      font-size: 11px;
    }
    .feedback-tags-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      width: 100%;
      height: 112.25px;
      background: #303030;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
      padding: 0.75rem;
      grid-gap: 0.5rem;
      margin-bottom: 0.625rem;
      button {
        font-size: 10px;
        line-height: 12px;
        background: #4d4c4d;
        color: #d1d1d1;
        border: 1px solid transparent;
        cursor: pointer;
        outline: none;
        &:hover {
          background: #2b2a2b;
          border: 1px solid #e9beb3;
        }
      }
      .selected-feedBack{
        background: #2b2a2b;
        border: 1px solid #e9beb3;
      }
    }
  }
  .sub-text {
    font-size: 14px;
    line-height: 17px;
    margin-top: 8px;
  }
  .invite-button-container {
    justify-content: flex-end;
    button {
      margin-top: 10px;
    }
  }
  .full-view-render {
    background: rgba(37, 37, 37, 0.95);
    .popup-container {
      padding: 0;
      background: none;
      .close-popup {
        right: 0;
        top: 0;
        svg {
          background: none;
          width: 2rem;
          height: 1.5rem;
          padding: 0;
          cursor: pointer;
        }
      }
      .popup-details {
        max-height: unset;
        padding: 0;
        height: 100%;
        width: 100vw;
        display: grid;
        place-content: center;
        svg {
          position: absolute;
          cursor: pointer;
        }
        svg:nth-child(1) {
          left: 3.75rem;
          top: calc(50% - 1.25rem);
        }
        svg:nth-child(3) {
          right: 3.75rem;
          top: calc(50% - 1.25rem);
        }
        img {
          width: auto;
          height: 85vh;
          max-height: 99vh;
          max-width: 95vw;
        }
      }
    }
  }
 
}
</style>
<template>
  <section>
    <header>
      <div class="neo-title">
        <div v-if="user">
          <img class="small-logo" v-if="isAPCatalogServiceAssigned" src="../../assets/images/ap-logo.png" alt="">
          <img v-else-if="user.whitelabel" :src="user.whitelabelData.logo" alt="">
          <h2 v-else>Neo</h2>
        </div>
      </div>
      <div class="plan-offer" v-if="isPlanSticky && $route.path == '/settings/plans_new'">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.3283 10.8193C11.4186 10.909 11.4802 11.0236 11.5053 11.1484C11.5305 11.2732 11.518 11.4026 11.4694 11.5203C11.4209 11.638 11.3385 11.7386 11.2327 11.8095C11.1269 11.8803 11.0024 11.9181 10.8751 11.9181C10.7478 11.9181 10.6234 11.8803 10.5176 11.8095C10.4118 11.7386 10.3294 11.638 10.2808 11.5203C10.2323 11.4026 10.2198 11.2732 10.2449 11.1484C10.27 11.0236 10.3316 10.909 10.4219 10.8193C10.5424 10.6996 10.7053 10.6323 10.8751 10.6323C11.045 10.6323 11.2079 10.6996 11.3283 10.8193ZM6.78333 7.18071C6.87362 7.09096 6.93523 6.97642 6.96034 6.85162C6.98546 6.72681 6.97295 6.59736 6.92441 6.47967C6.87586 6.36198 6.79347 6.26135 6.68767 6.19055C6.58187 6.11974 6.45743 6.08194 6.33012 6.08194C6.20281 6.08194 6.07837 6.11974 5.97257 6.19055C5.86677 6.26135 5.78437 6.36198 5.73583 6.47967C5.68729 6.59736 5.67478 6.72681 5.69989 6.85162C5.72501 6.97642 5.78662 7.09096 5.8769 7.18071C5.99735 7.30045 6.16028 7.36765 6.33012 7.36765C6.49995 7.36765 6.66288 7.30045 6.78333 7.18071ZM16.7026 9.88714C16.9005 10.1545 17.0414 10.4596 17.1166 10.7836C17.1918 11.1076 17.1997 11.4436 17.1398 11.7707C16.993 12.0761 16.7848 12.3479 16.5282 12.5692C16.2715 12.7904 15.972 12.9563 15.6483 13.0564C15.3591 13.1638 15.0929 13.3252 14.864 13.5321C14.739 13.817 14.665 14.1217 14.6455 14.4321C14.6501 14.7698 14.5845 15.1048 14.4528 15.4158C14.3211 15.7267 14.1262 16.0069 13.8805 16.2386C13.5877 16.3971 13.2657 16.4942 12.9341 16.524C12.6025 16.5539 12.2683 16.5158 11.9519 16.4121C11.6452 16.336 11.3279 16.312 11.0133 16.3414C10.7684 16.4998 10.5512 16.6974 10.3705 16.9264C10.1697 17.2214 9.90804 17.4699 9.60307 17.6551C9.29809 17.8403 8.95693 17.9579 8.60262 18C8.26101 17.9563 7.93214 17.8424 7.63674 17.6654C7.34133 17.4884 7.08578 17.2521 6.88619 16.9714C6.69584 16.7397 6.46761 16.5419 6.21119 16.3864C5.89662 16.3538 5.57874 16.3777 5.27262 16.4571C4.95624 16.5608 4.62204 16.5989 4.29045 16.569C3.95886 16.5392 3.63683 16.4421 3.34405 16.2836C3.09156 16.0507 2.89117 15.7671 2.756 15.4514C2.62084 15.1356 2.55396 14.7948 2.55976 14.4514C2.54019 14.1409 2.46621 13.8363 2.34119 13.5514C2.1047 13.3417 1.82956 13.1801 1.53119 13.0757C1.2075 12.9756 0.907976 12.8097 0.651346 12.5884C0.394717 12.3672 0.186512 12.0954 0.0397598 11.79C-0.0201612 11.4628 -0.0122812 11.1269 0.0629121 10.8029C0.138105 10.4789 0.279011 10.1738 0.476903 9.90643C0.671776 9.63397 0.811537 9.32606 0.888331 9C0.824926 8.68436 0.702809 8.38343 0.528331 8.11286C0.330439 7.84553 0.189534 7.54042 0.114341 7.21642C0.0391474 6.89243 0.0312673 6.55645 0.0911884 6.22929C0.230116 5.92544 0.429427 5.65306 0.676989 5.4287C0.92455 5.20435 1.21518 5.03273 1.53119 4.92429C1.82045 4.81694 2.08662 4.65549 2.31547 4.44857C2.4405 4.16369 2.51448 3.85906 2.53405 3.54857C2.53268 3.20899 2.60232 2.87287 2.73849 2.56179C2.87465 2.2507 3.07435 1.97152 3.32476 1.74214C3.61755 1.58365 3.93957 1.48652 4.27116 1.45668C4.60276 1.42684 4.93695 1.46491 5.25333 1.56857C5.55946 1.64799 5.87733 1.67194 6.1919 1.63929C6.44833 1.48381 6.67656 1.28601 6.8669 1.05429C7.06609 0.766647 7.32357 0.524132 7.6226 0.342497C7.92164 0.160861 8.25554 0.0441684 8.60262 0C8.94423 0.0436635 9.27309 0.157595 9.5685 0.334618C9.86391 0.511641 10.1195 0.74792 10.319 1.02857C10.4997 1.25756 10.7169 1.45521 10.9619 1.61357C11.2765 1.64623 11.5943 1.62228 11.9005 1.54286C12.2169 1.43919 12.5511 1.40112 12.8826 1.43096C13.2142 1.46081 13.5363 1.55794 13.829 1.71643C14.0874 1.94638 14.2938 2.22869 14.4345 2.54459C14.5753 2.86048 14.6472 3.20273 14.6455 3.54857C14.665 3.85906 14.739 4.16369 14.864 4.44857C15.1005 4.65832 15.3757 4.81991 15.674 4.92429C15.9977 5.02444 16.2973 5.19032 16.5539 5.41155C16.8105 5.63279 17.0187 5.90461 17.1655 6.21C17.2254 6.53716 17.2175 6.87315 17.1423 7.19714C17.0671 7.52113 16.9262 7.82624 16.7283 8.09357C16.5335 8.36603 16.3937 8.67394 16.3169 9C16.3882 9.31745 16.5191 9.61849 16.7026 9.88714ZM4.96405 8.09357C5.23403 8.36262 5.57768 8.54563 5.9516 8.6195C6.32552 8.69337 6.71295 8.65479 7.06496 8.50863C7.41697 8.36246 7.71778 8.11527 7.9294 7.79826C8.14101 7.48125 8.25395 7.10865 8.25395 6.7275C8.25395 6.34635 8.14101 5.97375 7.9294 5.65674C7.71778 5.33973 7.41697 5.09254 7.06496 4.94637C6.71295 4.80021 6.32552 4.76163 5.9516 4.8355C5.57768 4.90937 5.23403 5.09238 4.96405 5.36143C4.78425 5.5406 4.6416 5.7535 4.54426 5.98792C4.44692 6.22234 4.39681 6.47367 4.39681 6.7275C4.39681 6.98133 4.44692 7.23266 4.54426 7.46708C4.6416 7.7015 4.78425 7.9144 4.96405 8.09357ZM12.2412 6.27429C12.3622 6.15323 12.4302 5.98905 12.4302 5.81786C12.4302 5.64666 12.3622 5.48248 12.2412 5.36143C12.1201 5.24038 11.956 5.17237 11.7848 5.17237C11.6136 5.17237 11.4494 5.24038 11.3283 5.36143L4.96405 11.7257C4.90379 11.7855 4.85597 11.8566 4.82333 11.9349C4.79069 12.0133 4.77389 12.0973 4.77389 12.1821C4.77389 12.267 4.79069 12.351 4.82333 12.4294C4.85597 12.5077 4.90379 12.5788 4.96405 12.6386C5.02381 12.6988 5.09491 12.7466 5.17325 12.7793C5.25158 12.8119 5.33561 12.8287 5.42047 12.8287C5.50534 12.8287 5.58936 12.8119 5.6677 12.7793C5.74604 12.7466 5.81714 12.6988 5.8769 12.6386L12.2412 6.27429ZM12.2412 9.90643C11.9712 9.63738 11.6276 9.45437 11.2536 9.3805C10.8797 9.30663 10.4923 9.34521 10.1403 9.49137C9.78826 9.63754 9.48746 9.88473 9.27584 10.2017C9.06422 10.5187 8.95128 10.8913 8.95128 11.2725C8.95128 11.6537 9.06422 12.0263 9.27584 12.3433C9.48746 12.6603 9.78826 12.9075 10.1403 13.0536C10.4923 13.1998 10.8797 13.2384 11.2536 13.1645C11.6276 13.0906 11.9712 12.9076 12.2412 12.6386C12.421 12.4594 12.5636 12.2465 12.661 12.0121C12.7583 11.7777 12.8084 11.5263 12.8084 11.2725C12.8084 11.0187 12.7583 10.7673 12.661 10.5329C12.5636 10.2985 12.421 10.0856 12.2412 9.90643Z" fill="white"/>
        </svg>
        <p>{{ $t("mainNav.planOffer[0]") }} <b style="color: #ffab40;">{{ $t("mainNav.planOffer[1]") }} 63%</b> {{ $t("mainNav.planOffer[2]") }}</p>
      </div>
      <div v-else></div>

      <div class="right-nav">
        <div v-if="false" class="search-input">
          <input autocomplete="off" type="search" name id placeholder="search" />
          <svg
            width="15"
            height="18"
            viewBox="0 0 15 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.52837 1.98354C5.90645 1.72351 7.30107 2.2388 8.21467 3.29895C8.88126 4.08135 9.19565 5.05994 9.07156 6.12127C8.99829 7.10815 8.4629 8.05248 7.6805 8.71906C7.17584 9.13863 6.5849 9.44475 5.9585 9.56294C4.58043 9.82296 3.18581 9.30767 2.2722 8.24753C0.92721 6.62009 1.11629 4.18423 2.74374 2.83923C3.31104 2.40784 3.90198 2.10173 4.52837 1.98354ZM4.41018 1.35714C3.6585 1.49897 3.00493 1.8169 2.38681 2.32275C0.481622 3.91476 0.238174 6.7501 1.83018 8.65528C2.91634 9.94235 4.57334 10.473 6.0767 10.1893C6.82837 10.0475 7.48195 9.72957 8.10007 9.22372C10.0053 7.63171 10.2487 4.79638 8.65669 2.89119C7.63317 1.59231 5.97617 1.06166 4.41018 1.35714Z"
              fill="#222021"
            />
            <path
              d="M9.40141 10.2756L13.1776 14.8175L12.2817 15.5704L8.50555 11.0284L9.40141 10.2756ZM9.28322 9.64916C9.15794 9.6728 9.09531 9.68462 8.98185 9.7709L8.08598 10.5238C7.80824 10.7708 7.81652 11.1584 7.98908 11.3854L11.8279 15.9155C11.9886 16.0798 12.2002 16.1696 12.4507 16.1223C12.576 16.0987 12.6386 16.0869 12.7521 16.0006L13.648 15.2477C13.9257 15.0007 13.9174 14.613 13.7449 14.3861L9.84344 9.8678C9.73352 9.62906 9.47114 9.6137 9.28322 9.64916Z"
              fill="#222021"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.23916 10.5106L7.50993 9.74L8.23626 9.05265L8.96549 9.82323L8.23916 10.5106Z"
              fill="#222021"
            />
          </svg>
        </div>
        <div class="switch-locale-dropdown">
          <BasicDropDown
            :selected="$i18n.locale"
            :drop-down-list="availableLocales"
            :clickable="true"
            :close-drop-down-on-item-selection="true"
            @listElementClick="handleLocaleDropDownItemClicl"
          />
        </div>
        <!-- <button class='btn2' @click="onClickBeta(true)" v-if="!isBetaClicked && isTryBetaCode">Try Beta</button>
        <button class='btn2' @click="onClickBeta(false)" v-if="isBetaClicked && isTryBetaCode">Exit Beta</button> -->
        <div class="moodboard-beta-link" v-if="($route.path == '/dashboard' || $route.path == '/dashboard/') && !isUserAMoodboardUser">
          <button class="moodboard-beta-button try-moodboard-button" @click="handleTryMoodboardButtonClick">
            {{ $t("buttonText.tryMoodboard") }}
          </button>
          <!-- <svg data-v-55dc9f68="" width="26" height="11" viewBox="0 0 26 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-55dc9f68="" d="M0 4C0 1.79086 1.79086 0 4 0H22C24.2091 0 26 1.79086 26 4V7C26 9.20914 24.2091 11 22 11H0V4Z" fill="#E9BEB3"></path> <path data-v-55dc9f68="" d="M8.179 5.452C8.459 5.54067 8.67833 5.69 8.837 5.9C8.99567 6.10533 9.075 6.35967 9.075 6.663C9.075 7.09233 8.907 7.42367 8.571 7.657C8.23967 7.88567 7.75433 8 7.115 8H4.581V3.1H6.975C7.57233 3.1 8.02967 3.21433 8.347 3.443C8.669 3.67167 8.83 3.982 8.83 4.374C8.83 4.612 8.77167 4.82433 8.655 5.011C8.543 5.19767 8.38433 5.34467 8.179 5.452ZM5.708 3.954V5.109H6.835C7.115 5.109 7.32733 5.06 7.472 4.962C7.61667 4.864 7.689 4.71933 7.689 4.528C7.689 4.33667 7.61667 4.19433 7.472 4.101C7.32733 4.003 7.115 3.954 6.835 3.954H5.708ZM7.031 7.146C7.32967 7.146 7.55367 7.097 7.703 6.999C7.857 6.901 7.934 6.74933 7.934 6.544C7.934 6.138 7.633 5.935 7.031 5.935H5.708V7.146H7.031ZM13.5455 6.131C13.5455 6.145 13.5385 6.243 13.5245 6.425H10.6755C10.7269 6.65833 10.8482 6.84267 11.0395 6.978C11.2309 7.11333 11.4689 7.181 11.7535 7.181C11.9495 7.181 12.1222 7.153 12.2715 7.097C12.4255 7.03633 12.5679 6.943 12.6985 6.817L13.2795 7.447C12.9249 7.853 12.4069 8.056 11.7255 8.056C11.3009 8.056 10.9252 7.97433 10.5985 7.811C10.2719 7.643 10.0199 7.412 9.84254 7.118C9.66521 6.824 9.57654 6.49033 9.57654 6.117C9.57654 5.74833 9.66287 5.417 9.83554 5.123C10.0129 4.82433 10.2532 4.59333 10.5565 4.43C10.8645 4.262 11.2075 4.178 11.5855 4.178C11.9542 4.178 12.2879 4.25733 12.5865 4.416C12.8852 4.57467 13.1185 4.80333 13.2865 5.102C13.4592 5.396 13.5455 5.739 13.5455 6.131ZM11.5925 5.004C11.3452 5.004 11.1375 5.074 10.9695 5.214C10.8015 5.354 10.6989 5.54533 10.6615 5.788H12.5165C12.4792 5.55 12.3765 5.361 12.2085 5.221C12.0405 5.07633 11.8352 5.004 11.5925 5.004ZM16.7016 7.818C16.5942 7.89733 16.4612 7.958 16.3026 8C16.1486 8.03733 15.9852 8.056 15.8126 8.056C15.3646 8.056 15.0169 7.94167 14.7696 7.713C14.5269 7.48433 14.4056 7.14833 14.4056 6.705V5.158H13.8246V4.318H14.4056V3.401H15.4976V4.318H16.4356V5.158H15.4976V6.691C15.4976 6.84967 15.5372 6.97333 15.6166 7.062C15.7006 7.146 15.8172 7.188 15.9666 7.188C16.1392 7.188 16.2862 7.14133 16.4076 7.048L16.7016 7.818ZM18.8335 4.178C19.4169 4.178 19.8649 4.318 20.1775 4.598C20.4902 4.87333 20.6465 5.291 20.6465 5.851V8H19.6245V7.531C19.4192 7.881 19.0365 8.056 18.4765 8.056C18.1872 8.056 17.9352 8.007 17.7205 7.909C17.5105 7.811 17.3495 7.67567 17.2375 7.503C17.1255 7.33033 17.0695 7.13433 17.0695 6.915C17.0695 6.565 17.2002 6.28967 17.4615 6.089C17.7275 5.88833 18.1359 5.788 18.6865 5.788H19.5545C19.5545 5.55 19.4822 5.368 19.3375 5.242C19.1929 5.11133 18.9759 5.046 18.6865 5.046C18.4859 5.046 18.2875 5.07867 18.0915 5.144C17.9002 5.20467 17.7369 5.28867 17.6015 5.396L17.2095 4.633C17.4149 4.48833 17.6599 4.37633 17.9445 4.297C18.2339 4.21767 18.5302 4.178 18.8335 4.178ZM18.7495 7.321C18.9362 7.321 19.1019 7.279 19.2465 7.195C19.3912 7.10633 19.4939 6.978 19.5545 6.81V6.425H18.8055C18.3575 6.425 18.1335 6.572 18.1335 6.866C18.1335 7.006 18.1872 7.118 18.2945 7.202C18.4065 7.28133 18.5582 7.321 18.7495 7.321Z" fill="#232121"></path></svg> -->
        </div>
        <nuxt-link class="moodboard-beta-link" v-if="false && isMoodboardBetaUser && $route.path == '/dashboard/moodboard'" to="/dashboard">
          <button class="moodboard-beta-button exit-moodboard-button">
            {{ $t("buttonText.exitMoodboard") }}
          </button>
          <svg data-v-55dc9f68="" width="26" height="11" viewBox="0 0 26 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-55dc9f68="" d="M0 4C0 1.79086 1.79086 0 4 0H22C24.2091 0 26 1.79086 26 4V7C26 9.20914 24.2091 11 22 11H0V4Z" fill="#E9BEB3"></path> <path data-v-55dc9f68="" d="M8.179 5.452C8.459 5.54067 8.67833 5.69 8.837 5.9C8.99567 6.10533 9.075 6.35967 9.075 6.663C9.075 7.09233 8.907 7.42367 8.571 7.657C8.23967 7.88567 7.75433 8 7.115 8H4.581V3.1H6.975C7.57233 3.1 8.02967 3.21433 8.347 3.443C8.669 3.67167 8.83 3.982 8.83 4.374C8.83 4.612 8.77167 4.82433 8.655 5.011C8.543 5.19767 8.38433 5.34467 8.179 5.452ZM5.708 3.954V5.109H6.835C7.115 5.109 7.32733 5.06 7.472 4.962C7.61667 4.864 7.689 4.71933 7.689 4.528C7.689 4.33667 7.61667 4.19433 7.472 4.101C7.32733 4.003 7.115 3.954 6.835 3.954H5.708ZM7.031 7.146C7.32967 7.146 7.55367 7.097 7.703 6.999C7.857 6.901 7.934 6.74933 7.934 6.544C7.934 6.138 7.633 5.935 7.031 5.935H5.708V7.146H7.031ZM13.5455 6.131C13.5455 6.145 13.5385 6.243 13.5245 6.425H10.6755C10.7269 6.65833 10.8482 6.84267 11.0395 6.978C11.2309 7.11333 11.4689 7.181 11.7535 7.181C11.9495 7.181 12.1222 7.153 12.2715 7.097C12.4255 7.03633 12.5679 6.943 12.6985 6.817L13.2795 7.447C12.9249 7.853 12.4069 8.056 11.7255 8.056C11.3009 8.056 10.9252 7.97433 10.5985 7.811C10.2719 7.643 10.0199 7.412 9.84254 7.118C9.66521 6.824 9.57654 6.49033 9.57654 6.117C9.57654 5.74833 9.66287 5.417 9.83554 5.123C10.0129 4.82433 10.2532 4.59333 10.5565 4.43C10.8645 4.262 11.2075 4.178 11.5855 4.178C11.9542 4.178 12.2879 4.25733 12.5865 4.416C12.8852 4.57467 13.1185 4.80333 13.2865 5.102C13.4592 5.396 13.5455 5.739 13.5455 6.131ZM11.5925 5.004C11.3452 5.004 11.1375 5.074 10.9695 5.214C10.8015 5.354 10.6989 5.54533 10.6615 5.788H12.5165C12.4792 5.55 12.3765 5.361 12.2085 5.221C12.0405 5.07633 11.8352 5.004 11.5925 5.004ZM16.7016 7.818C16.5942 7.89733 16.4612 7.958 16.3026 8C16.1486 8.03733 15.9852 8.056 15.8126 8.056C15.3646 8.056 15.0169 7.94167 14.7696 7.713C14.5269 7.48433 14.4056 7.14833 14.4056 6.705V5.158H13.8246V4.318H14.4056V3.401H15.4976V4.318H16.4356V5.158H15.4976V6.691C15.4976 6.84967 15.5372 6.97333 15.6166 7.062C15.7006 7.146 15.8172 7.188 15.9666 7.188C16.1392 7.188 16.2862 7.14133 16.4076 7.048L16.7016 7.818ZM18.8335 4.178C19.4169 4.178 19.8649 4.318 20.1775 4.598C20.4902 4.87333 20.6465 5.291 20.6465 5.851V8H19.6245V7.531C19.4192 7.881 19.0365 8.056 18.4765 8.056C18.1872 8.056 17.9352 8.007 17.7205 7.909C17.5105 7.811 17.3495 7.67567 17.2375 7.503C17.1255 7.33033 17.0695 7.13433 17.0695 6.915C17.0695 6.565 17.2002 6.28967 17.4615 6.089C17.7275 5.88833 18.1359 5.788 18.6865 5.788H19.5545C19.5545 5.55 19.4822 5.368 19.3375 5.242C19.1929 5.11133 18.9759 5.046 18.6865 5.046C18.4859 5.046 18.2875 5.07867 18.0915 5.144C17.9002 5.20467 17.7369 5.28867 17.6015 5.396L17.2095 4.633C17.4149 4.48833 17.6599 4.37633 17.9445 4.297C18.2339 4.21767 18.5302 4.178 18.8335 4.178ZM18.7495 7.321C18.9362 7.321 19.1019 7.279 19.2465 7.195C19.3912 7.10633 19.4939 6.978 19.5545 6.81V6.425H18.8055C18.3575 6.425 18.1335 6.572 18.1335 6.866C18.1335 7.006 18.1872 7.118 18.2945 7.202C18.4065 7.28133 18.5582 7.321 18.7495 7.321Z" fill="#232121"></path></svg>
        </nuxt-link>
        <template v-if="isUserAMoodboardUser && currentSubscription">
          <button v-if="!switchToMoodboard" class="moodboard-beta-button try-moodboard-button" @click="setSwitchToMoodboardAndRedirectToDashboard(true)">
            {{ $t("buttonText.switchToMoodboard") }}
          </button>
          <button v-else class="moodboard-beta-button try-moodboard-button" @click="setSwitchToMoodboardAndRedirectToDashboard(false)">
            {{ $t("buttonText.switchToNeo") }}
          </button>
        </template>
        <!-- removed toggle neo 2.5 -->
        <Toggle v-if="false && $route.path !== '/dashboard/moodboard' && isTryBetaCode" :value="isBetaClicked" @onToggleChange="onClickBeta" label="Neo 2.5" :labelFirst="true"></Toggle>
        <button
          v-if="!switchToMoodboard && !isMoodboardUser && isTrial && user && user.accountType == 'root' &&
            user.accountInfo.accountCategory == 'REGULAR' && $route.path != '/settings/plans_new' && $route.path != '/settings/plans'"
          class
        >
          <nuxt-link @click.native="upgradeClicked" :to="localePath('/settings/plans_new')">{{ $t("buttonText.upgrade") }}</nuxt-link>
        </button>
        <button v-if="switchToMoodboard && isUserOnMoodBoardFreeTrial && ($route.path == '/dashboard' || $route.path == '/dashboard/')">
          <nuxt-link @click.native="upgradeClicked" :to="localePath('/moodboard/settings/profile')">{{ $t("buttonText.upgrade") }}</nuxt-link>
        </button>
        <div class="notify">
          <svg
            width="24"
            height="27"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 23C1 22.6 1 22.2 1 21.8C1 21.7 1.1 21.6 1.2 21.5C1.9 20.8 2.7 20 3.4 19.3C3.5 19.2 3.6 19 3.6 18.9C3.6 16.7 3.6 14.6 3.6 12.4C3.5 7.9 6.5 4.8 10 3.9H10.1C10.1 3.6 10.1 3.3 10.1 3C10.1 1.9 11 1 12 1C13 1 13.9 1.9 13.9 3C13.9 3.3 13.9 3.6 13.9 3.9C14.3 4 14.6 4.1 15 4.3C18.3 5.6 20.4 8.6 20.4 12.2C20.4 14.4 20.4 16.7 20.4 18.9C20.4 19.1 20.5 19.3 20.6 19.4C21.3 20.1 22.1 20.9 22.8 21.6C22.9 21.7 23 21.9 23 22C23 22.3 23 22.7 23 23C15.7 23 8.4 23 1 23Z"
              stroke="#F7E3DF"
              stroke-miterlimit="10"
            />
            <path
              d="M14.6 23C14.6 24.5 13.4 25.6 12 25.6C10.6 25.6 9.5 24.4 9.5 23C11.2 23 12.9 23 14.6 23Z"
              stroke="#F7E3DF"
              stroke-miterlimit="10"
            />
          </svg>

          <div class="notifications-container">
            <div class="gap">
              <div class="notify-head">
                <p>Notification(10)</p>
                <p class="all-readed">Mark all as Read</p>
              </div>
              <div class="notifications">
                <div class="notification">
                  <p>Member 1 has commented</p>
                  <span>Project Title</span>
                </div>
                <div class="notify-time">
                  <span>2d</span>
                </div>
              </div>
              <div class="notifications">
                <div class="notification">
                  <p>Member 1 has commented</p>
                  <span>Project Title</span>
                </div>
                <div class="notify-time">
                  <span>2d</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="neo-user">
          <div class="user-img">
            <img src="~assets/images/user.svg" alt />
          </div>
          <div class="user-menu">
            <div class="gap">
              <!-- /moodboard/settings/profile -->
              <nuxt-link :to="switchToMoodboard ? localePath('/moodboard/settings/profile') : localePath('/settings/profile')" @click.native="eventTrigger('Profile')">
                <img src="~assets/images/pencil.svg" alt />
                <p>{{ $t("buttonText.profile") }}</p>
              </nuxt-link>
              <!-- <nuxt-link v-if="user && user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR'" to="/settings/subscriptions">
                            <img src="~assets/images/subscription.svg" alt="">
                            <p>Plans & Add-ons</p>
              </nuxt-link>-->
              <nuxt-link v-if="!switchToMoodboard" :to="localePath('/settings/plans_new')" @click.native="eventTrigger('Plans')">
                <svg width="15" height="20" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.19038 11.2867L9.61007 11.8863L10.016 11.2774C10.3599 10.7615 10.7698 10.4408 11.2437 10.2792C12.4534 9.96484 13.5661 10.6802 13.8097 11.8981C13.9764 12.7314 13.7349 13.5008 13.276 14.235L13.272 14.2415L13.2681 14.2481C12.614 15.3695 11.5754 16.3195 10.5655 17.2284L10.5557 17.2372L10.5464 17.2465C10.2952 17.4977 10.0192 17.6904 9.72324 17.897C9.68767 17.9218 9.65181 17.9469 9.61567 17.9722L8.42372 17.0187C7.43876 16.1315 6.58952 15.2754 5.93189 14.1481L5.92433 14.1351L5.91602 14.1227C5.38631 13.3281 5.22773 12.4809 5.47891 11.6437C5.61282 11.1973 5.80215 10.8579 6.04655 10.6229C6.28364 10.395 6.5998 10.2385 7.04526 10.198L7.04527 10.198L7.04975 10.1975C7.85322 10.1172 8.5842 10.4208 9.19038 11.2867Z" fill="#EBBEB5" stroke="#EBBEB5"/>
                  <path d="M0.5 25V1.20001H16.1L20 5.5V25H0.5Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M15.4 1.20001L15.5 5.79999H20.5" stroke="#EBBEB5" stroke-miterlimit="10"/>
                </svg>
                <p>{{ $t("buttonText.plans") }}</p>
              </nuxt-link>
              <nuxt-link v-if="!switchToMoodboard" :to="localePath('/settings/plans')" @click.native="eventTrigger('Billing')">
                <!-- <img src="~assets/images/subscription.svg" alt /> -->
                <svg width="15" height="20" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.4 3.89999H2.5V25.2H19.4V3.89999Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M4.10001 3.79999V1.29999H22V23.3H19.3" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="square"/>
                  <path d="M1 10.7H3.9" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M1 14.8H3.9" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M1 18.4H3.9" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round"/>
                </svg>
                <p>{{ $t("buttonText.billing") }}</p>
              </nuxt-link>
              <div @click="signOut()">
                <img src="~assets/images/logout.svg" alt />
                <p>{{ $t("buttonText.logOut") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="events-banner" :class="{'showCompan': campaign && campaign.isActive}">
      <p>
        {{ $t("mainNav.campaignBannerText[0]") }}
        <span>$1</span>{{ $t("mainNav.campaignBannerText[1]") }}
        <a @click="upgrade(campaign.campaignPackages)">{{ $t("mainNav.campaignBannerText[2]") }}</a>  {{ $t("mainNav.campaignBannerText[3]") }}
        <span>NEO4ONE</span>.
      </p>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Toggle from "./Toggle.vue"
import BasicDropDown from "../shared/basicDropDown.vue";
export default {
  name: "MainNav",
  components: {
    Toggle,
    BasicDropDown
  },
  methods: {
    ...mapActions({
      getUser: "User/fetch",
      logout: "Auth/logout",
      buy: "Subscriptions/buy"
    }),
    ...mapMutations({
      setSwitchToMoodboardAndRedirectToDashboard: "User/setSwitchToMoodboardAndRedirectToDashboard",
      setSelectedLocale: "User/setSelectedLocale",
      setShowMoodboardSignupPopup: 'Dash/setShowMoodboardSignupPopup',
      setShowMoodboardBasicPaywall: "Dash/setShowMoodboardBasicPaywall",
    }),
    signOut() {
      this.logout().then(res => {
        // amplitude.getInstance().logEvent("logout");
        localStorage.removeItem('subscriptionCancel_chmln')
        window.location.href = res.url;
      });
    },
    upgrade: function(packageId) {
      console.log(packageId);
      this.buy({
        accountId: this.user.accountId,
        package: packageId,
        campaign: true
      }).then(res => {
        // amplitude
        //   .getInstance()
        //   .logEvent("compaignHit", { subscriptionId: this.packageId });
        window.open(res.hostedPage.url);
        this.packageId = "";
      });
    },
    eventTrigger(_page){
     analytics.track(_page, {
        title: `${_page} Clicked`,
        subtitle: "Click"
      },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
    },
    upgradeClicked: function() {
      analytics.track("Upgrade", {
        title: "Upgrade Clicked",
        subtitle: "Click"
      },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
    },
    // myAccountClicked: function() {
    //   analytics.track("My Account", {
    //     title: "Profile",
    //     subtitle: "Open"
    //   },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
    // },
    // plansClicked: function(_page) {
    //   analytics.track("Plans & Payments", {
    //     title: "Plans & Payments",
    //     subtitle: "Open"
    //   },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
    // },

    onClickBeta: function(tryBeta) {
      if (tryBeta) {
        window.$nuxt.$store.state.User.isBetaClicked = true;
         window.analytics.track(
                                            "Try_Beta_Button_Clicked",
                                            { title: "Try_Beta_Button_Clicked" },
                                            {
                                                integrations: {
                                                    Amplitude: { session_id: new Date().getTime() },
                                                },
                                            },
                                            { timestamp: new Date().getTime() }
                                        ); 
      } else {
        window.$nuxt.$store.state.User.isBetaClicked = false;
        window.analytics.track(
                                            "Exit_Beta_Button_Clicked",
                                            { title: "Exit_Beta_Button_Clicked" },
                                            {
                                                integrations: {
                                                    Amplitude: { session_id: new Date().getTime() },
                                                },
                                            },
                                            { timestamp: new Date().getTime() }
                                        ); 

      }
      // chmln.show('5dc93a036347090004d3949d')
      // this.$router.push(link)
    },
    handleTryMoodboardButtonClick() {
      if (!this.hasMoodBoardPlanExpired) {
        this.setShowMoodboardSignupPopup(true);
        if (window.analytics) {
          window.analytics.track(
              "MB_click_beta",
              { title: "MB click beta" },
              {
                  integrations: {
                      Amplitude: { session_id: new Date().getTime() },
                  },
              },
              { timestamp: new Date().getTime() }
          );
        }
      } else {
        this.setShowMoodboardBasicPaywall(true);
        if (window.analytics) {
          window.analytics.track(
              "MB_upgrade_later",
              { title: "MB upgrade later" },
              {
                  integrations: {
                      Amplitude: { session_id: new Date().getTime() },
                  },
              },
              { timestamp: new Date().getTime() }
          );
        }
      }
    },
    handleLocaleDropDownItemClicl(item) {
      this.setSelectedLocale(item);
    }
  },
  mounted() {
    // if (!this.user) {
    //   this.getUser();
    // }
    // if (!this.socketConnection) {
    //     this.socketOpen();
    // }
    // if(this.$ua.deviceType() !== 'pc')
    //   this.$router.push('/dashboard_mobile')
  },
  computed: {
    ...mapState({
      user: state => state.User.user,
      isTrial: state => state.Billing.isTrial,
      currentSubscription: state => state.Billing.currentSubscription,
      campaign: state => state.User.campaign,
      isPlanSticky: state => state.Billing.isPlanSticky,
      isBetaClicked: state => state.User.isBetaClicked,
      isTryBetaCode: state => state.User.isTryBetaCode,
      isMoodboardBetaUser: state => state.User.isMoodboardBetaUser,
      isMoodboardUser: state => state.User.isMoodboardUser,
      switchToMoodboard: state => state.User.switchToMoodboard,
      assignedServices: state => state.User.assignedServices,
      availableLocales: state => state.User.availableLocales,
      selectedLocale: state => state.User.selectedLocale,
      // socketConnection: state => state.Sockets.connected,
    }),
    ...mapGetters({
      doesUserHaveActiveMoodboardSubscription: "Billing/doesUserHaveActiveMoodboardSubscription",
      hasMoodBoardPlanExpired: "Billing/hasMoodBoardPlanExpired",
      isUserOnMoodBoardFreeTrial: "Billing/isUserOnMoodBoardFreeTrial",
      isUserOnMoodBoardPaidPlan: "Billing/isUserOnMoodBoardPaidPlan",
      hasNeoFreeTrialExpired: "Billing/hasNeoFreeTrialExpired",
      isUserAMoodboardUser: "Billing/isUserAMoodboardUser",
      isUserJapanese: "User/isUserJapanese",
      isAPCatalogServiceAssigned: "User/isAPCatalogServiceAssigned"
    }),
  }
};
</script>
<style lang="scss" scoped>
%floating-divs {
  position: absolute;
  right: 0rem;
  top: 1rem;
  z-index: 99;
  transition: all 0.2s ease-in-out;
  visibility: hidden;
  opacity: 0.5;
  padding-top: 1.25rem;
}
header {
  background: linear-gradient(90deg, #4d4c4d 0%, #201f20 100%), #201f20;
  display: grid;
  grid-template-columns: auto auto auto;
  border-bottom: 0.0625rem solid $color-head;
  height: 3.75rem;
  align-content: center;
}
.neo-title {
  align-self: center;
  padding-left: 2rem;

  div:first-of-type {
    display: flex;
    align-items: center;
  }
  h2 {
    text-transform: uppercase;
    color: $color-second;
  }
  img{
    max-height: 3.75rem;

    &.small-logo {
      max-height: 2.75rem;
    }
  }
}
.right-nav {
  display: grid;
  grid-template-columns: max-content max-content max-content max-content;
  grid-gap: 1.25rem;
  justify-content: end;
  padding-right: 0rem;
  align-self: center;
  input {
    background: #a6a5a6;
    border: 0.046875rem solid #edd1d1;
    color: black;
  }
  button {
    color: #f7e3df;
    padding: 0.3125rem 1.25rem;
    border: 0.0625rem solid $color-second;
    a {
      text-decoration: none;
      color: white;
    }
  }
  .search-input {
    position: relative;
    svg {
      position: absolute;
      right: 0.625rem;
      transform: translateY(-50%);
      top: 50%;
    }
  }
  .notify {
    display: flex;
    align-items: center;
    position: relative;
    display: none;
    cursor: pointer;
    &:hover .notifications-container {
      display: block;
    }
    .notifications-container {
      @extend %floating-divs;
      .gap {
        border-top: 0.1875rem solid $border-1;
        background: $background-1;
        padding: 1.25rem 0rem 0.625rem 0rem;
        cursor: pointer;
        .notify-head,
        .notifications {
          display: grid;
          grid-template-columns: max-content max-content;
          grid-gap: 3.125rem;
          padding: 0rem 0.9375rem;
          justify-content: space-between;
          p {
            font-size: 0.75rem;
          }
        }
        .notify-head {
          .all-readed {
            color: $color-white;
            border-bottom: 0.0625rem solid $border-4;
          }
        }
        .notifications {
          padding-bottom: 0.9375rem;
          padding-top: 0.9375rem;
          margin-bottom: 0.125rem;
          background: rgba(196, 196, 196, 0.1);
          .notification {
            p {
              color: $color-white;
              font-size: 0.75rem;
              margin-bottom: 0rem;
            }
            span {
            }
          }
          .notify-time {
            span {
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  }
  .neo-user {
    align-self: center;
    position: relative;
    .user-img {
      width: 1.875rem;
      height: 1.875rem;
      text-align: center;
      border-radius: 3.125rem;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-menu {
      cursor: pointer;
      @extend %floating-divs;
      .gap {
        border-top: 0.1875rem solid $border-1;
        background: $background-1;
        padding: 0.975rem 0rem 0rem 0rem;
        width: 14rem;
        div,
        a {
          display: grid;
          cursor: pointer;
          grid-template-columns: 1.25rem max-content;
          grid-gap: 1.875rem;
          padding: 0.75rem 0.9375rem;
          // padding: 0.75rem 2.9375rem;
          // padding: 1rem 0.9375rem;
          align-items: center;
          // justify-items:  space-evenly;
          position: relative;
          z-index: 4;
          text-decoration: none;
          @include background-animate(#020202, false);
          p {
            color: $color-white;
            font-size: 0.85rem;
            padding-right: 2rem;
            margin-bottom: 0rem;
          }
        }
        div {
          border-top: 0.0625rem solid;
          padding: 1.25rem 0.9375rem;
        }
      }
    }
    &:hover .user-menu {
      top: 1.25rem;
      display: block;
      opacity: 1;
      visibility: visible;
    }
  }

  .moodboard-beta-link {
    position: relative;

    &.active-link {
      svg {
        path {
          stroke: none;
        }
      }
    }
    svg {
      position: absolute;
      top: 5%;
      right: 0%;
    }
  }

  .moodboard-beta-button {
    color: $plan-title;
    padding: 0.5rem 1rem;
    cursor: pointer;
    background: $color-second;
    padding: 0.75rem 1rem;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.25rem;
    text-transform: capitalize;
    border: none;
  }
}
.events-banner {
  display: none;
  align-items: center;
  justify-content: center;
  height: 0px;
  background: rgb(255, 179, 52);

  p {
    margin: 0px;
    color: black;
  }
  span {
    font-size: 1.25rem;
    font-weight: 500;
  }
  a {
    color: black;
    text-decoration: underline;
    cursor: pointer;
  }
}
.showCompan {
  display: flex;
  height: 3.75rem;
}
.btn2 {
    background: #E9BEB3;
    color: black !important;
    cursor: pointer;
}
.linkColor {
  color: black !important;
}
.plan-offer {
  display: flex;
  place-content: center;
  align-self: center;
  justify-self: flex-end;
  column-gap: 1rem;
  padding-right: 6rem;
  p {
    color: white;
    font-weight: 600;
    font-size: 1rem;
    padding:0;
    margin: 0;
    b {
      color: #FFAB40;
    }
  }
}
</style>

<style lang="scss">
.switch-locale-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;

  .select-drop-down-container {
    width: 3rem;
  }
}
</style>

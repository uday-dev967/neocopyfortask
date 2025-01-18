<template>
  <div
    class="foyrcoin-badge-main thankyou-container popup-div"
    :class="{ showPopUp: show }"
  >
    <div class="popup-container" v-if="!showTnC">
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
      <!-- fcb - Foyr Coin Badge -->
      <div class="fcb-left-section">
        <p class="welcome">Redeem your coins here</p>
        <div class="total-earnings">
          <p>
            Your total earnings so far:
          </p>
          <p class="total-price">
            $ {{ fetchAccountInfo.foyr_coin.total_earned_coin || 0 }}
          </p>
        </div>
        <p class="sub-text">
          <ul style="padding-left: 20px">
            <li>These coins (or equivalent $) will get auto applied at checkout.</li>
          </ul>
        </p>
        <div class="fcb-buy-now" @click="$router.push('/settings/plans_new')">
          <svg
            width="28"
            height="32"
            viewBox="0 0 26 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
              <path
                d="M11.8415 7.69222C11.8415 7.69222 11.8282 7.69199 11.8025 7.69152C11.7768 7.69082 11.7383 7.69106 11.6899 7.68662C11.5934 7.67774 11.4483 7.67003 11.2708 7.64129C11.092 7.61442 10.8782 7.57167 10.6357 7.50858C10.5145 7.47704 10.3878 7.43732 10.253 7.39504C10.1196 7.35041 9.98083 7.29808 9.83527 7.24107C9.69182 7.18079 9.54346 7.1128 9.38949 7.03757C9.23786 6.95883 9.08225 6.87075 8.92221 6.77169C8.76474 6.66959 8.6054 6.55417 8.44255 6.42216C8.2818 6.28852 8.12363 6.13128 7.96639 5.94694C7.88742 5.85348 7.81289 5.75208 7.7421 5.63667C7.67107 5.52288 7.60285 5.39812 7.54397 5.25724C7.42178 4.98178 7.34888 4.62805 7.37412 4.25539C7.3879 4.06965 7.42668 3.88414 7.48533 3.71031C7.54724 3.53672 7.62948 3.38181 7.71873 3.23929L7.78789 3.13719L7.80541 3.11196L7.82971 3.07972L7.85121 3.05098L7.8727 3.02248C7.87971 3.01313 7.88602 3.00449 7.90004 2.98743L7.97293 2.89818C8.06639 2.7879 8.15914 2.68837 8.27666 2.58837C8.50423 2.39188 8.79254 2.1982 9.15795 2.08558C9.33879 2.03068 9.53598 2.00171 9.73014 2.00007C9.92452 1.99843 10.1154 2.02554 10.289 2.0725C10.4631 2.11876 10.6203 2.18488 10.7586 2.26221C10.8974 2.33861 11.0194 2.42296 11.1289 2.50987C11.3488 2.68276 11.5161 2.87038 11.656 3.05612C11.7273 3.14864 11.7897 3.24116 11.8495 3.33275C11.9077 3.42457 11.9591 3.51779 12.0067 3.60914C12.102 3.79208 12.1852 3.96942 12.2492 4.14651C12.3829 4.49697 12.4668 4.83178 12.5233 5.14042C12.5794 5.44952 12.6062 5.73316 12.6158 5.98432C12.6254 6.23572 12.6189 6.45417 12.6046 6.63407C12.5936 6.81327 12.5668 6.95556 12.5548 7.05065C12.5483 7.09831 12.5429 7.15392 12.5382 7.17869C12.5333 7.20345 12.5345 7.23453 12.5345 7.23453L12.4168 7.25859C12.4168 7.25859 12.4023 7.19387 12.3824 7.10696C12.3616 7.02028 12.3296 6.88383 12.2859 6.72356C12.2425 6.56305 12.1852 6.36469 12.1128 6.14507C12.0404 5.92544 11.9499 5.67872 11.8436 5.41564C11.7364 5.15303 11.6074 4.87267 11.4493 4.59066C11.2901 4.30983 11.1028 4.02269 10.8689 3.76592C10.7521 3.63788 10.6233 3.51756 10.4811 3.41686C10.3388 3.3171 10.1822 3.23602 10.0166 3.197C9.85139 3.15729 9.67897 3.16289 9.51729 3.2164C9.35491 3.26826 9.20585 3.36686 9.07267 3.48555C9.00609 3.54489 8.94394 3.61171 8.88366 3.67853C8.85492 3.71218 8.82595 3.74559 8.79628 3.78437L8.77408 3.81241L8.76474 3.82456L8.75516 3.83788L8.71731 3.89161C8.62035 4.03694 8.55727 4.19908 8.53951 4.3666C8.52339 4.53436 8.54932 4.70561 8.60843 4.86682C8.66567 5.02874 8.75305 5.1806 8.85048 5.32219C9.04884 5.60489 9.29206 5.84624 9.53481 6.05862C9.77897 6.271 10.0259 6.45464 10.2598 6.61585C10.7296 6.93523 11.1378 7.18032 11.4296 7.34013C11.721 7.50087 11.892 7.58288 11.892 7.58288L11.8415 7.69222Z"
                fill="#FFAB40"
              />
              <path
                d="M14.4114 7.95465C14.4114 7.95465 14.4242 7.95816 14.449 7.96493C14.4738 7.97124 14.5109 7.98222 14.5584 7.99134C14.6537 8.01003 14.795 8.0432 14.9735 8.06517C15.1527 8.08946 15.3698 8.10839 15.6202 8.11563C15.7455 8.11937 15.8782 8.11657 16.0193 8.11376C16.1602 8.10815 16.3078 8.09671 16.4634 8.08292C16.6179 8.0654 16.7796 8.04157 16.9485 8.01236C17.116 7.97919 17.2901 7.9383 17.4714 7.88783C17.6513 7.8341 17.8363 7.76774 18.0295 7.68644C18.2214 7.60326 18.4171 7.49672 18.6197 7.36355C18.7218 7.29579 18.8218 7.21939 18.9223 7.12851C19.0223 7.03902 19.1225 6.93856 19.2185 6.81963C19.4131 6.5895 19.5823 6.27011 19.662 5.9054C19.7008 5.7234 19.7155 5.53438 19.7078 5.35098C19.697 5.1671 19.6615 4.99514 19.6155 4.83347L19.5776 4.71618L19.5678 4.68697L19.5536 4.64936L19.5409 4.61595L19.5281 4.5823C19.5239 4.57156 19.5204 4.56151 19.512 4.54095L19.4669 4.43464C19.408 4.30264 19.3466 4.18115 19.2622 4.05241C19.0987 3.79985 18.8762 3.5335 18.5569 3.32275C18.3982 3.21925 18.2174 3.13654 18.0314 3.0807C17.845 3.02463 17.6543 2.9973 17.4744 2.99379C17.2943 2.98935 17.1249 3.00874 16.9707 3.04426C16.816 3.0786 16.6754 3.12556 16.5459 3.17837C16.2866 3.2828 16.0733 3.41598 15.8871 3.55523C15.7927 3.62415 15.7069 3.69564 15.624 3.76667C15.5424 3.8384 15.4667 3.91363 15.3955 3.98769C15.253 4.13675 15.1233 4.28371 15.0123 4.43581C14.7859 4.7351 14.6116 5.03276 14.471 5.31336C14.3306 5.5942 14.2254 5.85914 14.146 6.09769C14.0663 6.33623 14.0116 6.54791 13.975 6.72454C13.9352 6.89954 13.9215 7.04393 13.9063 7.13855C13.8993 7.18621 13.889 7.24112 13.8862 7.26612C13.8841 7.29112 13.874 7.32079 13.874 7.32079L13.9803 7.37686C13.9803 7.37686 14.0123 7.31869 14.0558 7.24089C14.0997 7.16355 14.1691 7.04159 14.2558 6.90001C14.3425 6.75819 14.453 6.58366 14.5838 6.39324C14.7149 6.20283 14.871 5.99092 15.0464 5.76826C15.2228 5.5463 15.4249 5.31313 15.656 5.08673C15.8871 4.86174 16.1476 4.63861 16.4441 4.45754C16.5917 4.36736 16.7492 4.28769 16.9141 4.23114C17.0784 4.17507 17.2515 4.14119 17.4216 4.15007C17.5912 4.15848 17.7552 4.21222 17.8952 4.30848C18.0365 4.4038 18.1524 4.54002 18.2468 4.69141C18.294 4.76688 18.3351 4.84842 18.3742 4.92949C18.3926 4.96991 18.4108 5.0101 18.4284 5.05589L18.4419 5.08907L18.4473 5.10332L18.4524 5.11874L18.4739 5.18112C18.5265 5.34794 18.5414 5.52107 18.5115 5.68718C18.48 5.8526 18.4073 6.00961 18.3052 6.14792C18.2048 6.2874 18.0786 6.40866 17.9452 6.51731C17.6758 6.73342 17.3749 6.89697 17.0824 7.03295C16.7884 7.16846 16.4999 7.27546 16.2305 7.36471C15.6899 7.53994 15.2294 7.66097 14.9044 7.73246C14.5796 7.80536 14.3927 7.83597 14.3927 7.83597L14.4114 7.95465Z"
                fill="#FFAB40"
              />
              <path
                d="M11.8687 8.91596H14.2786C14.2786 8.91596 14.3289 7.73608 13.0988 7.73608C11.8687 7.73608 11.8687 8.91596 11.8687 8.91596Z"
                fill="#FFAB40"
              />
              <path
                d="M21.7568 9.3833H15.6821V13.8224H21.7568V9.3833Z"
                fill="#FFAB40"
              />
              <path
                d="M10.5419 9.3833H4V13.8224H10.5419V9.3833Z"
                fill="#FFAB40"
              />
              <path
                d="M15.2148 9.14966H11.0093V21.9998H15.2148V9.14966Z"
                fill="#FFAB40"
              />
              <path
                d="M10.5409 14.29H4.93359V22.0001H10.5409V14.29Z"
                fill="#FFAB40"
              />
              <path
                d="M20.5886 14.29H15.6821V22.0001H20.5886V14.29Z"
                fill="#FFAB40"
              />
            </g>
            <defs>
              <filter
                id="filter0_d"
                x="0"
                y="0"
                width="25.7568"
                height="28.0001"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <p>Redeem now</p>
        </div>
      </div>
      <div class="fcb-right-section">
        <div
          class="reward-card first-row"
          id="pattern-1"
          :style="getPatternStyle('INVITE_A_FRIEND')"
        >
          <p
            class="reward-text availed"
            v-if="
              fetchAccountInfo.foyr_coin.INVITE_A_FRIEND
                ? !!fetchAccountInfo.foyr_coin.INVITE_A_FRIEND.availed
                : false
            "
          >
            Super Friend
          </p>
          <p
            class="reward-text"
            v-if="
              fetchAccountInfo.foyr_coin.INVITE_A_FRIEND
                ? !fetchAccountInfo.foyr_coin.INVITE_A_FRIEND.availed
                : true
            "
          >
            Refer a Friend & get {{ publicConfiguration.foyr_coins.amount.INVITE_A_FRIEND || '0' }} Coins
          </p>
          <p v-else class="reward-text step-done">Referred a friend</p>
        </div>
        <div
          class="reward-card first-row"
          id="pattern-2"
          :style="getPatternStyle('ADD_5_PRODUCTS')"
        >
          <p
            class="reward-text availed"
            v-if="
              fetchAccountInfo.foyr_coin.ADD_5_PRODUCTS
                ? !!fetchAccountInfo.foyr_coin.ADD_5_PRODUCTS.availed
                : false
            "
          >
            Product Rookie
          </p>
          <p
            class="reward-text"
            v-if="
              fetchAccountInfo.foyr_coin.ADD_5_PRODUCTS
                ? !fetchAccountInfo.foyr_coin.ADD_5_PRODUCTS.availed
                : true
            "
          >
            Add 5 Products & get {{ publicConfiguration.foyr_coins.amount.ADD_5_PRODUCTS || '0' }} Coins
          </p>
          <p v-else class="reward-text step-done">5 product added</p>
        </div>
        <div
          class="reward-card first-row"
          id="pattern-3"
          :style="getPatternStyle('ADD_50_PRODUCTS')"
        >
          <p
            class="reward-text availed"
            v-if="
              fetchAccountInfo.foyr_coin.ADD_50_PRODUCTS
                ? !!fetchAccountInfo.foyr_coin.ADD_50_PRODUCTS.availed
                : false
            "
          >
            Product Wizard
          </p>
          <p
            class="reward-text"
            v-if="
              fetchAccountInfo.foyr_coin.ADD_50_PRODUCTS
                ? !fetchAccountInfo.foyr_coin.ADD_50_PRODUCTS.availed
                : true
            "
          >
            Add 50 Products & get {{ publicConfiguration.foyr_coins.amount.ADD_50_PRODUCTS || '0' }} Coins
          </p>
          <p v-else class="reward-text step-done">50 product added</p>
        </div>
        <div
          class="reward-card second-row"
          id="pattern-4"
          :style="getPatternStyle('ATTEND_A_DEMO')"
        >
          <p
            class="reward-text availed"
            v-if="
              fetchAccountInfo.foyr_coin.ATTEND_A_DEMO
                ? !!fetchAccountInfo.foyr_coin.ATTEND_A_DEMO.availed
                : false
            "
          >
            Learn Ninja
          </p>
          <p
            class="reward-text"
            v-if="
              fetchAccountInfo.foyr_coin.ATTEND_A_DEMO
                ? !fetchAccountInfo.foyr_coin.ATTEND_A_DEMO.availed
                : true
            "
          >
            Attend a Demo & get {{ publicConfiguration.foyr_coins.amount.ATTEND_A_DEMO || '0' }} Coins
          </p>
          <p v-else class="reward-text step-done">Demo taken</p>
        </div>
        <div
          class="reward-card second-row"
          id="pattern-6"
          :style="getPatternStyle('TAKE_N_RENDERS')"
        >
          <p
            class="reward-text availed"
            v-if="
              fetchAccountInfo.foyr_coin.TAKE_N_RENDERS
                ? !!fetchAccountInfo.foyr_coin.TAKE_N_RENDERS.availed
                : false
            "
          >
            Render Rockstar
          </p>
          <p
            class="reward-text"
            v-if="
              fetchAccountInfo.foyr_coin.TAKE_N_RENDERS
                ? !fetchAccountInfo.foyr_coin.TAKE_N_RENDERS.availed
                : true
            "
          >
            Take 3 Renders & get {{ publicConfiguration.foyr_coins.amount.TAKE_N_RENDERS || '0' }} Coins
          </p>
          <p v-else class="reward-text step-done">3 renders taken</p>
        </div>
        <div
          class="reward-card second-row"
          id="pattern-6"
          :style="getPatternStyle('TEXTURE_UPLOAD_FEATURE')"
        >
          <p
            class="reward-text availed"
            v-if="
              fetchAccountInfo.foyr_coin.TEXTURE_UPLOAD_FEATURE
                ? !!fetchAccountInfo.foyr_coin.TEXTURE_UPLOAD_FEATURE.availed
                : false
            "
          >
            Design Genie
          </p>
          <p
            class="reward-text"
            v-if="
              fetchAccountInfo.foyr_coin.TEXTURE_UPLOAD_FEATURE
                ? !fetchAccountInfo.foyr_coin.TEXTURE_UPLOAD_FEATURE.availed
                : true
            "
          >
            Upload a Texture & get {{ publicConfiguration.foyr_coins.amount.TEXTURE_UPLOAD_FEATURE || '0' }} Coins
          </p>
          <p v-else class="reward-text step-done">Texture uploaded</p>
        </div>
      </div>
      <p class="terms" @click="showTnC = true">Terms & Conditions</p>
    </div>
    <div class="popup-container terms-conditions-container" v-if="showTnC">
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
      <p class="header-title">Terms & Conditions</p>
      <div class="list">
        <ul>
          <li>
            Coins are earned when the required milestones are completed for the
            first time. Repeating these activities will not get you more coins.
          </li>
          <li>
            You can only earn coins within your 14-day Free Trial period. Your
            earned coins are valid till 7 days after your 14-day Free Trial
            ends. Accrued coins will auto-expire at the end of this period.
          </li>
          <li>
            1 coin is equivalent to $1. If you have 20 coins, it means you can
            get $20 off on your next billing.
          </li>
          <li>
            These coins (or equivalent $) will get auto applied at checkout. No
            additional action is needed from you.
          </li>
          <li>
            The coins or the equivalent $ amount cannot be applied in parts. If
            you have 20 coins then all these 20 coins will be converted into $20
            and applied in full at checkout.
          </li>
          <li>
            In case the $ amount of the coins earned is greater than the monthly
            subscription amount, the remaining amount will be automatically
            applied on the subsequent invoice.
          </li>
        </ul>
      </div>
      <div class="go-back" @click="showTnC = false">
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.20526 4.50495L4.51706 0.205241C4.79134 -0.0684137 5.23604 -0.0684137 5.51019 0.205241C5.78436 0.478652 5.78436 0.922099 5.51019 1.19549L1.69492 5.00007L5.51008 8.80452C5.78425 9.07805 5.78425 9.52145 5.51008 9.79486C5.23591 10.0684 4.79123 10.0684 4.51695 9.79486L0.20515 5.49508C0.0680637 5.35831 -0.000401497 5.17925 -0.000401497 5.00009C-0.000401497 4.82085 0.0681968 4.64165 0.20526 4.50495Z"
            fill="#232121"
          />
        </svg>
        <p>Back</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    show: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showTnC: false,
    };
  },
  computed: {
    ...mapState({
      fetchAccountInfo: (state) => state.Subscriptions.fetchAccountInfo,
      publicConfiguration: (state) => state.Subscriptions.publicConfiguration
    }),
  },
  methods: {
    closePopup() {
      this.showTnC = false;
      this.$emit("close");
    },
    getPatternStyle(pattern) {
      const { foyr_coin } = this.fetchAccountInfo;

      let url = `url("/images/foyr-coin/${pattern}`;

      if (foyr_coin[pattern] && foyr_coin[pattern].availed) {
        url += "-checked";
      }

      url += '.svg")';

      return {
        "background-image": url,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-div {
  .popup-container {
    min-height: unset;
    max-height: unset;
    max-width: unset;
    padding: 2.8125rem 5.625rem 1.5625rem 5.625rem;
  }
  .product-viwer {
    padding: 0px;
  }
}

.close-popup {
  height: unset;
}

.foyrcoin-badge-main {
  p {
    padding: 0;
    margin: 0;
    color: #232121;
    letter-spacing: 0;
  }
  .popup-container {
    .close-popup {
      position: absolute;
      right: -4rem;
      top: 0;
      background: #000;
      opacity: 0.4;
      padding: 0.6rem;
      display: grid;
      place-content: center;
      border-radius: 50%;
      cursor: pointer;
      svg {
        height: 1.5rem;
        width: 1.5rem;
        background: none;
      }
    }

    border-top: 0.4rem outset #e9beb3 !important;
    padding: 4rem !important;
    display: grid;
    grid-template-columns: 32% 1fr;
    grid-template-rows: unset;
    height: 80vh;
    width: 68vw;
    max-height: 85vh !important;
    background-color: white;

    .fcb-left-section {
      background: #ffffff;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      display: grid;
      grid-template-rows: repeat(3, max-content) 1fr;
      row-gap: 2rem;
      padding: 2rem;
      .welcome {
        font-weight: 800;
        font-size: 1.8rem;
        line-height: 2.2rem;
      }
      .total-earnings {
        background: #fbf3f1;
        padding: 1rem;
        p {
          font-weight: 600;
          font-size: 1rem;
          padding-bottom: 0.5rem;
        }
        .total-price {
          font-weight: 800;
          font-size: 2.5rem;
          line-height: 3rem;
        }
      }
      .sub-text {
        font-weight: 600;
        font-size: 0.9rem;
        line-height: 1.5rem;
      }
      .fcb-buy-now {
        cursor: pointer;
        align-self: end;
        background: #3a393a;
        display: flex;
        place-content: center;
        border-radius: 0.6rem;
        padding: 0.5rem 1rem;
        p {
          margin: auto 0;
          font-weight: 800;
          font-size: 1.5rem;
          line-height: 2rem;
          color: white;
        }
      }
      button {
        align-self: center;
      }
    }
    .fcb-right-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      row-gap: 1rem;
      justify-content: space-between;
      align-content: space-between;
      padding-left: 5rem;
      #pattern-1 {
        // background-image: url("../images/foyrcoins/step-done-art.svg");
        background-size: 100% 100%;
      }
      #pattern-2 {
        // background-image: url("../images/foyrcoins/checklist-art.svg");
        background-size: 100% 100%;
      }
      #pattern-3 {
        // background-image: url("../images/foyrcoins/blue-art.svg");
        background-size: 100% 100%;
      }
      #pattern-4 {
        // background-image: url("../images/foyrcoins/product-art.svg");
        background-size: 100% 100%;
      }
      #pattern-5 {
        // background-image: url("../images/foyrcoins/referfriend-art.svg");
        background-size: 100% 100%;
      }
      #pattern-6 {
        // background-image: url("../images/foyrcoins/webinar-art.svg");
        background-size: 100% 100%;
      }
      // .first-row {
      //   bottom: 0.5rem;
      //   left: 50%;
      //   // align-self: flex-start;
      // }
      // .second-row {
      //   align-self: flex-end;
      // }
      .reward-card {
        // img {
        //   width: 92%;
        //   height: 100%;
        // }
        position: relative;
        // .reward-pattern {
        // position: absolute;
        // width: 11rem;
        // height: 100%;
        // }
        .reward-text {
          position: absolute;
          text-shadow: 0px 1px 2px black;
          width: 60%;
          font-weight: 800;
          line-height: 1.75rem;
          color: white;
          font-size: 1.2rem;
          bottom: 24%;
          left: 10%;

          &.availed {
            width: 100%;
            bottom: 15%;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            max-width: 80%;
            padding: 0;
          }
        }
        .step-done {
          padding: 0;
          text-align: center;
          left: 0;
          width: 100%;
          bottom: 6%;
          font-size: 0.9rem;
          font-weight: 600;
          font-style: normal;
        }
        // }
      }
    }
  }
  .terms-conditions-container {
    background: linear-gradient(180deg, #ffffff 0%, #fbf3f1 100%) !important;
    padding: 3rem 13rem !important;
    grid-template-columns: unset;
    align-items: center;
    justify-items: center;
    .header-title {
      font-size: 1.5rem;
      font-weight: 800;
      padding-bottom: 1rem;
    }
    .list {
      background: white;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      padding: 1rem 4rem;
      align-self: baseline;
      li {
        padding: 0.6rem 0;
        color: #000000;
        font-size: 0.9rem;
        text-transform: initial;
      }
    }
    .go-back {
      cursor: pointer;
      position: absolute;
      bottom: 1rem;
      left: 3rem;
      display: flex;
      align-items: center;
      column-gap: 0.2rem;
      p {
        font-weight: bold;
        font-size: 1.1rem;
        padding-bottom: 0.1rem;
      }
    }
  }
  .terms {
    cursor: pointer;
    text-decoration: underline;
    font-size: 1.1rem;
    position: absolute;
    bottom: 1rem;
    right: 5rem;
    &:hover {
      color: #0e0e0e;
    }
  }
}
</style>

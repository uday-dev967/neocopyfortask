<template>
  <section
    :class="{'no-packages': currentBilling === undefined, 'loading-main':currentBilling === null}"
   v-if="!isRedirecting">
    <svg class="plans-bg-pattern" width="500" height="500" viewBox="0 0 1106 646" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.3" d="M707.028 366.976L4.9209 620.361L707.028 873.746L1409.14 620.361L707.028 366.976Z" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
      <path opacity="0.3" d="M707.028 245.351L4.9209 498.736L707.028 752.121L1409.14 498.736L707.028 245.351Z" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
      <path opacity="0.3" d="M707.028 123.726L4.9209 377.111L707.028 630.496L1409.14 377.111L707.028 123.726Z" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
      <path opacity="0.3" d="M707.028 2.10098L4.9209 255.486L707.028 508.871L1409.14 255.486L707.028 2.10098Z" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
    </svg>
    <div style="position:relative" v-if="currentBilling && currentBilling.displayContext && currentBilling.displayContext.packageName && !isCancelSubUpdating">
      <div class="plan-head-container">
        <div>
          <p>Current Plan</p>
          <h2 class="plan-name">{{currentBilling.displayContext.groupingName}}</h2>
          <div v-if="currentBilling.type == 'recurring' || currentBilling.type == 'onetime'">
            <p class="future-plan" v-if="future.length>0">
              Plan will <span style="font-weight: 600;">change</span> to
              <span>{{future[0].package.displayContext.groupingName}}</span>
              from <span style="font-weight: 600;">{{dateFormat(future[0].subscriptionActivateDate)}}</span>
            </p>
            <p
              class="future-plan"
              v-else-if="!currentBilling.subscriptionStatus && currentBilling.curretCycle < currentBilling.usageCycle && currentBilling.nextBilling && currentBilling.nextBilling != ''"
            >Your plan will <span style="font-weight: 600;">renew</span> on <span style="font-weight: 600;">{{dateFormat(currentBilling.nextBilling)}}</span></p>
            <p
              class="future-plan"
              v-else
            >Your plan {{ new Date().getTime() - new Date(currentBilling.subscriptionExpiryDate).getTime()>0?'expired':'will end' }} on <span style="font-weight: 600;">{{dateFormat(currentBilling.subscriptionExpiryDate)}}</span></p>
          </div>
          <div v-else>
            <p
              class="future-plan"
              v-if="future.length == 0"
            >Your plan {{ new Date().getTime() - new Date(currentBilling.subscriptionExpiryDate).getTime()>0?'expired':'will end' }} on <span style="font-weight: 600;">{{dateFormat(currentBilling.subscriptionExpiryDate)}}</span></p>
          </div>
        </div>

        <div
          class="change-plan"
          v-if="user && user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR'"
        >
          <span v-if="(future && future.length > 0) && !isChargebee">
            <button v-if="!isTrial" @click="isCantBuy = true;">Change Plan</button>
            <button v-else @click="isCantBuy = true;">Upgrade Plan</button>
          </span>
          <span v-else>
          <nuxt-link to="/settings/plans_new">
            <button v-if="!isTrial">Change Plan</button>
            <button v-else>Upgrade Plan</button>
          </nuxt-link>

          </span>
          <!-- <div class="hover-disable-text" v-if="future.length>0">
            <p>disabled</p>
          </div>-->
        </div>
      </div>
      <div class="billing-info-container">
        <div class="billing-info-head">
          <p>Billing Info</p>
          <p
            v-if="user && user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR'"
            @click="getAllInvoice"
          >View Billing History</p>
        </div>
        <div class="billing-details">
          <div v-if="!isTrial && currentBilling.nextBilling && currentBilling.nextBilling != ''">
            <span>Next Billing Date</span>
            <p>{{dateFormat(currentBilling.nextBilling)}}</p>
          </div>
          <div>
            <span>Billing Cycle</span>
            <p>{{currentBilling.billing == 1 ? 'Monthly': currentBilling.billing ==2?'2 Months': currentBilling.billing ==3?'Quarterly':currentBilling.billing ==4?'4 Months':currentBilling.billing ==5?'5 Months':currentBilling.billing ==6?'Half Yearly':currentBilling.billing ==7?'7 Months':currentBilling.billing ==8?'8 Months':currentBilling.billing ==9?'9 Months':currentBilling.billing ==10?'10 Months':currentBilling.billing ==11?'11 Months':currentBilling.billing == 12?'Yearly':currentBilling.billing }}</p>
          </div>
          <div>
            <span>Outstanding Amount</span>
            <p>{{currentBilling.outstandingAmount == 0 ?'Nil':currentBilling.outstandingAmount}}</p>
          </div>
        </div>
        <div
          v-if="user && user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR' && isCancelFlowShow"
          class="cancel-sub-container"
          :class="{'disbale-pointer-events': this.disablePointerEvents}"
          >
          <!-- <p @click="cancelSubClicked()">Cancel Subscription</p> -->
          <p @click="onClickCancel()">Cancel Subscription</p>
          <!-- <nuxt-link v-if="(pausedStatusObj && pausedStatusObj.length > 0) || (cancelSubState.discountOfferApi && cancelSubState.discountOfferApi.isPauseApplied)" :to="{query: {flow:'cancel-sub',type:'cs-cancel', page: 1}}">
            <p @click="cancelSubClicked()">Cancel Subscription</p>
          </nuxt-link>
          <nuxt-link :to="{query: {flow:'cancel-sub',type:'cs-home', page: 1}}" v-else>
            <p @click="cancelSubClicked()">Cancel Subscription</p>
          </nuxt-link> -->
          <!-- <div class="hover-disable-text" v-if="future.length>0">
              <p>disabled</p>
          </div>-->
        </div>
      </div>
      <div class="usages-main-container" v-if="mainSub">
        <div class="usage-head">
          <h2>Credits</h2>
          <div class="addon-buy">
            <button
              v-if="user && user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR' && !isTrial"
              @click="credits = true"
            >Buy More Credits</button>
          </div>
        </div>
        <div class="service-usage-container">
          <div class="service-usage">
            <p class="sub-head">Render Credits</p>
            <div class="sub-head-color">
              <p>Available</p>
              <p>
                <!-- {{((mainSub.plan[testRender] && mainSub.plan[testRender][0]?total(testRender,'plan','subscriptionMetadata','totalCreditsPerCycle'):
                total(hqRender,'plan','subscriptionMetadata','totalCreditsPerCycle')
                )-
                total(hqRender,'plan','serviceOverAllUsage')
                - total(testRender,'plan','serviceOverAllUsage'))+
                (mainSub.addon[testRender] && mainSub.addon[testRender][0]?total(testRender,'addon','rules','maxUsageLimit'):
                total(hqRender,'addon','rules','maxUsageLimit'))-
                (total(hqRender,'addon','serviceOverAllUsage') +
                total(testRender,'addon','serviceOverAllUsage'))}} -->
                {{(mainSub && mainSub.overall && mainSub.overall.renderCredits && mainSub.overall.renderCredits.total) ? mainSub.overall.renderCredits.total: 0}}
              </p>
            </div>
            <div class="plans-addons">
              <p>Included in Plan</p>
              <p>
                <!-- {{(mainSub.plan[testRender] && mainSub.plan[testRender][0]?total(testRender,'plan','subscriptionMetadata','totalCreditsPerCycle'):
                total(hqRender,'plan','subscriptionMetadata','totalCreditsPerCycle')
                )-
                total(hqRender,'plan','serviceOverAllUsage')
                - total(testRender,'plan','serviceOverAllUsage')}} -->
                {{(mainSub && mainSub.overall && mainSub.overall.renderCredits && mainSub.overall.renderCredits.includedInPlan) ? mainSub.overall.renderCredits.includedInPlan: 0}}
              </p>
              <p>Add - On</p>
              <p>
                <!-- {{(mainSub.addon[testRender] && mainSub.addon[testRender][0]?total(testRender,'addon','rules','maxUsageLimit'):
                total(hqRender,'addon','rules','maxUsageLimit'))-
                (total(hqRender,'addon','serviceOverAllUsage') +
                total(testRender,'addon','serviceOverAllUsage'))}} -->
                {{(mainSub && mainSub.overall && mainSub.overall.renderCredits && mainSub.overall.renderCredits.includedInAddon) ? mainSub.overall.renderCredits.includedInAddon: 0}}
              </p>
            </div>
            <div class="sub-head-color">
              <p>Used</p>
            </div>
            <div class="sub-2-head-color three-colum">
              <p>Render Type</p>
              <p>No. of Renders</p>
              <p>Credits Used</p>
            </div>
            <div class="per-service-data three-colum">
              <p class="titleCase"
                v-if="mainSub.plan[hqRender] || mainSub.addon[hqRender]"
              >{{mainSub.plan[hqRender]?mainSub.plan[hqRender][0].service.name:mainSub.addon[hqRender][0].service.name}}</p>
              <p>
                {{(total(hqRender,'plan','serviceOverAllUsageByMetric')) +
                (total(hqRender,'addon','serviceOverAllExceptOverUsageByMetric'))}}
              </p>
              <p>
                {{(total(hqRender,'plan','serviceOverAllUsage')) +
                (total(hqRender,'addon','serviceOverAllUsage'))}}
              </p>
            </div>
            <div
              class="per-service-data three-colum"
              v-if="mainSub.plan[testRender] || mainSub.addon[testRender]"
            >
              <p class="titleCase">{{mainSub.plan[testRender]?mainSub.plan[testRender][0].service.name:mainSub.addon[testRender][0].service.name}}</p>
              <p>
                {{(total(testRender,'plan','serviceOverAllUsageByMetric')) +
                (total(testRender,'addon','serviceOverAllExceptOverUsageByMetric'))}}
              </p>
              <p>
                {{(total(testRender,'plan','serviceOverAllUsage')) +
                (total(testRender,'addon','serviceOverAllUsage'))}}
              </p>
            </div>
          </div>
          <div class="service-usage">
            <p class="sub-head">Custom Models</p>
            <div class="sub-head-color">
              <p>Available</p>
              <p>
                <!-- {{(total(customDownload,'plan','subscriptionMetadata','totalCreditsPerCycle') -
                total(customDownload,'plan','serviceOverAllUsage')) +
                (total(customDownload,'addon','rules','maxUsageLimit') - total(customDownload,'addon','serviceOverAllUsage'))}} -->
                {{(mainSub && mainSub.overall && mainSub.overall.modelsCredits && mainSub.overall.modelsCredits.total) ? mainSub.overall.modelsCredits.total: 0}}
              </p>
            </div>
            <div class="plans-addons">
              <p>Included in Plan</p>
              <p>
                <!-- {{total(customDownload,'plan','subscriptionMetadata','totalCreditsPerCycle') -
                total(customDownload,'plan','serviceOverAllUsage')}} -->
                {{(mainSub && mainSub.overall && mainSub.overall.modelsCredits && mainSub.overall.modelsCredits.includedInPlan) ? mainSub.overall.modelsCredits.includedInPlan: 0}}
              </p>
              <p>Add - On</p>
              <p>
                {{(mainSub && mainSub.overall && mainSub.overall.modelsCredits && mainSub.overall.modelsCredits.includedInAddon) ? mainSub.overall.modelsCredits.includedInAddon: 0}}
                <!-- {{total(customDownload,'addon','rules','maxUsageLimit') - total(customDownload,'addon','serviceOverAllUsage')}} -->
                </p>
            </div>
            <div class="sub-head-color">
              <p>Used</p>
            </div>
            <div class="sub-2-head-color three-colum">
              <p>Request` Type</p>
              <p>No. of Requests</p>
              <p>Credits Used</p>
            </div>
            <div
              class="per-service-data three-colum"
              v-if="mainSub.plan[customDownload] || mainSub.addon[customDownload]"
            >
              <p>{{mainSub.plan[customDownload]?mainSub.plan[customDownload][0].service.name:mainSub.addon[customDownload][0].service.name}}</p>
              <p>
                {{(total(customDownload,'plan','serviceOverAllUsageByMetric')) +
                (total(customDownload,'addon','serviceOverAllExceptOverUsageByMetric'))}}
              </p>
              <p>
                {{(total(customDownload,'plan','serviceOverAllUsage')) +
                (total(customDownload,'addon','serviceOverAllUsage'))}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="usages-main-container" v-if="mainSub && !(user && user.ipInfo && (user.ipInfo.country=='IN' || user.ipInfo.country=='CA')) && (user && user.accountExtraInfo && user.accountExtraInfo.userCategory == 'Interior Designer') ">
        <div class="usage-head">
          <h2>Coins</h2>
          <div class="addon-buy" v-if="currentBilling.name === 'free trial'">
            <button @click="openFoyrCoinBadges">Earn More</button>
          </div>
        </div>
        <div class="service-usage-container">
          <div class="service-usage">
            <div class="plans-addons">
              <p>Total Coins Earned</p>
              <p>
                {{ foyrCoins.totalEarnedCoins * foyrCoins.coinValue }}
              </p>
            </div>
            <div class="sub-head-color coins" style="margin-bottom: 0.3rem">
              <p>Coins Remaining</p>
              <p>
                {{ foyrCoins.availableCoin || '0' }}
              </p>
            </div>
            <div class="sub-head-color coins">
              <p>Coins Redeemed</p>
              <p>
                {{ (foyrCoins.totalEarnedCoins || 0) - (foyrCoins.availableCoin || 0) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentBilling === null || isCancelSubUpdating" class="main-loading">
      <div class="loading-container">
        <p>Loading...</p>
        <div class="loader"></div>
      </div>
    </div>
    <div
      class="no-package"
      v-if="currentBilling === undefined && user && user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR'">
      <!-- <packageComponent :packages="packages" :align="'left'" :user="user" /> -->
      <!-- <plansNewComponent :user="user"/> -->
      <!-- <p style="text-align: center;">You have not subscribed to any of our plans. To request for a free trial, write to us at connect@foyr.com</p> -->
      <svg
        width="69"
        height="72"
        viewBox="0 0 69 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M51.0445 5.10352C52.6921 5.10352 53.9634 6.54358 53.7446 8.16532L52.0737 20.5864C51.9129 21.7795 50.175 21.7795 50.0143 20.5864L48.3444 8.16532C48.1267 6.54469 49.397 5.10352 51.0445 5.10352Z"
            fill="#E9BEB3"
          />
          <path
            d="M51.8967 29.0028C53.0307 28.5366 53.5692 27.2464 53.0995 26.1211C52.6297 24.9957 51.3297 24.4613 50.1957 24.9274C49.0617 25.3936 48.5232 26.6838 48.993 27.8092C49.4627 28.9345 50.7627 29.4689 51.8967 29.0028Z"
            fill="#E9BEB3"
          />
          <path
            d="M51.0445 5.10352C49.397 5.10352 48.1256 6.54358 48.3444 8.16532L48.4013 8.58958C48.7529 8.78787 49.1581 8.90197 49.5912 8.90197C50.9262 8.90197 52.0078 7.82856 52.0078 6.5037C52.0078 6.00633 51.8549 5.5444 51.5937 5.16112C51.4173 5.12456 51.2343 5.10352 51.0445 5.10352Z"
            fill="#F7E3DF"
          />
          <path
            d="M19.4679 48.9409V42.3477H15.6046H14.9405H11.7414V48.9409C11.7414 50.1694 11.0873 51.306 10.0225 51.9307C4.35989 55.2484 0.88623 61.289 0.88623 67.8147V71.1224H4.53291V67.0304C4.53291 64.3818 5.18031 61.7664 6.46173 59.4423C7.46409 57.6245 8.3459 56.6375 10.8864 55.0513L12.7896 53.7807C14.0888 52.9133 14.8836 51.481 14.9372 49.9346C15.1582 49.9512 15.3803 49.9634 15.6058 49.9634C16.9955 49.9634 18.3081 49.6377 19.4723 49.0617C19.4701 49.0218 19.4679 48.9819 19.4679 48.9409Z"
            fill="#F7E3DF"
          />
          <path
            d="M15.6046 45.7044C16.1683 45.7044 16.7197 45.649 17.2533 45.5471C14.5521 45.0807 13.0128 43.7703 12.1377 42.4798C11.3664 41.341 10.9936 39.9818 10.9936 38.6104V29.1713C10.9936 24.8312 15.1012 23.1762 18.1887 22.5459C17.3727 22.2933 16.5043 22.1582 15.6046 22.1582C10.8105 22.1582 6.92383 26.0154 6.92383 30.7731V37.0906C6.92383 41.8472 10.8105 45.7044 15.6046 45.7044Z"
            fill="#F7E3DF"
          />
          <path
            d="M68.0757 27.6186C66.2139 31.4946 60.2968 31.1711 60.2968 31.1711H39.7149C38.5116 31.1711 37.9692 29.6768 38.8967 28.9147C39.1914 28.6721 39.3622 28.3132 39.3622 27.9332V7.00349C39.3622 4.10231 41.3189 2.11169 43.1596 0.879883H41.8547C38.4279 0.879883 35.6497 3.63706 35.6497 7.03783V26.5984L28.5271 33.0986H35.6497H36.9344H61.9098C65.1044 33.0986 67.7353 30.7003 68.0757 27.6186Z"
            fill="#F7E3DF"
          />
          <path
            d="M0.886275 71.9999H30.3231C30.812 71.9999 31.2094 71.6067 31.2094 71.1204V67.8127C31.2094 61.0078 27.5415 54.6316 21.6378 51.171C20.8465 50.7069 20.3542 49.8517 20.3542 48.9389C20.3542 48.4537 19.9579 48.0594 19.4679 48.0594C18.979 48.0594 18.5816 48.4526 18.5816 48.9389C18.5816 50.4709 19.4076 51.9066 20.7371 52.6853C26.1038 55.8302 29.438 61.627 29.438 67.8116V70.2397H1.77255V67.8116C1.77255 61.6259 5.10669 55.8302 10.4735 52.6853C11.8029 51.9066 12.6289 50.4709 12.6289 48.9389V46.1098C13.5665 46.4155 14.5666 46.5828 15.6058 46.5828C20.8811 46.5828 25.1729 42.3235 25.1729 37.0883V30.7708C25.1729 25.5356 20.8811 21.2764 15.6058 21.2764C10.3306 21.2764 6.03873 25.5356 6.03873 30.7708V37.0883C6.03873 40.6087 7.98094 43.686 10.8574 45.3255V48.94C10.8574 49.8528 10.3652 50.708 9.57378 51.1721C3.66789 54.6327 0 61.0089 0 67.8138V71.1215C0 71.6067 0.396257 71.9999 0.886275 71.9999ZM7.81016 37.0894V30.7719C7.81016 26.5071 11.3073 23.0366 15.6047 23.0366C19.9021 23.0366 23.3992 26.5071 23.3992 30.7719V37.0894C23.3992 41.3542 19.9021 44.8248 15.6047 44.8248C11.3062 44.8248 7.81016 41.3542 7.81016 37.0894Z"
            fill="#333333"
          />
          <path
            d="M28.526 33.9778H61.9087C65.8188 33.9778 69 30.8207 69 26.9403V7.03749C69 3.15707 65.8188 0 61.9087 0H41.8548C37.9447 0 34.7635 3.15707 34.7635 7.03749V20.7691C34.7635 21.2543 35.1597 21.6486 35.6497 21.6486C36.1386 21.6486 36.536 21.2554 36.536 20.7691V7.03749C36.536 4.12634 38.9225 1.75799 41.8559 1.75799H61.9098C64.8432 1.75799 67.2297 4.12634 67.2297 7.03749V26.9403C67.2297 29.8515 64.8432 32.2198 61.9098 32.2198H30.7987L36.248 27.2472C36.6086 26.9182 36.632 26.3621 36.3005 26.0043C35.969 25.6465 35.4086 25.6232 35.0481 25.9522L27.9255 32.4525C27.6565 32.6973 27.5672 33.0817 27.7 33.4195C27.8329 33.7552 28.161 33.9778 28.526 33.9778Z"
            fill="#333333"
          />
          <path
            d="M53.7614 5.44756C53.0761 4.66992 52.086 4.22461 51.0446 4.22461C50.0031 4.22461 49.013 4.66992 48.3277 5.44756C47.6423 6.22519 47.3276 7.25761 47.466 8.28227L49.1369 20.7034C49.2687 21.6793 50.0534 22.3606 51.0446 22.3606C52.0369 22.3606 52.8216 21.6793 52.9522 20.7034L54.6231 8.28227C54.7616 7.25761 54.4479 6.22409 53.7614 5.44756ZM52.8673 8.04854L51.1964 20.4697C51.1885 20.5251 51.1785 20.6015 51.0446 20.6015C50.9106 20.6015 50.9006 20.5251 50.8939 20.4697L49.2229 8.04854C49.1526 7.52679 49.3122 7.00172 49.6616 6.60515C50.0109 6.20969 50.5144 5.9826 51.0446 5.9826C51.5748 5.9826 52.0782 6.20969 52.4275 6.60515C52.7769 7.00172 52.9377 7.52679 52.8673 8.04854Z"
            fill="#333333"
          />
          <path
            d="M47.9359 26.964C47.9359 28.6655 49.3312 30.049 51.0446 30.049C52.7591 30.049 54.1532 28.6644 54.1532 26.964C54.1532 25.2636 52.758 23.8789 51.0446 23.8789C49.3312 23.8778 47.9359 25.2625 47.9359 26.964ZM52.3818 26.964C52.3818 27.6951 51.7824 28.291 51.0446 28.291C50.3068 28.291 49.7073 27.6962 49.7073 26.964C49.7073 26.2318 50.3068 25.6369 51.0446 25.6369C51.7824 25.6369 52.3818 26.2318 52.3818 26.964Z"
            fill="#333333"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="69" height="72" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div>
        <p></p>
        <p>
          You have not subscribed to any of our plans. To request for a free trial, write to us at
          <a
            style="color:#d48e8e; text-decoration:none;"
            href="mailto:connect@foyr.com"
          >connect@foyr.com</a>
        </p>
      </div>
    </div>
    <div
      v-if="currentBilling === undefined && user && user.accountType != 'root' && user.accountInfo.accountCategory == 'REGULAR'"
    >
      <h1>contact your admin</h1>
    </div>
    <div class="popup-div package-popup"
    :class="show?'showPopUp':''"
    v-if="currentBilling && user && user.accountInfo.accountCategory == 'REGULAR'" @click="closePopup">
      <div
        class="popup-container"
        :class="currentBilling && future.length==0?'':'future-plan-container'"
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
        <div v-if="currentBilling && future.length==0">
          <packageComponent :packages="packages" :align="'center'" :user="user" :ppOrigin="'changeplan'"/>
        </div>
        <div v-else class="future-plan-taken">
          <p>
            You seem to have already changed or cancelled your current plan. For further assistance, please contact customer support team or write to us on
            <a
              href="mailto:connect@foyr.com"
            >connect@foyr.com</a>
          </p>
        </div>
      </div>
    </div>
    <div class="popup-div" @click="closePopup" :class="credits?'showPopUp':''" v-if="currentBilling && user && user.accountInfo.accountCategory == 'REGULAR'" >
      <div class="popup-container" @click.stop>
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
        <addonComponent :addon="addon" :user="user" />
      </div>
    </div>
    <div class="popup-div" :class="cancelSub?'showPopUp':''" v-if="currentBilling" @click="closePopup" >
      <div
        class="popup-container"
        @click.stop
        :class="future.length == 0 && !currentBilling.subscriptionStatus?'':'future-plan-container'"
        style="background:white; padding:3.75rem;"
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
        <div class="popup-head" v-if="future.length == 0 && !currentBilling.subscriptionStatus">
          <h2>Please indicate the reason for cancellation</h2>
          <!-- <p v-if="showBills">Get access to all your invoices anytime</p> -->
        </div>
        <div class="popup-details">
          <div
            class="cancel-sub-text"
            v-if="(future.length == 0 && !currentBilling.subscriptionStatus) || isChargebee"
          >
            <div class="cancel-option-container">
              <p></p>
              <div class="cancel-option-icons-container">
                <div class="cancel-optin-icons" @click="selectedCancelCategory = 'covid19'; cancelfeedBack=''" :class="{'activeCat':selectedCancelCategory == 'covid19'}">
                  <!-- <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 21.2C16.0228 21.2 20.5 16.7229 20.5 11.2C20.5 5.67716 16.0228 1.20001 10.5 1.20001C4.97715 1.20001 0.5 5.67716 0.5 11.2C0.5 16.7229 4.97715 21.2 10.5 21.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M27.5 11.2H10.5V28.2H27.5V11.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> -->

                  <p>Covid-19</p>
                </div>
                <div class="cancel-optin-icons" @click="selectedCancelCategory = 'cost'; cancelfeedBack=''" :class="{'activeCat':selectedCancelCategory == 'cost'}">
                  <!-- <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 21.2C16.0228 21.2 20.5 16.7229 20.5 11.2C20.5 5.67716 16.0228 1.20001 10.5 1.20001C4.97715 1.20001 0.5 5.67716 0.5 11.2C0.5 16.7229 4.97715 21.2 10.5 21.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M27.5 11.2H10.5V28.2H27.5V11.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> -->

                  <p>Too Expensive</p>
                </div>
                <!-- <div class="cancel-optin-icons" @click="selectedCancelCategory = 'difficulty'; cancelfeedBack=''" :class="{'activeCat':selectedCancelCategory == 'difficulty'}">
                  <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 21.2C16.0228 21.2 20.5 16.7229 20.5 11.2C20.5 5.67716 16.0228 1.20001 10.5 1.20001C4.97715 1.20001 0.5 5.67716 0.5 11.2C0.5 16.7229 4.97715 21.2 10.5 21.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M27.5 11.2H10.5V28.2H27.5V11.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <p>Difficulty <br> of use</p>
                </div> -->
                <!-- <div class="cancel-optin-icons" @click="selectedCancelCategory = 'feature'; cancelfeedBack=''" :class="{'activeCat':selectedCancelCategory == 'feature'}">
                  <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 21.2C16.0228 21.2 20.5 16.7229 20.5 11.2C20.5 5.67716 16.0228 1.20001 10.5 1.20001C4.97715 1.20001 0.5 5.67716 0.5 11.2C0.5 16.7229 4.97715 21.2 10.5 21.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M27.5 11.2H10.5V28.2H27.5V11.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <p>Missing feature</p>
                </div> -->
                <!-- <div class="cancel-optin-icons" @click="selectedCancelCategory = 'other'; cancelfeedBack=''" :class="{'activeCat':selectedCancelCategory == 'other'}">
                  <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 21.2C16.0228 21.2 20.5 16.7229 20.5 11.2C20.5 5.67716 16.0228 1.20001 10.5 1.20001C4.97715 1.20001 0.5 5.67716 0.5 11.2C0.5 16.7229 4.97715 21.2 10.5 21.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M27.5 11.2H10.5V28.2H27.5V11.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <p>Using other product</p>
                </div> -->
                <div class="cancel-optin-icons" @click="selectedCancelCategory = 'dontUse'; cancelfeedBack=''" :class="{'activeCat':selectedCancelCategory == 'dontUse'}">
                  <!-- <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 21.2C16.0228 21.2 20.5 16.7229 20.5 11.2C20.5 5.67716 16.0228 1.20001 10.5 1.20001C4.97715 1.20001 0.5 5.67716 0.5 11.2C0.5 16.7229 4.97715 21.2 10.5 21.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M27.5 11.2H10.5V28.2H27.5V11.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> -->

                  <p>I don't use it enough</p>
                </div>
                <div class="cancel-optin-icons" @click="selectedCancelCategory = 'somethingElse'; cancelfeedBack=''" :class="{'activeCat':selectedCancelCategory == 'somethingElse'}">
                  <!-- <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 21.2C16.0228 21.2 20.5 16.7229 20.5 11.2C20.5 5.67716 16.0228 1.20001 10.5 1.20001C4.97715 1.20001 0.5 5.67716 0.5 11.2C0.5 16.7229 4.97715 21.2 10.5 21.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M27.5 11.2H10.5V28.2H27.5V11.2Z" stroke="#EBBEB5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> -->

                  <p>Something else</p>
                </div>
              </div>
              <div class="cancel-option-text-container" v-if="selectedCancelCategory">
                <p class="cancel-option-head-tag" v-html="cancelOptionText[selectedCancelCategory].head"></p>
                <p class="cancel-option-sub-text" v-html="cancelOptionText[selectedCancelCategory].subText"></p>
                <input type="text" name="" v-model="cancelfeedBack" id="" v-if="cancelOptionText[selectedCancelCategory].input" :placeholder="cancelOptionText[selectedCancelCategory].input">
                <button v-if="cancelOptionText[selectedCancelCategory].cta" @click.stop="cancelCta(cancelOptionText[selectedCancelCategory].name,true)" class="cancel-option-cta">{{cancelOptionText[selectedCancelCategory].cta}}</button>
              </div>
            </div>
            <!-- <p>Cancellation will be effective at the end of your current billing cycle</p> -->
          </div>
          <div v-else class="future-plan-taken">
            <p>
              You seem to have already changed or cancelled your current plan. For further assistance, please contact customer support team or write to us on
              <a
                href="mailto:connect@foyr.com"
              >connect@foyr.com</a>
            </p>
          </div>
          <div
            class="invite-button-container"
            v-if="(future.length == 0 && !currentBilling.subscriptionStatus) || isChargebee"
          >
            <button @click="cancelContainer('show')" class="cancel-button"></button>
            <button style="    color: rgb(128, 127, 127);
    text-transform: none;
    font-size: 1rem;" :disabled="!selectedCancelCategory" :style="{'cursor':!selectedCancelCategory?'not-allowed':'pointer'}" @click.stop="cancelSubs()" class="update-address">I want to cancel anyway</button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="showBills?'showPopUp':''" @click="closePopup">
      <div class="popup-container" @click.stop>
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
        <div class="popup-head">
          <h2 v-if="showBills">Billing History</h2>
          <p v-if="showBills">Get access to all your invoices anytime</p>
        </div>
        <div class="popup-details">
          <div v-if="showBills">
            <!-- <span>Year</span>
              <div class="select-box">
                <select name id>
                  <option value>2018</option>
                </select>
            </div>-->
          </div>
          <table cellspacing="0">
            <tr class="table-heads">
              <th>Invoice No.</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
            <tr v-if="showBills && allInvoice && !invoiceLoading" class="table-child" v-for="invoice in allInvoice">
              <td>{{invoice.invoice_id}}</td>
              <td>{{invoice.invoice_date}}</td>
              <td>{{invoice.total}}</td>
              <td>{{invoice.status}}</td>
              <td class="download-icon">
                <a @click="invoiceDownload(user.accountId,invoice.invoice_id)">
                  <svg
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8 7.3L11.9 11.9C11.7 12.1 11.3 12.1 11.1 11.9L6.20001 7.3"
                      stroke="#E9BEB3"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.5 11.9V0.800003"
                      stroke="#E9BEB3"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.40002 10.6V15.9H20.4V10.6"
                      stroke="#E9BEB3"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </td>
            </tr>
            <tr v-if="invoiceLoading">
              <br/>
              <span style="position: relative;
    text-align: center;
    left: 10rem;">Loading..</span>
               </tr>
            <!-- <tr v-if="!allInvoice">Loading....</tr> -->
            <tr v-if="!invoiceLoading && allInvoice.length === 0">No billing data</tr>
          </table>
        </div>
      </div>
    </div>
    <!-- ALREADY HAVE PLANS -->
    <div class="popup-div" :class="isCantBuy?'showPopUp':''" @click="closePopup">
      <div class="popup-container cant-buy" @click.stop>
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
        <div class="popup-head">
          <!-- <h2 v-if="showBills">Billing History</h2> -->
        </div>
        <div class="popup-details">
          <div class="cant-buy-alert">
            <p>
              You seem to have already changed or cancelled your current plan. For further assistance, please contact customer support team or write to us on
              <a
                href="mailto:connect@foyr.com"
              >connect@foyr.com</a>
            </p>
         </div>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="getFreeDemoShow_Desk?'showPopUp':''" @click="outsideClick()">
        <div class="popup-container getDemoContainer" @click.stop>
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
          <!-- Modal content ================> -->
          <iframe
            class="free-demo-iframe"
            width="560"
            height="315"
            :src="freeDemoUrl_Desk"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    <cancelSubIndexComponent v-if="$route && $route.query && $route.query.flow && $route.query.flow === 'cancel-sub'"/>
    <div class="popup-div payment-updating-popup" :class="receivingAddonPaymentLoading?'showPopUp':''">
      <div class="popup-container" @click.stop>
        <div class="payment-wait-container">
          <img src="~assets/images/loader.gif" alt="" srcset="">
          <p>Your subscription details are being updated, please do not refresh</p>
        </div>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
    <pauseConfirmPopupComponent :openNewCancelFlow="openNewCancelFlow" :isContactPause= "isContactPause"/>
    <blockingLoadingComponent/>
    <foyr-coin-badges v-if="!!publicConfiguration" :show="showFoyrCoinBadges" :total-earned="foyrCoins.totalEarnedCoins" @close="closeFoyrCoinBadges" />
    <billingPageTypeForm :publicConfiguration="publicConfiguration" :fetchAccountInfo="fetchAccountInfo" :currentSubscription="currentBilling"/>
    <cancelPageTypeForm v-if="showcancelPageTypeForm" 
    :typeformConfiguration="cancelPageTypeFormData" 
    :fetchAccountInfo="fetchAccountInfo" 
    :currentSubscription="currentBilling" />
    

    <buyYearPayMonExp v-if="showbuyYearPayMonExp" 
    :typeformConfiguration="publicConfiguration.typeform.buyYearPayMonExp" 
    :fetchAccountInfo="fetchAccountInfo" 
    :currentSubscription="currentBilling"
    :userName='user.fullName' />
    
  </section>
  <div v-else>
    <div class="main-loading" v-if="isRedirecting">
      <div class="loading-container">
        <p>You will soon be redirected to payment page..Please wait.</p>
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import packageComponent from "@/components/packages";
import plansNewComponent from "@/components/shared/plans_new";
import addonComponent from "@/components/addon";
import cancelSubIndexComponent from '@/components/shared/cancellation/cancelSubIndex';
import pauseConfirmPopupComponent from '@/components/shared/popups/pauseConfirmPopup';
import blockingLoadingComponent from '@/components/shared/blockingLoading';
import billingPageTypeForm from "@/components/billingPageTypeForm";
import cancelPageTypeForm from "@/components/shared/cancellation/cancelPageTypeForm.vue"
import buyYearPayMonExp from "@/components/shared/cancellation/buyYearPayMonExp.vue"


export default {
  props: {
    packages: Object,
    addon: Object
    // user:Object
  },
  data() {
    return {
      disablePointerEvents:false,
      showFoyrCoinBadges: false,
      showcancelPageTypeForm: false,
      showbuyYearPayMonExp: false,
      show: undefined,
      credits: false,
      cancelSub: false,
      showBills: false,
      hqRender: "foyr_service_2",
      testRender: "foyr_service_3",
      customDownload: "foyr_service_4",
      message: {
        value: "",
        error: false,
        global: false
      },
      invoiceLoading: true,
      allInvoice: {},
      isRedirecting: false,
      selectedCancelCategory:'covid19',
      cancelOptionText:{
        cost:{
          head:'Wait, we can help you with this one!',
          subText:'We understand managing costs can be a challenge. Our Chief Happiness Officer can  brew an exclusive offer to make this easier for you. They say he has a knack of making people happy :)',
          cta:'Yes, send me Happy offers',
          name:'TOO EXPENSIVE'
        },
        difficulty:{
          head:'Oh Really? We can fix this together',
          subText:'Let our product experts help you understand Neo better! Post we speak, it will be easy breezy for you to use Neo - our promise! Schedule a time now using the link below!',
          cta:'Get a personalized session',
          name:'DIFFICULT TO USE'
        },
        feature:{
          head:'Wait! There is a high chance we have that feature or its workaround.',
          subText:"Give us your feedback below and we will double check to see if we have the functionality you need.",
          input:' ',
          name:'MISSING FEATURE'
        },
        other:{
          head:`Ouch!`,
          subText:"Tell us which product won your heart over Neo, and we will drink to our loss tonight! :(",
          cta:'',
          input:'Enter your feedback here',
          name:'USING OTHER PRODUCT'
        },
        dontUse:{
          head:`Would you like to consider a 2-month billing pause instead?`,
          subText:"If you pause your subscription, your current subscription period will get extended by two months for FREE. You will not be charged anything for this period but you can continue using Neo uninterruptedly. After the 2 month period, your regular billing will resume.",
          cta:'Pause Billing for 2 months',
          input:'',
          name:"I DONT' USE IT ENOUGH"
        },
        covid19:{
          head:`Your next 2 months are on us, Let’s brave this storm together!`,
          subText:"If your business has been impacted by Covid-19, you can request a FREE 2 month billing pause. You will not be charged anything for this period but you can continue using Neo uninterruptedly. After the 2 month period, your regular billing will resume.",
          cta:'Pause Billing for 2 months',
          input:'',
          name:"COVID19"
        },
        somethingElse:{
          head:'Tell us more, please?',
          subText:"We are all ears and very eager to know what's your reason, do share it below!",
          cta:'',
          input:'Enter your feedback here',
          name:'SOMETHING ELSE'
        },
      },
      cancelfeedBack:'',
      getFreeDemoShow_Desk:false,
      freeDemoUrl_Desk: 'https://calendly.com/foyr-neo-product-demo',
      isCantBuy: false,
      receivingAddonPaymentLoading: false,
      isCancelSubUpdating: false,
      openNewCancelFlow: false,
      isContactPause: false,
      cancelPageTypeFormData: {
        showTypeform : true,
        appearAfterMillSec : 1,
        formId : ''
      }
    };
  },
  mounted() {
    this.getCoinInfoAPI()
    this.getCreditsInfoAPI()
    this.getTheTourStatus()
    this.getPublicConfiguration()
    if(this.user && this.user.accountId){
      this.fetchMySubscriptions({accountId : this.user.accountId})
      this.fetchCurrentSubscription({accountId : this.user.accountId})
    }
    this.$root.$on('refresh-billing-page',()=> {
      this.isCancelSubUpdating = true;
      setTimeout(() => {
        this.fetchPackages({accountId : this.user.accountId})
        this.fetchMySubscriptions({accountId : this.user.accountId})
        this.fetchCurrentSubscription({accountId : this.user.accountId})
        setTimeout(() => {
          this.isCancelSubUpdating = false;
        }, 1500);
      }, 2000);
    })
    this.$root.$on('addon-payment-update',(_data)=>{
      // console.log('Event Called @Addon')
      this.receivingAddonPaymentLoading = _data
    })
    console.log('addons', this.addon)
    // console.log("Current Billing at plans component", this.currentBilling);
    if (this.$route.query && this.$route.query.hostedpage_id) {
        chmln.show('5d5fcefad388c80ca1b75245')
    }
    this.hqRender =
      (window.location.host == "neo.foyr.com" ||  window.location.host == "neopreprod.foyr.com")
        ? "foyr_service_2"
        : "foyr_service_30";
    this.testRender =
     (window.location.host == "neo.foyr.com" ||  window.location.host == "neopreprod.foyr.com")
        ? "foyr_service_3"
        : "foyr_service_32";
    this.customDownload =
    (window.location.host == "neo.foyr.com" ||  window.location.host == "neopreprod.foyr.com")
        ? "foyr_service_4"
        : "foyr_service_29";
    if (this.$route.query.package && this.$route.query.package == "true")
      this.show = true;
    this.$nextTick(function () {
      console.log('&&&&&&&&API is calling for tour status&&&&')
      setTimeout(() => {
        this.getTheTourStatus().then((response)=> {
          if(response && response.subscription_bought_successful){
             console.log('&&&&&&&&Chmln is calling&&&&')
            //  window.chmln.show('602e790bd3df450013e0e13b')
            //  this.updateTheTourStatus({subscription_bought_successful: false});
           }else {
             console.log('Flag is false')
           }
         });
      }, 2500);
    })
  },
  components: {
    packageComponent,
    addonComponent,
    plansNewComponent,
    cancelSubIndexComponent,
    pauseConfirmPopupComponent,
    blockingLoadingComponent,
    billingPageTypeForm,
    cancelPageTypeForm,
    buyYearPayMonExp,
    foyrCoinBadges: () => import(/* webpackChunkName: "foyr-coin-badges" */ '@/components/foyrCoinBadges.vue')
  },
  computed: {
    ...mapState({
      foyrCoins: state => state.Subscriptions.foyrCoins || { totalEarnedCoins: 0, availableCoin: 0, coinValue: 1 },
      mySubscription: state => state.Subscriptions.mySubscription,
      currentBilling: state => state.Billing.currentSubscription,
      // allInvoice: state => state.Billing.allInvoice,
      mainSub: state => state.Billing.currentSub,
      isTrial: state => state.Billing.isTrial,
      isChargebee: state => state.Billing.isChargebee,
      future: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "future" && item.type == "package";
        }),
       pausedStatusObj: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return item.activeStatus == "current" && item.chargebee && item.chargebee.status && item.chargebee.status === 'paused';
      }),
      neoLitePlanDetails: state =>
        state.Subscriptions.mySubscription.filter(item => {
          return (item.activeStatus == "future" || item.activeStatus == "active") && item.type == "package" && (item.package.id === 'neo-light-yearly' || item.package.id === 'neo-light-monthly');
      }),
      user: state => state.User.user,
      cancelSubState : state => state.Subscriptions.cancelSubState,
      fetchAccountInfo: state => state.Subscriptions.fetchAccountInfo,
      publicConfiguration: state => state.Subscriptions.publicConfiguration,
      isLPU: state => state.User.isLPU,
      isLPUPlan: state => state.Billing.isLPUPlan
    }),
    isCancelFlowShow(){
      if(this.currentBilling && this.currentBilling.analyticsData && this.currentBilling.analyticsData.analyticsStatus){
        if(this.currentBilling.analyticsData.analyticsStatus === 'free trial' || this.currentBilling.analyticsData.analyticsStatus === 'Trial expired')
          return false;
        else if(this.currentBilling.analyticsData.analyticsStatus === 'Paid expired' || this.currentBilling.analyticsData.analyticsStatus === 'Cancelled'){
          if(this.currentBilling.name && (this.currentBilling.name === 'premium-feature-free-trial-1' || this.currentBilling.name === 'premium feature free trial'))
            return false;
          else
            return true;
        }else
          return true;
      }else
        return false;
    },
  },
  watch: {
    currentBilling(data){
      if(this.currentBilling && this.currentBilling.subscription){
        this.cancelSubPlanOffersAPI({subId: this.currentBilling.subscription})
      }
    }
  },
  methods: {
    ...mapActions({
      cancelSubscription: "Subscriptions/cancel",
      buy: "Subscriptions/buy",
      registerUser: "User/registerUser",
      downloadInvoice: "Billing/downloadInvoice",
      totalInvoiceDetails: "Billing/allInvoices",
      cancelFeedBackApi: "Subscriptions/cancelFeedBack",
      changeBtnClicked:"User/changeBtnClicked",
      fetchMySubscriptions: "Subscriptions/fetchMySubscriptions",
      getCreditsInfoAPI: 'Subscriptions/getCreditsInfoAPI',
      cancelSubPlanOffersAPI: 'Subscriptions/cancelSubPlanOffersAPI',
      fetchCurrentSubscription:'Billing/fetchCurrentSub',
      fetchPackages: 'Subscriptions/fetchAll',
      getTheTourStatus: 'Subscriptions/getTheTourStatus',
      updateTheTourStatus: 'Subscriptions/updateTourStatus',
      getCoinInfoAPI: 'Subscriptions/getCoinInfoAPI',
      getPublicConfiguration: 'Subscriptions/getPublicConfiguration'
    }),
    openFoyrCoinBadges() {
      const vm = this

      vm.getTheTourStatus().then(() => {
        this.showFoyrCoinBadges = true
      })

      vm.getCoinInfoAPI()
    },
    closeFoyrCoinBadges() {
      this.showFoyrCoinBadges = false
    },
    total(service, type, field, field2) {
      if (this.mainSub[type][service])
        return this.mainSub[type][service].reduce((a, b) => {
          if (field2) {
            return a + b[field][field2];
          } else {
            return a + b[field];
          }
        }, 0);
      else return 0;
    },
    outsideClick() {
      if (this.getFreeDemoShow_Desk)
        this.getFreeDemoShow_Desk = false
    },
    closePopup() {
      this.show = false;
      this.credits = false;
      this.cancelSub = false;
      this.showBills = false;
      this.selectedCancelCategory=''
      this.getFreeDemoShow_Desk = false;
      this.cancelfeedBack='';
      this.isCantBuy = false;
      this.changeBtnClicked(false);
    },
    cancelContainer(container) {
      if (container == "show") {
        this.cancelSub = false;
      }
    },
    cancelSubs: function() {
      this.cancelSubscription({
        id: this.currentBilling.subscription,
        accountId: this.user.accountId
      }).then(res => {
        // amplitude.getInstance().logEvent("subscriptionCancelled", {
        //   subscriptionId: this.currentBilling.subscription
        // });
        this.cancelCta(this.cancelOptionText[this.selectedCancelCategory].name,false)
        // if (window.analytics) {
        //   window.analytics.track("subscriptionCancelled", {
        //     // title: "subscriptionCancelled",
        //     // subtitle: this.currentBilling.subscription,
        //     // author: this.user.email,
        //     author: this.user.email,
        //     action: 'clicked',
        //     reason: this.cancelfeedBack,
        //   },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
        // }
        this.show = false;
        this.message.error = false;
        this.selectedCancelCategory = '';
        this.message.value =
          "Your subscription is cancelled successfully. Our team will get back shortly if they have a solution for you";
        this.message.global = true;
        this.cancelSub = false;
        setTimeout(() => {
          this.message.global = false;
          this.message.value = "";
        }, 4000);
      });

    },
    invoiceDownload(accountId, invoiceId) {
      this.downloadInvoice({ accountId, invoiceId });
      // .then((res)=>{
      // const linkSource = res;
      // const downloadLink = document.createElement("a");
      // // const fileName = "vct_illustration.pdf";

      // downloadLink.href = linkSource;
      // downloadLink.download = "invoice.pdf";
      // downloadLink.click();
      // amplitude.getInstance().logEvent("invoiceDownload");
      // window.open("data:application/pdf," + encodeURI(res));

      // });
      // window.open("data:application/pdf," + encodeURI(res));
    },
    dateFormat: function(date) {
      let newDate = new Date(date);
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
      newDate = mlist[newDate.getMonth()] +' '+ newDate.getDate()+", "+ newDate.getFullYear();
      return newDate;
    },
    getAllInvoice: function() {
      this.invoiceLoading = true;
      this.showBills = true;
      this.totalInvoiceDetails({ accountId: this.user.accountId })
        .then(res => {
          if (res) {
            this.allInvoice = res.data;
            this.invoiceLoading = false;
          }
        })
        .catch(err => {
          console.log("ERROR WHILE GETTING INVOICE DETAILS", err);
        });
    },
    cancelCta(head,button){
      let eventTitle = ''
      if(head == 'DIFFICULT TO USE' && button){
        this.getFreeDemoShow_Desk = true;
        // this.eventTitle = 'Notusingenough_pause_clicked'
        this.message.value = "Your personalized session has been successfully scheduled. One of product experts will meet you there. "
      }
      if ((head == "I DONT' USE IT ENOUGH" || head == 'COVID19') && button) {
        if(head === "I DONT' USE IT ENOUGH")
          eventTitle = 'Notusingenough_pause_clicked'
        else if(head == 'COVID19')
          eventTitle = 'Covid_pause_clicked'
        else {

        }
        this.message.value = "Your subscription will be paused shortly"
      }else {
        if(head === 'TOO EXPENSIVE'){
          eventTitle = 'Expensive_offer_clicked'
        }else {
          eventTitle = 'subscriptionCancelled'
        }
        this.message.value = "Your request has been received, our team will get in touch with you shortly. "
      }
      let payload = {
        "data":{
          "category":head,
          "feedback":this.cancelfeedBack,
          "button":button,
        },
        "accountId":this.user.accountId,
        "subId":this.currentBilling.subscription
      }
      if(window.analytics){
        analytics.track(
        eventTitle,
        {
          author: this.user.email,
          action: 'clicked',
          reason: eventTitle === 'subscriptionCancelled' ? this.cancelfeedBack: head,
        },
        { integrations: { Amplitude: { session_id: new Date().getTime() } } },
        { timestamp: new Date().getTime() }
        );
      }
      this.cancelFeedBackApi(payload).then(res =>{
        if(button && head != 'DIFFICULT TO USE'){
          this.message.error = false;
          this.message.global = true;
        }
        this.cancelSub = false;
        this.selectedCancelCategory='';
        setTimeout(() => {
          this.message.global = false;
          this.message.value = "";
        }, 4000);
      })
    },
    upgradeClicked(){
      this.show = true;
      this.changeBtnClicked(true);
    },
    cancelSubClicked(){
      if(this.currentBilling && this.currentBilling.subscriptionStatus && this.currentBilling.subscriptionStatus === 'cancled'){
        this.isCantBuy = true;
        return;
      }
      this.cancelSub = true;
      this.selectedCancelCategory='covid19';
         if(window.analytics){
         analytics.track(
          "Cancel_flow_opened",
          {
            author: this.user.email,
            action: 'open'
          },
          { integrations: { Amplitude: { session_id: new Date().getTime() } } },
          { timestamp: new Date().getTime() }
        );
      }
    },
    onClickCancel(){

      //  disable cancel button for 1second
      this.disablePointerEvents =  true 
      setTimeout(()=>{this.disablePointerEvents=false}, 1000)

      console.log("onClickCancel-P1PlanList")

      if(this.currentBilling && this.currentBilling.subscriptionStatus && this.currentBilling.subscriptionStatus === 'cancled'){
        this.isCantBuy = true;
        return;
      }

      let P1PlanList = ['neo-basic-quarterly-inr','neo-standard-monthly-inr','neo-basic-monthly-inr','neo-pro-quarterly','neo-premium-quarterly','neo-premium-quarterly-cad','neo-pro-monthly','foyr-premium-quarterly-stg','neo-standard-quarterly','neo-standard-quarterly-cad','neo-premium-monthly','neo-premium-monthly-cad','neo-basic-quarterly','neo-basic-quarterly-cad','foyr-premium-monthly-stg','neo-standard-monthly','neo-standard-monthly-cad','foyr-basic-quarterly-stg','neo-basic-monthly','foyr-standard-monthly','neo-basic-monthly-cad','foyr-basic-monthly-stg']
      let P2PlanList = ['neo-premium-yearly-inr','neo-standard-yearly-inr','neo-basic-yearly-inr','neo-pro-yearly','neo-pro-half-yearly','neo-premium-yearly-cad---1','neo-premium-yearly','neo-premium-half-yearly','foyr-premium-yearly-stg','neo-standard-half-yearly','neo-standard-yearly','neo-standard-yearly-cad','neo-basic-yearly','neo-basic-yearly-cad','foyr-standard-yearly-stg','foyr-basic-yearly-stg','neo-basic-half-yearly']
      let P3PlanList = ['neo-light-yearly-inr','neo-standard-lite-monthly-inr','neo-light-monthly-inr','foyr-neo-lite-monthly-INR','neo-standard-lite-yearly-stg','neo-standard-lite-yearly-cad','neo-light-yearly','neo-light-yearly-cad','neo-lite-yearly','neo-premium-basic-plan-staging','neo-retention-monthly-cad','neo-retention-monthly-stg','neo-standard-lite-monthly-cad','neo-standard-annual-plan','neo-light-monthly','neo-light-monthly-cad','neo-lite-monthly','neo-lite-monthly-cad','foyr-neo-lite-monthly','foyr-neo-lite-monthly-CAD','neo-ultra-lite-monthly']
      

      if(this.cancelSubState.discountOfferApi && this.cancelSubState.discountOfferApi.isPauseApplied) {
        if(
         this.currentBilling &&
         this.currentBilling.chargebeeSubscriptionData &&
         this.currentBilling.chargebeeSubscriptionData.plan_id && 
         P1PlanList.includes(this.currentBilling.chargebeeSubscriptionData.plan_id)
        ){  
            
            this.showcancelPageTypeForm = true;
            // this.cancelPageTypeFormData.formId = "DJ6huWCi"
            this.cancelPageTypeFormData.formId = "DwA8YLbU"
            setTimeout(()=>{this.showcancelPageTypeForm = false}, 2000)
            return;

        }
         if(
         this.currentBilling &&
         this.currentBilling.chargebeeSubscriptionData &&
         this.currentBilling.chargebeeSubscriptionData.plan_id && 
         P2PlanList.includes(this.currentBilling.chargebeeSubscriptionData.plan_id)
        ){  
            
            this.showcancelPageTypeForm = true;
            // this.cancelPageTypeFormData.formId = "DJ6huWCi"
            this.cancelPageTypeFormData.formId = "DJ6huWCi"
            setTimeout(()=>{this.showcancelPageTypeForm = false}, 2000)
            return;

        }

        this.showcancelPageTypeForm = true;
        this.cancelPageTypeFormData.formId = "xPwBybxL"
        setTimeout(()=>{this.showcancelPageTypeForm = false}, 2000)
        return;
        

       }else{
          this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-home', page: 1}})
       }

       
      
       if( this.publicConfiguration &&
           this.publicConfiguration.typeform &&
           this.publicConfiguration.typeform.buyYearPayMonExp &&
           this.publicConfiguration.typeform.buyYearPayMonExp.showTypeform &&
           this.currentBilling &&
           this.currentBilling.name==="neo standard annual plan"
        ){

        let isBuyYearPayMonExpTypeFormShown = this.fetchAccountInfo &&
                                                  this.fetchAccountInfo.typeform &&
                                                  this.fetchAccountInfo.typeform.buyYearPayMonExp &&
                                                  this.fetchAccountInfo.typeform.buyYearPayMonExp.typeformShown 
                                                  ? true : false 
        
         if(!isBuyYearPayMonExpTypeFormShown){
                           
            this.showbuyYearPayMonExp = true;
            setTimeout(()=>{this.showbuyYearPayMonExp = false}, 2000)
            return;

         }
      }

      if(
         this.currentBilling &&
         this.currentBilling.invoice.period == 1 &&
         this.currentBilling.status != "in_trial" && 
         this.user.accountExtraInfo &&
         this.user.accountExtraInfo.userCategory == "Interior Designer" && 
         this.user.ipInfo.country == "US" && 
         this.cancelSubState.discountOfferApi &&
         this.cancelSubState.discountOfferApi.isPauseApplied && 
         this.publicConfiguration.typeform.cancelPage 
        ){

         

          console.log("typeform")
          let isCancelTypeformShown = this.fetchAccountInfo && 
                                      this.fetchAccountInfo.typeform && 
                                      this.fetchAccountInfo.typeform.cancelPage && 
                                      this.fetchAccountInfo.typeform.cancelPage.typeformShown
                                     ? true : false
          // if cancellation typeform is already shown - don't show it again
          if(!isCancelTypeformShown){
            this.showcancelPageTypeForm = true;
            setTimeout(()=>{this.showcancelPageTypeForm = false}, 2000)
            return;

          }
      }
      // show pause subscription screen for lower plan users
      // if (this.isLPUPlan) {
      //   this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-cancel', page: 1}})
      //   return;
      // }
      if(this.currentBilling && this.currentBilling.analyticsData && this.currentBilling.analyticsData.analyticsStatus){
        if(this.user && this.user.subInfo && this.user.subInfo.cancel_popup){
          if(this.cancelSubState.discountOfferApi && this.cancelSubState.discountOfferApi.isPauseApplied) {
            if(this.currentBilling.analyticsData.analyticsStatus === 'paid')
              this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-cancel', page: 1}})
            else
              this.isContactPause = true;
          }
          else
            this.openNewCancelFlow = true;
        }
        else {
          if (window.analytics) {
            window.analytics.track('Cancel_button', {
              name: 'Cancel subscription',
              flow: "Cancellation"
            },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
          }
          if((this.cancelSubState.discountOfferApi && this.cancelSubState.discountOfferApi.isPauseApplied) ||
              (this.currentBilling && this.currentBilling.status && this.currentBilling.status === 'in_trial') ||
              this.currentBilling.analyticsData.analyticsStatus === 'paywall_intrial' ||
              (this.fetchAccountInfo && this.fetchAccountInfo.hasOwnProperty('disableCancellationFlow') && this.fetchAccountInfo.disableCancellationFlow)
            ){
            this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-cancel', page: 1}})
          }else
            this.$router.push({path:'/settings/plans', query: {flow:'cancel-sub',type:'cs-home', page: 1}})
        }
      }else {

      }
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin button-black {
  color: #e9beb3;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: #222021;
}
@mixin head-main {
  font-size: 1.5rem;
  color: #000000;
  font-weight: 400;
}
.cancel-sub-text {
  padding: 2rem 0;
  p {
    font-size: 1rem;
    // max-width: 70%;
    text-align: center;
    margin: auto;
    color: white;
  }
}
section {
  padding: 0.9375rem 3.125rem;
  width: calc(80% + 3.125rem);
  @include respond(phone) {
    // width < 900px?
    width: 100%;
  }
  .plans-bg-pattern {
    position: absolute;
    opacity: 0.08;
    right: 0;
    top: 1rem;
    z-index: 0;
    // height: 25rem;
    // padding-left: 46rem;
  }
  .download-icon {
    a {
      cursor: pointer;
    }
  }
  p {
    color: #222021;
    font-size: 1rem;
    line-height: 1.125rem;
    margin-bottom: 0.5rem;
  }
  span {
    font-size: 0.8125rem;
    line-height: 1rem;
    color: #868686;
  }
  .plan-head-container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.5625rem;
    border-bottom: 1px solid #e9beb3;
    margin-bottom: 1.875rem;
    h2 {
      @include head-main;
    }
    button {
      @include button-black;
      width: 10rem;
    }
    div:last-child {
      align-self: flex-end;
    }
    .change-plan {
      position: relative;
      // &:hover{
      //   .hover-disable-text{
      //     display: block;
      //   }
      // }
    }

    .button:disabled {
      cursor: no-drop;
    }
  }
  .future-plan {
    // font-size: 0.8125rem;
    // color: #868686;
    // margin-top: 0.75rem;
    font-size: 0.85rem;
    color: #222021;
    margin-top: .75rem;
    font-weight: 500;
    span {
      font-size: 0.8125rem;
      color: #222021;
    }
  }
  .billing-info-container {
    padding-bottom: 1.125rem;
    border-bottom: 1px solid #e9beb3;
    margin-bottom: 2.1875rem;
    .billing-info-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.375rem;
      p {
        &:last-child {
          cursor: pointer;
        }
      }
    }
    .billing-details {
      div {
        display: flex;
        span {
          width: 12.5rem;
        }
        p {
          font-size: 0.8125rem;
        }
      }
    }
    // button{
    //   cursor: pointer;
    //   &:disabled{
    //     cursor:no-drop;
    //   }
    // }
    .cancel-sub-container {
      text-align: right;
      width: max-content;
      position: relative;
      margin-left: auto;
      cursor: pointer;
      a{
        text-decoration: none;
      }
      p{
        // color: #F04D4D;
        // font-weight: bold;
      }
      // &:hover{
      //   .hover-disable-text{
      //     display: block;
      //   }
      // }
    }
  }
  .usages-main-container {
    padding-bottom: 1.875rem;
    border-bottom: 1px solid #e9beb3;
    margin-bottom: 2.1875rem;

    .usage-head {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      h2 {
        @include head-main;
      }
      button {
        @include button-black;
        width: 10rem;
      }
      .addon-buy {
        position: relative;
        // &:hover{
        //   .hover-disable-text{
        //     display: block;
        //   }
        // }
      }
    }
    .service-usage-container {
      display: grid;
      grid-template-columns: 45% 45%;
      grid-column-gap: 10%;
      .service-usage {
        div {
          display: grid;
          grid-template-columns: 50% 50%;
        }
        .sub-head-color {
          p {
            color: #d48e8e;
            margin-bottom: 0.25rem;
          }
          border-bottom: 1px solid #e8e8e8;
          margin-bottom: 0.75rem;

          &.coins {
            border: none;
          }
        }
        .sub-2-head-color {
          p {
            font-size: 0.75rem;
            color: #d48e8e;
          }
          p:not(:first-child) {
            text-align: center;
          }
        }
        .plans-addons {
          p {
          }
        }
        .three-colum {
          grid-template-columns: 40% 30% 30%;
        }
        .per-service-data p:not(:first-child) {
          text-align: center;
        }
      }
    }
  }
}
.hover-disable-text {
  position: absolute;
  display: none;
  text-align: center;
  padding: 0.3125rem;
  margin-top: 0.625rem;
  background: black;
  width: 100%;
  &::before {
    content: "";
    width: 0;
    position: absolute;
    top: -5px;
    left: 50%;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
  }
  p {
    color: white;
    margin: 0rem;
  }
}
.no-packages {
  width: 100%;
  // background: #222021;
  padding: 1rem 6rem;
  .no-package {
    background: white;
    div:last-child {
      padding: 1rem 3.5rem;
      display: flex;
      svg {
        margin-right: 2rem;
      }
      div {
        display: block;
        p:first-child {
          font-size: 1.5rem;
          color: #d48e8e;
          margin-bottom: 1rem;
        }
        p:last-child {
          font-size: 1rem;
          color: #8a8a8a;
        }
      }
    }
  }
}
.loading-main {
  width: 100%;
}
.package-popup,
.showPopUp {
  .popup-container {
    padding: 3.75rem 9.0625rem;
    background: #222021;
    @include respond(phone) {
      // width < 900px?
      padding: 2rem 2rem;
    }
    @include respond(s-phone) {
      // width < 900px?
      padding: 2rem;
    }

  }
  .getDemoContainer{
      padding: 0px;
      background: #fbfcfd;
      .free-demo-iframe {
        height: 75vh;
        width: 70vw;
      }
      .close-popup{
        position: static;
        text-align: right;
        svg{
          background: none;
          path{
            fill: black;
          }
        }
      }
  }
  .future-plan-container {
    padding: 3.125rem 3.125rem;
    .future-plan-taken {
      p {
        width: 30vw;
        color: #222021;
        text-align: justify;
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.375rem;
      }
      a {
        color: #d48e8e;
        text-decoration: none;
      }
    }
  }
}
.titleCase {
  text-transform: capitalize;
}
.cancel-option-container{
  max-width: calc( 54rem + 50px);
  .cancel-option-icons-container{
    display: grid;
    // grid-template-columns: repeat(6 , 9rem);
    grid-template-columns: repeat(4 , 13.2rem);
    align-items: center;
    justify-items: center;
    // justify-content: center;
    text-align: center;
    grid-gap: 10px;
    .cancel-optin-icons{
      height: 100%;
      width: 100%;
      display: grid;
      align-items: center;
      justify-items: center;
      padding: 12px 0px;
      grid-row-gap: 10px;
      cursor: pointer;
      background:#FBF3F1;
      p{
        color: #000000;
        width: 100%;
      }
      svg{
        path{
          stroke: #d48e8e;
        }
      }
      &:hover{
        background:#d48e8e;
        p{
          color: #e8e8e8;
        }
        svg{
          path{
            stroke: #e8e8e8;
          }
        }
      }
      &.activeCat{
        background:#d48e8e;
        p{
          color: #e8e8e8;
        }
        svg{
          path{
            stroke: #e8e8e8;
          }
        }
      }
    }
  }
  .cancel-option-text-container{
    background: #FBF3F1;
    padding: 1.5rem;
    margin: 1rem 0px;
    // max-width: fit-content;
    display: grid;
    grid-row-gap: 1rem;
    width: 55rem;
    height: 12rem;
    p{
      text-align: left;
      margin: 0px;
      width: auto;
      max-width: fit-content;
      color: #292929;
      line-height: 1.4;
    }
    .cancel-option-head-tag{
      font-weight: 600;
      font-size: 1.1rem;
      // margin-bottom: 1rem;

    }
    .cancel-option-sub-text{

    }
    .cancel-option-cta{
      height: max-content;
      width: max-content;
      padding: 0.5rem 1rem;
      color: white;
      background: #d48e8e;
      cursor: pointer;
    }
    input{
    border: 1px solid #E9BEB3;
    background: #ffffff;
    }
  }
}
.cant-buy {
  padding: 3.125rem 3.125rem !important;
  .cant-buy-alert {
    p {
      width: 36vw;
      color: white;
      text-align: justify;
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.375rem;      }
    a {
      color: #d48e8e;
      text-decoration: none;
    }
  }
}
.no-package {
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  column-gap: 6rem;
  svg {
    width: 3rem;
  }
}
.payment-updating-popup {
  opacity: 1;
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

.disbale-pointer-events{
  pointer-events: none;
}
</style>

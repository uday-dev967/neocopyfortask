<template>
    <div class="setting-details-container " v-if="currentSub">
      <div >
        <div class="billing-details" v-if="user">
          <div>
            <p>
              <span>Your Plan :</span> {{currentSub.displayContext.packageName}}
              <span v-if="user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR'" class="change-plan"><nuxt-link to="/settings/subscriptions">Change Plan</nuxt-link></span>
            </p>
            <p>
              <span>Usage Reset :</span> {{currentSub.usageCycle == 1 ? 'Monthly': currentSub.usageCycle ==3?'Quarterly':currentSub.usageCycle ==6?'Half Yearly':currentSub.billing == 12?'Yearly':'Not Applicable' }}
            </p>
            <p>
              <span>Billing :</span> {{currentSub.billing == 1 ? 'Monthly': currentSub.billing ==3?'Quarterly':currentSub.billing ==6?'Half Yearly':currentSub.billing == 12?'Yearly':currentSub.billing  }}
            </p>
          </div>
          <div>
            <p>
              <span>Outstanding Amount :</span> {{currentSub.outstandingAmount}}
            </p>
            <p>
              <span>Next Billing :</span> {{currentSub.billing == "One Time"?"Not Applicable": currentSub.nextBilling}}
            </p>
          </div>
        </div>
        <div class="billing-data-container" v-if="subUsage">
            <div class="table-head">
                <div>
                    <img src="~assets/images/imgIcon.svg" alt="">
                    <p>Renders</p>
                </div>
                <div class="info-credits">
                    <p>{{subUsage.package.totalCreditsPerCycle + totalCredit  - addonUsage - packageUsage}} C Available</p>
                    <img src="~assets/images/info.svg" alt="" >
                    <div class="total-credit-info">
                      <div>
                        <p>Credit Type</p>
                        <p>Package</p>
                        <p>Add On</p>
                        <p>Total</p>
                      </div>
                      <div>
                        <p>Credits </p>
                        <p>{{subUsage.package.totalCreditsPerCycle - packageUsage }}</p>
                        <p>{{addonTotal - addonUsage}}</p>
                        <p>{{subUsage.package.totalCreditsPerCycle  + addonTotal - addonUsage - packageUsage}} C </p>
                      </div>
                    </div>
                </div>

            </div>
            <table>
                <tr>
                    <th>Description</th>
                    <th>Qty. used</th>
                    <th>Credits used</th>
                </tr>
                <tr v-for="service in subUsage.package.serviceList">
                    <td>{{service.name}}</td>
                    <td>{{service.serviceOverAllExceptOverUsageByMetric + service.serviceOverUsageByMetric}}</td>
                    <td>{{service.serviceOverAllExceptOverUsage + service.serviceOverUsage}}</td>
                </tr>
            </table>
            <div v-if="addonSub && addonSub.custom.length>0">
              <div class="table-head">
                <div>
                    <img src="~assets/images/model.svg" alt="">
                    <p>Custom Models</p>
                </div>
                <div class="info-credits">
                    <p>{{addonSub.custom[0].totalCreditsPerCycle - addonSub.custom[0].serviceList[0].serviceOverAllExceptOverUsage + customUsage.total - customUsage.usage}} C Available</p>
                    <img src="~assets/images/info.svg" alt="">
                    <div class="total-credit-info">
                      <div>
                        <p>Credit Type</p>
                        <p>Recurring</p>
                        <p>One Time</p>
                        <p>Total</p>
                      </div>
                      <div>
                        <p>Credits </p>
                        <p>{{addonSub.custom[0].rules.mode!=="onetime"?addonSub.custom[0].totalCreditsPerCycle - addonSub.custom[0].serviceList[0].serviceOverAllExceptOverUsage:0 }}</p>
                        <p>{{customUsage.total-customUsage.usage}}</p>
                        <p>{{addonSub.custom[0].totalCreditsPerCycle - addonSub.custom[0].serviceList[0].serviceOverAllExceptOverUsage + customUsage.total - customUsage.usage}} C</p>
                      </div>
                    </div>
                </div>
              </div>
              <table>
                  <tr>
                      <th>Description</th>
                      <th>Qty. used</th>
                      <th>Credits used</th>
                  </tr>
                  <tr v-for="service in addonSub.custom[0].serviceList">
                      <td>{{service.name}}</td>
                      <td>{{customUsage.metric+service.serviceOverAllExceptOverUsageByMetric}}</td>
                      <td>{{customUsage.usage + service.serviceOverAllExceptOverUsage}}</td>
                  </tr>
              </table>
            </div>
            <div v-if="addonSub && addonSub.custom.length == 0 && addonSub.customOne.length>0" >
              <div class="table-head">
                <div>
                    <img src="~assets/images/model.svg" alt="">
                    <p>Custom Models</p>
                </div>
                <div class="info-credits">
                    <p>{{customUsage.total - customUsage.usage}} C Available</p>
                    <img src="~assets/images/info.svg" alt="">
                    <div class="total-credit-info">
                      <div>
                        <p>Credit Type</p>
                        <p>Package</p>
                        <p>Add On</p>
                        <p>Total</p>
                      </div>
                      <div>
                        <p>Credits </p>
                        <p>0</p>
                        <p>{{customUsage.total-customUsage.usage}}</p>
                        <p>{{customUsage.total - customUsage.usage}} C</p>
                      </div>
                    </div>
                </div>
              </div>
              <table>
                  <tr>
                      <th>Description</th>
                      <th>Qty. used</th>
                      <th>Credits used</th>
                  </tr>
                  <tr v-for="service in addonSub.customOne[0].serviceList">
                      <td>{{service.name}}</td>
                      <td>{{customUsage.metric}}</td>
                      <td>{{customUsage.usage}}</td>
                  </tr>
              </table>
            </div>
            <!-- <div class="table-head">
                <div>
                    <img src="~assets/images/proj.svg" alt="">
                    <p>Project Downloads</p>
                </div>
                <div>
                    <p>08 C</p>
                    <img src="~assets/images/info.svg" alt="">
                </div>
            </div>
            <table>
                <tr>
                    <th>Description</th>
                    <th>Qty. used</th>
                    <th>Credits used</th>
                </tr>
                <tr>
                    <td>Project Downloads</td>
                    <td>13</td>
                    <td>32</td>
                </tr>

            </table> -->
        </div>
        <!-- <div class="payment-details">
          <div class="payment-head">
            <div class="flex">
              <img src="~assets/images/payment.svg" alt>
              <p class="last-payment">Last Payment Information</p>
            </div>
            <p @click="showBilling" class="billing-history">Billing History</p>
          </div>
          <div>
            <table class="billing-table">
              <tr>
                <th>Date:</th>
                <th>Billing Period</th>
                <th>Plan Details</th>
                <th>Amount Paid</th>
                <th>Status</th>
                <th>Pay Mode</th>
              </tr>
              <tr>
                <td>{{currentSub.lastPayment.date}}</td>
                <td>{{currentSub.lastPayment.start +' to '+ currentSub.lastPayment.end}}</td>
                <td>{{currentSub.lastPayment.name}}</td>
                <td>{{currentSub.lastPayment.amountPaid}}</td>
                <td>{{currentSub.lastPayment.paymentStatus}}</td>
                <td>Online</td>
              </tr>
            </table>
            <a class="invoice" @click="invoiceDownload(user.accountId,currentSub.lastPayment.invoice)">Download Invoice></a>
          </div>
        </div> -->
      </div>
      <div class="right-side-billing"  v-if="user && user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR'">
        <!-- <progressComponent/> -->
        <div class="current-sub">
          <p class="current-sub-head">Last Payment Info</p>
          <div class="under-line"></div>
          <div class="basic-details">
            <span>Date</span>
            <p>{{currentSub.lastPayment.date?currentSub.lastPayment.date:currentSub.lastPayment.start}}</p>
            <span>Billing Period</span>
            <p>{{dateFormat(currentSub.lastPayment.start)}} - {{dateFormat(currentSub.lastPayment.end)}}</p>
            <span>Plan Details</span>
            <p>{{currentSub.displayContext.packageName}}</p>
            <span>Status</span>
            <p>{{currentSub.lastPayment.paymentStatus}}</p>
            <span>Pay Mode</span>
            <p>Online</p>
            <span>Amount</span>
            <p>{{currentSub.lastPayment.amountPaid == "Not available" ?currentSub.lastPayment.amountPaid:"Rs " + currentSub.lastPayment.amountPaid+ "/-"}}</p>
            <!-- <span v-if="currentSub.lastPayment.invoice">Action</span> -->
            <!-- <p v-if="currentSub.lastPayment.invoice" class="get-invoice" @click="invoiceDownload(user.accountId,currentSub.lastPayment.invoice)">Get Invoice</p> -->
          </div>
          <div class="view-billing-history" >
            <button v-if="allInvoice && allInvoice.length > 0" @click="showBills=true">VIEW BILLING HISTORY</button>
          </div>
        </div>
      </div>
      <div class="popup-div" :class="showBills?'showPopUp':''">
        <div class="popup-container">
          <div class="close-popup" @click="closePopup">
            <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z" fill="white"/>
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
              </div> -->
            </div>
            <table v-if="showBills" cellspacing="0">
              <tr class="table-heads">
                <th>Invoice No.</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
              <tr v-if="allInvoice" class="table-child" v-for="invoice in allInvoice">
                <td>{{invoice.invoice_id}}</td>
                <td>{{invoice.invoice_date}}</td>
                <td>{{invoice.total}}</td>
                <td>{{invoice.status}}</td>
                <!-- <td class="download-icon">
                  <a @click="invoiceDownload(user.accountId,invoice.invoice_id)"><img src="~assets/images/arrowDown.svg"></a>
                </td> -->
              </tr>
              <tr v-if="!allInvoice">
                Loading....
              </tr>
              <tr v-if="allInvoice.length === 0">No billing data</tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="currentSub === undefined"  class="no-data-container">
      <svg width="250" height="215" viewBox="0 0 250 215" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M196.122 64.5489C195.931 64.5489 195.74 64.3575 195.548 64.3575H102.946C87.449 64.3575 74.8214 76.9851 74.8214 92.4825V183.363H41.148C40.574 183.363 40 183.937 40 184.511V186.998C40 202.113 52.2449 214.358 67.3597 214.358H147.143H147.334C150.204 214.358 167.615 213.21 173.355 193.694V193.503L173.929 190.25V190.059V97.0744H210.855C211.429 97.0744 212.003 96.5004 212.003 95.9264V81.3856C212.194 72.3933 205.115 64.9315 196.122 64.5489ZM67.3597 212.062C53.5842 212.062 42.2959 200.773 42.2959 186.998V185.659H112.895V186.615C113.087 191.781 115.383 206.513 132.602 212.062H67.3597ZM171.824 189.868L171.441 193.12C165.702 212.253 147.908 212.062 147.143 212.062H146.952C118.444 211.488 115.383 192.355 115 186.424V184.511C115 183.937 114.426 183.363 113.852 183.363H77.1173V92.4825C77.1173 78.3244 88.7883 66.6535 102.946 66.6535H187.13C172.589 72.7759 171.824 89.4213 171.824 89.804V189.868ZM209.898 94.7785H174.12V89.804C174.12 89.0387 175.268 68.9494 195.74 66.8448C195.74 66.8448 195.74 66.8448 195.931 66.8448C203.776 67.0361 210.089 73.5412 210.089 81.3856V94.7785H209.898Z" fill="#ECD8D3"/>
      <path d="M149.248 93.8219H98.7373C98.1633 93.8219 97.5894 94.3959 97.5894 94.9699V114.294C97.5894 114.868 98.1633 115.442 98.7373 115.442H149.248C149.821 115.442 150.395 114.868 150.395 114.294V94.9699C150.395 94.2045 150.013 93.8219 149.248 93.8219ZM148.291 113.146H99.8853V96.1178H148.291V113.146Z" fill="#ECD8D3"/>
      <path d="M149.248 135.531H98.7373C98.1633 135.531 97.5894 136.105 97.5894 136.679C97.5894 137.253 98.1633 137.827 98.7373 137.827H149.248C149.821 137.827 150.395 137.253 150.395 136.679C150.395 136.105 150.013 135.531 149.248 135.531Z" fill="#ECD8D3"/>
      <path d="M149.248 160.403H98.7373C98.1633 160.403 97.5894 160.977 97.5894 161.551C97.5894 162.125 98.1633 162.699 98.7373 162.699H149.248C149.821 162.699 150.395 162.125 150.395 161.551C150.395 160.977 150.013 160.403 149.248 160.403Z" fill="#ECD8D3"/>
      <path d="M14.5766 158.548L15.1657 158.444L14.88 156.824L14.291 156.928L14.5766 158.548ZM12.5826 158.262L13.1717 158.158L12.886 156.538L12.297 156.642L12.5826 158.262ZM28.7608 153.739L28.1717 153.843L28.4574 155.463L29.0464 155.359L28.7608 153.739ZM26.9953 154.749L26.4062 154.853L26.6919 156.473L27.2809 156.369L26.9953 154.749ZM17.4992 158.762L18.0883 158.658L17.8026 157.038L17.2136 157.142L17.4992 158.762ZM24.5766 155.843L23.9876 155.947L24.2732 157.567L24.8623 157.463L24.5766 155.843ZM20.8048 158.391L21.3938 158.287L21.1082 156.668L20.5191 156.771L20.8048 158.391ZM18.8076 143.62L18.2185 143.724L18.904 147.612L19.4931 147.508L18.8076 143.62ZM12.8923 148.824L11.264 147.684L10.9243 148.169L12.5527 149.309L12.8923 148.824ZM27.1525 145.307L26.6675 144.967L25.5273 146.596L26.0123 146.935L27.1525 145.307ZM29.6377 151.307C29.2898 149.334 24.2189 149.165 19.595 149.98C14.971 150.795 10.2931 152.683 10.6411 154.657C10.6514 154.715 10.6566 154.745 10.667 154.804L11.2487 158.102C11.5966 160.076 16.6674 160.244 21.2914 159.429C25.9154 158.614 30.5881 156.697 30.2453 154.753L29.6585 151.425C29.6533 151.395 29.6429 151.336 29.6377 151.307ZM29.6563 154.857C29.8588 156.005 26.4301 157.916 21.1581 158.845C15.8862 159.775 12.0402 159.147 11.8377 157.999L11.4222 155.642C13.0835 156.625 17.0318 156.627 20.6838 155.983C24.3359 155.339 28.0452 153.987 29.2703 152.495L29.6857 154.851L29.6563 154.857ZM20.58 155.394C15.3375 156.319 11.4326 155.701 11.2301 154.553C11.0276 153.404 14.4563 151.494 19.7283 150.564C25.0002 149.634 28.8756 150.257 29.0781 151.406C29.2807 152.554 25.8224 154.47 20.58 155.394Z" fill="#ECD8D3"/>
      <path d="M133.791 14.9555L134.353 15.1601L134.915 13.6144L134.353 13.4098L133.791 14.9555ZM132.207 13.7107L132.769 13.9153L133.332 12.3696L132.77 12.165L132.207 13.7107ZM148.479 17.8828L147.917 17.6783L147.354 19.2239L147.917 19.4285L148.479 17.8828ZM146.445 17.8746L145.883 17.67L145.321 19.2157L145.883 19.4202L146.445 17.8746ZM136.215 16.6017L136.777 16.8062L137.34 15.2606L136.778 15.056L136.215 16.6017ZM143.803 17.6132L143.241 17.4086L142.679 18.9543L143.241 19.1588L143.803 17.6132ZM139.263 17.9338L139.825 18.1383L140.388 16.5927L139.825 16.3881L139.263 17.9338ZM144.919 4.14308L144.357 3.9385L143.007 7.64809L143.569 7.85267L144.919 4.14308ZM137.194 5.69174L136.354 3.89015L135.818 4.14039L136.658 5.94198L137.194 5.69174ZM151.302 9.77637L151.052 9.23973L149.251 10.0798L149.501 10.6165L151.302 9.77637ZM150.455 16.2149C151.14 14.332 146.833 11.6505 142.421 10.0446C138.009 8.4387 133.014 7.73457 132.328 9.61747C132.308 9.67368 132.298 9.70178 132.277 9.75799L131.132 12.9055C130.446 14.7884 134.753 17.47 139.165 19.0759C143.578 20.6818 148.583 21.3578 149.258 19.503L150.414 16.3274C150.424 16.2993 150.444 16.243 150.455 16.2149ZM148.696 19.2984C148.297 20.3944 144.372 20.3345 139.342 18.5036C134.312 16.6727 131.295 14.2061 131.694 13.1101L132.512 10.8619C133.459 12.5434 136.877 14.5195 140.362 15.7878C143.847 17.0562 147.736 17.7395 149.542 17.0604L148.724 19.3086L148.696 19.2984ZM140.567 15.2258C135.564 13.4051 132.491 10.9181 132.89 9.82205C133.289 8.72603 137.214 8.78595 142.244 10.6169C147.275 12.4478 150.32 14.9246 149.921 16.0206C149.522 17.1166 145.569 17.0465 140.567 15.2258Z" fill="#ECD8D3"/>
      <path d="M235.252 71.2415L235.761 71.0045L235.109 69.6069L234.601 69.8439L235.252 71.2415ZM233.377 71.4662L233.886 71.2292L233.234 69.8317L232.726 70.0686L233.377 71.4662ZM246.93 63.445L246.422 63.682L247.074 65.0795L247.582 64.8426L246.93 63.445ZM245.576 64.7878L245.068 65.0247L245.72 66.4223L246.228 66.1853L245.576 64.7878ZM237.951 70.7257L238.459 70.4887L237.807 69.0911L237.299 69.3281L237.951 70.7257ZM243.652 66.3658L243.144 66.6028L243.795 68.0004L244.303 67.7634L243.652 66.3658ZM240.854 69.5883L241.363 69.3513L240.711 67.9537L240.203 68.1907L240.854 69.5883ZM235.462 56.6969L234.953 56.9339L236.518 60.2881L237.026 60.0511L235.462 56.6969ZM231.368 62.8442L229.616 62.2068L229.427 62.7284L231.178 63.3658L231.368 62.8442ZM243.428 56.1996L242.906 56.0097L242.269 57.7609L242.79 57.9508L243.428 56.1996ZM247.134 61.0297C246.34 59.3272 241.707 60.4048 237.718 62.2651C233.728 64.1254 229.95 66.9699 230.744 68.6724C230.768 68.7232 230.78 68.7486 230.804 68.7994L232.131 71.6454C232.925 73.3479 237.557 72.2703 241.547 70.41C245.536 68.5497 249.302 65.6798 248.52 64.0027L247.181 61.1313C247.17 61.1059 247.146 61.0551 247.134 61.0297ZM248.012 64.2397C248.474 65.2307 245.833 67.7926 241.284 69.9136C236.736 72.0346 233.101 72.3994 232.639 71.4084L231.691 69.3756C233.434 69.8622 237.01 68.9063 240.161 67.437C243.311 65.9677 246.342 63.8429 247.09 62.195L248.038 64.2278L248.012 64.2397ZM239.924 66.9288C235.4 69.0379 231.715 69.4264 231.253 68.4354C230.79 67.4444 233.432 64.8824 237.98 62.7614C242.529 60.6404 246.189 60.2638 246.651 61.2548C247.113 62.2458 244.447 64.8196 239.924 66.9288Z" fill="#ECD8D3"/>
      <path d="M2.77563 13.1038L3.09284 13.421L3.96515 12.5487L3.64795 12.2315L2.77563 13.1038ZM2.09364 11.7556L2.41084 12.0729L3.28316 11.2005L2.96595 10.8833L2.09364 11.7556ZM11.8319 19.7493L11.5147 19.432L10.6424 20.3044L10.9596 20.6216L11.8319 19.7493ZM10.452 19.099L10.1348 18.7818L9.26251 19.6541L9.57972 19.9713L10.452 19.099ZM3.90171 14.9912L4.21892 15.3084L5.09124 14.436L4.77403 14.1188L3.90171 14.9912ZM8.73912 18.0839L8.42191 17.7667L7.54959 18.639L7.8668 18.9562L8.73912 18.0839ZM5.55119 16.8627L5.8684 17.1799L6.74071 16.3076L6.42351 15.9904L5.55119 16.8627ZM13.7668 9.28143L13.4496 8.96423L11.3561 11.0578L11.6733 11.375L13.7668 9.28143ZM8.0254 7.88572L8.0254 6.39485L7.58131 6.39485L7.58131 7.88572L8.0254 7.88572ZM16.3204 15.1339L16.3204 14.6898L14.8295 14.6898L14.8295 15.1339L16.3204 15.1339ZM13.7034 19.2417C14.766 18.1791 12.6883 14.9912 10.1983 12.5011C7.7082 10.011 4.53613 7.94916 3.47348 9.01181C3.44176 9.04353 3.4259 9.05939 3.39418 9.09111L1.61782 10.8675C0.555182 11.9301 2.63289 15.118 5.12296 17.6081C7.61303 20.0982 10.801 22.1442 11.8477 21.0974L13.64 19.3052C13.6558 19.2893 13.6875 19.2576 13.7034 19.2417ZM11.5305 20.7802C10.912 21.3987 8.26331 20.114 5.42431 17.275C2.58531 14.436 1.31648 11.8032 1.93503 11.1847L3.20386 9.91585C3.31488 11.3591 5.01194 13.7858 6.97862 15.7525C8.9453 17.7191 11.3719 19.4162 12.8152 19.5272L11.5464 20.796L11.5305 20.7802ZM7.29583 15.4352C4.47269 12.6121 3.17214 9.94757 3.79069 9.32901C4.40924 8.71046 7.05792 9.99515 9.89692 12.8341C12.7359 15.6731 14.0206 18.3218 13.4021 18.9404C12.7835 19.5589 10.119 18.2584 7.29583 15.4352Z" fill="#ECD8D3"/>
      <path d="M209.784 207.627L210.346 207.422L209.783 205.877L209.221 206.081L209.784 207.627ZM207.77 207.691L208.332 207.487L207.77 205.941L207.208 206.146L207.77 207.691ZM222.917 200.428L222.355 200.633L222.918 202.178L223.48 201.974L222.917 200.428ZM221.354 201.729L220.792 201.934L221.355 203.479L221.917 203.275L221.354 201.729ZM212.699 207.33L213.261 207.125L212.699 205.58L212.136 205.784L212.699 207.33ZM219.162 203.227L218.6 203.432L219.163 204.977L219.725 204.773L219.162 203.227ZM215.89 206.391L216.452 206.187L215.89 204.641L215.328 204.845L215.89 206.391ZM211.358 192.191L210.796 192.396L212.146 196.105L212.708 195.901L211.358 192.191ZM206.436 198.343L204.635 197.503L204.385 198.039L206.186 198.879L206.436 198.343ZM219.869 192.403L219.333 192.153L218.493 193.955L219.029 194.205L219.869 192.403ZM223.359 197.88C222.673 195.998 217.65 196.712 213.238 198.318C208.826 199.924 204.547 202.595 205.232 204.478C205.253 204.534 205.263 204.562 205.283 204.618L206.429 207.766C207.114 209.649 212.137 208.935 216.55 207.329C220.962 205.723 225.23 203.023 224.555 201.169L223.4 197.993C223.389 197.965 223.369 197.909 223.359 197.88ZM223.993 201.373C224.392 202.469 221.347 204.946 216.317 206.777C211.286 208.608 207.39 208.657 206.991 207.561L206.173 205.313C207.979 205.992 211.868 205.309 215.353 204.041C218.838 202.772 222.256 200.796 223.203 199.115L224.021 201.363L223.993 201.373ZM215.148 203.479C210.146 205.299 206.193 205.369 205.794 204.273C205.395 203.177 208.44 200.701 213.471 198.87C218.501 197.039 222.426 196.979 222.825 198.075C223.224 199.171 220.151 201.658 215.148 203.479Z" fill="#ECD8D3"/>
      <rect x="216.575" y="121.953" width="3" height="23" rx="1.5" transform="rotate(12.7521 216.575 121.953)" fill="#ECD8D3"/>
      <rect x="225.077" y="116" width="3" height="23" rx="1.5" transform="rotate(12.7521 225.077 116)" fill="#ECD8D3"/>
      <rect x="52.0767" y="46.9525" width="3" height="23" rx="1.5" transform="rotate(12.7521 52.0767 46.9525)" fill="#ECD8D3"/>
      <rect x="60.5781" y="41" width="3" height="23" rx="1.5" transform="rotate(12.7521 60.5781 41)" fill="#ECD8D3"/>
      </svg>

      <p>There is no billing or usage data for your account.</p>
    </div>
    <div v-else class="main-loading">
      <div class="loading-container">
        <p>Loading...</p>
        <div class="loader"></div>
      </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data(){
      return{
        showBills:false
      }
    },
    props:{
        user:Object
    },
    mounted(){
      // console.log('BILLING VUE')
      setTimeout(() => {
        amplitude.getInstance().logEvent("usageAndPayment");
      }, 1000);
    },
    computed: {
      ...mapState({
        serviceResponse: state => state.Subscriptions.serviceResponse,
        currentSub: state => state.Billing.currentSubscription,
        allInvoice: state => state.Billing.allInvoice,
        subUsage: state => state.Billing.subscriptionUsage,
        addonSub:state => state.Billing.addonSub,
        mainSub: state => state.Billing.currentSub
      }),
      isDisabled(){
          return this.condition1 && this.condition2;
      },
      totalUsage: function(){
        return this.subUsage.package.serviceList.reduce((a,b)=>{
          return a+b.serviceOverAllUsage},0)
      },
      totalCredit: function(){
        let addon = [];
        return this.subUsage.package.serviceList.reduce((a,b)=>{
          if(b.type == "addon"){
            if(addon.length ==0)
              addon.push(b)
            else
              addon.forEach(item => {
                if(item.subscription == b.subscription)
                  b.totalCreditsPerCycle = 0
                else
                  addon.push(b)
              })
          }
          if(!b.totalCreditsPerCycle)
            b.totalCreditsPerCycle = 0;
          return a+b.totalCreditsPerCycle
        },0)
      },
      // totalCustomUsage: function(){
      //   return this.addonSub.custom[0].serviceList.reduce((a,b)=>{
      //     return a+b.serviceOverAllUsage},0)
      // },
      addonUsage: function(){
        if(this.mainSub.package.serviceList.length>0 ){
          return this.mainSub.package.serviceList.reduce((a,b)=>{
            if(b.type !="addon")
            b.serviceOverAllUsage = 0
            console.log(a , b.serviceOverAllUsage)
              return a+b.serviceOverAllUsage
          },0)
        }else{
          return this.subUsage.package.serviceList.reduce((a,b)=>{
            if(b.type !="addon" && (b.code != "foyr_service_2" || b.code != "foyr_service_3" || b.code != "foyr_service_32" || b.code != "foyr_service_30"))
            b.serviceOverAllUsage = 0
            console.log(a , b.serviceOverAllUsage)
              return a+b.serviceOverAllUsage
          },0)
        }
      },
      addonTotal:function(){
        if(this.mainSub.package.serviceList.length>0){
          let addon = []
          return this.mainSub.package.serviceList.reduce((a,b)=>{
            if(b.type == "addon"){
            if(addon.length ==0)
              addon.push(b)
            else
              addon.forEach(item => {
                if(item.subscription == b.subscription)
                  b.totalCreditsPerCycle = 0
                else
                  addon.push(b)
              })
            }
            if(b.type !="addon")
            b.totalCreditsPerCycle = 0
              return a+b.totalCreditsPerCycle
          },0)
        }else{
          return this.subUsage.package.serviceList.reduce((a,b)=>{
            if(b.type !="addon" && (b.code != "foyr_service_2" || b.code != "foyr_service_3" || b.code != "foyr_service_32" || b.code != "foyr_service_30"))
              b.totalCreditsPerCycle = 0
            return a+b.totalCreditsPerCycle
          },0)
        }
      },
      packageUsage: function(){
        return this.mainSub.package.serviceList.reduce((a,b)=>{
          if(b.type=="addon")
            b.serviceOverAllExceptOverUsage = 0

            return a+b.serviceOverAllExceptOverUsage
        },0)
      },
      customUsage: function(){
        let usage={usage:0,metric:0,total:0};
        this.addonSub.customOne.forEach(element => {
          usage.usage += element.serviceList[0].serviceOverAllExceptOverUsage
          usage.metric += element.serviceList[0].serviceOverAllExceptOverUsageByMetric
          usage.total +=element.totalCreditsPerCycle
        });
        return usage;
      }
    },
    methods: {
        ...mapActions({
            downloadInvoice:"Billing/downloadInvoice",

        }),
        showBilling() {
            amplitude.getInstance().logEvent("billing");
            this.showBills = !this.showBills;
        },
        dateFormat:function(date){
          let newDate = new Date(date);
          let mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
          newDate = newDate.getDate() + " " + mlist[newDate.getMonth()];
          return newDate;
        },
        invoiceDownload(accountId,invoiceId){
          this.downloadInvoice({accountId,invoiceId})
          .then((res)=>{
            // base64 string
            // var base64str = res.data;
            // var binary = atob(base64str.replace(/\s/g, ''));
            // var len = binary.length;
            // var buffer = new ArrayBuffer(len);
            // var view = new Uint8Array(buffer);
            // for (var i = 0; i < len; i++) {
            //     view[i] = binary.charCodeAt(i);
            // }
            // var blob = new Blob( [view], { type: "application/pdf" });
            // var url = URL.createObjectURL(blob);
            amplitude.getInstance().logEvent("invoiceDownload");
            window.open(res);
            });

        },
        closePopup(){
          this.showBills = false;
        }
    },
}
</script>
<style lang="scss" scoped>
.billing-container {
  display: grid;
  grid-template-columns: 65% 30%;
  grid-gap: 3.125rem;
  padding: 1.5625rem 3.125rem;
  .billing-details {
    display: grid;
    grid-template-columns: 50% 50%;
    color: #4d4c4d;
    p {
      color: #4d4c4d;
      font-size: 1rem;
      font-weight: 500;
    }
    span {
      font-weight: 300;
    }
    .change-plan {

      font-weight: 600;
      margin-left: 1.5625rem;
      cursor: pointer;
      a{
          color: #d48e8e;
          text-decoration: none;
      }
    }
  }
  .payment-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5625rem;
    color: #292929;
    font-weight: 500;
    .billing-history {
      color: #d48e8e;
      cursor: pointer;
    }
    .last-payment {
      margin-left: 0.625rem;
    }
    p {
      margin: 0rem;
    }
  }
  .billing-table {
    padding-bottom: 0.9375rem;
    th {
      text-align: left;
      padding-right: 2.1875rem;
      padding-bottom: 0.3125rem;
      color: rgba(0, 0, 0, 0.54);
      font-weight: 500;
      font-size: 0.875rem;
    }
    td {
      text-align: left;
      padding-right: 2.1875rem;
      padding-bottom: 0.3125rem;
      color: rgba(0, 0, 0, 0.87);
      font-weight: 500;
      font-size: 0.875rem;
    }
  }
  .invoice {
    font-size: 0.75rem;
    color: #d48e8e;
  }
}
.empty-container{
  text-align: center;
  p{
    color: rgba(41, 41, 41, 0.54);
    font-size: 0.875rem;
  }
}
.billing-data-container{
  padding-right: 6.25rem;
  .table-head{
    padding: 0.625rem 1.875rem;
    background: #D48E8E;
    color: white;
    display: flex;
    margin-top: 0.625rem;
    position: relative;
    justify-content: space-between;
    div{
      display: flex;
      align-content: center;
      align-items: center;
    }
    p{
      color: white;
      font-size: 0.875rem;
      margin: 0px 1.5625rem;
    }
    .total-credit-info{
      position: absolute;
      background: white;
      padding: 20px 15px;
      top: 25px;
      display: none;
      z-index: 1;
      right: 25px;
      background: #FBF3F1;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      div{
        flex-direction: column;
        &:first-child{
          border-right: 1px solid #FAE8E4;
        }
        &:last-child{
          p{
            &:last-child{
              color: #D48E8E;
              font-size: 1rem;
              font-weight: 500;
            }
          }
        }
      }
      p{
        color:#292929;
        font-style: 0.875rem;
        padding: 0.625rem 2.25rem;
        width: 100%;
        margin: 0px;
        font-weight: 500;
        border-bottom:1px solid #FAE8E4;
        &:first-child{
          color: rgba(41, 41, 41, 0.38);
          font-weight: 300;
          font-size: 0.75rem;
        }
        &:last-child{
          border: none;
        }
      }
    }
  }
  table{
    width: 100%;
    tr{
      width: 100%;
    }
    th{
      text-align: left;
      padding: 1.375rem 0.6875rem;
      color: rgba(41, 41, 41,1);
      font-weight: 300;
      width: 25%;
      &:first-child{
        width: 50%;
      }
    }

    td{
      text-align: left;
      padding: 0.625rem 0.6875rem;
      color: #292929;
      width: 25%;
      &:first-child{
        width: 50%;
      }
    }
  }
}
.info-credits img:hover ~ .total-credit-info{
    display: flex;
  }
.right-side-billing{

  .current-sub{
    width: max-content;
    background-image: url('~assets/images/lastbilling.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 100%;
    .current-sub-head{
      color: #292929;
      font-size: 1rem;
      text-align: center;
      font-weight: 500;
      padding:3.125rem 0px;
      margin-bottom: 0px;
    }
    .under-line{

    }
    .basic-details{
      display: grid;
      grid-template-columns: max-content max-content;
      grid-column-gap: 1.875rem;
      grid-row-gap: 1.75rem;
      margin-bottom: 1.5625rem;
      padding-left: 2.875rem;
      margin: 0px auto;
      justify-content: center;
      span{
        color: rgba(41, 41, 41, 0.54);
        font-size: 0.75rem;

      }
      p{
        font-size: 0.875rem;
        color: #292929;
        width: 8rem;
      }
      .get-invoice{
        font-weight: 500;
        font-size: 14px;
        line-height: normal;
        cursor: pointer;
        color: #D48E8E;
      }
    }
    .view-billing-history{
      text-align: center;

      button{
        padding: 0.75rem 0.875rem;
        border: 1px solid #E9BEB3;
        color: #4D4C4D;
        font-weight: 500;
        cursor: pointer;
        font-size: 0.8125rem;
      }
      padding-bottom: 3.4375rem;
      margin-left: 1.875rem;
      margin-top: 1.5625rem;
    }
  }
}
.no-data-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc( 50vh - 250px );
  p{
    margin-top: 2rem;
  }
}
</style>


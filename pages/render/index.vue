<template>
    <section v-if="render">
        <div class="search-container">
            <div>
                <select v-model="selectedProject">
                    <option value="undefined" selected>Filter by project</option>
                    <option :value="project._id" v-for="project in usersProjects">{{project.name}}</option>
                </select>
                <img src="~assets/images/arrowDown.svg" alt="">
            </div>
        </div>
        <div class="render" v-if="render.length>0 && usersProjects && filterProjects(usersProjects,selectedProject)">
            <!-- <p style="font-style: italic;">Download feature comming soon</p> -->
            <div v-if="project.render.length>0" v-for="project in filterProjects(usersProjects,selectedProject)">
              <p class="project-name">{{project.name}}</p>
                <div class="cards">

                  <div v-if="ren.status === 'COMPLETED' || ren.status === 'WAITING' || ren.status === 'NEO_WINDOWS_RENDER'" class="card"  v-for="(ren, index) in project.render">
                      <div v-if="ren.status === 'COMPLETED'" class="img-container" @click="downloadRender(ren)">
                        <img :src="ren.thumbnail" alt="">
                        <div class="img-overlay">
                            <svg v-if="downloading !== ren._id" width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.8 7.3L11.9 11.9C11.7 12.1 11.3 12.1 11.1 11.9L6.20001 7.3" stroke="#D1D1D1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M11.5 11.9V0.800003" stroke="#D1D1D1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M1.39999 10.6V15.9H20.4V10.6" stroke="#D1D1D1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg v-if="downloading === ren._id" class="lds-spinner" width="50px"  height="50px"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;"><g transform="rotate(0 50 50)">
                              <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                              </rect>
                              </g><g transform="rotate(30 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(60 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(90 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(120 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(150 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(180 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(210 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(240 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(270 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(300 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                                </rect>
                              </g><g transform="rotate(330 50 50)">
                                <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#d8dddf">
                                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                                </rect>
                              </g>
                            </svg>
                        </div>
                      </div>
                      <div v-if="ren.status === 'WAITING' || ren.status === 'NEO_WINDOWS_RENDER'">
                        <img src="~assets/images/defaultRender.png" alt="">
                      </div>
                      <p id="downloading_render">{{project.name}}_view_{{index+1}}</p>
                  </div>

                  <!-- <div >
                    <p>no render taken for this project</p>
                  </div> -->
                </div>
            </div>
        </div>
        <div v-else class="no-data-container">
            <svg
          width="250"
          height="215"
          viewBox="0 0 250 215"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M196.122 64.5489C195.931 64.5489 195.74 64.3575 195.548 64.3575H102.946C87.449 64.3575 74.8214 76.9851 74.8214 92.4825V183.363H41.148C40.574 183.363 40 183.937 40 184.511V186.998C40 202.113 52.2449 214.358 67.3597 214.358H147.143H147.334C150.204 214.358 167.615 213.21 173.355 193.694V193.503L173.929 190.25V190.059V97.0744H210.855C211.429 97.0744 212.003 96.5004 212.003 95.9264V81.3856C212.194 72.3933 205.115 64.9315 196.122 64.5489ZM67.3597 212.062C53.5842 212.062 42.2959 200.773 42.2959 186.998V185.659H112.895V186.615C113.087 191.781 115.383 206.513 132.602 212.062H67.3597ZM171.824 189.868L171.441 193.12C165.702 212.253 147.908 212.062 147.143 212.062H146.952C118.444 211.488 115.383 192.355 115 186.424V184.511C115 183.937 114.426 183.363 113.852 183.363H77.1173V92.4825C77.1173 78.3244 88.7883 66.6535 102.946 66.6535H187.13C172.589 72.7759 171.824 89.4213 171.824 89.804V189.868ZM209.898 94.7785H174.12V89.804C174.12 89.0387 175.268 68.9494 195.74 66.8448C195.74 66.8448 195.74 66.8448 195.931 66.8448C203.776 67.0361 210.089 73.5412 210.089 81.3856V94.7785H209.898Z"
            fill="#ECD8D3"
          ></path>
          <path
            d="M149.248 93.8219H98.7373C98.1633 93.8219 97.5894 94.3959 97.5894 94.9699V114.294C97.5894 114.868 98.1633 115.442 98.7373 115.442H149.248C149.821 115.442 150.395 114.868 150.395 114.294V94.9699C150.395 94.2045 150.013 93.8219 149.248 93.8219ZM148.291 113.146H99.8853V96.1178H148.291V113.146Z"
            fill="#ECD8D3"
          ></path>
          <path
            d="M149.248 135.531H98.7373C98.1633 135.531 97.5894 136.105 97.5894 136.679C97.5894 137.253 98.1633 137.827 98.7373 137.827H149.248C149.821 137.827 150.395 137.253 150.395 136.679C150.395 136.105 150.013 135.531 149.248 135.531Z"
            fill="#ECD8D3"
          ></path>
          <path
            d="M149.248 160.403H98.7373C98.1633 160.403 97.5894 160.977 97.5894 161.551C97.5894 162.125 98.1633 162.699 98.7373 162.699H149.248C149.821 162.699 150.395 162.125 150.395 161.551C150.395 160.977 150.013 160.403 149.248 160.403Z"
            fill="#ECD8D3"
          ></path>
          <path
            d="M14.5766 158.548L15.1657 158.444L14.88 156.824L14.291 156.928L14.5766 158.548ZM12.5826 158.262L13.1717 158.158L12.886 156.538L12.297 156.642L12.5826 158.262ZM28.7608 153.739L28.1717 153.843L28.4574 155.463L29.0464 155.359L28.7608 153.739ZM26.9953 154.749L26.4062 154.853L26.6919 156.473L27.2809 156.369L26.9953 154.749ZM17.4992 158.762L18.0883 158.658L17.8026 157.038L17.2136 157.142L17.4992 158.762ZM24.5766 155.843L23.9876 155.947L24.2732 157.567L24.8623 157.463L24.5766 155.843ZM20.8048 158.391L21.3938 158.287L21.1082 156.668L20.5191 156.771L20.8048 158.391ZM18.8076 143.62L18.2185 143.724L18.904 147.612L19.4931 147.508L18.8076 143.62ZM12.8923 148.824L11.264 147.684L10.9243 148.169L12.5527 149.309L12.8923 148.824ZM27.1525 145.307L26.6675 144.967L25.5273 146.596L26.0123 146.935L27.1525 145.307ZM29.6377 151.307C29.2898 149.334 24.2189 149.165 19.595 149.98C14.971 150.795 10.2931 152.683 10.6411 154.657C10.6514 154.715 10.6566 154.745 10.667 154.804L11.2487 158.102C11.5966 160.076 16.6674 160.244 21.2914 159.429C25.9154 158.614 30.5881 156.697 30.2453 154.753L29.6585 151.425C29.6533 151.395 29.6429 151.336 29.6377 151.307ZM29.6563 154.857C29.8588 156.005 26.4301 157.916 21.1581 158.845C15.8862 159.775 12.0402 159.147 11.8377 157.999L11.4222 155.642C13.0835 156.625 17.0318 156.627 20.6838 155.983C24.3359 155.339 28.0452 153.987 29.2703 152.495L29.6857 154.851L29.6563 154.857ZM20.58 155.394C15.3375 156.319 11.4326 155.701 11.2301 154.553C11.0276 153.404 14.4563 151.494 19.7283 150.564C25.0002 149.634 28.8756 150.257 29.0781 151.406C29.2807 152.554 25.8224 154.47 20.58 155.394Z"
            fill="#ECD8D3"
          ></path>
          <path
            d="M133.791 14.9555L134.353 15.1601L134.915 13.6144L134.353 13.4098L133.791 14.9555ZM132.207 13.7107L132.769 13.9153L133.332 12.3696L132.77 12.165L132.207 13.7107ZM148.479 17.8828L147.917 17.6783L147.354 19.2239L147.917 19.4285L148.479 17.8828ZM146.445 17.8746L145.883 17.67L145.321 19.2157L145.883 19.4202L146.445 17.8746ZM136.215 16.6017L136.777 16.8062L137.34 15.2606L136.778 15.056L136.215 16.6017ZM143.803 17.6132L143.241 17.4086L142.679 18.9543L143.241 19.1588L143.803 17.6132ZM139.263 17.9338L139.825 18.1383L140.388 16.5927L139.825 16.3881L139.263 17.9338ZM144.919 4.14308L144.357 3.9385L143.007 7.64809L143.569 7.85267L144.919 4.14308ZM137.194 5.69174L136.354 3.89015L135.818 4.14039L136.658 5.94198L137.194 5.69174ZM151.302 9.77637L151.052 9.23973L149.251 10.0798L149.501 10.6165L151.302 9.77637ZM150.455 16.2149C151.14 14.332 146.833 11.6505 142.421 10.0446C138.009 8.4387 133.014 7.73457 132.328 9.61747C132.308 9.67368 132.298 9.70178 132.277 9.75799L131.132 12.9055C130.446 14.7884 134.753 17.47 139.165 19.0759C143.578 20.6818 148.583 21.3578 149.258 19.503L150.414 16.3274C150.424 16.2993 150.444 16.243 150.455 16.2149ZM148.696 19.2984C148.297 20.3944 144.372 20.3345 139.342 18.5036C134.312 16.6727 131.295 14.2061 131.694 13.1101L132.512 10.8619C133.459 12.5434 136.877 14.5195 140.362 15.7878C143.847 17.0562 147.736 17.7395 149.542 17.0604L148.724 19.3086L148.696 19.2984ZM140.567 15.2258C135.564 13.4051 132.491 10.9181 132.89 9.82205C133.289 8.72603 137.214 8.78595 142.244 10.6169C147.275 12.4478 150.32 14.9246 149.921 16.0206C149.522 17.1166 145.569 17.0465 140.567 15.2258Z"
            fill="#ECD8D3"
          ></path>
          <path
            d="M235.252 71.2415L235.761 71.0045L235.109 69.6069L234.601 69.8439L235.252 71.2415ZM233.377 71.4662L233.886 71.2292L233.234 69.8317L232.726 70.0686L233.377 71.4662ZM246.93 63.445L246.422 63.682L247.074 65.0795L247.582 64.8426L246.93 63.445ZM245.576 64.7878L245.068 65.0247L245.72 66.4223L246.228 66.1853L245.576 64.7878ZM237.951 70.7257L238.459 70.4887L237.807 69.0911L237.299 69.3281L237.951 70.7257ZM243.652 66.3658L243.144 66.6028L243.795 68.0004L244.303 67.7634L243.652 66.3658ZM240.854 69.5883L241.363 69.3513L240.711 67.9537L240.203 68.1907L240.854 69.5883ZM235.462 56.6969L234.953 56.9339L236.518 60.2881L237.026 60.0511L235.462 56.6969ZM231.368 62.8442L229.616 62.2068L229.427 62.7284L231.178 63.3658L231.368 62.8442ZM243.428 56.1996L242.906 56.0097L242.269 57.7609L242.79 57.9508L243.428 56.1996ZM247.134 61.0297C246.34 59.3272 241.707 60.4048 237.718 62.2651C233.728 64.1254 229.95 66.9699 230.744 68.6724C230.768 68.7232 230.78 68.7486 230.804 68.7994L232.131 71.6454C232.925 73.3479 237.557 72.2703 241.547 70.41C245.536 68.5497 249.302 65.6798 248.52 64.0027L247.181 61.1313C247.17 61.1059 247.146 61.0551 247.134 61.0297ZM248.012 64.2397C248.474 65.2307 245.833 67.7926 241.284 69.9136C236.736 72.0346 233.101 72.3994 232.639 71.4084L231.691 69.3756C233.434 69.8622 237.01 68.9063 240.161 67.437C243.311 65.9677 246.342 63.8429 247.09 62.195L248.038 64.2278L248.012 64.2397ZM239.924 66.9288C235.4 69.0379 231.715 69.4264 231.253 68.4354C230.79 67.4444 233.432 64.8824 237.98 62.7614C242.529 60.6404 246.189 60.2638 246.651 61.2548C247.113 62.2458 244.447 64.8196 239.924 66.9288Z"
            fill="#ECD8D3"
          ></path>
          <path
            d="M2.77563 13.1038L3.09284 13.421L3.96515 12.5487L3.64795 12.2315L2.77563 13.1038ZM2.09364 11.7556L2.41084 12.0729L3.28316 11.2005L2.96595 10.8833L2.09364 11.7556ZM11.8319 19.7493L11.5147 19.432L10.6424 20.3044L10.9596 20.6216L11.8319 19.7493ZM10.452 19.099L10.1348 18.7818L9.26251 19.6541L9.57972 19.9713L10.452 19.099ZM3.90171 14.9912L4.21892 15.3084L5.09124 14.436L4.77403 14.1188L3.90171 14.9912ZM8.73912 18.0839L8.42191 17.7667L7.54959 18.639L7.8668 18.9562L8.73912 18.0839ZM5.55119 16.8627L5.8684 17.1799L6.74071 16.3076L6.42351 15.9904L5.55119 16.8627ZM13.7668 9.28143L13.4496 8.96423L11.3561 11.0578L11.6733 11.375L13.7668 9.28143ZM8.0254 7.88572L8.0254 6.39485L7.58131 6.39485L7.58131 7.88572L8.0254 7.88572ZM16.3204 15.1339L16.3204 14.6898L14.8295 14.6898L14.8295 15.1339L16.3204 15.1339ZM13.7034 19.2417C14.766 18.1791 12.6883 14.9912 10.1983 12.5011C7.7082 10.011 4.53613 7.94916 3.47348 9.01181C3.44176 9.04353 3.4259 9.05939 3.39418 9.09111L1.61782 10.8675C0.555182 11.9301 2.63289 15.118 5.12296 17.6081C7.61303 20.0982 10.801 22.1442 11.8477 21.0974L13.64 19.3052C13.6558 19.2893 13.6875 19.2576 13.7034 19.2417ZM11.5305 20.7802C10.912 21.3987 8.26331 20.114 5.42431 17.275C2.58531 14.436 1.31648 11.8032 1.93503 11.1847L3.20386 9.91585C3.31488 11.3591 5.01194 13.7858 6.97862 15.7525C8.9453 17.7191 11.3719 19.4162 12.8152 19.5272L11.5464 20.796L11.5305 20.7802ZM7.29583 15.4352C4.47269 12.6121 3.17214 9.94757 3.79069 9.32901C4.40924 8.71046 7.05792 9.99515 9.89692 12.8341C12.7359 15.6731 14.0206 18.3218 13.4021 18.9404C12.7835 19.5589 10.119 18.2584 7.29583 15.4352Z"
            fill="#ECD8D3"
          ></path>
          <path
            d="M209.784 207.627L210.346 207.422L209.783 205.877L209.221 206.081L209.784 207.627ZM207.77 207.691L208.332 207.487L207.77 205.941L207.208 206.146L207.77 207.691ZM222.917 200.428L222.355 200.633L222.918 202.178L223.48 201.974L222.917 200.428ZM221.354 201.729L220.792 201.934L221.355 203.479L221.917 203.275L221.354 201.729ZM212.699 207.33L213.261 207.125L212.699 205.58L212.136 205.784L212.699 207.33ZM219.162 203.227L218.6 203.432L219.163 204.977L219.725 204.773L219.162 203.227ZM215.89 206.391L216.452 206.187L215.89 204.641L215.328 204.845L215.89 206.391ZM211.358 192.191L210.796 192.396L212.146 196.105L212.708 195.901L211.358 192.191ZM206.436 198.343L204.635 197.503L204.385 198.039L206.186 198.879L206.436 198.343ZM219.869 192.403L219.333 192.153L218.493 193.955L219.029 194.205L219.869 192.403ZM223.359 197.88C222.673 195.998 217.65 196.712 213.238 198.318C208.826 199.924 204.547 202.595 205.232 204.478C205.253 204.534 205.263 204.562 205.283 204.618L206.429 207.766C207.114 209.649 212.137 208.935 216.55 207.329C220.962 205.723 225.23 203.023 224.555 201.169L223.4 197.993C223.389 197.965 223.369 197.909 223.359 197.88ZM223.993 201.373C224.392 202.469 221.347 204.946 216.317 206.777C211.286 208.608 207.39 208.657 206.991 207.561L206.173 205.313C207.979 205.992 211.868 205.309 215.353 204.041C218.838 202.772 222.256 200.796 223.203 199.115L224.021 201.363L223.993 201.373ZM215.148 203.479C210.146 205.299 206.193 205.369 205.794 204.273C205.395 203.177 208.44 200.701 213.471 198.87C218.501 197.039 222.426 196.979 222.825 198.075C223.224 199.171 220.151 201.658 215.148 203.479Z"
            fill="#ECD8D3"
          ></path>
          <rect
            x="216.575"
            y="121.953"
            width="3"
            height="23"
            rx="1.5"
            transform="rotate(12.7521 216.575 121.953)"
            fill="#ECD8D3"
          ></rect>
          <rect
            x="225.077"
            y="116"
            width="3"
            height="23"
            rx="1.5"
            transform="rotate(12.7521 225.077 116)"
            fill="#ECD8D3"
          ></rect>
          <rect
            x="52.0767"
            y="46.9525"
            width="3"
            height="23"
            rx="1.5"
            transform="rotate(12.7521 52.0767 46.9525)"
            fill="#ECD8D3"
          ></rect>
          <rect
            x="60.5781"
            y="41"
            width="3"
            height="23"
            rx="1.5"
            transform="rotate(12.7521 60.5781 41)"
            fill="#ECD8D3"
          ></rect>
        </svg>
            <p>you have not taken any renders yet</p>
      </div>
      <thankyouComponent/>
    </section>

    <div v-else class="main-loading">
        <div class="loading-container">
            <p>Loading...</p>
            <div class="loader"></div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import thankyouComponent from '@/components/shared/popups/thankyou';
export default {
  layout: "dashboard",
    middleware: ["initAuth", "authReq"],
    components: {
      thankyouComponent
    },
    head() {
      return {
      title: "Neo - Renders"
      };
    },
    data(){
        return{
            selectedProject:"undefined",
            downloading: undefined,

        }
    },
    mounted() {
        setTimeout(() => {
          // amplitude.getInstance().logEvent("render");
        }, 1000);
        if(!this.usersProjects)
        this.fetchProjects();
        if(!this.render)
            this.fetchRender();
        //window.zcAction('renders')
           if (window.analytics) {
             window.analytics.track('render', {
                     title: 'Render Page',
                     subtitle: 'open'
                   },{'integrations': { "Amplitude": { "session_id": new Date().getTime() } } },{  "timestamp": new Date().getTime() });
           }
    },
    computed: {
        ...mapState({
            usersProjects: state => state.Projects.usersProjects,
            render:state => state.Render.render,
            download:state => state.Render.download
        }),
        ...mapGetters({
          filterProjects:'Render/filterProjects',
          filterDownload:'Render/filterDownload'
        })
    },
    methods:{
        ...mapActions({
            fetchProjects:'Projects/fetchProjects',
            fetchRender:'Render/fetchRender',
            socketEmit: "Sockets/emit",
            downloadRenderAPi: 'Render/downloadRender'
        }),
        downloadRender(camera){
          if(!this.filterDownload(camera._id)){
            this.downloading = camera._id
            this.downloadRenderAPi({uri:camera.output["1"][0]}).then(res =>{
              var link = document.createElement('a');
              link.href = res.url;
              link.download = 'render.jpg';
              document.body.appendChild(link);
              link.click();
              this.downloading = undefined;
              document.body.removeChild(link);
              // amplitude.getInstance().logEvent("renderDownload",{renderId:this.downloading});
            })

          }

        }
    }
}
</script>
<style lang="scss" scoped>
.main-loading{
    height: calc( 100vh - 3.75rem )
}
.search-container{
    background: $color-second;
    background-image: url('~assets/images/bgIns.png');
    display: grid;
    grid-template-columns: max-content max-content;
    justify-content: center;
    align-items: center;
    padding: 4.1875rem 0rem;
    select{
        background: $color-white;
        color: #c4c4c4;
        width: 50vw;
        @include respond(s-phone) {
      // width < 480px?
      width: 50vw;
    }
    }
    img{
        position: absolute;
        right: 1.25rem;
        top: 1rem;
    }
    div{
        position: relative;
    }
    .search-icon{
        cursor:pointer;
    }
}
.render{
    padding: 1.5625rem 2.1rem;
    display: grid;
    grid-row-gap: 1.25rem;
    .project-name{
      font-size: 1.2rem;
    }
    .cards{
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(14rem,1fr));
        grid-gap: 1.125rem 1.5rem;
        .card{
            background: white;
            .img-container{
              width: 100%;
              height: 10.4375rem;
              position: relative;
              cursor: pointer;
              &:hover .img-overlay{
                height: 100%;
              }
            }
            img{
                width: 100%;
                height: 10.4375rem;
                object-fit: cover;

            }
            p{
              width: 100%;
              text-overflow: ellipsis;
              word-wrap: break-word;
              margin: 0px;
              padding: 0.5rem 1rem;
            }
            .img-overlay{
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: rgba(86, 86, 86, 0.7);
              overflow: hidden;
              width: 100%;
              height: 0;
              transition: .5s ease;
              svg {
                color: white;
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                text-align: center;
              }
            }

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

<template>
  <section v-if="inspirations" @scroll="onProductsScroll($event)">
    <fullScreenLoader v-show="showLoader"></fullScreenLoader>
    <demoTourTypeForm />
    <div class="search-container">
      <div class="search-wrapper">
        <input autocomplete="off" type="text" placeholder="Look for Projects and Designs" v-model="searchText" @input="onsearch" />
        <div class="search-icon">
          <img src="~assets/images/share2.svg" alt />
        </div>
      </div>
      <div v-if="isUserAPDesigner" class="inspiration-type-drop-down">
        <div class="filter-dropdown" @click.stop>
          <span @click="isFilterDropdown = !isFilterDropdown">
            <p>{{dropdownFilterValue === 'asianPaints' ? 'Asian Paints': 'Foyr'}}</p>
            <svg v-if="!isFilterDropdown" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="black" stroke-linejoin="round"/>
            </svg>
            <svg v-if="isFilterDropdown" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5L5 1L9 5" stroke="black" stroke-linejoin="round"/>
            </svg>
          </span>
          <ul v-if="isFilterDropdown">
              <li @click="dropdownSelected('asianPaints')">Asian Paints</li>
              <li @click="dropdownSelected('foyr')">Foyr</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="product-container">
      <h2 class="inspiration-head">{{$t("inspiration.inspirations")}}</h2>
      <div class="filters-container" style="display:none">
        <div>
          <img src="~assets/images/filter.svg" alt />
          <p>{{ $t("buttonText.filters") }}</p>
        </div>
        <div>
          <p>{{$t("buttonText.room")}}</p>
          <img src="~assets/images/arrowDown.svg" alt />
        </div>
        <div>
          <p>{{$t("buttonText.category")}}</p>
          <img src="~assets/images/arrowDown.svg" alt />
        </div>
      </div>
      <div class="pills-container" style="display:none">
        <div class="pills">
          <p>{{$t("buttonText.modern")}}</p>
        </div>
        <div class="pills">
          <p>{{$t("buttonText.modern")}}</p>
        </div>
        <div class="pills">
          <p>{{$t("buttonText.modern")}}</p>
        </div>
      </div>
      <div v-if="!isUserAPDesigner" class="results-count">
        <p>{{filterByText(searchText) ? filterByText(searchText).length :'0'}} {{$t("infoText.results")}}</p>
      </div>
      <div v-if="isUserAPDesigner" class="ap-filters-and-shortlist-actions-wrapper">
        <div class="filters-wrapper">
          <img v-show="showAPInspirations" src="~assets/images/filter.svg" alt />
          <MultiselectDropDown
            v-show="showAPInspirations"
            v-for="(key, index) in Object.keys(apInspirationsCategories)"
            :key="'multiselect' + apInspirationsCategories[key].formName + index"
            :ref="'multiselect' + apInspirationsCategories[key].formName + index"
            :placeholder="capitalizeFirstLetter(apInspirationsCategories[key].name)"
            :selected="selectedAPInspirationFilters[apInspirationsCategories[key].formName]"
            :list="getFilterChildren(apInspirationsCategories[key])"
            :clickable="true"
            @listElementClick="onAPFilterDropdownChange($event, apInspirationsCategories[key].formName)"
            @close="onFilterDropdownClose"
          >
            <template>
              <!-- ="{ closeDropdown }" -->
              <div class="dropdown-action-button-wrapper">
                <div class="clear-all-button" @click="onMultiselectClearAllClick(apInspirationsCategories[key].formName)">
                  {{$t("buttonText.clearAll")}}
                </div>
                <div @click="handleGetResultsClick('multiselect' + apInspirationsCategories[key].formName + index)" class="get-results-button">
                   {{$t("buttonText.getResults")}}
                </div>
                <!-- @click="closeDropdown()" -->
              </div>
            </template>
          </MultiselectDropDown>
          <div class="inspiration-count">
            {{filterByText(searchText) ? filterByText(searchText).length :'0'}} {{$t("infoText.results")}}
          </div>
        </div>

        <div class="shortlist-and-sort-by-wrapper">
          <div class="shortlist-inspiration-button" :class="{'disabled': inspirationsToShortlisted.length == 0}"  @click.stop="openShowProjectsPopup">
            {{$t("buttonText.shortlist")}} {{$t("inspiration.inspirations")}}
          </div>
          <MultiselectDropDown
            v-show="showAPInspirations"
            id="multiselectsortoptions"
            ref="multiselectsortoptions"
            placeholder="Sort By"
            :selected="selectedSortOption"
            :list="sortOptionsList"
            :clickable="true"
            :hideSelectAll="true"
            @listElementClick="onSortTypeItemClick"
            @close="onFilterDropdownClose"
          >
            <template slot="listItem" slot-scope="slotProps">
              <div :class="{ 'disable-click': selectedSortOption == slotProps.item.value }">
                <Checkbox
                    size="medium"
                    :id="slotProps.item.value"
                    :label="slotProps.item.text"
                    labelColor="#000"
                    :value="slotProps.item.value"
                    :model="selectedSortOption"
                    :checkedValue="selectedSortOption"
                    @onCheckboxChange="onSortTypeItemClick"
                  />
              </div>
            </template>
          </MultiselectDropDown>
        </div>
      </div>
      <div class="product-catalog">
        <div class="cards">
          <nuxt-link
            v-if="inspiration.widgetData"
            :to="'/inspiration/'+inspiration._id"
            class="card2"
            v-for="(inspiration, i) in filterByText(searchText)"
            :key="i"
            :target="isUserAPDesigner ? '_blank': '_self'"
          >
            <img
              class="card-image"
              :src="inspiration.widgetData && inspiration.widgetData.optimizedImages?inspiration.widgetData.optimizedImages[0]:(inspiration.widgetData.images && inspiration.widgetData.images.length>0?inspiration.widgetData.images[0]:'/images/default.png')"
              alt
            />
            <div v-if="inspiration.customerBrand == 'AP'" class="ap-logo-container image-wrapper">
                <img src="../../assets/images/asian-paints-logo.png" alt="">
            </div>
            <div class="card-text">
              <div class="left-content">
                <p>{{inspiration.widgetData.name}}</p>
                <span>By {{ inspiration.customerBrand == 'AP' ? 'Asian Paints' : 'Foyr' }}</span>
              </div>
              <div class="right-content">
                <img
                  v-if="inspiration.edit"
                  src="~assets/images/edit.svg"
                  @click=" $event.preventDefault(); openProject(inspiration._id)"
                  alt
                />
                <Checkbox
                  v-if="isUserAPDesigner"
                  size="medium"
                  :id="inspiration.inspirationProductId"
                  label=""
                  labelColor="#000"
                  :value="inspiration.inspirationProductId"
                  :model="inspirationsToShortlisted"
							    :checkedValue="inspirationsToShortlisted"
                  @onCheckboxChange="onCheckboxValueChange"
                />
              </div>
            </div>
          <thankyouComponent/>
          <div v-if="inspirationsToShortlisted.includes(inspiration.inspirationProductId)" class="card-overlay"></div>
          </nuxt-link>
        </div>
      </div>
      <ScrollObserver  v-if="filterByText(searchText).length >= pageSize" v-on:scrolledToEnd="loadMoreData" />
    </div>
    <div class="popup-div" :class="showProjectsPopup?'showPopUp':''">
      <div class="popup-container inspiration-shortlist-container">
        <div class="close-popup" @click.stop="closeShowProjectsPopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z" fill="white"/>
          </svg>
        </div>
        <div class="popup-content">
          <div class="popup-head">
            <h2>{{ $t("suggestionText.chooseProjectsFromList")}}</h2>
          </div>
          <div class="search-wrapper">
            <input autocomplete="off" type="text" placeholder="Search Projects" v-model="searchProjectQueryText" />
          </div>
          <div class="popup-details user-projects">
            <div v-if="usersProjects" >
              <div v-for="project in filteredUserProjects" :key="project._id">
                <div class="projects-check" v-if="project && project.name">
                  <p @click="onProjectCheckboxValueChange(project._id)">{{project.name}}</p>
                    <Checkbox
                      size="large"
                      :id="project._id"
                      label=""
                      labelColor="#000"
                      :value="project._id"
                      :model="projectsToShortlistInspirations"
							        :checkedValue="projectsToShortlistInspirations"
                      @onCheckboxChange="onProjectCheckboxValueChange"
                    />   
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="address-button-container">
          <!-- <button @click="cancelContainer('project')" class="cancel-button">Cancel</button> -->
          <!-- commentted cuz cancel container wasn't defined  -->
          <button @click="closeShowProjectsPopup" class="cancel-button">{{$t("buttonText.cancel")}}</button>
          <button @click="addToSub()" :disabled="projectsToShortlistInspirations.length == 0" class="update-address">{{$t("buttonText.done")}}</button>
        </div>
        <div class="popup-or-divider">
          <div class="divider-center-line"></div>
          <div class="divider-center-text">{{$t("suggestionText.or")}}</div>
          <div class="divider-center-line"></div>
        </div>
        <div class="popup-add-new-project-button" @click.stop="openAddNewProjectPopup">
          {{$t("buttonText.addToNewProject")}}
        </div>
      </div>
    </div>

    <div class="popup-div new-project-popup" :class="newProject?'showPopUp':''" @click="closeAddNewProjectPopup">
      <div class="popup-container" @click.stop>
        <div class="close-popup" @click="closeAddNewProjectPopup">
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
          <h2 class="creat-project-title">{{ $t("suggestionText.nameTheProject") }}</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <div>
              <input
                class="creat-project-input"
                autocomplete="off"
                type="text"
                placeholder="Project Name"
                v-model="projectName"
                @keyup.enter="addNewProject"
              />
              <span
                :class="message.error?'error-message':'success-message'"
                v-if="message.value"
              >{{message.value}}</span>
            </div>
          </div>
          <div class="invite-button-container">
            <button @click="closeAddNewProjectPopup" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button @click="addNewProject" :disabled="!projectName" class="update-address">{{ $t("buttonText.startNow") }}</button>
          </div>
        </div>
      </div>
    </div>

    <MessageComponent :changeRight="message" />
  </section>
  <div v-else class="main-loading">
    <div class="loading-container">
      <p>{{ $t("infoText.loading") }}</p>
      <div class="loader"></div>
    </div>
  </div>
</template>
<script src="./index.js">
</script>
<style lang="scss" scoped>
.main-loading {
  height: calc(100vh - 3.75rem);
}
.search-container {
  background: $color-second;
  background-image: url("~assets/images/bgIns.png");
  padding: 4.1875rem 0rem;
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: center;
  align-items: center;

  .search-wrapper {
    margin-right: 1rem;
    display: grid;
    grid-template-columns: max-content max-content;
    justify-content: center;
    align-items: center;
    input {
      background: $color-white;
      color: black;
      width: 25vw;
      @include respond(s-phone) {
        // width < 480px?
        width: 50vw;
      }
    }
    div {
      padding: 0.625rem 1.25rem;
      background: black;
      display: grid;
      align-items: center;
    }
    .search-icon {
      cursor: pointer;
    }
  }

  .filter-dropdown {
    span {
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr max-content;
      align-items: center;
      column-gap: 1rem;
      width: 13.5rem;
      padding: 0.6rem 1rem;
      p {
        margin:0;
        font-size: 0.9rem;
        font-weight: 500;
        color: #3A393A;
      }
    }
    background: #FFFFFF;
    border: 1px solid #E9BEB3;
    justify-self: end;
    position: relative;
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
        font-weight: 500;
        font-size: 0.9rem;
        line-height: 1rem;
        color: #222021;
        &:hover {
          background: #F7E3DF;
        }
      }
    }
  }
}
.filters-container {
  display: flex;
  display: -webkit-flex;
  margin-bottom: 1.5rem;
  div {
    display: flex;
    display: -webkit-flex;
    margin-right: 1.5625rem;
    p {
      margin: 0rem;
      margin-right: 0.5rem;
    }
  }
}
.pills-container {
  display: flex;
  display: -webkit-flex;
  margin-bottom: 0.875rem;
  .pills {
    border: 0.0625rem solid #c4c4c4;
    border-radius: 2.5rem;
    background: white;
    margin-right: 1rem;
    p {
      margin-bottom: 0rem;
      width: max-content;
      padding: 0.3125rem 0.625rem;
    }
  }
}
.results-count {
  color: #d48e8e;
  p {
    font-size: 0.625rem;
    text-align: left;
    font-style: italic;
    text-decoration-line: underline;
  }
}

.ap-filters-and-shortlist-actions-wrapper {
  .filters-wrapper{
    .inspiration-count {
      font-weight: 500;
      font-size: .5rem * 1.22;
      line-height: .625rem * 1.22;
      color: $banner-heading-color;
      margin-right: .625rem * 1.22;
      margin-bottom: 1rem * 1.22;
    }
  }

  .shortlist-inspiration-button {
    margin-bottom: 0.6rem;
    align-self: flex-start;
    flex-shrink: 0;
    cursor: pointer;
    padding: .4375rem * 1.22 3.25rem * 1.22;
    font-weight: 500;
    font-size: .625rem * 1.22;
    line-height: .875rem * 1.22;
    letter-spacing: 0.2px;
    color: $banner-heading-color;
    border: 1px solid $banner-heading-color;
    margin-left: auto;

    &:hover {
      background-color: $background-7;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
.product-container {
  padding: 1.5625rem 2.1rem;
  background: #fbf3f1;
  @include respond(s-phone) {
    // width < 900px?
    padding: 1.5rem;
  }
  .inspiration-head {
    font-size: 1.5rem;
    color: #343334;
    font-weight: 300;
    margin-bottom: 1.875rem;
  }
  p {
    margin-bottom: 0.625rem;
    span {
      float: right;
      margin-right: 0.9375rem;
      font-size: 0.75rem;
      color: $color-head;
    }
  }
  .product-catalog {
    padding-bottom: 1.875rem;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    @include respond(phone) {
      // width < 900px?
      grid-template-columns: 1fr 1fr;
    }
    @include respond(s-phone) {
      // width < 480px?
      grid-template-columns: 1fr;
    }
    grid-gap: 1rem;
    
    a {
      position: relative;
    }

    .card {
      display: grid;
      text-decoration: none;
      width: 13.75rem;
      height: 13.75rem;
      img {
        height: 100%;
        width: 100%;
      }

    }
    .card2 {
      display: grid;
      text-decoration: none;
      flex-basis: 24%;
      background: white;

      .ap-logo-container {
        position: absolute;
        top: .75rem;
        right: .75rem;
        height: 1.75rem;
        width: 1.75rem;
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

      .card-image {
        width: 100%;
        height: 12.375rem;
        object-fit: cover;
      }
      &:hover {
        box-shadow: 0rem 0.625rem 1.5625rem rgba(34, 32, 33, 0.25);
      }
    }
    .card-text {
      background: #ffffff;
      display: grid;
      /* justify-content: space-between; */
      /* align-items: center; */
      overflow: hidden;
      padding: 0.625rem;
      grid-template-columns: 1fr max-content;
      p {
        margin: 0rem;
      }
      .left-content {
        overflow: hidden;
        p {
          font-size: 0.8125rem;
          color: #4d4c4d;
        }
        span {
          font-size: 0.75rem;
          color: #868686;
        }
      }
      .right-content {
        align-self: center;
        p {
          padding-right: 0.625rem;
          margin-left: 1rem;
        }
      }
    }

    .card-overlay {
      pointer-events: none;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgba(77, 77, 77, 0.5);;
    }
  }
}
.popup-container.inspiration-shortlist-container{
  width:30.5625rem ;
  align-items: centerz;
  width: 28.75rem;
  min-height: 34.6875rem;
  padding: 2rem;
  .popup-content{
      width: 24.75rem;
      height: 25.1875rem + 1.5rem;

      .search-wrapper {
        display: flex;
        justify-content: center;
        margin: .75rem 0;

        input {
          width: 100%;
        }
      }
  }
  // height: 34.6875rem;
  .popup-head{
    font-size: 1.5rem;
    line-height: 2rem;
    width: 24.75rem;
    min-height: 3.375rem;
    text-align: center;
    h2 {
      font-size: 1.5rem;
      color: #d48e8e;
      font-weight: 400;
      line-height: 2rem;
    }
  }
  .popup-details {
    min-height:18.4375rem;
  }

  .user-projects{
    height:25.1875rem;
    width:24.75rem;
    margin: 0 auto;
    overflow: auto;
    @include respond(phone) {
      // width < 900px?
      width: auto;
    }

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
  .address-button-container{
    width: 24.75rem;
    height: 2rem;
    margin: calc(5.4375rem + 1.5rem) auto 0 auto;
  }
  .popup-or-divider{
    width: 24.75rem;
    text-align: center;
    display: flex;
    align-items: center;
    margin: .5rem auto 0 auto;
    justify-content: space-between;
    .divider-center-text{
      margin: 0 .5rem ;
    }
    .divider-center-line{
      width:100%;
      height: .0625rem;
      background-color:#C4C4C4;
    }
  }
  .popup-add-new-project-button{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    height: 1.75rem;  
    width: 24.75rem;
    text-align: center;
    margin: 1.5rem auto 0 auto;
    border: 1px solid #EDCBC2;
    color: #EDCBC2;
    font-size: .625rem * 1.22;
    font-weight: 600 * 1.22;
    line-height: .875rem * 1.22;
    letter-spacing: .0125rem * 1.22;
    @include background-animate(#e9beb3, $color-black);
    &.disabled {
      cursor:no-drop;
      opacity: 0.5;
      pointer-events: none;

    }
  }
}
</style>

<style lang="scss">
.ap-filters-and-shortlist-actions-wrapper {
  display: flex;
  align-items: flex-end;
  margin-bottom: 1.5rem * 1.22;
  // .filter-dropdown-wrapper {}

  .shortlist-and-sort-by-wrapper {
      .multi-select-drop-down-section-container {
        margin-bottom: 1rem * 1.22;
        max-width: 75%;
      }
  }

  .filters-wrapper{
    height:100%;
    width: 80%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;
    
      img {
        margin-bottom: 1rem * 1.22;
        margin-right: .625rem * 1.22;
        height: 1.6875rem * 1.22;
        width: 1.5rem * 1.22;
      }
    
      .multi-select-drop-down-section-container {
        margin-right: .625rem * 1.22;
        margin-bottom: 1rem * 1.22;
      }

      #multiselectsortoptions {
        .disable-click {
          pointer-events: none;
        }
      }
    
      .multi-select-drop-down-container {
        width: 13rem;
        // background-color: $color-second;
        grid-template-rows: 1fr max-content;
        padding-bottom: 0 !important;
      }
    
      .dropdown-action-button-wrapper {
        display: flex;
    
        font-weight: 700;
        font-size: 0.75rem;
        line-height: 0.9375rem;
        padding: 0.5rem;
    
        & > div {
          padding: 0.5rem;
          flex-basis: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
    
        .clear-all-button {
          color: $color-black;
    
          &:hover {
            // color: $color-main;
          }
        }
        .get-results-button {
          color: $color-white;
          background: $color-black;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
    
          &:hover {
            // background: #f7e3df;
          }
        }


  }
  }
}
</style>

<style lang="scss">
.user-projects{
  .projects-check{
    label{
      .checkmark::after{
        top: 15%;
        left: 41%;
      }
    }
  }

}
</style>

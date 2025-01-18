<template>
  <div>
    <div class="container" :class="{ 'search-folder': $parent.searchKey }">
      <div class="new-folder" v-for="(folder, index) in foldersToShowLocal" v-if="!move"
        @mouseover="folderId = folder._id;" @mouseleave="folderId = null; showFolderMenu = false">
        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.952148 5.71973V17.0811H15.9437V8.54325H7.40593L5.25468 5.71973H1.69165H0.952148Z" stroke="#3A393A"
            stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M2.76715 5.24912V1.08105H14.868V7.33316V8.54324" stroke="#3A393A" stroke-width="0.8"
            stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8.48145 3.16504H12.7167" stroke="#3A393A" stroke-width="0.75" stroke-miterlimit="10"
            stroke-linecap="round" />
          <path d="M8.48145 4.91296H12.7167" stroke="#3A393A" stroke-width="0.75" stroke-miterlimit="10"
            stroke-linecap="round" />
        </svg>
        <p @click="selectFolder(folder)">{{ folder.name }}</p>
        <!-- <p>{{(folder.folders && folder.folders.length) ? folder.folders.length : 0 }}</p> -->
        <img v-if="folderId === folder._id" src="~assets/images/threeDots.svg" alt
          @click="showFolderMenu = !showFolderMenu" />
        <div class="folder-menu" v-if="((folderId === folder._id) && showFolderMenu)">
          <div @click="selectFolder(folder); showFolderMenu = false">
            <p>{{ $t("buttonText.open") }}</p>
          </div>
          <div
            @click="showRename = true; newFolderName = folder.name; parentId = folder.parent; renameFolderId = folder._id; message.value = ''; message.global = false;">
            <p>{{ $t("buttonText.rename") }}</p>
          </div>
          <div
            @click="showDelete = true; deleteFolderId = folder._id; parentId = folder.parent; message.value = ''; message.global = false;">
            <p>{{ $t("buttonText.delete") }}</p>
          </div>
        </div>
      </div>
      <div class="noFolders" v-if="(foldersToShowLocal.length <= 0 && !move)">
        <!-- <p>No folders inside this</p> -->
      </div>
    </div>
    <!-- ---------------------------------MOVE POPUP--------------------------- -->
    <div class="folder-container folder-container-move" v-if="move">
      <div class="folder" style="width: 286px !important;" v-for="folder in (folderHierarchy && folderHierarchy.folders.filter(e => e.parent === selectedFolderIdForMove))"
        @click="selectFolderInPopup(folder)">
        <span class="folderIcon">
          <img src="~assets/images/folder.svg" alt />
          <p class="folderTitle">{{ folder.name }}</p>
        </span>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
    <div class="noFolder-move" v-if="foldersPopup && foldersPopup.folders && foldersPopup.folders.length <= 0 && move">
      <p>{{ $t("dashboard.noFoldersInside") }}</p>
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
          <h2>{{ $t("suggestionText.renameFolder") }}</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <input autocomplete="off" type="text" placeholder="Enter Folder name" v-model="newFolderName"
              @keyup.enter="selectRename()" />
            <span :class="message.error ? 'error-message' : 'success-message'" v-if="message.value">{{ message.value
            }}</span>
          </div>
          <div class="invite-button-container">
            <button @click="closePopup()" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button @click="selectRename()" :disabled="!newFolderName" class="update-address white">{{
              $t("buttonText.save") }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- -----------------------------Delete Confirmation------------------ -->
    <div class="popup-div" :class="showDelete ? 'showPopUp' : ''" @click="closePopup">
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
          <span :class="message.error ? 'error-message' : 'success-message'" v-if="message.value">{{ message.value
          }}</span>
          <div class="invite-button-container">
            <button @click="closePopup" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button @click="selectDelete()" class="update-address white">{{ $t("buttonText.confirm") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  props: {
    foldersArray: [Object, Array],
    foldersPopup: [Object, Array],
    move: Boolean,
    searchKey: String
  },
  data() {
    return {
      folderId: "",
      renameFolderId: "",
      newFolderName: "",
      showRename: false,
      showDelete: false,
      parentId: "",
      showFolderMenu: false,
      message: {
        value: "",
        error: false,
        global: false
      },
      changeRight: false
    };
  },
  watch: {},
  computed: {
    ...mapState({
      foldersTree: state => state.Projects.foldersTree,
      folderHierarchy: state => state.Projects.folderHierarchy,
      selectedFolder: state => state.Projects.selectedFolder,
      selectedFolderFoMove: state => state.Projects.selectedFolderFoMove,
    }),
    ...mapGetters("Projects", ["selectedFolderId", "foldersToShow", "searchResultsForFolders", "selectedFolderIdForMove"]),
    foldersToShowLocal() {
      if (this.searchKey) return this.searchResultsForFolders
      else return this.foldersToShow
    }
  },
  methods: {
    ...mapActions({
      fetchFolders: "Projects/fetchFoldersTree",
      renameFolder: "Projects/renameFolder",
      deleteFolder: "Projects/deleteFolder",
      fetchProjectsWithPagination: "Projects/fetchProjectsWithPagination",
      fetchFolderHierarchy: 'Projects/fetchFolderHierarchy',
    }),
    ...mapMutations({
      setSelectedFolder: "Projects/setSelectedFolder",
      setSelectedFolderFoMove: "Projects/setSelectedFolderFoMove",
      setPageNumber: "Projects/setPageNumber",
    }),
    selectFolder(_folders) {
      // click on folder which is in the result of search---->
      if (this.$parent.searchKey) {
        this.$parent.searchKey = '';
        if (window.analytics) {
          window.analytics.track("dashboard_search_folders_clicked", {
            title: "dashboard_search_folders_clicked",
          }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
        }
        // for search no breadcrumbs should visible---->
        this.$parent.breadcrumbs = [];
        // Click on child folder, so searching for parents for breadcrumbs---->
        this.generateBreadcrmbTrailForFolder(_folders)
        this.setSelectedFolder(_folders)
        this.setPageNumber(1);
        this.fetchProjectsWithPagination();
      } else {
        this.$parent.breadcrumbs.push(_folders);
        this.setSelectedFolder(_folders)
        this.setPageNumber(1);
        this.fetchProjectsWithPagination();
      }
    },
    selectFolderInPopup(_folders) {
      console.log("FolderssClicked-->", _folders);
      this.setSelectedFolderFoMove(_folders);
      this.$parent.foldersInMove = _folders;
      this.$parent.breadcrumbsPopup.push(_folders);
    },
    selectRename() {
      if (this.renameFolderId && this.newFolderName) {
        this.renameFolder({
          folderId: this.renameFolderId,
          name: this.newFolderName,
          parent: this.parentId
        })
          .then(res => {
            if (res && res.statusCode && res.statusCode === 200 && res.data) {
              this.message.error = false;
              this.message.value = "Succesfully Renamed.";
              this.message.global = true;
              setTimeout(() => {
                this.message.global = false;
                this.message.value = "";
              }, 2500);
              this.refreshingData(this.parentId);
              this.showRename = false;
              this.renameFolderId = "";
              this.folderId = "";
            }
          })
          .catch(err => {
            if (err.data && err.data.err && err.data.err.message) {
              this.message.error = true;
              this.message.global = true;
              this.message.value = err.data.err.message;
              setTimeout(() => {
                this.message.error = false;
                this.message.global = false;
                this.message.value = "";
              }, 2500);
            }
          });
      }
    },
    selectDelete() {
      if (this.deleteFolderId) {
        this.deleteFolder({
          folderId: this.deleteFolderId,
          folder: this.parentId
        })
          .then(res => {
            if (res) {
              console.log("deleted successfully");
              this.refreshingData(this.parentId);
              this.message.error = false;
              this.message.value = "Succesfully Deleted.";
              this.message.global = true;
              setTimeout(() => {
                this.message.global = false;
                this.message.value = "";
              }, 2500);
              this.showDelete = false;
            }
          })
          .catch(err => {
            if (err.data && err.data.err && err.data.err.message) {
              this.message.error = true;
              this.message.value = err.data.err.message;
              setTimeout(() => {
                this.message.global = false;
                this.message.value = "";
              }, 2500);
            }
          });
      } else {
        console.log("Delete Project Id is not found.");
      }
    },
    closePopup() {
      this.showRename = false;
      this.showDelete = false;
      this.renameFolderId = "";
      this.deleteFolderId = "";
      this.folderId = "";
    },
    searchParent: function (_foldersTree, _id, _type, _currentFolder) {
      if (_foldersTree._id === _id) {
        if (_type && _type === 'search') {
          this.$parent.breadcrumbs.push(_foldersTree);
          if (_currentFolder && (_currentFolder.parent === _id)) {
            let tempFolder = _foldersTree.folders.filter((folder) => _currentFolder._id === folder._id);
            if (tempFolder && tempFolder.length > 0) {
              this.$parent.rootFolders = tempFolder[0];
              this.$parent.breadcrumbs.push(_currentFolder);
            }
          }
        } else {
          this.$parent.rootFolders = _foldersTree;
        }
        return;
      }
      for (const child of _foldersTree.folders) {
        this.searchParent(child, _id, _type, _currentFolder);
      }
    },
    generateBreadcrmbTrailForFolder(folder) {
      this.$parent.breadcrumbs.unshift(folder);
      if (folder.parent) {
        let parentFolder = this.folderHierarchy.folders.find(e => e._id === folder.parent);
        if (parentFolder) this.generateBreadcrmbTrailForFolder(parentFolder)
      }
    },
    refreshingData(_parendId) {
      this.fetchFolderHierarchy().then((data) => { })
    },
  }
};
</script>
<style lang="scss" scoped>
.folder-container {
  display: flex;
  flex-wrap: wrap;
  // width: 102%;
  margin-bottom: 1.25rem;
  padding-left: 2.375rem;

  .folder {
    position: relative;
    width: 26.3125rem;
    height: 3rem;
    background: rgba(255, 255, 255, 0.6);
    align-items: center;
    margin-right: 0.625rem;
    border: 0.0625rem solid #d48e8e;
    margin-bottom: 0.625rem;
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-row-gap: 1.5rem;

    &:hover {
      cursor: pointer;
    }

    img {
      height: 100%;
    }

    .folderSVG {
      height: 1.75rem;
    }

    .folderIcon {
      display: grid;
      grid-column-gap: 0.3125rem;
      grid-template-columns: 1fr max-content;

      span {
        display: flex;
      }

      img {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0.8rem;
      }

      .folderTitle {
        margin: 0rem;
        padding: 0rem;
        margin-left: 0.5rem;
        overflow: hidden;
        align-self: center;
      }

      .threeDots {
        width: 0.25rem;
        right: 0.5625rem;
      }
    }

    .options-menu-popup {
      grid-column-start: 2;
      place-self: end;
      background: #fdfdfd;
      border: 1px solid #e9beb3;
      div,
      a {
        cursor: pointer;
        padding: 0.75rem 0.9375rem;
        align-items: center;
        position: relative;
        z-index: 4;
        text-decoration: none;
        @include background-animate(#d48e8e, false);

        p {
          color: black;
          // font-size: 0.75rem;
          margin-bottom: 0rem;
          font-size: 0.9rem;
        }
      }

      div {
        // padding: 1.12rem 1.3rem;
        // flex: 1;
        width: 100%;
        flex: 1;
      }
    }

    .options-menu-move {
      display: grid !important;
    }
  }
}

.showPopUp {
  transform: scale(1);
  visibility: visible;
  z-index: 200;
  opacity: 1;
}

.folder-container-move {
  display: grid;
  padding-left: 0px;

  .folder {
    background: none;

    .folderIcon {
      .folderTitle {
        margin: 0;
        font-size: 1rem !important;
      }
    }
  }
}

.noFolder-move {
  width: 18.375rem;
  display: flex;
  place-content: center;

  p {
    margin-top: 2.1875rem;
    color: gray;
  }
}

.container {
  display: grid;
  color: black;
  grid-gap: 0.6rem 0.9375rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  padding: 0.5625rem 3.125rem;
  color: black;

  .new-folder {
    display: grid;
    grid-template-columns: max-content 1fr 40px;
    grid-auto-rows: 4rem;
    background: #fbf3f1;
    align-items: center;
    position: relative;
    cursor: pointer;

    &:hover {
      box-shadow: 0rem 0.375rem 1rem rgba(34, 32, 33, 0.25);
    }

    img {
      justify-self: center;
      cursor: pointer;
      padding: 1.25rem;
    }

    svg {
      margin: 0.625rem;
    }

    p {
      margin: 0 0.75rem;
      font-size: 0.875rem;
      padding: 1rem 0;
      overflow: hidden;
      word-break: break-all;
    }

    .folder-menu {
      position: absolute;
      width: 6.29rem;
      background: #ffffff;
      box-shadow: 0rem 0rem 0.25rem rgba(0, 0, 0, 0.25);
      right: 0;
      top: 3.4375rem;
      z-index: 1;
      display: grid;

      div {
        p {
          margin: 0.3125rem;
          padding: 0;
        }

        &:hover {
          cursor: pointer;
          background: #f7e3df;
        }
      }
    }
  }
}

.search-folder {
  padding-top: 1.5625rem;
}
</style>
  
<template>
  <div>
    <div>
      <div class="breadcrumbs-container">
        <div class="breadcrumb" v-bind:class="{moveBC: move}">
          <a href="#" @click="selectBC(rootTree,0)">{{$t("buttonText.myFolders")}}</a>
        </div>
        <!-- {{breadCrumbs.length}} -->
        <div
          class="breadcrumb"
          v-bind:class="{moveBC: move}"
          v-if="(breadCrumbs && breadCrumbs.length > 0)"
          v-for="(bc, index) in breadCrumbs"
        >
          <span v-if="(index==0)">/</span>
          <a
            v-bind:class="{ lastChildOfBC: ((breadCrumbs.length) === (index+1)) }"
            href="#"
            @click="selectBC(bc, (index+1))"
          >{{bc.name}}</a>
          <span v-if="((breadCrumbs.length) !== (index+1))">/</span>
        </div>
        <!-- {{breadCrumbs.length}} -->
      </div>
      <!-- {{currentTree.folders}} -->
      <div
        class="folder-container"
        v-if="((currentTree && currentTree.folders && currentTree.folders.length) > 0 && !move)">
        <div
          class="folder"
          style="width: 294px !important;"
          v-for="folder in currentTree.folders"
          @mouseover="mouseOnFolder(folder._id)"
          @mouseleave="mouseOnFolder(null)"
        >
          <span class="folderIcon">
            <p class="folderTitle">{{folder.name}}</p>
            <img src="~assets/images/folder.svg" alt />
          </span>
          <div class="options-menu-popup" v-if="folderId === folder._id">
            <div class="user-menu">
              <div class="gap">
                <div @click="onClickFolder(folder)">
                  <!-- <img src="~assets/images/clone.svg" alt /> -->
                  <p>{{$t("buttonText.open")}}</p>
                </div>
                <!-- <div v-if="user && user.accountType == 'root' && user.accountInfo.accountCategory == 'REGULAR'" to="/settings/subscriptions">
                            <img src="~assets/images/subscription.svg" alt="">
                            <p>Plans & Add-ons</p>
                </div>-->
                <div
                  @click="showRename=!showRename; renameFolderId=folder._id;newFolderName=folder.name"
                >
                  <!-- <img src="~assets/images/pencil.svg" alt /> -->
                  <p>{{$t("buttonText.rename")}}</p>
                </div>
                <div @click="showDelete=true; deleteFolderId= folder._id">
                  <!-- <img src="~assets/images/subscription.svg" alt /> -->
                  <p>{{$t("buttonText.delete")}}</p>
                </div>
                <!-- <div @click="showDeleteConfirmation=true; deleteProjectId= beg._id">
                        <img src="~assets/images/subscription.svg" alt />
                        <p>Delete</p>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="noFolders" v-else>
        <!-- <p>No folders inside this</p> -->
      </div>
    </div>
    <!-- -----------------------Rename Popup------------------ -->
    <div class="popup-div" :class="showRename?'showPopUp':''" @click="closePopup">
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
          <h2>{{$t("suggestionText.renameFolder")}}</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <input
              autocomplete="off"
              type="text"
              placeholder="Enter project name"
              v-model="newFolderName"
            />
            <span
              :class="message.error?'error-message':'success-message'"
              v-if="message.value"
            >{{message.value}}</span>
          </div>
          <div class="invite-button-container">
            <button @click="closePopup()" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button
              @click="onClickRename(newFolderName)"
              :disabled="!newFolderName"
              class="update-address white"
            >{{$t("buttonText.save")}}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- -----------------------------Delete Confirmation------------------ -->
    <div class="popup-div" :class="showDelete?'showPopUp':''" @click="closePopup">
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
          <h2>{{ $t("suggestionText.wantToDelete") }}</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <h4>{{ $t("suggestionText.deletWarning") }}</h4>
          </div>
          <div class="invite-button-container">
            <button @click="closePopup" class="cancel-button">{{ $t("buttonText.cancel") }}</button>
            <button @click="onClickDelete()" class="update-address white">{{ $t("buttonText.confirm") }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- --------------------------Move--------------------------------------------- -->
    <div
      class="folder-container-move"
      v-if="((currentTree && currentTree.folders && currentTree.folders.length) > 0 && move)">
      <div
        class="folder-move"
        style="width: 250px !important;"
        v-for="folder in currentTree.folders"
      >
        <span class="folderIcon-move" @click="onClickFolder(folder)">
          <p class="folderTitle-move">{{folder.name}}</p>
          <img src="~assets/images/folder.svg" alt />
        </span>
        <div class="next-icon">
          <img src="~assets/images/next-arrow.svg" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    rootTree: [],
    move: Boolean
  },
  data() {
    return {
      totalFolders: [],
      breadCrumbs: [],
      folderId: "",
      showRename: false,
      showDelete: false,
      newFolderName: "",
      renameFolderId: "",
      deleteFolderId: "",
      message: {
        value: "",
        error: false,
        global: false
      }
    };
  },
  computed: {
    ...mapState({
      currentTree: state => state.Projects.currentFoldersTree
    })
  },

  mounted() {
    // this.fetchCurrentFoldersTree({ currentTree: this.foldersTree });
  },
  watch: {
    // breadCrumbs: function() {
    //   this.breadcrumbs = this.breadcrumbs;
    // }
  },
  methods: {
    ...mapActions({
      fetchCurrentFoldersTree: "Projects/setCurrentTree",
      setParentId: "Projects/setParentId",
      fetchFolders: "Projects/fetchFoldersTree",
      deleteFolder: "Projects/deleteFolder",
      renameFolder: "Projects/renameFolder"
    }),

    onClickFolder: function(_selectedFolder) {
      this.breadCrumbsPrepare(_selectedFolder);
      this.fetchCurrentFoldersTree({ currentTree: _selectedFolder });
    },
    breadCrumbsPrepare(_folderData) {
      let bcObject = {};
      this.breadCrumbs.push(_folderData);
      console.log(this.breadCrumbs);
    },
    selectBC(_folderData, _index) {
      this.breadCrumbs = this.breadCrumbs.slice(0, _index);
      this.fetchFolders({}).then(foldersList => {
        if (foldersList) {
          if (_folderData._id) {
            for (let i = 0; i < foldersList.folders.length; i++) {
              let isMatched = this.searchParent(
                foldersList.folders[i],
                _folderData._id
              );
            }
          } else {
            this.fetchCurrentFoldersTree({ currentTree: foldersList });
          }
        }
      });
      this.fetchCurrentFoldersTree({ currentTree: _folderData });
    },
    searchParent: function(_foldersTree, _id) {
      if (_foldersTree._id === _id) {
        this.fetchCurrentFoldersTree({ currentTree: _foldersTree });
        return;
      }
      for (const child of _foldersTree.folders) {
        this.searchParent(child, _id);
      }
    },
    mouseOnFolder(_folderId) {
      if (_folderId) {
        this.folderId = _folderId;
      } else {
        this.folderId = null;
      }
    },
    onClickDelete() {
      if (this.deleteFolderId) {
        this.deleteFolder({
          folderId: this.deleteFolderId,
          folder: this.currentTree._id
        })
          .then(res => {
            if (res) {
              console.log("deleted successfully");
              this.showDelete = false;
              this.message.error = false;
              this.message.value = "Succesfully Deleted.";
              this.message.global = true;
              this.refreshingData();
              setTimeout(() => {
                this.message.global = false;
                this.message.value = "";
              }, 2500);
            }
            console.log("Response Received After Delete", res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("Delete Project Id is not found.");
      }
    },
    onClickRename(_newName) {
      if (this.renameFolderId && _newName) {
        this.renameFolder({
          folderId: this.renameFolderId,
          name: _newName,
          parent: this.currentTree._id
        })
          .then(res => {
            if (res && res.statusCode && res.statusCode === 200 && res.data) {
              this.message.error = false;
              this.message.value = "Succesfully Updated.";
              this.message.global = true;
              setTimeout(() => {
                this.message.global = false;
                this.message.value = "";
              }, 2500);
              this.showRename = false;
              this.renameFolderId = "";
              this.refreshingData();
            }
            console.log("Response Received After Delete", res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    refreshingData() {
      this.fetchFolders({}).then(foldersList => {
        if (foldersList) {
          if (this.currentTree._id) {
            for (let i = 0; i < foldersList.folders.length; i++) {
              let isMatched = this.searchParent(
                foldersList.folders[i],
                this.currentTree._id
              );
              // if (isMatched) {
              //   return;
              // }
            }
            // this.searchParent(foldersList.folders, this.currentTree._id);
          } else {
            this.fetchCurrentFoldersTree({ currentTree: foldersList });
          }
          // this.onClickFolder(this.parentId)
        }
      });
    },
    closePopup() {
      this.showRename = false;
      this.showDelete = false;
      this.renameFolderId = "";
      this.deleteFolderId = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.folder-container {
  display: flex;
  flex-wrap: wrap;
  width: 102%;
  margin-bottom: 20px;
}
.folder {
  position: relative;
  width: 421px;
  height: 48px;
  background: #fbf3f1;
  display: flex;
  align-content: center;
  justify-content: center;
  place-content: center;
  align-items: center;
  justify-items: center;
  place-items: center;
  flex-direction: column;
  margin-right: 10px;
  border: 1px solid #d48e8e;
  border-radius: 6px;
  margin-bottom: 10px;
}
.folder img {
  height: 100%;
}
.folder:hover {
  cursor: pointer;
}
.breadcrumbs-container {
  display: flex;
  height: 30px;
  align-items: center;
}
.breadcrumb {
  margin-right: 5px;
}
.lastChildOfBC {
  text-decoration: none;
  color: gray;
}
/* .folderIcon {
  width: 246px;
  height: 48px;
  padding: 0 68px;
  background: white;
  place-content: center;
  place-items: center;
  display: flex;
} */
.folderIcon {
  display: flex;
  place-items: center;
  width: 100%;
  justify-content: space-between;
}
.folderIcon img {
  width: 24px;
  height: 24px;
  /* margin-right: -52px; */
  margin-right: 8px;
}
.folderTitle {
  margin: 0px;
  padding: 0px;
  margin-left: 8px;
}
.noFolders {
  height: 10px;
}
.options-menu-popup {
  position: absolute;
  right: 0rem;
  width: 100%;
  bottom: 0;
  .user-menu {
    cursor: pointer;
    .gap {
      // border-top: 0.1875rem solid $border-1;
      background: $background-1;
      display: flex;
      border-radius: 3px;
      // padding: 0.975rem 0rem 0rem 0rem;
      div,
      a {
        // display: flex;
        cursor: pointer;
        // grid-template-columns: 1.25rem max-content;
        // grid-gap: 1.875rem;
        padding: 0.75rem 0.9375rem;
        align-items: center;
        position: relative;
        z-index: 4;
        text-decoration: none;
        @include background-animate(#020202, false);
        p {
          color: #c4c4c4;
          // font-size: 0.75rem;
          margin-bottom: 0rem;
          font-size: 0.9rem;
        }
      }
      div {
        padding: 0.4rem 1.3rem;
        flex: 1;
      }
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.folder-move {
  position: relative;
  width: 421px;
  height: 48px;
  // background: #fbf3f1;
  display: flex;
  align-content: center;
  justify-content: center;
  place-content: center;
  align-items: center;
  justify-items: center;
  place-items: center;
  flex-direction: column;
  margin-right: 30px;
  border: 1px solid #d48e8e;
  border-radius: 6px;
  margin-bottom: 10px;
}
.folder-move img {
  height: 100%;
}
.folder-move:hover {
  cursor: pointer;
}
.folderIcon-move {
  display: flex !important;
  place-items: center;
  width: 100%;
  justify-content: space-between;
}
.folderIcon-move img {
  width: 24px;
  height: 24px;
  /* margin-right: -52px; */
  margin-right: 8px;
}
.folderTitle-move {
  margin: 0px;
  padding: 0px;
  margin-left: 8px;
}
.moveBC {
  display: flex;
  place-items: center;
  a {
    color: #d48e8e;
  }
}
.invite-button-container {
  margin-top: 12px;
}
.next-icon {
  position: absolute;
  right: -23px;
  height: 15px;
}
</style>
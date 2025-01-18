<template>
  <div class="breadcrumbs-container">
      <p @click="onbreadClick(breadCrum)">{{breadCrum.name}}</p>
      
    <!-- <div class="breadcrumb">
        bra
          <a href="#" @click="selectBC(rootTree,0)">My Folders</a>
    </div>-->
    <!-- {{breadCrumbs.length}} -->
    <!-- <div
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
    </div> -->
    <!-- {{breadCrumbs.length}} -->

  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {breadCrum:Object},
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
    //   breadCrumbs: state => state.Projects.foldersTree
    })
  },

  mounted () {
      this.breadCrumbs = [];
  },
  watch: {},
  methods: {
    ...mapActions({
      fetchCurrentFoldersTree: "Projects/setCurrentTree",
      totalBreadCrumbs: "Projects/foldersBreadCrumbs",
    }),
    onbreadClick(_folders) {
      this.$parent.rootFolders = _folders;
    },
    selectBC(_folderData, _index) {
      //   this.breadCrumbs = this.breadCrumbs.slice(0, _index);
      //   this.fetchFolders({}).then(foldersList => {
      //     if (foldersList) {
      //       if (_folderData._id) {
      //         for (let i = 0; i < foldersList.folders.length; i++) {
      //           let isMatched = this.searchParent(
      //             foldersList.folders[i],
      //             _folderData._id
      //           );
      //         }
      //       } else {
      //         this.fetchCurrentFoldersTree({ currentTree: foldersList });
      //       }
      //     }
      //   });
      //   this.fetchCurrentFoldersTree({ currentTree: _folderData });
    }
  }
};
</script>
<style lang="scss" scoped>
.breadcrumbs-container {
  display: flex;
  height: 30px;
  align-items: center;
  .breadcrumb {
    margin-right: 5px;
    .lastChildOfBC {
      text-decoration: none;
      color: gray;
    }
  }
}
</style>

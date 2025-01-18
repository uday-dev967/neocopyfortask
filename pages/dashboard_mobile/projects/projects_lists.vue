<template>
  <div class="projects-list-container" :class="!isFreeTrial ? 'onlyProjects': ''">
    <!-- <p class="my-projects-title">My Projects</p> -->
    <div class="projects" v-if="filteredProjects && filteredProjects.length > 0">
      <div class="card" v-for="project in filteredProjects" :key='project.id'>
        <img :src="project.thumbnail" alt="" @click="projectListActions(project, 'thumbnail','mb_project_thumbnail_clicked')">
        <span>
          <p>{{project.projectName}}</p>
          <svg @click="projectListActions(project, 'threeDots','mb_project_3dots_clicked')" width="5" height="16" viewBox="0 0 5 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.74607 8.83141C4.33185 8.24563 4.33185 7.29588 3.74607 6.71009C3.16028 6.12431 2.21053 6.12431 1.62475 6.71009C1.03896 7.29588 1.03896 8.24563 1.62475 8.83141C2.21053 9.4172 3.16028 9.4172 3.74607 8.83141Z" fill="#4D4C4D"/>
          <path d="M3.74729 14.0741C4.33307 13.4883 4.33307 12.5386 3.74729 11.9528C3.1615 11.367 2.21175 11.367 1.62597 11.9528C1.04018 12.5386 1.04018 13.4883 1.62597 14.0741C2.21175 14.6599 3.1615 14.6599 3.74729 14.0741Z" fill="#4D4C4D"/>
          <path d="M3.74491 3.58874C4.33069 3.00295 4.33069 2.0532 3.74491 1.46742C3.15912 0.881629 2.20937 0.88163 1.62359 1.46742C1.0378 2.0532 1.0378 3.00295 1.62359 3.58874C2.20937 4.17452 3.15912 4.17452 3.74491 3.58874Z" fill="#4D4C4D"/>
          </svg>
        </span>
      </div>
    </div>
    <div v-else>
      <p class="no-renders-msg">{{ $t("dashboard.youHaveNoProjects") }}</p>
    </div>
    <div class="extra-space"></div>
    <ProjectOptionsComponent v-if="isOptionsShow" :desktopAlert="desktopAlert"/>  
    <loginViaDesktopComponent :desktopAlert="desktopAlert"/>
    <MessageComponent :changeRight="message" />
    <!-- ==========RENAME =====  -->
    <div class="popup-div rename-container" :class="isRename ? 'showPopUp': ''" @click.prevent="isRename = false">
      <div class="popup-container" @click.stop>
        <div class="popup-details">
          <p class="sub-heading">
            {{ $t("suggestionText.renameProject") }}
          </p>
           <input
              type="text"
              :placeholder="$t('placeholders.projectName')"
              v-model="projectName"
              @keyup.enter="onClickRename(projectName)"
            />
          <p>
            <span
              :class="message.error?'error-message':'success-message'"
              v-if="message.value"
            >{{message.value}}</span>
          </p>
          <button class="mobile-basic-btn" @click="onClickRename(projectName)">{{ $t("buttonText.done") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectOptionsComponent from '@/components/shared/mobile/projectOptions';
import loginViaDesktopComponent from '@/components/shared/mobile/loginViaDesktop';

import {mapState, mapActions} from 'vuex';
export default {
  components:{
    ProjectOptionsComponent,
    loginViaDesktopComponent
  },
   data() {
    return {
      isOptionsShow: false,
      desktopAlert: false,
      isRename : false,
      currentProject : {},
      foldersArray: {},
      projectName: '',
      message: {
        value: "",
        error: false,
        global: false
      },
      // oldProjectName: '',
      // renameProjectId: '',
    }
  },
  computed: {
    ...mapState({
      mobileProjects: state => state.Projects.mobileSampleProjects,
      userDetails: state => state.User.user,
      isFreeTrial: state => state.Billing.isTrial,
    }),
    filteredProjects(){
      if(this.mobileProjects && this.mobileProjects.projects && this.mobileProjects.sampleProjects)
      return this.mobileProjects.sampleProjects.concat(this.mobileProjects.projects);
      return [];
    }
  },
  methods: {
    ...mapActions({
      createMobileProject: 'Projects/createMobileProject',
      renameProject: "Projects/renameProject",
    }),
    createProject(_project){
      if(_project && _project.sptId){
        this.createMobileProject({'projectId': _project.sptId}).then((response)=> {
          console.log('Project Created', response)
        }).catch((error)=> {
          console.log('Error created', error)
        })
      }
    },
    onClickRename(_newName) {
      if(!this.checkProjectNamePattern(_newName)){
        if (this.currentProject.projectName && this.currentProject.id && _newName) {
          if(this.oldProjectName !== _newName){
            this.renameProject({
            projectId: this.currentProject.id,
            name: _newName,
            folder: this.foldersArray._id ? this.foldersArray._id : null
            })
              .then(res => {
                if (res && res.statusCode && res.statusCode === 200 && res.data) {
                  // this.refreshingData(this.foldersArray._id);
                  this.isRename = false;
                  this.message.error = false;
                  this.message.value = this.$t("messages.succesfullyRenamedMessage");
                  this.message.global = true;
                  setTimeout(() => {
                    this.message.global = false;
                    this.message.value = "";
                  }, 2500);
                  this.showRename = false;
                  this.oldProjectId = "";
                  this.pageNum = 1;
                }
                // console.log("Response Received After Delete", res);
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
          }else {
            this.errorAlertShowing('Project with name already exists',false);
          }
        }else {
          this.errorAlertShowing('Error: Missing Parameters',true);
        }
      }else {
         this.message.error = true;
        // this.message.global = true;
        // this.message.value = "Please enter project name";
        setTimeout(() => {
          this.message.error = false;
          this.message.global = false;
          this.message.value = '';
        }, 2000);
      }
    },
    checkProjectNamePattern(_projectName){
      let tempProject = _projectName;
      const namePattern = /^[A-Za-z0-9_ ]*$/;
      let error = false;
      let errorType = ''
      if(!tempProject || tempProject.trim('').length <= 0){
        error = true;
        errorType = 'any.empty'
      }
      if(tempProject.trim('') && tempProject.trim('').length > 0){
        if(tempProject.length >= 50){
          error = true;
          errorType = 'max.limit'
        }else if(tempProject.trim('').length <=1){
          error = true;
          errorType = 'min.limit'
        }else {
        }
      }
      let testValue = namePattern.test(tempProject)
      if(!testValue){
        error = true;
        errorType = 'string.regex.base'
      }
      switch (errorType) {
          case "any.empty":
            this.message.value = this.$t("errorStrings.emptyStringMessage") ;
            break;
          case "string.min":
            this.message.value = this.$t("errorStrings.minLengthMessage", {context: err.context.limit});
            break;
          case "string.max":
            this.message.value = this.$t("errorStrings.maxLengthMessage", {context: err.context.limit});
            break;
          case "string.regex.base":
            this.message.value = this.$t("errorStrings.projectNameStringRegex");
            break;
          case "max.limit":
            this.message.value = this.$t("errorStrings.projectNameStringMaxLimit");
            break;
          case "min.limit":
            this.message.value = this.$t("errorStrings.projectNameStringMinLimit");
            break;
          default:
            break;
      }
      return error;
    },
    errorAlertShowing(_value,_global){
      this.message.error = true;
      this.message.global = _global;
      this.message.value = _value;
      setTimeout(() => {
        this.message.error = false;
        this.message.global = false;
        this.message.value = '';
      }, 2000);
    },
    projectListActions(_project,_type, _event){
      this.currentProject = _project;
      this.projectName = _project.projectName;
      if(_type === 'thumbnail')
      this.desktopAlert = true;
      if(_type === 'threeDots')
      this.isOptionsShow = true;
      this.$root.$emit("send-mobile-event",{name : _event, projectName: _project.projectName});
    }
  },
}
</script>
<style lang="scss">
  .projects-list-container {
    background: white;
    .my-projects-title{
      color: black;
      font-size: 1.5rem;
      padding: 2rem 2rem 0rem 2rem;
      margin: 0;
    }
    p {
      font-family: 'Ubuntu';
      color: #3A393A;
    }
    .projects {
      padding: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      row-gap: 0.5rem;
      background: white;
      .card {
        display: grid;
        // grid-template-rows: 1fr max-content;
        background: #FBF3F1;
        // width: 14.5rem;
        img {
          width: 100%;
          object-fit: fill;
          height: 13rem;
        }
        span {
          display: grid;
          grid-template-columns: 1fr max-content;
          justify-content: space-between;
          align-items: center;
          background: #FBF3F1;
          padding: 1rem 0.2rem;
          p {
            font-size: 1.5rem;
            margin: 0.25rem;
            word-break: break-word;
          }
          svg {
            margin: 0.5rem;
          }
        }
      }
    }
  }
.onlyProjects {
  height: 85vh !important;
} 
.rename-container {
  .popup-container {
    background: #FBF3F1;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
    width: 90vw;
    padding: 3rem;
    // height: 30vh;
    .popup-details {
      display: grid;
      justify-items: center;
      row-gap: 2rem;
      .sub-heading {
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 2.5rem;
        color: #0E0E0E;
      }
      input {
        width: 100%;
        background: none;
        color: black;
        border-bottom: 1px solid #C4C4C4;
        font-size: 1.5rem;
        padding: 1rem;
        outline: none;
        line-height:normal !important;

      }
      button {
        padding: 1.5rem 6rem;
        font-size: 1.5rem;
      }
    }
  }

}
.extra-space {
  height: 15vh;
  background: white;
}
.no-renders-msg {
  position: absolute;
  font-size: 2rem;
  color: black;
  top: 50%;
  left: 15%;
}
</style>
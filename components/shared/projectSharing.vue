<template>
  <div class="popup-div" :class="showProjectSharing?'showPopUp':''">
    <div class="popup-container project-sharing-container" @click.prevent="isTeamDropdown = false;isPermissionDropdown = false;isViewPermissions=false;isEmailSuggestions = false;">
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
        <h2>{{ $t("suggestionText.shareProjectWithOther") }}</h2>
        <p>{{projectDetails.name ? projectDetails.name: 'Project Title Here'}}</p>
      </div>
      <div class="popup-details">
        <div class="email-section">
          <p class="email">{{ $t("suggestionText.shareViaEmail") }}</p>
          <!-- v-if="users && users.length > 1" -->
          <span class="select-team"  @click.stop>
            <p @click="isTeamDropdown= !isTeamDropdown;sendEventToSegment('select_team_opened')">{{ $t("suggestionText.selectFromTeam") }}</p>
            <svg @click="isTeamDropdown= !isTeamDropdown;sendEventToSegment('select_team_opened')" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.10008 6.5859C5.28889 6.5859 5.46762 6.51274 5.58633 6.38685L9.96132 1.74399C10.1782 1.51363 10.1363 1.17637 9.86784 0.990562C9.59927 0.804669 9.20571 0.840598 8.98884 1.07069L5.10008 5.19762L1.21134 1.07067C0.99447 0.840562 0.600887 0.804651 0.332347 0.990544C0.179451 1.0964 0.100098 1.25135 0.100098 1.40769C0.100098 1.52583 0.145472 1.64485 0.238847 1.74399L4.61383 6.38685C4.73254 6.51274 4.91127 6.5859 5.10008 6.5859Z" fill="#EBBEB5"/>
            </svg>
            <div class="team-select-dropdown" v-if="isTeamDropdown">
               <span class="select-all">
                  <input class="styled-checkbox" id="select-all" type="checkbox" v-model="allMemberSelect" :checked="allMemberSelect">
                  <label for="select-all" @click="selectAllTeam()">{{ $t("checkBoxText.selectAll") }}</label>
               </span>
               <div class="list-of-members">
                  <span class="member" v-for="(member,index) in users" :key="member._id" v-if="member._id != user._id">
                    <input class="styled-checkbox" v-bind:id="index" type="checkbox" v-model="sharingEmails" :value="{'name':member.name,'email':member.email}">
                    <label v-bind:for="index">{{member.name}}</label>
                </span>
               </div>
               <svg width="224" height="1" viewBox="0 0 224 1" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect width="224" height="1" fill="#4D4C4D"/>
              </svg>
               <button @click="isTeamDropdown = false;">{{ $t("buttonText.ok") }}</button>
            </div>
          </span>
        </div>
        <div class="main-input-container">
          <div class="input-items">
              <span v-if="sharingEmails && sharingEmails.length > 0" v-for="email in sharingEmails">
                <p>{{email.name ? email.name: email.email}}</p>
                <svg @click="removeFromInviteList(email.email)" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.57418 4.3433C4.48237 4.43511 4.37603 4.68928 4.46784 4.7811L8.27268 8.58594L4.46784 12.3908C4.37603 12.4826 4.48237 12.7368 4.57418 12.8286C4.666 12.9204 4.91953 13.0261 5.01198 12.9349L8.81682 9.13008L12.6217 12.9349C12.7135 13.0267 12.9677 12.9204 13.0595 12.8286C13.1513 12.7368 13.2576 12.4826 13.1658 12.3908L9.36097 8.58594L13.1658 4.7811C13.2576 4.68929 13.1513 4.43511 13.0595 4.3433C12.9676 4.25149 12.7141 4.14578 12.6217 4.23695L8.81682 8.04179L5.01198 4.23695C4.92017 4.14514 4.666 4.25149 4.57418 4.3433Z" fill="#C4C4C4"/>
                </svg>
              </span>
              <input type="email" :placeholder="(sharingEmails && sharingEmails.length > 0)? $t('placeholders.typeOneOfMoreEmails'):$t('placeholders.startInviting')" name="" id="" v-model="inputEmail" @keyup.enter="addEmail('',inputEmail)" @keypress="isEmailSuggestions=true" autofocus>
              <div class="email-suggestions" v-if="isEmailSuggestions" @click.stop>
                <div class="sug-item" v-for="email in filteredEmails" @click="addEmail(email.name, email.email)">
                    <p>
                      {{email.name}}
                    </p>
                    <p>
                      {{email.email}}
                    </p>
                  </div>
              </div>
          </div>
          <div class="view-permissions" @click.stop>
            <!-- @click="isViewPermissions = !isViewPermissions" -->
              <div class="main-permission-btn">
                <p>{{ $t("buttonText.editAccess") }}</p>
                <!-- <p>{{setPermission === 'view' ? 'View Only' : setPermission}}</p> -->
                <!-- <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.90819 4.77672C5.05924 4.77672 5.20222 4.71819 5.29719 4.61747L8.79718 0.903188C8.97068 0.718903 8.93714 0.449088 8.72239 0.300445C8.50754 0.151731 8.1927 0.180474 8.0192 0.364546L4.90819 3.66609L1.7972 0.364531C1.6237 0.180445 1.30884 0.151717 1.094 0.300431C0.971686 0.385117 0.908203 0.509074 0.908203 0.634145C0.908203 0.728659 0.944503 0.823874 1.0192 0.903188L4.51919 4.61747C4.61416 4.71819 4.75714 4.77672 4.90819 4.77672Z" fill="#EBBEB5"/>
                </svg> -->
              </div>
              <div class="permissions-dropdown" v-if="isViewPermissions">
                <svg class="dropdown-holder" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.31016 0.259766L12.2491 5.25586H0.748535L6.31016 0.259766Z" fill="#1E1E1E"/>
                </svg>
                <div class="permissions-list">
                  <p v-for="access in permissionsList" @click="setPermission = access;isViewPermissions = false;">
                    {{access === 'view' ? 'View Only': access}}
                  </p>
                  <!-- <p>Remove</p> -->
                </div>
              </div>
          </div>
        </div>
        <p class="shared-box-title">{{ $t("suggestionText.sharedWith") }}</p>
        <div class="shared-with" v-bind:class="{'no-data-container': (projectSharedWith && projectSharedWith.length <= 0)}">
            <div class="user-permission-info" v-for="(member,index) in projectSharedWith" :id="index" v-if="projectSharedWith && projectSharedWith.length > 0" @click.stop>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.6416 8.42853C10.2985 8.42853 11.6416 7.08538 11.6416 5.42853C11.6416 3.77167 10.2985 2.42853 8.6416 2.42853C6.98475 2.42853 5.6416 3.77167 5.6416 5.42853C5.6416 7.08538 6.98475 8.42853 8.6416 8.42853Z" stroke="#F7E3DF" stroke-width="0.8" stroke-miterlimit="10"/>
                <path d="M8.6416 16.6724C13.0599 16.6724 16.6416 13.0906 16.6416 8.67236C16.6416 4.25408 13.0599 0.672363 8.6416 0.672363C4.22332 0.672363 0.641602 4.25408 0.641602 8.67236C0.641602 13.0906 4.22332 16.6724 8.6416 16.6724Z" stroke="#F7E3DF" stroke-width="0.8" stroke-miterlimit="10"/>
                <path d="M7.47097 9.25763C7.47097 9.25763 4.52453 9.25763 3.0791 12.6488" stroke="#F7E3DF" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round"/>
                <path d="M9.74731 9.25763C9.74731 9.25763 12.6939 9.25763 14.1393 12.6489" stroke="#F7E3DF" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round"/>
              </svg>
              <p>{{member.name ? member.name : member.email}}</p>
              <div class="permission-title">
                <span class="view-permission" @click="isPermissionDropdown=!isPermissionDropdown;activeDropdownId = member.email">
                  <p>{{member.accessType === 'edit' ? $t('dropdown.editAccess'): $t('dropdown.edit')}}</p>
                  <svg width="10" height="8" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.7285 5.21989C4.87955 5.21989 5.02253 5.16136 5.1175 5.06065L8.61749 1.34636C8.79099 1.16208 8.75746 0.892265 8.54271 0.743622C8.32786 0.594907 8.01301 0.62365 7.83951 0.807722L4.7285 4.10926L1.61751 0.807707C1.44401 0.623621 1.12915 0.594893 0.914315 0.743607C0.791999 0.828293 0.728516 0.95225 0.728516 1.07732C0.728516 1.17184 0.764816 1.26705 0.839516 1.34636L4.3395 5.06065C4.43447 5.16136 4.57745 5.21989 4.7285 5.21989Z" fill="#EBBEB5"/>
                  </svg>
                </span>
                <div class="permissions-dropdown" v-if="isPermissionDropdown && activeDropdownId === member.email">
                  <svg class="dropdown-holder" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.31016 0.259766L12.2491 5.25586H0.748535L6.31016 0.259766Z" fill="#1E1E1E"/>
                  </svg>
                  <div class="permissions-list">
                    <p v-for="access in permissionsList" @click="changePermission = access;onClickUpdate(member,'update')">
                    {{access === 'view' ? 'View Only': access}}
                     </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="no-data" v-if ="projectSharedWith && projectSharedWith.length == 0">
              <p>{{ $t("placeholders.notShared") }}</p>
            </div>
        </div>
        <div v-if="isInvalidError && invalidEmails && invalidEmails.length > 0" class="tool-tip">
          <div class="invalid-emails-tooltip" v-if="isToolTip">
            <p v-for="(email,index) in invalidEmails">{{email}}{{invalidEmails.length - 1 === index ? '' : ','}}</p>
          </div>
          <p class="invalid-emails">{{$t("suggestionText.shareFail")}}<b @mouseover="isToolTip = true" @mouseleave="isToolTip = false">{{invalidEmails.length}} {{$t("dashboard.users")}}</b>{{$t("suggestionText.shareFailMessage")}}</p>
        </div>
        <p class="shared-box-title">{{ $t("suggestionText.copyLink") }}</p>
        <div class="link-container">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.51131 9.68683C0.0535398 11.1446 0.0535194 13.5193 1.51126 14.977C2.96902 16.4348 5.34369 16.4347 6.80146 14.977L9.74049 12.038C11.1983 10.5802 11.1983 8.20553 9.74053 6.74775C9.68293 6.68855 9.61414 6.64137 9.53815 6.60897C9.46217 6.57658 9.3805 6.5596 9.2979 6.55904C9.2153 6.55847 9.13341 6.57433 9.05699 6.60568C8.98056 6.63703 8.91113 6.68324 8.85272 6.74165C8.79431 6.80006 8.74809 6.8695 8.71674 6.94592C8.68539 7.02235 8.66954 7.10423 8.67011 7.18684C8.67068 7.26944 8.68765 7.3511 8.72005 7.42709C8.75245 7.50307 8.79962 7.57187 8.85882 7.62947C9.84337 8.61402 9.84336 10.1717 8.8588 11.1563L5.91978 14.0953C4.93521 15.0799 3.37752 15.0799 2.39297 14.0953C1.40843 13.1108 1.40844 11.5531 2.393 10.5685L5.18507 7.77644C5.24435 7.71886 5.29159 7.65005 5.32405 7.57405C5.3565 7.49805 5.37352 7.41636 5.37412 7.33372C5.37472 7.25108 5.35889 7.16914 5.32754 7.09268C5.29619 7.01621 5.24995 6.94675 5.19152 6.88831C5.13308 6.82987 5.06361 6.78363 4.98714 6.75228C4.91068 6.72093 4.82874 6.70511 4.7461 6.70571C4.66346 6.70631 4.58177 6.72333 4.50576 6.75578C4.42976 6.78824 4.36097 6.83547 4.30338 6.89475L1.51131 9.68683ZM7.09546 4.10267C5.63768 5.56044 5.63766 7.93513 7.09541 9.39289C7.15302 9.45208 7.22181 9.49924 7.29779 9.53163C7.37377 9.56401 7.45543 9.58097 7.53802 9.58153C7.62062 9.58209 7.7025 9.56624 7.77892 9.53489C7.85533 9.50354 7.92476 9.45732 7.98316 9.39891C8.04157 9.34051 8.08778 9.27108 8.11913 9.19467C8.15048 9.11825 8.16633 9.03637 8.16577 8.95378C8.16521 8.87118 8.14824 8.78952 8.11586 8.71354C8.08347 8.63756 8.03632 8.56877 7.97712 8.51117C6.99258 7.52663 6.99259 5.96893 7.97715 4.98438L10.9162 2.04535C11.9007 1.06079 13.4584 1.06078 14.443 2.04532C15.4275 3.02987 15.4275 4.58756 14.4429 5.57213L11.6509 8.36417C11.5917 8.42177 11.5445 8.49057 11.5121 8.56655C11.4797 8.64254 11.4627 8.72421 11.4622 8.8068C11.4616 8.88941 11.4774 8.9713 11.5088 9.04772C11.5401 9.12414 11.5864 9.19357 11.6448 9.25198C11.7032 9.31038 11.7726 9.3566 11.849 9.38795C11.9254 9.4193 12.0073 9.43515 12.0899 9.43458C12.1725 9.43401 12.2542 9.41704 12.3302 9.38464C12.4062 9.35225 12.475 9.30508 12.5326 9.24587L15.3246 6.45381C16.7824 4.99603 16.7824 2.62136 15.3247 1.16361C13.8669 -0.29414 11.4923 -0.294114 10.0345 1.16366L7.09546 4.10267Z"
              fill="white"
            />
          </svg>
          <p class="sharing-url">{{sharingUrl}}</p>
          <p @click.stop="copyToClipBoard($event)" style="cursor:pointer;"> {{$t("buttonText.copy")}}</p>
        </div>
        <div class="button-container">
        <button class="done-btn" @click="onClickUpdate('','set')">{{$t("buttonText.done")}}</button>
          <!-- <button @click="cancelContainer()" class="cancel-button">Cancel</button>
          <button class="update-address">SEND INVITE</button> -->
        </div>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
    <inviteComponent :newMember="newMember" />
  </div>
</template>
<script>
import {  mapActions, mapState, mapGetters } from "vuex";
import inviteComponent from "@/components/shared/invite";
export default {
  components: {
    inviteComponent
  },
   props: {
    showProjectSharing: Boolean,
    projectDetails: {},
  },
  data() {
    return {
      message: {
        value: "",
        error: false,
        global: false
      },
      sharingEmails: [],
      inputEmail: '',
      sharingUrl:'',
      isTeamDropdown: false,
      isPermissionDropdown: false,
      isViewPermissions: false,
      isEmailSuggestions: false,
      activeDropdownId : '',
      allMemberSelect: false,
      sharedWithEmails: [],
      setPermission: 'edit',
      changePermission: 'edit',
      permissionsList: ['remove'],
      newMember : false,
      isInvalidError: false,
      isToolTip : false,
    };
  },
  mounted() {
    if(this.user && this.user.accountId)
    this.requestUsers(this.user.accountId);
  },
  computed: {
    ...mapState({
      user:state=>state.User.user,
      users:state=>state.User.Users,
      projectSharedWith: state => state.Projects.projectSharedWith,
      invalidEmails: state => state.Projects.invalidEmails,
    }),
    ...mapGetters("Projects", ["isProductionMode", "isWhiteLabeledURL"]),
    filteredEmails: function(){
      // this.invalidEmails = [];
      if(this.inputEmail){
        return this.users.filter((value)=> {
          if(value._id != this.user._id){
            return value.email.match(this.inputEmail);
          }
        })
      }else {
        this.isEmailSuggestions = false;
        return [];
      }
    },
    sentUserCount: function() {
      return this.sharingEmails.length - this.invalidEmails.length;
    }
    // isDisabled() {
    //   const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //   return this.addNewMember && reg.test(this.addNewMember) == true;
    // }
  },
  watch: {
    sharingEmails(){
      this.isInvalidError = false;
      if(this.isTeamDropdown)
      this.sendEventToSegment("select_team_user_selected");
      this.memberSelected();
    },
    inputEmail(){
      if(this.inputEmail){
        if(this.inputEmail.includes(',')){
            this.addEmail('',this.inputEmail.split(',')[0])
        }
      }
    },
    projectDetails(data){
      if(data){
        if(this.projectDetails && this.projectDetails._id){
          if(this.projectDetails){
            this.fetchProjectSharedWith(this.projectDetails._id);
          }
          // this.isProductionMode ? this.sharingUrl = `neo.foyr.com/tool?project=${this.projectDetails._id}` : this.sharingUrl =`neostaging.foyr.com/tool?project=${this.projectDetails._id}`;
          if (this.isProductionMode) {
            if (this.isWhiteLabeledURL) {
              this.sharingUrl = `${window.location.host}/tool?project=${this.projectDetails._id}${this.checkLangAndReturnLangCode()}`
            } else {
              this.sharingUrl = `neo.foyr.com/tool?project=${this.projectDetails._id}${this.checkLangAndReturnLangCode()}`
            }
          } else {
            this.sharingUrl =`neostaging.foyr.com/tool?project=${this.projectDetails._id}${this.checkLangAndReturnLangCode()}`
          }
          if(this.projectDetails && this.projectDetails.v2Project){
            this.sharingUrl = this.sharingUrl.replace("tool", "toolv2"); 
          }

          if (this.projectDetails && this.projectDetails.isMoodboardProject) {
            this.sharingUrl = this.sharingUrl.replace(/tool(v2)?/gi, "moodboard"); 
          }
        }
      }
    }
  //   user: function(data) {
  //   if (data) {
  //     this.requestUsers(this.user.accountId);
  //   }
  // }
  },
  methods: {
    ...mapActions({
      requestUsers: "User/requestUsers",
      fetchUser: "User/fetch",
      fetchProjectSharedWith: 'Projects/fetchProjectSharedWith',
      shareProjectWith: 'Projects/shareProjectWith',
      removeFromShareProjects: 'Projects/removeFromShareProjects',
    }),
    cancelContainer() {
      this.$parent.showProjectSharing = false;
    },
    addEmail(_name,_email){
      if(_email){
        this.sendEventToSegment("share_window_email_entered")
        let checkInTeam = this.isEmailExist(this.users,_email);
        let duplicateCheck = this.isEmailExist(this.sharingEmails, _email);
        if(duplicateCheck && duplicateCheck.length > 0){
          this.message.global = true;
          this.message.error = true;
          this.message.value = 'You have already listed this email!',
          setTimeout(() => {
              this.message.value = '';
              this.message.global = false;
              this.message.error = false;
          }, 2000);
          return;
        }
        // let checkInTeam = this.users.filter((item)=> item.email === _email);
        console.log('check In Team', checkInTeam);
        if(checkInTeam && checkInTeam.length > 0){
          this.sharingEmails.push({name:checkInTeam[0].name, email: checkInTeam[0].email});
        }else {
          if (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(_email))
             this.sharingEmails.push({name: _name,email: _email})
          else {
            this.message.global = true;
            this.message.value ='Invalid Email!';
            this.message.error = true;
            setTimeout(()=> {
              this.message.global = false;
              this.message.value = '';
              this.message.error = false;
            },3000)
            return;
          }

        }
        this.inputEmail='';
      }
    },
    isEmailExist(_emailsList, _checkingEmail){
      return _emailsList.filter((item)=> item.email === _checkingEmail);
    },
    closePopup(){
      this.sendEventToSegment("share_window_closed")
      this.sharingEmails = [];
      this.inputEmail = '';
      this.$parent.showProjectSharing = false;
    },
    removeFromInviteList(_member){
      let index = this.sharingEmails.map((el)=> el.email).indexOf(_member)
      console.log('index------>', index);
      if (index !== -1) {
        this.sharingEmails.splice(index, 1)
      };
    },
    copyToClipBoard(event) {
      var dummy = document.createElement('input'),
      text =  this.sharingUrl;
      document.body.appendChild(dummy)
      dummy.value = text;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      // window.analytics.track('gallery_copy_link_clicked', {
      //     title: 'Clicked on copy link on share pop-up',
      //     subtitle: 'Clicked on copy link on share pop-up',
      // }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });

      this.message.error = false;
      this.message.value = '&#10004; Copied successfully';
      this.message.global = true;
      setTimeout(() => {
            this.message.global = false;
            this.message.value = '';
        }, 4000);
    },
    selectAllTeam(){
      if(this.users){
        this.users.forEach((ele)=> {
          if(ele._id !== this.user._id){
            this.removeFromInviteList(ele.email);
            if(!this.allMemberSelect){
              this.sendEventToSegment("select_team_user_selected")
              this.sharingEmails.push({name: ele.name, email:ele.email});
            }
          }
        })
      }
    },
    memberSelected(){
      // console.log('Mapping',_member)
      // this.allMemberSelect = true;
      let checkAllTeam = [];
      let checkIndex;
      checkAllTeam = this.users.filter((item)=> {
        checkIndex = this.sharingEmails.map((el)=> el.email).indexOf(item.email);
        return  checkIndex === -1 ? false : true;
      })
      console.log('SHaringEmails->', this.sharingEmails, 'foundedIndex', checkAllTeam)
      if(checkAllTeam && checkAllTeam.length === (this.users.length - 1)){
          this.allMemberSelect = true;
      }else {
        this.allMemberSelect = false;
      }
      console.log('finding Array', checkAllTeam);
    },
    onClickUpdate(_member,_type){
      let sendingEmails = [];
      this.isPermissionDropdown =false;
      let tempObj= {}
      if(_type){
        if(_type === 'set'){
          this.addEmail('',this.inputEmail)
          this.sendEventToSegment("share_window_done_clicked")
          if(this.sharingEmails && this.sharingEmails.length > 0){
            this.sharingEmails.forEach((record)=> {
              if(record.email)
              sendingEmails.push(record.email);
            });
            tempObj = {
              project: this.projectDetails._id,
              emails: sendingEmails,
              accessType:_type === 'set' ? this.setPermission : this.changePermission,
            }
            this.shareProjectWith(tempObj).then((response)=> {
              console.log('response--',response);
              if(response && response.statusCode && response.statusCode === 200){
                // this.message.error = true;
                if(this.invalidEmails && this.invalidEmails.length > 0){
                  this.isInvalidError = true;
                  // console.log('Invalid emails', this.invalidEmails.length)
                  this.message.global = true;
                  this.message.value = response.message ? response.message : 'Updated Successfully.';
                  setTimeout(() => {
                    this.message.global = false;
                    this.message.value = "";
                    // this.$parent.showProjectSharing = false;
                  }, 3500);
                }else {
                  // this.$parent.showProjectSharing = false;
                  this.$root.$emit("close-project-sharing", {value: response.message ? response.message : 'Updated Successfully.'});
                  this.sharingEmails = [];
                }
                this.message.global = true;
                this.message.value = response.message ? response.message : 'Updated Successfully.';
                setTimeout(() => {
                  this.message.global = false;
                  this.message.value = "";
                  // this.$parent.showProjectSharing = false;
                }, 3500);
              }
            }).catch((_response)=>{
              if(_response && _response.data && _response.data.err){
                this.message.global = true;
                this.message.error = true;
                this.message.value = _response.data.err.message ? _response.data.err.message : 'Internal Server Error!';
                setTimeout(() => {
                  this.message.global = false;
                  this.message.value = "";
                  this.message.error = false;
                }, 2500);
              }
            });
          }else {
            if(!this.inputEmail){
              this.message.global = true;
              this.message.error = true;
              this.message.value = 'Please enter at least one email';
              setTimeout(() => {
                this.message.global = false;
                this.message.value = "";
                this.message.error = false;
              }, 2500);
            }
          }
        }else if(_type === 'update'){
            tempObj = {
              project: this.projectDetails._id,
              email: _member.email,
            }
            this.removeFromShareProjects(tempObj).then((response)=> {
            this.sendEventToSegment("access_removed")
            console.log('response--',response);
            if(response && response.statusCode && response.statusCode === 200){
              // this.message.error = true;
              this.message.global = true;
              this.message.value = response.message ? response.message : 'Updated Successfully.';
              setTimeout(() => {
                this.message.global = false;
                this.message.value = "";
              }, 2500);
            }
          }).catch((_response)=>{
              console.log('ERROR', _response);
            if(_response && _response.data && _response.data.err){
              this.message.global = true;
              this.message.value = _response.data.err.message ? _response.data.err.message : 'Internal Server Error!';
              setTimeout(() => {
                this.message.global = false;
                this.message.value = "";
              }, 2500);
            }
          });
        }else {
          console.log('Type is missing in update')
        }
      }
    },
    onClickInvite() {
      this.newMember = true;
    },
    sendEventToSegment(_eventName){
      if (window.analytics) {
        window.analytics.track(_eventName, {
            title: _eventName,
          }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      }
    },
    checkLangAndReturnLangCode() {
      switch(this.$i18n.locale) {
          case "ja": {
            return "&lang=ja&isAtlasSearchEnabled=true"
          }
          case "es": {
            return "&lang=es&isAtlasSearchEnabled=true"
          }
      }

      return ""
    }
  }
};
</script>
<style lang="scss" scoped>
.project-sharing-container {
  p{
    margin: 0;
  }
  .bg-pattern {
    position: absolute;
    opacity: 0.08;
    right: 0;
    top: 1rem;
    z-index: 0;
  }
  background-image: url("~assets/images/bg-rect.svg");
  background-repeat: no-repeat;
  background-position: top -2rem right -3rem;
  .popup-head {
    // background-position-y: center;
    h2 {
      font-weight: normal;
      font-size: 1.5rem;
      line-height: 2.375rem;
      text-align: center;
      color: #D48E8E;
      margin-bottom: 0.5rem;
    }
    p {
      // padding-top: 1rem;
      font-size: 1.2rem;
      line-height: 2rem;
      text-align: center;
      color: #D1D1D1;
    }
  }
  .popup-details {
    max-height: max-content;
    max-height: 66vh !important;
    .email-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 1rem 0;
      align-items: center;
      .email, span p{
        margin: 0;
        font-weight: 500;
        font-size: 1rem;
        line-height: 1rem;
        color: #FFFFFF;
      }
      span {
        justify-self: end;
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        column-gap: 0.5rem;
        p {
          color: #EBBEB5;
        }
      }
      .select-team {
        position: relative;
        cursor: pointer;
        .team-select-dropdown {
          display: grid;
          grid-auto-flow: row;
          row-gap: 1rem;
          // width: 18rem;
          // height: 14.6644rem;
          background: #1E1E1E;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
          position: absolute;
          right: 0;
          top: 2rem;
          z-index: 1;
          .list-of-members {
            max-height: 12rem;
            overflow: scroll;
          }
          .styled-checkbox {
            position: absolute; // take it out of document flow
            opacity: 0; // hide it
            & + label {
              position: relative;
              cursor: pointer;
              padding: 0;
            }
            // Box.
            & + label:before {
              content: '';
              margin-right: 10px;
              display: inline-block;
              vertical-align: text-top;
              width: 15px;
              height: 15px;
              border: 1px solid white;
              // background: white;
            }

            // Box hover
            // &:hover + label:before {
            //   background: #f35429;
            // }

            // Box focus
            // &:focus + label:before {
            //   box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
            // }

            // Box checked
            &:checked + label:before {
              background: #EBBEB5;
              border: 1px solid #E9BEB3;
            }

            // Disabled state label.
            // &:disabled + label {
            //   color: #b8b8b8;
            //   cursor: auto;
            // }

            // Disabled box.
            // &:disabled + label:before {
            //   box-shadow: none;
            //   background: transparent;
            // }

            // Checkmark. Could be replaced with an image
            &:checked + label:after {
              content: '';
              position: absolute;
              left: 3px;
              top: 7px;
              background: #222021;
              width: 2px;
              height: 2px;
              box-shadow:
                2px 0 0 #222021,
                4px 0 0 #222021,
                4px -2px 0 #222021,
                4px -4px 0 #222021,
                4px -6px 0 #222021,
                4px -8px 0 #222021;
              transform: rotate(45deg);
            }
          }
          .member,.select-all {
            position: relative;
            cursor: pointer;
            // display: grid;
            // grid-template-columns: max-content 1fr;
            // justify-self: left;
            width: 100%;
            // height: 2rem;
            padding: 0.5rem 0;
            padding-left: 1rem;
            input {
              /* Hide the browser's default checkbox */
              position: absolute;
              opacity: 0;
              cursor: pointer;
              height: 0;
              width: 0;
            }
            label {
              cursor: pointer;
              font-size: 1rem;
            }
            // p {
            // color: white;
            // }
          }
          .select-all {
            font-weight: 500;
            background: #3A393A;
            padding: 0.7rem;
          }
          button {
            // width: 15rem;
            height: 2.5rem;
            background: #3A393A;
            margin-bottom: 1rem;
            color: #E9BEB3;
            cursor: pointer;
            // position: relative;
            // @include background-animate(#e9beb3, black);

          }
        }
      }
    }
    .main-input-container{
      width: 50rem;
      // height: 82.09px;
      border: 1px solid #4D4C4D;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 80% 1fr;
      align-items: center;
      padding: 1rem;
      .input-items {
        // display: grid;
        // grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
        position: relative;
        display: flex;
        flex-wrap: wrap;
        span {
          width: max-content;
          // height: 3rem;
          margin-right: 1rem;
          margin-bottom: 0.5rem;
          // margin-right: 1rem;
          background: #4D4C4D;
          display: grid;
          grid-template-columns: max-content max-content;
          align-items: center;
          padding: 0.5rem;
          p{
            padding:0 0.5rem;
            font-style: normal;
            font-weight: 500;
            font-size: 10px;
            line-height: 12px;
            color: #E8E8E8;
          }
          svg {
            width: 2rem;
            cursor: pointer;
            // padding-right:1rem;
          }
        }
        input {
          background: transparent;
          color: white;
          outline: none;
          border: none;
          flex-grow: 1;
          // width: 100%;
        }
        .email-suggestions {
          position: absolute;
          width: 21.9262rem;
          background: #1E1E1E;
          display: grid;
          grid-auto-rows: minmax(max-content,max-content);
          top: 108%;
          max-height: 15rem;
          overflow: scroll;
          .sug-item {
            cursor: pointer;
            padding: 1rem;
            border: 1px solid #E9BEB3;
            color: white;
            display: grid;
            p:nth-child(1){
              font-size: 1rem;
            }
            p:nth-child(2){
              color: gray;
            }
            // position: relative;
            // @include background-animate(#e9beb3, black);
          }
        }
      }
      .view-permissions {
        position: relative;
        .main-permission-btn {
          // cursor: pointer;
          height: 2.5rem;
          background: #1A1A1A;
          display: grid;
          // grid-template-columns: 60% max-content;
          align-items: center;
          justify-items: center;
          column-gap: 1rem;
          width: 8rem;
          justify-content: center;
          p{
            text-transform: capitalize;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 12px;
            color: #FFFFFF;
          }
          svg {

          }
        }
        .permissions-dropdown {
          right: 1.3rem !important;
        }
      }
    }
    .shared-box-title {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #FFFFFF;
      padding: 1rem 0;
    }
    .tool-tip {
      position: relative;
      .invalid-emails {
        padding-top: 0.5rem;
        font-size: 0.8rem;
        // color: white;
        color: #e57373;

        b {
          cursor: pointer;
          font-weight: normal;
          // color: #EBBEB5;
          color: white;
          text-decoration: underline;
        }
      }
      .invalid-emails-tooltip {
        position: absolute;
        top: -1.7rem;
        left: 10rem;
        background: black;
        color: #D1D1D1;
        padding: 0.5rem;
        display: grid;
        grid-auto-flow: column;
        column-gap: 0.5rem;
        p {
          font-size: 0.8rem;
        }
      }
    }
    .shared-with {
      width: 100%;
      min-height: 9.6013rem;
      // max-height: 12rem;
      overflow: scroll;
      padding: 1rem;
      background: #303030;
      // display: grid;
      .user-permission-info {
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        align-items: center;
        column-gap: 1rem;
        padding: 0.5rem 0;
        p {
          font-weight: 500;
          font-size: 1rem;
          line-height: 0.5rem;
          color: #D1D1D1;
        }
        .permission-title {
          position: relative;
          .view-permission {
            cursor: pointer;
            display: grid;
            grid-template-columns: 1fr max-content;
            align-items: center;
            column-gap: 0.5rem;
            p{
              text-transform: capitalize;
            }
          }
          p {
            // font-weight: 500;
            font-size: 0.9rem;
            line-height: 1rem;
            color: #FFFFFF;
          }
          .permissions-dropdown {
            right: 0;
            top: 1.4rem;
          }
        }
      }
      .no-data {
        p {
          font-size: 1rem;
          color: grey;
          text-align: center;
        }
      }
    }
    .no-data-container {
      display: grid;
      align-items: center;
    }
    .link-container {
      // height: 32px;
      display: grid;
      grid-template-columns: max-content 1fr max-content;
      grid-gap: 1rem;
      border: 1px solid #4d4c4d;
      align-items: center;
      margin-bottom: 2rem;
      p,svg {
        font-size: 12px;
        line-height: 16px;
        margin: 0 0.5rem 0 0.5rem;
        color: #868686;
        //  background: #e9beb3;
        //   width: max-content;
        //   color: #292929;
      }
      svg {
        margin-left: 1rem;
      }
      p {
        color: #E9BEB3;
        font-weight: 500;
        margin-right: 1rem;
        font-size: 1.1rem;
      }
      .sharing-url {
        background: #C4C4C4;
        color: black;
        margin: 0.6rem;
        padding: 0.3rem;
        width: max-content;
        font-size: 1rem;
      }
    }
    .button-container{
      display: grid;
      justify-content: center;
      .done-btn {
        cursor: pointer;
        position: relative;
        padding: 0.5rem 2rem;
        background: #E9BEB3;
        font-family: 'montserrat';
        font-weight: 500;
        // @include background-animate(#e9beb3, black);
      }
    }
    .permissions-dropdown {
      // .dropdown-holder, .permissions-list {
      //   position: absolute;
      // }
      // .dropdown-holder {
      //   position: absolute;
      //   top: 1.55rem;
      //   right: 0;
      // }
      position: absolute;
      display: grid;
      justify-items: end;
      right: 1rem;
      .permissions-list {
        display: grid;
        // grid-template-rows: repeat(3,2.3rem);
        top: 2rem;
        align-items: center;
        padding-top: 0.3rem;
        width: 10rem;
        background: #1E1E1E;
        z-index: 1;
        p {
          text-transform: capitalize;
          color: white;
          font-size: 0.8rem !important;
          padding: 0.7rem;
          cursor: pointer;
          &:hover{
            background: #E9BEB3;
            color: #1E1E1E;
          }
        }
      }
    }
  }
}
</style>


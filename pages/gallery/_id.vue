<template>
  <section class="main-container" v-if="selectedRender">
    <div class="sub-menu-nav-container">
      <div class="sub-menu-first"></div>
      <div class="sub-menu-second">
          <div @click.stop="goToEnhance">
            <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.429 16L3.35352 2.90393L4.54202 2.28877L13.6175 15.3848L12.429 16Z" stroke="white" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M4.86681 5.34997L3.12305 2.83368L4.3113 2.21865L6.05507 4.73494L4.86681 5.34997Z" fill="white"/>
            <path d="M7.02035 2.33478C7.29735 1.73615 7.78211 1.49669 8.47461 1.43683C7.85136 1.13751 7.50511 0.778324 7.50511 0.179688C7.22811 0.71846 6.74335 1.01778 6.05084 1.07764C6.6741 1.3171 7.02035 1.73615 7.02035 2.33478Z" fill="white"/>
            <path d="M1.40905 6.76446C1.68605 6.16582 2.17078 5.92637 2.86328 5.86651C2.24003 5.56719 1.89379 5.20801 1.89379 4.60938C1.61679 5.14815 1.13203 5.44747 0.439534 5.50733C1.06278 5.74678 1.40905 6.16582 1.40905 6.76446Z" fill="white"/>
            <path d="M1.06265 1.43672C1.2704 1.07754 1.54739 0.897951 1.96289 0.838087C1.54739 0.658496 1.33965 0.419046 1.33965 0C1.1319 0.359182 0.854886 0.538773 0.439387 0.598637C0.854886 0.778227 1.06265 1.07754 1.06265 1.43672Z" fill="white"/>
            </svg>
            <p>Enhance Render</p>
          </div>
      </div>
      <div class="sub-menu-third">
        <button @click.stop="socialShareCall(selectedRender._id)">Share</button>
        <svg @click.stop="downloadRender" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.609375 9.16327V17H21.2586V9.16327" stroke="white" stroke-miterlimit="10"/>
        <path d="M14.1441 10.1429L10.7445 12.9728L7.72266 10.1429" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M10.7441 12.9728V1" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
        <svg @click.stop="deleteConfirmWindow = true" width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.71484 5.72726H13.333L12.1694 17H3.44212L2.71484 5.72726Z" stroke="white" stroke-miterlimit="10"/>
        <path d="M14.3507 3.18182H1.25977V5.72728H14.3507V3.18182Z" stroke="white" stroke-miterlimit="10"/>
        <path d="M6.35156 3.18182V1H9.98793V3.18182" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <div class="popup-div" :class="deleteConfirmWindow?'showPopUp':''">
        <div class="popup-container">
            <div class="close-popup" @click="deleteConfirmWindow = false">
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
                <h2>Are you sure you want to delete the render?</h2>
                <p class="sub-text">This action cannot be undone</p>
            </div>
            <div class="popup-details">

            </div>
            <div class="invite-button-container">
                <button class="cancel-button" @click.stop="deleteConfirmWindow = false">No</button>
                <button class="update-address" @click.stop="deleteRender">Yes</button>
            </div>
        </div>
    </div>
    <socialShare  :socialSharePopup="socialSharePopup" :url="shareUrl" :title="title" :description="description" :quote="quote" :hashtags="hashtags" :twitterUser="twitterUser" />
    <SelectedRenderComponent :render = selectedRender :otherRenders = renderPaged :user = user > </SelectedRenderComponent>
    <MessageComponent :changeRight="message" />
  </section>
  <div v-else class="main-loading">
    <div class="loading-container">
      <p>Loading...</p>
      <div class="loader"></div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations } from "vuex";
import SelectedRenderComponent from '../../components/selected_render.vue';
import socialShare from "@/components/shared/socialsharing.vue";


export default {
  layout: "dashboard",
  middleware: ["initAuth", "authReq"],
  components: { SelectedRenderComponent, socialShare },
  head() {
    return {
      title: "Neo - Gallery"
    };
  },
  data(){
    return{
        message: {
            value: "",
            error: false,
            global:false,
        },
        enhance:true,
        mainImageUrl:undefined,
        socialSharePopup: false,
        shareUrl:"",
        title:"Renders from neo",
        description:"Check out my latest render on Foyr NEO - Lighting fast interior design software",
        quote:"",
        hashtags:"#render #neo #interiordesign #fastrendering #foyr",
        twitterUser:"",
        deleteConfirmWindow:false,
        
    }
  },
  mounted() {
    // this.selectedRender=this.$route.params.id
    if(this.$route.query.project){
      this.$store.state.Render.viaProject = this.$route.query.project
    }
    if(!this.selectedRender && this.user){
      // this.renderPaged.find(res => {
      //   if(res._id == this.$route.params.id)
      //   this.setSelectedRender(res)
      // })
      this.fetchRenderById({"renderIdList": [this.$route.params.id],
      "accountId": this.user.accountId}).then(res => {
        this.setSelectedRender(res.data[0])
      })
      
    }
  },
  computed: {
    ...mapState({
        selectedRender: state => state.Render.selectedRender,
        renderPaged:state => state.Render.renderPaged,
        user:state => state.User.user
    }),
  },
  watch: {
    user:function(userData){
      this.fetchRenderById({"renderIdList": [this.$route.params.id],
	      "accountId": userData.accountId}).then(res => {
        this.setSelectedRender(res.data[0])
      })
      if(this.$route.query.project){
        this.$store.state.Render.renderPaged = []
        this.fetchRenderPage({accountId:userData.accountId,"page": 1,
        "limit": 20,
        "project":this.$route.query.project,
        "sortBy": { updatedAt : -1 }},{root:true})
      }
    }
  },
  methods : {
    ...mapActions({
      setSelectedRender: "Render/setSelectedRender",
      _deleteRender:'Render/deleteRenderFromPage',
      _shareRender:'Render/shareRender',
      fetchRenderById:'Render/fetchRenderById',
      fetchRenderPage:'Render/fetchRenderPage'
    }),
    ...mapMutations({
        setSelectedRender: "Render/setSelectedRender"
    }),
    goToEnhance(){
      if(window.analytics)
      window.analytics.track('gallery_enhance_mode_opened', {
          title: 'Clicked on Enhance Render',
          subtitle: 'Clicked on Enhance Render',
      }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      this.$router.push('/gallery/enhance/'+this.$route.params.id)
    },
    downloadRender(){
      if(window.analytics)
      window.analytics.track('gallery_renderview_download_clicked', {
          title: 'Download button clicked on individual render view',
          subtitle: 'Download button clicked on individual render view',
      }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      var link = document.createElement('a');
      link.href = this.mainImageUrl;
      link.download = 'render.jpg';
      document.body.appendChild(link);
      link.click();
      this.downloading = undefined;
      document.body.removeChild(link);
    },
    deleteRender(n){
      if(window.analytics)
      window.analytics.track('gallery_renderview_delete_clicked', {
          title: 'Delete button clicked on individual render view',
          subtitle: 'Delete button clicked on individual render view',
      }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      this._deleteRender({'renderIdList':[this.$route.params.id]}).then(res => {
        let indexFound = 0;
        this.renderPaged.find( (item,index) => {
            if(item._id == this.selectedRender._id){
              indexFound = index
            }
        });
        this.setSelectedRender(this.renderPaged[indexFound+1])
        this.$router.push('/gallery/'+this.renderPaged[indexFound+1]._id)
      })
    },
    socialShareCall(n){
      if(window.analytics)
      window.analytics.track('gallery_renderview_share_clicked', {
          title: 'Share button clicked on Individal render view',
          subtitle: 'Share button clicked on Individal render view',
      }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
      
      this._shareRender([n]).then(res => {
        this.shareUrl = `${window.location.origin}/share/${res.data._id}`
        // this.shareUrl = "http://neostaging.foyr.com/gallery/shared/5eb1a31c5787f8055d3200b5"
        this.socialSharePopup = true;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.main-loading{
    height: calc( 100vh - 3.75rem )
}
.sub-menu-nav-container{
  background: #0E0E0E;
  height: 3.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  padding: 0px 1.5625rem;
  .sub-menu-first{
    
  }
  .sub-menu-second{
    div{
      display: grid;
      grid-template-columns: max-content max-content;
      grid-column-gap: 6px;
      padding: 0.5rem 0.75rem;
      border: 1px solid #E9BEB3;
      position: relative;
      z-index: 0;
      @include background-animate(#e9beb3, black);
      cursor: pointer;
      p{
        color: #D1D1D1;
        font-size: 0.875rem; 
        margin: 0px;
      }
      &:hover p{
        color: black;
      }
    }
  }
  .sub-menu-third{
    justify-self: flex-end;
    display: grid;
    grid-template-columns: max-content max-content max-content;
    grid-column-gap: 20px;
    align-items: center;
    button{
      color: #D1D1D1;
      font-size: 0.875rem; 
      margin: 0px;
      padding: 0.6rem 0.75rem;
      border: 1px solid #E9BEB3;
      z-index: 0;
      position: relative;
      @include background-animate(#e9beb3, black);
      cursor: pointer;
    }
    svg{
      cursor: pointer;
    }
  }
}
</style>

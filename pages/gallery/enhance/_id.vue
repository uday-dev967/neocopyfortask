<template>
    <div class="dash-lay">
        <navbar id="nav"></navbar>
        <div class="render-enhance-page">
            <p class="backToGallery" @click.stop="backToRender()">	&lt;  Back</p>
            <RenderEnhance v-if="selectedRender" :render = selectedRender :key='reRenderKey'></RenderEnhance>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState,mapGetters, mapMutations } from "vuex";
import RenderEnhance from "../../../components/shared/renderEnhance.vue";
import navbar from '@/components/shared/mainNav'
export default {
  middleware: ["initAuth", "authReq"],
  components: { RenderEnhance, navbar },
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
      reRenderKey:0
    }
  },
  mounted() {
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
    // renderPaged:function(renderResult){
    //   console.log(renderResult)
    //   renderResult.find(res => {
    //     if(res._id == this.$route.params.id)
    //       this.$store.state.Render.selectedRender = res;
    //     // console.log(res , this)
    //   })
    // }
    user:function(userData){
      this.fetchRenderById({"renderIdList": [this.$route.params.id],
	      "accountId": userData.accountId}).then(res => {
        this.setSelectedRender(res.data[0])
      })
    }
  },
  methods : {
    ...mapActions({
      fetchRenderById:'Render/fetchRenderById',
    }),
    ...mapMutations({
        setSelectedRender: "Render/setSelectedRender",
        setActiveTab:"Render/setActiveTab"
    }),
    backToRender(){
      this.$router.push('/gallery/'+this.$route.params.id)
      this.setActiveTab("brand");
    }
  }
};
</script>
<style lang="scss" scoped>
.dash-lay{
  display: grid;
  grid-template-rows: max-content 1fr;
  height: 100vh;
  
}
.render-enhance-page{
    padding: 1.75rem 3.75rem;
    background: #FBF3F1;
    .backToGallery{
      text-decoration: none;
      color: #4D4C4D;
      cursor: pointer;
      margin: 0px;
      width: max-content;
    }
}
</style>
const state = {
    render:null,
    download:[],
    selectedRender:undefined,
    renderPaged:null,
    renderByProject:null,
    lightingMenuOptions:undefined,
    progress:{},
    viaProject:undefined,
    renderCount:0,
    brands:[],
    activeTab: "brand",
    sampleRenders: []
}

const getters = {
    filterProjects: (state) =>(project,selectedProject) =>{
      let renders = project
      let render = false;
      renders.forEach(element => {
        element.render=[]
        state.render.forEach(item => {
            if(item.project == element._id)
            {
              element.render.push(item)
              render = true;
            }

        });
      });
      if(selectedProject === "undefined" && render)
        return renders
      else if(render)
        {
          return renders.filter(pro =>{
            return pro._id  === selectedProject
          })
        }
      else
        return render
    },
    filterDownload: (state) => (id) =>{
      return state.download.find(elm =>{
        return elm == id;
      })
    }
}

const actions = {
    fetchRender({commit}){
        const url = `/renders/account`;
        return this.$axios
        .$get(url)
        .then(res => {
          commit("setRender", res.result);
          return res;
        })
        .catch(err => {
          commit("setRender",[])
          throw err.response;
        });
    },
    
    downloadRender({},params){
      const url ="/renders/settings/signedurl/uri?uri="+params.uri
      return this.$axios
      .$get(url)
      .then(res => res)
      .catch(err =>{
        throw err.response;
      })
    },
    async fetchRenderPage({commit,dispatch},data){
      const url = `/rm/render/list`
      try {
        let renderList = await this.$axios.$post(url,data)
        let renderConutResponse = await dispatch('fetchRenderCount',data.accountId)
        commit("setRenderPaged", renderList.data);
        return renderList;
      } catch (error) {
        commit("setRenderPaged",[])
        console.error(error)
      }
    },
    fetchRenderListByProject({commit},data){
      // const url = `/rm/render/projects`
      const url = `/fp/v2project/rendercountbyproject`
      return this.$axios
      .$post(url,data)
      .then(res => {

        commit("setRenderByProject", res);
        return res;
      })
      .catch(err => {
        commit("setRenderByProject",[])
        throw err.response;
      });
    },
    async fetchRenderById({commit},data){
      const url = `/rm/render/list`
      try {
        let renderList = await this.$axios.$post(url,data)
        // commit("selectedRender", renderList.data);
        return renderList;
      } catch (error) {
        commit("selectedRender",[])
        console.error(error)
      }
    },
    async updateRenderData({commit},data){
      const url = `/rm/render/update`
      try {
        let renderUpdateResponse = await this.$axios.$post(url,data)
        //commit("setRenderPaged", renderList.data);
        return renderUpdateResponse;
      } catch (error) {
        //commit("setRenderPaged",[])
        console.error(error)
      }
    },
    async deleteRender({dispatch,rootState,state},data){
      const url = `/rm/render/delete`
      try {
        let renderDeleteResponse = await this.$axios.$post(url,data)
        state.renderPaged = null
        dispatch('fetchRenderPage',{'accountId':rootState.User.user.accountId,"page": 1,
        "limit": 20,
        "sortBy": { updatedAt : -1 }});
        return renderDeleteResponse;
      } catch (error) {
        //commit("setRenderPaged",[])
        console.error(error)
      }
    },
    async deleteRenderFromPage({dispatch},data){
      const url = `/rm/render/delete`
      try {
        let renderDeleteResponse = await this.$axios.$post(url,data)
        return renderDeleteResponse;
      } catch (error) {
        //commit("setRenderPaged",[])
        console.error(error)
      }
    },
    async cloneRender({dispatch,rootState,state},data){
      const url = `/rm/render/clone`
      try {
        let renderCloneResponse = await this.$axios.$post(url,data)
        //commit("setRenderPaged", renderList.data);
        state.renderPaged = null
        dispatch('fetchRenderPage',{'accountId':rootState.User.user.accountId,"page": 1,
        "limit": 20,
        "sortBy": { updatedAt : -1 }});
        return renderCloneResponse;
      } catch (error) {
        //commit("setRenderPaged",[])
        console.error(error)
      }
    },
    async shareRender({dispatch},data){
      const url = `/rm/gallery`
      try {
        let renderGalleryResponse = await this.$axios.$post(url,{'renderIdList':data})
        //let getSharedRenderResponse = await dispatch('getSharedRender',renderGalleryResponse.data._id)
        return renderGalleryResponse;
      } catch (error) {
        //commit("setRenderPaged",[])
        console.error(error)
      }
    },
    async getSharedRender({state},galleryId){
      const url = `/rm/gallery/${galleryId}`
      try {
        let renderGalleryResponse = await this.$axios.$get(url)

        return renderGalleryResponse;
      } catch (error) {
        //commit("setRenderPaged",[])
        console.error(error)
      }
    },
    async enhanceImageUrl({dispatch},data){
      const url = `/rm/render/enhancedimage`
      try {
        console.log(data)
        let renderEnhanceUrl = await this.$axios.$post(url,{'renderId':data.renderId})
        let uploadResponse = await dispatch('uploadFile',{url:renderEnhanceUrl.data.enhancedImage,'payload':data.payload})
        let uploadThumnailResponse = await dispatch('uploadFile',{url:renderEnhanceUrl.data.eIThumbnail,'payload':data.thumnail})
        let renderUpdateResponse  = await dispatch('updateRenderData',
        {
          'renderId':data.renderId,
          //'enhancedImage':renderEnhanceUrl.data.substring(0, renderEnhanceUrl.data.indexOf("?")),
          'info':{
            'enhanceOptions':data.enhanceOptions
          }
        })
        return renderEnhanceUrl;
      } catch (error) {
        //commit("setRenderPaged",[])
        console.error(error)
      }
    },
    async getBrandImageUrl({dispatch},data){
      const url =`/renders/settings/signedBrandUrl`;
      try {
        let brandImageResponse = await this.$axios.$get(url)
        let uploadResponse = await dispatch('uploadFile',{url:brandImageResponse.data.url,'payload':data})
        return brandImageResponse.data.url;
      } catch (error) {
        console.error(error)
      }
    },
    uploadFile({ dispatch }, payload) {
      var xhr = new XMLHttpRequest();
      var buf = new Buffer(payload.payload.replace(/^data:image\/\w+;base64,/, ""),'base64')

      return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
            if (xhr.status >= 300)
              // dispatch("update", {
              //     dpUrl: payload.url.substring(0, payload.url.indexOf("?"))
              // });
              reject("Error, status code = " + xhr.status)
            else {
              resolve(xhr.responseText);
            }
          }
        };
        xhr.upload.onprogress = event => {
            var progress = Math.round((event.loaded / event.total) * 100);
            //this.progressNotifier.next({ progress: progress, file: file });
        };
        xhr.open("PUT", payload.url, true);
        // xhr.setRequestHeader("Content-Type", "image/jpeg");
        xhr.setRequestHeader("ContentEncoding", "base64")
        xhr.send(buf);
      })
    },
    // //get s3 url for image upload
    fetchLightingJsonOptions({ commit }) {
      const url = `/settings/lighting`;
      return this.$axios
          .$get(url)
          .then(res => {
              commit('updateLightingJsonOptions',res)
              return res
          })
          .catch(err => err);
    },
    takeRender({dispatch,rootState},payload){
      const url=`/renders`
      return this.$axios
          .$post(url,payload)
          .then(res => {
            state.renderPaged = null
            let data = {'accountId':rootState.User.user.accountId,"page": 1,
            "limit": 20,
            "sortBy": { updatedAt : -1 }}
            if(state.viaProject)
              data.project = state.viaProject;
            dispatch('fetchRenderPage',data);
            return res
          })
          .catch(err => err);
    },
    searchRender({commit},payload){
      const url=`/renders/search`
      return this.$axios
          .$post(url,payload)
          .then(res => {
            commit("setRenderPaged", res.data);
            return res
          })
          .catch(err => err);
    },
    async fetchRenderCount({commit},accountId){
      try {
        const url = `/rm/render/count/${accountId}`
        let renderCountResponse = await this.$axios.$get(url)
        commit('setRenderCount',renderCountResponse.data)
        return renderCountResponse
      } catch (error) {
        console.log(error)
      }

    },
    async saveBrandTemplate({commit},data){
      try {
        const url = `/dr/brandTemplates`
        let brandTempateResponse = await this.$axios.$post(url,data)
        //commit('setRenderCount',renderCountResponse.data)
        // console.log(brandTempateResponse)
        return brandTempateResponse
      } catch (error) {
        console.log(error)
      }

    },
    async getBrandTemplate({commit,dispatch},data){
      try {
        const url = `/dr/brandTemplates?page=1&limit=20`
        let brandTempateResponse = await this.$axios.$get(url)
        // brandTempateResponse.data.forEach( async brand => {
        //   brand.signedUrl = await dispatch('downloadRender',{uri:brand.imageUrl})
        // })
        commit('setBrands',brandTempateResponse.data)
        return brandTempateResponse
      } catch (error) {
        console.log(error)
      }

    },
    fetchRandomizeSampleRenders({commit}, payload=10){
      let url = `/render-samples?limit=${payload}`;

      return this.$axios
      .$get(url)
      .then( ( res ) => {
        console.log("ressssssssssss", res)
        commit( "setSampleRenders", res && res.data || [] );
      } )
      .catch( ( err ) => {
        console.log( err );
      } );
    },
}

const mutations = {
  setRender:(state, data) =>{
    state.render = data;
  },
  setRenderPaged:(state,data)=>{
    if(!state.renderPaged)
      state.renderPaged = []
    state.renderPaged.push(...data);
  },
  downloadAck:(state,data) => {
    if(data.recived.status)
      state.download.push(data.sent.referenceId)
  },
  setDownload:(state,data) => {

    state.download.splice(state.download.indexOf(data.referenceId), 1);
  },
  setActiveTab:(state, data) => {
    state.activeTab = data
  },
  setProgress(state,{renderId,progress}){
    //state.progress = renderId+'.'+progress;
    // state.renderPaged.find(render => {
    //   if(render._id == renderId){
    //     render.progress = progress
    //   }
    // })
    let data = {};
    data[renderId] = progress
    state.progress = Object.assign({}, state.progress,data)
  },
  setSelectedRender:(state,data)=>{
    state.selectedRender = data;
  },
  setRenderByProject:(state, data) => {
    state.renderByProject = data
  },
  updateLightingJsonOptions: (state, data) => state.lightingMenuOptions = data,
  setRenderCount:(state,data) => state.renderCount = data,
  setBrands:(state,data)=> state.brands = data,
  setSampleRenders: ( state, data ) => state.sampleRenders = data,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

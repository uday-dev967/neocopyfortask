import Vue from "vue";
import qs from 'query-string';
import { setClassToBody } from "../../helpers/utilFunctions";

const defaultPageSize = 40;

const state = {
    usersProjects: null,
    totalProjects: null,
    inspirations: null,
    usersAnnotations: null,
    sampleProjects: null,
    usersProjectsPagination: [],
    inspirationsWithPagination: [],
    designs: null,
    widgetId: null,
    inspirationsCount: 0,
    folderParentId: null,
    foldersTree: [],
    currentFoldersTree: [],
    totalFolders: [],
    totalBreadCrumbs: [],
    totalInspirations: [],
    projectSharedWith: [],
    invalidEmails: [],
    mobileSampleProjects: {},
    mobileRenders: {},
    sharedProjects: null,
    apInspirationsCategories: [],
    productionURLs: [ "neo.foyr.com", "neopreprod.foyr.com", "asianpaints.foyr.com" ],
    whiteLabeledURL: [ "asianpaints.foyr.com" ],
    selectedFolder: null,
    selectedFolderFoMove: null,
    folderHierarchy: {},
    userProjectsWithPagination: [],
    userSharedProjects: [],
    pageSize: defaultPageSize,
    pageNumber: 1,
    searchResultsForProjects: [],
    searchResultsForFolders: [],
    isDFUPopupVisible: false,
    showAIIdeateRedirectPopup: false,
    DFUTypeFormLink: "",
    showFoyrServicesPopup: false,
    showMainLoader: false,
}

const getters = {
    filterByText: (state) => (text) => {
        return state.inspirationsWithPagination
    },
    filterPdfName: (state) => (text, pdf) => {
        console.log(text)
        if (text == "")
            return pdf;
        return pdf.filter(x => {
            let re = new RegExp(text, "gi");;
            return x.match(re)
        })
    },
    apInspirationsCategories: state => state.apInspirationsCategories,
    inspirationsWithPagination: state => state.inspirationsWithPagination,
    inspirations: state => state.inspirations,
    isProductionMode: state => state.productionURLs.includes(window.location.host),
    isWhiteLabeledURL: state => state.whiteLabeledURL.includes(window.location.host),
    selectedFolder: state => state.selectedFolder,
    selectedFolderFoMove: state => state.selectedFolderFoMove,
    folderHierarchy: state => state.folderHierarchy,
    userProjectsWithPagination: state => state.userProjectsWithPagination,
    userSharedProjects: state => state.userSharedProjects,
    isDFUPopupVisible: state => state.isDFUPopupVisible,
    pageSize: state => state.pageSize,
    pageNumber: state => state.pageNumber,
    searchResultsForProjects: state => state.searchResultsForProjects,
    searchResultsForFolders: state => state.searchResultsForFolders,
    selectedFolderId: state => state.selectedFolder && state.selectedFolder._id || null,
    selectedFolderIdForMove: state => state.selectedFolderFoMove && state.selectedFolderFoMove._id || null,
    foldersToShow: (state, getters) => {
        if (!state.folderHierarchy) return []
        else if (state.folderHierarchy && !state.folderHierarchy.folders) return [] 
        return state.folderHierarchy.folders.filter(
            e => e.parent === getters.selectedFolderId
        )
    },
    showAIIdeateRedirectPopup: state => state.showAIIdeateRedirectPopup,
    DFUTypeFormLink: state => state.DFUTypeFormLink,
    showFoyrServicesPopup: state => state.showFoyrServicesPopup,
    showMainLoader: state => state.showMainLoader,
}

const actions = {
    fetchProjects({ commit }) {
        const url = `/fp/project?type=project`;
        return this.$axios
            .$get(url)
            .then(res => {
                console.log(res);
                commit("setProjects", res.data);
                commit("setSharedProjects", res.sharedProjects);
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    fetchProjectsWithPagination({state, getters, commit}, payload = null) {
        let url = "fp/v2project/projects/filtered";
        let defaultQueryObject = {
            shared: false,
            pageSize: state.pageSize,
            pageNumber: state.pageNumber,
            folderId: getters.selectedFolderId,
            isMBProject: false
        }
        let finalQueryObject = Object.assign(defaultQueryObject, payload || {})
        url += "?" + qs.stringify(finalQueryObject);

        return this.$axios
            .get(url)
            .then(res => {
                if (res && res.data && res.data.data) {
                    if (finalQueryObject.pageNumber === 1) {
                        commit("setUserProjectsWithPagination",res.data.data);
                    } else {
                        commit("setUserProjectsWithPagination",[...state.userProjectsWithPagination, ...res.data.data]);
                    }
                    return res.data.data;
                }

                return []
            })
            .catch(err => {
                throw err.response;
            });
    },
    fetchSharedProjects({ commit }) {
        let url = "fp/v2project/projects/filtered";
        url += "?" + qs.stringify({
            shared: true,
            pageSize: 1000,
            pageNumber: 1,
            isMBProject: false
        });

        return this.$axios
            .get(url)
            .then(res => {
                if (res && res.data && res.data.data) {
                    commit("setUserSharedProjects", res.data.data);
                    return res.data.data;
                }

                return []
            })
            .catch(err => {
                throw err.response;
            });
    },
    fetchProjectByUserId({ commit }, payload) {
        const url = `/fp/project?createdBy=${payload}`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setProjects", res.data);
            })
            .catch(err => {
                throw err.response;
            });
    },
    fetchSampleProjects({ commit }) {
        const url = `/fp/project/public?type=project`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setSampleProjects", res.data);
            })
            .catch(err => {
                throw err.response;
            });
    },
    fetchAnnotations({ commit }) {
        const url = `/fp/project?type=annotation`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setAnnotaions", res.data);
            })
            .catch(err => {
                throw err.response;
            });
    },
    async fetchInspirations({ commit, dispatch }, payload) {
        await dispatch('getWidgets')
        let preparedURL = '/fp/v2project/inspirations/details?type=template';
        if (payload && payload.pageSize && payload.pageNum) {
            preparedURL += '&PageSize=' + payload.pageSize + '&PageNumber=' + payload.pageNum;
        }

        if (payload && payload.customerBrand) {
            preparedURL += '&customerBrand=' + payload.customerBrand;
        }

        if (payload && payload.hasOwnProperty('search')) {
            preparedURL += '&search=' + payload.search;
        }
        
        const url = preparedURL;


        // const url = `/fp/project/inspirations?type=template`;
        try {
            let response = await this.$axios.$get(url);
            let designs = await dispatch('getDesignWidgets', state.widgetId)
            let inspiration = []
            response.data.forEach(element => {
                designs.data.find(item => {
                    if (item.project == element._id) {
                        element.widgetData = item;
                        inspiration.push(element)
                    }
                })
            });
            commit('setInspirations', inspiration);
            commit('setInspirationsCount', response);
            return inspiration;
        } catch (err) {
            console.log(err);
        }
    },
    async fetchInspirationsV2({ commit, dispatch }, payload = {}) {
        await dispatch('getWidgets')
        let preparedURL = '/fp/v2project/inspirationsv2/details?type=template';
        if (payload && payload.pageSize && payload.pageNum) {
            preparedURL += '&PageSize=' + payload.pageSize + '&PageNumber=' + payload.pageNum;
        }

        if (payload && payload.sortBy) {
            preparedURL += '&sortBy=' + payload.sortBy;
        }

        if (payload && payload.customerBrand) {
            preparedURL += '&customerBrand=' + payload.customerBrand;
        }

        if (payload && payload.hasOwnProperty('search')) {
            preparedURL += '&search=' + payload.search;
        }
        
        const url = preparedURL;


        // const url = `/fp/project/inspirations?type=template`;
        try {
            let response = await this.$axios.$post(url, payload.apFilters ? {apFilters: payload.apFilters} : {});
            let designs = await dispatch('getDesignWidgets', state.widgetId)
            let inspiration = []
            response.data.forEach(element => {
                designs.data.find(item => {
                    if (item.project == element._id) {
                        element.widgetData = item;
                        inspiration.push(element)
                    }
                })
            });
            commit('setInspirations', inspiration);
            commit('setInspirationsCount', response);
            return inspiration;
        } catch (err) {
            console.log(err);
        }
    },
    async fetchMobileInspirations({ commit, dispatch }, payload = null) {
        if (!payload) {
            payload = {
                pageSize: 10,
                pageNum: 1,
                search: "",
                // sortBy: "inspirationUsageCnt",
                mobileInspiration: true
            }
        }
        let preparedURL = '/fp/v2project/inspirationsv2/details?type=template';
        if (payload && payload.pageSize && payload.pageNum) {
            preparedURL += '&PageSize=' + payload.pageSize + '&PageNumber=' + payload.pageNum;
        }

        if (payload && payload.sortBy) {
            preparedURL += '&sortBy=' + payload.sortBy;
        }

        if (payload && payload.customerBrand) {
            preparedURL += '&customerBrand=' + payload.customerBrand;
        }

        if (payload && payload.hasOwnProperty('search')) {
            preparedURL += '&search=' + payload.search;
        }
        if (payload && payload.mobileInspiration) {
            preparedURL += '&mobileInspiration=' + true;
        }
        const url = preparedURL;

        try {
            let response = await this.$axios.$post(url, {});
            commit('setInspirations', response.data || []);
            // commit('setInspirationsCount', response);
            return response;
        } catch (err) {
            console.log(err);
        }
    },
    async fetchInspirationById({ commit, dispatch }, payload) {
        const url = '/products/inspirationProjectData/' + payload;
        try {
            let response = await this.$axios.$get(url);
            return response;
        } catch (err) {
            console.log(err);
        }
    },
    async getProductDynamicProperties({ commit, dispatch }) {
        let preparedURL = "/product/dynamic/properties";
        const url = preparedURL;
        
        try {
            let response = await this.$axios.$get(url);
            if ( response.data && response.data.length ) {

                const apInspirationCategories = response.data.find(e => e.formName === "aPINSPIRATION");
                // console.log(apInspirationCategories)
                if (
                    apInspirationCategories && 
                    apInspirationCategories.properties && 
                    apInspirationCategories.properties.length
                ) commit('setAPInspirationsCategories', apInspirationCategories.properties )
            }
            return response;
        } catch (err) {
            console.log(err);
        }
    },
    async selectedInspiration({ dispatch }, userId) {

        const url = `/fp/project/${userId}`;
        try {
            let response = await this.$axios.$get(url);
            let designs = await dispatch('fetchDesignByProject', response.data[0]._id)
            response.data[0].widgetData = designs.data[0]
            return response.data[0]
        } catch (err) {
            console.log(err)
        }
    },
    async fetchDesignByProject({ commit }, id) {
        const url = `/products/project/${id}`;
        try {
            let response = await this.$axios.$get(url)
            return response

        } catch (err) {
            console.log(err)
        }
    },
    newProject({ commit, dispatch }, payload) {
      let requestURL = ""
      if (window.$nuxt.$store.state.User.isBetaClicked)
        requestURL = `/fp/v2project`;
      else
        requestURL = `/fp/project`;

      if (payload.isMBProject) {
        requestURL += `?isMBProject=true`
      }
      return this.$axios
        .$post(requestURL, payload)
        .then(res => {
          dispatch('fetchProjects'); 
            if (payload.isMBProject) {
                res['isMBProject'] = true;
            } else if ( window.$nuxt.$store.state.User.isBetaClicked ) {
                res['v2Project'] = true;
            }
          return res;
        })
        .catch(err => {
          throw err.response;
        });
    },
    creatNewV2Project({ commit, dispatch }, payload) {
        let requestURL = `/fp/v2project`;
        return this.$axios
          .$post(requestURL, payload)
          .then(res => {
            dispatch('fetchProjects');
            res['v2Project'] = true;
            return res;
          })
          .catch(err => {
            throw err.response;
          });
    },
    cloneProject({ dispatch }, payload) {
        let url = `/fp/project/clone/${payload.id}`;
    
        if( payload.selectedProject && payload.selectedProject.v2Project ){
            // if user is inside try beta mode...call beta project clone api
            console.log("beta projects")
            url = `/fp/v2project/clone/${payload.id}`
        }

        if (payload.isMBProject) {
            url = `/fp/v2project/clone/${payload.id}?isMBProject=true`
        }
        return this.$axios
            .$post(url, payload)
            .then(res => {
                dispatch('fetchProjects');
                return res;
            })
            .catch(err => {
                throw err.response;
            });
    },
    projectsProducts({ commit }, payload) {
        const url = `/products/productlist?id=${payload}`;
        return this.$axios
            .$get(url)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                throw err.response;
            });
    },
    addToShortlist({ commit }, payload) {
        const url = `/shortlistproduct?accountId=${payload.accountId}`;
        return this.$axios
            .$post(url, payload.payload)
            .then(res => {
                return res;
            })
    },
    async getWidgets({ commit }) {
        const url = `/widget`
        try {
            let response = await this.$axios.$get(url)
            let res = response.data.find((elem) => {
                return elem.name == "designs";
            })._id
            commit('setDesignId', res);
        } catch (err) {
            console.log(err)
        }
    },
    getDesignWidgets({ commit }, payload) {
        const url = `/products/bywidget?widget=${payload}`
        return this.$axios
            .$get(url)
            .then(res => {
                commit('setDesigns', res.data)
                return res;
                // commit('addInspirationData',res.data)
            })
    },
    getProjectsWithPagination({ commit }, payload) {
        let preparedURL;
        if (payload && payload.pageSize && payload.pageNum) {
            preparedURL = '/fp/project?type=project' + '&PageSize=' + payload.pageSize + '&PageNumber=' + payload.pageNum;
        }
        const url = preparedURL ? preparedURL : `/fp/project?type=project`;
        console.log('url', url)
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setProjectsPagination", res);
                return res.data;
            })
            .catch(err => {
                throw err.response;
            });
    },
    deleteProject({ commit,dispatch }, payload) {
        let preparedURL;
        console.log('receoved to store')
        if (payload && payload.projectId) {
            preparedURL = '/fp/project/' + payload.projectId;
            if (payload.isMBProject) {
                preparedURL += `?isMBProject=true`
            }
            return this.$axios
                .$delete(preparedURL, { isDeleted: true })
                .then(res => {
                    dispatch('fetchProjects');
                    return res;
                })
                .catch(err => {
                    throw err.response;
                });
        } else {
            return;
        }
    },
    renameProject({ commit,dispatch }, payload) {
        let preparedURL;
        if (payload && payload.projectId && payload.name) {
            preparedURL = '/fp/project/properties/title/' + payload.projectId;
            if (payload.isMBProject) {
                preparedURL += `?isMBProject=true`
            }
            return this.$axios
                .$put(preparedURL, { name: payload.name })
                .then(res => {
                    dispatch('fetchMobileSampleProjects')
                    return res;
                })
                .catch(err => {
                    throw err.response;
                });
        } else {
            return;
        }
    },
    moveProject({ commit }, payload) {
        let preparedURL;
        console.log('receoved to store')
        if (payload && payload.id) {
            preparedURL = '/fp/project/move';
            if (payload.isMBProject) {
                preparedURL += `?isMBProject=true`
            }
            return this.$axios
                .$put(preparedURL, { id: payload.id, folder: payload.folder })
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw err.response;
                });
        } else {
            return;
        }
    },
    createFolder({ commit }, payload) {
        let preparedURL;
        if (payload && payload.name) {
            preparedURL = 'fp/dashboardOrganization/';
            return this.$axios
                .$post(preparedURL, { name: payload.name, parent: payload.parent })
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw err.response;
                });
        } else {
            return;
        }
    },
    fetchFoldersTree({ commit }, payload) {
        let preparedURL;
        preparedURL = 'fp/dashboardOrganization/list'+ `?host=${window.location.host}`;
        return this.$axios
            .$get(preparedURL)
            .then(res => {
                commit('setFoldersTree', res.data)
                return res.data;
            })
            .catch(err => {
                throw err.response;
            });
    },
    fetchFolderHierarchy({commit}) {
        let preparedURL = "fp/dashboardOrganization/folderlistbyuser";
        return this.$axios
            .get(preparedURL)
            .then(res => {
                console.log({res: res.data.data})
                if (res.data && res.data.data) {
                    commit("setFolderHierarchy", res.data.data);
                    return res.data.data
                }

                return {}
            })
            .catch(err => {
                throw err.response;
            });
    },
    setParentId({ commit }, payload) {
        commit('setfolderParent', payload.parentId)
            // if (payload && payload.parentId) {
            // }
    },
    setCurrentTree({ commit }, payload) {
        commit('setCurrentTreeState', payload.currentTree)
    },
    deleteFolder({ commit, dispatch }, payload) {
        let preparedURL;
        console.log('receoved to store')
        if (payload && payload.folderId) {
            preparedURL = '/fp/dashboardOrganization/delete';
            return this.$axios
                .$put(preparedURL, { folderId: payload.folderId })
                .then(res => {
                    dispatch('fetchProjects');
                    return res.data;
                })
                .catch(err => {
                    throw err.response;
                });
        } else {
            return;
        }
    },
    renameFolder({ commit }, payload) {
        let preparedURL;
        if (payload && payload.folderId && payload.name) {
            preparedURL = '/fp/dashboardOrganization/rename';
            return this.$axios
                .$put(preparedURL, { folderId: payload.folderId, name: payload.name, parent: payload.parent })
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw err.response;
                });
        } else {
            return;
        }
    },
    foldersState({ commit }, payload) {
        commit('setFoldersState', payload.totalFolders)
    },
    foldersBreadCrumbs({ commit }, payload) {
        commit('setBreadCrumbsState', payload.totalBreadCrumbs)
    },
    fetchTotalInspirations({ commit }) {
        const url = '/fp/project/inspirations?type=template';
        return this.$axios
            .$get(url)
            .then(res => {
                let inspiration = [];
                res.data.forEach(element => {
                    state.designs.find(item => {
                        if (item.project == element._id) {
                            element.widgetData = item;
                            inspiration.push(element)
                        }
                    })
                });
                // designs
                commit("setTotalInspirations", inspiration);
            })
            .catch(err => {
                throw err.response;
            });
    },
    fetchProjectSharedWith({commit}, payload){
        if(payload){
            const url = '/fp/share/project/'+ payload;
            // const url = '/fp/share/project/5eedfb0b0cdcca096b458fff';
            return this.$axios
                .$get(url)
                .then(res => {
                    // designs
                    commit("setProjectSharedWith", res.data);
                })
                .catch(err => {
                    throw err.response;
            });
        }
    },
    shareProjectWith({commit,dispatch},payload) {
        const url = `/fp/share/project/`;
        return this.$axios
            .$post(url, payload)
            .then(res => {
                commit('setInvalidEmails',res.invalidEmails);
                dispatch('fetchProjectSharedWith',payload.project);
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    removeFromShareProjects({commit,dispatch},payload) {
        const url = `/fp/share/project/`;
        return this.$axios
            .$put(url, payload)
            .then(res => {
                dispatch('fetchProjectSharedWith',payload.project);
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    getDashboardSearchResults({commit,dispatch},payload) {
        const url = `/fp/dashboardOrganization/search`;
        return this.$axios
            .$post(url, payload)
            .then(res => {
                if (res && res.data) {
                    commit("setSearchResultsForProjects", res.data.projects);
                    commit("setSearchResultsForFolders", res.data.folders);
                }
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    // Mobile sample projects fetch
    fetchMobileSampleProjects({ commit }, payload) {
        const url = `/m/fp/projects`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setMobileSampleProjects", res.data);
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    createMobileProject({ commit,dispatch }, payload) {
        const url = `/m/fp/project/`+payload.projectId;
        return this.$axios
            .$get(url)
            .then(res => {
                dispatch('fetchProjects');
                // dispatch('fetchMobileSampleProjects')
                dispatch('fetchFoldersTree');
                // commit("setMobileSampleProjects", res.data.sampleProjects);
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    fetchMobileRenders({ commit }, payload) {
        const url = `/m/renders`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setMobileRenders", res.data);
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    shortListInspiration({ commit }, payload) {
        const url = `/shortlistproduct`;
        return this.$axios
            .$post(url, {...payload})
            .then(res => {
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    registerDashboardAnalyticsEvent({ commit }, payload) {
        const url = `/analytics/dashboard-event`;
        return this.$axios
            .$post(url, payload)
            .then(res => {
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    addOrRemoveClassToBody( {}, data ) {
        setClassToBody( data.status, data.className );
    },
    onScanQr( {}, data ) {
        const url = '/auth/qr/login';
        return this.$axios
            .$post(url,data)
            .then(res => {
                return res
            })
            .catch(err => {
                throw err.response;
            });
    }
}

const mutations = {
    setProjects: (state, res) => {
        state.usersProjects = res
    },
    setProjectsPagination: (state, data) => {
        state.totalProjects = data.allProjectCount
    },
    setProjectsFromComponent: (state, data) => {
        state.usersProjectsPagination = data
    },
    setInspirationsFromComponent: (state, data) => {
        state.inspirationsWithPagination = data
    },
    setInspirations: (state, data) => {
        state.inspirations = data
    },
    setInspirationsCount: (state, data) => {
        state.inspirationsCount = data.allProjectCount
    },
    setAnnotaions: (state, data) => {
        state.usersAnnotations = data
    },
    setSampleProjects: (state, data) => {
        state.sampleProjects = data
    },
    setDesigns: (state, data) => {
        state.designs = data
    },
    setDesignId: (state, data) => {
        state.widgetId = data
    },
    setfolderParent: (state, data) => {
        state.folderParentId = data;
    },
    setFoldersTree: (state, data) => {
        state.foldersTree = data;
    },
    setCurrentTreeState: (state, data) => {
        state.currentFoldersTree = data;
    },
    setFoldersState: (state, data) => {
        state.totalFolders = data;
    },
    setBreadCrumbsState: (state, data) => {
        state.totalBreadCrumbs = data;
    },
    setTotalInspirations: (state, data) => {
        state.totalInspirations = data;
    },
    setProjectSharedWith: (state, data)=> {
        state.projectSharedWith = data;
    },
    setInvalidEmails: (state, data)=> {
        state.invalidEmails = data;
    },
    setMobileSampleProjects: (state, data)=> {
        state.mobileSampleProjects = data;
    },
    setMobileRenders: (state, data)=> {
        state.mobileRenders = data;
    },
    setSharedProjects: (state, res) => {
        state.sharedProjects = res
    },
    setAPInspirationsCategories: (state, data) => {
        state.apInspirationsCategories = data
    },
    setSelectedFolder: (state, data) => {
        state.selectedFolder = data
    },
    setSelectedFolderFoMove: (state, data) => {
        state.selectedFolderFoMove = data
    },
    setFolderHierarchy: (state, data) => {
        state.folderHierarchy = data
    },
    setUserProjectsWithPagination: (state, data) => {
        state.userProjectsWithPagination = data;
    },
    setUserSharedProjects: (state, data) => {
        state.userSharedProjects = data
    },
    setPageNumber: (state, data) => {
        state.pageNumber = data
    },
    setPageSize: (state, data) => {
        state.pageSize = data
    },
    setSearchResultsForProjects: (state, data) => {
        state.searchResultsForProjects = data
    },
    setSearchResultsForFolders: (state, data) => {
        console.log(data)
        state.searchResultsForFolders = data
    },
    setIsDFUPopupVisible: (state, data) => {
        state.isDFUPopupVisible = data
    },
    setShowAIIdeateRedirectPopup: (state, data) => {
        state.showAIIdeateRedirectPopup = data
    },
    setDFUTypeFormLink: (state, data) => {
        state.DFUTypeFormLink = data
    },
    setShowFoyrServicesPopup: (state, data) => {
        state.showFoyrServicesPopup = data
    },
    setShowMainLoader: (state, data) => {
        state.showMainLoader = data
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

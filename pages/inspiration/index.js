import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
// import DemoTourPaywall from "../../components/shared/demoTourPaywall/demoTourIndex.vue";
import demoTourTypeForm from "../../components/shared/demoTourPaywall/demoTourTypeForm.vue";
import thankyouComponent from '@/components/shared/popups/thankyou';
import MultiselectDropDown from "@/components/shared/multiselectDropDown.vue"
import Checkbox from "@/components/shared/Checkbox.vue";
import ScrollObserver from "@/components/shared/scrollObserver.vue";
import fullScreenLoader from "@/components/shared/fullScreenLoader.vue";

export default {
    layout: "dashboard",
    middleware: ["initAuth", "authReq"],
    components: { 
        demoTourTypeForm, 
        thankyouComponent,
        MultiselectDropDown, 
        Checkbox, 
        ScrollObserver,
        fullScreenLoader
    },
    head() {
        return {
            title: "Neo"
        };
    },
    data() {
        return {
            searchText: '',
            pageSize: 500,
            pageNum: 1,
            totalInspirations: [],
            selectedAPInspirationFilters:{},
            inspirationsToShortlisted: [],
            showProjectsPopup: false,
            projectsToShortlistInspirations: [],
            projectName: "",
            newProject: false,
            message: {
                value: "",
                error: false,
                global: false,
            },
            dropdownFilterValue: 'foyr',
            isFilterDropdown: false,
            searchTimeoutRef: null,
            showLoader: false,
            selectedSortOption: ["WHATS_NEW"],
            sortOptionsMaps: {
                whatsNew: "WHATS_NEW",
                mostPopular: "MOST_POPULAR"
            },
            sortOptionsList: [
                {
                    text: "What's New",
                    value: "WHATS_NEW"
                },
                {
                    text: "Most Popular",
                    value: "MOST_POPULAR"
                },
            ],
            searchProjectQueryText: ""
        }
    },
    asyncData() {},
    mounted() {
        if (this.isUserAPDesigner) {
           this.fetchAPData();
        }
        if(!this.usersProjects)
            this.fetchProjects(); 
        setTimeout(() => {
            
            this.getTheTourStatus().then((response) => {
                this.getPublicConfiguration()
                // if (response && response['subscription_bought_successful']) {
                // } else {
                //     console.log('Flag is false')
                // }
            });
        }, 5000);
        this.getDesignWidgets;
        // this.$ga.event('inspiration','click',"inspiration page open",1)
        // window.UsageAnalytics.logEvent("inspirationPageOpen");
        setTimeout(() => {
            // amplitude.getInstance().logEvent("inspiration");
            // chmln.track("inspiration");  //removed  - kalyan
            if (window.analytics) {
                window.analytics.track('inspiration', {
                    title: 'Inspiration Page',
                    subtitle: 'open'
                }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
            }
        }, 1000);
        this.getInspirations({ 
            pageSize: this.pageSize, 
            pageNum: this.pageNum,
            search: this.searchText,
            ...(this.showAPInspirations && {customerBrand: 'AP'}),
            ...(this.showAPInspirations && {apFilters: this.getSelectedAPFilters()}),
            ...this.getSelectedSort() 
        }).then((res) => {
            this.setInspirationsFromComponent(res);
            this.inspirationsForSearch();
        }).catch((err) => {
            console.log(err)
        })
    },
    computed: {
        ...mapState({
            inspirations: state => state.Projects.inspirations,
            inspirationsCount: state => state.Projects.inspirationsCount,
            user: state => state.User.user,
            inspirationsWithPagination: state => state.Projects.inspirationsWithPagination,
            totalInspirationsCount: state => state.Projects.inspirationsCount,
            usersProjects: state => state.Projects.usersProjects,
            sharedProjects: state => state.Projects.sharedProjects,
            isUserAPDesigner: state => state.User.isUserAPDesigner,
        }),
        ...mapGetters({
            filterByText: 'Projects/filterByText',
            apInspirationsCategories: 'Projects/apInspirationsCategories',
        }),
        totalProjects(){
            if (!this.usersProjects) return [];
            return this.usersProjects.concat(this.sharedProjects) 
        },
        showAPInspirations() {
            return this.dropdownFilterValue == 'asianPaints'
        },
        filteredUserProjects() {
            if (!this.totalProjects) return []; 
            return this.totalProjects.filter(e => 
                e.name && 
                e.name.indexOf(this.searchProjectQueryText) > -1
            );
        }
    },
    watch: {
        isUserAPDesigner(nv) {
            if (nv) {
                this.fetchAPData()
            }
        }
    },
    methods: {
        ...mapActions({
            getProductDynamicProperties: 'Projects/getProductDynamicProperties',
            getDesignWidgets: 'Projects/getWidgets',
            getInspirations: 'Projects/fetchInspirationsV2',
            inspirationsForSearch: 'Projects/fetchTotalInspirations',
            getTheTourStatus: 'Subscriptions/getTheTourStatus',
            getPublicConfiguration: 'Subscriptions/getPublicConfiguration',
            fetchProjects:'Projects/fetchProjects',
            shortListInspiration:'Projects/shortListInspiration',
            uploadProjects: "Projects/newProject",
        }),
        ...mapMutations({
            setInspirationsFromComponent: 'Projects/setInspirationsFromComponent',

        }),
        openProject(id) {
            window.open(window.location.origin + "/tool?project=" + id);
        },
        onProductsScroll(e) {
            // let obj = e.target;
            // // console.log('Top-------->', (obj.scrollTop + 1), 'Height', (obj.scrollHeight - obj.offsetHeight))
            // if ((obj.scrollTop + 1 > (obj.scrollHeight - obj.offsetHeight)) && this.pageNum <= Math.ceil((this.inspirationsCount / this.pageSize))) {
            //     // console.log('All Inspiration Count', this.inspirationsCount)
            //     this.pageNum = this.pageNum + 1;
            //     this.getInspirations({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
            //         if (res && res.length > 0) {
            //             // console.log('Inspirations', res)
            //             this.totalInspirations = [...this.inspirationsWithPagination, ...res]
            //             this.setInspirationsFromComponent(this.totalInspirations)
            //         }
            //     }).catch((err) => {
            //         console.log(err)
            //     })
            // }
        },
        loadMoreData() {
            this.pageNum = this.pageNum + 1;
            this.getInspirations({ 
                pageSize: this.pageSize, 
                pageNum: this.pageNum,
                search: this.searchText,
                ...(this.showAPInspirations && {customerBrand: 'AP'}),
                ...(this.showAPInspirations && {apFilters: this.getSelectedAPFilters()}),
                ...this.getSelectedSort()
            }).then((res) => {
                this.totalInspirations = [...this.inspirationsWithPagination, ...res]
                this.setInspirationsFromComponent(this.totalInspirations)
            }).catch((err) => {
                console.log(err)
            })
        },
        getFilterChildren(filter) {
            if (!filter) return [];
            else if (!filter.children) return [];

            return filter.children.map(e => ({
                ...e,
                text: e.name,
                value: e.formName
            }));
        },
        onSortTypeItemClick(checkboxValue) {
            if(this.selectedSortOption.includes(checkboxValue)){
                // this.selectedSortOption.pop()
                return;
            }else if(checkboxValue && !this.selectedSortOption.includes(checkboxValue)) {
                this.selectedSortOption.pop()
                this.selectedSortOption.push(checkboxValue)
            }else if(this.selectedSortOption.length === 0){
                this.selectedSortOption.push(checkboxValue)
            }
        },
        onAPFilterDropdownChange(data, key) {
            this.$set(this.selectedAPInspirationFilters, key, data);
        },
        onFilterDropdownClose() {
            this.showLoader = true;
            this.getInspirations({ 
                pageSize: this.pageSize, 
                pageNum: 1,
                search: this.searchText,
                ...(this.showAPInspirations && {customerBrand: 'AP'}),
                ...(this.showAPInspirations && {apFilters: this.getSelectedAPFilters()}),
                ...this.getSelectedSort()
            }).then((res) => {
                this.setInspirationsFromComponent(res);
                this.inspirationsForSearch();
            }).catch((err) => {
                console.log(err)
            }).finally(() => { this.showLoader = false; })
        },
        getSelectedAPFilters() {
            if (!this.selectedAPInspirationFilters) return [];
            let tempObj = [];
            for (const key in this.selectedAPInspirationFilters) {
                tempObj.push ({
                    key,
                    value:this.selectedAPInspirationFilters[key].map(e => e.formName)
                })
            }
            return tempObj
        },
        getSelectedSort() {
            if(this.selectedSortOption.includes(this.sortOptionsMaps.mostPopular)) {
                return {
                    sortBy:"inspirationUsageCnt"
                }
            }

            return {}
        },
        resetValuesBeforeFetch() {
            this.page = 1;
        },
        async fetchShortListedProductsData() {
            this.isLoading = true;
            this.isLoadMoreHidden = false;

            let payload = {
                ...(this.searchPhrase && { searchPhrase: this.searchPhrase }),
                pageNumber: this.page,
                pageSize: 200,
                body: {
                    ...(this.searchPhrase && { name: this.searchPhrase })
                },
            };

            if (this.selectedAPInspirationFilters && Object.keys(this.selectedAPInspirationFilters)) {
                let isFilterSelected = false;
                let filterOption = {};

                for (let filterKey of Object.keys(this.selectedAPInspirationFilters)) {
                    if (this.selectedAPInspirationFilters[filterKey].length) {
                        isFilterSelected = true;
                        filterOption[filterKey] = this.selectedAPInspirationFilters[filterKey].map((e) => e.value);
                    }
                }

                if (isFilterSelected) {
                    payload.body.apFilters = true;
                    payload.body.filters = filterOption;
                }
            }

            const resData = await this.fetchAllProducts(payload).catch((e) => console.log(e));
            // this.controlledSet.push(...resData);
            // console.log(resData);
            this.isLoading = false;
            return;
            if (resData.totalCount <= resData.pageLength * (this.page + 1)) {
                this.isLoadMoreHidden = true;
            }
        },
        capitalizeFirstLetter(string = "") {
            let lowercasedString = string.toLowerCase();
            return lowercasedString.charAt(0).toUpperCase() + lowercasedString.slice(1);
        },
        onMultiselectClearAllClick(key) {
            this.$set(this.selectedAPInspirationFilters, key, []);
        },
        onCheckboxValueChange(checkboxValue) {
            if (this.inspirationsToShortlisted.includes(checkboxValue)) {
                let indexPosition = this.inspirationsToShortlisted.indexOf(checkboxValue);
                this.inspirationsToShortlisted.splice(indexPosition, 1);
            } else {
                let foundListItem = this.filterByText(this.searchText).find(
                    e => e.inspirationProductId === checkboxValue
                );
                if (foundListItem) {
                    this.inspirationsToShortlisted.push(checkboxValue);
                }
            }
            // console.log(this.inspirationsToShortlisted)
        },
        onProjectCheckboxValueChange(checkboxValue) {
            if(this.projectsToShortlistInspirations.includes(checkboxValue)){
                this.projectsToShortlistInspirations.pop()
            }else if(checkboxValue && !this.projectsToShortlistInspirations.includes(checkboxValue)) {
                this.projectsToShortlistInspirations.pop()
                this.projectsToShortlistInspirations.push(checkboxValue)
            }else if(this.projectsToShortlistInspirations.length === 0){
                this.projectsToShortlistInspirations.push(checkboxValue)
            }
            // console.log(this.projectsToShortlistInspirations)
        },
        // closePopup() {
        //     this.showProjectsPopup = false;
        // },
        openShowProjectsPopup(){
            this.projectName = undefined;
            this.showProjectsPopup = true;
        },
        closeShowProjectsPopup(){
            this.showProjectsPopup = false;
            if(this.projectsToShortlistInspirations && this.projectsToShortlistInspirations.length > 0) this.projectsToShortlistInspirations.pop()
        },
        openAddNewProjectPopup(){
            this.newProject = true;
            this.showProjectsPopup = false;
        },
        closeAddNewProjectPopup(){
            this.newProject = false;
            this.showProjectsPopup = true;
        },
        setDropDownFilter(value) {
            this.dropdownFilterValue = value;
        },
        dropdownSelected(value) {
            this.isFilterDropdown = false;
            this.setDropDownFilter(value)
            this.showLoader = true;
            this.getInspirations({ 
                pageSize: this.pageSize, 
                pageNum: 1,
                search: this.searchText,
                ...(this.showAPInspirations && {customerBrand: 'AP'}),
                ...(this.showAPInspirations && {apFilters: this.getSelectedAPFilters()}),
                ...this.getSelectedSort()
            }).then((res) => {
                this.setInspirationsFromComponent(res);
                this.inspirationsForSearch();
            }).catch((err) => {
                console.log(err)
            }).finally(() => { this.showLoader = false; })
        },
        fetchAPData() {
            this.getProductDynamicProperties();
            this.dropdownSelected('asianPaints');
        },
        onsearch() {
            clearTimeout(this.searchTimeoutRef);
            this.searchTimeoutRef = setTimeout(() => {
                this.dropdownSelected(this.dropdownFilterValue);
            }, 250);
        },
        addToSub(){
            if(
                this.projectsToShortlistInspirations.length > 0 && 
                this.inspirationsToShortlisted.length > 0
            ){
                this.shortListInspiration({
                "project":this.projectsToShortlistInspirations,
                "product":this.inspirationsToShortlisted
                }).then((res)=>{
                    this.message.value = res.message;
                    this.message.global = true;
                    this.showProjects = false;
                    this.projectsToShortlistInspirations = [];
                    this.inspirationsToShortlisted = [];
                    this.checked = false;
                    this.closeShowProjectsPopup();
                    setTimeout(() => {
                        this.message.value = "";
                        this.message.global = false;
                    }, 4000);
                })
            }
        },
        addNewProject() {
            if (!this.checkProjectNamePattern(this.projectName)) {
              let projectNameDup = this.projectName;
              var projectsDuplicate = [];
              if (this.usersProjects) {
                projectsDuplicate = this.usersProjects.filter(function(project) {
                  return project.name === projectNameDup;
                });
              }
              if (projectsDuplicate && projectsDuplicate.length > 0) {
                this.message.error = true;
                // this.message.global = true;
                this.message.value = "Project name already exists.";
                setTimeout(() => {
                  this.message.error = false;
                  this.message.global = false;
                  this.message.value = "";
                }, 2500);
                return;
              }
              
              this.uploadProjects({
                type: ["project"],
                name: this.projectName,
                folder: null
              }).then(res => {
                //   console.log("PROJECT CREATED", res);
                //   this.refreshingData(this.foldersArray._id);
                  this.newProject = false;
                  this.projectName = undefined;
                //   this.message.error = false;
                //   this.message.value = res.message;
                //   this.message.global = true;
                //   setTimeout(() => {
                //     this.message.error = false;
                //     this.message.global = false;
                //     this.message.value = "";
                //   }, 4000);
                  this.projectsToShortlistInspirations = [res.id]
                  this.addToSub();
                  localStorage.setItem("newProject", true);
              }).catch((error)=> {
                console.log('ERROR',error);
                if(error.data && error.data.err){
                  this.message.global = true;
                  // this.message.error = true;
                  this.message.value = error.data.err.message;
                  setTimeout(() => {
                    this.message.error = false;
                    // this.message.global = false;
                    this.message.value = '';
                  }, 2000);
                }
              })
            } else {
              this.message.error = true;
              this.message.global = false;
              // this.message.value = "Please enter project name";
              setTimeout(() => {
                this.message.error = false;
                this.message.global = false;
                this.message.value = "";
              }, 2000);
            }
        },
        checkProjectNamePattern(_projectName) {
            let tempProject = _projectName;
            const namePattern = /^[A-Za-z0-9_ ]*$/;
            let error = false;
            let errorType = "";
            if (!tempProject || tempProject.trim("").length <= 0) {
              error = true;
              errorType = "any.empty";
            }
            if (tempProject.trim("") && tempProject.trim("").length > 0) {
              if (tempProject.length >= 50) {
                error = true;
                errorType = "max.limit";
              } else if (tempProject.trim("").length <= 1) {
                error = true;
                errorType = "min.limit";
              } else {
              }
            }
            let testValue = namePattern.test(tempProject);
            if (!testValue) {
              error = true;
              errorType = "string.regex.base";
            }
            switch (errorType) {
              case "any.empty":
                this.message.value = "Name should not be empty!";
                break;
              case "string.min":
                this.message.value = `Name should have at least ${
                  err.context.limit
                } characters!`;
                break;
              case "string.max":
                this.message.value = `Name should have at most ${
                  err.context.limit
                } characters!`;
                break;
              case "string.regex.base":
                this.message.value = `Name can contain only alphanumeric characters, spaces and underscores.`;
                break;
              case "max.limit":
                this.message.value = "Name should have at most 50 characters!";
                break;
              case "min.limit":
                this.message.value = "Name should have at least 2 characters!";
                break;
              default:
                break;
            }
            return error;
        },
        handleGetResultsClick(refKey) {
            if (this.$refs[refKey]) this.$refs[refKey][0].closeDropdown();
        }
    }
}

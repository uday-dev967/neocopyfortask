import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Folders from "../../components/folderTree/folders.vue";
import FoldersView from "../../components/folderTree/foldersView.vue";
import BreadCrumbs from "../../components/folderTree/breadCrumbs.vue";
import Projects from "../../components/folderTree/projectv2.vue";
import thankyouComponent from '@/components/shared/popups/thankyou';
// import DemoTourPaywall from "../../components/shared/demoTourPaywall/demoTourIndex.vue";
import demoTourTypeForm from "../../components/shared/demoTourPaywall/demoTourTypeForm.vue";
export default {
    layout: "dashboard",
    middleware: ["iframeDash"],
    components: { Folders, BreadCrumbs, Projects, FoldersView, thankyouComponent, demoTourTypeForm },
    head() {
        return {
            title: "Neo - Dashboard",
        };
    },

    data() {
        return {
            begineers: [],
            exploreData: [],
            message: {
                value: "",
                error: false,
                global: false
            },
            changeRight: false,
            projectName: undefined,
            newProject: false,
            showVideo: false,
            showProject: false,
            copyProjectId: '',
            selectedUser: '',
            cloneProjectName: undefined,
            videoUrl: undefined,
            searchUser: '',
            searched: true,
            videoShow: false,
            showRedirect: false,
            dashMsg: false,
            paginationProjects: [],
            pageSize: 20,
            pageNum: 1,
            getFreeDemoShow_Desk: false,
            freeDemoUrl_Desk: 'https://calendly.com/foyr-neo-product-demo',
            oldProjectId: '',
            optionsMenu: false,
            showRename: false,
            newProjectName: '',
            renameProjectId: '',
            showDeleteConfirmation: false,
            deleteProjectId: '',
            showCreateFolder: false,
            newFolderName: '',
            parentId: '',
            rootFolders: [],
            rootProjects: [],
            showMove: false,
            moveProjectId: '',
            selectMoveFolderId: '',
            breadcrumbs: [],
            searchKey: '',
            debounce: null,
            searchFilterResults: {},
            filterTabSelected: 'project',
            filterLoading: false,
        };
    },
    computed: {
        ...mapState({
            usersProjects: state => state.Projects.usersProjects,
            usersProjectsWithPagination: state => state.Projects.usersProjectsPagination,
            allProjectsCount: state => state.Projects.totalProjects,
            sampleProjects: state => state.Projects.sampleProjects,
            user: state => state.User.user,
            users: state => state.User.adminUser,
            amr: state => state.Auth.amr,
            isTrial: state => state.Billing.isTrial,
            videosData: state => state.Dash.video,
            currentBilling: state => state.Billing.currentSubscription,
            folderParentId: state => state.Projects.folderParentId,
            foldersTree: state => state.Projects.foldersTree,
            currentTree: state => state.Projects.currentFoldersTree
        }),
        ...mapGetters({
            filterByText: 'User/filterByText'
        }),
        calendlyUrl() {
            return this.isTrial ? "https://calendly.com/foyr-neo-product-demo" : "https://calendly.com/csm-team-5/neo-training";
        }
    },
    asyncData(context) {
        return {
            userSys: detect.parse(navigator.userAgent)
        };
    },
    mounted() {
        setTimeout(() => {
            
            this.getTheTourStatus().then((response) => {
                this.getPublicConfiguration()
                // if (response && response['subscription_bought_successful']) {
                // } else {
                //     console.log('Flag is false')
                // }
            });
        }, 5000);
        this.$root.$on('add-project-main', () => {
            this.refreshingData(null);
            this.breadcrumbs = [];
            this.rootFolders = this.foldersTree;
        })
        this.fetchFolders({}).then((res) => {
            if (res) {
                this.rootFolders = res;
                this.rootProjects = res.projects;
                // this.onClickFolder(this.parentId)
                // console.log('Hellooooooooooo',res.folders)
                // this.fetchCurrentFoldersTree({ currentTree: res });
                // this.setFolders({ totalFolders: res.folders })
            }
        });
        // if(this.$ua.deviceType() !== 'pc')
        //   this.$router.push('/dashboard_mobile')
        // if (!localStorage.getItem('dashMsg') && this.userSys.browser.family !== "Chrome") {
        //     this.dashMsg = true
        // }
        if (!this.usersProjects)
            this.fetchProjects().then(res => { });

        this.fetchVideo();
        if (this.user) {
            // setTimeout(() => {
            //   amplitude.getInstance().setUserId(this.user.email);
            //   var identify = new amplitude.Identify().setOnce('accountId', this.user.accountId);
            //   amplitude.getInstance().identify(identify);
            //   amplitude.getInstance().setGroup('accountId', this.user.accountId);
            // }, 1000);
            const { accountId } = this.user;
            this.adminUsers({ accountId });

        }
        this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
            console.log('On mounted projects', res)
            //this.usersProjectsWithPagination = [...res]
            this.setProjectsFromComponent(res);
        })
        if (window.analytics) {
            window.analytics.track('dashboard', {
                title: 'Dashboard',
                subtitle: 'landing page',
            }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
        }
        if (this.currentBilling) {
            console.log('ON MOUNTED*********')
            this.chmlnForSubCancel();
        }
        this.fetchCurrentFoldersTree({ currentTree: this.foldersTree });

    },
    watch: {
        user: function (data) {

            if (data) {
                const { accountId } = data
                this.adminUsers({ accountId });
                setTimeout(() => {
                    // To set unique user id in your system when it is available
                    window.fcWidget.setExternalId(data._id);

                    // To set user name
                    window.fcWidget.user.setFirstName(data.fullName);

                    // To set user email
                    window.fcWidget.user.setEmail(data.email);

                    // To set user properties
                    // window.fcWidget.user.setProperties({
                    //   plan: "Estate",                 // meta property 1
                    //   status: "Active"                // meta property 2
                    // });
                }, 2000);
            }
        },
        currentBilling: function () {
            console.log('watch************************** function')
            localStorage.setItem('subscriptionCancel_chmln', false);
            this.chmlnForSubCancel();

        },
        searchKey: function () {
            if (this.searchKey && this.searchKey.trim()) {
                this.breadcrumbs = [];
                this.getSearchResults();
            } else {
                this.searchKey = "";
                // this.rootFolders = this.foldersTree;
            }
        }
    },
    methods: {
        ...mapActions({
            fetchProjects: 'Projects/fetchProjects',
            fetchBegineers: 'Projects/fetchBegineers',
            uploadProjects: 'Projects/newProject',
            cloneProject: 'Projects/cloneProject',
            fetchSampleProjects: 'Projects/fetchSampleProjects',
            adminUsers: 'User/adminUsers',
            fetchProjectByUserId: 'Projects/fetchProjectByUserId',
            fetchMySubscriptions: 'Subscriptions/fetchMySubscriptions',
            fetchVideo: 'Dash/getVideos',
            getProjectsWithPagination: 'Projects/getProjectsWithPagination',
            deleteProject: 'Projects/deleteProject',
            renameProject: 'Projects/renameProject',
            moveProject: 'Projects/moveProject',
            createFolder: 'Projects/createFolder',
            fetchFolders: 'Projects/fetchFoldersTree',
            fetchCurrentFoldersTree: "Projects/setCurrentTree",
            setFolders: "Projects/foldersState",
            updateGoalStatus: "User/updateGoalForm",
            getDashboardSearchResults: "Projects/getDashboardSearchResults",
            getTheTourStatus: 'Subscriptions/getTheTourStatus',
            getPublicConfiguration: 'Subscriptions/getPublicConfiguration'
        }),
        ...mapMutations({
            setProjectsFromComponent: 'Projects/setProjectsFromComponent'
        }),
        search() {
            this.searched = false;
        },
        clickOutside() {
            this.searched = true;
        },
        openProject(id) {
            // amplitude.getInstance().logEvent("projectOpen", { projectId: id, userId : this.user.accountId });
            // chmln.track("projectOpen");
            // datadog
            if (window && window.DD_LOGS) {
                window.DD_LOGS && DD_LOGS.logger.log('Project Clicked', {
                    projectId: id,
                    userId: this.user.accountId
                });
            }

            if (this.userSys.device.type == "Desktop")
                window.open(window.location.origin + "/tool?project=" + id);
            else
                this.showRedirect = true;
        },
        onProductsScroll(e) {
            if (this.user && this.user.accountInfo.accountCategory == 'ADMIN') {
                let obj = e.target;
                console.log('All Project Count', this.allProjectsCount)
                if ((obj.scrollTop + 1 > (obj.scrollHeight - obj.offsetHeight)) && this.pageNum <= Math.ceil((this.allProjectsCount / this.pageSize))) {
                    //next api call, or update array
                    // console.log('scroll ' + obj.scrollTop + 'height ' +( obj.scrollHeight - obj.offsetHeight))
                    // this.getProjectsWithPagination({}).then((res)=> {

                    // })
                    this.pageNum = this.pageNum + 1;
                    this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
                        if (res && res.length > 0) {
                            this.paginationProjects = [...this.usersProjectsWithPagination, ...res]
                            this.setProjectsFromComponent(this.paginationProjects)
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                    console.log('Page--------->', this.pageNum, this.usersProjectsWithPagination)

                }
            } else {
                return;
            }
        },
        userSelectedProjects(selected) {
            this.searched = true;
            this.searchUser = selected.fullName;
            this.fetchProjectByUserId(selected._id);
        },
        videoPlayed(video) {
            this.videoShow = true
            console.log(video)
            this.videoUrl = video;
            // amplitude.getInstance().logEvent("videoPlayed", { videoName: this.videoUrl });
        },
        cancelContainer(container) {
            if (container == "invite") {
                this.newProject = false;
                this.projectName = undefined;
            } else {
                this.showProject = false;
                this.copyProjectId = ''
                this.cloneProjectName = undefined;
                // this.message = {};
            }
        },
        scroll(position) {
            var container = document.getElementById('cards-container');
            if (position == 'left')
                this.sideScroll(container, 'right', 50, 500, 200);
            else
                this.sideScroll(container, 'left', 50, 500, 200);
        },
        sideScroll(element, direction, speed, distance, step) {
            var scrollAmount = 0;
            var slideTimer = setInterval(function () {
                if (direction == 'left') {
                    element.scrollLeft -= step;
                } else {
                    element.scrollLeft += step;
                }
                scrollAmount += step;
                if (scrollAmount >= distance) {
                    window.clearInterval(slideTimer);
                }
            }, speed);
        },
        changeLocalStore() {
            localStorage.setItem('dashMsg', true);
        },
        closePopup() {
            this.newProject = false;
            this.showVideo = false;
            this.projectName = undefined;
            this.copyProjectId = '';
            this.showProject = false;
            this.cloneProjectName = undefined;
            this.$refs.videoPlayer.pause();
            this.showRename = false;
            this.newProjectName = '';
            this.renameProjectId = '';
            this.showDeleteConfirmation = false;
            this.deleteProjectId = '';
            this.oldProjectId = '';
            this.showCreateFolder = false;
            this.moveProjectId = '';
            this.showMove = false;
            // this.message = {};
            // this.$refs.videoPlayer1.pause();
            // this.$refs.videoPlayer2.pause();
            // this.$refs.videoPlayer3.pause();
            // this.$refs.videoPlayer4.pause();
        },
        addProject() {
            if (this.projectName) {
                // console.log('Project Name*********************************DASHBOARD INDEX')
                let projectNameDup = this.projectName;
                var projectsDuplicate = [];
                console.log('userDetails', this.usersProjects)
                projectsDuplicate = this.usersProjectsWithPagination.filter(function (project) {
                    console.log('Checking Project Name', project)
                    return project.name === projectNameDup;
                })
                if (projectsDuplicate && projectsDuplicate.length > 0) {
                    this.message.error = true;
                    this.message.value = 'Project name already exists.';
                    setTimeout(() => {
                        this.message.global = false;
                        this.message.value = '';
                    }, 2500);
                    return;
                }
                this.uploadProjects({ type: ['project'], name: this.projectName, folder: this.currentTree._id }).then((res) => {
                    if (res.error) {
                        this.message.error = true;
                    } else {
                        this.newProject = false;
                        this.projectName = undefined;
                        this.message.error = false;
                        this.message.value = res.message;
                        this.message.global = true;
                        setTimeout(() => {
                            this.message.global = false;
                            this.message.value = '';
                        }, 4000);
                        // this.$ga.event('project','click',"new project",1)
                        this.pageNum = 1;
                        this.refreshingData();
                        this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
                            if (res && res.length > 0) {
                                this.setProjectsFromComponent(res)
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                        this.message.global = true;
                        setTimeout(() => {
                            this.message.global = false;
                            this.message.value = '';
                        }, 4000);
                        // amplitude.getInstance().logEvent("newProjectCreated", { projectId: res.id });
                        // if (window.UsageAnalytics)
                        // window.UsageAnalytics.logEvent("newProjectCreated", { projectId: res.id });
                        if (window.analytics) {
                            window.analytics.track('newProject', {
                                title: 'New Project',
                                subtitle: res.id,
                                author: this.user._id
                            }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                        }
                        localStorage.setItem("newProject", true);
                        if (this.userSys.device.type == "Desktop")
                            window.open(window.location.origin + "/tool?project=" + res.id);
                        else
                            this.showRedirect = true;
                    }

                })
            } else {
                this.message.error = true;
                this.message.value = "Please enter project name"
            }
        },
        copyProject() {
            if (this.cloneProjectName) {
                let clonedProject = this.cloneProjectName;
                var projectsDuplicate = [];
                projectsDuplicate = this.usersProjectsWithPagination.filter(function (project) {
                    return project.name === clonedProject;
                })
                if (projectsDuplicate && projectsDuplicate.length > 0) {
                    console.log('Project Duplicates', projectsDuplicate)
                    this.message.error = true;
                    this.message.value = 'Project name already exists.';
                    setTimeout(() => {
                        this.message.global = false;
                        this.message.value = '';
                    }, 2500);
                    return;
                }
                this.cloneProject({ id: this.copyProjectId, name: this.cloneProjectName, folder: this.currentTree._id }).then((res) => {
                    if (res.error) {
                        this.message.error = true;
                    } else {
                        // amplitude.getInstance().logEvent("projectClone", { projectName: this.cloneProjectName });
                        this.pageNum = 1;
                        this.refreshingData();
                        this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
                            if (res && res.length > 0) {
                                this.setProjectsFromComponent(res)
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                        // if (window.UsageAnalytics)
                        // window.UsageAnalytics.logEvent("projectClone", { projectId: res.id });
                        if (window.analytics) {
                            window.analytics.track('cloneProject', {
                                title: 'Clone Project',
                                subtitle: res.id,
                                author: this.user._id
                            }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                        }
                        this.newProject = false;
                        this.message.error = false;
                        this.message.value = res.message;
                        this.showProject = false
                        this.message.global = true;
                        this.cloneProjectName = undefined;
                        setTimeout(() => {
                            this.message.global = false;
                            this.message.value = '';
                        }, 2500);
                    }

                })
            } else {
                this.message.value = "Please enter project name"
                this.message.error = true;
            }
        },
        outsideClick() {
            if (this.getFreeDemoShow_Desk)
                this.getFreeDemoShow_Desk = false
        },
        chmlnForSubCancel() {
            let chmlnCallingCheck = localStorage.getItem('subscriptionCancel_chmln');
            // console.log('LocalStorage-->', typeof (chmlnCallingCheck));
            if (!chmlnCallingCheck || chmlnCallingCheck === "false") {
                console.log('Inside')
                if (this.currentBilling && !this.currentBilling.isPublic) {
                    // expired or cancelled or active
                    let today = Date.now();
                    if ((this.currentBilling.subscriptionStatus && this.currentBilling.subscriptionStatus === 'cancled') || this.currentBilling.subscriptionExpiryDate) {
                        console.log('subscription cancelld status received')
                        if (this.currentBilling.subscriptionExpiryDate) {
                            // expired
                            console.log('Expiry date is received')
                            let expiredDate = this.currentBilling.subscriptionExpiryDate;
                            expiredDate = new Date(expiredDate).getTime();
                            if (expiredDate < today) {
                                // already expired , Call chmln
                                console.log('subscription expired, Calling chmln')
                                if (window && window.location && window.location.host) {
                                    if (window.location.host === 'neo.foyr.com' || window.location.host === 'neopreprod.foyr.com') {
                                        chmln.show("5e2fd4bb4e346d00040557c7");
                                    } else {
                                        chmln.show("5d91c0dcd553da0004baea56");
                                    }
                                }
                            } else {
                                // not expired, dont call chmln
                                console.log('expired but still active ,not Calling chmln')
                            }
                        } else {
                            // cancelled
                            let endDate = this.currentBilling.lastPayment.end;
                            if (endDate) {
                                endDate = new Date(endDate).getTime();
                                if (endDate < today) {
                                    // call chmln cz it is expired
                                    console.log('Sub is cancelled, Calling chmln')
                                    if (window && window.location && window.location.host) {
                                        if (window.location.host === 'neo.foyr.com' || window.location.host === 'neopreprod.foyr.com') {
                                            chmln.show("5e2fd4bb4e346d00040557c7");
                                        } else {
                                            chmln.show("5d91c0dcd553da0004baea56");
                                        }
                                    }
                                } else {
                                    console.log('Sub is cancelled but not expired, not calling chmln')
                                    // dont call chmln
                                }
                            } else {
                                console.log('No end date is available')
                                // no date avaible
                            }
                        }
                    } else {
                        //somthing went wrong
                        console.log('No subscription status and no expiry date available')
                    }
                } else {
                    // free trail- no need of chmln
                    console.log('Free trail')
                }
                localStorage.setItem("subscriptionCancel_chmln", true);
                console.log('Setted-->');
            } else {
                console.log('Already Called-->', chmlnCallingCheck);
            }
        },
        optionsMenuOpen(_projectId) {
            // this.optionsMenu = !this.optionsMenu;
            if (_projectId) {
                this.optionsMenu = true;
                this.oldProjectId = _projectId;
            } else {
                this.optionsMenu = false;
                this.oldProjectId = '';
            }
        },
        onClickDelete() {
            if (this.deleteProjectId) {
                this.deleteProject({ projectId: this.deleteProjectId, folder: this.currentTree._id }).then((res) => {
                    if (res._id) {
                        console.log('deleted successfully');
                        this.showDeleteConfirmation = false;
                        this.message.error = false;
                        this.message.value = "Succesfully Deleted.";
                        this.message.global = true;
                        this.refreshingData();
                        setTimeout(() => {
                            this.message.global = false;
                            this.message.value = '';
                        }, 2500);
                        this.pageNum = 1;
                        this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
                            console.log('Responseee--->', res)
                            if (res && res.length >= 0) {
                                this.setProjectsFromComponent(res)
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    console.log('Response Received After Delete', res)
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                console.log('Delete Project Id is not found.')
            }
        },
        onClickRename(_newName) {
            if (this.renameProjectId && _newName) {
                this.renameProject({ projectId: this.renameProjectId, name: _newName, folder: this.currentTree._id }).then((res) => {
                    if (res && res.statusCode && res.statusCode === 200 && res.data) {
                        this.message.error = false;
                        this.message.value = "Succesfully Updated.";
                        this.message.global = true;
                        setTimeout(() => {
                            this.message.global = false;
                            this.message.value = '';
                        }, 2500);
                        this.showRename = false;
                        this.oldProjectId = '';
                        this.pageNum = 1;
                        this.refreshingData();
                        this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
                            if (res && res.length > 0) {
                                this.setProjectsFromComponent(res)
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    console.log('Response Received After Delete', res)
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        onClickCreateFolder() {
            if (this.newFolderName) {
                this.createFolder({ parent: this.rootFolders._id, name: this.newFolderName }).then((res) => {
                    if (res && res.statusCode && res.statusCode === 200 && res.data && res.data._id) {
                        // this.parentId = res.data.parent;
                        this.refreshingData(this.rootFolders._id);
                        // this.fetchFolders({}).then((foldersList) => {
                        //   if (foldersList) {
                        //     if (this.currentTree._id) {
                        //       for (let i = 0; i < (foldersList.folders).length; i++) {
                        //         let isMatched = this.searchParent(foldersList.folders[i], this.currentTree._id);
                        //         // if (isMatched) {
                        //         //   return;
                        //         // }
                        //       }
                        //       // this.searchParent(foldersList.folders, this.currentTree._id);
                        //     }else{
                        //       this.fetchCurrentFoldersTree({ currentTree: foldersList});
                        //     }
                        //     // this.onClickFolder(this.parentId)
                        //   }
                        // });
                        // this.fetchCurrentFoldersTree({ currentTree: this.currentTree });
                        // console.log('____created & parent Data', this.currentTree)
                        // if (!this.parentId && this.parentId === null) {
                        // this.fetchFolders({}).then((res) => {
                        //   if (res.data) {
                        //     // this.onClickFolder(this.parentId)
                        //     this.fetchCurrentFoldersTree({ currentTree: res.data });
                        //   }
                        // });
                        // }

                        this.message.error = false;
                        this.message.value = "Succesfully Created.";
                        this.message.global = true;
                        setTimeout(() => {
                            this.message.global = false;
                            this.message.value = '';
                        }, 2500);
                        this.showCreateFolder = false;
                        this.oldProjectId = '';
                        // this.pageNum = 1;
                        // this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
                        //   if (res && res.length > 0) {
                        //     this.setProjectsFromComponent(res)
                        //   }
                        // }).catch((err) => {
                        //   console.log(err)
                        // })
                    }
                    // console.log('Response Received After Delete', res)
                }).catch((err) => {
                    console.log('After created duplicate', err)
                    if (err.data && err.data.err && err.data.err.message) {
                        this.message.error = true;
                        this.message.value = err.data.err.message;
                        setTimeout(() => {
                            this.message.global = false;
                            this.message.value = "";
                        }, 2500);
                    }
                })
            }
        },
        onClickMove() {
            console.log('MOVE PROJECT FROM INDEXJS')
            if (this.moveProjectId) {
                this.moveProject({ folder: this.currentTree._id, id: this.moveProjectId }).then((res) => {
                    if (res && res.statusCode && res.statusCode === 200 && res.data) {
                        // this.parentId = res.data.parent;
                        // this.refreshingData(this.rootFolders.parent);
                        // this.fetchFolders({}).then((foldersList) => {
                        //   if (foldersList) {
                        //     if (this.currentTree._id) {
                        //       for (let i = 0; i < (foldersList.folders).length; i++) {
                        //         let isMatched = this.searchParent(foldersList.folders[i], this.currentTree._id);
                        //         // if (isMatched) {
                        //         //   return;
                        //         // }
                        //       }
                        //       // this.searchParent(foldersList.folders, this.currentTree._id);
                        //     }else{
                        //       this.fetchCurrentFoldersTree({ currentTree: foldersList});
                        //     }
                        //     // this.onClickFolder(this.parentId)
                        //   }
                        // });
                        // this.fetchCurrentFoldersTree({ currentTree: this.currentTree });
                        console.log('____created & parent Data', this.currentTree)
                        // if (!this.parentId && this.parentId === null) {
                        // this.fetchFolders({}).then((res) => {
                        //   if (res.data) {
                        //     // this.onClickFolder(this.parentId)
                        //     this.fetchCurrentFoldersTree({ currentTree: res.data });
                        //   }
                        // });
                        // }

                        this.message.error = false;
                        this.message.value = "Succesfully Created.";
                        this.message.global = true;
                        setTimeout(() => {
                            this.message.global = false;
                            this.message.value = '';
                        }, 2500);
                        this.showCreateFolder = false;
                        this.oldProjectId = '';
                        this.pageNum = 1;
                        this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
                            if (res && res.length > 0) {
                                this.setProjectsFromComponent(res)
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    console.log('Response Received After Delete', res)
                }).catch((err) => {
                    console.log(err)
                })
            }
        },

        searchParent: function (_foldersTree, _id) {
            // if (foldersTree._id === _id) {
            //   // this.totalFolders = foldersTree.folders;
            //   this.fetchCurrentFoldersTree({ currentTree: foldersTree });
            //   return true;
            // }
            // console.log('Foldersss Search----------->', foldersTree.folders)
            console.log('fname---->', _foldersTree.name)
            // for (const folder of _foldersTree) {
            if (_foldersTree._id === _id) {
                // this.fetchCurrentFoldersTree({ currentTree: _foldersTree });
                this.rootFolders = _foldersTree;
                // if (this.breadcrumbs && this.breadcrumbs.length >= 0) {
                //   this.breadcrumbs[this.breadcrumbs.length - 1] = _foldersTree;
                // }
                // this.breadcrumbs = this.rootFolders;
                return;
            }
            for (const child of _foldersTree.folders) {
                this.searchParent(child, _id);
                // console.log(res)
                // return res;
                // console.log(res);
                // if (res) {
                // this.fetchCurrentFoldersTree({ currentTree: res });
                //   return true;
                // }
            }
            // }
            // if (_id){
            // }else {
            //   this.fetchCurrentFoldersTree({ currentTree: _foldersTree });

            // }
        },
        refreshingData(_parentId) {
            this.fetchFolders({}).then((foldersList) => {
                if (foldersList) {
                    if (_parentId) {
                        for (let i = 0; i < (foldersList.folders).length; i++) {
                            let isMatched = this.searchParent(foldersList.folders[i], _parentId);
                            // if (isMatched) {
                            //   return;
                            // }
                        }
                        // this.searchParent(foldersList.folders, this.currentTree._id);
                    } else {
                        // this.fetchCurrentFoldersTree({ currentTree: foldersList });
                        this.rootFolders = foldersList;
                        // this.breadcrumbs = this.rootFolders;
                    }
                    // this.onClickFolder(this.parentId)
                }
            });
        },
        prepareBreadCrumbs(_bcFolder, _index) {
            this.refreshingData(_bcFolder._id)
            // this.rootFolders = _bcFolder;
            this.breadcrumbs = this.breadcrumbs.slice(0, (_index + 1));
            // rootFolders=bread; breadcrumbs = breadcrumbs.slice(0, (_index + 1))
        },
        onClickWelcome(_type) {
            let identifyObj = {}
            if (_type === 'reduce_designtime') {
                identifyObj['goal'] = "reduce_designtime";
                this.sendEventToSegment('reduce design time')
            } else if (_type === 'fast_render') {
                identifyObj['goal'] = 'fast_render';
                this.sendEventToSegment('use inspiration')
            } else if (_type === 'cancel') {
                identifyObj['goal'] = 'reduce_designtime';
                this.sendEventToSegment('Onboarding Cancelled')
            } else { }
            // this.newProject = true;
            this.projectName = (this.user && this.user.fullName) ? `My first project_${this.user.fullName}` : 'My first project'
            console.log('user on welcome', this.user)
            this.addProject()
            // identifyObj['rep_name'] = this.user.name ? this.user.name : 'N/A'
            // identifyObj['rep_email'] = this.user.email ? this.user.email : 'N/A'
            window.analytics.identify(this.$store.state.User.user._id, identifyObj);
            this.updateGoalStatus({ onboardingGoalFilled: "true" }).then((res) => { })
        },
        // onClickFolder: function(_pId) {
        //   for (let i = 0; i < this.foldersTree.length ; i++) {
        //       let isMatched = this.searchParent(this.foldersTree[i], _pId);
        //       if(isMatched) {
        //           return;
        //       }
        //   }
        // }
        getSearchResults() {
            this.filterLoading = true;
            if (this.debounce) {
                clearTimeout(this.debounce)
            }
            this.debounce = setTimeout(() => {
                this.getDashboardSearchResults({ query: this.searchKey }).then((response) => {
                    // console.log('Response Search', response);
                    this.sendEventToSegment('dashboard_search_entered')
                    if (response && response.statusCode && response.statusCode === 200 && response.data) {
                        this.searchFilterResults = response.data;
                        this.filterLoading = false;
                    }
                }).catch((error) => {
                    console.log('Error while searching', error);
                })
            }, 500)
            // if(this.searchKey){

            // }else {
            //     this.rootFolders = this.foldersTree
            //     // this.refreshingData(null);
            // }
        },
        sendEventToSegment(_eventName) {
            if (window.analytics) {
                window.analytics.track(_eventName, {
                    title: _eventName,
                }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
            }
        }
    },
};

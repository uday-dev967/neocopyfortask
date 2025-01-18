import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Folders from "../../components/folderTree/folders.vue";
import FoldersView from "../../components/folderTree/foldersViewV2.vue";
import BreadCrumbs from "../../components/folderTree/breadCrumbs.vue";
import Projects from "../../components/folderTree/projectsV2.vue";
import thankyouComponent from '@/components/shared/popups/thankyou';
import demoTourTypeForm from "../../components/shared/demoTourPaywall/demoTourTypeForm.vue";
import banner from "../../components/shared/dashboard/banner.vue"
import CommunityFeed from "../../components/shared/dashboard/communityFeed.vue"
import DashboardBannerMixin from "../../mixins/dashboardBannerMixin";
import CommonUtilities from "../../mixins/commonUtilitiesMixin";
import SelectCategoryPopup from "../../components/selectCategoryPopup.vue";
import WelcomePopup from "../../components/welcomePopup.vue";
import {setClassToHtml} from "../../helpers/utilFunctions"
export default {
    layout: "dashboard",
    middleware: ["initAuth", "authReq"],
    mixins: [
        DashboardBannerMixin,
        CommonUtilities
    ],
    components: { Folders, BreadCrumbs, Projects, FoldersView, thankyouComponent, demoTourTypeForm, banner, CommunityFeed, SelectCategoryPopup, WelcomePopup },
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
            // getFreeDemoShow_Desk: false,
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
            rootFolders: {},
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
            hasContainerScrolled: false,
            windowResizeRef: null,
            showArrows: false,
            selectedOptionForHOWelcomePopup: "SELF_DESIGN",
            hoPopupDesignOptions: {
                self: "SELF_DESIGN",
                foyr: "FOYR_DESIGN",
            }
        };
    },
    computed: {
        ...mapState({
            usersProjects: state => state.Projects.usersProjects,
            // old paginated projects list
            usersProjectsWithPagination: state => state.Projects.usersProjectsPagination,
            // new paginated projects list
            userProjectsWithPagination: state => state.Projects.userProjectsWithPagination,
            userSharedProjects: state => state.Projects.userSharedProjects,
            folderHierarchy: state => state.Projects.folderHierarchy,
            allProjectsCount: state => state.Projects.totalProjects,
            sampleProjects: state => state.Projects.sampleProjects,
            user: state => state.User.user,
            users: state => state.User.adminUser,
            amr: state => state.Auth.amr,
            isTrial: state => state.Billing.isTrial,
            videosData: state => state.Dash.video,
            moodboardVideos: state => state.Dash.moodboardVideos,
            currentBilling: state => state.Billing.currentSubscription,
            folderParentId: state => state.Projects.folderParentId,
            foldersTree: state => state.Projects.foldersTree,
            currentTree: state => state.Projects.currentFoldersTree,
            isBetaClicked: state => state.User.isBetaClicked,
            getFreeDemoShow_Desk: state => state.Dash.getFreeDemoShow_Desk,
            selectedLocale: state => state.User.selectedLocale
        }),
        ...mapGetters({
            filterByText: 'User/filterByText',
            isUserIndian: 'User/isUserIndian',
            isUserCategoryHomeOwner: 'User/isUserCategoryHomeOwner',
            isUserCategoryPicked: 'User/isUserCategoryPicked',
            doesUserHaveActiveMoodboardSubscription: "Billing/doesUserHaveActiveMoodboardSubscription",
            hasMoodBoardPlanExpired: "Billing/hasMoodBoardPlanExpired",
            isUserOnMoodBoardFreeTrial: "Billing/isUserOnMoodBoardFreeTrial",
            isUserOnMoodBoardPaidPlan: "Billing/isUserOnMoodBoardPaidPlan",
        }),
        ...mapGetters("Projects", [
            "selectedFolderId",
            "searchResultsForProjects",
            "searchResultsForFolders",
        ]),
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
        setClassToHtml(false, "temporary-fix-for-mobile-response")
        this.setShowMainLoader(true)
        this.fetchUser().then(() => {
            if (!this.isUserCategoryPicked && this.user && this.user.accountType === 'root') {
                // console.log("redirecting from dashboard to user")
               
                this.$router.push(this.localePath( {path:this.localePath('/user')}));
            }
            this.setShowMainLoader(false)
        })
        setTimeout(() => {
            this.getTheTourStatus().then((response) => {
                this.getPublicConfiguration()
            });
        }, 5000);
        this.$root.$on('add-project-main', () => {
            this.refreshingData(null);
            this.breadcrumbs = [];
            this.rootFolders = this.foldersTree;
        })

        if (
            this.folderHierarchy &&
            Object.keys(this.folderHierarchy).length > 0
        ) {
            this.rootFolders = this.folderHierarchy;
        } else {
            this.fetchFolderHierarchy().then((data) => {
                this.rootFolders = data;
            })
        }

        if (!this.usersProjects)
            this.fetchProjects().then(res => { });

        this.fetchVideo();
        this.fetchMBVideo();
        if (this.user) {
            const { accountId } = this.user;
            this.adminUsers({ accountId });
        }
        if (
            !this.userProjectsWithPagination ||
            (this.userProjectsWithPagination && this.userProjectsWithPagination.length === 0)
        ) {
            this.setPageNumber(1);
            this.fetchProjectsWithPagination();
        }
        if (
            !this.userSharedProjects ||
            (this.userSharedProjects && this.userSharedProjects.length === 0)
        ) {
            this.fetchSharedProjects();
        }

        this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
            console.log('On mounted projects', res)
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
        window.addEventListener("resize", this.handleWindowResize);
        this.handleWindowResize();
        

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
            }
        }
    },
    methods: {
        ...mapActions({
            fetchProjects: 'Projects/fetchProjects',
            fetchProjectsWithPagination: 'Projects/fetchProjectsWithPagination',
            fetchSharedProjects: 'Projects/fetchSharedProjects',
            fetchBegineers: 'Projects/fetchBegineers',
            uploadProjects: 'Projects/newProject',
            cloneProject: 'Projects/cloneProject',
            fetchSampleProjects: 'Projects/fetchSampleProjects',
            adminUsers: 'User/adminUsers',
            fetchProjectByUserId: 'Projects/fetchProjectByUserId',
            fetchMySubscriptions: 'Subscriptions/fetchMySubscriptions',
            fetchVideo: 'Dash/getVideos',
            fetchMBVideo: 'Dash/getMBVideos',
            getProjectsWithPagination: 'Projects/getProjectsWithPagination',
            deleteProject: 'Projects/deleteProject',
            renameProject: 'Projects/renameProject',
            moveProject: 'Projects/moveProject',
            createFolder: 'Projects/createFolder',
            fetchFolders: 'Projects/fetchFoldersTree',
            fetchFolderHierarchy: 'Projects/fetchFolderHierarchy',
            fetchCurrentFoldersTree: "Projects/setCurrentTree",
            setFolders: "Projects/foldersState",
            updateGoalStatus: "User/updateGoalForm",
            getDashboardSearchResults: "Projects/getDashboardSearchResults",
            getTheTourStatus: 'Subscriptions/getTheTourStatus',
            getPublicConfiguration: 'Subscriptions/getPublicConfiguration',
            creatNewV2Project: "Projects/creatNewV2Project",
            openEmbededTypeform: "typeformPopup/openEmbededTypeform",
            fetchUser: "User/fetch"
        }),
        ...mapMutations({
            setProjectsFromComponent: 'Projects/setProjectsFromComponent',
            setGetFreeDemoShow_Desk: 'Dash/setGetFreeDemoShow_Desk',
            setShowMoodboardSignupPopup: 'Dash/setShowMoodboardSignupPopup',
            setShowMoodboardBasicPaywall: "Dash/setShowMoodboardBasicPaywall",
            setSwitchToMoodboardAndRedirectToDashboard: "User/setSwitchToMoodboardAndRedirectToDashboard",
            setSelectedFolder: "Projects/setSelectedFolder",
            setPageNumber: "Projects/setPageNumber",
        }),
        
        ...mapMutations("Projects", ["setIsDFUPopupVisible", "setDFUTypeFormLink", "setShowMainLoader"]),
        handleSearchInput(ev) {
            if (!this.searchKey) {
                if (this.userProjectsWithPagination.length === 0) {
                    this.setSelectedFolder(null)
                    this.setPageNumber(1);
                    this.fetchProjectsWithPagination();
                }
            }
        },
        search() {
            this.searched = false;
        },
        clickOutside() {
            this.searched = true;
        },

        handleVideoTutorialClick(video) {
            this.showVideo = !this.showVideo;
            this.videoPlayed(video.videoLink)
            window.analytics.track(
                "dashboard_video_tutorial_clicked",
                {
                    title: "dashboard_video_tutorial_clicked",
                    videoName: video.videoName
                },
                {
                    integrations: {
                        Amplitude: { session_id: new Date().getTime() },
                    },
                },
                { timestamp: new Date().getTime() }
            );
        },

        openProject(id) {
            // datadog
            if (window && window.DD_LOGS) {
                window.DD_LOGS && DD_LOGS.logger.log('Project Clicked', {
                    projectId: id,
                    userId: this.user.accountId
                });
            }

            if (this.userSys.device.type == "Desktop")
                if (this.isSafari()) window.location = window.location.origin + "/tool?project=" + id;
                else window.open(window.location.origin + "/tool?project=" + id);
            else
                this.showRedirect = true;
        },
        onProductsScroll(e) {
            if (this.user && this.user.accountInfo.accountCategory == 'ADMIN') {
                let obj = e.target;
                console.log('All Project Count', this.allProjectsCount)
                if ((obj.scrollTop + 1 > (obj.scrollHeight - obj.offsetHeight)) && this.pageNum <= Math.ceil((this.allProjectsCount / this.pageSize))) {
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
            this.videoUrl = video;
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
            var slideTimer = setInterval(() => {
                if (direction == 'left') {
                    element.scrollLeft -= step;
                } else {
                    element.scrollLeft += step;
                }
                scrollAmount += step;
                if (scrollAmount >= distance) {
                    window.clearInterval(slideTimer);
                }
                if (element.scrollLeft > 0) {
                    this.hasContainerScrolled = true;
                } else {
                    this.hasContainerScrolled = false;
                }
            }, speed);
        },
        showScrollArrows(selector) {
            if (!selector) return false;
            if (!document) return false;
            return this.isScrollable(document.querySelector(selector))
        },
        isScrollable(element) {

            if (!element) {

                return false;

            }

            return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;

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
        },
        addProject() {
            if (this.projectName) {
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

                        if (window.analytics) {
                            window.analytics.track('newProject', {
                                title: 'New Project',
                                subtitle: res.id,
                                author: this.user._id
                            }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
                        }
                        localStorage.setItem("newProject", true);
                        if (this.userSys.device.type == "Desktop")
                            if (this.isSafari()) window.location = window.location.origin + "/tool?project=" + res.id;
                            else window.open(window.location.origin + "/tool?project=" + res.id);
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
                        this.pageNum = 1;
                        this.refreshingData();
                        this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
                            if (res && res.length > 0) {
                                this.setProjectsFromComponent(res)
                            }
                        }).catch((err) => {
                            console.log(err)
                        })

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
                this.setGetFreeDemoShow_Desk(false);
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
                this.createFolder({ parent: this.selectedFolderId, name: this.newFolderName }).then((res) => {
                    if (res && res.statusCode && res.statusCode === 200 && res.data && res.data._id) {
                        // this.parentId = res.data.parent;
                        this.refreshingData(this.selectedFolderId);

                        this.message.error = false;
                        this.message.value = "Succesfully Created.";
                        this.message.global = true;
                        setTimeout(() => {
                            this.message.global = false;
                            this.message.value = '';
                        }, 2500);
                        this.showCreateFolder = false;
                        this.oldProjectId = '';
                    }
                    // console.log('Response Received After Delete', res)
                }).catch((err) => {
                    console.log('After created duplicate', err)
                    if (err.data && err.data.err && err.data.err.message) {
                        this.message.error = true;
                        this.message.global = true;
                        this.message.value = err.data.err.message;
                        setTimeout(() => {
                            this.message.error = false;
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
            console.log('fname---->', _foldersTree.name)
            // for (const folder of _foldersTree) {
            if (_foldersTree._id === _id) {
                this.rootFolders = _foldersTree;
                return;
            }
            for (const child of _foldersTree.folders) {
                this.searchParent(child, _id);
            }
        },
        refreshingData(_parentId) {
            this.fetchFolderHierarchy().then((data) => {
                this.rootFolders = data;
            })
        },
        prepareBreadCrumbs(_bcFolder, _index) {
            // this.refreshingData(_bcFolder._id)
            this.breadcrumbs = this.breadcrumbs.slice(0, (_index + 1));
            this.setSelectedFolder(_bcFolder)
            this.setPageNumber(1);
            this.fetchProjectsWithPagination();
        },
        onClickWelcome(_type) {
            console.log("on welcome is called")
            let identifyObj = {}
            if (_type === 'reduce_designtime') {
                identifyObj['goal'] = "reduce_designtime";
                this.sendEventToSegment('Onboarding Started')
            } else if (_type === 'fast_render') {
                identifyObj['goal'] = 'fast_render';
                this.sendEventToSegment('use inspiration')
            } else if (_type === 'cancel') {
                identifyObj['goal'] = 'reduce_designtime';
                this.sendEventToSegment('Onboarding Cancelled')
            } else { }
            this.projectName = (this.user && this.user.fullName) ? `My first project_${this.user.fullName}` : 'My first project'
            console.log('user on welcome', this.user)
            this.setShowMainLoader(true);
            this.creatNewV2Project({ type: ['project'], name: this.projectName, folder: null }).then(async (projRes) => {
                if (this.isSafari()) window.location = window.location.origin + "/toolv2?project=" + projRes.id + "&isonboarding=true" + this.checkLangAndReturnLangCode();
                else window.open(window.location.origin + "/toolv2?project=" + projRes.id + "&isonboarding=true" + this.checkLangAndReturnLangCode(), "_blank");
                this.pageNum = 1;
                this.refreshingData();
                this.getProjectsWithPagination({ pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
                    if (res && res.length > 0) {
                        this.setProjectsFromComponent(res)
                    }
                }).catch((err) => {
                    console.log(err)
                }).finally(() => {
                    this.setShowMainLoader(false)
                })
            })
            window.analytics.identify(this.$store.state.User.user._id, identifyObj);
            this.updateGoalStatus({ onboardingGoalFilled: "true" }).then((res) => { })
        },
        handleHomeOwnerWelcomePopupButtonClick() {
            switch(this.selectedOptionForHOWelcomePopup) {
                case this.hoPopupDesignOptions.self: {
                    this.onClickWelcome('reduce_designtime')
                    break
                }
                case this.hoPopupDesignOptions.foyr: {
                    this.sendEventToSegment('Home owner clicked DFU');
                    this.openEmbededTypeform({
                        formId: "OXhgVmhY",
                        hidden: {},
                        onReady: () => {},
                        onSubmit: ( data ) => {
                            this.updateGoalStatus({ onboardingGoalFilled: "true" }).then((res) => { })
                            this.sendEventToSegment('Home owner completed Typeform');
                        },
                        onClose: () => {},
                        popupCloseCB: () => {
                            this.sendEventToSegment('Homeowner didnt complete typeform');
                        }
                    })
                    break
                }
            }
        },
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
        },
        sendEventToSegment(_eventName) {
            if (window.analytics) {
                window.analytics.track(_eventName, {
                    title: _eventName,
                }, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
            }
        },
        filterBetaProjects(projectList) {
            if (projectList && projectList.length > 0) {
                if (this.isBetaClicked) {
                    projectList = projectList.filter((project) => project.hasOwnProperty('v2Project') && project.v2Project);
                } else {
                    projectList = projectList.filter((project) => !project.hasOwnProperty('v2Project') || !project.v2Project);
                }
            }
            return projectList;
        },
        handleTryMoodboardButtonClick() {
            if (!this.hasMoodBoardPlanExpired) {
                this.setShowMoodboardSignupPopup(true);
                if (window.analytics) {
                    window.analytics.track(
                        "MB_click_beta",
                        { title: "MB click beta" },
                        {
                            integrations: {
                                Amplitude: { session_id: new Date().getTime() },
                            },
                        },
                        { timestamp: new Date().getTime() }
                    );
                }
            } else {
                this.setShowMoodboardBasicPaywall(true);
                if (window.analytics) {
                    window.analytics.track(
                        "MB_upgrade_later",
                        { title: "MB upgrade later" },
                        {
                            integrations: {
                                Amplitude: { session_id: new Date().getTime() },
                            },
                        },
                        { timestamp: new Date().getTime() }
                    );
                }
            }
        },
        handleWindowResize() {
            clearTimeout(this.windowResizeRef);
            this.windowResizeRef = setTimeout(() => {
                this.showArrows = this.showScrollArrows('#cards-container')
            }, 100)
        },
        checkLangAndReturnLangCode() {
            switch (this.$i18n.locale) {
                case "ja": {
                    return "&lang=ja&isAtlasSearchEnabled=true"
                }
                case "es": {
                    return "&lang=es&isAtlasSearchEnabled=true"
                }
            }

            return ""
        },
        handleMyFolderClick() {
            this.breadcrumbs = [];
            this.setSelectedFolder(null)
            this.setPageNumber(1);
            this.fetchProjectsWithPagination();
        },
        handleDFURequestNowButtonClick() {
            // this.setDFUTypeFormLink("https://form.typeform.com/to/dC7q0Gex?utm_source=product&utm_medium=dashboard&utm_campaign=banner")
            // this.setIsDFUPopupVisible(true);
            if (window.analytics) {
                window.analytics.track(
                    "Click DFU on DB banner",
                    { title: "Click DFU on DB banner" },
                    {
                        integrations: {
                            Amplitude: { session_id: new Date().getTime() },
                        },
                    },
                    { timestamp: new Date().getTime() }
                );
            }
            this.openEmbededTypeform({
                formId: 'dC7q0Gex',
                hidden: {
                  utm_source: "product",
                  utm_medium: "dashboard",
                  utm_campaign: "banner",
                },
            })
            // window.open("https://form.typeform.com/to/dC7q0Gex?utm_source=product&utm_medium=dashboard&utm_campaign=banner", '_blank')
        },
        handleFTOfferCTAClick() {
            this.$router.push({path:this.localePath('/settings/plans_new')})
        },
        shortenString(input) {
            if (input && input.length > 30) {
                return input.slice(0, 27) + '...';
            }
            return input;
        }

    },
    destroyed() {
        window.removeEventListener("resize", this.handleWindowResize);
    }
};

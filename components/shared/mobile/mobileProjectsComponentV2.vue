<template>
	<div class="mobile-projects-componewnt-wrapper"  @contextmenu.prevent>
		<div v-if="projectsSectionHeader" class="main-header">
			{{ $t(projectsSectionHeader) }}
			<slot name="viewAll">
				<nuxt-link
					class="view-all-link"
					:to="localePath('/dashboard_mobile/projects')"
				>
					<div class="view-all">
						{{ $t("buttonText.viewAll") }}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="17"
							viewBox="0 0 16 17"
							fill="none"
						>
							<path
								d="M6 12.5L10 8.5L6 4.5"
								stroke="#3A393A"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</nuxt-link>
			</slot>
		</div>
		<div class="templates-wrapper">
			<div v-if="!hideStartFromScratchCard" class="from-scratch-card" @click="onStartFromScratchClick">
				<svg
					class="card-svg"
					xmlns="http://www.w3.org/2000/svg"
					width="170"
					height="108"
					viewBox="0 0 170 108"
					fill="none"
				>
					<g clip-path="url(#clip0_316_5204)">
						<rect
							width="170"
							height="108"
							rx="8"
							fill="url(#paint0_linear_316_5204)"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M137.491 -55.9918C178.167 -55.6128 220.028 -39.3273 233.081 -0.801231C246.562 38.9858 226.806 81.7399 192.25 105.626C160.121 127.835 118.473 122.867 86.3861 100.598C51.6416 76.4849 23.1352 37.57 36.2567 -2.6352C49.3409 -42.7262 95.321 -56.3847 137.491 -55.9918Z"
							fill="url(#paint1_radial_316_5204)"
						/>
						<g opacity="0.25">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M41.5811 35.4471C39.9657 35.4471 38.4164 36.7952 38.4164 38.7458V70.0086H66.8894C68.3749 70.0086 69.579 71.1494 69.579 72.5566C69.579 73.9639 68.3749 75.1047 66.8894 75.1047H38.4164V77.2056V98.6339V137.094C38.4164 139.044 39.9657 140.392 41.5811 140.392H128.881C130.496 140.392 132.045 139.044 132.045 137.094V98.6339L132.045 98.6277V77.2117L132.045 77.2056V56.5089H115.691C114.205 56.5089 113.001 55.368 113.001 53.9608C113.001 52.5535 114.205 51.4127 115.691 51.4127H132.045V38.7458C132.045 36.7952 130.496 35.4471 128.881 35.4471H87.9204V72.5566C87.9204 73.9639 86.7162 75.1047 85.2308 75.1047C83.7454 75.1047 82.5412 73.9639 82.5412 72.5566V35.4471H41.5811ZM137.462 137.094V98.64V98.6339V77.2056V77.1994V38.7458C137.462 34.2192 133.752 30.3158 128.881 30.3158H41.5811C36.7092 30.3158 33 34.2192 33 38.7458V77.2056V98.6339V137.094C33 141.62 36.7092 145.524 41.5811 145.524H128.881C133.752 145.524 137.462 141.62 137.462 137.094ZM58.5776 127.539C58.5776 128.947 59.7816 130.087 61.2673 130.087C62.7529 130.087 63.9569 128.947 63.9569 127.539V109.782C63.9569 108.375 62.7529 107.234 61.2673 107.234C59.7816 107.234 58.5776 108.375 58.5776 109.782V127.539ZM123.501 113.997C124.987 113.997 126.191 112.856 126.191 111.449C126.191 110.041 124.987 108.901 123.501 108.901H104.758C103.272 108.901 102.068 110.041 102.068 111.449C102.068 112.856 103.272 113.997 104.758 113.997H123.501Z"
								fill="#FAFAFC"
							/>
						</g>
					</g>
					<defs>
						<linearGradient
							id="paint0_linear_316_5204"
							x1="186"
							y1="-9.94736"
							x2="-11.0186"
							y2="144.25"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#FFEBE6" />
							<stop offset="1" stop-color="#F6E5E1" />
						</linearGradient>
						<radialGradient
							id="paint1_radial_316_5204"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(135.175 32) rotate(90) scale(88 102.175)"
						>
							<stop offset="0.335" stop-color="#FFD8CE" />
							<stop
								offset="1"
								stop-color="#FFDBD1"
								stop-opacity="0"
							/>
						</radialGradient>
						<clipPath id="clip0_316_5204">
							<rect
								width="170"
								height="108"
								rx="8"
								fill="white"
							/>
						</clipPath>
					</defs>
				</svg>
				<div class="action-wrapper">
					<div class="text">
						{{ $t("mobileSection.startFromScratch") }}
					</div>
					<div class="svg-wrapper">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
						>
							<path
								d="M9.5 18L15.5 12L9.5 6"
								stroke="#E9BEB3"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>
			<div
				v-for="project of projectsToShow"
				:key="project._id"
				class="template-card"
				@click="handleProjectOpen(project)"
			>
				<div class="image-wrapper iwfp">
					<img
						:src="
							(project.properties &&
								project.properties.thumbnail) ||
							''
						"
						alt=""
					/>
				</div>
				<div class="template-card-details" :class="{'render-card-details': isRenderComponent}">
					<div class="name project-name">
						{{ project.name.slice(0, 17) }}
					</div>
					<div class="date-and-time-wrapper">
						<div class="date">
							{{ getProjectCreationDate(project) }},
						</div>
						
						<div class="time">
							{{ getProjectCreationTime(project) }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="templatesSectionHeader" class="main-header with-margin">
			{{ $t(templatesSectionHeader) }}
		</div>
		<div v-if="inspirationsToShow.length > 0" class="templates-wrapper">
			<div
				v-for="(inspiration, index) in inspirationsToShow"
				:key="inspiration._id"
				class="template-card"
				@click="handleEditInspiration(inspiration)"
			>
				<div class="image-wrapper iwfp">
					<img :src="inspiration.optimizedImages[0]" alt="" />
					<!-- <div
						class="edit"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="10"
							height="10"
							viewBox="0 0 10 10"
							fill="none"
						>
							<g clip-path="url(#clip0_316_5605)">
								<path
									d="M7.08337 1.25002C7.19281 1.14059 7.32273 1.05378 7.46571 0.994555C7.60869 0.935329 7.76194 0.904846 7.91671 0.904846C8.07147 0.904846 8.22472 0.935329 8.3677 0.994555C8.51069 1.05378 8.64061 1.14059 8.75004 1.25002C8.85948 1.35946 8.94628 1.48938 9.00551 1.63236C9.06474 1.77534 9.09522 1.92859 9.09522 2.08336C9.09522 2.23812 9.06474 2.39137 9.00551 2.53435C8.94628 2.67734 8.85948 2.80726 8.75004 2.91669L3.12504 8.54169L0.833374 9.16669L1.45837 6.87502L7.08337 1.25002Z"
									stroke="#3A393A"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_316_5605">
									<rect width="10" height="10" fill="white" />
								</clipPath>
							</defs>
						</svg>
						{{ $t("buttonText.edit") }}
					</div> -->
					<div v-if="!isRenderComponent" class="sample-project">{{ $t("buttonText.sampleProject") }}</div>
          <div v-if="index == 0 && !isRenderComponent" class="explore-project bobbing-element">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 14.25C6.02846 14.25 3.32742 12.3604 2.28111 9.54657C2.23963 9.43604 2.23963 9.31396 2.28111 9.20343C3.32742 6.38959 6.02846 4.5 9 4.5C11.9715 4.5 14.6726 6.38959 15.7189 9.20343C15.7604 9.31396 15.7604 9.43604 15.7189 9.54657C14.6726 12.3604 11.9727 14.25 9 14.25ZM3.25022 9.375C4.20088 11.7149 6.48708 13.2748 9 13.2748C11.5129 13.2748 13.8 11.7149 14.7498 9.375C13.7991 7.03508 11.5129 5.47494 9 5.47494C6.48708 5.47494 4.20001 7.03421 3.25022 9.375Z" fill="white"/>
              <path d="M8.99989 11.8113C8.5231 11.8113 8.05703 11.6683 7.6606 11.4005C7.26417 11.1327 6.95519 10.752 6.77273 10.3066C6.59028 9.86118 6.54254 9.37108 6.63555 8.89825C6.72857 8.42542 6.95816 7.9911 7.2953 7.65021C7.63243 7.30932 8.06197 7.07717 8.52959 6.98312C8.99721 6.88906 9.48191 6.93734 9.9224 7.12182C10.3629 7.30631 10.7394 7.61873 11.0043 8.01958C11.2692 8.42042 11.4105 8.89169 11.4105 9.37378C11.4098 10.02 11.1556 10.6395 10.7036 11.0965C10.2517 11.5535 9.639 11.8105 8.99989 11.8113ZM8.99989 7.91122C8.71381 7.91122 8.43415 7.997 8.19628 8.15771C7.95842 8.31842 7.77302 8.54684 7.66354 8.81408C7.55406 9.08133 7.52542 9.3754 7.58123 9.65911C7.63704 9.94282 7.7748 10.2034 7.97709 10.408C8.17938 10.6125 8.43711 10.7518 8.7177 10.8082C8.99828 10.8647 9.28911 10.8357 9.55342 10.725C9.81772 10.6143 10.0436 10.4269 10.2026 10.1863C10.3615 9.94582 10.4463 9.66305 10.4463 9.37378C10.4456 8.98623 10.2929 8.61479 10.0218 8.34086C9.75064 8.06693 9.38317 7.91285 8.99989 7.91239V7.91122Z" fill="white"/>
            </svg>

            {{ $t("buttonText.exploreProject") }}
          </div>
				</div>
				<div class="template-card-details">
					<div class="name inspiration-name">
						{{ inspiration.name }}
					</div>
					<!-- <div class="creator-details">
						<div class="creator-image-wrapper">
							<img
								:src="inspiration.authorImage ? inspiration.authorImage : '~assets/images/mobile/creator-1.png'"
								alt=""
							/>
						</div>
						<div class="creator-name-and-designation-wrapper">
							<div class="creator-name">{{ inspiration.authorName ? inspiration.authorName : "Lauren Asher" }}</div>
							<div class="creator-designation">{{ inspiration.authorRole ? inspiration.authorRole : "Student" }}</div>
						</div>
					</div> -->
          <!-- <div class="project-update-at">
            {{ convertToLocalDateTime(inspiration.updatedAt) }}
          </div> -->

				</div>
			</div>
		</div>
		<div v-else-if="rendersToShow.length > 0" class="templates-wrapper">
			<div
				v-for="(render, index) in rendersToShow"
				:key="index"
				class="template-card"
			>
				<div class="image-wrapper iwfp">
					<img :src="render.url" alt="" />
					<div v-if="!isRenderComponent" class="sample-project">{{ $t("buttonText.sampleProject") }}</div>
          <div v-if="index == 0 && !isRenderComponent" class="explore-project bobbing-element">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 14.25C6.02846 14.25 3.32742 12.3604 2.28111 9.54657C2.23963 9.43604 2.23963 9.31396 2.28111 9.20343C3.32742 6.38959 6.02846 4.5 9 4.5C11.9715 4.5 14.6726 6.38959 15.7189 9.20343C15.7604 9.31396 15.7604 9.43604 15.7189 9.54657C14.6726 12.3604 11.9727 14.25 9 14.25ZM3.25022 9.375C4.20088 11.7149 6.48708 13.2748 9 13.2748C11.5129 13.2748 13.8 11.7149 14.7498 9.375C13.7991 7.03508 11.5129 5.47494 9 5.47494C6.48708 5.47494 4.20001 7.03421 3.25022 9.375Z" fill="white"/>
              <path d="M8.99989 11.8113C8.5231 11.8113 8.05703 11.6683 7.6606 11.4005C7.26417 11.1327 6.95519 10.752 6.77273 10.3066C6.59028 9.86118 6.54254 9.37108 6.63555 8.89825C6.72857 8.42542 6.95816 7.9911 7.2953 7.65021C7.63243 7.30932 8.06197 7.07717 8.52959 6.98312C8.99721 6.88906 9.48191 6.93734 9.9224 7.12182C10.3629 7.30631 10.7394 7.61873 11.0043 8.01958C11.2692 8.42042 11.4105 8.89169 11.4105 9.37378C11.4098 10.02 11.1556 10.6395 10.7036 11.0965C10.2517 11.5535 9.639 11.8105 8.99989 11.8113ZM8.99989 7.91122C8.71381 7.91122 8.43415 7.997 8.19628 8.15771C7.95842 8.31842 7.77302 8.54684 7.66354 8.81408C7.55406 9.08133 7.52542 9.3754 7.58123 9.65911C7.63704 9.94282 7.7748 10.2034 7.97709 10.408C8.17938 10.6125 8.43711 10.7518 8.7177 10.8082C8.99828 10.8647 9.28911 10.8357 9.55342 10.725C9.81772 10.6143 10.0436 10.4269 10.2026 10.1863C10.3615 9.94582 10.4463 9.66305 10.4463 9.37378C10.4456 8.98623 10.2929 8.61479 10.0218 8.34086C9.75064 8.06693 9.38317 7.91285 8.99989 7.91239V7.91122Z" fill="white"/>
            </svg>

            {{ $t("buttonText.exploreProject") }}
          </div>
				</div>
				<div class="template-card-details">
					<!-- <div class="name inspiration-name">
						{{ inspiration.name }}
					</div> -->
					<!-- <div class="creator-details">
						<div class="creator-image-wrapper">
							<img
								:src="inspiration.authorImage ? inspiration.authorImage : '~assets/images/mobile/creator-1.png'"
								alt=""
							/>
						</div>
						<div class="creator-name-and-designation-wrapper">
							<div class="creator-name">{{ inspiration.authorName ? inspiration.authorName : "Lauren Asher" }}</div>
							<div class="creator-designation">{{ inspiration.authorRole ? inspiration.authorRole : "Student" }}</div>
						</div>
					</div> -->
          <!-- <div class="project-update-at">
            {{ convertToLocalDateTime(inspiration.updatedAt) }}
          </div> -->

				</div>
			</div>
		</div>
		<!-- create project popup -->
		<div v-if="showProjectPopup" class="default-mobile-view-popup-styles-v2 mobile-create-project-popup">
			<div class="popup-body">
				<div class="close-button icon-wrapper" @click="closeCreateProjectPopup">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>

				</div>
				
				<div class="text-content">
					<div class="heading">{{ $t("mobileSection.enterProjectName") }}</div>
				</div>
				<div class="mobile-create-project-input-container">
					<div class="input-wrapper">
						<input 
							class="mobile-create-project-input" 
							type="text" placeholder="Project Name" 
							v-model="projectName"
							@keyup.enter="onCreateProjectButtonClick()" 
						/>
					</div>
					<div class="error-text">*{{ message.value }}</div>
				</div>
				<div class="popup-action">
					<div class="primary-button action-button" @click="onCreateProjectButtonClick">{{ $t("mobileSection.proceed") }}</div>
				</div>
			</div>
  	</div>
		<div class="loading-animation" v-show="showCommonLoader">
			<img src="~assets/images/StopWatch.gif" alt="" srcset="" />
		</div>
	</div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment-timezone";
import CommonUtilities from "../../../mixins/commonUtilitiesMixin";
import PayAsYouGoMixin from "../../../mixins/payAsYouGoMixin";

export default {
	components: {},
	mixins: [
		CommonUtilities,
		PayAsYouGoMixin
	],
	props: {
		projects: {
			type: Array,
			required: false,
			default: () => [],
		},
		templates: {
			type: Array,
			required: false,
			default: () => [],
		},
		rendersToShow: {
			type: Array,
			required: false,
			default: () => [],
		},
		projectsSectionHeader: {
			type: String,
			required: false,
			default: "dashboard.myProjects",
		},
		templatesSectionHeader: {
			type: String,
			required: false,
			default: "mobileSection.createUsingTemplate",
		},
		hideStartFromScratchCard: {
			type: Boolean,
			required: false,
			default: false,
		},
		isRenderComponent: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data() {
		return {
			projectName: "",
			showProjectPopup: false,
			createMatterportProject: false,
			createMoodboardProject: false,
			selectedAspectRatio: null,
			message: {
        value: "",
        error: false,
        global: false
      },
			selectedInspiration: null,
			showCommonLoader: false,
			fromScratch: false
		}
	},
	computed: {
		...mapState("User", ["user"]),
		...mapState("Projects", ["foldersTree", "usersProjects"]),
		...mapGetters("Projects", [
				"selectedFolderId",
				"userProjectsWithPagination"
		]),
		projectsToShow() {
			return this.projects || [];
		},
		inspirationsToShow() {
      console.log("inspirations", this.templates)
			return this.templates || [];
		},
	},
	mounted() {
		this.moment = moment;
		// console.log("templates",this.templates)
	},
	methods: {
		...mapActions("Projects", [
			"fetchMobileInspirations",
			"fetchInspirationsV2",
			"fetchProjectsWithPagination",
			"newProject",
			"getProjectsWithPagination",
			"creatNewV2Project"
		]),
		...mapActions("User", [
			"updateGoalForm"
		]),
		...mapActions("Render", [
			"fetchRenderListByProject"
		]),
		...mapActions("MobileSystemNotifications", [
			"addNotification",
		]),
		...mapActions("MobileBasicPopOver",['updateBasicMobilePopupConfig']),
		...mapMutations("Projects", [
			"setPageNumber"
		]),
		getProjectCreationDate(project) {
			let createdAt = project.createdAt || new Date().toISOString();
			return moment(createdAt).tz("Asia/Kolkata").format("DD/MM/YY");
		},
		getProjectCreationTime(project) {
			let createdAt = project.createdAt || new Date().toISOString();
			return moment(createdAt).tz("Asia/Kolkata").format("H:mm A");
		},
		isProjectNameMyFirstProject(project) {
				if (!project) {
						return false
				}

				if (!project.name) {
						project.name = ""
				}

				if (project.name.indexOf('my first project') >= 0) {
						return true;
				}

				return false;
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
		handleProjectOpen(project) {
			console.log("project clicked",project)
			// return
			if (!this.isRenderComponent) {
				if(project && project.sourceInspirationId) {
					this.redirectToProject(project);
				} else {
					this.updateBasicMobilePopupConfig({popupName: "loginViaDesktopPopup", data: {projectId: project._id || project.id}});
				}
			} else {
				this.$emit("onRenderMenuClick", project)
			}
		},
		handleEditInspiration(inspiration) {
			console.log("inspiration",inspiration)
			let name = ""
      if(this.isRenderComponent) {
        return
      }
			if(inspiration && inspiration.name) {
				name = inspiration.name
			}
			switch (name) {
				case "bedroom - earthy tones":
					this.sendEventToTrack("Click bedroom earthy tones inspiration") 
					break;
				case "living room design":
					this.sendEventToTrack("Click Living room inspiration")
					break;

				case "kitchen and dining design":
					this.sendEventToTrack("Click kitchen & dining inspiration") 
					break;

				case "modern bedroom design":
					this.sendEventToTrack("Click modern bedroom inspiration") 
					break;

				case "bathroom design":
					this.sendEventToTrack("Click bathroom inspiration") 
					break;

				default:
					console.log("inspiration is not mobile inspiration or no name")
					break;
			}
			// this.showProjectPopup = true
			this.selectedInspiration = inspiration
			// this.redirectToProject(inspiration);
			this.createANewProject()
		},
		isRenderAvailable(project) {
			return project.renderTaken;
		},
		onStartFromScratchClick() {
			this.fromScratch = true
			this.sendEventToTrack("Click start from scratch")
			this.createANewProject()
		},
		createANewProject() {
			if(this.userProjectsWithPagination && this.userProjectsWithPagination.length) {
				this.showProjectPopup = true
			} else {
				this.showCommonLoader = true
				this.createFirstProject();
			}
		},
		closeCreateProjectPopup() {
			this.showProjectPopup = false
			this.projectName = ""
			this.message = {
        value: "",
        error: false,
        global: false
      }
		},
		onCreateProjectButtonClick() {
			if (!this.checkProjectNamePattern(this.projectName)) {
				let projectNameDup = this.projectName;
				var projectsDuplicate = [];
				if (this.usersProjects) {
						projectsDuplicate = this.usersProjects.filter(function (
								project
						) {
								return project.name === projectNameDup;
						});
				}
				if (projectsDuplicate && projectsDuplicate.length > 0) {
					// this.message.error = true;
					// this.message.value = "Project name already exists.";
					// setTimeout(() => {
					// 	this.message.error = false;
					// 	this.message.global = false;
					// 	this.message.value = "";
					// }, 2500);
					let notification = {
						iconRef: "i",
						secondaryMessage: this.$t("mobileSection.projectNameAlreadyExists"),
						showCloseButton: true,
						timeout: 5000,
						isPersistent: false,
					}
					this.addNotification(notification)
					return;
				}
				let createProjectCB = () => {
					const data = { type: ['project'], name: this.projectName, folder: null }
					if(this.selectedInspiration) {
						data.sourceInspirationId = this.selectedInspiration._id || this.selectedInspiration.id
					} 
					if(this.fromScratch) {
						data.fromScratch = this.fromScratch
					}
					this.newProject({
						...data
					}).then(res => {
						this.setPageNumber(1);
						this.fetchProjectsWithPagination()
						// this.message.error = false;
						// this.message.value = res.message;
						// this.message.global = true;
						// setTimeout(() => {
						// 		this.message.error = false;
						// 		this.message.global = false;
						// 		this.message.value = "";
						// }, 4000);
						let notification = {
								iconRef: "i",
								secondaryMessage: res.message,
								showCloseButton: true,
								timeout: 5000,
								isPersistent: false,
							}
							this.addNotification(notification)
						if (res && res.id) {
								this.redirectToProject(res);
						}
						// amplitude.getInstance().logEvent("newProjectCreated", { projectId: res.id });
						localStorage.setItem("newProject", true);

					}).catch((error) => {
						console.log('ERROR', error);
						let message = "";
						if (error.data && error.data.error) {
								message = error.data.message;
						} else if (error.data && error.data.err && error.data.err.message) {
								message = error.data.err.message;
						}

						// if (message) {
						// 		this.message.global = true;
						// 		this.message.error = true;
						// 		this.message.value = message;
						// 		setTimeout(() => {
						// 				this.message.error = false;
						// 				this.message.global = false;
						// 				this.message.value = '';
						// 		}, 2000);
						// } 
						if(message) {
							let notification = {
								iconRef: "i",
								secondaryMessage: message,
								showCloseButton: true,
								timeout: 5000,
								isPersistent: false,
							}
							this.addNotification(notification)
						}
					}).finally(() => {
						this.fromScratch = false
						this.selectedInspiration = null
					})
				}
				createProjectCB()
				this.closeCreateProjectPopup()
				
			}
		},
		checkProjectNamePattern(_projectName) {
			let tempProject = _projectName;
			const namePattern = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u00C0-\u00FFA-Za-z0-9_ ]*$/;
			let error = false;
			let errorType = ''
			if (!tempProject || tempProject.trim('').length <= 0) {
				error = true;
				errorType = 'any.empty'
			}
			if (tempProject.trim('') && tempProject.trim('').length > 0) {
				if (tempProject.length >= 50) {
						error = true;
						errorType = 'max.limit'
				} else if (tempProject.trim('').length <= 1) {
						error = true;
						errorType = 'min.limit'
				} else {
				}
			}
			let testValue = namePattern.test(tempProject)
			if (!testValue) {
				error = true;
				errorType = 'string.regex.base'
			}
			switch (errorType) {
				case "any.empty":
					this.message.value = this.$t("errorStrings.emptyStringMessage");
					break;
				case "string.min":
					this.message.value = this.$t("errorStrings.minLengthMessage", { context: err.context.limit });
					break;
				case "string.max":
					this.message.value = this.$t("errorStrings.maxLengthMessage", { context: err.context.limit });
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
		createFirstProject() {
				const data = { type: ['project'], name: "first_project_mobile", folder: null }
				if(this.selectedInspiration) {
					data.sourceInspirationId = this.selectedInspiration._id || this.selectedInspiration.id
				} else if(this.fromScratch) {
					data.fromScratch = this.fromScratch
				}
        this.creatNewV2Project(data).then( async (projRes) => {
          this.redirectToProject(projRes);
          this.setPageNumber(1);
					this.fetchProjectsWithPagination()
					// this.showCommonLoader = false
        }).finally(e => {
					this.showCommonLoader = false
					this.fromScratch = false
					this.selectedInspiration = null
				}) 
		},
		redirectToProject(project) {
      // if (this.isSafari()) window.location = window.location.origin + "/toolv2?project=" + (project.id || project._id) + this.checkLangAndReturnLangCode();
      // else window.open(window.location.origin + "/toolv2?project=" + (project.id || project._id) + this.checkLangAndReturnLangCode(), "_blank");
			const baseUrl = `${window.location.origin}/toolv2?project=${project.id || project._id}`;
			const inspirationParam = this.selectedInspiration ? `&inspiration=${this.selectedInspiration.id || this.selectedInspiration._id}` : "";
			const langCode = this.checkLangAndReturnLangCode();
			const fullUrl = `${baseUrl}${inspirationParam}${langCode}`;
			this.selectedInspiration = null
			if (this.isSafari()) {
				window.location = fullUrl;
			} else {
				window.open(fullUrl, "_blank");
			}
    },
    convertToLocalDateTime(isoString) {
      // Parse the ISO string into a Date object
      const date = new Date(isoString);

      // Format the date components
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      // Format the time components
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const isPM = hours >= 12;

      // Convert to 12-hour format
      hours = hours % 12 || 12; // Convert 0 to 12 for AM

      // Format time as 00:00 AM/PM
      const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${isPM ? 'PM' : 'AM'}`;

      // Combine the date and time into the desired format
      return `${day}/${month}/${year} ${formattedTime}`;
    }
	},
};
</script>
<style lang="scss" scoped>
.mobile-projects-componewnt-wrapper {
	width: 100%;
	height: 100%;
	padding: 1rem;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;

	.main-header {
		color: $color-light-gray-2;
		font-size: 1rem;
		font-style: normal;
		font-weight: 600;
		line-height: 138%;
		margin-bottom: 0.5rem;

		display: flex;
		align-items: center;
		justify-content: space-between;

		&.with-margin {
			margin-top: 2rem;
		}

		.view-all-link {
			text-decoration: none;
		}

		.view-all {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: .5rem .5rem .5rem 1rem;
			border-radius: 20px;
			border: 1px solid $border-23;

			color: $color-light-gray-2;
			font-size: 0.75rem;
			font-style: normal;
			font-weight: 600;
			line-height: 138%;

			svg {
				margin-left: 0.25rem;
				display: block;
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}

	.templates-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
    width: 100%;
	  height: 100%;

		&:last-child {
			padding-bottom: 1.25rem;
		}

		.from-scratch-card {
			border-radius: 12px;
			border: 1px solid $border-21;
			background: $background-23;
			box-shadow: 0px 12px 20px 0px rgba(233, 190, 179, 0.25);

			.card-svg {
				width: 100%;
			}

			.action-wrapper {
				display: flex;
				padding: 1.25rem 0.75rem;
				justify-content: space-between;
				align-items: center;

				.text {
					color: $color-light-gray-2;
					font-size: 0.875rem;
					font-style: normal;
					font-weight: 600;
					line-height: 138%;
				}

				.svg-wrapper {
					display: flex;
					width: 2.25rem;
					height: 2.25rem;
					padding: .375rem;
					justify-content: center;
					align-items: center;
					flex-shrink: 0;
					border-radius: 20px;
					background: $background-white;

					svg {
						display: block;
						height: 100%;
						width: 100%;
					}
				}
			}
		}

		.template-card {
			border-radius: 12px;
			.image-wrapper {
				margin-bottom: 0.75rem;
				position: relative;
        height: 12.125rem;

				img {
					border-radius: 6px;
				}

				.edit {
					position: absolute;
					top: 0.5rem;
					right: 0.5rem;

					display: flex;
					padding: 0.375rem 0.5rem 0.375rem 0.375rem;
					justify-content: center;
					align-items: center;
					background-color: $background-white;
					border-radius: 6px;

					color: $color-light-gray-2;
					font-size: 0.625rem;
					font-style: normal;
					font-weight: 400;
					line-height: 138%;

					svg {
						display: block;
						margin-right: 0.25rem;
						width: 0.625rem;
						height: 0.625rem;
					}
				}
        .sample-project {
          position: absolute;
					top: 0rem;
					right: 0rem;
          display: flex;
          padding: .375rem .5rem .375rem .375rem;
          justify-content: center;
          align-items: center;
          gap: .25rem;
          border-radius: 0px 4px;
          background: rgba(58, 57, 58, 0.51);
          color: $color-white;
          
          font-size: .625rem;
          font-style: normal;
          font-weight: 600;
          line-height: 138%; /* 13.8px */
					

					
        }
        .explore-project {
          display: flex;
          position: absolute;
					bottom: .6875rem;
					left: 50%;
          transform: translateX(-50%);
          display: flex;
          padding: .375rem .5rem .375rem .375rem;
          justify-content: center;
          align-items: center;
          gap: .25rem;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.80);
          color: $color-white;
          
          font-size: .625rem;
          font-style: normal;
          font-weight: 600;
          line-height: 138%; /* 13.8px */
					
          svg {
						display: block;
						width: 1.125rem !important;
						height: 1.125rem !important;
					}
					
        }


				.render-status {
					position: absolute;
					bottom: 1rem;
					right: 0.5rem;

					display: flex;
					padding: 0.375rem 0.5rem;
					justify-content: center;
					align-items: center;
					border-radius: 20px;
					background: $background-24;

					&.is-availble {
						background: $background-26;
						.dot {
							background-color: $background-25;
						}
					}

					.dot {
						width: 0.375rem;
						height: 0.375rem;
						border-radius: 3.125rem;
						margin-right: 0.25rem;
						background-color: $background-27;
					}

					.status-text {
						color: $color-light-gray-2;
						font-size: 0.625rem;
						font-style: normal;
						font-weight: 400;
						line-height: 138%;
					}
				}
        &:hover {
          display: flex;
        }
			}

			.template-card-details {
				// padding: 0 0.25rem 0.25rem;

				.project-name,
				.name {
					word-break: break-word;
					margin-bottom: .375rem;
          color: $color-black;
          font-size: 1rem;
          font-weight: 600;
				}

				.project-name {
					margin-bottom: 0.25rem;
					// padding-bottom: 0.25rem;
				}
				.inspiration-name {
					text-transform: capitalize;
				}

				.date-and-time-wrapper {
					display: flex;
					align-items: center;
					justify-content: flex-start;

					.divider,
					.date,
					.time {
						color: $background-9;
            color: rgb(0, 0, 0, 0.5);
            font-size: .75rem;
            font-weight: 600;
					}

					.divider {
						margin: 0 0.25rem;
					}
				}

				.creator-details {
					display: flex;
					align-items: center;

					.creator-image-wrapper {
						height: 1.625rem;
						width: 1.625rem;
						margin-right: 0.375rem;
						border-radius: 1.625rem;
						overflow: hidden;

						img {
							display: block;
							height: 100%;
							width: 100%;
						}
					}

					.creator-name-and-designation-wrapper {
						.creator-designation,
						.creator-name {
							color: $color-light-gray-2;
							font-size: 0.625rem;
							font-style: normal;
							line-height: 138%;
						}

						.creator-name {
							font-weight: 600;
							margin-bottom: 0.25rem;
						}

						.creator-designation {
							font-style: normal;
							font-weight: 400;
						}
					}
				}
			}
		}
	}
}
.mobile-create-project-popup {
	.popup-body {
		padding: 1.5rem 1.25rem;
		.mobile-create-project-input-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}
		.input-wrapper {
			display: flex;
			// padding: .75rem 1.25rem;
			border-radius: 12px;
			border: 1px solid $border-25;
			background: $background-white-10;
			width: 100%;
			.mobile-create-project-input {
				padding: .75rem 1.25rem;
				outline: none;
				background: transparent;
				width: 100%;
				border: none;
			}
		}
		.error-text {
			color: $color-pink;
			font-size: 0.625rem;
		}
	}
}
.loading-animation {
	z-index: 9999;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: $background-30;
	pointer-events: all;

	img {
		width: 8.125rem;
	}
}
</style>

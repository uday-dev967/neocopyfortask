<template>
	<div v-if="loading" class="section-full-height main-loading">
		<div class="loading-container">
			<p>Loading...</p>
			<div class="loader"></div>
		</div>
	</div>
	<section v-else class="section-full-height notification-page-wrapper">

		<div class="page-heading-section">
			<div class="page-heading-wrapper">
				<div class="page-heading-container">
					My Notifications
				</div>
				<!-- <div class="page-subheading-container">
                    Lorem ipsum dolor sit amet consectetur.
                </div> -->
			</div>

			<div class="filter-section-wrapper notification-filter-section-wrapper">
				<div class="notification-search-wrapper">
					<input class="notification-search" type="text" v-model="searchText" name="search" id="searchName"
						autocomplete="off" placeholder="Search notifications">
				</div>
				<MultiselectDropDown :selected="selectedClientsFilter" :list="clientFiltersList" :clickable="true"
					class="clients-filters" displayKey="name" valueKey="leadId"
					@listElementClick="onFilterDropdownValueChange($event, 'ClientsFilter')"
					@close="onFilterDropdownClose">
					<template slot="placeholder">
						<div class="filter-count-section">
							<p>Client Name/ID</p>
							<div v-if="selectedClientsFilter.length" class="count-wrapper">
								{{ selectedClientsFilter.length }}
							</div>
						</div>
					</template>
					<template slot="dropdownContainerEnd">
						<!-- ="{ closeDropdown }" -->
						<div class="dropdown-action-button-wrapper">
							<div class="clear-all-button" @click="onFilterClearAllClick('ClientsFilter')">
								Clear All
							</div>
							<div class="get-results-button" @click="handleGetResultsClick">
								Get Results
							</div>
							<!-- @click="closeDropdown()" -->
						</div>
					</template>
				</MultiselectDropDown>
				<!-- placeholder="Status" -->
				<MultiselectDropDown :selected="selectedStatusFilters" :list="statusFiltersList" :clickable="true"
					@listElementClick="onFilterDropdownValueChange($event, 'StatusFilters')"
					@close="onFilterDropdownClose">
					<template slot="placeholder">
						<div class="filter-count-section">
							<p>Status</p>
							<div v-if="selectedStatusFilters.length" class="count-wrapper">
								{{ selectedStatusFilters.length }}
							</div>
						</div>
					</template>
					<template slot="dropdownContainerEnd">
						<!-- ="{ closeDropdown }" -->
						<div class="dropdown-action-button-wrapper">
							<div class="clear-all-button" @click="onFilterClearAllClick('StatusFilters')">
								Clear All
							</div>
							<div class="get-results-button" @click="handleGetResultsClick">
								Get Results
							</div>
							<!-- @click="closeDropdown()" -->
						</div>
					</template>
				</MultiselectDropDown>
			</div>
		</div>
		<div class="page-list-section">
			<div v-for="project of notificationsList" :key="project._id" class="project-wrapper"
				@click="toggleProjectListExpansion(project._id)">
				<div class="project-name-wrapper">
					<div class="project-name">
						<img :src="getImageForProject(project)">
						{{ project.projectName }}
					</div>
					<div v-if="projectWiseNotificationCount[project._id]" class="notifications-count-wrapper">
						{{ projectWiseNotificationCount[project._id] }}
					</div>
					<div class="list-expansion-icon" :class="{ 'is-opened': !notificationExpanded[project._id] }">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<path
								d="M8.99953 9.87831L12.7119 6.16602L13.7725 7.22667L8.99953 11.9997L4.22656 7.22667L5.28723 6.16602L8.99953 9.87831Z"
								fill="#3A393A" />
						</svg>
					</div>
				</div>

				<div :class="{ 'is-closed': notificationExpanded[project._id] }" class="batches-container">

					<div v-for="batch of project.batches" :key="batch._id" class="batch-wrapper">
						<div class="batch-version-name">{{ batch.name }}</div>
						<div v-for="commentsInfo of batch.tasks" :key="commentsInfo._id"
							class="notification-list-item-wrapper" :class="{ 'room-level-comment': isCommentRoomLevelComment(commentsInfo) }" @click.stop="openRenderCommentsPopup(commentsInfo)">
							<div class="iwpar render-image-wrapper">
								<img :src="(commentsInfo.render && commentsInfo.render.renderThumbnail) || ''" alt="">
							</div>
							<div class="comments-info-wrapper">
								<div class="comments-user-info-wrapper">
									{{ commentsInfo.leadName }} / {{ commentsInfo.leadId }} <span class="grey">|</span>
									<span class="bold">{{ commentsInfo.roomName }}</span> <span class="bold">{{ isCommentRoomLevelComment(commentsInfo) ? ' | Room Level' : '' }}</span>
								</div>
								<div v-if="commentsInfo.commentInfo" class="comment-wrapper">
									{{ commentsInfo.commentInfo.comment }}
								</div>
							</div>
							<div class="comment-status-info-wrapper">
								<div class="time-elapse-container">
									{{ commentsInfo.commentInfo && commentsInfo.commentInfo.isDesigner ? "Designer | " : "" }}
									{{ getAgoInfoForMainComment(commentsInfo) }}
								</div>
								<div class="status-info-container">
									{{ commentsInfo.status }}
								</div>
							</div>
						</div>

					</div>
				</div>

			</div>
			<!-- <ScrollObserver
              v-if="notificationsList.length >= notificationsListPageSize"
              v-on:scrolledToEnd="loadMoreData"
            /> -->
		</div>

		<!-- class="" -->
		<DefaultPopup v-if="renderCommentsPopupState && selectedRender" :width="64 * 1.22 + 'rem'" height="21.5rem"
			class="render-comments-popup" @closePopup="closeRenderCommentsPopup">
			<div class="render-comments-popup-wrapper">
				<div class="iwpar popup-render-image-wrapper">
					<div class="popup-render-image-container" @click="onImageSectionClick">
						<img :src="selectedRender.render.renderImageUrl" alt="" @load="onImageLoad">
						<template v-if="renderHeight && renderWidth">
							<CommentBubble v-for="(commentsInfo, index) of commentsWithPositionData"
								:id="commentsInfo._id" :key="commentsInfo._id || index"
								boundingElementSelector=".popup-render-image-container"
								:customerInfo="selectedRender.customerInfo" :commentsInfo="commentsInfo.commentInfo"
								:topInPixels="renderHeight / 2 + (commentsInfo.commentInfo.positionInfo.y * renderHeight)"
								:leftInPixels="renderWidth / 2 + (commentsInfo.commentInfo.positionInfo.x * renderWidth)"
								:selectedBubbleId="currentlySelectedBubble" :bubbleId="commentsInfo._id"
								@onBubbleClick="onBubbleClick" @onExpandCommentClick="onExpandCommentClick($event, commentsInfo)">
							</CommentBubble>
						</template>
					</div>
				</div>
				<div class="comments-list-section-wrapper">
					<div class="section-heading-wrapper filter-section-wrapper">
						<div class="section-heading-container">
							{{ selectedRender.roomName }}
						</div>
						<MultiselectDropDown :selected="selectedPopupStatusFilters" :list="statusFiltersList"
							:clickable="true" class="status-multiselect-dropdown"
							@listElementClick="onFilterDropdownValueChange">
							<template slot='mainContainer'>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									fill="none">
									<path
										d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071ZM9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6ZM15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13ZM9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z"
										fill="#F7E3DF" />
								</svg>
							</template>
							<template slot="dropdownContainerEnd" slot-scope="{closeDropdown}">
								<div class="dropdown-action-button-wrapper">
									<div class="clear-all-button" @click="onPopupFilterClearAllClick">
										Clear All
									</div>
									<div class="get-results-button" @click="handlePopupGetResultsClick(closeDropdown)">
										Get Results
									</div>
								</div>
							</template>
						</MultiselectDropDown>
					</div>
					<div class="comments-list-section-content-wrapper">
						<div v-for="(commentsInfo, index) of commentsList" :key="commentsInfo._id || index"
							:id="`${commentsInfo._id}_comment_in_list`" class="comments-list-item-wrapper"
							:class="{ 
								'selected': currentlySelectedBubble == commentsInfo._id,
								'room-level-comment': isCommentRoomLevelComment(commentsInfo)
						 	}">
							<div class="comments-info-wrapper">
								<div class="comments-user-info-wrapper">
									<div class="comments-user-info-container">
										{{ commentsInfo.commentInfo.isDesigner ? "Designer" : `${ commentsInfo.leadName } | ${ commentsInfo.leadId }` }}
									</div>
									<div class="time-elapse-container">
										{{isCommentRoomLevelComment(commentsInfo) ? 'Room Level | ' : ""}} {{ getAgoInfoFromISODate(commentsInfo.createdAt) }}
									</div>
								</div>
								<div class="status-info-container">
									<BasicDropDown :selected="statusMappingByCommentID[commentsInfo._id]"
										:drop-down-list="statusFiltersList" :clickable="true"
										:close-drop-down-on-item-selection="true"
										@listElementClick="onCommentStatusUpdate($event, commentsInfo._id)" />
								</div>
							</div>
							<div class="comment-wrapper">
								{{ commentsInfo.commentInfo.comment }}
							</div>
							<div v-show="currentlyExpandedComment === commentsInfo._id" class="comment-thread-wrapper">
								<div
									v-for="(childComment, index) of commentsInfo.commentInfo.threads" :key="childComment._id || index" 
									class="comments-list-item-wrapper"
								>
									<div class="comments-info-wrapper">
										<div class="comments-user-info-wrapper">
											<div class="comments-user-info-container">
												{{ childComment.isDesigner ? "Designer" : commentsInfo.commentInfo.leadName }}
											</div>
											<div class="time-elapse-container">
												{{ getAgoInfoFromISODate(childComment.createdAt) }}
											</div>
										</div>
									</div>
									<div class="comment-wrapper">
										{{ childComment.comment }}
									</div>
								</div>
							</div>
							<svg @click="handleExpandCommentClick(commentsInfo)" class="expand-svg" :class="{ rotate: currentlyExpandedComment === commentsInfo._id }" width="335" height="20" viewBox="0 0 335 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="335" height="2" transform="matrix(1 0 0 -1 0 9)" fill="#3A393A" fill-opacity="0.4"/>
								<ellipse cx="167.5" cy="10" rx="9.97024" ry="10" fill="white"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M163.687 13.2843L167.5 9.40006L171.314 13.2843L172.485 12.0885L167.5 7L162.515 12.0885L163.687 13.2843Z" fill="black"/>
							</svg>
						</div>
					</div>
					<div class="popup-action-button-wrapper">
						<div class="popup-action-button" @click="onEditFileButtonClick">
							Edit File
						</div>
					</div>
				</div>
			</div>
		</DefaultPopup>

		<div id="remIndicator"></div>
	</section>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import MultiselectDropDown from "../../components/shared/multiselectDropDown.vue";
import DefaultPopup from "../../components/shared/defaultPopup.vue";
import BasicDropDown from "../../components/shared/basicDropDown.vue";
import CommentBubble from "../../components/shared/commentBubble.vue";
import ScrollObserver from "../../components/shared/scrollObserver.vue";
import CommonUtilities from "../../mixins/commonUtilitiesMixin";

export default {
	layout: "dashboard",
	middleware: ["iframe", "initAuth", "authReq"],
	mixins: [CommonUtilities],
	components: {
		MultiselectDropDown,
		DefaultPopup,
		BasicDropDown,
		CommentBubble,
		ScrollObserver,
	},
	head() {
		return {
			title: "Neo",
		};
	},
	data() {
		return {
			loading: false,
			selectedStatusFilters: [],
			selectedPopupStatusFilters: [],
			selectedClientsFilter: [],
			renderCommentsPopupState: false,
			selectedRender: null,
			selectedRenderImage: "",
			selectedRenderCommentsList: [],
			searchPhrase: "",
			renderHeight: 0,
			renderWidth: 0,
			currentlySelectedBubble: "",
			currentlyExpandedComment: "",
			viewProjectId: "",
			notificationExpanded: {},
			searchText: "",
			timerId: null,
			projectWiseNotificationCount: {}
		};
	},
	asyncData() { },
	mounted() {
		// this.openRenderCommentsPopup(this.commentsNotificationList[0]);
		this.fetchNotificationsListWrapper();
		this.getTaskManagementStatusList();
		this.getAPCustomerLeads();
	},
	computed: {
		...mapGetters("CommentNotifications", [
			"statusFiltersList",
			"clientFiltersList",
			"commentsNotificationList",
			"notificationsListPageSize",
			"notificationsListPageNo",
			"notificationsList",
			"commentsList",
			"statusMappingByCommentID",
			"commentsWithPositionData",
		]),
	},
	watch: {
		notificationsList(newInput) {
			newInput.map((notification, index) => {
				if (index === 0) {
					this.$set(this.notificationExpanded, notification._id, false);
				}
				else {
					this.$set(this.notificationExpanded, notification._id, true);
				}
			});
		},
		searchText(newInput) {
			if (newInput !== null) {
				if (this.timerId) {
					clearTimeout(this.timerId)
					this.timerId = null
				}
				this.timerId = setTimeout(async () => {
					this.fetchNotificationsListWrapper()
				}, 500)
			}
		}
	},
	methods: {
		...mapMutations("CommentNotifications", ["setNotificationsListPageNo"]),
		...mapActions("CommentNotifications", [
			"fetchNotificationsList",
			"fetchCommentsByRenderID",
			"getTaskManagementStatusList",
			"updateTaskManagementCommentAttributeByID",
			"getAPCustomerLeads",
			"updateCommentAttributes"
		]),

		onFilterDropdownValueChange(data, filterType) {
			this[`selected${filterType}`] = data;
		},
		onFilterClearAllClick(filterType) {
			this[`selected${filterType}`] = [];
		},
		onFilterDropdownClose() {
			this.fetchNotificationsListWrapper();
		},
		handleGetResultsClick() {
			document.querySelector("input").focus()
		},
		onPopupFilterClearAllClick() {
			this.selectedPopupStatusFilters = [];
		},
		handlePopupGetResultsClick(closeDropdown) {
			closeDropdown();
			this.fetchCommentsListForRenderPopup();
		},
		openRenderCommentsPopup(data) {
			// console.log(data);
			this.selectedRender = data;
			this.fetchCommentsListForRenderPopup().then(() => {
				this.renderCommentsPopupState = true;
			});
			// this.selectedRenderImage = data.image;
			// this.selectedRenderCommentsList = data.commentsList;
		},
		closeRenderCommentsPopup() {
			this.renderCommentsPopupState = false;
			this.selectedRender = null;
			this.selectedPopupStatusFilters = [];
			this.renderHeight = 0;
			this.renderWidth = 0;
			this.currentlySelectedBubble = "";
			// this.selectedRenderImage = "";
			// this.selectedRenderCommentsList = [];
		},
		fetchCommentsNotification() {
			// this.isLoading = true;
			this.fetchNotificationsList({
				...(this.selectedStatusFilters.length && {
					statuses: this.selectedStatusFilters.map(e => e.value),
				}),
			}).then(() => {
				// this.isLoading = false;
			});
		},
		onCommentStatusUpdate(data, commentsID) {
			// console.log(data);
			this.updateTaskManagementCommentAttributeByID({
				_id: commentsID,
				status: data,
			});
		},
		loadMoreData() {
			this.setNotificationsListPageNo(this.notificationsListPageNo + 1);
			this.fetchCommentsNotification();
		},
		fetchCommentsListForRenderPopup() {
			return this.fetchCommentsByRenderID({
				renderId: this.selectedRender.metaData.renderId,
				...(this.searchPhrase && {
					comment: this.searchPhrase,
				}),
				...(this.selectedPopupStatusFilters.length && {
					statuses: this.selectedPopupStatusFilters.map(e => e.value),
				}),
			});
		},
		onEditFileButtonClick() {
			window.open(
				window.location.origin +
				`/toolv2?project=${this.selectedRender.projectId}&comment=${this.selectedRender._id
				}&render=${this.selectedRender.render._id}`
			);
		},
		onImageLoad() {
			let element = document.querySelector(
				".render-comments-popup-wrapper .popup-render-image-container img"
			);
			this.renderHeight = element.height;
			this.renderWidth = element.width;
		},
		onBubbleClick(bubbleId) {
			this.currentlySelectedBubble = bubbleId;
			let commentInList = document.getElementById(`${bubbleId}_comment_in_list`)
			if (commentInList) {
				commentInList.scrollIntoView({
					behavior: "smooth",
					block: "start"
				})
			}
		},
		async onExpandCommentClick(bubbleId, commentInfo) {
			this.currentlyExpandedComment = bubbleId;
			if (commentInfo.commentInfo.newClientComment) {
				await this.updateCommentAttributes({
					_id: commentInfo.metaData.commentId,
				    newClientComment: false
				})
				this.fetchCommentsListForRenderPopup();
				this.fetchNotificationsListWrapper();
			}
		},
		async handleExpandCommentClick(commentsInfo) {
			if (commentsInfo._id === this.currentlySelectedBubble) {
				this.currentlySelectedBubble = "";
				this.currentlyExpandedComment = "";
			} else {
				this.currentlySelectedBubble = commentsInfo._id;
				this.currentlyExpandedComment = commentsInfo._id;
				if (commentsInfo.commentInfo.newClientComment) {
					await this.updateCommentAttributes({
						_id: commentsInfo.metaData.commentId,
						newClientComment: false
					})
					this.fetchCommentsListForRenderPopup();
					this.fetchNotificationsListWrapper();
				}
			}
		},
		onImageSectionClick() {
			this.currentlySelectedBubble = "";
			this.currentlyExpandedComment = "";
		},
		toggleProjectListExpansion(id) {
			this.notificationExpanded[id] = !this.notificationExpanded[id]
		},
		fetchNotificationsListWrapper() {
			this.fetchNotificationsList({
				searchText: this.searchText,
				...(this.selectedStatusFilters.length && {
					statuses: this.selectedStatusFilters.map(e => e.value),
				}),
				...(this.selectedClientsFilter.length && {
					leadIds: this.selectedClientsFilter.map(e => e.leadId),
				}),
			}).then((projectList) => {
				if (projectList) {
					for(const project of projectList) {
						let batches = project.batches;
						for (const batch of batches) {
							let tasks = batch.tasks;
							for (const task of tasks) {
								if (task.commentInfo && task.commentInfo.newClientComment) {
									if (!this.projectWiseNotificationCount[project._id]) {
										this.$set(
											this.projectWiseNotificationCount,
											project._id,
											1
										)
									} else {
										this.projectWiseNotificationCount[project._id] += 1;
									}
								}
							}
						}
					}
				}
			})
		},
		getImageForProject(project = null) {
			if (
				project &&
				project.batches &&
				project.batches.length > 0
			) {
				let batch = project.batches[0];
				if (
					batch.tasks &&
					batch.tasks.length > 0
				) {
					let task = batch.tasks[0]
					if (
						task.render &&
						task.render.renderThumbnail
					) {
						return task.render.renderThumbnail;
					}

					return ""
				}

				return ""
			}

			return ""
		},
		getAgoInfoForMainComment(commentBody) {
			if (commentBody.commentInfo.threads && commentBody.commentInfo.threads.length > 0) {
				return this.getAgoInfoFromISODate(commentBody.commentInfo.threads[commentBody.commentInfo.threads.length - 1].createdAt)
			}
			return this.getAgoInfoFromISODate(commentBody.createdAt)
		},
		isCommentRoomLevelComment(commentBody) {
			if ( commentBody.commentInfo.skucode == commentBody.commentInfo.renderId ) return true
			return false
		}
	},
};
</script>
<style lang="scss" scoped>
#remIndicator {
	position: absolute;
	top: -10000;
	left: -10000;
	background: transparent;
	opacity: 0;
	width: 1rem;
	height: 1rem;
	z-index: 1;
	pointer-events: none;
	visibility: hidden;
}

.section-full-height {
	height: calc(100vh - 3.75rem * 1.22);
}

// .notification-page-wrapper {
// 	padding: 2.5rem;
// }

.page-heading-section {
	height: 6.25rem * 1.22;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2.5rem * 1.22;

	.page-heading-wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		.page-heading-container {
			color: $color-dark-gray;
			font-size: 0.875rem * 1.22;
			font-weight: 700;
		}

		.page-subheading-container {
			color: $color-light-gray-2;
			font-size: 0.75rem * 1.22;
			font-weight: 500;
		}
	}

	.notification-filter-section-wrapper {
		display: flex;
		align-items: center;
		align-content: center;

		.notification-search-wrapper {
			height: 3.05rem;
			margin-right: 0.75rem;
			width: 22.0625rem;

			.notification-search {
				width: 100%;
				height: 100%;
				background: $background-white;
				border: 0.0625rem solid $border-7;
			}
		}

		.multi-select-drop-down-section-container {
			min-width: 8rem * 1.22;

			&:not(:last-child) {
				margin-right: 0.5rem * 1.22;
			}

			.multi-select-drop-down-container {
				right: 0;
			}
		}
	}
}

.page-list-section {
	display: flex;
	flex-direction: column;
	padding: 0 2.5rem * 1.22;
	height: calc(100% - 6.25rem * 1.22);

	.project-wrapper {
		border: 0.0625rem solid $border-7;
		padding: 1rem;
		margin-bottom: 1rem;
		cursor: pointer;

		.project-name-wrapper {
			display: flex;
			align-items: center;
			flex-grow: 1;

			.project-name {
				display: flex;
				align-items: center;
				color: $banner-sub-heading-color;
				font-size: 0.875rem;
				font-weight: 700;
				padding-right: 0.5625rem;
				flex-grow: 1;

				img {
					display: block;
					height: 2.9375rem * 1.22;
					width: 2.9375rem * 1.22;
					margin-right: 1rem;
				}
			}

			.notifications-count-wrapper {
				display: flex;
				padding: .125rem * 1.22 .5rem * 1.22;
				align-items: flex-start;

				color: $color-white;
				font-size: .625rem * 1.22;
				font-style: normal;
				font-weight: 500;
				line-height: normal;

				margin-right: 1rem * 1.22;

				border-radius: 2px;
				background: $background-5;
			}

			.list-expansion-icon {
				display: flex;
				align-items: center;

				svg {
					width: 1.125rem !important;
					height: 1.125rem !important;
				}
			}

			.is-opened {
				transform: rotate(180deg);
				transition: transform 300ms ease-in-out;
			}
		}

		.batches-container {
			max-height: 100%;
			transition: max-height 0.5s ease-in-out;

			&.is-closed {
				max-height: 0;
				overflow: hidden;

			}
		}

		.batch-wrapper {
			padding: 1rem 0rem;
			transition: max-height 2s ease-in-out;
			display: flex;
			flex-direction: column;

			&:not(:last-child)::after {
				content: "";
				display: block;
				border-bottom: 0.0625rem solid $border-7;
				margin-top: 1rem;
			}

			.batch-version-name {
				order: 1;
				color: $color-light-gray-2;
				font-size: 0.75rem;
				font-weight: 600;
				margin-bottom: 0.4375rem;
			}

			.notification-list-item-wrapper {
				cursor: pointer;
				border: 0.5px solid $border-1;
				background-color: $background-white-2;
				display: grid;
				grid-template-columns: max-content 1fr max-content;
				padding: 1rem * 1.22 1.5rem * 1.22;
				gap: 0.75rem * 1.22;
				order: 2;

				&.room-level-comment {
					order: 1;
				}

				&:hover {
					border: 0.5px solid $border-8;
					background: $background-white;
				}

				.render-image-wrapper {
					height: 3.5rem * 1.22;
					width: 3.5rem * 1.22;
					background: $background-11;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.comments-info-wrapper {
					display: flex;
					flex-direction: column;

					.comments-user-info-wrapper {
						color: $color-light-gray-2;
						font-size: 0.875rem * 1.22;
						font-weight: 500;
						margin-bottom: 0.25rem * 1.22;

						span.grey {
							font-size: inherit;
							color: $color-light-gray-3;
						}

						span.bold {
							font-size: inherit;
							font-weight: 600;
						}
					}
				}

				.comment-status-info-wrapper {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-end;

					.time-elapse-container {
						color: rgba(58, 57, 58, 0.6);
						font-size: 0.75rem * 1.22;
						font-weight: 500;
						margin-right: 0.5rem;
					}

					.status-info-container {
						color: $color-light-gray-2;
						font-size: 0.625rem * 1.22;
						font-weight: 500;
						padding: 0.5rem * 1.22 0.75rem * 1.22;
						border-radius: 10rem * 1.22;
						background: rgba(198, 198, 198, 0.4);
						line-height: 1;
					}
				}
			}
		}


	}

	// .notification-list-item-wrapper {
	// 	cursor: pointer;
	// 	border: 0.5px solid $border-8;
	// 	background: $background-white;
	// 	display: grid;
	// 	grid-template-columns: max-content 1fr max-content;
	// 	padding: 1rem * 1.22 1.5rem * 1.22;
	// 	gap: 0.75rem * 1.22;

	// 	&:hover {
	// 		border-color: #e9beb3;
	// 		background-color: $background-white-2;
	// 	}

	// 	.render-image-wrapper {
	// 		height: 3.5rem * 1.22;
	// 		width: 3.5rem * 1.22;
	// 		background: $background-11;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 	}

	// 	.comments-info-wrapper {
	// 		display: flex;
	// 		flex-direction: column;

	// 		.comments-user-info-wrapper {
	// 			color: #3a393a;
	// 			font-size: 0.875rem * 1.22;
	// 			font-weight: 500;
	// 			margin-bottom: 0.25rem * 1.22;

	// 			span.grey {
	// 				font-size: inherit;
	// 				color: $color-light-gray-3;
	// 			}

	// 			span.bold {
	// 				font-size: inherit;
	// 				font-weight: 600;
	// 			}
	// 		}
	// 	}

	// 	.comment-status-info-wrapper {
	// 		display: flex;
	// 		flex-direction: column;
	// 		justify-content: space-between;
	// 		align-items: flex-end;

	// 		.time-elapse-container {
	// 			color: rgba(58, 57, 58, 0.6);
	// 			font-size: 0.75rem * 1.22;
	// 			font-weight: 500;
	// 			margin-right: 0.5rem;
	// 		}

	// 		.status-info-container {
	// 			color: #3a393a;
	// 			font-size: 0.625rem * 1.22;
	// 			font-weight: 500;
	// 			padding: 0.5rem * 1.22 0.75rem * 1.22;
	// 			border-radius: 10rem * 1.22;
	// 			background: rgba(198, 198, 198, 0.4);
	// 			line-height: 1;
	// 		}
	// 	}
	// }
}

.render-comments-popup-wrapper {
	display: grid;
	grid-template-columns: 1fr 21rem * 1.22;
	overflow: hidden;
	height: 40rem * 1.22;
	// grid-template-rows: 84vh;
	// height: 100%;

	.popup-render-image-wrapper {
		background-color: $background-white;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		.popup-render-image-container {
			position: relative;
			max-width: 100%;
			max-height: 100%;
			// height: 100%;

			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.comments-list-section-wrapper {
		display: grid;
		grid-template-rows: max-content 1fr max-content;
		height: 100%;
		overflow: hidden;

		.section-heading-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem;

			color: $color-white;
			font-size: 1.125rem * 1.22;
			font-weight: 700;
			line-height: 1;

			.filter-icons-wrapper {
				display: flex;
			}
		}

		.comments-list-section-content-wrapper {
			overflow: auto;
			display: flex;
			flex-direction: column;

			.comment-thread-wrapper {
				.comments-list-item-wrapper  {
					border-left: 1px dashed $border-1;
					padding: 0.5rem * 1.22 1.375rem * 1.22;
					border-top: none;
					margin-top: .625rem * 1.22;
				}
			}

			.comments-list-item-wrapper {
				border-top: 1px solid $border-9;
				padding: 1rem * 1.22 1.375rem * 1.22;
				order: 2;
				position: relative;

				&.selected {
					border: 1px solid $border-1;
				}

				&.room-level-comment {
					order: 1;
				}

				&:hover {
					.expand-svg {
						display: block;
					}
				}

				.comments-info-wrapper {
					display: flex;
					justify-content: space-between;

					.comments-user-info-wrapper {
						.comments-user-info-container {
							color: $color-second;
							font-size: 0.75rem * 1.22;
							font-weight: 500;
							line-height: 1;
							margin-bottom: 0.375rem * 1.22;
						}

						.time-elapse-container {
							color: $color-head-1;
							font-size: 0.625rem * 1.22;
							font-weight: 500;
							line-height: 1;
							margin-bottom: 0.625rem * 1.22;
						}
					}

					.status-info-container {
						.select-drop-down-container {
							border: 1px solid rgba(255, 255, 255, 0.4);
							// color: $color-light-gray-2;
							padding: 0.25rem * 1.22 0.625rem * 1.22;
							border-radius: 10rem * 1.22;

							p {
								font-size: 0.625rem * 1.22;
								font-weight: 500;
								line-height: 1;
							}
						}
					}
				}

				.comment-wrapper {
					color: $color-white;
					font-size: 0.75rem * 1.22;
					font-weight: 400;
					// opacity: 0.5;
				}

				.expand-svg {
					display: none;
					cursor: pointer;
					position: absolute;
					bottom: 0;
					left: 0;
					height: auto !important;
					width: 100% !important;
					transform: translateY(50%) rotate(180deg);

					&.rotate {
						transform: translateY(50%) rotate(0deg);
					}
				}
			}
		}

		.popup-action-button-wrapper {
			border-top: 1px solid hsla(120, 1%, 65%, 0.4);
			padding: 1.5rem * 1.22;

			.popup-action-button {
				cursor: pointer;
				padding: 0.625rem * 1.22;
				background: $background-10;
				color: $color-dark-gray-2;
				font-size: 1rem * 1.22;
				font-weight: 700;
				text-align: center;

				&:hover {
					background: $background-12;
				}
			}
		}
	}
}
</style>

<style lang="scss">
.filter-section-wrapper {
	// height: 100%;
	// width: 80%;
	// display: flex;
	// align-items: center;
	// flex-wrap: wrap;
	// align-content: center;

	.multi-select-drop-down-section-container {
		&.on-active {
			.multi-select-drop-down-container {
				border: 1px solid $border-1 !important;
				right: 0;
			}
		}

		.drop-down-normal-box {
			background-color: transparent;
			border: 1px solid $border-1 !important;
			height: 2.5rem * 1.22;

			.filter-count-section {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				p {
					font-size: 0.75rem * 1.22;
					margin-right: 0.5rem;
				}

				.count-wrapper {
					color: #1d1d1d;
					font-size: 0.75rem * 1.22;
					font-weight: 600;
					height: 1.5rem * 1.22;
					width: 1.5rem * 1.22;
					background-color: $background-10;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					margin-right: 1rem;
				}
			}
		}

		.get-results-button {
			box-shadow: none !important;
		}
	}

	.clients-filters {
		.multi-select-drop-down-container {
			width: 20rem * 1.22;
		}
	}

	.multi-select-drop-down-container {
		width: 13rem * 1.22;
		grid-template-rows: 1fr max-content;
		padding-bottom: 0 !important;
		left: unset !important;
		right: 0 !important;
		top: calc(100% + 0.5rem * 1.22) !important;
	}

	.dropdown-action-button-wrapper {
		display: flex;

		font-weight: 700;
		font-size: 0.75rem * 1.22;
		line-height: 0.9375rem * 1.22;
		padding: 0.5rem * 1.22;

		&>div {
			padding: 0.5rem;
			flex-basis: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}

		.clear-all-button {
			color: $color-black;

			// &:hover {
			// 	// color: $color-main;
			// }
		}

		.get-results-button {
			color: $color-black;
			background: $color-second;
			box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);

			// &:hover {
			// 	// background: $background-12;
			// }
		}
	}
}

.render-comments-popup-wrapper {
	.section-heading-wrapper {
		.multi-select-drop-down-section-container {
			&.status-multiselect-dropdown {
				.drop-down-normal-box {
					border: none !important;
				}

				.multi-select-drop-down-container {
					border: none !important;
					background: $background-4;
					box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.16);

					.items-container {
						.drop-down-list-section {
							&.selected {
								label {
									background-color: $background-9;
								}
							}
						}

						label {
							color: $color-white !important;
							font-weight: 400;

							&:hover {
								background-color: $background-9;
							}
						}
					}

					.dropdown-action-button-wrapper {
						.clear-all-button {
							color: $color-white;
							font-weight: 500;
						}
					}
				}
			}
		}
	}
}

.comments-list-section-content-wrapper {
	.comments-info-wrapper {
		.status-info-container {
			.drop-down-container {
				min-width: 10rem;
				left: unset;
			}
		}
	}
}
</style>

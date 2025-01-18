<template>
	<div class="mobile-gallery-wrapper">
		<div class="mobile-content-wrapper">
			<template v-if="transformedRenders.length === 0">
				<div class="no-projects-container">
					<svg
						class="svg-wrapper"
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
					>
						<path
							d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
							stroke="#C4C4C4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12.5 6V12L16.5 14"
							stroke="#C4C4C4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div class="text">
						{{ $t("mobileSection.noRendersText[0]") }}
					</div>
					<div class="text">
						{{ $t("mobileSection.noRendersText[1]") }}
					</div>
				</div>
				<mobileProjectsComponent
					class="no-projects-wrapper"
					:projects="[]"
					:templates="mobileInspirations"
					projectsSectionHeader="mobileSection.getStarted"
					templatesSectionHeader=""
					:isRenderComponent="true"
				>
					<template slot="viewAll"> <div></div> </template
				></mobileProjectsComponent>
			</template>
			<template v-else>
				<mobileProjectsComponent
					:projects="transformedRenders"
					projectsSectionHeader=""
					templatesSectionHeader=""
					:hideStartFromScratchCard="true"
					:isRenderComponent="true"
					@onRenderMenuClick="handleRenderMenuClick"
				>
					<template slot="viewAll"> <div></div> </template>
					<template slot="edit" slot-scope="slotProps">
						<div
							v-if="slotProps.item.isCompleted"
							class="render-menu"
							@click.stop="handleRenderMenuClick(slotProps.item)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="13"
								height="12"
								viewBox="0 0 13 12"
								fill="none"
							>
								<path
									d="M6.5 6H6.505V6.005H6.5V6ZM6.5 2.5H6.505V2.505H6.5V2.5ZM6.5 9.5H6.505V9.505H6.5V9.5Z"
									stroke="black"
									stroke-width="2"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<div v-else></div>
					</template>
					<template slot="renderStatus"> <div></div> </template>
				</mobileProjectsComponent>
				{{ transformedRenders.length }}
				<ScrollObserver
					v-if="transformedRenders.length >= 10"
					v-on:scrolledToEnd="loadMoreRenders"
				/>
			</template>
			<div
				v-show="isRenderDetailsPopupVisible && selectedRender"
				ref="renderDrawer"
				class="render-details-bottom-drawer"
				:class="[{ 'is-visible': isRenderDetailsPopupVisible }]"
				>
				<div class="drawer-indicator"></div>
				<div  v-if="selectedRender" class="render-name-and-close-button-wrapper">
					<div class="name">{{ selectedRender.name }}</div>
					<div class="close-svg" @click="closeRenderDetailsPopup">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M18 6L6 18"
								stroke="#C4C4C4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M6 6L18 18"
								stroke="#C4C4C4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
				<div class="image-wrapper" v-if="selectedRender">
					<img :src="selectedRender.properties.thumbnail" alt="" />
				</div>
				<div class="share-title">{{ $t("mobileSection.shareBy") }}</div>
				<social-sharing
					:url="shareUrl"
					title="Check out my latest design"
					description="Created on Foyr Neo - Lightning fast interior design software"
					:quote="''"
					hashtags="#render #neo #interiordesign #fastrendering #foyr"
					:twitter-user="''"
					inline-template
					@open=""
				>
					<div class="social-networks">
						<!-- ************SMS **************** -->
						<network network="sms">
							<div class="action-item">
								<div class="icon-wrapper">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
											stroke="#3A393A"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
								<div class="label">{{ $t("mobileSection.message") }}</div>
							</div>
						</network>
						<!-- ************Email **************** -->
						<network network="email">
							<div class="action-item">
								<div class="icon-wrapper">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
											stroke="#3A393A"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M22 6L12 13L2 6"
											stroke="#3A393A"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
								<div class="label">{{ $t("mobileSection.email") }}</div>
							</div>
						</network>
						<!-- ************Twitter **************** -->
						<network network="twitter">
							<div class="action-item">
								<div class="icon-wrapper">
									<svg
										width="65"
										height="65"
										viewBox="0 0 65 65"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="32.25"
											cy="32.7627"
											r="31.5"
											stroke="#4D4C4D"
										/>
										<path
											d="M47.0189 23.6039C45.9205 24.0858 44.75 24.4052 43.5297 24.5602C44.7851 23.8107 45.7432 22.6328 46.1937 21.2132C45.0232 21.911 43.7309 22.4039 42.3537 22.679C41.2423 21.4956 39.6583 20.7627 37.9303 20.7627C34.5777 20.7627 31.8786 23.4839 31.8786 26.8199C31.8786 27.2999 31.9192 27.7615 32.0189 28.2008C26.9845 27.9553 22.5297 25.5424 19.5371 21.8667C19.0146 22.7732 18.7082 23.8107 18.7082 24.9276C18.7082 27.0248 19.7882 28.8839 21.398 29.9602C20.4251 29.9418 19.4706 29.6593 18.662 29.2144C18.662 29.2328 18.662 29.2568 18.662 29.2808C18.662 32.2236 20.7611 34.6679 23.5137 35.231C23.0208 35.3658 22.4835 35.4304 21.926 35.4304C21.5383 35.4304 21.1469 35.4082 20.7795 35.327C21.5642 37.7252 23.7906 39.4882 26.438 39.5455C24.3777 41.1572 21.7617 42.1282 18.9297 42.1282C18.4331 42.1282 17.9568 42.1061 17.4805 42.0452C20.1629 43.775 23.342 44.7627 26.7703 44.7627C37.9137 44.7627 44.006 35.5319 44.006 27.5307C44.006 27.263 43.9968 27.0045 43.9839 26.7479C45.1857 25.895 46.1955 24.8298 47.0189 23.6039Z"
											fill="#A6A5A6"
										/>
									</svg>
								</div>
								<div class="label">{{ $t("mobileSection.twitter") }}</div>
							</div>
						</network>
						<!-- *******FB******** -->
						<network network="facebook">
							<div class="action-item">
								<div class="icon-wrapper">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
											stroke="#3A393A"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
								<div class="label">{{ $t("mobileSection.facebook") }}</div>
							</div>
						</network>
					</div>
				</social-sharing>
				<div class="divider"></div>
				<div class="render-actions">
					<div
						class="action-item save-render"
						@click="handleDownloadRender(selectedRender)"
					>
						<div class="icon-wrapper">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M22.71 6.29C22.617 6.19627 22.5064 6.12188 22.3846 6.07111C22.2627 6.02034 22.132 5.9942 22 5.9942C21.868 5.9942 21.7373 6.02034 21.6154 6.07111C21.4936 6.12188 21.383 6.19627 21.29 6.29L20 7.59V2C20 1.73478 19.8946 1.48043 19.7071 1.29289C19.5196 1.10536 19.2652 1 19 1C18.7348 1 18.4804 1.10536 18.2929 1.29289C18.1054 1.48043 18 1.73478 18 2V7.59L16.71 6.29C16.5217 6.1017 16.2663 5.99591 16 5.99591C15.7337 5.99591 15.4783 6.1017 15.29 6.29C15.1017 6.4783 14.9959 6.7337 14.9959 7C14.9959 7.2663 15.1017 7.5217 15.29 7.71L18.29 10.71C18.3851 10.801 18.4972 10.8724 18.62 10.92C18.7397 10.9729 18.8691 11.0002 19 11.0002C19.1309 11.0002 19.2603 10.9729 19.38 10.92C19.5028 10.8724 19.6149 10.801 19.71 10.71L22.71 7.71C22.8037 7.61704 22.8781 7.50644 22.9289 7.38458C22.9797 7.26272 23.0058 7.13201 23.0058 7C23.0058 6.86799 22.9797 6.73728 22.9289 6.61542C22.8781 6.49356 22.8037 6.38296 22.71 6.29ZM19 13C18.7348 13 18.4804 13.1054 18.2929 13.2929C18.1054 13.4804 18 13.7348 18 14V14.38L16.52 12.9C15.9974 12.3815 15.2911 12.0906 14.555 12.0906C13.8189 12.0906 13.1126 12.3815 12.59 12.9L11.89 13.6L9.41 11.12C8.88012 10.6156 8.17657 10.3343 7.445 10.3343C6.71343 10.3343 6.00988 10.6156 5.48 11.12L4 12.6V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H13C13.2652 6 13.5196 5.89464 13.7071 5.70711C13.8946 5.51957 14 5.26522 14 5C14 4.73478 13.8946 4.48043 13.7071 4.29289C13.5196 4.10536 13.2652 4 13 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V14C20 13.7348 19.8946 13.4804 19.7071 13.2929C19.5196 13.1054 19.2652 13 19 13ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V15.43L6.9 12.53C7.04691 12.39 7.24206 12.3119 7.445 12.3119C7.64794 12.3119 7.84309 12.39 7.99 12.53L11.16 15.7L15.46 20H5ZM18 19C17.9986 19.1914 17.9354 19.3773 17.82 19.53L13.31 15L14.01 14.3C14.0817 14.2268 14.1673 14.1687 14.2617 14.129C14.3561 14.0893 14.4576 14.0689 14.56 14.0689C14.6624 14.0689 14.7639 14.0893 14.8583 14.129C14.9527 14.1687 15.0383 14.2268 15.11 14.3L18 17.21V19Z"
									fill="#3A393A"
									stroke="#F2F2F5"
								/>
							</svg>
						</div>
						<div class="label">{{ $t("mobileSection.saveImage") }}</div>
					</div>
					<div class="action-item delete-render" @click="onDeleteRender(selectedRender)">
						<div class="icon-wrapper">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M3 6H5H21"
									stroke="#3A393A"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
									stroke="#3A393A"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<div class="label">{{ $t("mobileSection.delete") }}</div>
					</div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import mobileProjectsComponent from "@/components/shared/mobile/mobileProjectsComponent.vue";
import ScrollObserver from "@/components/shared/scrollObserver.vue";
import MobileInspirationMixin from "../../../mixins/mobileInspirationMixin";
export default {
	mixins: [
		MobileInspirationMixin
	],
	components: {
		mobileProjectsComponent,
		ScrollObserver,
	},
	mounted() {
		if (
			this.userProjectsWithPagination &&
			this.userProjectsWithPagination.length === 0
		) {
			this.fetchProjectsWithPagination();
		}

		if (
			!this.inspirations ||
			(this.inspirations && this.inspirations.length === 0)
		) {
			this.fetchMobileInspirations({
				pageSize: 10,
				pageNum: 1,
				search: "",
				// sortBy: "inspirationUsageCnt",
			  mobileInspiration: true
			});
		}

		if (this.user && this.transformedRenders.length === 0) {
			this.fetchRenderPage({
				accountId: this.user.accountId,
				page: 1,
				limit: 20,
				sortBy: { updatedAt: -1 },
			});
		}
	},
	watch: {
		user: function (nv) {
			if (this.transformedRenders.length === 0) {
				this.fetchRenderPage({
					accountId: this.user.accountId,
					page: 1,
					limit: 20,
					sortBy: { updatedAt: -1 },
				});
			}
		},
	},
	computed: {
		...mapGetters("Projects", [
			"userProjectsWithPagination",
			"inspirations",
		]),
		...mapState({
			user: (state) => state.User.user,
			renderPaged: (state) => state.Render.renderPaged,
			progress: (state) => state.Render.progress,
		}),
		...mapGetters({
			filterDownload: "Render/filterDownload",
		}),
		transformedRenders() {
			return (
				(this.renderPaged &&
					this.renderPaged
						.filter((e) => e.stateInfo.state != "FAILED")
						.map((e) => {
							let imageToShow = require("~/assets/images/mobile/render-processing-image.png");
							if (e.stateInfo.state === "COMPLETED") {
								imageToShow = e.extraInfo.eIThumbnail
									? e.extraInfo.eIThumbnail + "?" + Date.now()
									: e.extraInfo.thumbnail;
							}

							return {
								...e,
								// _id: crypto.randomUUID(),
								name: e.projectName,
								createdAt: e.stateInfo.createdAt,
								properties: {
									thumbnail: imageToShow,
								},
								isCompleted: e.stateInfo.state === "COMPLETED",
							};
						})) ||
				[]
			);
		},
	},
	data: () => ({
		pageNumber: 1,
		shareUrl: "",
		isRenderDetailsPopupVisible: false,
		selectedRender: null,
	}),
	methods: {
		...mapActions("Projects", [
			"fetchMobileInspirations",
			"fetchInspirationsV2",
			"fetchProjectsWithPagination",
		]),
		...mapActions("Render", [
			"fetchRenderPage",
			"shareRender",
			"downloadRender",
			"deleteRender"
		]),
		...mapActions("MobileSystemNotifications", [
			"addNotification",
		]),
		...mapActions("MobileBasicPopOver", [
			 "resetBasicMobileConfig"
		]),
		...mapMutations("MobileBasicPopOver", [
			 "setBasicMobilePopupConfig"
		]),
		closeRenderDetailsPopup() {
			const drawer = this.$refs.renderDrawer;
			drawer.style.maxHeight = 0; // Collapse the drawer

			setTimeout(() => {
					this.isRenderDetailsPopupVisible = false;
					this.selectedRender = null;
			}, 300); 
		},
		handleRenderMenuClick(render) {
			this.selectedRender = render;
			this.shareRender([render._id]).then((res) => {
				this.shareUrl = `${window.location.host}/share/${res.data._id}`;
				this.isRenderDetailsPopupVisible = true;
				this.$nextTick(() => {
					const drawer = this.$refs.renderDrawer;
					setTimeout(() => {
						drawer.style.maxHeight = "100%";
					}, 100);
				});
			});
		},
		loadMoreRenders() {
			this.pageNumber += 1;
			this.fetchRenderPage({
				accountId: this.user.accountId,
				page: this.pageNumber,
				limit: 20,
				sortBy: { updatedAt: -1 },
			});
		},
		handleDownloadRender(render) {
			if (!this.filterDownload(render._id)) {
				this.downloading = render._id;
				this.downloadRender({
					uri: render.enhancedImage
						? render.enhancedImage
						: render.output["1"][0],
				}).then((res) => {
					let filename = render.name
						? `${render.name}.${render.input.imageType}`
						: render.extraInfo.thumbnail
						? this.getFileName(render.extraInfo.thumbnail, false)
						: `${render.input.view}`;

					var link = document.createElement("a");
					link.href = res.url;
					link.download = filename || "render.jpg";
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					const notification = {
						iconRef: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.4735 4.80667C12.4115 4.74418 12.3378 4.69458 12.2565 4.66074C12.1753 4.62689 12.0881 4.60947 12.0001 4.60947C11.9121 4.60947 11.825 4.62689 11.7437 4.66074C11.6625 4.69458 11.5888 4.74418 11.5268 4.80667L6.56013 9.78L4.47346 7.68667C4.40911 7.62451 4.33315 7.57563 4.24992 7.54283C4.16668 7.51003 4.0778 7.49394 3.98834 7.49549C3.89889 7.49703 3.81062 7.51619 3.72857 7.55185C3.64651 7.58751 3.57229 7.63898 3.51013 7.70333C3.44797 7.76768 3.39909 7.84364 3.36629 7.92688C3.33349 8.01011 3.3174 8.099 3.31895 8.18845C3.3205 8.2779 3.33965 8.36618 3.37531 8.44823C3.41097 8.53028 3.46245 8.60451 3.5268 8.66667L6.0868 11.2267C6.14877 11.2892 6.22251 11.3387 6.30375 11.3726C6.38498 11.4064 6.47212 11.4239 6.56013 11.4239C6.64814 11.4239 6.73527 11.4064 6.81651 11.3726C6.89775 11.3387 6.97149 11.2892 7.03346 11.2267L12.4735 5.78667C12.5411 5.72424 12.5951 5.64847 12.6321 5.56414C12.669 5.4798 12.6881 5.38873 12.6881 5.29667C12.6881 5.2046 12.669 5.11353 12.6321 5.02919C12.5951 4.94486 12.5411 4.86909 12.4735 4.80667Z" fill="#3A393A"/>
							</svg>`,
						primaryMessage: this.$t("mobileSection.renderSavedToGallery"),
						secondaryMessage: this.$t("mobileSection.CheckItOutThere"),
						showCloseButton: true,
						timeout: 5000,
						isPersistent: false,
					}
					this.addNotification(notification)
				});
			}
		},
		onDeleteRender(n) {
			// console.log("deleting n", n)
			this.deleteRenderArray = [];
			this.deleteRenderArray.push(n._id);
			this.deleteConfirmWindow = true;
			const image = require("~/assets/images/mobile/mobileDeletePopupImg.png")
			this.setBasicMobilePopupConfig({
				isVisible: true,
				image,
				title: this.$t('mobileSection.deleteRenderHeaderText', {render: n.name}),
				buttonConfig: [
					{
						buttonText: this.$t("mobileSection.no"),
						buttonAction: () => {
							this.resetBasicMobileConfig()
						}
					},
					{
						buttonText: this.$t("mobileSection.yesDelete"),
						buttonAction: () => {
							this.deleteRenderConfirm()
						}
					},
				],
			})
		},
		deleteRenderConfirm() {
			this.deleteRender({ renderIdList: this.deleteRenderArray }).then(
				(res) => {
					// this.message.error = false;
					// this.message.value = `Your ${
					// 	this.deleteRenderArray.length > 1
					// 		? "renders have"
					// 		: "render has"
					// } been successfully deleted `;
					// this.message.global = true;
					this.deleteConfirmWindow = false;
					this.closeRenderDetailsPopup()
					this.resetBasicMobileConfig()

					this.deleteRenderArray = [];
					this.selectedRenders = [];
					// setTimeout(() => {
					// 	this.message.global = false;
					// 	this.message.value = "";
					// }, 4000);
				}
			);
		},
	},
};
</script>
<style lang="scss" scoped>
.mobile-gallery-wrapper {
	.mobile-content-wrapper {
		background-color: $background-white;
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		border-radius: 20px 20px 0px 0px;
		border: $background-white-9;
		box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.04);
		overflow: auto;

		.no-projects-container {
			.text {
				max-width: 70%;
			}
		}

		.render-menu {
			position: absolute;
			top: 0.5rem;
			right: 0.5rem;
			display: flex;
			padding: 0.375rem;
			align-items: flex-start;
			border-radius: 6px;
			background: $background-white;
		}

		.render-details-bottom-drawer {
			display: flex;
			width: 100%;
			padding: 0.375rem 1.25rem 2rem 1.25rem;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 12px;
			position: fixed;
			bottom: 0px;
			left: 0px;
			z-index: 2147483601;

			border-radius: 40px 40px 0px 0px;
			background: $background-white;
			box-shadow: 0px 0px 12px 1000px rgba(0, 0, 0, 0.75);

			transition: max-height 0.3s;
			max-height: 0px;
			overflow-y: auto;
			

			&.is-visible {
				max-height: 100%;
			}

			.drawer-indicator {
				width: 2.25rem;
				height: 0.3125rem;
				border-radius: 2.5px;
				background: linear-gradient(
						0deg,
						rgba(61, 61, 61, 0.5) 0%,
						rgba(61, 61, 61, 0.5) 100%
					),
					rgba(127, 127, 127, 0.4);
				background-blend-mode: overlay, luminosity;
				margin-bottom: 0.75rem;
			}

			.render-name-and-close-button-wrapper {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 1.5rem;

				.name {
					color: $color-light-gray-2;
					font-size: 1rem;
					font-style: normal;
					font-weight: 600;
					line-height: 138%;
					word-break: break-all;
				}

				.close-svg {
					margin-left: 1rem;
					display: flex;
					align-items: center;
					justify-content: center;
					svg {
						width: 1.5rem;
						height: 1.5rem;
					}
				}
			}

			.image-wrapper {
				margin-bottom: 1.5rem;
				width: 100%;
				max-height: 18.75rem;
				display: flex;

				img {
					border-radius: 9px;
					width: 100%;
					height: auto;
					display: block;
				}
			}

			.share-title {
				margin-bottom: 1.5rem;
				color: $color-light-gray-2;
				font-size: 1rem;
				font-style: normal;
				font-weight: 400;
				line-height: 138%;
				width: 100%;
			}

			.divider {
				margin: 0 1.5rem;
				width: 100%;
				height: 1px;
			}
		}
	}
}
</style>
<style lang="scss">
.mobile-gallery-wrapper {
	.mobile-content-wrapper {
		.no-projects-wrapper {
			.templates-wrapper {
				margin-bottom: 1rem !important;
				&:last-child {
					margin-top: 2rem;
				}
			}
		}

		.render-details-bottom-drawer {
			.render-actions,
			.social-networks {
				width: 100%;
				display: grid;
				grid-template-columns: 1fr 1fr 1fr 1fr;
				align-items: center;
				gap: 0 1rem;

				.action-item {
					display: flex;
					align-items: center;
					flex-direction: column;

					.icon-wrapper {
						width: 3.5rem;
						height: 3.5rem;
						padding: 1rem;
						background: $background-28;
						margin-bottom: 0.25rem;
						border-radius: 500px;

						svg {
							height: auto;
							width: 100%;
							display: block;
						}
					}

					.label {
						color: $color-dark-gray;
						font-size: 0.75rem;
						font-style: normal;
						font-weight: 400;
						line-height: 138%;
					}
				}
			}
		}
	}
}
</style>

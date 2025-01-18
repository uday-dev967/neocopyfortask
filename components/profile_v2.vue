<template>
	<div v-if="user && users" class="profile-page-wrapper">
		<div class="setting-details-container profile-account">
			<svg
				class="plans-bg-pattern"
				width="500"
				height="500"
				viewBox="0 0 1106 646"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					opacity="0.3"
					d="M707.028 366.976L4.9209 620.361L707.028 873.746L1409.14 620.361L707.028 366.976Z"
					stroke="black"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
				<path
					opacity="0.3"
					d="M707.028 245.351L4.9209 498.736L707.028 752.121L1409.14 498.736L707.028 245.351Z"
					stroke="black"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
				<path
					opacity="0.3"
					d="M707.028 123.726L4.9209 377.111L707.028 630.496L1409.14 377.111L707.028 123.726Z"
					stroke="black"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
				<path
					opacity="0.3"
					d="M707.028 2.10098L4.9209 255.486L707.028 508.871L1409.14 255.486L707.028 2.10098Z"
					stroke="black"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
			</svg>
			<div class="profile-content-wrapper">
				<div class="profile-image" @click="openUploader()">
					<img
						v-if="user"
						:src="
							user.personalInfo.dpUrl ||
							require('../assets/images/userProfileImagePlaceholder.svg')
						"
						ref="UploadedImage"
						class="user-profile-image"
						alt
					/>
					<img
						v-if="
							(user.accountType &&
								user.accountType === 'root' &&
								!user.superAccountInfo) ||
							(user.accountType &&
								user.accountType === 'child' &&
								!user.whitelabel) ||
							(user.superAccountInfo &&
								user.superAccountInfo.accountType === 'root')
						"
						src="~assets/images/uploadImageIcon.svg"
						class="upload-icon"
						alt
					/>
				</div>
				<input
					type="file"
					ref="file"
					name="User Profile Image"
					@change="
						uploadImage($event.target.name, $event.target.files)
					"
					accept="image/x-png, image/jpeg"
					style="display: none"
				/>
				<div v-if="user" class="profile-form">
					<div class="form-item">
						<p>{{ $t("suggestionText.fullName") }}</p>
						<input
							autocomplete="off"
							type="text"
							v-model="user.fullName"
						/>
					</div>
					<div class="form-item">
						<p>{{ $t("suggestionText.companyName") }}</p>
						<input
							type="text"
							autocomplete="off"
							v-model="user.companyName"
							:disabled="
								user.accountType == 'root' ? false : true
							"
						/>
					</div>
					<div class="form-item">
						<p>{{ $t("suggestionText.email") }}</p>
						<input
							autocomplete="off"
							type="text"
							v-model="user.email"
							disabled
						/>
						<!-- <span>Edit</span> -->
					</div>
				</div>
        <div 
          v-if="showSaveChangesButton" 
          class="save-changes-button default-button-styles"
          @click="handleSaveChangesButtonClick"
        >
            {{ $t("buttonText.saveChanges") }}
          </div>
			</div>
			<div
				v-if="user && user.accountType == 'root'"
				class="quick-link-container"
				style="position: relative"
			>
				<div v-if="false" class="team-canva">
					<div class="icon-text">
						<img src="~assets/images/team.svg" alt />
						<p>{{ $t("profileText.manageTeam") }}</p>
					</div>
					<div class="total-members">
						<p>
							{{
								users && invited
									? users.length + invited.length
									: ""
							}}
						</p>
						<span>{{ $t("profileText.totalMembers") }}</span>
					</div>
					<div class="action-members">
						<span style="visibility: hidden" @click="addMember"
							>+ {{ $t("buttonText.addMember") }}</span
						>
						<p @click="viewMember">Manage Members</p>
					</div>
				</div>
				<div class="section-header">{{ $t("profileText.quickLinks") }}</div>
				<div v-if="user && !hideReferAFriendOption" class="link" @click="showReferFriendPopup = !showReferFriendPopup">
					{{ $t("buttonText.referAFriend") }}
				</div>
				<div v-if="user" class="link" @click="showReset = !showReset">
					{{ $t("buttonText.changePassword") }}
				</div>
				<div v-if="!isTrial" class="link" @click="updateCC">
					{{ $t("buttonText.creditCardDetailsUpdate") }}
				</div>
				<div v-if="user && user.billingAddress" class="link" @click="openAddress">
					{{ user.billingAddress.street ? $t("buttonText.edit") : $t("buttonText.addLowerCase") }} {{ $t("buttonText.address") }}
				</div>
				<div v-if="user && user.billingAddress" class="billing-head">
					<img src="~assets/images/address.svg" alt />
					<p>{{ $t("profileText.myBillingAddress") }}</p>
				</div>
				<div class="address-head" v-if="user && user.billingAddress">
					<p>
						{{
							user.firstName
								? user.firstName
								: "" + " " + user.lastName
								? user.lastName
								: ""
						}}
					</p>
					<img
						style="visibility: hidden"
						src="~assets/images/blackbots.svg"
						alt
					/>
				</div>
				<div class="main-address" v-if="user && user.billingAddress">
					<p>
						{{
							user.billingAddress.street
								? user.billingAddress.street + ", "
								: ""
						}}
						{{
							user.billingAddress.state
								? user.billingAddress.state + ", "
								: ""
						}}
						{{
							user.billingAddress.pincode
								? user.billingAddress.pincode + ", "
								: ""
						}}{{
							user.billingAddress.country
								? user.billingAddress.country + ", "
								: ""
						}}
					</p>
				</div>
			</div>
			<div
				class="popup-div"
				:class="showReset ? 'showPopUp' : ''"
				@click="closePopup"
			>
				<div class="popup-container" @click.stop>
					<div class="close-popup" @click="closePopup">
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
						<h2>{{ $t("buttonText.changePassword") }}</h2>
					</div>
					<div class="popup-details">
						<div style="display: flex; flex-direction: column">
							<input
								type="password"
								:placeholder="$t('placeholders.oldPassword')"
								style="margin: 1.25rem 0rem"
								v-model="oldPass"
							/>
							<input
								type="password"
								:placeholder="$t('placeholders.newPassword')"
								style="margin-bottom: 1.25rem"
								v-model="newPass"
							/>
							<input
								type="password"
								:placeholder="$t('placeholders.confirmPassword')"
								style="margin-bottom: 1.25rem"
								v-model="conPass"
							/>
						</div>
						<!-- <p :class="message.error?'error-message':'success-message'">{{this.message.value}}</p> -->
						<div class="address-button-container">
							<button
								@click="cancelContainer('pass')"
								class="cancel-button"
							>
								{{ $t("buttonText.cancel") }}
							</button>
							<button
								@click="updatePass()"
								:disabled="!(newPass && oldPass && conPass)"
								class="update-address"
							>
								{{ $t("buttonText.updatePassword") }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				class="popup-div"
				:class="showAddress ? 'showPopUp' : ''"
				@click="closePopup"
			>
				<div
					class="popup-container"
					style="padding-bottom: 1.5625rem"
					@click.stop
				>
					<div class="close-popup" @click="closePopup('address')">
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
						<h2 v-if="showAddress">{{ $t("suggestionText.updateAddress") }}</h2>
					</div>
					<div
						class="popup-details"
						v-if="user && user.billingAddress"
						style="margin-top: 1.25rem"
					>
						<div class="address-input-container">
							<div class="address-left-container">
								<div>
									<span>
										{{ $t("suggestionText.firstName") }}
										<sup>*</sup>
									</span>
									<input
										autocomplete="off"
										type="text"
										v-model="user.firstName"
									/>
								</div>
								<div>
									<span>
										{{ $t("suggestionText.companyName") }}
										<sup>*</sup>
									</span>
									<input
										autocomplete="off"
										type="text"
										min="0"
										v-model="user.companyName"
									/>
								</div>
							</div>
							<div class="address-right-container">
								<div>
									<span>
										{{ $t("suggestionText.lastName") }}
										<sup>*</sup>
									</span>
									<input
										autocomplete="off"
										type="text"
										v-model="user.lastName"
									/>
								</div>
								<div>
									<span>{{ $t("suggestionText.number") }}</span>
									<input
										autocomplete="off"
										type="text"
										min="6"
										v-model="user.contactNumber"
										required
									/>
								</div>
								<!-- <div>
                  <span>Landmark (Optional)</span>
                  <input autocomplete="off" type="text">
                </div>-->
								<!-- <div>
                  <span>State</span>
                  <div class="select-box">
                    <select v-model="address.state">
                      <option value>Telangana</option>
                    </select>
                  </div>
                </div>-->
							</div>
						</div>
						<div class="local-address">
							<span>
								{{ $t("buttonText.address") }}
								<sup>*</sup>
							</span>
							<textarea
								name
								id
								cols="80"
								rows="5"
								v-model="user.billingAddress.street"
							></textarea>
						</div>
						<div class="address-input-container">
							<div class="address-left-container">
								<div>
									<span>
										{{ $t("suggestionText.city") }}
										<sup>*</sup>
									</span>
									<input
										type="text"
										v-model="user.billingAddress.city"
										pattern="[A-Za-z]{3}"
										name="city"
									/>
								</div>
								<div>
									<span>
										{{ $t("suggestionText.state") }}
										<!-- <sup>*</sup> -->
									</span>
									<div class="select-box">
										<select
											v-model="user.billingAddress.state"
										>
											<option
												:value="con"
												v-for="con in selectedStates"
											>
												{{ con }}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div class="address-right-container">
								<div>
									<span>
										{{ $t("suggestionText.country") }}
										<sup>*</sup>
									</span>
									<div class="select-box">
										<select
											v-model="
												user.billingAddress.country
											"
											@change="
												updateCounty(
													user.billingAddress.country
												)
											"
											@click="countryChange = true"
										>
											<option
												:value="con.name"
												v-for="con in country"
											>
												{{ con.name }}
											</option>
										</select>
									</div>
								</div>
								<div>
									<span>
										{{ $t("suggestionText.zipCode") }}
										<sup>*</sup>
									</span>
									<input
										autocomplete="off"
										type="text"
										min="0"
										v-model="user.billingAddress.pincode"
									/>
								</div>
								<!-- <div>
                  <span>Landmark (Optional)</span>
                  <input autocomplete="off" type="text">
                </div>-->
								<!-- <div>
                  <span>State</span>
                  <div class="select-box">
                    <select v-model="address.state">
                      <option value>Telangana</option>
                    </select>
                  </div>
                </div>-->
							</div>
						</div>
					</div>
					<div
						class="address-button-container"
						style="padding-top: 1.25rem"
					>
						<button
							@click="cancelContainer('address')"
							class="cancel-button"
						>
							{{ $t("buttonText.cancel") }}
						</button>
						<button @click="addressUpdate()" class="update-address">
							{{ $t("buttonText.updateAddress") }}
						</button>
					</div>
				</div>
			</div>
      <div class="popup-div" :class="showMembersLimitExeccedPopup?'showPopUp':''" @click="closePopup">
      <div class="popup-container upgrade-popup-container" @click.stop>
        <div class="popup-head" v-bind:style="{fontFamily: 'Montserrat'}">
          <h1 class="creat-project-title" v-bind:style="{ color: '#e9beb3' }" >{{ $t("suggestionText.uhoh") }}</h1>
        </div>
        <div class="popup-details"  v-bind:style="{ display: 'grid',justifyItems: 'center'}">
          <div class="invite-input">
            <div v-bind:style="{ display: 'flex', justifyContent: 'center' }">
              <div v-bind:style="{ fontSize:'1.3rem',color:'#E8E8E8', maxWidth: '80%', textAlign: 'center' }">{{ $t("suggestionText.numberOfChildUserInvitationsExceededText") }}</div>
            </div>
          </div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div  v-bind:style="{ display: 'grid', gridAutoFlow: 'column', gridGap: '1rem'}">
             <button @click="closePopupForUpgrade" class="update-address" v-bind:style="{ color: '#E8E8E8', backgroundColor: '#3a393a',padding: '0.5rem 2rem', cursor:'pointer' }">I'll do it later</button>
            <button @click="onUpgradeClick" class="update-address" v-bind:style="{ color: 'black', backgroundColor: '#e9beb3',padding: '0.5rem 2rem', cursor:'pointer' }">{{ $t("buttonText.upgrade") }}</button>
          </div>
        </div>
      </div>
    </div>
			<div class="popup-div" :class="isDeleteConfirmationPopupVisible?'showPopUp':''">
				<div class="popup-container delete-confirmation-popup">
					<div class="close-popup" @click="closeDeleteConfirmationPopup">
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
					<div class="content">
						<div class="graphic-wrapper">
							<svg width="243" height="178" viewBox="0 0 243 178" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M53.7365 49.1929L8.59155 79.392L53.0591 145.867L98.2041 115.668L53.7365 49.1929Z" fill="white"/>
								<path d="M74.8747 112.524L74.3637 115.694L51.9202 112.459L52.4312 109.289L74.8747 112.524Z" fill="#969696"/>
								<path d="M63.5725 101.213L66.7913 101.676L63.2224 123.774L59.9995 123.307L63.5725 101.213Z" fill="#969696"/>
								<path d="M42.9202 73.1287C42.9524 73.1729 38.4299 76.259 32.817 80.009C27.2041 83.759 22.6293 86.7686 22.5971 86.7204C22.5649 86.6721 27.0874 83.59 32.7003 79.836C38.3132 76.082 42.8679 73.0804 42.9202 73.1287Z" fill="#969696"/>
								<path d="M59.5058 68.9603C59.538 69.0086 52.0139 74.0944 42.7033 80.3229C33.3927 86.5514 25.8042 91.5608 25.7801 91.5165C25.7559 91.4723 33.264 86.3784 42.5866 80.1499C51.9093 73.9214 59.4736 68.912 59.5058 68.9603Z" fill="#969696"/>
								<path d="M62.8322 73.9335C62.8644 73.9817 55.3403 79.0716 46.0297 85.3001C36.7191 91.5286 29.1306 96.538 29.1065 96.4897C29.0824 96.4414 36.5984 91.3556 45.913 85.123C55.2276 78.8905 62.8 73.8852 62.8322 73.9335Z" fill="#969696"/>
								<path d="M66.1598 78.9106C66.192 78.9589 58.6679 84.0487 49.3573 90.2732C40.0467 96.4977 32.4583 101.515 32.4583 101.467C32.4583 101.419 39.9461 96.3287 49.2607 90.1002C58.5753 83.8717 66.1276 78.8623 66.1598 78.9106Z" fill="#969696"/>
								<path d="M69.4749 83.8877C69.5071 83.936 61.983 89.0218 52.6724 95.2503C43.3618 101.479 35.7733 106.488 35.7532 106.44C35.7331 106.392 43.2532 101.306 52.5758 95.0773C61.8985 88.8488 69.4749 83.8395 69.4749 83.8877Z" fill="#969696"/>
								<path d="M204.695 93.7354L166.781 119.098L204.125 174.924L242.04 149.562L204.695 93.7354Z" fill="white"/>
								<path d="M222.452 146.933L222.022 149.597L203.171 146.881L203.606 144.217L222.452 146.933Z" fill="#969696"/>
								<path d="M212.961 137.434L215.665 137.824L212.667 156.381L209.959 155.99L212.961 137.434Z" fill="#969696"/>
								<path d="M195.599 113.868C195.632 113.916 191.837 116.511 187.122 119.662C182.406 122.812 178.559 125.331 178.527 125.295C178.495 125.258 182.293 122.655 187.005 119.501C191.717 116.346 195.567 113.799 195.599 113.868Z" fill="#969696"/>
								<path d="M209.541 110.347C209.573 110.395 203.26 114.676 195.458 119.903C187.656 125.13 181.271 129.338 181.239 129.29C181.206 129.242 187.519 124.961 195.321 119.73C203.123 114.499 209.496 110.299 209.541 110.347Z" fill="#969696"/>
								<path d="M212.337 114.523C212.37 114.572 206.057 118.853 198.255 124.083C190.453 129.314 184.068 133.515 184.036 133.466C184.003 133.418 190.296 129.157 198.118 123.927C205.94 118.696 212.313 114.479 212.337 114.523Z" fill="#969696"/>
								<path d="M215.129 118.696C215.161 118.744 208.844 123.025 201.047 128.256C193.249 133.487 186.859 137.687 186.827 137.639C186.795 137.591 193.108 133.314 200.91 128.079C208.712 122.844 215.101 118.656 215.129 118.696Z" fill="#969696"/>
								<path d="M217.945 122.884C217.977 122.933 211.664 127.21 203.862 132.44C196.061 137.671 189.675 141.872 189.643 141.827C189.611 141.783 195.924 137.498 203.725 132.267C211.527 127.037 217.893 122.836 217.945 122.884Z" fill="#969696"/>
								<path d="M144.713 51.6385L103.343 29.5121L70.7625 90.4275L112.132 112.554L144.713 51.6385Z" fill="white"/>
								<path d="M105.052 93.4961L102.429 94.3934L95.7659 75.9774L98.3892 75.0761L105.052 93.4961Z" fill="#969696"/>
								<path d="M109.075 80.2827L110.033 82.9262L91.7418 89.1909L90.7842 86.5474L109.075 80.2827Z" fill="#969696"/>
								<path d="M122.072 53.1114C122.04 53.1717 117.847 50.9909 112.701 48.2428C107.555 45.4947 103.415 43.2133 103.447 43.153C103.479 43.0926 107.676 45.2734 112.822 48.0215C117.968 50.7696 122.104 53.047 122.072 53.1114Z" fill="#969696"/>
								<path d="M132.001 64.0676C131.969 64.1279 125.024 60.4745 116.49 55.9118C107.956 51.349 101.068 47.5991 101.1 47.5387C101.132 47.4783 108.073 51.1277 116.607 55.6945C125.141 60.2613 132.034 64.0072 132.001 64.0676Z" fill="#969696"/>
								<path d="M129.563 68.6263C129.531 68.6867 122.586 65.0373 114.052 60.4745C105.518 55.9118 98.6298 52.1578 98.662 52.0974C98.6942 52.0371 105.635 55.6905 114.169 60.2532C122.703 64.816 129.595 68.566 129.563 68.6263Z" fill="#969696"/>
								<path d="M127.126 73.185C127.094 73.2454 120.149 69.596 111.615 65.0333C103.081 60.4705 96.1928 56.7326 96.225 56.6602C96.2572 56.5878 103.198 60.2492 111.732 64.812C120.266 69.3747 127.158 73.1247 127.126 73.185Z" fill="#969696"/>
								<path d="M124.687 77.7438C124.655 77.8041 117.71 74.1547 109.176 69.592C100.642 65.0292 93.7496 61.2793 93.7858 61.2189C93.822 61.1586 100.759 64.808 109.293 69.3707C117.827 73.9334 124.719 77.6834 124.687 77.7438Z" fill="#969696"/>
								<path opacity="0.2" d="M124.9 6.10352e-05H123.862V17.6958H124.9V6.10352e-05Z" fill="black"/>
								<path d="M100.148 39.1053H148.616C148.616 39.1053 144.142 17.7038 124.016 17.7038C106.115 17.7038 100.148 39.1053 100.148 39.1053Z" fill="#FFCFC7"/>
								<path d="M124.902 3.05176e-05H123.864V17.6958H124.902V3.05176e-05Z" fill="#FFCFC7"/>
								<path d="M232.298 176.97C232.298 177.026 180.293 177.074 116.153 177.074C52.0131 177.074 0.000244141 177.038 0.000244141 176.97C0.000244141 176.901 51.997 176.865 116.153 176.865C180.309 176.865 232.298 176.909 232.298 176.97Z" fill="#263238"/>
								<path d="M12.8595 151.769C13.5397 151.819 14.2031 152.004 14.8101 152.315C15.417 152.626 15.9551 153.057 16.3922 153.58C17.2612 154.633 17.8765 155.872 18.1907 157.201C18.8707 159.744 18.4522 162.75 17.728 165.281C14.9759 164.295 13.2739 161.358 12.4973 159.813C11.2903 157.374 10.57 152.224 12.8474 151.765" fill="#FFCFC7"/>
								<path d="M21.6925 168.367C21.2792 167.726 21.0429 166.987 21.0076 166.225C20.9722 165.463 21.1391 164.706 21.4913 164.029C21.8545 163.359 22.3476 162.768 22.9417 162.291C23.5358 161.814 24.2191 161.459 24.9516 161.249C25.6235 161.04 26.4041 160.955 26.9875 161.346C27.2505 161.545 27.4554 161.81 27.5806 162.115C27.7059 162.42 27.747 162.753 27.6997 163.08C27.5941 163.733 27.3163 164.347 26.895 164.858C25.5551 166.673 23.9296 168.182 21.6643 168.367" fill="#FFCFC7"/>
								<path d="M21.9984 176.869C21.9387 176.698 21.8969 176.521 21.8736 176.342C21.8012 175.963 21.7046 175.476 21.588 174.893C21.2268 173.296 21.1262 171.65 21.2902 170.02C21.4799 168.383 22.1036 166.826 23.0968 165.51C23.4003 165.117 23.7502 164.761 24.1389 164.452C24.2445 164.368 24.3547 164.29 24.4688 164.218C24.5052 164.188 24.5459 164.164 24.5896 164.146C24.0806 164.581 23.6156 165.065 23.2014 165.591C22.2606 166.908 21.6682 168.441 21.4793 170.049C21.2218 171.924 21.5397 173.642 21.7248 174.877C21.8213 175.493 21.9018 175.992 21.9461 176.338C21.9778 176.513 21.9952 176.69 21.9984 176.869Z" fill="#263238"/>
								<path d="M13.7463 155.644C13.7923 155.708 13.8301 155.777 13.859 155.849C13.9314 156.01 14.028 156.212 14.1407 156.465C14.3861 157 14.7281 157.777 15.1425 158.738C15.9714 160.666 17.0819 163.345 18.2407 166.331C19.3995 169.316 20.3853 172.04 21.0572 174.024C21.4032 175.014 21.6728 175.818 21.8619 176.378C21.9464 176.643 22.0108 176.857 22.0631 177.022C22.0918 177.095 22.1121 177.172 22.1234 177.251C22.0826 177.183 22.0502 177.11 22.0269 177.034C21.9665 176.873 21.8901 176.663 21.7895 176.402L20.9405 174.068C20.2203 172.101 19.2144 169.381 18.0596 166.399C16.9049 163.418 15.8104 160.73 15.0138 158.791C14.6114 157.837 14.3016 157.061 14.0723 156.493C13.9676 156.236 13.8831 156.03 13.8188 155.866C13.7885 155.794 13.7643 155.72 13.7463 155.644Z" fill="#263238"/>
								<path d="M18.7267 171.244C17.8987 169.865 16.7546 168.704 15.3889 167.855C14.0232 167.006 12.4751 166.495 10.8726 166.363C10.0679 166.307 9.0781 166.443 8.71598 167.168C8.35385 167.892 8.83669 168.777 9.39194 169.365C10.5717 170.599 12.0904 171.456 13.7566 171.828C15.4228 172.201 17.162 172.071 18.7548 171.457" fill="#FFCFC7"/>
								<path d="M12.1121 168.544C12.2827 168.535 12.4537 168.542 12.6231 168.564C12.8214 168.575 13.019 168.597 13.2145 168.632C13.4439 168.677 13.7135 168.701 13.9951 168.781C14.3099 168.848 14.6203 168.934 14.9246 169.039C15.277 169.152 15.6223 169.286 15.9586 169.441C16.7321 169.788 17.4638 170.221 18.1394 170.733C18.8072 171.256 19.4121 171.856 19.942 172.519C20.1708 172.808 20.3817 173.11 20.5737 173.424C20.7472 173.696 20.9057 173.977 21.0485 174.265C21.1693 174.5 21.2768 174.742 21.3703 174.99C21.451 175.173 21.5196 175.361 21.5756 175.553C21.6351 175.713 21.6796 175.879 21.7083 176.048C21.6641 176.048 21.4709 175.356 20.9278 174.326C20.7798 174.049 20.6173 173.78 20.4409 173.521C20.2448 173.216 20.0326 172.922 19.8052 172.64C18.7528 171.339 17.4107 170.303 15.8862 169.614C15.5361 169.461 15.2022 169.316 14.8763 169.212C14.5771 169.103 14.2722 169.01 13.9629 168.934C12.8363 168.624 12.1081 168.588 12.1121 168.544Z" fill="#263238"/>
								<path d="M85.5699 94.3688L71.3264 167.518L69.4756 177.094L164.432 176.635C168.697 176.615 172.479 172.829 173.843 167.204L190.686 98.147C191.728 93.8779 189.443 89.4359 186.208 89.4399L90.0764 89.5405C87.9841 89.5365 86.1091 91.5161 85.5699 94.3688Z" fill="#FFCFC7"/>
								<g opacity="0.5">
								<path opacity="0.5" d="M85.5697 94.3688L71.3262 167.518L69.4753 177.094L164.432 176.635C168.697 176.615 172.479 172.829 173.843 167.204L190.686 98.147C191.728 93.8779 189.443 89.4359 186.208 89.4399L90.0761 89.5405C87.9838 89.5365 86.1088 91.5161 85.5697 94.3688Z" fill="black"/>
								</g>
								<path d="M155.335 162.553L145.276 81.5135C144.874 78.194 142.222 75.7155 139.096 75.7276L117.047 75.796C116.227 75.8052 115.418 75.9812 114.669 76.3132C113.92 76.6453 113.246 77.1264 112.689 77.7273L102.228 88.8605L40.9083 89.1905C37.1624 89.2106 34.2815 92.7594 34.7764 96.7427L44.1151 171.642C44.5175 174.957 47.169 177.432 50.2873 177.428L157.174 177.214C169.076 177.46 170.214 173.947 170.214 173.947C156.55 176.969 155.335 162.573 155.335 162.553Z" fill="#FFCFC7"/>
							</svg>
						</div>
						<div class="header">
							{{ $t("suggestionText.wantToDeleteUserText") }}
						</div>
						<div class="subheader">
							{{ $t("suggestionText.wantToDeleteUserSubText[0]") }} <a href = "mailto:connect@foyr.com">connect@foyr.com</a> {{ $t("suggestionText.wantToDeleteUserSubText[1]") }}
						</div>
					</div>
					<div class="footer">
						<button class="delete-btn" @click="handleDeleteConfirmationClick">
							{{ $t("buttonText.delete") }}
						</button>
					</div>
				</div>	
			</div>
			<div
				class="popup-div"
				:class="showTeam ? 'showPopUp' : ''"
				@click="closePopup"
			>
				<div class="popup-container" @click.stop>
					<div class="close-popup" @click="closePopup">
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
						<h2 v-if="showTeam">{{ $t("profileText.teamMembers") }}</h2>
					</div>
					<div class="popup-details">
						<div v-if="showTeam" class="invite-team-container">
							<input
								autocomplete="off"
								type="text"
								v-model="addNewMember"
							/>
							<button @click="sendInvite()">{{ $t("buttonText.invite") }}</button>
							<span
								:class="
									message.error
										? 'error-message'
										: 'success-message'
								"
								v-if="message.value"
								>{{ message.value }}</span
							>
						</div>
					</div>
				</div>
			</div>
      <!-- Refer a friend popup -->
      <div
				class="popup-div"
				:class="showReferFriendPopup ? 'showPopUp' : ''"
				@click="closePopup"
			>
				<div class="popup-container" @click.stop>
					<div class="close-popup" @click="closePopup">
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
						<h2>{{ $t("buttonText.referAFriend") }}</h2>
					</div>
					<div class="popup-details">
						<div class="invite-team-container">
							<input
								autocomplete="off"
								type="text"
								v-model="friendEmail"
							/>
							<button @click="inviteLink">{{ $t("buttonText.invite") }}</button>
							<span
								:class="
									message.error
										? 'error-message'
										: 'success-message'
								"
								v-if="message.value"
								>{{ message.value }}</span
							>
						</div>
					</div>
				</div>
			</div>
			<MessageComponent :changeRight="message" />
		</div>
		<div
			v-if="!hideInviteSection && user && user.accountType == 'root'"
			class="manage-team-wrapper"
		>
			<div class="section-header">
				<div class="invite-text">{{ $t("profileText.teamMembers") }}</div>
				<div class="invite-button default-button-styles" @click="viewMember">{{ $t("buttonText.invite") }}</div>
			</div>
			<table
				v-if="users.length > 0 && invited"
				cellspacing="0"
				class="team-member-table"
			>
				<tr class="table-heads">
					<td>{{ $t("profileText.srNo") }}</td>
					<td>{{ $t("profileText.name") }}</td>
					<td>{{ $t("profileText.emailId") }}</td>
					<td>{{ $t("profileText.status") }}</td>
					<td></td>
				</tr>
				<tr
					class="table-child"
					v-for="(x, index) in users"
					:key="index"
				>
					<td>{{ index + 1 }}</td>
					<td>{{ x.name }}</td>
					<td>{{ x.email }}</td>
					<td
						v-if="x.email != user.email"
						class="select-edit"
						@click="clickOnSelect"
						:class="{ 'inactive': x.blockStatus }"
					>
						<select
							id="change-status"
							:style="{
								color: x.blockStatus ? 'rgba(232, 80, 91, 1)' : 'rgba(6, 194, 112, 1)',
								backgroundColor: x.blockStatus ? '#FADCDE' : '#cdf3e2',
							}"
							name
							v-model="x.blockStatus"
							@change="changeStatus(x)"
						>
							<option :value="false">{{ $t("profileText.active") }}</option>
							<option :value="true">{{ $t("profileText.inActive") }}</option>
						</select>
						<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.83289 8.01379L9.55527 12.7362L14.2776 8.01379" stroke="#06C270" stroke-width="1.57413" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</td>
					<td v-else class="member-status">
						<div :class="{ 'active': ! x.blockStatus, 'inactive': x.blockStatus }">
              {{ x.blockStatus ? $t("profileText.inactive") : $t("profileText.active") }}
            </div>
					</td>
					<td class="delete-user">
						<svg v-if="x.email != user.email" @click="handleDeleteUser(x)" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.2229 6.125H5.2229H21.2229" stroke="#9B9898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M19.2229 6.125V20.125C19.2229 20.6554 19.0122 21.1641 18.6371 21.5392C18.262 21.9143 17.7533 22.125 17.2229 22.125H7.2229C6.69247 22.125 6.18376 21.9143 5.80869 21.5392C5.43361 21.1641 5.2229 20.6554 5.2229 20.125V6.125M8.2229 6.125V4.125C8.2229 3.59457 8.43361 3.08586 8.80869 2.71079C9.18376 2.33571 9.69247 2.125 10.2229 2.125H14.2229C14.7533 2.125 15.262 2.33571 15.6371 2.71079C16.0122 3.08586 16.2229 3.59457 16.2229 4.125V6.125" stroke="#9B9898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M10.2229 11.125V17.125" stroke="#9B9898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M14.2229 11.125V17.125" stroke="#9B9898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</td>
				</tr>
				<tr
					class="table-child"
					v-for="(user, index) in invited"
					:key="index + user.email"
				>
					<td>{{ index + 1 + users.length }}</td>
					<td>{{ $t("profileText.notApplicable") }}</td>
					<td>{{ user.email }}</td>
					<td>
						<div class="invitation-status">
							{{ $t("profileText.invited") }} 
							<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M1.67672 0.36625C1.46054 0.45337 1.1972 0.68593 1.09172 0.88303C0.969504 1.11163 0.900024 3.03061 0.900024 6.18313C0.900024 10.7791 0.924144 11.1549 1.24382 11.55C1.58348 11.9698 1.63514 11.9757 5.51882 12.0297L9.45002 12.0844L8.73848 11.3547L8.02695 10.625H5.09348H2.16002V6.82573C2.16002 3.86005 2.20934 3.04555 2.38502 3.11323C2.50886 3.16111 3.8567 3.98407 5.3804 4.94203C7.02687 5.97721 8.26076 6.64177 8.42168 6.58003C8.57072 6.52297 9.92144 5.70865 11.4234 4.77049C12.9253 3.83251 14.2094 3.06499 14.2771 3.06499C14.3448 3.06499 14.4 4.29583 14.4 5.80027V8.53555L15.03 7.92499L15.66 7.31443V4.38817C15.66 1.26157 15.5455 0.71455 14.8218 0.38479C14.2884 0.14179 2.27576 0.12487 1.67672 0.36625ZM2.17496 1.69177C2.4617 1.94737 8.13206 5.40499 8.26454 5.40499C8.35616 5.40499 9.79023 4.55449 11.4513 3.51499L14.4713 1.62499H8.28579C4.88361 1.62499 2.13374 1.65505 2.17496 1.69177ZM15.1663 10.3062L13.5051 11.9676L12.5115 10.9864L11.5179 10.0052L11.0689 10.4543L10.6198 10.9033L12.0607 12.3357L13.5015 13.768L15.6564 11.6186L17.8116 9.46903L17.4244 9.05701C17.2114 8.83039 16.99 8.64499 16.9324 8.64499C16.8748 8.64499 16.08 9.39253 15.1663 10.3062Z" fill="#E9BEB3"/>
							</svg>
						</div>
					</td>
					<td>
						<button class="delete-btn" @click="handleInviteDeleteButtonClick(user)">
							<!-- Delete Invitation -->
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M3.2229 6.125H5.2229H21.2229" stroke="#9B9898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M19.2229 6.125V20.125C19.2229 20.6554 19.0122 21.1641 18.6371 21.5392C18.262 21.9143 17.7533 22.125 17.2229 22.125H7.2229C6.69247 22.125 6.18376 21.9143 5.80869 21.5392C5.43361 21.1641 5.2229 20.6554 5.2229 20.125V6.125M8.2229 6.125V4.125C8.2229 3.59457 8.43361 3.08586 8.80869 2.71079C9.18376 2.33571 9.69247 2.125 10.2229 2.125H14.2229C14.7533 2.125 15.262 2.33571 15.6371 2.71079C16.0122 3.08586 16.2229 3.59457 16.2229 4.125V6.125" stroke="#9B9898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M10.2229 11.125V17.125" stroke="#9B9898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M14.2229 11.125V17.125" stroke="#9B9898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
						<button
							class="resend-btn"
							@click="
								addNewMember = user.email;
								sendInvite();
							"
						>
							<!-- Resend -->
							<svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M21.5326 10.2227L1.17882 0.193256C1.03529 0.122537 0.871021 0.106122 0.716337 0.147046C0.362457 0.240673 0.151475 0.603448 0.245115 0.957328L2.85526 10.8227L0.245566 20.6767C0.204592 20.8314 0.220989 20.9958 0.291736 21.1394C0.453538 21.4677 0.850885 21.6027 1.17923 21.4409L9.53493 17.3237C9.58922 16.751 9.70975 16.1977 9.88874 15.6716L1.89988 19.608L4.07782 11.3814C4.11732 11.3887 4.15806 11.3925 4.19968 11.3925H13.4788L13.598 11.3819C13.9071 11.3258 14.1416 11.0551 14.1416 10.7298C14.1416 10.3637 13.8448 10.067 13.4788 10.067H4.19968L4.11424 10.0724L4.03208 10.0883L1.89905 2.02594L19.368 10.6338L21.277 11.5376L21.5326 11.4117C21.6636 11.3472 21.7696 11.2412 21.8342 11.1102C21.996 10.7818 21.861 10.3845 21.5326 10.2227Z" fill="#9B9898"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7049 24.125C20.0585 24.125 22.7771 21.4063 22.7771 18.0527C22.7771 14.6991 20.0585 11.9804 16.7049 11.9804C13.3512 11.9804 10.6326 14.6991 10.6326 18.0527C10.6326 21.4063 13.3512 24.125 16.7049 24.125ZM20.1055 16.7126C20.0203 16.5894 19.878 16.5087 19.7168 16.5087C19.4559 16.5087 19.2444 16.7202 19.2444 16.9811C19.2444 17.0716 19.2699 17.1562 19.3128 17.2276C19.4689 17.472 19.5593 17.7624 19.5593 18.0739L19.556 18.1774C19.5027 18.9988 18.8196 19.6486 17.9847 19.6486L16.4453 19.6481L16.8997 19.1942L16.9454 19.1412C17.0827 18.9563 17.0674 18.6938 16.8997 18.5261C16.7152 18.3417 16.4161 18.3417 16.2316 18.5261L14.9708 19.7869L14.9251 19.8399C14.7879 20.0248 14.8031 20.2873 14.9708 20.455L16.2316 21.7158L16.2846 21.7615C16.4695 21.8988 16.732 21.8835 16.8997 21.7158L16.9454 21.6628C17.0827 21.4779 17.0674 21.2154 16.8997 21.0477L16.4447 20.5929L17.9847 20.5934L18.1104 20.5903C19.4435 20.5248 20.5041 19.4232 20.5041 18.0739C20.5041 17.5899 20.3677 17.1378 20.131 16.7538L20.1055 16.7126ZM17.1635 14.3863C16.9785 14.2491 16.7161 14.2643 16.5484 14.432C16.3807 14.5997 16.3654 14.8622 16.5027 15.0471L16.5484 15.1001L17.0021 15.554L15.4652 15.5545L15.3395 15.5576C14.0065 15.6231 12.9458 16.7246 12.9458 18.0739C12.9458 18.5674 13.0877 19.0278 13.3327 19.4144C13.4163 19.5475 13.5644 19.636 13.7331 19.636C13.994 19.636 14.2055 19.4245 14.2055 19.1636C14.2055 19.0766 14.182 18.9951 14.141 18.9252L14.0723 18.8088C13.9563 18.5894 13.8906 18.3394 13.8906 18.0739L13.8939 17.9704C13.9472 17.149 14.6304 16.4993 15.4652 16.4993L17.0027 16.4988L16.5484 16.9536L16.4981 17.0128C16.3792 17.1787 16.3807 17.4043 16.5027 17.5687L16.5484 17.6217L16.6076 17.672C16.7735 17.7909 16.9991 17.7894 17.1635 17.6674L17.2165 17.6217L18.4773 16.3609L18.5275 16.3017C18.6465 16.1358 18.645 15.9102 18.523 15.7458L18.4773 15.6928L17.2165 14.432L17.1635 14.3863Z" fill="#9B9898"/>
							</svg>
						</button>
					</td>
				</tr>
			</table>

      <div v-if="user && user.accountType !== 'root'" class="non-root-change-password" @click="showReset = !showReset">
        {{ $t("buttonText.changePassword") }}
      </div>
		</div>
	</div>
	<div v-else class="main-loading">
		<div class="loading-container">
			<p>{{ $t("infoText.loading") }}</p>
			<div class="loader"></div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Country from "static/json/country.json";
export default {
	head() {
		return {
			title: "Neo - Settings",
		};
	},
	props: {
		// user: Object,
		users: Array,
		invited: Array,
		hideInviteSection: {
			type: Boolean,
			required: false,
			default: false,
		},
		showSaveChangesButton: {
			type: Boolean,
			required: false,
			default: false,
		},
		hideReferAFriendOption: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	data() {
		return {
			selected: null,
			quantity: 0,
			showBills: false,
			showTeam: false,
			newMember: false,
			showAddress: false,
			country: Country,
			message: {
				value: "",
				error: false,
				global: false,
			},
			addNewMember: "",
			showReset: false,
			oldPass: undefined,
			newPass: undefined,
			conPass: undefined,
			oldAddress: undefined,
			selectedStates: "",
			hostName: "",
			isCreditCardUpdateShow: true,
			countryChange: false,
			friendEmail: "",
			showReferFriendPopup: false,
			// inviteLinkData: "",
			showMembersLimitExeccedPopup: false,
			isDeleteConfirmationPopupVisible: false,
			childUserToDelete: null,
		};
	},
	computed: {
		...mapState({
			isTrial: state => state.Billing.isTrial,
			user: state => state.User.user,
		}),
		isDisabled() {
			return this.condition1 && this.condition2;
		},
		...mapGetters({
			getState: "User/getState",
		}),
	},
	mounted() {
		this.hostName = window.location.host;
		// this.selectedStates = this.getState("India").states;
		// console.log("SELECTED STATE @Profile", this.user);
		if (!this.user) {
			this.updateCounty("India");
		} else if (
			this.user &&
			this.user.billingAddress &&
			this.user.billingAddress.country
		) {
			this.updateCounty(this.user.billingAddress.country);
		} else {
			this.updateCounty("India");
		}
		setTimeout(() => {
			// amplitude.getInstance().logEvent("profile");
		}, 1000);
		if (this.user && !this.user.billingAddress)
			this.user.billingAddress = {
				street: "",
				country: "",
				city: "",
				pincode: "",
				state: "",
			};
	},
	watch: {
		user: function(data) {
			if (data && !data.billingAddress) {
				this.user.billingAddress = {
					street: "",
					country: "",
					city: "",
					pincode: "",
					state: "",
				};
			} else {
				this.updateCounty(this.user.billingAddress.country);
			}
		},
	},
	methods: {
		...mapActions({
			registerUser: "User/registerUser",
			deleteTeamInvite: "User/deleteTeamInvite",
			deleteTeamMember: "User/deleteTeamMember",
			updateAddress: "User/updateAddress",
			resetPassword: "User/resetPassword",
			getUploadUrl: "User/getUploadUrl",
			changeRole: "User/changeRole",
			requestUsers: "User/requestUsers",
			fetchUser: "User/fetch",
			inviteLinkGen: "User/inviteLink",
			updateCreditCard: "Billing/updateCreditCard",
			inviteFriend: "Dash/inviteFriend",
		}),
		viewMember() {
			this.showTeam = true;
		},
		updateCounty(country) {
			if (country) {
				// if (this.user.billingAddress.state) {
				//   this.user.billingAddress.state
				// }
				if (this.countryChange) {
					this.user.billingAddress.state = "";
				}
				var statesData = this.getState(country);
				if (
					statesData &&
					statesData["states"] &&
					statesData["states"].length > 0
				) {
					this.selectedStates = statesData.states;
				} else {
					this.selectedStates = [];
				}
				// if (
				//   this.user &&
				//   this.user.billingAddress &&
				//   this.user.billingAddress.country !== country
				// )
				//   if (this.user && this.user.billingAddress) {
				//     this.user.billingAddress.state = this.selectedStates[0];
				//   }
			}
		},
		addMember() {
			this.newMember = true;
		},
		clickOnSelect() {
			document.getElementById("change-status").click();
		},
		changeStatus(teamMember) {
			console.log(teamMember);
			this.changeRole({
				toBlock: teamMember.blockStatus.toString(),
				userId: teamMember._id,
				accountId: teamMember.accountId,
			})
				.then(res => {
					// amplitude.getInstance().logEvent("userRoleChange");
					this.message.value = this.$t("messages.teamMemberStatusChangeSuccessMessage");
					this.message.error = false;
					this.message.global = true;
					this.requestUsers(this.user.accountId);
					setTimeout(() => {
						this.message.global = false;
						this.message.value = "";
					}, 4000);
				})
				.catch(err => {
					this.message.value = err.data.error.error.message;
					this.message.error = true;
				});
		},
		closePopup(type) {
			this.showTeam = false;
			this.showAddress = false;
			this.newMember = false;
			this.addNewMember = undefined;
			this.showReset = "";
			this.oldPass = undefined;
			this.newPass = undefined;
			this.conPass = undefined;
			this.showReferFriendPopup = false;
			// this.inviteLinkData = "";
			if (type == "address") this.fetchUser();
		},
		openAddress() {
			this.showAddress = true;
		},
		cancelContainer(container) {
			if ((container = "address")) {
				this.showAddress = false;
				this.fetchUser();
			}
			if ((container = "invite")) {
				this.newMember = false;
				this.addNewMember = "";
			}
			if ((container = "pass")) {
				this.showReset = false;
				this.oldPass = undefined;
				this.newPass = undefined;
				this.conPass = undefined;
			}
		},
		updatePass() {
			if (
				this.newPass &&
				this.oldPass &&
				this.conPass &&
				this.newPass === this.conPass
			) {
				this.resetPassword({
					oldPassword: this.oldPass,
					newPassword: this.newPass,
				})
					.then(res => {
						if (res) {
							// amplitude.getInstance().logEvent("passwordUpdate");
							this.showReset = false;
							this.message.value = res.message;
							this.message.global = true;
							this.oldPass = undefined;
							this.newPass = undefined;
							setTimeout(() => {
								this.message.value = "";
								this.message.global = false;
							}, 4000);
						}
					})
					.catch(err => {
						console.log(err);
						this.message.value = err.message;
						this.message.error = true;
					});
			} else if (this.newPass !== this.conPass) {
				this.message.error = true;
				this.message.global = true;
				this.message.value =
					this.$t("messages.passwordAndCofirmPasswordDidntMatchMessage");
				setTimeout(() => {
					this.message.value = "";
					this.message.global = false;
				}, 4000);
			} else {
				this.message.error = true;
				this.message.value = this.$t("messages.enterPasswordMessage");
				setTimeout(() => {
					this.message.value = "";
					this.message.global = false;
				}, 4000);
			}
		},
		addressUpdate: function() {
			const {
				billingAddress: { street, pincode, country, city, state },
			} = this.user;
			const companyName = this.user.companyName
				? this.user.companyName.trim("")
				: "";
			const firstName = this.user.firstName
				? this.user.firstName.trim()
				: "";
			const lastName = this.user.lastName
				? this.user.lastName.trim()
				: "";
			const contactNumber = this.user.contactNumber
				? this.user.contactNumber.trim()
				: "";
			if (
				!this.user.billingAddress.street ||
				!this.user.billingAddress.pincode ||
				!this.user.billingAddress.country ||
				!this.user.billingAddress.city ||
				!firstName ||
				!lastName ||
				!companyName ||
				!contactNumber
			) {
				this.message.value = this.$t("messages.pleaseFillAllFields");
				this.message.global = true;
				this.message.error = true;
				setTimeout(() => {
					this.message.value = "";
					this.message.global = false;
				}, 4000);
			} else if (companyName.length <= 1) {
				this.message.value = this.$t("messages.minCompanyNameString");
				this.message.global = true;
				this.message.error = true;
				setTimeout(() => {
					this.message.value = "";
					this.message.global = false;
				}, 4000);
			} else
				this.updateAddress({
					billingAddress: { street, pincode, country, city, state },
					contactNumber,
					firstName,
					lastName,
					companyName,
				})
					.then(res => {
						console.log("Address updatedd", res);
						this.showAddress = false;
						this.message.value = res.message;
						this.message.global = true;
						this.message.error = !res.error ? false : true;
						this.countryChange = false;
						this.fetchUser();
						// amplitude.getInstance().logEvent("addressUpdated");
						setTimeout(() => {
							this.message.value = "";
							this.message.global = false;
						}, 4000);
					})
					.catch(err => {
						console.log(err);
						this.message.value = err.data.message;
						this.message.error = true;
					});
		},
		sendInvite() {
			const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			// console.log('Email', this.addNewMember);
			// return;
			if (
				this.addNewMember == "" ||
				reg.test(this.addNewMember) == false
			) {
				this.message.error = true;
				if (reg.test(this.addNewMember) == false)
					this.message.value = this.$t("messages.enterValidEmailMessage");
				else this.message.value = this.$t("messages.enterEmailMessage");
				setTimeout(() => {
					this.message.value = "";
				}, 4000);
			} else {
				this.registerUser({ email: this.addNewMember, role: "" })
					.then(res => {
						amplitude.getInstance().logEvent("addMemberProfile");
						this.message.value = this.$t("messages.invitationSentSuccessMessage");
						this.message.error = false;
						this.message.global = true;
						this.addNewMember = "";
						this.requestUsers(this.user.accountId);
						this.showTeam = false;

						setTimeout(() => {
							this.message.global = false;
							this.message.value = "";
						}, 4000);
					})
					.catch(err => {
						if (
							err.data.statusCode === 400 &&
							err.data.message === "Limit exceeded"
						) {
							this.showTeam = false;
							this.showMembersLimitExeccedPopup = true;
						}
						this.message.value = err.data.error.error.message;
						this.message.error = true;
					});
			}
		},
		openUploader() {
			if (
				(this.user.accountType &&
					this.user.accountType === "root" &&
					!this.user.superAccountInfo) ||
				(this.user.superAccountInfo &&
					this.user.superAccountInfo.accountType === "root") ||
				(this.user.accountType &&
					this.user.accountType === "child" &&
					!this.user.whitelabel)
			) {
				this.$refs.file.click();
			}
		},
		uploadImage() {
			if (this.$refs.file && this.$refs.file.files[0]) {
				var reader = new FileReader();
				var refrence = this.$refs.UploadedImage;
				reader.onload = function(e) {
					refrence.src = e.target.result;
					refrence.width = 132;
				};
				// amplitude.getInstance().logEvent("profilePicture");
				reader.readAsDataURL(this.$refs.file.files[0]);
				this.getUploadUrl(this.$refs.file.files[0]);
			}
		},
		updateCC: function() {
			console.log("account id", this.user.accountId);
			this.updateCreditCard({ accountId: this.user.accountId })
				.then(res => {
					if (res) {
						if (
							res["data"] &&
							res["data"].hosted_page &&
							res["data"].hosted_page.url
						) {
							let chargebeeInstance = Chargebee.getInstance();
							chargebeeInstance.openCheckout({
								hostedPage: function() {
									return new Promise(function(
										resolve,
										reject
									) {
										res["data"].hosted_page["embed"] = true;
										resolve(res["data"].hosted_page);
									});
								},
								success: hostedPageId => {},
								close: function() {},
							});
							// window.open(res["data"].hosted_page.url, "_blank");
						}
					}
				})
				.catch(err => {
					console.log("Error", err);
				});
		},
		inviteLink() {
			const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (this.friendEmail && reg.test(this.friendEmail)) {
				this.inviteFriend({ email: this.friendEmail })
					.then(res => {
						this.newMember = false;
						this.friendEmail = "";
						this.message.error = false;
						this.message.value = res.message;
						this.message.global = true;
						setTimeout(() => {
							this.message.global = false;
							this.message.value = "";
						}, 4000);
						if (window.analytics) {
							window.analytics.track(
								"Refer a Friend",
								{
									title: "Refer a Friend",
									subtitle: "mobile",
								},
								{
									integrations: {
										Amplitude: {
											session_id: new Date().getTime(),
										},
									},
								},
								{ timestamp: new Date().getTime() }
							);
						}
					})
					.catch(err => {
						this.message.global = true;
						this.message.error = true;
						this.message.value = this.$t("messages.somethingWentWrong");
						setTimeout(() => {
							this.message.global = false;
							this.message.value = "";
						}, 2500);
					});
			} else {
				this.message.global = true;
				this.message.error = true;
				this.message.value = this.$t("messages.emailRequiredMessage");
				setTimeout(() => {
					this.message.global = false;
					this.message.value = "";
				}, 2500);
			}
		},
		handleSaveChangesButtonClick() {
			this.$root.$emit("save-profile-changes");
		},
		onUpgradeClick() {
			window.analytics.track(
				"newproject_paywal_upgrade",
				{
					title: "NEW_PROJECT_PAYWALL",
					subtitle: "NEW_PROJECT_PAYWALL",
				},
				{
					integrations: {
						Amplitude: { session_id: new Date().getTime() },
					},
				},
				{ timestamp: new Date().getTime() }
			);
			window.open(
				window.location.origin + this.localePath("/settings/plans_new"),
				"_blank"
			);
		},
		closePopupForUpgrade() {
			this.showMembersLimitExeccedPopup = false;
			window.analytics.track(
				"newproject_paywal_later",
				{
					title: "NEW_PROJECT_PAYWALL",
					subtitle: "NEW_PROJECT_PAYWALL",
				},
				{
					integrations: {
						Amplitude: { session_id: new Date().getTime() },
					},
				},
				{ timestamp: new Date().getTime() }
			);
		},
		handleInviteDeleteButtonClick(user) {
			this.deleteTeamInvite(user._id)
				.then(res => {
					this.requestUsers(this.user.accountId);
					this.message.global = true;
					this.message.error = true;
					this.message.value = this.$t("messages.deletedInvite");
					setTimeout(() => {
						this.message.global = false;
						this.message.value = "";
					}, 2500);
				})
				.catch(err => {
					this.message.global = true;
					this.message.error = true;
					this.message.value = this.$t("messages.somethingWentWrong");
					setTimeout(() => {
						this.message.global = false;
						this.message.value = "";
					}, 2500);
				});
		},
		handleDeleteUser(childUser) {
			this.childUserToDelete = childUser;
			this.isDeleteConfirmationPopupVisible = true;
		},
		handleDeleteConfirmationClick() {
			let childUserToDelete = this.childUserToDelete;
			this.deleteTeamMember(childUserToDelete._id)
				.then(res => {
					this.requestUsers(this.user.accountId);
					this.message.global = true;
					this.message.error = true;
					this.message.value = this.$t("messages.teamMemberDeleted");
					setTimeout(() => {
						this.message.global = false;
						this.message.value = "";
					}, 2500);
				})
				.catch(err => {
					this.message.global = true;
					this.message.error = true;
					this.message.value = this.$t("messages.somethingWentWrong");
					setTimeout(() => {
						this.message.global = false;
						this.message.value = "";
					}, 2500);
				});
			this.closeDeleteConfirmationPopup();
		},
		closeDeleteConfirmationPopup() {
			this.childUserToDelete = null;
			this.isDeleteConfirmationPopupVisible = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.profile-page-wrapper {
	width: calc(100% - 6.25rem * 2);
	margin: 0 auto;
	padding: 4rem 0;
}
.setting-details-container.profile-account {
	display: flex;
	justify-content: space-between;
	@include respond(phone) {
		// width < 900px?
	}
	@include respond(s-phone) {
		// width < 900px?
		grid-template-columns: 1fr;
		grid-row-gap: 2rem;
	}
}
.plans-bg-pattern {
	pointer-events: none;
	position: absolute;
	opacity: 0.08;
	right: 0;
	top: 1rem;
	z-index: 0;
}
.user-profile-image {
	height: 100%;
	max-width: 18.75rem;
	width: 100%;
	object-fit: cover;
}
.icon-text {
	@include icon-text(1.25rem);
}
.team-canva {
	background: #292929;
	color: white;
	padding: 0.9375rem 1.25rem;
}
.total-members {
	text-align: center;
	p {
		margin: 0rem;
		font-weight: 600;
		line-height: normal;
		font-size: 4.5rem;
	}
	span {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.38);
	}
}
.action-members {
	display: flex;
	justify-content: space-between;
	margin-top: 2.5rem;
	p {
		font-size: 0.75rem;
		color: #ffffff;
		cursor: pointer;
	}
	span {
		color: #d48e8e;
		cursor: pointer;
	}
}
.billing-head {
	margin-top: 2.8125rem;
	@include icon-text(1.875rem);
	p {
		color: #3a393a;
		font-size: 1rem;
		font-weight: 500;
	}
}
.main-address {
	font-size: 0.9375rem;
	color: #3a393a;
	.edit-address {
		color: #3a393a;
		font-size: 0.8125rem;
		cursor: pointer;
		text-align: right;
		position: relative;

		&::before {
			content: "\203A";
			position: absolute;
			right: -15px;
			font-size: 2rem;
			top: 6px;
			transition: right 0.3s ease-in-out;
			transform: translateY(-50%);
		}
		&:hover {
			&::before {
				right: -20px;
			}
		}
	}
}
.address-head {
	display: flex;
	justify-content: space-between;
	p {
		color: #3a393a;
		font-size: 1rem;
		font-weight: 500;
	}
}
.setting-details-container {
	.profile-content-wrapper {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.save-changes-button {
		align-self: flex-start;
	}

	.profile-image {
		height: 9.75rem;
		width: 9.75rem;
		background: white;
		border-radius: 50%;
		position: relative;
		margin-bottom: 3.125rem;
		.upload-icon {
			height: 3.5rem;
			width: 3.5rem;
			position: absolute;
			cursor: pointer;
			right: -15%;
			bottom: -15%;
			display: block;
			filter: drop-shadow(0px 4px 13px rgba(226, 192, 182, 0.34));
		}
	}
	.profile-form {
		padding: 0rem;
		margin-bottom: 0.9375rem;
	}
	.profile-form,
	.setting-form {
		width: 100%;

		.form-item {
			display: flex;
			flex-direction: column;
			width: calc(100% - 6.25rem);
		}

		p {
			margin-bottom: 0.3125rem;
			font-family: $main-font;
			font-style: normal;
			font-weight: 600;
			font-size: 1.125rem;
			line-height: 1.5rem;
			color: rgba(41, 41, 41, 0.8);
		}
		input {
			background: white;
			margin-bottom: 1.5625rem;
			width: 100%;
			border: 1px solid rgba(0, 0, 0, 0.15);
			box-sizing: border-box;
			border-radius: 2px;
			height: 3.75rem;
		}
		select {
			background: white;
			width: 21.875rem;
		}
		.deactivating {
			display: inline;
			cursor: pointer;
			padding-bottom: 0.0625rem;
			border-bottom: 0.0625rem solid;
			width: max-content;
			margin-right: 1.875rem;
		}
		div {
			position: relative;
			width: max-content;
		}
		span {
			font-size: 0.8125rem;
			color: $color-head;
			position: absolute;
			right: 0.625rem;
			top: 2.5rem;
		}
	}

	.quick-link-container {
		font-family: $main-font;
		font-style: normal;
		.section-header {
			font-weight: 600;
			font-size: 1.375rem;
			line-height: 2rem;
			color: $plan-title;
			margin-bottom: 2rem;
		}

		.link {
			cursor: pointer;
			font-weight: 500;
			font-size: 0.9375rem;
			line-height: 1.5rem;
			color: rgba(41, 41, 41, 1);
			padding-bottom: 1rem;
			border-bottom: 1px solid rgba(0, 0, 0, 0.15);
			margin-bottom: 1.5rem;
		}
	}
}

.non-root-change-password {
	cursor: pointer;
	font-weight: 500;
	font-size: 0.9375rem;
	line-height: 1.5rem;
	color: rgba(41, 41, 41, 1);
	margin-top: 1.5rem;
}

.popup-div .popup-details {
	select {
		background: #292929;
		width: max-content;
		&:hover {
			background: #2d2d2d;
		}
	}
}
.popup-div .popup-details .table-child:hover select {
	background: #2d2d2d;
}
.popup-div .popup-details .select-box {
	background: #323232;
	select {
		width: 100%;
		background: #323232;
		cursor: pointer;
	}
}
// .resend-btn {
// 	color: white;
// 	font-size: 0.9rem;
// 	border: 0.1px solid #e9beb3;
// 	padding: 0.625rem 1.25rem;
// 	margin-right: -4rem;
// 	color: #e9beb3;
// 	padding: 0.625rem 0.8rem;
// 	cursor: pointer;
// 	position: relative;
// 	z-index: 1;
// 	@include background-animate(#e9beb3, black);
// }
.resend-btn,
.delete-btn {
	cursor: pointer;
	position: relative;
	z-index: 1;
	svg {
		display: block;
	}
}
.resend-btn {
	svg {
		width: 1.375rem * 1.22;
		height: 1.375rem * 1.22;
	}
}
.delete-btn {
	margin-right: 1.4375rem * 1.22;
	svg {
		width: 1.5rem * 1.22;
		height: 1.5rem * 1.22;
	}
}
.delete-user {
	svg {
		cursor: pointer;
		width: 1.5rem * 1.22;
		height: 1.5rem * 1.22;
	}
}
.manage-team-wrapper {
	margin-top: 3.75rem;
	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem 2.5rem;
		background: $background-7;
		border: 1px solid #e2c0b6;
		box-sizing: border-box;
		border-radius: 2px;

		font-family: "Montserrat";
		font-style: normal;

		.invite-text {
			font-weight: 600;
			font-size: 1.375rem;
			line-height: 2rem;
			color: rgba(41, 41, 41, 0.8);
		}

		.invite-button {
			// background: $plan-title;
			// border-radius: 2px;
			// padding: 0.75rem 2rem;
			// cursor: pointer;

			// font-weight: 700;
			// font-size: 0.9375rem;
			// line-height: 1.5rem;
			// text-align: center;
			// text-transform: uppercase;
			// color: #e2c0b6;
		}
	}

	table {
		border: 1px solid rgba(0, 0, 0, 0.15);
		border-top: none;
		box-sizing: border-box;
		border-radius: 2px;
		width: 100%;
	}

	.table-heads {
		// padding: 0 2.5rem;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 2px;

		td {
			font-family: $main-font;
			font-style: normal;
			font-weight: 600;
			font-size: 0.875rem;
			line-height: 1rem;
			text-transform: capitalize;
			color: rgba(41, 41, 41, 0.6);
			padding: 0.75rem 1.875rem;
		}
	}

	.table-child {
		td {
			padding: 0.75rem 1.875rem;
			font-family: $main-font;
			font-style: normal;
			font-weight: 600;
			font-size: 0.875rem;
			line-height: 1rem;
			text-transform: capitalize;
			color: $plan-title;
		}

		.invitation-status {
			display: flex;
			align-items: center;

			svg {
				margin-left: 0.3125rem * 1.22;
				width: 1.0625rem;
				height: 0.875rem;
			}
		}

		.member-status {
			font-family: $main-font;
			font-style: normal;
			font-weight: 700;
			font-size: 0.75rem;
			line-height: 1rem;
			border-radius: 2px;

			.active {
				display: inline;
				padding: 4px 12px;
				display: inline;
				padding: 4px 12px;
				background: #f8f0ed;
				color: #cc4040;
			}

			.inactive {
				display: inline;
				padding: 4px 12px;
				background: rgba(0, 0, 0, 0.05);
				color: rgba(41, 41, 41, 0.8);
			}
		}
	}

	.select-edit {
		select {
			background-color: #cdf3e2;
			font-size: 11px;
			padding: 0.1875rem * 1.22 1rem * 1.22 0.1875rem * 1.22 0.75rem *
				1.22 !important;
			cursor: pointer;

			option {
				background-color: white;
				color: black;
			}
		}
		position: relative;
		svg {
			transform: scale(0.75);
			position: absolute;
			// top: calc(50% - 1.1875rem * 1.22);
			top: auto;
			left: 75px;
			height: 1.1875rem * 1.22;
			width: 1.1875rem * 1.22;
		}

		&.inactive {
			svg {
				left: 76px;
				path {
					stroke: rgba(232, 80, 91, 1);
				}
			}
		}
	}
}

.upgrade-popup-container {
	display: grid;
	justify-items: center;
	align-items: center;
	padding: 2rem 10rem;
	background-image: url("~assets/images/popUpBackground.png");
	background-repeat: no-repeat;
	background-position: right center;
	background-color: #232121;
	max-width: 60%;
}

.delete-confirmation-popup {
	height: 33.25rem * 1.22;
	width: 46.5rem * 1.22;
	padding: 0;

	display: flex;
	flex-direction: column;

	.content {
		background: #faf5f2;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-grow: 1;

		.graphic-wrapper {
			margin-bottom: 2.625rem;
		}

		.header {
			font-style: normal;
			font-weight: 600;
			font-size: 1.5rem * 1.22;
			line-height: 2rem * 1.22;
			text-align: center;
			margin-bottom: 4px;
			color: $banner-heading-color;
			width: 80%;
		}

		.subheader {
			font-style: normal;
			font-weight: 400;
			font-size: 1rem * 1.22;
			line-height: 2rem;
			text-align: center;
			color: $banner-heading-color;
			width: 75%;
		}
	}

	.footer {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.875rem * 1.22 0;

		.delete-btn {
			border: 1px solid $border-1;
			font-style: normal;
			font-weight: 600;
			font-size: 1.125rem * 1.22;
			line-height: 1.75rem * 1.22;
			padding: 0.4375rem * 1.22 2rem * 1.22;
			color: $color-white;
			border-radius: 4px;
		}
	}
}

.default-button-styles {
	background: $plan-title;
	border-radius: 2px;
	padding: 0.75rem 2rem;
	cursor: pointer;

	font-weight: 700;
	font-size: 0.9375rem;
	line-height: 1.5rem;
	text-align: center;
	text-transform: uppercase;
	color: #e2c0b6;
}
</style>

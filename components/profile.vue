<template>
  <div class="setting-details-container profile-account" v-if="user && users">
    <svg class="plans-bg-pattern" width="500" height="500" viewBox="0 0 1106 646" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.3" d="M707.028 366.976L4.9209 620.361L707.028 873.746L1409.14 620.361L707.028 366.976Z" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
      <path opacity="0.3" d="M707.028 245.351L4.9209 498.736L707.028 752.121L1409.14 498.736L707.028 245.351Z" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
      <path opacity="0.3" d="M707.028 123.726L4.9209 377.111L707.028 630.496L1409.14 377.111L707.028 123.726Z" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
      <path opacity="0.3" d="M707.028 2.10098L4.9209 255.486L707.028 508.871L1409.14 255.486L707.028 2.10098Z" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
    </svg>
    <div>
      <div class="profile-image" @click="openUploader()">
        <img
          v-if="user"
          :src="user.personalInfo.dpUrl"
          ref="UploadedImage"
          class="user-profile-image"
          alt
        />
        <img v-if="(user.accountType && user.accountType === 'root' && !user.superAccountInfo) || (user.accountType && user.accountType === 'child' && !user.whitelabel) || (user.superAccountInfo && user.superAccountInfo.accountType === 'root')" src="~assets/images/pen2.svg" class="upload-icon" alt />
      </div>
      <input
        type="file"
        ref="file"
        name="User Profile Image"
        @change="uploadImage(
            $event.target.name, $event.target.files)"
        accept="image/x-png, image/jpeg"
        style="display:none"
      />
      <div v-if="user" class="profile-form">
        <div>
          <p>Full Name</p>
          <input autocomplete="off" type="text" v-model="user.fullName" />
        </div>
        <div>
          <p>Company Name</p>
          <input
            type="text"
            autocomplete="off"
            v-model="user.companyName"
            :disabled="user.accountType == 'root'?false:true"
          />
        </div>
        <!-- <div v-if="user && user.accountType == 'root'">
          <p>Country Name</p>
          <select v-model="user.billingAddress.country" autocomplete="off">
            <option :value="con.name" v-for="con in country">{{con.name}}</option>
          </select>
        </div>-->
      </div>
      <!-- <p>* This information will be displayed on your personal profile</p> -->
      <div class="account-head" v-if="user">
        <img src="~assets/images/accountSetting.svg" alt />
        <p>Account Settings</p>
      </div>
      <div v-if="user" class="setting-form">
        <div>
          <p>Email</p>
          <input autocomplete="off" type="text" v-model="user.email" disabled />
          <!-- <span>Edit</span> -->
        </div>
        <!-- <div>
            <p>Language</p>
            <input autocomplete="off" type="text" v-model="user.language">
        </div>-->
        <!-- <p class="deactivating">Deactivate Account</p> -->
        <p class="deactivating" @click="showReset=!showReset">Change Password</p>
        <br />
        <br />
        <p v-if="!isTrial" class="deactivating" @click="updateCC">Credit card details update</p>
      </div>
    </div>
    <div style="position:relative" v-if="user && user.accountType == 'root'">
      <div class="team-canva">
        <div class="icon-text">
          <img src="~assets/images/team.svg" alt />
          <p>Manage Team</p>
        </div>
        <div class="total-members">
          <p>{{users && invited ?users.length + invited.length:''}}</p>
          <span>Total Members</span>
        </div>
        <div class="action-members">
          <span style="visibility: hidden;" @click="addMember">+ Add Member</span>
          <p @click="viewMember">Manage Members</p>
        </div>
      </div>
      <div class="billing-head">
        <img src="~assets/images/address.svg" alt />
        <p>My Billing Address</p>
      </div>
      <div class="address-head" v-if="user && user.billingAddress">
        <p>{{user.firstName?user.firstName:'' + ' ' +user.lastName?user.lastName:''}}</p>
        <img style="visibility:hidden" src="~assets/images/blackbots.svg" alt />
      </div>
      <div class="main-address" v-if="user && user.billingAddress">
        <p>{{user.billingAddress.street?user.billingAddress.street+", ":""}} {{user.billingAddress.state?user.billingAddress.state+", ":""}} {{user.billingAddress.pincode?user.billingAddress.pincode+", ":""}}{{user.billingAddress.country?user.billingAddress.country+", ":""}}</p>
        <p @click="openAddress" class="edit-address">
          {{user.billingAddress.street?'Edit':'Add'}} Address
          <!-- <span>&#8250;</span> -->
        </p>
      </div>
    </div>
    <div class="popup-div" :class="showReset?'showPopUp':''" @click="closePopup">
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
          <h2>Change Password</h2>
        </div>
        <div class="popup-details">
          <div style="display:flex; flex-direction: column;">
            <input
              type="password"
              placeholder="*Old Password"
              style="margin:1.25rem 0rem"
              v-model="oldPass"
            />
            <input
              type="password"
              placeholder="*New Password"
              style="margin-bottom:1.25rem"
              v-model="newPass"
            />
            <input
              type="password"
              placeholder="*Confirm Password"
              style="margin-bottom:1.25rem"
              v-model="conPass"
            />
          </div>
          <!-- <p :class="message.error?'error-message':'success-message'">{{this.message.value}}</p> -->
          <div class="address-button-container">
            <button @click="cancelContainer('pass')" class="cancel-button">Cancel</button>
            <button
              @click="updatePass()"
              :disabled="!(newPass && oldPass && conPass)"
              class="update-address"
            >UPDATE Password</button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="showAddress?'showPopUp':''" @click="closePopup">
      <div class="popup-container" style="padding-bottom:1.5625rem;" @click.stop>
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
          <h2 v-if="showAddress">Update Address</h2>
        </div>
        <div class="popup-details" v-if="user && user.billingAddress" style="margin-top: 1.25rem;">
          <div class="address-input-container">
            <div class="address-left-container">
              <div>
                <span>
                  First Name
                  <sup>*</sup>
                </span>
                <input autocomplete="off" type="text" v-model="user.firstName" />
              </div>
              <div>
                <span>
                  Company Name
                  <sup>*</sup>
                </span>
                <input autocomplete="off" type="text" min="0" v-model="user.companyName" />
              </div>
            </div>
            <div class="address-right-container">
              <div>
                <span>
                  Last Name
                  <sup>*</sup>
                </span>
                <input autocomplete="off" type="text" v-model="user.lastName" />
              </div>
              <div>
                <span>Number</span>
                <input autocomplete="off" type="text" min="6" v-model="user.contactNumber" required />
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
              Address
              <sup>*</sup>
            </span>
            <textarea name id cols="80" rows="5" v-model="user.billingAddress.street"></textarea>
          </div>
          <div class="address-input-container">
            <div class="address-left-container">
              <div>
                <span>
                  City
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
                  State
                  <!-- <sup>*</sup> -->
                </span>
                <div class="select-box">
                  <select v-model="user.billingAddress.state">
                    <option :value="con" v-for="con in selectedStates">{{con}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="address-right-container">
              <div>
                <span>
                  Country
                  <sup>*</sup>
                </span>
                <div class="select-box">
                  <select
                    v-model="user.billingAddress.country"
                    @change="updateCounty(user.billingAddress.country)"
                    @click="countryChange = true"
                  >
                    <option :value="con.name" v-for="con in country">{{con.name}}</option>
                  </select>
                </div>
              </div>
              <div>
                <span>
                  Zip Code
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
        <div class="address-button-container" style="padding-top:1.25rem;">
          <button @click="cancelContainer('address')" class="cancel-button">Cancel</button>
          <button @click="addressUpdate()" class="update-address">UPDATE ADDRESS</button>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="showTeam?'showPopUp':''" @click="closePopup">
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
          <h2 v-if="showTeam">Team Members</h2>
        </div>
        <div class="popup-details">
          <div v-if="showTeam" class="invite-team-container">
            <input autocomplete="off" type="text" v-model="addNewMember" />
            <button @click="sendInvite()">Invite</button>
            <span
              :class="message.error?'error-message':'success-message'"
              v-if="message.value"
            >{{message.value}}</span>
          </div>
          <table
            v-if="showTeam && users.length>0 && invited"
            cellspacing="0"
            class="team-member-table"
          >
            <tr class="table-heads">
              <th>Sr.No</th>
              <th>Name</th>
              <th>Email ID</th>
              <th>Status</th>
              <!-- <th>Credits Usage</th> -->
            </tr>
            <tr class="table-child" v-for="(x,index) in users">
              <td>{{index+1}}</td>
              <td>{{x.name}}</td>
              <td>{{x.email}}</td>
              <td v-if="x.email != user.email" class="select-edit" @click="clickOnSelect">
                <select
                  id="change-status"
                  :style="{'color':x.blockStatus?'':'white'}"
                  name
                  v-model="x.blockStatus"
                  @change="changeStatus(x)"
                >
                  <option :value="false">Active</option>
                  <option :value="true">In Active</option>
                </select>
                <svg
                  width="16"
                  height="26"
                  viewBox="0 0 16 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.69997 23.3L15 3.70001L8.99997 1.10001L0.599976 20.7L2.49997 24.7L6.69997 23.3Z"
                    stroke="#D1D1D1"
                    stroke-miterlimit="10"
                  />
                  <path d="M13.4 7.4L7.39997 4.8" stroke="#D1D1D1" stroke-miterlimit="10" />
                </svg>
              </td>
              <td v-else>{{x.blockStatus?'In Active':'Active'}}</td>
              <!-- <td>{{user.usage}}</td> -->
            </tr>
            <tr class="table-child" v-for="(user,index) in invited">
              <td>{{index+1+ users.length}}</td>
              <td>Not Applicable</td>
              <td>{{user.email}}</td>
              <td>Invited</td>
              <td>
                <button class="resend-btn" @click="addNewMember=user.email;sendInvite()">Resend</button>
              </td>
              <!-- <td>Not Applicable</td> -->
            </tr>
          </table>
        </div>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
  </div>
  <div v-else class="main-loading">
    <div class="loading-container">
      <p>Loading...</p>
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
      title: "Neo - Settings"
    };
  },
  props: {
    // user: Object,
    users: Array,
    invited: Array
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
        global: false
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
      countryChange: false
      // inviteLinkData: ""
    };
  },
  computed: {
    ...mapState({
      isTrial: state => state.Billing.isTrial,
      user: state => state.User.user
    }),
    isDisabled() {
      return this.condition1 && this.condition2;
    },
    ...mapGetters({
      getState: "User/getState"
    })
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
        state: ""
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
          state: ""
        };
      } else {
        this.updateCounty(this.user.billingAddress.country);
      }
    }
  },
  methods: {
    ...mapActions({
      registerUser: "User/registerUser",
      updateAddress: "User/updateAddress",
      resetPassword: "User/resetPassword",
      getUploadUrl: "User/getUploadUrl",
      changeRole: "User/changeRole",
      requestUsers: "User/requestUsers",
      fetchUser: "User/fetch",
      inviteLinkGen: "User/inviteLink",
      updateCreditCard: "Billing/updateCreditCard"
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
        accountId: teamMember.accountId
      })
        .then(res => {
          // amplitude.getInstance().logEvent("userRoleChange");
          this.message.value = "Team member status change successfully";
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
          newPassword: this.newPass
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
          "Your password and confirmation password doesn't match";
        setTimeout(() => {
          this.message.value = "";
          this.message.global = false;
        }, 4000);
      } else {
        this.message.error = true;
        this.message.value = "Please enter password";
        setTimeout(() => {
          this.message.value = "";
          this.message.global = false;
        }, 4000);
      }
    },
    addressUpdate: function() {
      const {
        billingAddress: { street, pincode, country, city, state }
      } = this.user;
      const companyName = this.user.companyName
        ? this.user.companyName.trim("")
        : "";
      const firstName = this.user.firstName ? this.user.firstName.trim() : "";
      const lastName = this.user.lastName ? this.user.lastName.trim() : "";
      const contactNumber = this.user.contactNumber ? this.user.contactNumber.trim() : "";
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
        this.message.value = "Please fill all fields";
        this.message.global = true;
        this.message.error = true;
        setTimeout(() => {
          this.message.value = "";
          this.message.global = false;
        }, 4000);
      } else if (companyName.length <= 1) {
        this.message.value = "Company Name must be at least 2 chars";
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
          companyName
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
      if (this.addNewMember == "" || reg.test(this.addNewMember) == false) {
        this.message.error = true;
        if (reg.test(this.addNewMember) == false)
          this.message.value = "Please enter valid email";
        else this.message.value = "Please enter email";
        setTimeout(() => {
          this.message.value = "";
        }, 4000);
      } else {
        this.registerUser({ email: this.addNewMember, role: "" })
          .then(res => {
            amplitude.getInstance().logEvent("addMemberProfile");
            this.message.value = "Invitation sent successfully";
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
            this.message.value = err.data.error.error.message;
            this.message.error = true;
          });
      }
    },
    openUploader() {
      if((this.user.accountType && this.user.accountType === 'root' && !this.user.superAccountInfo)|| (this.user.superAccountInfo && this.user.superAccountInfo.accountType === 'root') || (this.user.accountType && this.user.accountType === 'child' && !this.user.whitelabel)){
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
                  return  new Promise(function(resolve, reject){
                    res['data'].hosted_page['embed'] = true;
                    resolve(res["data"].hosted_page);
                  });
                },
                success: (hostedPageId) => {
                },
                close: function() {
                }
              });
              // window.open(res["data"].hosted_page.url, "_blank");
            }
          }
        })
        .catch(err => {
          console.log("Error", err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.setting-details-container.profile-account {
  display: grid;
  grid-template-columns: 50% 30%;
  grid-column-gap: 3.125rem;
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
  border-radius: 50%;
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
  display: -webkit-flex;
  justify-content: space-between;
  p {
    color: #3a393a;
    font-size: 1rem;
    font-weight: 500;
  }
}
.setting-details-container {
  padding: 1.5625rem 3.125rem;

  .profile-image {
    height: 8.25rem;
    width: 8.25rem;
    background: white;
    border-radius: 50%;
    position: relative;
    margin-bottom: 3.125rem;
    .upload-icon {
      position: absolute;
      cursor: pointer;
      right: -0.625rem;
      bottom: 0rem;
    }
  }
  .account-head {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 1.25rem;
    margin-top: 2.8125rem;
    p {
      margin: 0rem;
      margin-left: 0.625rem;
    }
  }
  .profile-form {
    padding: 0rem;
    width: max-content;
    margin-bottom: 0.9375rem;
  }
  .profile-form,
  .setting-form {
    p {
      margin-bottom: 0.3125rem;
    }
    input {
      background: white;
      margin-bottom: 1.5625rem;
      width: 21.875rem;
      border: 1px solid gray;
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
.select-edit {
  select {
    font-size: 11px;
    padding: 0px 2rem 0px 0px !important;
    cursor: pointer;
  }
  position: relative;
  svg {
    transform: scale(0.5);
    position: absolute;
    top: calc(50% - 13px);
    left: 60px;
  }
}
.popup-div .popup-details .select-box {
  background: #323232;
  select {
    width: 100%;
    background: #323232;
    cursor: pointer;
  }
}
.resend-btn {
  color: white;
  font-size: 0.9rem;
  border: 0.1px solid #e9beb3;
  padding: 0.625rem 1.25rem;
  margin-right: -4rem;
  color: #e9beb3;
  padding: 0.625rem 0.8rem;
  cursor: pointer;
  position: relative;
  z-index: 1;
  @include background-animate(#e9beb3, black);
}
</style>

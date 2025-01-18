<template>
     <div class="popup-div" :class="cloneProject?'showPopUp':''" @click="closePopup">
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
          <h2>Clone Project</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <input
              autocomplete="off"
              type="text"
              placeholder="Enter project name"
              v-model="cloneProjectName"
            />
            <span
              :class="message.error?'error-message':'success-message'"
              v-if="message.value"
            >{{message.value}}</span>
          </div>
          <div class="invite-button-container">
            <button @click="closePopup" class="cancel-button">Cancel</button>
            <button
              @click="copyProject()"
              :disabled="!cloneProjectName"
              class="update-address white"
            >Clone</button>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import MoodboardDashboardMixin from "@/mixins/moodboardDashboardMixin";
export default {
	data() {
		return {
			cloneProjectName: "",
		};
	},
	mixins: [MoodboardDashboardMixin],
	computed: {
		...mapGetters("moodboardDashboard", ["cloneProject", "message"]),
	},
	methods: {
		...mapMutations("moodboardDashboard", [
			"setcloneProject",
			"setMessage",
		]),
		...mapActions("moodboardDashboard", ["cloneMBProject"]),
		...mapActions("Moodboard", ["fetchProjects"]),

		closePopup() {
			this.setcloneProject(false);
			this.cloneProjectName = "";
		},
		copyProject() {
			if (this.checkSpecialCharacters(this.cloneProjectName)) {
				this.setMessage({
					value: "Name can contain only alphanumeric characters, spaces and underscores.",
					error: true,
					global: false,
				});
			} else {
				this.cloneMBProject({ name: this.cloneProjectName })
					.then(res => {
						if (res.statusCode == 200) {
							this.closePopup();
							this.fetchProjects();
						}
					})
					.catch(err => {
						// console.log(err);
						this.setMessage(err);
					});
			}
		},
	},
};
</script>

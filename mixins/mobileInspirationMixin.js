import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

const MobileInspirationMixin = {
	components: {},
	data() {
		return {
			inspirationAuthors: [
				{name: "Alan Stewart",role: "Student", image: "AlanStewart-Student"},
				{name: "Cassie Lang",role: "Student", image: "CassieLang-Student"},
				{name: "Eric Smith",role: "Interior Designer", image: "EricSmith-InteriorDesigner"},
				{name: "Kate Anderson",role: "InteriorDesigner", image: "KateAnderson-InteriorDesigner"},
				{name: "Melanie Chen",role: "HomeStager", image: "MelanieChen-HomeStager"}
			]
		}
	},
  computed: {
		mobileInspirations() {
			let updatedInspirations = []
			if(this.inspirations && this.inspirations.length) {
				updatedInspirations = JSON.parse(JSON.stringify(this.inspirations)) //.sort((a,b) => ! a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
				updatedInspirations = updatedInspirations.map((inspiration, index) => {
					if (index < 5 && this.inspirationAuthors[index]) {
						// Add author details only to the first five inspirations
						inspiration.authorName = this.inspirationAuthors[index].name;
						inspiration.authorRole = this.inspirationAuthors[index].role;
						inspiration.authorImage = require(`~/assets/images/mobile/inspirations/${this.inspirationAuthors[index].image}.jpg`);
					}
					// Return the inspiration as it is (updated or unchanged)
					return inspiration;
				})
			}
			return updatedInspirations
		}
	},
	
};

export default MobileInspirationMixin;

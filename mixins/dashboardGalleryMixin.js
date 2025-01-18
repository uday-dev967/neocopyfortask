import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

const DashboardGalleryMixin = {
	components: {},
	data: () => ({}),
	computed: {},
	mounted() {},
	watch: {},
	methods: {
		getResolution(targetSize) {
			let resolution;
			if (targetSize >= 12000) {
				resolution = "12K";
			} else if (targetSize > 3000) {
				resolution = "4K";
			} else if (targetSize >= 1900) {
				resolution = "2K";
			} else if (targetSize > 900) {
				resolution = "1K";
			} else {
				resolution = "HD";
			}
			return resolution;
		},
		getRenderResolution(render) {
			let resolution;
			if (render.targetResolution) {
				return this.getResolution(render.targetResolution);
			}
			return this.getResolution(render.input.width);
		},
	},
};

export default DashboardGalleryMixin;

<template>
    <div class="template-main-container">
        <div class="banner-container">
			<banner
			:imageUrl="require('../../../assets/images/dashboard/templates-design-banner.png')"
			>
				<template slot="bannerContent">
						<div class="heading">
								Get your project off to a great start with 
								our expertly curated templates!		
						</div>
						<div class="subheading">
							Start with hand-picked moodboard templates for your project!
						</div>
						<div class="banner-action" >
							<button class="banner-action-btn" @click="redirectToTemplatesPage">Try Templates</button>
						</div>
				</template>
			</banner>
		</div>
       <div class="breadcrumbs">
            <div class="breadcrumb template" @click="redirectToTemplatesPage">Templates > </div> 
            <div class="breadcrumb">{{ $route.params.template }} Room Templates</div>
			<span class="templates-count">{{dataForTemplate.count}}</span>
       </div>
       <div class="templates-grid-wrapper">
        <div v-for="data in dataForTemplate.templates" :key="data._id">
            <moodboard-content-card
            :thumbnailUrl = data.image
            onHoverText="Use this Template"
            :cardDetails="data"
            :leftTextKey="'title'"
			@onOverlayBtnCLick="handleHoverBtnCLick"
            >
            </moodboard-content-card>
        </div>
        <!-- {{ dataForTemplate }} -->
       </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import moodboardContentCard from "@/components/moodboardDashboard/moodboardContentCard.vue";
import MoodboardDashboardMixin from "@/mixins/moodboardDashboardMixin";
import banner from "@/components/shared/dashboard/banner.vue";
export default {
	middleware: ["initAuth", "authReq"],
	layout: "moodboard-dashboard",
	mixins: [MoodboardDashboardMixin],
	components: {
		moodboardContentCard,
		banner,
	},
	data() {
		return {
			route: "",
			// dataForTemplatePage: null,
		};
	},
	computed: {
		...mapGetters("moodboardDashboard", [
			"inspirationTypesGroupedTempaltes",
			"roomTypesGroupedTempaltes",
		]),
		dataForTemplate() {
			const template = this.$route.params.template;
			if (
				this.inspirationTypesGroupedTempaltes &&
				this.inspirationTypesGroupedTempaltes.length &&
				this.roomTypesGroupedTempaltes &&
				this.roomTypesGroupedTempaltes.length
			) {
				let data = [
					...this.inspirationTypesGroupedTempaltes,
					...this.roomTypesGroupedTempaltes,
				];
				return data.find(obj => {
					return obj._id == template;
				});
			}
			return [];
		},
	},
	mounted() {
		this.route = this.$route;
	},
	methods: {
		redirectToTemplatesPage(){
			this.$router.push({
				path:'/moodboard/templates'
			})
		},
		handleHoverBtnCLick(cardDetails){
			this.openProject(cardDetails._id);
		}
	},
};
</script>


<style lang="scss" scoped>
.template-main-container {
	.breadcrumbs {
		display: flex;
		align-items: center;
		margin-bottom: 18px;
		.breadcrumb {
			font-weight: 700;
			font-size: 15px * 1.22;
			color: #222021;
			margin-right: 0.5rem;
			&.template{
				cursor: pointer;
			}
		}
		.templates-count {
			padding: 0.25rem * 1.22 0.5rem * 1.22;
			background: $color-second;
			border-radius: 0.25rem * 1.22;
			font-weight: 500;
			font-size: 0.625rem * 1.22;
			color: #232121;

			margin-left: 0.25rem * 1.22;
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 1;
		}
	}
	.templates-grid-wrapper {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-auto-rows: 160px * 1.22;
		gap: 16px;
	}
	.banner-container {
		margin-bottom: 48px;
	}
}
</style>

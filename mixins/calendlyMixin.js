import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

const CalendlyMixin = {
	components: {},
	data: () => ( {
        
    } ),
	computed: {
        ...mapState({
            getFreeDemoShow_Desk: state => state.Dash.getFreeDemoShow_Desk,
            isTrial: state => state.Billing.isTrial,
        }),
        calendlyUrl() {
            return this.isTrial ? "https://calendly.com/foyr-neo-product-demo" : "https://calendly.com/csm-team-5";
        }
    },
    mounted() {},
    watch: {},
	methods: {
        ...mapMutations({
            setGetFreeDemoShow_Desk: 'Dash/setGetFreeDemoShow_Desk'
        }),
        outsideClick() {
            if (this.getFreeDemoShow_Desk)
            this.setGetFreeDemoShow_Desk(false);
        },
    },
};

export default CalendlyMixin;

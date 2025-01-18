const initialState = () => ( {
	showNeoformPopupConfig: false,
	neoformPopupConfig: {
		height: "90vh",
		width: "70vw",
		neoFormUrl: "https://neostaging.foyr.com/forms#/",
	},
} );

export default {
	namespaced: true,
	state: {
		...initialState(),
	},
	mutations: {
		setShowNeoformPopupConfig( state, data ) {

			state.showNeoformPopupConfig = data;

		},
		setNeoformPopupConfigConfig( state, data ) {

			state.neoformPopupConfig = data;

		},
	},
	actions: {
		closeNeoformPopup( { commit } ) {

			commit( "setShowNeoformPopupConfig", false );
			commit(
				"setNeoformPopupConfigConfig",
				initialState().neoformPopupConfig
			);

		},
		openNeoformPopup( { commit }, popupConfig = {} ) {

			commit( "setShowNeoformPopupConfig", true );
			commit(
				"setNeoformPopupConfigConfig",
				Object.assign( initialState().neoformPopupConfig, popupConfig )
			);

		},
	},
	getters: {
		showNeoformPopupConfig: state => state.showNeoformPopupConfig,
		neoformPopupConfig: state => state.neoformPopupConfig,
	},
};

const initialState = () => ( {
	showTypeformPopupConfig: false,
	typeformPopupConfig: {
		height: "80vh",
		width: "70vw",
		typeFormUrl: ""
	},
	showEmbededTypeform: false,
	embededTypeformConfig: {
		// open: 'time',
		// openValue: 3000, // time in miliseconds
		height: "80vh",
		width: "70vw",
		typeFormUrl: "",
		formId: null,
		autoClose: true,
		size: 100,
		hidden: {},
		onReady: () => {},
		onSubmit: ( data ) => {},
		onClose: () => {},
		popupCloseCB: () => {}
	},
} );

export default {
	namespaced: true,
	state: {
		...initialState(),
	},
	mutations: {
		setShowTypeformPopupConfig( state, data ) {

			state.showTypeformPopupConfig = data;

		},
		setTypeformPopupConfigConfig( state, data ) {

			state.typeformPopupConfig = data;

		},
		setShowEmbededTypeform( state, data ) {

			state.showEmbededTypeform = data;

		},
		setEmbededTypeformConfig( state, data ) {

			state.embededTypeformConfig = data;

		},
	},
	actions: {
		closeTypeformPopup( { commit } ) {

			commit( "setShowTypeformPopupConfig", false );
			commit(
				"setTypeformPopupConfigConfig",
				initialState().typeformPopupConfig
			);

		},
		openTypeformPopup( { commit }, popupConfig = {} ) {

			commit( "setShowTypeformPopupConfig", true );
			commit(
				"setTypeformPopupConfigConfig",
				Object.assign( initialState().typeformPopupConfig, popupConfig )
			);

		},
		closeEmbededTypeform( { commit } ) {

			commit( "setShowEmbededTypeform", false );
			commit(
				"setEmbededTypeformConfig",
				initialState().embededTypeformConfig
			);

		},
		openEmbededTypeform( { commit }, popupConfig = {} ) {

			commit( "setShowEmbededTypeform", true );
			commit(
				"setEmbededTypeformConfig",
				Object.assign( initialState().embededTypeformConfig, popupConfig )
			);

		},
	},
	getters: {
		showTypeformPopupConfig: ( state ) => state.showTypeformPopupConfig,
		typeformPopupConfig: ( state ) => state.typeformPopupConfig,
		showEmbededTypeform: ( state ) => state.showEmbededTypeform,
		embededTypeformConfig: ( state ) => state.embededTypeformConfig,
	},
};

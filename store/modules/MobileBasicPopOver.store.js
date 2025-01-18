const mobileBasicPopupConfigs = {
	loginViaDesktopPopup: {
		isVisible: true,
		isI18String: false,
		title: "mobileLoginViaDesktopPopup.heading",
		message: "mobileLoginViaDesktopPopup.subheading",
		buttonConfig: [
			{
				buttonText: "buttonText.sendMeTheLink",
				// buttonAction: () => {
				// 	console.log("loginViaDesktopPopup")
				// }
			}
		],
		loginViaDesktopPopup: true,
	}
};

const initialState = () => ( {
	basicMobilePopupConfig: {
		isVisible: false,
	},
	showLoginViaDesktopPopup: false,
} );

const defaultGetters = function () {

	return Object.keys( initialState() ).reduce( ( acc, cv ) => {

		acc[ cv ] = state => state[ cv ];
		return acc;

	}, {} );

};

const defaultMutations = function () {

	return Object.keys( initialState() ).reduce( ( acc, cv ) => {

		let splitCV = cv.split( "" );
		splitCV[ 0 ] = splitCV[ 0 ].toUpperCase();
		acc[ "set" + splitCV.join( "" ) ] = ( state, data ) => ( state[ cv ] = data );
		return acc;

	}, {} );

};

export default {
	namespaced: true,
	state: initialState(),
	mutations: {
		...defaultMutations(),

	},
	actions: {
		resetBasicMobileConfig( { commit } ) {

			commit( "setBasicMobilePopupConfig", { isVisible: false, } );

		},
		updateBasicMobilePopupConfig( { commit }, payload ) {

			commit( "setBasicMobilePopupConfig", { ...mobileBasicPopupConfigs[ payload.popupName ], ...payload.data } );

		},
	},
	getters: {
		...defaultGetters()
	},
};

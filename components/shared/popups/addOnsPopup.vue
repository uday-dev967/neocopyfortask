<template>
	<div class="popup-div add-ons-popup" :class=" showAddOnsPopup ? 'showPopUp' : ''">
		<div class="popup-container" @click.stop>
			<div class="popup-header">
				<div v-if="planDetails" class="plan-details">
					<span class="selected-plan-text">{{ $t("suggestionText.planSelected") }}</span>
					<span class="package-name">
						{{ planDetails.package.split("Neo")[1] }}
						<span class="duration">({{ duration }})</span></span
					>
				</div>
				<div class="close-popup" @click="closeAddonPopup">
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
			</div>
			<div class="popup-content">
				<div
					v-if="showRecommendedAddonsSection"
					class="optional-add-ons-text"
				>
					{{ $t("plansNew.optionalAddonText") }}
				</div>
				<div
					v-if="showRecommendedAddonsSection"
					class="recommended-addons"
				>
					<div
						v-for="item of recommendedAddonsDetails"
						class="addon-item"
						:key="item.addon.id"
					>
						<svg
							v-if="
								item.addon.name
									.toLowerCase()
									.indexOf('elevations') >= 0
							"
							width="56"
							height="56"
							viewBox="0 0 56 56"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width="56" height="56" fill="#F8F0ED" />
							<path
								d="M43.606 12.1061C43.6646 12.0475 43.6646 11.9525 43.606 11.8939L42.6514 10.9393C42.5929 10.8808 42.4979 10.8808 42.4393 10.9393C42.3807 10.9979 42.3807 11.0929 42.4393 11.1515L43.2878 12L42.4393 12.8485C42.3807 12.9071 42.3807 13.0021 42.4393 13.0607C42.4979 13.1192 42.5929 13.1192 42.6514 13.0607L43.606 12.1061ZM17.9434 12.15H19.0082V11.85H17.9434V12.15ZM21.1379 12.15H23.2677V11.85H21.1379V12.15ZM25.3974 12.15H27.5271V11.85H25.3974V12.15ZM29.6568 12.15H31.7865V11.85H29.6568V12.15ZM33.9162 12.15H36.046V11.85H33.9162V12.15ZM38.1757 12.15H40.3054V11.85H38.1757V12.15ZM42.4351 12.15H43.5V11.85H42.4351V12.15ZM43.7121 12.2121C43.8293 12.095 43.8293 11.905 43.7121 11.7879L41.8029 9.87868C41.6857 9.76152 41.4958 9.76152 41.3786 9.87868C41.2615 9.99584 41.2615 10.1858 41.3786 10.3029L43.0757 12L41.3786 13.6971C41.2615 13.8142 41.2615 14.0042 41.3786 14.1213C41.4958 14.2385 41.6857 14.2385 41.8029 14.1213L43.7121 12.2121ZM17.9434 12.3H19.0082V11.7H17.9434V12.3ZM21.1379 12.3H23.2677V11.7H21.1379V12.3ZM25.3974 12.3H27.5271V11.7H25.3974V12.3ZM29.6568 12.3H31.7865V11.7H29.6568V12.3ZM33.9162 12.3H36.046V11.7H33.9162V12.3ZM38.1757 12.3H40.3054V11.7H38.1757V12.3ZM42.4351 12.3H43.5V11.7H42.4351V12.3Z"
								fill="#2D2D2D"
							/>
							<path
								d="M12.1061 15.7511C12.0475 15.6925 11.9525 15.6925 11.8939 15.7511L10.9393 16.7057C10.8808 16.7642 10.8808 16.8592 10.9393 16.9178C10.9979 16.9764 11.0929 16.9764 11.1515 16.9178L12 16.0693L12.8485 16.9178C12.9071 16.9764 13.0021 16.9764 13.0607 16.9178C13.1192 16.8592 13.1192 16.7642 13.0607 16.7057L12.1061 15.7511ZM12.15 43.5L12.15 42.5128L11.85 42.5128L11.85 43.5L12.15 43.5ZM12.15 40.5383L12.15 38.5638L11.85 38.5638L11.85 40.5383L12.15 40.5383ZM12.15 36.5893L12.15 34.6148L11.85 34.6148L11.85 36.5893L12.15 36.5893ZM12.15 32.6403L12.15 30.6658L11.85 30.6658L11.85 32.6403L12.15 32.6403ZM12.15 28.6913L12.15 26.7168L11.85 26.7168L11.85 28.6913L12.15 28.6913ZM12.15 24.7423L12.15 22.7679L11.85 22.7679L11.85 24.7423L12.15 24.7423ZM12.15 20.7934L12.15 18.8189L11.85 18.8189L11.85 20.7934L12.15 20.7934ZM12.15 16.8444L12.15 15.8571L11.85 15.8571L11.85 16.8444L12.15 16.8444ZM12.2121 15.645C12.095 15.5279 11.905 15.5279 11.7879 15.645L9.87868 17.5542C9.76152 17.6714 9.76152 17.8613 9.87868 17.9785C9.99584 18.0956 10.1858 18.0956 10.3029 17.9785L12 16.2814L13.6971 17.9785C13.8142 18.0956 14.0042 18.0956 14.1213 17.9785C14.2385 17.8613 14.2385 17.6714 14.1213 17.5542L12.2121 15.645ZM12.3 43.5L12.3 42.5128L11.7 42.5128L11.7 43.5L12.3 43.5ZM12.3 40.5383L12.3 38.5638L11.7 38.5638L11.7 40.5383L12.3 40.5383ZM12.3 36.5893L12.3 34.6148L11.7 34.6148L11.7 36.5893L12.3 36.5893ZM12.3 32.6403L12.3 30.6658L11.7 30.6658L11.7 32.6403L12.3 32.6403ZM12.3 28.6913L12.3 26.7168L11.7 26.7168L11.7 28.6913L12.3 28.6913ZM12.3 24.7423L12.3 22.7679L11.7 22.7679L11.7 24.7423L12.3 24.7423ZM12.3 20.7934L12.3 18.8189L11.7 18.8189L11.7 20.7934L12.3 20.7934ZM12.3 16.8444L12.3 15.8571L11.7 15.8571L11.7 16.8444L12.3 16.8444Z"
								fill="#2D2D2D"
							/>
							<path
								d="M20.42 34.9102H30.5H40.58C40.7279 34.9102 40.8593 34.8619 40.9542 34.7695C41.0494 34.677 41.1 34.5478 41.1 34.4017V27.0497V19.6977V14.7963C41.1 14.6502 41.0494 14.5211 40.9542 14.4285C40.8593 14.3362 40.7279 14.2879 40.58 14.2879H32.6H27.98H20.42C20.2721 14.2879 20.1407 14.3362 20.0458 14.4285C19.9506 14.5211 19.9 14.6502 19.9 14.7963V24.599V27.8666V32.7679V34.4017C19.9 34.5478 19.9506 34.6769 20.0458 34.7695C20.1407 34.8618 20.2721 34.9102 20.42 34.9102ZM20.94 28.375H24.9284C24.6796 30.4031 23.0308 32.0078 20.94 32.2486V28.375ZM20.94 15.3048H27.46V17.5555H27.14C26.9921 17.5555 26.8607 17.6038 26.7658 17.6961C26.6706 17.7886 26.62 17.9178 26.62 18.0639C26.62 18.21 26.6706 18.3391 26.7658 18.4317C26.8607 18.524 26.9921 18.5723 27.14 18.5723H28.82C28.9679 18.5723 29.0993 18.524 29.1942 18.4317C29.2894 18.3391 29.34 18.21 29.34 18.0639C29.34 17.9178 29.2894 17.7886 29.1942 17.6961C29.0993 17.6038 28.9679 17.5555 28.82 17.5555H28.5V15.3048H32.08V19.6977C32.08 19.8438 32.1306 19.9729 32.2258 20.0655C32.3207 20.1578 32.4521 20.2061 32.6 20.2061H34.18V20.5146C34.18 20.6607 34.2306 20.7898 34.3257 20.8824C34.4207 20.9747 34.5521 21.023 34.7 21.023C34.8479 21.023 34.9792 20.9747 35.0742 20.8824C35.1693 20.7898 35.2199 20.6607 35.2199 20.5146V18.8808C35.2199 18.7347 35.1693 18.6056 35.0742 18.513C34.9792 18.4207 34.8479 18.3724 34.7 18.3724C34.5521 18.3724 34.4207 18.4207 34.3257 18.513C34.2306 18.6056 34.18 18.7347 34.18 18.8808V19.1892H33.12V15.3048H40.06V19.1892H38.58V18.8808C38.58 18.7347 38.5294 18.6056 38.4342 18.513C38.3393 18.4207 38.2079 18.3724 38.06 18.3724C37.9121 18.3724 37.7807 18.4207 37.6858 18.513C37.5906 18.6056 37.54 18.7347 37.54 18.8808V20.5146C37.54 20.6607 37.5906 20.7898 37.6858 20.8824C37.7807 20.9747 37.9121 21.023 38.06 21.023C38.2079 21.023 38.3393 20.9747 38.4342 20.8824C38.5294 20.7898 38.58 20.6607 38.58 20.5146V20.2061H40.06V26.5412H37.74V26.2328C37.74 26.0867 37.6894 25.9576 37.5942 25.865C37.4993 25.7727 37.3679 25.7244 37.22 25.7244C37.0721 25.7244 36.9407 25.7727 36.8458 25.865C36.7506 25.9576 36.7 26.0867 36.7 26.2328V27.8666C36.7 28.0127 36.7506 28.1418 36.8458 28.2344C36.9407 28.3267 37.0721 28.375 37.22 28.375C37.3679 28.375 37.4993 28.3267 37.5942 28.2344C37.6894 28.1418 37.74 28.0127 37.74 27.8666V27.5581H40.06V33.8933H31.02V27.5581H33.34V27.8666C33.34 28.0127 33.3906 28.1418 33.4858 28.2344C33.5807 28.3267 33.7121 28.375 33.86 28.375C34.0079 28.375 34.1393 28.3267 34.2342 28.2344C34.3294 28.1418 34.38 28.0127 34.38 27.8666V26.2328C34.38 26.0867 34.3294 25.9576 34.2342 25.865C34.1393 25.7727 34.0079 25.7244 33.86 25.7244C33.7121 25.7244 33.5807 25.7727 33.4858 25.865C33.3906 25.9576 33.34 26.0867 33.34 26.2328V26.5412H30.5C30.3521 26.5412 30.2207 26.5895 30.1258 26.6819C30.0306 26.7744 29.98 26.9036 29.98 27.0497V33.8933H20.94V33.2532C23.7716 32.9996 25.98 30.6942 25.98 27.8666C25.98 27.7205 25.9294 27.5913 25.8342 27.4988C25.7393 27.4064 25.6079 27.3581 25.46 27.3581H20.94V25.1075H27.98C28.1279 25.1075 28.2593 25.0592 28.3542 24.9669C28.4494 24.8743 28.5 24.7452 28.5 24.599V21.8399H28.82C28.9679 21.8399 29.0993 21.7916 29.1942 21.6993C29.2894 21.6067 29.34 21.4776 29.34 21.3315C29.34 21.1854 29.2894 21.0562 29.1942 20.9637C29.0993 20.8713 28.9679 20.823 28.82 20.823H27.14C26.9921 20.823 26.8607 20.8713 26.7658 20.9637C26.6706 21.0562 26.62 21.1854 26.62 21.3315C26.62 21.4776 26.6706 21.6067 26.7658 21.6993C26.8607 21.7916 26.9921 21.8399 27.14 21.8399H27.46V24.0906H20.94V15.3048Z"
								fill="#63605F"
								stroke="#F8F0ED"
								stroke-width="0.2"
							/>
						</svg>
						<svg
							v-else-if="
								item.addon.name
									.toLowerCase()
									.indexOf('floor') >= 0
							"
							width="56"
							height="56"
							viewBox="0 0 56 56"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width="56" height="56" fill="#F8F0ED" />
							<path
								d="M19.8604 32.1907C19.8604 32.3966 19.6888 32.5635 19.4771 32.5635H15.8833C15.6716 32.5635 15.5 32.3966 15.5 32.1907C15.5 31.9848 15.6716 31.8179 15.8833 31.8179H19.4771C19.6888 31.8179 19.8604 31.9848 19.8604 32.1907ZM24.4125 15.7415C25.8921 15.7415 27.0958 16.9121 27.0958 18.351V19.0034C27.0958 19.2092 26.9242 19.3762 26.7125 19.3762H22.1125C21.9008 19.3762 21.7292 19.2092 21.7292 19.0034V18.351C21.7292 16.9121 22.9329 15.7415 24.4125 15.7415ZM22.4958 18.351V18.6306H26.3292V18.351C26.3292 17.3232 25.4693 16.4871 24.4125 16.4871C23.3556 16.4871 22.4958 17.3232 22.4958 18.351ZM18.6865 31.0723C18.8982 31.0723 19.0701 30.9054 19.0698 30.699L19.0497 16.1289C19.0479 14.8336 20.1253 13.7843 21.4573 13.7843H21.6215C22.3901 13.7843 23.0946 14.1287 23.5542 14.7291C23.6806 14.8942 23.9207 14.9285 24.0905 14.8055C24.2604 14.6826 24.2955 14.4491 24.1691 14.2839C23.5723 13.5043 22.6199 13.0388 21.6215 13.0388H21.4573C19.7012 13.0388 18.2807 14.422 18.283 16.1299L18.3031 30.7001C18.3034 30.9058 18.475 31.0723 18.6865 31.0723ZM36.775 25.9931V23.5624C36.775 22.4618 35.8542 21.5663 34.7224 21.5663H24.2609C23.1291 21.5663 22.2083 22.4618 22.2083 23.5624V24.4554C22.2083 24.6612 22.38 24.8282 22.5917 24.8282C22.8034 24.8282 22.975 24.6612 22.975 24.4554V23.5624C22.975 22.8728 23.5519 22.3118 24.2609 22.3118H29.1562V26.5057C29.1562 26.7116 29.3279 26.8785 29.5396 26.8785C29.7513 26.8785 29.9229 26.7116 29.9229 26.5057V22.3118H34.7224C35.4315 22.3118 36.0083 22.8728 36.0083 23.5624V26.003C35.1475 26.0932 34.475 26.8038 34.475 27.6646V27.9968C34.475 28.2027 34.6466 28.3696 34.8583 28.3696C35.07 28.3696 35.2417 28.2027 35.2417 27.9968V27.6646C35.2417 27.1541 35.6687 26.7387 36.1937 26.7387H36.7813C37.3062 26.7387 37.7333 27.1541 37.7333 27.6646V30.8921C37.7333 31.4026 37.3062 31.818 36.7813 31.818H35.2417C35.2417 29.3781 35.2435 29.5282 35.2384 29.488C35.2676 29.2604 35.0845 29.0687 34.8583 29.0687H26.2812C26.0696 29.0687 25.8979 29.2356 25.8979 29.4414C25.8979 29.6473 26.0696 29.8142 26.2812 29.8142H34.475V32.1908C34.475 32.3966 34.6466 32.5635 34.8583 32.5635H36.7813C37.729 32.5635 38.5 31.8137 38.5 30.8921V27.6646C38.5 26.755 37.7439 25.9931 36.775 25.9931ZM32.8937 31.8179C32.5471 31.8179 22.8424 31.8179 22.2979 31.8179C21.773 31.8179 21.3458 31.4025 21.3458 30.892V27.6646C21.3458 27.1541 21.773 26.7387 22.2979 26.7387H22.8854C23.4104 26.7387 23.8375 27.1541 23.8375 27.6646V29.7676C23.8375 29.9735 24.0092 30.1404 24.2209 30.1404C24.4326 30.1404 24.6042 29.9735 24.6042 29.7676V27.6646C24.6042 26.7429 23.8332 25.9931 22.8854 25.9931H22.2979C21.3502 25.9931 20.5792 26.7429 20.5792 27.6646V30.8921C20.5792 31.8137 21.3502 32.5635 22.2979 32.5635H32.8937C33.1054 32.5635 33.2771 32.3966 33.2771 32.1908C33.2771 31.9849 33.1054 31.8179 32.8937 31.8179Z"
								fill="black"
								fill-opacity="0.6"
							/>
							<path
								d="M11.6061 13.8956C11.5475 13.837 11.4525 13.837 11.3939 13.8956L10.4393 14.8502C10.3808 14.9088 10.3808 15.0038 10.4393 15.0623C10.4979 15.1209 10.5929 15.1209 10.6515 15.0623L11.5 14.2138L12.3485 15.0623C12.4071 15.1209 12.5021 15.1209 12.5607 15.0623C12.6192 15.0038 12.6192 14.9088 12.5607 14.8502L11.6061 13.8956ZM11.65 41.6445L11.65 40.6573L11.35 40.6573L11.35 41.6445L11.65 41.6445ZM11.65 38.6828L11.65 36.7083L11.35 36.7083L11.35 38.6828L11.65 38.6828ZM11.65 34.7338L11.65 32.7593L11.35 32.7593L11.35 34.7338L11.65 34.7338ZM11.65 30.7848L11.65 28.8103L11.35 28.8103L11.35 30.7848L11.65 30.7848ZM11.65 26.8359L11.65 24.8614L11.35 24.8614L11.35 26.8359L11.65 26.8359ZM11.65 22.8869L11.65 20.9124L11.35 20.9124L11.35 22.8869L11.65 22.8869ZM11.65 18.9379L11.65 16.9634L11.35 16.9634L11.35 18.9379L11.65 18.9379ZM11.65 14.9889L11.65 14.0017L11.35 14.0017L11.35 14.9889L11.65 14.9889ZM11.7121 13.7895C11.595 13.6724 11.405 13.6724 11.2879 13.7895L9.37868 15.6987C9.26152 15.8159 9.26152 16.0058 9.37868 16.123C9.49584 16.2402 9.68579 16.2402 9.80294 16.123L11.5 14.4259L13.1971 16.123C13.3142 16.2402 13.5042 16.2402 13.6213 16.123C13.7385 16.0058 13.7385 15.8159 13.6213 15.6987L11.7121 13.7895ZM11.8 41.6445L11.8 40.6573L11.2 40.6573L11.2 41.6445L11.8 41.6445ZM11.8 38.6828L11.8 36.7083L11.2 36.7083L11.2 38.6828L11.8 38.6828ZM11.8 34.7338L11.8 32.7593L11.2 32.7593L11.2 34.7338L11.8 34.7338ZM11.8 30.7848L11.8 28.8103L11.2 28.8103L11.2 30.7848L11.8 30.7848ZM11.8 26.8359L11.8 24.8614L11.2 24.8614L11.2 26.8359L11.8 26.8359ZM11.8 22.8869L11.8 20.9124L11.2 20.9124L11.2 22.8869L11.8 22.8869ZM11.8 18.9379L11.8 16.9634L11.2 16.9634L11.2 18.9379L11.8 18.9379ZM11.8 14.9889L11.8 14.0017L11.2 14.0017L11.2 14.9889L11.8 14.9889Z"
								fill="#2D2D2D"
							/>
							<path
								d="M44.6061 13.8956C44.5475 13.837 44.4525 13.837 44.3939 13.8956L43.4393 14.8502C43.3808 14.9088 43.3808 15.0038 43.4393 15.0623C43.4979 15.1209 43.5929 15.1209 43.6515 15.0623L44.5 14.2138L45.3485 15.0623C45.4071 15.1209 45.5021 15.1209 45.5607 15.0623C45.6192 15.0038 45.6192 14.9088 45.5607 14.8502L44.6061 13.8956ZM44.65 41.6445L44.65 40.6573L44.35 40.6573L44.35 41.6445L44.65 41.6445ZM44.65 38.6828L44.65 36.7083L44.35 36.7083L44.35 38.6828L44.65 38.6828ZM44.65 34.7338L44.65 32.7593L44.35 32.7593L44.35 34.7338L44.65 34.7338ZM44.65 30.7848L44.65 28.8103L44.35 28.8103L44.35 30.7848L44.65 30.7848ZM44.65 26.8359L44.65 24.8614L44.35 24.8614L44.35 26.8359L44.65 26.8359ZM44.65 22.8869L44.65 20.9124L44.35 20.9124L44.35 22.8869L44.65 22.8869ZM44.65 18.9379L44.65 16.9634L44.35 16.9634L44.35 18.9379L44.65 18.9379ZM44.65 14.9889L44.65 14.0017L44.35 14.0017L44.35 14.9889L44.65 14.9889ZM44.7121 13.7895C44.595 13.6724 44.405 13.6724 44.2879 13.7895L42.3787 15.6987C42.2615 15.8159 42.2615 16.0058 42.3787 16.123C42.4958 16.2402 42.6858 16.2402 42.8029 16.123L44.5 14.4259L46.1971 16.123C46.3142 16.2402 46.5042 16.2402 46.6213 16.123C46.7385 16.0058 46.7385 15.8159 46.6213 15.6987L44.7121 13.7895ZM44.8 41.6445L44.8 40.6573L44.2 40.6573L44.2 41.6445L44.8 41.6445ZM44.8 38.6828L44.8 36.7083L44.2 36.7083L44.2 38.6828L44.8 38.6828ZM44.8 34.7338L44.8 32.7593L44.2 32.7593L44.2 34.7338L44.8 34.7338ZM44.8 30.7848L44.8 28.8103L44.2 28.8103L44.2 30.7848L44.8 30.7848ZM44.8 26.8359L44.8 24.8614L44.2 24.8614L44.2 26.8359L44.8 26.8359ZM44.8 22.8869L44.8 20.9124L44.2 20.9124L44.2 22.8869L44.8 22.8869ZM44.8 18.9379L44.8 16.9634L44.2 16.9634L44.2 18.9379L44.8 18.9379ZM44.8 14.9889L44.8 14.0017L44.2 14.0017L44.2 14.9889L44.8 14.9889Z"
								fill="#2D2D2D"
							/>
							<rect
								x="31.5"
								y="20"
								width="8"
								height="4"
								stroke="#63605F"
								stroke-width="0.8"
								stroke-linejoin="round"
							/>
						</svg>
						<div class="details-container">
							<div class="name-and-price-wrapper">
								<div class="name">{{ item.addon.name }}</div>
								<div class="price hide-on-mobile">
									{{ currencySymbol }}
									{{ item.addon.price / 100 }}
								</div>
								<div class="addon-action hide-on-mobile">
									<div
										v-if="
											!selectedRecommendedAddonsForCheckout.find(
												(e) => e.id === item.addon.id
											)
										"
										class="add-btn"
										@click="
											selectRecommendedAddon(item.addon)
										"
									>
										{{ $t("buttonText.add") }}
									</div>
									<div
										v-else
										class="remove-btn"
										@click="
											removeRecommendedAddon(item.addon)
										"
									>
										{{ $t("buttonText.remove") }}
									</div>
								</div>
							</div>
							<div class="description">
								{{ item.addon.description }}
							</div>
							<div class="price-and-action-wrapper hide-on-desktop">
								<div class="price">
									{{ currencySymbol }}
									{{ item.addon.price / 100 }}
								</div>
								<div class="addon-action">
									<div
										v-if="
											!selectedRecommendedAddonsForCheckout.find(
												(e) => e.id === item.addon.id
											)
										"
										class="add-btn"
										@click="
											selectRecommendedAddon(item.addon)
										"
									>
										{{ $t("buttonText.add") }}
									</div>
									<div
										v-else
										class="remove-btn"
										@click="
											removeRecommendedAddon(item.addon)
										"
									>
										{{ $t("buttonText.remove") }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="total-price-and-action-section">
					<div v-if="isFreeTrail" class="total-price">
						<span> {{ $t("plansNew.totalPrice") }}</span>
						{{ getFinalPlanPriceWithAdons }}
					</div>
					<div v-else></div>
					<div
						class="continue-btn"
						@click="
							handleContinueButtonClick(planDetails, duration)
						"
					>
						{{ $t("buttonText.continue") }}
					</div>
				</div>
			</div>
			<div class="popup-footer">
				<div class="optional-add-ons-text">{{ $t("plansNew.customModels") }}</div>
				<div class="sub-text">
					{{ $t("plansNew.customModelsSubText") }}
				</div>
				<div class="addons-container">
					<div
						class="addon"
						v-for="addonItem in customModeAddonsReversed"
						:key="addonItem._id"
					>
						<p class="addon-units">
							{{ addonItem.displayContext.packageUnits }} {{ $t("plansNew.custom") }}
							{{ addonItem.displayContext.packageUnitName }}
						</p>
						<p class="addon-cost">
							({{ addonItem.displayContext.currency_symbol
							}}{{ addonItem.displayContext.packageCost }})
						</p>
					</div>
				</div>
				<ul class="add-ons-container-mobile">
					<li
						class="addon"
						v-for="addonItem in customModeAddonsReversed"
						:key="addonItem._id"
					>
						<p class="addon-units">
							{{ addonItem.displayContext.packageUnits }} {{ $t("plansNew.custom") }}
							{{ addonItem.displayContext.packageUnitName }}
						</p>
						<p class="addon-cost">
							({{ addonItem.displayContext.currency_symbol
							}}{{ addonItem.displayContext.packageCost }})
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from "vuex";
	export default {
		name: "AddOnsPopup",
		props: {
			showAddOnsPopup: {
				required: true,
				default: false,
			},
			planDetails: {
				required: true,
				default: null,
			},
			duration: {
				required: true,
				default: null,
			},
			showRecommendedAddonsSection: {
				required: true,
				default: false,
			},
			currencySymbol: {
				required: true,
				type: String,
				default: "",
			},
			recommendedAddonsDetails: {
				required: true,
				default: () => [],
			},
			customModeAddonsReversed: {
				required: true,
				default: () => {},
			},
		},
        watch: {
            showAddOnsPopup(nv) {
                if (nv) {
                    this.selectedRecommendedAddonsForCheckout = [];
                }
            }
        },
		computed: {
			...mapState({
				user: (state) => state.User.user,
				currentBilling: (state) => state.Billing.currentSubscription,
				packages: (state) => state.Subscriptions.packages,
				packageDetails: (state) => state.Subscriptions.packageDetails,
				isChargebee: (state) => state.Billing.isChargebee,
				future: (state) =>
					state.Subscriptions.mySubscription.filter((item) => {
						return (
							item.activeStatus == "future" && item.type == "package"
						);
					}),
				isFreeTrail: (state) => state.Billing.isTrial,
				isLPU: (state) => state.User.isLPU,
				isPlanSticky: (state) => state.Billing.isPlanSticky,
			}),
			getFinalPlanPriceWithAdons() {
				if (!this.planDetails) {
					return;
				}

				let addonPrice = 0;

				for (const addon of this.selectedRecommendedAddonsForCheckout) {
					addonPrice += addon.price;
				}
				return (
					this.currencySymbol +
					"" +
					(this.planDetails.chargeBeePlanPrice + addonPrice) / 100
				);
			},
		},
		data() {
			return {
				selectedRecommendedAddonsForCheckout: [],
			};
		},
		mounted() {},
		methods: {
			closeAddonPopup() {
                this.selectedRecommendedAddonsForCheckout = [];
				this.$emit("closeAddonPopup");
			},
			selectRecommendedAddon(addon) {
				this.selectedRecommendedAddonsForCheckout.push(addon);
				if (window.analytics) {
					window.analytics.track(
						"Buy_export_FP",
						{
							action: "click",
							event_category: "Add On",
							author: this.user.email,
						},
						{
							integrations: {
								Amplitude: { session_id: new Date().getTime() },
							},
						},
						{ timestamp: new Date().getTime() }
					);
				}
			},
			removeRecommendedAddon(addon) {
				this.selectedRecommendedAddonsForCheckout =
					this.selectedRecommendedAddonsForCheckout.filter(
						(e) => e.id != addon.id
					);
			},
            handleContinueButtonClick(planDetails, duration) {
                this.$emit("continueButtonClick", planDetails, duration, this.selectedRecommendedAddonsForCheckout);
            }
		},
	};
</script>

<style lang="scss" scoped>
	.add-ons-popup {
		.popup-container {
			padding: 0;
			width: 55rem;
			background-color: $background-8;

			@media only screen and (max-width: 1024px) {
				background-color: $background-white;
				max-height: 100%;
    			overflow-y: auto;
			}

			.popup-header {
				padding: 1.5rem 2.5rem;
				background-color: $background-7;
				display: flex;
				justify-content: space-between;
				align-items: center;

				@media only screen and (max-width: 1024px) {
					padding: 20px 22px;
					.close-popup {
						height: 36px;
						width: 36px;
						background-color: $color-white;
						display: flex;
						align-items: center;
						justify-content: center;

						svg {
							height: 60% !important;
							width: 60% !important;
						}
					}
				}

				.close-popup {
					position: relative;
					right: auto;

					svg {
						background-color: $color-white;
						path {
							fill: #9f9f9f;
						}
					}
				}

				.plan-details {
					font-family: $main-font;
					font-style: normal;
					display: flex;
					flex-direction: column;

					.selected-plan-text {
						font-weight: 500;
						font-size: 0.875rem;
						line-height: 1.0625rem;
						color: #808080;
						margin-bottom: 0.25rem;

						@media only screen and (max-width: 1024px) {
							font-size: 14px;
							margin-bottom: 6px;
						}
					}

					.package-name {
						font-weight: 700;
						font-size: 1.625rem;
						line-height: 2rem;
						color: $plan-title;
						display: flex;
						align-items: center;

						@media only screen and (max-width: 1024px) {
							font-size: 26px;
						}
					}

					.duration {
						margin-left: 0.5rem;
						font-weight: 500;
						font-size: 0.875rem;
						line-height: 1.0625rem;
						color: $plan-title;
						text-transform: capitalize;

						@media only screen and (max-width: 1024px) {
							font-size: 14px;
						}
					}
				}
			}

			.optional-add-ons-text {
				font-weight: 500;
				font-size: 0.875rem;
				line-height: 1.5rem;
				color: #cc4040;
				@media only screen and (max-width: 1024px) {
					font-size: 14px;
				}
			}

			.sub-text {
				font-weight: 500;
				font-size: 0.75rem;
				line-height: 1.25rem;
				color: #808080;
			}

			.popup-content {
				padding: 2.5rem 2.5rem;
				font-family: "Montserrat";
				font-style: normal;

				.optional-add-ons-text {
					margin-bottom: 1.75rem;
					
					@media only screen and (max-width: 1024px) {
						margin-bottom: 24px;
					}
				}

				.total-price-and-action-section {
					font-family: $main-font;
					font-style: normal;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;

					.total-price {
						display: flex;
						flex-direction: column;
						font-weight: 600;
						font-size: 1.625rem;
						line-height: 1.75rem;
						color: $plan-title;

						@media only screen and (max-width: 1024px) {
							font-size: 24px;
						}

						span {
							font-weight: 500;
							font-size: 0.875rem;
							line-height: 1.125rem;
							color: $border-6;
							@media only screen and (max-width: 1024px) {
								font-size: 14px;
								margin-bottom: 4px;
							}
						}
					}

					.continue-btn {
						cursor: pointer;
						background: $plan-title;
						box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
						border-radius: 2px;
						font-weight: 700;
						font-size: 0.9375rem;
						line-height: 1.5rem;
						text-transform: uppercase;
						color: #e2c0b6;
						padding: 0.875rem 4rem;

						@media only screen and (max-width: 1024px) {
							font-size: 14px;
							padding: 14px 38px;
						}
					}
				}
			}

			.popup-footer {
				padding: 2.5rem 2.5rem;
				font-family: "Montserrat";
				font-style: normal;

				@media only screen and (max-width: 1024px) {
					background-color: #fafafa;
				}

				.optional-add-ons-text {
					margin-bottom: 0.5rem;

					@media only screen and (max-width: 1024px) {
						margin-bottom: 8px;
					}
				}

				.sub-text {
					margin-bottom: 1.875rem;

					@media only screen and (max-width: 1024px) {
						margin-bottom: 13px;
						font-size: 12px;
						line-height: 20px;
					}
				}

				.addons-container {
					display: none;
					@media only screen and (min-width: 1025px) {
						display: flex;
					}

					.addon {
						padding-right: 1.875rem;
						margin-right: 1.875rem;

						&:not(:last-child) {
							border-right: 1px solid $border-6;
						}

						p {
							display: inline-block;
							align-self: flex-start;
							padding: 0;
							margin: 0;
							font-family: $main-font;
							font-style: normal;
							font-weight: 500;
							font-size: 0.875rem;
							line-height: 1.0625rem;
							color: #3a393a;
						}
					}
				}

				.add-ons-container-mobile {
					display: none;
					@media only screen and (max-width: 1024px) {
						display: block;
						padding-left: 1.5rem;

						.addon {
							color: $banner-sub-heading-color;
							margin-bottom: 12px;
							p {
								display: inline;
								font-size: 12px;
							}
						}
					}
				}
			}
		}

		.hide-on-mobile {
			@media only screen and (max-width: 1024px) {
				display: none;
			}
		}

		.hide-on-desktop {
			@media only screen and (min-width: 1025px) {
				display: none;
			}
		}
	}
</style>

const CommonUtilities = {
	components: {},
	data: () => ( {
        
    } ),
	computed: {},
    mounted() {},
    watch: {},
	methods: {
        isSafari() {
            return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;
        },
        getAgoInfoFromISODate(date) {
			var startDate = new Date(date);
			var endDate = new Date();

			var millisecondDiff = endDate.getTime() - startDate.getTime();
			var secDiff = Math.floor(millisecondDiff / 1000);
			var minDiff = Math.floor(secDiff / 60);
			var hrDiff = Math.floor(minDiff / 60);

			var startYear = startDate.getFullYear();
			var february =
				(startYear % 4 === 0 && startYear % 100 !== 0) ||
				startYear % 400 === 0
					? 29
					: 28;
			var daysInMonth = [
				31,
				february,
				31,
				30,
				31,
				30,
				31,
				31,
				30,
				31,
				30,
				31,
			];

			var yearDiff = endDate.getFullYear() - startDate.getFullYear();
			var monthDiff = endDate.getMonth() - startDate.getMonth();
			if (monthDiff < 0) {
				yearDiff--;
				monthDiff += 12;
			}

			var dayDiff = endDate.getDate() - startDate.getDate();
			if (dayDiff < 0) {
				if (monthDiff > 0) {
					monthDiff--;
				} else {
					yearDiff--;
					monthDiff = 11;
				}
				dayDiff += daysInMonth[startDate.getMonth()];
			}

			if (secDiff < 0) {
				secDiff = 0;
			}

			if (yearDiff > 0) {
				return (
					(yearDiff + " year").concat(yearDiff > 1 ? "s" : "") +
					" ago"
				);
			} else if (monthDiff > 0) {
				return (
					(monthDiff + " month").concat(monthDiff > 1 ? "s" : "") +
					" ago"
				);
			} else if (dayDiff > 0) {
				return (
					(dayDiff + " day").concat(dayDiff > 1 ? "s" : "") + " ago"
				);
			} else if (hrDiff > 0) {
				return (
					(hrDiff + " hour").concat(hrDiff > 1 ? "s" : "") + " ago"
				);
			} else if (minDiff > 0) {
				return (
					(minDiff + " minute").concat(minDiff > 1 ? "s" : "") +
					" ago"
				);
			} else {
				return "few seconds ago";
			}
		},
		sendEventToTrack(_eventName) {
			if (window.analytics) {
				window.analytics.track(_eventName, {
					title: _eventName,
				}, { 'integrations': { "Amplitude": { "session_id": new Date().getTime() } } }, { "timestamp": new Date().getTime() });
			}
		},
  },
};

export default CommonUtilities;

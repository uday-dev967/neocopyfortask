const __private = {
	getCloudFrontURL: (s3URL) => {
		if (s3URL.includes("foyrproductmaster")) {
			const regex =
				/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/gim;
			return s3URL.replace(
				regex,
				"https://d35bnyu7j8fvw1.cloudfront.net"
			);
		}

		return s3URL;
	},
};

export const setCookie = (cname, cvalue, exdays, additionalOptions = null) => {
	const d = new Date();
	let additionalOptionsString = "";
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	if (additionalOptions) {
		for (let key in additionalOptions) {
			additionalOptionsString =
				additionalOptionsString +
				`${key}${
					additionalOptions[key] !== null &&
					additionalOptions[key] !== undefined
						? "=" + additionalOptions[key]
						: ""
				};`;
		}
	}
	if (additionalOptionsString) {
		document.cookie =
			cname +
			"=" +
			cvalue +
			";" +
			expires +
			";path=/;" +
			additionalOptionsString;
	}

	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
};

export const uploadImageUsingSignedUrl = async (signedUrl, uploadObject) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open("PUT", signedUrl, true);
		// request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		request.upload.onprogress = (e) => {
			console.log("onprogress", e);
		};

		request.onload = function () {
			if (request.status >= 200 && request.status < 300) {
				console.log("onload");
				resolve();
			} else {
				reject();
			}
		};

		request.send(uploadObject);
	});
};

/**
 * Determins if the given HTML element is scrollable or not.
 * @param {*} element
 * @returns Boolean
 */
export const isScrollable = (element) => {
	if (!element) {
		return false;
	}

	return (
		element.scrollWidth > element.clientWidth ||
		element.scrollHeight > element.clientHeight
	);
};

/**
 * Returns the file ArrayBuffer once the FileReaders onload callback is executed
 * @param {*} file
 * @returns Javascript FileObject Class
 */
export const getFileBuffer = (file) => {
	return new Promise((resolve, reject) => {
		try {
			let reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onloadend = (evt) => {
				if (evt.target.readyState == FileReader.DONE) {
					var arrayBuffer = evt.target.result;
				}

				resolve(arrayBuffer);
			};
		} catch (e) {
			reject(e);
		}
	});
};

export const dataURItoBlob = (dataURI) => {
	var binary = atob(dataURI.split(",")[1]);
	var array = [];
	for (var i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}

	return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
};

export const scrollToTargetAdjusted = (element, offset = 0) => {
	let elementPosition = element.offsetTop;
	let offsetPosition = elementPosition + window.pageYOffset - offset;
	document.querySelector(".user-onboarding-wrapper").scrollTo({
		top: offsetPosition,
		behavior: "smooth",
	});
};

export const fileToDataUri = (field) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			resolve(reader.result);
		});
		reader.readAsDataURL(field);
	});
};

export const scrollBlockToPosition = ({
	scrollToBehavior,
	parentWrapperSelector = ".user-onboarding-wrapper",
} = {}) => {
	if (!scrollToBehavior.selector) {
		return;
	}

	const elementToBeScrolled = document.querySelector(
		scrollToBehavior.selector
	);
	if (!elementToBeScrolled) {
		return;
	}

	switch (scrollToBehavior.position) {
		case "start": {
			scrollToTargetAdjusted(elementToBeScrolled);
			break;
		}

		case "center": {
			scrollToTargetAdjusted(
				elementToBeScrolled,
				document
					.querySelector(parentWrapperSelector)
					.getBoundingClientRect().height /
					2 -
					elementToBeScrolled.getBoundingClientRect().height / 2
			);
			break;
		}

		case "end": {
			scrollToTargetAdjusted(
				elementToBeScrolled,
				-elementToBeScrolled.getBoundingClientRect().height
			);
			break;
		}
	}
};

export const getCloudFrontURL = __private.getCloudFrontURL;

export const checkAndGetCloudFrontURL = (url) => {
	// Repalce s3 url with cloudfront url
	if (neoEditor.config.isCloudFrontEnabled && url) {
		return __private.getCloudFrontURL(url);
	}

	return url;
};

export const capitalizeFirstLetter = (string) => {
	let lowercasedString = string.toLowerCase();
	return lowercasedString.charAt(0).toUpperCase() + lowercasedString.slice(1);
};

export const downloadResourceFromLink = (url) => {
	if (!url) return;

	var link = document.createElement("a");
	link.href = url;
	link.download = "render.jpg";
	link.target = "_blank";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const checkIfDateIsOlderThanPassedMonths = (
	pastDateTimestamp,
	noOfMonths = 1
) => {
	let monthsInMiliseconds =
		1000 /*ms*/ *
		60 /*s*/ *
		60 /*min*/ *
		24 /*h*/ *
		30 /*days*/ *
		noOfMonths; /*months*/
	return new Date().getTime() - pastDateTimestamp > monthsInMiliseconds;
};

export const setClassToBody = ( status, className ) => {

	if ( ! status ) {

		document.body.classList.remove( className );

	} else {

		document.body.classList.add( className );

	}

};
export const setClassToHtml = ( status, className ) => {
	// let ele = document.getElementsByTagName('html')

	// if(ele && ele[0]) {

		if ( ! status ) {
	
			document.documentElement.classList.remove( className );
	
		} else {
	
			document.documentElement.classList.add( className );
	
		}

	// }

};

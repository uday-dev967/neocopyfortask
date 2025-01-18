<template>
	<div class="link-desktop-page-wrapper">
			<div class="link-desktop-toggle-buttons-wrapper">
				<div class="toggle-button" :class="{'active-section': activeSection === 'getLink'}" @click="onSelectSection('getLink')">
					<svg
						width="21"
						height="20"
						viewBox="0 0 21 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3.83333 4.99996L8.92303 8.84351L8.92473 8.84492C9.48987 9.25936 9.77261 9.46671 10.0823 9.54681C10.356 9.6176 10.6438 9.6176 10.9175 9.54681C11.2274 9.46664 11.511 9.25869 12.0771 8.84351C12.0771 8.84351 15.3417 6.33824 17.1667 4.99996M3 13.1668V6.83346C3 5.90003 3 5.43298 3.18166 5.07646C3.34144 4.76285 3.59623 4.50807 3.90983 4.34828C4.26635 4.16663 4.73341 4.16663 5.66683 4.16663H15.3335C16.2669 4.16663 16.733 4.16663 17.0895 4.34828C17.4031 4.50807 17.6587 4.76285 17.8185 5.07646C18 5.43263 18 5.89912 18 6.83072V13.1696C18 14.1012 18 14.567 17.8185 14.9232C17.6587 15.2368 17.4031 15.492 17.0895 15.6518C16.7333 15.8333 16.2675 15.8333 15.3359 15.8333H5.66409C4.73249 15.8333 4.266 15.8333 3.90983 15.6518C3.59623 15.492 3.34144 15.2368 3.18166 14.9232C3 14.5667 3 14.1002 3 13.1668Z"
							stroke="#E9BEB3"
							stroke-width="1.4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					{{ $t("buttonText.getEmailLink") }}
				</div>
				<div class="toggle-button" :class="{'active-section': activeSection === 'scanQR'}" @click="onSelectSection('scanQR')">
					<svg class="icon scan-icon" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.5 9.5C10.8432 9.5 9.5 10.8432 9.5 12.5V17.5C9.5 18.6046 8.60456 19.5 7.5 19.5C6.39544 19.5 5.5 18.6046 5.5 17.5V12.5C5.5 8.63402 8.63402 5.5 12.5 5.5H17.5C18.6046 5.5 19.5 6.39544 19.5 7.5C19.5 8.60456 18.6046 9.5 17.5 9.5H12.5ZM47.5 50.5C49.1569 50.5 50.5 49.1569 50.5 47.5V42.5C50.5 41.3954 51.3954 40.5 52.5 40.5C53.6046 40.5 54.5 41.3954 54.5 42.5V47.5C54.5 51.3661 51.3661 54.5 47.5 54.5H42.5C41.3954 54.5 40.5 53.6046 40.5 52.5C40.5 51.3954 41.3954 50.5 42.5 50.5H47.5ZM9.5 47.5C9.5 49.1569 10.8432 50.5 12.5 50.5H17.5C18.6046 50.5 19.5 51.3954 19.5 52.5C19.5 53.6046 18.6046 54.5 17.5 54.5H12.5C8.63401 54.5 5.5 51.3661 5.5 47.5V42.5C5.5 41.3954 6.39544 40.5 7.5 40.5C8.60459 40.5 9.5 41.3954 9.5 42.5V47.5ZM50.5 12.5C50.5 10.8432 49.1569 9.5 47.5 9.5H42.5C41.3954 9.5 40.5 8.60456 40.5 7.5C40.5 6.39544 41.3954 5.5 42.5 5.5H47.5C51.3661 5.5 54.5 8.63401 54.5 12.5V17.5C54.5 18.6046 53.6046 19.5 52.5 19.5C51.3954 19.5 50.5 18.6046 50.5 17.5V12.5Z" fill="#676267" stroke="#676267"/>
						<path d="M10.5273 29.4736H50.5273" stroke="black" stroke-width="1.6" stroke-linecap="round"/>
					</svg>
					{{ $t("buttonText.scanQR") }}
				</div>
			</div>
			<div v-if="activeSection === 'getLink'" class="link-desktop-page-content-wrapper">
				<div class="top-section">
					<div class="image-wrapper">
						<div class="mail-image iwfp">
							<img src="~assets/images/mobile/get-link-on-mail.png" alt />
						</div>
					</div>
				</div>
				<div class="text-content-wrapper">
					<div class="title">{{ $t("mobileSection.emailYouALink") }}</div>
					<div class="tag">
						{{ $t("mobileSection.clickToLogin") }}
					</div>
				</div>
				<div class="cta" @click="getLink">{{ $t("buttonText.getEmailLink") }}</div>
			</div>
			<div v-if="activeSection === 'scanQR'" class="link-desktop-page-content-wrapper">
				<div class="top-section">
					<div class="image-wrapper">
						<div class="mail-image iwfp">
							<img src="~assets/images/mobile/scaning-icon.png" alt />
						</div>
		
		
					</div>
				</div>
				<div class="text-content-wrapper">
					<div class="title">{{ $t("mobileSection.openScanSiteText[0]") }} <a href="https://qr.foyr.com/" target="_blank">{{ $t("mobileSection.openScanSiteText[1]") }}</a> {{ $t("mobileSection.openScanSiteText[2]") }}</div>
					<div class="tag">
						{{ $t("mobileSection.scanQRCodeText") }}
					</div>
				</div>
				<div class="cta" @click="handleScanQRCardClick">{{ $t("buttonText.scanQR") }}</div>
			</div>
		<div class="qr-scanner-wrapper" v-if="isQRCodeBeingScanned">
			
			<video :ref="`reader_${componentId}`" :id="`reader_${componentId}`"></video>
			<img class="scanning-image" src="~assets/images/mobile/qrscanning.png"/>
			<!-- <svg
				class="exit-mode-svg"
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				@click.stop="closeQRScanner"
			>
				<path
					d="M17 1L1 17M1 1L17 17"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg> -->
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex';
import QrScanner from 'qr-scanner';
import CommonUtilities from '../../../mixins/commonUtilitiesMixin';
export default {
	layout: "mobile",
	middleware: ["initAuth", "authReq"],
	mixins: [CommonUtilities],
	components: {},
  data: () => {
    return {
      activeSection: "getLink",
			qrCodeScannerRef: null,
			isQRCodeBeingScanned: false
    }
  },
  computed: {
		componentId() {
      return this._uid;
    },
	},
  methods: {
		...mapActions("MobileBottomSystemNotifications", [
			"addNotification",
		]),
		...mapActions({
      sendOffer: "Dash/sendOffer"
    }),
		...mapActions("Projects", [
			"onScanQr",
		]),
    onSelectSection(section) {
      this.activeSection = section
    },
		getLink() {
			const notification = {
				iconRef: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M5 9.99998L8.53553 13.5355L15.6058 6.46442" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>`,
				primaryMessage: this.$t("messages.emailSentCheckInboxMessage"),
				showCloseButton: false,
				timeout: 5000,
				isPersistent: false,
				notificationClass: [ "success" ]
			}
			this.sendEventToTrack("Clicked get email link on mobile")
			this.sendOffer({})
        .then(res => {
          this.addNotification(notification);
        })
        .catch(err => {
          console.log(err);
        });
		},
		handleScanQRCardClick() {
      this.isQRCodeBeingScanned = true;
			this.sendEventToTrack("Clicked scan QR on mobile")
			this.checkCameraPermission()

    },

		startQRScanner() {
			document.body.classList.add('qr-scanning-mode')
      setTimeout(async () => {
        this.qrCodeScannerRef = new QrScanner(
          document.getElementById(`reader_${this.componentId}`),
          (result) => {
            console.log(result);
            // this.$emit('handleDecodedText', result.data);
            // this.searchText = result.data;
						if(result && result.data) {
							let data = { id: result.data }
							this.onScanQr(data).then(res => {
								const notification = {
									iconRef: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M5 9.99998L8.53553 13.5355L15.6058 6.46442" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>`,
									primaryMessage: 'scan processing...',
									showCloseButton: false,
									timeout: 5000,
									isPersistent: false,
									notificationClass: [ "success" ]
								}
								this.addNotification(notification)
							})
							this.stopQRCodeScanning();
						}
          },
          {
            preferredCamera: 'environment',
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            maxScansPerSecond: 10,
            // overlay: overlayRef.value,
          }
        );

        try {
          const hasCamera = await QrScanner.hasCamera();
          console.log(hasCamera);
          if (!hasCamera) {
            this.closeQRScanner();
          }
        } catch (error) {
          this.closeQRScanner();
          console.error('Error checking cameras:', error);
        }

        try {
          await this.qrCodeScannerRef.start();
          // scanningArea.value = true;
        } catch (error) {
          console.error('Error starting QR scanner:', error);
          this.closeQRScanner();
        }
      }, 0);
		},

		stopQRCodeScanning() {
      this.closeQRScanner();
      return;

      this.isQRCodeBeingScanned = false;
      if (this.qrCodeScannerRef) {
        this.qrCodeScannerRef
          .stop()
          .then((ignore) => {
            // QR Code scanning is stopped.
            this.qrCodeScannerRef = null;
          })
          .catch((err) => {
            // Stop failed, handle it.
          });
      }
    },
		closeQRScanner() {
      this.isQRCodeBeingScanned = false;
			document.body.classList.remove('qr-scanning-mode')
      try {
        if (this.qrCodeScannerRef) {
          this.qrCodeScannerRef.stop();
        }
      } catch (e) {}
    },
		// async checkCameraPermission() {
		// 	try {
		// 		if (!navigator.permissions) {
		// 				alert('Your browser does not support the Permissions API. Please check your browser compatibility.');
		// 				return;
		// 		}

		// 		const permissionStatus = await navigator.permissions.query({ name: 'camera' });
		// 		console.log(`Camera permission state: ${permissionStatus.state}`);

		// 		switch (permissionStatus.state) {
		// 				case 'denied':
		// 						alert('Camera access was denied. Please enable it in your browser settings.');
		// 						break;
		// 				case 'prompt':
		// 				case 'granted':
		// 						if (typeof this.startQRScanner === 'function') {
		// 								this.startQRScanner();
		// 						} else {
		// 								console.error('startQRScanner function is not defined.');
		// 						}
		// 						break;
		// 				default:
		// 						console.error('Unexpected permission state:', permissionStatus.state);
		// 		}
		// 	} catch (error) {
		// 		console.error('Permission API not supported:', error);
		// 		alert('Your browser does not support camera permissions API.');
		// 	}
		// }

		async checkCameraPermission() {
			try {
				// Check if browser supports getUserMedia
				if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
						alert('Your browser does not support camera access.');
						return;
				}

				// Request camera access
				await navigator.mediaDevices.getUserMedia({ video: true });
				console.log('Camera permission granted');

				if (typeof this.startQRScanner === 'function') {
						this.startQRScanner();
				} else {
						console.error('startQRScanner function is not defined.');
				}
			} catch (error) {
				if (error.name === 'NotAllowedError') {
						alert('Camera access was denied. Please enable it in your browser settings.');
				} else if (error.name === 'NotFoundError') {
						alert('No camera device was found.');
				} else {
						console.error('Error accessing camera:', error);
						alert('An error occurred while accessing the camera.');
				}
			}
		}



  },
	beforeDestroy() {
		document.body.classList.remove('qr-scanning-mode')
	}
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.link-desktop-page-wrapper {
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-rows: max-content 1fr;
	// gap: 3.125rem;
	.link-desktop-toggle-buttons-wrapper {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		padding: .625rem 1rem 0rem 1rem !important;

		.toggle-button {
			display: flex;
			padding: .625rem;
			justify-content: center;
			align-items: center;
			gap: .375rem;
			border-radius: 40px;
			border: 1px solid $border-7;
			color: $color-light-gray-2;
			font-size: .875rem;
			font-weight: 600;
      cursor: pointer;
			text-align: center;
			white-space: nowrap;
			svg {
				width: 1.25rem !important;
				height: 1.25rem !important;
				path {
					stroke: $border-14;
				}
			}
		}
    .active-section {
      display: flex;
			padding: .625rem 1rem;
			justify-content: center;
			align-items: center;
			gap: .375rem;
			border-radius: 40px;
			border: 1.4px solid $border-20;
			background: $background-9;
			color: $color-second;
			font-size: .875rem;
			font-weight: 600;
      cursor: pointer;
			svg {
				path {
					stroke: $border-1;
				}
			}
			.scan-icon {
				path {
					stroke: $border-1;
					fill: $background-10;
				}
			}
    }
	}
	.link-desktop-page-content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
		.top-section {
			display: flex;
			width: 100%;
			justify-content: center;
			// background-image: url('~assets/images/mobile/connectToDeskTopBg.png');
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			padding: 3.125rem 0 0.375rem 0;
			.image-wrapper {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 9.875rem;
				.icon {
					width: 3.75rem;
					height: 3.75rem;
				}
				.mail-image {
					flex-shrink: 0;
					pointer-events: none;
				}
			}
		}
		.text-content-wrapper {
			display: flex;
			width: 100%;
			flex-direction: column;
			align-items: center;
			.title {
				color: $color-black;
				text-align: center;
				font-size: 1.125rem;
				font-weight: 700;
				line-height: 1.375rem; /* 122.222% */
				a {
					color: $color-dark-rose-gold-4;
					font-size: 1.125rem;
					font-weight: 700;
					line-height: 1.5rem;
					text-decoration-line: underline;
					text-decoration-style: solid;
					text-decoration-skip-ink: none;
					text-decoration-thickness: auto;
					text-underline-offset: auto;
					text-underline-position: from-font;
				}
			}
			.tag {
				color: $color-black;
				text-align: center;
				font-size: .875rem;
				font-weight: 500;
				line-height: 1.25rem; /* 142.857% */
			}
		}
		.cta {
			display: flex;
			width: 12.5rem;
			padding: .75rem .5rem;
			justify-content: center;
			align-items: center;
			gap: .625rem;
			border-radius: 3px;
			background: $background-47;
			color: $color-light-gray-2;
			font-size: .875rem;
			font-weight: 700;
			line-height: 138%; /* 19.32px */
			margin-top: 1.5rem;
      cursor: pointer;
		}
	}
}
.qr-scanner-wrapper {
	display: flex;
	position: fixed;
	width: 100%;
	height: 100%;
	overflow: hidden;
	z-index: 1;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	video {
		width: 100% !important;
		height: 100% !important;
		object-fit: cover !important;
	}
	.scanning-image {
		position: absolute;
		width: 90%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>

<style lang="scss">
.qr-scanner-wrapper {
	.scan-region-highlight {
		display: none;
	}
}
.qr-scanning-mode {
	#mobile-main {
		position: absolute !important;
		overflow: hidden;
	}
}
</style>

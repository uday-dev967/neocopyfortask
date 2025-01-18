<template>
    <div class="side-panel-container">
        <div class="side-panel-actions">
            <div class="side-panel-action-btn" :class="$route.name == 'moodboard-dashboard' ? 'active' : ''" @click="setCurrentRoute('moodboard-dashboard')"> 
                <svg class="side-panel-action-btn--icon" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M11.3142 6.66667V0H20.2031V6.66667H11.3142ZM0.203125 11.1111V0H9.09201V11.1111H0.203125ZM11.3142 20V8.88889H20.2031V20H11.3142ZM0.203125 20V13.3333H9.09201V20H0.203125Z" fill="#B5B5B5"/>
                </svg>
                <div class="side-panel-action-btn--label">
					Home
                </div>
            </div>
            <div class="side-panel-action-btn"  :class="$route.name == 'moodboard-projects' ? 'active' : ''" @click="setCurrentRoute('moodboard-projects')">
                <svg class="side-panel-action-btn--icon" xmlns="http://www.w3.org/2000/svg" width="22" height="17" viewBox="0 0 22 17" fill="none">
                    <path d="M2.04651 16.5772C1.48372 16.5772 1.00177 16.3766 0.600653 15.9755C0.199536 15.5744 -0.000680433 15.0928 1.73728e-06 14.5307V2.25159C1.73728e-06 1.6888 0.20056 1.20685 0.601676 0.805731C1.00279 0.404615 1.4844 0.204398 2.04651 0.20508H8.18605L10.2326 2.25159H18.4186C18.9814 2.25159 19.4633 2.45215 19.8645 2.85327C20.2656 3.25438 20.4658 3.73599 20.4651 4.2981H9.38837L7.34186 2.25159H2.04651V14.5307L4.50233 6.34461H22L19.3651 15.119C19.2287 15.5624 18.977 15.9165 18.61 16.1812C18.2429 16.4459 17.8381 16.5779 17.3953 16.5772H2.04651ZM4.19535 14.5307H17.3953L19.2372 8.39113H6.03721L4.19535 14.5307Z" fill="#B5B5B5"/>
                </svg>
                <div class="side-panel-action-btn--label">
                    Projects
                </div>
            </div>
            <div class="side-panel-action-btn"  :class="$route.path.includes('templates') ? 'active' : ''" @click="setCurrentRoute('moodboard-templates')">
                <svg class="side-panel-action-btn--icon" xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 22 14" fill="none">
                    <path d="M0 14V0H14V14H0ZM16 6V0H22V6H16ZM18 4H20V2H18V4ZM2 12H12V2H2V12ZM3 10H11L8.375 6.5L6.5 9L5.125 7.175L3 10ZM16 14V8H22V14H16ZM18 12H20V10H18V12Z" fill="#B5B5B5"/>
                </svg>
                <div class="side-panel-action-btn--label">
                    Templates
                </div>
            </div>
			<div class="side-panel-action-btn" :class="$route.name == 'moodboard-settings-index-type' ? 'active' : ''" @click="setCurrentRoute('moodboard-settings-index-type')">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
					<path d="M10 0.0507812C15.52 0.0507812 20 4.53078 20 10.0508C20 15.5708 15.52 20.0508 10 20.0508C4.48 20.0508 0 15.5708 0 10.0508C0 4.53078 4.48 0.0507812 10 0.0507812ZM4.02332 13.4671C5.49083 15.6577 7.69511 17.0508 10.1597 17.0508C12.6243 17.0508 14.8286 15.6577 16.2961 13.4671C14.6885 11.968 12.5312 11.0508 10.1597 11.0508C7.78821 11.0508 5.63095 11.968 4.02332 13.4671ZM10 9.05078C11.6569 9.05078 13 7.70763 13 6.05078C13 4.39393 11.6569 3.05078 10 3.05078C8.3431 3.05078 7 4.39393 7 6.05078C7 7.70763 8.3431 9.05078 10 9.05078Z" fill="#B5B5B5"/>
				</svg>
				<div class="side-panel-action-btn--label">
					Account
				</div>
			</div>
        </div>
        <div class="side-panel-action-btn side-panel-logout"  @click="signOut">
            <svg class="side-panel-action-btn--icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2H9V0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H9V16H2V2ZM18 9L14 5V8H6V10H14V13L18 9Z" fill="#F8F8F8"/>
            </svg>
            <div class="side-panel-action-btn--label">
                Logout
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	data() {
		return {
			currentRoute: null,
			routes: [
				{
					name: "moodboard-dashboard",
					path: "/moodboard/dashboard",
				},
				{
					name: "moodboard-projects",
					path: "/moodboard/projects",
				},
				{
					name: "moodboard-templates",
					path: "/moodboard/templates",
				},
				{
					name: "moodboard-settings-index-type",
					path: "/moodboard/settings/profile",
				},
			],
		};
	},
	mounted() {},
	methods: {
		signOut() {
			this.logout().then(res => {
				localStorage.removeItem("subscriptionCancel_chmln");
				window.location.href = res.url;
			});
		},
		...mapActions({
			logout: "Auth/logout",
		}),
		setCurrentRoute(routeName) {
			this.currentRoute = routeName;
			let routePath = this.routes.find(route => route.name == routeName);
			this.$router.push({
				path: routePath.path,
			});
		},
	},
};
</script>
<style lang="scss">
.side-panel-container {
	background: #292829;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	height: calc(100vh - 3.75rem * 1.22);
	width: 6.25rem * 1.22;
	overflow: hidden;
}
.side-panel-actions {
	width: 100%;
}
.side-panel-action-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	text-transform: capitalize;
	cursor: pointer;
	color: #b5b5b5;
	position: relative;
	&.side-panel-logout {
		width: 100%;
		padding-bottom: 1.5rem * 1.22;
		padding-top: 1.5rem * 1.22;
	}
	&--icon {
		margin-bottom: 0.625rem * 1.22;
	}
	&--label {
		font-weight: 500;
		font-size: 0.75rem * 1.22;
	}
	&:after {
		position: absolute;
		content: "";
		left: 50%;
		top: 50%;
		width: 0rem;
		height: 0rem;
		background: rgba(233, 190, 179, 0.2);
		-webkit-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
	}
	&:hover {
		&:after {
			width: 100%;
			height: 100%;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}
		.side-panel-action-btn {
			&--icon {
				path {
					fill: #e8e8e8;
				}
			}
			&--label {
				color: #e8e8e8;
			}
		}
	}
}
.active {
	background: rgba(233, 190, 179, 0.2);
	.side-panel-action-btn {
		&--icon {
			path {
				fill: #e8e8e8;
			}
		}
		&--label {
			color: #e8e8e8;
		}
	}
}
</style>

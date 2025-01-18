<template>
    <section>
        <div class="top-container">
            <p>Foyr Neo</p>
            <p><span>Access Denied.</span> You dont have permission to view this site page</p>
        </div>
        <div class="bottom-container">
            <div>
                <button @click="signOut()" v-if="token">Logout</button>
                <button @click="foyr()" v-else>Go to foyr.com</button>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
	computed: {
		...mapState({
			token: state => state.Auth.token,
		}),
	},
	methods: {
		...mapActions({
			logout: "Auth/logout",
		}),
		signOut() {
			this.logout().then(res => {
				// amplitude.getInstance().logEvent("logout");
				window.location.href = res.url;
			});
		},
		foyr() {
			window.location.href = "https://foyr.com/";
		},
	},
};
</script>
<style lang="scss" scoped>
.top-container {
	background-image: url("~assets/images/backgrounds/Shape(desktop).svg");
	background-repeat: no-repeat;
	background-size: cover;
	height: 50vh;
	padding-top: 60px;
	p {
		text-align: center;
		&:first-child {
			font-size: 32px;
			color: white;
			margin-bottom: 24px;
			font-weight: bold;
		}
		&:last-child {
			font-size: 24px;
			color: #3a393a;
			span {
				font-size: 24px;
				font-weight: bold;
			}
		}
	}
}
.bottom-container {
	background-image: url("~assets/images/backgrounds/blocked.png");
	background-repeat: no-repeat;
	height: 50vh;
	background-position: left;
	display: grid;
	grid-template-rows: 1fr;
	justify-content: right;
	align-items: center;
	grid-template-columns: 1fr 1fr;
	div {
		grid-column: 2/3;
		justify-self: center;
		p {
		}
		button {
			background: #3a393a;
			color: white;
			font-size: 16px;
			padding: 8px 20px;
			cursor: pointer;
		}
	}
}
</style>

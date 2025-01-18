<template>
    <div class="auth-loader">
        <h3>Authenticating</h3>
        <div class="loader"></div>
        <div class="loginMessage" v-if="message">
            <h2>
                Login Successful
            </h2>
        </div>
    </div>
</template>
<script>
import { mapActions,mapState, mapMutations } from 'vuex'
export default {
    head () {
        return {
        title: 'Neo'
        }
    },
    data(){
        return{
            message:false
        }
    },
    methods: {
        ...mapActions({
            auth: 'Auth/authorization',
            getUser: "User/fetch",
        }),
        ...mapMutations({
            setSwitchToMoodboardAndRedirectToDashboard: 'User/setSwitchToMoodboardAndRedirectToDashboard'
        }),
    },
    computed: {
        ...mapState({
            userAccountType: state => state.Auth.userAccountType,
        }),
    },
    mounted(){
        window.localStorage.setItem('query',JSON.stringify(this.$router.currentRoute.query))
        this.auth(this.$router.currentRoute.query)
        .then((res) => {
            this.message = true;
            setTimeout(() => {
            this.message = false;
            localStorage.setItem('loggedIn',false);
            if(localStorage.getItem('dashMsg'))
            localStorage.removeItem('dashMsg')
            //this.getUser();
            if(window.sessionStorage.getItem('urlQueryParams')){
               return window.$nuxt.$router.push({name: 'payment_link', query: JSON.parse(window.sessionStorage.getItem('urlQueryParams'))})
            }
            if(window.sessionStorage.getItem('plansRedirect')){
                return window.$nuxt.$router.push({name: window.sessionStorage.getItem('plansRedirect')})
            }
            if(res.onboardingFormFilled){
                window.parent.postMessage("login-success", '*');
                if(this.$ua.deviceType() == 'pc') {
                    if (res.user && res.user.isMBUser) {
                        this.setSwitchToMoodboardAndRedirectToDashboard(true)
                        // this.$router.push('/dashboard')
                    } else if (res.user && res.user.redirectToPlansPage) {
                        this.$router.push('/settings/plans_new')
                    } else {
                        this.$router.push(res.user && res.user.redirectToInspirationPage ? '/inspiration' :'/dashboard')
                    }
                }
                else
                    this.$router.push('/dashboard_mobile/home')
            }
            else{
                if(this.userAccountType == 'root')
                window.$nuxt.$router.push('/user')
            }
            
            }, 2000);
        })
        .catch(err => {
            this.$notify({
            title: 'Error',
            message: 'Login failed',
            type: 'error',
            position: 'bottom-right'
            })
        })

    }
}
</script>
<style lang="scss" scoped>
.loginMessage{
    text-align: center;
    margin-top: 2.5rem;
}
.auth-loader{
    width: 40%;
    margin: auto;
    text-align: center;
    margin-top: 40vh;
    color: black;
}
.loader {
  height: 0.25rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ddd;
}
.loader:before{
  display: block;
  position: absolute;
  content: "";
  left: -12.5rem;
  width: 12.5rem;
  height: 0.25rem;
  background-color: black;
  animation: loading 2s linear infinite;
}

@keyframes loading {
    from {left: -12.5rem; width: 30%;}
    50% {width: 30%;}
    70% {width: 30%;}
    80% { left:80%}
    95% {left: 100%}
    to {left:120%}
}
</style>

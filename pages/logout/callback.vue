<template>
    <div class="auth-loader">
        <h3>Logging Out</h3>
        <div class="loader"></div>
    </div>
</template>
<script>
import { mapActions,mapMutations } from 'vuex'
export default {
    head () {
        return {
        title: 'Neo'
        }
    },
    methods: {
        ...mapMutations({
            clearToken: "Auth/clearToken",
            clearIdToken:"Auth/clearIdToken"
        }),
    },
    mounted(){
        this.clearToken();
        this.clearIdToken();
        localStorage.clear();
        
        this.$router.push('/')
    }
}
</script>
<style lang="scss" scoped>
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

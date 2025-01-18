<template>
    <section>
        <div class="setting-head">
            <div class="setting-left">
                <h2>Help and Support</h2>
                <div class="contact-number">
                    
                    <p><span>US: </span><span>12:30 am to 6:00 pm EST</span> |  Live chat support</p>
                    <p><span>India: </span><span>10:00 am to 3:30 am IST</span> | +91 9148633383</p>
                    <p><span>Singapore: </span><span>12:30 PM to 6:00 am SGT</span> | +6531634960</p>
                </div>
                <div class="nav-tabs">
                    <nuxt-link  to="/help/tutorials">Tutorials</nuxt-link>
                    <nuxt-link to="/help/contact">Contact Us</nuxt-link>
                    <!-- <nuxt-link to="/settings/account">Account Settings</nuxt-link> -->
                    <!-- <nuxt-link v-if="user && user.accountType == 'root'" to="/settings/test">Service Test</nuxt-link> -->
                    
                </div>
            </div>
        </div>
        <nuxt-child class="help-child" />
        <MessageComponent :changeRight="message"/>
    </section>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Vue from "vue";
import MessageComponent from '@/components/shared/globalMessage';
export default {
    layout: "dashboard",
    middleware: ["initAuth", "authReq"],
    head() {
        return {
            title: "Neo - Help",
        };
    },
    components:{
        MessageComponent
    },
    data() {
        return {
            message: {
                value: "",
                error: false,
                global:false
            },
        }
    },
}
</script>
<style lang="scss" scoped>
.setting-head{
    background: #E9E9E9;
    padding: 1.5625rem 3.125rem 0.4375rem 3.125rem;
    position: relative;
    .setting-right{
            position: absolute;
            right: 7%;
            top: 50%;
            transform: translateY(-50%);
        button{
            @include button-head(#222021);
            color: #222021;
            margin: 0rem;
            margin-left: 1.25rem;
            cursor:pointer;
        }
    }
    .setting-left{
        h2{
            margin-bottom: 2.8125rem;
        }
    }
    .nav-tabs{
        display: flex;
        .active-link{
            border-bottom: 0.0625rem solid $color-head;
            color: black;
        }
        a{
            text-decoration: none;
            color: #868686;
            margin: 0rem;
            margin-right: 2.8125rem;
            padding-bottom: 0.4375rem;
            position: relative;
            span{
                position: absolute;
                left: 105%;
                color: $color-head;
                top: 0.25rem;
                width: max-content;
            }
        }
    }
}
.help-child{
    padding: 2rem 3.125rem;
}
.contact-number{
    position: absolute;
    right: 7%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    
    p{
        margin: 0px;
        font-size: 1rem;
    }
    span:first-child{
        width: 7rem;
        font-size: 1rem;
        display: inline-block;
    }
    span:last-child{
        font-size: 1rem;
        width: 13rem;
        display: inline-block;
    }
}
</style>

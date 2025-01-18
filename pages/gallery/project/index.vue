<template>
    <section v-if="renderByProject">
        <div class="search-container">
            <div>
                <div>
                <!-- <select v-model="selectedProject">
                    <option value="undefined" selected>Filter by project</option>
                    <option :value="project._id" v-for="project in usersProjects">{{project.name}}</option>
                </select> -->
                <svg @click="cancelSearch" v-if="searched" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.45 17.97L9.5 12.01a.25.25 0 0 1 0-.36l5.87-5.87a.75.75 0 0 0-1.06-1.06l-5.87 5.87c-.69.68-.69 1.8 0 2.48l5.96 5.96a.75.75 0 0 0 1.06-1.06z"></path></svg>
                <input type="text" v-model="searchText" @keyup.enter="searchRenders" placeholder="Search renders by entering project name here">
                <!-- <img src="~assets/images/arrowDown.svg" alt=""> -->
                
                </div>
                <div class="search-icon" @click.stop="searchRenders">
                    <img src="~assets/images/share2.svg" alt />
                </div>
            </div>
        </div>
        <div class="project-render-container">
            <nuxt-link to="/gallery" class="back-to-gallery">&lt;  Back</nuxt-link>
            <p class="title-project">Renders by Projects</p>
            <!-- <span class="project-count-span">{{renderByProject.length}} projects to check renders from </span> -->
            <div class="project-container">
                <div class="project" @click="selectedProject(item.project._id,item.count)" v-for="(item, index) in renderByProject" :key="index">
                    <div :style="{'background':item.thumbnail?'#D1D1D1':''}">
                        <img :src="item.thumbnail" alt="" >
                    </div>
                    <p>{{item.project.name}}</p>
                    <span>{{item.count}}</span>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions, mapMutations} from "vuex";
export default {
    layout: "dashboard",
    middleware: ["initAuth", "authReq"],
    head() {
        return {
            title: "Neo - Gallery"
        };
    },
    computed: {
        ...mapState({
            renderByProject:state => state.Render.renderByProject,
            user:state => state.User.user
        }),
    },
    mounted() {
        // if(!this.renderByProject){
        //     this.fetchRenderListByProject().then(res=>{
        //         console.log(res)
        //     })
        // }
    },
    watch: {
        // user:function(userData){
        //     this.fetchRenderListByProject({accountId:userData.accountId}).then(res => {
        //         console.log(res)
        //     })
        // }
    },
    methods: {
        ...mapActions({
            fetchRenderListByProject:'Render/fetchRenderListByProject',
            fetchRenderPage:'Render/fetchRenderPage'
        }),
        ...mapMutations({
            setSelectedRender: "Render/setSelectedRender"
        }),
        selectedProject(project,count){
            this.$store.state.Render.renderPaged = null
            this.fetchRenderPage({accountId:this.user.accountId,"page": 1,
            "project":project,
            "limit": 20,
            "sortBy": { updatedAt : -1 }}).then(res => {
                this.setSelectedRender(res.data[0])
                this.$router.push('/gallery/'+res.data[0]._id+'?project='+project+'&count='+ count)
            })
        }
    },
}
</script>
<style lang="scss" scoped>
section{
    background: white !important;
    .search-container{
        
        background: $color-second;
        background-image: url('~assets/images/bgIns.png');
        display: grid;
        grid-template-columns: max-content max-content;
        justify-content: center;
        align-items: center;
        padding: 3.1875rem 0rem;
        input{
            background: $color-white;
            color: #c4c4c4;
            width: 50vw;
            @include respond(s-phone) {
            // width < 480px?
            width: 50vw;
            }
        }
        div{
            visibility: hidden;
            display: grid;
            grid-template-columns: max-content auto;
            align-items: center;
            background: white;
            border: 1px solid #E9BEB3;
            
        }
        img{
            position: absolute;
            right: 1.25rem;
            top: 1rem;
        }
        div{
            position: relative;
        }
        .search-icon {
            cursor: pointer;
            background: black;
            height: 100%;
            padding: 0px 10px;
            img{
                position: static;
            }
        }
    }
    
    .project-render-container{
        
        padding: 1.875rem 3.75rem;
        .back-to-gallery{
            font-weight: 500;
            font-size: 0.75rem;
            color: #A6A5A6;
            text-decoration: none;
            margin-bottom: 0.6875rem;
            display: block;
        }   
        .title-project{
            font-weight: 500;
            font-size: 1rem;
            margin-bottom: 0.75rem;
            color: #4D4C4D;
        }
        .project-count-span{
            font-weight: 600;
            font-size: 0.6875rem;
            color: #D48E8E;
            margin-bottom: 0.5rem;
            display: block;
        }
        .project-container{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
            grid-gap: 1rem;
            .project{
                display: grid;
                grid-template-columns: 1fr max-content;
                grid-template-rows: 1fr 40px;
                justify-content: space-between;
                background: #FBF3F1;
                cursor: pointer;
                &:hover{
                        box-shadow: 0px 8px 20px rgba(34, 32, 33, 0.25);
                        cursor: pointer;
                    }
                div{
                    grid-column: 1/3;
                    background: url(/_nuxt/assets/images/defaultRender.png);
                    background-position: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                    display: grid;
                    min-height: 129px;
                    img{
                        
                        width: 100%;
                        height: 140px;
                        object-fit: contain;
                    }
                }
                
                p{
                    font-weight: 500;
                    font-size: 12px;
                    color: #3A393A;
                    grid-column: 1/2;
                    margin-bottom: 0px;
                    align-self: center;
                    padding-left: 0.625rem;
                }
                span{
                    font-weight: 500;
                    font-size: 12px;
                    color: #3A393A;
                    display: block;
                    grid-column: 2/3;
                    align-self: center;
                    padding-right: 10px;
                }
            }
        }
    }
}
</style>
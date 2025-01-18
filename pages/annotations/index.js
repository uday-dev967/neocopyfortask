import { mapState, mapActions, mapGetters, mapMutations } from "vuex";


export default {
  layout: "dashboard",
  middleware: ["initAuth", "authReq"],
  head() {
    return {
      title: "Neo - Dashboard"
    };
  },
  
  data() {
    return {
      begineers : [],
      exploreData:[],
      message: {
        value: "",
        error: false,
        global:false
      },
      projectName:undefined,
      newProject:false,
      showVideo:false,
      showProject:false,
      selectedUser:'',
      videoUrl:undefined,
    };
  },
  computed: {
    ...mapState({
      usersAnnotations: state => state.Projects.usersAnnotations,
      usersProjects: state => state.Projects.usersProjects,
    }),
  },
  mounted() {
    if(!this.usersAnnotations)
      this.fetchAnnotations()
  },

  methods: {
    ...mapActions({
      fetchAnnotations:'Projects/fetchAnnotations',
      uploadProjects:'Projects/newProject'
    }),

    openProject(id){
      window.open(window.location.origin + "/tool?project=" + id); 
    },
    cancelContainer(container) {
        this.newProject = false;
        this.projectName=undefined;
        // this.message = {};
    },
    closePopup(){
        this.newProject = false;
        this.showVideo = false;
        this.projectName = undefined;
        this.showProject = false;
        this.$refs.videoPlayer.pause();
        this.$refs.videoPlayer1.pause();
        this.$refs.videoPlayer2.pause();
        this.$refs.videoPlayer3.pause();
        // this.message = {};
    },
    addProject(){
      if(this.projectName){
        // console.log('Project Name*********************ANNOTATIONS')
        let projectNameDup = this.projectName;
        var projectsDuplicate = [];
        projectsDuplicate = this.usersProjects.filter(function(project){
            return project.name === projectNameDup;
        })
        if (projectsDuplicate && projectsDuplicate.length > 0) {
          this.message.error = true;
          this.message.value = 'Project name already exists.';
          setTimeout(() => {
            this.message.global = false;
            this.message.value = '';
          }, 2500);
          return;
        }
        this.uploadProjects({type:['project','annotation'],name:this.projectName}).then((res)=>{
        // this.message.error = false;
        // this.message.value=res.message;
        if(res.error){
          this.message.error = true;
        }else{
          this.newProject=false;
          this.message.error = false;
          this.projectName = undefined;
          this.message.value=res.message;
          this.message.global = true;
          this.fetchAnnotations();
          setTimeout(() => {
            this.message.value = ''
            this.message.global = false;
          }, 2500);
          window.open(window.location.origin+"/tool?project="+res.id+"&newProject=true"); 
        }
      })
      }else{
        this.message.error=true;
        this.message.value = "Please enter project name"
      }
    }
  },
   
};
<template>
  <section class="dashboard">
    <div class="explore-container">
        <p>Video Tutorials</p>
        <div class="cards-container" >
          <div class="card" @click="showVideo=!showVideo; videoUrl ='neo'">
            <img src="~assets/images/neomain.jpg" alt="" class="main-image">
            <div class="card-text">
              <img src="~assets/images/play.svg" alt="">
              <p>Foyr Neo</p>
            </div>
          </div>
          <div class="card" @click="showVideo=!showVideo; videoUrl='login'">
            <img src="~assets/images/neologin.jpg" alt="" class="main-image">
            <div class="card-text">
              <img src="~assets/images/play.svg" alt="">
              <p>Login and Accounts</p>
            </div>
          </div>
          <div class="card" @click="showVideo=!showVideo; videoUrl='floorplan'">
            <img src="~assets/images/floorplan.jpg" alt="" class="main-image">
            <div class="card-text">
              <img src="~assets/images/play.svg" alt="">
              <p>How to upload a floor plan</p>
            </div>
          </div>
          <div class="card" @click="showVideo=!showVideo; videoUrl ='render'">
            <img src="~assets/images/render.jpg" alt="" class="main-image">
            <div class="card-text">
              <img src="~assets/images/play.svg" alt="">
              <p>How to render</p>
            </div>
          </div>
        </div>
    </div>
    <div class="assistance">
      <!-- <div class="new-project" @click="newProject = !newProject">
        <img src="~assets/images/plus.svg" alt="">
        <p>New Project</p>
      </div> -->
      <h2>My Projects</h2>
      <p class="sub-text">Create, access and edit your designs here</p>
      <div class="cards" v-if="usersAnnotations">
        <div class="card add-card" @click="newProject = !newProject">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.3127 17.7706H17.7708V27.3125C17.7708 27.7472 17.1806 28.6897 16.0001 28.6897C14.8197 28.6897 14.2294 27.7471 14.2294 27.3125V17.7705H4.6875C4.25287 17.7706 3.3103 17.1803 3.3103 15.9999C3.3103 14.8195 4.25287 14.2292 4.6875 14.2292H14.2295V4.68725C14.2295 4.25268 14.8197 3.31006 16.0002 3.31006C17.1807 3.31006 17.7709 4.25268 17.7709 4.68725V14.2292H27.3129C27.7474 14.2292 28.6901 14.8194 28.6901 15.9999C28.6901 17.1804 27.7473 17.7706 27.3127 17.7706Z" fill="#D48E8E"/>
          <circle cx="16" cy="16" r="15.5" stroke="#D48E8E"/>
          </svg>
          <p>Create Project</p>
        </div>
        <div class="card" v-on:click="openProject(beg._id)" v-for="beg in usersAnnotations.slice().reverse()">
          <img class="main-image" :src="beg.properties.thumbnail" alt="">
          <div class="card-text">
            <div class="card-text-head">
              <p>{{beg.name}}</p>
              <div>
                <!-- <img src="~assets/images/share.svg" alt=""> -->
                <!-- <img src="~assets/images/clone.svg" alt=""> -->
              </div>
            </div>
            <span>{{beg.createdIn}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-div" :class="newProject?'showPopUp':''">
      <div class="popup-container">
        <div class="close-popup" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z" fill="white"/>
          </svg>
        </div>
        <div class="popup-head">
          <h2>Add Project</h2>
        </div>
        <div class="popup-details">
          <div class="invite-input">
            <div>
              <input autocomplete="off" type="text" placeholder="Project Name" v-model="projectName" @keyup.enter="addProject()">
              <span
                :class="message.error?'error-message':'success-message'"
                v-if="message.value"
              >{{message.value}}</span>
            </div>
          </div>
          <div class="invite-button-container">
            <button @click="cancelContainer('invite')" class="cancel-button">Cancel</button>
            <button @click="addProject()" :disabled="!projectName" class="update-address">Add Project</button>
          </div>
        </div>
      </div>
    </div>
    <div class="playVideo" :class="showVideo?'showPopUp':''">
      <div class="popOver" >
        <div class="close-popup" @click="closePopup" style="right: -30px;">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z" fill="white"/>
          </svg>
        </div>
        <video width="700" controls class="video-player" ref="videoPlayer" v-show="videoUrl=='neo'">
          <source src="https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/Neo%20Videos/1318580383.mp4" type="video/mp4">
        </video>
        <video width="700" controls class="video-player" ref="videoPlayer1" v-show="videoUrl=='login'">
          <source src="https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/Neo%20Videos/Login_V4_720p.webm" type="video/webm">
        </video>
        <video width="700" controls class="video-player" ref="videoPlayer2" v-show="videoUrl=='floorplan'">
          <source src="https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/Neo%20Videos/FloorPlan_V4_720p.webm" type="video/webm">
        </video>
        <video width="700" controls class="video-player" ref="videoPlayer3" v-show="videoUrl=='render'">
          <source src="https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/Neo%20Videos/Render_V6_720p.webm" type="video/webm">
        </video>
      </div>
    </div>
    <MessageComponent :changeRight="message" />
  </section>
</template>

<script  src="./index.js" type="javascript"></script>


<style lang="scss" scoped>
.main-loading{
  height: calc( 100vh - 3.75rem );
}
.video-player{
  width: 60vw;
}
.invite-input{
  p{
    text-align: center;
    font-size: 0.9rem;
  }
}
.playVideo{
    position: fixed;
    top: 0rem;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    background: rgba(0, 0, 0, 0.7);
        visibility: hidden;
    opacity: 0;
    z-index: -1;
    transform: scale(0);
    transition: all .5s ease-in-out;
    .popOver{
      margin: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .close-popup{
      position: absolute;
      right: -1.25rem;
    }
}
.showPopUp{
  transform: scale(1);
  visibility: visible;
  z-index: 200;
  opacity: 1;
}
.explore-container{
  background: #E9E9E9;
  padding: 1.5625rem 3.125rem;
  .card{
    .main-image{
      height: 8.4375rem;
    }
  }
}
.cards-container{
  display: flex;

  .card{
    margin-right: 1.5rem;
    box-shadow: 0rem 0.625rem 1.5625rem rgba(34, 32, 33, 0.25);
    display: flex;
    max-width: 200px;
    flex-direction: column;
    transition: all .2s ease-in-out;
    cursor: pointer;
    .card-text{
      display: flex;
      padding: 0.625rem;
      p{
        font-size: 0.8rem;
        margin: 0rem;
        margin-left: 1.25rem;
      }
    }
    &:hover{
      transform: scale(1.1);
    }
  }
}
.assistance{
  padding: 1.5625rem 3.125rem;
  background: $border-2;
  .new-project{
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    width: max-content;
    border: 0.0625rem solid $border-1;
    padding: 0.75rem 0.9375rem;
    grid-gap: 1.25rem;
    cursor: pointer;
    margin-bottom: 2.1875rem;
    &:hover{
      background: #F7E3DF;
    }
    p{
      margin: 0rem;
    }
  }
  h2{
    font-size: 1rem;
    margin-bottom: 0.625rem;
  }
  .sub-text{
    font-size: 0.75rem;
    color: #A6A5A6;
  }
  .cards{
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap: 3.125rem 0.9375rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 290px));
    .card{
      background: $color-white;
      display: -ms-grid;
      display: grid;
      .main-image{
        width: 100%;
        height: 13.4375rem;
        object-fit: cover;
        }
      .card-text{
        padding: 0.5rem 1rem;
        .card-text-head{
          display: grid;
          grid-template-columns: max-content max-content;
          justify-content: space-between;
          p{
            margin: 0rem;
          }
          div{
            img:first-child{
              margin-right: 0.9375rem;
            }
          }
        }
        span{
          font-size: 0.4375rem;
          color: #868686;
        }
      }
      &:hover{
        box-shadow: 0rem 0.625rem 1.5625rem rgba(34, 32, 33, 0.25);
      }
      cursor: pointer;
    }
    .add-card{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: none;
      border: 1px solid #D48E8E;
      border-style: dashed;
      height: 16rem;
      P{
        margin: 1rem 0;
        color: #D48E8E;
        font-size: 1.125rem;
      }
    }
  }
}
</style>

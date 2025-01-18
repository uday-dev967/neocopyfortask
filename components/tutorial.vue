<template>
  <div>
    <div class="search-container">
        <input autocomplete="off" type="text" placeholder="Search" v-model="searchText">
        <div class="search-icon">
            <img src="~assets/images/share2.svg" alt="">
        </div>
    </div>
    <section>
    <a target="_blank" :href="n" v-for="n in filterPdfName" >
      <div class="pdf-container">
        <p>{{n.substring(n.lastIndexOf('/')+1).split(".")[0].replace(/%20/g, " ").replace(/%2C/g, " ")}}</p>
      </div>
      <p class="download-pdf">
        Download
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="20px"
          viewBox="0 0 309.267 309.267"
          style="enable-background:new 0 0 309.267 309.267;"
          xml:space="preserve"
        >
          <g>
            <path
              style="fill:#E2574C;"
              d="M38.658,0h164.23l87.049,86.711v203.227c0,10.679-8.659,19.329-19.329,19.329H38.658
		c-10.67,0-19.329-8.65-19.329-19.329V19.329C19.329,8.65,27.989,0,38.658,0z"
            ></path>
            <path
              style="fill:#B53629;"
              d="M289.658,86.981h-67.372c-10.67,0-19.329-8.659-19.329-19.329V0.193L289.658,86.981z"
            ></path>
            <path
              style="fill:#FFFFFF;"
              d="M217.434,146.544c3.238,0,4.823-2.822,4.823-5.557c0-2.832-1.653-5.567-4.823-5.567h-18.44
		c-3.605,0-5.615,2.986-5.615,6.282v45.317c0,4.04,2.3,6.282,5.412,6.282c3.093,0,5.403-2.242,5.403-6.282v-12.438h11.153
		c3.46,0,5.19-2.832,5.19-5.644c0-2.754-1.73-5.49-5.19-5.49h-11.153v-16.903C204.194,146.544,217.434,146.544,217.434,146.544z
		 M155.107,135.42h-13.492c-3.663,0-6.263,2.513-6.263,6.243v45.395c0,4.629,3.74,6.079,6.417,6.079h14.159
		c16.758,0,27.824-11.027,27.824-28.047C183.743,147.095,173.325,135.42,155.107,135.42z M155.755,181.946h-8.225v-35.334h7.413
		c11.221,0,16.101,7.529,16.101,17.918C171.044,174.253,166.25,181.946,155.755,181.946z M106.33,135.42H92.964
		c-3.779,0-5.886,2.493-5.886,6.282v45.317c0,4.04,2.416,6.282,5.663,6.282s5.663-2.242,5.663-6.282v-13.231h8.379
		c10.341,0,18.875-7.326,18.875-19.107C125.659,143.152,117.425,135.42,106.33,135.42z M106.108,163.158h-7.703v-17.097h7.703
		c4.755,0,7.78,3.711,7.78,8.553C113.878,159.447,110.863,163.158,106.108,163.158z"
            ></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
        </svg>
      </p>
    </a>
  </section>
  </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      numbers: [
        "https://foyr-temp-utils.s3.amazonaws.com/docs/Overview%20of%20Canvas.pdf",
        "https://foyr-temp-utils.s3.amazonaws.com/docs/Overview%20of%20Context%20Bar.pdf",
        "https://foyr-temp-utils.s3.amazonaws.com/docs/Overview%20of%20the%20dashboard.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20take%20renders.pdf",
        "https://foyr-temp-utils.s3.amazonaws.com/docs/How%20to%20add%20Fans.pdf",
        "https://foyr-temp-utils.s3.amazonaws.com/docs/How%20to%20add%20accessories%20and%20decor%20items.pdf",
        "https://foyr-temp-utils.s3.amazonaws.com/docs/How%20to%20add%20false%20ceiling%20to%20the%20floor%20plan.pdf",
        "https://foyr-temp-utils.s3.amazonaws.com/docs/How%20to%20add%20furniture%20using%20catalogue.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20add%20light%20fixtures%20or%20ceiling%20lamps%20in%20default%20ceiling.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20add%20texture%20to%20Floor.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20add%20texture%20to%20ceiling.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20add%20texture%20to%20walls.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20change%20metrics.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20change%20mode.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20change%20texture%20of%20the%20product.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20clone%20products.pdf",
        "https://foyr-temp-utils.s3.amazonaws.com/docs/How%20to%20draw%20a%20floor%20plan%20using%20Pen%20tool%20or%20Room%20tool%20from%20scratch.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20edit%20%20products.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20erase%20a%20canvas.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20get%20%20a%20360%20view%20of%20a%20room.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20move%20%20on%20the%20canvas.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20move%20%20products.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20replace%20similar%20items%2C%20move%20and%20resize.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20rotate%20products.pdf",
        "https://foyr-temp-utils.s3.amazonaws.com/docs/How%20to%20upload%20a%20floor%20plan.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20upload%20and%20change%20texture%20of%20the%20furniture.pdf",
        "https://foyr-temp-utils.s3.ap-south-1.amazonaws.com/docs/How%20to%20zoom%20in%20and%20zoom%20out%20on%20the%20canvas.pdf",

      ],
      searchText:""
    };
  },
  computed:{
    filterPdfName(){
      return this.numbers.filter(path =>{
        let re = new RegExp(this.searchText, "gi");;
        return path.substring(path.lastIndexOf('/')+1).replace(/%20/g, " ").replace(/%2C/g, " ").match(re)
      })
    }
  },
  mounted(){
    // setTimeout(() => {
    //   amplitude.getInstance().logEvent("tutorial");
    // }, 1000);
  }
};
</script>
<style lang="scss" scoped>
#pdf-search{
  margin-bottom: 2rem;
}
section {
  display: flex;
  flex-wrap: wrap;
  .pdf-container {
    width: 15rem;
    text-align: center;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    // border: 2px solid rgb(212, 189, 183);
    p {
      width: 70%;
      color: rgb(212, 189, 183);
      text-transform: capitalize;
    }
  }
  .download-pdf {
    background: rgb(212, 189, 183);
    width: 100%;
    text-align: center;
    padding: 1rem;
    margin: 0px;
  }

  a {
    flex-basis: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    text-decoration: none;
    margin-right: 2rem;
    margin-bottom: 2rem;
    img {
      width: 100%;
      margin-bottom: 20px;
    }
    p {
      color: $background-1;
    }
    &:hover {
      transform: scale(1.1);
      transition: all 0.5s ease-in-out;
    }
  }
}
.search-container{

    display: grid;
    grid-template-columns: max-content max-content;
    padding-bottom: 2rem;
    align-items: center;

    input{
        background: $color-white;
        color: black;
        width: 25vw;
    }
    div{
        padding: 0.625rem 1.25rem;
        background: black;
        display: grid;
        align-items: center;
    }
    .search-icon{
        cursor:pointer;
    }
}
</style>

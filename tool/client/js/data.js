(function() {
    document.getElementById('search-div').style.display = 'none';
    ajax_get('./floorplannerui/res/json/data.json', function(data) {
    var node = document.getElementById("add-projects");
       for (var i=0; i < data["projects"].length; i++) {
           var node_div1 = appendElements("div","",node,"col-sm-4 col-md-4");
           var node_div11 = appendElements("div","",node_div1,"project-box");
           var node_div111 = appendElements("div","",node_div11,"card-img-box");
           var node_img1111 = appendElements("img","",node_div111,"img img-responsive card-img","",'./floorplannerui/images/'+data["projects"][i]["imageUrl"]);
           if(data["projects"][i]["lable"] == '3d'){
                var node_div1112 = appendElements("div","",node_div111,"img-overlay");
                var node_img11121 = appendElements("img","",node_div1112,"img img-responsive","","./floorplannerui/images/360 icon.svg");
           }
           var node_div112 = appendElements("div","",node_div11,"project-details");
           var node_header1121 = appendElements("h5",data["projects"][i]["title"],node_div112,"proj-title");
           if(data["projects"][i]["status"] != 'Done'){
                var node_span11211 = appendElements("span","",node_header1121,"pull-right");
                var node_img112111 = appendElements("img","",node_span11211,"img img-responsive pencil-o","","./floorplannerui/images/pencil-o.svg");
                node_img112111.style.display = "none";
                var node_header1122 = appendElements("h5",data["projects"][i]["status"],node_div112,"proj-status");
                var node_div1121 = appendElements("div","",node_header1122,"no-circle pull-left land-progress");
           }else{
             var node_header1122 = appendElements("h5",data["projects"][i]["status"],node_div112,"proj-status");
             var node_div1121 = appendElements("div","",node_header1122,"land-progress pull-left");
             var node_img11211 = appendElements("img","",node_div1121,"img img-responsive full-circle","","./floorplannerui/images/tick.svg");
           }
       }
    });
    ajax_get('./floorplannerui/res/json/data.json', function(data) {
    var node = document.getElementById("add-latest-projects");
       for (var i=0; i < data["projects"].length; i++) {
           var node_div1 = appendElements("div","",node,"col-sm-4 col-md-4");
           var node_div11 = appendElements("div","",node_div1,"project-box");
           var node_div111 = appendElements("div","",node_div11,"card-img-box");
           var node_img1111 = appendElements("img","",node_div111,"img img-responsive card-img","",'./floorplannerui/images/'+data["projects"][i]["imageUrl"]);
           if(data["projects"][i]["lable"] == '3d'){
                var node_div1112 = appendElements("div","",node_div111,"img-overlay");
                var node_img11121 = appendElements("img","",node_div1112,"img img-responsive","","./floorplannerui/images/360 icon.svg");
           }
           var node_div112 = appendElements("div","",node_div11,"project-details");
           var node_header1121 = appendElements("h5",data["projects"][i]["title"],node_div112,"proj-title");
           if(data["projects"][i]["status"] != 'Done'){
                var node_span11211 = appendElements("span","",node_header1121,"pull-right");
                var node_img112111 = appendElements("img","",node_span11211,"img img-responsive pencil-o","","./floorplannerui/images/pencil-o.svg");
                node_img112111.style.display = "none";
                var node_header1122 = appendElements("h5",data["projects"][i]["status"],node_div112,"proj-status");
                var node_div1121 = appendElements("div","",node_header1122,"no-circle pull-left land-progress");
           }else{
             var node_header1122 = appendElements("h5",data["projects"][i]["status"],node_div112,"proj-status");
             var node_div1121 = appendElements("div","",node_header1122,"land-progress pull-left");
             var node_img11211 = appendElements("img","",node_div1121,"img img-responsive full-circle","","./floorplannerui/images/tick.svg");
           }
       }
    });
 })();

var dm = document.getElementById('dropdown-menu');
document.getElementById("dropdown").addEventListener("click",function(){
    if(dm.style.display == 'block'){
      dm.style.display = "none";
    }else{
      dm.style.display = "block";
    }
});


document.onclick = function(e){
  if(e.target.id == 'dropdown-menu' || e.target.id == 'dropdown' || e.target.id == 'dropdown-img'){
  }else{
    dm.style.display = 'none';
  }
};

 function appendElements(tag,text,node,className,idName,value,actions,params){
   var elem = document.createElement(tag);
   if(className){
     elem.className = className;
   }
   if(idName){
     elem.id = idName;
   }
   if(text){
     var textNode = document.createTextNode(text);
     elem.appendChild(textNode);
   }
   if(tag == "i"){
     elem.setAttribute("aria-hidden","true");
     if(value){
       elem.title = "value";
     }
   }
   if(tag == "input"){
     elem.value = value;
   }
   if(tag == "img"){
     elem.src = value;
   }
   if(tag == "a"){
     elem.setAttribute("href",value);
   }
   if(actions){
     elem.setAttribute(actions,params);
   }
   if(actions == "ondragStart"){
     elem.setAttribute("draggable","true");
   }
   node.appendChild(elem);
   return elem;
 }

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function toggleSearch(){
    var searchBtn = document.getElementById('search-btn');
    if(searchBtn.style.display === 'none'){
        searchBtn.style.display = 'block';
    }else{
        searchBtn.style.display = 'none';
    }

    var search = document.getElementById('search-div');
    if(search.style.display === 'none'){
        search.style.display = 'block';
        document.getElementById('search-cls').className = 'col-sm-12';
        document.getElementById('tab-cls').style.display = 'none';
    }else{
        search.style.display = 'none';
        document.getElementById('search-cls').className = 'col-sm-1 pdr-0';
        document.getElementById('tab-cls').style.display = 'block';
    }
}

document.getElementById("search-input").addEventListener("keyup",function(){
  changeSearch();
});

function changeSearch(){
  var searchElem = document.getElementById("search-input");
  if(searchElem.value.length > 0){
      document.getElementById("search-img").parentNode.style.backgroundColor = '#ef4b6e';
      document.getElementById("search-img").src = './floorplannerui/images/search-white.svg';
      document.getElementById("search-img").style.cursor = 'pointer';
      document.getElementById("clear-search").style.display = 'block';
  }else{
    document.getElementById("search-img").parentNode.style.backgroundColor = '#ffffff';
    document.getElementById("search-img").src = './floorplannerui/images/search-disabled.svg';
    document.getElementById("search-img").style.cursor = 'default';
    document.getElementById("clear-search").style.display = 'none';
  }
}

document.getElementById("clear-search").addEventListener("click",function(){
  clearSearch();
});

function clearSearch(){
  var searchElem = document.getElementById("search-input");
  searchElem.value = '';
  document.getElementById("clear-search").style.display = 'none';
  document.getElementById("search-img").parentNode.style.backgroundColor = '#ffffff';
  document.getElementById("search-img").src = './floorplannerui/images/search-disabled.svg';
    document.getElementById("search-img").style.cursor = 'default';
}

document.getElementById("back-search-arrow").addEventListener("mouseenter",function(){
  document.getElementById("back-search-arrow").src = "./floorplannerui/images/back-hover.svg";
  document.getElementById("back-search-arrow").style.cursor = "pointer";
});
document.getElementById("back-search-arrow").addEventListener("mouseleave",function(){
  document.getElementById("back-search-arrow").src = "./floorplannerui/images/back.svg";
  document.getElementById("back-search-arrow").style.cursor = "default";
});
document.getElementById("search-btn").addEventListener("click",function(){
  toggleSearch();
});
document.getElementById("search-btn").addEventListener("mouseenter",function(){
  document.getElementById("search-btn").src = "./floorplannerui/images/search-hover.svg";
  document.getElementById("search-btn").style.cursor = "pointer";
});
document.getElementById("search-btn").addEventListener("mouseleave",function(){
  document.getElementById("search-btn").src = "./floorplannerui/images/search.svg";
  document.getElementById("search-btn").style.cursor = "default";
});
// function toggleHomeTabs(){
//     var selectedTab = document.getElementsByClassName(event.target.className);
//     selectedTab.parentNode.parentnode.childNodes.classList.remove('active');
//     selectedTab.parentNode.className += 'active';
//     var otherTabs = document.getElementsByClassName('tab-pane'), i;
//     for (i = 0; i < otherTabs.length; i += 1) {
//         otherTabs[i].classList.remove('in');
//         otherTabs[i].classList.remove('active');
//     }
//     var highlightTab = document.getElementById(selectedTab[0].className);
//     highlightTab.className += " in active";

// }

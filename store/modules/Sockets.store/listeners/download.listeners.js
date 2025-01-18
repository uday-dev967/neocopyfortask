export default function (ctx, socket) {
  socket.on('download_progress', res => {
    // Do Something
    console.log(res)
  })
  socket.on('download_completed', res => {
    // var canvas = document.createElement('canvas')
    // var context = canvas.getContext('2d');
    // var img = new Image;
    // img.crossOrigin = "Anonymous"
    // img.onload = function(){
    //   canvas.width = img.width
    //   canvas.height = img.height
    //   canvas.style.display = "none"
    //   context.drawImage(img,0,0); // Or at whatever offset you like
    //   var href = canvas.toDataURL("image/jpg")
    //   var link = document.createElement('a');
    //   link.href = href;
    //   link.download = 'render.jpg';
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   ctx.commit('Render/setDownload', {
    //     referenceId:res.referenceId
    //   }, {
    //     root: true
    //   })
    // };
    // img.src = res.url;
    
  })
}

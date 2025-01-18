

export default function (ctx, socket) {
  socket.on('progress', res => {
    console.log(res , ctx)
  })
}

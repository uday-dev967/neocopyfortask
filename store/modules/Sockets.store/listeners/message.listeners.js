export default function (ctx, socket) {
    socket.on('message', res => {
      ctx.commit('Render/setProgress',res.payload,{ root: true })
    })
  }
  
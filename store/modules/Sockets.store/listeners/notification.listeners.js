export default function (ctx, socket) {
  socket.on('NOTIFICATION', res => {
    let payload = {accountId:ctx.rootState.User.user.accountId,"page": 1,
    "limit": 20,
    "sortBy": { updatedAt : -1 }}
    if(ctx.rootState.Render.viaProject)
    payload.project = ctx.rootState.Render.viaProject
    ctx.rootState.Render.renderPaged = []
    ctx.dispatch('Render/fetchRenderPage',payload,{root:true})
    
  })
}

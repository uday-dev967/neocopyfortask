export default function ({
  commit,
  dispatch,
  rootState
}, socket) {
  const token = rootState.Auth.token //rootState.Auth.token
  socket.on('connect', res => {
    console.log('Socket Connected',res)
    commit('setStatus', {
      key: 'connected',
      status: true
    })
    dispatch('emit', {
      event: 'authenticate',
      payload: {
        token,
        clientType: 'USER'
      }
    })
  })
  socket.on('disconnect', () => {
    console.log('socket disconnected');
    ['connected', 'authenticated'].forEach(key => {
      commit('setStatus', {
        key,
        status: false
      })
    });

  })
}

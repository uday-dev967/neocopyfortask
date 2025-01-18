import io from 'socket.io-client'
import listeners from './listeners'

let socket

const state = {
  connected: false,
  authenticated: false
}

const getters = {}
const actions = {
  open(ctx) {
    ctx.dispatch('close')
    let renderUrl = window.location.host=="neo.foyr.com"?'https://rendermanager.foyr.com':'https://rendermanagerdev.foyr.com'
    socket = io(renderUrl)
    listeners(ctx, socket)
  },
  close(ctx) {
    if (socket) {
      socket.disconnect()
      socket.off()
      socket = null
    }
  },
  emit(ctx, {
    event,
    payload
  }) {
    socket.emit(event, payload, res => {
      console.log('ack', {
        event:event,
        sent: payload,
        received: res
      })
      // if(event == "download"){
      //   ctx.commit('Render/downloadAck', {recived:res,sent:payload}, {
      //     root: true
      //   })
      // }
    })
  }
}

const mutations = {
  setStatus: (state, payload) => {
    state[payload.key] = payload.status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

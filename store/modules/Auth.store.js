import Cookies from "js-cookie"

const state = {
  token: null,
  amr: undefined,
  onboardingFormFilled: undefined,
  userAccountType: undefined
}

const getters = {

}

const actions = {
  authorization({
    commit,
    dispatch
  }, form) {
    let url = '/auth'
    return this.$axios.$post(url, form)
      .then(res => {
        if (res['amr'] && res['amr'].length > 0 && res['amr'].includes("signup")) {
          window.dataLayer.push({ 'event': 'signup' });
        }
        const token = res.token
        const idToken = res.id_token
        localStorage.setItem("Authorization", token)
        localStorage.setItem("id_token", idToken)
        // Setting the cookie is important as its being used in the webclipper app
        Cookies.set('Authorization', token, {
          secure: true,
          sameSite: 'None'
        })
        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        this.$axios.defaults.headers.common['x-logout'] = `${idToken}`
        commit('setToken', token)
        commit('setAmr', res.amr)
        commit('setIdToken', idToken)
        commit('setonboardingFormFilled', res.onboardingFormFilled)

        commit('setUserAccountType', res.userAccountType)
        dispatch('Sockets/open', {}, {
          root: true
        })
        // dispatch('User/fetch', {}, {
        //   root: true
        // })
        // return res
        return res
      })
      .catch(err => {
        localStorage.removeItem('Authorization')
        commit("clearToken")
        commit("clearIdToken")
        throw err.response
      })
  },
  logout({
    commit
  }) {
    let url = 'auth/logout'
    return this.$axios.$post(url)
      .then(res => {
        setTimeout(() => {
          window.document.cookie = `neoLogin=;expires = Thu, 01 Jan 1970 00:00:00 GMT;domain=.foyr.com;path=/`
        }, 1);

        return res
      })
      .catch(err => {
        localStorage.removeItem('Authorization')
        commit("clearToken")
        commit("clearIdToken")
        throw err.response
      })
  }
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
    var cookieDate = new Date();
    cookieDate.setMonth(cookieDate.getMonth() + 1)
    setTimeout(() => {
      window.document.cookie = `neoLogin=true;expires=${cookieDate};domain=.foyr.com;path=/`
    }, 1);
  },
  setIdToken: (state, idToken) => {
    state.idToken = idToken
  },
  setAmr: (state, data) => {
    state.amr = data
  },
  clearToken: (state) => {
    state.token = null
    localStorage.removeItem('Authorization')
    var cookieDate = new Date();
    cookieDate.setMonth(cookieDate.getDate() - 1)
    window.document.cookie = `neoLogin=;expires = Thu, 01 Jan 1970 00:00:00 GMT;`
  },
  clearIdToken: (state) => {
    state.idToken = null
    localStorage.removeItem('id_token')
  },
  setonboardingFormFilled: (state, data) => {
    state.onboardingFormFilled = data
  },
  setUserAccountType: (state, data) => {
    state.userAccountType = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

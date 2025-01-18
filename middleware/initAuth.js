import Cookie from 'js-cookie'

export default function ({store, $axios}) {
  const storeToken = store.state.Auth.token;
  const idToken = store.state.Auth.idToken;

  function set(token) {
    store.commit('Auth/setToken', token)
    if (!$axios.defaults.headers.common['Authorization']) $axios.defaults.headers.common['Authorization'] = token
    
  }
  function setId(token){
    store.commit('Auth/setIdToken',token)
    if (!$axios.defaults.headers.common['x-logout']) $axios.defaults.headers.common['x-logout'] = token
  }
  if(window.self == window.top){
    if (!storeToken) {
      if (process.client) {
        const token = localStorage.getItem('Authorization')
        if (token) set(token)
      } else {
        const token = Cookie.get('Authorization')
        if (token) set(token)
      }
    }
    if (!idToken) {
      if (process.client) {
        const token = localStorage.getItem('id_token')
        if (token) setId(token)
      } else {
        const token = Cookie.get('id_token')
        if (token) setId(token)
      }
    }
  }
 
}

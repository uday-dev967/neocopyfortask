export default function ({ store, redirect }) {
  if(window.self != window.top){
    console.log("to login iframe")
  }
  else if(store.state.Auth.token || localStorage.getItem('Authorization'))
  {
    if(store.$ua.deviceType() !== 'pc' )
      return redirect('/dashboard_mobile/home')
    else
      return redirect('/user')
  }
  else {
    // let url = "/auth/loginurl";
    // this.$axios.$get(url).then(res => {
    //     window.location.href = res.url;
    // });
    return redirect('/login')
  }
}

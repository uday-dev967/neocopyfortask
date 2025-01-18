export default function ({ from, store, redirect, route,$axios, app }) {
  const token = store.state.Auth.token;
  // let onboardingFormFilled = store.state.Auth.onboardingFormFilled;
  // let userAccountType = store.state.Auth.userAccountType;
  if(window.self != window.top){
    console.log('authreq iframe')
  }
  else if(!store.state.User.user)
  {
    (async() => {
      var user = await store.dispatch('User/fetch', {}, {
        root: true
      })
      if (!token) {
        return redirect('/login')
        // let url = "/auth/loginurl";
        // this.$axios.$get(url).then(res => {
        //     window.location.href = res.url;
        // });
      }else if(user.onboardingFormFilled && user.accountExtraInfo && user.accountExtraInfo.userCategory){
        if(route.path.indexOf('/user') !== -1)
          {
            return redirect(app.localePath(store.$ua.deviceType() == 'pc'?getRedirectURl(user, store):'/dashboard_mobile/explore'))
          }
        else if(store.$ua.deviceType() != 'pc' && route.path.indexOf('/dashboard_mobile/explore') == -1 && route.path.indexOf('/dashboard_mobile/explore') == -1 && route.path.indexOf('/dashboard_mobile/plans') == -1 && route.path.indexOf('/dashboard_mobile/gallery') == -1 && route.path.indexOf('/dashboard_mobile/link-desktop') == -1){
          return redirect(app.localePath('/dashboard_mobile/explore'))
        }
      }else if(user.accountType == 'root' && route.path.indexOf('/user') === -1){
        return redirect(app.localePath('/user'))
      }
    })();

  }else{
    if (!token) {
      return redirect('/login')
      // let url = "/auth/loginurl";
      // this.$axios.$get(url).then(res => {
      //     window.location.href = res.url;
      // });
    }else if(store.state.User.user.onboardingFormFilled && store.state.User.user.accountExtraInfo && store.state.User.user.accountExtraInfo.userCategory){
      if(route.path.indexOf('/user') !== -1)
        {
          return redirect(app.localePath(store.$ua.deviceType() == 'pc'? getRedirectURl(store.state.User.user, store):'/dashboard_mobile'))
        }
        else if(store.$ua.deviceType() != 'pc' && route.path.indexOf('/dashboard_mobile/explore') == -1 && route.path.indexOf('/dashboard_mobile/explore') == -1 && route.path.indexOf('/dashboard_mobile/plans') == -1 && route.path.indexOf('/dashboard_mobile/gallery') == -1 && route.path.indexOf('/dashboard_mobile/link-desktop') == -1){
          return redirect(app.localePath('/dashboard_mobile/explore'))
        }
    }else if(store.state.User.user.accountType == 'root' && route.path.indexOf('/user') === -1){
      return redirect(app.localePath('/user'))
    }
  }
  //if(window.location.host === "neo.foyr.com")
}

const getRedirectURl = (user, store) => {
  if (user.isMBUser) {
    store.commit("User/setSwitchToMoodboard", true);
    return '/moodboard/dashboard'
  } else if (user.redirectToPlansPage) {
    return '/settings/plans_new'
  }
  return user.redirectToInspirationPage ? '/inspiration' : '/dashboard'
}
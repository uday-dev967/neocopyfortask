export default function({ store, redirect, route, $axios, app }) {
    if (window.self === window.top){
        const storeToken = store.state.Auth.token;
        if (!storeToken) {
            if (process.client) {
              const token = localStorage.getItem('Authorization')
              if (token) afterToken(token)
            } 
          }
    }else{
        window.addEventListener("message", function(event) {
            let token = event.data.token;
            if(!event.data.token && localStorage.getItem("Authorization"))
            {
              token = localStorage.getItem("Authorization")
            }
            if(token)
                afterToken(token)
        });
    }
    
    function set(token) {
      store.commit("Auth/setToken", token);
      if (!$axios.defaults.headers.common["Authorization"])
        $axios.defaults.headers.common["Authorization"] = token;
    }
    function setId(token){
      store.commit('Auth/setIdToken',token)
      if (!$axios.defaults.headers.common['x-logout']) $axios.defaults.headers.common['x-logout'] = token
    }
    async function afterToken(token){
        
        if (token) {
            localStorage.setItem("Authorization", token);
            set(token);
            setId(token)
            if (!store.state.User.user) {
                var user = await store.dispatch(
                    "User/fetch",
                    {},
                    {
                      root: true
                    }
                  );
                  if (!token) {
                    return redirect("/login");
                    // let url = "/auth/loginurl";
                    // this.$axios.$get(url).then(res => {
                    //     window.location.href = res.url;
                    // });
                  } else if (user.onboardingFormFilled) {
                    if (route.path.indexOf('/user') !== -1) {
                      if (user.isMBUser) {
                        store.commit("User/setSwitchToMoodboard", true);
                      }
                      return redirect(app.localePath(
                        store.$ua.deviceType() == "pc"
                          ? getRedirectURl(user, store)
                          : "/dashboard_mobile/home"
                      ));
                    } 
                    else if(route.path === "/"){
                        if (user.isMBUser) {
                          store.commit("User/setSwitchToMoodboard", true);
                        }
                        if(store.$ua.deviceType() == "pc"){
                            return redirect(app.localePath(getRedirectURl(user, store)));
                        }else{
                            return redirect(app.localePath("/dashboard_mobile"));
                        }
                    }    
                    else if (
                      store.$ua.deviceType() != "pc" &&
                      route.path.indexOf('/dashboard_mobile/home') == -1 && 
                      route.path.indexOf('/dashboard_mobile/projects') == -1 && 
                      route.path.indexOf('/dashboard_mobile/plans') == -1 && 
                      route.path.indexOf('/dashboard_mobile/gallery') == -1
                    ) {
                      return redirect(app.localePath("/dashboard_mobile/home"));
                    }
                  } else if (user.accountType == "root" && route.path.indexOf('/user') === -1) {
                    return redirect(app.localePath("/user"));
                  }
            } else if (!token) {
                return redirect("/login");
                // let url = "/auth/loginurl";
                // this.$axios.$get(url).then(res => {
                //     window.location.href = res.url;
                // });
              } 
          }
    }
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
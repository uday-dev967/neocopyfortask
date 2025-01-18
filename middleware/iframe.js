export default function({ store, redirect, route, $axios, app }) {
  if (window.self === window.top) return;
  window.addEventListener("message", function(event) {
    let token = event.data.token;
    if(!event.data.token && localStorage.getItem("Authorization"))
    {
      token = localStorage.getItem("Authorization")
    }
    if (token) {
      localStorage.setItem("Authorization", token);
      console.log("messge iframe", store);
      set(token);

      if (store.$ua.deviceType() !== "pc") {
        redirect(app.localePath("/dashboard_mobile/home"));
      } else {
        redirect(app.localePath("/user"));
      }

      if (!store.state.User.user) {
        (async () => {
          var user = await store.dispatch(
            "User/fetch",
            {},
            {
              root: true
            }
          );
          console.log(user)
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
            } else if (
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
        })();
      } else {
        if (!token) {
          return redirect("/login");
          // let url = "/auth/loginurl";
          // this.$axios.$get(url).then(res => {
          //     window.location.href = res.url;
          // });
        } else if (store.state.User.user.onboardingFormFilled) {
          if (route.path.indexOf('/user') !== -1) {
            if (store.state.User.user.isMBUser) {
              store.commit("User/setSwitchToMoodboard", true);
            }
            return redirect(app.localePath(
              store.$ua.deviceType() == "pc"
                ? getRedirectURl(store.state.User.user, store)
                : "/dashboard_mobile"
            ));
          } else if (
            store.$ua.deviceType() != "pc" &&
            route.path.indexOf('/dashboard_mobile/home') == -1 && 
            route.path.indexOf('/dashboard_mobile/projects') == -1 && 
            route.path.indexOf('/dashboard_mobile/plans') == -1 && 
            route.path.indexOf('/dashboard_mobile/gallery') == -1
          ) {
            return redirect(app.localePath("/dashboard_mobile/home"));
          }
        } else if (
          store.state.User.user.accountType == "root" &&
          route.path.indexOf('/user') === -1
        ) {
          return redirect(app.localePath("/user"));
        }
      }
    }
  });
  function set(token) {
    store.commit("Auth/setToken", token);
    if (!$axios.defaults.headers.common["Authorization"])
      $axios.defaults.headers.common["Authorization"] = token;
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
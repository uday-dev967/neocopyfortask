export default function (context) {
  context.store.Routing = {}
    if (process.client) {
      const from = context.from
      context.store.Routing.from = from
      console.log(context)
      if(from.path == '/plansDirect'){
        window.sessionStorage.setItem('plansRedirect', from.name);
      }
    }
  }
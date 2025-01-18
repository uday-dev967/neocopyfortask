export default function({store, $axios}) {
    let user = store.state.User.user;
    if(!user) {
        store.dispatch('User/fetch')
    }
}
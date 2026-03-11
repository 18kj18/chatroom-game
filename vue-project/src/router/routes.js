function loadPage(component) {
    //@ is aliased to src
    return () => import(`@/pages/${component}.vue`)
}
export default [
    { path: '/', component: loadPage('Home')},
    { path: '/chatroom', component: loadPage('Chatroom')}
]
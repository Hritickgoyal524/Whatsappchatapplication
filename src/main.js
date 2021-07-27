import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Route from './route'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted'
// Make BootstrapVue available throughout your projec




import firebaseApp from './services/firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'

library.add(faPencilAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
    // Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
const toastOptions = {
    position: 'top-center',
    duration: 2000,
    theme: "toasted-primary"
}

Vue.use(Toasted, toastOptions)
Vue.use(VueRouter)
const route = new VueRouter({
    routes: Route,
    mode: 'history'
})
Vue.config.productionTip = false
const unsubscribe = firebaseApp.auth().onAuthStateChanged(user => {
        // store.dispatch('setcurrentuser', user)
        console.log("gageg")
        console.log(user)
        new Vue({
            router: route,
            store,
            render: h => h(App)
        }).$mount('#app');
        unsubscribe()
    })
    // new Vue({
    //     router: route,
    //     store,
    //     render: h => h(App)
    // }).$mount('#app');
    // unsubscribe()
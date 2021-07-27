import Login from './components/login'

import Side from './components/sid'

import firebaseApp from './services/firebase'
import Profile from './components/profile'
export default [{
        path: '/login',
        component: Login,

    },


    {
        path: '/',
        component: Side,
        beforeEnter: (to, from, next) => {
            if (!firebaseApp.auth().currentUser) {
                console.log("login")
                next("/login");
            } else {
                next();
            }
        }
    },
    {
        path: '/profile',
        component: Profile
    }

    ,
    {

        path: "/chat",
        component: Side
    }

]
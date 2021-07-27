import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    currentusername: null,
    userprofilepic: null,
    des: null,
    uid: null,
    num: null,
    isprofile: null
}
const mutations = {
    Set_Username(state, username) {
        state.currentusername = username
    },
    Set_Userprofile(state, profileurl) {
        state.userprofilepic = profileurl
    },
    Set_des(state, des) {
        state.des = des
    },
    Set_uid(state, uid) {
        state.uid = uid
    },
    Set_num(state, num) {
        state.num = num
    },
    Set_profile(state, pro) {
        state.isprofile = pro
    }
}
const actions = {
    setcurrentusername(state, username) {
        state.commit('Set_Username', username)
    },
    setuserprofile(state, profileurl) {
        state.commit("Set_Userprofile", profileurl)
    },
    setdescription(state, des) {
        state.commit("Set_des", des)
    },
    setuid(state, uid) {
        state.commit("Set_uid", uid)
    },
    setnum(state, number) {
        state.commit("Set_num", number)
    },
    setisprofile(state, pro) {
        state.commit("Set_profile", pro)
    }
}

const getters = {
    currentusername: state => state.currentusername,
    currentprofilepic: state => state.userprofilepic,
    description: state => state.des,
    getuid: state => state.uid,
    getnum: state => state.num,
    getprofile: state => state.isprofile
}
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,

})
export default store;
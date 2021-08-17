import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        loadingVisible: false
    },
    mutations: {
        increment(state) {
            state.count++
        },
        loading(state, loadingVisible) {
            state.loadingVisible = loadingVisible
        }
    }
})
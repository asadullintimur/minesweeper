import {FIELD_MODE} from "@/helpers/constants";

//state
const state = () => ({
    mode: FIELD_MODE.OPEN
})

//getters
const getters = {}

//mutations
const mutations = {
    setMode(state, mode) {
        state.mode = mode;
    }
}

//actions
const actions = {
    toggleMode({commit, state}) {
        let mode = state.mode === FIELD_MODE.OPEN ? FIELD_MODE.FLAG : FIELD_MODE.OPEN;
        commit("setMode", mode)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}
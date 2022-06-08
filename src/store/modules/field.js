import {FIELD_CELL, FIELD_MODE} from "@/helpers/constants";
import options from "@/store/modules/options";

//state
const state = () => ({
    cells: [1, 1, 1, 0, 0,
        1, "*", 1, 0, 0,
        1, 1, 1, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    openedCells: [],
    flagCells: [],
})

//getters
const getters = {}

//mutations
const mutations = {
    openCell(state, idx) {
        state.openedCells.push(idx)
    },

    flagCell(state, idx) {
        state.flagCells.push(idx)
    },

    removeFlag(state, idx) {
        state.flagCells = state.flagCells.filter((cellIdx) => cellIdx !== idx)
    }
}

//actions
const actions = {
    openCell({commit, state, dispatch, rootState}, idx) {
        const optionsState = rootState.field.options;
        let mode = optionsState.mode;

        let cell = state.cells.find((cell, fIdx) => fIdx === idx);

        if (cell === FIELD_CELL.MINE) {
            console.log("lose")
        }

        if (mode === FIELD_MODE.OPEN) {
            commit("openCell", idx)
        } else {
            dispatch("flagCell", idx)
        }
    },

    flagCell({commit, state}, idx) {
        if (state.flagCells.includes(idx)) {
            commit("removeFlag", idx)
        } else {
            commit("flagCell", idx)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
    modules: {
        options
    }
}
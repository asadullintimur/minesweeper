import {FIELD_MODE} from "@/helpers/constants";
import options from "@/store/modules/options";

//state
const state = () => ({
    cells: [],
})

//getters
const getters = {}

//mutations
const mutations = {
    openCell(state, cell) {
        cell.opened = true;
    },

    toggleFlag(state, cell) {
        cell.flagged = !cell.flagged;
    },

    setCells(state, cells) {
        state.cells = cells;
    },

    // setMinIndices(state, minIndices) {
    //     state.cells.minIndices = minIndices;
    // }
}

//actions
const actions = {
    openCell({commit, dispatch, rootState}, cell) {
        const optionsState = rootState.field.options;

        if (optionsState.mode === FIELD_MODE.OPEN && !cell.flagged) {
            commit("openCell", cell)
        } else {
            dispatch("flagCell", cell)
        }
    },

    flagCell({commit, state, rootState}, cell) {
        const optionsState = rootState.field.options;

        if (!cell.opened && optionsState.mode === FIELD_MODE.FLAG) {
            commit("toggleFlag", cell)
        }
    },

    initCells({state, dispatch, commit}, size) {
        let numberOfCells = size ** 2;
        let cells = [];

        for (let i = 0; i < numberOfCells; i++) {
            let cell = {
                id: i,
                minAround: 0,
                opened: false,
                flagged: false,
                isMine: false,
            };
            cells.push(cell)
        }

        commit("setCells", cells)

        // state.minIndices.forEach(minIdx => {
        //     cells[minIdx] = FIELD_CELL.MINE;
        // })
    },

    initMines() {},


    // initMinIndices({state, commit}, {numberOfMines, numberOfCells}) {
    //     let minIndices = [];
    //
    //     while (minIndices.length !== numberOfMines) {
    //         let minIdx = Math.round(Math.random() * numberOfCells);
    //         if (!minIndices.includes(minIdx)) minIndices.push(minIdx)
    //     }
    //
    //     commit("setMinIndices", minIndices)
    // }
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
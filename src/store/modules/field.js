import {FIELD_MODE, GAME_DIFFICULTY} from "@/helpers/constants";
import {getAroundItems} from "@/helpers/getNearbyItems";

//state
const state = () => ({
    cells: [],
    params: {
        numberOfMines: 10,
        size: 9,
    },
    mode: FIELD_MODE.OPEN,
    difficulty: GAME_DIFFICULTY.EASY
})

//getters
const getters = {
    minedCells(state) {
        return state.cells.filter(cell => cell.isMine)
    },

    cellIndices(state) {
        return state.cells.map((cell) => cell.id)
    }
}

//mutations
const mutations = {
    openCell(state, cell) {
        cell.opened = true;
    },

    toggleFlag(state, cell) {
        cell.flagged = !cell.flagged;
    },

    mineCell(state, cell) {
        cell.isMine = true;
    },

    incrementMinAround(state, cell) {
        cell.minAround++;
    },

    setCells(state, cells) {
        state.cells = cells;
    },

    setMode(state, mode) {
        state.mode = mode;
    },

    setDifficulty(state, difficulty) {
        state.difficulty = difficulty;
    }
}

//actions
const actions = {
    openCell({state, commit, dispatch}, cell) {
        if (state.mode === FIELD_MODE.OPEN && !cell.flagged) {
            commit("openCell", cell)

            if (cell.minAround === 0) {
                dispatch("openEmptyArea", cell)
            }
        } else {
            dispatch("flagCell", cell)
        }
    },

    openEmptyArea({state, dispatch, commit}, cell) {
        let aroundCells = getAroundItems(state.cells, cell.id)

        aroundCells.forEach(cell => {
            if (cell.minAround === 0 && !cell.opened) {
                commit("openCell", cell)
                dispatch("openEmptyArea", cell)
            }
            commit("openCell", cell)
        })

    },

    flagCell({commit, state, getters, rootState}, cell) {
        if (!cell.opened && state.mode === FIELD_MODE.FLAG) {
            commit("toggleFlag", cell)
        }
    },

    initCells({commit, state, dispatch}) {
        dispatch("setParams")

        let numberOfCells = state.params.size ** 2;
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
    },

    initMines({state, commit, dispatch, getters}, startingCellId) {
        let startingCells = [startingCellId,
            ...getAroundItems(getters.cellIndices, startingCellId)];

        while (true) {
            let minIdx = Math.round(Math.random() * (state.cells.length - 1));

            if (startingCells.includes(minIdx)) {
                continue;
            }

            let cell = state.cells.find((cell) => cell.id === minIdx);
            commit("mineCell", cell)

            if (getters.minedCells.length === state.params.numberOfMines) {
                break;
            }
        }

        dispatch("initMinAround")
    },

    initMinAround({getters, state, commit}) {
        getters.minedCells.forEach((mCell) => {
            let aroundCells = getAroundItems(state.cells, mCell.id);
            aroundCells.forEach(cell => commit("incrementMinAround", cell))
        })
    },

    toggleMode({commit, state}) {
        let mode = state.mode === FIELD_MODE.OPEN ? FIELD_MODE.FLAG : FIELD_MODE.OPEN;
        commit("setMode", mode)
    },

    setParams({state}) {
        switch (state.difficulty) {
            case GAME_DIFFICULTY.EASY:
                state.params = {
                    numberOfMines: 10,
                    size: 9
                }
                break;
            case GAME_DIFFICULTY.NORMAL:
                state.params = {
                    size: 16,
                    numberOfMines: 40,
                }
                break;
            case GAME_DIFFICULTY.HARD:
                state.params = {
                    size: 21,
                    numberOfMines: 99
                }
        }
    },

    setDifficulty({commit, dispatch}, difficulty) {
        commit("setDifficulty", difficulty)
        dispatch("initCells")
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}
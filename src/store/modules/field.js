import {FIELD_MODE, GAME_DIFFICULTY, GAME_STATUS} from "@/helpers/constants";
import {getAroundItems} from "@/helpers/getNearbyItems";

//state
const state = () => ({
    cells: [],
    params: {
        numberOfMines: 10,
        size: 9
    },
    mode: FIELD_MODE.OPEN,
    difficulty: GAME_DIFFICULTY.EASY,
    status: GAME_STATUS.NOT_INIT,

})

//getters
const getters = {
    minedCells(state) {
        return state.cells.filter(cell => cell.isMine)
    },

    cellIndices(state) {
        return state.cells.map((cell) => cell.id)
    },

    flaggedCells(state) {
        return state.cells.filter(cell => cell.flagged)
    },

    openedCells(state) {
        return state.cells.filter(cell => cell.opened)
    },

    flagCount(state, getters) {
        return state.params.numberOfMines - getters.flaggedCells.length;
    },

    isGameWon(state, getters) {
        return getters.openedCells.length === (state.cells.length - state.params.numberOfMines);
    }
}

//mutations
const mutations = {
    setParams(state, params) {
        state.params = params;
    },

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

    toggleMode(state) {
        state.mode = state.mode === FIELD_MODE.OPEN ? FIELD_MODE.FLAG : FIELD_MODE.OPEN;
    },

    setDifficulty(state, difficulty) {
        state.difficulty = difficulty;
    },

    setStatus(state, status) {
        state.status = status;
    }
}

//actions
const actions = {
    //NOT_INIT
    setDifficulty({commit, dispatch}, difficulty) {
        commit("setDifficulty", difficulty)
        dispatch("init")
    },

    setParams({state, commit}) {
        switch (state.difficulty) {
            case GAME_DIFFICULTY.EASY:
                commit("setParams", {
                    numberOfMines: 10,
                    size: 9
                })
                break;
            case GAME_DIFFICULTY.NORMAL:
                commit("setParams", {
                    size: 16,
                    numberOfMines: 40,
                })
                break;
            case GAME_DIFFICULTY.HARD:
                commit("setParams", {
                    size: 21,
                    numberOfMines: 99
                })
        }
    },

    initCells({commit, state}) {
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

    init({dispatch, commit}) {
        commit("setStatus", GAME_STATUS.INIT)
        dispatch("setParams")
        dispatch("initCells")
    },

    //INIT
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

    startGame({dispatch, commit}, cellId) {
        commit("setStatus", GAME_STATUS.STARTED)
        dispatch("initMines", cellId)
    },

    //STARTED
    openCell({state, commit, dispatch, getters}, cell) {
        if (!cell.flagged) {
            commit("openCell", cell)

            if (cell.isMine) {
                dispatch("gameOver")
            }

            if (!cell.minAround) {
                dispatch("openEmptyArea", cell)
            }

            if (getters.isGameWon) {
                dispatch("gameWon")
            }
        }
    },

    flagCell({commit, state, rootState}, cell) {
        if (!cell.opened) {
            commit("toggleFlag", cell)
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

    //LOSING
    gameOver({state, commit}) {
        state.cells.forEach(cell => {
            if (cell.isMine) {
                commit("openCell", cell)
            }
        })

        commit("setStatus", GAME_STATUS.LOSING)
    },

    //WIN
    gameWon({commit}) {
        commit("setStatus", GAME_STATUS.WIN)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}
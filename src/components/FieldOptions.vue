<template>
  <div class="options">
    <button class="icon-btn"
            :class="{
              active: isModeFlag
            }"
            @click="toggleMode">
      <img src="assets/img/icons/red-flag.svg" alt="flag">
    </button>

    <div class="flag-counter">
      {{flagCount}}
    </div>

    <div class="game-difficulty">
      <label class="label">
        <span>Сложность игры:</span>

        <select class="input"
                v-model="difficulty">
          <option :value="GAME_DIFFICULTY.EASY">Легкая</option>
          <option :value="GAME_DIFFICULTY.NORMAL">Нормальная</option>
          <option :value="GAME_DIFFICULTY.HARD">Сложная</option>
        </select>
      </label>

      <button class="btn" @click="setDifficulty(difficulty)">
        Установить
      </button>
    </div>

    <button class="icon-btn"
    @click="init">
      <img src="assets/img/icons/restart.svg" alt="restart">
    </button>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from "vuex"
import {FIELD_MODE, GAME_DIFFICULTY} from "@/helpers/constants";

export default {
  name: "FieldOptions",

  data() {
    return {
      difficulty: GAME_DIFFICULTY.EASY
    }
  },

  computed: {
    ...mapState("field", {
      mode: state => state.mode
    }),
    ...mapGetters("field", ["flagCount"]),


    GAME_DIFFICULTY() {
      return GAME_DIFFICULTY
    },

    isModeFlag() {
      return this.mode === FIELD_MODE.FLAG
    },
  },

  methods: {
    ...mapActions("field", ["setDifficulty", "init"]),
    ...mapMutations("field", ["toggleMode"])
  }
}
</script>

<style scoped>
/* icon-btn */
.icon-btn img {
  width: 24px;
  display: block;
}

.icon-btn {
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 6px;
  border-radius: 3px;
  cursor: pointer;
}

.icon-btn.active {
  background-color: rgba(60, 179, 113, 0.5);
}

.icon-btn:not(.active):hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/*options*/
.options {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.game-difficulty {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/*flag-counter*/
.flag-counter {
  font-weight: 800;
  font-size: 1.4rem;
  color: red;
  border: 2px solid rgba(0, 0, 0, 0.3);
  height: 40px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
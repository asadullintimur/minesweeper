<template>
  <div class="options">
    <button class="icon-btn"
            :class="{
              active: isModeFlag
            }"
            @click="toggleMode">
      <img src="assets/img/icons/red-flag.svg" alt="flag">
    </button>

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

      <button class="btn" @click="setDifficulty(difficulty)">Установить</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex"
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

    isModeFlag() {
      return this.mode === FIELD_MODE.FLAG
    },

    GAME_DIFFICULTY() {
      return GAME_DIFFICULTY
    }
  },


  methods: {
    ...mapActions("field", ["toggleMode", "setDifficulty"])
  }
}
</script>

<style scoped>
/* icon-btn */
.icon-btn img {
  width: 22px;
}

.icon-btn {
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 2px 4px;
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
}

.game-difficulty {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
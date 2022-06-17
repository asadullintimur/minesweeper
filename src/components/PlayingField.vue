<template>
  <div class="field"
       :class="{
    'field-disabled': isGameOver
  }">
    <div class="cells"
         :class="{
          win: isGameWon,
          losing: isGameLosing
         }"
         @click.capture="start">

      <field-cell
          v-for="cell in cells"
          :key="cell.id"
          :cell="cell">
      </field-cell>
    </div>
  </div>

  <div class="game-result"
       v-if="isGameOver">
    <span v-if="isGameWon" class="win">Вы выиграли!</span>
    <span v-if="isGameLosing" class="losing">Вы проиграли!</span>
  </div>

  <field-options>
  </field-options>
</template>

<script>
import FieldCell from "@/components/FieldCell"
import FieldOptions from "@/components/FieldOptions"
import {mapActions, mapState} from "vuex"
import {GAME_STATUS} from "@/helpers/constants";

export default {
  name: "PlayingField",

  components: {
    FieldCell,
    FieldOptions
  },

  computed: {
    ...mapState("field", {
      cells: state => state.cells,
      size: state => state.params.size,
      status: state => state.status
    }),

    isGameOver() {
      return this.isGameLosing || this.isGameWon
    },

    isGameLosing() {
      return this.status === GAME_STATUS.LOSING
    },

    isGameWon() {
      return this.status === GAME_STATUS.WIN
    },

    isGameInit() {
      return this.status === GAME_STATUS.INIT
    }
  },

  methods: {
    ...mapActions("field", ["startGame"]),

    start({target: cellDiv}) {
      if (this.isGameInit) {
        let cellId = cellDiv.dataset.id;

        if (cellId) {
          this.startGame(+cellId)
        }
      }
    }
  },
}
</script>

<style scoped>
.field {
  display: flex;
  justify-content: center;
}

.field-disabled {
  pointer-events: none;
}

/*cells*/
.cells {
  display: inline-grid;
  grid-template-columns: repeat(v-bind(size), 1fr);
  border: 2px solid rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  border-radius: 4px;
}

.cells.win {
  border: 2px solid green;
}

.cells.losing {
  border: 2px solid orangered;
}

/*game-result*/
.game-result {
  text-align: center;
  margin-top: 25px;
  font-weight: 800;
  font-size: 1.3rem;
  margin-bottom: -15px;
}

.game-result .win {
  color: green;
}

.game-result .losing {
  color: orangered;
}
</style>
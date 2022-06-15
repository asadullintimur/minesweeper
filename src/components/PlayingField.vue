<template>
  <div class="field">
    <div class="cells"
         @click.capture.once="startGame">
      <field-cell
          v-for="cell in cells"
          :key="cell.id"
          :cell="cell">
      </field-cell>
    </div>
  </div>

  <field-options>
  </field-options>
</template>

<script>
import FieldCell from "@/components/FieldCell"
import FieldOptions from "@/components/FieldOptions"
import {mapActions, mapState} from "vuex"

export default {
  name: "PlayingField",

  components: {
    FieldCell,
    FieldOptions
  },

  computed: {
    ...mapState("field", {
      cells: state => state.cells,
      size: state => state.params.size
    }),
  },

  methods: {
    ...mapActions("field", ["initMines"]),

    startGame({target: cellDiv}) {
      let cellId = cellDiv.dataset.id;

      if (cellId) {
        this.initMines(+cellId)
      }
    }
  }
}
</script>

<style scoped>
.field {
  display: flex;
  justify-content: center;
}

.cells {
  display: inline-grid;
  grid-template-columns: repeat(v-bind(size), 1fr);
  border: 2px solid rgba(0, 0, 0, 0.3);
  margin: 0 auto;
}
</style>
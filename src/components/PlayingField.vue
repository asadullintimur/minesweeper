<template>
  <div class="field">
    <field-cell
        v-for="(cell, idx) in cells"
        :key="idx"
        v-bind="{
          content: cell,
          idx: idx
        }"
        :class="{
          opened: isCellOpened(idx),
          flag: isCellFlag(idx),
    }"></field-cell>
  </div>

  <field-options>
  </field-options>
</template>

<script>
import FieldCell from "@/components/FieldCell"
import FieldOptions from "@/components/FieldOptions"
import {mapState} from "vuex"

export default {
  name: "PlayingField",

  components: {
    FieldCell,
    FieldOptions
  },

  data() {
    return {}
  },

  computed: {
    ...mapState("field", {
      cells: state => state.cells,
      openedCells: state => state.openedCells,
      flagCells: state => state.flagCells,
    }),
  },

  methods: {
    isCellOpened(idx) {
      return this.openedCells.includes(idx)
    },

    isCellFlag(idx) {
      return this.flagCells.includes(idx)
    }
  }

}
</script>

<style scoped>
.field {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: calc(150px + 2px);
  border: 2px solid rgba(0, 0, 0, 0.3);
  margin: 0 auto;
}
</style>
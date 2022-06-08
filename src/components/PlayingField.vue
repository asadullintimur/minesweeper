<template>
  <div class="field">
    <div class="cells">
      <field-cell
          v-for="(cell, idx) in cells"
          :key="idx"
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
import {mapState} from "vuex"

export default {
  name: "PlayingField",

  components: {
    FieldCell,
    FieldOptions
  },

  computed: {
    ...mapState("field", {
      cells: state => state.cells,
    }),
  },
}
</script>

<style scoped>

.field {
  display: flex;
  justify-content: center;
}

.cells {
  display: inline-grid;
  grid-template-columns: repeat(6, 1fr);
  border: 2px solid rgba(0, 0, 0, 0.3);
  margin: 0 auto;
}
</style>
<template>
  <div class="cell"
       :data-id="cell.id"
       :class="{
          opened: cell.opened,
          flagged: cell.flagged
       }"
       @click="openCell(cell)">

    <template v-if="cell.opened">
        <span v-if="cell.minAround && !cell.isMine">
          {{ cell.minAround }}
        </span>

      <span v-if="cell.isMine">
        *
      </span>
    </template>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "FieldCell",

  props: {
    cell: {
      required: true,
      type: Object,
    }
  },

  methods: {
    ...mapActions("field", [
      "openCell"
    ]),
  }
}
</script>

<style scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: border 0.1s linear;
}

.cell:not(.opened):hover {
  border: 1px solid rgba(0, 0, 0, 0.8);
}

/*opened*/
.cell.opened {
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 1rem;
}

/*flagged*/
.cell.flagged {
  position: relative;
}

.cell.flagged:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: url("/public/assets/img/icons/red-flag.svg") center/70% no-repeat;
}
</style>
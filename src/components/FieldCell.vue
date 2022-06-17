<template>
  <div class="cell"
       :data-id="cell.id"
       :class="{
          opened: cell.opened,
          flagged: cell.flagged,
          mined: cell.isMine && cell.opened,
       }"
       @click="cellClicked(cell)"
        @contextmenu.prevent="flagCell(cell)">

    <template v-if="cell.opened">
       <span v-if="cell.isMine">
          <img src="assets/img/icons/bomb.svg" alt="bomb">
      </span>

      <span v-else-if="cell.minAround"
      :class="`min-around-${cell.minAround}`">
          {{ cell.minAround }}
      </span>
    </template>

    <span v-else-if="cell.flagged">
        <img src="assets/img/icons/red-flag.svg" alt="flag">
    </span>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {FIELD_MODE} from "@/helpers/constants";

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
      "openCell",
      "flagCell"
    ]),

    cellClicked(cell) {
      if (this.mode === FIELD_MODE.OPEN) {
        this.openCell(cell)
      } else {
        this.flagCell(cell)
      }
    }
  },

  computed: {
    ...mapState("field", ["mode"])
  },
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
  font-size: 1.2rem;
  font-weight: 900;
  position: relative;
}

.cell:not(.opened):hover {
  border: 1px solid rgba(0, 0, 0, 0.8);
}

.cell img {
  width: 23px;
  display: block;
}

/*opened*/
.cell.opened {
  background-color: rgba(0, 0, 0, 0.2);
}


/*mined*/
.cell.mined.opened {
  background-color: orangered;
}

/*min-around*/
.min-around-1 {
  color: rgb(0, 0, 255)
}

.min-around-2 {
  color: rgb(0, 128, 0)
}
.min-around-3 {
  color: rgb(255, 0, 0)
}

.min-around-4 {
  color: rgb(0, 0, 128)
}

.min-around-5 {
  color: rgb(128, 0, 0)
}

.min-around-6 {
  color: rgb(0, 128, 128)
}

.min-around-7 {
  color: #840084
}

.min-around-8 {
  color: #757575
}

</style>
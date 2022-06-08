<template>
  <div class="cell"
       @click="openCell(idx)">
    <span v-if="!isCellEmpty">
      {{ content }}
    </span>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "FieldCell",

  props: {
    content: {
      type: [Number, String],
      required: true
    },

    idx: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {}
  },

  computed: {
    isCellEmpty() {
      return this.content === 0;
    },
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
  font-size: 0;
  cursor: pointer;
  transition: border 0.1s linear;
}

.cell:not(.opened):hover {
  border: 1px solid rgba(0, 0, 0, 0.8);
}

.cell.opened {
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 1rem;
}

.cell.flag {
  position: relative;
}

.cell.flag:after {
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
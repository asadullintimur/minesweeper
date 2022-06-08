<template>
  <div class="options">
    <button class="icon-btn"
            :class="{
              active: isModeFlag
            }"
            @click="toggleMode">
      <img src="assets/img/icons/red-flag.svg" alt="flag">
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex"
import {FIELD_MODE} from "@/helpers/constants";

export default {
  name: "FieldOptions",

  computed: {
    ...mapState("field/options", {
      fieldMode: state => state.mode
    }),

    isModeFlag() {
      return this.fieldMode === FIELD_MODE.FLAG
    }
  },

  methods: {
    ...mapActions("field/options", ["toggleMode"])
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
}
</style>
<template>
  <section class="main container">
      <a href="/" class="logo">MineSweeper</a>

    <playing-field>
    </playing-field>
  </section>
</template>

<script>
import PlayingField from "@/components/PlayingField";
import {mapActions} from "vuex";
export default {
  name: "MainComponent",

  components: {
    PlayingField
  },

  methods: {
    ...mapActions("field", ["initCells", "setParams"])
  },

  created() {
    this.initCells()
  }
}
</script>

<style scoped>
.main {
  padding: 60px 0;
}

.logo {
  font-size: 1.4rem;
  display: block;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
}
</style>
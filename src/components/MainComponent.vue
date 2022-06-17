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
    ...mapActions("field", ["init"])
  },

  created() {
    this.init()
  }
}
</script>

<style scoped>
.main {
  padding: 60px 20px;
}

.logo {
  font-size: 1.4rem;
  display: block;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
}
</style>
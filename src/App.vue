<template>
  <main-component></main-component>
</template>


<script>
import MainComponent from "@/components/MainComponent";

export default {
  components: {
    MainComponent
  }
}
</script>

<style>
/*
Общие стили
*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

a {
  text-decoration: none;
  color: #000;
}
</style>

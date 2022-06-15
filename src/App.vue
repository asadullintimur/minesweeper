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

/*label*/
.label {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.label span {
  font-size: 0.9rem;
  opacity: 0.7;
}

/*input*/
.input {
  padding: 7px;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  transition: 0.2s linear box-shadow;
  outline: none;
}

.input:focus {
  box-shadow: 0 0 0 2px mediumseagreen;
}

/*btn*/
.btn {
  padding: 7px;
  border-radius: 4px;
  background-color: mediumseagreen;
  color: #fff;
  border: none;
  font-size: 1rem;
  transition: 0.2s linear background-color;
  cursor: pointer;
}

.btn:hover {
  background-color: #318d5d;
}
</style>

<template>
  <div class="container">
      <slot></slot>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  const isContainer=ref(true);
</script>

<style lang="scss" scoped>
.container{
  height: 100%;
}
</style>
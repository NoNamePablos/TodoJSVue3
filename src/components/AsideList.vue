<template>
  <div class="todo-aside">
    <div class="todo-aside__controls">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" >
.todo-aside{
  background-color: $lightgrey;
  padding: 50px 20px;
  &__controls{
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  &__folders{
    display: flex;
    flex-direction: column;
  }
  &__add{
    position: relative;
  }
}
</style>
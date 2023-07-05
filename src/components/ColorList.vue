<template>
  <div class="color-list">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.color-list{
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  list-style: none;
}
</style>
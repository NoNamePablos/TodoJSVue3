<template>
  <div class="item-popup">
      <div class="item-popup__btn" @click="">
        <slot name="triggerItem"></slot>
      </div>
      <div class="item-popup__popup">
        <slot name="popup"></slot>
      </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .item-popup{
    position: relative;
    &__popup{
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
</style>
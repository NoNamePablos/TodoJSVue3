<template>
  <div :class="['empty-item',`empty-item--${size}`]">
    {{text}}
  </div>
</template>

<script setup>
  defineProps({
    text:{
      type:String,
      required:false,
      default:'Пожалуйста добавьте элемент!'
    },
    size:{
      type:String,
      required:false,
      default:'default'
    }
  })
</script>

<style lang="scss" scoped>
  .empty-item{
    padding: 25px 20px;
    border-radius: 8px;
    background-color: aliceblue;
    border: 1px solid #b5dcff;
    color: #335777;
    &--small{
      padding: 15px 10px;
    }
  }
</style>
<template>
  <button :class="['button-icon',`button-icon--${type}`,`button-icon-size--${size}`]">
    <i class="button-icon__ico"><slot></slot></i>
    <span v-if="title">{{title}}</span>
  </button>
</template>

<script setup>
defineProps({
  type:{
    type:String,
    required:false,
    default:'default'
  },
  size:{
    type:String,
    required:false,
    default:'default'
  },
  title:{
    type:String,
    required:false,

  },
})
</script>

<style lang="scss" scoped>
  .button-icon{
    padding: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    gap: 5px;
    cursor: pointer;
    &:hover{
      opacity: 0.8;
      transition: all 0.3s ease-in-out;
    }
    &--transparent{
      background-color: transparent;
    }
  }
</style>
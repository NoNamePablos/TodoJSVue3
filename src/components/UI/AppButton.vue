<template>
  <button :class="['button',`button--${type}`,`button-size--${size}`]">
      <span>{{title}}</span>
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
    .button{
      padding: 10px 20px;
      display: flex;
      align-items: center;
      font-family: $font;
      width: max-content;
      background: #F4F6F8;
      border-radius: 4px;
      &:hover{
        transition: all 0.3s ease-in-out;
        opacity: 0.8;
      }
      & span{
        width: 100%;
        text-align: center;
        color: #9C9C9C;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.15px;
      }
      &-size{
        &--full{
          width: 100%;
        }
      }
      &--cancel{
        background-color: #F4F6F8;
        & span{
          color: #9C9C9C;
        }
      }
      &--success{
        background:$green;
        & span{
          color: $white;
        }
      }
    }
</style>
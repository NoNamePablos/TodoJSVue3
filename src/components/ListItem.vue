<template>
  <button :class="['list-item',{'selected':selected},`list-item-size--${size}`]">
    <span class="list-item__color" :style="{backgroundColor:color}" v-if="!isIcon"></span>
    <span class="list-item__icon" v-else>
      <slot name="icon"></slot>
    </span>
    <span>{{ folderTitle }}</span>
    <span class="list-item__delete" v-if="isRemovable"></span>
  </button>
</template>

<script setup>
import {computed, onMounted, ref, toRef, watch} from "vue";
import {getColor} from "@/data/data";
  const props=defineProps({
    folderColor:{
      type:Number,
      required:false,
    },
    folderTitle:{
      type:String,
      required:true,
    },
    selected:{
      type:Boolean,
      required:false,
      default:false,
    },
    isRemovable:{
      type:Boolean,
      required:false,
      default:true,
    },
    isIcon:{
      type:Boolean,
      required:false,
      default:false,
    },
    size:{
      type:String,
      required:false,
      default:'default'
    }
  })
  const color=ref('');
  onMounted(()=>{
    if(props.folderColor){
        color.value=getColor(props.folderColor).hex;
    }
  })
</script>

<style lang="scss" scoped>
.list-item{
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: transparent;
  font-size: 14px;
  font-family: $font;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  &-size{
    &--full{
      width: 100%;
    }
  }
  &.selected{
    background-color: $white;
    border-radius: 4px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease-in-out;
    .list-item__delete{
      opacity: 1;
      visibility: visible;
    }
  }
  &:hover{
    background-color: $white;
    border-radius: 4px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease-in-out;
  }
  &__icon{
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
  }
  &__delete{
    width: 14px;
    height: 14px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background-color: blue;
    opacity: 0;
    visibility: hidden;
  }
  &__color{
    font-style: normal;  width: 10px;
    font-weight: 400;  height: 10px;
    line-height: normal;  border-radius: 100%;
    letter-spacing: 0.15px;  flex: 0 0 10px;
  }
}
</style>
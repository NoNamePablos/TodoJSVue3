<template>
  <button :class="['list-item',{'selected':selected},`list-item-size--${size}`]">
    <span class="list-item__color" :style="{backgroundColor:color}" v-if="!isIcon"></span>
    <span class="list-item__icon" v-else>
      <slot name="icon"></slot>
    </span>
    <span>{{ folderTitle }}</span>
    <div class="list-item__delete" v-if="isRemovable&&folderID" @click="$emit('delete',folderID)" >
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z" fill="#E3E3E3"/>
      </svg>
    </div>
  </button>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {getColor} from "@/data/data";

const emit=defineEmits(['delete'])
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
    folderId:{
      type:Number,
      required:false,
    },
    size:{
      type:String,
      required:false,
      default:'default'
    }
  })
  const folderID=computed(()=>props.folderId,()=>props.folderId);
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
    width: 16px;
    height: 16px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    visibility: hidden;
  }
  &__color{
    font-style: normal;
    width: 10px;
    font-weight: 400;
    height: 10px;
    line-height: normal;
    border-radius: 100%;
    letter-spacing: 0.15px;
    flex: 0 0 10px;
  }
}
</style>
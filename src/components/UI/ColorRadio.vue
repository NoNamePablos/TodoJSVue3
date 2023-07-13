<template>
  <div class="color-radio">
    <label>
      <input type="radio"
             :name="name"
             :checked="isChecked"
             @change="updateValue($event.target.value)"
             :value="value">
      <div class="color-radio__radio" :style="{backgroundColor:color}"></div>
    </label>
  </div>
</template>

<script setup>
  import {computed} from "vue";

  const props=defineProps({
    modelValue:{
      type:String,
      required:true,
    },
    name:{
      type:String,
      required:true,
    },
    value:{
      type:String,
      required:true,
    },
    color:{
      type:String,
      required:true,
    },
    defaultCheck:{
      type:Boolean,
      required:false,
    }
  })
  const emit=defineEmits(['update:modelValue']);
  const updateValue=(value)=>{
    emit('update:modelValue',value);
  }
  const isChecked = computed(() => {
      if(props.defaultCheck){
        updateValue(props.value);
        return true;
      }
    return props.modelValue === props.value;
  });
</script>

<style lang="scss" scoped>
  .color-radio{
    cursor: pointer;
    & input{
      width: 1px;
      height: 1px;
      opacity: 0;
      visibility: hidden;
      position: fixed;
      left: -9999px;
      top: -9999px;
      z-index: -100;
      appearance: none;
      &:checked~.color-radio__radio{
        border:2px solid #525252;
      }
    }
    &__radio{
      width: 20px;
      height: 20px;
      border-radius: 100%;
      border:2px solid transparent;
      cursor: pointer;
    }
  }
</style>

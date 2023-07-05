<template>
  <div class="custom-input">
    <input type="text" :placeholder="label" :value="value" @input="updateValue($event.target.value)">
  </div>
</template>

<script setup>
  defineProps({
    label:{
      type:String,
      required:false,
    },
    value:{
      type:String,
      required:false,
    },
    isBig:{
      type:Boolean,
      required:false,
    }
  })

  const emit=defineEmits(['update:modelValue']);
  const updateValue=(value)=>{
    emit('update:modelValue',value);
  }
</script>

<style lang="scss" scoped>

  .custom-input{
    width: 100%;
    & input{
      padding: 8px 10px;
      width: 100%;
      appearance: none;
      outline: none;
      border-radius: 4px;
      border: 1px solid #EFEFEF;
      background: $white;
      font-size: 14px;
      font-family: $font;
      font-style: normal;
      font-weight: 600;
      color: #C7C7C7;
      line-height: normal;
      letter-spacing: 0.15px;
      &:placeholder-shown,&::placeholder{
        color: #C7C7C7;
      }
    }
  }
</style>
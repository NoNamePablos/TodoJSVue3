<template>
  <div class="custom-checkbox">
    <label>
      <div class="custom-checkbox__checkbox">
      <input type="checkbox"
             :checked="isChecked"

      >
      <div class="custom-checkbox__fake"></div>
      </div>
      <div class="custom-checkbox__text">{{text}}</div>
    </label>
  </div>
</template>

<script setup>
  import {computed} from "vue";
  import App from "@/App.vue";

const props= defineProps({
    text:{
      type:String,
      required:false,
    },
    modelValue:{
      type:Boolean,
      required:false,
    },
    defaultCheck:{
      type:Boolean,
      required:false,
    }
  })
  const emit=defineEmits(['update:modelValue']);
  const updateValue=(event)=>{
    console.log("before: ",isChecked.value);
    isChecked.value=event.target.checked;
    console.log("after: ",isChecked.value);
    emit('update:modelValue',isChecked.value);
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
    .custom-checkbox{
      &__checkbox{

      }
      &__fake{
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: 2px solid #E8E8E8;
        position: relative;
        &:after{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          content: "";
          width: 20px;
          height: 20px;
          opacity: 0;
          background-repeat: no-repeat;
          background-position: center;
          transition: all 0.3s ease-in-out;
        }
      }
      & input{
        opacity: 0;
        visibility: hidden;
        appearance: none;
        width: 1px;
        height: 1px;
        position: fixed;
        left: -9999px;
        top: -9999px;
        z-index: -100;
        &:checked{
          &~.custom-checkbox__fake{
            &:after{
              opacity: 1;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Ccircle cx='10' cy='10' r='9' fill='%234DD599' stroke='%234DD599' stroke-width='2'/%3E%3Cpath d='M14.3 7.20001L8.79999 12.7L6.29999 10.2' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
          }
        }
      }
      &:hover{
        & input:not(:checked){
          &~.custom-checkbox__fake{
            border: none;
            background-color: transparent;
            &:after{
              opacity: 1;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Ccircle cx='10' cy='10' r='9' fill='%23F2F2F2' stroke='%23F2F2F2' stroke-width='2'/%3E%3Cpath d='M14.3 7.20001L8.79999 12.7L6.29999 10.2' stroke='%23B3B3B3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
          }
        }
      }
      & label{
        display: flex;
        align-items: center;
        gap: 15px;
      }
    }
</style>
<template>
  <form class="form-task" @submit.prevent>
    <AppInput v-model="textTask" size="big" v-focus :value="textTask" label="Текст задачи"  />
    <div class="form-task__row">
      <AppButton title="Добавить задачу" type="success" @click="add"  />
      <AppButton title="Отмена" type="cancel" @click="cancel"/>
    </div>
  </form>
</template>

<script setup>
import {ref} from "vue";
const textTask=ref("");
const emit=defineEmits(['close','addTask'])
const cancel=()=>{
  emit('close',true);
}
const add=()=>{
  if(textTask.value!==""){
    emit('addTask',textTask.value)
    textTask.value="";
  }
}
</script>

<style lang="scss" scoped>
.form-task{
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__row{
    display: flex;
    gap: 5px;
    align-items: center;
  }
}
</style>
<template>
  <form class="form-task" @submit.prevent>
    <AppInput v-model="textTask" :value="textTask" label="Текст задачи" />
    <div class="form-task__row">
      <AppButton title="Добавить задачу" type="success" @click="add"  />
      <AppButton title="Отмена" type="cancel" @click="cancel"/>
    </div>
  </form>
</template>

<script setup>
import {ref} from "vue";
import AppButton from "@/components/UI/AppButton.vue";
import AppInput from "@/components/UI/AppInput.vue";
const textTask=ref("");
const emit=defineEmits(['close','addTask'])
const cancel=()=>{
  emit('close',true);
}
const add=()=>{
  emit('addTask',textTask.value)
  textTask.value="";
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
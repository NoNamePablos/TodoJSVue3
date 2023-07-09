<template>
  <div class="page">
    <div class="page-title">
      <div class="page-title__container">
        <div :class="['page-title__edited',{'page-title__edited--full':titleEditing}]">
          <h1 v-if="!titleEditing">{{pageName}}</h1>
          <AppInput v-else v-model="pageName" :value="pageName" label="Название папки" />
        </div>
        <AppButtonIcon type="transparent" @click="editTitle">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 15 15" fill="none">
            <path d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z" fill="#DFDFDF"/>
          </svg>
        </AppButtonIcon>
      </div>
    </div>
    <div class="page-list">
      <div class="todo-list"  v-if="taskList.length>0">
        <TodoItem v-for="item in taskList" :item="item" />
      </div>
      <div class="todo-empty" v-else>
        Пока задач нет!
      </div>
    </div>
    <div class="page-form">
      <ListItem :folder-title="'Добавить задачу'"  @click="openForm" :is-removable="false" :is-icon="true" v-if="!isOpenForm">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 6H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </ListItem>
      <FormTask @close="(value)=>{closeFrom()}" v-else/>
    </div>
  </div>
</template>

<script setup>

import AppButtonIcon from "@/components/UI/AppButtonIcon.vue";
import AppInput from "@/components/UI/AppInput.vue";
import ListItem from "@/components/ListItem.vue";
import {computed, onBeforeUpdate, onMounted, onUpdated, ref,} from "vue";
import TodoItem from "@/components/TodoItem.vue";
import FormTask from "@/components/Forms/FormTask.vue";
import {useRoute} from "vue-router";
import {useFolderStore, useTodoStore} from "@/stores/counter";

const taskList=ref([]);
const todoList=useTodoStore();
const folderList=useFolderStore();
const folder=ref(null);
const route=useRoute();
const pageName=ref('Фронтенд');
const titleEditing=ref(false);
const isOpenForm=ref(false);
const currentRouteId = ref(null);
const openForm=()=>{
  isOpenForm.value=true;
}
const closeFrom=()=>{
  isOpenForm.value=false;
}

const editTitle=()=>{
  titleEditing.value=!titleEditing.value;
}
onBeforeUpdate(()=>{
  currentRouteId.value=route.params.id;
  initPage();
})
const initPage=()=>{
  folder.value=folderList.getFolderById(Number(currentRouteId.value));
  pageName.value=folder.value.folderTitle;
  taskList.value=todoList.getTodoListById(folder.value.id);
}

onMounted(()=>{
  currentRouteId.value=route.params.id;
  if(currentRouteId.value){
    initPage();
  }else{
    console.log("all");
  }
})
</script>

<style lang="scss" scoped>

.page{
  color: $black;
  font-family: $font;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.page-list{
  padding: 30px 0;
}
.todo-list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.page-title{
  font-family: $font;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 20px;
  border-bottom: 1px solid #F2F2F2;
  &__edited{
    &--full{
      width: 100%;
    }
  }
  &__container{
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
}
</style>
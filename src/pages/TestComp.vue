<template>
  <div class="page">
      <div class="page__wrapper" v-if="!isEmpty">
        <PageTitle @change-title="changeTitle" :title="pageName"/>
        <div class="page-list" >
          <div class="todo-list"  v-if="taskList.length>0">
            <TodoItem v-for="item in taskList" @checked="changeCompleteStatus" @remove="removeTask" :item="item" />
          </div>
          <div class="todo-empty" v-else>
            Пока задач нет!
          </div>
        </div>
        <div class="page-form" >
          <ListItem :folder-title="'Добавить задачу'"  @click="openForm" :is-removable="false" :is-icon="true" v-if="!isOpenForm">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 6H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </ListItem>
          <FormTask @close="(value)=>{closeFrom()}"  @add-task="appendTask" v-else/>
        </div>
      </div>
      <div class="page-empty" v-else>Добавьте пожалуйста папку)</div>
  </div>
</template>

<script setup>

//TODO Пустой компонент todo-empty,page-empty вынести в отдельный компонент

import {computed, onBeforeMount, onBeforeUpdate, ref,} from "vue";
import ListItem from "@/components/ListItem.vue";
import TodoItem from "@/components/TodoItem.vue";
import FormTask from "@/components/Forms/FormTask.vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {useFolderStore, useTodoStore} from "@/stores/counter";
import {router} from "@/router/router";
import PageTitle from "@/components/page/PageTitle.vue";

onBeforeRouteUpdate((to,from,next)=>{
  isOpenForm.value=false;
  if (folderList.getFolderList.length === 0) {
    next('/');
  } else {
    next();
  }
});

const isEmpty=ref(false);
const taskList=ref([]);
const todoList=useTodoStore();
const folderList=useFolderStore();
const folder=ref(null);
const route=useRoute();
const pageName=ref('Фронтенд');
const isOpenForm=ref(false);
const currentRouteId = ref(null);

const removeTask=(value)=>{
  taskList.value=todoList.removeTodoItemById(value.id);
}
const changeTitle=(value)=>{
  pageName.value=folderList.setTitle(Number(currentRouteId.value),value).folderTitle;
}
const changeCompleteStatus=(value)=>{
  todoList.completedTask(value.id,value.isCompleted);
}
const openForm=()=>{
  isOpenForm.value=true;
}
const closeFrom=()=>{
  isOpenForm.value=false;
}
const initPage=()=>{
  if(route.params.id){
    try {
      currentRouteId.value=route.params.id;
      folder.value=folderList.getFolderActive;
      console.log("folder.val: ",folder.value);
        pageName.value=folder.value.folderTitle;
        taskList.value=todoList.getTodoListById(folder.value.id);
        isEmpty.value=false;
    }catch (e) {
      console.log(e);
    }
  }else{
    isEmpty.value=true;
  }



}
const appendTask=(value)=>{
    taskList.value=todoList.appendTask(folder.value.id,value);
}
onBeforeUpdate(()=>{
  initPage();
})
onBeforeMount(()=>{
  router.push(`/${folderList.getFolderActive.id}`);
  initPage();
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
</style>
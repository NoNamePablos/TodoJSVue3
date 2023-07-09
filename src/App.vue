<script setup>
import AppLayout from "@/components/AppLayout.vue";
import ListItem from "@/components/ListItem.vue";
import AsideList from "@/components/AsideList.vue";
import FolderForm from "@/components/FolderForm.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import {onMounted, ref} from "vue";
import BasePage from "@/pages/BasePage.vue";
import {useFolderStore} from "@/stores/counter";
import {router} from "@/router/router";
const folderList=useFolderStore();
const addToFolder=(value)=>{
  folderList.$patch((state)=>{
    state.folders.push(value);
  })
}
const modalSticky=ref(null);

const openModal=()=>{
  modalSticky.value.open();
}
const redirectingPage=(value)=>{
  router.push(`/${value}`);
}


</script>

<template>
  <AppLayout>
      <div class="todo">
        <AsideList>
          <ListItem :folder-title="'Все задачи'" :is-removable="false" :is-icon="true" >
            <template #icon>
              <img src="./assets/img/entypo-list.svg" alt="">
            </template>
          </ListItem>
          <div class="todo-aside__folders">
            <ListItem v-for="item in folderList.getFolderList" @click="redirectingPage(item.id)" :id="item.id"  :folder-color="item.folderColorID" :folder-title="item.folderTitle" :selected="item?.selected"/>
          </div>
          <div class="todo-aside__add">
            <ListItem :folder-title="'Добавить папку'" size="full"  @click="openModal" :is-removable="false" :is-icon="true">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1 6H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>
            </ListItem>
            <ModalDialog selector=".todo-aside__add" ref="modalSticky" position="sticky">
              <FolderForm @append-folder="addToFolder" />
            </ModalDialog>
          </div>
        </AsideList>
        <div class="todo-content">
          <router-view></router-view>
        </div>
      </div>
  </AppLayout>
</template>

<style scoped lang="scss">
    .todo{
      display: grid;
      grid-template-columns: 300px 1fr;
    }

    .todo-content{
      padding: 55px;
    }


</style>

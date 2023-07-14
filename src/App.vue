<script setup>
import {ref} from "vue";
import {useFolderStore} from "@/stores/counter";
import {router} from "@/router/router";
import ListItem from "@/components/ListItem.vue";
import AsideList from "@/components/AsideList.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import FormFolder from "@/components/Forms/FormFolder.vue";
import PageEmpty from "@/components/page/PageEmpty.vue";

const folderList=useFolderStore();
const addToFolder=(value)=>{
  folderList.$patch((state)=>{
    state.folders.push(value);
  })
  redirectingPage(folderList.getFolderLastAdded.id);
}
const modalSticky=ref(null);

const openModal=()=>{
  modalSticky.value.open();
}
const redirectingPage=(value)=>{
  folderList.setActiveFolder(Number(value));
  router.push(`/${Number(value)}`);
}

const removeFolder=(value)=>{
  folderList.removeFolderById(value);
  if(folderList.getFolderList.length>0){
    redirectingPage(folderList.getFolderList[0].id);
  }else{
    router.push(`/`);
  }

}
</script>

<template>
  <AppLayout>
      <div class="todo">
        <AsideList>
          <div class="todo-aside__folders">
            <ListItem v-if="folderList.getFolderLength>0"  v-for="item in folderList.getFolderList" @delete="removeFolder"  @click="redirectingPage(item.id)" :key="item.id"  :folder-color="item.folderColorID" :folder-id="item.id" :folder-title="item.folderTitle" :selected="item?.selected"/>
            <PageEmpty text="Добавить пожалуйста папку!" size="small" v-else />
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

            <ModalDialog selector=".todo-aside__add" title="Добавить папку" ref="modalSticky" position="sticky">
              <FormFolder @append-folder="addToFolder" />
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
      height: 100%;
    }
    .todo-content{
      padding: 55px;
    }
</style>

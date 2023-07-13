<template>
  <form class="folder-form" @submit.prevent="onSubmit">
    <AppInput v-model="folderTitle" :value="folderTitle" label="Название папки" />
    <ColorList>
      <ColorRadio v-for="color in ColorTypeList"
                  v-model="colorFolder"
                  :id="color.id"
                  :color="color.hex"
                  :value="color.id.toString()"
                  :name="'color'"
                  :default-check="color.isChecked"
      />
    </ColorList>
    <AppButton title="Добавить папку" type="success" size="full"  />
  </form>
</template>

<script setup>
import AppInput from "@/components/UI/AppInput.vue";
import ColorList from "@/components/ColorList.vue";
import ColorRadio from "@/components/UI/ColorRadio.vue";
import AppButton from "@/components/UI/AppButton.vue";
import {ref, watch} from "vue";
import {ColorTypeList, foldersList} from "@/data/data";
import {useFolderStore} from "@/stores/counter";
const colorFolder=ref("");
const folderTitle=ref("");
const folderColorID=ref(-1);
watch(colorFolder,(newValue,oldValue)=>{
  folderColorID.value= +newValue;
})
const emit=defineEmits(['appendFolder']);
const folderList=useFolderStore();
const onSubmit=()=>{
    if(folderTitle.value!==""){
      emit('appendFolder',{
        id:folderList.getFolderLength+1,
        folderColorID:folderColorID.value,
        folderTitle:folderTitle.value,
        isRemovable:true,
      });
      folderTitle.value="";
    }
}
</script>

<style lang="scss" scoped>
.folder-form{
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
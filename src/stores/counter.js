import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state:()=>({
    todos:[
      {
        id:1,
        folderID:1,
        description:"Изучить JavaScript",
        isCompleted:true,
      },
      {
        id:2,
        folderID:1,
        description:"Изучить JavaScript 2",
        isCompleted:false,
      },
      {
        id:3,
        folderID:1,
        description:"Изучить JavaScript 3",
        isCompleted:false,
      },
      {
        id:4,
        folderID:1,
        description:"Изучить JavaScript 4",
        isCompleted:false,
      }
    ]
  }),
  getters:{
    getTodoList:(state)=>state.todos,
    getTodoListById:(state)=>{
      return (folderId)=>state.todos.filter((todo)=>{
        return todo.folderID==folderId;
      })
    }
  }
})
export  const useFolderStore=defineStore('folder',{
  state:()=>({
    folders:
    [
    {
      id:1,
      folderColorID:1,
      folderTitle:'Покупки',
      isRemovable:true,
      selected:true,
    },
    {
      id:2,
      folderColorID:2,
      folderTitle:'Фронтенд',
      isRemovable:true,
      selected:false,
    },
    {
      id:3,
      folderColorID:3,
      folderTitle:'Фильмы и сериалы',
      isRemovable:true,
      selected:false,

    },
    {
      id:4,
      folderColorID:4,
      folderTitle:'Книги',
      isRemovable:true,
      selected:false,

    },
    {
      id:5,
      folderColorID:5,
      folderTitle:'Личное',
      isRemovable:true,
      selected:false,
      }
    ],
  }),
  getters: {
    getFolderList:(state)=>state.folders,
    getFolderLength:(state)=>state.folders.length,
    getFolderById:(state)=>{
      return (folderId)=>state.folders.find((folder)=>folder.id===folderId)
    },

  },
  actions:{
    setActiveFolder(id){
      console.log("call id",id);
      this.getFolderList.map((item)=>{
        item.selected=false;
        return item;
      })
      this.getFolderById(id).selected=true;
    }
  }
})
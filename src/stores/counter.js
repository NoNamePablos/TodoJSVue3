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
      },
      {
        id:5,
        folderID:2,
        description:"Изучить JavaScript 5",
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
    },
    getTodoItemById:(state)=>{
      return(todoId)=>state.todos.find((todo)=>{
        return todo.id===todoId;
      })
    }
  },
  actions:{
    removeTodoListById(id){
      console.log("id: ",id);
     this.todos= this.getTodoList.filter(item=>{
        return item.folderID!==id;
      });
      console.log("this todos: ",this.todos);
    },
    removeTodoItemById(id){
      const indx = this.getTodoList.findIndex(v => v.id === id);
      this.getTodoList.splice(indx, indx >= 0 ? 1 : 0);
      return this.getTodoList;
    },

    appendTask(id,value){
      this.getTodoList.push(
          {
            id:this.getTodoList.length+1,
            folderID:id,
            description:value,
            isCompleted:false,
          }
      )
      return this.getTodoList;
    },
    completedTask(id,status){
      this.getTodoItemById(id).isCompleted=status;
      console.log("id item: ",id);
      console.log("item changed: ",this.getTodoItemById(id));
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
      try {
        if (!this.getFolderById(id)) return;
        this.getFolderList.map((item)=>{
          item.selected=false;
          return item;
        })
        this.getFolderById(id).selected=true;
      }catch (e){
        console.log(e)
      }
    },
    setTitle(id,title){
      try {
        if (!this.getFolderById(id)) return;
        const item=this.getFolderList.find((item)=> item.id===id);
        item.folderTitle=title;
        return item;
      }catch (e){
        console.log(e)
      }
    },
    removeFolderById(id){
      const todoStore = useTodoStore();
      const indx = this.getFolderList.findIndex(v => v.id === id);
      todoStore.removeTodoListById(id);
      this.getFolderList.splice(indx, indx >= 0 ? 1 : 0);
    }
  }
})
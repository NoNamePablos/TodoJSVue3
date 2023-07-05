import {ref} from "vue";

export const ColorTypeList=ref([
    {
        id:1,
        hex:"#42B883"
    },
    {
        id:2,
        hex:"#64C4ED"
    },
    {
        id:3,
        hex:"#C9D1D3"
    },
    {
        id:4,
        hex:"#FFBBCC"
    },
    {
        id:5,
        hex:"#B6E6BD"
    },
    {
        id:6,
        hex:"#C355F5"
    },
    {
        id:7,
        hex:"#09011A"
    },
    {
        id:8,
        hex:"#FF6464",
        isChecked:true,
    },
])

export const getColor=(id)=>{
    return ColorTypeList.value.find(item=>item.id===id);
}

export const foldersList=ref([{
    id:1,
    folderColorID:1,
    folderTitle:'Покупки',
    isRemovable:true,
    selected:true,
},{
    id:2,
    folderColorID:2,
    folderTitle:'Фронтенд',
    isRemovable:true,
},{
    id:3,
    folderColorID:3,
    folderTitle:'Фильмы и сериалы',
    isRemovable:true,
},{
    id:4,
    folderColorID:4,
    folderTitle:'Книги',
    isRemovable:true,
},{
    id:5,
    folderColorID:5,
    folderTitle:'Личное',
    isRemovable:true,
}]);


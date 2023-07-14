<script setup>
import AsideList from "@/components/AsideList.vue";


</script>

<template>
  <AppLayout>
      <div class="todo">
        <AsideList />
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

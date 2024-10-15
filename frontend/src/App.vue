<script setup lang="ts">
import TitleComponent from './components/TitleComponent.vue';
import TaskInputComponent from './components/TaskInputComponent.vue';
import TaskItemComponent from './components/TaskItemComponent.vue';
import { useTaskManager } from './composables/useTaskManager';

const {
  tasks,
  editingIndex,
  addNewTask,
  deleteTask,
  saveTask,
  startEditing,
  cancelEditing
} = useTaskManager();
</script>



<template>
  <div class="main-container">
    <TitleComponent>Todoリスト</TitleComponent>
    <TaskInputComponent :addButtonPushed="addNewTask" @onNewTaskFocus="cancelEditing"/>
    <ul>
      <TaskItemComponent
        v-for="(taskData, index) in tasks"
        :key="index"
        :task="taskData.task"
        :index="index"
        :isEditing="editingIndex === index"
        @deleteTask="deleteTask"
        @saveTask="saveTask"
        @startEditing="startEditing"
        @cancelEditing="cancelEditing"
      />
    </ul>
  </div>
</template>
<!-- isEditing プロパティを true または false のブール値で子コンポーネントに渡し,子コンポーネントは、props を通じてこの値を受け取る。 -->



<style>
.main-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

ul {
  padding: 0;
}
</style>

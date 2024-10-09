<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TitleComponent from './components/TitleComponent.vue';
import TaskInputComponent from './components/TaskInputComponent.vue';
import TaskItemComponent from './components/TaskItemComponent.vue';

const tasks = ref<string[]>([]);
const editingIndex = ref<number | null>(null);

const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
};

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

const addNewTask = (task: string) => {
  tasks.value.push(task);
  saveTasks();
};

const deleteTask = (index: number) => {
  tasks.value.splice(index, 1);
  if (editingIndex.value !== null && editingIndex.value > index) {
    editingIndex.value--;
  } else if (editingIndex.value === index) {
    editingIndex.value = null;
  }
  saveTasks();
};

const saveTask = (index: number, task: string) => {
  tasks.value[index] = task;
  editingIndex.value = null;
  saveTasks();
};

const startEditing = (index: number) => {
  editingIndex.value = index;
};

const cancelEditing = () => {
  editingIndex.value = null;
};

onMounted(() => {
  loadTasks();
});
</script>



<template>
  <div class="main-container">
    <TitleComponent>Todoリスト</TitleComponent>
    <TaskInputComponent :addButtonPushed="addNewTask" @onNewTaskFocus="cancelEditing"/>
    <ul>
      <TaskItemComponent
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TitleComponent from './components/TitleComponent.vue';
import TaskInputComponent from './components/TaskInputComponent.vue';
import TaskItemComponent from './components/TaskItemComponent.vue';
import axios from 'axios';

interface Task {
  id: number;
  task: string;
}

const tasks = ref<Task[]>([]);
const editingIndex = ref<number | null>(null);

const loadTasks = async () => {
  try {
    const response = await axios.get<Task[]>('http://localhost:3000/task');
    tasks.value = response.data;
  } catch (error) {
    console.error('タスクの取得に失敗しました:', error);
  }
};

const addNewTask = async (task: string) => {
  try {
    const response = await axios.post<Task>('http://localhost:3000/task', { task });
    tasks.value.push(response.data); // 新しいタスクをリストに追加
  } catch (error) {
    console.error('タスクの追加に失敗しました:', error);
  }
};

const deleteTask = async (index: number) => {
  try {
    const taskToDelete = tasks.value[index];
    await axios.delete(`http://localhost:3000/task/${taskToDelete.id}`); // タスクIDで削除
    tasks.value.splice(index, 1); // UI上でもタスクを削除
    if (editingIndex.value !== null && editingIndex.value > index) {
      editingIndex.value--;
    } else if (editingIndex.value === index) {
      editingIndex.value = null;
    }
  } catch (error) {
    console.error('タスクの削除に失敗しました:', error);
  }
};

const saveTask = async (index: number, task: string) => {
  try {
    const taskToUpdate = tasks.value[index];
    await axios.patch(`http://localhost:3000/task/${taskToUpdate.id}`, { task });
    tasks.value[index].task = task; // UI上でタスクを更新
    editingIndex.value = null;
  } catch (error) {
    console.error('タスクの更新に失敗しました:', error);
  }
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
        :task="task.task"
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

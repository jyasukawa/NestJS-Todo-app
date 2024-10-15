import { onMounted, ref } from "vue";
import axios from 'axios';

interface Task {
    id: number;
    task: string;
}

export function useTaskManager() {
    const tasks = ref<Task[]>([]);
    const editingIndex = ref<number | null>(null);

    const loadTasks = async () => {
        try {
            const response = await axios.get<Task[]>('/task');
            tasks.value = response.data;
        } catch (error) {
            console.error('タスクの取得に失敗しました:', error);
        }
    };

    const addNewTask = async (task: string) => {
        try {
            const response = await axios.post<Task>('/task', { task });
            tasks.value.push(response.data); // 新しいタスクをリストに追加
        } catch (error) {
            console.error('タスクの追加に失敗しました:', error);
        }
    };

    const deleteTask = async (index: number) => {
        try {
            const taskToDelete = tasks.value[index];
            await axios.delete(`/task/${taskToDelete.id}`); // タスクIDで削除
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
            await axios.patch(`/task/${taskToUpdate.id}`, { task });
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

    return {
        tasks,
        editingIndex,
        addNewTask,
        deleteTask,
        saveTask,
        startEditing,
        cancelEditing
    };
}

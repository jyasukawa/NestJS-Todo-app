<script setup lang="ts">
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

const props = defineProps<{
    task: string
    index: number
    isEditing: boolean
}>();

const emit = defineEmits<{
    (e: 'deleteTask', index: number): void
    (e: 'saveTask', index: number, task: string): void
    (e: 'startEditing', index: number): void
    (e: 'cancelEditing'): void
}>();

const editTask = ref(props.task);

// watch(() => props.task, (newTask) => {
//     editTask.value = newTask;
// });
//props.task が変更されるたびに、watch がコールバック関数を実行。
//(newTask) => { editTask.value = newTask; }（コールバック関数）

const saveTask = () => {
    if (editTask.value.trim()) {
        emit('saveTask', props.index, editTask.value.trim());
    } else {
        alert('タスク内容が空です。入力してください。');
    }
};

const handleDelete = () => {
    if (props.isEditing) {
        emit('cancelEditing');
    }
    emit('deleteTask', props.index);
};

const update = () => {
    editTask.value = props.task;
};
</script>



<template>
    <li>
        <span v-if="!isEditing">{{ task }}</span>
        <input v-else type="text" v-model="editTask">
        <ButtonComponent v-if="!isEditing" label="編集" @click="() => { emit('startEditing', index); update(); }" />
        <ButtonComponent v-else label="保存" @click="saveTask" />
        <ButtonComponent label="削除" @click="handleDelete" />
    </li>
    <!-- <p>
        {{ index }}<br>
        {{ task }}<br>
        {{ editTask }}
    </p> -->
</template>



<style scoped>
li {
    display: flex;
    align-items: center;
    list-style-type: none;
    width: 343px;
    height: 50px;
    border: 1px solid red;
    margin-bottom: 10px;
    padding: 0 0 0 10px;
}

li span {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 1px;
}

li input {
    flex-grow: 1;
    width: 1px;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

const props = defineProps<{
    addButtonPushed: (task: string) => void //引数として task という string 型の値を受け取り、返り値が void
}>();

const newTaskText = ref('');

const sendNewTask = () => {
    if (newTaskText.value.trim()) {
        props.addButtonPushed(newTaskText.value.trim());
        newTaskText.value = '';
    }
};

defineEmits(['onNewTaskFocus']);
</script>



<template>
    <div class="task-input">
        <input type="text" v-model="newTaskText" placeholder="ここに追加したいことを入力" @focus="$emit('onNewTaskFocus')">
        <ButtonComponent label="追加" @click="sendNewTask" />
    </div>
</template>



<style scoped>
.task-input {
    display: flex;
    margin-bottom: 10px;
}

input {
    width: 300px;
    height: 30px;
}
</style>

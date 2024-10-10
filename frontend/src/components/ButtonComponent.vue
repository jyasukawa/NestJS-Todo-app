<script setup lang="ts">
const props = defineProps<{ // Props としてボタンのラベルを受け取る
    label: string;
}>();

const emits = defineEmits(['click']); // emits を定義して、親コンポーネントにイベントを送信できるようにする

const handleClick = () => {
    emits('click'); // クリックイベントが発生したときに親コンポーネントに伝える
};
</script>



<template>
    <button @click="handleClick">{{ props.label }}</button>
</template>



<style scoped>
button {
    padding: 5.5px;
    margin-left: 5px;
    cursor: pointer;
}
</style>

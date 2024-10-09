<template>
    <div class="title-container">
        <slot>デフォルトのタイトル</slot> <!-- 親コンポーネントから挿入されたコンテンツを表示する -->
    </div>
</template>



<style scoped>
.title-container {
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0 20px 0;
}
</style>

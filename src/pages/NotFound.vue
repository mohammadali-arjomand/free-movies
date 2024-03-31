<script setup></script>

<template>
    <p  class="msg">
        همچین صفحه ای پیدا نشد!
        <br>
        <router-link to="/">رفتن به صفحه اصلی</router-link>
    </p>
</template>

<style scoped>
p.msg {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
a {
    text-decoration: none;
    color: #536DFE;
}
</style>
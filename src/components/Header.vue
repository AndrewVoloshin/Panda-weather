<!-- src/components/Header.vue -->
<template>
    <header>
        <img src="/panda_logo-100x100.png"
             alt="panda_logo"
             class="logo" />
        <nav>
            <RouterLink to="/"
                        class="nav-link">Home</RouterLink>
            <RouterLink to="/about"
                        class="nav-link">Favorite</RouterLink>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #f8f9fa;
}

.logo {
    height: 50px;
}

nav {
    display: flex;
    gap: 15px;
}

.nav-link {
    color: #333;
    text-decoration: none;
    font-weight: bold;
}

.nav-link:hover {
    color: #007bff;
}
</style>
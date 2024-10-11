<!-- src/components/Header.vue -->
<template>
    <header>
        <img src="/panda_logo-100x100.png"
             alt="panda_logo"
             class="logo" />
        <nav>
            <RouterLink to="/"
                        class="nav-link"
                        exact-active-class="active-link">Home</RouterLink>
            <RouterLink to="/about"
                        class="nav-link"
                        exact-active-class="active-link">Favorite</RouterLink>
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
    color: #3c3c3c;
    text-decoration: none;
    font-weight: bold;
}

.active-link {
    color: #007bff;
    border-bottom: 2px solid #007bff;
}

.nav-link:hover {
    color: #007bff;
}

@media (min-width: 481px) {
    header {
        padding: 10px 30px;
    }
}


@media (min-width: 769px) {
    header {
        padding: 10px 40px;
    }
}

@media (min-width: 1200px) {
    header {
        padding: 10px 60px;
    }
}
</style>

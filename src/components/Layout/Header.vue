<!-- src/components/Header.vue -->
<template>
    <header class="header">
        <div class="header__container">
            <a href="https://pandateam.net.ua/">
                <img src="/panda_logo-100x100.png"
                     alt="panda_logo"
                     class="logo" />
            </a>
            <nav>
                <RouterLink to="/"
                            class="nav-link"
                            exact-active-class="active-link">Home</RouterLink>
                <RouterLink to="/favorite"
                            class="nav-link"
                            exact-active-class="active-link">Favorite</RouterLink>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
    display: flex;
    justify-content: center;
    background-color: #f8f9fa;
}

.header__container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
}

.logo {
    height: 50px;
}

nav {
    display: flex;
    gap: 15px;
}

.nav-link {
    color: #555;
    text-decoration: none;
    font-weight: bold;
}

.active-link {
    color: #333;
    border-bottom: 2px solid #333;
}

.nav-link:hover {
    color: #333;
}

@media (min-width: 481px) {
    .header__container {
        padding: 10px 30px;
    }
}


@media (min-width: 769px) {
    .header__container {
        padding: 10px 40px;
    }
}

@media (min-width: 1200px) {

    .header__container {
        width: 1200px;
        padding: 10px 60px;
    }
}
</style>

<template>
    <div class="loader">
        <div class="spinner"></div>
    </div>
</template>

<style scoped>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(75, 192, 192, 1);
    border-top-color: rgba(208, 244, 244, 0.2);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
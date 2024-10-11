<template>
    <button @click="toggleLike">
        <span v-if="isLiked">&#9829;</span>
        <span v-else>&#9825;</span>
        Like
    </button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    weather: {
        type: Object,
        required: true,
    },
});

const isLiked = ref(false);

const toggleLike = () => {
    const weatherId = props.weather.id;
    const storedWeather = JSON.parse(localStorage.getItem('likedWeather') || '[]');

    if (!isLiked.value && storedWeather.length >= 5) {
        alert('Вы не можете лайкнуть больше 5 элементов.');
        return;
    }

    if (isLiked.value) {
        const updatedWeather = storedWeather.filter((item) => item.id !== weatherId);
        localStorage.setItem('likedWeather', JSON.stringify(updatedWeather));
    } else {
        storedWeather.push(props.weather);
        localStorage.setItem('likedWeather', JSON.stringify(storedWeather));
    }
    isLiked.value = !isLiked.value;
};

watch(
    () => props.weather,
    (newWeather) => {
        const storedWeather = JSON.parse(localStorage.getItem('likedWeather') || '[]');
        isLiked.value = storedWeather.some((item) => item.id === newWeather.id);
    },
    { immediate: true }
);


</script>

<style scoped>
.button-container {
    margin-top: 16px;
}

/* button {
    margin-right: 8px;
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

button span {
    margin-right: 4px;
    font-size: 16px;
} */
</style>
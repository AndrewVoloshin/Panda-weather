<script setup lang="ts">
import { ref, watch } from 'vue';
import ConfirmOk from '@/components/Modal/ConfirmOk.vue';

const props = defineProps({
    weather: {
        type: Object,
        required: true,
    },
});

const isLiked = ref(false);
const isModalVisible = ref(false);

const toggleLike = () => {
    const weatherId = props.weather.id;
    const storedWeather = JSON.parse(localStorage.getItem('likedWeather') || '[]');

    if (!isLiked.value && storedWeather.length >= 5) {
        isModalVisible.value = true;
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

const closeModal = () => {
    isModalVisible.value = false;
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

<template>
    <div>
        <div class="button-like"
             @click="toggleLike">
            <img v-if="isLiked"
                 src="/src/assets/svg/heart-solid.svg"
                 alt="Liked">
            <img v-else
                 src="/src/assets/svg/heart-regular.svg"
                 alt="Not liked">
        </div>

        <confirm-ok v-if="isModalVisible"
                    :isVisible="isModalVisible"
                    @confirm="closeModal" />
    </div>
</template>

<style scoped>
.button-container {
    margin-top: 16px;
}

.button-like {
    display: inline-block;
    position: relative;
    width: 25px;
    height: 25px;
}

.button-like img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

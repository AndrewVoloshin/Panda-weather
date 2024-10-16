<script setup lang="ts">
import { ref } from 'vue';
import ConfirmDelete from '@/components/Modal/ConfirmDelete.vue';

const props = defineProps({
    weather: {
        type: Object,
        required: true,
    },
    weatherCards: {
        type: Object,
        required: true,
    }
});

const isModalVisible = ref(false);
const deleteWeatherCard = () => {
    const index = props.weatherCards.findIndex(card => card.id === props.weather.id);
    if (index !== -1) {
        props.weatherCards.splice(index, 1);
    }
    isModalVisible.value = false;
};

const openDeleteModal = () => {
    isModalVisible.value = true;
};

const cancelDelete = () => {
    isModalVisible.value = false;
};

</script>

<template>
    <confirm-delete :isVisible="isModalVisible"
                    :weather="weather"
                    @confirm="deleteWeatherCard"
                    @cancel="cancelDelete" />
    <div class="button-like"
         @click="openDeleteModal()">
        <img src="/src/assets/svg/trash-can-regular.svg"
             alt="">
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
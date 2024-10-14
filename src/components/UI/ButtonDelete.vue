<script setup lang="ts">

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

const deleteWheaterCard = () => {
    const index = props.weatherCards.findIndex(card => card.id === props.weather.id);
    if (index !== -1) {
        props.weatherCards.splice(index, 1);
    }
};

</script>

<template>
    <div class="button-like"
         @click="deleteWheaterCard()">
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
<template>
    <div v-if="isVisible"
         class="modal-overlay">
        <div class="modal-content">
            <h3>You cannot like more than 5 weather.<br />Remove one to add a new one.</h3>
            <div class="modal-buttons">
                <button @click="onConfirm">Ok</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    isVisible: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['confirm']);

const onConfirm = () => {
    emit('confirm');
};
</script>

<style scoped>
h3 {
    color: #555;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.modal-buttons {
    margin-top: 15px;
}

.modal-buttons button {
    background-color: transparent;
    border: 2px solid #555;
    color: #555;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.modal-buttons button:hover {
    border-color: #4CAF50;
}
</style>
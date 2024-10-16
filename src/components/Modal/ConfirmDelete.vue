<template>
  <div v-if="isVisible"
       class="modal-overlay">
    <div class="modal-content">
      <h3>Are you sure you want to delete weather of {{ props.weather.name }}?</h3>
      <div class="modal-buttons">
        <button @click="confirmDelete"
                class="confirm-button">Yes</button>
        <button @click="cancelDelete"
                class="cancel-button">No</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  weather: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirmDelete = () => {
  emit('confirm');
};

const cancelDelete = () => {
  emit('cancel');
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

.confirm-button:hover {
  /* background-color: #4CAF50; */
  /* color: #fff; */
  border-color: #4CAF50;
}

.cancel-button:hover {
  /* background-color: #f44336; */
  /* color: #fff; */
  border-color: #f44336;
}

.modal-buttons button+button {
  margin-left: 10px;
}
</style>

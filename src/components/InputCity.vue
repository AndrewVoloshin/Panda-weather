<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { cities } from '@/data/cities'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore();

const cityList: string[] = cities;
const searchTerm = ref<string>('');
const showDropdown = ref<boolean>(false);

const filteredCities = computed<string[]>(() => {
  return cityList.filter(city =>
    city.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const hideDropdown = (): void => {
  showDropdown.value = false;
};

const selectCity = async (city: string): Promise<void> => {
  searchTerm.value = city;
  weatherStore.citySelected = city;
  hideDropdown();
};

const handleClickOutside = (event: MouseEvent): void => {
  const dropdownElement = document.querySelector('.dropdown') as HTMLElement;
  if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
    hideDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="dropdown">
    <input type="text"
           v-model="searchTerm"
           placeholder="Введите город..."
           @focus="showDropdown = true" />
    <ul v-if="showDropdown && filteredCities.length"
        class="suggestions">
      <li v-for="(city, index) in filteredCities"
          :key="index"
          @click="selectCity(city)"
          class="suggestion">
        {{ city }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.suggestions {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
}

.suggestion {
  padding: 8px;
  cursor: pointer;
}

.suggestion:hover {
  background-color: #f0f0f0;
}
</style>

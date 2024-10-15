<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useWeatherStore } from '@/stores/weather';
import { getCitiesByLocale } from '@/data/cities';

const weatherStore = useWeatherStore();

const searchTerm = ref<string>('');
const showDropdown = ref<boolean>(false);

const { locale } = useI18n();
const citiesList = computed(() => getCitiesByLocale(locale.value));

const filteredCities = computed<string[]>(() => {
  return citiesList.value.filter(city =>
    city.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const hideDropdown = (): void => {
  showDropdown.value = false;
};

const selectCity = async (city: string) => {
  searchTerm.value = city;
  hideDropdown();
  addCity();
};

const addCity = () => {
  if (!checkWeatherCardLimit()) return;
  weatherStore.citySelected = searchTerm.value;
  searchTerm.value = '';
}

const checkWeatherCardLimit = () => weatherStore.weatherCards.length < 5;

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
           :placeholder="$t('weather.placeholder')"
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
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  padding: 10px 20px;
}

input {
  width: 290px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #3498db;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 290px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 5px;
  padding: 0;
  list-style-type: none;
  max-height: 180px;
  overflow-y: auto;
  padding: 5px 0;
  margin-left: 20px;
}

.suggestion {
  padding: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.suggestion:hover {
  background-color: #f5f5f5;
}

@media (min-width: 361px) {
  .dropdown {
    display: flex;
    justify-content: center;
  }

  .suggestions {
    left: 50%;
    transform: translateX(-50%);
    margin-left: 0px;
  }
}


@media (min-width: 361px) {
  .dropdown {
    padding: 15px 30px;
  }
}



@media (min-width: 481px) {
  .dropdown {
    padding: 10px 30px;
  }
}


@media (min-width: 769px) {

  .suggestions {
    width: 450px;
  }

  .dropdown {
    padding: 15px 40px;
  }


  input {
    width: 450px;
  }
}

@media (min-width: 1200px) {
  .dropdown {
    padding: 15px 60px;
  }
}
</style>

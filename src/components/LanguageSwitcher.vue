<template>
    <div class="language-switcher">
        <div class="selected-language"
             @click="toggleDropdown">
            <div class="flag-circle">
                <img :src="currentLocale === 'en' ? '/src/assets/flags/flag-eng.png' : '/src/assets/flags/flag-uk.png'"
                     alt="Language Flag"
                     class="flag" />
            </div>
        </div>
        <div v-if="isDropdownOpen"
             class="language-options">
            <div class="language-option"
                 @click="switchLanguage('en')">
                <div class="flag-circle">
                    <img src="/src/assets/flags/flag-eng.png"
                         alt="English"
                         class="flag" />
                </div>
                English
            </div>
            <div class="language-option"
                 @click="switchLanguage('uk')">
                <div class="flag-circle">
                    <img src="/src/assets/flags/flag-uk.png"
                         alt="Ukrainian"
                         class="flag" />
                </div>
                Українська
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { locale } = useI18n();
const currentLocale = ref(locale.value);
const isDropdownOpen = ref(false);

const switchLanguage = (lang) => {
    locale.value = lang;
    currentLocale.value = lang;
    isDropdownOpen.value = false;
};

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped>
.language-switcher {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.selected-language {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: white;
}

.language-options {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 40px;
    right: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    z-index: 10;
}

.language-option {
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;
}

.language-option .flag-circle {
    margin-right: 5px;
}

.language-option:hover {
    background-color: #f0f0f0;
}


.flag-circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
}

.flag {
    width: 100%;
    height: auto;
}
</style>

<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="menu-container">
        <button class="menu-button" @click="toggleMenu">
          <span class="menu-icon">&#x22EE;</span>
        </button>
        <div v-if="isMenuOpen" class="dropdown-menu">
          <button @click="switchView('Posts')" class="dropdown-item">Posts</button>
          <button @click="switchView('Todos')" class="dropdown-item">Todos</button>
          <button @click="switchView('Photos')" class="dropdown-item">Photos</button>
          <button @click="switchView('Album')" class="dropdown-item">Album</button>
        </div>
      </div>
    </nav>
    <div class="main-content">
      <component :is="currentViewComponent"></component>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Posts from './components/Posts.vue'
import Todos from './components/Todos.vue'
import Photos from './components/Photos.vue'
import Album from './components/Album.vue'

const Home = {
  template: `
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home page.</p>
    </div>
  `
}

const currentView = ref('Home')
const isMenuOpen = ref(false)

const currentViewComponent = computed(() => {
  switch (currentView.value) {
    case 'Posts':
      return Posts
    case 'Todos':
      return Todos
    case 'Photos':
      return Photos
    case 'Album':
      return Album
    default:
      return Home
  }
})

function switchView(view) {
  currentView.value = view
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navbar {
  width: 100%;
  background-color: #000;
  color: white;
  display: flex;
  padding: 10px;
  position: relative;
  align-items: center;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #313030;
}

.menu-container {
  position: relative;
}

.menu-button {
  background: none;
  border: none;
  color: rgb(237, 233, 233);
  font-size: 24px;
  cursor: pointer;
}

.menu-icon {
  font-size: 30px;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #000;
  border: 1px solid #333;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 150px; /* Adjust width for the dropdown menu */
}

.dropdown-item {
  background-color: #000;
  color: white;
  padding: 12px 20px;
  border: none;
  text-align: left;
  width: 100%;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #333;
}
</style>

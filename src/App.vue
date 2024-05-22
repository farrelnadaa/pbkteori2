<template>
  <div>
    <nav>
      <button @click="currentView = 'Home'">Home</button>
      <button @click="currentView = 'Posts'">Posts</button>
      <button @click="currentView = 'Todos'">Todos</button>
    </nav>
    <component :is="currentViewComponent"></component>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Posts from './components/Posts.vue'
import Todos from './components/Todos.vue'

// Jika Anda ingin menggunakan komponen Home, definisikan komponen tersebut di sini
const Home = {
  template: `
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home page.</p>
    </div>
  `
}

const currentView = ref('Home')

const currentViewComponent = computed(() => {
  switch (currentView.value) {
    case 'Posts':
      return Posts
    case 'Todos':
      return Todos
    default:
      return Home // Jika Anda ingin menampilkan Home
  }
})
</script>

<style scoped>
nav {
  margin: 20px 0;
}
button {
  margin-right: 10px;
}
</style>

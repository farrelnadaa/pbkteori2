<template>
  <div class="app-container">
    <nav>
      <button @click="currentView = 'Home'">Home</button>
      <button @click="currentView = 'Posts'">Posts</button>
      <button @click="currentView = 'Todos'">Todos</button>
    </nav>
    <div class="content">
      <component :is="currentViewComponent">
        <template v-if="currentView === 'Posts'" #default>
          <p>This is a slot content for Posts.</p>
        </template>
        <template v-if="currentView === 'Todos'" #default>
          <p>This is a slot content for Todos.</p>
        </template>
      </component>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Posts from './components/Posts.vue'
import Todos from './components/Todos.vue'

// Definisikan komponen Home
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
      return Home
  }
})
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #292727;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #211f1f;
}

nav {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #42b883;
  color: rgb(76, 70, 70);
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #38a169;
}

.content {
  text-align: center;
}
</style>

<template>
  <div class="posts-container">
    <h2>Posts</h2>
    <form @submit.prevent="fetchPosts" class="form-container">
      <select v-model="selectedUser" class="select-user">
        <option value="" disabled>Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <button type="submit" class="fetch-button">Fetch Posts</button>
    </form>
    <ul class="posts-list">
      <li v-for="(post, index) in posts" :key="index" class="post-item">
        <div class="post-title">{{ post.title }}</div>
        <button @click="removePost(index)" class="remove-button">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])
const selectedUser = ref('')
const users = ref([])

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const fetchPosts = async () => {
  if (selectedUser.value) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`)
      posts.value = response.data
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }
}

const removePost = (index) => {
  posts.value.splice(index, 1)
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.posts-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #f7fafc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2d3748;
}

.form-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.select-user {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px 0 0 5px;
  border: 1px solid #ccc;
}

.fetch-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.fetch-button:hover {
  background-color: #2b6cb0;
}

.posts-list {
  list-style: none;
  padding: 0;
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-title {
  max-width: 70%;
  font-size: 16px;
  color: #2d3748;
}

.remove-button {
  padding: 5px 10px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c53030;
}
</style>

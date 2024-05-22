<template>
    <div class="posts-container">
      <h2>Posts</h2>
      <p>Here are the user posts.</p>
      <form @submit.prevent="addPost">
        <input v-model="newPost" placeholder="Add a new post" />
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.name">
            {{ user.name }}
          </option>
        </select>
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
          {{ post.content }} - {{ post.user }}
          <button @click="removePost(index)">Remove</button>
        </li>
      </ul>
      <slot></slot> <!-- Slot untuk konten tambahan -->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const posts = ref([])
  const newPost = ref('')
  const selectedUser = ref('')
  const users = ref([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ])
  
  const addPost = () => {
    if (newPost.value.trim() !== '' && selectedUser.value) {
      posts.value.push({ content: newPost.value.trim(), user: selectedUser.value })
      newPost.value = ''
      selectedUser.value = ''
    }
  }
  
  const removePost = (index) => {
    posts.value.splice(index, 1)
  }
  </script>
  
  <style scoped>
  .posts-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  form {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  input, select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    flex-grow: 1;
  }
  
  button {
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    background-color: #42b883;
    color: white;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #38a169;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  li button {
    background-color: #ff4d4d;
  }
  
  li button:hover {
    background-color: #ff1a1a;
  }
  </style>
  
<template>
    <div class="todos-container">
      <h2>Todos</h2>
      <p>Here are the todos.</p>
      <form @submit.prevent="addTodo">
        <input v-model="newTodo" placeholder="Add a new todo" />
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.name">
            {{ user.name }}
          </option>
        </select>
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          {{ todo.content }} - {{ todo.user }}
          <button @click="removeTodo(index)">Remove</button>
        </li>
      </ul>
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const todos = ref([])
  const newTodo = ref('')
  const selectedUser = ref('')
  const users = ref([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ])
  
  const addTodo = () => {
    if (newTodo.value.trim() !== '' && selectedUser.value) {
      todos.value.push({ content: newTodo.value.trim(), user: selectedUser.value })
      newTodo.value = ''
      selectedUser.value = ''
    }
  }
  
  const removeTodo = (index) => {
    todos.value.splice(index, 1)
  }
  </script>
  
  <style scoped>
  .todos-container {
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
  
<template>
  <div class="todos-container">
    <h2>Todos</h2>
    <form @submit.prevent="fetchTodos" class="form-select">
      <select v-model="selectedUser">
        <option value="" disabled>Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <button type="submit" class="btn">Fetch Todos</button>
    </form>

    <form @submit.prevent="addTodo" class="form-add">
      <input v-model="newTodoTitle" placeholder="New Todo Title" />
      <button type="submit" class="btn">Add Todo</button>
    </form>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo.title }}
        <button @click="removeTodo(index)" class="btn btn-remove">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const todos = ref([])
const selectedUser = ref('')
const users = ref([])
const newTodoTitle = ref('')

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const fetchTodos = async () => {
  if (selectedUser.value) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${selectedUser.value}`)
      todos.value = response.data
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }
}

const addTodo = () => {
  if (newTodoTitle.value) {
    todos.value.push({
      title: newTodoTitle.value,
      completed: false
    })
    newTodoTitle.value = ''
  }
}

const removeTodo = (index) => {
  todos.value.splice(index, 1)
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.todos-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

input, select {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #218838;
}

.btn:active {
  background-color: #1e7e34;
}

.btn-remove {
  background-color: #dc3545;
}

.btn-remove:hover {
  background-color: #c82333;
}

.btn-remove:active {
  background-color: #bd2130;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

li button {
  margin-left: 20px;
}
</style>

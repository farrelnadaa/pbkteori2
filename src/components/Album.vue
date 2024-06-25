<template>
  <div class="albums-container">
    <h2 class="albums-heading">Albums</h2>
    <div class="albums-list">
      <div v-for="album in albums" :key="album.id" class="album-item">
        <div class="album-cover">
          <img src="https://via.placeholder.com/150" alt="Album Cover" class="album-image">
        </div>
        <div class="album-details">
          <h3 class="album-title">{{ album.title }}</h3>
          <button @click="showPhotos(album.id)" class="view-photos-btn">View Photos</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const albums = ref([])

const fetchAlbums = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums')
    albums.value = response.data
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
}

const showPhotos = (albumId) => {
  // Logic to switch to the Photos component with the selected album ID
}

onMounted(() => {
  fetchAlbums()
})
</script>

<style scoped>
.albums-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.albums-heading {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
}

.albums-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.album-item {
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.album-cover {
  height: 150px;
  overflow: hidden;
}

.album-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-details {
  padding: 10px;
}

.album-title {
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
}

.view-photos-btn {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-photos-btn:hover {
  background-color: #45a049;
}
</style>

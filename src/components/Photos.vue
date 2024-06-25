<template>
  <div class="photos-container">
    <h2>Photos</h2>
    <button @click="goBack">Back to Albums</button>
    <div class="photos-list">
      <div v-for="photo in photos" :key="photo.id" class="photo-item">
        <img :src="photo.thumbnailUrl" alt="Photo">
        <span>{{ photo.title }}</span>
        <button @click="showFullPhoto(photo.url)">View</button>
      </div>
    </div>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <img :src="fullPhotoUrl" alt="Full Size Photo">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const photos = ref([])
const albumId = ref(1)  // Replace with actual album ID logic
const isModalOpen = ref(false)
const fullPhotoUrl = ref('')

const fetchPhotos = async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId.value}`)
    photos.value = response.data
  } catch (error) {
    console.error('Error fetching photos:', error)
  }
}

const goBack = () => {
  // Logic to go back to the albums view
}

const showFullPhoto = (url) => {
  fullPhotoUrl.value = url
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

onMounted(() => {
  fetchPhotos()
})
</script>

<style scoped>
.photos-container {
  max-width: 600px;
  margin: 0 auto;
}

.photos-list {
  display: flex;
  overflow-x: scroll;
  padding: 20px 0;
}

.photo-item {
  min-width: 150px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.photo-item img {
  max-width: 100%;
  height: auto;
  margin-bottom: 5px;
}

.photo-item span {
  margin-bottom: 5px;
  text-align: center;
}

.photo-item button {
  background-color: #4a5568;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.photo-item button:hover {
  background-color: #2d3748;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>

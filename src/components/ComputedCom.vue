<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books[author.books.length-1];
})

</script>
<template>
  <h1>Author: {{author.name}}</h1>
  <h2>Last Book Name is: {{ publishedBooksMessage }}</h2>
</template>
<style scoped>
</style>
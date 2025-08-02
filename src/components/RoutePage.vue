<script setup>
import { ref, computed } from 'vue'

import ComputedCom from './ComputedCom.vue'
import HelloWorld from './HelloWorld.vue'
import JsonCom from './JsonCom.vue'

const routes = {
  '/': ComputedCom,
  '/hello': HelloWorld,
  '/json':JsonCom
}

const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>

<template>
  <a href="#/">ComputedCom</a> |
  <a href="#/hello">HelloWorld</a> |
  <a href="#/json">JsonCom</a>

  <component :is="currentView" />
  
</template>
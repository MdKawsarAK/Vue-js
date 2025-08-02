<script setup>
import { ref,reactive } from 'vue'

      const persons = ref(
          [{id:1, name: 'Ali',mobile:"343454443" }, 
          {id:2, name: 'Rahim',mobile:"343343443" },
          {id:3, name: 'Karim',mobile:"34344545" },
      ]);  

</script>
<template>
  <ul>
  <li v-for="person in persons">
    {{ person.id }}  {{ person.name}}
  </li>
</ul>
</template>
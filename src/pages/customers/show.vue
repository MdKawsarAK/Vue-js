<script setup>
  import {ref, onMounted } from 'vue' 
  import { useRoute } from 'vue-router';

    const route = useRoute();
    const customerId = route.params.id;

     const customer = ref({});

  const baseUrl=`http://127.0.0.1:8000/api/`
  const endpoint=`customers/${customerId}`

onMounted(async () => {  

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'        
      }
          
    });  

    let c= await response.json();    
    customer.value=c;
    console.log(c)

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }

})

</script>
<template>    
    <h1>Details</h1>
    <router-link to="/customers">Back</router-link>
    {{ customer.name }}<br>
    {{ customer.mobile }}<br>
    {{ customer.email }}
</template>
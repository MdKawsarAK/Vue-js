<script setup>
   import {ref, onMounted } from 'vue' 

  const customers = ref([]);

  const baseUrl=`http://127.0.0.1:8000/api/`
  const endpoint=`customers`

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
    customers.value=c.customers;
    console.log(c.customers)

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }

})

</script>
<template>   

 <h1>Manage Customer</h1>
    <router-link to="/customers/create">New Customer</router-link>
    <table class="table">
        <tr>
            <th>ID</th><th>Name</th><th>Mobile</th><th>Address</th>
        </tr>
        <tr v-for="customer in customers">
           <td>{{customer.id}}</td>
            <td><img :src="`http://127.0.0.1:8000/img/${customer.photo}`" height="100" /></td>
           <td>{{customer.name}}</td>
           <td>{{customer.mobile}}</td>
           <td>{{customer.email}}</td>
           <td class="btn-group">
              <router-link :to="`/customers/show/${customer.id}`">View</router-link>
              <router-link :to="`/customers/edit/${customer.id}`">Edit</router-link>
              <router-link :to="`/customers/delete/${customer.id}`">Delete</router-link>          
            </td>
        </tr>
    </table>

</template>
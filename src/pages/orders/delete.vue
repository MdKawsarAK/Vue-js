<script setup>
  import {ref, onMounted } from 'vue' 
  import { useRoute,useRouter  } from 'vue-router';
   
  const router = useRouter();
    const route = useRoute();
    const orderId = route.params.id;

     const order = ref({});
     const customer = ref({});

  const baseUrl=`http://127.0.0.1:8000/api/`
  const endpoint=`orders/${orderId}`

  async function handleDelete(event) {      
       if(confirm("Are you sure?")){

         try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'        
      }
          
    });  

    //let c= await response.json();    
    router.push('/orders');


    console.log(c)

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }
         
       }
  }

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
    order.value=c.order;
    customer.value=c.customer;
    console.log(c)

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }

})

</script>
<template>    
    <h1>Delete</h1>    
    <router-link to="/orders">Back</router-link>
    <h4>Are you sure?</h4>
    Order ID: {{ order.id }}<br>
    Order Total: {{ order.order_total }}<br>
    Customer: {{ customer.name }}
    <input type="button" style="width: 70px;" @click="handleDelete" value="Delete">
</template>
<script setup>
  import {ref, onMounted } from 'vue' 
  import { useRoute } from 'vue-router';

    const route = useRoute();
    const orderId = route.params.id;

    const order = ref({});
    const customer = ref({});
    const details = ref({});

  const baseUrl=`http://127.0.0.1:8000/api/`
  const endpoint=`orders/${orderId}`

onMounted(async () => {  
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'        
      }
          
    });  

    let res= await response.json();    
    
    order.value=res.order;
    details.value=res.details;
    customer.value=res.customer;

    //console.log(customer.value.name);
  

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }

})

</script>
<template>    

<div class="order-container">
  <div class="order-header">
    <h2>Order Summary</h2>
    <span>Order ID: {{order.id}}</span>
  </div>

  <div class="order-info">
    <p><strong>Customer Name:</strong> {{customer.name}}</p>
    <p><strong>Order Date:</strong> {{order.order_date}}</p>
    <p><strong>Phone:</strong> {{customer.mobile}}</p>
    <p><strong>Shipping Address:</strong> {{order.shipping_address}}</p>
  </div>

  <table class="order-table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Qty</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="detail in details">
        <td>{{detail.product_id}}</td>
        <td>{{detail.qty}}</td>
        <td>{{detail.price}}</td>
        <td>{{detail.qty*detail.price}}</td>
      </tr>
      
    </tbody>
  </table>

  <div class="order-total">
    Total Amount: {{ order.order_total}}
  </div>
</div>


</template>

 <style>

    .order-container {
      background-color: #fff;
      width:100%;
      margin: auto;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #ddd;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }

    .order-header h2 {
      margin: 0;
      color: #333;
    }

    .order-info {
      margin-bottom: 20px;
    }

    .order-info p {
      margin: 5px 0;
      color: #555;
    }

    .order-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    .order-table th, .order-table td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }

    .order-table th {
      background-color: #f8f8f8;
    }

    .order-total {
      text-align: right;
      font-weight: bold;
      font-size: 1.1em;
      margin-top: 10px;
    }

    @media (max-width: 600px) {
      .order-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .order-header h2, .order-header span {
        font-size: 1em;
      }
    }
  </style>
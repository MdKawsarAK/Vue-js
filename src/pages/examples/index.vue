<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([]);

const baseUrl = `http://127.0.0.1:8000/api/`
const endpoint = `orders`

onMounted(async () => {

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    });

    let c = await response.json();
    orders.value = c.orders;
    console.log(c.orders)

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }

})

</script>
<template>

  <h1>Manage Order</h1>
  <router-link to="/orders/create">New Order</router-link>
  <table class="table">
    <tr>
      <th>ID</th>
      <th>Date</th>
      <th>Customer</th>
      <th>Total</th>
      <th>Address</th>
    </tr>
    <tr v-for="order in orders">
      <td>{{ order.id }}</td>
      <td>{{ order.order_date }}</td>
      <td>{{ order.customer }}</td>
      <td>{{ order.order_total }}</td>
      <td>{{ order.shipping_address }}</td>
      <td class="btn-group">
        <router-link :to="`/orders/show/${order.id}`">View</router-link>
        <router-link :to="`/orders/delete/${order.id}`">Delete</router-link>
      </td>
    </tr>
  </table>

</template>
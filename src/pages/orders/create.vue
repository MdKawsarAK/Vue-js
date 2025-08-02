<script setup>
  import {ref, onMounted,toRaw,computed  } from 'vue'  
     

  const baseUrl=`http://127.0.0.1:8000/api/`
  const endpoint=`orders`

  const endpoint2=`customers`
  const endpoint3=`products`
     
  const customer_id=ref('');
  const order_date=ref('');
  const shipping_address=ref('');
  const remark=ref('');
  const order_total=ref(0);

  const customers = ref({});
  const products = ref({});  

  const items = ref([]);
  const newItem = ref({id:'', name: '',qty:'', price: '',vat:'0',discount:'0' });


const selectedText = computed(() => {  
  const selected = products.value.find(p => p.id === newItem.value.id);
  return selected ? selected.name : '';
});


onMounted(async () => {  

  try {
     const [res1, res2] = await Promise.all([
      fetch(`${baseUrl}${endpoint2}`),
      fetch(`${baseUrl}${endpoint3}`)
    ]);    

    let r1= await res1.json();    
    let r2= await res2.json(); 
  

    customers.value=r1.customers;
    products.value=r2.products;

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }

});

const addItem = async () => {
    items.value.push({id:newItem.value.id, name:selectedText.value,qty:newItem.value.qty, price: newItem.value.price,vat:newItem.value.vat,discount:newItem.value.discount }); 
   
    //console.log(selectedText.value);

   order_total.value = items.value.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.price*currentValue.qty || 0);
  }, 0); 
    
};
    

async function submitOrder() {

 let jsonData={
  customer_id:customer_id.value,
  order_date:order_date.value,
  delivery_date:order_date.value,
  shipping_address:shipping_address.value,
  order_total:order_total.value,
  paid_amount:order_total.value,
  status_id:1,
  remark:'Na',
  items:toRaw(items.value)
}

//console.log(jsonData);

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',      
      body: JSON.stringify(jsonData), // no need to set Content-Type
       headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'        
      }
    });

    const res = await response.json();

    console.log(res);
     items.value=[];
   // message.value = result.message || 'Upload successful';
  } catch (error) {
   // message.value = 'Upload failed: ' + error.message;
  }

  //console.log(jsonData);
  
}



</script>
<template>    
   <div class="order-container">
  <div class="order-header">
    <h2>Create Order</h2>
    
  </div>
  <div class="order-info">
    <table>
      <tr>
        <td>Customer Name</td><td>
          <select id="customer" v-model="customer_id">
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
         </select>
       </td>
      </tr>
       <tr>
        <td>Order Date</td><td><input v-model="order_date" type="date" id="date" /></td>
      </tr>
      <tr>
        <td>Shipping Address</td><td><textarea id="address" v-model="shipping_address"></textarea></td>
      </tr>
    </table>  
    
  </div>

  <table class="order-table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Qty</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
       <tr>        
        <th>
          <select id="product" v-model="newItem.id">
            <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
         </select>
        </th>
        <th><input type="text" id="qty" v-model="newItem.qty"  /></th>
        <th><input type="text" id="price" v-model="newItem.price"  /></th>
        <th><input @click="addItem" type="button" id="add" value="Add" /></th>
      
      </tr>

    </thead>
    <tbody>

      <tr v-for="item in items">
        <td>{{item.id}} {{item.name}}</td>
        <td>{{item.qty}}</td>
        <td>{{item.price}}</td>
        <td>{{item.qty*item.price}}</td>
      </tr>
      
    </tbody>
  </table>

  <div class="order-total">
    Total Amount:<input type="text" v-model="order_total" />
  </div>
  <div>
    <button class="btn btn-primary" @click="submitOrder">Create Order</button>
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
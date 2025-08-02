<script setup>
  import {ref } from 'vue'        

     const baseUrl=`http://127.0.0.1:8000/api/`
     const endpoint=`customers`

     const product = ref({
        name: '',
        mobile: '',
        email:'',
        file:null
     });    

     const message = ref('');

    function handleFile(event) {
        product.value.file = event.target.files[0];
    }

async function submitCustomer() {

  const formData = new FormData();
  formData.append('name', product.value.name);
  formData.append('mobile', product.value.mobile);
  formData.append('email', product.value.email);
  formData.append('photo', product.value.file); // image file

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',      
      body: formData, // no need to set Content-Type
    });

    const result = await response.json();
    message.value = result.message || 'Upload successful';
  } catch (error) {
    message.value = 'Upload failed: ' + error.message;
  }
}


</script>
<template>    
    <h1>Create Customer</h1>
    <router-link to="/customers">Back</router-link>
    {{ message }}
    <form  @submit.prevent="submitCustomer">
      <div>
        Name<br>
        <input v-model="product.name" type="text" name="name" />
      </div>
      <div>
        Mobile<br>
        <input v-model="product.mobile" type="text" name="mobile" />
      </div>
      <div>
        Email<br>
        <input v-model="product.email" type="text" name="email" />
      </div>
        <div>
        Photo<br>
        <input type="file"  @change="handleFile" accept="image/*" required />
      </div>
      <div>
       
        <input type="submit" name="submit" value="Submit" />
      </div>
    </form>
 
</template>
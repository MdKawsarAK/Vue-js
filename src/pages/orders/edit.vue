<script setup>
  import {ref,onMounted } from 'vue'   
    import { useRoute} from 'vue-router';

    const route = useRoute();
    const customerId = route.params.id;     

    
     const baseUrl=`http://127.0.0.1:8000/api/`   
     const endpoint=`customers/${customerId}`
     //const customer = ref({});

      const customer = ref({
        name: '',
        mobile: '',
        email:''
     });

     const file = ref(null);
     const message = ref('');


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
    //console.log(c.customer)

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }

})



    function handleFile(event) {
        file.value = event.target.files[0];
    }

async function submitCustomer() {

  const formData = new FormData();
  //formData.append('id', customerId);
  formData.append('name', customer.value.name);
  formData.append('mobile', customer.value.mobile);
  formData.append('email', customer.value.email);
  formData.append('photo', file.value); // image file


  //console.log(file.value);

   try {

   //console.log(`${baseUrl}${endpoint}`);

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
        <input v-model="customer.name" type="text" name="name" />
      </div>
      <div>
        Mobile<br>
        <input v-model="customer.mobile" type="text" name="mobile" />
      </div>
      <div>
        Email<br>
        <input v-model="customer.email" type="text" name="email" />
      </div>
        <div>
        Photo<br>
        <input type="file"  @change="handleFile" accept="image/*"  />
      </div>
      <div>
       
        <input type="submit" name="submit" value="Submit" />
      </div>
    </form>
 
</template>
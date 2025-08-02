<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
 
   let n=34;

   const x=ref(0);
   const counter = reactive({ count: 0 })

   function msg() {
     return "Hello";
    }

    function inc(){
      x.value++;
    }
    function dec(){
      x.value--;
    }
</script>

<template>
<h1 class="txt">First Vue Page: {{ x }}</h1>
<button @click="inc">Inc</button>
<button @click="dec">Dec</button>

<button @click="counter.count++">
  {{ counter.count }}
</button>
</template>

<style scoped>
   .txt{
    color:red;
    font-weight: bolder;
   }
</style>
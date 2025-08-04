<template>
  <div class="container mt-4">
    <div class="card shadow-sm">
      <div class="card-header bg-warning text-white">
        <h4 class="mb-0">Edit Employee</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <!-- same fields as Create.vue -->
          <!-- just use v-models as shown in the Create.vue -->
          <!-- reusing InputField component -->
          <!-- keep everything same as in Create.vue, just load initial data -->
          <!-- see script section -->
          <!-- ... -->
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getEmployeeById, updateEmployee, fetchCategories, fetchBloodGroups } from '../../services/employeeService';

const route = useRoute();
const router = useRouter();

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  nid: '',
  dob: '',
  hire_date: '',
  salary: '',
  gender: '',
  status: '',
  category_id: '',
  blood_id: '',
  address: '',
  photo: null,
});

const categories = ref([]);
const bloods = ref([]);

const onFileChange = (e) => {
  form.value.photo = e.target.files[0];
};

const handleSubmit = async () => {
  const payload = new FormData();
  for (const key in form.value) {
    payload.append(key, form.value[key]);
  }

  await updateEmployee(route.params.id, payload);
  router.push('/employees');
};

onMounted(async () => {
  const res = await getEmployeeById(route.params.id);
  Object.assign(form.value, res.data);

  categories.value = (await fetchCategories()).data;
  bloods.value = (await fetchBloodGroups()).data;
});
</script>

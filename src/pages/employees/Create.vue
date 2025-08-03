<template>
  <div class="container mt-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Create New Employee</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="row">
            <InputField v-model="form.first_name" label="First Name" />
            <InputField v-model="form.last_name" label="Last Name" />
            <InputField v-model="form.email" label="Email" type="email" />
            <InputField v-model="form.phone" label="Phone" />
            <InputField v-model="form.nid" label="NID" />
            <InputField v-model="form.dob" label="Date of Birth" type="date" />
            <InputField v-model="form.hire_date" label="Hire Date" type="date" />
            <InputField v-model="form.salary" label="Salary" type="number" />
            
            <div class="col-md-6 mb-3">
              <label>Gender</label>
              <select class="form-control" v-model="form.gender">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label>Status</label>
              <select class="form-control" v-model="form.status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label>Category</label>
              <select class="form-control" v-model="form.category_id">
                <option value="">Select</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label>Blood Group</label>
              <select class="form-control" v-model="form.blood_id">
                <option value="">Select</option>
                <option v-for="blood in bloods" :key="blood.id" :value="blood.id">{{ blood.name }}</option>
              </select>
            </div>

            <div class="col-md-12 mb-3">
              <label>Address</label>
              <textarea v-model="form.address" class="form-control" rows="3"></textarea>
            </div>

            <div class="col-md-6 mb-3">
              <label>Photo</label>
              <input type="file" class="form-control" @change="onFileChange" />
            </div>
          </div>

          <div class="text-end">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createEmployee, fetchCategories, fetchBloodGroups } from '../../services/employeeService';
import { useRouter } from 'vue-router';

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

  await createEmployee(payload);
  router.push('/employees');
};

onMounted(async () => {
  categories.value = (await fetchCategories()).data;
  bloods.value = (await fetchBloodGroups()).data;
});
</script>

<script>
export default {
  components: {
    InputField: {
      props: ['modelValue', 'label', 'type'],
      emits: ['update:modelValue'],
      template: `
        <div class="col-md-6 mb-3">
          <label>{{ label }}</label>
          <input :type="type || 'text'" class="form-control" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        </div>
      `,
    },
  },
};
</script>

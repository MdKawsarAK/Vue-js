<template>
  <div class="container-fluid mt-4">
    <div class="card bg-primary text-white mb-4 shadow-sm">
      <div class="card-body py-3 d-flex justify-content-between align-items-center">
        <h3 class="m-0">Employee Details: {{ employee.first_name }} {{ employee.last_name }}</h3>
        <router-link to="/employees" class="btn btn-light btn-sm">
          <i class="fas fa-arrow-left me-2"></i> Back
        </router-link>
      </div>
    </div>

    <div class="row">
      <!-- Photo -->
      <div class="col-lg-4 col-md-5 mb-4">
        <div class="card shadow-sm h-100 text-center">
          <div class="card-header bg-light"><h5>Employee Photo</h5></div>
          <div class="card-body p-4">
            <img
              v-if="employee.photo"
              :src="`/storage/${employee.photo}`"
              class="img-fluid rounded-circle mb-3"
              style="width:180px;height:180px;object-fit:cover;border:3px solid #007bff"
            />
            <div v-else class="text-muted mb-3">No Photo Available</div>
            <h4 class="text-primary">{{ employee.first_name }} {{ employee.last_name }}</h4>
            <p class="text-muted">{{ employee.category?.name || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="col-lg-8 col-md-7 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-light"><h5>Personal Information</h5></div>
          <div class="card-body">
            <div class="row">
              <InfoField label="Employee ID" :value="employee.id" />
              <InfoField label="Email" :value="employee.email" />
              <InfoField label="Phone" :value="employee.phone" />
              <InfoField label="Date of Birth" :value="formatDate(employee.dob)" />
              <InfoField label="Gender" :value="employee.gender" />
              <InfoField label="NID" :value="employee.nid" />
              <InfoField label="Address" :value="employee.address" />
              <InfoField label="Blood Group" :value="employee.blood?.name || 'N/A'" />
            </div>

            <hr class="my-3" />
            <h5 class="mb-3">Employment Information</h5>
            <div class="row">
              <InfoField label="Category" :value="employee.category?.name || 'N/A'" />
              <InfoField label="Hire Date" :value="formatDate(employee.hire_date)" />
              <InfoField label="Salary" :value="employee.salary" />
              <InfoField label="Status" :value="employee.status" />
              <InfoField label="Created At" :value="formatDateTime(employee.created_at)" />
              <InfoField label="Last Updated" :value="formatDateTime(employee.updated_at)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getEmployeeById } from '../../services/employeeService';

const route = useRoute();
const employee = ref({});

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
const formatDateTime = (dateStr) => new Date(dateStr).toLocaleString();

onMounted(async () => {
  const res = await getEmployeeById(route.params.id);
  employee.value = res.data;
});
</script>

<!-- Optional component for display -->
<script>
export default {
  components: {
    InfoField: {
      props: ['label', 'value'],
      template: `
        <div class="col-md-6 mb-3">
          <strong class="text-primary">{{ label }}:</strong>
          <p class="text-muted mb-0">{{ value }}</p>
        </div>
      `,
    },
  },
};
</script>

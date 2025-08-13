<template>
  <div class="container py-4">
    <h2 class="mb-4">Salary Details</h2>

    <div v-if="loading" class="alert alert-info">Loading salary details...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else>
      <!-- Employee Information -->
      <div class="card mb-3">
        <div class="card-header">
          <strong>Employee Information</strong>
        </div>
        <div class="card-body d-flex align-items-center">
          <img
            :src="employeePhoto"
            alt="Employee Photo"
            class="rounded-circle me-3"
            width="80"
            height="80"
          />
          <div>
            <h5>{{ salary.employee.first_name }} {{ salary.employee.last_name }}</h5>
            <p class="mb-0"><strong>Email:</strong> {{ salary.employee.email }}</p>
            <p class="mb-0"><strong>Phone:</strong> {{ salary.employee.phone }}</p>
            <p class="mb-0"><strong>Hire Date:</strong> {{ formatDate(salary.employee.hire_date) }}</p>
          </div>
        </div>
      </div>

      <!-- Salary Information -->
      <div class="card mb-3">
        <div class="card-header">
          <strong>Salary Information</strong>
        </div>
        <div class="card-body">
          <p><strong>Status:</strong> 
            <span :class="statusClass">{{ salary.status }}</span>
          </p>
          <p><strong>Remarks:</strong> {{ salary.remarks }}</p>
          <p><strong>Created At:</strong> {{ formatDate(salary.created_at) }}</p>
          <p><strong>Total Salary:</strong> {{ formatCurrency(salary.salary_total) }}</p>
        </div>
      </div>

      <!-- Salary Items -->
      <div class="card">
        <div class="card-header">
          <strong>Salary Items</strong>
        </div>
        <div class="card-body p-0">
          <table class="table table-bordered mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in salary.items" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.payroll_item.name }}</td>
                <td>{{ formatCurrency(item.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SalaryShow",
  data() {
    return {
      salary: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    employeePhoto() {
      if (!this.salary?.employee?.photo) return "/default-avatar.png";
      return `http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/${this.salary.employee.photo}`;
    },
    statusClass() {
      if (!this.salary) return "";
      return {
        "badge bg-success": this.salary.status === "paid",
        "badge bg-warning": this.salary.status === "pending",
        "badge bg-danger": this.salary.status === "rejected",
      };
    },
  },
  methods: {
    async fetchSalary() {
      try {
        const id = this.$route.params.id; // Salary ID from route
        const res = await axios.get(
          `http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/Salaries/${id}`
        );
        if (res.data.status) {
          this.salary = res.data.data;
        } else {
          this.error = "Salary not found.";
        }
      } catch (err) {
        this.error = "Error fetching salary details.";
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
  },
  mounted() {
    this.fetchSalary();
  },
};
</script>

<style scoped>
.badge {
  padding: 0.5em 0.75em;
  font-size: 0.9em;
}
</style>

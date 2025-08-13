<template>
  <div class="container mt-4">
    <h2>Salary List</h2>

    <!-- Table -->
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Employee</th>
          <th>Salary Total</th>
          <th>Status</th>
          <th style="width: 150px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(salary, index) in salaries" :key="salary.id">
          <td>{{ index + 1 }}</td>
          <td>{{ salary.employee?.first_name }} {{ salary.employee?.last_name }}</td>
          <td>{{ formatCurrency(salary.salary_total) }}</td>
          <td>
            <span :class="statusClass(salary.status)">{{ salary.status }}</span>
          </td>
          <td>
            <button class="btn btn-sm btn-primary me-1" @click="editSalary(salary.id)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteSalary(salary.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="salaries.length === 0">
          <td colspan="8" class="text-center">No salaries found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const baseUrl = 'http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/'
const salaries = ref([])

onMounted(async () => {
  await fetchSalaries()
})

async function fetchSalaries() {
  try {
    const res = await axios.get(baseUrl + 'salaries')
    salaries.value = res.data?.data || []
  } catch (err) {
    console.error('Error fetching salaries:', err)
    alert('Error loading salaries.')
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString()
}

function statusClass(status) {
  switch (status) {
    case 'paid': return 'badge bg-success'
    case 'pending': return 'badge bg-warning'
    case 'overdue': return 'badge bg-danger'
    default: return 'badge bg-secondary'
  }
}

function editSalary(id) {
  window.location.assign(`/salaries/edit/${id}`)
}

async function deleteSalary(id) {
  if (!confirm('Are you sure you want to delete this salary?')) return
  try {
    await axios.delete(baseUrl + `salaries/${id}`)
    alert('Salary deleted successfully')
    await fetchSalaries()
  } catch (err) {
    console.error('Error deleting salary:', err)
    alert('Error deleting salary.')
  }
}
</script>

<style scoped>
.badge {
  font-size: 0.9em;
}
</style>

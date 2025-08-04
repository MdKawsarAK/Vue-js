<template>
  <div class="container py-4">
    <!-- Page Header -->
    <div class="card bg-primary text-white mb-3 p-4 shadow-sm">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="m-0">Employee List</h3>
        <router-link to="/employees/create" class="btn btn-light btn-sm shadow-sm">
          <i class="fa fa-plus mr-1"></i> Create New Employee
        </router-link>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="card mb-3 p-4 shadow-sm">
      <div class="row g-3">
        <div class="col-md-3">
          <div class="input-group">
            <span class="input-group-text px-2 bg-primary text-white">
              <i class="fa fa-search"></i>
            </span>
            <input type="text" class="form-control" v-model="search" placeholder="Search by name" />
          </div>
        </div>

        <div class="col-md-3">
          <select class="form-control" v-model="filterCategory">
            <option value="">Filter by Category</option>
            <option value="option-1">option-1</option>
            <option value="option-2">option-2</option>
          </select>
        </div>

        <div class="col-md-3">
          <button class="btn btn-primary w-100" @click="fetchEmployees">Apply Filters</button>
        </div>

        <div class="col-md-3">
          <button class="btn btn-outline-danger w-100" @click="resetFilters">Reset Filters</button>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="card shadow-sm">
      <div class="table-responsive">
        <table class="table table-striped table-bordered text-center">
          <thead class="thead-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Photo</th>
              <th>Email</th>
              <th>Status</th>
              <th>Salary</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in employees" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.first_name }}</td>
              <td>
                <img v-if="item.photo" :src="`/storage/${item.photo}`" width="50" />
              </td>
              <td>{{ item.email }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.salary }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.gender }}</td>
              <td>
                <router-link :to="`/employees/${item.id}`" class="btn btn-sm btn-info">View</router-link>
                <router-link :to="`/employees/edit/${item.id}`" class="btn btn-sm btn-warning">Edit</router-link>
                <button class="btn btn-sm btn-danger" @click="deleteEmployee(item.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Simple Pagination UI -->
      <div class="text-center py-3">
        <button class="btn btn-sm btn-outline-secondary" @click="page--" :disabled="page === 1">Prev</button>
        <span class="mx-2">Page {{ page }}</span>
        <button class="btn btn-sm btn-outline-secondary" @click="page++">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchEmployeesList, deleteEmployeeById } from '../../services/employeeService';

const employees = ref([]);
const search = ref('');
const filterCategory = ref('');
const page = ref(1);

const fetchEmployees = async () => {
  const res = await fetchEmployeesList({ search: search.value, category: filterCategory.value, page: page.value });
  employees.value = res.data;
};

const resetFilters = () => {
  search.value = '';
  filterCategory.value = '';
  fetchEmployees();
};

const deleteEmployee = async (id) => {
  if (confirm('Are you sure?')) {
    await deleteEmployeeById(id);
    fetchEmployees();
  }
};

onMounted(fetchEmployees);
</script>

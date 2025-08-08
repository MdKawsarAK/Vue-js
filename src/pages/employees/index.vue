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

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in employees" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.first_name }}</td>
              <td>
                <img v-if="item.photo" :src="`${API_BASE}/storage/${item.photo}`" width="50" />
              </td>
              <td>{{ item.email }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.salary }}</td>
              <td>
                <router-link :to="`/employees/${item.id}`" class="btn btn-sm btn-info">View</router-link>
                <router-link :to="`/employees/edit/${item.id}`" class="btn btn-sm btn-warning">Edit</router-link>
                <button class="btn btn-sm btn-danger" @click="deleteEmployee(item.id)">Delete</button>
              </td>
            </tr>
            <tr v-if="employees.length === 0">
              <td colspan="9">No employees found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="text-center py-3">
        <button class="btn btn-sm btn-outline-secondary" @click="changePage(page - 1)" :disabled="page <= 1">Prev</button>
        <span class="mx-2">Page {{ page }} of {{ totalPages }}</span>
        <button class="btn btn-sm btn-outline-secondary" @click="changePage(page + 1)" :disabled="page >= totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchEmployeesList, deleteEmployeeById } from '../../services/employeeService';

const API_BASE = 'http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR';

const employees = ref([]);
const search = ref('');
const filterCategory = ref('');
const page = ref(1);
const totalPages = ref(1);

const fetchEmployees = async () => {
  try {
    const res = await fetchEmployeesList({
      search: search.value,
      category: filterCategory.value,
      page: page.value,
    });

    // Axios wraps response in `res.data`
    const responseData = res.data;

    if (responseData && responseData.data) {
      employees.value = responseData.data;
      totalPages.value = responseData.last_page || 1;
    } else {
      employees.value = [];
      totalPages.value = 1;
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};

const resetFilters = () => {
  search.value = '';
  filterCategory.value = '';
  page.value = 1;
  fetchEmployees();
};

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
    fetchEmployees();
  }
};

const deleteEmployee = async (id) => {
  if (confirm('Are you sure?')) {
    await deleteEmployeeById(id);
    fetchEmployees();
  }
};

onMounted(fetchEmployees);
</script>

<template>
  <div class="container mt-4">
    <h2>Create Salary</h2>

    <form @submit.prevent="submitForm">
      <!-- Employee -->
      <div class="mb-3">
        <label class="form-label">Employee</label>
        <select v-model="formData.employee_id" class="form-select" required>
          <option value="" disabled>Select Employee</option>
          <option v-for="emp in employees" :key="emp.id" :value="emp.id">
            {{ emp.name }}
          </option>
        </select>
      </div>

      <!-- Remarks -->
      <div class="mb-3">
        <label class="form-label">Remarks</label>
        <input v-model="formData.remarks" type="text" class="form-control" placeholder="Remarks" />
      </div>

      <!-- Status -->
      <div class="mb-3">
        <label class="form-label">Status</label>
        <select v-model="formData.status" class="form-select" required>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <!-- Salary Items -->
      <div class="mb-3">
        <label class="form-label">Salary Items</label>
        <div v-for="(item, index) in formData.items" :key="index" class="mb-2">
          <div class="d-flex">
            <!-- Item Select -->
            <select v-model="item.payroll_item_id" class="form-select" required>
              <option value="" disabled>Select Payroll Item</option>
              <option v-for="payrollItem in payrollItems" :key="payrollItem.id" :value="payrollItem.id">
                {{ payrollItem.name }}
              </option>
            </select>

            <!-- Amount -->
            <input v-model="item.amount" type="number" class="form-control ms-2" placeholder="Amount" required />

            <!-- Remove -->
            <button type="button" class="btn btn-danger ms-2" @click="removeItem(index)">Remove</button>
          </div>
        </div>

        <!-- Add New Item -->
        <button type="button" class="btn btn-primary" @click="addItem">Add Salary Item</button>
      </div>

      <!-- Salary Total -->
      <div class="mb-3">
        <label class="form-label">Salary Total</label>
        <input v-model="salaryTotal" type="text" class="form-control" readonly />
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-success" :disabled="isSubmitting">Create Salary</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const baseUrl = 'http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/'

const employees = ref([])
const payrollItems = ref([])
const isSubmitting = ref(false)

const formData = ref({
  employee_id: '',
  remarks: '',
  status: 'pending',
  items: []
})

const salaryTotal = computed(() =>
  formData.value.items.reduce((total, item) => total + (Number(item.amount) || 0), 0)
)

function addItem() {
  formData.value.items.push({ payroll_item_id: '', amount: '' })
}

function removeItem(index) {
  formData.value.items.splice(index, 1)
}

onMounted(async () => {
  try {
    const [empRes, itemRes] = await Promise.all([
      axios.get(baseUrl + 'employees'),
      axios.get(baseUrl + 'payroll_items')
    ])

    employees.value = (empRes.data?.data || empRes.data?.employees || []).map(e => ({
      id: e.id,
      name: `${e.first_name ?? ''} ${e.last_name ?? ''}`.trim()
    }))

    payrollItems.value = (itemRes.data?.data || itemRes.data?.payroll_items || []).map(it => ({
      id: it.id,
      name: it.name
    }))

    addItem()
  } catch (err) {
    console.error('Error loading data', err)
    alert('Error loading employees or items.')
  }
})

async function submitForm() {
  try {
    isSubmitting.value = true
    const payload = {
      employee_id: formData.value.employee_id,
      salary_total: parseFloat(salaryTotal.value),
      status: formData.value.status,
      remarks: formData.value.remarks,
      items: formData.value.items.map(item => ({
        payroll_item_id: item.payroll_item_id,
        amount: Number(item.amount)
      }))
    }
        console.log('Submitting payload:', payload)

    const res = await axios.post(baseUrl + 'salaries', payload)

    if (res.status === 200 || res.data.success) {
      alert('Salary created successfully!')
      window.location.assign("/salaries")
    } else {
      alert('Failed to create salary.')
    }
  } catch (err) {
    console.error('Error creating salary:', err)
    alert('Error submitting form.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
.ms-2 {
  margin-left: 10px;
}
</style>

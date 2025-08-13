<template>
  <div class="container mt-4">
    <h2>Edit Payroll Invoice</h2>

    <!-- Payroll Invoice Form -->
    <form @submit.prevent="submitForm">
      <!-- Employee selection -->
      <div class="mb-3">
        <label for="employee" class="form-label">Employee</label>
        <select v-model="formData.employee_id" id="employee" class="form-select" required>
          <option value="" disabled>Select Employee</option>
          <option v-for="emp in employees" :key="emp.id" :value="emp.id">
            {{ emp.name }}
          </option>
        </select>
      </div>

      <!-- Bill date selection -->
      <div class="mb-3">
        <label for="bill_date" class="form-label">Bill Date</label>
        <input v-model="formData.bill_date" type="datetime-local" id="bill_date" class="form-control" required />
      </div>

      <!-- Remarks -->
      <div class="mb-3">
        <label for="remarks" class="form-label">Remarks</label>
        <input v-model="formData.remarks" type="text" id="remarks" class="form-control" required />
      </div>

      <!-- Status -->
      <div class="mb-3">
        <label for="status" class="form-label">Status</label>
        <select v-model="formData.status" id="status" class="form-select" required>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <!-- Payroll items section -->
      <div class="mb-3">
        <label class="form-label">Payroll Items</label>
        <div v-for="(item, index) in formData.items" :key="index" class="mb-2">
          <div class="d-flex">
            <!-- Payroll item selection -->
            <select v-model="item.payroll_item_id" class="form-select" required>
              <option value="" disabled>Select Payroll Item</option>
              <option v-for="payrollItem in items" :key="payrollItem.id" :value="payrollItem.id">
                {{ payrollItem.name }}
              </option>
            </select>
            <!-- Amount input -->
            <input v-model="item.amount" type="number" class="form-control ms-2" placeholder="Amount" required />
            <!-- Remove item button -->
            <button type="button" class="btn btn-danger ms-2" @click="removeItem(index)">Remove</button>
          </div>
        </div>
        <button type="button" class="btn btn-primary" @click="addItem">Add Payroll Item</button>
      </div>

      <!-- Invoice Total (calculated dynamically) -->
      <div class="mb-3">
        <label for="invoice_total" class="form-label">Invoice Total</label>
        <input v-model="invoiceTotal" type="text" id="invoice_total" class="form-control" readonly />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-success">Update Invoice</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

// API URL
const baseUrl = 'http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/'

const employees = ref([])  // Store employees data
const items = ref([])      // Store payroll items data

const formData = ref({
  employee_id: '',
  bill_date: '',
  remarks: '',
  status: 'pending', // Default to 'pending'
  items: []  // Array to store payroll items with payroll_item_id and amount
})

// Get the invoice ID from the route params
const route = useRoute()
const router = useRouter()
const invoiceId = route.params.id

// Calculate the total invoice amount based on the items list
const invoiceTotal = computed(() => {
  return formData.value.items.reduce((total, item) => total + (item.amount || 0), 0)
})

// Normalize the API response data
function normalizeResponsePayload(resp) {
  const data = resp?.data ?? resp
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.employees)) return data.employees
  if (Array.isArray(data?.payroll_items)) return data.payroll_items
  if (Array.isArray(data?.items)) return data.items
  const arr = Object.values(data).find(v => Array.isArray(v))
  return arr || []
}

// Fetch invoice, employees, and payroll items data
onMounted(async () => {
  try {
    // Fetch invoice data
    const invoiceRes = await axios.get(`${baseUrl}payroll_invoices/${invoiceId}`)
    formData.value = invoiceRes.data  // Pre-fill the form with the existing invoice data

    // Fetch employees and payroll items
    const [empRes, itemRes] = await Promise.all([
      axios.get(baseUrl + 'employees'),
      axios.get(baseUrl + 'payroll_items')
    ])

    // Normalize response data
    const empData = normalizeResponsePayload(empRes)
    const itemData = normalizeResponsePayload(itemRes)

    // Map employees data for easier use
    employees.value = empData.map(e => ({
      id: e.id,
      name: `${e.first_name ?? ''} ${e.last_name ?? ''}`.trim() || e.name || `#${e.id}`
    }))

    // Map payroll items data
    items.value = itemData.map(it => ({
      id: it.id,
      name: it.name ?? it.title ?? `#${it.id}`
    }))
  } catch (err) {
    console.error('Error fetching data:', err)
    alert('Failed to load data. Check the console for details.')
  }
})

// Add a new payroll item to the form
function addItem() {
  formData.value.items.push({ payroll_item_id: '', amount: null })
}

// Remove a payroll item from the form
function removeItem(index) {
  formData.value.items.splice(index, 1)
}

// Submit the form data to the backend API
async function submitForm() {
  try {
    // Prepare the payload in the expected structure
    const payload = {
      employee_id: formData.value.employee_id,
      bill_date: formData.value.bill_date,
      remarks: formData.value.remarks,
      invoice_total: invoiceTotal.value.toFixed(2), // Format to 2 decimal places
      status: formData.value.status,
      items: formData.value.items.map(item => ({
        payroll_item_id: item.payroll_item_id,
        amount: item.amount
      }))
    }

    console.log('Submitting payload:', payload)

    // Send data to the API
    const response = await axios.put(`${baseUrl}payroll_invoices/${invoiceId}`, payload)

    if (response.status === 200 || response.data.success) {
      alert('Invoice updated successfully!')
      router.push("/payroll-invoices") // Redirect to invoices list
    } else {
      alert('Failed to update invoice. Please try again later.')
    }
  } catch (err) {
    console.error('Error updating invoice:', err)
    alert('Error submitting the form. Please try again later.')
  }
}
</script>

<style scoped>
/* Styles for the form */
.container {
  max-width: 600px;
  margin: 0 auto;
}

button {
  margin-top: 10px;
}

.mb-2 {
  margin-bottom: 10px;
}

.ms-2 {
  margin-left: 10px;
}
</style>

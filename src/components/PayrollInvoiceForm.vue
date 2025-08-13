<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="employee">Employee</label>
        <select v-model="formData.employee_id" id="employee" required>
          <option v-for="emp in employees" :key="emp.id" :value="emp.id">
            {{ emp.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="invoice_date">Invoice Date</label>
        <input v-model="formData.invoice_date" type="date" id="invoice_date" required />
      </div>

      <div>
        <label>Payroll Items</label>
        <div v-for="(item, index) in formData.details" :key="index" class="payroll-item">
          <select v-model="item.item_id" required>
            <option v-for="payrollItem in items" :key="payrollItem.id" :value="payrollItem.id">
              {{ payrollItem.name }}
            </option>
          </select>
          <input v-model="item.amount" type="number" placeholder="Amount" required />
          <button type="button" @click="removeItem(index)">Remove</button>
        </div>
        <button type="button" @click="addItem">Add Payroll Item</button>
      </div>

      <button type="submit">Create Invoice</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  employees: Array,
  items: Array
})

const emit = defineEmits(['submit'])

const formData = ref({
  employee_id: '',
  invoice_date: '',
  details: []
})

// Add an empty payroll item to the details array
function addItem() {
  formData.value.details.push({ item_id: '', amount: null })
}

// Remove a payroll item from the details array
function removeItem(index) {
  formData.value.details.splice(index, 1)
}

// Submit the form data to the parent
function submitForm() {
  emit('submit', { ...formData.value })
}
</script>

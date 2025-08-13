<template>
  <div class="container mt-4">
    <h2>Payroll Invoice Details</h2>

    <div v-if="loading" class="alert alert-info">Loading data...</div>

    <div v-if="invoice">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Invoice ID: {{ invoice.id }}</h5>
          
          <p><strong>Employee:</strong> {{ getEmployeeName(invoice.employee_id) }}</p>
          <p><strong>Invoice Total:</strong> ${{ invoice.invoice_total }}</p>
          <p><strong>Status:</strong>
            <span :class="`badge bg-${invoice.status === 'paid' ? 'success' : invoice.status === 'pending' ? 'warning' : 'danger'}`">
              {{ invoice.status }}
            </span>
          </p>
          <p><strong>Remarks:</strong> {{ invoice.remarks }}</p>

          <div class="d-flex justify-content-end">
            <router-link :to="'/payroll-invoices/edit/' + invoice.id" class="btn btn-warning">
              <i class="fa fa-pencil-alt"></i> Edit
            </router-link>
            <button @click="deleteInvoice(invoice.id)" class="btn btn-danger ml-2">
              <i class="fa fa-trash-alt"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      invoice: null,
      employees: [],
      loading: true,
      baseUrl: "http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/",
    };
  },
  methods: {
    async fetchInvoice(id) {
      try {
        const response = await axios.get(`${this.baseUrl}payroll_invoices/${id}`);
        this.invoice = response.data;
      } catch (error) {
        console.error("Error fetching invoice", error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchEmployees() {
      try {
        const response = await axios.get(`${this.baseUrl}employees`);
        this.employees = response.data.data; // Adjust according to the response structure
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    },

    getEmployeeName(employeeId) {
      const employee = this.employees.find(emp => emp.id === employeeId);
      return employee ? `${employee.first_name} ${employee.last_name}` : 'Unknown Employee';
    },

    async deleteInvoice(id) {
      if (confirm("Are you sure you want to delete this invoice?")) {
        try {
          await axios.delete(`${this.baseUrl}payroll_invoices/${id}`);
          this.$router.push("/payroll-invoices");
        } catch (error) {
          console.error("Error deleting invoice", error);
        }
      }
    }
  },
  mounted() {
    const invoiceId = this.$route.params.id;
    this.fetchInvoice(invoiceId);
    this.fetchEmployees();
  }
};
</script>

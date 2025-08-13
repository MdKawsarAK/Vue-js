<template>
  <div class="container mt-4">
    <h2 class="mb-4">Payroll Invoices</h2>

    <div class="d-flex justify-content-between mb-4">
      <router-link to="/payroll-invoices/create" class="btn btn-primary">
        <i class="fa fa-plus"></i> Create New Invoice
      </router-link>
    </div>

    <div v-if="invoices.length === 0">
      <div class="alert alert-info">Loading invoices...</div>
    </div>

    <div v-else>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Invoice Total</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td>{{ getEmployeeName(invoice.employee_id) }}</td>
              <td>{{ invoice.invoice_total }}</td>
              <td>
                <span :class="`badge bg-${invoice.status === 'paid' ? 'success' : invoice.status === 'pending' ? 'warning' : 'danger'}`">
                  {{ invoice.status }}
                </span>
              </td>
              <td>{{ invoice.remarks }}</td>
              <td>
                <button class="btn btn-info" @click="viewDetails(invoice.id)">
                  <i class="fa fa-eye"></i> View
                </button>
                <button class="btn btn-warning" @click="editInvoice(invoice.id)">
                  <i class="fa fa-pencil-alt"></i> Edit
                </button>
                <button class="btn btn-danger" @click="deleteInvoice(invoice.id)">
                  <i class="fa fa-trash-alt"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      invoices: [],
      employees: [],
      baseUrl: "http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/",
    };
  },
  methods: {
    async fetchInvoices() {
      try {
        const response = await axios.get(this.baseUrl + "payroll_invoices");
        this.invoices = response.data;
      } catch (error) {
        console.error("Error fetching invoices", error);
      }
    },

    async fetchEmployees() {
      try {
        const response = await axios.get("http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/employees");
        this.employees = response.data.data; // Adjust according to the API response structure
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    },

    getEmployeeName(employeeId) {
      const employee = this.employees.find(emp => emp.id === employeeId);
      return employee ? `${employee.first_name} ${employee.last_name}` : 'Unknown Employee';
    },

    viewDetails(id) {
      this.$router.push(`/payroll-invoices/${id}`);
    },

    editInvoice(id) {
      this.$router.push(`/payroll-invoices/edit/${id}`);
    },

    deleteInvoice(id) {
      axios.delete(`${this.baseUrl}payroll_invoices/${id}`)
        .then(() => {
          this.fetchInvoices(); // Refresh the invoices list after deletion
        })
        .catch(error => console.error("Error deleting invoice", error));
    }
  },
  mounted() {
    this.fetchInvoices();
    this.fetchEmployees();
  }
};
</script>

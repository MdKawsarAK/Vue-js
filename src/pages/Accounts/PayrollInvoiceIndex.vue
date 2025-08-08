<template>
  <div class="container mt-4">
    <h2>Payroll Invoices</h2>

    <button @click="$router.push('/payroll-invoices/create')" class="btn btn-primary mb-3">
      + Create Invoice
    </button>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Invoice No</th>
          <th>Date</th>
          <th>Total Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.invoice_no }}</td>
          <td>{{ invoice.date }}</td>
          <td>{{ invoice.total_amount }}</td>
          <td>
            <button @click="$router.push(`/payroll-invoices/${invoice.id}`)" class="btn btn-info btn-sm">
              View
            </button>
            <button @click="$router.push(`/payroll-invoices/${invoice.id}/edit`)" class="btn btn-warning btn-sm">
              Edit
            </button>
            <button @click="deleteInvoice(invoice.id)" class="btn btn-danger btn-sm">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import payrollInvoiceService from "@/services/payrollInvoiceService";

export default {
  name: "PayrollInvoiceIndex",
  data() {
    return {
      invoices: []
    };
  },
  methods: {
    fetchInvoices() {
      payrollInvoiceService.getAll()
        .then(res => {
          this.invoices = res.data;
        })
        .catch(err => {
          console.error("Error fetching invoices:", err);
        });
    },
    deleteInvoice(id) {
      if (confirm("Are you sure you want to delete this invoice?")) {
        payrollInvoiceService.delete(id)
          .then(() => {
            this.fetchInvoices();
          })
          .catch(err => {
            console.error("Error deleting invoice:", err);
          });
      }
    }
  },
  mounted() {
    this.fetchInvoices();
  }
};
</script>

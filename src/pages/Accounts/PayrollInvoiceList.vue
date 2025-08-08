<template>
  <div>
    <h2>Payroll Invoices</h2>
    <router-link to="/payroll-invoices/create" class="btn btn-primary">+ Add Invoice</router-link>

    <table border="1" cellpadding="8" style="margin-top: 10px; width: 100%;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Employee ID</th>
          <th>Billed At</th>
          <th>Total</th>
          <th>Status</th>
          <th>Remarks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.employee_id }}</td>
          <td>{{ invoice.billed_at }}</td>
          <td>{{ invoice.invoice_total }}</td>
          <td>{{ invoice.status }}</td>
          <td>{{ invoice.remarks }}</td>
          <td>
            <router-link :to="`/payroll-invoices/${invoice.id}`">View</router-link> |
            <router-link :to="`/payroll-invoices/${invoice.id}/edit`">Edit</router-link> |
            <button @click="deleteInvoice(invoice.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import payrollInvoiceService from "../../services/payrollInvoiceService";

export default {
  data() {
    return {
      invoices: []
    };
  },
  methods: {
    async fetchInvoices() {
      const res = await payrollInvoiceService.getAll();
      this.invoices = res.data;
    },
    async deleteInvoice(id) {
      if (confirm("Are you sure?")) {
        await payrollInvoiceService.delete(id);
        this.fetchInvoices();
      }
    }
  },
  mounted() {
    this.fetchInvoices();
  }
};
</script>

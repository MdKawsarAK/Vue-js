<template>
  <div class="container mt-4">
    <h2>Create Payroll Invoice</h2>
    <PayrollInvoiceForm @submit="createInvoice" :employees="employees" :items="items" />
  </div>
</template>

<script>
import PayrollInvoiceForm from "@/components/PayrollInvoiceForm.vue";
import payrollInvoiceService from "@/services/payrollInvoiceService";
import axios from "axios";

export default {
  components: { PayrollInvoiceForm },
  data() {
    return {
      employees: [],
      items: []
    };
  },
  async created() {
    try {
      const [empRes, itemRes] = await Promise.all([
        axios.get("http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/employees"),
        axios.get("http://kawsar.intelsofts.com/Projects/laravel/hr-test/HR/api/payroll_items")
      ]);

      // Adjust if API wraps data in a key
      const employeesData = empRes.data.data || empRes.data;
      const itemsData = itemRes.data.data || itemRes.data;

      this.employees = employeesData.map(e => ({ id: e.id, name: `${e.first_name} ${e.last_name}` }));
      this.items = itemsData.map(i => ({ id: i.id, name: i.name }));
    } catch (error) {
      console.error("Error loading employees or items", error);
    }
  },
  methods: {
    async createInvoice(data) {
      try {
        await payrollInvoiceService.create(data);
        alert("Invoice created successfully!");
        this.$router.push("/accounts/payroll-invoices");
      } catch (error) {
        console.error(error);
        alert("Error creating invoice");
      }
    }
  }
};
</script>

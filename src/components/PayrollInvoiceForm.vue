<template>
  <form @submit.prevent="handleSubmit">
    <!-- Employee -->
    <div class="mb-3">
      <label class="form-label">Employee</label>
      <select v-model="form.employee_id" class="form-control" required>
        <option value="">Select Employee</option>
        <option v-for="emp in employees" :key="emp.id" :value="emp.id">
          {{ emp.first_name }} {{ emp.last_name }}
        </option>
      </select>
    </div>

    <!-- Items -->
    <div v-for="(item, index) in form.items" :key="index" class="row mb-2">
      <div class="col">
        <select v-model="item.item_id" class="form-control" required>
          <option value="">Select Payroll Item</option>
          <option v-for="pi in items" :key="pi.id" :value="pi.id">
            {{ pi.name }}
          </option>
        </select>
      </div>
      <div class="col">
        <input
          type="number"
          v-model.number="item.amount"
          class="form-control"
          placeholder="Amount"
          required
        />
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-danger" @click="removeItem(index)">X</button>
      </div>
    </div>

    <!-- Add Item Button -->
    <button type="button" class="btn btn-secondary mb-3" @click="addItem">
      Add Item
    </button>

    <!-- Submit -->
    <button type="submit" class="btn btn-primary">Create Invoice</button>
  </form>
</template>

<script>
export default {
  props: {
    employees: Array,
    items: Array
  },
  data() {
    return {
      form: {
        employee_id: "",
        items: [{ item_id: "", amount: "" }]
      }
    };
  },
  methods: {
    addItem() {
      this.form.items.push({ item_id: "", amount: "" });
    },
    removeItem(index) {
      this.form.items.splice(index, 1);
    },
    handleSubmit() {
      this.$emit("submit", this.form);
    }
  }
};
</script>

<template>
  <div class="container">
    <h2>Payroll Items</h2>

    <!-- Form -->
    <div class="card p-3 mb-3">
      <h5>{{ form.id ? "Edit Payroll Item" : "Add Payroll Item" }}</h5>
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" class="form-control" placeholder="Item name" />
      </div>
      <div class="form-group mt-2">
        <label>Payroll Item Type</label>
        <select v-model="form.payroll_type_id" class="form-control">
          <option value="">Select Type</option>
          <option v-for="type in itemTypes" :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>
      <div class="mt-3">
        <button class="btn btn-success" @click="saveItem">
          {{ form.id ? "Update" : "Save" }}
        </button>
        <button v-if="form.id" class="btn btn-secondary ms-2" @click="resetForm">
          Cancel
        </button>
      </div>
    </div>

    <!-- Table -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Item Name</th>
          <th>Type</th>
          <th style="width: 150px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="items.length === 0">
          <td colspan="4" class="text-center">No payroll items found</td>
        </tr>
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.type?.name }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1" @click="editItem(item)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import payrollItemService from "@/services/payrollItemService";
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      itemTypes: [],
      form: {
        id: null,
        name: "",
        payroll_type_id: ""
      }
    };
  },
  mounted() {
    this.loadItems();
    this.loadItemTypes();
  },
  methods: {
    async loadItems() {
      try {
        let res = await payrollItemService.getAll();
        this.items = res.data.data || res.data;
      } catch (err) {
        console.error(err);
        alert("Failed to load payroll items");
      }
    },
    async loadItemTypes() {
      try {
        let res = await axios.get("/api/payroll_item_types");
        this.itemTypes = res.data.data || res.data;
      } catch (err) {
        console.error(err);
        alert("Failed to load item types");
      }
    },
    async saveItem() {
      if (!this.form.name || !this.form.payroll_type_id) {
        alert("Please fill all fields");
        return;
      }
      try {
        if (this.form.id) {
          await payrollItemService.update(this.form.id, this.form);
          alert("Item updated successfully");
        } else {
          await payrollItemService.create(this.form);
          alert("Item added successfully");
        }
        this.resetForm();
        this.loadItems();
      } catch (err) {
        console.error(err);
        alert("Failed to save item");
      }
    },
    editItem(item) {
      this.form = { ...item, payroll_type_id: item.payroll_type_id };
    },
    async deleteItem(id) {
      if (!confirm("Are you sure you want to delete this item?")) return;
      try {
        await payrollItemService.delete(id);
        this.items = this.items.filter(i => i.id !== id);
        alert("Item deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Failed to delete item");
      }
    },
    resetForm() {
      this.form = { id: null, name: "", payroll_type_id: "" };
    }
  }
};
</script>

<style>
.container {
  max-width: 900px;
  margin: auto;
}
</style>

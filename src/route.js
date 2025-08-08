// src/route.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue'
import About from './components/About.vue'
import JsonCom from './components/JsonCom.vue'
import ComputedCom from './components/ComputedCom.vue'
import ReactiveCom from './components/reactiveCom.vue'
import Dashboard from './components/Dashboard.vue'


import Customer from './pages/customers/index.vue'
import ShowCustomer from './pages/customers/show.vue'
import CreateCustomer from './pages/customers/create.vue'
import EditCustomer from './pages/customers/edit.vue'
import DeleteCustomer from './pages/customers/delete.vue'


import Orders from './pages/orders/index.vue'
import ShowOrder from './pages/orders/show.vue'
import CreateOrder from './pages/orders/create.vue'
import DeleteOrder from './pages/orders/delete.vue'

import Example from './pages/examples/index.vue'
import Vendor from './pages/vendors/index.vue'
// import Vendor from './pages/Dashboard/index.vue'



import index from './pages/employees/index.vue';
import Create from './pages/employees/Create.vue';
import Edit from './pages/employees/edit.vue';
import show from './pages/employees/show.vue';

 import PayrollInvoiceIndex from "./pages/Accounts/PayrollInvoiceIndex.vue";
import PayrollInvoiceList from "./pages/Accounts/PayrollInvoiceList.vue";
import PayrollInvoiceCreate from "./pages/Accounts/PayrollInvoiceCreate.vue";
// import PayrollInvoiceEdit from "./pages/Accounts/PayrollInvoiceEdit.vue";
// import PayrollInvoiceView from "./pages/Accounts/PayrollInvoiceView.vue";
// Add other page imports here


const routes = [
  { path:'/', component: Dashboard },
  { path:'/about', component: About },
  { path:'/book',component:ComputedCom},
  { path:'/list',component:JsonCom},
  { path:'/counter',component:ReactiveCom},
  
  { path:'/customers',component:Customer},
  { path:'/customers/create',component:CreateCustomer},
  { path:'/customers/show/:id',component:ShowCustomer},
  { path:'/customers/edit/:id',component:EditCustomer},
  { path:'/customers/delete/:id',component:DeleteCustomer},

  { path:'/orders',component:Orders},
  { path:'/orders/create',component:CreateOrder},
  { path:'/orders/show/:id',component:ShowOrder},
  { path:'/orders/delete/:id',component:DeleteOrder},


  { path:'/vendors',component:Vendor},
  { path:'/examples',component:Example},
  
  {
    path: '/',
    redirect: '/employees',
  },
  {
    path: '/employees',component:index,},
  {
    path: '/employees/create',component:Create,},
  {
    path: '/employees/edit/:id',component:Edit, props: true,},
  {
    path: '/employees/:id',component: show, props: true,
  },

 


  { path: "/payroll-invoices", component: PayrollInvoiceIndex },
    { path: "/payroll-invoices", name: "PayrollInvoiceList", component: PayrollInvoiceList },
  { path: "/payroll-invoices/create", name: "PayrollInvoiceCreate", component: PayrollInvoiceCreate },
  // { path: "/payroll-invoices/:id/edit", name: "PayrollInvoiceEdit", component: PayrollInvoiceEdit, props: true },
  // { path: "/payroll-invoices/:id", name: "PayrollInvoiceView", component: PayrollInvoiceView, props: true }
  // We’ll add create/edit/view later



]

  

const router = createRouter({
  history: createWebHistory('/Projects/Vue/'),
  routes
})

export default router

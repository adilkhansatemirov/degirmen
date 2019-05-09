import NewOrder from "./NewOrderComponents/NewOrder.vue";
import CurrentOrders from "./CurrentOrdersComponents/CurrentOrders.vue";
import Admin from "./AdminComponents/Admin.vue";
import Login from "./LoginComponents/Login.vue";
import ControlPannel from "./UserComponents/ControlPannel";

export default [
  { path: "/", component: NewOrder , meta: { requiresAuth: true }},
  { path: "/orders", component: CurrentOrders , meta: { requiresAuth: true }},
  { path: "/update/:orderId", component: NewOrder , meta: { requiresAuth: true }},
  { path: "/admin", component: Admin, meta: { requiresAuth: true } },
  { path: "/login", component: Login , meta: { requiresGuest: true }},
  { path: "/controlPannel", component: ControlPannel , meta: { requiresAuth: true }},
];

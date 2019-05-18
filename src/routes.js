import NewOrder from "./NewOrderComponents/NewOrder.vue";
import CurrentOrders from "./CurrentOrdersComponents/CurrentOrders.vue";
import Admin from "./AdminComponents/Admin.vue";
import Login from "./LoginComponents/Login.vue";
import ControlPannel from "./UserComponents/ControlPannel.vue";
import History from "./HistoryComponents/History.vue";
import Period from "./HistoryComponents/Period.vue";

export default [
  { path: "/", component: NewOrder, meta: { requiresAuth: true } },
  { path: "/orders", component: CurrentOrders, meta: { requiresAuth: true } },
  {
    path: "/update/:orderId",
    component: NewOrder,
    meta: { requiresAuth: true }
  },
  { path: "/admin", component: Admin, meta: { requiresAuth: true } },
  { path: "/login", component: Login, meta: { requiresGuest: true } },
  {
    path: "/controlPannel",
    component: ControlPannel,
    meta: { requiresAuth: true }
  },
  {
    path: "/history",
    component: History,
    meta: { requiresAuth: true },
    children: [
      {
        name: "today",
        path: "today",
        component: Period
      },
      {
        name: "yesterday",
        path: "yesterday",
        component: Period
      },
      {
        name: "january",
        path: "january",
        component: Period
      },
      {
        name: "february",
        path: "february",
        component: Period
      },
      {
        name: "march",
        path: "march",
        component: Period
      },
      {
        name: "april",
        path: "april",
        component: Period
      },
      {
        name: "may",
        path: "may",
        component: Period
      },
      {
        name: "june",
        path: "june",
        component: Period
      },
      {
        name: "july",
        path: "july",
        component: Period
      },
      {
        name: "august",
        path: "august",
        component: Period
      },
      {
        name: "september",
        path: "september",
        component: Period
      },
      {
        name: "october",
        path: "october",
        component: Period
      },
      {
        name: "november",
        path: "november",
        component: Period
      },
      {
        name: "december",
        path: "december",
        component: Period
      }
    ]
  }
];

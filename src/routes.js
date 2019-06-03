import NewOrder from './NewOrderComponents/NewOrder.vue';
import CurrentOrders from './CurrentOrdersComponents/CurrentOrders.vue';
import Admin from './AdminComponents/Admin.vue';
import Login from './LoginComponents/Login.vue';
import ControlPannel from './UserComponents/ControlPannel.vue';
import History from './HistoryComponents/History.vue';
import Period from './HistoryComponents/Period.vue';

export default [
  { path: '/', component: NewOrder, meta: { requiresAuth: true } },
  { path: '/orders', component: CurrentOrders, meta: { requiresAuth: true } },
  {
    path: '/update/:orderId',
    component: NewOrder,
    meta: { requiresAuth: true }
  },
  { path: '/admin', component: Admin, meta: { requiresAuth: true } },
  { path: '/login', component: Login, meta: { requiresGuest: true } },
  {
    path: '/controlPannel',
    component: ControlPannel,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    component: History,
    meta: { requiresAuth: true },
    children: [
      {
        name: 'Сегодня',
        path: 'today',
        component: Period
      },
      {
        name: 'Вчера',
        path: 'yesterday',
        component: Period
      },
      {
        name: 'Январь',
        path: 'january',
        component: Period
      },
      {
        name: 'Февраль',
        path: 'february',
        component: Period
      },
      {
        name: 'Март',
        path: 'march',
        component: Period
      },
      {
        name: 'Апрель',
        path: 'april',
        component: Period
      },
      {
        name: 'Май',
        path: 'may',
        component: Period
      },
      {
        name: 'Июнь',
        path: 'june',
        component: Period
      },
      {
        name: 'Июль',
        path: 'july',
        component: Period
      },
      {
        name: 'Август',
        path: 'august',
        component: Period
      },
      {
        name: 'Сентябрь',
        path: 'september',
        component: Period
      },
      {
        name: 'Октябрь',
        path: 'october',
        component: Period
      },
      {
        name: 'Ноябрь',
        path: 'november',
        component: Period
      },
      {
        name: 'Декабрь',
        path: 'december',
        component: Period
      }
    ]
  }
];

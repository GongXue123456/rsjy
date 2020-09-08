import Vue from 'vue'
import Router from 'vue-router'
import PagesView from '../views/PagesView'
import HomeView from '../views/HomeView'
import ClassifyView from '../views/ClassifyView'
import LoginView from '../views/LoginView'
import SearchView from '../views/SearchView'
import CompanyListView from '../views/CompanyListView'
import CompanyDetailView from '../views/CompanyDetailView'
import OrderMeunView from '../views/OrderMeunView'
import ClassifyTwoView from '../views/ClassifyTwoView'
import IntroduceMenu from '../views/IntroduceMenu'
import ShopListView from '../views/ShopListView'
import DetailView from '../views/DetailView'
import CartView from '../views/CartView'
import MyView from '../views/my/MyView'
import AccountView from '../views/my/AccountView'
import BudgetListView from '../views/my/BudgetListView'
import RechargeView from '../views/my/RechargeView'
import NoticeView from '../views/my/NoticeView'
import AddressListView from '../views/my/AddressListView'
import ConfirmOrderView from '../views/ConfirmOrderView'
import OrderList from '../views/OrderList'
import MyOrderView from '../views/my/MyOrderView'
import OrderDetailView from '../views/my/OrderDetailView'
import EditAddressView from '../views/my/EditAddressView'
import NewAddressView from '../views/my/NewAddressView'
import PayMent from '../views/my/PayMent'
Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    redirect: '/pages/'
  },
  {
    path: '/pages',
    component: PagesView,
    children: [
    {
      path: '',
      redirect: '/pages/home'
    },
    {
      path: 'home',
      name: 'HomeView',
      component: HomeView,
      meta:{index:0,keepAlive: true }
    },
    {
      path: 'classify',
      name: 'ClassifyView',
      component: ClassifyView,
      meta:{index:1,keepAlive: true }
    },
    {
      path: 'shoplist',
      name: 'ShopListView',
      component: ShopListView,
      meta:{index:2,keepAlive: true }
    },{
      path: 'cart',
      name: 'CartView',
      component: CartView,
      meta:{index:3,keepAlive: true }
    },{
      path: 'my',
      name: 'MyView',
      component: MyView,
      meta:{index:4,keepAlive: true }
    }]
  },
  {
    path: '/classifytwo',
    name: 'ClassifyTwoView',
    component: ClassifyTwoView
  },
  {
    path: '/detail',
    name: 'DetailView',
    component: DetailView
  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView
  },{
    path: '/company',
    name: 'CompanyListView',
    component: CompanyListView
  },{
    path: '/companyDetail',
    name: 'CompanyDetailView',
    component: CompanyDetailView
  },
  {
    path: '/ordermenu',
    name: 'OrderMeunView',
    component: OrderMeunView
  },
  {
    path: '/introducemenu',
    name: 'IntroduceMenu',
    component: IntroduceMenu
  }, {
    path: '/confirmorder',
    name: 'ConfirmOrderView',
    component: ConfirmOrderView,
  }, {
    path: '/orderlist',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/account',
    name: 'AccountView',
    component: AccountView
  },
  {
    path: '/budgetlist',
    name: 'BudgetListView',
    component: BudgetListView
  },
  {
    path: '/recharge',
    name: 'RechargeView',
    component: RechargeView
  },{
    path: '/payment',
    name: 'PayMent',
    component: PayMent
  },
  {
    path: '/notice',
    name: 'NoticeView',
    component: NoticeView
  }, {
    path: '/addresslist',
    name: 'AddressListView',
    component: AddressListView
  }, {
    path: '/editaddress',
    name: 'EditAddressView',
    component: EditAddressView
  }, {
    path: '/newaddress',
    name: 'NewAddressView',
    component: NewAddressView
  },{
    path: '/myorder',
    name: 'MyOrderView',
    component: MyOrderView
  },
  {
    path: '/orderdetail',
    name: 'OrderDetailView',
    component: OrderDetailView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '*',
    redirect: '/pages/'
  }]
})


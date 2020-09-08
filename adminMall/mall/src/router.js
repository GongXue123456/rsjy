import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('./views/Login.vue')
const Admin = () => import('./views/pages/Admin')

const Shop = () => import('./views/pages/shop')
const Skuadd = () => import('./views/pages/shop/skuadd')
const Skuedit = () => import('./views/pages/shop/skuedit')

const Spuadd = () => import('./views/pages/shop/spuadd')
const Spuedit = () => import('./views/pages/shop/spuedit')

const Combo = () => import('./views/pages/combo')
const ComboAdd = () => import('./views/pages/combo/add')
const ComboEdit = () => import('./views/pages/combo/edit')

const Bill = () => import('./views/pages/bill')
const BillAdd = () => import('./views/pages/bill/add')
const BillEdit = () => import('./views/pages/bill/edit')

const Category = () => import('./views/pages/category')
const CategoryAdd = () => import('./views/pages/category/add')
const CategoryEdit = () => import('./views/pages/category/edit')

const Attrkey = () => import('./views/pages/attrkey')
const AttrkeyAdd = () => import('./views/pages/attrkey/add')
const AttrkeyEdit = () => import('./views/pages/attrkey/edit')

const AttrValueIndex = () => import('./views/pages/attrkey/attrValueIndex')
const AttrValueAdd = () => import('./views/pages/attrkey/attrValueAdd')
const AttrValueEdit = () => import('./views/pages/attrkey/attrValueEdit')

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      redirect: {
        name: 'admin-shop'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'shop',
          name: 'admin-shop',
          component: Shop
        },
        {
          path: 'shop/skuadd',
          component: Skuadd
        },
        {
          path: 'shop/skuedit',
          component: Skuedit
        },
        {
          path: 'shop/spuadd',
          name: 'shop-spuadd',
          component: Spuadd
        },
        {
          path: 'shop/spuedit',
          name: 'shop-spuedit',
          component: Spuedit
        },
        {
          path: 'combo',
          name: 'combo',
          component: Combo
        },
        {
          path: 'combo/add',
          name: 'combo-add',
          component: ComboAdd
        },
        {
          path: 'combo/edit',
          name: 'combo-edit',
          component: ComboEdit
        },
        {
          path: 'bill',
          name: 'bill',
          component: Bill
        },
        {
          path: 'bill/add',
          name: 'bill-add',
          component: BillAdd
        },
        {
          path: 'bill/edit',
          name: 'bill-edit',
          component: BillEdit
        },
        {
          path: 'category',
          name: 'category',
          component: Category
        },
        {
          path: 'category/add',
          name: 'category-add',
          component: CategoryAdd
        },
        {
          path: 'category/edit',
          name: 'category-edit',
          component: CategoryEdit
        },
        {
          path: 'attrkey',
          name: 'attrkey',
          component: Attrkey
        },
        {
          path: 'attrkey/add',
          name: 'attrkey-add',
          component: AttrkeyAdd
        },
        {
          path: 'attrkey/edit',
          name: 'attrkey-edit',
          component: AttrkeyEdit
        },
        {
          path: 'attrkey/attrvalueindex',
          name: 'attrValue',
          component: AttrValueIndex
        },
        {
          path: 'attrkey/attrvalueadd',
          name: 'attrValue-add',
          component: AttrValueAdd
        },
        {
          path: 'attrkey/attrvalueedit',
          name: 'attrValue-edit',
          component: AttrValueEdit
        }
      ]
    }
  ]
})

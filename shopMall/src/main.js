
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueCookies from 'vue-cookies'
import './until/rem'
import '../static/css/base.css'
Vue.use(VueCookies)
Vue.config.productionTip = false
import { Button,Tabbar, TabbarItem,Search,NavBar,Toast,Swipe, SwipeItem,Lazyload,Tab, Tabs,Cell, CellGroup,Card,Tag,Row, Col,TreeSelect,DropdownMenu, DropdownItem,Grid, GridItem,Image,List,Checkbox, CheckboxGroup,Overlay,SubmitBar,Popup,GoodsAction,GoodsActionButton,Sku,Panel,AddressList,Dialog,DatetimePicker,Notify,Field,AddressEdit,PasswordInput,ContactCard,SwitchCell,Picker,ActionSheet,RadioGroup,Radio  } from 'vant';

Vue.use(Button).use(Tabbar).use(TabbarItem).use(Search).use(NavBar).use(Toast).use(Swipe).use(SwipeItem).use(Lazyload).use(Tab).use(Tabs).use(Cell).use(CellGroup).use(Card).use(Tag).use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Grid).use(GridItem).use(Image).use(TreeSelect).use(List).use(Checkbox).use(CheckboxGroup).use(Overlay).use(SubmitBar).use(Popup).use(GoodsAction).use(GoodsActionButton).use(Sku).use(Panel).use(AddressList).use(Dialog).use(DatetimePicker).use(Notify).use(Field).use(AddressEdit).use(PasswordInput).use(ContactCard).use(SwitchCell).use(Picker).use(ActionSheet).use(RadioGroup).use(Radio);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

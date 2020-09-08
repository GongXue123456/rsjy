import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router/index.js'
import 'amfe-flexible'
import "./public.css";
import '../static/css/base.css'
import './store/modules/body_type'
import store from './store'
import {Button,Tabbar,Form, TabbarItem,Radio,RadioGroup,Search,NavBar,Toast,Swipe, SwipeItem,Lazyload,Tab, Tabs,Cell, CellGroup,Card,Tag,Row, Col,TreeSelect,DropdownMenu, DropdownItem,Grid, GridItem,Image,List,Checkbox, CheckboxGroup,Overlay,SubmitBar,Popup,GoodsAction,GoodsActionButton,Sku,Panel,AddressList,Dialog,DatetimePicker,Notify,Field,AddressEdit,PasswordInput,ContactCard,SwitchCell,Picker,ActionSheet,Uploader,ImagePreview,Steps,Step,Rate,Icon} from 'vant';

Vue.use(Button).use(Tabbar).use(Form).use(TabbarItem).use(Radio).use(RadioGroup).use(Search).use(NavBar).use(Toast).use(Swipe).use(SwipeItem).use(Lazyload).use(Tab).use(Tabs).use(Cell).use(CellGroup).use(Card).use(Tag).use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Grid).use(GridItem).use(Image).use(TreeSelect).use(List).use(Checkbox).use(CheckboxGroup).use(Overlay).use(SubmitBar).use(Popup).use(GoodsAction).use(GoodsActionButton).use(Sku).use(Panel).use(AddressList).use(Dialog).use(DatetimePicker).use(Notify).use(Field).use(AddressEdit).use(PasswordInput).use(ContactCard).use(SwitchCell).use(Picker).use(ActionSheet).use(Uploader).use(ImagePreview).use(Steps).use(Step).use(Rate).use(Icon);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

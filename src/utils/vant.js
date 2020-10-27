import Vue from 'vue'
import 'vant/lib/index.css'
import { NavBar, Tabbar, TabbarItem, Toast,Image as VanImage ,Button,Form,Field,Popup } from 'vant'
Vue.use(NavBar)
Vue.use(Button);  
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Form);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Popup);
Vue.prototype.$Toast = Toast

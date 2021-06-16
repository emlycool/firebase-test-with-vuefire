import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'
import {DatePicker, Dialog, Notification, Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import FormGroup from '@/components/web-components/form/FormGroup'
import FormInput from '@/components/web-components/form/FormInput'
import FormTextarea from '@/components/web-components/form/FormTextarea'
import FormCheckbox from '@/components/web-components/form/FormCheckbox'
import Helpers from '@/utils/helpers'

Vue.config.productionTip = false
Vue.use(vuelidate)
// configure language
locale.use(lang)
Vue.use(Dialog)
Vue.use(DatePicker)

Vue.component('FormGroup', FormGroup)
Vue.component('FormInput', FormInput)
Vue.component('FormTextarea', FormTextarea)
Vue.component('FormCheckbox', FormCheckbox)

Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$utils = Helpers
store.dispatch('user/tryAutoLogin')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

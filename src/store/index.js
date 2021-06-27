import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './user'
import TaskModule from './task'
import { vuexfireMutations } from 'vuexfire'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
		...vuexfireMutations,
	},
	actions: {
		
	},
	modules: {
		user: UserModule,
		task: TaskModule
	}
})

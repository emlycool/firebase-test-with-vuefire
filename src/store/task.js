import {firestoreAction } from 'vuexfire'
import db from '@/firebase/firestore'
import taskRepository from '@/repositories/taskRepository'


export default {
	namespaced: true,

    state: {
        tasks: []

	},
	mutations: {


	},
	actions: {
		bindTasks: firestoreAction(({ bindFirestoreRef }) => {
            // return the promise returned by `bindFirestoreRef`
            return bindFirestoreRef('tasks', db.collection('tasks').orderBy('created_at', 'desc') )
        }),

        unbindTasks: firestoreAction(({ unbindFirestoreRef }) => {
            unbindFirestoreRef('tasks')
            
        }),

        storeTask(context, data){
            return taskRepository.addDocument(data)
        },

        updateTask(context, data){
             return taskRepository.updateDocument(data, data.id)
        },

        deleteTask(context, taskId){
            return taskRepository.deleteDocument(taskId)
        }

	},

    getters:{
        getTasks(state){
            return state.tasks
        }
    }
}
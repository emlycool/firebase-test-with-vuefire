<template>
    <div>
        <div class="card">
            <div class="body row">

                <div class="col-lg-12">
                    <div class="row my-4 justify-content-end mx-3">
                        <button class="btn btn-primary" @click.prevent="$refs.TodoForm.addAction()">
                            Add Task
                        </button>
                    </div>
                </div>

                <div class="col-lg-12">
                    <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Deadline</th>
                                <th>***</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(task, i) in tasks" :key="i">
                                <td>#</td>
                                <td>{{task.name}}</td>
                                <td>{{task.description}}</td>
                                <td>{{task.status? 'completed': 'not completed'}}</td>
                                <td>{{task.deadline? $utils.methods.fromNow(task.deadline) : 'Not specified' }}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary" @click="$refs.TodoForm.updateAction(task)">Edit</button>
                                    <button class="btn btn-sm btn-danger ml-2" @click="destroyTask(task.id)">Delete</button>
                                </td>
                            </tr>
                            <tr v-if="!tasks.length">
                                <td colspan="6">
                                    <div class="text-center">
                                        No task available
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>

        <TodoForm ref="TodoForm" @createTask="createTask" @updateTask="editTask"></TodoForm>

    </div>
</template>

<script>
import TodoForm from '@/components/todos/TodoForm'
import taskRepository from '@/repositories/taskRepository'
import { mapActions, mapGetters } from 'vuex'

export default {
    components:{
        TodoForm
    },
    data() {
        return {
        }
    },

    created(){
        // this.getTasks()
        this.$store.dispatch('task/bindTasks')
    },

    computed: {
        // ...mapGetters('task', {
        //     tasks: 'getTasks'
        // })
        tasks(){
            return this.$store.getters['task/getTasks'].map( task => ({...task, id: task.id}))
        }
    },

    methods:{
        ...mapActions('task', {
           storeTask: 'storeTask',
           updateTask: 'updateTask', 
           deleteTask: 'deleteTask',
        }),

        createTask(data){
            this.storeTask(data).then(() => {
                this.$message.success('Task created')
                this.$refs.TodoForm.hideModal()
            })
            .catch((e) => {
                console.error(e);

                this.$message.error("Something wrong happened")
            })
           
        },

        editTask(data){
            this.updateTask(data)
            .then(() => {
                this.$message.success('Task updated')
                this.$refs.TodoForm.hideModal()

            })
            .catch((e) => {
                this.$message.error("Something wrong happened")
                console.error(e);
            })
           
        }, 

        destroyTask(taskId){
            this.deleteTask(taskId)
            .then(() => {
                this.$message.success('Task Delete')
            })
            .catch((e) => {
                this.$message.error("Something wrong happened")
                console.error(e);
            })
        }
    }
}
</script>
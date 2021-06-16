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
                                    <button class="btn btn-sm btn-danger ml-2" @click="deleteTask(task.id)">Delete</button>
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

        <TodoForm ref="TodoForm" @createTask="createTask" @updateTask="updateTask"></TodoForm>

    </div>
</template>

<script>
import TodoForm from '@/components/todos/TodoForm'
import taskRepository from '@/repositories/taskRepository'

export default {
    components:{
        TodoForm
    },
    data() {
        return {
            tasks: [],
        }
    },

    created(){
        this.getTasks()
    },

    methods:{
        getTasks(){
            this.tasks = taskRepository.getTasks().tasks
        },
        createTask(data){
            taskRepository.addDocument(data).then(() => {
                this.$message.success('Task created')
                this.tasks.splice(0, 0, data)
                this.$refs.TodoForm.hideModal()
            })
            .catch((e) => {
                console.error(e);

                this.$message.error("Something wrong happened")
            })
           
        },

        updateTask(data){
            taskRepository.updateDocument(data, data.id)
            .then(() => {
                this.$message.success('Task updated')
                let taskIndex = this.tasks.findIndex(({id}) => id === data.id)
                if(taskIndex > -1){
                    this.$set(this.tasks, taskIndex, data)
                }
                this.$refs.TodoForm.hideModal()

            })
            .catch((e) => {
                this.$message.error("Something wrong happened")
                console.error(e);
            })
           
        }, 

        deleteTask(taskId){
            taskRepository.deleteDocument(taskId)
            .then(() => {
                this.$message.success('Task Delete')
                let taskIndex = this.tasks.findIndex(({id}) => id === taskId)
                if(taskIndex > -1){
                    this.tasks.splice(taskIndex, 1)
                }
            })
        }
    }
}
</script>
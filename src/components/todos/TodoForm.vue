<template>
    <div>
        <el-dialog
               :visible.sync="previewModal"
                width="50%"
            >

            <div class="mx-2">
                <form>

                    <FormGroup :label="'Task Name'" class="mb-2"
                    :validationBag="[
                        {condition: !$v.task.name.required, message: 'Task name is required'},
                        {   condition: $v.task.name.required && !$v.task.name.minLength,
                            message: `Task name should be greater than ${$v.task.name.$params.minLength.min} characters`
                        },
                    ]">
                        <FormInput class="form-control" :hasError="$v.task.name.$error" v-model="$v.task.name.$model"  />

                    </FormGroup>

                    <FormGroup :label="'Task Description'" class="mb-2"
                    :validationBag="[
                        {condition: !$v.task.description.required, message: 'Task description is required'},
                        {   condition: $v.task.description.required && !$v.task.description.minLength,
                            message: `Task description should be greater than ${$v.task.description.$params.minLength.min} characters`
                        },
                    ]">
                        <FormTextarea class="form-control" row="2" :hasError="$v.task.description.$error" v-model="$v.task.description.$model"  />

                    </FormGroup>

                    <FormGroup :label="'Status'" class="mb-2"
                    :validationBag="[
                      
                    ]">
                        <FormCheckbox  :hasError="$v.task.description.$error" v-model="$v.task.status.$model">Completed </FormCheckbox>

                    </FormGroup>

                    <FormGroup :label="'Deadline'" class="mb-2"
                    >
                        <ElDatePicker v-model="$v.task.deadline.$model" class="ml-3"></ElDatePicker>

                    </FormGroup>


                </form>
            </div>


            <template #footer>
                <div class="row justify-content-end">
                    <button class="btn btn-secondary mr-3" @click="previewModal = false">Close</button>

                    <button type="button" :class="{'disabled': sendingRequest}" class="btn btn-primary" @click.prevent="formSubmit" v-if="isEditing">
                        <span v-if="!sendingRequest">Update Task</span>
                        <div class="spinner-border" role="status" v-else>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </button>

                    <button type="button" :class="{'disabled': sendingRequest}" class="btn btn-primary" @click.prevent="formSubmit"  v-else>
                        <span v-if="!sendingRequest">Create Task</span>
                        <div class="spinner-border" role="status" v-else>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </button>
                </div>
            </template>

        </el-dialog>
        
    </div>
</template>

<script>

import { required, minLength} from 'vuelidate/lib/validators'


export default {
    data() {
        return {
            previewModal: false,
            sendingRequest: false,
            isEditing: false,
            task: this.formFields()

        }
    },

    validations:{
        task:{
            name: {
                required,
                minLength: minLength(5)
            },
            description: {
                required,
                minLength: minLength(10),
            },
            status: {required},
            deadline: {}
        }
    },

    created(){
        
    },

    methods:{
        showModal(){
            this.previewModal = true

        },
        hideModal(){
            this.previewModal = false
        },
        validateForm(){
            this.$v.task.$touch()
            let isValid = !this.$v.task.$invalid
            console.log({isValid});

            return isValid
        },
        formSubmit(){
            
            if(!this.validateForm()) return
            // console.log('isEditing', this.isEditing, 'task', this.task, 'deadline',this.task.deadline);
            // console.log(new Date(this.task.deadline).toISOString());
            // return
            let task = {...this.task}
            if(task.deadline)
                task.deadline = this.task.deadline instanceof Date? this.task.deadline.toISOString() : new Date( this.task.deadline).toISOString()

            if(!this.isEditing)
                this.$emit('createTask', task)

            else 
                this.$emit('updateTask', task)

            this.$v.$reset()


         
        },
        formFields(){
            return {
                name: '',
                description: '',
                status: null,
                deadline: ''
            }
        },
        addAction(){
            this.task = this.formFields()
            this.isEditing = false
            this.showModal()
        },

        updateAction(task){
            this.task = {...this.task, ...task}
            this.isEditing = true
            this.showModal()
        }
    }
}
</script>
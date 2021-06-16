<template>
    <div>
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div class="col-lg-6">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                            <form class="user" @submit.prevent="login">
                                <div class="alert alert-danger my-3" v-if="errors.errors">
                                    {{errors.errors.email[0]}}
                                </div>

                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user"
                                        id="email" placeholder="Enter Email Address..."
                                    :class="{'is-invalid': $v.credentials.email.$error}"
                                    v-model.lazy="$v.credentials.email.$model">
                                    <span class="invalid-feedback" v-if="$v.credentials.email.$error && !$v.credentials.email.required">
                                        Email address is required
                                    </span>
                                    <span class="invalid-feedback" v-if="$v.credentials.email.$error && !$v.credentials.email.email">
                                        Email address is invalid
                                    </span>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-user"
                                        id="password" placeholder="Password"
                                       :class="{'is-invalid': $v.credentials.password.$error}"
                                    v-model="$v.credentials.password.$model">

                                    <span class="invalid-feedback" v-if="$v.credentials.password.$error && !$v.credentials.password.required">
                                        Password is required
                                    </span>
                                </div>

                                <button type="submit" class="btn btn-primary btn-user btn-block">
                                    <span v-if="!sendingRequest">Sign In</span>
                                    <div class="spinner-border spinner-border-sm" role="status" v-else>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </button>

                            </form>
                            <hr>
                            <div class="text-center">
                                <router-link :to="{name: 'ForgotPassword'}">Forgot Password?</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email} from 'vuelidate/lib/validators'


export default {
    data() {
        return {
            credentials:{
                email: '',
                password: ''
            },
            sendingRequest: false
        }
    },
    validations:{
        credentials:{
            email:{
                required,
                email
            },
            password: {required}
        }
    },
    computed:{
        errors: function() {
            return this.$store.state.user.authErrors
        }
    },
    methods:{

        validate(){
            let isValid = true
            this.$v.credentials.$touch()

            isValid = !this.$v.credentials.$invalid

            return isValid
        },

        login(){
            if(!this.validate() ||  this.sendingRequest) return

            this.sendingRequest = true
            this.$store.dispatch('login', this.credentials).then( () =>{
                this.sendingRequest = false
            })
        },

    }
}
</script>
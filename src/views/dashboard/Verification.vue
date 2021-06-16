<template>
    <div>
        <header-banner>
            <span slot="bannerName">Verification</span>
        </header-banner>

        <div class="clear"></div>
        <div class="my-5 py-3">
            <div class="container">
                
                <div class="d-flex justify-content-center">
                    <div class="col-md-9">
                        <div class="card border" v-if="!isVerified">
                            <div class="header py-5 text-center" style="background-color: #040404;">
                                <h3 class="text-white">Verification Needed</h3>

                            </div>
                            <div class="body py-5 px-2 px-md-5 mx-lg-3">
                                <div v-if="verification.attempt == 0">
                                    <span>To proceed, you have to verify your account. Once you click "verify" a mail will be sent to your email. "{{signedUser.email}}"</span> 
                                    <button class="submit ml-3" @click="sendVerification" :class="{'disabled': sendingRequest}" :disabled="sendingRequest">
                                        <span v-if="!sendingRequest">Verify</span>
                                            <div class="spinner-border" role="status" v-else>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                                <div v-else>
                                    Email sent to "{{signedUser.email}}". 
                                    <button class="submit ml-2" @click="sendVerification" :class="{'disabled': sendingRequest}" :disabled="sendingRequest">
                                        <span v-if="!sendingRequest">Retry</span>
                                            <div class="spinner-border" role="status" v-else>
                                                <span class="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
                                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderBanner from '@/components/web-widgets/HeaderBanner'

export default {
    data() {
        return {
            verification:{
                attempt: 0
            },
            sendingRequest: false
        }
    },
    components:{
        HeaderBanner
    },
    computed:{
        ...mapGetters([
            'signedUser',
            'isVerified'
        ])
    },
    methods:{
        sendVerification(){
            if(this.sendingRequest) return 
            
            this.sendingRequest = true
            this.$store.dispatch('sendverificationEmail').then( () => {
                this.verification.attempt++
                this.sendingRequest = false
            })

        },
        
    },
    created(){
        // console.log(this.$store.getters.isVerified)
    }
}
</script>

<style lang="scss">
</style>
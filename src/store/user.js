import http from '@/util/http'
import router from '@/router/index.js';
import {Notification, Loading} from 'element-ui'

export default {
    namespaced: true,
    state: {
        token: '',
        userDetails: {},
        authErrors: {}
    },
    mutations: {
        setAuthUser(state, {user}){
            state.userDetails = user
        },
        setToken(state, {token}){
            state.token = token
        },
        clearAuthData(state){
            state.token = ''
            state.userDetails = ''
        },
        setAuthErrors(state, errors = {}){
            state.authErrors = errors
        }
    },

    actions: {
        async getLoggedUser({commit, state}){
            try {
                // http.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
                let response = await http.get('/api/v1/auth/user')
                localStorage.setItem('user', JSON.stringify(response.data.data))
                if(response.data.data){
                    commit('setAuthUser', {
                        user: response.data.data
                    })
                    // console.log('set')
                }
            } catch (e) {
                console.log(e)
            }
        },

        async revokeToken(){
            const loading = Loading.service({
                lock: true,
                text: 'Please wait',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.7)',
                fullscreen: true
            });
            try {
                let response = await http.post('/api/v1/auth/logout')
            } catch (e) {
                console.log(e)
            }
            finally{
                loading.close()
            }
        },

        async register({commit, dispatch}, formData){
            try {
                commit('setAuthErrors')
                let response = await http.post('/api/v1/auth/register', formData)
                if(response.data){
                    commit('setToken',  { token: response.data.token })
                    localStorage.setItem('aToken', response.data.token)
                    dispatch('getLoggedUser')
                    Notification.success({
                        title: 'Success',
                        message: 'Registered successfully'
                    });
                    return router.push({name: 'Verification'})

                }
            } catch (e) {
                console.log(e)
                if(e.response && e.response.status == 422){
                    console.log(e.response.data);
                    commit('setAuthErrors', e.response.data)
                }
            }
        },

        async login({commit, dispatch, state}, credentials){
            try {
                commit('setAuthErrors')
                let response = await http.post('/api/v1/auth/admin/login', credentials)
                if(response.data){
                    commit('setToken',  { token: response.data.token })
                    localStorage.setItem('aToken', response.data.token )
                    dispatch('getLoggedUser').then( () =>{
                        // console.log('login');

                        Notification.success({
                            title: 'Success',
                            message: 'Signed in successfully'
                        });

                        // if(state.userDetails.is_verified){
                        //     let intentedPath = router.history.current.query.request
                        //     if(intentedPath){
                        //         return router.push(intentedPath)
                        //     }
                            return router.push({name: 'Dashboard'})
                        // }
                        // else{
                        //     return router.push({name: 'Verification'})
                        // }
                    })
                    
                    
                }
            } catch (e) {
                console.log(e)
                if(e.response && e.response.status == 422){
                    console.log(e.response.data);
                    commit('setAuthErrors', e.response.data)
                }
            }
        },

        logout ({commit, dispatch}, action = {}) {
            if(action.revoke){
                dispatch('revokeToken').then( () => {
                    commit('clearAuthData')
                    router.push({name: 'Login'})

                }) 
            }else if(action.redirectIntended && !action.revoke){
                commit('clearAuthData')
                let currentPath =  router.history.current.fullPath
                router.push({name: 'Login', query: {request: currentPath}})
            }
            else{
                commit('clearAuthData')
                router.push({name: 'Login'})
            }
            localStorage.clear()

            
        },

        refreshToken({commit}, {token}){
            commit('setToken',  { token: token })
            localStorage.setItem('aToken', token )

        },

        tryAutoLogin ({commit}) {
            const token = localStorage.getItem('aToken')
            if (!token) {
                return
            }
            commit('setToken',  { token: token })

            const user = localStorage.getItem('user')  ? JSON.parse(localStorage.getItem('user')) : {};
            if(user){
                commit('setAuthUser', {
                    user: user
               })
            }
        },

        async sendverificationEmail(){
            try {
                let response = await http.post('/api/v1/auth/email/verification-notification')
                if(response?.status >= 200 && response?.status<= 300){
                    Notification.success({
                        title: 'Success',
                        message: 'Email verification sent',
                    });
                    
                }
            } catch (e) {
                console.log(e)
                Notification.error({
                    title: 'Error',
                    message: 'Something went wrong. Please try again',
                });
            }
        },

        async verify({dispatch}){
            const {hash, id, email} = router.app.$route.query
            const url = `/api/v1/auth/email/verify`
            try {
                let response = await http.post(url, {hash, id, email})
                if(response?.status >= 200 && response?.status<= 300){
                    Notification.success({
                        title: 'Success',
                        message: 'Email verified',
                        duration: 10000
                    });
                    dispatch('getLoggedUser')
                }
            } catch (e) {
                console.log(e)
                if(e.response?.status == 403){
                    Notification.error({
                        title: 'Error',
                        message: 'Link expired or invalid',
                        duration: 10000
                    });
                }
                else{
                    Notification.error({
                        title: 'Error',
                        message: 'Something went wrong',
                        duration: 10000
                    });
                }
            }
        },

        async socialRedirect(context, provider){
            try {
                let response = await http.get(`/api/v1/auth/login/${provider}`)
                window.location.href = response.data.redirect_url
            } catch (e) {
                console.log(e);
            }
        },

        async socialCallback({state, commit, dispatch}, provider){
            const {code} = router.app.$route.query
            commit('setAuthErrors')
            try {
                let response = await http.post(`/api/v1/auth/login/${provider}/callback`, {code})
                if(response.data){
                    commit('setToken',  { token: response.data.token })
                    localStorage.setItem('aToken', response.data.token )
                    dispatch('getLoggedUser').then( () =>{
                        // console.log('login');
                        Notification.success({
                            title: 'Success',
                            message: 'Login successfully'
                        });

                        if(state.userDetails.is_verified){
                            let intentedPath = router.history.current.query.request
                            if(intentedPath){
                                return router.push(intentedPath)
                            }
                            return router.push({name: 'Dashboard'})
                        }
                        else{
                            return router.push({name: 'Verification'})
                        }
                    })
                }
            } catch (e) {
                console.log(e);
                if(e.response && e.response.status == 400){
                    commit('setAuthErrors', {
                        errors: {
                            email: [`Can't continue with ${provider} at the moment.`]
                        }
                    })
                }
            }
        },

        async forgotPassword({commit}, {email}){
            try {
                commit('setAuthErrors')

                let response = await http.post(`/api/v1/auth/forgot-password`, {email})
                if(response?.status >= 200 && response?.status<= 300){
                    Notification.success({
                        title: 'Success',
                        message: 'Reset link sent',
                    });   
                }
            } catch (e) {
                console.log(e);
                if(e.response?.status == 422){
                    // console.log(e.response.data);
                    commit('setAuthErrors', e.response.data)
                }
            }
        },

        async resetPassword({commit}, credentials){
            try {
                commit('setAuthErrors')

                let response = await http.post(`/api/v1/auth/reset-password`, credentials)
                if(response?.status >= 200 && response?.status<= 300){
                    Notification.success({
                        title: 'Success',
                        message: 'Password reset successfully',
                        duration: 6000
                    });   
                    return router.push({name: 'Login'})
                    
                }
            } catch (e) {
                console.log(e);
                if(e.response?.status == 422){
                    // console.log(e.response.data);
                    commit('setAuthErrors', e.response.data)
                }
            }
        },

        disableAccount({dispatch, commit}){
            dispatch('logout', )
            commit('setAuthErrors', {
                errors: {
                    email: [`Account has been disabled. Contact support for more info`]
                }
            })

        },

        updateProfile({commit}, {user}){
            commit('setAuthUser', {user})
            localStorage.setItem('user', JSON.stringify(user))
        }

    },

    getters: {
        isAuthenticated (state) {
            // return !!state.token
            return true
        },
        signedUser(state){
            return state.userDetails
        },
    }
}
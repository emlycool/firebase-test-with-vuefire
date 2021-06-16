import router from '../router/index.js';

export function clientLogin(user = null){
    if(user){
        localStorage.setItem('logged_in_user', JSON.stringify(user))
    }
    // console.log(user);
    localStorage.setItem('logged_in', 1);
    let intentedPath = router.history.current.query.request
    if(intentedPath){
        return router.push(intentedPath)
    }
    return router.push({name: 'Dashboard'})
}

export const clientLogout = (redirect = true)=>{
    localStorage.clear();
    if(redirect){
        router.push({name: 'Welcome'})
    }
}

export const isLoggedIn = () =>{
    return localStorage.getItem('logged_in');
}
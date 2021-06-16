import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
dayjs.extend(relativeTime)
dayjs.extend(utc)

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default{

    data(){
        return {

        }
    },

    computed:{
        
    },

    methods:{
        fromNow: function(value){
            if(!value) return 
            return dayjs(value).fromNow()
        },
        toNow: function(value){
            if(!value) return 
            return dayjs(value).toNow()
        },
        localDT: function(value){
            if(!value) return 
            return dayjs.utc(value).local().format('YYYY-MM-DD hh:mm a')
        },
        currency: function(value){
            if(!value ) return '$0'
            return  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
            // return  `₦ ${new Intl.NumberFormat().format(value)}`
        },

        capitalize(value){
            return value.charAt(0).toUpperCase() + value.substr(1)
        },

        round2dp: function(num) {
            return +(Math.round(num + "e+2")  + "e-2");
        },
        
        numberFormat: function (num){
            return new Intl.NumberFormat().format(num)
        },

        appendLoading(el){
            const spin = document.createElement('div')
            spin.classList.add('spinner-border', 'spinner-border-sm', 'ml-2');
            spin.innerHTML = `<span class="sr-only">Loading...</span>` 
            el.disabled = true
            el.classList.add('disabled')
            el.append(spin)
        },

        removeLoading(el){
            el.querySelector('.spinner-border').remove();
            el.disabled = false
            el.classList.remove('disabled')

        },


        startProgress(){
            NProgress.start()
        },

        stopProgress(){
            NProgress.done()
        }

    },
}
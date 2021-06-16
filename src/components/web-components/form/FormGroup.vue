<template>
    <div class="form-group" >
        <label :for="labelFor" v-if="label">
            {{label}}
        </label>
        <slot>
            
        </slot>
        <slot name="validation" :errors="errors">
            <span class="invalid-feedback"
             v-for="(error, i) in errors"
             :key="i"
             >
                {{error.message}}
            </span>
        </slot>
    </div>
</template>

<script>
export default {
    props:{
        label: String,
        labelFor: String,
        validationBag: Array
    },
    computed: {
        errors(){
            if(!this.validationBag) return []
            return this.validationBag.filter(({condition}) => condition)
        }
    }
}
</script>
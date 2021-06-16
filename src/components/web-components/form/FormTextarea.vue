<template>
    <textarea :class="{'is-invalid': hasError}"  :value="value" v-bind="$attrs" v-on="listeners"></textarea>
</template>

<script>
export default {
    props:{
        hasError: Boolean,
        value: String
    },

    computed:{
        listeners(){
            return {
                ...this.$listeners,
                input: event => {
                    this.$emit('input', event.target.value)
                }
            }
        }
    }
}
</script>
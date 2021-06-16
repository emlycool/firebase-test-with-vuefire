<template>
        <div class="custom-control custom-checkbox small">
            <input type="checkbox" :id="id ? id: randomId" :class="{'is-invalid': hasError}" class="custom-control-input" v-bind="$attrs"  v-on="listeners">

            <label class="custom-control-label" :for="id ? id : randomId">
                <slot></slot>
            </label>
        </div>
</template>

<script>
export default {
    props:{
        hasError: Boolean,
        checked: Boolean,
        id: String 
    },
    data() {
        return {
            randomId: Math.floor((Math.random() * 99) + 1) + 'rand',       
        }
    },

    model: {
        prop: 'checked',
        event: 'change'
    },

    computed:{
        listeners(){
            return {
                ...this.$listeners,
                change: event => {
                    this.$emit('change', event.target.checked)
                }
            }
        }
    }
}
</script>
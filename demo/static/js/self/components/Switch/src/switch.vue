<template>
    <input id="abc" type="checkbox" class="sf-switch" v-model="checked"/>
</template>
<script>
    export default{
        name: 'sf-switch',
        props:{
            value: {
                type: Boolean
            }
        },
        data(){
            return {
                checked: this.value
            }
        },
        watch: {
            checked(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
<style lang="scss" type="text/css">
    @import '../../../style/components/switch.scss';
</style>
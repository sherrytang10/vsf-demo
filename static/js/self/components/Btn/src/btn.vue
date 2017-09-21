<template>
<button :class="classes" :disabled="disabled"><slot></slot></button>
</template>
<script>
    export default{
        name: 'sf-btn',
        props:{
            disabled: Boolean,
            size:{
                // 自定义验证函数
                validator(val = '') {
                    return ['', 'small'].indexOf(val) > -1;
                },
                default: '',
            },
            type:{
                type: String,
                // 自定义验证函数
                validator(val) {
                    return ['', 'fall', 'rise', 'disabled'].indexOf(val) > -1;
                },
                default: '',
            },
            shape:{
                validator(val) {
                    return ['', 'circular', 'half'].indexOf(val) > -1;
                },
                default: '',
            }
        },
        computed:{
            classes(){
                let {size, type, shape} = this;
                size = size ? `sf-btn-${size}` : `sf-btn`;
                type = type ? `sf-btn-${type}` : ``;
                shape = shape ? `sf-btn-${shape}` : ``;
                return `${size} ${type} ${shape}`;
            }
        }
    }
</script>
<style lang="scss" type="text/css">
    @import '../../../style/components/button.scss';
</style>
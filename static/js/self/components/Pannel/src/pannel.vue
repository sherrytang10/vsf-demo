<template>
    <div :class="classesHeader">
        <div class="sf-pannel-header" @click="expand">
            <span class="sf-pannel-icon iconfont">&#xe678;</span>
            <span class="sf-pannel-title">{{title}}</span>
            <span class="sf-pannel-icon iconfont sf-pannel-expand"></span>
        </div>
        <div class="sf-pannel-body" v-if="isShow">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sf-pannel',
    props:{
        title: {
            type: String,
            default: ''
        },
        shape:{
            type: String,
            validator(val) {
                return ['', 'half'].indexOf(val) > -1;
            },
            default: '',
        },
        type:{
            type: String,
            // 自定义验证函数
            validator(val) {
                return ['', 'danger', 'fall'].indexOf(val) > -1;
            },
            default: '',
        },
        show:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
           isShow: this.show
        }
    },
    computed:{
        classesHeader(){
            let {type, shape} = this;
            type = this.joinStr(type);
            shape = this.joinStr(shape);
            return `sf-pannel ${type} ${shape} ${!this.isShow ? 'sf-pannel-hide' : ''}`;
        }
    },
    methods:{
        joinStr(type){
            return type = type ? `sf-pannel-${type}` : '';
        },
        expand(){
            this.isShow = !this.isShow;
        }
    }
}
</script>
<style lang="scss" type="text/css">
    @import '../../../style/components/pannel.scss';
</style>
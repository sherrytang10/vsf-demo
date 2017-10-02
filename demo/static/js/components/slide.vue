<template>
    <sf-slide>
        <sf-slide-item v-for="(item, index) in list" class="item" :key="index">{{item}}</sf-slide-item>
    </sf-slide>
</template>
<script>
export default{
    data(){
        return {
            list: ['王朝','马汉', '张龙','赵虎','二百五']
        }
    }
}
</script>
<style>
    .item{
        text-align: center;
        line-height: 3rem;
        font-size: .34rem;
    }
</style>
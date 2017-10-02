<template>
    <sf-list>
        <sf-list-item v-for="(item, index) in list" :key="index">{{item}}</sf-list-item>
    </sf-list>
</template>
<script>
    export default{
        data(){
            return {
                list: [...Array(10).keys()]
            }
        }
    }
</script>
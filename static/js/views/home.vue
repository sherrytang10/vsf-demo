<template>
    <div class="container">
        <template v-for="(item, index) in menu">
            <router-link :to="`/${item}`" class="lattice-menu" :key="index">
                <img src="" alt="" class="lattice-icon">
                {{item}}
            </router-link>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data(){
            let menu = ['button', 'listview', 'pannel'];
            return {
                menu: {...menu}
            }
        },
        components: {
        },
        mounted() {
        }
    }
</script>
<style scoped>
.container{
}
.lattice-menu{
    display: inline-block;
    margin-top: .2rem;
    width: 2.45rem;
    font-size: .3rem;
    text-align: center;
}
.lattice-icon{
    display: block;
    margin: 0 auto;
    width: 2rem;
    height: 2rem;
    background-color: #fff;
}
</style>
<template>
    <div>
        <div class="sf-sidebar">
            <div class="sf-brand">
                <div class="sf-brand-meta">
                    <span class="sf-brand-title">天冰博客</span>
                    <span>好记性不如烂笔头</span>
                </div>
            </div>
            <div class="sf-navbar">
                <left-menu></left-menu>
            </div>
        </div>
        <div class="sf-sidebar">
            <left-author></left-author>
        </div>
    </div>
</template>
<script>
    import leftAuthor from '../views/indexLeft/author.vue';
    import leftMenu from '../views/indexLeft/menu.vue';
    export default{
        name: 'index-left',
        components:{
            leftAuthor,
            leftMenu
        }
    }
</script>
<style scoped  lang="scss" type="text/css">
    @import '../../css/views/indexLeft.scss';
</style>

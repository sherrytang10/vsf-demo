<template>
    <div class="sf-container">
        <header class="sf-headband"></header>
        <div class="sf-main">
            <div class="sf-left">
                <index-left></index-left>
            </div>
            <div class="sf-right">
                <sf-article></sf-article>
                <sf-article></sf-article>
                <sf-article></sf-article>
                <sf-article></sf-article>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    import indexLeft from '../components/indexLeft.vue';
    import sfArticle from '../components/sfArticle.vue';
    export default {
        name: 'home',
        components:{
            indexLeft,
            sfArticle
        },
        created(){
            this.getArticleList();
        },
        computed: {
            ...mapState('author', {
                authorInfo: state => state.authorInfo
            })
        },
        methods:{
            ...mapMutations('author',{
                'setAuthorInfo': 'setAuthorInfo'
            }),
            getArticleList(){
                // http://manage.qualc.cn/restapi/article/findAl
                this.$.get('http://localhost:7779/restapi/article/findAll').then( res => {
                    console.log(res);
                });
            }
        }
    }
</script>
<style scoped  lang="scss" type="text/css">
    @import '../../css/components/index.scss';
    /* header{
        height: 5px;
        background: linear-gradient(to right, #ffa800, #ff6d25);
        background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ffa800), color-stop(100%,#ff6d25));
        background: -webkit-linear-gradient(left, #ffa800, #ff6d25);
        background: -moz-linear-gradient(left, #ffa800, #ff6d25);
        background: -o-linear-gradient(left, #ffa800, #ff6d25);
        background: -ms-linear-gradient(left, #ffa800, #ff6d25);
        background: -webkit-linear-gradient(left, #ffa800, #ff6d25);
        background: -webkit-linear-gradient(left, #ffa800, #ff6d25);
    } */
</style>

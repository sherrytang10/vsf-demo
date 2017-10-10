<template>
    <div class="sf-author">
        <img src="../../../images/headimg.jpg">
        <span class="sf-author-name">{{authorInfo.name}}</span>
        <span class="sf-author-description">{{authorInfo.description}}</span>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    export default{
        name: 'left-author',
        computed: {
            ...mapState('author', {
                authorInfo: state => state.authorInfo
            })
        },
        created(){
            this.getAuthorInfo()
        },
        methods:{
            ...mapMutations('author',{
                'setAuthorInfo': 'setAuthorInfo'
            }),
            getAuthorInfo(){
                console.log('1')
                 setTimeout( () => {
                    let authorInfo = {
                        name: '天冰',
                        description: '天上冰,亮晶晶.'
                    }
                    this.setAuthorInfo(authorInfo);
                }, 1000);
            }
        }

    }
</script>
<style scoped  lang="scss" type="text/css">
    @import '../../../css/components/author.scss';
</style>

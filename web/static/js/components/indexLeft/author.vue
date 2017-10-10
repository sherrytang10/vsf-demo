<template>
    <div class="sf-author">
        <img src="../../../images/headimg.jpg">
        <span class="sf-author-name">{this.authorInfo.name}</span>
        <span class="sf-author-description">{this.authorInfo.description}</span>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    export default{
        name: 'left-author',
        computed: {
            ...mapState('authors', {
                authorInfo: state => state.authorInfo
            })
        },
        created(){
            this.getAuthorInfo()
        },
        methods:{
            // ...mapMutations('authors',{
            //     'setAuthorInfo': 'setAuthorInfo'
            // }),
            getAuthorInfo(){
                 setTimeout( () => {
                    let authorInfo = {
                        name: '天冰',
                        description: '天上冰,亮晶晶.'
                    }
                    console.log()
                    this.$store.commit('setAuthorInfo', authorInfo);
                    // this.setAuthorInfo('setAuthorInfo', authorInfo);
                }, 1000);
            }
        }

    }
</script>
<style scoped  lang="scss" type="text/css">
    @import '../../../css/components/author.scss';
</style>

<template>
    <div class="article">
      <template v-if="firstLoad == false">
        <div v-if="!articleList || articleList.length == 0">
            <article class="sf-article sf-article-list-item">此分类暂无文章</article>
        </div>
        <article class="sf-article sf-article-self" v-for="item in articleList" :key="item.id">
            <router-link :to="`/articleinfo/${item.id}`">
                <img v-if="item.type == 1" :src="item.picture || `/images/js.png`" alt="" class="sf-article-img">
                <div :class="'sf-article-box' + (item.type == 1 ?  ' mleft' : '')">
                    <h1 class="sf-article-title">
                        <a href="#" :title="item.title">{{item.title}}</a>
                    </h1>
                    <div class="sf-article-info">
                        <div class="sf-article-description"  v-if="item.type == 1" >{{item.docreader}}</div>
                        <div class="sf-article-meta">
                            <span>发表于：{{item.publishDate}}</span>
                            <span>分类：{{item.articleTypeName}}</span>
                            <span>阅读次数：{{item.visitors}}</span>
                            <span>作者：{{item.nickName ||　'佚名'}}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </article>
      </template>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-article",
  computed: {
    ...mapState("article", {
      articleList: state => state.articleList,
      firstLoad: state => state.firstLoad
    })
  },
  created() {
    this.getArticleList();
  },
  updated(){
    // html首次挂在完成
    let items = document.querySelectorAll('.sf-article-self');
    Array.from(items).forEach( (item, index) => {
        setTimeout( () =>{
          item.className += ' sf-article-self-animate';
        }, index * 50)
    });
  },
  methods: {
    ...mapMutations("article", {
      setArticleList: "setArticleList"
    }),
    getArticleList() {
      let type = this.$route.params.type || 1;
      this.$.get("/restapi/article/findAll?type=" + type ).then(results => {
        this.setArticleList(results.articleList);
      });
    }
  },
  watch:{
    '$route'(nowRoute, oldRoute){
      this.getArticleList();
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">@import "../../../css/components/article.scss";</style>
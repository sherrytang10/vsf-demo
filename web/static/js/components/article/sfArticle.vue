<template>
    <div class="article">
        <div v-if="!articleList || articleList.length == 0">
            <article class="sf-article sf-article-list-item">此分类暂无文章</article>
        </div>
        <article class="sf-article" v-for="item in articleList" :key="item.id">
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
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-article",
  computed: {
    ...mapState("article", {
      articleList: state => state.articleList
    })
  },
  created() {
    this.getArticleList();
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
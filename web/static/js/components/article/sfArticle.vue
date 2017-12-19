<template>
    <div class="article">
        <article class="sf-article" v-for="item in articleList" :key="item.id">
            <router-link :to="`/articleinfo/${item.id}`">
                <img v-if="item.type == 1" :src="item.picture || `/images/js.png`" alt="" class="sf-article-img">
            <div :class="'sf-article-box' + (item.type == 1 ?  ' mleft' : '')">
                <h1 class="sf-article-title">
                    <a href="#" :title="item.title">
                        {{item.title}}
                    </a>
                </h1>
                <div class="sf-article-info">
                    <div class="sf-article-description"  v-if="item.type == 1" >
                        {{item.docreader}}
                    </div>
                    <div class="sf-article-meta">
                        <span>发表于：{{item.publishTime}}</span>
                        <span>分类：{{item.articleTypeName}}</span>
                        <span>阅读次数：{{item.visitors}}</span>
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
      this.$.get("/restapi/article/findAll").then(results => {
        this.setArticleList(results.articleList);
      });
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../../css/components/article.scss";
</style>

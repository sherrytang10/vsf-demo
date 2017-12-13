<template>
    <div class="sf-article">
        <h1 class="sf-article-title">
            {{articleinfo.title}}
        </h1>
        <div class="sf-article-meta">
            <span>发表于：{{articleinfo.publishTime}}</span>
            <span>分类：{{articleinfo.articleTypeName}}</span>
            <span>阅读次数：{{articleinfo.visitors}}</span>
        </div>
        <div class="sf-article-content" v-html="articleinfo.content">
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-articleinfo",
  data() {
    return {
      publishTime: "2017-11-09",
      articleTypeName: 0,
      visitors: 0
    };
  },
  computed: {
    ...mapState("article", {
      articleinfo: state => state.articleinfo
    })
  },
  created() {
    this.getArticleInfo();
  },
  methods: {
    ...mapMutations("article", {
      setArticleInfo: "setArticleInfo"
    }),
    getArticleInfo() {
      // http://manage.qualc.cn/restapi/article/findAl
      this.$.get(`/restapi/article/info/${this.$route.params.id}`).then(results => {
        // this.articleList = res.results;
        this.setArticleInfo(results);
      });
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../../css/components/article.scss";
</style>

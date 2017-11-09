<template>
    <div class="sf-articleinfo">
        <h1 class="sf-articleinfo-title">
            {{articleinfo.title}}
        </h1>
        <div class="sf-articleinfo-meta">
            <span>发表于：{{articleinfo.publishTime}}</span>
            <span>分类：{{articleinfo.articleTypeName}}</span>
            <span>阅读次数：{{articleinfo.visitors}}</span>
        </div>
        <div class="sf-articleinfo-content" v-html="articleinfo.content">
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
    ...mapState("articleinfo", {
      articleinfo: state => state.articleinfo
    })
  },
  created() {
    this.getArticleInfo();
  },
  methods: {
    ...mapMutations("articleinfo", {
      setArticleInfo: "setArticleInfo"
    }),
    getArticleInfo() {
      // http://manage.qualc.cn/restapi/article/findAl
      this.$.get(`/restapi/article/info/${this.$route.params.id}`).then(res => {
        // this.articleList = res.results;
        this.setArticleInfo(res.results);
      });
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../css/components/articleinfo.scss";
</style>

<template>
    <div class="articlelist">
        <template v-if="articleList && articleList.length > 0">
            <article class="sf-article sf-article-list-item" v-for="item in articleList" :key="item.id">
                <router-link :to="`/articleinfo/${item.id}`">
                    {{item.publishTime | formatDate}} | <span class="sf-article-smalltitle">{{item.title}}</span>
                </router-link>
            </article>
        </template>
        <template v-else>
            <article class="sf-article sf-article-list-item">
                此分类暂无文章
            </article>
        </template>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-articlelist",
  computed: {
    ...mapState("article", {
      articleList: state => state.articleList
    })
  },
  created() {
    this.getArticleList();
  },
  filters: {
    formatDate: function(time) {
      return time.split(" ")[0];
    }
  },
  methods: {
    ...mapMutations("article", {
      setArticleList: "setArticleList"
    }),
    getArticleList() {
      this.$
        .get(`/restapi/article/findAll?articleTypeId=${this.$route.params.id}`)
        .then(results => {
          // this.articleList = res.results;
          this.setArticleList(results.articleList);
        });
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../../css/components/article.scss";
</style>

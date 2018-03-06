<template>
    <div class="articlelist">
        <template v-if="articleList && articleList.length > 0">
            <article class="sf-article sf-article-list-item" v-for="item in articleList" :key="item.id">
                <router-link :to="`/articleinfo/${item.id}`">
                    {{item.publishDate | formatDate}} | <span class="sf-article-smalltitle">{{item.title}}</span>
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
  updated(){
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
      let typeId = this.$route.params.id || 1;
      this.$
        .get(`/restapi/article/findAll?articleTypeId=${typeId}`)
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

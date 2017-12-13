<template>
    <div class="articletype">
        <article class="sf-article sf-article-type-list" v-for="item in articleTypeList" :key="item.id">
            <router-link :to="`/articlelist/${item.articleTypeId}`">
                {{item.articleTypeName}} <span class="sf-article-type-num">({{item.num}})</span>
            </router-link>
        </article>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-articletype",
  computed: {
    ...mapState("article", {
      articleTypeList: state => state.articleTypeList
    })
  },
  created() {
    this.getArticleList();
  },
  methods: {
    ...mapMutations("article", {
      setArticleTypeList: "setArticleTypeList"
    }),
    getArticleList() {
      console.log("=======");
      // http://manage.qualc.cn/restapi/article/findAl
      this.$.get("/restapi/articletype/findAllGroupType").then(results => {
        // this.articleList = res.results;
        this.setArticleTypeList(results);
      });
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../../css/components/article.scss";
</style>

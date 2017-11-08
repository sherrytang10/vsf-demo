<template>
    <div class="article">
        fdsfds
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-articleinfo",
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
    getArticleList() {}
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../css/components/article.scss";
</style>

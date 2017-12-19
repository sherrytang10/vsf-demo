<template>
    <div class="articletype">
        <article class="sf-article sf-article-type-list" v-for="item in articleClassify" :key="item.id">
            <router-link :to="`/articlelist/${type}/${item.id}`">
                {{item.classify}} <span class="sf-article-type-num">({{item.num}})</span>
            </router-link>
        </article>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
const httpUrl = {
    type: `/restapi/articletype/findAllGroupType`,
    lable: `/restapi/articlelable/findAllGroupLable`,
}
export default {
  name: "sf-articletype",
  data(){
    return {
        type: null
    }
  },
  computed: {
    ...mapState("article", {
      articleClassify: state => state.articleClassify
    })
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapMutations("article", {
      setArticleClassify: "setArticleClassify"
    }),
    loadData(){
      this.type = this.$route.params.type;
      this.getArticleList();
    },
    getArticleList() {
      this.$.get(httpUrl[this.type]).then(results => {
        this.setArticleClassify(results);
      });
    }
  },
  watch:{
    '$route'(nowRoute, oldRoute){
      this.loadData();
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../../css/components/article.scss";
</style>

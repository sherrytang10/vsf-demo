<template>
    <div class="articlelist">
      <template v-if="firstLoad == false">
        <template v-if="articleList && articleList.length > 0">
            <article class="sf-article sf-article-list-item" v-for="item in articleList" :key="item.id" @click.native="loadAnimate(this)">
                <router-link :to="`/articleinfo/${item.id}`">
                    {{item.publishDate | formatDate}} | <span class="sf-article-smalltitle">{{item.title}}</span>
                    <span class="sf-article-type">{{item.type | formatType}}</span>
                </router-link>
            </article>
        </template>
        <template v-else>
            <article class="sf-article sf-article-list-item">
                此分类暂无文章
            </article>
        </template>
        </template>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-articlelist",
  computed: {
    ...mapState("article", {
      articleList: state => state.articleList,
      firstLoad: state => state.firstLoad
    })
  },
  created() {
    this.getArticleList();
  },
  mounted(){
    this.firstLoad = false;
  },
  updated(){

    // html首次挂在完成
    let items = document.querySelectorAll('.sf-article-list-item');
    Array.from(items).forEach( (item, index) => {
        setTimeout( () =>{
          item.className += ' sf-article-list-item-animate';
        }, index * 50)
    });
  },
  filters: {
    formatDate: function(time) {
      return time.split(" ")[0];
    },
    formatType: function(type){
       return type == 1? '文章' : '随记';
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
    },
    loadAnimate(item){
      console.log(item)
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../../css/components/article.scss";
</style>

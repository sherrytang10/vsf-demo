<template>
    <ul class="sf-navbar">
        <!-- <li class="sf-navbar-item curr" @click="tip()">首页</li>
    <li class="sf-navbar-item" @click="tip()">分类</li>
    <li class="sf-navbar-item" @click="tip()">归档</li>
    <li class="sf-navbar-item" @click="tip()">标签</li>
    <li class="sf-navbar-item" @click="tip()">作者</li>
    <li class="sf-navbar-item" @click="tip()" >搜索</li>
    -->
    <li v-for="(item,index) in menuList" :key="index" @click="tip(item.uri, index)"
            :class="'sf-navbar-item ' + (ix == index ? 'curr': '')">{{item.name}}</li>
</ul>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "left-menu",
  computed: {
    ...mapState({
      ix: state => state.ix
    })
  },
  data() {
    return {
      menuList: [
        {
          uri: "/article/1",
          name: "文章"
        },
        {
          uri: "/article/2",
          name: "随记"
        },
        {
          uri: "/articleclassify/type",
          name: "类型"
        },
        // {
        //   uri: "/",
        //   name: "归档"
        // },
        // {
        //   uri: "/articleclassify/lable",
        //   name: "标签"
        // },
        {
          uri: "/authorlist",
          name: "作者"
        },
        {
          uri: "",
          name: "搜索"
        }
      ] //["首页", "分类", "归档", "标签", "作者", "搜索"]
    };
  },
  methods: {
    ...mapMutations({
      setMenuIX: "setMenuIX"
    }),
    tip(uri, index) {
      if (!uri) {
        alert("功能未实现");
        return true;
      }
      this.setMenuIX(index);
      this.$router.push(uri);
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">@import "../../../css/components/menu.scss";</style>
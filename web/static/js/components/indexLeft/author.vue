<template>
    <div class="sf-author">
        <img :src="authorInfo.headimg || `../../../images/headimg.jpg`">
        <span class="sf-author-name">{{authorInfo.nickName}}</span>
        <span class="sf-author-description">{{authorInfo.motto}}</span>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "left-author",
  computed: {
    ...mapState("author", {
      authorInfo: state => state.authorInfo
    })
  },
  created() {
    this.getAuthorInfo();
  },
  methods: {
    ...mapMutations("author", {
      setAuthorInfo: "setAuthorInfo"
    }),
    getAuthorInfo() {
      let identity = CommFunc.getSessionStorage('authoridentity');
      if(!identity){
        identity = 'NDkzNTQ5MTc0QHFxLmNvbQ==';
      }
      this.$.get(`/restapi/users/findOneByIdentity/${identity}`).then(results => {
          this.setAuthorInfo(results || {});
      });
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../../css/components/author.scss";
</style>

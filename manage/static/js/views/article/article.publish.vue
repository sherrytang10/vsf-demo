<template>
    <div class="container">
        <el-form class="form-box article"  label-width="80px">
            <el-form-item label="标题:">
                <el-input v-model="article.title"  class="width50" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="分类:">
                <el-select class="width50" v-model="article.articleTypeId" placeholder="请选择分类">
                    <el-option
                      v-for="item in articleType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="概要:">
                <el-input type="textarea" v-model="article.docreader" placeholder="请输入概要"></el-input>
            </el-form-item>
            <el-form-item label="类型:">
                <el-radio-group v-model="article.type">
                    <el-radio :label="1">文章</el-radio>
                    <el-radio :label="2">短记</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="题图:" ref="picture"  v-if="article.type != 2" class="headimg-box">
                <el-upload
                  drag
                  class="avatar-uploader"
                  action="/manage/picture/upload"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError">
                    <div class="avatar-box"v-if="article.picture" >
                        <img :src="article.picture" class="avatar-headimg">
                    </div>
                    <div class="el-upload__tip" slot="tip">
                        <div class="el-upload__text">将文件拖到虚框，或点击虚框上传</div>
                    </div>


                </el-upload>
            </el-form-item>
            <el-form-item label="正文:">
                <vue-editor v-model="article.content" placeholder="请输入正文"></vue-editor>
            </el-form-item>
            <el-form-item label="发布时间:">
                    <el-date-picker
                      v-model="article.publishDate"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
            </el-form-item>
            <!-- <el-form-item class="article-input article-label">
                    <el-tag
                      v-for="item in articleLabel"
                      :key="item.id"
                      :closable="true"
                      :type="'primary'"
                      >{{item.name}}</el-tag>
            </el-form-item> -->
            <el-form-item class="article-input">
                <el-button>重置</el-button>
                <el-button type="primary" @click="saveArticle">确认发布</el-button>
            </el-form-item>
    </el-form>
        </div>
</template>
<script>
const HttpUrl = {
    findArticleTypeAll: '/manage/articletype/findAll',
    pulishArticle: '/manage/article/saveOrUpdate',
    findArticleInfo: '/manage/article/info/'
}
import { VueEditor } from 'vue2-editor'
export default {
    components: {
      VueEditor
    },
    data() {
      return {
            article: {
                id: 0,
                title:'',
                content: '',
                picture: '',
                docreader:'',
                articleTypeId: '',
                // labelId:[],
                publishDate: '',
                type: 1, //文章或短记
            },
            pictureOld: [],
            articleType:[{
                id: 1,
                name: 'Web前端'
            },{
                id: 2,
                name: '数据库'
            }],
            articleLabel: [{
                id: 1,
                name: 'nodejs'
            }, {
                id: 2,
                name: 'js'
            }, {
                id: 3,
                name: 'css'
            }]
        };
    },
    created(){
        this.loadArticleType().then(()=>{
            this.loadArticleInfo();
        });
    },
    methods: {
        checkLabel({target}){
            target.className += ' cur';
        },
        uploadSuccess(data){
            if(data.status == 1) {
                this.article.picture = data.results;
            } else {
                this.$alert(data.errmsg, '上传图片异常', {
                    confirmButtonText: '确定'
                });
            }
        },
        uploadError(err){
            this.$alert(err.message, `上传图片异常:${err.status}`, {
                confirmButtonText: '确定'
            });
        },
        loadArticleType(){
            return this.$.get(HttpUrl.findArticleTypeAll).then( results => {
                this.articleType = results;
            });
        },
        loadArticleInfo(){
            let id = this.$route.params.id || 0;
            if(id != null){
                this.$.get(`${HttpUrl.findArticleInfo}${id}`).then( results => {
                    this.article = results;
                    if(results.picture){
                        this.pictureOld = [{url: results.picture, name: results.picture.match(/[^\/]+$/)[0]}]
                    }
                });
            }
        },
        saveArticle(){
                this.$.post(HttpUrl.pulishArticle, this.article).then( errmsg => {
                    this.$alert(errmsg, '上传文章成功', {
                        confirmButtonText: '确定',
                        callback: () => {
                            location.reload();
                        }
                    });
                });
        }
    },
    watch:{
        'article.type'(curVal,oldVal){
            // if(curVal == 2) {
            //     this.$refs.picture.$el.style.display = 'none';
            // } else {
            //     this.$refs.picture.$el.style.display = 'block';
            // }
        },
        "$route"(){
            this.loadArticleInfo();
        }
    }
}
</script>
<style lang="scss" type="text/css">@import '../../../css/components/article/article.pulish.scss';</style>
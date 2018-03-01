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
                <el-radio v-model="article.type" label="1">文章</el-radio>
                <el-radio v-model="article.type" label="2">短记</el-radio>
            </el-form-item>
            <el-form-item label="题图:" ref="picture">
                <el-upload
                  class="article-picture-upload"
                  drag
                  action="/manage/picture/upload"
                  list-type="picture"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">添加题图</br>将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
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
                type: '1', //文章或短记
            },
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
            console.log(this.$route)
            let {id} = this.$route.params;
            if(id){
                this.$.get(`${HttpUrl.findArticleInfo}${id}`).then( results => {
                    this.article = results;
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
            if(curVal == 2) {
                this.$refs.picture.$el.style.display = 'none';
            } else {
                this.$refs.picture.$el.style.display = 'block';
            }
        }
    }
}
</script>
<style lang="scss" type="text/css">@import '../../../css/components/article/article.pulish.scss';</style>
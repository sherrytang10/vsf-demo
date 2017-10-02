<template>
    <div class="container">
        <div class="article-picture">
            <el-upload
              class="article-picture-upload"
              drag
              action="http://127.0.0.1:7777/restapi/picture/upload"
              list-type="picture"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">添加题图</br>将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
        <el-form class="form-box article">
            <div class="article-input article-title">
                <input v-model="article.title" placeholder="请输入标题"></input>
            </div>
            <el-form-item class="article-input">
                <vue-editor v-model="article.content" placeholder="请输入正文"></vue-editor>
            </el-form-item>
            <el-form-item class="article-input article-label">
                <div class="article-label-box">
                    <span @click="checkLabel" class="article-label-item" v-for="(item, index) in label" :key="index" :data-id="item.id">{{item.name}}</span>
                </div>
            </el-form-item>
            <el-form-item class="article-input">
                <el-button>重置</el-button>
                <el-button type="primary">确认发布</el-button>
            </el-form-item>
    </el-form>
        </div>
</template>
<script>

import { VueEditor } from 'vue2-editor'
export default {
    components: {
      VueEditor
    },
    data() {
      return {
            article: {
                title:'',
                content: '',
                picture: '',
                labelId:[]
            },
            label: [{
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
    methods: {
        checkLabel({target}){
            target.className += ' cur';
        },
        uploadSuccess(data){
            if(data.statue == 1) {
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
        }
    }
}
</script>
<style lang="scss" type="text/css">@import '../../../css/components/article/article.pulish.scss';</style>
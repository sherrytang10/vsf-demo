<template>
    <div class="container">
        <div class="form-box article">
            <div class="article-picture">
                <input type="file" class="upload-input" name="upload_file" accept=".jpeg, .jpg, .png">
            </div>
            <div class="article-input article-title">
                <input v-model="article.title" placeholder="请输入标题"></input>
            </div>
            <div class="article-input">
                <vue-editor v-model="article.content" placeholder="请输入正文"></vue-editor>
            </div>
            <div class="article-input article-label">
                <div class="article-label-box">
                    <span @click="checkLabel" class="article-label-item" v-for="(item, index) in label" :key="index" :data-id="item.id">{{item.name}}</span>
                </div>
            </div>
            <div class="article-input">
                <el-button>重置</el-button>
                <el-button type="primary">确认发布</el-button>
            </div>
        </div>
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
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">@import '../../../css/components/article/article.pulish.scss';</style>
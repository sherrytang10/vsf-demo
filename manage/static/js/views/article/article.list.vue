<template>
    <div class="container">
        <el-form :inline="true" :model="formInline" class="form-box">
            <el-form-item label="昵称">
                <el-input v-model="formInline.nickName" placeholder="昵称"></el-input>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">查询</el-button>
        </el-form-item>
    </el-form>
    <div class="table-box">
        <el-table :data="articleList" stripe border max-height="40px">
            <el-table-column fixed prop="title" label="标题" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="articleTypeName" label="分类"  width="120"></el-table-column>
            <el-table-column prop="labelIds" label="标签" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="typeName" label="类型" width="70" show-overflow-tooltip></el-table-column>
            <el-table-column prop="publishTime" label="发布时间" width="185"></el-table-column>
            <el-table-column prop="docreader" label="概述" width="220" show-overflow-tooltip></el-table-column>
            <el-table-column prop="disabledStr" label="状态" width="70" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="256">
                <template scope="scope">
                    <el-button
                      size="small"
                      type="info"
                      @click="handleEdit(scope.row)">详情</el-button>
                    <el-button
                      size="small"
                      type="info"
                      @click="handlePublish(scope.row)">发布</el-button>
                    <el-button
                      size="small"
                      type="info"
                      @click="handleDisabled(scope.row)">下线</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="table-box" style="float: right">
        <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleragination"
              :current-page="formInline.currPage"
              :page-sizes="[20, 50, 100, 200]"
              :page-size="formInline.currPage"
              layout="total, sizes, prev, pager, next, jumper"
              :total="formInline.total"></el-pagination>
    </div>
</div>
</template>
<script>
const HttpUrl = {
    findArticleAll: '/manage/article/findAll',
    publishArticle: '/manage/article/pulish',
    disabledArticle: '/manage/article/disabled',
    deleteArticle: '/manage/article/delete'
}
export default {
    data(){
        return {
            formInline: {
                nickName: '',
                pageSize: 20,
                currPage: 1,
                total: 0,
            },
            articleList: []
        }
    },
    created(){
        this.loadArticleList();
    },
    methods:{
        loadArticleList(){
            this.$.post(HttpUrl.findArticleAll, this.formInline).then( results => {
                this.articleList = results.articleList;
                this.formInline.total = results.total;
            });
        },
        // 发布
        handlePublish(item){
            this.$.get(`${HttpUrl.publishArticle}?id=${item.id}`).then( results => {
                this.$alert(results, {
                        confirmButtonText: '确定',
                        callback: () => {
                            location.reload();
                        }
                    });
                this.$confirm('发布文章', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                }).then(() => {
                    location.reload();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发布'
                    });
                });
            });
        },
        handleDisabled(item) {
            this.$.get(`${HttpUrl.disabledArticle}?id=${item.id}`).then( results => {
                this.$message(results)
            });
        },
        handleDelete(item){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
            }).then(() => {
                this.$.get(`${HttpUrl.deleteArticle}?id=${item.id}`).then( results => {
                    this.$message(results)
                    location.reload();
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消发布'
                });
            });
        },
        handleEdit(item){
          this.$router.push(`/articlePulish/${row.id}`);
        },
        handleragination(currentPage){
            if(this.formInline.currPage != currentPage){
                this.formInline.currPage = currentPage;
                this.loadArticleList();
            }
        },
        handleSizeChange(size){
            if(this.formInline.pageSize != size){
                this.formInline.pageSize = size;
                this.formInline.currPage = 1;
                this.loadArticleList();
            }
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">@import '../../../css/components/list.scss';</style>
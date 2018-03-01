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
        <el-table :data="articleList" stripe border >
            <el-table-column fixed prop="title" label="标题" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="articleTypeName" label="分类"  width="120"></el-table-column>
            <el-table-column prop="type" :formatter="typeStr" label="类型" width="80" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="labelIds" label="标签" width="80" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="publishDate" label="发布时间" width="185"></el-table-column>
            <el-table-column prop="docreader" label="概述" width="220" show-overflow-tooltip></el-table-column>
            <el-table-column prop="disabled" label="状态" :formatter="disabledStr" width="70"></el-table-column>
            <el-table-column fixed="right" label="操作" width="218">
                <template slot-scope="scope">
                    <el-button
                      size="small"
                      type="primary"
                      @click="handleEdit(scope.row)">详情</el-button>
                    <el-button v-if="scope.row.disabled == 0"
                      size="small"
                      type="info"
                      @click="handlePublish(scope.row)">发布</el-button>
                    <el-button v-if="scope.row.disabled == 1"
                      size="small"
                      type="primary"
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
              @current-change="handlerAgination"
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
            this.$confirm('发布文章', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
            }).then(() => {
                this.$.get(`${HttpUrl.publishArticle}?id=${item.id}`).then( results => {
                    this.$message({
                        type: 'success',
                        message: '操作成功',
                        duration: 1500,
                        onClose: () => {
                            this.loadArticleList();
                        }
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消发布'
                });
            });
        },
        handleDisabled(item) {
            this.$.get(`${HttpUrl.disabledArticle}?id=${item.id}`).then( () => {
                this.$message('操作成功')
            });
        },
        handleDelete(item){
            this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
            }).then(() => {
                this.$.get(`${HttpUrl.deleteArticle}?id=${item.id}`).then( () => {
                    this.$message('操作成功')
                    this.loadArticleList();
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消发布'
                });
            });
        },
        handleEdit(item){
          this.$router.push(`/articlePulish/${item.id}`);
        },
        handlerAgination(currentPage){
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
        },
        disabledStr(row, column, cellValue){
            return row.disabled == 1 ? '发布中' : '已下线';
        },
        typeStr({type}){
            return type == 1 ? '文章': type == 2 ? '随记' :'';
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">@import '../../../css/components/list.scss';</style>
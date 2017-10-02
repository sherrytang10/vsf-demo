<template>
<div class="container">
    <el-form :inline="true" :model="formInline" class="form-box">
        <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item><el-form-item>
            <el-button type="primary">查询</el-button>
        </el-form-item>
    </el-form>
    <div class="table-box">
        <el-table :data="tableData" stripe border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            formInline: {
                user: '',
                region: ''
            },
            tableData: []
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">
    @import '../../../css/components/user/user.list.scss';
</style>
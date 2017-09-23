<template>
    <div>
        <sf-from-group>
            <sf-from-item>
                <span slot="left">标题：</span>
                <input slot="right" type="text">
            </sf-from-item>
            <sf-from-item type="link" arrow>
                <span slot="left">我的订单：</span>
                <span slot="right">
                    查看全部订单
                </span>
            </sf-from-item>
            <sf-from-item type="a" arrow>
                <span slot="left">我的收藏：</span>
                <span slot="right"></span>
            </sf-from-item>
        </sf-from-group>
        <sf-from-group title="radio">
            <sf-from-item type="radio">
                <span slot="left">单选一：</span>
                <input slot="right" type="radio" name="sex">
            </sf-from-item>
            <sf-from-item type="radio">
                <span slot="left">单选二：</span>
                <input slot="right" type="radio" name="sex">
            </sf-from-item>
        </sf-from-group>
        <sf-from-group title="checkbox">
            <sf-from-item type="checkbox">
                <span slot="left">多选一：</span>
                <input slot="right" type="checkbox" name="sex">
            </sf-from-item>
            <sf-from-item type="checkbox">
                <span slot="left">多选二：</span>
                <input slot="right" type="checkbox" name="sex">
            </sf-from-item>
            <sf-from-item type="checkbox">
                <span slot="left">多选三：</span>
                <input slot="right" type="checkbox" name="sex">
            </sf-from-item>
        </sf-from-group>
    </div>
</template>
<script>
    export default{
        name: 'from',
        data(){
            return {}
        }
    }
</script>
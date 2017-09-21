<template>
<div style="padding: .2rem;">
    <sf-pannel title="测试1" type="danger" shape="half">
        type="danger" shape="half"
    </sf-pannel>
    <sf-pannel title="测试2" type="fall">
        type="fall"
    </sf-pannel>
    <sf-pannel title="测试3">
        default
    </sf-pannel>
</div>
</template>
<script>
    export default{
        data(){
            return {
                list: [...Array(10).keys()]
            }
        }
    }
</script>

<script setup>
import {ref,reactive} from 'vue';

const list =reactive({
    name:'',
    place:''
})
const dialogVisible=ref(false)
const openDialog=(row)=>{
    list.name=row.name
    list.place=row.place
    dialogVisible.value=true
}
defineExpose({
    openDialog
}) 

</script>



<template>
    <el-dialog 
    v-model="dialogVisible"
    title="编辑"
    width="400px"
    >
        <el-form :model="form" label-width="50px">
            <el-form-item label="姓名">
                <el-input v-model="list.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="地区">
                <el-input v-model="list.place"/>
            </el-form-item>
        </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button  @click="dialogVisible = false">取消</el-button>
                    <el-button  type="primary" @click="onUpdate">确认</el-button>
                </span>
            </template>
    </el-dialog>
    

</template>

<style scoped>
.el-input {
  width: 290px;
}
</style>
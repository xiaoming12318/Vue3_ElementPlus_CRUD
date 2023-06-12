<script setup>
import {ref,reactive,onMounted} from 'vue'
import Edit from './components/edit.vue'
import {ElMessage} from 'element-plus'
import axios from 'axios'

//数组数据
const list=ref([])
//list列表
const getList=async()=>{
    const res =await axios.get('/list')
    console.log(res)
    list.value=res.data
}

//删除数据
const deleteById=async(data)=>{
    //获取数据
    const id = data.row.id
    //发送axios，删除数据
    const res=await axios.delete(`/del/${id}`)
    console.log(res)
    //更新列表
    getList()
}

//编辑数据
const editRef=ref(null)
const onEdit=(row)=>{
    console.log(editRef)
    editRef.value.openDialog(row.row)
}


//钩子函数
onMounted(()=>{
    getList()
})



</script>

<template>
    <div class="app">
        <el-table :data="list">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="name"></el-table-column>
            <el-table-column prop="place" label="place"></el-table-column>
            <el-table-column prop="operation" label="operation">
                <template #default=row>
                    <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
                    <el-button type="danger" link @click="deleteById(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <Edit ref="editRef" @on-update="getList"/>
</template>



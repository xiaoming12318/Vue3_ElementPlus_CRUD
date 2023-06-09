<script setup>
import {ref,reactive,onMounted} from 'vue'
import Edit from './components/edit.vue'
import {ElMessage} from 'element-plus'
import axios from 'axios'

const list=ref([])
const getList=async()=>{
    const res =await axios.get('/list')
    console.log(res)
    list.value=res.data
}

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
                <template #default>
                    <el-button type="primary" link >编辑</el-button>
                    <el-button type="danger" link >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>



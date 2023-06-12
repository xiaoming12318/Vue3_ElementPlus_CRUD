





# Vue3，Element Plus简单增删改查

代码：https://github.com/xiaoming12318/Vue3_ElementPlus_CRUD.git

环境：

Visual Studio Code

Node.js 16.0或更高版本，https://nodejs.org/en

axios 

快速上手：

如果已经有16.0及以上就不用再重复安装了

官网安装node安装过程有一项是Add to Path勾选自动配置环境变量

![nodejs下载](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\nodejs下载.png)

安装后测试

![安装node后测试版本](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\安装node后测试版本.png)

# 第一个Vue项目

使用管理员打开命令行，在目标文件夹(创建一个新的文件夹)下创建vue项目

```
npm init vue@latest
```

指定vue项目名，选择自定义或者回车为默认值vue-project

![指定vue项目名称，回车为默认值](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\指定vue项目名称，回车为默认值.png)

自定义为vue初始化

![自定义为vue初始化的内容](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\自定义为vue初始化的内容.png)

| 名称                                                   | 功能                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| Add TypeScript                                         | 添加TS                                                       |
| Add JSX Support                                        | 是否支持JSX                                                  |
| Add Vue Router for Single Page Application development | 为单页程序开发添加Vue路由                                    |
| Add Pinia for state management                         | 用于状态管理的[Pinia](https://vuejs.org/guide/scaling-up/state-management.html#pinia) |
| Add Vitest for Unit Testing                            | 添加Vitest用于单元测试                                       |
| Add Cypress for both Unit and End-to-End testing       | 添加Vitest用于单元和端到端的测试                             |
| Add ESLint for code quality                            | 添加ESLint检查代码质量                                       |
| Add Prettier for code formatting                       | 为代码格式化添加Prettier                                     |

进入生成的文件

```
cd vue-project //对应自定义名称

npm install 

npm run dev
```

![运行成功](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\运行成功.png)

文件项说明

![文件项说明](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\文件项说明.png)

![文件项详细说明](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\文件项详细说明.png)

![页面图片](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\页面图片.png)

完成初始化之后，开启第一个vue3+ElementPlus增删改查项目

![1.](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\1..png)



# 1.main.js中引入所需的包

以管理员方式打开命令行,导入所需包

```
 //UI界面设计
 npm install element-plus --save
 //发送请求所使用的API
 npm i axios
```



```
// import './assets/main.css'

//引入ElementPlus和样式文件
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
//创建vue
import { createApp } from 'vue'
import App from './App.vue'

const app=createApp(App)
//使用ElementPlus
app.use(ElementPlus)
//启动APP
app.mount("#app")
```

## 1.1.列表展示

### 1.1.1.声明数组

在App.vue中声明一个响应式数组，用于封装list数据，并且回显

```
const list=ref([])
```

### 1.1.2.发送axios请求获取数据

1. 通过mock生成随机数据

   ![下载mock](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\下载mock.png)

   通过官网[下载](https://www.npmjs.com/package/vite-plugin-mock?activeTab=readme)

   在项目目录创建mock目录，编写一个用于自定义数据的脚本

   ```
   import Mock from "mockjs"
   // 内存模拟数据
   const arr = []
   for (let i = 0; i < 10; i++) {
   //存入10条数据
     arr.push({
       id: Mock.mock("@id"),
       name: Mock.mock("@cname"),
       place: Mock.mock("@county(true)"),
     })
   }
   //定义请求
   export default [
     {
       url: "/list",
       method: "get",
       response: () => {
         return arr
       },
     },
     {
       url: "/del/:id",
       method: "delete",
       //响应体接收一个请求体传过来的数据
       response: (req) => {
       //调用数组的findIndex方法，检索特定需求的数据
       //findIndex：匹配返回元素的索引，未匹配返回-1
       //index并赋值给index
       //===严格相等运算符，值的类型不对应则返回false
       //这里通过原数组中的数据与接收请求体的数据做比较，
       //if>-1则匹配到对应的id，通过splice删除数组中的数据，splice与delete的区别是，delete删除元素，但是会保留元素原本的位置，比如arr数组有三个元素，当使用 delete arr[1]删除第二个元素时，再使用arr.length结果还是3
       //splice则把占位一并删除  arr.splice(1,1),删除第二个元素从第二个元素开始删除一条元素
         const index = arr.findIndex((item) => item.id === req.query.id)
         if (index > -1) {
         	//
           arr.splice(index, 1)
           return { success: true }
         } else {
         //否则就是没有查询到对应数据
           return { success: false }
         }
       },
     },
     {
       url: "/edit/:id",
       method: "patch",
       response: ({ query, body }) => {
         const item = arr.find((item) => item.id === query.id)
         if (item) {
           item.name = body.name
           item.place = body.place
           return { success: true }
         } else {
           return { success: false }
         }
       },
     },
   ]
   
   ```

   在vite.config.js中编写Mock服务

   ```
   viteMockServe({
   		//刚刚创建的mock目录
         mockPath: "./mock",
         localEnabled: true,
       }),
   ```

   在App.vue<script setup>中编写请求代码

   ```
   const getList=()=>{
   	const res=await axios.get("/list")
   	list.value=res.data
   }
   
   编写一个生命周期钩子函数onMounted(在组件挂载完成后执行)中调用getList函数
   onMounted(()=>{
   	getList()
   })
   ```

   Vue生命周期

   可以看到mounted是在初始化渲染创建和插入DOM节点之后被启用的

   ![lifecycle.16e4c08e (1)](C:\Users\97540\Desktop\lifecycle.16e4c08e (1).png)

### 1.1.3.回显数据

在列表中回显数据，通过以上代码已知list中已有所需数据，则添加到elementUI的表中即可回显数据

```
<el-table :data="list">
```



# 总结

列表显示中注意事项

使用由mock生成的随机数据作为数据源

- 安装mock    npm i vite-plugin-mock

- 在vite.config.js中从vite-plugin-mock中引入viteMockServe

  - 在plugins中并配置mock自定义mock配置的路径

    ```
    export default defineConfig({
      plugins: [
        vue(),
        viteMockServe({
          mockPath: "./mock",
          localEnabled: true,
        }),
      
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    })
    ```

    

- 在项目目录创建mock目录，创建mock.js用于响应前端发送的请求，并且把结果判断的值返回

## 1.2.删除

### 1.2.1.绑定单击事件

```
在删除的button中绑定一个单击事件
<el-button type="danger" link @click="deleteById()">删除</el-button>
```

### 1.2.2.编写删除脚本代码

测试按钮是否绑定成功

```
在script中编写方法
const deleteById=()=>{
	console.log("删除测试")
}
```



通过单击获取行数据，使用vue3特性中table组件中的default插槽，template后面写入 #default=row

```
<template #default=row>
         <el-button type="danger" link @click="deleteById(row)">删除</el-button>
</template>
```

在绑定按钮的方法中编写获取数据，控制台打印

```
script中接收数据,获取id
const deleteById=(data)=>{
	const id=data.row.id
	console.log(data)
}
```

![删除消息演示](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\删除消息演示.png)



### 1.2.3.发送请求到mock自定义的虚拟数据

```
 写法和上面list唯一的差别是方法名和请求体中携带参数
 const res=await axios.delete(`/del/${id}`)
```

此时单击则可以实现删除

### 1.2.4.完成删除实时更新列表

```
//deleteById的末尾调用list更新列表，表示先删除再更新
getList()
```



## 1.3.编辑

采用组件化的编写方式，编写一个组件实现编辑功能，涉及子父组件通信

### 1.3.1.绑定编辑单击事件

```
在父组件：App.vue中的编辑按钮编写一个click事件,并把数据放入方法中
<el-button type="primary" link @click="onEdit(row)"
```



### 1.3.2.引入子组件

在父组件App.vue中引入Edit.vue

```
import Edit from './components/edit.vue'
```

具体位置视自身情况定。

### 1.3.3.在template中使用子组件，并在其中声明一个ref用于子父通信

在template中引入Edit作为子组件

```
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
	//这个部分
    <Edit ref="editRef" />
</template>
```

其中为Edit嵌入一个ref即可让父子间实现简单通信

当然也需要在script中定义editRef

```
//传入子组件的ref
constconst editRef=ref(null)
//点击编辑通过子父组件通信的弹窗
const onEdit=(list)=>{
	editRef.value.openDialog(list.row)
}
```



### 1.3.4.在子组件中编写template代码和script

在子组件中<template>编写以下代码，具体可以去"Element+"自定义想要的格式

```
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
                    <el-button  type="primary" >确认</el-button>
                </span>
            </template>
    </el-dialog>
    

</template>

<style scoped>
.el-input {
  width: 290px;
}
</style>
```

在script中编写参数

1.编写一个响应式方法接收父组件在<Edit>中传入的数据

```
const list=ref({
	id:'',
	name:'',
	place:''
})
//以及一个控制弹窗的开关
const dialogVisible=ref(false)

```

2.编写一个方法接收数据

```

const openDialog=(row)=>{
	list.name=row.name,
	list.place=row.place
	list.id=row.id
	//父组件在调用方法的同时会打开dialog窗口
	dialogVisible.value=true
}

暴露方法，使父组件可收到
defineExpose({
	openDialog
})

const emit=defineEmits(['on-update'])
```

3.回显数据到到Edit.vue中的dialog

```

解释上面template代码，<el-input>中的v-model="list.name",就是从list中获取name
<el-form-item label="姓名">
    <el-input v-model="list.name" autocomplete="off"/>
</el-form-item>
<el-form-item label="地区">
    <el-input v-model="list.place"/>
</el-form-item>
```



### 1.3.5.修改完成时在子组件中发送axios请求

![当单击确认时](E:\Vue3\打开编辑栏通过子父传递的方式编辑\picture\当单击确认时.png)

如图，当修改完毕，发送axios请求

在按钮中绑定单击事件

```
<el-button type="primary" @click="onUpdate">确认</el-button>
```

在script中测试是否绑定成功,并发送axios请求

```
const onUpdate=async()=>{
	console.log("绑定成功")
	await axios.put({
		method:'put',
		url:`/edit/${id}`,
		data:{
			name:list.name,
			place:list.place
		},
	})
	.then((res)=>{
		//发送请求
		//1.把更新列表请求发送给父组件，将会使用到defineEmits()
		//这个emit方法在上面已经定义
		emit('on-update')
		//2.关闭窗口
		dialogVisible.value=false
	})
}
```

关于defineEmit的具体操作参考[官网文档](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)

### 1.3.6.通过子组件发出的请求，父组件调用list方法更新列表

```
  父组件的<Edit>中
  <Edit ref="editRef" @on-update="getList"/>
```

自此一个简单的基于Vue3+ElementPlus的简单删改查就完成了。


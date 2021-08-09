<!--  -->
<template>
  <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <!-- 面包屑路径导航 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in $route.matched" :to="{ path:item.path?item.path:'/'}" :key="item.path" >{{item.meta.breadcrumb}}</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- /面包屑路径导航 -->
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <!-- 图片列表 -->
        <image-list></image-list>
        <!-- /图片列表 -->
    </el-card>
  </div>
</template>

<script>
import ImageList from './components/image-list'
export default {
  name: 'ImageIndex',
  data () {
    return {
    }
  },

  components: {
      ImageList
  },

  computed: {},

  mounted () {
      console.log(123)
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>

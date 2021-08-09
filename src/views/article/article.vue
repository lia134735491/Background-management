<!--  -->
<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
      <!-- 面包屑路径 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in $route.matched" :to="{ path:item.path?item.path:'/'}" :key="item.path" >{{item.meta.breadcrumb}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form>
        <el-form-item label="状态" label-width="40px" size="mini">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in channels"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <div class="block">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button>查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ totalCount }} 条结果：
      </div>
      <el-table
      :data="articles"
      stripe
      style="width: 100%"
      class="list-table"
      size="mini"
      v-loading="loading"
      >  
        <el-table-column
          prop="date"
          label="封面"
          width="180">
           <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.cover.images[0]"
              fit="cover"
              lazy
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <!-- <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]" alt=""
            >
            <img v-else class="article-cover" src="./no-cover.gif" alt=""> -->
            <!--
              下面这种情况是在运行期间动态改变处理的。
              而本地图片必须在打包的时候就存在。
             -->
            <!-- <img
              class="article-cover"
              :src="scope.row.cover.images[0] || './no-cover.gif'" alt=""
            > -->
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              circle
              icon="el-icon-edit"
              type="primary"
              @click="$router.push('/publish?id=' + scope.row.id.toString())"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="aa">
        <el-pagination
          layout="prev, pager, next"
          background
          :total="totalCount"
          :page-size="pageSize"
          :disabled="loading"
          @current-change="onCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticles,getArticleChannels,deleteArticle } from '@/api/article'
export default {
  data () {
    return {
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      articles: [], 
      value: '',
      totalCount: 0, // 总数据条数
      pageSize: 10, // 每页大小
      status: null, // 查询文章的状态，不传就是全部
      channels: [], // 文章频道列表
      channelId: null, // 查询文章的频道
      rangeDate: null, // 筛选的范围日期
      loading: true, // 表单数据加载中 loading
      page: 1 // 当前页码
    }
  },

  components: {},

  created() {
    this.loadChannels()
    this.loadArticles()
  },

  computed: {},

  mounted () {},

  methods: {
    async loadChannels () {
      let res = await getArticleChannels()
      this.channels = res.data.data.channels
    },

    onCurrentChange (page) {
      this.loadArticles(page)
    },

    async loadArticles (page = 1) {
      // 展示加载中 loading
      this.loading = true
      let res = await getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止日期
      })
      const { results, total_count: totalCount } = res.data.data
      this.articles = results
      console.log(this.articles)
      this.totalCount = totalCount
      // 关闭加载中 loading
      this.loading = false
    },

    onDeleteArticle (articleId) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认执行这里
        deleteArticle(articleId.toString()).then(res => {
          // 删除成功，更新当前页的文章数据列表
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}

.article-cover {
  width: 60px;
  background-size: cover;
}
.aa {
  display: flex;
  justify-content: center;
}
</style>

<!--  -->
<template>
  <el-container class="layout-container">
      <el-aside class="aside" width="auto">
          <app-aside
            class="aside-menu"
            :is-collapse="isCollapse">
          </app-aside>
      </el-aside>
      <el-container>
          <el-header class="header">
            <div>
              <i
                :class="{
                  'el-icon-s-fold': isCollapse,
                  'el-icon-s-unfold': !isCollapse
                }"
                @click="isCollapse = !isCollapse"
              >
              </i>
              <span>江苏传智播客科技教育有限公司</span>
            </div>
            <el-dropdown>
              <div class="avatar-wrap">
                <img class="avatar" src="user.photo" alt="">
                <span>{{user.name}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item
                  @click.native="onLogout"
                >退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
          <el-main>
              <router-view></router-view>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
import appAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  data () {
    return {
      user:{},
      isCollapse: false
    }
  },

  components: {
    appAside
  },

  computed: {},

  created() {
    this.loadUserInfo()
  },

  mounted () {},

  methods: {
    onLogout() {
      this.$confirm('确认退出吗？','退出提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          localStorage.removeItem('user')
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
    },

    async loadUserInfo() {
      let userInfo = await getUserProfile()
      this.user = userInfo.data.data
    }
  }
}

</script>
<style lang='scss' scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>

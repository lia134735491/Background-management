<!--  -->
<template>
  <div class="home-container">
    <h1>首页</h1>
    <p>窗前我明月光</p>
    <p>疑是我地上霜</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  created() {
    console.log(this.$route.matched)
  },

  computed: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>

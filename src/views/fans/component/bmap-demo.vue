<!--  -->
<template>
  <div id="container" class="bmap"></div>
</template>

<script>
export default {
  name: 'BmapDemo',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted () {
    var map = new window.BMap.Map('container')
    var point = new window.BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 20)
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
.bmap {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>
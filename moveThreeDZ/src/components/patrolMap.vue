<template>
    <div class="components_patrolmap_iframe">
      <iframe id="mapPage" width="100%" height="100%" frameborder=0
          src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=BR5BZ-ET33U-WXZV2-4MLST-QCOPQ-6AF5E&referer=myapp">
      </iframe>
    </div>
</template>

<script>
export default {
  data () {
    return {
      longitude: '',
      latitude: '',
      poiaddress: ''
    }
  },
  created() {
    this.init()
  },
  beforeDestroy () {
    window.removeEventListener('message', this.getCoordinates)
  },
  methods: {
    getCoordinates (event) {
      var loc = event.data
      if (loc && loc.module == 'locationPicker') {
        this.$emit("update:location", loc)
      }
    },
    init() {
      window.addEventListener('message', this.getCoordinates, false)
    }
  }
}
</script>
<style lang="stylus" scoped>
.components_patrolmap_iframe
  position absolute
  top 0
  bottom 0
  width 100%
</style>
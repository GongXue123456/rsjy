<template>
  <div class="patrolmap">
    <div class="patrolmap_iframe">
      <patrolMap v-bind:location.sync="location" />
    </div>
    <cube-button class="onSure" @click="goBack" :primary="true">确定选择</cube-button>
  </div>

</template>

<script>
import patrolMap from '../../components/patrolMap'
export default {
  components: {
    patrolMap
  },
  data () {
    return {
      location: {}
    }
  },
  methods: {
    goBack() {
      this.$store.dispatch('patrol/location', this.location)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.patrolmap
  .patrolmap_iframe
    position absolute
    top 0
    bottom 60px
    width 100%
  .onSure
    position absolute
    bottom 0
    left 0
</style>
<template>
  <div>
    <Nav title='工单轨迹' />
    <div class="container">
      <cube-input v-model="start" placeholder="输入起点" ></cube-input>
      <cube-input v-model="end"  placeholder="输入终点" ></cube-input>
    </div>
    <div ref="container" id="container"></div>
    <div class="startTaken">
      <cube-button @click="startquery">查询位置</cube-button>
      <cube-button v-if="active=='1'" @click="startTaken" v-show="flag== 0">开始轨迹记录</cube-button>
      <cube-button v-if="active=='1'" @click="stopTaken"  v-show="flag== 1">结束轨迹记录</cube-button>
    </div>
  </div>
</template>

<script>
import {local} from '../../utils'
import axios from '../../axios/index.js'
import Nav from '../../components/Nav'
export default {
  components: {
    Nav
  },
  data() {
    return {
      patrol_code: '',
      map: {},
      start: '',
      end: '',
      city: '',
      flag: 0,
      time: '',
      active:''
    }
  },
  created() {
    this.patrol_code = this.$route.query.patrol_code
      this.active = this.$route.query.active
  },
  mounted() {
    this.init()
    this.getcitylocation()
    if (local.get('three-small-way') === '1') {
      this.startTaken()
      this.flag = false
    }
  },
  methods: {
    init() {
      // 地图初始化
      this.map = new window.BMap.Map("container")
    },
    startquery() {
      // 获得解析地址
      // this.map.clearOverlays()
      this.search(this.start,this.end,2)

    },
    getcitylocation() {
      // 根据用户IP查询城市信息
      let self = this
      var geolocation = new window.BMap.Geolocation()
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() === 0){
          var point = new window.BMap.Point(r.point.lng,r.point.lat)
          self.map.centerAndZoom(point,15)
          self.map.setCurrentCity(r.address.city)
          self.city = r.address.city
          var mk = new window.BMap.Marker(r.point);
          self.map.addOverlay(mk)
          self.map.panTo(r.point)
          window.console.log('您的位置：'+r.point.lng+','+r.point.lat)
        }
        else {
          window.console.log('failed'+this.getStatus())
        }        
      },{enableHighAccuracy: true})
    },
    search(start, end, route) {
      let self =this
      let driving = new window.BMap.DrivingRoute(self.map, {renderOptions:{map: self.map, autoViewport: true},policy: route})
      driving.search(start,end)
    },
    startTaken() {
      if (!this.patrol_code) {
        this.$createToast({
          type: 'warn',
          time: 1000,
          txt: '没有可用轨迹'
        }).show()
        return
      }
      let self = this
      this.flag = 1
      clearInterval(this.time)
      this.time = setInterval(()=>{
        var geolocation = new window.BMap.Geolocation()
        geolocation.getCurrentPosition(function(r){
          let params = {
            table_code: self.patrol_code,
            table_type: 1,
            longitude: r.point.lng,
            latitude: r.point.lat
          }
          axios.post('/app/lonlat/save', params)
        })
      }, 5000)
    },
    stopTaken() {
      this.flag = 0
      clearInterval(this.time)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  padding-top 54px
#container
  position absolute
  top 134px
  bottom 60px
  width 100%
  font-size 15px
.startTaken
  position fixed
  left 0
  bottom 0
  width 100%
</style>
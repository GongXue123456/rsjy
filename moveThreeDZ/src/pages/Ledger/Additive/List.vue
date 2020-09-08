 <template>
  <div class="recordManagement bgcfff">
    <Nav title="食品添加剂使用记录" />
    <div class="record w">
      <search @myvalue="ser" :name.sync="params.product_name" type="home" />
       <div class="ml15 mr15">
         <van-field class="bgcf0"  clickable label="搜索日期"  clearable v-model="params.use_time" placeholder="请选择搜索日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择日期' }]"  @click="showdate1Picker = true"/>
       </div>
    </div>
    <div class="scroll-list-wrap" :style="{ height: fullHeight + 'px' }">
      <cube-scroll ref="scroll" :data="items" :options="options" @pulling-up="onPullingUp">
        <div class="reviewed pr m15 p15 pt15 bgf5" v-for="(item,index) in items" :key="index" @click="toExamine(item)">
          <h3 class="c000 f18 fb">{{item.product_name}}</h3>
          <div class="address  f15 mt15 view-text">{{item.use_time}}
           </div>
           <span class="pa iconfont iconxiangyou"></span>
        </div>
        <empty v-show=flag title="暂无食品添加剂使用记录" />
      </cube-scroll>
    </div>
    <van-popup v-model="showdate1Picker" round position="bottom">
      <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" cancel-button-text='清空' :min-date="minDate" :max-date="maxDate" @cancel="onCancel" @confirm="onConfirm"/>  
    </van-popup>
    <div class="footer p15 bgcfff w"> 
        <van-row  gutter="20">
          <van-col span="24"><van-button  block type="primary" native-type="submit" @click="Add"> 新增食品添加剂使用</van-button></van-col>
         
        </van-row>
       </div>
  </div>
</template>
<script>
import Nav from "../../../components/Nav";
import search from "../../../components/search";
import axios from "../../../axios/index.js";
import empty from "../../../components/empty";
import {formatDate } from '../../../utils/index';
export default {
  components: {
    Nav,
    search,
    empty
  },
  data() {
    return {
      items: [],
      params: {
        pager_offset: 0,
        pager_openset: 10,
        product_name: "",
        company_code:'',
        use_time:''
      },
      showdate1Picker:false,
       minDate: new Date(2010, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(),
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: "",
      pullUpLoadNoMoreTxt: "暂无数据",
      flag: false,
      fullHeight:document.documentElement.clientHeight - 50,
    };
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      };
    },
    pullUpLoadObj() {
      return this.pullUpLoad
        ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          }
        : false;
    }
  },
  created() {
       this.params.company_code=this.$route.query.id;
    this.getList(this.params);
  },
  methods: {
    getList(params) {
      axios.get("app/standingbook/additiveuse/list", params).then(v => {
        if (v.data.pager_list.length === 0) {
          this.$refs.scroll.forceUpdate();
          this.pullUpLoad = false;
          if (this.items.length === 0) {
            this.flag = !this.flag;
          }
        }
        this.items = this.items.concat(v.data.pager_list);
      });
    },
    ser(value) {
      this.$refs.scroll.refresh();
      this.items = [];
      this.flag = false;
      this.params.pager_offset = 0;
      this.params.product_name = value;
      this.getList(this.params);
    },
    toExamine(item) {
      this.$router.push({
          path: "/additive/detail",
          query: {
            id: item.company_code,
            id1:item.use_code
          }
        });
    },
    onPullingUp() {
      this.params.pager_offset += 10;
      this.getList(this.params);
    },
    Add(){
        this.$router.push({path: "/additive/add",query: {
            id: this.params.company_code
          }});
    },
    onConfirm(value){
      this.params.use_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false;
       this.ser(this.params.product_name)
    },
    onCancel(){
      this.params.use_time='';
      this.showdate1Picker=false;
       this.ser(this.params.product_name)
    }
  }
};
</script>
<style lang="less" scoped>
.record {
  overflow: hidden;
  position: fixed;
  z-index: 99;
  top: 54px;
  img {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 15px;
    left: 20px;
    z-index: 100;
  }
}
.scroll-list-wrap {
  padding-top: 150px;
  .reviewed {
    border-radius:5px;
    img{top: 10px;right: 20px;width: 75px;height:75px;}
    .address {
      color: #A6A6A6;
      width: 95%;
    }
    span {
      color: #A6A6A6;
      top: 30px;
      right: 10px;
    }
  }
}
.footer{position: fixed;bottom: 0px;left: 0px;z-index: 99;}
</style>

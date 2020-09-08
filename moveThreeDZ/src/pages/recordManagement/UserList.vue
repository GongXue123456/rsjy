 <template>
  <div class="recordManagement bgcfff">
    <Nav title="备案管理" val='0'/>
    <div class="record w">
      <search @myvalue="ser" :name.sync="params.company_name" type="home" />
    </div>
    <div class="scroll-list-wrap" :style="{ height: fullHeight + 'px' }">
      <cube-scroll ref="scroll" :data="items" :options="options" @pulling-up="onPullingUp">
        <div class="reviewed pr m15 p15 pt15 bgf5" v-for="(item,index) in items" :key="index" @click="toExamine(item)">
          <span v-if="item.filing_state===3">
            <img class="pa" v-if="item.state===1" src="../../assets/img/guidang.png" alt />
            <img class="pa" v-else-if="item.state===2" src="../../assets/img/guoqi.png" alt />
            <img class="pa" v-else-if="item.state===3" src="../../assets/img/shixiao.png" alt />
            <img class="pa" v-else-if="item.state===4" src="../../assets/img/guidang.png" alt />
          </span>
          <img class="pa" v-else-if="item.filing_state===2" src="../../assets/img/waitExamine.png" alt />
          <img class="pa" v-else-if="item.filing_state===4" src="../../assets/img/bohui.png" alt />
          <h3 class="c000 f16 fb">{{item.company_name}}</h3>
          <div class="address  f15 mt15 view-text">{{item.province+item.city+item.area+item.town+item.vill}}
           </div>
           <span class="pa iconfont iconxiangyou"></span>
          <div v-if="item.business_form" class="mechanism f14 mt10 disib" :class="item.companytype_code==='1001574645421581000000001'?'cnormal1 bgcnormal1':(item.companytype_code==='1001574645421581000000002'?'cnormal2 bgcnormal2':'cnormal3 bgcnormal3')">{{item.business_form}}</div>
        </div>
        <empty v-show=flag title="暂无备案信息" />
      </cube-scroll>
    </div>
    <div class="footer p15 bgcfff w"> 
        <van-row  gutter="20">
          <van-col span="24"><van-button  block type="primary" native-type="submit" @click="Add"> 新增备案 </van-button></van-col>
        </van-row>
       </div>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import search from "../../components/search";
import axios from "../../axios/index.js";
import empty from "../../components/empty";
import { local } from '../../utils/index'
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
        filing_state: "",
        pager_offset: 0,
        pager_openset: 10,
        company_name: ""
      },
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
    this.getList(this.params);
  },
  methods: {
    getList(params) {
      axios.get("app/company/search", params).then(v => {
        if (v.data.companyList.length === 0) {
          this.$refs.scroll.forceUpdate();
          this.pullUpLoad = false;
          if (this.items.length === 0) {
            this.flag = !this.flag;
          }
        }
        this.items = this.items.concat(v.data.companyList);
      });
    },
    ser(value) {
      this.$refs.scroll.refresh();
      this.items = [];
      this.flag = false;
      this.params.pager_offset = 0;
      this.params.company_name = value;
      this.getList(this.params);
    },
    toExamine(item) {
      this.$router.push({
          path: "/recordDetail",
          query: {
            id: item.company_code
          }
        });
    },
    onPullingUp() {
      this.params.pager_offset += 10;
      this.getList(this.params);
    },
    Add(){
        this.$router.push({path: "/bodyType"});
        local.set("form",'')
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
  /deep/ .ser_in{
    border-radius: 8px;
    background: #f5f5f5;
    .cube-input,.cube-input-field{
      border-radius: 8px;
    }
  }
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
  padding-top: 110px;
  .reviewed {
    border-radius:5px;
    img{top: 10px;right: 30px;width: 65px;height:65px;}
    .address {
      color: #A6A6A6;
      width: 95%;
    }
    .mechanism {
      padding:8px 10px;
    }
    span {
      color: #A6A6A6;
      top: 50px;
      right: 10px;
    }
  }
}
.footer{
  position: fixed;bottom: 0px;left: 0px;z-index: 99;background: #f5f5f5 !important;
  span{
    font-size: 18px;
  }
  }
</style>

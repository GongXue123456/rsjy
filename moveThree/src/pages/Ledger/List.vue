 <template>
  <div class="recordManagement bgcfff">
    <Nav title="小作坊列表" />
    <div class="record w">
      <search @myvalue="ser" :name.sync="params.company_name" type="home" />
    </div>
    <div class="scroll-list-wrap bgcfff" :style="{ height: fullHeight + 'px' }">
      <cube-scroll ref="scroll" :data="items" :options="options" @pulling-up="onPullingUp">
        <div class="reviewed pr m15 p15 pt15 bgf5" v-for="(item,index) in items" :key="index" @click="toExamine(item)">
          <h3 class="c000 f16 fb">{{item.company_name}}</h3>
          <div class="address  f15 mt15 view-text">{{item.province+item.city+item.area+item.town+item.vill}}
           </div>
           <span class="pa iconfont iconxiangyou"></span>
          <div v-if="item.business_form" class="mechanism f14 mt10 disib" :class="item.companytype_code==='1001574645421581000000001'?'cnormal1 bgcnormal1':(item.companytype_code==='1001574645421581000000002'?'cnormal2 bgcnormal2':'cnormal3 bgcnormal3')">{{item.business_form}}</div>
        </div>
        <empty v-show=flag title="暂无小作坊信息" />
      </cube-scroll>
    </div>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import search from "../../components/search";
import axios from "../../axios/index.js";
import empty from "../../components/empty";
import { local } from '../../utils';
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
        company_name: "",
        query_param:''
      },
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: "",
      pullUpLoadNoMoreTxt: "暂无数据",
      flag: false,
      fullHeight:document.documentElement.clientHeight,
      user_type:''
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
    this.user_type=local.get("user").user_type;
    console.log(this.user_type)
      if(this.user_type==='平台管理员'||this.user_type==='超级管理员'||this.user_type==='协管员'){
         this.params.query_param='food_source_countbig';
            this.getList(this.params);
      }else{
       this.params.query_param='';
          this.getList(this.params);
      }
 
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
    toExamine(item) {//@click="$router.push('/foodSourceTree?id='+item.company_code+'&time='+item.food_source_time_last)"
       if(this.user_type=='平台管理员'||this.user_type=='超级管理员'||this.user_type=='协管员'){
         this.$router.push({
          path: "/ledgerControll",
          query: {id: item.company_code,name:item.company_name,time:item.food_source_time_last}
        });
      }else{
       this.$router.push({path: "/ledger",query: {id: item.company_code,name:item.company_name}
        });
      }
      
    },
    clickHandler(params) {
      this.pullUpLoad = true;
      this.$refs.scroll.refresh();
      this.items = [];
      this.flag = false;
      this.params.pager_offset = 0;
      this.params.filing_state = params;
      this.getList(this.params);
    },
    onPullingUp() {
      this.params.pager_offset += 10;
      this.getList(this.params);
    },
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
  padding-top: 110px;
  // top: 110px;
  .reviewed {
    border-radius:5px;
    img{top: 10px;right: 20px;width: 75px;height:75px;}
    .address {
      color: #A6A6A6;
      width: 95%;
    }
    .mechanism {
      padding:8px 10px;
    }
    span {
      color: #A6A6A6;
      top: 45px;
      right: 10px;
    }
  }
}
</style>

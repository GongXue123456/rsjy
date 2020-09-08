<template>
  <el-container class="recorddetail">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>溯源管理</h5>
        <div><el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="pt0 pr">
    <div class="box title mt20 mb20 f16">
        <!-- <div v-if="list.vedio" class="tl c333" @click="gomonitordetail">{{list.company_name}}<img src="../../../assets/image/shexiang.png"></div> -->
        <div class="tl c333">{{company_name}}</div>
     </div>
     <el-tabs v-model="activeName" @tab-click="handleClick">
    
    <el-tab-pane label="溯源信息" name="first">
       <el-row class="box mb15  f14">
        <!-- <el-col class="fr  tr" :span="24"><el-button type="primary" size="small" @click="SourceAdd">新增溯源</el-button></el-col> -->
      </el-row>
 <el-collapse accordion v-if="show1">
  <el-collapse-item v-for="(item,index) in list1" :key="index">
    <template slot="title">
     <el-row class="w tl pl10 flex">
  <el-col :span="6">购买时间：{{item.sell_time}}</el-col>
  <el-col :span="4">溯源数量：{{item.foodSourceDetailList.length}}</el-col>
  <el-col :span="4">购买人：{{item.sell_person}}</el-col>
  <el-col :span="7" class="lh150">购买地址：{{item.supplier_address}}</el-col>
</el-row>
    </template>
      <el-table border
    :data="item.foodSourceDetailList"
    style="width: 100%;margin-bottom: 20px;"
   >
    <el-table-column
    width="80px"
    align='center'
     type="index"
      label="序号">
    </el-table-column>
    <el-table-column
      prop="img"
      align='center'
      label="图片">
       <template slot-scope="scope">
      <img v-if="scope.row.product_logo==='undefined'||scope.row.product_logo===''||scope.row.product_logo==='null'"  src="../../../assets/image/source.png"   style="width: 40px;height: 40px"/>
      <el-image v-else style="width: 40px;height: 40px" :src="user.qyurl+scope.row.product_logo" :preview-src-list="[user.qyurl+scope.row.product_logo]" alt=""></el-image>
    </template>
    </el-table-column>
    <el-table-column align='center'
      label="种类">
        <template slot-scope="scope"><p @click="gongshi1(scope.row.sale_product_name,scope.row.sale_company_name,scope.row.foodsourcedetail_code)" class="general_color">{{scope.row.category_name}}</p>
        </template>
    </el-table-column>
    <el-table-column align='center'
      prop="product_name"
      label="原材料名称">
    </el-table-column>
    <el-table-column align='center'
      prop="product_spec"
      label="规格">
    </el-table-column>
    <el-table-column align='center'
      prop="product_unit"
      label="单位">
    </el-table-column>
    <el-table-column align='center'
      prop="sell_count"
      label="数量">
    </el-table-column>
    <el-table-column align='center'
      label="供应商">
       <p @click="gongshi(item.supplier_name)" class="general_color">{{item.supplier_name}}</p>
       
    </el-table-column>
    <el-table-column align='center'
      prop="sale_product_name"
      label="产品名称">
    </el-table-column>
    <el-table-column align='center'  min-width="120"
      prop="sale_company_name"
      label="产品接收单位">
    </el-table-column>
    <el-table-column align='center'
      label="采购人员">{{item.sell_person}}
    </el-table-column>
    <!-- <el-table-column align='center'
      prop="produce_name"
      label="加工人员">
    </el-table-column> -->
    <!-- <el-table-column label="操作" width="60" fixed="right" align='center'>
          <template slot-scope="scope">
           <el-button type="text" class="general_color" size="small"  @click="godetail(scope.row.company_code,scope.row.foodsourcedetail_code)" >详情</el-button>
         </template>
        </el-table-column> -->
  </el-table>
  </el-collapse-item>
   <div class="i-page fr disib mt20">
        <el-pagination
          background
          :page-size='10'
          layout="total,prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change = 'currentChange'>
        </el-pagination>
      </div>
</el-collapse>
  <div  v-else>暂无数据</div>
    </el-tab-pane>
  </el-tabs>
  <el-dialog :title="show==1?'小作坊信息公示':'上下游追溯信息'" :class="show==1?'el-dialog1':'el-dialog2'" :visible.sync="dialogTableVisible" @close="onClose">
      <div  v-if="show==1">
    <div class="nav c000">
        <i class="iconfont icondianpu-copy cfff f30"></i>
        <p class="name  fb ml15">{{company.company_name}}</p>
        <span  class="ml10 tag tag1 f15">正常营业</span>
	</div>
	<div class="content m15">
        <div v-if="jcxxshow" class="card p15 bgcfff">
          <div class="title f18"><i class="iconfont iconrizhi mr5"></i>基础信息</div>
          <ul>
            <span v-for="(item, key) in pageconfig" :key="key">
              <span v-if="item.attr_en=='record_code' || item.attr_en=='unuseful_time' || item.attr_en=='record_time' || item.attr_en=='companytype_name' ">
                <li>
                  <span v-text="item.attr_ch + '：'" style="text-align: right;"></span>				      
                <span>{{company[item.attr_en]}}</span>
                </li>
              </span>
            </span>
          </ul>
        </div>
        <div v-if="jyzxxshow" class="card p15 mt15 bgcfff">
          <div class="title f18"><i class="iconfont iconren-renyuan mr5"></i>经营者信息</div>
          <ul>
            <span v-for="(item, key) in pageconfig" :key="key">
              <span v-if="item.attr_en=='operator' || item.attr_en=='mobilephone'">
                <li>
                  <span v-text="item.attr_ch + '：'" style="text-align: right;"></span>				      
                <span>{{company[item.attr_en]}}</span>
                </li>
              </span>
            </span>
          </ul>
        </div>
        <div v-if="imgshow" class="card p15 mt15 bgcfff">
          <div class="title f18"><i class="iconfont icontupian mr5"></i>证照照片</div>
          <ul class="p0 imgs disib">
                  <span v-for="(item, key) in pageconfig"  :key="key" class="" >
                    <span class="" v-if="accessoryList[item.attr_ch]&&(item.attr_ch=='营业执照' || item.attr_ch=='备案证' || item.attr_ch=='经营者身份证' || item.attr_ch=='食品经营许可证' || item.attr_ch=='法人身份证' || item.attr_ch=='法人证书' || item.attr_ch=='批准设立文件或证件')">
                      <li>
                         <el-image v-if="accessoryList[item.attr_ch]" 
     
       height="3.5rem" :src="user.qyurl+accessoryList[item.attr_ch]"  :preview-src-list="[user.qyurl+accessoryList[item.attr_ch]]"
     ></el-image>
                      <img v-else :src="img">
                     <p class="mt10">{{item.attr_ch}}</p>
                      </li>
                     
                    </span>
                  </span>
          </ul>
        </div>
    </div>	
  </div>
  <div v-else>
     <el-main>
    <div class="box mt20 f14">
        <div class="tl c333 flex" >
           <img v-if="order_detail.product_logo_url" class="el-image" :src="order_detail.product_logo_url" />
            <img v-else  src="../../../assets/image/source.png" >
            <div class="ml15"><p class="title mb20">{{order_detail.product_name}}</p></div>
            </div>
     </div>
       <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">供应商信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">供应商名称：</span><span class="c333" v-if="batchingIn">{{batchingIn.supplier_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">供应商电话：</span><span class="c333"  v-if="batchingIn">{{batchingIn.contact_phone}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">供应商地址：</span><span class="c333"  v-if="batchingIn">{{batchingIn.supplier_address}}</span>
        </el-col>
        <el-col :span="22" v-if="batchingIn" class="tl mb20" style="display: flex;" :offset="1">
           <span class="left">检疫检验报告：</span>
              <div class="disib" v-for="(fit,index) in batchingIn.accessoryList" :key="index">
    <el-image style="width: 100px; height: 100px"  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      :fit="fit.name"></el-image>
       <el-image style="width: 100px; height: 100px" v-else
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
        
      </el-col>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">小作坊信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">小作坊名称：</span><span class="c333" v-if="supplier">{{supplier.supplier_name}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">小作坊地址：</span><span class="c333" v-if="supplier">{{supplier.supplier_province}}{{supplier.supplier_city}}{{supplier.supplier_area}}{{supplier.supplier_address}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">小作坊电话：</span><span class="c333" v-if="supplier">{{supplier.supplier_mobilephone}}</span>
        </el-col>
         <el-row class="box m30 f14 c666">
         <el-col :span="24" class="recorddetail-title1  tl mb20 pl15 general_color">产品信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品名称：</span><span class="c333">{{order_detail.product_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品规格：</span><span class="c333">{{order_detail.product_spec}}</span>
        </el-col>
        </el-row>
         <el-row class="box m30 f14 c666">
         <el-col :span="24" class="recorddetail-title1  tl mb20 pl15 general_color">订单信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">订单编号：</span><span class="c333">{{order_detail.order_code}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">下单时间：</span><span class="c333">{{order_detail.order_downtime}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">配送时间：</span><span class="c333">{{order_detail.order_sendtime}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">配送站点：</span><span class="c333">{{order_detail.company_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">配送厨师：</span><span class="c333">{{order_detail.order_cook_user_name}}</span>
        </el-col>
        </el-row>
        <el-row class="box m30 f14 c666">
         <el-col :span="24" class="recorddetail-title1  tl mb20 pl15 general_color">采购信息</el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">采购时间：</span><span class="c333" v-if="supplier">{{supplier.buy_time}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">采购人员：</span><span class="c333">{{order_detail.orderdetail_buyer_user_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">联系电话：</span><span class="c333">{{order_detail.orderdetail_buyer_user_mobilephone}}</span>
        </el-col>
        </el-row>
        <el-row class="box m30 f14 c666">
         <el-col :span="24" class="recorddetail-title1  tl mb20 pl15 general_color">分拣信息</el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">分拣人员：</span><span class="c333">{{order_detail.orderdetail_sorter_user_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">联系电话：</span><span class="c333">{{order_detail.orderdetail_sorter_user_mobilephone}}</span>
        </el-col>
        </el-row>
        <el-row class="box m30 f14 c666">
         <el-col :span="24" class="recorddetail-title1  tl mb20 pl15 general_color">配送信息</el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">分拣地址：</span><span class="c333">{{order_detail.order_address}}</span>
        </el-col>
        </el-row>
        <el-row class="box m30 f14 c666">
         <el-col :span="24" class="recorddetail-title1  tl mb20 pl15 general_color">加工信息</el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">脱包状态：</span><span class="c333" v-if="order_detail_process&&order_detail_process.drop_bag_state===1">是</span>
          <span class="c333" v-else-if="order_detail_process&&order_detail_process.drop_bag_state===2">否</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">解冻状态：</span><span class="c333" v-if="order_detail_process&&order_detail_process.unfreeze_state===1">是</span>
          <span class="c333" v-else-if="order_detail_process&&order_detail_process.unfreeze_state===2">否</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">蒸煮状态：</span><span class="c333" v-if="order_detail_process&&order_detail_process.stewing_state===1">是</span>
          <span class="c333" v-else-if="order_detail_process&&order_detail_process.stewing_state===2">否</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">分拣状态：</span><span class="c333" v-if="order_detail_process&&order_detail_process.sorting_state===1">是</span>
          <span class="c333" v-else-if="order_detail_process&&order_detail_process.sorting_state===2">否</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">浸泡状态：</span><span class="c333" v-if="order_detail_process&&order_detail_process.soak_state===1">是</span>
          <span class="c333" v-else-if="order_detail_process&&order_detail_process.soak_state===2">否</span>
        </el-col>
        </el-row>
        <el-row class="box m30 f14 c666">
         <el-col :span="24" class="recorddetail-title1  tl mb20 pl15 general_color">快检信息</el-col>
          <div v-for="(item,index) in order_detail_fast_check_list" :key="index">
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">商品编号：</span><span class="c333"  >{{item.fast_check_num}}</span>
          </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">检测项目：</span><span class="c333" v-if="item.fast_check_project===1">甲醛</span>
          <span class="c333" v-else-if="item.fast_check_project===2">双氧水</span>
          <span class="c333" v-else-if="item.fast_check_project===3">农药残留</span>
          <span class="c333" v-else-if="item.fast_check_project===4">孔雀石绿</span>
          <span class="c333" v-else-if="item.fast_check_project===5">呋喃类</span>
          <span class="c333" v-else-if="item.fast_check_project===6">氯霉素</span>
          <span class="c333" v-else-if="item.fast_check_project===7">瘦肉精</span>
          <span class="c333" v-else-if="item.fast_check_project===8">菌落总数</span>
          <span class="c333" v-else-if="item.fast_check_project===9">大肠菌群</span>
          <span class="c333" v-else-if="item.fast_check_project===10">挥发性盐基氮</span>
          <span class="c333" v-else-if="item.fast_check_project===11">其他理化指标</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">温度：</span><span class="c333">{{item.temperature}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">湿度：</span><span class="c333">{{item.humidity}}%rh</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">样品状态：</span><span class="c333" v-if="item.fast_check_form===1">散装</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">标准要求/限：</span><span class="c333" v-if="item.fast_check_standard===1">适量添加</span>
          <span class="c333" v-else-if="item.fast_check_standard===2">n=5,c=2,m=104,M=105</span>
          <span class="c333" v-else-if="item.fast_check_standard===3">&le;15</span>
          <span class="c333" v-else-if="item.fast_check_standard===4">不得检出</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">检测结果：</span><span class="c333"  v-if="item.fast_check_result===1">阴性</span>
          <span class="c333"  v-else-if="item.fast_check_result===2">阳性</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">检测结论：</span><span class="c333"  v-if="item.fast_check_conclusion===1">合格</span>
          <span class="c333"  v-else-if="item.fast_check_conclusion===2">不合格</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{item.fast_check_remark}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" style="display: flex;" :offset="1">
           <span class="left">快检报告：</span>
    <el-image style="width: 100px; height: 100px" v-if="order_detail.orderdetail_check_url"
      :src="'http://cry.rsjykj.com.cn/cry/'+order_detail.orderdetail_check_url"
      :preview-src-list="['http://cry.rsjykj.com.cn/cry/'+order_detail.orderdetail_check_url]"
     ></el-image>
       <el-image style="width: 100px; height: 100px" v-else
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
        </el-col>
        </div>
     </el-row>
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">餐饮店信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">餐饮店名称：</span><span class="c333"  v-if="bookSale">{{bookSale.buy_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">餐饮店地址：</span><span class="c333" v-if="bookSale">{{bookSale.buy_area}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">餐饮店电话：</span><span class="c333" v-if="bookSale">{{bookSale.link_phone}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" style="display: flex;" :offset="1">
           <span class="left">溯源二维码：</span>
			<div class="qrcodeinfo_url tl" @click="showQR1(order_detail.orderdetail_code)">
        <div ref="qrcodeContainer" style="display: none"></div>
				<div class="qrcode" id="qrcode" ref="qrCodeUrl"  style="margin: 0 auto;width: 100px;height: 100px;"></div>
		</div>
      </el-col>
     </el-row>
    </el-main>
  </div>
      </el-dialog>    
      <div class="mask" v-show="isFlag"></div>
		<div class="qrcodeinfo"  v-show="isFlag">
			<div class="qrcodeinfo_url1" >
        <div ref="qrcodeContainer1" style="display: none"></div>
				<div class="qrcode" id="qrcode1" ref="qrCodeUrl1" style="margin: 0 auto;width: 220px;height: 220px;"></div>
			</div>
			<div class="close" @click="toClose">
				<i class="icon  iconfont iconclose f30"></i>
			</div>
		</div>
    </el-main>
  </el-container>
</template>
<script>
import QRCode from 'qrcodejs2'
import axios from '../../../util/api'
import { local} from '../../../util/util'
import axiosa from 'axios'
export default {
  data () {
    return {
      company_name:'',
      currentPage: 1,
      total: 0,
      page: {
       company_code:'',
       pager_offset: '0',
      },
      activeName: 'first',
       fits: ['备案申请书', '营业执照副本', '场地证明', '健康证', '身份证','身份证反面'],
       list: [],
       list1: [],
        foodSource:'',
       companytag_code:'',
       user:'',
        dialogTableVisible: false,
      value:2.5,
		accessoryList: {},
		company: {},
    pageconfig: [],
    integrityLogList:[],
		flag: false,
		imgshow: false,
		jyxxshow: false,
		jyzxxshow: false,
		jcxxshow: false,
    lengthshow: true,
    loadButton:true,
    typename: '',
    show:2,
    supplier:{},
    order:'',
    order_detail:{},
    batchingIn:{},
    bookSale:{},
    order_detail_process:{},
    order_detail_fast_check_list:[],
    isFlag:false,
    show1:true
    }
  },
   created () {
       this.user = local.get('user');
     this.page.company_code=this.$route.query.id;
      this.currentPage = this.page.pager_offset / 10 + 1
      this.company_name=this.$route.query.name;
     this.init(this.page)
     
  },
  methods: {
     getdata1 (params1,params2,params3) {
        axiosa.get('http://cry.rsjykj.com.cn//cry/receive/companyProduct?product_name='+params1+'&company_name='+params2).then((v) => {
         if(v.data.data){
            this.supplier=v.data.data.supplier;
         this.order=v.data.data.order;
         this.order_detail=v.data.data.order_detail;
         this.order_detail_fast_check_list=v.data.data.order_detail_fast_check_list
         this.order_detail_process=v.data.data.order_detail_process;
          this.showQR(this.order_detail.orderdetail_code)
         }
        
        }).catch()
      axios.get('/api/foodsource/announce', {foodsourcedetail_code:params3}).then((v) => {
       this.batchingIn=v.batchingIn;
       this.bookSale=v.bookSale;
      })
    },
      init (params) {
       axios.get('/api/foodsource/search', params).then((v) => {
       this.list1=v.foodSourceList;
       if(v.foodSourceList.length>0){this.show1=true}else{this.show1=false}
       this.total = v.pager_count
      })
    },
     init1(name){
         var self=this;
             axios.get('api/company/announce', {company_name:name}).then(v => {
              self.company = v.company;
              let lengthshownum = 0;
              v.company.accessoryList.forEach(item=>{
                self.accessoryList[item.accessory_type] = item.accessory_url
                if(item.accessory_url){
                  self.imgshow = true
                  lengthshownum ++
                }

              })
              if(lengthshownum > 2){self.lengthshow = false}
              if(v.pageconfig.indexOf("record_code") >= 0 || v.pageconfig.indexOf("companytag_code") >= 0 || v.pageconfig.indexOf("unuseful_time") >= 0 || v.pageconfig.indexOf("record_time") >= 0 || v.pageconfig.indexOf("companytype_name") >= 0){
                self.jcxxshow = true
              }
              if(v.pageconfig.indexOf("operator") >= 0 || v.pageconfig.indexOf("mobilephone") >= 0){
                self.jyzxxshow = true
              }
              if(v.pageconfig.indexOf("business_form") >= 0 || v.pageconfig.indexOf("business_state") >= 0 || v.pageconfig.indexOf("main_subject") >= 0|| v.pageconfig.indexOf("produce_form") >= 0|| v.pageconfig.indexOf("producetype_codes") >= 0){
                self.jyxxshow = true
              }
               self.pageconfig =  v.pageconfig ? JSON.parse(v.pageconfig) : []
             })
       },
     // 分页
    currentChange(page){
      this.currentPage = page;
      this.page.pager_offset = String((page - 1) * 10)
      this.init(this.page)
    },
     userTypeList (row) {
      return row.employ_ishealth==1?'有':'无'
    },
     handleClick() {},

  SourceAdd(){
     this.$router.push({
        name: "SourceAdd",
        query: {
          id:this.page.company_code,
        }
      });
  },
  gomonitordetail(){
      this.$router.push({
        name: "MonitorDetail",
        query: {
          id:this.$route.query.company_code
        }
      });
  },
  gongshi(name){
    this.show=1;
    this.dialogTableVisible=true;
    this.init1(name)
  },
  gongshi1(name1,name2,code){
      this.show=2;
    this.dialogTableVisible=true;
    this.getdata1(name1,name2,code)
   
    // this.init1(name)
  },
  showQR(params){
       var self = this
         var url = "http://cry.rsjykj.com.cn/cry/receive/searchByODCode?a="+params;
       window.console.log(url)
       new QRCode(this.$refs.qrcodeContainer,{
         text:url,
         width:100,
         height:100,
         colorDark:'#000',
         colorLight:'#fff',
       })
       var myCanvas = document.getElementsByTagName('canvas')[0];
       var image = new Image();
       image.src = myCanvas.toDataURL("image/png");
        this.$refs.qrCodeUrl.append(image);
     },
     showQR1(params){
       var self = this
        self.isFlag = true;
          var url = "http://cry.rsjykj.com.cn/cry/receive/searchByODCode?a="+params;
       window.console.log(url)
       new QRCode(this.$refs.qrcodeContainer1,{
         text:url,
         width:220,
         height:220,
         colorDark:'#000',
         colorLight:'#fff',
       })
       var myCanvas = document.getElementsByTagName('canvas')[0];
       var image1 = new Image();
       image1.src = myCanvas.toDataURL("image/png");
       image1.style.width='220px';
       image1.style.height='220px';
        this.$refs.qrCodeUrl1.append(image1);
     },
     toClose: function() {
			var self = this;
			self.isFlag = false;
			self.$refs.qrCodeUrl1.innerHTML='';
		},
   
   findc: function(code) {
         if(code=='1001574645421581111111101'){
           this.typename = "四川省小作坊备案证"
         }else if(code=='1001574645421581111111102'){
           this.typename = "四川省小经营店备案证（流通）"
         }else if(code=='1001574645421581111111103'){
           this.typename = "食品经营许可证（餐饮）"
         }else if(code=='1001574645421581111111104'){
           this.typename = "四川省小经营店备案证（餐饮）"
         }else {
           this.typename = "食品经营许可证（流通）"
         }
        },
  onClose() {
      	var self = this;
      self.$refs.qrCodeUrl.innerHTML='';
        this.supplier={};
         this.order={};
         this.order_detail={};
         this.order_detail_fast_check_list=[]
         this.order_detail_process={}
         this.batchingIn={};
       this.bookSale={};
    },
  }
}
</script>
<style lang="scss" scoped>
.recorddetail{
  overflow-x: hidden;
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex{display: flex;align-items: center;
.title{font-size: 22px;}}
  .title{
    img{width: 18px;margin-left: 5px;vertical-align: text-bottom}
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .recorddetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
  .recorddetail-title1{height: 34px;line-height: 34px;background-color: #f3f3f3;}
/deep/ .el-collapse{border:1px solid rgba(235, 239, 241, 1);
  .el-collapse-item__header{background:rgba(247,248,249,1);
  .flex{display: flex;align-items: center};
  .el-col-9{line-height: 1.5};
}
.el-collapse-item__content{padding-bottom: 0px;
.el-table{margin-bottom: 0px !important;}

} }
}
 /deep/  .el-dialog2{.el-dialog{width:65% !important;}  .el-dialog1{ width: 414px !important;}}
  /deep/  .el-dialog1{.el-dialog{ width: 414px !important;}}
/deep/ .el-dialog{
  .el-dialog__body{text-align: left;padding: 0px;}
 
 
  .nav{
   padding: 40px 20px 0px 20px;
   height: 150px;
   background: url("../../../assets/image/scan.png") no-repeat 0px 0px;
   background-size: cover;
   .name{
        display: inline-block;
  white-space: nowrap; 
  font-size: 20px;
  max-width: 40%;
  overflow: hidden;
  text-overflow:ellipsis;
   }
   i{font-size: 30px !important;}
   .tag{padding: 6px 10px;border-radius:3px;display: inline-block;
    vertical-align:bottom;}
   .tag1{background-color: #31BCF0;}
   .tag2{background-color: #38CD85;}
}
  .content{
    margin-top: -50px;
    padding-bottom: 70px;
    .card{
        border-radius:10px;
      .title{
          color: #239FE1;
          i{font-size: 23px !important;vertical-align: text-bottom; color: #239FE1;}
      }
      /deep/ .van-field{padding-bottom: 5px;
      .van-field__label{width: initial;}}
       ul{
  color:#636363; 
  font-size: 15px;
  padding:0px 10px;
}
 ul li{
  padding-top: 15px;
}
 ul li span:nth-of-type(1){
	flex: 0 0 100px;
}
.imgs{
   padding:0px !important;
li{
  width: 50%;
  padding: 10px;
  float: left;
  text-align: center;
  /deep/ .van-image__img{border-radius: 5px !important;}
}
} 
.van-rate{vertical-align: text-bottom;}
    }
}
}
/deep/  .el-dialog1{
 .el-dialog{width: initial;}}
 .qrcodeinfo_url{
    width: 120px;
    height: 120px;
    background: #fff;
}
 .qrcodeinfo_url1{
    width: 240px;
    height:240px;
    background: #fff;
     margin: 0 auto;
        display: flex;
    align-items: center;
   
}
#qrcode1{ img{width: 100% !important;}}
.mask{
	position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: rgba(0,0,0,.8);
}
.qrcodeinfo{
    position: fixed;
    top: 30%;
    left: 0;
    width: 100%;
    z-index: 10000;
}
.close{position: fixed;right: 30px;top: 30px;.iconfont{font-size: 40px;}}
</style>

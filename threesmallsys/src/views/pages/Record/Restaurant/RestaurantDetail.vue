<template>
  <el-container class="recorddetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>备案管理</h5>
        <div>
          <el-button  v-if="menu_btns!=null&&menu_btns.indexOf('5-3-2')!== -1&&this.id1==3&&list.state!=3"  type="danger" size="small" @click="off(list.company_code)">注销备案</el-button>
           <el-button  v-if="menu_btns!=null&&menu_btns.indexOf('5-3-3')!== -1&&this.id1==3&&list.state!=3"  type="info" size="small" @click="addBlackList(2)">加入黑名单</el-button>
      <el-button  v-if="menu_btns!=null&&menu_btns.indexOf('5-3-7')!== -1&&list.isblacklist==2" type="info" size="small" @click="addBlackList(1)">加入白名单</el-button>
      <el-button  v-if="menu_btns!=null&&menu_btns.indexOf('5-3-4')!== -1&&this.id1==3&&list.state!=3" size="small" type="primary" @click="recordChange(list.company_code,1)">变更备案</el-button>
      <el-button type="primary" v-if="loading==false" size="small" @click="downDetailExcel">导出数据</el-button>
      <el-button  v-else-if="loading==true" type="info" disabled size="small" >导出数据</el-button>
      <el-button  class="back_btn" size="small" plain  @click="$router.back()">返回</el-button></div>
    </el-header>
    <el-main class="p15 pt0 pr">
    <div class="box tl title mt20 mb20 f16">
        <!-- <div v-if="list.vedio" class="tl c333" @click="gomonitordetail">{{list.company_name}}<img src="../../../assets/image/shexiang.png"></div> -->
        <div class="tl mr20 disib c333" >{{list.company_name}}</div>
         <el-tag size="medium" class="mr10 disib" @click="$router.push({name: 'SourceDetail',query: {id:list.company_code,name:list.company_name}})">
         溯源信息
        </el-tag>
         <el-tag size="medium" class=" disib" @click="$router.push({name: 'SampleDetail',query: {id:list.company_code,name:list.company_name}})">
         留样信息
        </el-tag>
         <img class="type_img" v-if="this.id1==4" src="../../../../assets/image/bohui.png">
        <img class="type_img" v-if="this.id1==3&&list.state==3"  src="../../../../assets/image/shixiao.png">
         <img class="type_img" v-if="this.id1==3&&list.state==2"  src="../../../../assets/image/guoqi.png">
         <img class="type_img" v-if="(this.id1==3&&list.state==4)||(this.id1==3&&list.state==1)"  src="../../../../assets/image/tongguo.png">
        <img class="type_img" v-if="this.id1==2" src="../../../../assets/image/shenhe.png">
     </div>
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane  label="基本信息" name="1">
        <!-- <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">主体类型：</span><span v-if="list.companytag_code=='1001574645421581111111103'" class="c333">食品经营许可</span><span v-else-if="list.companytag_code=='1001574645421581111111104'" class="c333">四川省小经营店备案证（餐饮）</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">主体业态：</span><span class="c333">{{list.business_form}}</span>
        </el-col>
      </el-row> -->
        <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">基础信息</el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">小作坊名称：</span><span class="c333">{{list.company_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">经营者姓名：</span><span class="c333">{{list.operator}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">手机号：</span><span class="c333">{{list.mobilephone}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">身份证号：</span><span class="c333">{{list.idcard}}</span>
        </el-col>
        <!-- <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">备案时间：</span><span class="c333">{{list.add_time}}</span>
        </el-col> -->
     </el-row>
     <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">经营信息</el-col>
        
        <el-col v-if="list.companytag_code=='1001574645421581111111103'" :span="9" class="tl mb20" :offset="1">
          <span class="left">社会信用代码：</span><span class="c333">{{list.credit_code}}</span>
        </el-col>
        <el-col v-if="list.companytag_code=='1001574645421581111111103'" :span="9" class="tl mb20" :offset="1">
          <span class="left">食品经营许可证号：</span><span class="c333">{{list.record_code}}</span>
        </el-col>
        <el-col v-if="list.companytag_code=='1001574645421581111111104'" :span="9" class="tl mb20" :offset="1">
          <span class="left">备案证号：</span><span class="c333">{{list.record_code}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">备案日期：</span><span class="c333">{{list.issue_time}}</span>
        </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">有效期至：</span><span class="c333">{{list.unuseful_time}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">经营场所：</span><span class="c333">{{list.province}}&nbsp;&nbsp;{{list.city}}&nbsp;&nbsp;{{list.area}}&nbsp;&nbsp;{{list.town}}&nbsp;&nbsp;{{list.vill}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">详细地址：</span><span class="c333">{{list.address}}</span>
        </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111103'" :span="22" class="tl mb20" :offset="1">
          <span class="left">经营范围：</span><span class="c333">{{list.business_range}}</span>
         </el-col>
         <el-col v-if="list.companytag_code=='1001574645421581111111104'" :span="22" class="tl mb20" :offset="1">
          <span class="left">主营项目：</span><span class="c333">{{list.main_subject}}</span>
        </el-col>
        <el-col v-if="list.companytag_code=='1001574645421581111111104'" :span="22" class="tl mb20" :offset="1">
          <span class="left">兼营项目：</span><span class="c333">{{list.sub_subject}}</span>
        </el-col>
         
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">面积：</span><span class="c333">{{list.place_area}}</span>（㎡）
        </el-col>
          <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">从业人数：</span><span class="c333">{{list.employ_num}}</span>
        </el-col>
     </el-row>
       <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">人员信息</el-col>
         <div class="box list">
      <el-table :data="list.companyEmployReturnList" style="width: 100%" class="no-header">
        <el-table-column label="姓名" prop="employ_name" ></el-table-column>
        <el-table-column label="健康证明">
           <template slot-scope="scope"> 
           <el-image :src="user.qyurl+scope.row.employ_health_url" fit="fill"  :preview-src-list="[user.qyurl+scope.row.employ_health_url]"  style="width: 40px;height: 40px"></el-image>
             </template>
        </el-table-column>
        <el-table-column label="健康证有效期" prop="user_health_datedue"></el-table-column>
      </el-table>
    </div> 
     </el-row>
      <el-row class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">责任落实</el-col>
          <el-col :span="9" class="tl" :offset="1">
           <el-col :span="24" class="tl mb20" >
             <span class="left" style="width: 34%;">市场监管局：</span><span class="c333">{{list.department_name}}</span>
           </el-col>
         </el-col>
           <el-col :span="9" class="tl" :offset="1">
           <el-col :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">所属村：</span><span class="c333">{{list.region_name}}</span>
           </el-col>
         </el-col>
         <el-col :span="9" class="tl" :offset="1">
           <el-col v-for="(item,index) in list.user_name_manage_list" :key="index" :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">监管人员{{index+1}}：</span><span class="c333">{{item}}</span>
           </el-col>
         </el-col>
          <el-col :span="9" class="tl" :offset="1">
           <el-col v-for="(item,index) in list.user_moblephone_manage_list" :key="index" :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">联系方式：</span><span class="c333">{{item}}</span>
           </el-col>
         </el-col>
          <el-col :span="9" class="tl" :offset="1">
           <el-col v-for="(item,index) in list.user_name_info_list" :key="index" :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">网格信息员{{index+1}}：</span><span class="c333">{{item}}</span>
           </el-col>
         </el-col>
          <el-col :span="9" class="tl" :offset="1">
           <el-col v-for="(item,index) in list.user_moblephone_info_list" :key="index" :span="24" class="tl mb20" >
            <span class="left" style="width: 34%;">联系方式：</span><span class="c333">{{item}}</span>
           </el-col>
         </el-col>
  
     </el-row>
      <el-row class="box mt20  f14">
      <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">附件上传</el-col>
      <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list.accessoryReturnList" :key="index">
    <el-image  v-if="fit.url"
      :src="user.qyurl+fit.url"
      :preview-src-list="[user.qyurl+fit.url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
      <p class="demonstration tc p15">{{ fit.name }}</p>
  </div>
      </el-col>
     </el-row>
      <el-row v-if="id1==2&&id2==1" class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">驳回原因</el-col>
         <div class="box list">
         <el-input
       type="textarea"
       :autosize="{ minRows:4, maxRows: 8}"
       placeholder="如果审核不通过，请填写驳回驳回原因"
       v-model="textarea">
       </el-input>
      </div> 
      <el-row class="tl mt20">
  
  <el-button type="primary" @click="examine(3)">审核通过</el-button>
   <el-button @click="examine(2)">驳回</el-button>
</el-row>
     </el-row>
     <el-row v-else-if="id1==4" class="box mt20  f14 c666">
         <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">驳回原因</el-col>
         <div class="box list">
         <el-col :span="24" class="tl mb20" :offset="1">
         驳回原因：<span class="c333">{{list.unpass_cause}}</span>
        </el-col>
      </div> 
     </el-row>
    </el-tab-pane>
    <el-tab-pane v-if="len>0"  label="日志" name="2">
        <el-row v-for="(item,index) in list.loglist" :key="index" class="box mt20 f14">
          <el-col :span="24" class="recorddetail-title bgcfbe tl mb20 pl15">日志信息</el-col>
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">操作类型：</span><span class="c333">{{item.log_type}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">操作结果：</span><span class="c333">{{item.log_result}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">操作人员：</span><span class="c333">{{item.log_user_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">操作时间：</span><span class="c333">{{item.add_time}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{item.log_remark}}</span>
        </el-col>
      </el-row>
    </el-tab-pane>
     <el-tab-pane    label="场所清洁消毒记录" name="3">
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.sterilize_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
   <el-col :span="6">小作坊：{{item.company_name}}</el-col>
  <el-col :span="5">场所：{{item.sterilize_addr}}</el-col>
  <el-col :span="4">日期：{{item.sterilize_time}}</el-col>
  <el-col :span="5">消毒（清洁）方式：{{item.sterilize_mode}}</el-col>
  <el-col :span="4" class="lh150">操作人员：{{item.operate_name}}</el-col>
</el-row>
    </template>
       <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">日期：</span><span class="c333">{{list2.sterilize_time}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">场所：</span><span class="c333">{{list2.sterilize_addr}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">清洁（消毒）方式：</span><span class="c333">{{list2.sterilize_mode}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">操作时间：</span><span class="c333">{{list2.operate_time}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">操作人员：</span><span class="c333">{{list2.operate_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">确认人员：</span><span class="c333">{{list2.confirm_name}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{list2.note}}</span>
        </el-col>
        <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list2.accessoryList" :key="index">
    <el-image  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>

   <div v-else>暂无数据</div>
 
    </el-tab-pane>
    <el-tab-pane  label="进货记录" name="4">
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.batching_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">小作坊：{{item.company_name}}</el-col>
  <el-col :span="5">原辅料名称：{{item.batching_name}}</el-col>
  <el-col :span="5">进货日期：{{item.purchase_time}}</el-col>
  <el-col :span="4">规格：{{item.batching_specs}}</el-col>
  <el-col :span="4" class="lh150">数量：{{item.batching_num}}</el-col>
</el-row>
    </template>
       <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">进货日期：</span><span class="c333">{{list2.purchase_time}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">原辅料名称：</span><span class="c333">{{list2.batching_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">规格：</span><span class="c333">{{list2.batching_specs}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">数量：</span><span class="c333">{{list2.batching_num}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">原辅料加工单位：</span><span class="c333">{{list2.produce_unit}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">加工许可证编号：</span><span class="c333">{{list2.produce_licence}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">加工日期（批号）：</span><span class="c333">{{list2.produce_batch}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">保质期：</span><span class="c333">{{list2.batching_bzj}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">供货商名称：</span><span class="c333">{{list2.supplier_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">供货商联系人：</span><span class="c333">{{list2.contact_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">供货商联系电话：</span><span class="c333">{{list2.contact_phone}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">验货人员：</span><span class="c333">{{list2.check_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">验货方式：</span><span class="c333">{{list2.check_mode}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">验货结论：</span><span class="c333">{{list2.check_result}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{list2.note}}</span>
        </el-col>
        <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list2.accessoryList" :key="index">
    <el-image  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane   label="投料记录" name="5">
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.info_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">小作坊：{{item.company_name}}</el-col>
  <el-col :span="4">配料员：{{item.info_name}}</el-col>
  <el-col :span="5">原辅料名称：{{item.mixture_name}}</el-col>
  <el-col :span="4">配料日期：{{item.info_time}}</el-col>
  <el-col :span="5" class="lh150">批次（加工日期）：{{item.mixture_batch}}</el-col>
</el-row>
    </template>
       <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">配料日期：</span><span class="c333">{{list2.info_time}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">配料员：</span><span class="c333">{{list2.info_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">原辅料名称：</span><span class="c333">{{list2.mixture_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">批次（加工日期）</span><span class="c333">{{list2.mixture_batch}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">用量：</span><span class="c333">{{list2.mixture_dose}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">原辅料名称：</span><span class="c333">{{list2.mixture_name1}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">批次（加工日期）</span><span class="c333">{{list2.mixture_batch1}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">用量：</span><span class="c333">{{list2.mixture_dose1}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">原辅料名称：</span><span class="c333">{{list2.mixture_name2}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">批次（加工日期）</span><span class="c333">{{list2.mixture_batch2}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">用量：</span><span class="c333">{{list2.mixture_dose2}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">合计重量：</span><span class="c333">{{list2.total_weight}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{list2.note}}</span>
        </el-col>
        <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list2.accessoryList" :key="index">
    <el-image  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane  label="食品添加剂使用记录" name="6">
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.use_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">小作坊：{{item.company_name}}</el-col>
  <el-col :span="5">产品名称：{{item.product_name}}</el-col>
  <el-col :span="5">添加剂使用日期：{{item.use_time}}</el-col>
  <el-col :span="4">食品添加剂名称：{{item.additive_name}}</el-col>
  <el-col :span="4" class="lh150">配料（投料）人员：{{item.personnel_sign}}</el-col>
</el-row>
    </template>
       <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">添加剂使用日期：</span><span class="c333">{{list2.use_time}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品名称：</span><span class="c333">{{list2.product_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品批量（kg或L）：</span><span class="c333">{{list2.product_batch}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">食品添加剂名称：</span><span class="c333">{{list2.additive_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">添加剂加工日期（批号）：</span><span class="c333">{{list2.additive_no}}</span>
        </el-col>
        <!-- <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">GB2760规定的该添加剂使用限量：</span><span class="c333">{{list2.regulations_dose}}</span>
        </el-col> -->
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">该批产品添加剂实际使用量（g或ml）：</span><span class="c333">{{list2.reality_dose}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">配料（投料）人员：</span><span class="c333">{{list2.personnel_sign}}</span>
        </el-col>
        <!-- <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">作用：</span><span class="c333">{{list2.effect}}</span>
        </el-col> -->
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">登记时间：</span><span class="c333">{{list2.register_time}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{list2.note}}</span>
        </el-col>
        <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list2.accessoryList" :key="index">
    <el-image  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane   label="产品检验记录" name="7">
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.check_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">小作坊：{{item.company_name}}</el-col>
  <el-col :span="5">产品名称：{{item.product_name}}</el-col>
  <el-col :span="4">规格：{{item.product_specs}}</el-col>
  <el-col :span="5">检验项目：{{item.check_project}}</el-col>
  <el-col :span="4" class="lh150">检验结果：{{item.check_relust}}</el-col>
</el-row>
    </template>
       <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品名称：</span><span class="c333">{{list2.product_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">规格：</span><span class="c333">{{list2.product_specs}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">批次（加工日期）：</span><span class="c333">{{list2.product_batch}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">承验单位：</span><span class="c333">{{list2.check_company_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">检验项目：</span><span class="c333">{{list2.check_project}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">检验结果：</span><span class="c333">{{list2.check_relust}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">报告日期：</span><span class="c333">{{list2.report_time}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">检验报告单编号：</span><span class="c333">{{list2.report_no}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">质检报告：</span><span class="c333">{{list2.quality_report}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{list2.note}}</span>
        </el-col>
        <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list2.accessoryList" :key="index">
    <el-image  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane   label="成品入库记录" name="8">
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.storage_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">小作坊：{{item.company_name}}</el-col>
  <el-col :span="5">产品名称：{{item.product_name}}</el-col>
  <el-col :span="4">规格：{{item.product_specs}}</el-col>
  <el-col :span="5">入库日期：{{item.storage_in_time}}</el-col>
  <el-col :span="4" class="lh150">入库数量：{{item.storage_in_num}}</el-col>
</el-row>
    </template>
       <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品名称：</span><span class="c333">{{list2.product_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">规格：</span><span class="c333">{{list2.product_specs}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">入库批次（加工日期）：</span><span class="c333">{{list2.storage_in_batch}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">入库日期：</span><span class="c333">{{list2.storage_in_time}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">入库数量：</span><span class="c333">{{list2.storage_in_num}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">出库批次（加工日期）：</span><span class="c333">{{list2.storage_out_batch}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">出库日期：</span><span class="c333">{{list2.storage_out_time}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">出库数量：</span><span class="c333">{{list2.storage_out_num}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">结存量：</span><span class="c333">{{list2.balance_num}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{list2.note}}</span>
        </el-col>
        <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list2.accessoryList" :key="index">
    <el-image  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane  label="产品销售记录" name="9">
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.sale_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">小作坊：{{item.company_name}}</el-col>
  <el-col :span="5">产品名称：{{item.product_name}}</el-col>
  <el-col :span="5">销售日期：{{item.sale_time}}</el-col>
  <el-col :span="4">规格：{{item.product_spces}}</el-col>
  <el-col :span="4" class="lh150">出厂数量：{{item.sale_num}}</el-col>
</el-row>
    </template>
       <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">销售日期：</span><span class="c333">{{list2.sale_time}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品名称：</span><span class="c333">{{list2.product_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">规格：</span><span class="c333">{{list2.product_spces}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">出厂数量：</span><span class="c333">{{list2.sale_num}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">出厂检验报告编号：</span><span class="c333">{{list2.check_no}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">加工日期（批号）：</span><span class="c333">{{list2.product_batch}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">销往地区：</span><span class="c333">{{list2.buy_area}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品接收单位：</span><span class="c333">{{list2.buy_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">接收单位联系人：</span><span class="c333">{{list2.link_name}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">接收单位联系电话：</span><span class="c333">{{list2.link_phone}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">发货人：</span><span class="c333">{{list2.sender}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{list2.note}}</span>
        </el-col>
        <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list2.accessoryList" :key="index">
    <el-image  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane  label="不合格产品记录" name="10">
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.unproduct_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">小作坊：{{item.company_name}}</el-col>
  <el-col :span="5">产品名称：{{item.product_name}}</el-col>
  <el-col :span="5">处理日期：{{item.handle_time}}</el-col>
  <el-col :span="4">规格：{{item.product_specs}}</el-col>
  <el-col :span="4" class="lh150">数量：{{item.product_num}}</el-col>
</el-row>
    </template>
       <el-row class="box mt20 f14">
           <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">处理日期：</span><span class="c333">{{list2.handle_time}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">产品名称：</span><span class="c333">{{list2.product_name}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">规格：</span><span class="c333">{{list2.product_specs}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">数量：</span><span class="c333">{{list2.product_num}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">加工日期（批号）：</span><span class="c333">{{list2.production_batch}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">不合格来源：</span><span class="c333">{{list2.unqualified_source}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">不合格项目：</span><span class="c333">{{list2.unqualified_project}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">处理方式：</span><span class="c333">{{list2.handle_mode}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">处理地点：</span><span class="c333">{{list2.handle_addr}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">处理结果：</span><span class="c333">{{list2.handle_result}}</span>
        </el-col>
        <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">处理人：</span><span class="c333">{{list2.handle_name}}</span>
        </el-col>
         <el-col :span="22" class="tl mb20" :offset="1">
          <span class="left">备注：</span><span class="c333">{{list2.note}}</span>
        </el-col>
        <el-col :span="24" class="tl">
         <div class="block fl" v-for="(fit,index) in list2.accessoryList" :key="index">
    <el-image  v-if="fit.accessory_url"
      :src="user.qyurl+fit.accessory_url"
      :preview-src-list="[user.qyurl+fit.accessory_url]"
      :fit="fit.name"></el-image>
       <el-image v-else
      :src="require('../../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <div v-if="activeName>2" class="i-page fr disib mt20">
        <el-pagination
          background
          :page-size='10'
          layout="total,prev, pager, next"
          :total="total"
          :current-page="currentPage"
         @current-change = 'currentChange'>
        </el-pagination>
      </div>
  </el-tabs>
      <el-dialog v-if="list.isblacklist==1" width="35%" title="加入黑名单" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item >
      <el-input class="w" type="textarea" :rows="5" placeholder="请输入加入黑名单原因"  v-model="form.isblacklist_remark"> </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button  size="small" @click="dialogFormVisible = false">取 消</el-button>
    <el-button  size="small" type="primary" @click="handleConfirm()">确 定</el-button>
  </div>
</el-dialog>
<el-dialog v-if="list.isblacklist==2" width="35%" title="加入白名单" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item >
      <el-input class="w" type="textarea" :rows="5" placeholder="请输入加入白名单原因"  v-model="form.isblacklist_remark"> </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button  size="small" @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary"  size="small" @click="handleConfirm()">确 定</el-button>
  </div>
</el-dialog>
      </el-main>
  </el-container>
</template>
<script>
import axios from '../../../../util/api'
import { local } from '../../../../util/util'
import Globle from '@/components/Globle'
export default {
  data () {
    return {
       len:0,
       menu_btns:Globle.menu_btns,
      page: {
       company_code:'',
      },  
       page1: {
       pager_offset:'0',
       pager_openset:'10',
       company_name:'',
       company_code:'',
      },     
      timer: '',
      loading:false,
       form:{
        company_code:'',
        isblacklist:'',
      isblacklist_remark:'',
      },
       currentPage: 1,
      total: 0,
      activeName: '1',
      activeName1:'0',
       list: [],
       list1:[],
        list2:[],
       companytag_code:'',
       id1:'',
       id2:'',
       textarea: '',
       user:'',
       dialogFormVisible: false,
        urlName:'sterilize',
    }
  },
   created () {
        this.user = local.get('user');
     this.page.company_code=this.$route.query.id;
     this.page1.company_code=this.$route.query.id;
      this.form.company_code=this.$route.query.id;
     this.id1=this.$route.query.id1;
      this.id2=this.$route.query.id2;
     if(this.activeName>2){
        this.init1(this.page1)
      }else{this.init(this.page)}
  },
  methods: {
      init (params) {
      axios.get('/api/company/detail', params).then((v) => {
       this.list=v;
        this.len=v.loglist.length
       this.companytag_code=v.companytag_code
      }).catch(() => {})
    }, init1(params){
       axios.get('/api/standingbook/'+this.urlName+'/list',params).then((v) => {
          this.list1=v.pager_list;
          this.total=v.pager_count
        }).catch(() => {})
    },
     handleClick() {
       if(this.activeName>2){
         this.currentPage = 1
      this.page1.pager_offset = '0'
          if(this.activeName==3){this.urlName='sterilize';
       }else if(this.activeName==4){this.urlName='batchingin';
       }else if(this.activeName==5){this.urlName='mixtureinfo';
       }else if(this.activeName==6){this.urlName='additiveuse';
       }else if(this.activeName==7){this.urlName='productcheck';
       }else if(this.activeName==8){this.urlName='storage';
       }else if(this.activeName==9){this.urlName='sale';
       }else if(this.activeName==10){this.urlName='unqualifiedproduct';
       }
       this.init1(this.page1)
       }else{
           this.init(this.page)
       }
        
       
     },
     // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page1.pager_offset = String((page - 1) * 10)
      that.init1(that.page1)
    },
    open(){
     if(this.activeName1){
        if(this.activeName==3){
         axios.get('api/standingbook/sterilize/single', {sterilize_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==4){
        axios.get('api/standingbook/batchingin/single', {batching_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==5){
        axios.get('api/standingbook/mixtureinfo/single', {info_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==6){
        axios.get('api/standingbook/additiveuse/single', {use_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==7){
        axios.get('api/standingbook/productcheck/single', {check_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==8){
        axios.get('api/standingbook/storage/single', {storage_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==9){
        axios.get('api/standingbook/sale/single', {sale_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==10){
        axios.get('api/standingbook/unqualifiedproduct/single', {unproduct_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }
     }
     
  },
     userTypeList (row) {
      return row.employ_ishealth==1?'有':'无'
    },
      godetail(index,index1){
    this.$router.push({
        name: "Ingredient",
        query: {
          id:index,
          code: index1
        }
      });
  },
  SourceAdd(){
     this.$router.push({
        name: "SourceAdd",
        query: {
          id:this.page.company_code,
        }
      });
  },
    addBlackList(index){
    this.dialogFormVisible = true;
    this.form.isblacklist=index;
  },
      handleConfirm() {
         axios.post('/api/company/blacklist', this.form).then((v) => {
         this.dialogFormVisible = false;
         this.$router.back()
      }).catch(() => {})
     
    },
  gomonitordetail(){
      this.$router.push({
        name: "MonitorDetail",
        query: {
          id:this.$route.query.company_code
        }
      });
  },
  examine(index){
    let params1={
      examine:index,
      unpass_cause:this.textarea,
      company_code:this.page.company_code
    }
      axios.post('/api/company/examine', params1).then((v) => {
       this.$router.back()
      }).catch(() => {})
  },
   recordChange(index,index1){
    this.$router.push({
        name: "RecordChange",
        query: {
          id: index,
          id1:index1
        }
      });
  },
  off(index){
     this.$confirm('确定注销?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
           axios.post('/api/company/examine', {company_code:index,examine:1}).then((v) => {
               this.init(this.page)
         this.tableData.forEach(item=>{
           if(item.company_code==index){
             item.state=3
           }
         })
       }).catch(() => {})
        }).catch(() => {});
  },
  //导出
  downDetailExcel() { 
    this.loading=true;
    this.timer=setInterval(() => { this.check("export_company_detail");}, 2000);
    let d_name =this.list.company_name + '';
    d_name+='备案信息';
    axios.fileget('/api/report/export_company_detail', {down_name:d_name ,company_code:this.page.company_code}).then((v) => {})
  },
  check(){
    axios.get('/api/report/check',  {down_name:'export_company_detail'}).then((v) => {
      if(v==true){
        clearInterval(this.timer);
        this.loading=false;
      }
    })
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
  .title{
    div{min-height: 20px}
    img{width: 18px;margin-left: 5px;vertical-align: text-bottom}
    .type_img{    
  position: absolute;
    right: 10%;
    width: 80px;
    z-index: 100;
    top: 2%;}
  }
  .el-image{width: 160px; height: 160px;margin-right: 10px}
  .back_btn{background:rgba(247,248,249,1);border:1px solid rgba(217,222,225,1);}
  .recorddetail-title{height: 34px;line-height: 34px;border-left: 2px solid #788287}
/deep/ .el-collapse{border:1px solid rgba(235, 239, 241, 1);
  .el-collapse-item__header{background:rgba(247,248,249,1);
  .flex{display: flex;align-items: center};
  .el-col-9{line-height: 1.5};
}
.el-collapse-item__content{padding-bottom: 0px;
.el-table{margin-bottom: 0px !important;}

} }
 /deep/ .el-dialog__body .el-form-item__content{margin-left: 0px !important;}
  /deep/ .el-dialog__body {
    padding: 5px 20px 5px 20px;
  }
}

</style>

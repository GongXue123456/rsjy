<template>
  <el-container class="recorddetail container">
    <el-header class="box add bb">
        <h5 class="mb10"><span class="lines"></span>台账管理</h5>
    </el-header>
    <el-main class="p15 pt0 pr">
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane    label="场所清洁消毒记录" name="1">
        <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
         <el-col :span="4" class="mr10">
             <el-form-item size="small" >
              <el-input placeholder="企业名称" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit"> 
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker  type="date" placeholder="消毒日期" v-model="page.sterilize_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(1,page.sterilize_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
           </el-form>
    </el-row>
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.sterilize_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
   <el-col :span="6">企业：{{item.company_name}}</el-col>
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
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>

   <div v-else>暂无数据</div>
 
    </el-tab-pane>
    <el-tab-pane  label="进货记录" name="2">
        <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
         <el-col :span="4" class="mr10">
             <el-form-item size="small" >
              <el-input placeholder="企业名称" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit"> 
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker  type="date" placeholder="进货日期" v-model="page.purchase_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(2,page.purchase_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
           </el-form>
    </el-row>
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.batching_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">企业：{{item.company_name}}</el-col>
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
          <span class="left">原辅料生产单位：</span><span class="c333">{{list2.produce_unit}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">生产许可证编号：</span><span class="c333">{{list2.produce_licence}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">生产日期（批号）：</span><span class="c333">{{list2.produce_batch}}</span>
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
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane   label="投料记录" name="3">
        <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
         <el-col :span="4" class="mr10">
             <el-form-item size="small" >
              <el-input placeholder="企业名称" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit"> 
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker  type="date" placeholder="配料日期" v-model="page.info_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(3,page.info_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
           </el-form>
    </el-row>
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.info_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">企业：{{item.company_name}}</el-col>
  <el-col :span="4">配料员：{{item.info_name}}</el-col>
  <el-col :span="5">原辅料名称：{{item.mixture_name}}</el-col>
  <el-col :span="4">配料日期：{{item.info_time}}</el-col>
  <el-col :span="5" class="lh150">批次（生产日期）：{{item.mixture_batch}}</el-col>
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
          <span class="left">批次（生产日期）</span><span class="c333">{{list2.mixture_batch}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">用量：</span><span class="c333">{{list2.mixture_dose}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">原辅料名称：</span><span class="c333">{{list2.mixture_name1}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">批次（生产日期）</span><span class="c333">{{list2.mixture_batch1}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">用量：</span><span class="c333">{{list2.mixture_dose1}}</span>
        </el-col>
         <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">原辅料名称：</span><span class="c333">{{list2.mixture_name2}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">批次（生产日期）</span><span class="c333">{{list2.mixture_batch2}}</span>
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
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane  label="食品添加剂使用记录" name="4">
        <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
         <el-col :span="4" class="mr10">
             <el-form-item size="small" >
              <el-input placeholder="企业名称" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit"> 
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker  type="date" placeholder="使用日期" v-model="page.use_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(4,page.use_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
           </el-form>
    </el-row>
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.use_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">企业：{{item.company_name}}</el-col>
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
          <span class="left">添加剂生产日期（批号）：</span><span class="c333">{{list2.additive_no}}</span>
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
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane   label="产品检验记录" name="5">
        <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
         <el-col :span="4" class="mr10">
             <el-form-item size="small" >
              <el-input placeholder="企业名称" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit"> 
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker  type="date" placeholder="报告日期" v-model="page.report_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(5,page.report_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
           </el-form>
    </el-row>
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.check_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">企业：{{item.company_name}}</el-col>
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
          <span class="left">批次（生产日期）：</span><span class="c333">{{list2.product_batch}}</span>
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
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane   label="成品入库记录" name="6">
        <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
         <el-col :span="4" class="mr10">
             <el-form-item size="small" >
              <el-input placeholder="企业名称" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit"> 
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker  type="date" placeholder="入库时间" v-model="page.storage_in_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(6,page.storage_in_time)"></el-date-picker>
        </el-form-item>
        </el-col>
         <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker  type="date" placeholder="出库时间" v-model="page.storage_out_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(7,page.storage_out_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
           </el-form>
    </el-row>
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.storage_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">企业：{{item.company_name}}</el-col>
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
          <span class="left">入库批次（生产日期）：</span><span class="c333">{{list2.storage_in_batch}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">入库日期：</span><span class="c333">{{list2.storage_in_time}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">入库数量：</span><span class="c333">{{list2.storage_in_num}}</span>
        </el-col>
        <el-col :span="9" class="tl mb20" :offset="1">
          <span class="left">出库批次（生产日期）：</span><span class="c333">{{list2.storage_out_batch}}</span>
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
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane  label="产品销售记录" name="7">
        <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
         <el-col :span="4" class="mr10">
             <el-form-item size="small" >
              <el-input placeholder="企业名称" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit"> 
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker  type="date" placeholder="销售日期" v-model="page.sale_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(8,page.sale_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
           </el-form>
    </el-row>
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.sale_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">企业：{{item.company_name}}</el-col>
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
          <span class="left">生产日期（批号）：</span><span class="c333">{{list2.product_batch}}</span>
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
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
    <el-tab-pane  label="不合格产品记录" name="8">
        <el-row class="box search">
       <el-form :inline="true"  :model="page" class="demo-form-inline">
         <el-col :span="4" class="mr10">
             <el-form-item size="small" >
              <el-input placeholder="企业名称" v-model="page.company_name" clearable class="input-with-select" @clear="onSubmit"> 
            </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="mr10">
          <el-form-item size="small">
            <el-date-picker  type="date" placeholder="处理日期" v-model="page.handle_time"  :picker-options="pickerOptionsStart" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="change(9,page.handle_time)"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="4" class="tl">
           <el-form-item  size="small">
          <el-button  type="primary"  @click="onSubmit" class="general_bgc general_border cfff">查询</el-button>
        </el-form-item>
        </el-col>
           </el-form>
    </el-row>
        <el-collapse accordion v-model="activeName1" v-if="list1.length>0" @change="open">
  <el-collapse-item v-for="(item,index) in list1" :key="index" :name="item.unproduct_code">
    <template slot="title">
     <el-row class="w tl pl10 flex" >
         <el-col :span="6">企业：{{item.company_name}}</el-col>
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
          <span class="left">生产日期（批号）：</span><span class="c333">{{list2.production_batch}}</span>
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
      :src="require('../../../assets/image/moren.png')"
      ></el-image>
  </div>
      </el-col>
      </el-row>
  </el-collapse-item>
</el-collapse>
<div v-else>暂无数据</div>
    </el-tab-pane>
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
  </el-tabs>
      </el-main>
  </el-container>
</template>
<script>
import axios from '../../../util/api'
import Globle from '@/components/Globle'
import { local } from '../../../util/util'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      len:0,
      menu_btns:Globle.menu_btns,
      page: {
       pager_offset:'0',
       pager_openset:'10',
       use_time:'',
       sterilize_time:'',
       purchase_time:'',
       info_time:'',
       use_time:'',
       report_time:'',
       storage_in_time:'',
       storage_out_time:'',
       sale_time:'',
       handle_time:'',
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
       user:'',
       urlName:'sterilize',
       pickerOptionsStart: {
        disabledDate: time => {
          if (this.page.storage_out_time) {
            return time.getTime() > new Date(this.page.storage_out_time).getTime()
          }else{return time.getTime() > Date.now()}
        }
      },
    }
  },
   created () {
      this.user = local.get('user');
      var that=this;
      that.user = local.get('user');
      that.page = Object.assign({}, that.billBookPage);
     this.init(this.page)
  },
     computed: {
    ...mapState({
      billBookPage: (state) => state.billBook.billBookPage
    })
    
  },
  methods: {
      init (params) {
       axios.get('/api/standingbook/'+this.urlName+'/list',params).then((v) => {
          this.list1=v.pager_list;
          this.total=v.pager_count
        }).catch(() => {})
     
    },
      handleClick() {
        this.currentPage = 1
      this.page.pager_offset = '0'
          if(this.activeName==1){this.urlName='sterilize';
       }else if(this.activeName==2){this.urlName='batchingin';
       }else if(this.activeName==3){this.urlName='mixtureinfo';
       }else if(this.activeName==4){this.urlName='additiveuse';
       }else if(this.activeName==5){this.urlName='productcheck';
       }else if(this.activeName==6){this.urlName='storage';
       }else if(this.activeName==7){this.urlName='sale';
       }else if(this.activeName==8){this.urlName='unqualifiedproduct';
       }
     this.onSubmit()
       
     },
   // 搜索
     onSubmit () { 
      this.currentPage = 1
      this.page.pager_offset = '0'
            if(this.page.sterilize_time==null){this.page.sterilize_time='';}
            if(this.page.purchase_time==null){this.page.purchase_time='';}
            if(this.page.info_time==null){this.page.info_time='';}
            if(this.page.use_time==null){this.page.use_time='';}
            if(this.page.report_time==null){this.page.report_time='';}
            if(this.page.storage_in_time==null){this.page.storage_in_time='';}
            if(this.page.storage_out_time==null){this.page.storage_out_time='';}
            if(this.page.sale_time==null){this.page.sale_time='';}
            if(this.page.handle_time==null){this.page.handle_time='';}
          
         this.$store.dispatch('billBook/setNewPage', this.page)

      this.init(this.page)
    },
    // 分页
    currentChange(page){
        var that=this;
      that.currentPage = page;
      that.page.pager_offset = String((page - 1) * 10)
      that.$store.dispatch('billBook/setNewPage', that.page)
      that.init(that.page)
    },
     change(index,val){
        var that=this;
        if (val == null) val = '';
        if(index==1){that.page.sterilize_time=val}
        if(index==2){that.page.purchase_time=val}
        if(index==3){that.page.info_time=val}
        if(index==4){that.page.use_time=val}
        if(index==5){that.page.report_time=val}
        if(index==6){that.page.storage_in_time=val}
        if(index==7){that.page.storage_out_time=val}
        if(index==8){that.page.sale_time=val}
        if(index==9){that.page.handle_time=val}
        that.onSubmit()
     },
  open(){
     if(this.activeName1){
        if(this.activeName==1){
         axios.get('api/standingbook/sterilize/single', {sterilize_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==2){
        axios.get('api/standingbook/batchingin/single', {batching_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==3){
        axios.get('api/standingbook/mixtureinfo/single', {info_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==4){
        axios.get('api/standingbook/additiveuse/single', {use_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==5){
        axios.get('api/standingbook/productcheck/single', {check_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==6){
        axios.get('api/standingbook/storage/single', {storage_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==7){
        axios.get('api/standingbook/sale/single', {sale_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }else if(this.activeName==8){
        axios.get('api/standingbook/unqualifiedproduct/single', {unproduct_code:this.activeName1}).then(v => {
        this.list2=v.unqualifiedProduct
      })
       }
     }
     
  }
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
    top:25%;}
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

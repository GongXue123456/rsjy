<template>
  <div class="bigBox">
    <Nav title="审核" />
    <div class="information bgcfff">
     <van-form validate-first @submit="onSubmit"  @failed="onFailed">  
      <van-tabs  v-model="activeName">
       <van-tab title="基础信息" name="a">
         <div class="card p15 pr">
          <img class="pa" v-if="form.filing_state===2" src="../../assets/img/waitExamine.png" alt />
          <div class="cardInfo  f16">
            <p class="f15">证照类型</p>
            <!-- <div class="bgcfff change pa p10 f12" @click="$router.push({path: 'bodyType',query: {id: form.company_code}})">修改类型</div> -->
            <p class="pt15"><span v-if="form.companytype_code==='1001574645421581000000001'">食品生产</span><span v-else-if="form.companytype_code==='1001574645421581000000002'">食品流通</span><span v-else-if="form.companytype_code==='1001574645421581000000003'">食品餐饮</span></p>
            <p class="pt15"><span v-if="form.companytag_code==='1001574645421581111111101'">四川省小作坊备案证</span><span v-else-if="form.companytag_code==='1001574645421581111111102'">四川省小经营店备案证（流通）</span><span v-else-if="form.companytag_code==='1001574645421581111111103'">食品经营许可（餐饮）</span><span v-else-if="form.companytag_code==='1001574645421581111111104'">四川省小经营店备案证（餐饮）</span><span v-else-if="form.companytag_code==='1001574645421581111111105'">食品经营许可证（流通）</span></p>
            <p class="pt15">{{form.business_form}}</p>
          </div>
        </div>
        <div class="card p15 pr">
          <div class="cardInfo  f16">
            <p class="f15">责任落实</p>
            <van-field readonly clickable label="所属市场监管所" type="textarea" rows="1" autosize v-model="form.department_name" placeholder="请选择市场监管所" :rules="[{ required: true, message: '请选择市场监管所' }]" input-align="right" right-icon="arrow" @click="showRadio(1)"/>
            <van-field readonly clickable label="所属村" type="textarea" rows="1" autosize v-model="form.region_name" placeholder="请选择所属村" :rules="[{ required: true, message: '请选择所属村' }]" input-align="right" right-icon="arrow"  @click="showRadio(2)"/>
            <van-field readonly clickable label="监管人员" type="textarea" rows="1" autosize v-model="form.user_name_manage" placeholder="请选择监管人员" input-align="right" right-icon="arrow"   @click="showCheckbox(1)"/>
            <van-field readonly clickable label="网格信息员" type="textarea" rows="1" autosize v-model="form.user_name_info" placeholder="请选择网格信息员" input-align="right" right-icon="arrow"  @click="showCheckbox(2)"/>
          </div>
          <radioModel  v-if="showModel" @closeTip="show1(1)"  @closeTip1='show2(1,$event)' @event1="change(1,$event)" :content='department_list' :checked='form.department_code'/>
          <radioModel  v-if="show1Model" @closeTip="show1(2)"  @closeTip1='show2(2,$event)' @event1="change(2,$event)" :content='department_region_list' :checked='form.region_code'/>
          <checkboxModel v-if="show2Model" @closeTip="show1(3)"  @closeTip1='show2(3,arguments)' @event1="change(3,$event)" :content='department_user_list' :checked='form.user_code_manage'/>
          <checkboxModel v-if="show3Model" @closeTip="show1(4)"  @closeTip1='show2(4,arguments)' @event1="change(4,$event)" :content='info_region_list' :checked='form.user_code_info'/>
        </div>
        <div class="card1  p15 f16 pr">
          <van-field  v-model="form.company_name"  label="企业名称" placeholder="请输入企业名称" input-align="right" @input="form.company_name=form.company_name.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入企业名称' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入特殊符号' }]" />
          <van-field v-if="form.companytag_code=='1001574645421581111111101'||form.companytag_code=='1001574645421581111111102'||form.companytag_code=='1001574645421581111111103'" v-model="form.operator"  label="经营者姓名" placeholder="请输入经营者姓名" input-align="right" @input="form.operator=form.operator.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入经营者姓名' }]" />
          <van-field v-else v-model="form.operator"  label="法人姓名" placeholder="请输入法人姓名" input-align="right" @input="form.operator=form.operator.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入法人姓名' }]" />
          <van-field  v-model="form.idcard"  label="身份证号" placeholder="请输入身份证号" type="number" input-align="right" @input="form.idcard=form.idcard.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入身份证号'},{ min: 15, max: 18, message: '请如实填写15或者18位号码，以供核对'},{ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: '请输入正确的身份证号码'}]" />
          <van-field  v-model="form.mobilephone"  label="联系电话" placeholder="请输入联系电话" type="tel" input-align="right" @input="form.mobilephone=form.mobilephone.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入联系电话' },{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,message: '手机号格式不对'}]" />
          <van-field readonly clickable label="企业所在地" type="textarea" rows="1" autosize v-model="form.place_operate" placeholder="请选择企业所在地" input-align="right"  right-icon="arrow" @click="show_Picker" :rules="[{ required: true, message: '请选择企业所在地' }]"/>
          <van-field  v-model="form.address"  label="详细地址" type="textarea" rows="1" autosize placeholder="请输入详细地址" input-align="right" @input="form.address=form.address.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入详细地址' }]" />
        </div>
        <getAddress v-if="showPicker" @closeTip="show1(5)"  @closeTip1='showAddress'  :province='form.province'  :city='form.city' :area='form.area' :vill='form.vill' :town='form.town'/> 
       </van-tab>
       <van-tab title="经营信息" name="b">
         <div class="card1  p15 f16 pr">
           <p class="f18 mb15">请完善经营信息</p>
          <van-field v-if="form.companytag_code==='1001574645421581111111101'||form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'" v-model="form.record_code"  label="备案证号" placeholder="请输入备案证号" input-align="right" @input="form.record_code=form.record_code.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入备案证号' }]" />
          <van-field v-if="form.companytag_code==='1001574645421581111111103'||form.companytag_code==='1001574645421581111111105'" v-model="form.credit_code"  label="统一社会信用代码" placeholder="请输入统一社会信用代码" input-align="right" @input="form.credit_code=form.credit_code.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入统一社会信用代码' },{ max: 18, message: '请如实填写18位统一社会信用代码，以供核对'},{ pattern:/[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g,message: '请输入正确的统一社会信用代码'}]" />
          <van-field v-if="form.companytag_code==='1001574645421581111111103'||form.companytag_code==='1001574645421581111111105'" v-model="form.record_code"  label="食品经营许可证号" placeholder="请输入食品经营许可证号" input-align="right" @input="form.record_code=form.record_code.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入食品经营许可证号' }]" />
          <van-field v-if="form.companytag_code==='1001574645421581111111101'" readonly clickable label="生产形式" type="textarea" rows="1" autosize v-model="options1_1[1]" placeholder="请选择生产形式" :rules="[{ required: true, message: '请选择生产形式' }]" input-align="right" right-icon="arrow" @click="showCheckbox(3)" />
           <van-field v-if="form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'" readonly clickable label="主营项目" type="textarea" rows="1"  :rules="[{ required: true, message: '请选择主营项目' }]" autosize v-model="options1_1[1]" placeholder="请选择主营项目" input-align="right" right-icon="arrow" @click="showCheckbox(3)"/>
           <van-field v-if="form.companytag_code==='1001574645421581111111101'" readonly clickable label="生产类别" type="textarea" rows="1" autosize v-model="options2_1[1]" placeholder="请选择生产类别" :rules="[{ required: true, message: '请选择生产类别' }]" input-align="right" right-icon="arrow" @click="showCheckbox(4)"/>
           <van-field v-if="form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'" readonly clickable label="兼营项目" type="textarea" rows="1" autosize :rules="[{ required: true, message: '请选择兼营项目' }]" v-model="options2_1[1]" placeholder="请选择兼营项目" input-align="right" right-icon="arrow" @click="showCheckbox(4)"/>
           <van-field v-if="form.companytag_code==='1001574645421581111111105'||form.companytag_code==='1001574645421581111111103'" readonly clickable label="经营范围" type="textarea" rows="1" autosize :rules="[{ required: true, message: '请选择经营范围' }]" v-model="options1_1[1]" placeholder="请选择经营范围" input-align="right" right-icon="arrow" @click="showCheckbox(3)"/>
           <van-field readonly clickable label="发证日期"  v-model="form.issue_time" placeholder="请选择发证日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择发证日期' }]"  @click="showdate1Picker = true"/>
           <van-field readonly clickable label="有效期至"  v-model="form.unuseful_time" placeholder="请选择有效期至" input-align="right" right-icon="arrow"  :rules="[{ required: true, message: '请选择有效期至' }]" @click="showdate2Picker = true"/>
          <van-field  v-model="form.place_area"  label="营业面积(㎡)" type="number" placeholder="请输入营业面积" input-align="right" />
          <van-field  v-model="form.employ_num"  label="从业人数" type="number" placeholder="请输入从业人数" input-align="right"  />
          <checkboxModel v-if="show6Model" @closeTip="show1(6)"  @closeTip1='show2(6,arguments)' :val='1' :content='options1' :checked="options1_1[1]?options1_1[1]:''"/>
          <checkboxModel v-if="show7Model" @closeTip="show1(7)"  @closeTip1='show2(7,arguments)'  :val='1' :content='options2' :checked="options2_1[1]?options2_1[1]:''"/>
          <van-popup v-model="showdate1Picker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @cancel="onCancel"/>  
          </van-popup>
          <van-popup v-model="showdate2Picker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="maxDate" :max-date="maxDate1" @confirm="onConfirm" @cancel="onCancel"/>  
          </van-popup>
           
        </div>
        <div class="card1 p15 pr" style="margin-top:-30px">
          <div class="cardInfo power bgcfff p15 f16">
            <p class="f16">人员信息</p>
             <div class="bgf5 mt15" v-for="(item, index) in formList" :key="index">
              <van-field v-model="item.employ_name" name="姓名" label="姓名" placeholder="姓名" input-align="right" :rules="[{ required: true, message: '请填写姓名' }]" />
              <van-field readonly clickable label="健康证有效期"  v-model="item.user_health_datedue" placeholder="请选择健康证有效期" input-align="right" right-icon="arrow"  @click="showdatePicker(index)"/>
              <van-field name="uploader" label="健康证上传" input-align="right">
                <template #input> <van-uploader v-model="item.employ_health_url" camera multiple :max-count="1" :before-read='beforeRead(index)' :after-read="uploadPic"  :before-delete="handleDelete"
           /> </template>
              </van-field>
              <van-button type="danger"  class="ml15 mt5 mb15" size="small" @click="deleteRules(item, index)">删除</van-button>
             </div>
             <div class="tc mt15"><van-button color="#E8F8F0" icon="plus" @click="Add">添加人员</van-button></div>
             <van-popup v-model="showdate3Picker" round position="bottom">
             <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="maxDate" :max-date="maxDate1" @confirm="onConfirm" @cancel="onCancel"/>  
          </van-popup>
          </div>
          
        </div>
       </van-tab>
       <van-tab title="证照信息" name="c">
         <div class="card1 certificates p15 f16 pr">
           <p class="f18 mb15">请完善证照信息</p>
           <div>
             <van-uploader  name="uploader" camera :after-read="afterRead1"
          :before-delete="handleDelete1" class="w" v-model="fileList1" :max-count="1"/>
             <div v-if="form.business_form==='学校（含托幼机构）食堂'" class="mt5 mb20 p10 bgcfff f14 tc">法人证书</div>
              <div v-else-if="form.business_form==='机关企事业单位食堂'||form.business_form==='工地食堂'||form.business_form==='其他食堂'" class="mt5 mb20 p10 bgcfff f14 tc">法人证书</div>
               <div v-else class="mt5 mb20 p10 bgcfff f14 tc">营业执照</div>
           </div>
           <div>
             <van-uploader   name="uploader" camera :after-read="afterRead2"
          :before-delete="handleDelete2" class="w" v-model="fileList2" :max-count="1"/>
             <div v-if="form.companytag_code==='1001574645421581111111105'||form.companytag_code==='1001574645421581111111103'" class="mt5 mb20 p10 bgcfff f14 tc">食品经营许可证</div>
             <div v-else-if="form.companytag_code==='1001574645421581111111101'||form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'" class="mt5 mb20 p10 bgcfff f14 tc">备案证</div>
           </div>
           <div>
             <van-uploader  name="uploader" camera :after-read="afterRead3"
          :before-delete="handleDelete3"  class="w" v-model="fileList3" :max-count="1"/>
             <div v-if="form.companytag_code==='1001574645421581111111105'||form.companytag_code==='1001574645421581111111103'" class="mt5 mb20 p10 bgcfff f14 tc">法人身份证</div>
             <div v-else-if="form.companytag_code==='1001574645421581111111101'||form.companytag_code==='1001574645421581111111102'||form.companytag_code==='1001574645421581111111104'" class="mt5 mb20 p10 bgcfff f14 tc">经营者身份证</div>
           </div>
           
        </div>
         
       </van-tab>
      </van-tabs>
      <div class="footer p15 bgcfff w"> 
        <van-row v-if="id1=='1'" gutter="20">
          <van-col span="24"><van-button v-show="loadButton"  block type="primary" native-type="submit"> 提交变更 </van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
         
        </van-row>
        <van-row v-else gutter="20">
          <van-col span="12"><van-button v-show="loadButton"  block type="primary" native-type="submit"> 通过 </van-button><van-button  v-show="!loadButton" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
          <van-col span="12"><div class="van-button--default" @click="examine">驳回</div>
            </van-col>
        </van-row>
       </div>
       <van-dialog class="dialog" v-model="show" title="驳回备案" :showConfirmButton="false">
         <van-field v-model="textarea" rows="4" autosize label="" type="textarea" placeholder="请输入驳回备案原因" />
         <van-row gutter="20"  class="pl15 pr15 pb15">
          <van-col span="12"><div class="van-button--default" @click="cancel">取消</div></van-col>
          <van-col span="12"><div class="van-button--default van-button--primary "  v-show="loadButton1" @click="confirm">确定</div><van-button  v-show="!loadButton1" block round loading type="primary" disabled  loading-text="提交中..." /></van-col>
         </van-row>
       </van-dialog>
     </van-form>
      <div>
        
      </div>
     
    </div>
  </div>
</template>
<script>
import {imageUrl} from '../../config/index'
import Nav from "../../components/Nav";
import radioModel from "../../components/radioModel";
import checkboxModel from "../../components/checkboxModel";
import getAddress from "../../components/getAddress";
import axios from '../../axios/index.js';
import {formatDate,uploadImg,aaa,dataURLtoFile} from '../../utils/index';
export default {
  components: {
    Nav,radioModel,checkboxModel,getAddress
  },
  data() {
    return {
      id1:'',
      imageUrl: imageUrl,
      maxnum:0,
      index:'',
      show:false,
      textarea:'',
      showModel: false,
      show1Model: false,
      show2Model:false,
      show3Model:false,
      show4Model:false,
      show6Model:false,
      show7Model:false,
      showdate1Picker:false,
      showdate2Picker:false,
      showdate3Picker:false,
      activeName: 'a',
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      maxDate1:new Date(2030,0,1),
      currentDate: new Date(),
      department_list:[],
      department_region_list:[],
      department_user_list:[],
      info_region_list:[],
      options1:[],
      options1_1:'',
      options2:[],
      options2_1:'',
      fileList: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      imgUrlListValue:'',
      pages:{
        pager_openset: '500',
        department_name:'',
        user_code: '1011585013952568481458536',
        owner_type:'1',
        state:'1'
      },
      form:{
        company_code:'',
        companytype_code:'',
        companytag_code:'',
        business_form:'',
        record_time: formatDate(new Date(), 'yyyy-MM-dd'),
        company_name:'',
        operator:'',
        idcard:'',
        filing_state:'3',
        mobilephone:'',
        record_code:'',
        credit_code:'',
        department_code:'',
        department_name:'',
        region_name:'',
        region_code:'',
        user_code_manage:'',
        user_code_manage_list:[],
        user_name_manage:'',
        user_code_info:'',
        user_name_info:'',
        user_code_info_list:[],
        place_operate:'',
        address:'',
        produce_form_list:[],//生产形式
        producetype_codes_list:[],//生产类别
        main_subject_list:[],//主营项目
        sub_subject_list:[],//兼营项目
        business_range_list:[],//经营范围
        issue_time:'',
        unuseful_time:'',
        place_area:'',
        employ_num:'',
        accessoryList:[{name:'',url:''},{name:'',url:''},{name:'',url:''}],
        companyEmployList: [],
        province:'',
        city:'',
        area:'',
        vill:'',
        town:'',
      },
      formList:[],
      showPicker: false,
      loadButton:true,
      loadButton1:true
    };
  },
   created() {
     this.form.company_code=this.$route.query.id;
     this.id1=this.$route.query.id1
     this.init(this.pages)
     this.getDate()
  },
  methods: {
     onFailed(errorInfo) {
      this.$toast(errorInfo.errors[0].message);
    },
    getDate(){
      if(this.form.company_code){
        axios.get('app/company/drafts', {company_code:this.form.company_code}).then(v => {
        this.form=v.data;
        this.form.accessoryList=v.data.accessoryReturnList;
        this.form.province=v.data.province!=null?v.data.province:'';
        this.form.city=v.data.city!=null?v.data.city:'';
        this.form.area=v.data.area!=null?v.data.area:'';
        this.form.town=v.data.town!=null?v.data.town:'';
        this.form.vill=v.data.vill!=null?v.data.vill:'';
        this.form.place_operate=this.form.province+this.form.city+this.form.area+this.form.town+this.form.vill;
         this.fileList1=v.data.accessoryReturnList[0].url!=''?[{url:this.imageUrl+v.data.accessoryReturnList[0].url}]:[]
          this.fileList2=v.data.accessoryReturnList[1].url!=''?[{url:this.imageUrl+v.data.accessoryReturnList[1].url}]:[]
            this.fileList3=v.data.accessoryReturnList[2].url!=''?[{url:this.imageUrl+v.data.accessoryReturnList[2].url}]:[]
             if(this.form.companytag_code==='1001574645421581111111101'){
              this.options1_1=['',v.data.produce_form]
            this.options2_1=['',v.data.producetype_codes]
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
             this.options1_1=['',v.data.main_subject]
            
            this.options2_1=['',v.data.sub_subject]
            }else if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){
              this.options1_1=['',v.data.business_range]
            }
         v.data.companyEmployReturnList.forEach(item=>{
          this.formList.push({
             user_health_datedue:item.user_health_datedue,
             employ_health_url:[{url:this.imageUrl+item.employ_health_url}],
             employ_name:item.employ_name
             }); 
       })
       if(this.form.department_code!=''){
           this.init1(this.form.department_code,'')
          this.init2(this.form.department_code,'')
       }
         if(this.form.region_code!=''){
          this.init3(this.form.region_code,'')
       }
         axios.get('app/dictionary/list', {companytag_code:this.form.companytag_code}).then(v => {
           if(this.form.companytag_code==='1001574645421581111111101'){
              this.options1=v.data.经营信息.生产形式;
              this.options2=v.data.经营信息.生产类别;
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
             this.options1=v.data.经营信息.主营项目;
            this.options2=v.data.经营信息.兼营项目;}
            else if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){
              this.options1=v.data.经营信息.经营范围;
            }
      })
      })
      }
     
       
    },
    init(params) {
      axios.get('app/department/list', params).then(v => {
        this.department_list=v.data.department_list
      })
      axios.get('app/dictionary/list', {companytag_code:this.form.companytag_code}).then(v => {
           if(this.form.companytag_code==='1001574645421581111111101'){
              this.options1=v.data.经营信息.生产形式;
              this.options2=v.data.经营信息.生产类别;
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
             this.options1=v.data.经营信息.主营项目;
            this.options2=v.data.经营信息.兼营项目;}
            else if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){
              this.options1=v.data.经营信息.经营范围;
            }
      })
    },
    init1(val,val1) {
       axios.get('app/departmentRegion/list', {department_code:val,pager_openset:'500',param_type:'2',region_name:val1,}).then(v => {
        this.department_region_list=v.data.department_region_list
      })
    },
    init2(val,val1){
        axios.get('app/departmentUser/list', {department_code:val,pager_openset:'500',state:'1',user_name:val1,}).then(v => {

        this.department_user_list=v.data.department_user_list
      })
    },
    init3(val,val1){
        axios.get('app/infoRegion/user', {region_code:val,pager_openset:'500',state:'1',user_name:val1,}).then(v => {
        this.info_region_list=v.data.info_region_list
      })
    },
     onSubmit() {
       this.loadButton=false;
       this.form.companyEmployList=[];
       this.form.filing_state='3';
          this.formList.forEach(item=>{
          this.form.companyEmployList.push({
             employ_name:item.employ_name,
             user_health_datedue:item.user_health_datedue,
             employ_health_url:item.employ_health_url[0].url.substring(item.employ_health_url[0].url.indexOf("resources"))
             });
       })
        if(this.form.accessoryList[2].url==''){this.$toast('请上传身份证件照片');this.loadButton=true;return false}
       axios.post('app/company/update', this.form).then(() => {
         this.loadButton=true;
        this.$router.back()
      })
    },
    examine(){
      this.show=true;
    },
    confirm(){
       this.loadButton1=false;
        if(this.textarea===undefined||this.textarea.length<1){
          this.$toast('请填写驳回原因');
          this.loadButton1=true;
          return false;
        }
        let params1={
          examine:'2',
          unpass_cause:this.textarea,
          company_code:this.form.company_code
        }
       axios.post('/app/company/examine', params1).then(() => {
        this.loadButton1=true;
       this.$router.back()
      }).catch(() => {})
    },
    cancel(){
      this.show=false;
      this.textarea='';
    },
    showRadio(val){
      if(val==1){this.showModel=!this.showModel}else if(val==2){if(this.form.department_name===''||this.form.department_name===null){ this.$toast('请选择所属市场监管所');}else{this.show1Model=!this.show1Model}}
    },
    showCheckbox(val){
      if(val==1){if(this.form.department_name===''||this.form.department_name===null){ this.$toast('请选择所属市场监管所');}else{this.show2Model=!this.show2Model}}else if(val==2){if(this.form.region_name===''||this.form.region_name===null){ this.$toast('请选择所属村')}else{this.show3Model=!this.show3Model}}else if(val==3){this.show6Model=!this.show6Model}else if(val==4){this.show7Model=!this.show7Model}
    },
    show_Picker(){this.showPicker=!this.showPicker;},
    show1(val){
      if(val==1){this.showModel=false;}else if(val==2){this.show1Model=false;}else if(val==3){this.show2Model=false;}else if(val==4){this.show3Model=false;}else if(val==5){this.showPicker=false;}else if(val==6){this.show6Model=false;}else if(val==7){this.show7Model=false;}  
    },
    show2(index,val){
       if(index==1){
         this.form.department_name=val.department_name;
         this.form.department_code=val.department_code;
          this.form.region_name='';
          this.form.region_code='';
          this.form.user_name_manage='';
          this.form.user_code_manage='';
          this.form.user_name_info='';
          this.form.user_code_info='';
         this.init1(val.department_code,'')
         this.init2(val.department_code,'')
       }else if(index==2){
          this.form.region_name=val.region_name;
          this.form.region_code=val.region_code;
           this.form.user_name_info='';
          this.form.user_code_info='';
          this.init3(val.region_code,'')
       }else if(index==3){
         if (val[1].substr(0,1)==','){val[1]=val[1].substr(1);}
         this.form.user_name_manage=val[0];
          this.form.user_code_manage=val[1];
         
          this.form.user_code_manage_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
       }else if(index==4){
         if (val[1].substr(0,1)==','){val[1]=val[1].substr(1);}
         this.form.user_name_info=val[0];
          this.form.user_code_info=val[1];
          this.form.user_code_info_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
       }else if(index==6){
         if (val[1].substr(0,1)==','){val[1]=val[1].substr(1);}
         this.options1_1=val;
         if(this.form.companytag_code==='1001574645421581111111101'){
             this.form.produce_form_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
              this.form.main_subject_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
           }else if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){
             this.form.business_range_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
          }
       }else if(index==7){
         if (val[1].substr(0,1)==','){val[1]=val[1].substr(1);}
         this.options2_1=val;
         if(this.form.companytag_code==='1001574645421581111111101'){
             this.form.producetype_codes_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
           }else if(this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){ 
             this.form.sub_subject_list=aaa(val[1].indexOf(",") != -1?val[1].split(','):val[1].split(' '))
           }
       }
       
    },
    showAddress(val1,val2,val3,val4,val5){
      this.form.province=val1;
      this.form.city=val2;
      this.form.area=val3;
      this.form.vill=val4;
      this.form.town=val5;
      this.form.place_operate=val1+val2+val3+val4+val5;
    },
    change(index,val) {
        if(index==1){
          this.pages.department_name = val;
             this.init(this.pages)
        }else if(index==2){
           this.init1(this.form.department_code,val)
       }else if(index==3){
           this.init2(this.form.department_code,val)
       }else if(index==4){
           this.init3(this.form.region_code,val)
       }
            
        },
    onConfirm(value){
      if(this.showdate1Picker===true){this.form.issue_time= formatDate(value, 'yyyy-MM-dd');this.showdate1Picker=false}
      else if(this.showdate2Picker===true){this.form.unuseful_time= formatDate(value, 'yyyy-MM-dd');this.showdate2Picker=false}
      else if(this.showdate3Picker===true){this.formList[this.index].user_health_datedue= formatDate(value, 'yyyy-MM-dd');this.showdate3Picker=false;}
      },
     onCancel(){
      if(this.showdate1Picker===true){this.showdate1Picker=false}
      else if(this.showdate2Picker===true){this.showdate2Picker=false}
      else if(this.showdate3Picker===true){this.showdate3Picker=false}
    },
        afterRead1 (file) {
    if(/\/(?:jpeg|png|jpg|bmp)/i.test(file.file.type)&&file.file.size>2*1024*1024) {
      let canvas =  document.createElement('canvas')  
      let context = canvas.getContext('2d') 
      let img = new Image()
      img.src = file.content
      let width = 512   
      img.onload = () => {
        let height = width / (img.naturalWidth / img.naturalHeight)
        canvas.width = width
        canvas.height = height
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        file.content = canvas.toDataURL(file.file.type, 1) 
        file.file = dataURLtoFile(file.content, file.file.name)
        this.uploadPic1(file)
      }                       
  }else{
    this.uploadPic1(file)
  }
},
afterRead2 (file) {
    if(/\/(?:jpeg|png|jpg|bmp)/i.test(file.file.type)&&file.file.size>2*1024*1024) {
      let canvas =  document.createElement('canvas')  
      let context = canvas.getContext('2d') 
      let img = new Image()
      img.src = file.content
      let width = 512   
      img.onload = () => {
        let height = width / (img.naturalWidth / img.naturalHeight)
        canvas.width = width
        canvas.height = height
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        file.content = canvas.toDataURL(file.file.type, 1) 
        file.file = dataURLtoFile(file.content, file.file.name)
        this.uploadPic2(file)
      }                       
  }else{
    this.uploadPic2(file)
  }
},
afterRead3 (file) {
    if(/\/(?:jpeg|png|jpg|bmp)/i.test(file.file.type)&&file.file.size>2*1024*1024) {
      let canvas =  document.createElement('canvas')  
      let context = canvas.getContext('2d') 
      let img = new Image()
      img.src = file.content
      let width = 512   
      img.onload = () => {
        let height = width / (img.naturalWidth / img.naturalHeight)
        canvas.width = width
        canvas.height = height
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        file.content = canvas.toDataURL(file.file.type, 1) 
        file.file = dataURLtoFile(file.content, file.file.name)
        this.uploadPic3(file)
      }                       
  }else{
    this.uploadPic3(file)
  }
},
    uploadPic1(file) {
      let param = new FormData();
      param.append("uploadFile", file.file);
      const loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0
      });
      uploadImg(param).then(response => {
        loading.clear();
          if(this.form.business_form==='学校（含托幼机构）食堂'){
             this.$set(this.form.accessoryList, 0,{name:'法人证书',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
          }else if(this.form.business_form==='机关企事业单位食堂'||this.form.business_form==='工地食堂'||this.form.business_form==='其他食堂'){
             this.$set(this.form.accessoryList, 0,{name:'批准设立文件或证件',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
          }else{
             this.$set(this.form.accessoryList, 0,{name:'营业执照',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
          }
        axios.get('app/baidu/orc/discern',{file_path:response.data.visit_url,discern_type:'2',id_card_side:'front'}).then(v => {
         if(JSON.stringify(v.data.discern_result)!='{}'){
         this.form.record_code=v.data.discern_result.record_code;
         this.form.credit_code=v.data.discern_result.credit_code;
         this.form.company_name=v.data.discern_result.company_name;
         this.form.unuseful_time=v.data.discern_result.unuseful_time;
         this.form.record_time=v.data.discern_result.record_time;
         this.form.operator=v.data.discern_result.operator;
         }
        
        })
      });
    },
    handleDelete1(file, detail) {
      if(this.form.business_form==='学校（含托幼机构）食堂'){
            this.$set(this.form.accessoryList, 0,{name:'法人证书',url:''});
          }else if(this.form.business_form==='机关企事业单位食堂'||this.form.business_form==='工地食堂'||this.form.business_form==='其他食堂'){
            this.$set(this.form.accessoryList, 0,{name:'批准设立文件或证件',url:''});
          }else{
            this.$set(this.form.accessoryList, 0,{name:'营业执照',url:''});
          }
      this.fileList1.splice(detail.index, 1);
    },
    uploadPic2(file) {
      let param = new FormData();
      param.append("uploadFile", file.file);
      const loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0
      });
      uploadImg(param).then(response => {
        loading.clear();
         if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){ 
              this.$set(this.form.accessoryList, 1,{name:'食品经营许可证',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
         }else if(this.form.companytag_code==='1001574645421581111111101'||this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){
              this.$set(this.form.accessoryList, 1,{name:'备案证',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
         }
     });
    },
    handleDelete2(file, detail) {
      if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){ 
            this.$set(this.form.accessoryList, 1,{name:'食品经营许可证',url:''});
         }else if(this.form.companytag_code==='1001574645421581111111101'||this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){
            this.$set(this.form.accessoryList, 1,{name:'备案证',url:''});
         }
      
      this.fileList2.splice(detail.index, 1);
    },
    uploadPic3(file) {
      let param = new FormData();
      param.append("uploadFile", file.file);
      const loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0
      });
      uploadImg(param).then(response => {
        loading.clear();
        if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){ 
            this.$set(this.form.accessoryList, 2,{name:'法人身份证',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
         }else if(this.form.companytag_code==='1001574645421581111111101'||this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){
            this.$set(this.form.accessoryList, 2,{name:'经营者身份证',url:response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))});
         }
          if(this.form.accessoryList[2].name.indexOf("身份证") != -1){
            axios.get('app/baidu/orc/discern',{file_path:response.data.visit_url,discern_type:'2',id_card_side:'front'}).then(v => {
         if(JSON.stringify(v.data.discern_result)!='{}'){
            this.form.idcard=v.data.discern_result.user_idcard;
         }
        
        })
          }
     });
    },
    handleDelete3(file, detail) {
      if(this.form.companytag_code==='1001574645421581111111105'||this.form.companytag_code==='1001574645421581111111103'){ 
           this.$set(this.form.accessoryList, 2,{name:'法人身份证',url:''});
         }else if(this.form.companytag_code==='1001574645421581111111101'||this.form.companytag_code==='1001574645421581111111102'||this.form.companytag_code==='1001574645421581111111104'){
            this.$set(this.form.accessoryList, 2,{name:'经营者身份证',url:''});
         }
      
      this.fileList3.splice(detail.index, 1);
    },
    beforeRead(index){
      this.index=index
    },
    uploadPic(file){
       let param = new FormData();
      param.append("uploadFile", file.file);
      const loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0
      });
      uploadImg(param).then(response => {
        loading.clear();
        this.formList[this.index].employ_health_url[0].url=response.data.visit_url.substring(response.data.visit_url.indexOf("resources"))      
      });
    },
     handleDelete(){
        this.formList[this.index].accessory_url=''
    },
    Add() {
       this.maxnum++
      this.formList.push({
            employ_name:'',
           user_health_datedue:'',
            employ_health_url:[],
      })
    },
    deleteRules(item, index) {
      this.maxnum--
      this.index = this.formList.indexOf(item)
      if (index !== -1) {
        this.formList.splice(index, 1)
      }
    },
    showdatePicker(index){
      this.showdate3Picker=true;
      this.index=index
      
    }
  }
};
</script>
<style lang="less" scoped>
.information {
  width: 100%;
  height: 100%;
  padding-top: 54px;
  box-sizing: border-box;
  /deep/ .van-tabs{
    margin-bottom: 50px;
    .van-tab{font-size: 17px;}
    .van-tab--active{color: #1DB667;font-weight:bold;}
    .van-tabs__line{display: none;}
    .van-cell{font-size:16px;
    .van-cell__value{color: #426EB8;}}
    .van-tabs__wrap{position: fixed;width: 100%;z-index: 999;height: 70px;}
    .van-tabs__content{padding-top: 70px;}
    .van-field__label{width: 3.5rem;}
    .van-field__error-message{text-align: right;display: none;}
    .certificates{.van-uploader__upload-icon{font-size: 100px;} .van-uploader__upload,.van-uploader__preview,.van-uploader__preview-image{width: 100%;  background-color: #fff; height:4.7rem;margin: 0;}}
   
  }

  .card {background: #f5f5f5;margin: 15px;border-radius: 5px;
    .van-cell{background-color: transparent;padding:10px 0px}
    img {top: 20px;right: 20px;width: 75px;height:75px;}
    .cardInfo { border-radius:5px;p:nth-child(1) {  color: #9a9a9a; }
    .change{right: 10px;top: 10px;border-radius: 4px;}}
  }
  .power{
    border-radius:8px;
    .van-cell{background-color: #f5f5f5;margin-bottom: 0 !important;}
  }
  .card1 {
    background: #f5f5f5;
    .van-cell{margin-bottom: 15px;}
    .van-button--default{.van-button__content{color: #1DB667;}}
    
  }
.footer{position: fixed;bottom: 0px;left: 0px;span{
    font-size: 18px;
    }}
.van-button--default{color: #fff;
    background-color: #C7C7C7;
    border: 0.026667rem solid #C7C7C7;
        display: block;
    width: 100%;
            padding: 0 8px;
    font-size: 14px;
        box-sizing: border-box;
    height: 44px;
    margin: 0;
    padding: 0;
    line-height: 44px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
    -webkit-appearance: none;
}
.van-button--primary{
      background-color: #07c160;
    border: 0.026667rem solid #07c160;
}
/deep/ .dialog{
  .van-field__control{background-color: #F0F0F0;padding: 10px;font-size: 16px;}
}
/deep/ .van-field {
  .van-field__label{width: 3.5rem;}
  .van-field__value{
    textarea{overflow: hidden;}
  }
  border-radius: 8px;
}
}

</style>
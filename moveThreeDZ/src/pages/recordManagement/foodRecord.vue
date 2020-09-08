<template>
  <div>
    <Nav title="登记备案" />
    <div class="bigBox">
      <van-form validate-first @submit="onSubmit" @failed="onFailed">
        <van-steps :active="active">
          <van-step>证照信息</van-step>
          <van-step>经营信息</van-step>
          <van-step>基础信息</van-step>
        </van-steps>
          <div v-if="this.active==0?true:false" class="threeModule">
          <div class="card1 certificates p15 f16 pr">
            <p class="f18 mb15">请完善证照信息</p>
            <div>
              <van-uploader name="uploader" camera :after-read="afterRead1"  :before-delete="handleDelete1" class="w" v-model="fileList1" :max-count="1"/>
               <div v-if="form.business_form==='学校（含托幼机构）食堂'" class="mt5 mb20 p10 bgcfff f14 tc">法人证书</div>
              <div v-else-if="form.business_form==='机关企事业单位食堂'||form.business_form==='工地食堂'||form.business_form==='其他食堂'" class="mt5 mb20 p10 bgcfff f14 tc">法人证书</div>
               <div v-else class="mt5 mb20 p10 bgcfff f14 tc">营业执照</div>
            </div>

            <div>
              <van-uploader name="uploader" camera :after-read="afterRead2" :before-delete="handleDelete2" class="w" v-model="fileList2" :max-count="1" />
              <div v-if="form.companytag_code==='1001574645421581111111103'" class="mt5 mb20 p10 bgcfff f14 tc" >食品经营许可证</div>
              <div  v-else-if="form.companytag_code==='1001574645421581111111104'" class="mt5 mb20 p10 bgcfff f14 tc" >备案证</div>
            </div>

            <div>
              <van-uploader name="uploader" camera :after-read="afterRead3" :before-delete="handleDelete3" class="w" v-model="fileList3" :max-count="1" />
              <div v-if="form.companytag_code==='1001574645421581111111103'" class="mt5 mb20 p10 bgcfff f14 tc" >法人身份证</div>
              <div v-else-if="form.companytag_code==='1001574645421581111111104'" class="mt5 mb20 p10 bgcfff f14 tc" >经营者身份证</div>
            </div>
          </div>
        </div>

        <div v-if="this.active==1?true:false" style="margin-bottom:60px;margin-top:100px">
          <div class="card1 p15 f16 pr">
            <p class="f18 mb15">请完善经营信息</p>
            <van-field v-if="form.companytag_code==='1001574645421581111111104'" v-model="form.record_code" label="备案证号" placeholder="请输入备案证号" input-align="right" @input="form.record_code=form.record_code.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入备案证号' }]" />
            <van-field v-if="form.companytag_code==='1001574645421581111111103'" v-model="form.credit_code" label="统一社会信用代码" placeholder="请输入统一社会信用代码" input-align="right"  @input="form.credit_code=form.credit_code.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入统一社会信用代码' },{ max: 18, message: '请如实填写18位统一社会信用代码，以供核对'},{ pattern:/[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g,message: '请输入正确的统一社会信用代码'}]" />
            <van-field v-if="form.companytag_code==='1001574645421581111111103'" v-model="form.record_code" label="食品经营许可证号" placeholder="请输入食品经营许可证号" input-align="right" @input="form.record_code=form.record_code.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入食品经营许可证号' }]" />
            <van-field v-if="form.companytag_code==='1001574645421581111111104'" readonly clickable label="主营项目" type="textarea" rows="1" :rules="[{ required: true, message: '请选择主营项目' }]" autosize v-model="options1_1[1]" placeholder="请选择主营项目" input-align="right" right-icon="arrow" @click="showCheckbox(3)" />
            <van-field v-if="form.companytag_code==='1001574645421581111111104'" readonly clickable label="兼营项目" type="textarea" rows="1" autosize :rules="[{ required: true, message: '请选择兼营项目' }]" v-model="options2_1[1]" placeholder="请选择兼营项目" input-align="right" right-icon="arrow" @click="showCheckbox(4)"  />
            <van-field v-if="form.companytag_code==='1001574645421581111111103'" readonly clickable label="经营范围" type="textarea" rows="1" autosize :rules="[{ required: true, message: '请选择经营范围' }]" v-model="options1_1[1]" placeholder="请选择经营范围" input-align="right" right-icon="arrow" @click="showCheckbox(3)" />
            <van-field readonly clickable label="发证日期" v-model="form.issue_time"  placeholder="请选择发证日期" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择发证日期' }]" @click="showdate1Picker = true" />
            <van-field readonly clickable label="有效期至" v-model="form.unuseful_time" placeholder="请选择有效期至" input-align="right" right-icon="arrow" :rules="[{ required: true, message: '请选择有效期至' }]" @click="showdate2Picker = true" />
            <van-field v-model="form.place_area" label="营业面积(㎡)" placeholder="请输入营业面积" type="number" input-align="right"  />
            <van-field v-model="form.employ_num" label="从业人数"  placeholder="请输入从业人数" type="number" input-align="right" />
            <checkboxModel v-if="show6Model"  @closeTip="show1(6)" @closeTip1="show2(6,arguments)" :val="1" :content="options1" :checked="options1_1[1]?options1_1[1]:''"  />
            <checkboxModel v-if="show7Model" @closeTip="show1(7)" @closeTip1="show2(7,arguments)" :val="1" :content="options2" :checked="options2_1[1]?options2_1[1]:''" />
            <van-popup v-model="showdate1Picker" round position="bottom">
              <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"  @cancel="onCancel" />
            </van-popup>
            <van-popup v-model="showdate2Picker" round position="bottom">
              <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="maxDate" :max-date="maxDate1"  @confirm="onConfirm"   @cancel="onCancel" />
            </van-popup>

            
          </div>
          <div class="card1 p15 pr" style="margin-top:-30px">
              <div class="cardInfo power bgcfff p15 f16">
                <p class="f16">人员信息</p>
                <div class="bgf5 mt15" v-for="(item, index) in formList" :key="index">
                  <van-field v-model="item.employ_name" name="姓名" label="姓名" placeholder="姓名" input-align="right" :rules="[{ required: true, message: '请填写姓名' }]" />
                  <van-field readonly clickable label="健康证有效期"  v-model="item.user_health_datedue" placeholder="请选择健康证有效期" :rules="[{ required: true, message: '请填写健康证有效期' }]" input-align="right" right-icon="arrow"  @click="showdatePicker(index)"/>
                  <van-field name="uploader" label="健康证上传" input-align="right" :rules="[{ required: true, message: '请上传健康证' }]">
                    <template #input>
                      <van-uploader v-model="item.employ_health_url" camera :max-count="1" :before-read="beforeRead(index)" :after-read="uploadPic" />
                    </template>
                  </van-field>
                  <van-button type="danger"  class="ml15 mt5 mb15 delete" size="small" @click="deleteRules(item, index)" >删除</van-button>
                </div>
                <div class="tc mt15">
                  <van-button color="#E8F8F0" icon="plus" @click="Add">添加人员</van-button>
                </div>
                <van-popup v-model="showdate3Picker" round position="bottom">
                 <van-datetime-picker  v-model="currentDate" type="date"  title="选择年月日" :min-date="maxDate" :max-date="maxDate1" @confirm="onConfirm" @cancel="onCancel"/>  
                </van-popup>
              </div>
            </div>
        </div>
         <div class="firstPage" v-if="this.active==2?true:false">
          <cube-scroll ref="scroll" :data="items">
            <div class="card p15 pr">
              <div class="cardInfo  f16">
                <h3 class="f15">证照类型</h3>
                <p class="pt20"><span>食品餐饮</span></p>
                <p class="pt20"><span v-if="form.companytag_code==='1001574645421581111111103'">食品经营许可（餐饮）</span><span v-else-if="form.companytag_code==='1001574645421581111111104'">四川省小经营店备案证（餐饮）</span></p>
                <p class="pt20">{{form.business_form}}</p>
              </div>
              <div class="originSelect f16" @click="back">
                重新选择
                <i class="icon iconfont iconxiangyou f14" @click="back"></i>
              </div>
            </div>
          </cube-scroll>
          <div class="card1  p15 f16 pr">
            <p class="f18 mb15">请完善基础信息</p>
            <van-field v-model="form.company_name" label="企业名称" placeholder="请输入企业名称" @input="form.company_name=form.company_name.replace(/[, ]/g,'')" input-align="right" :rules="[{ required: true, message: '请输入企业名称' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入特殊符号' }]" />
            <van-field v-if="form.companytag_code=='1001574645421581111111103'" v-model="form.operator" label="经营者姓名" placeholder="请输入经营者姓名" input-align="right" @input="form.operator=form.operator.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入经营者姓名' }]" />
            <van-field v-else v-model="form.operator" label="法人姓名" placeholder="请输入法人姓名" input-align="right" @input="form.operator=form.operator.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入法人姓名' }]" />
            <van-field v-model="form.idcard" label="身份证号" type="number" placeholder="请输入身份证号" input-align="right" @input="form.idcard=form.idcard.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入身份证号'},{ min: 15, max: 18, message: '请如实填写15或者18位号码，以供核对'},{ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message: '请输入正确的身份证号码'}]" />
            <van-field v-model="form.mobilephone" label="联系电话" type="tel" placeholder="请输入联系电话" input-align="right" @input="form.mobilephone=form.mobilephone.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入联系电话' },{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,message: '手机号格式不对'}]" />
            <van-field readonly clickable label="企业所在地" type="textarea"  rows="1" autosize v-model="form.place_operate" placeholder="请选择企业所在地" input-align="right" right-icon="arrow" @click="show_Picker" :rules="[{ required: true, message: '请选择企业所在地' }]" />
            <van-field v-model="form.address" label="详细地址" type="textarea" rows="1" autosize placeholder="请输入详细地址" input-align="right"  @input="form.address=form.address.replace(/[, ]/g,'')" :rules="[{ required: true, message: '请输入详细地址' }]" />
          </div>
          <getAddress v-if="showPicker" @closeTip="show1(5)"  @closeTip1="showAddress" :province="form.province" :city="form.city" :area="form.area" :vill="form.vill" :town="form.town" />
        </div>
      
        <van-row gutter="20" class="p15 footer">
          <van-col span="12"><div :class="active==0?'before1':'before2'" class="before" @click="before">上一步</div></van-col>
          <van-col span="12" v-if="active==0||active==1"><van-button class="next" round block type="primary" native-type="submit"> 下一步</van-button></van-col>
          <van-col span="12" v-if="active==2"><van-button class="next" round block type="primary" native-type="submit"> 提交</van-button></van-col>
        </van-row>
      </van-form>
    </div>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import axios from "../../axios/index.js";
import { local } from "../../utils/index";
import getAddress from "../../components/getAddress";
import checkboxModel from "../../components/checkboxModel";
import { formatDate, uploadImg, aaa,dataURLtoFile} from "../../utils/index";
import { imageUrl } from "../../config/index";
import { mapState } from 'vuex'
export default {
  components: {
    Nav,
    checkboxModel,
    getAddress
  },
  data() {
    return {
      active: 0,
      disabeld: false,
      items: [],
      value: "",
      imageUrl: imageUrl,
      show6Model: false,
      show7Model: false,
      showdate1Picker: false,
      showdate2Picker: false,
      showdate3Picker: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      maxDate1:new Date(2030,0,1),
      currentDate: new Date(),
      options1: [],
      options1_1: "",
      options2: [],
      options2_1: "",
      form: {
        company_code: "",
        companytype_code: "1001574645421581000000003",
        companytag_code: "",
        business_form: "",
        record_time: formatDate(new Date(), "yyyy-MM-dd"),
        company_name: "",
        operator: "",
        idcard: "",
        mobilephone: "",
        record_code: "",
        credit_code: "",
        department_code: "",
        department_name: "",
        region_name: "",
        region_code: "",
        user_code_manage: "",
        user_code_manage_list: [],
        user_name_manage: "",
        user_code_info: "",
        user_name_info: "",
        user_code_info_list: [],
        place_operate: "",
        address: "",
        produce_form_list: [], //生产形式
        producetype_codes_list: [], //生产类别
        main_subject_list: [], //主营项目
        sub_subject_list: [], //兼营项目
        business_range_list: [], //经营范围
        issue_time: "",
        unuseful_time: "",
        place_area: "",
        employ_num: "",
        accessoryList: [{ name: "营业执照", url: "" },{ name: "食品经营许可证", url: "" },{ name: "法人身份证", url: "" }],
        companyEmployList: [],
        province: "",
        city: "",
        area: "",
        vill: "",
        town: ""
      },
      showPicker: false,
      formList: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      imgUrlListValue: "",
    };
  },
   computed: {
    ...mapState({
      recordPage3: (state) => state.record.recordPage3
    })
  },
  created() {
    this.form.company_code=this.$route.query.company_code
    this.form.companytag_code=this.$route.query.companytag_code
    var that=this;
      if(this.form.company_code){ this.showData()}else{
        that.form=Object.assign({}, that.recordPage3)
        this.form.companytag_code=this.$route.query.companytag_code
        this.form.business_form=this.$route.query.business_form
        if(this.form.companytag_code==='1001574645421581111111104'){ 
          this.options1_1=['',this.form.main_subject_list.join(',')] 
          this.options2_1=['',this.form.sub_subject_list.join(',')]
        }else if(this.form.companytag_code==='1001574645421581111111103'){
          this.options1_1=['',this.form.business_range_list.join(',')] 
       }
       if(this.form.companyEmployList){
         this.form.companyEmployList.forEach(item=>{
          this.formList.push({
             user_health_datedue:item.user_health_datedue,
             employ_health_url:[{url:this.imageUrl+item.employ_health_url}],
             employ_name:item.employ_name
             }); 
        })
      }
        this.fileList1 =this.form.accessoryList[0].url != ""? [{ url: this.imageUrl + this.form.accessoryList[0].url }]: [];
        this.fileList2 =this.form.accessoryList[1].url != ""? [{ url: this.imageUrl + this.form.accessoryList[1].url }]: [];
        this.fileList3 =this.form.accessoryList[2].url != ""? [{ url: this.imageUrl + this.form.accessoryList[2].url }]: [];
       }
       
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    this.form.companyEmployList = [];
    this.formList.forEach(item => {
      this.form.companyEmployList.push({
        employ_name: item.employ_name,
        user_health_datedue: item.user_health_datedue,
        employ_health_url: item.employ_health_url[0].url.substring(item.employ_health_url[0].url.indexOf("resources"))
      });
    });
    next(this.$store.dispatch('record/setNewPage3', this.form));
  },
  methods: {
    back() {this.$router.push({path: "/bodyType"});},
    onFailed(errorInfo) {this.$toast(errorInfo.errors[0].message);},
    next() {
      if (this.active >= 0 && this.active < 2) {
        return (this.active += 1);
      }
    },
    before() {
      this.active -= 1;
      if (this.active < 0) {
        this.active += 1;
      }
    },
     showData(){
      axios.get('app/company/drafts',{company_code:this.form.company_code}).then((v)=>{
        this.form=v.data;
        this.form.companytag_code=this.$route.query.companytag_code
        this.form.business_form=this.$route.query.business_form
        this.form.accessoryList=v.data.accessoryReturnList;
        this.fileList1=v.data.accessoryReturnList[0].url!=''?[{url:this.imageUrl+v.data.accessoryReturnList[0].url}]:[]
        this.fileList2=v.data.accessoryReturnList[1].url!=''?[{url:this.imageUrl+v.data.accessoryReturnList[1].url}]:[]
        this.fileList3=v.data.accessoryReturnList[2].url!=''?[{url:this.imageUrl+v.data.accessoryReturnList[2].url}]:[]
        this.form.province=v.data.province!=null?v.data.province:'';
        this.form.city=v.data.city!=null?v.data.city:'';
        this.form.area=v.data.area!=null?v.data.area:'';
        this.form.town=v.data.town!=null?v.data.town:'';
        this.form.vill=v.data.vill!=null?v.data.vill:'';
        this.form.place_operate=this.form.province+this.form.city+this.form.area+this.form.vill+this.form.town;
           if(this.form.companytag_code==='1001574645421581111111104'){ 
             this.options1_1=['',v.data.main_subject]
            this.options2_1=['',v.data.sub_subject]
            }else if(this.form.companytag_code==='1001574645421581111111103'){
              this.options1_1=['',v.data.business_range]
            }
         v.data.companyEmployReturnList.forEach(item=>{
          this.formList.push({
             user_health_datedue:item.user_health_datedue,
             employ_health_url:[{url:this.imageUrl+item.employ_health_url}],
             employ_name:item.employ_name
             }); 
       })

      })
    },
    init() {
      axios.get("app/dictionary/list", {companytag_code: this.form.companytag_code}).then(v => {
          if (this.form.companytag_code === "1001574645421581111111104") {
            this.options1 = v.data.经营信息.主营项目;
            this.options2 = v.data.经营信息.兼营项目;
          } else if (this.form.companytag_code === "1001574645421581111111103") {
            this.options1 = v.data.经营信息.经营范围;
          }
        });
    },
     onSubmit() {
      if (this.active >= 0 && this.active < 2) {
         if(this.active==0){if(this.form.accessoryList[2].url==''){this.$toast('请上传身份证件照片');this.loadButton=true;return false}
      }
         return (this.active += 1);
      }else if(this.active==2){
         if(this.form.province==''|| this.form.city==''|| this.form.area==''|| this.form.vill==''|| this.form.town==''){
          this.$dialog.confirm({
           title:'',
           message:'请填写完整企业地址',
       })
         }else{
            this.submit();
         }
      }
    },
    submit() {
       this.loadButton=false;
       this.form.companyEmployList=[];
             this.formList.forEach(item=>{
          this.form.companyEmployList.push({
             employ_name:item.employ_name,
             user_health_datedue:item.user_health_datedue,
             employ_health_url:item.employ_health_url[0].url.substring(item.employ_health_url[0].url.indexOf("resources"))
             });
       })
      if(this.form.company_code){ 
       axios.post('app/company/update', this.form).then(() => {
         this.loadButton=true;
         this.$router.push({
          path:'/recordDetail',
          query:{
            id:this.form.company_code, 
            id1:1
          }
        })
      })
      }else{ 
       axios.post('app/company/save', this.form).then((res) => {
         local.set("form",'')
         this.loadButton=true;
         this.$router.push({
          path:'/recordDetail',
          query:{
            id:res.data.company_code,
            id1:1
          }
        })
      })
      }
    },
    cancel() {
      this.show = false;
      this.textarea = "";
    },
    showCheckbox(val) {
      if (val == 3) {this.show6Model = !this.show6Model;} else if (val == 4) {this.show7Model = !this.show7Model;}},
    show_Picker() {
      this.showPicker = !this.showPicker;
    },
    show1(val) {
       if (val == 5) { this.showPicker = false; } else if (val == 6) { this.show6Model = false; } else if (val == 7) { this.show7Model = false; }
    },
    show2(index, val) {
      if (val[1].substr(0,1)==','){val[1]=val[1].substr(1);}
      if (index == 6) {
        this.options1_1 = val;
         if (this.form.companytag_code === "1001574645421581111111104" ) {
          this.form.main_subject_list = aaa(val[1].indexOf(",") != -1 ? val[1].split(",") : val[1].split(" ") );
        } else if (this.form.companytag_code === "1001574645421581111111103") {
          this.form.business_range_list = aaa(val[1].indexOf(",") != -1 ? val[1].split(",") : val[1].split(" "));
        }
      } else if (index == 7) {
        this.options2_1 = val;
         if (this.form.companytag_code === "1001574645421581111111104") {
          this.form.sub_subject_list = aaa(val[1].indexOf(",") != -1 ? val[1].split(",") : val[1].split(" "));
        }
      }
    },
    showAddress(val1, val2, val3, val4, val5) {
      this.form.province = val1;
      this.form.city = val2;
      this.form.area = val3;
      this.form.vill = val4;
      this.form.town = val5;
      this.form.place_operate = val1 + val2 + val3 + val4 + val5;
    },
    onConfirm(value) {
      if (this.showdate1Picker === true) {
        this.form.issue_time = formatDate(value, "yyyy-MM-dd");
        this.showdate1Picker = false;
      } else if (this.showdate2Picker === true) {
        this.form.unuseful_time = formatDate(value, "yyyy-MM-dd");
        this.showdate2Picker = false;
      } else if (this.showdate3Picker === true) {
        this.formList[this.index].user_health_datedue = formatDate(
          value,
          "yyyy-MM-dd"
        );
        this.showdate3Picker = false;
      }
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
        if (this.form.business_form === "学校（含托幼机构）食堂") {
          this.$set(this.form.accessoryList, 0, {
            name: "法人证书",
            url: response.data.visit_url.substring(
              response.data.visit_url.indexOf("resources")
            )
          });
        } else if (
          this.form.business_form === "机关企事业单位食堂" ||
          this.form.business_form === "工地食堂" ||
          this.form.business_form === "其他食堂"
        ) {
          this.$set(this.form.accessoryList, 0, {
            name: "批准设立文件或证件",
            url: response.data.visit_url.substring(
              response.data.visit_url.indexOf("resources")
            )
          });
        } else {
          this.$set(this.form.accessoryList, 0, {
            name: "营业执照",
            url: response.data.visit_url.substring(
              response.data.visit_url.indexOf("resources")
            )
          });
        }
        axios.get("app/baidu/orc/discern", {file_path: response.data.visit_url,discern_type: "2",id_card_side: "front"}).then(v => {
            if (JSON.stringify(v.data.discern_result) != "{}") {
              this.form.record_code = v.data.discern_result.record_code;
              this.form.credit_code = v.data.discern_result.credit_code;
              this.form.company_name = v.data.discern_result.company_name;
              this.form.unuseful_time = v.data.discern_result.unuseful_time;
              this.form.record_time = v.data.discern_result.record_time;
              this.form.operator = v.data.discern_result.operator;
            }
          });
      });
    },
    handleDelete1(file, detail) {
      if (this.form.business_form === "学校（含托幼机构）食堂") {
        this.$set(this.form.accessoryList, 0, { name: "法人证书", url: "" });
      } else if (this.form.business_form === "机关企事业单位食堂" ||this.form.business_form === "工地食堂" ||this.form.business_form === "其他食堂") {
        this.$set(this.form.accessoryList, 0, {name: "批准设立文件或证件",url: ""});
      } else {
        this.$set(this.form.accessoryList, 0, { name: "营业执照", url: "" });
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
        if (this.form.companytag_code === "1001574645421581111111103") {
          this.$set(this.form.accessoryList, 1, {
            name: "食品经营许可证",
            url: response.data.visit_url.substring(
              response.data.visit_url.indexOf("resources")
            )
          });
        } else if (this.form.companytag_code === "1001574645421581111111104") {
          this.$set(this.form.accessoryList, 1, {
            name: "备案证",
            url: response.data.visit_url.substring(
              response.data.visit_url.indexOf("resources")
            )
          });
        }
      });
    },
    handleDelete2(file, detail) {
      if (this.form.companytag_code === "1001574645421581111111103") {
        this.$set(this.form.accessoryList, 1, {
          name: "食品经营许可证",
          url: ""
        });
      } else if (this.form.companytag_code === "1001574645421581111111104") {
        this.$set(this.form.accessoryList, 1, { name: "备案证", url: "" });
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
        if (this.form.companytag_code === "1001574645421581111111103") {
          this.$set(this.form.accessoryList, 2, {
            name: "法人身份证",
            url: response.data.visit_url.substring(
              response.data.visit_url.indexOf("resources")
            )
          });
        } else if (this.form.companytag_code === "1001574645421581111111104") {
          this.$set(this.form.accessoryList, 2, {
            name: "经营者身份证",
            url: response.data.visit_url.substring(
              response.data.visit_url.indexOf("resources")
            )
          });
        }
        if (this.form.accessoryList[2].name.indexOf("身份证") != -1) {
          axios.get("app/baidu/orc/discern", {file_path: response.data.visit_url,discern_type: "1",id_card_side: "front"}).then(v => {
              if (JSON.stringify(v.data.discern_result) != "{}") {
                this.form.idcard = v.data.discern_result.user_idcard;
              }
            });
        }
      });
    },
    handleDelete3(file, detail) {
      if (this.form.companytag_code === "1001574645421581111111103" ) {
        this.$set(this.form.accessoryList, 2, { name: "法人身份证", url: "" });
      } else if (this.form.companytag_code === "1001574645421581111111104") {
        this.$set(this.form.accessoryList, 2, {name: "经营者身份证",url: ""});
      }

      this.fileList3.splice(detail.index, 1);
    },
    beforeRead(index) {
      this.index = index;
    },
    uploadPic(file) {
      let param = new FormData();
      param.append("uploadFile", file.file);
      const loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0
      });
      uploadImg(param).then(response => {
        loading.clear();
        this.formList[
          this.index
        ].employ_health_url[0].url = response.data.visit_url.substring(
          response.data.visit_url.indexOf("resources")
        );
      });
    },
    Add() {
      this.maxnum++;
      this.formList.push({
        employ_name: "",
        user_health_datedue: "",
        employ_health_url: []
      });
    },
    deleteRules(item, index) {
      this.maxnum--;
      this.index = this.formList.indexOf(item);
      if (index !== -1) {
        this.formList.splice(index, 1);
      }
    },
    showdatePicker(index) {
      this.showdate3Picker = true;
      this.index = index;
    }
  }
};
</script>
<style lang="less" scoped>
.bigBox {
  padding-top: 54px;
  background: #ffffff;
  /deep/ .van-field__error-message{
    display: none;
  }
  /deep/ .van-steps{
    position: fixed;
    width: 100%;
    top:54px;
    left: 0px;
    z-index: 999;
    padding: 20px 30px;
    .van-step__title--active {
      color:#1db667;
     }
   .van-step--horizontal .van-step__title{
      font-size:18px;
    }
     .van-step--horizontal:nth-child(2n+1) .van-step__title{
      margin-left: -15px;
    }
    .van-step--horizontal:nth-child(2n+3) .van-step__title{
      margin-right: -15px;
    }
    .van-step--horizontal .van-step__circle-container{
      margin-top: 15px;
    }
    .van-step--horizontal .van-step__line {
      margin-top: 15px;
    }
    .van-step--horizontal .van-step__icon{
        font-size: 25px !important;
      }
}
  .firstPage{
    margin-top: 100px;
    margin-bottom: 80px;
    .cube-scroll-wrapper{
      margin-top: 10px;
      border-radius: 8px;
    }

  }
}
.originSelect{
  position: absolute;
  right: 10px;
  top: 15px;
  color:#1DB667;
  i{
    color:#1DB667;
  }
}
.card {background: #f5f5f5;margin: 15px;border-radius: 8px;
    .van-cell{background-color: transparent;padding:10px 0px}
    img {position:absolute;top: 10px;left:250px;width: 75px;height:75px;}
    .cardInfo { border-radius:5px;p:nth-child(1) {  color: #9a9a9a; }}
  }
.footer{position: fixed;bottom: 0px;left: 0px;background: #f5f5f5;width:100%}
.before,.next{
  font-size: 18px;
  padding: 13px 10px;
  text-align: center;
  border-radius: 5px;
}
.before1 {
  color: #fff;
  background: #b4e2ca;
}
.before2 {
  color: #1db667;
  background:#DDF4E8;
}
.power{
  margin-bottom:30px;border-radius:8px;
    .van-cell{background-color: #f5f5f5;margin-bottom: 0 !important;}
  }
.card1 {
    background: #f5f5f5;
    .van-cell{margin-bottom: 15px;}
    .van-button--default{.van-button__content{color: #1DB667;}}
    
  }
/deep/ .threeModule {
  margin-bottom: 60px;
  margin-top: 100px;
  background: #f5f5f5;
   .certificates{.van-uploader__upload-icon{font-size: 100px;} .van-uploader__upload,.van-uploader__preview,.van-uploader__preview-image{width: 100%;  background-color: #fff; height:4.7rem;margin: 0;}}
}
.next {
  background: #1db667;
}
/deep/ .van-field {
  .van-field__label{width: 3.5rem;}
  .van-field__value{
    textarea{overflow: hidden;}
  }
  border-radius: 8px;
}
</style>
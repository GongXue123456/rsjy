<template>
  <div style="overflow:hidden">
    <Nav title="主体类型" />
    <div class="body-type">
      <h3>请选择分类</h3>
      <div v-for="(item,index) in companytype" :key="index">
        <div class="product" @click="showPopup(item.companytype_name,item.companytype_code)" >
        <img src="../../assets/img/store.png" />
        <p>{{item.companytype_name}}</p>
        <p>{{item.note}}</p>
      </div>
      </div>
    </div>
    <van-popup  v-model="show"  :append-to-body="true" >
      <div class="selectType">
        <div class="selectCtrol">
          <h3>{{companytype_name}}</h3>
          <div class="originSelect" @click="back">
              重新选择
              <i class="icon iconfont iconxiangyou" @click="back"></i>
            </div>
          <hr />
          <p>请选择证件类型</p>
           <div  >
             <div class="cardType" v-for="(item,index) in companytagList" :key="index" :class="{'active':click==index}" @click="addColor(item.companytag_code,index)">{{item.companytag_name}}</div>
           </div>
          <p>请选择小作坊业态</p>
          <div class="title">
             <div  v-for="(item,index) in business_formList" :key="index">
              <div class="cardType" :class="{'active':clicked==index}" @click="sureType(item.dictionary_field,index)">{{item.dictionary_field}}</div>
           </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="changeExamine" @click="toRecordCirculation">确定</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import axios from '../../axios/index.js';
export default {
  components: {
    Nav
  },
  data() {
    return {
      companytype_name:'',
      show: false,
      clicked:'0',
      click:'0',
      title:'',
      business_formList:[],
      companytag_code:'',
      business_form:'',
      companytagList:[],
      companytype:[],
       form:{
        company_code:'',
        companytag_code:'',
        business_form:'',
        companytype_code:'',
      }
    };
  },

  mounted() {
    this.getCompanytype()
  },
  methods: {
    showPopup(value,type) {
      this.clicked='0';
      this.click='0';
      this.companytype_name=value;
      this.form.companytype_code=type
      this.show=true
      this.getCompanyTag(this.form.companytype_code)
    },
    getCompanyTag(val){
      axios.get('app/companytag/all',{companytype_code:val}).then(res=>{
         this.companytagList=res.data;
         this.form.companytag_code=res.data[0].companytag_code;
         this.getDictionary(this.form.companytag_code)
      })
    },
    getDictionary(params){
      axios.get('app/dictionary/list',{companytag_code:params}).then(res=>{
           this.business_formList=res.data.主体业态.食品经营许可;
           this.form.business_form=res.data.主体业态.食品经营许可[0].dictionary_field
      })
    },
    sureType(val,index){
      if(this.form.companytag_code==''){
       this.$toast('请先选择证件类型')
      }else{
        this.form.business_form=val
        this.clicked=index
      }
    },
    addColor(val,index){
     this.form.companytag_code=val;
     this.click=index
     this.clicked='0';
     this.getDictionary(this.form.companytag_code)
    },
    getCompanytype(){
       axios.get('app/companytype/all').then(res=>{
        this.companytype=res.data;
      })
    },
    back(){
      this.show=false
    },
    toRecordCirculation() {
      if(this.form.business_form===''||this.form.companytag_code===''){
        this.$toast("请先选择证件类型和小作坊业态")
      }else if(this.companytype_name==='食品加工'){
        this.$router.push({
        path: "/recordProduction",
        query:{
          companytype_code:this.form.companytype_code,
          companytag_code:this.form.companytag_code,
          business_form:this.form.business_form,
          company_code:this.$route.query.company_code
        }
        })
      }else if(this.companytype_name==='食品流通'){
        this.$router.push({
        path: "/recordCirculation",
        query:{
          companytype_code:this.form.companytype_code,
          companytag_code:this.form.companytag_code,
          business_form:this.form.business_form,
          company_code:this.$route.query.company_code
        }
        })
      }else if(this.companytype_name==='食品餐饮'){
        this.$router.push({
        path: "/recordFood",
        query:{
          companytype_code:this.form.companytype_code,
          companytag_code:this.form.companytag_code,
          business_form:this.form.business_form,
          company_code:this.$route.query.company_code
        }
        })
      }
    },
  }
}
</script>
<style lang="less" scoped>
html {
overflow-y: scroll;
}
:root {
overflow-y: auto;
overflow-x: hidden;
}

:root body {
position: absolute;
}

body {
width: 100vw;
overflow: hidden;
}

.body-type {
  margin: 54px 20px 0 20px;
  box-sizing: border-box;
  h3 {
    color: #a6a6a6;
    padding: 30px 0;
  }
  .product,
  .transport,
  .eat {
    box-sizing: border-box;
    border-radius: 5px;
    background: #f2f2f2;
    margin-bottom: 20px;
    img {
      position: relative;
      top: 40px;
      left: 20px;
    }
    p:nth-child(2) {
      font-size: 18px;
      font-weight: 900;
      position: relative;
      top: -10px;
      left: 80px;
    }
  }
  .product {
    p:nth-child(3) {
      width: 200px;
      margin-top: 20px;
      line-height: 25px;
      font-size: 14px;
      position: relative;
      box-sizing: border-box;
      top: -20px;
      left: 80px;
      color: #b5b5b5;
    }
  }
  .transport {
    p:nth-child(3) {
      width: 200px;
      margin-top: 20px;
      line-height: 25px;
      position: absolute;
      box-sizing: border-box;
      top: 250px;
      left: 100px;
      color: #b5b5b5;
    }
  }
  .eat {
    p:nth-child(3) {
      width: 200px;
      margin-top: 20px;
      line-height: 25px;
      position: absolute;
      box-sizing: border-box;
      top: 360px;
      left: 100px;
      color: #b5b5b5;
    }
  }
  .eat:hover {
    border: 1px solid #1db65e;
    p {
      color: #1db65e;
    }
  }
  .transport:hover {
    border: 1px solid #1db65e;
    p {
      color: #1db65e;
    }
  }
}
.selectType {
  height: 330px;
  width: 330px;
  border-radius: 5px;
  box-sizing: border-box;
  .selectCtrol {
    padding: 20px 20px 0 20px;
    .originSelect{
      font-size: 16px;
      color: #1db667;
      text-align: right;
      margin-right: 5px;
    }
    .select{
      appearance: none;
      -webkit-appearance: none;
      background: #ffffff;
      -moz-appearance: none;
      margin-left: 150px;
      font-size: 12px;
      color: #1db667;
      float: left;
    }
    i{
      color:#1DB667;
      font-size: 12px;
      position: absolute;
      top:22px;
      right: 10px;
    }
     h3 {
      float: left;
      font-weight: bold;
      font-size: 16px;
    }
    hr {
      margin:15px 0px;
      border-top: none;
    }
    p {
      color: #9a9a9a;
      font-weight: bold;
      font-size: 16px;
    }
.title{
      margin-top: 10px;
      height: 200px;
      overflow-y:scroll;
  div{
      border-radius: 5px;
      font-size: 16px;
      text-align: center;
  }
}
    .cardType {
      padding: 15px 0;
      margin-top: 13px;
      margin-bottom: 15px;
      border-radius: 5px;
      font-size: 16px;
      text-align: center;
      background: #f0f0f0;
    }
    .active{
          color: #1db65e;
          border: 1px solid #1db65e;
          background: #e4fbef !important;
      }
  }
}
.footer{position: fixed;bottom: 0px;left: 0px;width: 100%;background:  #f5f5f5;}
.changeExamine {
  margin: 15px;
  padding:2px 0px;
  border-radius: 5px;
  background: #1db667;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
}
.van-popup{
  height: 500px;
  overflow: hidden;
}
</style>
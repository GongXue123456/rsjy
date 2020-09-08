<template>
  <div>
    <Nav title="登记备案" />
    <div class="bigBox">
     <div class="bottom">
      <p>请完善经营信息</p>
      <van-form>
        <div class="company_name">
          <van-field
            v-model="registrationCard"
            name="备案证号"
            label="备案证号"
            placeholder="请输入备案证号"
            :rules="[{ required: true, message: '请填写备案证号' }]"
          />
        </div>
        <div class="destory">
          <van-field
            v-model="mainProjects"
            name="主营项目"
            label="主营项目"
            placeholder="请选择主营项目"
            :rules="[{ required: true, message: '请输入主营项目' }]"
          />
           <select class="select">
            <option value="volvo">请选择主营项目</option>
            <option value="saab">食品生产</option>
            <option value="opel">食品流通</option>
            <option value="audi">食品餐饮</option>
          </select>
           <!-- <i class="icon iconfont iconxiangyou"></i> -->
        </div>
        <div class="destory">
          <van-field
            v-model="concurrentProjects"
            name="兼营项目"
            label="兼营项目"
            placeholder=""
            :rules="[{ required: true, message: '请输入兼营项目' }]"
          />
          <select class="select">
            <option value="volvo">请选择兼营项目</option>
            <option value="saab">食品生产</option>
            <option value="opel">食品流通</option>
            <option value="audi">食品餐饮</option>
          </select>
           <i class="icon iconfont iconxiangyou"></i>
        </div>
        <div class="destory">
          <van-field
            v-model="dateIssue"
            name="发证日期"
            label="发证日期"
            placeholder="请选择发证日期"
            :rules="[{ required: true, message: '请输入发证日期' }]"
          />
          
        </div>
         <select class="select">
            <option value="volvo">请选择发证日期</option>
            <option value="saab">食品生产</option>
            <option value="opel">食品流通</option>
            <option value="audi">食品餐饮</option>
          </select>
           <i class="icon iconfont iconxiangyou"></i>
        <div class="destory">
           <van-field
            v-model="validUntil"
            name="有效期至"
            label="有效期至"
            placeholder="请选择有效期"
            :rules="[{ required: true, message: '请输入有效期' }]"
          />
         
        </div>
         
           <i class="icon iconfont iconxiangyou"></i>
        <div class="operator_name">
          <van-field
            v-model="businessArea"
            name="营业面积（㎡）"
            label="营业面积（㎡）"
            placeholder="请输入营业面积（㎡）"
            :rules="[{ required: true, message: '请填写营业面积（㎡）' }]"
          />
        </div>
         <div class="operator_name">
          <van-field
            v-model="engagedPeople"
            name="从业人数"
            label="从业人数"
            placeholder="请输入从业人数"
            :rules="[{ required: true, message: '请填写从业人数' }]"
          />
        </div>
         <div class="operator_name">
          <van-field
            v-model="engagedPeople"
            name="从业人数"
            label="从业人数"
            placeholder="请输入从业人数"
            :rules="[{ required: true, message: '请填写从业人数' }]"
          />
        </div>
      </van-form>
      <div class="before">上一步</div>
      <div class="next">下一步</div>
    </div>
    </div>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
export default {
  components:{
    Nav
  },
  data() {
    return {
      mainProjects: "",
      concurrentProjects: "",
      dateIssue: "",
      validUntil: "",
      businessArea: "",
      engagedPeople:'',
      registrationCard: "",
    }
  },
}
</script>
<style lang="less" scoped>
body,html{
  height: 100%;
}
.bigBox{
  padding-top: 55px;
}
.bottom {
  height: 800px;
  margin-top: 20px;
  background: #f5f5f5;
  border-radius: 5px;
  p {
    padding: 40px 10px 30px 10px;
    font-size: 20px;
    color: #000000;
  }
   .select{
      float: left;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      color: #bfbfbf;
    }
    i{
      font-size: 12px;
      color: #000000;
      position: relative;
      top: -50px;
      left: 246px;
    }
}
.before,.next{
  float: left;
  width: 165px;
  margin-left: 10px;
  color: #ffffff;
  font-size: 20px;
  padding: 20px 20px;
  text-align: center;
  border-radius: 5px;
}
.before{
  background: #b4e2ca;
}
.next{
  background: #1db667;
}

/deep/ .van-field {
  width: 345px;
  margin: 0px 10px 10px 10px;
  background: #ffffff;
  border-radius: 5px;
}
.destory{
  /deep/ .van-field__control{
    display: none;
}
}
 /deep/ .van-field__control{
    margin-left: 80px;
    text-align: right;
}
/deep/ .van-cell__title {
 width: 100px;
}
</style>
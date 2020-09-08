<template>
  <div>
    <Nav title="登记备案" />
    <div class="bigBox">
      <van-steps :active="active">
        <van-step>买家下单</van-step>
        <van-step>商家接单</van-step>
        <van-step>买家提货</van-step>
      </van-steps>
      <div id="firstPage" class="firstPage">123
         <cube-scroll ref="scroll" :data="items">
        <div class="card">
          <div class="cardInfo">
            <p>证照类型</p>
            <p>{{count}}</p>
            <p>四川省小经营店备案证(流通)</p>
            <p>小型餐馆</p>
          </div>
        </div>
      </cube-scroll>
       <div class="bottom">
      <p>请完善基础信息</p>
      <van-form @submit="onSubmit">
        <div class="company_name">
          <van-field
            v-model="companyName"
            name="用户名"
            label="企业名称"
            placeholder="请输入企业名称"
            :rules="[{ required: true, message: '请填写企业名称' }]"
          />
        </div>
        <div class="operator_name">
          <van-field
            v-model="username"
            name="经营者姓名"
            label="经营者姓名"
            placeholder="请输入经营者姓名"
            :rules="[{ required: true, message: '请输入经营者姓名' }]"
          />
        </div>
        <div class="operator_name">
          <van-field
            v-model="idCard"
            name="身份证号"
            label="身份证号"
            placeholder="请输入经营者身份证号"
            :rules="[{ required: true, message: '请输入身份号' },{validator,message:'请输入正确的身份证号'}]"
          />
        </div>
        <div class="operator_name">
          <van-field
            v-model="userPhone"
            name="联系电话"
            label="联系电话"
            placeholder="请输入经营者联系电话"
            :rules="[{ required: true, message: '请输入联系电话' },{ pattern, message: '请输入正确的电话号码' }]"
          />
        </div>
        <div class="operator_name">
          <van-field
            readonly
            clickable
            name="area"
            :value="value"
            label="地区选择"
            placeholder="请输入地区"
            @click="showArea = true"
            :rules="[{ required: true, message: '请输入地区' }]"
          />
          <van-popup v-model="showArea" position="bottom">
            <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
          </van-popup>
        </div>
        <div class="operator_name">
          <van-field
            v-model="userDress"
            name="详细地址"
            label="详细地址"
            placeholder="如道路、门牌号、小区、楼栋号"
            :rules="[{ required: true, message: '请填写详细地址' }]"
          />
        </div>
      </van-form>
    </div>
     
      </div>
       <div>456</div>
      <div>789</div>
      <div class="before" @click="before">上一步</div>
      <div class="next" @click="next">下一步</div>
    </div>
   
  </div>
</template>
<script>
import Nav from "../../components/Nav";
export default {
  components: {
    Nav
  },
  data() {
    return {
      active: 0,
      disabeld:false,
      items: [],
      selectRecord: "2",
      tabs: [
        {
          label: "基础信息",
          value: "2"
        },
        {
          label: "经营信息",
          value: "3"
        },
        {
          label: "证照信息",
          value: "4"
        }
      ],
      types: [
        {
          label: "食品生产",
          type: "小作坊、酒厂等生产类产业",
          value: "2"
        },
        {
          label: "食品流通",
          type: "副食店、小卖部、超市等流通类企业",
          value: "3"
        },
        {
          label: "食品餐饮",
          type: "餐馆、面馆、学校食堂等餐饮类企业",
          value: "4"
        }
      ],
      item_label: "",
      username: "",
      userPhone: "",
      userArea: "",
      userDress: "",
      idCard: "",
      companyName: "",
      pattern: /1\d{10}/,
      value: "",
      showArea: false,
      areaList: {}
    };
  },
  computed: {
    count() {
      return this.$store.state.item_label;
    }
  },
  mounted() {
    this.changePage()
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    validator(val) {
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
    },
    onConfirm(values) {
      this.value = values.map(item => item.name).join("/");
      this.showArea = false;
    },
    changePage() {
      if(this.active===0){
        document.getElementById('firstPage').style.display="block"
      }
    },
    next() {
     if(this.active>=0&&this.active<2){
       this.active+=1
     }
    },
    before(){
      this.active-=1
      if(this.active<0){
        this.$toast('前面没有啦')
        this.active+=1
      }
    }
  }
};
</script>
<style lang="less" scoped>
.bigBox {
  padding: 50px 10px 0 10px;
  .firstPage{
    display: none;
  }
}
.card {
  background: #f5f5f5;
  margin-top: 15px;
  border-radius: 5px;
  .cardInfo {
    padding: 0 15px;
    p {
      font-size: 16px;
      padding-top: 20px;
      font-weight: 900;
    }
    p:nth-child(1) {
      color: #9a9a9a;
      padding-top: 20px;
    }
    p:nth-child(4) {
      padding-bottom: 20px;
    }
  }
}
.before,
.next {
  float: left;
  width: 165px;
  margin-left: 10px;
  color: #ffffff;
  font-size: 20px;
  padding: 20px 20px;
  text-align: center;
  border-radius: 5px;
}
.before {
  background: #b4e2ca;
  margin-top: -30px;
  margin-bottom: 150px;
}
.next {
  background: #1db667;
  margin-top: -30px;
  margin-bottom: 150px;
}
/deep/ .van-field {
  overflow: hidden;
}
.bottom {
  // height: 800px;
  margin-top: 20px;
  margin-bottom: 50px;
  background: #f5f5f5;
  border-radius: 5px;
  box-sizing: border-box;
  p {
    padding: 40px 10px 30px 10px;
    font-size: 20px;
    color: #000000;
  }
}
/deep/ .van-cell__title,
.van-cell__value {
  float: left;
}
/deep/ .van-field {
  width: 345px;
  margin: 0px 10px 10px 10px;
  background: #ffffff;
  border-radius: 5px;
}
/deep/ .van-cell__title {
  font-size: 16px;
  line-height: 30px;
}
/deep/ .van-cell__value {
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
}
/deep/ .van-field__control {
  font-size: 16px;
  text-align: right;
}
</style>
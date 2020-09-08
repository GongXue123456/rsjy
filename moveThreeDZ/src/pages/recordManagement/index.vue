<template>
  <div>
    <Nav title="首页" />
    <div class="home">
      <h3>您好，王富贵！</h3>
      <div>三小企业</div>
      <p>欢迎进入食安数智云平台，请选择您接下来的操作</p>
    </div>
    <div class="module">
      <div class="firstRow">
        <a href="#/recordExamine">
          <div class="loginRecord">
            <img src="../../assets/img/selffind.png" width="35" />
            <span>登记备案</span>
          </div>
        </a>
        <div class="rowRight">
          <a href="#/train">
            <div class="train">
              <img src="../../assets/img/training examination.png" width="35" />
              <span>培训考试</span>
            </div>
          </a>
          <a href="#/news">
            <div class="news">
              <img src="../../assets/img/news.png" width="35" />
              <span>新闻宣传</span>
            </div>
          </a>
        </div>
      </div>
      <div class="secondRow">
        <a href>
          <div class="foodOrigin">
            <img src="../../assets/img/food-origin.png" width="35" />
            <span>食材溯源</span>
          </div>
        </a>
        <a href>
          <div class="foodSample">
            <img src="../../assets/img/food.png" width="35" />
            <span>食品留样</span>
          </div>
        </a>
      </div>
      <div class="thirdRow">
        <a href="#/kitchenWasteRefuse">
          <div class="foodWaste">
            <img src="../../assets/img/kitchen waste.png" width="35" />
            <span>餐厨垃圾</span>
          </div>
        </a>
        <a href>
          <div class="info">
            <img src="../../assets/img/personal message.png" width="35" />
            <span>信息公示</span>
          </div>
        </a>
      </div>
      <div class="fourRow">
        <a href="#/selfexamination">
          <div class="selffind">
            <img src="../../assets/img/patrol supervision.png" width="35" />
            <span>自查自纠</span>
          </div>
        </a>
        <a href>
          <div class="userinfo">
            <img src="../../assets/img/9.png" width="35" />
            <span>个人消息</span>
          </div>
        </a>
      </div>
      <van-cell is-link></van-cell>
      <van-popup v-model="show" :append-to-body="true" :style="{height:'300px'}">
        <img src="../../assets/img/01_03.png" width="35" />
        <a href="record">
          <div class="toRecord"></div>
        </a>
        <i class="iconfont icon-close" @click="close"></i>
      </van-popup>
    </div>
  </div>
</template>
<script>
import Nav from "../../components/Nav";
import Vue from "vue";
import { Popup } from "vant";
import { Cell } from "vant";
Vue.use(Popup);
Vue.use(Cell);
export default {
  components: {
    Nav
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.showPopup();
  },
  methods: {
    showPopup() {
      this.show = true;
      this.overlay = true;
    },
    close() {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 375px;
  height: 190px;
  margin-top: 54px;
  box-sizing: border-box;
  background-color: #00d080 !important;
  background: url("../../assets/img/logo.png") no-repeat 18px 25px;
  h3 {
    font-size: 18px;
    color: #ffffff;
    position: absolute;
    top: 130px;
    left: 13px;
  }
  div {
    width: 60px;
    height: 20px;
    text-align: center;
    position: absolute;
    top: 128px;
    left: 150px;
    line-height: 20px;
    font-size: 14px;
    border: 1px solid #ffffff;
    opacity: 0.5;
    color: #ffffff;
    border-radius: 5px;
  }
  img {
    position: absolute;
    top: 120px;
    left: 328px;
  }
  p {
    font-size: 14px;
    color: #ffffff;
    position: absolute;
    top: 165px;
    left: 13px;
  }
}
.module {
  height: 100%;
  position: absolute;
  left: 0;
  top: 195px;
  padding: 0 11px;
  .train,
  .news,
  .foodOrigin,
  .foodSample,
  .foodWaste,
  .info,
  .selffind,
  .userinfo {
    height: 95px;
    background: #fff;
    span {
      margin-left: -20px;
    }
  }
  .firstRow {
    height: 200px;
    span {
      font-size: 16px;
      color: #323232;
    }
    .loginRecord {
      width: 175px;
      height: 200px;
      float: left;
      background: #fff;
      background-size: 30px;
      img {
        position: absolute;
        top: 50px;
        left: 80px;
      }
      span {
        padding-left: 55px;
        line-height: 200px;
      }
    }
    .rowRight {
      float: left;
      height: 200px;
      margin-left: 10px;
      width: 160px;
      .train {
        img {
          margin: 30px 20px;
          box-sizing: border-box;
          vertical-align: middle;
        }
      }
      .news {
        margin-top: 10px;
        img {
          margin: 30px 20px;
          box-sizing: border-box;
          vertical-align: middle;
        }
      }
    }
  }
  .secondRow {
    height: 95px;
    box-sizing: border-box;
    margin-top: 10px;
    span {
      font-size: 16px;
      color: #323232;
    }
    .foodOrigin {
      height: 95px;
      width: 175px;
      float: left;
      img {
        margin: 30px 20px;
        box-sizing: border-box;
        vertical-align: middle;
      }
    }
    .foodSample {
      height: 95px;
      margin-left: 10px;
      float: left;
      width: 160px;
      img {
        margin: 30px 20px;
        box-sizing: border-box;
        vertical-align: middle;
      }
    }
  }
  .thirdRow {
    height: 95px;
    box-sizing: border-box;
    margin-top: 10px;
    span {
      font-size: 16px;
      color: #323232;
    }
    .foodWaste {
      height: 95px;
      width: 175px;
      float: left;
      img {
        margin: 30px 20px;
        box-sizing: border-box;
        vertical-align: middle;
      }
    }
    .info {
      height: 95px;
      margin-left: 10px;
      float: left;
      width: 160px;
      img {
        margin: 30px 20px;
        box-sizing: border-box;
        vertical-align: middle;
      }
    }
  }
  .fourRow {
    height: 95px;
    box-sizing: border-box;
    margin-top: 10px;
    span {
      font-size: 16px;
      color: #323232;
    }
    .selffind {
      height: 95px;
      width: 175px;
      float: left;
      img {
        margin: 30px 20px;
        box-sizing: border-box;
        vertical-align: middle;
      }
    }
    .userinfo {
      height: 95px;
      margin-left: 10px;
      float: left;
      width: 160px;
      img {
        margin: 30px 20px;
        box-sizing: border-box;
        vertical-align: middle;
      }
    }
  }
}
.van-popup {
  width: 300px;
  position: relative;
  top: -550px;
  left: 22px;
  img {
    width: 100%;
  }
  .toRecord {
    width: 272px;
    height: 46px;
    position: absolute;
    top: 239px;
    left: 12px;
    border-radius: 5px;
  }
  i {
    display: block;
    font-size: 30px;
    margin: 30px 135px;
    color: #ffffff;
  }
}
</style>
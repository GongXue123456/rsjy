<template>
  <div class="spot-container">
    <van-nav-bar title="现场执法" class="navbar-title" @click-left="onClickLeft">
      <template slot="left">
        <van-icon name="arrow-left" color="#cccccc" />
        <span style="color:#cccccc;">返回</span>
      </template>
    </van-nav-bar>
    <div class="spot-box">
      <h2 style="text-align: left;">上传图片(不超过三张)</h2>
      <div class="upload-box">
        <!-- <div
          class="up-item"
          v-show="form.imgList.length>0"
          v-for="(img,index) in form.imgList"
          :key="index"
        >
          <img :src="img.src" alt width="100%" height="100%" @click="onPreImg(img.src)">
          <div class="up-del" @click="delPic(index)">删除</div>
        </div>
        <van-icon v-show="showUpload" size="100px" @click="onChoseImg()" name="photograph"/>-->

        <van-uploader
          name="uploader"
          camera
          v-model="fileList"
          :after-read="uploadPic"
          :before-delete="handleDelete"
          :max-count="3"
        >
          <van-icon size="80px" name="photograph" />
        </van-uploader>
      </div>
    </div>
    <div style="margin:15px 0;">
      <van-cell-group>
        <van-cell
          title="违规类型"
          :value="form.advice_type | typeFilter"
          is-link
          @click="popupAdviceType"
        />
        <van-cell
          title="监管评级"
          :value="form.advice_rate | rateFilter"
          is-link
          @click="popupAdviceRate"
        />
        <van-field
          v-model="form.advice_remark"
          @blur="inputBlur"
          label="补充意见"
          type="textarea"
          placeholder="请输入"
          autosize
        />
      </van-cell-group>
    </div>
    <div class="submit-button">
      <van-button type="primary" size="large" :loading="submitLoading" loading-text="提交中..." @click="onSubmit">提交</van-button>
    </div>
    <van-popup v-model="showAdviceType" position="bottom">
      <van-picker
        show-toolbar
        :columns="adviceTypeColumns"
        @confirm="onConfirmAdviceType"
        @cancel="showAdviceType = false"
      />
    </van-popup>
    <van-popup v-model="showAdviceRate" position="bottom">
      <van-picker
        show-toolbar
        :columns="adviceRateColumns"
        @confirm="onConfirmAdviceRate"
        @cancel="showAdviceRate = false"
      />
    </van-popup>
    <!-- <van-loading color="white" /> -->
  </div>
</template>

<script>
import { saveAdvice } from "api/company";
import { uploadImg } from "api/common";
// import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      adviceTypeColumns: [
        { text: "资证不齐", value: 1 },
        { text: "现场卫生不规范", value: 2 },
        { text: "人员卫生不规范", value: 3 },
        { text: "追溯记录不符合要求", value: 4 },
        { text: "无违规", value: 5 }
      ],
      adviceRateColumns: [
        { text: "差", value: 1 },
        { text: "一般", value: 2 },
        { text: "良好", value: 3 },
        { text: "优秀", value: 4 }
      ],
      showAdviceType: false,
      showAdviceRate: false,
      form: {
        company_code: "",
        imgs_url: [],
        type: 1,
        advice_rate: null,
        advice_type: null,
        advice_remark: ""
      },
      submitLoading: false,
      fileList: []
    };
  },
  watch: {},
  computed: {
    // showUpload() {
    //   return this.form.imgList.length < 3;
    // }
  },
  filters: {
    typeFilter(type) {
      const typeMap = {
        1: "资证不齐",
        2: "现场卫生不规范",
        3: "人员卫生不规范",
        4: "追溯记录不符合要求",
        5: "无违规"
      };
      return typeMap[type];
    },
    rateFilter(rate) {
      const rateMap = {
        1: "差",
        2: "一般",
        3: "良好",
        4: "优秀"
      };
      return rateMap[rate];
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // delPic(index) {
    //   this.form.imgList.splice(index, 1);
    //   this.url_list.splice(index, 1);
    //   this.show_add = true;
    // },
    inputBlur() {
      window.scrollTo(0, 0);
    },
    popupAdviceType() {
      this.showAdviceType = true;
    },
    onConfirmAdviceType(item, index) {
      this.form.advice_type = item.value;
      this.showAdviceType = false;
    },
    popupAdviceRate() {
      this.showAdviceRate = true;
    },
    onConfirmAdviceRate(item, index) {
      this.form.advice_rate = item.value;
      this.showAdviceRate = false;
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
        let res = response.data;
        loading.clear();
        this.form.imgs_url.push(res.visit_url);
      });
    },
    handleDelete(file, detail) {
      this.form.imgs_url.splice(detail.index, 1);
      this.fileList.splice(detail.index, 1);
    },
    onSubmit() {
      this.submitLoading = true
      saveAdvice(this.form).then(response => {
        this.submitLoading = false
        this.$toast.success("提交成功");
        this.fileList = [];
        this.form = {
          company_code: this.$route.query.id,
          imgs_url: [],
          type: 1,
          advice_rate: null,
          advice_type: null,
          advice_remark: ""
        };
      });
    },
    //微信选图片
    onChoseImg() {
      let _this = this;
      _this.$wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          let localId = res.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          _this.$wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              let serverId = res.serverId; // 返回图片的服务器端ID
              _this.$api.get(
                "/api/wx/advice_records/upload",
                { server_id: serverId },
                response => {
                  _this.url_list.push(response.path);
                  _this.form.imgList.push({
                    src: response.path
                  });
                  if (_this.url_list.size() > 2) _this.show_add = false;
                  else _this.show_add = true;
                }
              );
            }
          });
        }
      });
    }
  },
  created() {},
  mounted() {
    this.form.company_code = this.$route.query.id;
  }
};
</script>
<style scoped>
.spot-container {
  background-color: #f1f1f1;
  width: 100%;
  height: 100%;
}

.spot-container .spot-box {
  padding: 15px 15px 5px;
}

.spot-container h2 {
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  color: rgba(69, 90, 100, 0.6);
}

.upload-box {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 20px;
  height: 80px;
  background-color: #fff;
}

.upload-btn {
  width: 80px;
  height: 80px;
}

.up-item {
  overflow: hidden;
  position: relative;
  border: 1px solid #e2e2e2;
  width: 80px;
  height: 100px;
  display: inline-block;
  vertical-align: top;
}

.submit-button {
  margin: 0 30px;
}

.up-del {
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 12px;
  color: #fff;
  width: 100%;
  height: 28px;
  line-height: 28px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

<style>
.spot-container .van-cell__title {
  text-align: left !important;
}
</style>

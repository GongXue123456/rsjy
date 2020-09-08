<template>
  <div class="container">
    <van-nav-bar title="公司列表" class="navbar-title" @click-left="onClickLeft">
      <template slot="left">
        <van-icon name="arrow-left" color="#cccccc" />
        <span style="color:#cccccc;">返回</span>
      </template>
      <van-icon
        :name="searchFlag?'arrow-up':'search'"
        slot="right"
        color="#1AAD19"
        @click="searchFlag=!searchFlag"
      />
    </van-nav-bar>
    <transition name="van-slide-down">
      <van-search
        v-show="searchFlag"
        show-action
        placeholder="请输入搜索关键词"
        v-model="searchCompanyName"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </transition>
    <div class="list-wrap" v-swipeup="handleSwipe" v-swipedown="handleSwipe">
      <vo-pages
        :data="list"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
        :loadedAll="loadedAll"
      >
        <ul class="company-list">
          <li
            class="company"
            v-for="(company,companyIndex) in list"
            :key="companyIndex"
            @click="toCompanyDetail(company)"
          >
            <div class="left">
              <van-image
                round
                fit="cover"
                width="60px"
                height="60px"
                :src="company.logo_img?global.resourcePath+company.logo_img:sayLogo"
              />
              <!-- <img v-lazy="company.logo_img" alt="thumb" /> -->
            </div>
            <div class="right">
              <p class="company-name">{{ company.company_name }}</p>
              <p class="more-info">
                <span class="address van-ellipsis">地址：{{ company.company_address }}</span>
              </p>
              <p class="right-arrow">
                <van-icon name="arrow" class="right-icon" />
              </p>
            </div>
          </li>
        </ul>
      </vo-pages>
    </div>
    <!-- <footer-tabbar /> -->
  </div>
</template>
<script>
import { fetchList } from "api/company";
import sayLogo from "assets/remoteSup/say_logo.png";
import dayjs from "dayjs";
// import FooterTabbar from "components/FooterTabbar";
import VoPages from "vo-pages";
import "vo-pages/lib/vo-pages.css";
export default {
  name: "CompanyList",
  data() {
    return {
      active: 1,
      list: [],
      pagerCount: null,
      pagerOpenset: 10,
      pagerOffset: 0,
      userCode: "",
      loadedAll: false,
      searchCompanyName: "",
      searchFlag: false,
      toast: null,
      sayLogo
    };
  },
  mounted() {
    this.getList();
  },
  components: {
    // [Tabbar.name]: Tabbar,
    // [TabbarItem.name]: TabbarItem,
    // FooterTabbar,
    VoPages
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch() {
      this.pagerOffset = 0;
      this.getList(false, true);
    },
    pullingDown() {
      this.beforePullDown = false;
      this.pagerOffset = 0;
      this.getList(false);
    },
    pullingUp() {
      this.pagerOffset += 1;
      this.getList();
    },
    async getList(loadMore = true, loadingToast = false) {
      const params = {
        pager_offset: this.pagerOffset,
        pager_openset: this.pagerOpenset,
        company_name: this.searchCompanyName,
        user_code: this.$route.query.user_code
      };
      if (loadingToast) {
        this.toast = this.$toast.loading({
          message: "搜索中...",
          forbidClick: true,
          duration: 0
        });
      }
      const result = await fetchList(params);
      if (loadingToast) {
        this.toast.clear();
      }
      this.pagerCount = result.data.pager_count;
      const newList = result.data.company_list;
      if (loadMore) {
        this.list = this.list.concat(newList);
      } else {
        this.list = newList;
      }
      if (!this.beforePullDown) {
        this.beforePullDown = true;
      }
      this.loadedAll = this.pagerCount <= this.list.length;
    },
    toCompanyDetail(row) {
      this.$router.push({
        name: "CompanyDetail",
        params: { id: row.id },
        query: {
          name: row.name
        }
      });
    },
    handleSwipe() {
      if (this.searchFlag) {
        this.searchFlag = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.container {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  .list-wrap {
    height: calc(100% - 50px);
    overflow-y: hidden;
  }
}

.company-list {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 15px 15px 0;
  .company {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 6px 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 6px #e3e3e3;
    .left {
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .right {
      padding-left: 2px;
      box-sizing: border-box;
      display: flex;
      width: 235px;
      height: 60px;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-around;
      p {
        // width: 100%;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
      }
      .company-name {
        width: calc(100% - 50px);
        font-size: 18px;
      }
      .more-info {
        width: calc(100% - 50px);
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        font-size: 14px;
        color: #666;
        .address {
          width: 100%;
        }
      }
      .right-arrow {
        display: flex;
        width: 50px;
        height: 100%;
        .right-icon {
          flex: 1;
          text-align: right;
          align-self: center;
        }
      }
    }
  }
}
</style>

<template>
    <div class="new">
        <div class="new_left borr10 tl pt15 pr" @click="$router.push('/classifytwo?name1=海鲜水产&name2=蟹&id=2&id1=22&aa=1')">
          <p class="title f16 pl20">超级特价</p>
          <p class="desc f13 pl20">限时特惠</p>
          <div></div>
          <img class="tejia pa" src="../../../../assets/images/tejia.png" />
        </div>
        <div class="new_right tl" >
          <div class="top borr10 bgcfff pt10 pr"  @click="$router.push('/classifytwo?name1=牛羊猪肉&name2=牛肉&id=1&id1=18&aa=1')">
            <p class="title f15 pl15">剁手抢</p>
            <p class="desc f13 pl15">买一赠一</p>
            <img class="pa" src="../../../../assets/images/duoshou.png" />
          </div>
          <div class="bottom borr10 bgcfff pt10 pr" @click="$router.push('/classifytwo?name1=鲜果时蔬&name2=蔬菜&id=7&id1=46&aa=1')">
            <p class="title f15 pl15">鲜活菜市 天天上新</p>
            <p class="desc f13 pl15">0.1元秒杀</p>
            <img class="pa" src="../../../../assets/images/shangxin.png" />
          </div>
        </div>
      </div>
</template>
<style lang="scss" scoped>
.new {
  width: 344px;
  margin: auto;
  display: flex;
  .new_left {
    margin-right: 7px;
    background-color: #ecf9ff;
    width: 169px;
    height: 177px;
    .title {
      color: #4cb4e8;
    }
    img {
      width: 146px;
      height: 98px;
      right: 5px;
      bottom: 0px;
    }
  }
  .desc {
    color: #919191;
  }
  .top {
    margin-bottom: 7px;
  }
  .new_right div {
    .title {
      color: #998559;
    }
    width: 169px;
    height: 85px;
    img {
      width: 100px;
      height: 48px;
      right: 5px;
      bottom: 5px;
    }
  }
}
</style>


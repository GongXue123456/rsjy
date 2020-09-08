<template>
  <li class="aaa">
  <h3 class="F7">下拉框选择案例</h3>
  <div class="por">
    <div class="selectBox" style="width: 400px;">
      <div class="selectBox_show" v-on:click.stop="arrowDown">
        <i class="icon icon_arrowDown"></i>
        <p title="请选择">{{unitName}}</p>
        <input type="hidden" name="unit" v-model="unitModel">
      </div>
      <div class="selectBox_list" v-show="isShowSelect" style="max-height: 240px; width: 398px; display: block;">
        <div class="selectBox_listLi" v-for="(item, index) in dataList"
             @click.stop="select(item, index)" :key="index">{{item.value}}</div>
      </div>
    </div>
  </div>
</li>
</template>
<script>
 export default {
     name:'aaa',
    data() {
      return {
        isShowSelect: false,
        unitModel:0,
        dataList: [
          {key: -1, value: "111"},
          {key: 0, value: "苹果"},
          {key: 1, value: "香蕉"}
        ],
        unitName:'111'
      }
    },
    methods: {
       arrowDown() {
        this.isShowSelect = !this.isShowSelect;
      },
      select(item, index) {
        this.isShowSelect = false;
        console.log(item);
        console.log(index);
        this.unitModel = index;
        this.unitName = item.value;
      }
     
    }
  };

</script>
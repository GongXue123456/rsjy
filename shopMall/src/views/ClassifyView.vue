<template>
  <div class="second-view">
    <HeadSearch type="aaa"></HeadSearch>
    <div class="second-view-scroll">
      <scroll-tab>
        <scroll-tab-panel v-for="(item,key) in list"  :key="key"  :label="item.c_name"  icon="demo-icons-category1"
        >
          <div class="second-view-scroll-ul">
            <ul class>
              <li class="mb10" v-for="(item1,index1) in item.pager_list" :key="index1"> 
                <div  @click="goToClassifyTwo(item.c_name,item1.c_name,item.c_id,item1.c_id)" :data-id="item.c_id" :data-id1="item1.c_id" :data-name1="item.c_name" :data-name2="item1.c_name" >
                  <img  :src="item1.c_logo"  alt />
                <p>{{item1.c_name}}</p>
                </div>
               
              </li>
            </ul>
          </div>
        </scroll-tab-panel>
      </scroll-tab>
    </div>
  </div>
</template>
<script>
import { getCategoryAll } from "../api/index";
import {
  ScrollTab,
  ScrollTabPanel
} from "./../components/common/classify/scrolltab";
import HeadSearch from "./../components/common/HeadSearch";
export default {
  components: {
    ScrollTab,
    ScrollTabPanel,
    HeadSearch
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getCategoryAll().then(response => {
        if (response.code == 200) {
          this.list = response.data;
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
    goToClassifyTwo(c_name1,c_name2,c_id,c_id1) {
  this.$router.push({
    path:'/classifytwo',
     query: {   
        name1:c_name1,
         name2:c_name2,
         id:c_id,
         id1:c_id1
      } 
  })
},
  }
};
</script>
<style lang="scss" scoped>
$css-prefix: second-view;

.second-view-scroll {
  position: absolute;
  top: 50px;
  bottom: 60px;
  width: 100%;
  /* height: (1100rem/40); */
  /* overflow-y: auto; */
  /* position: relative; */
  .second-view-scroll-ul {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 0 0 33%;
        text-align: center;
        img {
          padding: 10px;
        }
        p {
          font-size: 14px;
          padding: 0px;
        }
      }
    }
  }
 
}
</style>


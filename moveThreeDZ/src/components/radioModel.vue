<template>
      <van-popup v-model="myshow"   
    @click-overlay='close' >
        <search v-if="val!=1" @myvalue="ser" :name.sync="aa" type="home" />
       <van-radio-group v-model="radio" :style="{ height: fullHeight + 'px' }">
        <van-cell-group>
          <div v-if="content.length>0">

       <div v-for="(item,index) in content" :key="index">
           <van-cell v-show="item.department_name" :title="item.department_name" clickable @click="checkRadio(1,item)">
          <template #right-icon>
           <van-radio :name="item.department_code" />
          </template>
         </van-cell>
         <van-cell v-show="item.region_name" :title="item.region_name" clickable @click="checkRadio(2,item)">
          <template #right-icon>
           <van-radio :name="item.region_code" />
          </template>
         </van-cell>
         <van-cell v-show="item.category_name" :title="item.category_name" clickable @click="checkRadio(3,item)">
          <template #right-icon>
           <van-radio :name="item.category_code" />
          </template>
         </van-cell>
         <van-cell v-show="item.supplier_name" :title="item.supplier_name" clickable @click="checkRadio(4,item)">
          <template #right-icon>
           <van-radio :name="item.supplier_name" />
          </template>
         </van-cell>
         </div>
          </div>
          <div v-else class="p15 c666 tc f15">
                暂无数据
           </div>
        </van-cell-group>
       </van-radio-group>
       <van-row class="w p10 bgcfff" gutter="20">
          <van-col span="24"><van-button   block type="primary" native-type="submit"  @click="close"> 确认 </van-button></van-col>
         
        </van-row>
     
      
      </van-popup>
</template>
<script>
import search from './search'
export default {
  name: 'cell',
  components:{search},
  props: {
   
   content:{
     type:Array,
     default(){
       return []
     }
   },
   val:{
      type:Number,
   },
   checked:{
     type:String,
     default:''
   },
  },
   data(){
    return{
      myshow:true,//popup的显示，在组件中，默认是显示，不用父组件传值
      aa:'',
      radio:'',
      loading: false,
      finished: false,
      fullHeight:document.documentElement.clientHeight*0.8- 100,
        }
    },
    created(){
      this.radio=this.checked
    },
  methods: {
    close(){
        this.$emit("closeTip",this.myshow)//把关闭信息传递给父组件
        this.myshow = false;
      },
      ser(value) {
      this.aa = value;
      this.$emit('event1', this.aa)
    },
    checkRadio(index,val){
      if(index==1){this.radio= val.department_code;}else if(index==2){this.radio= val.region_code;}else if(index==3){this.radio= val.category_code;}else if(index==4){this.radio= val.supplier_name;}
       
        this.$emit("closeTip1",val)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.van-popup
  width:80%
  max-height 80%
  border-radius 10px
  overflow hidden
  .van-radio-group
    padding-bottom 50px
    overflow-y scroll
    /deep/ .van-radio__icon--checked
      .van-icon
        background-color: #07c160;
        border-color: #07c160;
  .van-row
    position fixed
    bottom 0px
   
</style>

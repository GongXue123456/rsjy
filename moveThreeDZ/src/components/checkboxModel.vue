<template>
      <van-popup v-model="myshow"   
    @click-overlay='close' >
       <search v-if="val!=1" @myvalue="ser" :name.sync="aa" type="home" />
       <van-checkbox-group v-model="result" :max="10" :style="{ height: fullHeight + 'px' }">
        <van-cell-group>
          <div v-if="content.length>0">
            <van-cell   v-show="item.user_name" v-for="(item, index) in content" clickable :key="index" :title="item.user_name" @click="toggle(index,item.user_code)" >
              <template #right-icon>
                <van-checkbox :name="item.user_code" ref="checkboxes" />
              </template>
            </van-cell>
            <van-cell  v-show="item.dictionary_field" v-for="(item, index) in content" clickable :key="index" :title="item.dictionary_field" @click="toggle(index,item.dictionary_field)" >
             <template #right-icon>
              <van-checkbox :name="item.dictionary_field" ref="checkboxes" />
             </template>
            </van-cell>
          </div>
           <div v-else class="p15 c666 tc f15">
                暂无数据
           </div>
         
        </van-cell-group>
        <van-cell-group>
    
  </van-cell-group>
       </van-checkbox-group>
       <van-row class="w p10 bgcfff" gutter="20">
          <van-col span="24"><van-button   block type="primary" native-type="submit" @click="close"> 确认 </van-button></van-col>
         
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
   }
  },
   data(){
    return{
      myshow:true,//popup的显示，在组件中，默认是显示，不用父组件传值
      aa:'',
      result: [],
      user_name:[],
      user_code:[],
      dictionary_field:[],
      list:[],
      fullHeight:document.documentElement.clientHeight*0.8- 100,
        }
    },
    created(){
         this.result=[...new Set(this.checked.indexOf(",") != -1?this.checked.split(','):this.checked.split(' '))]
         this.result= this.result.filter(item2 => item2)
         console.log(this.result)
    },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    close(){
      this.list=[];
        this.$emit("closeTip",this.myshow)//把关闭信息传递给父组件
        this.myshow = false;
          this.result.forEach(item=>{
              this.content.forEach(item1=>{
                  if(item1.user_code&&item===item1.user_code){
                      this.list.push(item1.user_name);
                      
                      // this.list= [...new Set(this.list)];

                  }
                  if(item1.dictionary_code&&item===item1.dictionary_code){
                      this.list.push(item1.dictionary_field);
                      // this.list= [...new Set(this.list)];
                  }
              })
          })
           this.$emit("closeTip1",this.list.join(','),this.result.join(','))
            //  console.log(this.list)
      },
      ser(value) {
      this.aa = value;
      console.log(this.aa)
      this.$emit('event1', this.aa)
    },

  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.van-popup
  width:80%
  max-height 80%
  border-radius 10px
  overflow hidden
  .van-checkbox-group
    padding-bottom 50px
    overflow-y scroll
  .van-row
    position fixed
    bottom 0px
   /deep/ .van-checkbox__icon--checked 
      .van-icon
        background-color: #07c160;
        border-color: #07c160;
</style>

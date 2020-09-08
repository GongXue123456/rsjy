<template>
      <van-popup v-model="showPicker" round position="bottom"  @click-overlay='close'>
         <van-picker show-toolbar :columns="columns" value-key="region_name" :default-index="defaultIndex"  @cancel="onCancel" @confirm="onConfirm" />
        </van-popup>
</template>
<script>
import axios from '../../src/axios/index'
export default {
  name: 'cell',
  props: {
     province:{
       type:String,
     },
     city:{
       type:String,
     },
     area:{
       type:String,
     },
     town:{
       type:String,
     },
     vill:{
       type:String,
     }
  },
   data(){
    return{
     showPicker: true,
      index:1,
      region_code:'C51',
      defaultIndex:22,
      columns: [],
      provinceTemp:this.province,
      provinceCode:'',
      cityCode:'',
      cityTemp:this.city,
      areaTemp:this.area,
      areaCode: "",
      townTemp: this.town,
      villTemp: this.vill,
      townCode: "",
      villCode: "",
        }
    },
    created(){
      console.log(this.cityTemp)
        console.log(this.villTemp)
        // if(this.provinceTemp!=''){
        //   this.index=5;
        //   if(this.townTemp!=''){
        //      this.index=4;
        //      if(this.areaTemp!=''){
        //      this.index=3;
        //        if(this.cityTemp!=''){
        //          this.index=2;
        //          if(this.provinceTemp!=''){
        //            this.index=1;
        //          }else{
        //            this.index=0
        //          }
        //        }
        //      }
        //   }
        // }
        this.getDate()
    },
  methods: {
    getDate(type,code){
      axios.get('app/region/list', {region_type:type,region_high_code:code}).then(v => {
        this.columns=v.data;
      })
    },
    onConfirm(val) {
      this.index++;
      if(this.index===2){
        this.defaultIndex=0;
         this.provinceCode=val.region_code;
         this.provinceTemp=val.region_name;
         this.cityTemp='';
         this.areaTemp='';
         this.townTemp='';
         this.villTemp='';
       }else if(this.index===3){
          this.defaultIndex=0;
         this.cityCode=val.region_code;
         this.cityTemp=val.region_name;
          this.areaTemp='';
         this.townTemp='';
         this.villTemp='';
       }else if(this.index===4){
          this.defaultIndex=0;
         this.areaCode=val.region_code;
         this.areaTemp=val.region_name;
          this.townTemp='';
         this.villTemp='';
       }else if(this.index===5){
          this.defaultIndex=0;
         this.townCode=val.region_code;
         this.townTemp=val.region_name;
          this.villTemp='';
       }else if(this.index===6){
          this.defaultIndex=0;
           this.villCode=val.region_code;
         this.villTemp=val.region_name;
           this.$emit("closeTip",this.showPicker)
         this.showPicker=false
       }
       this.getDate(this.index,val.region_code)

      this.$emit("closeTip1",this.provinceTemp,this.cityTemp,this.areaTemp,this.townTemp,this.villTemp)
    },
    onCancel(){
       this.index--;
      
       if(this.index==0){
         this.defaultIndex=22;
           this.$emit("closeTip",this.showPicker)
         this.showPicker=false
       }else if(this.index===1){
         this.defaultIndex=22;
            this.getDate(this.index,'')
            this.provinceTemp='';
       }else if(this.index===2){
         this.defaultIndex=0;
            this.getDate(this.index,this.provinceCode)
            this.cityTemp='';
       }else if(this.index===3){
         this.defaultIndex=0;
            this.getDate(this.index,this.cityCode)
             this.areaTemp='';
       }else if(this.index===4){
         this.defaultIndex=0;
            this.getDate(this.index,this.areaCode)
             this.townTemp='';
       }else if(this.index===5){
         this.defaultIndex=0;
            this.getDate(this.index,this.townCode)
             this.villTemp='';
       }
         this.$emit("closeTip1",this.provinceTemp,this.cityTemp,this.areaTemp,this.townTemp,this.villTemp)
      
    },
    close(){
        this.$emit("closeTip",this.showPicker)
        this.$emit("closeTip1",this.provinceTemp,this.cityTemp,this.areaTemp,this.townTemp,this.villTemp)
        this.showPicker = false;
      },
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>

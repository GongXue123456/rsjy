<template>
		<div class="ser">
			<div class="ser_in pr">
				<!-- <input 
          type="text" 
          class="ser_bar" 
          placeholder="关键词" 
          :value="value"
          @input="oninput"
         />
				<div class="ser_in_img" v-show="flag" @click="$emit('input', '')" >
					<img width=15 src="../assets/img/delete.png"/>
				</div> -->
         <img class="pa" src="../assets/img/search_ic.png" />
        <cube-input v-model="value" placeholder="请输入小作坊（单位）名称"  :clearable="clearable" @input="oninput"></cube-input>
        <!-- <div @click="f">查询</div> -->
			</div>
		</div>
</template>
<script>
export default {
  name: 'search',
  props: ['type','name'],
  data() {
    return {
      flag: false,
      value:'',
       clearable: {
        visible: true,
        blurHidden: true
      }
    }
  },
  watch: {
    'name': function(newValue) {
      this.flag = newValue === '' ? false : true;
       this.value = newValue;
    }
  },
  methods: {
    oninput(){
       this.$emit('myvalue', this.value)
      // this.$emit('input', $event.target.value)
      window.console.log(this.value)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.ser
  padding: 7px 15px;
  background: #fff;
  position: relative;
  img 
    z-index: 99;
    width: 20px;
    top: 10px;
    left: 9px;
    
/deep/ .cube-input::after
  border-radius 10px
/deep/ .cube-input 
  background-color #f0f0f0
  padding-left 25px
  font-size 16px

</style>

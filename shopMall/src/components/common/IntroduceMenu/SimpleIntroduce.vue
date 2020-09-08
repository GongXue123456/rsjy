<template>
  <div class="simpleintroduce">
    <div class="simpleintroduce-flex">
      <div class="simpleintroduce-flex-tit">
        <h3>{{sTitle}}</h3>
      </div>
      <div class="simpleintroduce-flex-collection">
        <div  @click="collection" class="simpleintroduce-flex-collection-star">
          <img v-if="sColect==0" src="../../../assets/images/uncollection.png" alt="">
           <img v-else-if="sColect==1" src="../../../assets/images/collection.png" alt="">
        </div>
        <p>
          收藏
        </p>
      </div>
    </div>
    <div class="simpleintroduce-desc mt10">
      {{sDesc}}
    </div>
  </div>
</template>
<script>
import uncollection from '../../../assets/images/uncollection.png'
import collection from '../../../assets/images/collection.png'
export default {
  props: {
    sTitle: {
      type: String
    },
    sDesc: {
      type: String
    },
    sColect:{ type:  Number},
    // shoucang: {
    //   type: Number
    // }
  },
  data () {
    return {
      uncollection: uncollection
    }
  },
  // watch: {
  //   shoucang (newQuestion, oldQuestion) {
  //     if (newQuestion) {
  //       this.uncollection = collection
  //     } else {
  //       this.uncollection = uncollection
  //     }
  //   }
  // },
  methods: {
    collection () {
      this.$emit("myevnet")
    }
  }
}
</script>
<style lang="scss" scoped>
.simpleintroduce{
  background: #fff;
  border-radius: 10px;
      padding: 20px 15px 15px;
      position: absolute;
    width: 95%;
    margin-top: -60px;
    margin-left: 2.5%;
  .simpleintroduce-flex{
    display: flex;
    justify-content: space-between;
    .simpleintroduce-flex-tit{
      padding-bottom:0.75rem;
      position: relative;
      &:before{
        content: '';
        width: 2.15rem;
        height:0.375rem;
        border-radius:0.18rem;
        background: #45B7FF;
        position: absolute;
        bottom: 0;
      }
      h3{
        font-size:1.25rem;
      }
    }
    .simpleintroduce-flex-collection{
      width: 25px;
      p{
        font-size: 0.575rem;
        color:rgba(145,145,145,1);
      }
    }
  }
  .simpleintroduce-desc{
    color:#919191;
    font-size: 0.7rem;
    line-height:24px;;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>

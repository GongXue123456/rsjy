<template>
  <div class="box">
    <div class="box_hd">
      <img :src="imageUrl+data.url" />
    </div>
    <div class="box_bd">
      <h4>{{data.title}}</h4>
      <p>{{data.summary}}</p>
    </div>
  </div>
</template>
<script>
import {imageUrl} from '../config/index'
export default {
  name: 'panel',
  data() {
    return {
      imageUrl: imageUrl
    }
  },
  props: {
    data: Object
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.box
  background: #fff;
  display: flex;
  padding: 10px;
  .box_hd
    margin-right: 10px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    img
      width: 60px;
      height: 60px;
  .box_bd
    flex: 1;
    min-width: 0;
    h4
      font-weight: 400;
      font-size: 17px;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      word-wrap: break-word;
      word-break: break-all;
      padding-top: 3px;
      padding-bottom: 3px;
    p
      color: #999;
      font-size: 13px;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;

</style>

<template>
  <div class="shopList">
    <div class="box add">
        <h3>食材管理</h3>
        <div>
          <el-button type="primary" @click="$router.push({path: 'shop/spuadd'})">添加食材</el-button>
        </div>
    </div>
    <div class="box search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.p_name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.one" placeholder="一级分类" @change="oneChange">
            <el-option :label="item.c_name" :value="item.c_id" v-for="item in oneCategoryValue" :key = "item.c_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.two" placeholder="二级分类">
            <el-option :label="item.c_name" :value="item.c_id" v-for="item in twoCategoryValue" :key = "item.c_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box list">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="p_id"
          label="编号" min-width="80"
          >
        </el-table-column>
        <el-table-column
          prop="p_name"
          label="食材名称" min-width="180">
        </el-table-column>
        <el-table-column
          prop="category_name_1"
          label="一级分类" min-width="130">
        </el-table-column>
        <el-table-column
          prop="category_name_2"
          label="二级分类" min-width="130">
        </el-table-column>
        <el-table-column
          prop="brand_name"
          label="品牌" min-width="100">
        </el-table-column>
        <el-table-column
          label="状态" min-width="100">
          <template slot-scope="scope">
            {{p_state[scope.row.p_state]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="sku_count"
          label="SKU数" min-width="80">
        </el-table-column>
        <el-table-column
          label="SKU操作"
          min-width="240"
          >
          <template slot-scope="scope">
            <el-button @click="show(scope.row)" size="small">查看SKU列表</el-button>
            <el-button @click="go(scope.row)" type="primary" size="small">添加食材SKU</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" min-width="130">
          <template slot-scope="scope">
              <el-button @click="$router.push({name:'shop-spuedit',query: {id: scope.row.p_id}})" type="primary" size="small">修改食材</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="i-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change = 'currentChange'>
        </el-pagination>
      </div>
    </div>

    <el-dialog title="SKU列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="ps_main_title" label="名称" width="150"></el-table-column>
        <el-table-column label="规格" width="200">
          <template slot-scope="scope">

            <el-tag v-show="item.av_name" effect="plain" type="success" v-for="(item,key) in JSON.parse(scope.row.ps_attribute)" :key='key'>{{item.ak_name}}-{{item.av_name}}</el-tag>

          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{p_state[scope.row.ps_state]}}
          </template>
        </el-table-column>
        <el-table-column property="ps_price_sell" label="价格"></el-table-column>
        <el-table-column property="c_name" label="供应商名称" min-width="180">
          <template slot-scope="scope">
                {{scope.row.c_name?scope.row.c_name:'无'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="230">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" size="small">修改SKU</el-button>
             <el-button v-if="scope.row.c_name!=null" @click="show1(scope.row)" size="small">修改供应商</el-button>
              <el-button v-else @click="show1(scope.row)" size="small">绑定供应商</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="供应商列表" :visible.sync="dialogTableVisible1"  @close="onClose">
      <el-row class="box search mt20" :gutter="10">
          <el-form :inline="true" :model="page1" class="demo-form-inline">
            <el-col :span="6">
              <el-form-item >
                <el-input placeholder="供应商名称" v-model="page1.c_name" clearable @clear="onSearch" class="input-with-select" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="tl">
              <el-form-item size="small">
                <el-button type="primary"  @click="onSearch" class="general_bgc general_border cfff" >查询</el-button>
              </el-form-item>
            </el-col>
          </el-form>
      </el-row>
      <el-table border fit :data="gridData1">
        <el-table-column label="选择" width="60" header-align="center" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="selected" :label="scope.$index"></el-radio>
            </template>
          </el-table-column>
        <el-table-column property="c_name" label="供应商" min-width="150"></el-table-column>
        <el-table-column label="地址" min-width="200">
          <template slot-scope="scope">
           {{scope.row.c_province}}{{scope.row.c_city}}{{scope.row.c_area}}{{scope.row.c_address}}
          </template>
        </el-table-column>
        <el-table-column property="c_linkman" label="经营者" min-width="80"></el-table-column>
      </el-table>
      <div class="i-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total1"
          :current-page="currentPage1"
          @current-change = 'currentChange1'>
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:15px">
          <el-button @click="dialogTableVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm()">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import ajax from '../../../util/api'
import { onpage } from '../../../util/util'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      page: {
        pager_offset: 0,
        pager_openset: 10,
        p_name: '',
        c_id: ''
      },
      page1: {
        pager_offset: 0,
        pager_openset: 10,
        c_state:1,
        c_name: '',
      },
      formInline: {
        p_name: '',
        one: '',
        two: ''
      },
      currentPage: 1,
      total: 0,
      currentPage1: 1,
      total1: 0,
      tableData: [],
      c_level: 1,
      oneCategoryValue: [],
      twoCategoryValue: [],
      p_state: ['', '启用', '禁用'],
      dialogTableVisible: false,
      gridData: [],
      dialogTableVisible1: false,
      gridData1: [],
       selected: "",
       ps_id:''
    }
  },
  computed: {
    ...mapState({
      shopPage: (state) => state.shop.shopPage
    })
  },
  created () {
    this.currentPage = this.shopPage.pager_offset / 10 + 1
    this.formInline.p_name = this.shopPage.p_name
    this.init(this.shopPage)
    this.oneCategory({ c_level: this.c_level })
  },
  methods: {
    /**
     * 初始化SPU列表
     */
    init (params) {
      ajax.get('/product/list', params).then((v) => {
        this.tableData = v.pager_list
        this.total = v.pager_count
      })
    },
     init1 (params) {
      ajax.get('/company/search',params).then(v => {
        // v.pager_list.map(r => (r.spu = row))
        console.log(v)
        this.gridData1 = v.pager_list;
         this.total1 = v.pager_count
      })
    },
    /**
     * 获得一级分类
     */
    oneCategory (params) {
      let self = this
      ajax.get('/category/list', params).then((v) => {
        self.oneCategoryValue = v.pager_list
      })
    },
    /**
     * 获得二级分类
     */
    oneChange (cid) {
      let self = this
      self.formInline.two = ''
      ajax.get('/category/single', { c_id: cid }).then((v) => {
        self.twoCategoryValue = v.pager_list
      })
    },
    /**
     * 搜索
     */
    onSubmit () {
      this.currentPage = 1
      this.page.pager_offset = 0
      this.page.p_name = this.formInline.p_name
      if (this.formInline.two) {
        this.page.c_id = this.formInline.two
      } else {
        this.page.c_id = this.formInline.one
      }
      this.$store.dispatch('shop/setNewPage', this.page)
      this.init(this.shopPage)
    },
    /**
     * 分页
     */
    currentChange (page) {
      this.currentPage = page
      this.page.p_name = this.shopPage.p_name
      this.page.c_id = this.shopPage.c_id
      this.page.pager_offset = onpage(page)
      this.init(this.page)
    },
    /**
     * 供应商分页
     */
    currentChange1 (page) {
       this.selected='';
      this.currentPage1 = page
      this.page1.c_name = this.page1.c_name
      this.page1.pager_offset = onpage(page)
      this.init1(this.page1)
    },
    /**
     * 添加sku
     */
    go (r) {
      this.$router.push({ path: 'shop/skuadd',
        query: {
          p_id: r.p_id,
          sell_attribute: r.sell_attribute
        } })
    },
    /**
     * 显示SKU
     */
    show (row) {
      this.dialogTableVisible = true
      ajax.get('/productSpec/list', { p_id: row.p_id }).then(v => {
        v.pager_list.map(r => (r.spu = row))
        this.gridData = v.pager_list
      })
    },
    /**
     * 显示供应商
     */
    show1 (row) {
      this.ps_id=row.ps_id
      this.dialogTableVisible1 = true
      this.init1(this.page1)
    },
    /**
     * 编辑sku
     */
    handleUpdate (row) {
      this.$router.push({
        path: 'shop/skuedit',
        query: {
          id: row.ps_id,
          p_id: row.spu.p_id,
          sell_attribute: row.spu.sell_attribute
        }
      })
    },
     onSearch() {
        this.selected='';
      this.page1.pager_offset = 0;
       this.init1(this.page1);
    },
     onClose() {
      this.selected='';
    },
    handleConfirm() {
      let item = this.gridData1[this.selected];
        if(item==undefined){
          this.$notify.error({
                title: '请选择供应商企业',
                message: '',
                duration: 2000
              })
              return false
      }
        this.page1.c_name = item.c_name;
      
      ajax.put('/productSpec/updateBid', {ps_id:this.ps_id,c_id:item.c_id}).then(v => {
          this.page1.c_name ='';
        this.dialogTableVisible1 = false;
        this.dialogTableVisible = false;
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.shopList{
  .add{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
   /deep/ .el-radio__label {
    display: none !important;
  }
}
</style>

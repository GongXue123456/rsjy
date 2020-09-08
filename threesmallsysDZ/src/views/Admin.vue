<template>
  <div class="admin">
    <div class="mydiv1">
<el-drawer
  :title="upuserloginname"
  :before-close="handleClose"
  :visible.sync="updialog"
  :show-close="false"
  :wrapperClosable="false"
  direction="ltr"
  custom-class="demo-drawer"
  ref="drawer"
  size="50%"
  >
  <div class="demo-drawer__content" style="text-align:center">
    <el-form :model="upform">
      <el-form-item label="原密码" prop="oldpass" :label-width="formLabelWidth" :rules="[{required: true,message: '请输入原密码', trigger: 'blur' },{ pattern: /^[A-Za-z0-9]+$/, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'},{ min: 4, max: 15, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'}]">
        <el-input type="password" placeholder="请输入原密码" v-model="upform.oldpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpass" :label-width="formLabelWidth" :rules="[{required: true,message: '请输入新密码', trigger: 'blur' },{ pattern: /^[A-Za-z0-9]+$/, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'},{ min: 4, max: 15, message: '请输入密码,长度4-15位数字或字母组成',trigger: 'blur'}]">
        <el-input type="password" placeholder="请输入新密码" v-model="upform.newpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="user_name" :rules="[{required: true,message: '请输入姓名', trigger: 'blur' },{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' },{ min: 4, max: 50, message: '请输入输入4-50个字符',trigger: 'blur'}]">
        <el-input placeholder="请输入姓名" v-model="upform.user_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  label="身份证：" :label-width="formLabelWidth" prop="user_idcard">
        <el-input placeholder="身份证" v-model="upform.user_idcard"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" prop="user_sex" :rules="[{required: true,message: '请输入性别', trigger: 'blur' },{pattern:/^['男'|'女']$/,message: '从男或女中选择输入',trigger: ['blur','change']}]">
        <el-select v-model="upform.user_sex" placeholder="请选择性别" @focus="setMinWidth" style="width:100%">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="详细地址：" :label-width="formLabelWidth" prop="user_address" >
          <el-input placeholder="详细地址" v-model="upform.user_address"></el-input>
      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer">
      <el-button @click="cancelForm">关 闭</el-button>
      <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="uploading">{{ uploading ? '提交中 ...' : '更 新' }}</el-button>
    </div>
  </div>
</el-drawer>
      </div>
    <el-container style="height: 100vh; border: 1px solid #eee;background-color:#FFFFFF">
      <el-aside width="200px" style="background-color:rgba(56,65,71,1)">
        <img class="logo mb10" src="../assets/image/logo.png">
       <p class="demonstration cfff f16 mb20">食安数智云</p>
        <el-menu :default-openeds='defaultArr' :default-active="activeNav" background-color="#384147"
      text-color="#fff"  :unique-opened='true'
      active-text-color="#2EC68A">
        <el-submenu v-for="(item,index) in menu_list"  :key="index" :index="item.menu_code" class="tl f15">
            <template slot="title">
              <i :class="'iconfont '+item.menu_img" style="margin:0 8px"></i>
              <span>{{item.menu_title}}</span>
            </template>
            <el-menu-item-group>
               <router-link v-for="(item1,index) in item.menu_list" :key="index" :to="item1.menu_url">
             <el-menu-item :index="item1.menu_code"  class="tc" @click="selectchange(item.menu_title,item1.menu_title)">
              {{item1.menu_title}}&nbsp;&nbsp;&nbsp;
              </el-menu-item>
               </router-link>
            </el-menu-item-group>
          </el-submenu>
         <!-- <el-submenu index="25" class="tl f15">
            <template slot="title">
              <i class="iconfont " style="margin:0 8px"></i>
              <span>传感器预警</span>
            </template>
            <el-menu-item-group>
                <router-link to="/admin/warning">
             <el-menu-item index="25-1"  class="tc">
              传感器预警&nbsp;&nbsp;&nbsp;
              </el-menu-item>
               </router-link>
             
            </el-menu-item-group>
          </el-submenu> 
           <el-submenu index="26" class="tl f15">
            <template slot="title">
              <i class="iconfont " style="margin:0 8px"></i>
              <span>案件中心</span>
            </template>
            <el-menu-item-group>
                <router-link to="/admin/case">
             <el-menu-item index="26-1"  class="tc">
              案件中心&nbsp;&nbsp;&nbsp;
              </el-menu-item>
               </router-link>
             
            </el-menu-item-group>
          </el-submenu>  -->
          <!-- <el-submenu index="21" class="tl f15">
            <template slot="title">
              <i class="iconfont " style="margin:0 8px"></i>
              <span>餐厨垃圾</span>
            </template>
            <el-menu-item-group>
              <router-link to="/admin/foodwaste">
             <el-menu-item index="21-1"  class="tc">
              餐厨垃圾处理&nbsp;&nbsp;&nbsp;
              </el-menu-item>
               </router-link>
                <router-link to="/admin/wasteConfigure">
             <el-menu-item index="21-2"  class="tc">
              餐厨垃圾类型配置&nbsp;&nbsp;&nbsp;
              </el-menu-item>
               </router-link>
             
            </el-menu-item-group>
          </el-submenu> -->
          <!-- <el-submenu index="2" class="tl f15">
            <template slot="title">
              <i class="iconfont iconordermanagement_ic" style="margin:0 8px"></i>
              <span>备案管理</span>
            </template>
            <el-menu-item-group>
                <router-link to="/admin/produce">
             <el-menu-item index="2-2"  class="tc">
              食品生产&nbsp;&nbsp;&nbsp;
              </el-menu-item>
               </router-link>
               <router-link to="/admin/circulate">
             <el-menu-item index="2-3"  class="tc">
              食品流通&nbsp;&nbsp;&nbsp;
              </el-menu-item>
               </router-link>
                <router-link to="/admin/restaurant">
             <el-menu-item index="2-4"  class="tc">
              食品餐饮&nbsp;&nbsp;&nbsp;
              </el-menu-item>
               </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" class="tl f15">
            <template slot="title">
              <i class="iconfont iconxunjian" style="margin:0 8px"></i>
              <span>巡查管理</span>
            </template>
            <el-menu-item-group>
               <router-link to="/admin/patrol">
          <el-menu-item index="3-1"  class="tc">
                巡查管理
              </el-menu-item>
         </router-link>
            </el-menu-item-group>
          </el-submenu>
             <el-submenu index="4" class="tl f15">
            <template slot="title">
              <i class="iconfont icontraceability_ic" style="margin:0 8px"></i>
              <span>溯源管理</span>
            </template>
            <el-menu-item-group>
               <router-link to="/admin/source">
            <el-menu-item index="4-1" class="tc f15">
              溯源管理
            </el-menu-item>
          </router-link>
            </el-menu-item-group>
          </el-submenu> 
           <el-submenu index="8" class="tl f15">
            <template slot="title">
              <i class="iconfont iconshipinliuyang" style="margin:0 8px"></i>
              <span>留样管理</span>
            </template>
            <el-menu-item-group>
               <router-link to="/admin/sample">
            <el-menu-item index="8-1" class="tc">
             留样管理
            </el-menu-item>
          </router-link>
            </el-menu-item-group>
          </el-submenu> 
          <el-submenu index="7" class="tl f15">
            <template slot="title">
              <i class="iconfont iconpeixun" style="margin:0 10px;font-size: 17px;"></i>
              <span>培训管理</span>
            </template>
            <el-menu-item-group>
               <router-link to="/admin/train">
            <el-menu-item index="7-1" class="tc f15">
            培训管理
            </el-menu-item>
          </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6" class="tl f15">
            <template slot="title">
              <i class="iconfont iconyingyanjiankong" style="margin:0 8px"></i>
              <span>鹰眼监控</span>
            </template>
            <el-menu-item-group>
               <router-link to="/admin/monitor">
            <el-menu-item index="6-1" class="tc f15">
              鹰眼监控
            </el-menu-item>
          </router-link>
            </el-menu-item-group>
          </el-submenu>
          
          <el-submenu index="10" class="tl f15">
            <template slot="title">
              <i class="iconfont iconshebei" style="margin:0 8px"></i>
              <span>设备管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/admin/cam">
                <el-menu-item index="10-1" class="tc f15">摄像头管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5" class="tl f15">
            <template slot="title">
              <i class="iconfont iconxinzengshiyaosuo" style="margin:0 8px"></i>
              <span>监管部门管理</span>
            </template>
            <el-menu-item-group>
               <router-link to="/admin/department">
            <el-menu-item index="5-1" class="tc">
             监管部门管理
            </el-menu-item>
          </router-link>
               <router-link to="/admin/department/gridOperator">
            <el-menu-item index="5-2" class="tc">
             网格信息员
            </el-menu-item>
          </router-link>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="9" class="tl f15">
            <template slot="title">
              <i class="iconfont iconrenyuanquanxian" style="margin:0 8px"></i>
              <span>人员管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/admin/power">
            <el-menu-item index="9-1" class="tc">
            人员管理
            </el-menu-item>
          </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="11" class="tl f15">
            <template slot="title">
              <i class="iconfont iconxinxigongshi" style="margin:0 8px"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/admin/role">
            <el-menu-item index="11-1" class="tc">
               角色管理
            </el-menu-item>
          </router-link>
            </el-menu-item-group>
          </el-submenu>
             <el-submenu index="12" class="tl f15">
            <template slot="title">
              <i class="iconfont iconxinzengshiyaosuo" style="margin:0 8px"></i>
              <span>组织架构</span>
            </template>
            <el-menu-item-group>
               <router-link to="/admin/structure">
            <el-menu-item index="12-1" class="tc">
             组织架构
            </el-menu-item>
          </router-link>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>

      <el-container class="w">
        <el-header v-if="topath.indexOf('warning/detail') < 0&&this.value!='鹰眼监控/传感器监测'">
           <!-- <router-link to="/information">大数据中心</router-link>  -->
           <div class="disib" style="width:250px">
             <el-select clearable v-model="value" size='small' filterable placeholder="请选择" >
               <div  v-for="item in menu_list"
      :key="item.menu_title">
                      <el-option
      v-for="item1 in item.menu_list"
      :key="item1.menu_title"
      :label="item.menu_title+'/'+item1.menu_title"
      :value="item.menu_title+'/'+item1.menu_title">
      <router-link :to="item1.menu_url">{{item.menu_title+'/'+item1.menu_title}}</router-link>
    </el-option>
               </div>
   
  </el-select>
           </div>
           
          <el-dropdown class="ml20 mr20" :hide-on-click="false" @command="LoginOut">
            <span class="el-dropdown-link">
              <img class src="../assets/image/my.png" />
              {{userloginname}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="person">个人资料</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
           
        </el-header>
        <!-- <div> -->
        <router-view></router-view>
        <!-- </div> -->        
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "../util/api";
import { local } from "../util/util";
import { mapState } from "vuex";
import md5 from 'js-md5';
export default {
  name: "admin",
  components: {},
  data() {
    return {
      defaultArr: [],
      menu_list:'',
      userloginname: "",
      navConfig: {
      },
      activeNav: "1",
      page: {
        pager_offset: "0",
        company_name: "",
        state: "",
        business_type: "",
        filing_state: "3",
        companytype_code: "",
        companytag_code: "",
        business_state: "",
        department_code: "",
        search_time_bigen: "",
        search_time_end: "",
        filing_state_time: ""
      },
      list_btn3:[{title: '男'},{title: '女'}],
      uploading: false,
      updialog: false,
      upuserloginname: "",
      formLabelWidth: '160px',
      upform: {
        user_name: '',
        user_idcard: '',
        user_sex: '',
        user_address: '',
        oldpass: '',
        newpass: ''
      },
       options: [],
        value: '首页看板/首页看板',
       topath:''
    };
    
  },
  watch: {
    //解决浏览器前进后退按钮，导航正常高亮显示
    $route(to, from) {
      this.menu_list.forEach(item=>{
     
      item.menu_list.forEach(item1=>{
        if (to.path ==item1.menu_url) {
        this.activeNav =item1.menu_code;
         this.value=item.menu_title+'/'+item1.menu_title
      }
      })
    })
       
      if (to.path == "/admin/home") {
        this.activeNav = "1-1";
      } else if (to.path == "/admin/record") {
        this.activeNav = "2-1";
        // this.$store.dispatch("record/setNewPage", this.page);
      }
    }
  },
  mounted() {
    var _this = this;
    var href = window.location.href;
    href = href.split("/admin/")[1];
    _this.activeNav = _this.navConfig[href];
   this.topath=href;
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  created() {
     this.menu_list = local.get('user').menu_list;
    this.userloginname = local.get("userloginname");
    this.upuserloginname = local.get("userloginname")+''+'的个人资料';
    this.upform.userloginpass = local.get("userloginpass");
    this.upform.user_code = local.get("upuser").user_code;
    this.upform.user_name = local.get("upuser").user_name;
    this.upform.user_idcard = local.get("upuser").user_idcard;    
    let sex=local.get("upuser").user_sex;
    if(sex==undefined||sex.length<1){
      this.upform.user_sex='男';
    }else{
      this.upform.user_sex = local.get("upuser").user_sex;
    }
    this.upform.user_address = local.get("upuser").user_address;
    this.user_level = local.get("user_level");
    this.menu_list.forEach(item=>{
     
      item.menu_list.forEach(item1=>{
        let menu=item1.menu_url.split("/admin/")[1]
        this.$set(this.navConfig, menu, item1.menu_code )
      })
    })
  },

  methods: {
    LoginOut(command) {
      if(command==="logout"){
        local.clear();
        this.$router.replace({
          path: "/login"
        });
      }else if(command==="person"){
        this.updialog = true
      }
      
    },
    selectchange(val,val1){
      this.value=val+'/'+val1
    },
    handleClose(done) {
      if (this.uploading) {
        return;
      }
      let user_loginpass=this.upform.userloginpass;
      let oldpass=md5(this.upform.oldpass);
      if(oldpass!=user_loginpass){
        this.$message.error('原密码错误');
        return false;
      }
      let paramas=this.upform;
      paramas.user_loginpass=md5(this.upform.newpass);
      paramas.oldpass=null;
      paramas.newpass=null;

      this.$confirm('确定要更新信息吗？')
        .then(_ => {
          this.uploading = true;
          this.timer = setTimeout(() => {
            axios.put('/api/user/personUpdate', paramas).then((v) => {
              local.set('upuser', v.data);
            })
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.uploading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.uploading = false;
      this.updialog = false;
      clearTimeout(this.timer);
    },
    setMinWidth (val) {
      // 无数据的情况下，给请选择提示设置最小宽度
    let domEmpty = document.getElementsByClassName('el-select-dropdown');
    let clientWidth=val.srcElement.clientWidth;
    if (domEmpty.length > 1) {
		domEmpty[1].style['min-width'] = clientWidth + 'px';
    }
    }
  }
};
</script>
<style lang="scss">
.el-drawer .el-drawer__header {
    text-align: center;
}
.el-drawer .el-input__inner {
  width: 60%;
}
.el-drawer .el-input{ 
  text-align: left;
} 
.el-drawer element.style{
width: 30%;
}
</style>
<style lang="scss" scoped>
.admin {
  a {
    color: unset;
  }
  .el-header {
    border-bottom: 1px solid #eee;
    line-height: 60px;
    text-align: right;
    img {
      width: 30px;
      vertical-align: middle;
    }
  }
  .el-main {
    padding: 0px;
  }
  .el-menu {
    border-right: none;
  }
  .logo {
    width: 70px;
    height: 70px;
    margin-top: 40px;
  }
  .el-menu-item [class^="el-icon-"] {
    vertical-align: text-bottom;
  }
  .el-menu-item{margin-left: -10px}
  /deep/ .el-menu-item-group__title{padding: 0px !important}

  .el-menu-item,.el-submenu__title {
    i{font-size: 21px;color: #fff}
  }
 
  /deep/ .el-submenu__title{
    padding-left: 22px !important;
  }
  .iconpeixun,.iconzuzhijigou{font-size: 18px !important;}
}    
</style>

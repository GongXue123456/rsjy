import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('../pages/home')
const companyList=()=>import('../pages/home/List')
const news = () => import('../pages/news')
const newsDetail = () => import('../pages/news/detail')
const patrol = () => import('../pages/patrol')
const patrolCheck = () => import('../pages/patrol/check')
const patrolDetail = () => import('../pages/patrol/detail')
const patrolMap = () => import('../pages/gis/patrolmap')
const patrolcreate = () => import('../pages/patrol/create')
const patrolthreesmallcompany = () => import('../pages/patrol/threesmallcompany')
const patrolonway = () => import('../pages/patrol/onway.vue')
const train = () => import('../pages/train')
const trainCourse = () => import('../pages/train/course')
const trainExam = () => import('../pages/train/exam')
const trainExamlog = () => import('../pages/train/examlog')
const selfexamination = () => import('../pages/selfexamination')
const selfexaminationcheck = () => import('../pages/selfexamination/check.vue')
const selfexaminationdetail = () => import('../pages/selfexamination/detail.vue')
const kitchenWasteRefuse = () => import('../pages/kitchenWasteRefuse')
const kitchenWasteRefuseCreate = () => import('../pages/kitchenWasteRefuse/create.vue')
const tipoffs = () => import('../pages/tipoffs')
const tipoffscreate = () => import('../pages/tipoffs/create.vue')
const tipoffsdetail = () => import('../pages/tipoffs/detail.vue')
const casecenter = () => import('../pages/casecenter')
const casecenterwait = () => import('../pages/casecenter/wait.vue')
const casecentergoto = () => import('../pages/casecenter/goto.vue')
const casecentercomplete = () => import('../pages/casecenter/complete.vue')
const record = () => import('../pages/recordManagement/management')
const UserList=()=>import('../pages/recordManagement/UserList')
const recordExamine = () => import('../pages/recordManagement/examine')
const recordProduction = () => import('../pages/recordManagement/productionRecord')
const recordCirculation = () => import('../pages/recordManagement/circulationRecord')
const recordFood = () => import('../pages/recordManagement/foodRecord')
const recordDetail = () => import('../pages/recordManagement/detail')
const bodyType = () => import('../pages/body-type')
const foodSource=()=>import('../pages/FoodSource/Controller/List')
const foodSourceTree=()=>import('../pages/FoodSource/Controller/ListTree')
const foodSourceDetail=()=>import('../pages/FoodSource/Controller/Detail')
const foodSourceUser=()=>import('../pages/FoodSource/User/List')
const foodSourceUserAdd=()=>import('../pages/FoodSource/User/Add')
const foodSourceUserDetail=()=>import('../pages/FoodSource/User/Detail')
const sampleList=()=>import('../pages/Sample/User/List')
const sampleUserAdd=()=>import('../pages/Sample/User/Add')
const sampleUserDetail=()=>import('../pages/Sample/User/Detail')
const sampleListController=()=>import('../pages/Sample/Controller/List')
const sampleListControllerTree=()=>import('../pages/Sample/Controller/ListTree')
const administration=()=>import('../pages/recordManagement/administration')
const update=()=>import('../pages/recordManagement/update')
const Ledger=()=>import('../pages/Ledger/index')
const LedgerList=()=>import('../pages/Ledger/List.vue')
const Purchase=()=>import('../pages/Ledger/Purchase/List')
const PurchaseAdd=()=>import('../pages/Ledger/Purchase/Add')
const PurchaseDetail=()=>import('../pages/Ledger/Purchase/Detail')
const Sale=()=>import('../pages/Ledger/Sale/List')
const SaleAdd=()=>import('../pages/Ledger/Sale/Add')
const SaleDetail=()=>import('../pages/Ledger/Sale/Detail')
const Sterilize=()=>import('../pages/Ledger/Sterilize/List')
const SterilizeAdd=()=>import('../pages/Ledger/Sterilize/Add')
const SterilizeDetail=()=>import('../pages/Ledger/Sterilize/Detail')
const Additive=()=>import('../pages/Ledger/Additive/List')
const AdditiveAdd=()=>import('../pages/Ledger/Additive/Add')
const AdditiveDetail=()=>import('../pages/Ledger/Additive/Detail')
const Storage=()=>import('../pages/Ledger/Storage/List')
const StorageAdd=()=>import('../pages/Ledger/Storage/Add')
const StorageDetail=()=>import('../pages/Ledger/Storage/Detail')
const Unqualified=()=>import('../pages/Ledger/Unqualified/List')
const UnqualifiedAdd=()=>import('../pages/Ledger/Unqualified/Add')
const UnqualifiedDetail=()=>import('../pages/Ledger/Unqualified/Detail')
const mixtureInfo=()=>import('../pages/Ledger/mixtureInfo/List')
const mixtureInfoAdd=()=>import('../pages/Ledger/mixtureInfo/Add')
const mixtureInfoDetail=()=>import('../pages/Ledger/mixtureInfo/Detail')
const productCheck=()=>import('../pages/Ledger/productCheck/List')
const productCheckAdd=()=>import('../pages/Ledger/productCheck/Add')
const productCheckDetail=()=>import('../pages/Ledger/productCheck/Detail')
const LedgerControll=()=>import('../pages/Ledger/Controll/List')
const PersonalInformation=()=>import('../pages/personalInformation')
const userCenter=()=>import('../pages/user-center')
const changePhone=()=>import('../pages/user-center/changePhone')
const changePassword=()=>import('../pages/user-center/changePassword')
const PasswordLogin=()=>import('../pages/login/passwordLogin')
const ForgetPassword=()=>import('../pages/login/forgetPassword')
const IdentifyingLogin=()=>import('../pages/login/identifyingLogin')
const Register=()=>import('../pages/register')
const view2scan=()=>import('../pages/home/view2scan.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "home",
      component: home
    },
    {
      path: '/home',
      name: "home",
      component: home
    },
    {
      path: '/company',
      name: "companyList",
      component: companyList
    },
    {
      path: '/mixtureInfo',
      name: "mixtureInfo",
      component: mixtureInfo
    },
    {
      path: '/mixtureInfo/add',
      name: "mixtureInfoAdd",
      component: mixtureInfoAdd
    },
    {
      path: '/mixtureInfo/detail',
      name: "mixtureInfoDetail",
      component: mixtureInfoDetail
    },
    {
      path: '/productCheck',
      name: "productCheck",
      component: productCheck
    },
    {
      path: '/productCheck/add',
      name: "productCheckAdd",
      component: productCheckAdd
    },
    {
      path: '/productCheck/detail',
      name: "productCheckDetail",
      component: productCheckDetail
    },
    {
      path: '/LedgerControll',
      name: "LedgerControll",
      component: LedgerControll
    },
    {
      path: '/PersonalInformation',
      name: "PersonalInformation",
      component: PersonalInformation
    },
    {
      path: '/userCenter',
      name: "userCenter",
      component: userCenter
    },
    {
      path: '/userCenter/changePhone',
      name: "changePhone",
      component: changePhone
    },
    {
      path: '/userCenter/changePassword',
      name: "changePassword",
      component: changePassword
    },
    {
      path: '/PasswordLogin',
      name: "PasswordLogin",
      component: PasswordLogin
    },
    {
      path: '/ForgetPassword',
      name: "ForgetPassword",
      component: ForgetPassword
    },
    {
      path: '/IdentifyingLogin',
      name: "IdentifyingLogin",
      component: IdentifyingLogin
    },
    {
      path: '/Register',
      name: "Register",
      component: Register
    },
    {
      path: '/view2scan',
      name: 'view2scan',
      component: view2scan
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/patrol',
      name: 'patrol',
      component: patrol
    },
    {
      path: '/patrolCheck',
      name: 'patrolCheck',
      component: patrolCheck
    },
    {
      path: '/patrolDetail',
      name: 'patrolDetail',
      component: patrolDetail
    },
    {
      path: '/patrolMap',
      name: 'patrolMap',
      component: patrolMap
    },
    {
      path: '/patrolcreate',
      name: 'patrolcreate',
      component: patrolcreate
    },
    {
      path: '/patrolthreesmallcompany',
      name: 'patrolthreesmallcompany',
      component: patrolthreesmallcompany
    },
    {
      path: '/patrolonway',
      name: 'patrolonway',
      component: patrolonway
    },
    {
      path: '/train',
      name: 'train',
      component: train
    },
    {
      path: '/trainCourse',
      name: 'trainCourse',
      component: trainCourse
    },
    {
      path: '/trainExam',
      name: 'trainExam',
      component: trainExam
    },
    {
      path: '/trainExamlog',
      name: 'trainExamlog',
      component: trainExamlog
    },
    {
      path: '/selfexamination',
      name: 'selfexamination',
      component: selfexamination
    },
    {
      path: '/selfexaminationcheck',
      name: 'selfexaminationcheck',
      component: selfexaminationcheck
    },
    {
      path: '/selfexaminationdetail',
      name: 'selfexaminationdetail',
      component: selfexaminationdetail
    },
    {
      path: '/kitchenWasteRefuse',
      name: 'kitchenWasteRefuse',
      component: kitchenWasteRefuse
    },
    {
      path: '/kitchenWasteRefuseCreate',
      name: 'kitchenWasteRefuseCreate',
      component: kitchenWasteRefuseCreate
    },
    {
      path: '/tipoffs',
      name: 'tipoffs',
      component: tipoffs
    },
    {
      path: '/tipoffscreate',
      name: 'tipoffscreate',
      component: tipoffscreate
    },
    {
      path: '/tipoffsdetail',
      name: 'tipoffsdetail',
      component: tipoffsdetail
    },
    {
      path: '/casecenter',
      name: 'casecenter',
      component: casecenter
    },
    {
      path: '/casecenterwait',
      name: 'casecenterwait',
      component: casecenterwait
    },
    {
      path: '/casecentergoto',
      name: 'casecentergoto',
      component: casecentergoto
    },
    {
      path: '/casecentercomplete',
      name: 'casecentercomplete',
      component: casecentercomplete
    },
    {
      path: '/record',
      name: 'record',
      component: record
    },
     {
      path: '/recordProduction',
      name: 'recordProduction',
      component: recordProduction
    },
    {
      path: '/recordCirculation',
      name: 'recordCirculation',
      component: recordCirculation
    },
    {
      path: '/recordFood',
      name: 'recordFood',
      component: recordFood
    },
    {
      path: '/recordExamine',
      name: 'recordExamine',
      component: recordExamine
    },
    {
      path: '/recordDetail',
      name: 'recordDetail',
      component: recordDetail
    },{
      path: '/UserList',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/bodyType',
      name: 'bodyType',
      component: bodyType
    },{
      path: '/foodSource',
      name: 'foodSource',
      component: foodSource
    },{
      path: '/foodSourceTree',
      name: 'foodSourceTree',
      component: foodSourceTree
    },{
      path: '/foodSourceDetail',
      name: 'foodSourceDetail',
      component: foodSourceDetail
    },{
      path: '/foodSourceUser',
      name: 'foodSourceUser',
      component: foodSourceUser
    },{
      path: '/foodSourceUser/add',
      name: 'foodSourceUserAdd',
      component: foodSourceUserAdd
    },{
      path: '/foodSourceUser/detail',
      name: 'foodSourceUserDetail',
      component: foodSourceUserDetail
    },{
      path: '/sampleList',
      name: 'sampleList',
      component: sampleList
    },{
      path: '/sampleList/add',
      name: 'sampleUserAdd',
      component: sampleUserAdd
    },{
      path: '/sampleList/detail',
      name: 'sampleUserDetail',
      component: sampleUserDetail
    },{
      path: '/sampleListController',
      name: 'sampleListController',
      component: sampleListController
    },{
      path: '/sampleListController/tree',
      name: 'sampleListControllerTree',
      component: sampleListControllerTree
    },
    {
      path: '/administration',
      name: 'administration',
      component: administration
    },
    {
      path: '/update',
      name: 'update',
      component: update
    }, {
      path: '/ledgerList',
      name: 'LedgerList',
      component: LedgerList
    }, {
      path: '/ledger',
      name: 'Ledger',
      component: Ledger
    }, {
      path: '/purchase',
      name: 'Purchase',
      component: Purchase
    }, {
      path: '/purchase/add',
      name: 'PurchaseAdd',
      component: PurchaseAdd
    },{
      path: '/purchase/detail',
      name: 'PurchaseDetail',
      component: PurchaseDetail
    },{
      path: '/sale',
      name: 'Sale',
      component: Sale
    }, {
      path: '/sale/add',
      name: 'SaleAdd',
      component: SaleAdd
    },{
      path: '/sale/detail',
      name: 'SaleDetail',
      component: SaleDetail
    },{
      path: '/sterilize',
      name: 'Sterilize',
      component: Sterilize
    }, {
      path: '/sterilize/add',
      name: 'SterilizeAdd',
      component: SterilizeAdd
    },{
      path: '/sterilize/detail',
      name: 'SterilizeDetail',
      component: SterilizeDetail
    },{
      path: '/additive',
      name: 'Additive',
      component: Additive
    }, {
      path: '/additive/add',
      name: 'AdditiveAdd',
      component: AdditiveAdd
    },{
      path: '/additive/detail',
      name: 'AdditiveDetail',
      component: AdditiveDetail
    },{
      path: '/storage',
      name: 'Storage',
      component: Storage
    }, {
      path: '/storage/add',
      name: 'StorageAdd',
      component:StorageAdd
    },{
      path: '/storage/detail',
      name: 'StorageDetail',
      component: StorageDetail
    },{
      path: '/unqualified',
      name: 'Unqualified',
      component: Unqualified
    }, {
      path: '/unqualified/add',
      name: 'UnqualifiedAdd',
      component: UnqualifiedAdd
    },{
      path: '/unqualified/detail',
      name: 'UnqualifiedDetail',
      component: UnqualifiedDetail
    }
  ]
})
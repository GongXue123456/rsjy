import Vue from "vue";
import VueRouter from "vue-router";

const Admin = () => import('../views/Admin.vue')
const Information = () => import('../views/Information/Information.vue')
const earlyWarning = () => import('../views/Information/earlyWarning.vue')
const GroupEarlyWarning = () => import('../views/Information/GroupEarlyWarning.vue')
const monitorWarning=()=>import('../views/Information/monitorWarning.vue')
const CompanyType = () => import('../views/pages/CompanyType/CompanyType.vue')
const CompanyTypeAdd = () => import('../views/pages/CompanyType/Add.vue')
const CompanyTag = () => import('../views/pages/CompanyType/CompanyTag.vue')
const CompanyTagAdd = () => import('../views/pages/CompanyType/CompanyTagAdd.vue')
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/pages/Home/Home.vue')
const Map = () => import('../views/pages/Home/Map.vue')
const Supervise=()=>import('../views/pages/Home/Supervise.vue')
const Record = () => import('../views/pages/Record/Record.vue')
const Produce = () => import('../views/pages/Record/Produce/Produce.vue')
const Circulate = () => import('../views/pages/Record/Circulate/Circulate.vue')
const Restaurant = () => import('../views/pages/Record/Restaurant/Restaurant.vue')
const ProduceAdd = () => import('../views/pages/Record/Produce/ProduceAdd.vue')
const CirculateAdd = () => import('../views/pages/Record/Circulate/CirculateAdd.vue')
const RestaurantAdd = () => import('../views/pages/Record/Restaurant/RestaurantAdd.vue')
const RecordUpdate = () => import('../views/pages/Record/RecordUpdate.vue')
const ProduceDetail = () => import('../views/pages/Record/Produce/ProduceDetail.vue')
const CirculateDetail = () => import('../views/pages/Record/Circulate/CirculateDetail.vue')
const RestaurantDetail = () => import('../views/pages/Record/Restaurant/RestaurantDetail.vue')
const RecordChange = () => import('../views/pages/Record/RecordChange.vue')
const AddPower =()=>import('../views/pages/Record/AddPower.vue')
const AddRole =()=>import('../views/pages/Record/AddRole.vue')
const changeCompanytype =()=>import('../views/pages/Record/changeCompanytype.vue')
const Patrol = () => import('../views/pages/Patrol/Patrol.vue')
const DoubleRandom = () => import('../views/pages/Patrol/DoubleRandom.vue')
const WorkOrder = () => import('../views/pages/Patrol/WorkOrder.vue')
const PatrolDetail = () => import('../views/pages/Patrol/PatrolDetail.vue')
const PatrolAdd = () => import('../views/pages/Patrol/PatrolAdd.vue')
const patrolConfig = () => import('../views/pages/Patrol/patrolConfig.vue')
const patrolConfigAdd = () => import('../views/pages/Patrol/patrolConfigAdd.vue')
const WorkOrderDetail = () => import('../views/pages/Patrol/WorkOrderDetail.vue')
const Monitor = () => import('../views/pages/Monitor/Monitor.vue')
const Monitor1 = () => import('../views/pages/Monitor1/Monitor1.vue')
const MonitorList = () => import('../views/pages/Monitor/MonitorList.vue')
const MonitorDetail = () => import('../views/pages/Monitor/MonitorDetail.vue')
const RegulatoryRecord = () => import('../views/pages/Monitor/RegulatoryRecord.vue')
const Entry = () => import('../views/pages/Entry/Entry.vue')
const Source = () => import('../views/pages/Source/Source.vue')
const SourceDetail = () => import('../views/pages/Source/SourceDetail.vue')
const SourceAdd = () => import('../views/pages/Source/SourceAdd.vue')
const Ingredient = () => import('../views/pages/Source/Ingredient.vue')
const BillBook=()=>import('../views/pages/BillBook/BillBook.vue')
const Sample = () => import('../views/pages/Sample/Sample.vue')
const SampleDetail = () => import('../views/pages/Sample/SampleDetail.vue')
const AddDetail = () => import('../views/pages/Patrol/AddDetail.vue')
const DepartMent = () => import('../views/pages/DepartMent/DepartMent.vue')
const DepartMentAdd = () => import('../views/pages/DepartMent/DepartMentAdd.vue')
const DepartMentEdit = () => import('../views/pages/DepartMent/DepartMentEdit.vue')
const DepartMentDetail = () => import('../views/pages/DepartMent/DepartMentDetail.vue')
const Supervisor = () => import('../views/pages/DepartMent/Supervisor.vue')
const SupervisorAdd = () => import('../views/pages/DepartMent/SupervisorAdd.vue')
const GridOperator = () => import('../views/pages/DepartMent/GridOperator.vue')
const GridOperatorAdd = () => import('../views/pages/DepartMent/GridOperatorAdd.vue')
const  Train= () => import('../views/pages/Train/Train.vue')
const TrainAdd = () => import('../views/pages/Train/TrainAdd.vue')
const TrainDetail = () => import('../views/pages/Train/TrainDetail.vue')
const CourseAdd = () => import('../views/pages/Train/CourseAdd.vue')
const  TestAdd= () => import('../views/pages/Train/TestAdd.vue')
const TestDetail = () => import('../views/pages/Train/TestDetail.vue')
const CourseDetail = () => import('../views/pages/Train/CourseDetail.vue')
const Testedit = () => import('../views/pages/Train/Testedit.vue')
const  Power= () => import('../views/pages/Power/Power.vue')
const PowerAdd = () => import('../views/pages/Power/PowerAdd.vue')
const PowerDetail = () => import('../views/pages/Power/PowerDetail.vue')
const OtherUser =()=>import('../views/pages/Power/OtherUser.vue')
const Cam = () => import('../views/pages/Device/Cam.vue')
const  CamAdd= () => import('../views/pages/Device/CamAdd.vue')
const CamEdit = () => import('../views/pages/Device/CamEdit.vue')
const Sensor = () => import('../views/pages/Sensor/Sensor.vue')
const SensorAdd = () => import('../views/pages/Sensor/SensorAdd.vue')
const  SensorEdit= () => import('../views/pages/Sensor/SensorEdit.vue')
const  SensorItems= () => import('../views/pages/Sensor/SensorItems.vue')
const SensorThreshold = () => import('../views/pages/SensorThreshold/SensorThreshold.vue')
const SensorThresholdAdd = () => import('../views/pages/SensorThreshold/SensorThresholdAdd.vue')
const SensorThresholdEdit = () => import('../views/pages/SensorThreshold/SensorThresholdEdit.vue')
const  Role= () => import('../views/pages/Role/Role.vue')
const RoleAdd = () => import('../views/pages/Role/RoleAdd.vue')
const Structure = () => import('../views/pages/Structure/Structure.vue')
const RoleuserAdd = () => import('../views/pages/Role/RoleuserAdd.vue')
const  newsCategroy= () => import('../views/pages/newsCategroy/newsCategroy.vue')
const newsCategroyAdd = () => import('../views/pages/newsCategroy/newsCategroyAdd.vue')
const newsAdd = () => import('../views/pages/news/newsAdd.vue')
const newsEdit = () => import('../views/pages/news/newsEdit.vue')
const  news= () => import('../views/pages/news/news.vue')
const RegionAdd = () => import('../views/pages/Region/RegionAdd.vue')
const RegionDel = () => import('../views/pages/Region/RegionDel.vue')
const RegionChangeName = () => import('../views/pages/Region/RegionChangeName.vue')
const  RegionChangeArea= () => import('../views/pages/Region/RegionChangeArea.vue')
const TemplateConfig = () => import('../views/pages/TemplateConfig/List.vue')
const TemplateConfigAdd = () => import('../views/pages/TemplateConfig/Add.vue')
const AttrList = () => import('../views/pages/TemplateConfig/AttrList.vue')
const  AttrAdd= () => import('../views/pages/TemplateConfig/AttrAdd.vue')
const PageConfigRegion = () => import('../views/pages/PageConfigRegion/List.vue')
const PageConfigRegionAdd = () => import('../views/pages/PageConfigRegion/Add.vue')
const CompanyIntegrity = () => import('../views/pages/CompanyIntegrity/List.vue')
const  CompanyIntegrityLog= () => import('../views/pages/CompanyIntegrity/Add.vue')
const CompanyIntegrityDetail = () => import('../views/pages/CompanyIntegrity/Detail.vue')
const DetailLog = () => import('../views/pages/CompanyIntegrity/DetailLog.vue')
const Message = () => import('../views/pages/Message/Message.vue')
const SelfCheckList = () => import('../views/pages/SelfCheck/List.vue')
const Configuration = () => import('../views/pages/SelfCheck/Configuration.vue')
const SelfList = () => import('../views/pages/SelfCheck/SelfList.vue')
const SelfListDetail = () => import('../views/pages/SelfCheck/Detail.vue')
const Announcement = () => import('../views/pages/Announcement/List.vue')
const AnnouncementAdd = () => import('../views/pages/Announcement/AnnouncementAdd.vue')
const AnnouncementDetail=()=>import('../views/pages/Announcement/AnnouncementDetail.vue')
const MessLog=()=>import('../views/pages/MessLog/List.vue')
const Complaint=()=>import('../views/pages/Complaint/List.vue')
const ComplaintDetail=()=>import('../views/pages/Complaint/Detail.vue')
const FoodWaste=()=>import('../views/pages/FoodWaste/List.vue')
const FoodWasteDetail=()=>import('../views/pages/FoodWaste/Detail.vue')
const FoodWasteConfigure=()=>import('../views/pages/FoodWaste/Configure.vue')
const FoodWasteConfigureAdd=()=>import('../views/pages/FoodWaste/Add.vue')
const ConfigureDetail=()=>import('../views/pages/FoodWaste/ConfigureDetail.vue')
const BusinessRegion=()=>import('../views/pages/BusinessRegion/List.vue')
const BusinessRegionAdd=()=>import('../views/pages/BusinessRegion/Add.vue')
const SensorWarn=()=>import('../views/pages/SensorWarn/List.vue')
const CaseCenter=()=>import('../views/pages/CaseCenter/List.vue')
const CaseCenterDetail=()=>import('../views/pages/CaseCenter/Detail.vue')
const CaseCenterAdd=()=>import('../views/pages/CaseCenter/Add.vue')
const Employ=()=>import('../views/pages/Record/Employ/Employ.vue')
const Conduct=()=>import('../views/pages/Record/Conduct/List.vue')
const Chef=()=>import('../views/pages/Record/Chef/List.vue')
const MainSubChef=()=>import('../views/pages/Record/MainSubChef/List.vue')
const Agritainment=()=>import('../views/pages/Record/Agritainment/List.vue')
const Hotel=()=>import('../views/pages/Record/Hotel/List.vue')
const MainSubChefAdd=()=>import('../views/pages/Record/MainSubChef/Add.vue')
const ConductAdd=()=>import('../views/pages/Record/Conduct/Add.vue')
const Report=()=>import('../views/pages/Record/Report/Report.vue')
const ReportDetail=()=>import('../views/pages/Record/Report/Detail.vue')
const ChefRecord=()=>import('../views/pages/ChefRecord/ChefRecord.vue')
const SensorWarnDetail=()=>import('../views/pages/SensorWarn/Detail.vue')
const Dispose=()=>import('../views/pages/Dispose/Dispose.vue')
const DisposeAdd=()=>import('../views/pages/Dispose/DisposeAdd.vue')
const Punish=()=>import('../views/pages/Punish/Punish.vue')
const PunishAdd=()=>import('../views/pages/Punish/PunishAdd.vue')
const dataStatisticsRecord=()=>import('../views/pages/dataStatistics/record.vue')
const dataStatisticsCompany=()=>import('../views/pages/dataStatistics/company.vue')
const dataStatisticsManage=()=>import('../views/pages/dataStatistics/manage.vue')
Vue.use(VueRouter);
export default new VueRouter({
 routes: [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/entry",
    name: "entry",
    component: Entry
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/information",
    name: "information",
    component: Information
  },
  {
    path: "/monitorWarning",
    name: "monitorWarning",
    component: monitorWarning
  },{
    path: "/earlyWarning",
    name: "earlyWarning",
    component: earlyWarning
  },{
    path: "/groupEarlyWarning",
    name: "GroupEarlyWarning",
    component: GroupEarlyWarning
  },
  {
    path: "/admin",
    redirect: {
      name: "admin"
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children: [
      {
        path: "home",
        name: "home",
        component: Home
      }, {
        path: "map",
        name: "map",
        component: Map
      },{
        path: "companyType",
        name: "companyType",
        component: CompanyType
      },{
        path: "companyType/add",
        name: "companyTypeAdd",
        component: CompanyTypeAdd
      },{
        path: "companyTag",
        name: "CompanyTag",
        component: CompanyTag
      },{
        path: "companyTag/CompanyTagAdd",
        name: "CompanyTagAdd",
        component: CompanyTagAdd
      },{
        path: "supervise",
        name: "Supervise",
        component: Supervise
      },
      {
        path: "record",
        name: "record",
        component: Record
      },
      {
        path: "produce",
        name: "Produce",
        component: Produce
      },{
        path: "circulate",
        name: "Circulate",
        component: Circulate
      },{
        path: "restaurant",
        name: "Restaurant",
        component: Restaurant
      },{
        path: "produce/detail",
        name: "ProduceDetail",
        component: ProduceDetail
      },{
        path: "circulate/detail",
        name: "CirculateDetail",
        component: CirculateDetail
      },{
        path: "restaurant/detail",
        name: "RestaurantDetail",
        component: RestaurantDetail
      },{
        path: "produce/add",
        name:'ProduceAdd',
        component: ProduceAdd
      },{
        path: "circulate/add",
        name:'CirculateAdd',
        component: CirculateAdd
      },{
        path: "restaurant/add",
        name:'RestaurantAdd',
        component: RestaurantAdd
      },{
        path: 'record/update',
        name:'RecordUpdate',
        component: RecordUpdate
      },
      {
        path: "record/change",
        name: "RecordChange",
        component: RecordChange
      },{
        path: "record/addRole",
        name: "AddRole",
        component: AddRole
      },{
        path: "record/changeType",
        name: "changeCompanytype",
        component: changeCompanytype
      },{
        path: "record/AddPower",
        name: "AddPower",
        component: AddPower
      },{
        path: "patrol",
        name: "patrol",
        component: Patrol
      }, {
        path: "doubleRandom",
        name: "doubleRandom",
        component: DoubleRandom
      }, {
        path: "workOrder",
        name: "workOrder",
        component: WorkOrder
      }, {
        path: "patrolConfig",
        name: "patrolConfig",
        component: patrolConfig
      }, {
        path: "patrol/patrolConfigadd",
        name: "patrolConfigAdd",
        component: patrolConfigAdd
      },
      {
        path: "patrol/detail",
        name: "PatrolDetail",
        component: PatrolDetail
      },
      {
        path: "patrol/add",
        name: "PatrolAdd",
        component: PatrolAdd
      },
      {
        path: "patrol/adddetail",
        name: "AddDetail",
        component: AddDetail
      }, {
        path: "patrol/workorderdetail",
        name: "WorkOrderDetail",
        component: WorkOrderDetail
      }
      ,
      {
        path: "source",
        name: "Source",
        component: Source
      },
      {
        path: "source/detail",
        name: "SourceDetail",
        component: SourceDetail
      },
      {
        path: "source/add",
        name: "SourceAdd",
        component: SourceAdd
      },
      {
        path: "source/ingredient",
        name: "Ingredient",
        component: Ingredient
      },{
        path: "billBook",
        name: "BillBook",
        component: BillBook
      },
      {
        path: "sample",
        name: "Sample",
        component: Sample
      },
      {
        path: "sample/detail",
        name: "SampleDetail",
        component: SampleDetail
      },
      {
        path: "department",
        name: "DepartMent",
        component: DepartMent
      },
      {
        path: "department/add",
        name: "DepartMentAdd",
        component: DepartMentAdd
      },
      {
        path: "department/edit",
        name: "DepartMentEdit",
        component: DepartMentEdit
      },
      {
        path: "department/detail",
        name: "DepartMentDetail",
        component: DepartMentDetail
      },
      {
        path: "department/supervisor",
        name: "Supervisor",
        component: Supervisor
      },
      {
        path: "department/supervisorAdd",
        name: "SupervisorAdd",
        component: SupervisorAdd
      },
      {
        path: "department/gridOperator",
        name: "GridOperator",
        component: GridOperator
      },
      {
        path: "department/gridOperatorAdd",
        name: "GridOperatorAdd",
        component: GridOperatorAdd
      },
      {
        path: "train",
        name: "Train",
        component: Train
      },
      {
        path: "train/add",
        name: "TrainAdd",
        component: TrainAdd
      },
      {
        path: "train/detail",
        name: "TrainDetail",
        component: TrainDetail
      },
      {
        path: "train/courseadd",
        name: "CourseAdd",
        component: CourseAdd
      },
      {
        path: "train/coursedetail",
        name: "CourseDetail",
        component: CourseDetail
      },
      {
        path: "train/testadd",
        name: "TestAdd",
        component: TestAdd
      },{
        path: "train/testdetail",
        name: "TestDetail",
        component: TestDetail
      },
      {
        path: "train/testedit",
        name: "Testedit",
        component: Testedit
      },
      {
        path: "monitor",
        name: "monitor",
        component: Monitor
      }, {
        path: "monitor1",
        name: "monitor1",
        component: Monitor1
      },
      {
        path: "monitor/list",
        name: "MonitorList",
        component: MonitorList
      },
      {
        path: "monitor/detail",
        name: "MonitorDetail",
        component: MonitorDetail
      },
      {
        path: "monitor/record",
        name: "RegulatoryRecord",
        component: RegulatoryRecord
      },
      {
        path: "cam",
        name: "Cam",
        component: Cam
      },
      {
        path: "cam/add",
        name: "CamAdd",
        component: CamAdd
      },
      {
        path: "cam/edit",
        name: "CamEdit",
        component: CamEdit
      },
      {
        path: "sensor",
        name: "Sensor",
        component: Sensor
      },
      {
        path: "sensor/add",
        name: "SensorAdd",
        component: SensorAdd
      },
      {
        path: "sensor/edit",
        name: "SensorEdit",
        component: SensorEdit
      },
      {
        path: "sensor/items",
        name: "SensorItems",
        component: SensorItems
      },
      {
        path: "sensorThreshold",
        name: "SensorThreshold",
        component: SensorThreshold
      },
      {
        path: "sensorThreshold/add",
        name: "SensorThresholdAdd",
        component: SensorThresholdAdd
      },
      {
        path: "sensorThreshold/edit",
        name: "SensorThresholdEdit",
        component: SensorThresholdEdit
      },
      {
        path: "power",
        name: "Power",
        component: Power
      },
      {
        path: "power/add",
        name: "PowerAdd",
        component: PowerAdd
      },
      {
        path: "power/detail",
        name: "PowerDetail",
        component: PowerDetail
      },{
        path: "user/otherUser",
        name: "OtherUser",
        component: OtherUser
      },{
        path: "role",
        name: "Role",
        component: Role
      },{
        path:"role/add",
        name:"RoleAdd",
        component:RoleAdd
      },{
        path:'role/roleuserAdd',
        name:'RoleuserAdd',
        component:RoleuserAdd
      },{
        path:"structure",
        name:"Structure",
        component:Structure
      },{
        path:"newsCategroy",
        name:"newsCategroy",
        component:newsCategroy
      },{
        path:"newsCategroy/add",
        name:"newsCategroyAdd",
        component:newsCategroyAdd
      },{
        path:"news/add",
        name:"newsAdd",
        component:newsAdd
      },{
        path:"news/edit",
        name:"newsEdit",
        component:newsEdit
      },{
        path:"news",
        name:"news",
        component:news
      },{
        path:"RegionAdd",
        name:"RegionAdd",
        component:RegionAdd
      },{
        path:"RegionDel",
        name:"RegionDel",
        component:RegionDel
      },{
        path:"RegionChangeName",
        name:"RegionChangeName",
        component:RegionChangeName
      },{
        path:"RegionChangeArea",
        name:"RegionChangeArea",
        component:RegionChangeArea
      },{
        path:"template",
        name:"TemplateConfig",
        component:TemplateConfig
      },{
        path:"template/add",
        name:"TemplateConfigAdd",
        component:TemplateConfigAdd
      },{
        path:"pageAttr",
        name:"AttrList",
        component:AttrList
      },{
        path:"pageAttr/attrAdd",
        name:"AttrAdd",
        component:AttrAdd
      },{
        path:"pageConfigRegion",
        name:"PageConfigRegion",
        component:PageConfigRegion
      },{
        path:"pageConfigRegion/Add",
        name:"PageConfigRegionAdd",
        component:PageConfigRegionAdd
      },{
        path:"companyIntegrity",
        name:"CompanyIntegrity",
        component:CompanyIntegrity
      },{
        path:"companyIntegrityLog",
        name:"CompanyIntegrityLog",
        component:CompanyIntegrityLog
      },{
        path:"companyIntegrity/detail",
        name:"CompanyIntegrityDetail",
        component:CompanyIntegrityDetail
      },{
        path:"companyIntegrity/detail/log",
        name:"DetailLog",
        component:DetailLog
      },{
        path:"SelfCheckList",
        name:"SelfCheckList",
        component:SelfCheckList
      },{
        path:"Configuration",
        name:"Configuration",
        component:Configuration
      },{
        path:"SelfCheckList/detail",
        name:"SelfListDetail",
        component:SelfListDetail
      },{
        path:"SelfCheckList/record",
        name:"SelfList",
        component:SelfList
      },{
        path:"emerNotice",
        name:"Announcement",
        component:Announcement
      },{
        path:"announceAdd",
        name:"AnnouncementAdd",
        component:AnnouncementAdd
      },{
        path:"announce/detail",
        name:"AnnouncementDetail",
        component:AnnouncementDetail
      },{
        path:"messLog",
        name:"MessLog",
        component:MessLog
      },{
        path:"complaint",
        name:"Complaint",
        component:Complaint
      },{
        path:"complaint/detail",
        name:"ComplaintDetail",
        component:ComplaintDetail
      },{
        path:"cclj",
        name:"FoodWaste",
        component:FoodWaste
      },{
        path:"cclj/detail",
        name:"FoodWasteDetail",
        component:FoodWasteDetail
      },{
        path:"ccljConfig",
        name:"FoodWasteConfigure",
        component:FoodWasteConfigure
      },{
        path:"ccljConfig/add",
        name:"FoodWasteConfigureAdd",
        component:FoodWasteConfigureAdd
      },{
        path:"ccljConfig/detail",
        name:"ConfigureDetail",
        component:ConfigureDetail
      },{
        path:"companyArea",
        name:"BusinessRegion",
        component:BusinessRegion
      },{
        path:"companyArea/add",
        name:"BusinessRegionAdd",
        component:BusinessRegionAdd
      },{
        path:"warning",
        name:"SensorWarn",
        component:SensorWarn
      },{
        path:"warning/detail",
        name:"SensorWarnDetail",
        component:SensorWarnDetail
      },{
        path:"case",
        name:"CaseCenter",
        component:CaseCenter
      },{
        path:"case/detail",
        name:"CaseCenterDetail",
        component:CaseCenterDetail
      },{
        path:"case/add",
        name:"CaseCenterAdd",
        component:CaseCenterAdd
      },{
        path:"Employ",
        name:"Employ",
        component:Employ
      },{
        path:"conduct",
        name:"Conduct",
        component:Conduct
      },{
        path:"conduct/add",
        name:"ConductAdd",
        component:ConductAdd
      },{
        path:"chef",
        name:"Chef",
        component:Chef
      },{
        path:"mainSubChef",
        name:"MainSubChef",
        component:MainSubChef
      },{
        path:"mainSubChef/add",
        name:"MainSubChefAdd",
        component:MainSubChefAdd
      },{
        path:"agritainment",
        name:"Agritainment",
        component:Agritainment
      },{
        path:"hotel",
        name:"Hotel",
        component:Hotel
      },{
        path:"report",
        name:"Report",
        component:Report
      },{
        path:"report/detail",
        name:"ReportDetail",
        component:ReportDetail
      },{
        path:"chefRecord",
        name:"ChefRecord",
        component:ChefRecord
      },{
        path:"dispose",
        name:"Dispose",
        component:Dispose
      },{
        path:"dispose/add",
        name:"DisposeAdd",
        component:DisposeAdd
      },{
        path:"punish",
        name:"Punish",
        component:Punish
      },{
        path:"punish/add",
        name:"PunishAdd",
        component:PunishAdd
      },{
        path:"dataStatistics/record",
        name:"dataStatisticsRecord",
        component:dataStatisticsRecord
      },{
        path:"dataStatistics/company",
        name:"dataStatisticsCompany",
        component:dataStatisticsCompany
      },{
        path:"dataStatistics/manage",
        name:"dataStatisticsManage",
        component:dataStatisticsManage
      },{
        path:":mess/:id",
        name:"Message",
        component:Message
      }
    ]
  }
]
})


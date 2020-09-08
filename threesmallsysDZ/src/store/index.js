import Vue from "vue";
import Vuex from "vuex";
import record from '../views/pages/Record/store'
import patrol from '../views/pages/Patrol/store'
import source from '../views/pages/Source/store'
import train from '../views/pages/Train/store'
import department from '../views/pages/DepartMent/store'
import monitor from '../views/pages/Monitor/store'
import device from '../views/pages/Device/store'
import sample from '../views/pages/Sample/store'
import power from '../views/pages/Power/store'
import sensor from '../views/pages/Sensor/store'
import sensorThreshold from '../views/pages/SensorThreshold/store'
import grade from '../views/pages/CompanyIntegrity/store'
import checkSelf from '../views/pages/SelfCheck/store'
import complaint from '../views/pages/Complaint/store'
import foodWaste from '../views/pages/FoodWaste/store'
import region from '../views/pages/BusinessRegion/store'
import cases from '../views/pages/CaseCenter/store'
import dispose from '../views/pages/Dispose/store'
import punish from '../views/pages/Punish/store'
import billBook from '../views/pages/BillBook/store'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    record,
    patrol,
    source,
    train,
    department,
    monitor,
    device,
    sample,
    power,
    sensor,
    sensorThreshold,
    grade,
    checkSelf,
    complaint,
    foodWaste,
    region,
    cases,
    dispose,
    punish,
    billBook
  },
  strict: debug
})


